import { createContext, useState, useContext, useEffect } from 'react';
import { apiFetch } from '../api/client';
import { useAuth } from './AuthContext';

// Create Context
const AppContext = createContext();

// Helper to generate unique reference (server also generates one; kept for
// any UI code that wants a client-side preview before submitting).
const generateRef = (prefix) => {
  const num = String(Math.floor(1000 + Math.random() * 9000));
  return `${prefix}-${num}`;
};

// Provider Component
export function AppProvider({ children }) {
  const { isAuthenticated } = useAuth();

  // ============================================
  // STATE — backed by the backend API
  // ============================================
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [donations, setDonations] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [standings, setStandings] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);

  // ============================================
  // RECEIPT STATE (client-only, ephemeral)
  // ============================================
  const [currentReceipt, setCurrentReceipt] = useState(null);

  const showReceipt = (receiptData) => {
    setCurrentReceipt({
      ...receiptData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    });
  };

  const clearReceipt = () => {
    setCurrentReceipt(null);
  };

  // ============================================
  // INITIAL LOAD — public data on mount
  // ============================================
  useEffect(() => {
    apiFetch('/teams').then(setTeams).catch((err) => console.error('Failed to load teams:', err));
    apiFetch('/games').then(setGames).catch((err) => console.error('Failed to load games:', err));
    apiFetch('/news').then(setNews).catch((err) => console.error('Failed to load news:', err));
    apiFetch('/announcements').then(setAnnouncements).catch((err) => console.error('Failed to load announcements:', err));
    apiFetch('/highlights').then(setHighlights).catch((err) => console.error('Failed to load highlights:', err));
    apiFetch('/standings').then(setStandings).catch((err) => console.error('Failed to load standings:', err));
  }, []);

  // Donations, tickets and support tickets are admin-only reads — only fetch
  // them once an admin is logged in.
  useEffect(() => {
    if (!isAuthenticated) {
      setDonations([]);
      setTickets([]);
      setSupportTickets([]);
      return;
    }
    apiFetch('/donations').then(setDonations).catch((err) => console.error('Failed to load donations:', err));
    apiFetch('/tickets').then(setTickets).catch((err) => console.error('Failed to load tickets:', err));
    apiFetch('/support-tickets').then(setSupportTickets).catch((err) => console.error('Failed to load support tickets:', err));
  }, [isAuthenticated]);

  // ============================================
  // CRUD Operations for Teams
  // ============================================
  const addTeam = async (team) => {
    const newTeam = await apiFetch('/teams', { method: 'POST', body: team });
    setTeams((prev) => [...prev, newTeam]);
    apiFetch('/standings').then(setStandings).catch((err) => console.error('Failed to refresh standings:', err));
    return newTeam;
  };

  const updateTeam = async (id, updatedTeam) => {
    const updated = await apiFetch(`/teams/${id}`, { method: 'PUT', body: updatedTeam });
    setTeams((prev) => prev.map((t) => (t.id === id ? updated : t)));
    apiFetch('/standings').then(setStandings).catch((err) => console.error('Failed to refresh standings:', err));
    return updated;
  };

  const deleteTeam = async (id) => {
    await apiFetch(`/teams/${id}`, { method: 'DELETE' });
    setTeams((prev) => prev.filter((t) => t.id !== id));
    apiFetch('/standings').then(setStandings).catch((err) => console.error('Failed to refresh standings:', err));
  };

  // ============================================
  // CRUD Operations for Games
  // ============================================
  const addGame = async (game) => {
    const newGame = await apiFetch('/games', { method: 'POST', body: game });
    setGames((prev) => [...prev, newGame]);
    return newGame;
  };

  const updateGame = async (id, updatedGame) => {
    const updated = await apiFetch(`/games/${id}`, { method: 'PUT', body: updatedGame });
    setGames((prev) => prev.map((g) => (g.id === id ? updated : g)));
    return updated;
  };

  const deleteGame = async (id) => {
    await apiFetch(`/games/${id}`, { method: 'DELETE' });
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  const updateGameScore = async (id, homeScore, awayScore, quarters) => {
    const updated = await apiFetch(`/games/${id}/score`, {
      method: 'PATCH',
      body: { homeScore, awayScore, quarters },
    });
    setGames((prev) => prev.map((g) => (g.id === id ? updated : g)));
    return updated;
  };

  const updateGameStatus = async (id, status) => {
    const updated = await apiFetch(`/games/${id}/status`, { method: 'PATCH', body: { status } });
    setGames((prev) => prev.map((g) => (g.id === id ? updated : g)));
    return updated;
  };

  // ============================================
  // CRUD Operations for News
  // ============================================
  const addNews = async (newsItem) => {
    const newItem = await apiFetch('/news', { method: 'POST', body: newsItem });
    setNews((prev) => [...prev, newItem]);
    return newItem;
  };

  const updateNews = async (id, updatedNews) => {
    const updated = await apiFetch(`/news/${id}`, { method: 'PUT', body: updatedNews });
    setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  };

  const deleteNews = async (id) => {
    await apiFetch(`/news/${id}`, { method: 'DELETE' });
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleNewsStatus = async (id) => {
    const updated = await apiFetch(`/news/${id}/publish`, { method: 'PATCH' });
    setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  };

  const toggleFeatured = async (id) => {
    const updated = await apiFetch(`/news/${id}/featured`, { method: 'PATCH' });
    setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  };

  const likeNews = async (id) => {
    const updated = await apiFetch(`/news/${id}/like`, { method: 'PATCH' });
    setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  };

  const dislikeNews = async (id) => {
    const updated = await apiFetch(`/news/${id}/dislike`, { method: 'PATCH' });
    setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  };

  const updateNewsCategory = async (id, category) => {
    const updated = await apiFetch(`/news/${id}`, { method: 'PUT', body: { category } });
    setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  };

  // ============================================
  // CRUD Operations for Announcements
  // ============================================
  const addAnnouncement = async (announcement) => {
    const newItem = await apiFetch('/announcements', { method: 'POST', body: announcement });
    setAnnouncements((prev) => [...prev, newItem]);
    return newItem;
  };

  const deleteAnnouncement = async (id) => {
    await apiFetch(`/announcements/${id}`, { method: 'DELETE' });
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const reorderAnnouncements = async (items) => {
    setAnnouncements(items);
    const updated = await apiFetch('/announcements/reorder', { method: 'PUT', body: { items } });
    setAnnouncements(updated);
    return updated;
  };

  // ============================================
  // CRUD Operations for Highlights
  // ============================================
  const addHighlight = async (highlight) => {
    const newItem = await apiFetch('/highlights', { method: 'POST', body: highlight });
    setHighlights((prev) => [...prev, newItem]);
    return newItem;
  };

  const deleteHighlight = async (id) => {
    await apiFetch(`/highlights/${id}`, { method: 'DELETE' });
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  };

  // ============================================
  // CRUD Operations for Donations
  // ============================================
  const addDonation = async (donation) => {
    const { donation: newDonation, receipt } = await apiFetch('/donations', { method: 'POST', body: donation });
    setDonations((prev) => [...prev, newDonation]);
    showReceipt(receipt);
    return newDonation;
  };

  const updateDonationStatus = async (id, status) => {
    const updated = await apiFetch(`/donations/${id}/status`, { method: 'PATCH', body: { status } });
    setDonations((prev) => prev.map((d) => (d.id === id ? updated : d)));
    return updated;
  };

  // ============================================
  // CRUD Operations for Tickets
  // ============================================
  const addTicket = async (ticket) => {
    const { ticket: newTicket, receipt } = await apiFetch('/tickets', { method: 'POST', body: ticket });
    setTickets((prev) => [...prev, newTicket]);
    showReceipt(receipt);
    return newTicket;
  };

  const updateTicketStatus = async (id, status) => {
    const updated = await apiFetch(`/tickets/${id}/status`, { method: 'PATCH', body: { status } });
    setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  };

  // ============================================
  // CRUD Operations for Support Tickets
  // ============================================
  const addSupportTicket = async (ticket) => {
    const newTicket = await apiFetch('/support-tickets', { method: 'POST', body: ticket });
    setSupportTickets((prev) => [...prev, newTicket]);
    return newTicket;
  };

  const updateSupportTicketStatus = async (id, status) => {
    const updated = await apiFetch(`/support-tickets/${id}/status`, { method: 'PATCH', body: { status } });
    setSupportTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  };

  const deleteSupportTicket = async (id) => {
    await apiFetch(`/support-tickets/${id}`, { method: 'DELETE' });
    setSupportTickets((prev) => prev.filter((t) => t.id !== id));
  };

  // ============================================
  // Standings
  // ============================================
  const updateStandings = async (homeTeam, awayTeam, homeScore, awayScore) => {
    const updated = await apiFetch('/standings/recalculate', {
      method: 'POST',
      body: { homeTeam, awayTeam, homeScore, awayScore },
    });
    setStandings(updated);
    return updated;
  };

  // ============================================
  // Reset Functions
  // ============================================
  const resetGames = async () => {
    const updated = await apiFetch('/games/reset-season', { method: 'POST' });
    setGames(updated);
    return updated;
  };

  const resetStandings = async () => {
    const updated = await apiFetch('/standings/reset', { method: 'POST' });
    setStandings(updated);
    return updated;
  };

  const resetSeason = async () => {
    const { games: updatedGames, standings: updatedStandings } = await apiFetch('/season/reset', { method: 'POST' });
    setGames(updatedGames);
    setStandings(updatedStandings);
  };

  // ============================================
  // Export all values and functions
  // ============================================
  const value = {
    // Data
    teams,
    games,
    news,
    announcements,
    highlights,
    donations,
    tickets,
    standings,
    currentReceipt,
    supportTickets,

    // Teams
    addTeam,
    updateTeam,
    deleteTeam,

    // Games
    addGame,
    updateGame,
    deleteGame,
    updateGameScore,
    updateGameStatus,

    // News
    addNews,
    updateNews,
    deleteNews,
    toggleNewsStatus,
    toggleFeatured,
    likeNews,
    dislikeNews,
    updateNewsCategory,
    addAnnouncement,
    deleteAnnouncement,
    reorderAnnouncements,

    // Highlights
    addHighlight,
    deleteHighlight,

    // Donations
    addDonation,
    updateDonationStatus,

    // Tickets
    addTicket,
    updateTicketStatus,

    // Standings
    updateStandings,
    resetGames,
    resetStandings,
    resetSeason,

    // Receipt
    showReceipt,
    clearReceipt,
    generateRef,

    // Support Tickets
    addSupportTicket,
    updateSupportTicketStatus,
    deleteSupportTicket,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
