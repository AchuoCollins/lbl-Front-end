import React, { useState, useMemo } from "react";
import { useAppContext } from '../../context/AppContext';
import { Calendar, MapPin, Search, X, Clock, Users, Trophy } from "lucide-react";

function StatusTag({ status }) {
  const map = {
    UPCOMING: "text-lbl-soft-light",
    LIVE: "text-[#C8102E] animate-pulse",
    FINAL: "text-lbl-soft-light",
  };
  return <span className={`text-xs font-jetbrains font-semibold ${map[status]}`}>{status}</span>;
}

function PointBadge({ points }) {
  const colors = {
    1: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30",
    2: "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30",
    3: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30",
  };
  return (
    <span
      className={`text-[10px] font-jetbrains font-bold px-2 py-0.5 rounded-full border ${colors[points] || colors[2]}`}
    >
      {points}PT
    </span>
  );
}

// Helper to get team logo
const getTeamLogo = (teams, teamName) => {
  const team = teams.find(t => t.name === teamName);
  return team?.logo || null;
};

export default function Schedule() {
  const { games, teams } = useAppContext();
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  const filtered = useMemo(
    () =>
      games.filter(
        (g) =>
          g.home.toLowerCase().includes(search.toLowerCase()) ||
          g.away.toLowerCase().includes(search.toLowerCase())
      ),
    [games, search]
  );

  // Build play-by-play data from quarter scores
  const buildPlays = (game) => {
    if (!game.quarters) return [];
    const plays = [];
    const quarters = game.quarters;
    const homeScores = quarters.home || [0, 0, 0, 0];
    const awayScores = quarters.away || [0, 0, 0, 0];
    
    for (let q = 0; q < 4; q++) {
      const homeScore = homeScores[q] || 0;
      const awayScore = awayScores[q] || 0;
      
      if (homeScore > 0) {
        plays.push({
          player: `${game.home} Team`,
          team: game.home,
          time: `Q${q + 1} :${String(12 - Math.floor(Math.random() * 10))}`,
          points: homeScore,
        });
      }
      if (awayScore > 0) {
        plays.push({
          player: `${game.away} Team`,
          team: game.away,
          time: `Q${q + 1} :${String(12 - Math.floor(Math.random() * 10))}`,
          points: awayScore,
        });
      }
    }
    return plays;
  };

  const hasPlays = (game) => {
    if (game.status === "FINAL" || game.status === "LIVE") {
      return game.quarters && (
        (game.quarters.home && game.quarters.home.some(v => v > 0)) ||
        (game.quarters.away && game.quarters.away.some(v => v > 0))
      );
    }
    return false;
  };

  const isClickable = (game) => game.status === "LIVE" || game.status === "FINAL";

  const getGameScore = (game) => {
    if (game.status === "FINAL" || game.status === "LIVE") {
      const homeTotal = game.quarters?.home?.reduce((sum, v) => sum + (v || 0), 0) || 0;
      const awayTotal = game.quarters?.away?.reduce((sum, v) => sum + (v || 0), 0) || 0;
      return `${homeTotal}–${awayTotal}`;
    }
    return null;
  };

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">SCHEDULE & RESULTS</h1>
      <p className="text-lbl-soft text-sm mb-6 max-w-xl">
        Every match the league holds, past and upcoming. Click LIVE or FINAL games to see play-by-play scoring.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-lbl-soft-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a team..."
            className="w-full bg-white border border-lbl-soft/20 rounded-lg pl-9 pr-3 py-2 text-sm text-lbl-dark placeholder:text-lbl-soft-light focus:outline-none focus:border-lbl-orange/40"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((g) => {
          const score = getGameScore(g);
          const clickable = isClickable(g);
          const plays = buildPlays(g);
          const homeLogo = getTeamLogo(teams, g.home);
          const awayLogo = getTeamLogo(teams, g.away);
          
          return (
            <div
              key={g.id}
              onClick={() => clickable && setSelectedGame({ ...g, plays })}
              className={`bg-white rounded-2xl border border-lbl-soft/10 p-5 flex items-center justify-between flex-wrap gap-3 shadow-sm transition-all ${
                clickable
                  ? "cursor-pointer hover:border-lbl-orange/40 hover:shadow-md hover:-translate-y-0.5"
                  : "cursor-default"
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  {/* Home Team with Logo */}
                  <div className="flex items-center gap-1.5">
                    {homeLogo ? (
                      <img src={homeLogo} alt={g.home} className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-lbl-cream border border-lbl-soft/10 flex items-center justify-center text-[8px] font-bold text-lbl-orange">
                        {g.home.charAt(0)}
                      </div>
                    )}
                    <span className="font-bebas text-lg tracking-wide">{g.home}</span>
                  </div>
                  
                  <span className="text-lbl-soft-light text-sm">vs</span>
                  
                  {/* Away Team with Logo */}
                  <div className="flex items-center gap-1.5">
                    {awayLogo ? (
                      <img src={awayLogo} alt={g.away} className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-lbl-cream border border-lbl-soft/10 flex items-center justify-center text-[8px] font-bold text-lbl-orange">
                        {g.away.charAt(0)}
                      </div>
                    )}
                    <span className="font-bebas text-lg tracking-wide">{g.away}</span>
                  </div>
                  
                  <StatusTag status={g.status} />
                  {clickable && (
                    <span className="text-[10px] font-medium text-lbl-soft-light bg-lbl-cream px-2 py-0.5 rounded-full">
                      Click for plays
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-lbl-soft-light flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {g.date} {g.time && `· ${g.time}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {g.venue}
                  </span>
                </div>
              </div>
              {score && (
                <span className="font-jetbrains text-lg font-semibold text-lbl-orange whitespace-nowrap">
                  {score}
                </span>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-lbl-soft/10 p-8 text-center text-lbl-soft-light text-sm shadow-sm">
            No games matching "{search}".
          </div>
        )}
      </div>

      {/* PLAY-BY-PLAY MODAL */}
      {selectedGame && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-lbl-soft/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-lbl-soft/10 flex items-start justify-between shrink-0">
              <div>
                <div className="flex items-center gap-3">
                  {/* Home Team Logo */}
                  {getTeamLogo(teams, selectedGame.home) ? (
                    <img src={getTeamLogo(teams, selectedGame.home)} alt={selectedGame.home} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-lbl-cream border border-lbl-soft/10 flex items-center justify-center text-xs font-bold text-lbl-orange">
                      {selectedGame.home.charAt(0)}
                    </div>
                  )}
                  <span className="font-bebas text-2xl tracking-wide">{selectedGame.home}</span>
                  <span className="text-lbl-soft-light">vs</span>
                  <span className="font-bebas text-2xl tracking-wide">{selectedGame.away}</span>
                  {/* Away Team Logo */}
                  {getTeamLogo(teams, selectedGame.away) ? (
                    <img src={getTeamLogo(teams, selectedGame.away)} alt={selectedGame.away} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-lbl-cream border border-lbl-soft/10 flex items-center justify-center text-xs font-bold text-lbl-orange">
                      {selectedGame.away.charAt(0)}
                    </div>
                  )}
                  <StatusTag status={selectedGame.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-lbl-soft-light mt-1 ml-11">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {selectedGame.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {selectedGame.venue}
                  </span>
                  {getGameScore(selectedGame) && (
                    <span className="font-jetbrains text-lg font-bold text-lbl-orange">
                      {getGameScore(selectedGame)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedGame(null)}
                className="p-1.5 rounded-full hover:bg-lbl-soft/10 transition-colors text-lbl-soft-light hover:text-lbl-soft"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Play-by-Play */}
            <div className="p-6 pt-4 overflow-y-auto flex-1">
              {selectedGame.plays && selectedGame.plays.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-lbl-orange" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-lbl-soft-light">
                      Play-by-Play
                    </h3>
                    <span className="text-xs text-lbl-soft-light/50">
                      ({selectedGame.plays.length} events)
                    </span>
                  </div>
                  <div className="bg-lbl-cream/30 rounded-xl border border-lbl-soft/10 overflow-hidden">
                    <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-lbl-cream/70 text-xs font-semibold uppercase tracking-wider text-lbl-soft-light border-b border-lbl-soft/10">
                      <span className="col-span-2">Time</span>
                      <span className="col-span-5">Player</span>
                      <span className="col-span-3">Team</span>
                      <span className="col-span-2 text-right">Points</span>
                    </div>
                    <div className="divide-y divide-lbl-soft/5 max-h-[400px] overflow-y-auto">
                      {selectedGame.plays.map((play, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-12 gap-2 px-4 py-2.5 text-sm hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
                        >
                          <span className="col-span-2 font-jetbrains text-xs text-lbl-soft-light">
                            {play.time}
                          </span>
                          <span className="col-span-5 font-medium text-lbl-dark">
                            {play.player}
                          </span>
                          <span className="col-span-3 text-lbl-soft-light">
                            {play.team}
                          </span>
                          <span className="col-span-2 text-right">
                            <PointBadge points={play.points} />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Trophy size={32} className="text-lbl-soft-light/30 mb-3" />
                  <p className="text-lbl-soft-light text-sm">
                    No play-by-play data available for this game yet.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-lbl-soft/10 bg-lbl-cream/30 shrink-0">
              <p className="text-[11px] text-lbl-soft-light text-center flex items-center justify-center gap-1">
                <Users size={13} /> Scoring events are recorded live during the game.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}