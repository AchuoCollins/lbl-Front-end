import React, { useEffect, useRef, useState } from "react";

/**
 * Basketball-inspired custom cursor.
 * Desktop / fine-pointer only. Falls back to the native cursor on touch
 * devices and whenever the visitor prefers reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("lbl-cursor-on");
    return () => document.documentElement.classList.remove("lbl-cursor-on");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      const el =
        e.target instanceof Element
          ? e.target.closest("a, button, [role='button'], input, select, textarea, label")
          : null;
      setActive(Boolean(el));
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="lbl-cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`lbl-cursor-ring${active ? " is-active" : ""}${down ? " is-down" : ""}`}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 20h36M20 2v36" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          <path d="M7 7c8 5 8 21 0 26M33 7c-8 5-8 21 0 26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        </svg>
      </div>
    </>
  );
}
