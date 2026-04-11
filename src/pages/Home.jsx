import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import masterclasses from "../masterclasses/registry";

const QUOTES = [
  "The expert in anything was once a beginner.",
  "Small daily improvements are the key to staggering long-term results.",
  "The only way to do great work is to love what you learn.",
  "Consistency beats intensity. Show up every day.",
  "You don't have to be great to start, but you have to start to be great.",
  "1% better every day = 37x better in a year.",
  "The more I learn, the more I realize how much I don't know.",
  "Discipline is choosing between what you want now and what you want most.",
];

function getProgress(id) {
  try {
    const raw = localStorage.getItem(`masterclass_${id}_done`);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : Object.keys(parsed).filter((k) => parsed[k]);
  } catch { return []; }
}

function getStreak() {
  try {
    const data = JSON.parse(localStorage.getItem("masterclass_streak") || "{}");
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (data.last === today) return data.count || 1;
    if (data.last === yesterday) return data.count || 1;
    return 0;
  } catch { return 0; }
}

function bumpStreak() {
  try {
    const data = JSON.parse(localStorage.getItem("masterclass_streak") || "{}");
    const today = new Date().toISOString().slice(0, 10);
    if (data.last === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const count = data.last === yesterday ? (data.count || 1) + 1 : 1;
    localStorage.setItem("masterclass_streak", JSON.stringify({ last: today, count }));
  } catch {}
}

function getLastVisited() {
  try { return localStorage.getItem("masterclass_last_visited") || null; } catch { return null; }
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();
  const cardsRef = useRef(null);

  useEffect(() => { bumpStreak(); }, []);

  const streak = getStreak();
  const lastVisited = getLastVisited();
  const lastMc = lastVisited ? masterclasses.find((m) => m.id === lastVisited) : null;

  let totalDone = 0, totalAll = 0;
  const progressMap = {};
  masterclasses.forEach((m) => {
    const done = getProgress(m.id);
    progressMap[m.id] = done.length;
    totalDone += done.length;
    totalAll += m.totalLessons;
  });
  const globalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  const t = dark
    ? { bg: "#09090b", surface: "#18181b", card: "#1e1e22", txt: "#fafafa", sub: "#a1a1aa", mut: "#71717a", bdr: "#27272a", ring: "#3f3f46" }
    : { bg: "#fafafa", surface: "#ffffff", card: "#ffffff", txt: "#18181b", sub: "#52525b", mut: "#71717a", bdr: "#e4e4e7", ring: "#d4d4d8" };

  return (
    <div style={{ minHeight: "100vh", background: dark ? "linear-gradient(180deg, #09090b 0%, #18181b 100%)" : "linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%)", color: t.txt, fontFamily: "'Inter','DM Sans',system-ui,sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        *::-webkit-scrollbar{display:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes glow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.3)}}
        .mc-card{transition:all .3s cubic-bezier(.4,0,.2,1);cursor:pointer}
        .mc-card:hover{transform:translateY(-4px) scale(1.01)}
      `}</style>

      {/* Theme toggle */}
      <button onClick={() => setDark(!dark)} style={{ position: "fixed", top: 20, right: 20, zIndex: 50, background: t.surface, border: `1px solid ${t.bdr}`, borderRadius: 12, padding: "10px 14px", cursor: "pointer", color: t.txt, fontSize: 18, backdropFilter: "blur(12px)", transition: "all .2s" }} title={dark ? "Light mode" : "Dark mode"}>
        {dark ? "☀️" : "🌙"}
      </button>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", paddingTop: 72, paddingBottom: 20, animation: "fadeUp .6s ease both" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📚</div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12, background: "linear-gradient(135deg, #38bdf8 0%, #c084fc 50%, #fb7185 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Masterclass Hub
          </h1>
          <p style={{ fontSize: "clamp(14px, 2.5vw, 17px)", color: t.sub, maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Your personal learning command center.<br />{masterclasses.length} masterclasses. One commitment.
          </p>

          {/* Global progress ring */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 24, background: t.surface, border: `1px solid ${t.bdr}`, borderRadius: 20, padding: "20px 32px", marginBottom: 8 }}>
            <div style={{ position: "relative", width: 72, height: 72 }}>
              <svg width={72} height={72} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={36} cy={36} r={30} fill="none" stroke={t.bdr} strokeWidth={5} />
                <circle cx={36} cy={36} r={30} fill="none" stroke="url(#grad)" strokeWidth={5} strokeLinecap="round" strokeDasharray={`${(globalPct / 100) * 188.5} 188.5`} style={{ transition: "stroke-dasharray .8s ease" }} />
                <defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#c084fc" /></linearGradient></defs>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
                {globalPct}%
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{totalDone} <span style={{ fontSize: 14, color: t.mut, fontWeight: 400 }}>/ {totalAll} lessons</span></div>
              <div style={{ fontSize: 13, color: t.sub, marginTop: 2 }}>across {masterclasses.length} masterclasses</div>
            </div>
            {streak > 0 && (
              <div style={{ textAlign: "center", padding: "0 0 0 16px", borderLeft: `1px solid ${t.bdr}` }}>
                <div style={{ fontSize: 28, animation: "float 3s ease infinite" }}>🔥</div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{streak}</div>
                <div style={{ fontSize: 11, color: t.mut, textTransform: "uppercase", letterSpacing: 1 }}>day streak</div>
              </div>
            )}
          </div>
        </div>

        {/* Quote */}
        <div style={{ textAlign: "center", padding: "12px 24px 36px", animation: "fadeUp .6s ease .15s both" }}>
          <p style={{ fontSize: 14, color: t.mut, fontStyle: "italic", maxWidth: 480, margin: "0 auto" }}>"{quote}"</p>
        </div>

        {/* 90-Day Lab link */}
        <div style={{ textAlign: "center", marginBottom: 24, animation: "fadeUp .6s ease .22s both" }}>
          <a
            href="/masterclassLab.html"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 999,
              background: dark ? "rgba(56,189,248,0.08)" : "rgba(37,99,235,0.07)",
              border: `1px solid ${dark ? "rgba(56,189,248,0.25)" : "rgba(37,99,235,0.2)"}`,
              color: dark ? "#38bdf8" : "#1d4ed8",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(56,189,248,0.15)" : "rgba(37,99,235,0.13)"}
            onMouseLeave={e => e.currentTarget.style.background = dark ? "rgba(56,189,248,0.08)" : "rgba(37,99,235,0.07)"}
          >
            <span style={{ fontSize: 16 }}>🗓</span>
            90-Day Mastery Lab
            <span style={{ opacity: 0.6 }}>→</span>
          </a>
        </div>

        {/* Continue where you left off */}
        {lastMc && (
          <div
            onClick={() => navigate(lastMc.path)}
            style={{ display: "flex", alignItems: "center", gap: 16, background: dark ? "rgba(56,189,248,0.06)" : "rgba(56,189,248,0.08)", border: `1px solid ${dark ? "rgba(56,189,248,0.15)" : "rgba(56,189,248,0.2)"}`, borderRadius: 16, padding: "16px 20px", marginBottom: 32, cursor: "pointer", transition: "all .2s", animation: "fadeUp .6s ease .2s both" }}
          >
            <div style={{ fontSize: 28 }}>{lastMc.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#38bdf8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Continue where you left off</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{lastMc.title}</div>
            </div>
            <div style={{ fontSize: 13, color: t.mut, fontFamily: "'JetBrains Mono',monospace" }}>
              {progressMap[lastMc.id]}/{lastMc.totalLessons}
            </div>
            <div style={{ fontSize: 20, color: t.mut }}>→</div>
          </div>
        )}

        {/* Masterclass grid */}
        <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, paddingBottom: 80 }}>
          {masterclasses.map((mc, i) => {
            const done = progressMap[mc.id] || 0;
            const pct = mc.totalLessons > 0 ? Math.round((done / mc.totalLessons) * 100) : 0;
            const isHovered = hoveredId === mc.id;
            return (
              <div
                key={mc.id}
                className="mc-card"
                onClick={() => {
                  localStorage.setItem("masterclass_last_visited", mc.id);
                  navigate(mc.path);
                }}
                onMouseEnter={() => setHoveredId(mc.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: t.card,
                  border: `1px solid ${isHovered ? mc.accent + "40" : t.bdr}`,
                  borderRadius: 20,
                  padding: "28px 24px 22px",
                  position: "relative",
                  overflow: "hidden",
                  animation: `fadeUp .5s ease ${0.1 + i * 0.07}s both`,
                  boxShadow: isHovered ? `0 8px 32px ${mc.accent}15` : "none",
                }}
              >
                {/* Accent glow */}
                <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: mc.gradient, opacity: isHovered ? 0.12 : 0.05, filter: "blur(40px)", transition: "opacity .3s", pointerEvents: "none" }} />

                {/* Icon */}
                <div style={{ fontSize: 36, marginBottom: 14, animation: isHovered ? "float 2s ease infinite" : "none" }}>{mc.icon}</div>

                {/* Title */}
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.01em" }}>{mc.title}</h3>
                <p style={{ fontSize: 13, color: t.sub, marginBottom: 16, lineHeight: 1.4 }}>{mc.subtitle}</p>

                {/* Meta tags */}
                <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: dark ? mc.accent + "12" : mc.accentDark + "10", color: dark ? mc.accent : mc.accentDark, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>
                    {mc.phases} {mc.phases === 1 ? "phase" : mc.phases <= 7 && mc.id === "design-patterns" ? "days" : "phases"}
                  </span>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: t.surface, color: t.mut, border: `1px solid ${t.bdr}`, fontFamily: "'JetBrains Mono',monospace" }}>
                    {mc.duration}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: "100%", height: 4, borderRadius: 2, background: t.bdr, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: mc.gradient, transition: "width .6s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: t.mut, fontFamily: "'JetBrains Mono',monospace" }}>{done}/{mc.totalLessons} lessons</span>
                  {pct > 0 && <span style={{ fontSize: 12, color: dark ? mc.accent : mc.accentDark, fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>{pct}%</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "20px 0 40px", borderTop: `1px solid ${t.bdr}` }}>
          <p style={{ fontSize: 12, color: t.mut }}>Built with discipline. Fueled by 1% daily improvement.</p>
        </div>
      </div>
    </div>
  );
}
