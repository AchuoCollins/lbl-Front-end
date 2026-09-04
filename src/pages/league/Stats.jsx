import React, { useState, useMemo } from "react";
import { useAppContext } from '../../context/AppContext';
import { BarChart3, Search, Trophy } from "lucide-react";

// Helper to get team logo
const getTeamLogo = (teams, teamName) => {
  const team = teams.find(t => t.name === teamName);
  return team?.logo || null;
};

export default function Stats() {
  const { teams, games } = useAppContext();
  const [year, setYear] = useState("2026");
  const [search, setSearch] = useState("");

  const computeTeamStats = useMemo(() => {
    const teamStats = {};
    
    teams.forEach(team => {
      teamStats[team.name] = {
        name: team.name,
        gp: 0,
        totalPoints: 0,
      };
    });

    games.filter(g => g.status === "FINAL").forEach(game => {
      const homeTotal = game.quarters?.home?.reduce((sum, v) => sum + (v || 0), 0) || 0;
      const awayTotal = game.quarters?.away?.reduce((sum, v) => sum + (v || 0), 0) || 0;
      
      if (teamStats[game.home]) {
        teamStats[game.home].gp += 1;
        teamStats[game.home].totalPoints += homeTotal;
      }
      if (teamStats[game.away]) {
        teamStats[game.away].gp += 1;
        teamStats[game.away].totalPoints += awayTotal;
      }
    });

    return Object.values(teamStats).map(stat => ({
      ...stat,
      ppg: stat.gp > 0 ? stat.totalPoints / stat.gp : 0,
    }));
  }, [teams, games]);

  const filteredTeams = useMemo(() => {
    return computeTeamStats.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [computeTeamStats, search]);

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">LEAGUE STATS</h1>
      <p className="text-lbl-soft text-sm mb-6 max-w-xl">
        Team averages for points.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="bg-white border border-lbl-soft/20 rounded-lg px-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40"
        >
          <option value="2026">2026 Season</option>
        </select>
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-lbl-soft-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team..."
            className="w-full bg-white border border-lbl-soft/20 rounded-lg pl-9 pr-3 py-2 text-sm text-lbl-dark placeholder:text-lbl-soft-light focus:outline-none focus:border-lbl-orange/40"
          />
        </div>
      </div>

      {filteredTeams.length > 0 ? (
        <div className="bg-white rounded-2xl border border-lbl-soft/10 overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 gap-2 bg-lbl-cream/60 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-lbl-soft-light border-b border-lbl-soft/10">
            <span className="col-span-8 sm:col-span-6">Team</span>
            <span className="col-span-2 text-center">GP</span>
            <span className="col-span-2 text-center">PPG</span>
          </div>
          <div className="divide-y divide-lbl-soft/5">
            {filteredTeams.map((team) => {
              const teamLogo = getTeamLogo(teams, team.name);
              return (
                <div
                  key={team.name}
                  className="grid grid-cols-12 gap-2 px-5 py-3.5 items-center"
                >
                  <span className="col-span-8 sm:col-span-6 font-medium text-lbl-dark flex items-center gap-2">
                    {teamLogo ? (
                      <img src={teamLogo} alt={team.name} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-lbl-cream border border-lbl-soft/10 flex items-center justify-center font-bebas text-sm text-lbl-orange">
                        {team.name.charAt(0)}
                      </span>
                    )}
                    {team.name}
                  </span>
                  <span className="col-span-2 text-center font-jetbrains text-sm text-lbl-soft-light">
                    {team.gp}
                  </span>
                  <span className="col-span-2 text-center font-jetbrains text-sm text-lbl-orange font-semibold">
                    {team.ppg.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-lbl-soft-light/50 text-xs px-5 py-3 border-t border-lbl-soft/10 flex items-center gap-2">
            <Trophy size={12} className="text-lbl-orange" /> Averages are per game, calculated from completed matches.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-12 text-center">
          <Search size={32} className="text-lbl-soft-light/30 mx-auto mb-3" />
          <p className="text-lbl-soft-light text-sm">No teams match your search.</p>
        </div>
      )}
    </div>
  );
}