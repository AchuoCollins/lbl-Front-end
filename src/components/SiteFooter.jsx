import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone, Camera, MessageCircle, Play } from "lucide-react";

const LEAGUE_LINKS = [
  { to: "/teams", label: "Clubs" },
  { to: "/schedule", label: "Fixtures & results" },
  { to: "/watch", label: "Watch live" },
  { to: "/news", label: "News" },
];

const VISIT_LINKS = [
  { to: "/tickets", label: "Tickets" },
  { to: "/donate", label: "Support the league" },
  { to: "/about", label: "About LBL" },
  { to: "/support", label: "Help desk" },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-lbl-green-deep text-lbl-cream lbl-grain">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/media/logo.png" alt="" className="w-11 h-11 object-contain" />
              <span className="font-bebas text-lg tracking-[0.18em]">LBL</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-lbl-cream/60 max-w-xs">
              Ligue Régionale de Basketball du Littoral — the regional league of Douala and the
              Littoral, affiliated to FECABASK.
            </p>
            <div className="mt-6 flex gap-3">
              {[Camera, MessageCircle, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="LBL social channel"
                  className="w-10 h-10 grid place-items-center rounded-full border border-lbl-cream/15 hover:border-lbl-gold hover:text-lbl-gold transition-colors"
                >
                  <Icon size={17} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="League" links={LEAGUE_LINKS} />
          <FooterColumn title="Visit" links={VISIT_LINKS} />

          <div>
            <h4 className="font-jetbrains text-[11px] tracking-[0.22em] uppercase text-lbl-gold">
              Contact
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-lbl-cream/70">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-lbl-court" strokeWidth={1.6} />
                <span>Collège De La Salle, Douala — Littoral, Cameroon</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-lbl-court" strokeWidth={1.6} />
                <span>contact@littoralbasketball.cm</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-lbl-court" strokeWidth={1.6} />
                <span>Add the league phone number</span>
              </li>
            </ul>
            <Link
              to="/donate"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lbl-gold hover:gap-3 transition-all"
            >
              Become a partner <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-lbl-cream/10 pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-[12px] text-lbl-cream/45">
          <span>© {new Date().getFullYear()} Littoral Basketball League. All rights reserved.</span>
          <span className="font-jetbrains tracking-[0.18em] uppercase">Douala · Cameroon</span>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="px-4 pb-4 select-none" aria-hidden="true">
        <div className="lbl-wordmark text-[13vw] md:text-[9.2vw] text-lbl-cream/[0.09] text-center whitespace-nowrap overflow-hidden">
          LITTORAL BASKETBALL
        </div>
        <div className="lbl-wordmark text-[24vw] md:text-[19vw] text-lbl-cream/[0.14] text-center leading-none">
          LEAGUE
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="font-jetbrains text-[11px] tracking-[0.22em] uppercase text-lbl-gold">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="group inline-flex items-center gap-2 text-sm text-lbl-cream/70 hover:text-lbl-cream transition-colors"
            >
              <span className="h-px w-0 bg-lbl-gold transition-all duration-300 group-hover:w-4" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
