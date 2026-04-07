import { useState, useEffect, useRef } from "react";

const PHASES = [
  { id: 1, title: "OBSERVE", subtitle: "See what others miss", days: "Day 1-21", icon: "\u{1F441}\uFE0F", description: "Train your brain to notice patterns, assumptions, and hidden details in everyday situations.", mnemonic: "O.P.E.N. \u2014 Observe, Pause, Examine, Note", gradient: { dark: "linear-gradient(135deg, #1a1034 0%, #2d1b69 50%, #0f2027 100%)", light: "linear-gradient(135deg, #f0e6ff 0%, #e8deff 50%, #f5f0ff 100%)" }, accent: { dark: "#c084fc", light: "#7c3aed" }, glow: "rgba(192, 132, 252, 0.3)" },
  { id: 2, title: "QUESTION", subtitle: "Ask what nobody asks", days: "Day 22-42", icon: "\u2753", description: "Develop the habit of asking the right questions before jumping to answers.", mnemonic: "W.H.Y.S. \u2014 What, How, Why, So-what", gradient: { dark: "linear-gradient(135deg, #0f2027 0%, #0a2f4e 50%, #1a0a2e 100%)", light: "linear-gradient(135deg, #e6f4f8 0%, #d5eef8 50%, #e8f6ff 100%)" }, accent: { dark: "#22d3ee", light: "#0891b2" }, glow: "rgba(34, 211, 238, 0.3)" },
  { id: 3, title: "ANALYZE", subtitle: "Break it down to build it up", days: "Day 43-63", icon: "\uD83D\uDD2C", description: "Learn frameworks to dissect problems, spot logical fallacies, and evaluate evidence.", mnemonic: "S.L.I.C.E. \u2014 Separate, List, Inspect, Compare, Evaluate", gradient: { dark: "linear-gradient(135deg, #0a2e1a 0%, #134e2a 50%, #0f2027 100%)", light: "linear-gradient(135deg, #e6f8ef 0%, #d5f0e2 50%, #e8fff2 100%)" }, accent: { dark: "#4ade80", light: "#16a34a" }, glow: "rgba(74, 222, 128, 0.3)" },
  { id: 4, title: "DECIDE", subtitle: "Choose with clarity", days: "Day 64-77", icon: "\u2696\uFE0F", description: "Build decision-making muscles using mental models and trade-off thinking.", mnemonic: "C.L.E.A.R. \u2014 Criteria, List options, Evaluate, Act, Review", gradient: { dark: "linear-gradient(135deg, #2e1a0a 0%, #4e2a13 50%, #27200f 100%)", light: "linear-gradient(135deg, #fff4e6 0%, #ffe8cc 50%, #fff0d5 100%)" }, accent: { dark: "#fb923c", light: "#ea580c" }, glow: "rgba(251, 146, 60, 0.3)" },
  { id: 5, title: "COMMUNICATE", subtitle: "Think clearly, speak powerfully", days: "Day 78-90", icon: "\uD83C\uDFAF", description: "Turn your sharp thinking into persuasive communication at work and life.", mnemonic: "S.T.A.R.K. \u2014 Situation, Thought, Analysis, Result, Key takeaway", gradient: { dark: "linear-gradient(135deg, #2e0a1a 0%, #4e1333 50%, #1a0a2e 100%)", light: "linear-gradient(135deg, #ffe6f0 0%, #ffd5e5 50%, #ffe8f5 100%)" }, accent: { dark: "#f472b6", light: "#db2777" }, glow: "rgba(244, 114, 182, 0.3)" },
];

const ALL_LESSONS = [
  { day: 1, phase: 1, type: "bite", title: "The Invisible Gorilla", content: "Today's lesson: You miss what you're not looking for. At BHN, when you review a PR, you look for bugs. But do you notice the architectural assumptions? Today, read ONE piece of code and write down 3 things you ASSUMED but didn't verify.", workChallenge: "Pick any recent PR in schemes-api. List 3 assumptions the author made that aren't commented or documented.", lifeChallenge: "On your evening ride, count 5 things you've never noticed on your regular route.", memoryTrick: "Think of your eyes like a camera lens. Today you're switching from AUTO to MANUAL focus." },
  { day: 2, phase: 1, type: "bite", title: "First vs Second Look", content: "Your first reaction is your TRAINED reaction, not your BEST reaction. Today, practice the '5-second pause' before every opinion you form.", workChallenge: "When you see a Slack message that triggers an instant reaction, write your first thought down, wait 5 seconds, then write your second thought. Compare.", lifeChallenge: "When someone says something you disagree with today, pause 5 seconds before responding. Notice what changes.", memoryTrick: "First thought = Autopilot. Second thought = Pilot. You want to FLY the plane, not let habits fly it." },
  { day: 3, phase: 1, type: "bite", title: "The Data vs Story Trap", content: "Humans are wired for stories, not statistics. At BHN, someone says 'deployments are always failing.' But what does the data say? Always separate the NARRATIVE from the NUMBERS.", workChallenge: "Pick one complaint you've heard recently at work (slow builds, flaky tests, etc.). Find the actual data. Is the story accurate?", lifeChallenge: "Think of one belief you hold about yourself ('I'm bad at X'). Find 3 pieces of evidence that contradict it.", memoryTrick: "S.N.A.P. \u2014 Story is Not Always Proof." },
  { day: 4, phase: 1, type: "bite", title: "Zoom In, Zoom Out", content: "Critical thinkers constantly shift between detail and big picture. Like using Google Maps \u2014 street view AND satellite view tell different stories.", workChallenge: "Pick one bug you fixed recently. Zoom in: what caused it? Zoom out: what systemic issue allowed it to exist?", lifeChallenge: "Think about one small daily habit. Zoom out: where is this habit taking you in 5 years?", memoryTrick: "Be a drone pilot \u2014 hover low for details, fly high for perspective." },
  { day: 5, phase: 1, type: "bite", title: "The Confirmation Bias Detector", content: "You naturally seek information that confirms what you already believe. Today's mission: actively seek information that CHALLENGES your current view.", workChallenge: "Think about your Email Centralization approach. Write down 2 reasons why someone might argue AGAINST your chosen architecture.", lifeChallenge: "Read one article from someone whose views you usually disagree with. Note one valid point they make.", memoryTrick: "Your brain is a magnet for 'YES' signals. Today, hunt for 'NO' signals instead." },
  { day: 6, phase: 1, type: "deep", title: "Mental Models: Map vs Territory", content: "Deep dive into your first mental model. Every plan, every architecture diagram, every assumption is a MAP of reality, not reality itself. The gap between map and territory is where bugs, failures, and surprises live.", workChallenge: "Draw your mental model of how email flows through BHN systems today. Then trace one actual email. Where does your map differ from reality?", lifeChallenge: "Write down your 'map' of what a perfect day looks like. Then track your actual day. Where's the gap?", memoryTrick: "M.A.P. \u2014 Model Approximates, never Perfectly." },
  { day: 7, phase: 1, type: "practice", title: "Week 1 Reflection & Practice", content: "Time to consolidate. Review your notes from Day 1-6. What pattern do you see in YOUR thinking?", workChallenge: "Write a 3-line summary: 'This week I noticed I tend to ___, but I should ___. My biggest blind spot is ___.'", lifeChallenge: "Share one insight from this week with someone \u2014 teaching cements learning.", memoryTrick: "Reflection is the GYM for your brain. No reflection = no muscle growth." },
  { day: 8, phase: 1, type: "bite", title: "Signal vs Noise", content: "In a world drowning in information, the skill isn't finding MORE data \u2014 it's filtering what matters. Like New Relic dashboards: you built them to separate signal from noise in error logs.", workChallenge: "Look at your Slack channels. Identify 3 channels that are mostly noise for your role. Mute or reduce notifications.", lifeChallenge: "Check your phone screen time. Identify the top 'noise' app. Set a 15-min daily limit.", memoryTrick: "S.I.F.T. \u2014 Signal Is Found by Trimming." },
  { day: 9, phase: 1, type: "bite", title: "The Unseen Stakeholder", content: "Every decision has stakeholders you didn't think about. In code, it's the developer who maintains it after you. In life, it's future-you.", workChallenge: "For your next code change, list 3 people (beyond your team) who might be affected.", lifeChallenge: "Before your next purchase, ask: would '35-year-old Vishwanath' thank me for this?", memoryTrick: "Every room has an EMPTY CHAIR \u2014 that's the person you forgot to consider." },
  { day: 10, phase: 1, type: "bite", title: "Pattern Recognition", content: "Expert critical thinkers see patterns across unrelated domains. Your ECS deployment failures follow the same pattern as traffic jams \u2014 cascading failures from a single bottleneck.", workChallenge: "Find a pattern in your last 3 production incidents. What's the common thread?", lifeChallenge: "Think of 3 arguments you've had. What's YOUR pattern in how you react?", memoryTrick: "Patterns are nature's cheat codes. Spot one, solve many." },
  { day: 11, phase: 1, type: "bite", title: "The Ladder of Inference", content: "You see data \u2192 select what to notice \u2192 add meaning \u2192 make assumptions \u2192 draw conclusions \u2192 take action. Most arguments happen because people are on different RUNGS.", workChallenge: "Next time you disagree with a colleague, ask: 'What data are you looking at?' \u2014 not 'Why are you wrong?'", lifeChallenge: "When you form a judgment about someone today, climb DOWN the ladder. What data actually supports it?", memoryTrick: "Don't argue conclusions. Compare RUNGS." },
  { day: 12, phase: 1, type: "bite", title: "Second-Order Thinking", content: "First-order: What happens if I do this? Second-order: And then what? Every BHN architectural decision has ripple effects.", workChallenge: "For the SQS email pipeline, list 3 second-order effects of centralizing emails.", lifeChallenge: "Think about one goal you're chasing. What's the second-order effect of achieving it?", memoryTrick: "Chess players win by thinking 3 moves ahead. You're learning move #2 today." },
  { day: 13, phase: 1, type: "deep", title: "Inversion: Think Backwards", content: "Instead of asking 'How do I succeed?', ask 'How would I guarantee failure?' Then avoid those things. Charlie Munger's favorite technique.", workChallenge: "How would you GUARANTEE your email centralization POC fails? List 5 ways. Now ensure none are happening.", lifeChallenge: "How would you guarantee you DON'T get a 5-star rating? Write 5 things. Are you doing any of them?", memoryTrick: "INVERT, ALWAYS INVERT. If you can't solve forward, solve backward." },
  { day: 14, phase: 1, type: "practice", title: "Week 2: The Observation Journal", content: "Start a mini observation journal. For the next 7 days, write ONE observation daily \u2014 something you noticed that others didn't.", workChallenge: "Create a note titled 'Observer Log'. One entry per day.", lifeChallenge: "Today: observe an interaction between two people. What did body language say that words didn't?", memoryTrick: "Journaling is thinking on paper. No paper, no progress." },
  { day: 15, phase: 1, type: "bite", title: "Survivorship Bias", content: "We study successes and ignore failures. Every 'how I got promoted' post ignores the 100 people who did the same things and didn't.", workChallenge: "Think of a 'best practice' at BHN. Has anyone studied where it DIDN'T work?", lifeChallenge: "Advice you follow from a successful person \u2014 would it change if you heard from someone it failed for?", memoryTrick: "Study the planes that DIDN'T return, not the ones that did." },
  { day: 16, phase: 1, type: "bite", title: "The Curse of Knowledge", content: "Once you know something, you can't imagine NOT knowing it. This is why senior engineers write docs juniors can't follow.", workChallenge: "Show one piece of your documentation to someone outside your team. Can they understand it?", lifeChallenge: "Explain your job to someone non-technical in 2 sentences.", memoryTrick: "The expert's enemy isn't ignorance \u2014 it's FORGETTING what ignorance felt like." },
  { day: 17, phase: 1, type: "bite", title: "Correlation vs Causation", content: "Ice cream sales and drowning deaths both rise in summer. Silly, but you make this mistake in subtler ways daily.", workChallenge: "A metric improved after your last deployment. Did YOUR change cause it, or something else?", lifeChallenge: "You felt productive today. Was it coffee, sleep, routine, or just mood?", memoryTrick: "Just because two things dance together doesn't mean one leads." },
  { day: 18, phase: 1, type: "bite", title: "Occam's Razor", content: "The simplest explanation that fits the facts is usually correct. Start simple before building conspiracy theories.", workChallenge: "Next deployment failure: check config, permissions, typos FIRST.", lifeChallenge: "No reply to your message? Simplest explanation: they're busy.", memoryTrick: "Simple first, complex only if needed." },
  { day: 19, phase: 1, type: "bite", title: "The Halo Effect", content: "When someone is good at ONE thing, we assume they're good at EVERYTHING. A brilliant coder isn't automatically a good architect.", workChallenge: "Someone you admire at BHN: where should you NOT follow their advice blindly?", lifeChallenge: "A YouTuber you follow: in what domain are they NOT qualified?", memoryTrick: "A HALO makes you see light everywhere. But even angels have blind spots." },
  { day: 20, phase: 1, type: "deep", title: "Systems Thinking", content: "Nothing exists in isolation. Email centralization affects monitoring, on-call, developer experience, hiring.", workChallenge: "Draw a systems map of your email centralization project. Include 8+ connected elements.", lifeChallenge: "Map your 'energy system'. What gives energy? What drains it?", memoryTrick: "Pull one thread, the whole sweater shifts." },
  { day: 21, phase: 1, type: "practice", title: "Phase 1 Graduation", content: "21 days of OBSERVATION training. Write your graduation report.", workChallenge: "Write a 1-page 'Observer's Report' \u2014 top 5 observations, biggest bias, one new habit.", lifeChallenge: "Share your #1 insight. Great content for Vishwa Motovlogs!", memoryTrick: "Phase 1 complete. AUTO-eyes upgraded to MANUAL-eyes." },
  { day: 22, phase: 2, type: "bite", title: "The Power of 'Why' x5", content: "Toyota's technique: ask WHY five times to find root cause. Surface answers are symptoms.", workChallenge: "Last production bug: ask WHY 5 times. Each answer becomes the next question.", lifeChallenge: "Something bothering you: ask WHY 5 times. The real reason hides deep.", memoryTrick: "5 WHYs = drilling for oil. Gold is never on the surface." },
  { day: 23, phase: 2, type: "bite", title: "Questions > Answers", content: "A good question opens 10 doors. A premature answer closes 9.", workChallenge: "Next meeting: ask 2 questions for every 1 statement.", lifeChallenge: "Next conversation: are you asking to understand, or to respond?", memoryTrick: "Answers are KEYS. Questions are DOORS." },
  { day: 24, phase: 2, type: "bite", title: "The Pre-Mortem Question", content: "Imagine it's 6 months later and this failed spectacularly. What went wrong?", workChallenge: "Pre-mortem on your email centralization POC. Write 5 failure scenarios.", lifeChallenge: "Pick a goal. Imagine December 2026 and you missed it. What happened?", memoryTrick: "POST-mortem studies the dead. PRE-mortem keeps things alive." },
  { day: 25, phase: 2, type: "bite", title: "Permission to Challenge", content: "'Can I push back on that?' gets 10x better reception than 'I disagree.'", workChallenge: "Next code review: frame your challenge as a question, not a statement.", lifeChallenge: "Try: 'Can I share a different perspective?' Notice the difference.", memoryTrick: "A question mark HOOKS. A period pushes away." },
  { day: 26, phase: 2, type: "bite", title: "'What Would Have to Be True?'", content: "Instead of debating, ask this question. Shifts from argument to analysis.", workChallenge: "Next doubtful tech approach: ask 'What would have to be true for this to work?'", lifeChallenge: "An impossible dream: write 5 conditions that would make it possible.", memoryTrick: "The question that turns debates into discoveries." },
  { day: 27, phase: 2, type: "bite", title: "Steel Man, Don't Straw Man", content: "STRENGTHEN their argument before responding. This forces YOU to think deeper.", workChallenge: "Next disagreement: state their position BETTER than they did. Then respond.", lifeChallenge: "A view you oppose: argue FOR it more convincingly than most supporters.", memoryTrick: "Straw men are EASY to knock. Steel men make YOU stronger." },
  { day: 28, phase: 2, type: "practice", title: "Week 4: The Question Bank", content: "Build your personal 'power questions' list.", workChallenge: "Create a note with 10 go-to questions for work situations.", lifeChallenge: "Create 5 go-to questions for personal reflection.", memoryTrick: "A carpenter has a toolbox. A critical thinker has a QUESTION BOX." },
  { day: 29, phase: 2, type: "bite", title: "The Socratic Method", content: "Socrates never gave answers. He asked questions until truth was discovered.", workChallenge: "Next time a junior dev asks for help, answer with 3 guided questions.", lifeChallenge: "When stuck, write 5 questions instead of pros and cons.", memoryTrick: "Socrates: the original 'senior engineer' who never wrote the code." },
  { day: 30, phase: 2, type: "bite", title: "Fact vs Opinion", content: "'Our deployments are slow' \u2014 fact (data?) or feeling (compared to what?)?", workChallenge: "Next discussion: mentally label each statement as FACT or OPINION.", lifeChallenge: "Read a headline. Separate facts from editorial framing.", memoryTrick: "F.O.G. \u2014 Facts Or Guesses?" },
  { day: 31, phase: 2, type: "bite", title: "The Null Hypothesis", content: "'What if we did NOTHING?' The cost of inaction is often the best benchmark.", workChallenge: "For any initiative: 'What happens if we don't do this for 6 more months?'", lifeChallenge: "One to-do item: what happens if you just... don't?", memoryTrick: "Sometimes nothing is the best something." },
  { day: 32, phase: 2, type: "bite", title: "Asking About Constraints", content: "Most describe what they WANT. Critical thinkers ask about CONSTRAINTS.", workChallenge: "Next requirement discussion: list constraints BEFORE solutions.", lifeChallenge: "For a goal: list real constraints. Plan within them.", memoryTrick: "A river without banks is a flood." },
  { day: 33, phase: 2, type: "deep", title: "The Art of Reframing", content: "'Why is this failing?' \u2192 blame. 'What would make this succeed?' \u2192 solutions. Same situation, different frame.", workChallenge: "Current challenge: write it as a problem, then reframe as an opportunity.", lifeChallenge: "'I don't have time' becomes 'What am I choosing to spend time on instead?'", memoryTrick: "Same painting, different FRAME, different feeling." },
  { day: 34, phase: 2, type: "bite", title: "The Outsider's Question", content: "Someone with zero context: what obvious question would they ask?", workChallenge: "Explain your project to an imaginary 10-year-old. What obvious question surfaces?", lifeChallenge: "If a stranger saw your weekends, what would they find confusing?", memoryTrick: "Experts: DEEP vision. Outsiders: WIDE vision. Need both." },
  { day: 35, phase: 2, type: "practice", title: "Week 5: Question Audit", content: "Review your last 5 meetings. What questions did you ask? What should you have asked?", workChallenge: "'The question I asked' vs 'The question I should have asked.'", lifeChallenge: "A recent too-quick decision: what question would have changed it?", memoryTrick: "Bugs are in what you DIDN'T check." },
  { day: 36, phase: 2, type: "bite", title: "Quantity of Hypotheses", content: "Generate MULTIPLE hypotheses and try to disprove them.", workChallenge: "Next issue: write 3 possible causes BEFORE investigating.", lifeChallenge: "Low energy? List 3 causes. Don't jump to the first.", memoryTrick: "Three hypotheses = three chances to find truth." },
  { day: 37, phase: 2, type: "bite", title: "The Red Team Question", content: "Attack your own ideas to find weaknesses.", workChallenge: "Red-team your email centralization. Find 3 weaknesses.", lifeChallenge: "Red-team your 2026 goals. What's the weakest link?", memoryTrick: "Be your own worst critic FIRST." },
  { day: 38, phase: 2, type: "bite", title: "'Compared to What?'", content: "Nothing is fast, slow, good, or bad in isolation.", workChallenge: "Next qualitative judgment: ask 'Compared to what?'", lifeChallenge: "'Not doing enough' \u2014 compared to what?", memoryTrick: "C.T.W. \u2014 three words that kill lazy thinking." },
  { day: 39, phase: 2, type: "bite", title: "The Boundary Question", content: "Every statement has a boundary where it stops being true.", workChallenge: "A 'best practice': when does it become a BAD practice?", lifeChallenge: "'Never give up': when is it actually harmful?", memoryTrick: "Every truth has an EXPIRY DATE and a ZIP CODE." },
  { day: 40, phase: 2, type: "deep", title: "Thinking in Bets", content: "Every decision is a bet. '70% sure' is more honest than 'This will work.'", workChallenge: "Next tech decision: state your confidence as a percentage.", lifeChallenge: "Life decision: assign a probability. What shifts it 20%?", memoryTrick: "Life isn't chess. Life is POKER." },
  { day: 41, phase: 2, type: "bite", title: "The Silence Question", content: "The most powerful question is sometimes the one you DON'T ask.", workChallenge: "After someone speaks, count to 3 before responding.", lifeChallenge: "Resist filling silence. Let the other person fill it.", memoryTrick: "Silence asks: 'Is there more?'" },
  { day: 42, phase: 2, type: "practice", title: "Phase 2 Graduation", content: "21 days of questioning. Time to crystallize.", workChallenge: "Write your 'Top 10 Power Questions' card.", lifeChallenge: "Teach someone ONE questioning technique.", memoryTrick: "From accepting answers to HUNTING better questions." },
  { day: 43, phase: 3, type: "bite", title: "First Principles Thinking", content: "Strip away assumptions until you reach fundamental truths.", workChallenge: "A 'we've always done it this way' practice: break it to first principles.", lifeChallenge: "A 'necessary' expense: is it truly necessary?", memoryTrick: "Build from ATOMS, not COPIES." },
  { day: 44, phase: 3, type: "bite", title: "The MECE Framework", content: "Mutually Exclusive, Collectively Exhaustive. McKinsey's golden rule.", workChallenge: "Last incident causes: are they MECE?", lifeChallenge: "Monthly expenses into MECE: Needs / Wants / Investments.", memoryTrick: "MECE = slicing a pizza perfectly." },
  { day: 45, phase: 3, type: "bite", title: "The 2x2 Matrix", content: "Two dimensions, four quadrants, instant clarity.", workChallenge: "Plot backlog on Impact vs Effort.", lifeChallenge: "Plot activities on Energizing vs Growth.", memoryTrick: "Confused? Draw a CROSS. Label axes. Clarity." },
  { day: 46, phase: 3, type: "bite", title: "Spectrums, Not Binaries", content: "'Rate 1-10 how maintainable' beats 'good or bad code?'", workChallenge: "Code review: rate correctness, readability, maintainability each 1-10.", lifeChallenge: "Rate day on energy, meaning, connection (each 1-10).", memoryTrick: "Install the dimmer switch." },
  { day: 47, phase: 3, type: "bite", title: "The Evidence Hierarchy", content: "Personal < Expert < Case study < Experiment < Meta-analysis.", workChallenge: "What evidence level supports your tech argument?", lifeChallenge: "Health advice: where on the evidence ladder?", memoryTrick: "P.E.C.C.M. \u2014 climb the evidence LADDER." },
  { day: 48, phase: 3, type: "deep", title: "Trade-off Analysis", content: "The key isn't the 'right' answer \u2014 it's knowing what you're TRADING.", workChallenge: "Trade-off table for email centralization decisions.", lifeChallenge: "This month's YES: what invisible NO came with it?", memoryTrick: "Every YES has a shadow NO." },
  { day: 49, phase: 3, type: "practice", title: "Week 7: Real Incident Analysis", content: "Apply all three phases on a real case.", workChallenge: "BHN incident case study: 5 Whys + First Principles + 2x2.", lifeChallenge: "Same analysis on a personal decision gone wrong.", memoryTrick: "Analysis + action = engineering." },
  { day: 50, phase: 3, type: "bite", title: "Logical Fallacies: Big Five", content: "Ad Hominem, Appeal to Authority, False Dichotomy, Slippery Slope, Bandwagon.", workChallenge: "Next meeting: silently count fallacies.", lifeChallenge: "Your own recent arguments: any fallacies?", memoryTrick: "A.A.F.S.B. \u2014 the five fallacy villains." },
  { day: 51, phase: 3, type: "bite", title: "The Reversibility Test", content: "Reversible = decide fast. Irreversible = analyze deeply.", workChallenge: "Next 5 decisions: one-way or two-way doors?", lifeChallenge: "What you're overthinking: is it a two-way door?", memoryTrick: "Two-way: walk through and back. One-way: bring a map." },
  { day: 52, phase: 3, type: "bite", title: "Probabilistic Thinking", content: "'30% chance of failure because X, Y, Z' beats 'This will fail.'", workChallenge: "Sprint items: estimate RISK probability for each.", lifeChallenge: "3 worries: assign real probabilities.", memoryTrick: "Certainty is myth. Probability is tool." },
  { day: 53, phase: 3, type: "bite", title: "Disaggregation", content: "A mountain is just rocks. Break big into small.", workChallenge: "Biggest task \u2192 5 sub-tasks \u2192 3 steps each.", lifeChallenge: "'Get healthier' = mountain. 'Drink 2L today' = step.", memoryTrick: "Know the CUTS before eating the elephant." },
  { day: 54, phase: 3, type: "bite", title: "Pre/Post Analysis", content: "Analyze BEFORE (what could happen?) AND AFTER (what actually happened?).", workChallenge: "Next PR: pre-analyze before merge, post-analyze after deploy.", lifeChallenge: "Important conversation: pre-analyze and post-analyze.", memoryTrick: "PRE = headlights. POST = rearview." },
  { day: 55, phase: 3, type: "deep", title: "Bayesian Updating", content: "Belief + new data = updated belief. Like scientists think.", workChallenge: "Strong tech opinion: what evidence would change it?", lifeChallenge: "5-year-old belief: has new evidence emerged?", memoryTrick: "Your beliefs need VERSION NUMBERS." },
  { day: 56, phase: 3, type: "practice", title: "Week 8: Analysis Sprint", content: "One real problem. FULL Phase 3 toolkit. 30 minutes.", workChallenge: "Tech debt item: first principles + MECE + 2x2 + trade-offs. 1-page.", lifeChallenge: "Same rigor on a personal decision.", memoryTrick: "Use ALL tools on ONE problem. That's magic." },
  { day: 57, phase: 3, type: "bite", title: "Marginal Thinking", content: "'Is the NEXT unit of effort worth it?'", workChallenge: "Most time-consuming work area: is the marginal hour still best?", lifeChallenge: "Next hour of scrolling vs first hour of sleep?", memoryTrick: "The word NEXT changes everything." },
  { day: 58, phase: 3, type: "bite", title: "Map of Unknowns", content: "Known knowns, known unknowns, unknown unknowns.", workChallenge: "Project: make 3 lists. Get outside help for unknown-unknowns.", lifeChallenge: "Career plan: what are you assuming but haven't verified?", memoryTrick: "Rumsfeld's matrix: a SURVIVAL tool." },
  { day: 59, phase: 3, type: "bite", title: "Incentive Thinking", content: "'Show me the incentive, I'll show you the outcome.'", workChallenge: "A BHN process: who benefits from it staying the same?", lifeChallenge: "YOUR incentives: aligned with what you want?", memoryTrick: "Follow INCENTIVE, not INTENTION." },
  { day: 60, phase: 3, type: "bite", title: "Counterfactual Thinking", content: "'What if we HADN'T done this?' reveals true impact.", workChallenge: "Recent win: would it have happened without you?", lifeChallenge: "Proud decision: what if you'd chosen differently?", memoryTrick: "The CONTROL GROUP of your life." },
  { day: 61, phase: 3, type: "bite", title: "Sunk Cost Awareness", content: "Past investment should NOT drive future decisions.", workChallenge: "Any project continuing ONLY because of past investment?", lifeChallenge: "A commitment from history: would you choose it again today?", memoryTrick: "Sunk costs are GHOSTS. Only the FUTURE is alive." },
  { day: 62, phase: 3, type: "deep", title: "Your Analysis Framework", content: "20+ tools. Pick your 'go-to 5'.", workChallenge: "TOP 5 techniques: write them near your monitor.", lifeChallenge: "3 techniques for personal decisions. Make them default.", memoryTrick: "Master chef: 5 knives, not 50." },
  { day: 63, phase: 3, type: "practice", title: "Phase 3 Graduation", content: "21 days of analysis. Demonstrate it.", workChallenge: "1-page BHN analysis using your top 5. Portfolio material!", lifeChallenge: "Analyze a life decision. Share the process on social media.", memoryTrick: "You can SEE, ASK, and ANALYZE. Next: DECIDE." },
  { day: 64, phase: 4, type: "bite", title: "The Decision Journal", content: "Record: what, why, expected outcome, confidence level.", workChallenge: "Start a log: Date, Decision, Reasoning, Confidence (%).", lifeChallenge: "Log one personal decision in the same format.", memoryTrick: "Decision journal = MIRROR for your thinking." },
  { day: 65, phase: 4, type: "bite", title: "The 10/10/10 Rule", content: "10 minutes? 10 months? 10 years?", workChallenge: "Technical trade-off: does short-term pain matter in 10 months?", lifeChallenge: "Anxiety: does it survive the 10-year test?", memoryTrick: "10 min = emotions. 10 months = consequences. 10 years = character." },
  { day: 66, phase: 4, type: "bite", title: "Decide, Don't Slide", content: "Many 'decisions' are defaults you slid into.", workChallenge: "3 things that are 'just how they are': who decided?", lifeChallenge: "What's a slide, not a decision? Choose actively.", memoryTrick: "A SLIDE = decision with eyes closed." },
  { day: 67, phase: 4, type: "bite", title: "Regret Minimization", content: "At 80, looking back: would you regret NOT trying?", workChallenge: "A risky proposal: will 80-year-old you regret not trying?", lifeChallenge: "What will you regret NOT doing by December 2026?", memoryTrick: "At 80, you remember brave choices, not safe ones." },
  { day: 68, phase: 4, type: "deep", title: "Decision Trees", content: "Each branch is a choice, each leaf is an outcome with probability.", workChallenge: "Draw a decision tree for a current technical choice.", lifeChallenge: "Draw one for a life choice. Paper changes everything.", memoryTrick: "Draw the tree before climbing it." },
  { day: 69, phase: 4, type: "bite", title: "The Advisor Test", content: "Best friend has YOUR problem. What would you tell them?", workChallenge: "Colleague faces your situation. Your advice to THEM?", lifeChallenge: "Write advice to yourself as your own best friend.", memoryTrick: "You KNOW the answer. Make it someone else's problem." },
  { day: 70, phase: 4, type: "practice", title: "Week 10: Decision Audit", content: "Review 5 recent decisions. How calibrated were you?", workChallenge: "3 technical decisions: did confidence match outcomes?", lifeChallenge: "2 personal decisions: any you'd change?", memoryTrick: "Auditing = CALIBRATION, not regret." },
  { day: 71, phase: 4, type: "bite", title: "Analysis Paralysis", content: "The cost of NOT deciding is often higher.", workChallenge: "Analyzed for over a week? Set a 24-hour deadline.", lifeChallenge: "Overthinking something? Decide in 1 hour.", memoryTrick: "Good plan TODAY > perfect plan NEXT WEEK." },
  { day: 72, phase: 4, type: "bite", title: "Committee of Perspectives", content: "Consult 3 inner advisors: rational, emotional, contrarian.", workChallenge: "Inner engineer + inner user + inner critic: what does each say?", lifeChallenge: "Head, heart, gut: where do they agree?", memoryTrick: "You contain MULTITUDES. Let all speak." },
  { day: 73, phase: 4, type: "bite", title: "Deciding Under Uncertainty", content: "Best decision with 70% info beats waiting for 95%.", workChallenge: "What info are you waiting for? Is 70% enough?", lifeChallenge: "Postponing for 'more info': what's 'good enough'?", memoryTrick: "70% + fast > 95% + slow." },
  { day: 74, phase: 4, type: "bite", title: "Post-Decision Protocol", content: "After deciding: COMMIT. Set a review date, then move.", workChallenge: "'I will review on [date], not before.' Forward.", lifeChallenge: "Stop reopening. Set review date. Breathe.", memoryTrick: "Don't dig up seeds. Let decisions ROOT." },
  { day: 75, phase: 4, type: "bite", title: "Disagree and Commit", content: "Disagree AND fully commit. Amazon's principle.", workChallenge: "A team decision you disagreed with: did you truly commit?", lifeChallenge: "A compromise: have you truly committed?", memoryTrick: "'Concerns recorded. Now I'm ALL IN.'" },
  { day: 76, phase: 4, type: "deep", title: "Your Decision System", content: "Build a personal decision checklist.", workChallenge: "Create a 1-page 'Decision Checklist'.", lifeChallenge: "Test it on a real decision this week.", memoryTrick: "Pilots use checklists. Why decide from memory?" },
  { day: 77, phase: 4, type: "practice", title: "Phase 4 Graduation", content: "Document 3 decisions using your system.", workChallenge: "3 decisions: context, options, analysis, confidence, outcome.", lifeChallenge: "Share your framework. Great content!", memoryTrick: "You can SEE, ASK, ANALYZE, and DECIDE. Final: COMMUNICATE." },
  { day: 78, phase: 5, type: "bite", title: "Think, Then Ink", content: "Clear writing = clear thinking.", workChallenge: "Complex concept in 3 sentences a non-engineer would get.", lifeChallenge: "Life philosophy in 3 sentences. More = not distilled enough.", memoryTrick: "Writing IS thinking." },
  { day: 79, phase: 5, type: "bite", title: "The Pyramid Principle", content: "Lead with conclusion, then support. 'Here's what I recommend. Here's why.'", workChallenge: "Rewrite last important email: pyramid style.", lifeChallenge: "Next opinion asked: conclusion FIRST.", memoryTrick: "STAND ON TOP of the pyramid, point down." },
  { day: 80, phase: 5, type: "bite", title: "The 'So What?' Test", content: "After every statement: 'So what? Why should they care?'", workChallenge: "Last doc: 'So what?' after each section. Remove failures.", lifeChallenge: "Before sharing a story: 'So what?' Shape accordingly.", memoryTrick: "Sentences should pay rent." },
  { day: 81, phase: 5, type: "bite", title: "Philosopher, Not Politician", content: "Argue to find TRUTH, not to WIN.", workChallenge: "'I might be wrong, but here's my reasoning...'", lifeChallenge: "'Help me understand. What am I missing?'", memoryTrick: "Win truth, gain respect." },
  { day: 82, phase: 5, type: "deep", title: "Storytelling for Engineers", content: "Data convinces mind. Stories convince heart. Use BOTH.", workChallenge: "Project as STORY: villain (problem), hero (solution), journey, promised land.", lifeChallenge: "Motovlogs rides: what's the narrative arc?", memoryTrick: "FACTS tell. STORIES sell." },
  { day: 83, phase: 5, type: "bite", title: "One-Pager Discipline", content: "Can't fit on one page? Haven't thought enough.", workChallenge: "Biggest initiative: Problem (2 lines), Solution (3), Impact (3), Ask (2).", lifeChallenge: "2026 goals on one page. Essential 3-5 only.", memoryTrick: "One page = CONSTRAINT that forces CLARITY." },
  { day: 84, phase: 5, type: "practice", title: "Week 12: Present Your Analysis", content: "Analysis without communication is invisible.", workChallenge: "5-minute presentation for your team. Practice it.", lifeChallenge: "Complex concept in under 2 minutes.", memoryTrick: "Best thinkers who can't communicate are invisible." },
  { day: 85, phase: 5, type: "bite", title: "Active Listening", content: "Make the other person feel HEARD. Paraphrase before responding.", workChallenge: "Next meeting: paraphrase 2 people before adding yours.", lifeChallenge: "'So you're saying...' then your thoughts.", memoryTrick: "Listening says 'You matter' without words." },
  { day: 86, phase: 5, type: "bite", title: "The STAR-K Method", content: "Situation, Task, Action, Result + Key Takeaway.", workChallenge: "Write 3 STAR-K stories from 2026. GOLD for your 5-star review.", lifeChallenge: "One personal STAR-K. Every challenge is a story.", memoryTrick: "STAR-K = highlight reel, STRUCTURED." },
  { day: 87, phase: 5, type: "bite", title: "Visual Thinking", content: "A diagram > 1000 words. Boxes, arrows, labels.", workChallenge: "Next explanation: sketch it, don't just say it.", lifeChallenge: "Weekly schedule as visual blocks.", memoryTrick: "Words = LINEAR. Visuals = SPATIAL. Both = 3D." },
  { day: 88, phase: 5, type: "bite", title: "Feedback as a Gift", content: "Specific, Behavioral, Impact-focused, Kind.", workChallenge: "Give one SBI feedback to a colleague.", lifeChallenge: "Ask for honest feedback. Listen without defending.", memoryTrick: "Feedback: gift in rough wrapping." },
  { day: 89, phase: 5, type: "deep", title: "Your Thinker's Brand", content: "89 days in. How do you want to be known?", workChallenge: "Your 'thinker's tagline': how should your team describe you?", lifeChallenge: "Motovlogs philosophy: what ties your content together?", memoryTrick: "Your BRAND = what they say when you leave the room." },
  { day: 90, phase: 5, type: "practice", title: "GRADUATION: Your Manifesto", content: "90 days. 5 phases. One transformed mind.", workChallenge: "1-page manifesto: top 10 principles, frameworks, and one 90-day commitment.", lifeChallenge: "Share your journey. LinkedIn, Motovlogs, or a friend.", memoryTrick: "Day 1: AUTOPILOT. Day 90: PILOT. The masterclass ends, the practice never does." },
];

const typeLabel = (t) => t === "bite" ? "5-min Bite" : t === "deep" ? "Deep Dive" : "Practice Day";
const typeIcon = (t) => t === "bite" ? "\u26A1" : t === "deep" ? "\uD83C\uDF0A" : "\uD83C\uDFCB\uFE0F";

export default function App() {
  const [dark, setDark] = useState(true);
  const [selPhase, setSelPhase] = useState(null);
  const [selDay, setSelDay] = useState(null);
  const [done, setDone] = useState(() => { try { return JSON.parse(localStorage.getItem("masterclass_critical-thinking_done")) || {}; } catch { return {}; } });
  const [vw, setVw] = useState("home");
  const ref = useRef(null);
  useEffect(() => { localStorage.setItem("masterclass_critical-thinking_done", JSON.stringify(done)); }, [done]);
  const toggle = (d) => setDone((p) => ({ ...p, [d]: !p[d] }));
  const ct = Object.values(done).filter(Boolean).length;
  const pct = Math.round((ct / 90) * 100);
  const phase = selPhase ? PHASES.find((p) => p.id === selPhase) : null;

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [selDay]);

  const m = dark ? "dark" : "light";
  const t = {
    bg: dark ? "#07080c" : "#faf8f4",
    surface: dark ? "rgba(14,16,24,0.88)" : "rgba(255,255,255,0.88)",
    surfHov: dark ? "rgba(20,23,36,0.95)" : "rgba(248,246,242,0.96)",
    bdr: dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.07)",
    bdrAct: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.14)",
    txt: dark ? "#e8e4f0" : "#1a1625",
    sub: dark ? "#8a8599" : "#6b6680",
    mut: dark ? "#55506a" : "#9a95a8",
    card: dark ? "rgba(12,14,22,0.72)" : "rgba(255,255,255,0.72)",
    ring: dark ? "#1c1930" : "#e8e4ee",
    tag: dark ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.035)",
    togBg: dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.055)",
    hero: dark
      ? "radial-gradient(ellipse at 18% 0%, rgba(139,92,246,0.13), transparent 48%), radial-gradient(ellipse at 82% 0%, rgba(6,182,212,0.11), transparent 48%), radial-gradient(ellipse at 50% 90%, rgba(251,146,60,0.07), transparent 50%)"
      : "radial-gradient(ellipse at 18% 0%, rgba(139,92,246,0.055), transparent 48%), radial-gradient(ellipse at 82% 0%, rgba(6,182,212,0.045), transparent 48%), radial-gradient(ellipse at 50% 90%, rgba(251,146,60,0.035), transparent 50%)",
  };
  const hGrad = dark
    ? "linear-gradient(135deg, #a855f7 0%, #06b6d4 35%, #f97316 70%, #ec4899 100%)"
    : "linear-gradient(135deg, #7c3aed 0%, #0891b2 35%, #ea580c 70%, #db2777 100%)";

  const Tog = () => (
    <button onClick={() => setDark(!dark)} style={{ position: "fixed", top: 14, right: 14, zIndex: 999, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", backdropFilter: "blur(14px)", border: `1px solid ${t.bdr}`, borderRadius: 40, padding: "7px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, color: t.sub, fontSize: 12.5, fontFamily: "'DM Mono', monospace", transition: "all 0.35s", letterSpacing: 0.5 }}>
      <span style={{ fontSize: 15 }}>{dark ? "\u2600\uFE0F" : "\uD83C\uDF19"}</span>{dark ? "Light" : "Dark"}
    </button>
  );

  if (vw === "home") {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: t.bg, minHeight: "100vh", color: t.txt, transition: "background 0.45s, color 0.45s" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <style>{`@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}.pc:hover{transform:translateY(-3px);box-shadow:${dark?"0 8px 32px rgba(0,0,0,0.4)":"0 8px 32px rgba(0,0,0,0.08)"}}.pc{transition:all 0.28s cubic-bezier(0.4,0,0.2,1)}`}</style>
        <Tog />
        <div style={{ position: "relative", padding: "54px 24px 34px", textAlign: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: t.hero, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 11.5, letterSpacing: 6, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", color: t.mut, marginBottom: 16 }}>90-Day Masterclass</div>
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(34px,7vw,54px)", fontWeight: 700, lineHeight: 1.05, margin: "0 0 8px", background: hGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Critical Thinking</h1>
            <p style={{ fontSize: 14.5, color: t.sub, fontFamily: "'DM Mono', monospace", margin: "10px 0 34px", fontWeight: 300, letterSpacing: 1.5 }}>see / ask / analyze / decide / communicate</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 20, background: t.surface, border: `1px solid ${t.bdr}`, borderRadius: 22, padding: "20px 30px", backdropFilter: "blur(18px)" }}>
              <div style={{ position: "relative", width: 64, height: 64 }}>
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke={t.ring} strokeWidth="3.5" />
                  <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a855f7"/><stop offset="33%" stopColor="#06b6d4"/><stop offset="66%" stopColor="#f97316"/><stop offset="100%" stopColor="#ec4899"/></linearGradient></defs>
                  <circle cx="32" cy="32" r="28" fill="none" stroke="url(#pg)" strokeWidth="3.5" strokeDasharray={`${(pct/100)*175.9} 175.9`} strokeLinecap="round" transform="rotate(-90 32 32)" style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.4,0,0.2,1)" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, fontFamily: "'DM Mono', monospace", background: hGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{pct}%</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{ct}<span style={{ fontSize: 15, color: t.mut }}> / 90</span></div>
                <div style={{ fontSize: 11, color: t.mut, fontFamily: "'DM Mono', monospace", letterSpacing: 1.5 }}>days completed</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "8px 20px 52px", maxWidth: 720, margin: "0 auto" }}>
          {PHASES.map((p, i) => {
            const pl = ALL_LESSONS.filter(l => l.phase === p.id);
            const pc = pl.filter(l => done[l.day]).length;
            const ac = p.accent[m];
            return (
              <div key={p.id} className="pc" onClick={() => { setSelPhase(p.id); setVw("phase"); }} style={{ background: t.card, border: `1px solid ${t.bdr}`, borderRadius: 18, padding: "22px 24px", cursor: "pointer", marginBottom: 14, borderLeft: `3px solid ${ac}`, animation: `fu 0.55s ease ${i*0.09}s both`, position: "relative", overflow: "hidden", backdropFilter: "blur(10px)" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 140, height: 140, background: `radial-gradient(circle, ${p.glow}, transparent 65%)`, pointerEvents: "none", opacity: dark ? 0.45 : 0.25 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <span style={{ fontSize: 32, filter: dark ? "none" : "saturate(0.85)" }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: 10.5, color: ac, letterSpacing: 3.5, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>Phase {p.id} | {p.days}</div>
                      <div style={{ fontSize: 20, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{p.title}</div>
                      <div style={{ fontSize: 12.5, color: t.sub, fontWeight: 400, marginTop: 1 }}>{p.subtitle}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12.5, color: t.mut, textAlign: "right", minWidth: 50 }}>
                    <span style={{ color: ac, fontWeight: 600 }}>{pc}</span>/{pl.length}
                  </div>
                </div>
                <div style={{ marginTop: 16, height: 3, background: t.ring, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(pc/pl.length)*100}%`, background: `linear-gradient(90deg, ${ac}, ${ac}77)`, borderRadius: 3, transition: "width 0.5s ease" }} />
                </div>
                <div style={{ marginTop: 11, fontSize: 11, color: t.mut, padding: "7px 12px", background: t.tag, borderRadius: 9, fontFamily: "'DM Mono', monospace", lineHeight: 1.5 }}>\uD83E\uDDE0 {p.mnemonic}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (vw === "phase" && phase) {
    const pl = ALL_LESSONS.filter(l => l.phase === phase.id);
    const ac = phase.accent[m];
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: t.bg, minHeight: "100vh", color: t.txt, transition: "background 0.45s, color 0.45s" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <style>{`@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes ex{from{opacity:0;max-height:0}to{opacity:1;max-height:900px}}`}</style>
        <Tog />
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: phase.gradient[m], opacity: dark ? 0.55 : 0.35, transition: "opacity 0.4s" }} />
          <div style={{ position: "relative", zIndex: 1, padding: "20px 20px 6px" }}>
            <button onClick={() => { setVw("home"); setSelPhase(null); setSelDay(null); }} style={{ background: t.togBg, border: `1px solid ${t.bdr}`, color: t.sub, padding: "7px 16px", borderRadius: 10, cursor: "pointer", fontSize: 12.5, fontFamily: "'DM Mono', monospace" }}>{"\u2190"} Back</button>
          </div>
          <div style={{ position: "relative", zIndex: 1, padding: "10px 24px 30px", textAlign: "center" }}>
            <span style={{ fontSize: 44 }}>{phase.icon}</span>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 34, fontWeight: 700, margin: "10px 0 4px" }}>Phase {phase.id}: {phase.title}</h2>
            <p style={{ color: t.sub, fontWeight: 300, margin: 0, fontSize: 14 }}>{phase.subtitle}</p>
            <p style={{ color: t.sub, fontSize: 13.5, marginTop: 12, maxWidth: 500, marginInline: "auto", lineHeight: 1.65 }}>{phase.description}</p>
            <div style={{ marginTop: 14, display: "inline-block", fontSize: 11.5, color: ac, padding: "7px 16px", background: `${ac}12`, borderRadius: 9, fontFamily: "'DM Mono', monospace", border: `1px solid ${ac}22` }}>{phase.mnemonic}</div>
          </div>
        </div>
        <div style={{ padding: "14px 20px 52px", maxWidth: 720, margin: "0 auto" }}>
          {pl.map((l, i) => {
            const op = selDay === l.day;
            return (
              <div key={l.day} ref={op ? ref : null} style={{ marginBottom: 8, animation: `fu 0.45s ease ${i*0.035}s both` }}>
                <div onClick={() => setSelDay(op ? null : l.day)} style={{ background: op ? t.surfHov : t.card, border: `1px solid ${op ? `${ac}40` : t.bdr}`, borderRadius: op ? "15px 15px 0 0" : 15, padding: "15px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.25s", backdropFilter: "blur(8px)" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div onClick={e => { e.stopPropagation(); toggle(l.day); }} style={{ width: 27, height: 27, borderRadius: "50%", border: done[l.day] ? `2.5px solid ${ac}` : `2px solid ${t.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: done[l.day] ? `${ac}15` : "transparent", transition: "all 0.25s", flexShrink: 0 }}>
                      {done[l.day] && <span style={{ color: ac, fontSize: 13, fontWeight: 700 }}>{"\u2713"}</span>}
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, color: t.mut, fontFamily: "'DM Mono', monospace", letterSpacing: 1.2 }}>Day {l.day} | {typeIcon(l.type)} {typeLabel(l.type)}</div>
                      <div style={{ fontSize: 15, fontWeight: 500, color: done[l.day] ? t.mut : t.txt, textDecoration: done[l.day] ? "line-through" : "none", marginTop: 3 }}>{l.title}</div>
                    </div>
                  </div>
                  <span style={{ color: t.mut, fontSize: 15, transform: op ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s", flexShrink: 0 }}>{"\u25BE"}</span>
                </div>
                {op && (
                  <div style={{ background: t.surfHov, border: `1px solid ${ac}40`, borderTop: "none", borderRadius: "0 0 15px 15px", padding: 22, animation: "ex 0.35s ease", overflow: "hidden", backdropFilter: "blur(8px)" }}>
                    <p style={{ color: t.txt, lineHeight: 1.8, margin: "0 0 22px", fontSize: 14.5, fontWeight: 300 }}>{l.content}</p>
                    {[
                      { label: "\uD83D\uDCBC Work Challenge (BHN)", text: l.workChallenge, c: dark ? ["rgba(139,92,246,0.06)","rgba(139,92,246,0.13)","#c084fc"] : ["rgba(124,58,237,0.04)","rgba(124,58,237,0.1)","#7c3aed"] },
                      { label: "\uD83C\uDF31 Life Challenge", text: l.lifeChallenge, c: dark ? ["rgba(34,211,238,0.05)","rgba(34,211,238,0.11)","#22d3ee"] : ["rgba(8,145,178,0.04)","rgba(8,145,178,0.09)","#0891b2"] },
                      { label: "\uD83E\uDDE0 Memory Trick", text: l.memoryTrick, c: dark ? ["rgba(251,146,60,0.06)","rgba(251,146,60,0.14)","#fb923c"] : ["rgba(234,88,12,0.04)","rgba(234,88,12,0.1)","#ea580c"], highlight: true },
                    ].map((s, si) => (
                      <div key={si} style={{ background: s.c[0], border: `1px solid ${s.c[1]}`, borderRadius: 13, padding: "15px 18px", marginBottom: si < 2 ? 12 : 0 }}>
                        <div style={{ fontSize: 10.5, color: s.c[2], letterSpacing: 2.5, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 7 }}>{s.label}</div>
                        <p style={{ color: s.highlight ? (dark ? "#fbbf6a" : "#b45309") : t.txt, fontSize: s.highlight ? 14 : 13.5, lineHeight: 1.65, margin: 0, fontWeight: s.highlight ? 500 : 300 }}>{s.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}
