"use client";

import { renderWithHighlights } from "@/lib/highlight";

type Props = {
  body: string;
  highlightPhrases: string[];
  showHighlights: boolean;
};

export function MessageThread({ body, highlightPhrases, showHighlights }: Props) {
  const content =
    showHighlights && highlightPhrases.length > 0
      ? renderWithHighlights(body, highlightPhrases)
      : body;

  return (
    <div className="phoneFrame" aria-label="Sample text message">
      <div className="phoneHeader">Messages</div>
      <div className="phoneBody">
        <div className="messageBubble" role="article">
          <div className="messageMeta">Unknown number</div>
          <div className="messageText">{content}</div>
        </div>
      </div>
    </div>
  );
}
