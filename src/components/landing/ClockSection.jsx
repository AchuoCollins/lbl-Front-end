import React, { useEffect, useRef, useState } from "react";
import { CalendarDays, Flag, ListOrdered, Medal } from "lucide-react";

const STEPS = [
  {
    label: "Registration",
    period: "Phase 01",
    icon: ListOrdered,
    title: "Clubs sign on",
    body: "Clubs across Douala and the Littoral file their rosters, licences and home venue with the regional league office.",
    image: "/media/squad-1.jpg",
  },
  {
    label: "Tip-off",
    period: "Phase 02",
    icon: Flag,
    title: "The season opens",
    body: "Opening weekend at Collège De La Salle sets the calendar in motion across men's, women's and youth divisions.",
    image: "/media/hero-1.jpg",
  },
  {
    label: "Regular season",
    period: "Phase 03",
    icon: CalendarDays,
    title: "Matchdays and standings",
    body: "Every result is officiated and homologated, so the table you read is the table that decides the playoffs.",
    image: "/media/action-1.jpg",
  },
  {
    label: "Finals",
    period: "Phase 04",
    icon: Medal,
    title: "A champion is crowned",
    body: "The best of the coast meet in the regional final, with the title decided in front of a packed home floor.",
    image: "/media/trophy.jpg",
  },
];

export default function ClockSection() {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return;
        const p = Math.min(1, Math.max(0, -rect.top / total));
        setProgress(p);
        setIndex(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = STEPS[index];
  const Icon = step.icon;
  const angle = progress * 360;
  const circumference = 2 * Math.PI * 86;

  return (
    <section ref={sectionRef} className="relative bg-lbl-dark text-lbl-cream lbl-grain" style={{ height: `${STEPS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-10 grid gap-12 lg:grid-cols-[auto_1fr_0.9fr] items-center">
          {/* Rotating clock dial */}
          <div className="relative w-[200px] h-[200px] mx-auto lg:mx-0">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(247,244,236,0.12)" strokeWidth="2" />
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="var(--color-lbl-gold)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
              />
            </svg>
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span className="absolute left-1/2 top-[6px] -translate-x-1/2 w-3 h-3 rounded-full bg-lbl-court shadow-[0_0_16px_rgba(31,138,138,0.9)]" />
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-bebas text-6xl leading-none text-lbl-cream tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="font-jetbrains text-[10px] tracking-[0.22em] uppercase text-lbl-cream/45 mt-2">
                  of {String(STEPS.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div key={step.title} className="lbl-reveal lbl-from-left is-in">
            <span className="font-jetbrains text-[11px] tracking-[0.24em] uppercase text-lbl-gold">
              {step.period} — {step.label}
            </span>
            <h3 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.95]">{step.title}</h3>
            <p className="mt-5 max-w-lg text-lbl-cream/65 leading-relaxed">{step.body}</p>
            <div className="mt-8 flex gap-2">
              {STEPS.map((s, i) => (
                <span
                  key={s.label}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-12 bg-lbl-gold" : "w-6 bg-lbl-cream/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="hidden lg:block">
            <div className="lbl-media relative rounded-3xl overflow-hidden aspect-[4/5] border border-lbl-cream/10">
              <img key={step.image} src={step.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-lbl-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="w-10 h-10 grid place-items-center rounded-full bg-lbl-gold text-lbl-dark">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-lbl-cream/80">
                  {step.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
