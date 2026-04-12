import type { Difficulty, Scenario } from "./types";

export const SCENARIOS: Scenario[] = [
  {
    id: "pkg-urgent-link",
    body: "USPS: Your package is on hold. Pay $2.99 now or it will be returned. Track: usps-pack-help.xyz/claim",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Delivery companies do not usually text you a link to pay a small fee to release a package. Odd web addresses and pressure to act fast are common scam signs. When unsure, go to the real carrier website or call the number on your receipt.",
    highlightPhrases: ["Pay $2.99 now", "usps-pack-help.xyz"],
  },
  {
    id: "bank-verify",
    body: "Sunrise Bank ALERT: Unusual login. Verify your account now: bit.ly/sunrise-secure-login",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Banks almost never ask you to log in through a random shortened link in a text. They usually ask you to use their official app or website you already trust. If you are worried, call the number on the back of your card—not the text.",
    highlightPhrases: ["Verify your account now", "bit.ly/"],
  },
  {
    id: "grandchild-urgent",
    body: "Grandma it's me, I lost my phone. I'm in trouble—please wire money today, don't tell mom. I'll explain later.",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "This is a classic “grandchild in trouble” scam: urgent tone, vague details, and secrecy. A real family member can usually answer a question only you both know, or you can call a known number. Slow down and check before sending money.",
    highlightPhrases: ["wire money today", "don't tell mom"],
  },
  {
    id: "prize-winner",
    body: "CONGRATS! You won $500 from MegaMart Rewards! Click here to claim before midnight: rewardz-mega.com/prize",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Unexpected prizes that ask you to click a link quickly are often fake. Real contests you entered usually come from a name you recognize and do not rush you with a midnight deadline. Do not click—delete or check through the store’s official site.",
    highlightPhrases: ["You won $500", "before midnight", "rewardz-mega.com"],
  },
  {
    id: "tax-refund",
    body: "IRS: Final notice—your tax refund is pending. Confirm your direct deposit within 24 hours: irs-refund-portal.co/submit",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "The IRS does not start contact about refunds with a text and a link. Refund status is checked through official IRS tools or your tax preparer. “Final notice” and a tight deadline are pressure tricks.",
    highlightPhrases: ["within 24 hours", "irs-refund-portal.co"],
  },
  {
    id: "amazon-order",
    body: "Amazon: Unauthorized order for $999 MacBook. If this wasn't you, cancel here: amzn-order-resolve.net/cancel",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Scammers fake big purchases to scare you into clicking. Check orders in your real Amazon app or website—not a link in a text. The web address here is not Amazon’s official domain.",
    highlightPhrases: ["$999", "amzn-order-resolve.net"],
  },
  {
    id: "friend-coffee",
    body: "Hi! It's Helen. Are we still on for coffee Thursday at 10? I can pick you up if easier.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "This sounds like a normal, specific message from someone you know, with no link and no demand for money or passwords. It is still wise to save trusted contacts so you recognize their numbers.",
    highlightPhrases: [],
  },
  {
    id: "carrier-stop",
    body: "Acme Wireless: Your bill reminder. Reply STOP to opt out of reminders.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Many real services send short reminders and tell you how to stop them. There is no link asking for a password or payment. If you did not expect texts from this company, you can ignore or reply STOP.",
    highlightPhrases: ["Reply STOP"],
  },
  {
    id: "2fa-code",
    body: "Your RiverBooks login code is 582194. Do not share this code with anyone.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "A one-time login code with no link and a warning not to share it matches how many real sites work. Never give this code to a caller or another person—only type it into the site or app that is asking.",
    highlightPhrases: ["Do not share this code"],
  },
  {
    id: "dentist-reminder",
    body: "Bright Smile Dental: Reminder—cleaning Tue 4/15 at 2:00 PM. Reply YES to confirm or call our office.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Appointment reminders from a business you use are common. They give a date and time and a simple way to respond. There is no urgent payment link or request for your bank password.",
    highlightPhrases: [],
  },
  {
    id: "gov-fine",
    body: "Department of Motor Safety: Unpaid traffic fine. Pay within 48 hours to avoid license suspension: dmv-fine-pay.io/ticket",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Government fines are rarely collected only through a random text link. Names that sound official plus fear of losing your license are red flags. Look up your real DMV or court contact yourself.",
    highlightPhrases: ["within 48 hours", "license suspension", "dmv-fine-pay.io"],
  },
  {
    id: "crypto-invest",
    body: "Hey! Quick tip—I'm up 40% this week on NovaCoin. Want the group invite? Limited spots.",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Texts pushing fast investment gains and “limited spots” are often scams or high-risk schemes. Legitimate investing does not need urgency from a stranger. Ignore offers that promise easy money.",
    highlightPhrases: ["up 40%", "Limited spots"],
  },
];

export function scenariosForDifficulty(difficulty: Difficulty): Scenario[] {
  return SCENARIOS.filter((s) => s.difficulty === difficulty);
}
