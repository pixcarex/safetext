import { NextResponse } from "next/server";
import { chatJsonResponse, isLlmConfigured } from "@/lib/llm";
import type { Answer, Difficulty } from "@/lib/types";

type Body = {
  difficulty?: Difficulty;
  theme?: string;
};

type GenResult = {
  body: string;
  answer: Answer;
  difficulty: Difficulty;
  highlightPhrases?: string[];
};

const SYSTEM = `You write realistic SMS-style text messages for a scam-awareness training app for older adults.

Rules:
- Output ONLY valid JSON with keys: body (string), answer ("safe" or "scam"), difficulty ("beginner" or "intermediate"), highlightPhrases (array of short strings that appear inside body to emphasize after the quiz—use exact substrings from body).
- Messages should be 1–4 short lines, like a real text.
- Do NOT use real phone numbers. Use no number or a clearly fake pattern like (555) 010-0199.
- Do NOT use real company names or real government agency names. Invent fake brand names (e.g. "Lakeview Bank", "QuickShip").
- URLs must be clearly fake placeholders: use example.com, or obviously fake domains like scam-example.net—not real banks or stores.
- Mix: some messages are safe (appointment reminder, friend plan, 2FA code without a link), some are scams (urgency, fake bank, fake package fee, prize, investment hype).
- beginner = clearer red flags; intermediate = subtler scams or safer-looking legit messages.
- Keep tone appropriate for training, not graphic or threatening beyond typical scam texts.`;

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
Difficulty: ${difficulty}
Theme hint: ${theme}
Return JSON only.`;

  try {
    const parsed = await chatJsonResponse<GenResult>(SYSTEM, user);
    if (
      typeof parsed.body !== "string" ||
      (parsed.answer !== "safe" && parsed.answer !== "scam") ||
      (parsed.difficulty !== "beginner" && parsed.difficulty !== "intermediate")
    ) {
      return NextResponse.json({ ok: false as const, error: "Invalid AI output." }, { status: 502 });
    }
    const highlightPhrases = Array.isArray(parsed.highlightPhrases)
      ? parsed.highlightPhrases.filter((p): p is string => typeof p === "string")
      : [];
    return NextResponse.json({
      ok: true as const,
      scenario: {
        body: parsed.body.trim(),
        answer: parsed.answer,
        difficulty: parsed.difficulty,
        highlightPhrases,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false as const, error: "Could not generate a message right now. Please try again." },
      { status: 502 },
    );
  }
}
