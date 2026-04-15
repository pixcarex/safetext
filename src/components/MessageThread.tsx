"use client";

import { renderWithHighlights } from "@/lib/highlight";

type Props = {
  body: string;
  highlightPhrases: string[];
  showHighlights: boolean;
  verdict?: "correct" | "wrong" | null;
};

export function MessageThread({ body, highlightPhrases, showHighlights, verdict }: Props) {
  const content =
    showHighlights && highlightPhrases.length > 0
      ? renderWithHighlights(body, highlightPhrases)
      : body;

  const frameClass =
    verdict === "correct"
      ? "phoneFrame phoneFrameVerdictCorrect"
      : verdict === "wrong"
        ? "phoneFrame phoneFrameVerdictWrong"
        : "phoneFrame";

  const bubbleClass =
    verdict === "correct"
      ? "messageBubble messageBubbleVerdictCorrect"
      : verdict === "wrong"
        ? "messageBubble messageBubbleVerdictWrong"
        : "messageBubble";

  return (
    <div className={frameClass} aria-label="Sample text message">
      <div className="phoneHeader">Messages</div>
      <div className="phoneBody">
        <div className={bubbleClass} role="article">
          <div className="messageMeta">Unknown number</div>
          <div className="messageText">{content}</div>
        </div>
      </div>
    </div>
  );
}
