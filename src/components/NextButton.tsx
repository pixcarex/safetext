"use client";

import { forwardRef } from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
};

export const NextButton = forwardRef<HTMLButtonElement, Props>(function NextButton(
  { onClick, disabled },
  ref,
) {
  return (
    <div className="actionRow actionRowSingle">
      <button ref={ref} type="button" className="btn btnNext" onClick={onClick} disabled={disabled}>
        Next
      </button>
    </div>
  );
});
