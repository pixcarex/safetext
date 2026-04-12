import { NextResponse } from "next/server";
import { chatJsonResponse, isLlmConfigured } from "@/lib/llm";
import type { Answer } from "@/lib/types";

type Body = {
  messageBody: string;
  correctAnswer: Answer;
  userAnswer: Answer;
  userWasCorrect: boolean;
};

type ExplainResult = {
  explanation: string;
  highlightPhrases?: string[];
};

const SYSTEM = `You help older adults learn about scam and safe text messages.
Rules:
- Write exactly 2 or 3 short sentences total.
- Use plain, everyday words. No technical jargon.
- Be warm and reassuring, never condescending.
- If the user was wrong, gently correct them and give one simple tip for next time.
- If the message is safe, explain why it looks normal (no pressure, no sketchy link, etc.).
- If the message is a scam, explain the red flag in simple terms.
- Return ONLY valid JSON with keys: explanation (string), highlightPhrases (array of short strings from the message to underline, empty if none).`;

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body.messageBody !== "string" ||
    (body.correctAnswer !== "safe" && body.correctAnswer !== "scam") ||
    (body.userAnswer !== "safe" && body.userAnswer !== "scam")
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!isLlmConfigured()) {
    return NextResponse.json({ ok: false as const, reason: "no_api_key" });
  }

  const user = `Message:
"""
${body.messageBody}
"""
The correct label is: ${body.correctAnswer}.
The user chose: ${body.userAnswer}.
The user was ${body.userWasCorrect ? "correct" : "incorrect"}.
Respond with JSON only.`;

  try {
    const parsed = await chatJsonResponse<ExplainResult>(SYSTEM, user);
    if (!parsed.explanation || typeof parsed.explanation !== "string") {
      return NextResponse.json({ ok: false as const, reason: "bad_response" });
    }
    const highlightPhrases = Array.isArray(parsed.highlightPhrases)
      ? parsed.highlightPhrases.filter((p): p is string => typeof p === "string")
      : [];
    return NextResponse.json({
      ok: true as const,
      explanation: parsed.explanation.trim(),
      highlightPhrases,
    });
  } catch {
    return NextResponse.json({ ok: false as const, reason: "llm_error" });
  }
}
