# Antigravity Dashboard Overhaul: "Growth Dilemmas" Game Loop

## 1. Operator Status Sidebar (Loadout)
**UI Placement:** Right side of the screen (glass-morphism sidebar, persistent during the game).
**Content:**
- **Location:** New Delhi 📍 (with a blinking green live-status dot)
- **Mission:** MBA in Marketing & Strategy at IMI Delhi
- **Stats & Loadout:**
  - Vocal Skill: Singer? No.
  - Agility: Dancer? Fuck no.
  - Current Loadout: Swinging dumbbells, eating aggressive amounts of protein, testing trivia game modules, and vibe-coding Antigravity tools at 2 AM.

## 2. Content Array (`content.js`)
Replace the current framework data with this `storyline` array:

[
  {
    "type": "dilemma",
    "situation": "Level 1: The Site Engineer. You are knee-deep in a construction site. Material logistics are a chaotic nightmare of lost WhatsApp messages and crumpled paper ledgers. The team is bleeding efficiency.",
    "optionA": "[Low Effort] Accept your fate as a glorified WhatsApp admin.",
    "optionB": "[Persuasion Check] Research online, find a dedicated construction software, and pitch the Senior Architect to deploy it site-wide.",
    "correctAnswer": "optionB"
  },
  {
    "type": "story",
    "text": "Quest Complete. Fixing that site made you realize you are a digital operator, not a concrete pourer. But a bigger boss battle looms: local financial institutions running entirely on dusty paper ledgers. It has been bugging you for years. Time to build.",
    "buttonText": "[ Spawn Wade FinTech ]"
  },
  {
    "type": "dilemma",
    "situation": "Level 2: The FinTech Grind. You launched Wade FinTech, but traditional finance clients are terrified of upfront software fees. The B2B sales cycle is a brutal 45 days. Customer Acquisition Cost is 18k. You are bleeding runway.",
    "optionA": "[Brute Force] Burn through your remaining cash on LinkedIn Ads.",
    "optionB": "[Strategic Pivot] Switch to a pay-per-transaction model and hunt government grants to drop CAC to absolute zero.",
    "correctAnswer": "optionB"
  },
  {
    "type": "dilemma",
    "situation": "Level 3: The MBA Skill Tree. You secured the KSUM grant and Nidhi EIR Fellowship. Eventually, you hit pause to master high-level strategy at IMI Delhi. Summer internship season arrives, offering two distinct questlines. Which portal do you enter?",
    "optionA": "[Safe Path] A chill, predictable corporate marketing job.",
    "optionB": "[Chaos Path] The high-velocity trenches of a YC-backed startup.",
    "correctAnswer": "optionB"
  },
  {
    "type": "dilemma",
    "situation": "Level 4: The Outbound Bottleneck. You are at Zoko, a fast-moving YC startup. The 10-person sales team is choking. Reps max out at 20 cold calls a day because manually clicking through the CRM interface is soul-crushing.",
    "optionA": "[The Boomer Fix] Tell the founders to just throw more headcount at the problem.",
    "optionB": "[The Hacker Fix] Vibe-code a custom Antigravity auto-dialer over the weekend to bypass the CRM entirely.",
    "correctAnswer": "optionB"
  },
  {
    "type": "story",
    "text": "Mission Accomplished. The auto-dialer skyrocketed lead response speed. But wait... rapidly testing tactics, killing dead processes, and scaling the absolute winners? You have been playing the Wispr 10-7-3 growth engine this entire time.",
    "buttonText": "[ Unlock Audio Pitches & Pipeline ]"
  }
]

## 3. UI/UX Logic (`Dashboard.jsx`)
- Map through the `storyline` array, showing one card at a time in the center.
- **Dilemma Cards:** Show two big interactive buttons. Flash red/shake for a failed check (wrong answer), flash green/success for passing the check.
- **Story Cards:** Render as clean lore drops with the specified continue buttons.