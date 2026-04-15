"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  correct: number;
  answered: number;
};

export function ScoreBar({ correct, answered }: Props) {
  const prevAnswered = useRef(answered);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (answered > prevAnswered.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 500);
      prevAnswered.current = answered;
      return () => window.clearTimeout(t);
    }
    prevAnswered.current = answered;
  }, [answered]);

  return (
    <p className={`scoreBar ${bump ? "scoreBarBump" : ""}`} role="status" aria-live="polite">
      You got <strong>{correct}</strong> out of <strong>{answered}</strong> correct
      {answered === 0 ? " — pick Safe or Scam to begin." : "."}
    </p>
  );
}
