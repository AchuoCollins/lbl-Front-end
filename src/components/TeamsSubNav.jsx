import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Users, Trophy, BarChart3 } from "lucide-react";

export default function TeamsSubNav() {
  const location = useLocation();
  
  const isTeamsActive = location.pathname === "/teams" || location.pathname.startsWith("/teams/");
  const isStandingsActive = location.pathname === "/standings";
  const isStatsActive = location.pathname === "/stats";

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-lbl-orange text-white dark:bg-lbl-dark-orange dark:text-[#12181A]"
        : "text-lbl-soft dark:text-white/60 hover:bg-lbl-orange/10 dark:hover:bg-white/10 hover:text-lbl-dark dark:hover:text-white"
    }`;

  return (
    <div className="border-b border-lbl-soft/10 dark:border-lbl-dark-border mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? "bg-lbl-orange text-white dark:bg-lbl-dark-orange dark:text-[#12181A]"
                : "text-lbl-soft dark:text-white/60 hover:bg-lbl-orange/10 dark:hover:bg-white/10 hover:text-lbl-dark dark:hover:text-white"
            }`
          }
        >
          <Users size={16} />
          Teams
        </NavLink>
        <NavLink
          to="/standings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? "bg-lbl-orange text-white dark:bg-lbl-dark-orange dark:text-[#12181A]"
                : "text-lbl-soft dark:text-white/60 hover:bg-lbl-orange/10 dark:hover:bg-white/10 hover:text-lbl-dark dark:hover:text-white"
            }`
          }
        >
          <Trophy size={16} />
          Standings
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? "bg-lbl-orange text-white dark:bg-lbl-dark-orange dark:text-[#12181A]"
                : "text-lbl-soft dark:text-white/60 hover:bg-lbl-orange/10 dark:hover:bg-white/10 hover:text-lbl-dark dark:hover:text-white"
            }`
          }
        >
          <BarChart3 size={16} />
          Stats
        </NavLink>
      </div>
    </div>
  );
}