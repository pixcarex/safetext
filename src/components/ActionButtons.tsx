"use client";

type Props = {
  onSafe: () => void;
  onScam: () => void;
  disabled: boolean;
};

export function ActionButtons({ onSafe, onScam, disabled }: Props) {
  return (
    <div className="actionRow" role="group" aria-label="Is this message safe or a scam?">
      <button type="button" className="btn btnSafe" onClick={onSafe} disabled={disabled}>
        Safe
      </button>
      <button type="button" className="btn btnScam" onClick={onScam} disabled={disabled}>
        Scam
      </button>
    </div>
  );
}
