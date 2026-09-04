import React, { useState } from "react";
import { MapPin, ExternalLink, X, Users, User, Ruler, Calendar, Trophy, BarChart3 } from "lucide-react";
import { useAppContext } from '../../context/AppContext';
import Standings from './Standings';
import Stats from './Stats';
import { useTheme } from "../../context/ThemeContext";

export default function Teams() {
  const { teams } = useAppContext();
  const { darkMode } = useTheme();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeTab, setActiveTab] = useState("teams");

  // Build team data from context
  const foundingClubs = teams.map(t => ({
    city: t.name,
    note: t.department || t.city || "",
    site: t.website || "",
    logo: t.logo || null,
  }));

  // Build roster data from context
  const getTeamRoster = (teamName) => {
    const team = teams.find(t => t.name === teamName);
    if (!team) return null;
    
    return {
      coaches: team.coach?.name ? [team.coach.name] : [],
      players: team.players || [],
      logo: team.logo || null,
    };
  };

  const selectedRoster = selectedTeam ? getTeamRoster(selectedTeam) : null;

  // Sub-navigation tabs
  const tabs = [
    { id: "teams", label: "Teams", icon: Users },
    { id: "standings", label: "Standings", icon: Trophy },
    { id: "stats", label: "Stats", icon: BarChart3 },
  ];

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case "standings":
        return <Standings />;
      case "stats":
        return <Stats />;
      default:
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            {foundingClubs.map((c) => {
              const hasRoster = !!getTeamRoster(c.city);
              return (
                <div
                  key={c.city}
                  onClick={() => hasRoster && setSelectedTeam(c.city)}
                  className={`
                    rounded-2xl border p-5
                    flex items-center justify-between shadow-sm
                    transition-all duration-200
                    ${darkMode ? 'bg-[#1A2124] border-white/10' : 'bg-white border-lbl-soft/10'}
                    ${
                      hasRoster
                        ? "cursor-pointer hover:shadow-md hover:border-lbl-orange/40 dark:hover:border-lbl-dark-orange/40 hover:-translate-y-0.5"
                        : "opacity-60 cursor-default"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {c.logo ? (
                      <img src={c.logo} alt={c.city} className="w-11 h-11 rounded-full object-cover border border-lbl-soft/10 dark:border-white/10" />
                    ) : (
                      <div className={`w-11 h-11 rounded-full border flex items-center justify-center font-bebas text-lg shrink-0 ${
                        darkMode 
                          ? 'bg-[#0D1214] border-white/10 text-lbl-dark-orange' 
                          : 'bg-lbl-cream border-lbl-soft/10 text-lbl-orange'
                      }`}>
                        {c.city.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-bebas tracking-wide text-lg ${darkMode ? 'text-white' : 'text-lbl-dark'}`}>{c.city}</p>
                        {hasRoster && (
                          <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${
                            darkMode 
                              ? 'text-lbl-dark-orange bg-lbl-dark-orange/10' 
                              : 'text-lbl-orange bg-lbl-orange/10'
                          }`}>
                            View Roster
                          </span>
                        )}
                      </div>
                      <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>
                        <MapPin size={11} /> {c.note}
                      </p>
                    </div>
                  </div>
                  {c.site ? (
                    <a
                      href={c.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1 text-xs hover:underline shrink-0 ${
                        darkMode ? 'text-lbl-dark-orange' : 'text-lbl-orange'
                      }`}
                    >
                      Visit site <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className={`text-xs shrink-0 ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>Site coming soon</span>
                  )}
                </div>
              );
            })}
          </div>
        );
    }
  };

  return (
    <>
      <div>
        <h1 className={`font-bebas text-4xl tracking-wide mb-2 ${darkMode ? 'text-white' : 'text-lbl-dark'}`}>
          {activeTab === "teams" ? "FOUNDING CLUBS" : activeTab === "standings" ? "STANDINGS" : "LEAGUE STATS"}
        </h1>
        <p className={`text-sm mb-6 max-w-xl ${darkMode ? 'text-white/60' : 'text-lbl-soft'}`}>
          {activeTab === "teams" 
            ? "Seven clubs across the Littoral region are building the league's inaugural season. Each club runs its own site — tap through for rosters, news, and more."
            : activeTab === "standings"
            ? "Updated after every finalized game."
            : "Team averages for points, rebounds, and assists."
          }
        </p>

        {/* Sub-Navigation Tabs */}
        <div className={`border-b mb-6 ${darkMode ? 'border-white/10' : 'border-lbl-soft/10'}`}>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? darkMode
                        ? "bg-lbl-dark-orange text-[#12181A] shadow-md"
                        : "bg-lbl-orange text-white shadow-md"
                      : darkMode
                        ? "text-white/80 hover:bg-white/10 hover:text-white"
                        : "text-gray-700 hover:bg-lbl-orange/10 hover:text-lbl-orange"
                  }`}
                >
                  <Icon size={16} className={
                    isActive 
                      ? darkMode ? "text-[#12181A]" : "text-white"
                      : darkMode ? "text-white/80" : "text-gray-700"
                  } />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content - switches between Teams, Standings, and Stats */}
        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>

      {/* ROSTER MODAL */}
      {selectedTeam && selectedRoster && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedTeam(null)}
        >
          <div
            className={`rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden border ${
              darkMode 
                ? 'bg-[#1A2124] border-white/10' 
                : 'bg-white border-lbl-soft/10'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Logo */}
            <div className={`p-6 pb-4 border-b flex items-start justify-between shrink-0 ${
              darkMode ? 'border-white/10' : 'border-lbl-soft/10'
            }`}>
              <div className="flex items-center gap-3">
                {selectedRoster.logo ? (
                  <img src={selectedRoster.logo} alt={selectedTeam} className="w-10 h-10 rounded-full object-cover border border-lbl-soft/10" />
                ) : (
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bebas text-lg ${
                    darkMode 
                      ? 'bg-[#0D1214] border-white/10 text-lbl-dark-orange' 
                      : 'bg-lbl-cream border-lbl-soft/10 text-lbl-orange'
                  }`}>
                    {selectedTeam.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className={`font-bebas text-3xl tracking-wide ${darkMode ? 'text-white' : 'text-lbl-dark'}`}>{selectedTeam}</h2>
                  <p className={`text-sm flex items-center gap-1 mt-0.5 ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>
                    <MapPin size={14} /> {foundingClubs.find((c) => c.city === selectedTeam)?.note}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeam(null)}
                className={`p-1.5 rounded-full transition-colors ${
                  darkMode 
                    ? 'text-white/60 hover:bg-white/10' 
                    : 'text-lbl-soft-light hover:bg-lbl-soft/10 hover:text-lbl-soft'
                }`}
                aria-label="Close roster"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 pt-4 overflow-y-auto flex-1 space-y-5">
              {/* Coaches */}
              {selectedRoster.coaches.length > 0 && (
                <div>
                  <h3 className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 mb-2 ${
                    darkMode ? 'text-white/40' : 'text-lbl-soft-light'
                  }`}>
                    <User size={14} /> Coaching Staff
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRoster.coaches.map((coach, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${
                          darkMode 
                            ? 'bg-[#0D1214] border-white/10 text-white/80' 
                            : 'bg-lbl-cream border-lbl-soft/5 text-lbl-dark'
                        }`}
                      >
                        {coach}
                        {idx === 0 && (
                          <span className={`text-[10px] font-normal ml-1.5 ${
                            darkMode ? 'text-white/40' : 'text-lbl-soft-light'
                          }`}>
                            (Head Coach)
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Players */}
              {selectedRoster.players.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${
                      darkMode ? 'text-white/40' : 'text-lbl-soft-light'
                    }`}>
                      <Users size={14} /> Roster ({selectedRoster.players.length} players)
                    </h3>
                  </div>
                  <div className={`border rounded-xl overflow-hidden ${
                    darkMode ? 'border-white/10' : 'border-lbl-soft/10'
                  }`}>
                    <div className={`grid grid-cols-12 gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider border-b ${
                      darkMode 
                        ? 'bg-[#0D1214]/60 text-white/40 border-white/10' 
                        : 'bg-lbl-cream/60 text-lbl-soft-light border-lbl-soft/10'
                    }`}>
                      <span className="col-span-7">Player</span>
                      <span className="col-span-2 text-center flex items-center justify-center gap-1">
                        <Calendar size={12} /> Age
                      </span>
                      <span className="col-span-3 text-center flex items-center justify-center gap-1">
                        <Ruler size={12} /> Height
                      </span>
                    </div>
                    <div className={`divide-y ${darkMode ? 'divide-white/5' : 'divide-lbl-soft/5'}`}>
                      {selectedRoster.players.map((p, idx) => (
                        <div
                          key={idx}
                          className={`grid grid-cols-12 gap-2 px-4 py-2.5 text-sm transition-colors ${
                            darkMode 
                              ? 'hover:bg-white/5' 
                              : 'hover:bg-lbl-cream/30'
                          }`}
                        >
                          <span className={`col-span-7 font-medium truncate ${darkMode ? 'text-white/80' : 'text-lbl-dark'}`}>
                            {p.name}
                          </span>
                          <span className={`col-span-2 text-center ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>
                            {p.age || "—"}
                          </span>
                          <span className={`col-span-3 text-center font-mono text-sm ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>
                            {p.height || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t shrink-0 ${
              darkMode 
                ? 'border-white/10 bg-[#0D1214]/30' 
                : 'border-lbl-soft/10 bg-lbl-cream/30'
            }`}>
              <p className={`text-[11px] text-center ${darkMode ? 'text-white/40' : 'text-lbl-soft-light'}`}>
                Data syncs automatically from the admin dashboard.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}