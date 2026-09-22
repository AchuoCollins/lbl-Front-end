import React from "react";
import Reveal from "../Reveal";
import { Users, Trophy, Video, GraduationCap, Handshake } from "lucide-react";

const CARDS = [
  {
    n: "01",
    icon: Users,
    title: "A home for every club",
    body: "Clubs across Douala and the Littoral register once and play a full, officiated regional calendar instead of scattered friendlies.",
    image: "/media/team-1.jpg",
    tint: "bg-lbl-green text-lbl-cream",
  },
  {
    n: "02",
    icon: Trophy,
    title: "Competition that counts",
    body: "Men's, women's and youth divisions with published standings, homologated results and a champion crowned on the floor.",
    image: "/media/action-2.jpg",
    tint: "bg-lbl-court text-lbl-cream",
  },
  {
    n: "03",
    icon: Video,
    title: "Every game, on the record",
    body: "Fixtures, box scores and highlights are published so players finally have footage and fans never miss the story of a season.",
    image: "/media/action-3.jpg",
    tint: "bg-lbl-gold text-lbl-dark",
  },
  {
    n: "04",
    icon: GraduationCap,
    title: "Built for the next generation",
    body: "Youth and school programmes feed the senior divisions, turning playground talent into structured, coached development.",
    image: "/media/youth.jpg",
    tint: "bg-lbl-dark text-lbl-cream",
  },
  {
    n: "05",
    icon: Handshake,
    title: "Partners with a platform",
    body: "Sponsors reach a young, engaged coastal audience on court, on stream and across every matchday broadcast.",
    image: "/media/celebrate.jpg",
    tint: "bg-lbl-green-deep text-lbl-cream",
  },
];

export default function StackSection() {
  return (
    <section className="relative bg-lbl-cream-dark py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <Reveal from="left">
            <span className="font-jetbrains text-[11px] tracking-[0.24em] uppercase text-lbl-court">
              Why the league exists
            </span>
          </Reveal>
          <Reveal from="up" delay={90}>
            <h2 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.95] text-lbl-dark">
              Five things the Littoral gets back
            </h2>
          </Reveal>
          <Reveal from="up" delay={160}>
            <p className="mt-5 text-lbl-soft leading-relaxed">
              Scroll through the five pillars that shape every season, from grassroots courts to the
              regional final.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-8 md:space-y-10">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.n}
                className="lbl-stack-item"
                style={{ top: `calc(6rem + ${i * 18}px)`, zIndex: i + 1 }}
              >
                <Reveal from={i % 2 === 0 ? "left" : "right"}>
                  <article
                    className={`${card.tint} rounded-3xl overflow-hidden shadow-[0_28px_70px_-40px_rgba(7,48,31,0.85)] grid md:grid-cols-[1.15fr_1fr]`}
                  >
                    <div className="p-8 md:p-12 flex flex-col justify-between gap-8">
                      <div className="flex items-center justify-between">
                        <span className="font-jetbrains text-xs tracking-[0.24em] opacity-70">
                          {card.n}
                        </span>
                        <Icon size={26} strokeWidth={1.5} className="opacity-80" />
                      </div>
                      <div>
                        <h3 className="font-bebas text-3xl md:text-[2.6rem] leading-[0.98]">
                          {card.title}
                        </h3>
                        <p className="mt-4 text-sm md:text-base leading-relaxed opacity-80 max-w-md">
                          {card.body}
                        </p>
                      </div>
                    </div>
                    <div className="lbl-media relative min-h-[220px] md:min-h-[320px]">
                      <img
                        src={card.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
