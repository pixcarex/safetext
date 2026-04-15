export type ExplainShape = {
  explanation: string;
  highlightPhrases: string[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Flatten common LLM wrapper keys so { scenario: { body } } still works. */
function unwrapRecord(raw: unknown): Record<string, unknown> {
  if (!isRecord(raw)) return {};
  const keys = ["scenario", "message", "result", "data", "output", "practice_message"] as const;
  for (const k of keys) {
    const inner = raw[k];
    if (isRecord(inner)) {
      return { ...raw, ...inner };
    }
  }
  return raw;
}

export function normalizeExplainResult(raw: unknown): ExplainShape | null {
  const o = unwrapRecord(raw);
  const exp =
    o.explanation ??
    o.text ??
    o.reason ??
    o.summary ??
    o.feedback ??
    o.message;
  if (typeof exp !== "string" || !exp.trim()) return null;

  let highlightPhrases: string[] = [];
  const hp = o.highlightPhrases ?? o.highlights;
  if (Array.isArray(hp)) {
    highlightPhrases = hp.filter((p): p is string => typeof p === "string").map((p) => p.trim());
  }

  return {
    explanation: exp.trim(),
    highlightPhrases,
  };
}
