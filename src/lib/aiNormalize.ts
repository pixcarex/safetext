import type { Answer, Difficulty } from "./types";

export type GenerateShape = {
  body: string;
  answer: Answer;
  difficulty: Difficulty;
  highlightPhrases: string[];
};

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

function normalizeAnswer(v: unknown): Answer | null {
  if (typeof v !== "string") return null;
  const s = v.trim().toLowerCase();
  if (s === "safe" || s === "legitimate" || s === "ok" || s === "not_scam") return "safe";
  if (s === "scam" || s === "fraud" || s === "phishing" || s === "unsafe") return "scam";
  return null;
}

function normalizeDifficulty(v: unknown, fallback: Difficulty): Difficulty {
  if (typeof v !== "string") return fallback;
  const s = v.trim().toLowerCase();
  if (s === "intermediate" || s === "hard" || s === "advanced") return "intermediate";
  return "beginner";
}

export function normalizeGenerateResult(raw: unknown, fallbackDifficulty: Difficulty): GenerateShape | null {
  const o = unwrapRecord(raw);
  const bodyRaw = o.body ?? o.text ?? o.message ?? o.sms ?? o.content;
  if (typeof bodyRaw !== "string" || !bodyRaw.trim()) return null;

  const answer = normalizeAnswer(o.answer ?? o.label ?? o.type ?? o.verdict);
  if (!answer) return null;

  const difficulty = normalizeDifficulty(o.difficulty ?? o.level, fallbackDifficulty);

  let highlightPhrases: string[] = [];
  const hp = o.highlightPhrases ?? o.highlights ?? o.phrases_to_highlight;
  if (Array.isArray(hp)) {
    highlightPhrases = hp.filter((p): p is string => typeof p === "string").map((p) => p.trim());
  }

  return {
    body: bodyRaw.trim(),
    answer,
    difficulty,
    highlightPhrases,
  };
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
