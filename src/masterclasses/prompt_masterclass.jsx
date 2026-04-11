import { useState, useEffect } from "react";

// ─── DATA ───
const PHASES = [
  {
    id: 1,
    name: "Foundation",
    subtitle: "Build the muscle memory",
    color: "#E8A838",
    days: [
      {
        day: 1,
        title: "The Anatomy of a Great Prompt",
        concept: "Every powerful prompt has 4 bones: Context, Role, Intent, and Scope. Missing any one of these is like sending a courier without an address.",
        framework: "C.R.I.S.P.",
        frameworkFull: "Context | Role | Intent | Scope | Pattern",
        bad: "Help me write an email to my manager about the project delay.",
        good: `[C] I'm an SSE at BHN. Our email centralization project hit a 2-week delay due to a PreProduction ECS circuit breaker issue.\n[R] Write as a professional engineer who owns the problem.\n[I] Draft a Slack message (not email) to my new manager Arun, explaining the delay with a revised timeline.\n[S] Under 150 words. Warm but accountable. No jargon. Reference BeAccountable pillar.`,
        tip: "Tyson's Rule: If your prompt is under 2 lines, you're probably being too vague.",
        exercise: "Take your last 3 prompts to any AI. Rewrite each one using C.R.I.S.P. Compare the outputs.",
        memoryTrick: "C.R.I.S.P. = Think of a CRISP chapati. Flat, clear, no wrinkles. That's your prompt."
      },
      {
        day: 2,
        title: "Specificity Beats Length",
        concept: "Research shows LLM reasoning degrades around 3,000 tokens of input. The sweet spot is 150-300 words for most prompts. Being specific is not the same as being long.",
        framework: "The Sniper Principle",
        frameworkFull: "One precise shot > spray and pray",
        bad: "Write a detailed comprehensive thorough analysis of Redis caching strategies covering all aspects including performance, scalability, monitoring, best practices, and everything else important.",
        good: `Compare Redis cache-aside vs write-through for a PHP/Laravel app serving 10K RPM.\nFor each: 1 sentence definition, when to use it, 1 gotcha.\nFormat as a 2-column table. Under 200 words total.`,
        tip: "Every adjective you add (detailed, comprehensive, thorough) makes the output LESS focused, not more.",
        exercise: "Write a prompt using exactly 50 words. Then rewrite the same request in 25 words. Notice what you cut was probably fluff.",
        memoryTrick: "Adjective Tax: Every fluffy adjective you add costs you 10% precision."
      },
      {
        day: 3,
        title: "Output Format is Half the Prompt",
        concept: "If you don't specify what the output looks like, the AI guesses. And it usually guesses wrong. Specifying format is the single highest-ROI habit in prompting.",
        framework: "F.A.T. Output Spec",
        frameworkFull: "Format | Audience | Token budget",
        bad: "Explain the Strangler Fig Pattern.",
        good: `Explain the Strangler Fig Pattern for a team of PHP developers migrating from Zend to Laravel.\n\nFormat:\n- 1 analogy (non-tech, under 30 words)\n- 3 bullet steps of how it works\n- 1 code-level example in Laravel\n- 1 "when NOT to use it" warning\n\nTotal: under 250 words. No intro paragraph.`,
        tip: "Adding 'No intro paragraph' and 'No conclusion' saves you from AI's biggest habit: padding.",
        exercise: "Pick any concept. Ask for it in 5 different formats: table, analogy, code, tweet, and quiz question. See how format changes understanding.",
        memoryTrick: "F.A.T. = Feed the AI Three things about the output shape."
      },
      {
        day: 4,
        title: "The Anti-Pattern Library",
        concept: "Telling the AI what NOT to do is as powerful as telling it what to do. Negative constraints eliminate the most common failure modes.",
        framework: "Negative Prompting",
        frameworkFull: "Do NOT... | Avoid... | Instead of X, do Y",
        bad: "Write a LinkedIn post about my promotion.",
        good: `Write a LinkedIn post announcing my promotion to Senior Software Engineer.\n\nDo NOT:\n- Use cliches like "thrilled to announce" or "excited to share"\n- Use em dashes\n- Make it longer than 150 words\n- Sound boastful\n\nDO:\n- Mention the team (Schemes Team at BHN)\n- Reference the 1% daily improvement philosophy\n- End with a genuine question to the audience\n- Keep it warm and grounded`,
        tip: "Pair every negative with a positive. 'Don't use jargon' becomes 'Don't use jargon. Instead, explain using analogies a 10-year-old would understand.'",
        exercise: "List the 5 things AI outputs that annoy you most. Turn each into a reusable negative constraint you can paste into any prompt.",
        memoryTrick: "The Bouncer List: Every nightclub has a 'not allowed' list. Your prompt needs one too."
      },
      {
        day: 5,
        title: "Role Assignment Mastery",
        concept: "Giving the AI a specific persona calibrates its vocabulary, depth, assumptions, and even its confidence level. 'You are a Staff Engineer' produces fundamentally different output than no role at all.",
        framework: "P.E.R.S.O.N.A.",
        frameworkFull: "Profession | Experience | Responsibility | Style | Output-type | Notable-trait | Audience",
        bad: "Review my email centralization architecture.",
        good: `You are a Principal Engineer at a fintech company with 15 years of distributed systems experience. You are skeptical by nature and known for finding edge cases others miss.\n\nReview this email centralization architecture:\n[architecture details]\n\nPoke exactly 5 holes. For each:\n- Severity: P0/P1/P2\n- What could go wrong (1 sentence)\n- How to mitigate (1 sentence)`,
        tip: "The more specific the persona, the better. 'Staff Engineer' < 'Staff Engineer at Stripe who has migrated 3 monoliths to microservices'.",
        exercise: "Take one technical question. Ask it with 5 different roles: junior dev, staff engineer, CTO, security auditor, and QA lead. Compare the depth and focus of each response.",
        memoryTrick: "Method Acting: The AI performs better when it gets into character. Give it a costume, not just a name."
      },
      {
        day: 6,
        title: "Few-Shot Prompting: Teach by Showing",
        concept: "Instead of describing what you want, show the AI 2-3 examples. Pattern matching from examples beats paragraphs of instructions. Research confirms: 3 good examples beat a page of instructions every time.",
        framework: "E.I.O. Pattern",
        frameworkFull: "Example-In | Example-Out | Your-Input",
        bad: "Convert customer complaints into structured tickets.",
        good: `Convert complaints into tickets. Follow this exact format:\n\nExample 1:\nInput: "Your app crashed when I uploaded a photo bigger than 5MB"\nOutput:\n  Category: Bug\n  Severity: High\n  Component: File Upload\n  Steps: Upload photo > 5MB\n  Expected: Successful upload\n  Actual: App crash\n\nExample 2:\nInput: "The checkout page takes 30 seconds to load on mobile"\nOutput:\n  Category: Performance\n  Severity: Medium\n  Component: Checkout\n  Steps: Open checkout on mobile\n  Expected: < 3s load\n  Actual: 30s load\n\nNow convert this:\nInput: "I can't reset my password, the email never arrives"`,
        tip: "Choose examples that cover DIFFERENT scenarios (happy path, edge case, error). Diverse examples teach better than similar ones.",
        exercise: "Create a few-shot prompt for something you do weekly: code review comments, standup updates, or Jira ticket descriptions.",
        memoryTrick: "E.I.O. = Old McDonald had a farm, E-I-O. Show the AI the farm before asking it to work."
      },
      {
        day: 7,
        title: "Week 1 Integration Lab",
        concept: "Today you combine everything from Days 1-6 into a single, production-grade prompt. This is where the magic happens: layering techniques creates exponentially better results than any single technique alone.",
        framework: "Full Stack Prompt",
        frameworkFull: "C.R.I.S.P. + Negative + Few-Shot + Format Spec",
        bad: "Help me prepare for my performance review conversation.",
        good: `[Context] I'm Vishwanath, SSE at BHN (8 years exp). My target is a 5-star rating in the Dec 2026 review. I report to Arun. BHN's 4 pillars: BeOneTeam, BeInnovative, BeTheSolution, BeAccountable.\n\n[Role] Act as an executive coach who has helped 50+ engineers achieve top ratings.\n\n[Intent] Create a 1-page talking points document for my mid-year check-in with Arun.\n\n[Scope] Max 400 words. Professional but warm. No cliches. No bullet points longer than 15 words.\n\n[Pattern] Structure:\n1. Opening (1 sentence establishing tone)\n2. Wins mapped to pillars (4 bullets, 1 per pillar)\n3. Growth areas (2 bullets, framed as "investing in")\n4. Ask (1 specific request)\n\nDo NOT include generic phrases like "looking forward to" or "appreciate the opportunity."`,
        tip: "Save your best combined prompts as templates. Build a personal prompt library over time.",
        exercise: "Write a Full Stack Prompt for your #1 work task this week. Time yourself: aim for under 3 minutes to write it.",
        memoryTrick: "Prompt Stacking: Like a dosa with all the chutneys. Each layer adds flavor."
      }
    ]
  },
  {
    id: 2,
    name: "Advanced Techniques",
    subtitle: "Think like a prompt architect",
    color: "#4ECDC4",
    days: [
      {
        day: 8,
        title: "Chain-of-Thought Prompting",
        concept: "For complex reasoning tasks, asking the AI to 'think step by step' before answering dramatically improves accuracy. This works because it forces the model to show intermediate reasoning rather than jumping to conclusions.",
        framework: "S.T.E.P.",
        frameworkFull: "State the problem | Think through steps | Evaluate options | Present answer",
        bad: "Should we use SQS or Kafka for our email centralization?",
        good: `I need to choose between AWS SQS and Apache Kafka for centralizing email dispatch from 5 legacy PHP repos (116 dispatch points) through a single Laravel 12 consumer.\n\nBefore answering, think through these steps:\n1. List the requirements (volume, ordering, retry needs)\n2. Compare both options on each requirement\n3. Consider our team's expertise (PHP/Laravel, AWS-native, no Kafka experience)\n4. Factor in operational overhead\n5. Then give your recommendation with a confidence level (Low/Med/High)\n\nShow your reasoning at each step.`,
        tip: "Chain-of-thought works best for: architecture decisions, debugging, trade-off analysis, and anything involving multiple variables.",
        exercise: "Take a recent technical decision you made. Prompt the AI to reason through it step-by-step. See if it reaches the same conclusion and compare the reasoning paths.",
        memoryTrick: "S.T.E.P. = Don't let the AI take the elevator. Make it walk the S.T.E.P.s."
      },
      {
        day: 9,
        title: "Meta-Prompting: Let AI Write Your Prompts",
        concept: "When you're stuck, the most powerful move is asking the AI to help you write a better prompt. This is meta-prompting: using the AI to optimize its own instructions. It's like asking a chef what ingredients they need before cooking.",
        framework: "The Mirror Technique",
        frameworkFull: "Ask the AI what it needs to know",
        bad: "[Spending 10 minutes trying to write the perfect prompt yourself]",
        good: `I want to create an architecture proposal for centralizing email dispatch across our legacy PHP applications.\n\nBefore I give you the full brief, ask me the 10 most important questions you'd need answered to write an excellent proposal. Group them by: Technical Context, Business Context, and Constraints.`,
        tip: "Meta-prompting is your secret weapon when facing a complex task you don't know how to structure. Let the AI interview you first.",
        exercise: "Pick a complex task (proposal, strategy doc, learning plan). Instead of writing the prompt, ask the AI to interview you with 10 questions. Then use its questions as your prompt structure.",
        memoryTrick: "The Mirror: Hold up a mirror to the AI. Let it show you what it needs to see."
      },
      {
        day: 10,
        title: "Perspective Shifting",
        concept: "Asking the AI to analyze from multiple viewpoints uncovers blind spots you'd never catch from a single angle. This is especially powerful for strategy, proposals, and decisions with competing priorities.",
        framework: "The Panel Technique",
        frameworkFull: "Define 3-5 distinct viewpoints + scoring criteria",
        bad: "What do you think of my proposal?",
        good: `Review my email centralization proposal from these 4 perspectives:\n\n1. **CTO lens**: Is this architecturally sound? Any scaling risks?\n2. **Product Manager lens**: Does this deliver user-visible value? What's the opportunity cost?\n3. **Security Auditor lens**: Any data exposure risks in the migration?\n4. **New hire lens**: Could someone who joins in 6 months understand and maintain this?\n\nFor each perspective: 1 strength, 1 concern, 1 specific question they'd ask.\nEnd with: which perspective raises the biggest risk, and how to mitigate it.`,
        tip: "Choose perspectives that naturally conflict with each other (speed vs quality, innovation vs stability). The tension reveals insights.",
        exercise: "Take your current biggest project decision. Define 4 perspectives. Run the panel. Act on the insight you didn't expect.",
        memoryTrick: "The War Room: Imagine 4 people in a room arguing about your work. Who should be in that room?"
      },
      {
        day: 11,
        title: "Iterative Refinement Protocol",
        concept: "The best outputs come from treating prompting as a conversation, not a one-shot request. Build progressively: foundation, then refinement, then hardening. Each round builds on the last.",
        framework: "B.R.H. Protocol",
        frameworkFull: "Build (foundation) | Refine (specifics) | Harden (edge cases)",
        bad: "[Trying to get the perfect output in one prompt]",
        good: `Round 1 (Build): "Write a PHP function that validates email addresses using Laravel's validation rules."\n\nRound 2 (Refine): "Good. Now handle these edge cases: consecutive dots, plus-addressing, IDN domains. Add type hints and return types."\n\nRound 3 (Harden): "Write 10 unit tests covering: valid emails, invalid formats, edge cases from Round 2, and empty/null inputs. Use PHPUnit with data providers."`,
        tip: "You're already strong at iteration (75/100 in our scorecard). The goal is to make Round 1 better so you need fewer rounds.",
        exercise: "Build a code component using exactly 3 rounds. Time each round. Track how the quality jumps between rounds.",
        memoryTrick: "B.R.H. = Build the house, Renovate the rooms, Hurricane-proof the structure."
      },
      {
        day: 12,
        title: "XML Structure for Claude",
        concept: "Claude specifically responds best to XML-tagged sections rather than markdown headers or numbered lists. Wrapping different parts of your prompt in tags makes each section crystal clear and prevents the model from mixing up instructions with context.",
        framework: "Tag Architecture",
        frameworkFull: "<context> | <instructions> | <examples> | <constraints>",
        bad: "Here's my code [code]. Please review it. I want you to focus on security and also here's some context about the project [context]. The output should be in a table.",
        good: `<context>\nI'm building a Laravel 12 API consumer for SQS email messages.\nStack: PHP 8.5, Laravel 12, AWS ECS, Redis for idempotency.\n</context>\n\n<instructions>\nReview this code for security vulnerabilities.\nFocus on: input validation, SQL injection, secrets exposure.\n</instructions>\n\n<code>\n[paste code here]\n</code>\n\n<output_format>\nTable with columns: Issue | Severity | Line | Fix\nMax 10 issues, sorted by severity.\n</output_format>`,
        tip: "XML tags work because they create unambiguous boundaries. The model knows exactly where context ends and instructions begin.",
        exercise: "Convert your 3 most-used prompt patterns into XML-tagged templates. Save them for reuse.",
        memoryTrick: "Gift Wrapping: Each section of your prompt is a gift. Wrap it properly so the AI knows what to open first."
      },
      {
        day: 13,
        title: "Constraint-Based Creativity",
        concept: "Paradoxically, more constraints produce more creative and useful outputs. Open-ended prompts get generic responses. Tight constraints force the AI to be resourceful within boundaries, just like how a sonnet's 14-line rule creates better poetry than 'write a poem'.",
        framework: "The Box Method",
        frameworkFull: "Define the box, then ask to fill it brilliantly",
        bad: "Write a creative community post for my YouTube channel.",
        good: `Write a YouTube community post for Vishwa Motovlogs (solo motorcycle travel, Dominar 400).\n\nConstraints:\n- Exactly 3 sentences\n- First sentence: hook with a question\n- Second sentence: one specific moment from the Bangalore-to-Vizag ride\n- Third sentence: tease the next series (Coorg) with curiosity\n- No em dashes. No emojis. No "hey guys".\n- Tone: like texting a friend at midnight after a long ride`,
        tip: "The tighter your constraints, the more 'you' the output sounds. Loose prompts sound like AI. Tight prompts sound like humans.",
        exercise: "Write the same content request with 0 constraints, then 3 constraints, then 7 constraints. See which output you'd actually use.",
        memoryTrick: "The Dominar Principle: Your bike runs best on a specific road, not an open field."
      },
      {
        day: 14,
        title: "Week 2 Integration: The Mega-Prompt",
        concept: "Combine advanced techniques from this week into production-grade prompts. By layering Chain-of-Thought + Meta-prompting + Perspective Shifting + XML Structure + Constraints, you create prompts that consistently produce 90th-percentile outputs.",
        framework: "The Architect's Blueprint",
        frameworkFull: "Layer all techniques into a single coherent prompt",
        bad: "Help me design a new feature for the application.",
        good: `<context>\nSSE at BHN, Schemes Team. Building email centralization: SQS queue -> Laravel 12 consumer -> BNS sendRaw endpoint.\nPOC approved, now designing the retry/DLQ strategy.\n</context>\n\n<role>Act as a distributed systems architect at Stripe who has built queue consumers processing 1M+ messages/day.</role>\n\n<instructions>\nDesign a retry + DLQ strategy for our email consumer.\n\nThink through these steps before answering:\n1. What failure modes exist? (transient vs permanent)\n2. What retry pattern fits? (exponential backoff? circuit breaker?)\n3. How do we handle poison messages?\n4. How do we alert and recover from DLQ?\n\nThen review your design from TWO perspectives:\n- Operations: Can we monitor and debug this at 3am?\n- Cost: What's the SQS cost at 10K messages/day?\n</instructions>\n\n<constraints>\nMax 500 words. Include a flow diagram in ASCII.\nNo Kafka (team has no experience). AWS-native only.\n</constraints>`,
        tip: "A mega-prompt is not about length. It's about clarity of structure. Each section has one job.",
        exercise: "Build a mega-prompt for your most complex current project. Use every technique from this week. Compare the output to what you'd get with your normal prompting style.",
        memoryTrick: "The Blueprint: Architects don't start building. They design first. Your prompt IS the blueprint."
      }
    ]
  },
  {
    id: 3,
    name: "Context Engineering",
    subtitle: "The 2026 frontier: beyond prompts",
    color: "#DDA0DD",
    days: [
      {
        day: 15,
        title: "From Prompts to Context",
        concept: "Andrej Karpathy's key insight: 'The LLM is like a CPU, and its context window is like RAM.' Prompt engineering is about crafting instructions. Context engineering is about managing EVERYTHING the model sees: instructions + memory + documents + tool definitions + conversation history. This is the 2026 skill gap.",
        framework: "W.S.C.I.",
        frameworkFull: "Write (persist) | Select (retrieve) | Compress (summarize) | Isolate (separate)",
        bad: "[Pasting your entire codebase into a prompt]",
        good: `Instead of dumping everything, engineer the context:\n\n1. WRITE: Save key decisions in a structured format the AI can reference later\n2. SELECT: Only include the 3-4 files relevant to THIS specific question\n3. COMPRESS: Summarize background context instead of pasting full docs\n4. ISOLATE: Keep different concerns in separate conversations\n\nExample: Instead of pasting all 116 email dispatch points,\ncreate a summary: "116 dispatch points across 5 repos:\n- cs-extranet: 34 points (Zend 1)\n- myschemes-extranet: 28 points (Zend 2)\n- schemes-api: 22 points (Laravel 12)\n- cs-public: 18 points (Zend 1)\n- cps-app: 14 points (Zend 1)"`,
        tip: "Research shows LLM accuracy drops 24% when relevant info is buried in long contexts. Less but better context wins.",
        exercise: "Take your longest recent conversation. Identify what context was necessary vs noise. Rewrite the opening prompt with compressed context.",
        memoryTrick: "W.S.C.I. = Whiskey Soda Cold Ice. Keep your context smooth, cold, and refreshing. No dilution."
      },
      {
        day: 16,
        title: "Memory as Context",
        concept: "Claude's memory, user preferences, and conversation history are all context that runs BEFORE your prompt. Understanding this means you can offload persistent information to these systems and keep your prompts lean and focused on the current task.",
        framework: "Layered Context Architecture",
        frameworkFull: "Permanent (memory) | Session (preferences) | Momentary (prompt)",
        bad: "I'm Vishwanath, SSE at BHN, I work on Laravel, AWS, PHP, my manager is Arun, I'm targeting 5-star review... [repeating this in every chat]",
        good: `Since Claude already knows your role, stack, team, and goals from memory:\n\n[Just the prompt]\n"The POC for email centralization passed. Help me write the rollout plan for Phase 1: migrating the 3 automated/scheduled email dispatch points first.\n\nFormat: Gantt-style timeline, 1 row per dispatch point, columns for: current state, migration step, testing, go-live date.\nAssume 2 weeks for Phase 1."`,
        tip: "Think of memory as your 'permanent context layer'. It runs on every chat. Your prompt only needs to add what's NEW.",
        exercise: "Review your Claude memory. Is it accurate? Is anything missing? Use the memory edit tool to add the 3 most important things that would help every future conversation.",
        memoryTrick: "The Backpack: Memory is what you always carry. Prompts are what you pick up for this specific trip."
      },
      {
        day: 17,
        title: "Tool-Aware Prompting",
        concept: "Modern AI has tools: web search, code execution, file creation, MCP integrations (Jira, Confluence, Google Drive). A great prompt tells the AI WHICH tools to use and HOW, instead of letting it guess.",
        framework: "T.A.P.",
        frameworkFull: "Tool | Action | Parameters",
        bad: "Find information about BHN's email infrastructure.",
        good: `Search BHN's Confluence for documentation about BNS (BHN Notification Services).\nSpecifically look for:\n1. The sendRaw API endpoint specification\n2. Any rate limits or throttling documentation\n3. Template management in EMC Console\n\nIf Confluence search returns nothing useful, then search Jira for tickets mentioning "BNS" or "sendRaw" from the last 6 months.\n\nSummarize findings in a table: Source | Key Detail | Relevance to Email Centralization.`,
        tip: "Telling the AI which tools to use (and in what order) prevents it from guessing wrong and wasting your time on irrelevant searches.",
        exercise: "List 5 tools available in your Claude setup (web search, Jira, Confluence, file creation, code execution). Write a prompt that uses at least 3 of them in sequence.",
        memoryTrick: "T.A.P. = Tap the right tool. Don't use a hammer to fix a circuit board."
      },
      {
        day: 18,
        title: "Multi-Turn Strategy",
        concept: "Long conversations degrade AI performance. Instead of one 50-message thread, design conversations with clear phases. Each phase has a goal, and you can start fresh threads for different phases while carrying over only the essential context.",
        framework: "Phase-Gate Conversations",
        frameworkFull: "Phase 1: Research | Phase 2: Design | Phase 3: Build | Phase 4: Review",
        bad: "[One 40-message thread that starts with research, drifts into coding, then circles back to design]",
        good: `Thread 1 (Research):\n"Search Confluence for BNS docs. Summarize in a brief."\n\nThread 2 (Design):\n[Paste the brief from Thread 1]\n"Design the retry strategy based on this. Output: architecture doc."\n\nThread 3 (Build):\n[Paste the architecture doc]\n"Implement the SQS consumer class based on this design."\n\nThread 4 (Review):\n[Paste the code]\n"Review this for security and edge cases."`,
        tip: "Each thread starts clean with compressed context from the previous phase. This prevents the 'context confusion' that happens in long threads.",
        exercise: "Take your next complex project and plan it as 4 separate threads before you start. Define what each thread inputs and outputs.",
        memoryTrick: "The Relay Race: Each thread is a runner. Pass the baton (context), don't carry the whole team."
      },
      {
        day: 19,
        title: "Prompt Templates as Code",
        concept: "The best prompt engineers don't write prompts from scratch. They maintain a library of tested, versioned templates with fill-in-the-blank placeholders. Treat prompts like code: version them, test them, iterate them.",
        framework: "Template Library",
        frameworkFull: "5 Master Templates covering 80% of your tasks",
        bad: "[Writing every prompt from scratch, every time]",
        good: `Your Personal Template Library:\n\n1. DEBUG:\n   [Error] + [Service] + [Environment] + [Recent Change]\n   "Diagnose root cause. Top 3 causes ranked by probability."\n\n2. LEARN:\n   [Topic] + [My Level] + [My Stack]\n   "Teach: Analogy -> How it works -> Code example -> Memory trick"\n\n3. PROPOSE:\n   [Initiative] + [Audience] + [Framework: P.S.I.E.]\n   "Write a 1-page proposal a non-technical leader can approve in 5 min"\n\n4. REVIEW:\n   [Code] + [Language] + [Focus area]\n   "Review as Staff Engineer. Flag P0-P3 with fixes."\n\n5. CREATE:\n   [Platform] + [Type] + [Tone] + [Constraints]\n   "Write 2 versions: casual and polished."`,
        tip: "Store templates in a markdown file, Notion page, or even as a GitHub gist. Pull them up before every AI conversation.",
        exercise: "Create your 5 master templates right now. Then use them for the next 7 days straight. Refine after each use.",
        memoryTrick: "The Toolbox: A carpenter doesn't forge new tools every morning. They reach for their tested set."
      },
      {
        day: 20,
        title: "Evaluating AI Outputs",
        concept: "Getting a good output is only half the skill. The other half is evaluating whether the output is actually right, complete, and useful. Develop a critical eye: don't accept the first response just because it sounds confident.",
        framework: "V.E.R.I.F.Y.",
        frameworkFull: "Validate facts | Evaluate completeness | Review tone | Inspect edge cases | Flag assumptions | Yank it if wrong",
        bad: "[Accepting the first response without checking]",
        good: `After every important AI output, run this check:\n\n1. VALIDATE: Are the facts checkable? Did it cite real tools/APIs?\n2. EVALUATE: Did it answer the FULL question or just part?\n3. REVIEW: Is the tone right for the audience?\n4. INSPECT: What edge cases did it miss?\n5. FLAG: What assumptions did it make that I didn't state?\n6. YANK: If 2+ checks fail, don't iterate. Rewrite the prompt from scratch.`,
        tip: "The 'Yank Rule': If the output is fundamentally off-track, don't polish garbage. Start over with a better prompt. It's faster.",
        exercise: "Take the last 5 AI outputs you used. Run V.E.R.I.F.Y. on each. How many would you have caught issues in?",
        memoryTrick: "V.E.R.I.F.Y. = Verify Everything, Really. It's For You."
      },
      {
        day: 21,
        title: "The 1% Compound: Your Prompting System",
        concept: "The final day ties everything together into a sustainable daily practice. Your prompting quality compounds like your 1% daily improvement philosophy. Small improvements in how you talk to AI multiply into massive productivity gains over months.",
        framework: "The Daily Prompt Habit",
        frameworkFull: "Before | During | After every AI conversation",
        bad: "[Opening Claude and just typing whatever comes to mind]",
        good: `BEFORE (10 seconds):\n- Run C.R.I.S.P. mentally\n- Pick the right template from your library\n- Decide: is this a 1-prompt task or a multi-phase project?\n\nDURING:\n- Watch for drift. Is the AI going off-track? Redirect early.\n- Use iteration strategically (B.R.H. Protocol)\n- If output is wrong, check your prompt before blaming the AI\n\nAFTER:\n- Did this prompt work? Save it.\n- Did it fail? Note WHY and fix the template.\n- Weekly: review your prompt library. Update what's stale.`,
        tip: "The person who writes the best prompts in 2026 isn't the one who knows the most techniques. It's the one who has the best personal prompt library, built from real experience.",
        exercise: "Set a weekly 15-minute 'Prompt Review' on your calendar. Every Friday, review the week's prompts. Save winners. Fix losers. Your library grows by 2-3 templates per month.",
        memoryTrick: "The Compound Effect: If prompting is 1% better each day, you're 37x better in a year. That's your philosophy, applied to AI."
      }
    ]
  }
];

const ALL_DAYS = PHASES.flatMap(p => p.days.map(d => ({ ...d, phase: p })));

const CHEAT_SHEET = [
  { technique: "C.R.I.S.P.", when: "Every prompt", benefit: "Eliminates 80% of vagueness" },
  { technique: "Few-Shot (E.I.O.)", when: "Structured/formatted output", benefit: "3 examples > 1 page of instructions" },
  { technique: "Chain-of-Thought (S.T.E.P.)", when: "Complex reasoning, decisions", benefit: "Reduces hallucinations by 40%" },
  { technique: "Meta-Prompting", when: "You're stuck or facing complexity", benefit: "AI helps you ask better" },
  { technique: "Perspective Shifting", when: "Strategy, proposals, trade-offs", benefit: "Catches blind spots" },
  { technique: "Negative Prompting", when: "Avoiding generic AI output", benefit: "Eliminates filler and cliches" },
  { technique: "XML Tags", when: "Claude-specific, long prompts", benefit: "Unambiguous section boundaries" },
  { technique: "Constraint-Based", when: "Creative or open-ended tasks", benefit: "Tighter = more human-sounding" },
  { technique: "Template Library", when: "Recurring tasks (80% of work)", benefit: "3-second prompt start time" },
  { technique: "Phase-Gate Threads", when: "Multi-step complex projects", benefit: "Prevents context confusion" },
];

// ─── COMPONENTS ───

function PhaseNav({ activePhase, setActivePhase }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
      {PHASES.map(p => (
        <button key={p.id} onClick={() => setActivePhase(p.id)} style={{
          background: activePhase === p.id ? `${p.color}22` : "rgba(255,255,255,0.03)",
          border: `1.5px solid ${activePhase === p.id ? p.color : "rgba(255,255,255,0.08)"}`,
          borderRadius: 10,
          padding: "10px 18px",
          color: activePhase === p.id ? p.color : "#888",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.25s ease",
          letterSpacing: 0.3
        }}>
          Phase {p.id}: {p.name}
        </button>
      ))}
      <button onClick={() => setActivePhase(0)} style={{
        background: activePhase === 0 ? "rgba(135,206,235,0.15)" : "rgba(255,255,255,0.03)",
        border: `1.5px solid ${activePhase === 0 ? "#87CEEB" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 10,
        padding: "10px 18px",
        color: activePhase === 0 ? "#87CEEB" : "#888",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        transition: "all 0.25s ease"
      }}>
        Cheat Sheet
      </button>
    </div>
  );
}

function DayCard({ day, phase, isExpanded, onToggle, isDone, onToggleDone }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: `1px solid ${isExpanded ? phase.color + "44" : isDone ? phase.color + "22" : "rgba(255,255,255,0.06)"}`,
      borderRadius: 14,
      overflow: "hidden",
      transition: "all 0.3s ease",
      marginBottom: 10
    }}>
      <div onClick={onToggle} style={{
        padding: "16px 20px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        userSelect: "none"
      }}>
        <div onClick={e => { e.stopPropagation(); onToggleDone(); }} style={{
          width: 42, height: 42, borderRadius: 10,
          background: isDone ? `${phase.color}25` : `${phase.color}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 800, color: phase.color, flexShrink: 0,
          fontFamily: "'Outfit', sans-serif",
          border: isDone ? `2px solid ${phase.color}66` : "2px solid transparent",
          transition: "all 0.25s"
        }}>
          {isDone ? "✓" : `D${day.day}`}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: isDone ? "#888" : "#F0E8DF", fontWeight: 700, fontSize: 15, fontFamily: "'Outfit', sans-serif", textDecoration: isDone ? "line-through" : "none", transition: "all 0.25s" }}>{day.title}</div>
          <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{day.framework}: {day.frameworkFull}</div>
        </div>
        <span style={{ color: "#666", fontSize: 16, transition: "transform 0.3s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </div>

      {isExpanded && (
        <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${phase.color}15` }}>
          {/* Concept */}
          <div style={{ margin: "16px 0", padding: 14, background: "rgba(0,0,0,0.25)", borderRadius: 10, borderLeft: `3px solid ${phase.color}` }}>
            <div style={{ color: phase.color, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>Core Concept</div>
            <div style={{ color: "#D4C9BD", fontSize: 13.5, lineHeight: 1.7 }}>{day.concept}</div>
          </div>

          {/* Before / After */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "12px 0" }}>
            <div style={{ background: "rgba(255,107,107,0.06)", borderRadius: 10, padding: 14, borderTop: "2px solid #FF6B6B" }}>
              <div style={{ color: "#FF6B6B", fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>BEFORE</div>
              <pre style={{ color: "#C4B8AC", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
                {day.bad}
              </pre>
            </div>
            <div style={{ background: "rgba(78,205,196,0.06)", borderRadius: 10, padding: 14, borderTop: "2px solid #4ECDC4" }}>
              <div style={{ color: "#4ECDC4", fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>AFTER</div>
              <pre style={{ color: "#C4B8AC", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
                {day.good}
              </pre>
            </div>
          </div>

          {/* Tip */}
          <div style={{ background: "rgba(232,168,56,0.08)", borderRadius: 10, padding: "12px 14px", margin: "10px 0", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <div style={{ color: "#D4C9BD", fontSize: 13, lineHeight: 1.6 }}>{day.tip}</div>
          </div>

          {/* Memory Trick */}
          <div style={{ background: "rgba(221,160,221,0.08)", borderRadius: 10, padding: "12px 14px", margin: "10px 0", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🧠</span>
            <div>
              <div style={{ color: "#DDA0DD", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TYSON'S MEMORY TRICK</div>
              <div style={{ color: "#D4C9BD", fontSize: 13, lineHeight: 1.6 }}>{day.memoryTrick}</div>
            </div>
          </div>

          {/* Exercise */}
          <div style={{ background: "rgba(78,205,196,0.08)", borderRadius: 10, padding: "12px 14px", margin: "10px 0 0", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🏋️</span>
            <div>
              <div style={{ color: "#4ECDC4", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TODAY'S EXERCISE</div>
              <div style={{ color: "#D4C9BD", fontSize: 13, lineHeight: 1.6 }}>{day.exercise}</div>
            </div>
          </div>

          {/* Mark as Done */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              onClick={e => { e.stopPropagation(); onToggleDone(); }}
              style={{
                background: isDone ? `${phase.color}18` : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${isDone ? phase.color : "rgba(255,255,255,0.1)"}`,
                borderRadius: 10, padding: "10px 28px", cursor: "pointer",
                color: isDone ? phase.color : "#888", fontSize: 13, fontWeight: 700,
                transition: "all 0.25s", letterSpacing: 0.5
              }}
            >
              {isDone ? "✓ Completed" : "Mark as Done"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CheatSheet() {
  return (
    <div style={{ maxWidth: 740, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#87CEEB", fontFamily: "'Outfit', sans-serif" }}>Quick Reference Cheat Sheet</div>
        <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Your 10 techniques at a glance</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CHEAT_SHEET.map((item, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr 1fr",
            gap: 12,
            padding: "12px 16px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            alignItems: "center"
          }}>
            <div style={{ color: "#87CEEB", fontWeight: 700, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{item.technique}</div>
            <div style={{ color: "#A09890", fontSize: 12 }}>{item.when}</div>
            <div style={{ color: "#D4C9BD", fontSize: 12 }}>{item.benefit}</div>
          </div>
        ))}
      </div>

      {/* The Golden Rule */}
      <div style={{
        marginTop: 24,
        background: "linear-gradient(135deg, rgba(232,168,56,0.12), rgba(78,205,196,0.08))",
        border: "1px solid rgba(232,168,56,0.2)",
        borderRadius: 14,
        padding: 24,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#F0E8DF", marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>
          The Golden Rule of Prompting
        </div>
        <div style={{ color: "#D4C9BD", fontSize: 14, lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
          Clarity beats cleverness. Every time.
          <br />
          The effort you put into your question determines the value you get from the answer.
          <br /><br />
          <span style={{ color: "#E8A838", fontWeight: 700 }}>
            If your prompt could be misunderstood, it will be.
          </span>
        </div>
      </div>

      {/* Evolution note */}
      <div style={{
        marginTop: 20,
        padding: 20,
        background: "rgba(221,160,221,0.06)",
        border: "1px solid rgba(221,160,221,0.12)",
        borderRadius: 14,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#DDA0DD", marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>
          The 2026 Evolution
        </div>
        <div style={{ color: "#A09890", fontSize: 13, lineHeight: 1.7 }}>
          The industry is shifting from <span style={{ color: "#FF6B6B" }}>Prompt Engineering</span> (crafting single instructions)
          <br />to <span style={{ color: "#4ECDC4" }}>Context Engineering</span> (managing everything the model sees).
          <br /><br />
          As Andrej Karpathy puts it: "The LLM is the CPU. The context window is RAM.
          <br />Your job is to be the operating system."
          <br /><br />
          <span style={{ color: "#DDA0DD", fontWeight: 600 }}>This masterclass covers both. Days 1-14 master the prompt. Days 15-21 master the context.</span>
        </div>
      </div>
    </div>
  );
}

export default function PromptMasterclass() {
  const [activePhase, setActivePhase] = useState(1);
  const [expandedDays, setExpandedDays] = useState({});
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem("masterclass_prompt-engineering_done")) || {}; }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("masterclass_prompt-engineering_done", JSON.stringify(done));
  }, [done]);

  const toggleDay = (dayNum) => {
    setExpandedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };
  const toggleDone = (dayNum) => setDone(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));

  const doneCount = Object.values(done).filter(Boolean).length;
  const currentPhase = PHASES.find(p => p.id === activePhase);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#161412",
      color: "#E8E0D6",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: "28px 16px"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: "#A09890", letterSpacing: 4, textTransform: "uppercase", marginBottom: 10 }}>
          21-Day Masterclass
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 6px", color: "#F5EDE6", fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>
          Prompt Engineering
        </h1>
        <div style={{ fontSize: 14, color: "#E8A838", fontWeight: 600 }}>From 58/100 to 85+ in 21 Days</div>
        <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
          Curated from latest 2026 research + your actual prompting patterns
        </div>
        <div style={{ fontSize: 13, color: doneCount === 21 ? "#4ECDC4" : "#888", marginTop: 8, fontWeight: 600 }}>
          {doneCount}/21 days completed {doneCount === 21 ? "🎉" : ""}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        display: "flex", gap: 3, justifyContent: "center", margin: "20px auto",
        maxWidth: 500, flexWrap: "wrap"
      }}>
        {ALL_DAYS.map(d => (
          <div key={d.day} title={`Day ${d.day}: ${d.title}`} style={{
            width: 20, height: 6, borderRadius: 3,
            background: done[d.day] ? d.phase.color : `${d.phase.color}30`,
            transition: "all 0.3s",
            cursor: "pointer"
          }} onClick={() => { setActivePhase(d.phase.id); toggleDay(d.day); }} />
        ))}
      </div>

      {/* Phase Nav */}
      <PhaseNav activePhase={activePhase} setActivePhase={setActivePhase} />

      {/* Phase Header */}
      {activePhase > 0 && currentPhase && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: currentPhase.color, fontFamily: "'Outfit', sans-serif" }}>
            {currentPhase.name}
          </div>
          <div style={{ color: "#888", fontSize: 13 }}>{currentPhase.subtitle} | Days {currentPhase.days[0].day}-{currentPhase.days[currentPhase.days.length-1].day}</div>
        </div>
      )}

      {/* Day Cards */}
      {activePhase > 0 && currentPhase && (
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {currentPhase.days.map(day => (
            <DayCard
              key={day.day}
              day={day}
              phase={currentPhase}
              isExpanded={expandedDays[day.day]}
              onToggle={() => toggleDay(day.day)}
              isDone={!!done[day.day]}
              onToggleDone={() => toggleDone(day.day)}
            />
          ))}
        </div>
      )}

      {/* Cheat Sheet */}
      {activePhase === 0 && <CheatSheet />}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 36, padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ color: "#555", fontSize: 11 }}>
          Built by Tyson | Sources: Anthropic Docs, Karpathy (2025), LangChain, Prompt Engineering Guide, DEV Community, Lakera, Analytics Vidhya | Your 1% starts here
        </div>
      </div>
    </div>
  );
}
