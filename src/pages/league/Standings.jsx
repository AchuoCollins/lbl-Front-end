import React, { useState, useMemo } from "react";
import { TrendingUp, Search } from "lucide-react";
import { useAppContext } from '../../context/AppContext';

// Helper to get team logo
const getTeamLogo = (teams, teamName) => {
  const team = teams.find(t => t.name === teamName);
  return team?.logo || null;
};

export default function Standings() {
  const [search, setSearch] = useState("");
  
  const { standings, teams } = useAppContext();

  // Log for debugging
  console.log("Standings from context:", standings);
  console.log("Teams from context:", teams);

  // Get registered team names from teams array
  const registeredTeamNames = useMemo(() => {
    return teams.map(t => t.name);
  }, [teams]);

  // Create a map of standings by team name
  const standingsMap = useMemo(() => {
    const map = {};
    standings.forEach(s => {
      map[s.team] = s;
    });
    return map;
  }, [standings]);

  // Build complete standings with all registered teams
  const completeStandings = useMemo(() => {
    const allTeams = [];
    const processedTeams = new Set();
    
    // Add all teams from the standings that are registered
    standings.forEach(s => {
      if (registeredTeamNames.includes(s.team)) {
        allTeams.push({ ...s });
        processedTeams.add(s.team);
      }
    });
    
    // Add any registered teams that aren't in standings yet
    registeredTeamNames.forEach(teamName => {
      if (!processedTeams.has(teamName)) {
        allTeams.push({ team: teamName, w: 0, l: 0 });
      }
    });
    
    return allTeams;
  }, [standings, registeredTeamNames]);

  console.log("Complete standings:", completeStandings);

  const hasStarted = completeStandings.some((c) => (c.w || 0) + (c.l || 0) > 0);

  const filtered = useMemo(
    () => completeStandings.filter((c) => 
      c.team.toLowerCase().includes(search.toLowerCase())
    ),
    [completeStandings, search]
  );

  // Sort by wins (descending), then by losses (ascending)
  const sortedStandings = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if ((b.w || 0) !== (a.w || 0)) return (b.w || 0) - (a.w || 0);
      return (a.l || 0) - (b.l || 0);
    });
  }, [filtered]);

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">STANDINGS</h1>
      <p className="text-lbl-soft text-sm mb-6 max-w-xl">
        {hasStarted
          ? "Updated after every finalized game."
          : "Standings begin once the inaugural season tips off — every club starts at 0–0."}
        <span className="block text-xs text-lbl-soft-light mt-1">
          {completeStandings.length} registered teams
        </span>
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-5">
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
        <div className="text-xs text-lbl-soft-light">
          {sortedStandings.length} {sortedStandings.length === 1 ? 'team' : 'teams'} shown
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-lbl-soft/10 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-lbl-soft-light font-jetbrains text-xs uppercase tracking-wide border-b border-lbl-soft/10">
              <th className="px-5 py-3 font-medium">#</th>
              <th className="px-5 py-3 font-medium">Club</th>
              <th className="px-5 py-3 font-medium">W</th>
              <th className="px-5 py-3 font-medium">L</th>
              <th className="px-5 py-3 font-medium">PCT</th>
            </tr>
          </thead>
          <tbody>
            {sortedStandings.map((c, i) => {
              const wins = c.w || 0;
              const losses = c.l || 0;
              const total = wins + losses;
              const pct = total > 0 ? (wins / total * 100).toFixed(1) : "0.0";
              const teamLogo = getTeamLogo(teams, c.team);
              
              return (
                <tr key={c.team} className="border-b border-lbl-soft/5 last:border-0 hover:bg-lbl-cream/30 transition-colors">
                  <td className="px-5 py-3 text-lbl-soft-light font-jetbrains">{i + 1}</td>
                  <td className="px-5 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      {teamLogo ? (
                        <img src={teamLogo} alt={c.team} className="w-6 h-6 rounded-full object-cover" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-lbl-cream border border-lbl-soft/10 flex items-center justify-center text-[10px] font-bold text-lbl-orange">
                          {c.team.charAt(0)}
                        </div>
                      )}
                      {c.team}
                    </div>
                  </td>
                  <td className="px-5 py-3 font-jetbrains text-lbl-dark/70 dark:text-white/70">{wins}</td>
                  <td className="px-5 py-3 font-jetbrains text-lbl-dark/70 dark:text-white/70">{losses}</td>
                  <td className="px-5 py-3 font-jetbrains text-lbl-dark/70 dark:text-white/70">{pct}%</td>
                </tr>
              );
            })}
            {sortedStandings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-lbl-soft-light text-sm">
                  {completeStandings.length === 0 
                    ? "No teams registered yet. Add teams in the admin dashboard."
                    : `No team matches "${search}".`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!hasStarted && completeStandings.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-lbl-soft-light mt-4">
          <TrendingUp size={13} /> Rankings will update automatically as games are finalized.
        </div>
      )}

      {completeStandings.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-lbl-soft-light mt-4 bg-lbl-cream/50 p-3 rounded-lg border border-lbl-soft/10">
          <span className="text-lbl-orange">ℹ️</span>
          No teams have been registered yet. Please add teams in the admin dashboard to see standings.
        </div>
      )}
    </div>
  );
}