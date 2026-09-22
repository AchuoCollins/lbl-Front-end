import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Play,
  Shield,
  Ticket,
  Trophy,
  Users,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Reveal, { CountUp } from "../components/Reveal";
import StackSection from "../components/landing/StackSection";
import ClockSection from "../components/landing/ClockSection";
import SiteFooter from "../components/SiteFooter";

/* ------------------------------------------------------------------ */
/* Ticker                                                              */
/* ------------------------------------------------------------------ */
const DEFAULT_TICKER = [
  { label: "SEASON", text: "Ligue Régionale de Basketball du Littoral — 2025/2026 campaign" },
  { label: "VENUE", text: "Matchdays at Collège De La Salle, Douala" },
  { label: "DIVISIONS", text: "Men · Women · Youth across the Littoral region" },
  { label: "STREAM", text: "Selected games broadcast live — follow the league channels" },
];

function Ticker({ announcements }) {
  const items =
    announcements && announcements.length > 0
      ? announcements.map((a) => ({ label: "LEAGUE", text: a.text }))
      : DEFAULT_TICKER;
  const loop = [...items, ...items];

  return (
    <div className="bg-lbl-green-deep border-b border-lbl-cream/10 overflow-hidden">
      <div className="lbl-marquee">
        {loop.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-2.5 text-[11px] font-jetbrains shrink-0">
            <span className="text-lbl-gold font-bold tracking-[0.18em]">{t.label}</span>
            <span className="text-lbl-cream/70 tracking-wide">{t.text}</span>
            <span className="text-lbl-cream/20">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
const PILLARS = [
  {
    icon: Trophy,
    title: "Regional competition",
    body: "Officiated men's, women's and youth divisions played across the Littoral.",
    to: "/schedule",
    cta: "See fixtures",
  },
  {
    icon: Users,
    title: "Clubs & players",
    body: "Rosters, records and the clubs that make up the coastal basketball map.",
    to: "/teams",
    cta: "Meet the clubs",
  },
  {
    icon: Play,
    title: "Watch the league",
    body: "Streams and highlights so no performance on this coast goes unseen.",
    to: "/watch",
    cta: "Start watching",
  },
  {
    icon: Heart,
    title: "Back the league",
    body: "Partners and supporters fund courts, officials, kit and youth programmes.",
    to: "/donate",
    cta: "Support LBL",
  },
];

function Hero() {
  return (
    <section className="relative bg-lbl-dark text-lbl-cream overflow-hidden lbl-grain">
      <div className="absolute inset-0">
        <img src="/media/hero-1.jpg" alt="" className="w-full h-full object-cover object-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-lbl-dark/85 via-lbl-dark/60 to-lbl-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(224,165,38,0.22),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-14 md:pt-28 md:pb-20">
        <Reveal from="down" className="flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-lbl-gold animate-pulse" />
          <span className="font-jetbrains text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-lbl-cream/70">
            Douala · Littoral · Cameroon
          </span>
        </Reveal>

        <Reveal from="zoom" delay={80}>
          <h1 className="mt-7 lbl-wordmark text-center text-[10vw] sm:text-[11vw] md:text-[11.5vw] whitespace-nowrap leading-[0.82] text-lbl-cream drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
            LITTORAL
            <br />
            <span className="text-lbl-gold">BASKETBALL</span>
            <br />
            LEAGUE
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[1.1fr_auto] md:items-end">
          <Reveal from="left" delay={140}>
            <p className="max-w-xl text-base md:text-lg leading-relaxed text-lbl-cream/75">
              The regional league of the Littoral, affiliated to FECABASK. One calendar, one table,
              one champion — carrying Douala's basketball culture from the neighbourhood court to the
              national stage.
            </p>
          </Reveal>
          <Reveal from="right" delay={200} className="flex flex-wrap gap-3">
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 rounded-full bg-lbl-gold px-6 py-3 text-sm font-bold text-lbl-dark hover:bg-lbl-orange-light transition-colors"
            >
              Matchday schedule <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-lbl-cream/25 px-6 py-3 text-sm font-semibold text-lbl-cream hover:border-lbl-gold hover:text-lbl-gold transition-colors"
            >
              What is LBL? <ChevronRight size={16} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>

        {/* Four cards at the foot of the hero */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} from={i % 2 === 0 ? "up" : "blur"} delay={120 + i * 90}>
                <Link
                  to={p.to}
                  className="group block h-full rounded-2xl bg-lbl-cream text-lbl-dark p-6 hover:-translate-y-1.5 transition-transform duration-500 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)]"
                >
                  <Icon size={24} strokeWidth={1.6} className="text-lbl-green" />
                  <h3 className="mt-5 font-bebas text-2xl leading-none">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-lbl-soft">{p.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-lbl-green group-hover:gap-3 transition-all">
                    {p.cta} <ArrowUpRight size={14} strokeWidth={2.4} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Match centre                                                        */
/* ------------------------------------------------------------------ */
function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function MatchCenter({ games, standings }) {
  const upcoming = (games || [])
    .filter((g) => g.status !== "final" && g.status !== "completed")
    .slice(0, 3);
  const results = (games || [])
    .filter((g) => g.status === "final" || g.status === "completed")
    .slice(0, 3);
  const table = (standings || []).slice(0, 5);

  return (
    <section className="relative bg-lbl-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Reveal from="left">
              <span className="font-jetbrains text-[11px] tracking-[0.24em] uppercase text-lbl-court">
                Match centre
              </span>
            </Reveal>
            <Reveal from="up" delay={90}>
              <h2 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.95] text-lbl-dark">
                This week on the coast
              </h2>
            </Reveal>
          </div>
          <Reveal from="right" delay={120}>
            <Link
              to="/schedule"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-lbl-green hover:gap-3 transition-all"
            >
              Full schedule <ArrowUpRight size={16} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Next fixtures */}
          <Reveal from="left" className="lg:col-span-5">
            <div className="h-full rounded-3xl bg-lbl-dark text-lbl-cream p-7 md:p-9">
              <div className="flex items-center gap-2 text-lbl-gold">
                <CalendarDays size={18} strokeWidth={1.8} />
                <span className="font-jetbrains text-[11px] tracking-[0.22em] uppercase">Next up</span>
              </div>
              {upcoming.length > 0 ? (
                <ul className="mt-7 space-y-5">
                  {upcoming.map((g) => (
                    <li key={g.id} className="border-b border-lbl-cream/10 pb-5 last:border-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-bebas text-2xl leading-none">
                          {g.homeTeam || g.home_team || "TBD"} <span className="text-lbl-cream/35">vs</span>{" "}
                          {g.awayTeam || g.away_team || "TBD"}
                        </span>
                        <span className="font-jetbrains text-xs text-lbl-gold">
                          {formatDate(g.date) || "Date TBC"}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-lbl-cream/55">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={13} strokeWidth={1.8} /> {g.time || "Time TBC"}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={13} strokeWidth={1.8} /> {g.venue || "Venue TBC"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyNote
                  dark
                  text="The next matchday is being confirmed. Fixtures appear here the moment the league office publishes them."
                />
              )}
              <Link
                to="/tickets"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-lbl-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-lbl-dark hover:bg-lbl-orange-light transition-colors"
              >
                <Ticket size={15} strokeWidth={2.2} /> Get tickets
              </Link>
            </div>
          </Reveal>

          {/* Feature image */}
          <Reveal from="zoom" delay={90} className="lg:col-span-3">
            <div className="lbl-media relative h-full min-h-[260px] rounded-3xl overflow-hidden">
              <img src="/media/shot-spotlight.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-lbl-dark/85 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-jetbrains text-[10px] tracking-[0.22em] uppercase text-lbl-gold">
                  Home floor
                </span>
                <p className="mt-2 font-bebas text-2xl leading-none text-lbl-cream">
                  Collège De La Salle, Douala
                </p>
              </div>
            </div>
          </Reveal>

          {/* Standings snapshot */}
          <Reveal from="right" delay={140} className="lg:col-span-4">
            <div className="h-full rounded-3xl border border-lbl-border-light bg-white p-7 md:p-9">
              <div className="flex items-center gap-2 text-lbl-green">
                <Shield size={18} strokeWidth={1.8} />
                <span className="font-jetbrains text-[11px] tracking-[0.22em] uppercase">Standings</span>
              </div>
              {table.length > 0 ? (
                <ul className="mt-7 space-y-3">
                  {table.map((row, i) => (
                    <li
                      key={row.id || row.team || i}
                      className="flex items-center gap-4 rounded-xl px-3 py-2.5 odd:bg-lbl-cream-dark/60"
                    >
                      <span className="font-jetbrains text-xs text-lbl-soft-light w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-semibold text-sm text-lbl-dark truncate">
                        {row.team || row.name || row.teamName || "—"}
                      </span>
                      <span className="font-jetbrains text-xs text-lbl-soft">
                        {(row.wins ?? 0)}W · {(row.losses ?? 0)}L
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyNote text="The table opens once the first officiated results are homologated." />
              )}
              {/* Latest results */}
              <div className="mt-8 border-t border-lbl-border-light pt-6">
                <span className="font-jetbrains text-[11px] tracking-[0.22em] uppercase text-lbl-court">
                  Latest results
                </span>
                {results.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {results.map((g) => (
                      <li key={g.id} className="flex items-center justify-between text-sm">
                        <span className="text-lbl-dark truncate">
                          {g.homeTeam || g.home_team} v {g.awayTeam || g.away_team}
                        </span>
                        <span className="font-jetbrains text-xs font-bold text-lbl-green">
                          {g.homeScore ?? g.home_score ?? 0}–{g.awayScore ?? g.away_score ?? 0}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-lbl-soft-light">No final scores published yet.</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EmptyNote({ text, dark = false }) {
  return (
    <p
      className={`mt-7 rounded-2xl border border-dashed p-5 text-sm leading-relaxed ${
        dark ? "border-lbl-cream/15 text-lbl-cream/55" : "border-lbl-border-medium text-lbl-soft"
      }`}
    >
      {text}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* League at a glance                                                  */
/* ------------------------------------------------------------------ */
function Glance({ teams }) {
  const stats = [
    { to: teams?.length || 8, suffix: "", label: "Clubs registered" },
    { to: 3, suffix: "", label: "Divisions: men, women, youth" },
    { to: 1, suffix: "", label: "Regional title on the line" },
    { to: 100, suffix: "%", label: "Results officiated & homologated" },
  ];

  return (
    <section className="relative bg-lbl-green text-lbl-cream py-24 md:py-32 lbl-grain overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal from="left">
            <span className="font-jetbrains text-[11px] tracking-[0.24em] uppercase text-lbl-gold">
              What is the LBL?
            </span>
          </Reveal>
          <Reveal from="up" delay={80}>
            <h2 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.95]">
              The Littoral's basketball, finally under one roof
            </h2>
          </Reveal>
          <Reveal from="up" delay={140}>
            <p className="mt-6 text-lbl-cream/75 leading-relaxed max-w-xl">
              The Ligue Régionale de Basketball du Littoral organises competitive basketball for the
              clubs of Douala and the wider Littoral region under FECABASK. It runs the calendar,
              appoints officials, validates every result and publishes the standings — so a season
              here means the same thing it means anywhere the game is taken seriously.
            </p>
          </Reveal>
          <Reveal from="up" delay={200}>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-lbl-cream/25 px-6 py-3 text-sm font-semibold hover:border-lbl-gold hover:text-lbl-gold transition-colors"
            >
              Read the league story <ArrowUpRight size={16} strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} from={i % 2 === 0 ? "right" : "zoom"} delay={i * 110}>
              <div className="rounded-2xl border border-lbl-cream/15 bg-lbl-green-deep/50 p-6 h-full">
                <div className="font-bebas text-5xl md:text-6xl leading-none text-lbl-gold">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm text-lbl-cream/65 leading-snug">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Clubs                                                               */
/* ------------------------------------------------------------------ */
function Clubs({ teams }) {
  const list = (teams || []).slice(0, 8);
  const photos = [
    "/media/team-1.jpg",
    "/media/team-2.jpg",
    "/media/squad-1.jpg",
    "/media/women-1.jpg",
    "/media/action-4.jpg",
    "/media/court-1.jpg",
    "/media/officials.jpg",
    "/media/celebrate.jpg",
  ];

  return (
    <section className="bg-lbl-cream py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Reveal from="left">
              <span className="font-jetbrains text-[11px] tracking-[0.24em] uppercase text-lbl-court">
                The clubs
              </span>
            </Reveal>
            <Reveal from="up" delay={80}>
              <h2 className="mt-4 font-bebas text-4xl md:text-6xl leading-[0.95] text-lbl-dark">
                Who plays in the league
              </h2>
            </Reveal>
          </div>
          <Reveal from="right" delay={120}>
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-lbl-green hover:gap-3 transition-all"
            >
              All clubs <ArrowUpRight size={16} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </div>

        {list.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((team, i) => (
              <Reveal key={team.id || team.name} from={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"} delay={i * 70}>
                <Link
                  to="/teams"
                  className="group block rounded-2xl overflow-hidden bg-white border border-lbl-border-light hover:-translate-y-1.5 transition-transform duration-500"
                >
                  <div className="lbl-media relative aspect-[4/3]">
                    <img
                      src={photos[i % photos.length]}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lbl-dark/70 to-transparent" />
                    {team.logo ? (
                      <img
                        src={team.logo}
                        alt=""
                        className="absolute top-4 left-4 w-10 h-10 rounded-full object-cover border border-lbl-cream/40"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bebas text-2xl leading-none text-lbl-dark capitalize">
                      {team.name || "Club"}
                    </h3>
                    <p className="mt-2 text-xs text-lbl-soft">
                      {team.city ? team.city : "Littoral region"}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal from="up">
            <EmptyNote text="Club profiles are published here as each roster is registered for the season." />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* News + partnership                                                  */
/* ------------------------------------------------------------------ */
function NewsAndCta({ news }) {
  const list = (news || []).slice(0, 3);
  return (
    <section className="bg-lbl-cream-dark py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal from="left">
            <span className="font-jetbrains text-[11px] tracking-[0.24em] uppercase text-lbl-court">
              Newsroom
            </span>
          </Reveal>
          <Reveal from="up" delay={80}>
            <h2 className="mt-4 font-bebas text-4xl md:text-5xl leading-[0.95] text-lbl-dark">
              Latest from the league
            </h2>
          </Reveal>

          {list.length > 0 ? (
            <div className="mt-10 space-y-4">
              {list.map((item, i) => (
                <Reveal key={item.id || i} from={i % 2 === 0 ? "left" : "right"} delay={i * 90}>
                  <Link
                    to="/news"
                    className="group flex items-center gap-5 rounded-2xl bg-white border border-lbl-border-light p-5 hover:border-lbl-border-orange transition-colors"
                  >
                    <span className="font-jetbrains text-xs text-lbl-soft-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-lbl-dark">{item.title}</span>
                      <span className="block mt-1 text-sm text-lbl-soft line-clamp-2">
                        {item.excerpt || item.summary || item.body}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-lbl-green shrink-0 group-hover:rotate-45 transition-transform"
                      strokeWidth={2}
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal from="up">
              <EmptyNote text="League announcements, match reports and club news will appear here." />
            </Reveal>
          )}
        </div>

        <Reveal from="right" delay={120}>
          <div className="relative h-full min-h-[340px] rounded-3xl overflow-hidden text-lbl-cream">
            <img src="/media/action-4.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-lbl-green-deep/80" />
            <div className="relative p-8 md:p-10 flex flex-col justify-between h-full">
              <Heart size={26} strokeWidth={1.6} className="text-lbl-gold" />
              <div>
                <h3 className="font-bebas text-3xl md:text-4xl leading-[0.98]">
                  Put your name on the coast's biggest court
                </h3>
                <p className="mt-4 text-sm text-lbl-cream/70 leading-relaxed">
                  Sponsorship and donations pay for officials, equipment, venues and youth programmes
                  across the Littoral.
                </p>
                <Link
                  to="/donate"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-lbl-gold px-6 py-3 text-sm font-bold text-lbl-dark hover:bg-lbl-orange-light transition-colors"
                >
                  Partner with LBL <ArrowRight size={16} strokeWidth={2.4} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function LBLLanding() {
  const { teams, news, announcements, standings, games } = useAppContext();

  return (
    <div className="min-h-screen bg-lbl-cream font-inter text-lbl-dark">
      <Navbar />
      <div className="pt-16">
        <Ticker announcements={announcements} />
        <Hero />
        <MatchCenter games={games} standings={standings} />
        <StackSection />
        <ClockSection />
        <Glance teams={teams} />
        <Clubs teams={teams} />
        <NewsAndCta news={news} />
        <SiteFooter />
      </div>
    </div>
  );
}
