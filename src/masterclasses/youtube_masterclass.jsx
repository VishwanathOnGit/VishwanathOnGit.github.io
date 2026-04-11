import { useState, useEffect } from "react";

const PHASES = [
  {
    id: 1, name: "Identity", tag: "Days 1-15", color: "#E8A838", icon: "🪞",
    subtitle: "Who are you on camera? What is Vishwa Motovlogs really about?",
    intro: "Before you shoot a single frame, you need clarity. The channels that grow aren't the ones with the best cameras. They're the ones where the creator knows exactly who they are and who they're talking to. This phase is about finding YOUR voice, not copying someone else's.",
    weeks: [
      {
        title: "Week 1: Self-Discovery (Days 1-7)",
        days: [
          { day: 1, title: "The Mirror Ride", task: "Record yourself talking for 5 minutes about WHY you ride. Not what you ride. WHY. Watch it back. Write down 3 words that describe how you felt watching yourself.", insight: "The best motovloggers succeed because of personality, not production. UK07 Rider has 7.8M subs because of his candid energy, not his camera." },
          { day: 2, title: "Audience Avatar", task: "Describe your ideal viewer in one paragraph. Age, what they do, what they dream about, what scares them about solo travel. Give this person a name. Every future video is for THIS person.", insight: "YouTube's algorithm tests videos with small audiences first. If that small audience loves it, YouTube pushes wider. Knowing your viewer = knowing your small test audience." },
          { day: 3, title: "Your Unfair Advantage", task: "List 5 things that make YOU different from every other Indian motovlogger. Your engineering brain? Your 1% philosophy? Your solo courage? Your Telugu roots? Your Dominar 400 (not a Royal Enfield!)? Write them down.", insight: "Generic 'I travelled to X' content is oversaturated. Channels with a clear, distinctive angle grow faster." },
          { day: 4, title: "Channel Audit", task: "Watch your Bangalore-to-Vizag series with fresh eyes. For each episode: what moment made you feel something? What felt flat? What would you do differently? Be brutally honest.", insight: "Your best teacher is your own past work. Patterns in what felt 'real' vs 'forced' reveal your authentic style." },
          { day: 5, title: "Competitor Study", task: "Watch 1 video each from: Toll Free Traveller (calm storytelling), One World One Ride (spirit-driven), FortNine (scripting mastery). For each: what made you stop scrolling? Write the exact moment.", insight: "You're not copying them. You're identifying what WORKS in the format so you can apply it to YOUR voice." },
          { day: 6, title: "The Elevator Pitch", task: "Write a 2-sentence description of your channel that would make a stranger subscribe. Test it on 3 people. Refine until it clicks.", insight: "If you can't describe your channel in 2 sentences, viewers can't either. And YouTube can't figure out who to recommend you to." },
          { day: 7, title: "Identity Lock-In", task: "Write your Channel Identity Document: (1) Who I am, (2) Who I serve, (3) What they get that nobody else gives them, (4) My 3 signature words. Pin this above your desk.", insight: "This document is your north star. Every future video idea gets tested against it. Does it fit? Ship it. Doesn't fit? Kill it." }
        ]
      },
      {
        title: "Week 2: Content Architecture (Days 8-15)",
        days: [
          { day: 8, title: "The 3 Pillars", task: "Define 3 content pillars for your channel. Example: (1) Solo Ride Stories, (2) Life on the Road (budget, food, people), (3) The Inner Journey (personal growth, lessons, fears). Every video must fit one pillar.", insight: "YouTube rewards consistent series. 2-3 repeatable formats signal a clear niche to both algorithm and viewers." },
          { day: 9, title: "Series Design", task: "Plan 3 series with names and episode structures. Example: 'The 1000km Diaries' (multi-day ride stories), 'Pit Stops' (short 5-min life lessons from the road), 'Chai & Chat' (Q&A/reflection). Name them. Own them.", insight: "Series create binge-watching behavior. If viewers watch multiple episodes, YouTube learns the audience's interest and recommends more." },
          { day: 10, title: "Title & Thumbnail Science", task: "Write 10 title variations for your next video. Apply the formula: Topic + Promise + Curiosity. Example: 'I Rode 400km Alone to a Village Nobody Visits' vs 'My Recent Ride'. Design thumbnail: big text (3-4 words), your face with emotion, high contrast.", insight: "Your thumbnail determines CTR, the biggest growth lever on YouTube. Good thumbnails get clicked by strangers. Great thumbnails get recommended." },
          { day: 11, title: "The Hook Formula", task: "Study the first 15 seconds of 10 successful motovlogs. Write down what they do. Then write 5 different opening hooks for your next video. Test: would YOU keep watching?", insight: "Videos that keep 80% of viewers past the 15-second mark get significantly more reach. Your hook is not an intro animation. It's a question, a moment, a feeling." },
          { day: 12, title: "Story Structure", task: "Learn the 3-Act Motovlog Structure: Setup (first 2 min: where, what, why should they care), Journey (the ride, the surprises, the real moments), Reflection (what you learned, what changed). Map your next video to this.", insight: "Beautiful footage without a story is a screensaver. Narrative arc is what separates 1K-sub channels from 1M-sub channels." },
          { day: 13, title: "Content Calendar", task: "Plan your next 30 days of content. 1 long-form video per week + 2-3 Shorts. Map each to a pillar and series. Include: topic, title draft, thumbnail concept, filming date, publish date.", insight: "One well-researched video per week outperforms seven random daily uploads. Consistency in quality > consistency in quantity." },
          { day: 14, title: "The Shorts Strategy", task: "From your Vizag series, extract 5 potential Shorts: a stunning moment, a funny reaction, a life lesson clip, a food moment, a scenic transition. Each under 60 seconds with a hook in the first 2 seconds.", insight: "Shorts are the fastest discovery engine in 2026. 70+ billion daily views. Most new subscribers now come from Shorts, not long videos." },
          { day: 15, title: "Phase 1 Checkpoint", task: "Review everything: identity doc, 3 pillars, 3 series, content calendar, 5 Shorts ideas. Record a 2-minute video talking about what you discovered about yourself this phase. Don't publish it. Just watch it.", insight: "This checkpoint video becomes your 'before' tape. In 75 days, you'll watch it again and see the growth." }
        ]
      }
    ]
  },
  {
    id: 2, name: "Craft", tag: "Days 16-35", color: "#4ECDC4", icon: "🎬",
    subtitle: "The technical skills that separate amateurs from creators",
    intro: "Now that you know WHO you are, it's time to learn HOW to communicate that on screen. This phase covers filming, audio, editing, storytelling on camera, and the specific technical skills that make motovlog content watchable and shareable.",
    weeks: [
      {
        title: "Week 3: Camera & Audio Mastery (Days 16-21)",
        days: [
          { day: 16, title: "B-Roll Bible", task: "Go on a 30-minute ride near home. Shoot ONLY B-roll: the road, the mirror, your hand on the throttle, a chai stall, a sunset, locals waving. Get 20 different shots. No talking.", insight: "B-roll is the visual spice. A motovlog with only helmet-cam talking head gets boring fast. B-roll creates breathing room and visual variety." },
          { day: 17, title: "Audio is 50% of Video", task: "Test 3 audio setups: (1) helmet mic only, (2) phone voice memo synced later, (3) Bluetooth mic. Listen back on headphones. Pick the one where your voice sounds clearest with minimal wind noise.", insight: "Viewers will forgive slightly shaky video. They will NOT forgive bad audio. RAW motorcycle audio under your voiceover adds authenticity." },
          { day: 18, title: "The Golden Hour Challenge", task: "Film the same stretch of road at 3 different times: harsh noon, golden hour (6pm), and blue hour (6:30pm). Compare the footage. Feel the difference light makes.", insight: "Film during golden hour whenever possible. Light quality transforms travel footage from 'phone video' to 'cinematic'." },
          { day: 19, title: "Talking to Camera Solo", task: "Set up your camera at a scenic stop. Talk for 3 minutes about something real: a fear, a memory, a lesson from the road. Watch it back. Note: where did you feel natural? Where did you perform?", insight: "The hardest skill in solo vlogging is being vulnerable on camera with nobody watching. The more you practice, the more natural it becomes." },
          { day: 20, title: "The Editing Workflow", task: "Edit a 5-minute video from today's footage. Use this structure: Hook (5s) -> Title card -> Story -> B-roll montage -> Reflection -> End screen. Time yourself. Build a repeatable editing template.", insight: "A motovlog editing session takes 4-5 hours for a one-day ride. Build a template so each video starts from structure, not a blank timeline." },
          { day: 21, title: "Music & Pacing", task: "Take one 2-minute clip. Edit it twice: once with upbeat music and fast cuts, once with ambient/lo-fi and slower cuts. Feel how music changes the emotional experience. Choose your channel's default mood.", insight: "Music sets the emotional tone. Your music choices become part of your brand. Viewers associate certain sounds with YOUR channel." }
        ]
      },
      {
        title: "Week 4-5: Storytelling on Two Wheels (Days 22-35)",
        days: [
          { day: 22, title: "The Vulnerability Edit", task: "In your next video, include one genuinely vulnerable moment: something that scared you, a mistake you made, a moment of loneliness on the road. Don't sugarcoat it.", insight: "Personal growth and self-discovery during a solo journey resonates deeply. Viewers connect with honesty more than perfection." },
          { day: 23, title: "Local Stories", task: "On your next ride, stop at 3 places and talk to locals. A dhaba owner, a mechanic, a roadside vendor. Ask them one question: 'What's the best thing about living here?' Film their answers.", insight: "The best travel vlogs aren't about places. They're about people. A 2-minute conversation with a chai wallah can be more memorable than 10 minutes of drone footage." },
          { day: 24, title: "The Budget Episode", task: "Plan and film a 'What it actually costs' video. Show every expense of a ride: petrol, food, stay, repairs. Be specific with numbers. Add tips for doing it cheaper.", insight: "Your Vizag series bonus episode on budget worked well. 'How much did this trip cost' is one of the highest-searched queries for travel content in India." },
          { day: 25, title: "Narration Practice", task: "Write a 200-word voiceover script for a 1-minute scenic montage. Record it 3 times: once reading, once from memory, once improvised. Compare. Find your middle ground between scripted and natural.", insight: "The best motovloggers sound like they're talking to a friend, not reading a script. But they've practiced enough that their 'natural' is actually refined." },
          { day: 26, title: "The Cold Open", task: "For your next video, start with the most dramatic or emotional moment from the middle of the ride. Then cut to 'X hours earlier' and build towards it. This is non-linear storytelling.", insight: "Opening with a dramatic moment then rewinding creates instant curiosity. 'Wait, how did he get there?' keeps people watching." },
          { day: 27, title: "Thumbnail Masterclass", task: "Design 3 different thumbnails for the same video. Ask 5 people (not just bikers): which one would you click? Track which gets the most votes. Learn what actually catches a stranger's eye.", insight: "A/B test thumbnails. Even changing the color or facial expression can swing CTR from 4% to 11%." },
          { day: 28, title: "Shorts Factory", task: "From your latest ride, create 5 Shorts in one editing session. Template: Hook (1-2s) -> Quick story/moment (25-40s) -> Payoff/lesson (5-10s) -> Call to watch the full video.", insight: "From ONE YouTube video, you can create 3-5 Shorts, 3-5 Reels, 10+ caption quotes, and 1 community post. One ride = one week of content." },
          { day: 29, title: "The 'Zero Budget' Challenge", task: "Film an entire video using only your phone. No action cam, no drone, no external mic. Constraints breed creativity. Focus purely on story.", insight: "Your phone is good enough. The story is what matters. Some of the most viral motovlogs were filmed on basic setups with incredible stories." },
          { day: 30, title: "SEO Without Selling Your Soul", task: "Research 10 keywords your audience actually searches. Use YouTube search suggestions (type 'solo bike ride...' and see what auto-completes). Use these as video title seeds, not clickbait.", insight: "SEO in 2026 is about intent matching, not keyword stuffing. Titles that promise a clear outcome perform best." },
          { day: 31, title: "The Description Template", task: "Create a standard video description template: (1) 2-line hook with keywords naturally included, (2) Timestamps/chapters, (3) Gear list, (4) Social links, (5) Hashtags. Use this for every video.", insight: "Chapters make your video searchable. YouTube can serve specific chapters in search results, giving you more entry points." },
          { day: 32, title: "Community Post Strategy", task: "Write 5 community posts: (1) Behind-the-scenes photo, (2) Poll (next ride: Coorg or Hampi?), (3) Life lesson from the road, (4) Throwback to an old ride, (5) Question to your audience. Schedule them.", insight: "Community posts keep your audience engaged between videos. YouTube rewards channels where viewers interact regularly, not just on upload day." },
          { day: 33, title: "Publish & Analyze", task: "Publish your best video from this phase. After 48 hours, check: CTR, average view duration, audience retention graph (where do people drop off?), traffic sources. Write 3 lessons.", insight: "The retention graph is your best teacher. Every dip tells you 'this part lost people.' Every flat line tells you 'this held attention.' Study it like a map." },
          { day: 34, title: "The Feedback Loop", task: "Share your video with 3 people who are NOT bikers. Ask: 'Did you enjoy this? Where did you get bored? Would you subscribe?' Non-biker feedback reveals if your content transcends the niche.", insight: "Channels that grow beyond their niche do so because the stories are universal. A ride story about facing fear is relatable to everyone, not just riders." },
          { day: 35, title: "Phase 2 Checkpoint", task: "You should have published at least 2 long-form videos and 5+ Shorts. Review your analytics dashboard. What surprised you? What pattern do you see? Write a 1-page reflection.", insight: "Phase 2 is about reps. You're building the muscle memory of filming, editing, and publishing. Quality improves through doing, not planning." }
        ]
      }
    ]
  },
  {
    id: 3, name: "Growth", tag: "Days 36-55", color: "#DDA0DD", icon: "📈",
    subtitle: "The systems that turn viewers into subscribers into community",
    intro: "You've found your identity and built your craft. Now it's time to build the systems that create sustainable growth. This phase is about understanding the algorithm, building community, and creating content that spreads.",
    weeks: [
      {
        title: "Week 6-7: Algorithm & Community (Days 36-49)",
        days: [
          { day: 36, title: "The Algorithm Decoded", task: "Study these 3 metrics obsessively for the next 20 days: (1) CTR (aim for 5%+), (2) Average View Duration (aim for 50%+ of video length), (3) Session Start Rate (do viewers start a YouTube session with YOUR video?). Check daily.", insight: "YouTube rewards 3 things: Click-Through Rate, Retention, and Satisfaction. If viewers click and keep watching, YouTube pushes to thousands more." },
          { day: 37, title: "The Binge Machine", task: "Create a playlist strategy: organize your videos into series-based playlists. Add end screens that link to the NEXT episode, not just 'another video'. Design your channel page to invite binge-watching.", insight: "Playlist views increase session time dramatically. YouTube promotes creators whose content keeps people ON YouTube longer." },
          { day: 38, title: "Comment Strategy", task: "For the next 20 days: reply to EVERY comment within 24 hours. Pin the most interesting one. Ask a follow-up question in your reply. Turn comments into conversations.", insight: "Replying to comments sends strong engagement signals. It also encourages community growth, which the algorithm rewards with better reach." },
          { day: 39, title: "Collaboration Seed Planting", task: "Find 5 creators at your level (200-2000 subs) in adjacent niches: travel, adventure sports, food, photography. Comment genuinely on 3 of their videos. Build relationships before asking for anything.", insight: "Micro-collaborations at your level are more valuable than dreaming about collabs with big creators. Same-size creators share the same audience." },
          { day: 40, title: "Cross-Platform Repurposing", task: "Take your best-performing video. Create: 3 Instagram Reels (different moments), 1 LinkedIn post (the lesson, not the ride), 1 X/Twitter thread (the story in text), 5 carousel slides.", insight: "Each platform feeds the other. A Reel can drive someone to your YouTube. A LinkedIn post can attract a completely different audience." },
          { day: 41, title: "The Subscriber Magnet", task: "Watch your videos and mark every place where you could add a natural subscribe prompt. Not 'smash that bell button.' Instead: 'If stories like this make your Monday better, you know what to do.' Make it human.", insight: "The subscribe prompt works best when it's woven into the story, not bolted on. Ask after delivering value, never at the beginning." },
          { day: 42, title: "Trend Jacking (Ethically)", task: "Search YouTube trending for travel/motovlog topics. Find one trending topic you can genuinely connect to your style. Create a video within 48 hours. Speed matters with trends.", insight: "Trends give you a traffic spike. Your identity keeps them staying. Use trends as the door, not the house." },
          { day: 43, title: "The 'Why I Ride Alone' Video", task: "Create a deeply personal video about solo riding. Not a ride vlog. A sit-down reflection. Why you choose solo. What it teaches you. The loneliness and the freedom. This is your cornerstone content.", insight: "Cornerstone content is the video that defines your channel. It's the one you pin. The one that makes strangers understand what you're about in 10 minutes." },
          { day: 44, title: "Analytics Deep Dive", task: "Spend 1 hour in YouTube Studio analytics. Find: (1) Your best-performing video and WHY, (2) Where most viewers come from (search vs suggested vs shorts), (3) Your audience's other interests. Write an insights report.", insight: "Data doesn't replace instinct. But it sharpens it. Understanding WHERE viewers find you tells you where to invest more energy." },
          { day: 45, title: "The Monetization Blueprint", task: "Even if you're pre-monetization, plan your future revenue streams: (1) AdSense, (2) Brand deals (gear, travel companies), (3) Merchandise (stickers, t-shirts with your catchphrase), (4) Digital products (ride route guides).", insight: "The monetization target is 1,000 subs + 4,000 watch hours (or 10M Shorts views in 90 days). But mindset matters: build the community first, the money follows." },
          { day: 46, title: "Engage 10 Strangers", task: "Find 10 videos from small creators in your niche. Leave genuinely helpful, specific comments (not 'nice video'). Example: 'That sunrise shot at 3:24 was incredible. What time did you have to wake up for that?' Be the commenter you wish you had.", insight: "Real engagement builds real relationships. These 10 creators may become collaborators, cross-promoters, or friends. Genuine > transactional." },
          { day: 47, title: "The Failure Video", task: "Create a video about something that went wrong on a ride. A breakdown, getting lost, running out of fuel, bad weather. Show the raw frustration AND the resolution. Title it honestly.", insight: "Failure content outperforms success content for small creators because it's vulnerable, relatable, and surprising. People expect perfection. Honesty stands out." },
          { day: 48, title: "Batch Filming Day", task: "Dedicate one full day to batch-creating content: 2 Shorts intros, 5 community post photos, thumbnail photos at 3 scenic spots, a sit-down reflection clip, and audio for a voiceover. Bank it all.", insight: "Batch creating separates sustainable creators from burned-out ones. 1 dedicated day = 2 weeks of content. This is how solo creators survive." },
          { day: 49, title: "Phase 3 Checkpoint", task: "By now: 5+ long-form videos published, 15+ Shorts, consistent community posts. Check subscriber growth trend. Are you growing week-over-week? What content type drives the most subs? Adjust your calendar.", insight: "Growth is never linear. You'll have flat weeks and spike weeks. The flat weeks are where character is built. Keep showing up." }
        ]
      }
    ]
  },
  {
    id: 4, name: "Personal Growth", tag: "Days 50-65", color: "#FF6B6B", icon: "🌱",
    subtitle: "The person behind the camera matters more than the content",
    intro: "This is where Vishwa Motovlogs becomes different from every other motovlog channel. You said it yourself: 'I am trying to be a better person by putting myself out there.' This phase is about the INNER work that makes the outer work meaningful.",
    weeks: [
      {
        title: "Week 8-9: The Inner Journey (Days 50-65)",
        days: [
          { day: 50, title: "The 1% Video Series", task: "Start a micro-series: '1% Better Today'. Each episode is under 3 minutes. One small lesson from the day. Film it wherever you are: a dhaba, your room, a petrol pump. Raw and real.", insight: "Your 1% philosophy IS your content differentiator. No other motovlogger has this angle. It's where your engineering discipline meets your creative soul." },
          { day: 51, title: "Fear Inventory", task: "Write down 5 things that scare you about content creation: being judged, failing publicly, not being interesting enough, comparing to bigger creators, running out of ideas. Pick one. Make a video about it.", insight: "Naming your fears takes away their power. And sharing them makes your audience feel like they have permission to be scared too." },
          { day: 52, title: "The Gratitude Ride", task: "Go on a ride with ONE rule: no filming until you feel genuinely grateful for something. When the moment hits, film that. The video is about the moment gratitude struck, not the ride.", insight: "Gratitude content is the antidote to the performative trap. It reminds YOU why you started. And it resonates deeply with viewers tired of fake energy." },
          { day: 53, title: "Feedback Without Ego", task: "Ask your harshest-but-honest friend to watch your last 3 videos and give brutal feedback. Listen without defending. Write down every point. Thank them. Implement 2 changes.", insight: "The gap between where you are and where you want to be lives in the feedback you're avoiding. Seek it actively." },
          { day: 54, title: "Digital Detox Ride", task: "Do a ride with zero intention to film. Just ride. Feel the road. When you get back, journal about the experience. Notice: was it different? More present? Less present? Turn the journal entry into a voiceover for B-roll.", insight: "Content creation can become a cage. Reminding yourself that riding exists outside the camera prevents burnout and keeps the joy alive." },
          { day: 55, title: "Your Origin Story", task: "Film your 'Why I Started' video. Not about the channel. About YOU. Who were you before you started riding? What were you running from? What were you running toward? This is your most important video.", insight: "Origin stories create emotional bonds that algorithms can't explain. This is the video people share with friends: 'You have to watch this guy.'" },
          { day: 56, title: "The Discipline Framework", task: "Design your weekly content creation routine. Example: Monday (plan), Wednesday (film), Friday (edit), Saturday (publish + Shorts), Sunday (engage). Make it sustainable. Not heroic.", insight: "Sustainable > intense. A routine you can keep for 2 years beats a sprint you abandon in 2 months." },
          { day: 57, title: "Comfort Zone Mapping", task: "Draw a circle. Inside: things you're comfortable doing on camera. Outside: things that scare you (singing, dancing, crying, interviewing strangers, speaking Telugu). Pick one outside thing. Do it in your next video.", insight: "Growth happens at the edges. Every time you do something uncomfortable on camera, your range expands permanently." },
          { day: 58, title: "The Mentor Episode", task: "Identify someone who's influenced your riding or life journey (Surendra at work? A family member? A stranger on the road?). Make a video about what they taught you. Tag them if possible.", insight: "Honoring others in your content builds bridges. It also shows depth. You're not just about yourself. You're about the people who shaped you." },
          { day: 59, title: "Body Language on Camera", task: "Film 3 versions of the same 1-minute piece: (1) sitting still, (2) walking and talking, (3) gesturing actively. Watch all 3. Notice how movement affects energy and engagement.", insight: "Body language is communication. On camera, stillness reads as low energy. Subtle movement reads as confidence. Excessive movement reads as nervousness." },
          { day: 60, title: "Voice Training Day", task: "Record yourself reading a paragraph in 3 styles: (1) your normal voice, (2) 20% slower with more pauses, (3) with deliberate emphasis on key words. Style 2 is almost always the best for motovlogging.", insight: "Your standup self-assessment work (slurry voice, filler words) applies here too. The camera amplifies weaknesses and strengths equally." },
          { day: 61, title: "The Language Experiment", task: "Film one Short in Telugu. Even if only 20% of your audience understands it, it will feel deeply authentic. Add English subtitles. See how your Telugu-speaking viewers respond.", insight: "Your Telugu roots are an asset, not a limitation. Multilingual content can unlock entirely new audience segments." },
          { day: 62, title: "Content Burnout Prevention", task: "Write your 'Emergency Break Glass' list: 10 easy video ideas you can film in under 1 hour when you have zero motivation. (Gear review, top 5 lessons, ride route map, Q&A, etc.) Save this list.", insight: "Burnout kills more channels than bad content. Having a backup list means you never miss a week because you 'didn't feel like it.'" },
          { day: 63, title: "The Imposter Syndrome Episode", task: "Film a video titled something like: 'I Have 200 Subscribers and I'm Making This Anyway.' Own where you are. Be honest about the gap between where you are and where you want to be.", insight: "Imposter syndrome content is paradoxically the most confident thing you can create. It says: 'I know I'm small. I'm here anyway.'" },
          { day: 64, title: "Values Anchor", task: "Write your 5 non-negotiable values for your channel. Things you will NEVER do, even for views. (Example: never fake reactions, never trash other creators, never hide sponsorships, never compromise safety for content.)", insight: "Values are the guardrails that prevent you from becoming the creator you wouldn't want to watch. Write them now, before you're tempted." },
          { day: 65, title: "Phase 4 Checkpoint", task: "Record a 5-minute reflection: how has creating content changed you as a person? What have you learned about yourself? Compare this to your Day 15 checkpoint video. Notice the growth.", insight: "The person you're becoming IS the content. The channel grows because YOU grow. This is the real 1% compounding." }
        ]
      }
    ]
  },
  {
    id: 5, name: "Scale", tag: "Days 66-80", color: "#87CEEB", icon: "🚀",
    subtitle: "From creator to brand. Systems that grow while you sleep.",
    intro: "You've built identity, craft, growth habits, and personal depth. Now it's time to build the SYSTEMS that let your channel grow beyond just uploading and hoping. This phase is about working smarter: repurposing, automation, analytics-driven decisions, and thinking like a brand.",
    weeks: [
      {
        title: "Week 10-11: Systems & Brand (Days 66-80)",
        days: [
          { day: 66, title: "The Content Machine", task: "Build your repurposing workflow. From 1 long-form video, create: 3-5 Shorts, 3 Reels, 1 community post, 5 Instagram stories, 1 LinkedIn post, 2 X posts. Map the entire flow. Do it for your next video.", insight: "One ride = one week of content across all platforms. This is how solo creators compete with teams." },
          { day: 67, title: "Thumbnail A/B Testing", task: "Upload your next video with Thumbnail A. After 48 hours, check CTR. Switch to Thumbnail B. After 48 hours, compare. YouTube now lets you test thumbnails natively. Use it.", insight: "Small changes in thumbnails (brighter colors, different face expression, adding text) can double your CTR. Test everything." },
          { day: 68, title: "Email List Foundation", task: "Create a simple lead magnet: 'My Top 10 Solo Ride Routes in South India (with budgets)'. Set up a free email list (Mailchimp/ConvertKit). Add the link to every video description and pinned comment.", insight: "Your YouTube subscribers are rented audience (YouTube owns them). Your email list is owned audience. Start building it now, even at 200 subs." },
          { day: 69, title: "Brand Kit Creation", task: "Define: your channel colors (2-3 max), your fonts (1 heading, 1 body), your thumbnail template, your intro/outro style, your music vibe. Document everything. Consistency builds recognition.", insight: "Brand consistency is how strangers scrolling at 2am recognize YOUR thumbnail in a sea of others. It takes 7 impressions to build familiarity." },
          { day: 70, title: "Analytics Dashboard", task: "Create a weekly tracking sheet: subscribers, watch hours, top video, CTR, AVD, Shorts views, community engagement. Track every Sunday. Look for patterns month-over-month.", insight: "What gets measured gets improved. But don't obsess daily. Weekly is the right cadence. It smooths out noise and reveals real trends." },
          { day: 71, title: "The Collab Episode", task: "Reach out to one creator you've been engaging with since Day 39. Propose a simple collab: a video call ride-along, a split-screen reaction, or a guest appearance. Make it easy to say yes.", insight: "Collaborations expose you to each other's audience. At your size, even a small collab can mean 50-100 new subscribers who are genuinely interested." },
          { day: 72, title: "Sponsor-Ready Media Kit", task: "Create a 1-page media kit: channel stats, audience demographics, content pillars, past highlights, contact info, and 2-3 package options (shoutout, dedicated review, series integration). Even if you're small, be ready.", insight: "Brands are investing in smaller creators with tight-knit communities because authenticity beats reach. Having a media kit says 'I'm professional.'" },
          { day: 73, title: "The Evergreen Library", task: "Identify your 3 videos with the most search traffic (not browse). These are evergreen. Create 3 more videos targeting similar search terms. Evergreen videos compound views over months and years.", insight: "Trending videos spike and die. Evergreen videos grow slowly forever. 'Best solo ride routes from Bangalore' will get views for years." },
          { day: 74, title: "YouTube Studio Mastery", task: "Spend 1 hour learning advanced YouTube Studio features: audience tab (when they're online), reach tab (impression sources), engagement tab (top playlists). Find 3 insights you've never noticed.", insight: "YouTube Studio gives you everything you need to grow. Most creators never look past the dashboard. The gold is in the details." },
          { day: 75, title: "The Milestone Video", task: "Whatever milestone you've hit (300 subs? 500? 1000 watch hours?), create a genuine milestone video. Thank specific commenters by name. Share what you've learned. Be human.", insight: "Milestone videos strengthen community bonds. When you name specific viewers, everyone watching feels like they could be next. It creates belonging." },
          { day: 76, title: "Workflow Automation", task: "Set up templates and automations: (1) Description template in a notes app, (2) Thumbnail template in Canva, (3) Scheduling tool for community posts, (4) A simple checklist for upload day.", insight: "Every minute saved on repetitive tasks is a minute earned for creative work. Automate the boring, protect the creative." },
          { day: 77, title: "The Playlist Audit", task: "Review all your playlists. Are they organized by series? Do they have compelling titles? Is the first video in each playlist your BEST video? Restructure if needed. Add descriptions to each playlist.", insight: "Playlists are often the most neglected growth tool. A well-organized playlist page is like a menu at a restaurant. It invites browsing." },
          { day: 78, title: "Audience Research Day", task: "Read every comment on your last 10 videos. Categorize them: questions, compliments, suggestions, stories. Use the questions as video ideas. Use the stories as community post content.", insight: "Your audience is constantly telling you what they want to see next. Most creators don't listen. The ones who do grow faster." },
          { day: 79, title: "Long-Term Vision", task: "Write a 1-page vision document: where is Vishwa Motovlogs in 1 year? 3 years? What does it look like at 10K subs? 100K? What kind of content? What impact? This is your north star.", insight: "Vision prevents drift. When you're tempted by a trend that doesn't fit your identity, this document reminds you who you are." },
          { day: 80, title: "Phase 5 Checkpoint", task: "Review: repurposing system working? Analytics tracking consistent? Media kit ready? Content calendar filled for next month? You should feel like a SYSTEM now, not a person winging it.", insight: "The transition from 'creator who uploads sometimes' to 'creator with a system' is the most important shift in your YouTube journey." }
        ]
      }
    ]
  },
  {
    id: 6, name: "Mastery", tag: "Days 81-90", color: "#C9B037", icon: "🏆",
    subtitle: "The final 10 days. Integrating everything into who you are.",
    intro: "The last stretch. This isn't about learning new techniques. It's about integration: taking everything from 80 days and weaving it into a sustainable creative practice that compounds for years. This phase is about becoming the person who naturally creates great content.",
    weeks: [
      {
        title: "Week 12-13: Integration & Mastery (Days 81-90)",
        days: [
          { day: 81, title: "The Signature Video", task: "Create the ONE video that represents everything you've learned. Plan it. Script it loosely. Film it beautifully. Edit it with intention. This is your audition tape for every future viewer.", insight: "Every channel needs one video that is unmistakably YOU. The one that, if someone only watched one video, they'd understand everything about your channel." },
          { day: 82, title: "Teach What You Learned", task: "Create a video sharing 5 things you've learned about content creation in the last 80 days. Be specific. Be honest. This establishes you as someone who reflects, not just someone who rides.", insight: "Teaching what you've learned attracts a new audience: aspiring creators. It also deepens your own understanding." },
          { day: 83, title: "The Next 90 Days", task: "Plan your next quarter: 12-13 long-form videos, 30+ Shorts, 3 new series episodes, 1 collaboration, 1 milestone target. Map it all on a calendar. This system now runs itself.", insight: "The first 90 days built the foundation. The next 90 scale it. You now have the skills, systems, and self-awareness to compound." },
          { day: 84, title: "The Re-Watch", task: "Watch your Day 1 video (the mirror ride) and your Day 15 checkpoint. Then watch your most recent video. See the growth. Feel it. You are not the same creator. You are not the same person.", insight: "The visual proof of your own growth is the most powerful motivator there is. This is your 1% compounding made visible." },
          { day: 85, title: "Community Celebration", task: "Host a YouTube Premiere or Live for the first time. Even if 5 people show up. Chat with them. Thank them. Ask what they want to see. Turn viewers into co-creators.", insight: "Live interaction creates bonds that pre-recorded content can't. 5 live viewers who feel heard become your most loyal ambassadors." },
          { day: 86, title: "The Letter to Future You", task: "Write a letter to yourself at 10,000 subscribers. What do you hope you remember? What do you hope you haven't lost? What advice would current-you give to future-you? Save it. Don't publish it.", insight: "Success changes people. Writing this letter now preserves the values and hunger you have today." },
          { day: 87, title: "Creative Rest", task: "No content creation today. Go ride without a camera. Read something that has nothing to do with YouTube. Cook a meal slowly. Rest is not laziness. It's fuel.", insight: "The most sustainable creators build rest INTO their system, not around it. Today is as important as any filming day." },
          { day: 88, title: "The Compound Review", task: "Open your analytics. Calculate: total videos published, total watch hours earned, total subscribers gained, average CTR, best video. Write the story these numbers tell.", insight: "In 88 days, you've gone from 'I want to make videos' to a creator with data, systems, identity, and a growing audience. That's not luck. That's the 1%." },
          { day: 89, title: "Public Accountability", task: "Publish a community post or Short titled 'Day 89 of 90: What This Journey Taught Me.' Share 3 real lessons. No polish. No performance. Just truth.", insight: "Public accountability closes the loop. You told the world you'd do 90 days. Now you're showing them you did. Integrity builds followers." },
          { day: 90, title: "The Ride Continues", task: "Go on a ride. Film it the way you've learned. Edit it with the skills you've built. Publish it as the person you've become. Then open Day 1 of your NEXT 90-day cycle. The ride never ends.", insight: "Day 90 is not a finish line. It's a checkpoint. You've built the foundation. Now the real compounding begins. Ride on, Vishwanath." }
        ]
      }
    ]
  }
];

const ALL_DAYS = PHASES.flatMap(p => p.weeks.flatMap(w => w.days.map(d => ({ ...d, phase: p }))));

function PhaseSelector({ active, setActive }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
      {PHASES.map(p => (
        <button key={p.id} onClick={() => setActive(p.id)} style={{
          background: active === p.id ? `${p.color}22` : "rgba(255,255,255,0.025)",
          border: `1.5px solid ${active === p.id ? p.color : "rgba(255,255,255,0.07)"}`,
          borderRadius: 10, padding: "8px 14px", cursor: "pointer",
          color: active === p.id ? p.color : "#777", fontSize: 12, fontWeight: 700,
          transition: "all 0.25s", letterSpacing: 0.3
        }}>
          {p.icon} {p.name}
        </button>
      ))}
    </div>
  );
}

function DayItem({ d, phase, isOpen, toggle, isDone, onToggleDone }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)", border: `1px solid ${isOpen ? phase.color + "33" : isDone ? phase.color + "22" : "rgba(255,255,255,0.05)"}`,
      borderRadius: 12, overflow: "hidden", marginBottom: 8, transition: "all 0.3s"
    }}>
      <div onClick={toggle} style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, userSelect: "none" }}>
        <div onClick={e => { e.stopPropagation(); onToggleDone(); }} style={{
          width: 36, height: 36, borderRadius: 8, background: isDone ? `${phase.color}25` : `${phase.color}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: phase.color, flexShrink: 0,
          fontFamily: "'Outfit', sans-serif",
          border: isDone ? `2px solid ${phase.color}66` : "2px solid transparent",
          transition: "all 0.25s"
        }}>
          {isDone ? "✓" : d.day}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: isDone ? "#777" : "#F0E8DF", fontWeight: 700, fontSize: 14, fontFamily: "'Outfit', sans-serif", textDecoration: isDone ? "line-through" : "none", transition: "all 0.25s" }}>{d.title}</div>
        </div>
        <span style={{ color: "#555", fontSize: 14, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </div>
      {isOpen && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${phase.color}12` }}>
          <div style={{ margin: "12px 0", padding: 14, background: "rgba(0,0,0,0.25)", borderRadius: 10, borderLeft: `3px solid ${phase.color}` }}>
            <div style={{ color: phase.color, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6, textTransform: "uppercase" }}>Today's Mission</div>
            <div style={{ color: "#D4C9BD", fontSize: 13, lineHeight: 1.7 }}>{d.task}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 12px", background: "rgba(232,168,56,0.06)", borderRadius: 8 }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
            <div style={{ color: "#C4B8AC", fontSize: 12.5, lineHeight: 1.65, fontStyle: "italic" }}>{d.insight}</div>
          </div>
          <div style={{ marginTop: 14, textAlign: "center" }}>
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

export default function YTMasterclass() {
  const [activePhase, setActivePhase] = useState(1);
  const [openDays, setOpenDays] = useState({});
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem("masterclass_vishwa-motovlogs_done")) || {}; }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem("masterclass_vishwa-motovlogs_done", JSON.stringify(done));
  }, [done]);

  const toggle = (d) => setOpenDays(prev => ({ ...prev, [d]: !prev[d] }));
  const toggleDone = (d) => setDone(prev => ({ ...prev, [d]: !prev[d] }));
  const doneCount = Object.values(done).filter(Boolean).length;
  const phase = PHASES.find(p => p.id === activePhase);

  return (
    <div style={{ minHeight: "100vh", background: "#131110", color: "#E8E0D6", fontFamily: "'DM Sans', system-ui, sans-serif", padding: "24px 14px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />

      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ fontSize: 10, color: "#A09890", letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>90-Day Masterclass</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", fontFamily: "'Outfit', sans-serif", color: "#F5EDE6", lineHeight: 1.2 }}>
          Vishwa Motovlogs
        </h1>
        <div style={{ fontSize: 13, color: "#E8A838", fontWeight: 600 }}>Grow Your Channel. Grow Yourself.</div>
        <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>6 Phases | 90 Days | Curated from 2026 YouTube Research + Your Journey</div>
        <div style={{ fontSize: 12, color: doneCount === 90 ? "#4ECDC4" : "#888", marginTop: 6, fontWeight: 600 }}>
          {doneCount}/90 days completed {doneCount === 90 ? "🎉" : ""}
        </div>
      </div>

      <div style={{ display: "flex", gap: 2, justifyContent: "center", margin: "18px auto", maxWidth: 540, flexWrap: "wrap" }}>
        {ALL_DAYS.map(d => (
          <div key={d.day} title={`Day ${d.day}: ${d.title}`} style={{
            width: 5, height: 5, borderRadius: 2,
            background: done[d.day] ? d.phase.color : `${d.phase.color}25`,
            cursor: "pointer", transition: "all 0.2s"
          }} onClick={() => { setActivePhase(d.phase.id); toggle(d.day); }} />
        ))}
      </div>

      <PhaseSelector active={activePhase} setActive={setActivePhase} />

      {phase && (
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 4 }}>{phase.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: phase.color, fontFamily: "'Outfit', sans-serif" }}>
              Phase {phase.id}: {phase.name}
            </div>
            <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{phase.tag}</div>
            <div style={{ color: "#A09890", fontSize: 13, marginTop: 4, fontStyle: "italic" }}>{phase.subtitle}</div>
          </div>

          <div style={{
            background: `${phase.color}08`, border: `1px solid ${phase.color}18`,
            borderRadius: 12, padding: "14px 16px", marginBottom: 18
          }}>
            <div style={{ color: "#C4B8AC", fontSize: 13, lineHeight: 1.7 }}>{phase.intro}</div>
          </div>

          {phase.weeks.map((w, wi) => (
            <div key={wi} style={{ marginBottom: 20 }}>
              <div style={{ color: phase.color, fontSize: 13, fontWeight: 700, marginBottom: 10, paddingLeft: 4, fontFamily: "'Outfit', sans-serif" }}>
                {w.title}
              </div>
              {w.days.map(d => (
                <DayItem key={d.day} d={d} phase={phase} isOpen={openDays[d.day]} toggle={() => toggle(d.day)} isDone={!!done[d.day]} onToggleDone={() => toggleDone(d.day)} />
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 32, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ color: "#444", fontSize: 10 }}>
          Built by Tyson | Sources: TubeBuddy, VloggingPro, YouTube Blog 2026, Vidpros, Mad or Nomad | The ride never ends.
        </div>
      </div>
    </div>
  );
}
