export type Answer = "safe" | "scam";

export type Difficulty = "beginner" | "intermediate";

export type GamePhase = "question" | "feedback";

export type Scenario = {
  id: string;
  body: string;
  answer: Answer;
  difficulty: Difficulty;
  fallbackExplanation: string;
  /** Substrings to highlight after the user answers (suspicious or notable parts). */
  highlightPhrases?: string[];
};
