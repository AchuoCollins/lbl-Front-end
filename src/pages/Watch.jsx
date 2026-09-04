import React, { useState, useMemo } from "react";
import { Play, Calendar, Clock, Bell, Share2, ChevronRight, CheckCircle, AlertCircle, Check } from "lucide-react";
import { useAppContext } from '../context/AppContext';
import { Link } from "react-router-dom";

export default function Watch() {
  const { games, teams } = useAppContext();
  const [notify, setNotify] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper to get team logo
  const getTeamLogo = (teamName) => {
    const team = teams.find(t => t.name === teamName);
    return team?.logo || null;
  };

  // Check if game is expired (FINAL status with date in past)
  const isGameExpired = (game) => {
    if (game.status !== "FINAL") return false;
    const gameDate = new Date(game.date);
    const today = new Date();
    const diffTime = Math.abs(today - gameDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 7;
  };

  // Get upcoming games only (live games have their own section)
  const upcomingGames = useMemo(() => {
    return games
      .filter(g => g.status === "UPCOMING" && !isGameExpired(g))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 6);
  }, [games]);

  // Get live games (excluding expired)
  const liveGames = useMemo(() => {
    return games.filter(g => g.status === "LIVE" && !isGameExpired(g));
  }, [games]);

  // Get recent finished games (including expired ones)
  const recentGames = useMemo(() => {
    return games
      .filter(g => g.status === "FINAL")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4);
  }, [games]);

  // Get the selected game or default to first live/upcoming
  const featuredGame = useMemo(() => {
    if (selectedGameId) {
      const selected = games.find(g => g.id === selectedGameId);
      if (selected) return selected;
    }
    const live = liveGames[0];
    if (live) return live;
    return upcomingGames[0] || null;
  }, [selectedGameId, games, liveGames, upcomingGames]);

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "TBD";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Get game score
  const getGameScore = (game) => {
    if (game.status === "FINAL" || game.status === "LIVE") {
      const homeTotal = game.quarters?.home?.reduce((sum, v) => sum + (v || 0), 0) || 0;
      const awayTotal = game.quarters?.away?.reduce((sum, v) => sum + (v || 0), 0) || 0;
      return `${homeTotal}–${awayTotal}`;
    }
    return null;
  };

  // Get YouTube link for featured game (only if not expired)
  const getYouTubeLink = () => {
    if (featuredGame && featuredGame.youtube && !isGameExpired(featuredGame) && featuredGame.status !== "FINAL") {
      return featuredGame.youtube;
    }
    return null;
  };

  // Handle game selection
  const selectGame = (gameId) => {
    setSelectedGameId(gameId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Share functions
  const getShareUrl = () => {
    return window.location.href;
  };

  const getShareText = () => {
    if (!featuredGame) return "Check out the Littoral Basketball League!";
    const score = getGameScore(featuredGame);
    const status = featuredGame.status === "LIVE" ? "🔴 LIVE" : 
                   featuredGame.status === "FINAL" ? "✅ FINAL" : 
                   "📅 UPCOMING";
    return `${status}: ${featuredGame.away} @ ${featuredGame.home}${score ? ` - Score: ${score}` : ''} | Littoral Basketball League`;
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}&quote=${encodeURIComponent(getShareText())}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(getShareText() + ' ' + getShareUrl())}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const shareToEmail = () => {
    const subject = encodeURIComponent(`LBL Game: ${featuredGame?.away} @ ${featuredGame?.home}`);
    const body = encodeURIComponent(getShareText() + '\n\n' + getShareUrl());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowShareMenu(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowShareMenu(false);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = getShareUrl();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowShareMenu(false);
    }
  };

  // Render team with logo
  const renderTeamWithLogo = (teamName, size = "sm") => {
    const logo = getTeamLogo(teamName);
    const sizeClasses = {
      xs: "w-5 h-5 text-[8px]",
      sm: "w-7 h-7 text-xs",
      md: "w-9 h-9 text-sm",
      lg: "w-12 h-12 text-base",
    };
    const sizeClass = sizeClasses[size] || sizeClasses.sm;
    
    if (logo) {
      return (
        <div className="flex items-center gap-2">
          <img src={logo} alt={teamName} className={`${sizeClass} rounded-full object-cover`} />
          <span className="font-medium">{teamName}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className={`${sizeClass} rounded-full bg-lbl-cream border border-lbl-soft/10 flex items-center justify-center font-bebas text-lbl-orange`}>
          {teamName.charAt(0)}
        </div>
        <span className="font-medium">{teamName}</span>
      </div>
    );
  };

  // Check if a game is finished
  const isGameFinished = (game) => {
    return game.status === "FINAL";
  };

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">WATCH LBL</h1>
      <p className="text-lbl-soft text-sm mb-6 max-w-xl">
        All league games streamed live on YouTube. Subscribe and never miss a game.
      </p>

      {/* Featured Game Stream */}
      <div className="bg-white rounded-2xl border border-lbl-soft/10 overflow-hidden shadow-sm mb-8">
        <div className="grid md:grid-cols-3 gap-0">
          {/* Video Preview - 2/3 on desktop */}
          <div className="md:col-span-2 bg-gradient-to-br from-lbl-orange/10 to-lbl-cream flex items-center justify-center relative min-h-[280px] md:min-h-[320px]">
            <div className="text-center p-6">
              {featuredGame ? (
                <>
                  {isGameFinished(featuredGame) ? (
                    // Game Ended State
                    <>
                      <div className="w-20 h-20 rounded-full bg-lbl-soft-light/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} className="text-lbl-soft-light" />
                      </div>
                      <p className="text-lg font-semibold text-lbl-dark">
                        {featuredGame.away} @ {featuredGame.home}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-lbl-soft-light/10 rounded-full text-sm text-lbl-soft-light">
                          <CheckCircle size={16} />
                          Game Ended
                        </span>
                      </div>
                      {getGameScore(featuredGame) && (
                        <div className="mt-3">
                          <span className="text-2xl font-jetbrains text-lbl-orange font-bold">
                            Final: {getGameScore(featuredGame)}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-lbl-soft-light">
                        {formatDate(featuredGame.date)} {featuredGame.time && `· ${featuredGame.time}`}
                        {featuredGame.venue && ` · ${featuredGame.venue}`}
                      </div>
                    </>
                  ) : featuredGame.youtube && !isGameExpired(featuredGame) ? (
                    <a 
                      href={featuredGame.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block hover:scale-105 transition-transform duration-200"
                    >
                      <div className="w-20 h-20 rounded-full bg-lbl-orange/20 flex items-center justify-center mx-auto mb-4 hover:bg-lbl-orange/30 transition-colors">
                        <Play size={36} className="text-lbl-orange ml-1" />
                      </div>
                      <p className="text-sm text-lbl-soft-light hover:text-lbl-orange transition-colors">
                        Click to watch on YouTube
                      </p>
                    </a>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-4">
                        <Play size={36} className="text-lbl-orange ml-1" />
                      </div>
                      <p className="text-lg font-semibold text-lbl-dark">
                        {featuredGame.away} @ {featuredGame.home}
                      </p>
                      {featuredGame.status === "LIVE" && (
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <div className="w-2 h-2 rounded-full bg-[#c73b2b] animate-pulse" />
                          <span className="text-sm font-semibold text-[#c73b2b]">LIVE</span>
                          <span className="text-lg font-jetbrains text-lbl-orange font-bold">
                            {getGameScore(featuredGame)}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  {!isGameFinished(featuredGame) && !isGameExpired(featuredGame) && (
                    <div className="flex items-center justify-center gap-3 mt-2 text-sm text-lbl-soft-light">
                      <span>{formatDate(featuredGame.date)}</span>
                      {featuredGame.time && <span>· {featuredGame.time}</span>}
                      {featuredGame.venue && <span>· {featuredGame.venue}</span>}
                    </div>
                  )}
                  {isGameExpired(featuredGame) && (
                    <div className="mt-3">
                      <span className="text-xs text-lbl-soft-light bg-lbl-soft-light/10 px-3 py-1 rounded-full">
                        Stream expired
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-4">
                    <Play size={36} className="text-lbl-orange ml-1" />
                  </div>
                  <p className="text-lg font-semibold text-lbl-dark">No games scheduled</p>
                  <p className="text-sm text-lbl-soft-light mt-1">Check back soon for upcoming broadcasts</p>
                </>
              )}
            </div>
            {featuredGame && featuredGame.status === "LIVE" ? (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#c73b2b] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </div>
            ) : featuredGame && featuredGame.status === "FINAL" ? (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-lbl-soft-light/20 text-lbl-soft-light px-3 py-1.5 rounded-full text-xs">
                <CheckCircle size={12} />
                Final
              </div>
            ) : featuredGame && !isGameExpired(featuredGame) ? (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-lbl-dark/80 backdrop-blur text-lbl-cream px-3 py-1.5 rounded-full text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c73b2b] animate-pulse" />
                Upcoming
              </div>
            ) : null}
          </div>

          {/* Game Info Sidebar - 1/3 on desktop */}
          <div className="md:col-span-1 p-6 bg-white border-t md:border-t-0 md:border-l border-lbl-soft/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {featuredGame ? (
                  <>
                    {renderTeamWithLogo(featuredGame.home, "md")}
                    <span className="text-lbl-soft-light text-sm">vs</span>
                    {renderTeamWithLogo(featuredGame.away, "md")}
                  </>
                ) : (
                  <p className="text-lbl-soft-light text-sm">No game selected</p>
                )}
              </div>
              
              {featuredGame && (
                <>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-lbl-soft-light">
                      <Calendar size={14} />
                      <span>{formatDate(featuredGame.date)}</span>
                    </div>
                    {featuredGame.time && (
                      <div className="flex items-center gap-2 text-lbl-soft-light">
                        <Clock size={14} />
                        <span>{featuredGame.time}</span>
                      </div>
                    )}
                    {featuredGame.venue && (
                      <div className="flex items-center gap-2 text-lbl-soft-light">
                        <span>📍 {featuredGame.venue}</span>
                      </div>
                    )}
                    {isGameFinished(featuredGame) && (
                      <div className="mt-2 p-3 bg-lbl-soft-light/10 rounded-lg border border-lbl-soft/10">
                        <div className="flex items-center gap-2 text-lbl-soft-light">
                          <CheckCircle size={16} className="text-lbl-success" />
                          <span className="font-medium">Game Ended</span>
                        </div>
                        <div className="mt-1 font-jetbrains text-xl font-bold text-lbl-orange">
                          {getGameScore(featuredGame)}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isGameFinished(featuredGame) && featuredGame.youtube && !isGameExpired(featuredGame) && (
                    <div className="mt-4">
                      <a
                        href={featuredGame.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-[#C8102E] text-white font-semibold hover:bg-[#e21536] transition-colors text-sm"
                      >
                        <Play size={16} /> Watch on YouTube
                      </a>
                    </div>
                  )}
                  
                  {isGameFinished(featuredGame) && (
                    <div className="mt-4">
                      <button 
                        disabled
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-lbl-soft-light/20 text-lbl-soft-light font-semibold cursor-not-allowed text-sm"
                      >
                        <CheckCircle size={16} /> Game Ended
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {!getYouTubeLink() && featuredGame && !isGameFinished(featuredGame) && (
              <div className="mt-4">
                <button 
                  disabled
                  className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-white font-semibold cursor-not-allowed text-sm ${
                    featuredGame && isGameExpired(featuredGame)
                      ? 'bg-lbl-soft/30 dark:bg-white/15'
                      : 'bg-lbl-soft/30 dark:bg-white/15'
                  }`}
                >
                  <Play size={16} /> {featuredGame && isGameExpired(featuredGame) ? 'Stream Expired' : 'No Stream Available'}
                </button>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-lbl-soft/10 relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-full border border-lbl-soft/20 text-lbl-soft hover:border-lbl-orange hover:text-lbl-orange transition-colors text-sm"
              >
                <Share2 size={14} /> Share
              </button>
              
              {showShareMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-lbl-soft/10 overflow-hidden z-10">
                  <div className="p-2 space-y-1">
                    <button
                      onClick={shareToFacebook}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-lbl-cream transition-colors text-sm text-left"
                    >
                      <span className="text-blue-600 dark:text-blue-400 text-lg">f</span>
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={shareToTwitter}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-lbl-cream transition-colors text-sm text-left"
                    >
                      <span className="text-[#1DA1F2] text-lg">𝕏</span>
                      <span>Twitter / X</span>
                    </button>
                    <button
                      onClick={shareToWhatsApp}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-lbl-cream transition-colors text-sm text-left"
                    >
                      <span className="text-[#25D366] text-lg">💬</span>
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={shareToEmail}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-lbl-cream transition-colors text-sm text-left"
                    >
                      <span className="text-lbl-soft-light text-lg">✉️</span>
                      <span>Email</span>
                    </button>
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-lbl-cream transition-colors text-sm text-left"
                    >
                      <span className="text-lbl-soft-light text-lg">🔗</span>
                      <span className="flex items-center gap-2">
                        {copied ? (
                          <>
                            <Check size={14} className="text-lbl-success" />
                            Copied!
                          </>
                        ) : (
                          'Copy Link'
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-lbl-soft/10 p-4 shadow-sm mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-bebas text-xl tracking-wide">Get Game Alerts</h3>
            <p className="text-sm text-lbl-soft-light">Get notified when games go live</p>
          </div>
          <button
            onClick={() => setNotify(!notify)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors text-sm font-medium ${
              notify 
                ? "bg-lbl-orange text-lbl-cream" 
                : "border border-lbl-soft/20 text-lbl-soft hover:border-lbl-orange"
            }`}
          >
            <Bell size={16} />
            {notify ? "Notifications On" : "Enable Notifications"}
          </button>
        </div>
      </div>

      {/* Live Games */}
      {liveGames.length > 0 && (
        <>
          <h2 className="font-bebas text-2xl tracking-wide mb-3 flex items-center gap-2">
            <span className="text-[#c73b2b]">●</span> LIVE NOW
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {liveGames.map((game) => (
              <div 
                key={game.id} 
                onClick={() => selectGame(game.id)}
                className={`bg-white rounded-2xl border p-5 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  selectedGameId === game.id 
                    ? 'border-lbl-orange ring-2 ring-lbl-orange/20' 
                    : 'border-[#c73b2b]/30 hover:border-lbl-orange/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    {renderTeamWithLogo(game.home, "xs")}
                    <span className="text-lbl-soft-light">vs</span>
                    {renderTeamWithLogo(game.away, "xs")}
                  </div>
                  <span className="text-xs font-semibold text-[#c73b2b] animate-pulse">● LIVE</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-lbl-soft-light">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(game.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {game.time || "TBD"}</span>
                </div>
                <div className="mt-2 font-jetbrains text-lg font-bold text-lbl-orange">
                  {getGameScore(game) || "0–0"}
                </div>
                {game.youtube && (
                  <a 
                    href={game.youtube} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-lbl-orange hover:underline"
                  >
                    <Play size={12} /> Watch Live
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Upcoming Games */}
      <h2 className="font-bebas text-2xl tracking-wide mb-3">
        {liveGames.length > 0 ? "UPCOMING BROADCASTS" : "SCHEDULED GAMES"}
      </h2>
      {upcomingGames.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingGames.map((game) => (
            <div 
              key={game.id} 
              onClick={() => selectGame(game.id)}
              className={`bg-white rounded-2xl border p-5 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                selectedGameId === game.id 
                  ? 'border-lbl-orange ring-2 ring-lbl-orange/20' 
                  : 'border-lbl-soft/10 hover:border-lbl-orange/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-sm">
                {renderTeamWithLogo(game.home, "xs")}
                <span className="text-lbl-soft-light">vs</span>
                {renderTeamWithLogo(game.away, "xs")}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bebas text-lg tracking-wide">{game.away} @ {game.home}</span>
                <span className="text-xs text-lbl-soft-light">
                  {game.status === "LIVE" ? "● LIVE" : "Coming soon"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-lbl-soft-light mt-1">
                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(game.date)}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {game.time || "TBD"}</span>
              </div>
              {game.venue && (
                <p className="text-xs text-lbl-soft-light mt-1">{game.venue}</p>
              )}
              {game.youtube && (
                <a 
                  href={game.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-lbl-orange hover:underline"
                >
                  <Play size={12} /> Watch on YouTube
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-8 text-center text-lbl-soft-light shadow-sm">
          <Play size={28} className="text-lbl-soft-light/30 mx-auto mb-2" />
          <p className="text-sm">No games scheduled yet.</p>
          <p className="text-xs mt-1">Check back soon for upcoming broadcasts.</p>
        </div>
      )}

      {/* Recent Games */}
      {recentGames.length > 0 && (
        <>
          <h2 className="font-bebas text-2xl tracking-wide mb-3 mt-6">RECENT RESULTS</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentGames.map((game) => {
              const score = getGameScore(game);
              const expired = isGameExpired(game);
              return (
                <div 
                  key={game.id} 
                  onClick={() => selectGame(game.id)}
                  className="bg-white rounded-2xl border border-lbl-soft/10 p-5 shadow-sm cursor-pointer hover:border-lbl-orange/30 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    {renderTeamWithLogo(game.home, "xs")}
                    <span className="text-lbl-soft-light">vs</span>
                    {renderTeamWithLogo(game.away, "xs")}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bebas text-base tracking-wide">{game.away} @ {game.home}</span>
                    <span className="text-xs text-lbl-soft-light">
                      {expired ? 'Expired' : 'Final'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-lbl-soft-light">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(game.date)}</span>
                  </div>
                  {score && (
                    <div className="mt-2 font-jetbrains text-lg font-bold text-lbl-orange">
                      {score}
                    </div>
                  )}
                  {expired && (
                    <div className="mt-1">
                      <span className="text-xs text-lbl-soft-light bg-lbl-soft-light/10 px-2 py-0.5 rounded-full">
                        Stream expired
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}