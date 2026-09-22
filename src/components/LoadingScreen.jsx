import React, { useEffect, useState } from "react";

const STAGES = [
  "Sweeping the hardwood",
  "Checking the scoreboard",
  "Warming up the shooters",
  "Tip-off",
];

/** Game-style intro loader shown once per browser session. */
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(() => sessionStorage.getItem("lbl_intro_seen") === "1");

  useEffect(() => {
    if (done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("lbl_intro_seen", "1");
      setDone(true);
      return;
    }
    let value = 0;
    const id = setInterval(() => {
      value = Math.min(100, value + Math.random() * 14 + 7);
      setProgress(Math.round(value));
      if (value >= 100) {
        clearInterval(id);
        sessionStorage.setItem("lbl_intro_seen", "1");
        setTimeout(() => setDone(true), 560);
      }
    }, 170);
    return () => clearInterval(id);
  }, [done]);

  if (done) return null;

  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(progress / 26))];

  return (
    <div className={`lbl-loader${progress >= 100 ? " is-out" : ""}`} role="status" aria-live="polite">
      <div className="lbl-loader-inner">
        <div className="lbl-ball" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="#E0A526" stroke="#0C1412" strokeWidth="2.5" />
            <path
              d="M2 32h60M32 2v60M11 11c12 8 12 34 0 42M53 11c-12 8-12 34 0 42"
              fill="none"
              stroke="#0C1412"
              strokeWidth="2.5"
            />
          </svg>
        </div>
        <div className="lbl-loader-meta">
          <span className="lbl-loader-title">LITTORAL BASKETBALL LEAGUE</span>
          <span className="lbl-loader-stage">{stage}</span>
        </div>
        <div className="lbl-loader-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <span className="lbl-loader-pct">{progress}%</span>
      </div>
    </div>
  );
}
