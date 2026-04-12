import { NextResponse } from "next/server";
import { normalizeGenerateResult } from "@/lib/aiNormalize";
import { chatJsonResponse, isLlmConfigured } from "@/lib/llm";
import type { Difficulty } from "@/lib/types";

type Body = {
  difficulty?: Difficulty;
  theme?: string;
};

const SYSTEM = `You write realistic SMS-style text messages for a scam-awareness training app for older adults.

You MUST respond with a single JSON object only (no markdown, no code fences) using exactly these keys:
- "body" (string): the text message, 1–4 short lines
- "answer" (string): either "safe" or "scam"
- "difficulty" (string): either "beginner" or "intermediate" (match the user's requested level)
- "highlightPhrases" (array of strings): short exact substrings copied from "body" to show after the quiz; use [] if none

Example:
{"body":"QuickShip: Pay $3.99 release fee today or your package returns. Pay at quickship-fake.example.com","answer":"scam","difficulty":"beginner","highlightPhrases":["Pay $3.99","today","quickship-fake.example.com"]}

Rules for the message content:
- Do NOT use real phone numbers. Use none or (555) 010-0199.
- Do NOT use real company or government names. Invent fake names.
- URLs must be fake placeholders (example.com, fake-bank.example.net).
- beginner = clearer red flags; intermediate = subtler scams or realistic safe messages.
- Keep tone appropriate for training.`;

const REPAIR_SYSTEM = `You fix JSON. Output ONLY one JSON object with exactly these keys and types:
"body" (string), "answer" ("safe" or "scam"), "difficulty" ("beginner" or "intermediate"), "highlightPhrases" (array of strings, substrings of body).
No markdown, no explanation, no extra keys.`;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const difficulty: Difficulty =
    body.difficulty === "intermediate" ? "intermediate" : "beginner";
  const theme =
    typeof body.theme === "string" && body.theme.trim()
      ? body.theme.trim().slice(0, 120)
      : "mixed (delivery, bank, prize, friend, appointment)";

  if (!isLlmConfigured()) {
    return NextResponse.json(
      { ok: false as const, error: "AI message generation needs an API key on the server." },
      { status: 503 },
    );
  }

  const user = `Generate one new practice message.
Requested difficulty: ${difficulty}
Theme hint: ${theme}`;

  const dev = process.env.NODE_ENV === "development";

  try {
    const raw = await chatJsonResponse<unknown>(SYSTEM, user);
    let normalized = normalizeGenerateResult(raw, difficulty);

    if (!normalized) {
      const repairUser = `The model returned invalid or nested JSON. Fix it. Requested difficulty: ${difficulty}. Raw (may be truncated):
${JSON.stringify(raw).slice(0, 1800)}`;
      try {
        const repaired = await chatJsonResponse<unknown>(REPAIR_SYSTEM, repairUser);
        normalized = normalizeGenerateResult(repaired, difficulty);
      } catch (repairErr) {
        if (dev) console.error("[api/generate-message] Repair pass failed:", repairErr);
      }
    }

    if (!normalized) {
      if (dev) console.error("[api/generate-message] Invalid AI output after repair:", raw);
      return NextResponse.json(
        {
          ok: false as const,
          error:
            "The AI returned an unexpected format. Try again, or set OPENAI_MODEL to gpt-4o-mini and check your API key.",
          ...(dev ? { detail: JSON.stringify(raw).slice(0, 500) } : {}),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true as const,
      scenario: {
        body: normalized.body,
        answer: normalized.answer,
        difficulty: normalized.difficulty,
        highlightPhrases: normalized.highlightPhrases,
      },
    });
  } catch (err) {
    console.error("[api/generate-message] LLM or parse error:", err);
    const message = err instanceof Error ? err.message : String(err);
    const isAuth =
      /401|403|invalid_api_key|Incorrect API key|invalid x-api-key/i.test(message);
    const hint = isAuth
      ? "Check OPENAI_API_KEY in .env.local (local) or Vercel Environment Variables (deployed)."
      : /model/i.test(message)
        ? "Check OPENAI_MODEL matches a model your account can use (e.g. gpt-4o-mini)."
        : "Check OPENAI_BASE_URL if using a proxy; try OPENAI_JSON_OBJECT_MODE=false if your gateway rejects JSON mode.";

    return NextResponse.json(
      {
        ok: false as const,
        error: `Could not generate a message. ${hint}`,
        ...(dev ? { detail: message.slice(0, 600) } : {}),
      },
      { status: 502 },
    );
  }
}
