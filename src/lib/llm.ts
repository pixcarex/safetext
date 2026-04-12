function getBaseUrl(): string {
  const base = process.env.OPENAI_BASE_URL?.replace(/\/$/, "") ?? "https://api.openai.com/v1";
  return base;
}

export function isLlmConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

/** Strip ```json fences some models still emit. */
export function extractJsonFromAssistantText(content: string): string {
  let s = content.trim();
  const fence = /^```(?:json)?\s*\r?\n?([\s\S]*?)\r?\n?```$/im;
  const m = s.match(fence);
  if (m) return m[1].trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```[^\n]*\n?/, "").replace(/\n?```\s*$/, "").trim();
  }
  return s;
}

export function safeJsonParse<T>(content: string): T {
  const jsonText = extractJsonFromAssistantText(content);
  try {
    return JSON.parse(jsonText) as T;
  } catch {
    const start = jsonText.indexOf("{");
    const end = jsonText.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(jsonText.slice(start, end + 1)) as T;
    }
    throw new Error(`Could not parse model JSON (first 120 chars): ${jsonText.slice(0, 120)}`);
  }
}

type ChatOptions = {
  /** Set false for gateways that reject OpenAI `response_format`. */
  jsonObjectMode?: boolean;
};

export async function chatJsonResponse<T>(
  system: string,
  user: string,
  options: ChatOptions = {},
): Promise<T> {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const url = `${getBaseUrl()}/chat/completions`;

  const envJson =
    process.env.OPENAI_JSON_OBJECT_MODE?.trim().toLowerCase() !== "false" &&
    process.env.OPENAI_JSON_OBJECT_MODE?.trim() !== "0";
  const jsonObjectMode = options.jsonObjectMode !== false && envJson;

  const body: Record<string, unknown> = {
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.5,
  };

  if (jsonObjectMode) {
    body.response_format = { type: "json_object" };
  }

  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  // Some OpenAI-compatible servers return 400 for unsupported response_format — retry without it.
  if (!res.ok && jsonObjectMode) {
    const errText = await res.text();
    const retryable =
      res.status === 400 &&
      /response_format|json_object|unsupported/i.test(errText);
    if (retryable) {
      delete body.response_format;
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(body),
      });
    } else {
      throw new Error(`LLM request failed: ${res.status} ${errText.slice(0, 800)}`);
    }
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM request failed: ${res.status} ${text.slice(0, 800)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string | null }; finish_reason?: string }>;
    error?: { message?: string };
  };

  if (data.error?.message) {
    throw new Error(`LLM API error: ${data.error.message}`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty LLM response (no assistant content)");
  }

  return safeJsonParse<T>(content);
}
