type Props = {
  correct: number;
  answered: number;
};

export function ScoreBar({ correct, answered }: Props) {
  return (
    <p className="scoreBar" role="status" aria-live="polite">
      You got <strong>{correct}</strong> out of <strong>{answered}</strong> correct
      {answered === 0 ? " — pick Safe or Scam to begin." : "."}
    </p>
  );
}
