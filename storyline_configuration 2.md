# Antigravity Dashboard Overhaul: "Growth Dilemmas" Game Loop V2

## 1. Operator Status Sidebar (Loadout)
(Keep this exactly as it is currently built in the UI)
* Location: New Delhi 📍
* Mission: MBA in Marketing & Strategy at IMI Delhi
* Stats & Loadout: Vocal Skill (No), Agility (Fuck no), Loadout (Dumbbells, protein, vibe-coding).

## 2. Content Array (`content.js`)
Replace the current storyline array with this updated structure. Pay attention to the `correctDirection` flag!

[
  {
    "type": "dilemma",
    "title": "LEVEL 1: THE WHATSAPP NIGHTMARE",
    "situation": "Agnel just graduated and started as a Civil Site Engineer. Material logistics on the construction site were a chaotic mess of lost WhatsApp messages. The team was bleeding efficiency. What did he do?",
    "leftSwipe": "Deploy Powerplay software site-wide.",
    "rightSwipe": "Accept fate as a WhatsApp admin.",
    "correctDirection": "left"
  },
  {
    "type": "story",
    "title": "THE EPIPHANY",
    "text": "Fixing that site made Agnel realize he was a digital operator, not a concrete pourer. But local financial institutions were still running on dusty paper ledgers. It was time to build something new.",
    "buttonText": "[ Continue ]"
  },
  {
    "type": "dilemma",
    "title": "LEVEL 2: THE 45-DAY BLEED",
    "situation": "Agnel founded Wade FinTech. But the B2B sales cycle was 45 days, and CAC was ₹18k. He was bleeding runway fast. What's the play?",
    "leftSwipe": "Burn cash on LinkedIn Ads.",
    "rightSwipe": "Pivot to pay-per-transaction + hunt KSUM grants.",
    "correctDirection": "right"
  },
  {
    "type": "dilemma",
    "title": "LEVEL 3: THE PROTOTYPE TRAP",
    "situation": "He secured the KSUM grant money, but the platform needed heavy development to scale. How does he allocate the capital?",
    "leftSwipe": "Keep it lean, hire a tiny core team, and build it in-house.",
    "rightSwipe": "Hire a massive dev agency and burn the grant.",
    "correctDirection": "left"
  },
  {
    "type": "story",
    "title": "THE MBA PIVOT",
    "text": "Platform built. Nidhi EIR Fellowship secured. Agnel hit pause to master high-level strategy at IMI Delhi. Soon, summer internship season arrived, offering a choice.",
    "buttonText": "[ Continue ]"
  },
  {
    "type": "dilemma",
    "title": "LEVEL 4: THE CROSSROADS",
    "situation": "Two distinct questlines open up for the summer. Where does Agnel go?",
    "leftSwipe": "A safe, predictable corporate marketing job.",
    "rightSwipe": "The absolute chaos of a YC-backed startup.",
    "correctDirection": "right"
  },
  {
    "type": "dilemma",
    "title": "LEVEL 5: THE PIPELINE CHOKE",
    "situation": "Agnel joins Zoko. The 10-person sales team maxes out at 20 calls a day because clicking through the CRM UI is soul-crushing. How does he fix the pipeline?",
    "leftSwipe": "Vibe-code an Antigravity auto-dialer over the weekend.",
    "rightSwipe": "Tell the founders to hire more reps.",
    "correctDirection": "left"
  },
  {
    "type": "story",
    "title": "MISSION ACCOMPLISHED",
    "text": "The custom dialer skyrocketed volume. But wait... rapidly testing tactics, killing dead processes, and scaling winners? Agnel has been playing the Wispr 10-7-3 growth engine this entire time.",
    "buttonText": "[ Deploy Audio Pitches ]"
  }
]

## 3. UI/UX Logic (`Dashboard.jsx`)
* **Typography:** Make the `title` field massive (e.g., `text-4xl` or `text-5xl` with a bold/heavy font weight). 
* **Swipe Logic:** Evaluate success based on the `correctDirection` property ('left' or 'right') rather than assuming right is always correct.
* **Story Cards:** If `type` is 'story', completely disable the drag/swipe mechanics. Just display the text and a standard clickable button to advance.