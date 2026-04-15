import Link from "next/link";

export default function Home() {
  return (
    <div className="landing">
      <div className="landingGlow landingGlowA" aria-hidden />
      <div className="landingGlow landingGlowB" aria-hidden />
      <div className="landingGlow landingGlowC" aria-hidden />

      <main id="main-content" className="landingMain" tabIndex={-1}>
        <p className="landingEyebrow">Practice mode</p>
        <h1 className="landingTitle">SafeText</h1>
        <p className="landingLead">
          Learn to tell <span className="landingEmSafe">safe</span> texts from{" "}
          <span className="landingEmScam">scams</span>—large type, calm pace, and plain tips after every
          answer.
        </p>

        <div className="landingActions">
          <Link href="/game" className="landingPlay">
            <span className="landingPlayIcon" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
            Play
          </Link>
          <p className="landingHint">No account. No timer. Tap when you are ready.</p>
        </div>

        <ul className="landingFeatures" aria-label="What you get">
          <li className="landingFeature">
            <span className="landingFeatureIcon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span>Realistic message threads</span>
          </li>
          <li className="landingFeature">
            <span className="landingFeatureIcon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
            <span>Instant safe or scam feedback</span>
          </li>
          <li className="landingFeature">
            <span className="landingFeatureIcon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </span>
            <span>Simple explanations you can reread</span>
          </li>
        </ul>
      </main>

      <footer className="landingFooter">
        <p className="landingFooterText">Built for clarity and accessibility.</p>
      </footer>
    </div>
  );
}
