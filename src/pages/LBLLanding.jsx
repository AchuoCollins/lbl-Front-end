import React from "react";
import { Heart, ChevronRight, Video, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

// Tide Divider Component
const TideDivider = ({ flip = false }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} aria-hidden="true">
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-8">
      <path
        d="M0,20 C150,40 300,0 450,20 C600,40 750,0 900,20 C1050,40 1150,0 1200,20 L1200,40 L0,40 Z"
        fill="#d97c2b"
        opacity="0.08"
      />
      <path
        d="M0,26 C150,44 300,8 450,26 C600,44 750,8 900,26 C1050,44 1150,8 1200,26"
        fill="none"
        stroke="#d97c2b"
        strokeWidth="1.5"
        opacity="0.25"
      />
    </svg>
  </div>
);

// Ticker Component
const Ticker = ({ announcements }) => {
  const defaultItems = [
    { label: "LAUNCH", text: "LBL Inaugural Season — Kickoff announcement coming soon" },
    { label: "REGION", text: "7 founding clubs across the Littoral confirmed" },
    { label: "TEAMS", text: "Douala • Edéa • Nkongsamba • Loum • Manjo • Yabassi • Dibombari" },
    { label: "STREAM", text: "All league games to be streamed live on YouTube" },
    { label: "NEWS", text: "Follow along as the league builds toward tip-off" },
  ];

  const tickerData = announcements && announcements.length > 0 
    ? announcements.map(a => ({ label: "📢", text: a.text }))
    : defaultItems;

  return (
    <div className="bg-lbl-dark border-b border-white/5 overflow-hidden whitespace-nowrap dark:bg-[#0D1214] dark:border-white/5">
      <div className="flex ticker-track w-max">
        {[...tickerData, ...tickerData].map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-6 py-2 text-xs font-jetbrains shrink-0">
            <span className="text-lbl-orange font-bold dark:text-[#E8A93D]">{t.label}</span>
            <span className="text-lbl-cream/75 dark:text-white/70">{t.text}</span>
            <span className="text-white/15 mx-2 dark:text-white/10">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function LBLLanding() {
  const { teams, news, announcements, standings } = useAppContext();
  const { darkMode } = useTheme();

  // Get published news
  const publishedNews = news.filter(n => n.status === "PUBLISHED");
  const featuredNews = publishedNews.find(n => n.featured) || publishedNews[0];
  const newsMinor = publishedNews.filter(n => !n.featured).slice(0, 3);

  // Get teams for display
  const displayTeams = teams.map(t => ({
    city: t.name,
    note: t.department || t.city || "",
    logo: t.logo || null,
  }));

  // Fallback data if no teams in context
  const fallbackTeams = [
    { city: "Douala", note: "Economic capital of the Littoral, largest city" },
    { city: "Edéa", note: "Sanaga River region" },
    { city: "Nkongsamba", note: "Menoua–Mungo corridor" },
    { city: "Loum", note: "Moungo department" },
    { city: "Manjo", note: "Moungo department" },
    { city: "Yabassi", note: "Nkam department" },
    { city: "Dibombari", note: "Wouri department" },
  ];

  const clubsToShow = displayTeams.length > 0 ? displayTeams : fallbackTeams;
  const totalTeams = standings.length > 0 ? standings.length : teams.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-[#12181A] text-[#EDEFEE]' 
        : 'bg-lbl-cream text-lbl-dark'
    } font-inter`}>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { 
          animation: ticker-scroll 38s linear infinite; 
        }
        .ticker-track:hover { 
          animation-play-state: paused; 
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>

      {/* Navbar */}
      <Navbar />

      {/* Main content - Add top padding to account for fixed navbar */}
      <div className="pt-16">
        {/* Ticker */}
        <Ticker announcements={announcements} />

        {/* Hero Section */}
        <section className="px-5 pt-6 pb-16 md:pt-10 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className={`flex items-center gap-2 text-xs font-jetbrains mb-4 ${
              darkMode ? 'text-[#E8A93D]' : 'text-lbl-orange'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                darkMode ? 'bg-[#E8A93D]' : 'bg-lbl-orange'
              }`} />
              A NEW LEAGUE FOR THE LITTORAL
            </div>
            <h1 className={`font-bebas text-[15vw] leading-[0.85] md:text-[7.5rem] tracking-wide max-w-4xl ${
              darkMode ? 'text-white' : 'text-lbl-dark'
            }`}>
              COASTAL BASKETBALL.
              <br />
              <span className={darkMode ? 'text-[#E8A93D]' : 'text-lbl-orange'}>BUILT FROM HOME.</span>
            </h1>
            <p className={`max-w-xl mt-6 text-base md:text-lg ${
              darkMode ? 'text-white/60' : 'text-lbl-soft'
            }`}>
              The Littoral Basketball League is launching with {totalTeams} founding clubs across
              the region — built for fans, players, and communities from Douala to
              Yabassi, with plans to grow beyond the Littoral over time.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/watch"
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-colors ${
                  darkMode 
                    ? 'bg-[#E8A93D] text-[#12181A] hover:bg-[#f0ba5f]' 
                    : 'bg-lbl-orange text-white hover:bg-lbl-orange-dark'
                }`}
              >
                <Video size={18} /> Follow on YouTube
              </Link>
              <Link
                to="/teams"
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors border ${
                  darkMode 
                    ? 'border-white/30 text-white/70 hover:border-[#E8A93D] hover:text-[#E8A93D]' 
                    : 'border-lbl-soft hover:border-lbl-orange'
                }`}
              >
                Meet the Founding Clubs <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <TideDivider />

        {/* Why Section */}
        <section className="px-5 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className={`font-bebas text-4xl tracking-wide mb-4 ${
                  darkMode ? 'text-white' : 'text-lbl-dark'
                }`}>
                  WHY THE LITTORAL, WHY NOW
                </h2>
                <p className={`text-sm leading-relaxed mb-4 ${
                  darkMode ? 'text-white/60' : 'text-lbl-soft'
                }`}>
                  Cameroon has already proven it produces elite basketball talent —
                  Joel Embiid and Pascal Siakam, both born in Cameroon, have gone on
                  to NBA All-Star careers. The Littoral region, anchored by Douala,
                  is home to some of the country's deepest basketball communities.
                </p>
                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-white/60' : 'text-lbl-soft'
                }`}>
                  The Littoral Basketball League is being built to give that talent
                  and that community a structured, well-run home league — with
                  honest local coverage, live-streamed games, and a direct way for
                  fans to support the clubs and players who make it happen.
                </p>
              </div>
              <div className={`rounded-2xl border p-6 shadow-sm ${
                darkMode 
                  ? 'bg-[#1A2124] border-white/10' 
                  : 'bg-white border-lbl-soft/10'
              }`}>
                <h3 className={`font-bebas text-xl tracking-wide mb-4 ${
                  darkMode ? 'text-[#E8A93D]' : 'text-lbl-orange'
                }`}>
                  FOUNDING CLUBS
                </h3>
                <div className="space-y-3">
                  {clubsToShow.map((c) => (
                    <div key={c.city} className="flex items-center gap-3 text-sm">
                      {c.logo ? (
                        <img src={c.logo} alt={c.city} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <MapPin size={16} className={`${
                          darkMode ? 'text-[#E8A93D]' : 'text-lbl-orange'
                        } mt-0.5 shrink-0`} />
                      )}
                      <div>
                        <span className={darkMode ? 'text-white/80' : 'font-medium'}>{c.city}</span>
                        <span className={darkMode ? 'text-white/40' : 'text-lbl-soft-light'}> — {c.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <TideDivider flip />

        {/* News Section */}
        <section className="px-5 py-14">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`font-bebas text-4xl tracking-wide ${
                darkMode ? 'text-white' : 'text-lbl-dark'
              }`}>
                LATEST UPDATES
              </h2>
              <Link to="/news" className={`text-sm font-medium hover:underline ${
                darkMode ? 'text-[#E8A93D]' : 'text-lbl-orange'
              }`}>
                All updates →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredNews ? (
                <Link to="/news" className={`group block rounded-2xl border p-6 transition-colors shadow-sm ${
                  darkMode 
                    ? 'bg-[#1A2124] border-white/10 hover:border-[#E8A93D]/30' 
                    : 'bg-white border-lbl-soft/10 hover:border-lbl-orange'
                }`}>
                  <span className={`text-xs font-jetbrains font-bold ${darkMode ? 'text-[#e8594a]' : 'text-[#c73b2b]'}`}>{featuredNews.tag}</span>
                  <h3 className={`font-bebas text-3xl mt-3 mb-3 leading-snug transition-colors ${
                    darkMode 
                      ? 'text-white group-hover:text-[#E8A93D]' 
                      : 'text-lbl-dark group-hover:text-lbl-orange'
                  }`}>
                    {featuredNews.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-3 line-clamp-3 ${
                    darkMode ? 'text-white/60' : 'text-lbl-soft'
                  }`}>
                    {featuredNews.excerpt}
                  </p>
                  <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>
                    {featuredNews.date}
                  </span>
                </Link>
              ) : (
                <div className={`rounded-2xl border p-6 shadow-sm flex items-center justify-center ${
                  darkMode ? 'bg-[#1A2124] border-white/10 text-white/40' : 'bg-white border-lbl-soft/10 text-lbl-soft-light'
                }`}>
                  <p>No featured news available</p>
                </div>
              )}
              <div className="space-y-4">
                {newsMinor.length > 0 ? (
                  newsMinor.map((n) => (
                    <Link
                      key={n.title}
                      to="/news"
                      className={`group block rounded-2xl border p-5 transition-colors shadow-sm ${
                        darkMode 
                          ? 'bg-[#1A2124] border-white/10 hover:border-[#E8A93D]/30' 
                          : 'bg-white border-lbl-soft/10 hover:border-lbl-orange'
                      }`}
                    >
                      <span className={`text-xs font-jetbrains font-bold ${
                        darkMode ? 'text-[#E8A93D]' : 'text-lbl-orange'
                      }`}>
                        {n.tag}
                      </span>
                      <h4 className={`font-semibold mt-2 mb-1 transition-colors line-clamp-1 ${
                        darkMode 
                          ? 'text-white/80 group-hover:text-[#E8A93D]' 
                          : 'text-lbl-dark group-hover:text-lbl-orange'
                      }`}>
                        {n.title}
                      </h4>
                      <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>
                        {n.date}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className={`rounded-2xl border p-5 shadow-sm text-center ${
                    darkMode ? 'bg-[#1A2124] border-white/10 text-white/40' : 'bg-white border-lbl-soft/10 text-lbl-soft-light'
                  }`}>
                    <p>No news available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Donate Banner */}
        <section className="px-5 pb-14">
          <div className="max-w-6xl mx-auto">
            <div className={`rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border ${
              darkMode 
                ? 'bg-gradient-to-br from-[#1A2124] to-[#12181A] border-[#E8A93D]/20' 
                : 'bg-gradient-to-br from-[#fcf5ec] to-[#f5efe8] border-lbl-orange/30'
            }`}>
              <div>
                <h3 className={`font-bebas text-3xl tracking-wide mb-2 ${
                  darkMode ? 'text-white' : 'text-lbl-dark'
                }`}>
                  HELP BUILD THE LEAGUE
                </h3>
                <p className={`max-w-md text-sm ${
                  darkMode ? 'text-white/60' : 'text-lbl-soft'
                }`}>
                  Early support goes directly toward getting founding clubs
                  equipped, venues secured, and the inaugural season off the
                  ground.
                </p>
              </div>
              <Link
                to="/donate"
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap ${
                  darkMode 
                    ? 'bg-[#E8A93D] text-[#12181A] hover:bg-[#f0ba5f]' 
                    : 'bg-lbl-orange text-white hover:bg-lbl-orange-dark'
                }`}
              >
                <Heart size={18} /> Donate Now
              </Link>
            </div>
          </div>
        </section>

        {/* Clubs Grid */}
        <section className="px-5 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className={`font-bebas text-4xl tracking-wide mb-6 ${
              darkMode ? 'text-white' : 'text-lbl-dark'
            }`}>
              FOUNDING CLUBS
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
              {clubsToShow.map((c) => (
                <Link
                  key={c.city}
                  to="/teams"
                  className={`aspect-square rounded-2xl border flex flex-col items-center justify-center text-center transition-colors shadow-sm p-2 ${
                    darkMode 
                      ? 'bg-[#1A2124] border-white/10 hover:border-[#E8A93D]/30 hover:text-[#E8A93D]' 
                      : 'bg-white border-lbl-soft/10 hover:border-lbl-orange hover:text-lbl-orange'
                  }`}
                >
                  {c.logo ? (
                    <img src={c.logo} alt={c.city} className="w-8 h-8 rounded-full object-cover mb-1" />
                  ) : null}
                  <span className={`font-bebas text-sm tracking-wide ${
                    darkMode ? 'text-white/80' : 'text-lbl-dark'
                  }`}>
                    {c.city}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`border-t ${
          darkMode ? 'border-white/10 bg-[#0D1214]' : 'border-lbl-soft/10 bg-white/60'
        }`}>
          <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm">
            <div>
              <div className={`font-bebas text-2xl tracking-wide mb-1 ${
                darkMode ? 'text-white' : 'text-lbl-dark'
              }`}>
                LBL
              </div>
              <p className={darkMode ? 'text-white/40' : 'text-lbl-soft-light'}>
                Littoral Basketball League — Building toward an inaugural season
              </p>
            </div>
            <div className={`flex gap-6 flex-wrap ${
              darkMode ? 'text-white/40' : 'text-lbl-soft-light'
            }`}>
              <Link to="/about" className={`transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-lbl-dark'
              }`}>
                About
              </Link>
              <Link to="/news" className={`transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-lbl-dark'
              }`}>
                News
              </Link>
              <Link to="/watch" className={`transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-lbl-dark'
              }`}>
                Watch
              </Link>
              <Link to="/tickets" className={`transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-lbl-dark'
              }`}>
                Tickets
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}