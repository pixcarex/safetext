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
  {
    id: "streamverse-billing",
    body: "StreamVerse: Payment failed. Update your card in 2 hours or your account closes: streamverse-bill.example.net/update",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Real streaming services give you time and let you sign in through their app or website you already use. A strange domain and a two-hour deadline are pressure tactics. Open the app yourself—never the link in the text.",
    highlightPhrases: ["in 2 hours", "streamverse-bill.example.net"],
  },
  {
    id: "zelle-unknown-refund",
    body: "Zelle Alert: $500 sent to you by UNKNOWN. Tap to decline or refund: zelle-refund-portal.example.com",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Payment apps do not ask you to “decline” money through a random link. Scammers use fake alerts to steal login details. Use only your official banking app.",
    highlightPhrases: ["UNKNOWN", "zelle-refund-portal.example.com"],
  },
  {
    id: "apple-id-lock-fake",
    body: "Apple ID Locked. Verify within 30 min or lose photos & contacts: appleid-secure-check.example.net",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Apple does not text you a countdown link from a random address. If you are worried, sign in through Settings on your device or apple.com in a browser you type yourself.",
    highlightPhrases: ["within 30 min", "appleid-secure-check.example.net"],
  },
  {
    id: "survey-gift-card",
    body: "You’re selected! $100 gift card for a 2-min survey. Start now: survey-reward-club.example.com/go",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Unsolicited “you won” or “you’re selected” texts with a survey link are usually after your personal information. Real stores do not pay everyone $100 by text link.",
    highlightPhrases: ["$100 gift card", "survey-reward-club.example.com"],
  },
  {
    id: "fedex-customs-fee",
    body: "FedEx: Package held—$3.25 customs fee due today. Pay: tinyurl.example/fedex-hold-48291",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Carriers do not normally collect tiny customs fees by text with a shortened link. Check tracking on the carrier’s real site using the tracking number from your receipt or order email.",
    highlightPhrases: ["due today", "tinyurl.example"],
  },
  {
    id: "medicare-card-renew",
    body: "Medicare Help Desk: Your card expires soon. Confirm info here or benefits stop: medicare-card-now.example.org",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Medicare does not threaten to stop benefits by text with a link. Hang up on callers and delete texts—use medicare.gov or your local SHIP counselor if you have questions.",
    highlightPhrases: ["benefits stop", "medicare-card-now.example.org"],
  },
  {
    id: "court-fine-text",
    body: "County Court: Failure to appear—pay $350 now to clear warrant: county-court-pay.example.com",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Courts send official mail; they do not clear “warrants” by text with a payment link. Fear words like “warrant” are common in scams. Call the courthouse using a number you look up yourself.",
    highlightPhrases: ["pay $350 now", "county-court-pay.example.com"],
  },
  {
    id: "techmart-refund",
    body: "TechMart Refund Dept: $299 owed to you. Expires tonight—claim: techmart-refund-desk.example.net",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Refunds go back to the card or account you paid with. A random “refund department” link is almost always phishing. Contact the store through their official site.",
    highlightPhrases: ["Expires tonight", "techmart-refund-desk.example.net"],
  },
  {
    id: "cashapp-bonus",
    body: "CashApp Bonus: You unlocked $75! Deposit in 1 hour: cashapp-bonus-deposit.example.com",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Cash App does not send surprise bonus links by text. These links steal login or bank details. Only use the real app on your phone.",
    highlightPhrases: ["$75", "cashapp-bonus-deposit.example.com"],
  },
  {
    id: "wifi-disconnect-scam",
    body: "HomeNet Wi‑Fi: Suspicious devices detected. Re-enter password: homenet-router-login.example.net",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Your internet provider does not ask for your Wi‑Fi password by text. This is a trick to hijack your network or accounts. If concerned, call your provider’s real support number from your bill.",
    highlightPhrases: ["Re-enter password", "homenet-router-login.example.net"],
  },
  {
    id: "neighbor-cookies",
    body: "Hi—it's Pat from next door. Left some muffins on your steps in the tin. No rush to return it.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Friendly, specific neighbor notes with no link, no money request, and no secrecy are usually fine. If you do not recognize the number, a quick call can confirm.",
    highlightPhrases: [],
  },
  {
    id: "library-hold",
    body: "Oakridge Library: Your hold “Large Print Mysteries” is ready. Pick up by Sat 6pm. Questions? Call our main desk.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Libraries often text when holds are ready, with a clear deadline and a normal way to get help. No payment link or password request is a good sign.",
    highlightPhrases: [],
  },
  {
    id: "pharmacy-ready",
    body: "QuickFill Pharmacy: 2 prescriptions ready for Jane D. Drive-thru open till 8 tonight.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Pharmacy pickup texts are common and specific. There is no urgent payment link or request for your Social Security number.",
    highlightPhrases: [],
  },
  {
    id: "running-late-spouse",
    body: "Running 15 min late—accident on River Rd. See you at the diner, I’ll grab our usual booth.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "A casual update with places and times you recognize, and no links, matches normal texting. Save family numbers when you can.",
    highlightPhrases: [],
  },
  {
    id: "hoa-trash-day",
    body: "Maple Court HOA: Trash pickup moves to Wednesday this week (holiday). Recycling stays Thursday.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Neighborhood or HOA reminders are often simple announcements. No payment or login is requested.",
    highlightPhrases: [],
  },
  {
    id: "clinic-reschedule",
    body: "Lakeside Clinic: We need to move Thu’s appointment to 3:30 instead of 2. Reply OK or call us to pick another time.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Medical offices reschedule by text with a clear change and a way to respond. They do not ask for gift cards or bank passwords.",
    highlightPhrases: [],
  },
  {
    id: "mom-parking",
    body: "Mom—I’m in the lot, north side by the garden center entrance. Silver jacket if you’re looking for me.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Concrete meet-up details with no demands for money or codes are typical family texts. If the tone ever feels off, call the person on a known number.",
    highlightPhrases: [],
  },
  {
    id: "gift-card-boss",
    body: "It’s Dana (I’m in meetings). Need 5 $100 gift cards for a client gift—buy now, text photos of codes, I’ll Venmo you back after.",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Gift-card rushes from a “boss” or relative are a top scam. Real workplaces do not ask you to buy cards and text codes. Call the person on a number you already have—do not reply to this thread only.",
    highlightPhrases: ["gift cards", "text photos of codes"],
  },
  {
    id: "wrong-number-flirt",
    body: "Wrong number lol—but you sound nice. Are you single? I’m new in town, maybe coffee?",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Strangers who pivot from “wrong number” to flattery often lead to romance scams or links later. Do not engage; block the number.",
    highlightPhrases: ["Wrong number", "maybe coffee"],
  },
  {
    id: "refi-upload-id",
    body: "HomeLoans Quick: Pre-approved at 4.9%. Upload ID + SSN to finish today: homeloan-upload-portal.example.io",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Mortgage lenders do not collect your Social Security number through a random text link. Apply only through a lender you chose and verified.",
    highlightPhrases: ["Upload ID + SSN", "homeloan-upload-portal.example.io"],
  },
  {
    id: "airline-points-expire",
    body: "AirSwift: Miles expire at midnight. Keep them active here: airswift-mile-save.example.net",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Airlines send notices through email or your account dashboard, not a midnight panic text. Log in through the airline’s official app or typed URL.",
    highlightPhrases: ["expire at midnight", "airswift-mile-save.example.net"],
  },
  {
    id: "utility-shutoff",
    body: "CityWater: Shutoff scheduled for non-payment in 4 hours. Pay now: citywater-quickpay.example.com",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Utilities send paper or email notices first; they do not demand immediate payment only by text link. Call the number on your utility bill if you are worried.",
    highlightPhrases: ["in 4 hours", "citywater-quickpay.example.com"],
  },
  {
    id: "student-loan-forgive",
    body: "StudentAid Update: Forgiveness window closes Friday. Start application: aid-forgive-fast.example.org",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Federal student aid information is at studentaid.gov. Scammers copy official-sounding names and tight deadlines. Never start from a text link.",
    highlightPhrases: ["closes Friday", "aid-forgive-fast.example.org"],
  },
  {
    id: "marketplace-overpay",
    body: "Still have the dresser? I’ll send a cashier’s check for $50 extra—my mover picks up. Need your address to mail today.",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Overpayment and cashier’s check tricks bounce later, after you have sent money or goods. Sell locally for cash or verified digital payment through the platform only.",
    highlightPhrases: ["cashier’s check", "$50 extra"],
  },
  {
    id: "package-forward-gig",
    body: "Logistics Gig: Earn $250/week reshipping boxes from home. Apply: easy-reship-jobs.example.com",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Reshipping packages can mean handling stolen goods or money laundering. Legitimate jobs do not recruit by vague text with a random link.",
    highlightPhrases: ["reshipping", "easy-reship-jobs.example.com"],
  },
  {
    id: "charity-disaster",
    body: "URGENT: Help storm victims tonight. 100% goes to aid—donate: disaster-relief-now.example.org/give",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Disaster charity scams rush you to donate through unknown links. Give through charities you research at charitynavigator.org or similar, or well-known organizations’ official sites.",
    highlightPhrases: ["URGENT", "disaster-relief-now.example.org"],
  },
  {
    id: "social-security-suspend",
    body: "SSA Notice: Your SSN suspended due to suspicious activity. Call 888-555-0199 now or benefits will stop.",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "The Social Security Administration does not suspend SSNs by text. Scammers spoof urgency and fake numbers. If worried, contact SSA through ssa.gov.",
    highlightPhrases: ["SSN suspended", "benefits will stop"],
  },
  {
    id: "cheese-booth-venmo",
    body: "Hey—Chris from the farmers market cheese booth. Pretty sure I Venmo’d you $18 by mistake yesterday—can you send it back?",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "A vague “mistaken” payment story from someone you do not clearly remember can be a setup. Check your real payment app for transactions; never send money to a stranger’s new request.",
    highlightPhrases: ["by mistake", "send it back"],
  },
  {
    id: "school-half-day",
    body: "Lincoln Middle School: Reminder—half day Friday. Buses depart 11:45. Lunch available bag style.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Schools send schedule reminders with times and logistics. There is no payment link or request for personal banking info.",
    highlightPhrases: [],
  },
  {
    id: "flyaway-checkin",
    body: "FlyAway Airlines: Online check-in is open for flight FA1842 Thu. Seat 14C. Airport parking is full—arrive early.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Airline texts often repeat flight numbers and seats you booked. They do not ask you to wire money or share passwords. Confirm in your airline app if anything looks off.",
    highlightPhrases: [],
  },
  {
    id: "senior-center-snow",
    body: "Riverside Senior Center: Lunch program canceled Tue due to weather. Frozen meal delivery Wed as usual.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Community programs send practical weather updates. No sketchy link or payment demand appears here.",
    highlightPhrases: [],
  },
  {
    id: "insurance-claim-approved",
    body: "HealthPlus Insurance: Claim #H48219 approved. Your explanation of benefits is being mailed to your home address on file.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Insurers send claim updates by text or email with reference numbers and no “pay here” link. If you were not expecting a claim, call the member number on your card.",
    highlightPhrases: [],
  },
  {
    id: "vet-pickup",
    body: "Paws & Whiskers Vet: Milo’s dental cleaning is done. He’s groggy—pickup any time after 4. Front desk has care sheet.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Vet updates describe your pet and pickup times. They do not ask for gift cards or bank transfers in these messages.",
    highlightPhrases: [],
  },
  {
    id: "church-potluck",
    body: "St. Mark’s: Potluck Sunday after service. No need to reply—sign-up sheet is on the welcome table.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Church announcements are informational. A note that you do not need to reply reduces pressure—unlike scams that demand instant action.",
    highlightPhrases: [],
  },
  {
    id: "transit-fare-card",
    body: "Metro Transit: Your reduced senior fare card renews next month. Paper forms at any station kiosk—no fee for renewal.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Transit agencies explain renewal in plain language and point to in-person options. They do not demand instant payment through a random link here.",
    highlightPhrases: [],
  },
  {
    id: "password-reset-you",
    body: "RiverBooks: Password reset requested for your account. If this wasn’t you, ignore this message—your password is unchanged.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Legitimate reset notices often say “ignore if not you” and do not include a clickable link in the text itself—or they tell you to go to the app. Never share codes with callers.",
    highlightPhrases: ["ignore this message"],
  },
  {
    id: "evite-rsvp",
    body: "You’re invited: Ruth’s 70th birthday brunch, May 3 at 11 at The Garden Room. RSVP on the paper invite or call Ruth’s daughter Amy.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "Personal invitations with a real event, date, and a human contact path are normal. No urgent payment or login is requested.",
    highlightPhrases: [],
  },
  {
    id: "paypal-fake-login",
    body: "PayGuard: Unusual sign-in from Nigeria. Confirm it’s you: payguard-secure-login.example.net",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Payment services alert you in their app or email from a known address. A generic name plus a login link in a text is very often phishing. Open PayPal or your bank only from your bookmarks.",
    highlightPhrases: ["Unusual sign-in", "payguard-secure-login.example.net"],
  },
  {
    id: "instagram-blue-badge",
    body: "IG Verified: Your blue badge will be removed in 1 hour unless you confirm: insta-badge-confirm.example.com",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Social networks do not threaten badge removal by text with a strange link. Use the official app’s settings if you care about verification.",
    highlightPhrases: ["in 1 hour", "insta-badge-confirm.example.com"],
  },
  {
    id: "warranty-vehicle",
    body: "Vehicle Services Dept: Your auto warranty is expiring—call now to reinstate coverage: 888-555-0142",
    answer: "scam",
    difficulty: "beginner",
    fallbackExplanation:
      "Robo-style warranty texts are usually sales or scams, not your real dealer. Check paperwork from when you bought the car if you are curious about coverage.",
    highlightPhrases: ["warranty is expiring", "call now"],
  },
  {
    id: "venmo-request-stranger",
    body: "Venmo: @QuickMike sent you a request for $640 ‘rent deposit’—tap to pay or it auto-charges in 1 hr",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Payment apps do not auto-charge random requests from strangers. Decline unknown requests in the app and turn on privacy settings so only friends can request money.",
    highlightPhrases: ["auto-charges", "$640"],
  },
  {
    id: "linkedin-job-fee",
    body: "CareerBoost: You’re shortlisted! Pay $49 background check fee to schedule interview: careerboost-pay.example.com",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Real employers do not charge you a fee to interview. Up-front payments for “background checks” to strangers are a common job scam.",
    highlightPhrases: ["$49", "careerboost-pay.example.com"],
  },
  {
    id: "relative-surgery",
    body: "Aunt Linda here—new phone. In ER, need $400 for meds, can you Zelle this number? Don’t worry anyone.",
    answer: "scam",
    difficulty: "intermediate",
    fallbackExplanation:
      "Family emergency texts that ask for money to a new number and say “don’t tell” are very often fake. Call a relative you trust on their old number.",
    highlightPhrases: ["new phone", "Don’t worry anyone"],
  },
  {
    id: "wifi-cafe-login",
    body: "Sunrise Café guest Wi‑Fi password today is: croissant2026 (lower case). Enjoy your visit!",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Businesses sometimes share Wi‑Fi passwords by text or on a receipt. There is no request to log into a bank or pay a fee.",
    highlightPhrases: [],
  },
  {
    id: "rideshare-plate",
    body: "Your ride is 3 min away—silver Camry, plate 4JKM882. Driver is Marco.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Ride apps send car color, plate, and driver name so you get in the right vehicle. No link asks for your password.",
    highlightPhrases: [],
  },
  {
    id: "grocery-substitution",
    body: "FreshCart: We’re out of 2% milk—okay to substitute skim or oat? Reply 1 for skim, 2 for oat, 3 for refund.",
    answer: "safe",
    difficulty: "beginner",
    fallbackExplanation:
      "Grocery delivery texts about substitutions are common and give simple choices. They do not ask for your card number by text.",
    highlightPhrases: [],
  },
  {
    id: "photo-share-family",
    body: "Sent a few pics from Easter on Google Photos—same album link as always. Let me know if you can’t open them.",
    answer: "safe",
    difficulty: "intermediate",
    fallbackExplanation:
      "If you already share photos with this person and they mention a familiar album, it can be fine—still avoid opening surprise links from unknown numbers.",
    highlightPhrases: [],
  },
];

export function scenariosForDifficulty(difficulty: Difficulty): Scenario[] {
  return SCENARIOS.filter((s) => s.difficulty === difficulty);
}

/** Prefer a scenario not already in the queue; if the queue already covers the whole pool, pick any at random. */
export function pickExtraScenario(difficulty: Difficulty, queue: Scenario[]): Scenario {
  const pool = scenariosForDifficulty(difficulty);
  const used = new Set(queue.map((s) => s.id));
  const unused = pool.filter((s) => !used.has(s.id));
  const choices = unused.length > 0 ? unused : pool;
  return choices[Math.floor(Math.random() * choices.length)]!;
}
