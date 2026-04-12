import type { RefObject } from "react";

type Props =
  | {
      phase: "question";
      onSafe: () => void;
      onScam: () => void;
      disabled: boolean;
    }
  | {
      phase: "feedback";
      onNext: () => void;
      disabled: boolean;
      nextButtonRef?: RefObject<HTMLButtonElement | null>;
    };

export function ActionButtons(props: Props) {
  if (props.phase === "question") {
    return (
      <div className="actionRow" role="group" aria-label="Is this message safe or a scam?">
        <button
          type="button"
          className="btn btnSafe"
          onClick={props.onSafe}
          disabled={props.disabled}
        >
          Safe
        </button>
        <button
          type="button"
          className="btn btnScam"
          onClick={props.onScam}
          disabled={props.disabled}
        >
          Scam
        </button>
      </div>
    );
  }

  return (
    <div className="actionRow actionRowSingle">
      <button
        type="button"
        className="btn btnNext"
        ref={props.nextButtonRef}
        onClick={props.onNext}
        disabled={props.disabled}
      >
        Next
      </button>
    </div>
  );
}
