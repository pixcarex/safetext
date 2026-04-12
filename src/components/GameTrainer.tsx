"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { scenariosForDifficulty } from "@/lib/messages";
import type { Answer, Difficulty, Scenario } from "@/lib/types";
import { ActionButtons } from "./ActionButtons";
import { NextButton } from "./NextButton";
import { MessageThread } from "./MessageThread";
import { ScoreBar } from "./ScoreBar";
import { TipsPanel } from "./TipsPanel";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function mergePhrases(staticPhrases: string[] | undefined, extra: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of [...(staticPhrases ?? []), ...extra]) {
    const t = p.trim();
    if (!t || seen.has(t.toLowerCase())) continue;
    seen.add(t.toLowerCase());
    out.push(t);
  }
  return out;
}

function scenarioFromGenerated(gen: {
  body: string;
  answer: Answer;
  difficulty: Difficulty;
  highlightPhrases?: string[];
}): Scenario {
  return {
    id: `gen-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    body: gen.body,
    answer: gen.answer,
    difficulty: gen.difficulty,
    fallbackExplanation:
      "This is an extra practice message. If the explanation does not load, use the tips below: watch for urgent money requests, odd links, and requests for passwords.",
    highlightPhrases: gen.highlightPhrases ?? [],
  };
}

export function GameTrainer() {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [queue, setQueue] = useState<Scenario[]>(() =>
    shuffle(scenariosForDifficulty("beginner")),
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"question" | "feedback">("question");
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [lastWasCorrect, setLastWasCorrect] = useState(false);
  const [highlightPhrases, setHighlightPhrases] = useState<string[]>([]);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const current = queue[index];

  useEffect(() => {
    setQueue(shuffle(scenariosForDifficulty(difficulty)));
    setIndex(0);
    setPhase("question");
    setCorrectCount(0);
    setAnsweredCount(0);
    setExplanation("");
    setHighlightPhrases([]);
    setGenerateError(null);
  }, [difficulty]);

  useEffect(() => {
    if (phase === "feedback" && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [phase]);

  const fetchExplanation = useCallback(
    async (scenario: Scenario, userAnswer: Answer, wasCorrect: boolean) => {
      setIsExplaining(true);
      try {
        const res = await fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messageBody: scenario.body,
            correctAnswer: scenario.answer,
            userAnswer,
            userWasCorrect: wasCorrect,
          }),
        });
        const data = (await res.json()) as
          | { ok: true; explanation: string; highlightPhrases: string[] }
          | { ok: false; reason?: string };

        if ("ok" in data && data.ok && data.explanation) {
          setExplanation(data.explanation);
          setHighlightPhrases(mergePhrases(scenario.highlightPhrases, data.highlightPhrases ?? []));
        } else {
          setExplanation(scenario.fallbackExplanation);
          setHighlightPhrases(scenario.highlightPhrases ?? []);
        }
      } catch {
        setExplanation(scenario.fallbackExplanation);
        setHighlightPhrases(scenario.highlightPhrases ?? []);
      } finally {
        setIsExplaining(false);
      }
    },
    [],
  );

  const handleChoice = useCallback(
    async (choice: Answer) => {
      if (!current || phase !== "question" || isExplaining) return;
      const wasCorrect = choice === current.answer;
      setLastWasCorrect(wasCorrect);
      setCorrectCount((c) => (wasCorrect ? c + 1 : c));
      setAnsweredCount((a) => a + 1);
      setPhase("feedback");
      setHighlightPhrases(mergePhrases(current.highlightPhrases, []));
      await fetchExplanation(current, choice, wasCorrect);
    },
    [current, phase, isExplaining, fetchExplanation],
  );

  const handleNext = useCallback(() => {
    if (index >= queue.length - 1) {
      setQueue((q) => shuffle(q));
      setIndex(0);
    } else {
      setIndex((i) => i + 1);
    }
    setPhase("question");
    setExplanation("");
    setHighlightPhrases([]);
  }, [index, queue.length]);

  const handleNewMessage = useCallback(async () => {
    setGenerateError(null);
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty }),
      });
      const data = (await res.json()) as
        | {
            ok: true;
            scenario: {
              body: string;
              answer: Answer;
              difficulty: Difficulty;
              highlightPhrases?: string[];
            };
          }
        | { ok: false; error?: string; detail?: string };

      if (!data.ok || !("scenario" in data)) {
        const base =
          data.ok === false ? data.error ?? "Could not add a new message." : "Error.";
        const withDetail =
          data.ok === false && data.detail ? `${base} — ${data.detail}` : base;
        setGenerateError(withDetail);
        return;
      }
      const scenario = scenarioFromGenerated(data.scenario);
      setQueue((q) => [...q, scenario]);
      setGenerateError(null);
    } catch {
      setGenerateError("Could not add a new message. Check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [difficulty]);

  const progressLabel = useMemo(() => {
    if (!current) return "";
    return `Message ${index + 1} of ${queue.length}`;
  }, [current, index, queue.length]);

  if (!current) {
    return <p className="emptyState">No messages for this level. Try the other difficulty.</p>;
  }

  return (
    <div className="appShell">
      <header className="appHeader">
        <h1 className="appTitle">SafeText</h1>
        <p className="appTagline">Text message trainer — practice spotting scams</p>
        <p className="appSubtitle">
          Read one text at a time. Tap <strong>Safe</strong> if it looks like a normal message, or{" "}
          <strong>Scam</strong> if something seems off. There is no timer—take your time.
        </p>
        <div className="difficultyRow" role="group" aria-label="Difficulty">
          <span className="difficultyLabel">Level:</span>
          <button
            type="button"
            className={`toggleBtn ${difficulty === "beginner" ? "toggleBtnActive" : ""}`}
            onClick={() => setDifficulty("beginner")}
            aria-pressed={difficulty === "beginner"}
          >
            Beginner
          </button>
          <button
            type="button"
            className={`toggleBtn ${difficulty === "intermediate" ? "toggleBtnActive" : ""}`}
            onClick={() => setDifficulty("intermediate")}
            aria-pressed={difficulty === "intermediate"}
          >
            Intermediate
          </button>
        </div>
      </header>

      <main id="main-content" className="appMain" tabIndex={-1}>
        <ScoreBar correct={correctCount} answered={answeredCount} />

        <p className="progressText" aria-live="polite">
          {progressLabel}
        </p>

        <MessageThread
          body={current.body}
          highlightPhrases={highlightPhrases}
          showHighlights={phase === "feedback"}
        />

        {phase === "feedback" && (
          <div
            className={`feedbackPanel ${lastWasCorrect ? "feedbackCorrect" : "feedbackWrong"}`}
            role="status"
            aria-live="polite"
            aria-busy={isExplaining}
          >
            <p className="feedbackTitle">
              {isExplaining
                ? "Getting a simple explanation…"
                : lastWasCorrect
                  ? "Nice work — that’s right."
                  : "Good try — here’s what to watch for."}
            </p>
            {!isExplaining && explanation && <p className="feedbackBody">{explanation}</p>}
          </div>
        )}

        {phase === "question" ? (
          <ActionButtons
            onSafe={() => void handleChoice("safe")}
            onScam={() => void handleChoice("scam")}
            disabled={isExplaining}
          />
        ) : (
          <NextButton ref={nextButtonRef} onClick={handleNext} disabled={isExplaining} />
        )}

        <div className="secondaryActions">
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() => void handleNewMessage()}
            disabled={isGenerating}
          >
            {isGenerating ? "Making a new message…" : "New practice message (AI)"}
          </button>
          {generateError && (
            <p className="generateError" role="alert">
              {generateError}
            </p>
          )}
        </div>
      </main>

      <TipsPanel />
    </div>
  );
}
