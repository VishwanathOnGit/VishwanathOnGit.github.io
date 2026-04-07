import { Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import masterclasses from "./masterclasses/registry";
import Home from "./pages/Home";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <button
      onClick={() => navigate("/")}
      style={{
        position: "fixed",
        top: 18,
        left: 18,
        zIndex: 9999,
        background: "rgba(24,24,27,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(63,63,70,0.5)",
        borderRadius: 12,
        padding: "8px 16px",
        cursor: "pointer",
        color: "#fafafa",
        fontSize: 14,
        fontFamily: "'Inter',system-ui,sans-serif",
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "all .2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(39,39,42,0.95)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(24,24,27,0.85)"; }}
    >
      <span style={{ fontSize: 16 }}>←</span> Home
    </button>
  );
}

function Loader() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#09090b", color: "#a1a1aa", fontFamily: "'Inter',system-ui,sans-serif", fontSize: 15 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12, animation: "pulse 1.5s ease infinite" }}>📚</div>
        Loading masterclass…
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <BackButton />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {masterclasses.map((mc) => (
            <Route key={mc.id} path={mc.path} element={<mc.component />} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
}
