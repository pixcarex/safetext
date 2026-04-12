const TIPS = [
  "Never click links in texts from people or companies you do not fully trust.",
  "Banks do not ask for your password or full card number by text.",
  "Urgency (“act now,” “in 24 hours”) is a common trick to rush you.",
  "If someone claims to be family in trouble, call them on a number you already have.",
  "When in doubt, look up the real phone number on a bill or card—do not use the text’s number or link.",
];

export function TipsPanel() {
  return (
    <section className="tipsSection" aria-labelledby="tips-heading">
      <h2 id="tips-heading" className="tipsHeading">
        Quick tips
      </h2>
      <ul className="tipsList">
        {TIPS.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </section>
  );
}
