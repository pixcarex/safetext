import type { ReactNode } from "react";

/**
 * Wraps non-overlapping highlight ranges in <mark>. Phrase search is case-insensitive.
 */
export function renderWithHighlights(text: string, phrases: string[]): ReactNode {
  const cleaned = phrases.map((p) => p.trim()).filter(Boolean);
  if (cleaned.length === 0) return text;

  const lower = text.toLowerCase();
  const ranges: [number, number][] = [];

  for (const phrase of cleaned) {
    const pl = phrase.toLowerCase();
    let start = 0;
    while (start < text.length) {
      const i = lower.indexOf(pl, start);
      if (i === -1) break;
      ranges.push([i, i + phrase.length]);
      start = i + 1;
    }
  }

  if (ranges.length === 0) return text;

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [s, e] of ranges) {
    const last = merged[merged.length - 1];
    if (!last || s > last[1]) {
      merged.push([s, e]);
    } else {
      last[1] = Math.max(last[1], e);
    }
  }

  const parts: ReactNode[] = [];
  let pos = 0;
  merged.forEach(([s, e], idx) => {
    if (s > pos) {
      parts.push(text.slice(pos, s));
    }
    parts.push(
      <mark key={`${s}-${idx}`} className="messageHighlight">
        {text.slice(s, e)}
      </mark>,
    );
    pos = e;
  });
  if (pos < text.length) {
    parts.push(text.slice(pos));
  }
  return parts;
}
