import React, { useState, useEffect } from "react";
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../api/client';
import {
  LayoutDashboard,
  Shield,
  Calendar,
  ClipboardEdit,
  Newspaper,
  Video,
  Heart,
  Ticket,
  LifeBuoy,
  LogOut,
  Bell,
  ChevronRight,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Flag,
  Trash2,
  Ban,
  Users,
  UserPlus,
  Mail,
  Plus,
  ExternalLink,
  Pencil,
  MapPin,
  Clock,
  Link2,
  Minus,
  Radio,
  CheckCircle2,
  Megaphone,
  ArrowUp,
  ArrowDown,
  Send,
  Tag,
  ThumbsUp,
  Eye,
  Repeat,
  Upload,
  User,
  Award,
  Phone,
  Mail as MailIcon,
  Briefcase,
  X,
  Camera,
  Save,
  Image,
  RotateCcw,
  AlertTriangle,
  RefreshCw,
  Lock,
  Loader2,
} from "lucide-react";

const navSections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "teams", label: "Teams", icon: Shield },
  { id: "games", label: "Games & Schedule", icon: Calendar },
  { id: "scores", label: "Score Entry", icon: ClipboardEdit },
  { id: "news", label: "News", icon: Newspaper },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "highlights", label: "Video Highlights", icon: Video },
  { id: "comments", label: "Comments", icon: MessageSquare },
  { id: "donations", label: "Donations", icon: Heart },
  { id: "tickets", label: "Ticket Sales", icon: Ticket },
  { id: "support", label: "Support & Issues", icon: LifeBuoy },
  { id: "admins", label: "Admins", icon: Users },
];

// ============================================
// STATUS PILL
// ============================================
function StatusPill({ status }) {
  const map = {
    CONFIRMED: { color: "#3FA66E", bg: "rgba(63,166,110,0.12)" },
    PENDING: { color: "#E8A93D", bg: "rgba(232,169,61,0.12)" },
    FAILED: { color: "#C8102E", bg: "rgba(200,16,46,0.12)" },
    UPCOMING: { color: "#2FA8A3", bg: "rgba(47,168,163,0.12)" },
    LIVE: { color: "#C8102E", bg: "rgba(200,16,46,0.12)" },
    FINAL: { color: "#8B9A94", bg: "rgba(139,154,148,0.12)" },
    PUBLISHED: { color: "#3FA66E", bg: "rgba(63,166,110,0.12)" },
    DRAFT: { color: "#8B9A94", bg: "rgba(139,154,148,0.12)" },
    VISIBLE: { color: "#3FA66E", bg: "rgba(63,166,110,0.12)" },
    FLAGGED: { color: "#E8A93D", bg: "rgba(232,169,61,0.12)" },
    REMOVED: { color: "#C8102E", bg: "rgba(200,16,46,0.12)" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] font-medium px-2.5 py-1 rounded-full"
      style={{ color: s?.color || "#8B9A94", backgroundColor: s?.bg || "rgba(139,154,148,0.12)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s?.color || "#8B9A94" }} />
      {status}
    </span>
  );
}

// ============================================
// PLACEHOLDER PANEL
// ============================================
function PlaceholderPanel({ title, description, ctaLabel }) {
  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl p-10 text-center">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm max-w-md mx-auto mb-5">{description}</p>
      {ctaLabel && (
        <button className="text-sm font-medium px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A]">
          {ctaLabel}
        </button>
      )}
      <p className="text-white/25 text-xs mt-6">Built next — this section isn't wired up yet.</p>
    </div>
  );
}

// ============================================
// COMMENTS PANEL
// ============================================
function CommentsPanel() {
  const [filter, setFilter] = useState("all");

  const comments = [
    {
      id: 1,
      name: "Patrick N.",
      email: "patrick.n****@gmail.com",
      text: "That fourth quarter run was unreal, Sharks defense locked in.",
      on: "Sharks vs. Falcons — Highlight",
      time: "1h ago",
      status: "VISIBLE",
    },
    {
      id: 2,
      name: "Solange A.",
      email: "solange.a****@yahoo.com",
      text: "Referees were clearly favoring the home team all game long, ridiculous.",
      on: "Rapids vs. Timbers — Recap",
      time: "3h ago",
      status: "FLAGGED",
    },
    {
      id: 3,
      name: "Emmanuel D.",
      email: "e.douala****@outlook.com",
      text: "Check out this link for free tickets [suspicious link]",
      on: "All-Star Weekend — News",
      time: "5h ago",
      status: "REMOVED",
      moderatedBy: "Aline B.",
    },
    {
      id: 4,
      name: "Brenda F.",
      email: "brenda.f****@gmail.com",
      text: "Been waiting for Nkongsamba to click like this all season. Big weekend ahead.",
      on: "Falcons Weekly Preview",
      time: "1d ago",
      status: "VISIBLE",
    },
  ];

  const filtered = filter === "all" ? comments : comments.filter((c) => c.status === filter.toUpperCase());

  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div>
          <h3 className="font-semibold">Comments</h3>
          <p className="text-white/40 text-sm">Only email-verified comments appear here.</p>
        </div>
        <div className="flex gap-1.5">
          {["all", "flagged", "visible", "removed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-colors ${
                filter === f ? "bg-[#E8A93D] text-[#12181A]" : "bg-white/[0.04] text-white/50 hover:text-white/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {filtered.map((c) => (
          <div key={c.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{c.name}</span>
                  <span className="text-white/30 text-xs font-['JetBrains_Mono']">{c.email}</span>
                  <StatusPill status={c.status} />
                </div>
                <p className="text-sm text-white/80 mb-1.5">{c.text}</p>
                <p className="text-xs text-white/35">
                  On <span className="text-white/50">{c.on}</span> · {c.time}
                  {c.moderatedBy && (
                    <>
                      {" "}
                      · <span className="text-white/45">moderated by {c.moderatedBy}</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {c.status !== "REMOVED" && (
                  <button
                    title="Remove comment"
                    className="p-2 rounded-lg text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
                <button
                  title="Block this email from commenting"
                  className="p-2 rounded-lg text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
                >
                  <Ban size={15} />
                </button>
                {c.status === "FLAGGED" && (
                  <button
                    title="Mark as reviewed"
                    className="p-2 rounded-lg text-white/40 hover:text-[#3FA66E] hover:bg-[#3FA66E]/10 transition-colors"
                  >
                    <Flag size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-white/35 text-sm">No comments in this view.</div>
        )}
      </div>

      <p className="text-white/25 text-xs px-5 py-4 border-t border-white/5">
        Emails are masked here for privacy — full addresses are visible only when blocking a repeat offender.
      </p>
    </div>
  );
}

// ============================================
// TICKET SALES PANEL
// ============================================
function TicketSalesPreview() {
  const { tickets } = useAppContext();
  
  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div>
          <h3 className="font-semibold">Ticket Sales</h3>
          <p className="text-white/40 text-sm">Filter by game or ticket type, then export.</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#2FA8A3] text-[#12181A]">
          <Download size={15} /> Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/40 font-['JetBrains_Mono'] text-xs uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Buyer</th>
              <th className="px-5 py-3 font-medium">Reference</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Game</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((r) => (
              <tr key={r.id} className="border-t border-white/5">
                <td className="px-5 py-3">{r.name}</td>
                <td className="px-5 py-3 font-['JetBrains_Mono'] text-white/60">{r.ref}</td>
                <td className="px-5 py-3">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: r.type === "VIP" ? "#E8A93D" : "#8B9A94",
                      backgroundColor: r.type === "VIP" ? "rgba(232,169,61,0.12)" : "rgba(139,154,148,0.12)",
                    }}
                  >
                    {r.type}
                  </span>
                </td>
                <td className="px-5 py-3 text-white/70">{r.game}</td>
                <td className="px-5 py-3">
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-white/25 text-xs px-5 py-4 border-t border-white/5">
        Preview data — full export includes email/phone, payment method, amount paid, purchase date, and quantity.
      </p>
    </div>
  );
}

// ============================================
// ADMINS PANEL
// ============================================
function AdminsPanel() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const loadAdmins = () => {
    setLoading(true);
    setLoadError(null);
    apiFetch('/admins')
      .then((data) => setAdmins(data))
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleAdd = async () => {
    setFormError(null);
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setFormError("Name, email and password are all required.");
      return;
    }
    if (form.password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    setSaving(true);
    try {
      const created = await apiFetch('/admins', { method: 'POST', body: form });
      setAdmins((prev) => [...prev, created]);
      setForm({ name: "", email: "", password: "" });
      setAddOpen(false);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id) => {
    if (admins.length <= 1) return;
    if (!confirm('Remove this admin? They will lose access immediately.')) return;

    setRemovingId(id);
    try {
      await apiFetch(`/admins/${id}`, { method: 'DELETE' });
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div>
          <h3 className="font-semibold">Admins</h3>
          <p className="text-white/40 text-sm">Everyone here has full, equal access to this dashboard.</p>
        </div>
        <button
          onClick={() => { setAddOpen(!addOpen); setFormError(null); }}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A]"
        >
          <UserPlus size={15} /> Add Admin
        </button>
      </div>

      {addOpen && (
        <div className="p-5 border-b border-white/5 bg-white/[0.02] space-y-2">
          <div className="grid sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password (min. 8 chars)"
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
            />
          </div>
          {formError && <p className="text-xs text-[#C8102E]">{formError}</p>}
          <div className="flex justify-end">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#2FA8A3] text-[#12181A] disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : null}
              {saving ? "Adding..." : "Add Admin"}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-white/40 text-sm px-5 py-8 text-center">Loading admins...</p>
      ) : loadError ? (
        <p className="text-[#C8102E] text-sm px-5 py-8 text-center">{loadError}</p>
      ) : (
        <div className="divide-y divide-white/5">
          {admins.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#16211A] border border-white/10 flex items-center justify-center text-sm font-medium shrink-0">
                  {a.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{a.name}</span>
                    {a.you && (
                      <span className="text-[10px] font-['JetBrains_Mono'] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/40">
                        YOU
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/35 font-['JetBrains_Mono']">{a.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-white/40">Added {formatDate(a.createdAt)}</p>
                </div>
                <button
                  onClick={() => handleRemove(a.id)}
                  disabled={admins.length <= 1 || removingId === a.id}
                  title={admins.length <= 1 ? "Can't remove the last remaining admin" : "Remove admin"}
                  className={`p-2 rounded-lg transition-colors ${
                    admins.length <= 1
                      ? "text-white/15 cursor-not-allowed"
                      : "text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10"
                  }`}
                >
                  {removingId === a.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-white/25 text-xs px-5 py-4 border-t border-white/5">
        At least one admin must remain on the account at all times — the last admin can't be removed.
      </p>
    </div>
  );
}

// ============================================
// TEAMS PANEL
// ============================================
function TeamsPanel() {
  const { teams, addTeam, updateTeam, deleteTeam } = useAppContext();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const initialFormState = {
    id: null,
    name: "",
    city: "",
    department: "",
    founded: "",
    stadium: "",
    capacity: "",
    website: "",
    colors: "",
    logo: null,
    coach: {
      name: "",
      role: "Head Coach",
      email: "",
      phone: "",
      experience: "",
    },
    players: [],
  };

  const [form, setForm] = useState(initialFormState);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    number: "",
    position: "",
    age: "",
    height: "",
    weight: "",
  });
  const [editingPlayerIndex, setEditingPlayerIndex] = useState(null);

  const resetForm = () => {
    setForm(initialFormState);
    setNewPlayer({ name: "", number: "", position: "", age: "", height: "", weight: "" });
    setEditingPlayerIndex(null);
    setLogoPreview(null);
    setIsEditing(false);
    setSelectedTeam(null);
  };

  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setForm({
      id: team.id,
      name: team.name || "",
      city: team.city || "",
      department: team.department || "",
      founded: team.founded || "",
      stadium: team.stadium || "",
      capacity: team.capacity || "",
      website: team.website || "",
      colors: team.colors || "",
      logo: team.logo || null,
      coach: team.coach || { name: "", role: "Head Coach", email: "", phone: "", experience: "" },
      players: team.players || [],
    });
    setLogoPreview(team.logo || null);
    setIsEditing(true);
    setFormOpen(true);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, logo: reader.result });
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoachChange = (field, value) => {
    setForm({
      ...form,
      coach: { ...form.coach, [field]: value },
    });
  };

  const handlePlayerChange = (field, value) => {
    setNewPlayer({ ...newPlayer, [field]: value });
  };

  const handleAddPlayer = () => {
    if (!newPlayer.name.trim()) return;
    
    if (editingPlayerIndex !== null) {
      const updatedPlayers = [...form.players];
      updatedPlayers[editingPlayerIndex] = { ...newPlayer };
      setForm({ ...form, players: updatedPlayers });
      setEditingPlayerIndex(null);
    } else {
      setForm({
        ...form,
        players: [...form.players, { ...newPlayer, id: Date.now() }],
      });
    }
    
    setNewPlayer({ name: "", number: "", position: "", age: "", height: "", weight: "" });
  };

  const handleEditPlayer = (index) => {
    setNewPlayer(form.players[index]);
    setEditingPlayerIndex(index);
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = form.players.filter((_, i) => i !== index);
    setForm({ ...form, players: updatedPlayers });
    if (editingPlayerIndex === index) {
      setEditingPlayerIndex(null);
      setNewPlayer({ name: "", number: "", position: "", age: "", height: "", weight: "" });
    }
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    const teamData = {
      id: form.id || Date.now(),
      name: form.name,
      city: form.city,
      department: form.department,
      founded: form.founded,
      stadium: form.stadium,
      capacity: form.capacity,
      website: form.website,
      colors: form.colors,
      logo: form.logo,
      coach: form.coach,
      players: form.players,
    };

    if (isEditing && form.id) {
      updateTeam(form.id, teamData);
    } else {
      addTeam(teamData);
    }

    resetForm();
    setFormOpen(false);
    setIsEditing(false);
    setSelectedTeam(null);
  };

  const handleCancel = () => {
    resetForm();
    setFormOpen(false);
    setIsEditing(false);
    setSelectedTeam(null);
  };

  const positions = ["PG", "SG", "SF", "PF", "C"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Teams Management</h2>
          <p className="text-white/45 text-sm">Manage teams, coaches, players, and logos</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
            setIsEditing(false);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A] hover:bg-[#f0ba5f] transition-colors"
        >
          <Plus size={18} /> Add Team
        </button>
      </div>

      {/* Team Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1A2124] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-[#1A2124] z-10 flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-semibold">
                {isEditing ? "Edit Team" : "Add New Team"}
              </h3>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} className="text-white/60" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-[#E8A93D]">Basic Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Team Name *"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Department"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="text"
                    value={form.founded}
                    onChange={(e) => setForm({ ...form, founded: e.target.value })}
                    placeholder="Year Founded"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="text"
                    value={form.stadium}
                    onChange={(e) => setForm({ ...form, stadium: e.target.value })}
                    placeholder="Home Stadium"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="number"
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                    placeholder="Stadium Capacity"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="text"
                    value={form.colors}
                    onChange={(e) => setForm({ ...form, colors: e.target.value })}
                    placeholder="Team Colors (e.g. Red & Black)"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="Website URL"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                </div>
              </div>

              {/* Logo Upload */}
              <div className="space-y-2">
                <label className="text-sm text-white/60">Team Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl border-2 border-dashed border-white/20 bg-[#0D1214] flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Team Logo" className="w-full h-full object-contain p-2" />
                    ) : (
                      <Camera size={32} className="text-white/20" />
                    )}
                  </div>
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D1214] border border-white/10 hover:border-[#E8A93D]/40 transition-colors text-sm text-white/70">
                      <Upload size={16} />
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-white/30 mt-1">PNG, JPG, SVG (max 2MB)</p>
                  </div>
                  {logoPreview && (
                    <button
                      onClick={() => {
                        setForm({ ...form, logo: null });
                        setLogoPreview(null);
                      }}
                      className="text-xs text-[#C8102E] hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Coach Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-[#E8A93D]">Coach Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.coach.name}
                    onChange={(e) => handleCoachChange("name", e.target.value)}
                    placeholder="Coach Name"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <select
                    value={form.coach.role}
                    onChange={(e) => handleCoachChange("role", e.target.value)}
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  >
                    <option value="Head Coach">Head Coach</option>
                    <option value="Assistant Coach">Assistant Coach</option>
                    <option value="Player-Coach">Player-Coach</option>
                  </select>
                  <input
                    type="email"
                    value={form.coach.email}
                    onChange={(e) => handleCoachChange("email", e.target.value)}
                    placeholder="Coach Email"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="text"
                    value={form.coach.phone}
                    onChange={(e) => handleCoachChange("phone", e.target.value)}
                    placeholder="Coach Phone"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                  <input
                    type="text"
                    value={form.coach.experience}
                    onChange={(e) => handleCoachChange("experience", e.target.value)}
                    placeholder="Experience (e.g. 5 years)"
                    className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                  />
                </div>
              </div>

              {/* Players Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-[#E8A93D]">Players</h4>
                
                <div className="bg-[#0D1214] rounded-lg p-4 border border-white/5">
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    <input
                      type="text"
                      value={newPlayer.name}
                      onChange={(e) => handlePlayerChange("name", e.target.value)}
                      placeholder="Name"
                      className="bg-[#1A2124] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40 col-span-2"
                    />
                    <input
                      type="text"
                      value={newPlayer.number}
                      onChange={(e) => handlePlayerChange("number", e.target.value)}
                      placeholder="#"
                      className="bg-[#1A2124] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                    />
                    <select
                      value={newPlayer.position}
                      onChange={(e) => handlePlayerChange("position", e.target.value)}
                      className="bg-[#1A2124] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                    >
                      <option value="">Position</option>
                      {positions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={newPlayer.age}
                      onChange={(e) => handlePlayerChange("age", e.target.value)}
                      placeholder="Age"
                      className="bg-[#1A2124] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                    />
                    <input
                      type="text"
                      value={newPlayer.height}
                      onChange={(e) => handlePlayerChange("height", e.target.value)}
                      placeholder="Height"
                      className="bg-[#1A2124] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => {
                        setNewPlayer({ name: "", number: "", position: "", age: "", height: "", weight: "" });
                        setEditingPlayerIndex(null);
                      }}
                      className="text-sm text-white/40 hover:text-white/70 px-3 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddPlayer}
                      disabled={!newPlayer.name.trim()}
                      className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-lg transition-colors ${
                        newPlayer.name.trim()
                          ? "bg-[#E8A93D] text-[#12181A] hover:bg-[#f0ba5f]"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                    >
                      {editingPlayerIndex !== null ? (
                        <>Update Player</>
                      ) : (
                        <><Plus size={14} /> Add Player</>
                      )}
                    </button>
                  </div>
                </div>

                {form.players.length > 0 && (
                  <div className="bg-[#0D1214] rounded-lg border border-white/5 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="text-left text-white/40 font-['JetBrains_Mono'] text-xs uppercase tracking-wide border-b border-white/5">
                        <tr>
                          <th className="px-4 py-2">#</th>
                          <th className="px-4 py-2">Name</th>
                          <th className="px-4 py-2">Pos</th>
                          <th className="px-4 py-2">Age</th>
                          <th className="px-4 py-2">Height</th>
                          <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {form.players.map((player, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 font-['JetBrains_Mono'] text-white/50">{player.number || "—"}</td>
                            <td className="px-4 py-2">{player.name}</td>
                            <td className="px-4 py-2 text-white/60">{player.position || "—"}</td>
                            <td className="px-4 py-2 text-white/60">{player.age || "—"}</td>
                            <td className="px-4 py-2 text-white/60">{player.height || "—"}</td>
                            <td className="px-4 py-2 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleEditPlayer(index)}
                                  className="p-1.5 rounded text-white/40 hover:text-[#E8A93D] hover:bg-[#E8A93D]/10 transition-colors"
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  onClick={() => handleRemovePlayer(index)}
                                  className="p-1.5 rounded text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-lg text-white/60 hover:text-white/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name.trim()}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${
                    form.name.trim()
                      ? "bg-[#E8A93D] text-[#12181A] hover:bg-[#f0ba5f]"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <Save size={18} />
                  {isEditing ? "Update Team" : "Add Team"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-[#1A2124] border border-white/5 rounded-xl p-5 hover:border-[#E8A93D]/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#0D1214] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                {team.logo ? (
                  <img src={team.logo} alt={team.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <Shield size={28} className="text-white/20" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-lg">{team.name}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {team.city || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={12} /> {team.department || "N/A"}
                  </span>
                  {team.colors && (
                    <span className="flex items-center gap-1">
                      <span 
                        className="w-3 h-3 rounded-full border border-white/10"
                        style={{ background: team.colors }}
                      />
                      {team.colors}
                    </span>
                  )}
                </div>
                
                {team.coach?.name && (
                  <div className="mt-1 text-xs text-white/40">
                    Coach: <span className="text-white/60">{team.coach.name}</span>
                    {team.coach.experience && ` · ${team.coach.experience}`}
                  </div>
                )}
                
                <div className="mt-1 text-xs text-white/40">
                  Players: <span className="text-white/60">{team.players?.length || 0}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleEditTeam(team)}
                  className="p-2 rounded-lg text-white/40 hover:text-[#E8A93D] hover:bg-[#E8A93D]/10 transition-colors"
                  title="Edit Team"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="p-2 rounded-lg text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
                  title="Delete Team"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {teams.length === 0 && (
          <div className="col-span-2 bg-[#1A2124] border border-white/5 rounded-xl p-12 text-center text-white/35">
            <Shield size={48} className="mx-auto mb-4 text-white/10" />
            <p>No teams added yet. Click "Add Team" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// GAMES PANEL - With Edit Functionality
// ============================================
function GameStatusPill({ status }) {
  const map = {
    UPCOMING: { color: "#2FA8A3", bg: "rgba(47,168,163,0.12)" },
    LIVE: { color: "#C8102E", bg: "rgba(200,16,46,0.12)" },
    FINAL: { color: "#8B9A94", bg: "rgba(139,154,148,0.12)" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] font-medium px-2.5 py-1 rounded-full"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {status}
    </span>
  );
}

function GamesPanel() {
  const { teams, games, addGame, updateGame, deleteGame } = useAppContext();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    home: "",
    away: "",
    date: "",
    time: "",
    venue: "",
    youtube: "",
    standard: "",
    vip: "",
  });

  const registeredTeamNames = teams.map(t => t.name);

  // Reset form
  const resetForm = () => {
    setForm({
      home: "",
      away: "",
      date: "",
      time: "",
      venue: "",
      youtube: "",
      standard: "",
      vip: "",
    });
    setEditingId(null);
    setFormOpen(false);
  };

  // Handle edit
  const handleEdit = (game) => {
    setEditingId(game.id);
    setForm({
      home: game.home || "",
      away: game.away || "",
      date: game.date || "",
      time: game.time || "",
      venue: game.venue || "",
      youtube: game.youtube || "",
      standard: game.standard || "",
      vip: game.vip || "",
    });
    setFormOpen(true);
  };

  const handleAdd = () => {
    if (!form.home || !form.away || !form.date) return;
    
    if (!registeredTeamNames.includes(form.home) || !registeredTeamNames.includes(form.away)) {
      alert("Both teams must be registered in Teams Management first!");
      return;
    }
    
    if (form.home === form.away) {
      alert("Home and away teams cannot be the same!");
      return;
    }
    
    if (editingId) {
      // Update existing game
      updateGame(editingId, form);
    } else {
      // Add new game
      addGame(form);
    }
    
    resetForm();
  };

  const isTeamRegistered = (teamName) => {
    return registeredTeamNames.includes(teamName);
  };

  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div>
          <h3 className="font-semibold">Games & Schedule</h3>
          <p className="text-white/40 text-sm">
            Set date, venue, livestream link, and ticket pricing per match.
            <span className="block text-xs text-[#E8A93D]/70 mt-1">
              Only teams registered in Teams Management can be scheduled.
            </span>
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A] whitespace-nowrap hover:bg-[#f0ba5f] transition-colors"
          disabled={teams.length < 2}
          title={teams.length < 2 ? "Need at least 2 registered teams to schedule a game" : ""}
        >
          <Plus size={15} /> {editingId ? "Update Game" : "Schedule Game"}
        </button>
      </div>

      {teams.length < 2 && (
        <div className="p-4 bg-[#C8102E]/5 border-b border-[#C8102E]/10">
          <p className="text-sm text-[#C8102E]/80 flex items-center gap-2">
            <Shield size={16} />
            You need at least 2 registered teams to schedule a game. 
            <button 
              onClick={() => {
                const teamsTab = document.querySelector('[data-section="teams"]');
                if (teamsTab) teamsTab.click();
              }}
              className="text-[#E8A93D] hover:underline cursor-pointer"
            >
              Add teams now
            </button>
          </p>
        </div>
      )}

      {formOpen && (
        <div className="p-5 border-b border-white/5 bg-white/[0.02] space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <select
              value={form.home}
              onChange={(e) => setForm({ ...form, home: e.target.value })}
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
            >
              <option value="">Home team</option>
              {registeredTeamNames.map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
            <select
              value={form.away}
              onChange={(e) => setForm({ ...form, away: e.target.value })}
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
            >
              <option value="">Away team</option>
              {registeredTeamNames.map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
            />
            <input
              type="text"
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              placeholder="Venue"
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
            />
          </div>
          <input
            type="url"
            value={form.youtube}
            onChange={(e) => setForm({ ...form, youtube: e.target.value })}
            placeholder="YouTube livestream link (add closer to game day)"
            className="w-full bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="number"
              value={form.standard}
              onChange={(e) => setForm({ ...form, standard: e.target.value })}
              placeholder="Standard ticket price (XAF)"
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
            />
            <input
              type="number"
              value={form.vip}
              onChange={(e) => setForm({ ...form, vip: e.target.value })}
              placeholder="VIP ticket price (XAF)"
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
            />
          </div>
          
          {form.home && form.away && form.home === form.away && (
            <p className="text-xs text-[#C8102E]">⚠️ Home and away teams cannot be the same.</p>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              onClick={resetForm}
              className="text-sm font-medium px-4 py-2 rounded-lg text-white/50 hover:text-white/80"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!form.home || !form.away || !form.date || form.home === form.away}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                !form.home || !form.away || !form.date || form.home === form.away
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-[#2FA8A3] text-[#12181A] hover:bg-[#3fb8b3]"
              }`}
            >
              {editingId ? "Update Game" : "Save Game"}
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-white/5">
        {games.map((g) => {
          const homeRegistered = isTeamRegistered(g.home);
          const awayRegistered = isTeamRegistered(g.away);
          const hasUnregisteredTeam = !homeRegistered || !awayRegistered;
          
          return (
            <div key={g.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-['Bebas_Neue'] text-lg tracking-wide">
                      {g.away} @ {g.home}
                    </span>
                    <GameStatusPill status={g.status} />
                    {hasUnregisteredTeam && (
                      <span className="text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 rounded-full bg-[#C8102E]/15 text-[#C8102E]">
                        UNREGISTERED
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {g.date} {g.time && `· ${g.time}`}
                    </span>
                    {g.venue && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {g.venue}
                      </span>
                    )}
                    {g.youtube ? (
                      <span className="flex items-center gap-1 text-[#2FA8A3]">
                        <Link2 size={12} /> Livestream linked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-white/25">
                        <Link2 size={12} /> No livestream link yet
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs font-['JetBrains_Mono']">
                    <span className="text-white/50">Standard: {g.standard ? `${g.standard} XAF` : "—"}</span>
                    <span className="text-[#E8A93D]">VIP: {g.vip ? `${g.vip} XAF` : "—"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(g)}
                    className="p-2 rounded-lg text-white/40 hover:text-[#E8A93D] hover:bg-[#E8A93D]/10 transition-colors"
                    title="Edit Game"
                  >
                    <Pencil size={15} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${g.away} @ ${g.home}?`)) {
                        deleteGame(g.id);
                      }
                    }}
                    className="p-2 rounded-lg text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
                    title="Delete Game"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {games.length === 0 && (
          <div className="px-5 py-10 text-center text-white/35 text-sm">
            {teams.length < 2 
              ? "Register at least 2 teams in Teams Management to schedule games."
              : "No games scheduled yet. Click 'Schedule Game' to add one."}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// SCORES PANEL
// ============================================
function ScoresPanel() {
  const { games, updateGameScore, updateGameStatus, updateStandings } = useAppContext();
  const [selectedId, setSelectedId] = useState(null);
  const [currentQuarter, setCurrentQuarter] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const selected = games.find((g) => g.id === selectedId);

  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [games]);

  const getQuarterScores = (game) => {
    if (!game) return { home: [0, 0, 0, 0], away: [0, 0, 0, 0] };
    if (game.quarters) {
      return game.quarters;
    }
    return { home: [0, 0, 0, 0], away: [0, 0, 0, 0] };
  };

  const getTotalScore = (game, side) => {
    const quarters = getQuarterScores(game);
    return quarters[side].reduce((sum, val) => sum + (val || 0), 0);
  };

  const startGame = (id) => {
    const game = games.find(g => g.id === id);
    if (game && !game.quarters) {
      updateGameScore(id, 0, 0, { home: [0, 0, 0, 0], away: [0, 0, 0, 0] });
    }
    updateGameStatus(id, "LIVE");
    setCurrentQuarter(1);
    setSelectedId(id);
    setRefreshKey(prev => prev + 1);
  };

  const addPoints = (side, pts) => {
    if (!selected) return;
    
    const quarters = getQuarterScores(selected);
    const newQuarters = { 
      home: [...quarters.home], 
      away: [...quarters.away] 
    };
    
    const quarterIndex = currentQuarter - 1;
    newQuarters[side][quarterIndex] = (newQuarters[side][quarterIndex] || 0) + pts;
    
    const homeTotal = newQuarters.home.reduce((sum, val) => sum + (val || 0), 0);
    const awayTotal = newQuarters.away.reduce((sum, val) => sum + (val || 0), 0);
    
    updateGameScore(selected.id, homeTotal, awayTotal, newQuarters);
    setRefreshKey(prev => prev + 1);
  };

  const undoPoints = (side, pts) => {
    if (!selected) return;
    
    const quarters = getQuarterScores(selected);
    const newQuarters = { 
      home: [...quarters.home], 
      away: [...quarters.away] 
    };
    const quarterIndex = currentQuarter - 1;
    
    newQuarters[side][quarterIndex] = Math.max(0, (newQuarters[side][quarterIndex] || 0) - pts);
    
    const homeTotal = newQuarters.home.reduce((sum, val) => sum + (val || 0), 0);
    const awayTotal = newQuarters.away.reduce((sum, val) => sum + (val || 0), 0);
    
    updateGameScore(selected.id, homeTotal, awayTotal, newQuarters);
    setRefreshKey(prev => prev + 1);
  };

  const nextQuarter = () => {
    if (currentQuarter < 4) {
      setCurrentQuarter(currentQuarter + 1);
    }
  };

  const endGame = () => {
    if (!selected) return;
    
    const quarters = getQuarterScores(selected);
    const homeTotal = quarters.home.reduce((sum, val) => sum + (val || 0), 0);
    const awayTotal = quarters.away.reduce((sum, val) => sum + (val || 0), 0);
    
    updateGameStatus(selected.id, "FINAL");
    updateStandings(selected.home, selected.away, homeTotal, awayTotal);
    
    setSelectedId(null);
    setCurrentQuarter(1);
    setRefreshKey(prev => prev + 1);
  };

  const notFinal = games.filter((g) => g.status !== "FINAL");
  const finished = games.filter((g) => g.status === "FINAL");

  if (selected) {
    const quarters = getQuarterScores(selected);
    const homeTotal = quarters.home.reduce((sum, val) => sum + (val || 0), 0);
    const awayTotal = quarters.away.reduce((sum, val) => sum + (val || 0), 0);
    const isLastQuarter = currentQuarter === 4;

    return (
      <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Radio size={15} className="text-[#C8102E] animate-pulse" />
              <span className="text-sm font-['JetBrains_Mono'] text-[#C8102E] font-semibold">LIVE</span>
            </div>
            <span className="text-sm text-white/40">
              Q{currentQuarter} · {selected.home} vs {selected.away}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {!isLastQuarter && (
              <button
                onClick={nextQuarter}
                className="text-sm font-medium px-4 py-1.5 rounded-lg bg-[#E8A93D] text-[#12181A] hover:bg-[#f0ba5f] transition-colors"
              >
                Next Quarter →
              </button>
            )}
            <button
              onClick={() => {
                setSelectedId(null);
                setCurrentQuarter(1);
              }}
              className="text-sm text-white/40 hover:text-white/70"
            >
              Back to list
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="text-left text-xs text-white/40 font-['JetBrains_Mono']">Team</div>
            <div className="text-center text-xs text-white/40 font-['JetBrains_Mono']">Q1</div>
            <div className="text-center text-xs text-white/40 font-['JetBrains_Mono']">Q2</div>
            <div className="text-center text-xs text-white/40 font-['JetBrains_Mono']">Q3</div>
            <div className="text-center text-xs text-white/40 font-['JetBrains_Mono']">Q4</div>
            <div className="text-center text-xs text-white/40 font-['JetBrains_Mono'] font-bold">TOTAL</div>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-3 items-center">
            <div className="text-left font-medium text-white/80">{selected.home}</div>
            {[0, 1, 2, 3].map((q) => (
              <div key={`home-q${q}`} className="text-center font-['JetBrains_Mono'] text-lg text-white/70">
                {quarters.home[q] || 0}
              </div>
            ))}
            <div className="text-center font-['JetBrains_Mono'] text-2xl font-bold text-[#E8A93D]">
              {homeTotal}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-6 items-center">
            <div className="text-left font-medium text-white/80">{selected.away}</div>
            {[0, 1, 2, 3].map((q) => (
              <div key={`away-q${q}`} className="text-center font-['JetBrains_Mono'] text-lg text-white/70">
                {quarters.away[q] || 0}
              </div>
            ))}
            <div className="text-center font-['JetBrains_Mono'] text-2xl font-bold text-[#E8A93D]">
              {awayTotal}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-white/5">
            {[
              { side: "home", label: selected.home },
              { side: "away", label: selected.away },
            ].map((t) => (
              <div key={t.side} className="text-center">
                <p className="text-sm font-medium mb-3">{t.label}</p>
                <div className="flex justify-center gap-2 mb-3">
                  {[1, 2, 3].map((pts) => (
                    <button
                      key={pts}
                      onClick={() => addPoints(t.side, pts)}
                      className="w-12 h-12 rounded-lg bg-[#E8A93D] text-[#12181A] font-semibold hover:bg-[#f0ba5f] transition-colors text-lg"
                    >
                      +{pts}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3].map((pts) => (
                    <button
                      key={pts}
                      onClick={() => undoPoints(t.side, pts)}
                      className="w-9 h-9 rounded-lg bg-white/[0.04] text-white/40 hover:text-white/70 transition-colors flex items-center justify-center"
                      title={`Undo ${pts}pt`}
                    >
                      <Minus size={13} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs text-white/40">
              Currently scoring: <span className="text-[#E8A93D] font-semibold">Q{currentQuarter}</span>
              {isLastQuarter && (
                <span className="ml-2 text-[#C8102E]">· Final Quarter</span>
              )}
            </span>
          </div>
        </div>

        <div className="p-5 border-t border-white/5 flex justify-center gap-4">
          <button
            onClick={endGame}
            className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-[#C8102E] text-white hover:bg-[#e21536] transition-colors"
          >
            <CheckCircle2 size={16} /> End Game — Finalize Score
          </button>
          <button
            onClick={() => {
              const resetQuarters = { home: [0, 0, 0, 0], away: [0, 0, 0, 0] };
              updateGameScore(selected.id, 0, 0, resetQuarters);
              setCurrentQuarter(1);
              setRefreshKey(prev => prev + 1);
            }}
            className="flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-white/70 hover:border-white/20 transition-colors"
          >
            Reset Scores
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h3 className="font-semibold">Score Entry</h3>
        <p className="text-white/40 text-sm">Pick a game to start live scoring with quarter-by-quarter tracking.</p>
      </div>
      
      <div className="divide-y divide-white/5">
        {notFinal.map((g) => {
          const quarters = g.quarters || { home: [0, 0, 0, 0], away: [0, 0, 0, 0] };
          const homeTotal = quarters.home.reduce((sum, val) => sum + (val || 0), 0);
          const awayTotal = quarters.away.reduce((sum, val) => sum + (val || 0), 0);
          
          return (
            <div key={g.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-['Bebas_Neue'] text-lg tracking-wide">
                  {g.away} @ {g.home}
                </p>
                <p className="text-xs text-white/40">{g.date}</p>
                {g.status === "LIVE" && (
                  <>
                    <div className="flex items-center gap-3 mt-1 text-sm text-white/60">
                      <span className="font-['JetBrains_Mono'] text-[#E8A93D]">{g.home}: {homeTotal}</span>
                      <span className="text-white/30">vs</span>
                      <span className="font-['JetBrains_Mono'] text-[#E8A93D]">{g.away}: {awayTotal}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-white/30">
                      <span>Q1: {quarters.home[0] || 0}-{quarters.away[0] || 0}</span>
                      <span>Q2: {quarters.home[1] || 0}-{quarters.away[1] || 0}</span>
                      <span>Q3: {quarters.home[2] || 0}-{quarters.away[2] || 0}</span>
                      <span>Q4: {quarters.home[3] || 0}-{quarters.away[3] || 0}</span>
                    </div>
                  </>
                )}
              </div>
              {g.status === "LIVE" ? (
                <button
                  onClick={() => {
                    setSelectedId(g.id);
                    const q = g.quarters || { home: [0, 0, 0, 0], away: [0, 0, 0, 0] };
                    let activeQuarter = 1;
                    for (let i = 3; i >= 0; i--) {
                      if ((q.home[i] || 0) > 0 || (q.away[i] || 0) > 0) {
                        activeQuarter = i + 1;
                        break;
                      }
                    }
                    setCurrentQuarter(activeQuarter);
                  }}
                  className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[#C8102E]/15 text-[#C8102E]"
                >
                  <Radio size={13} /> Resume — {homeTotal}-{awayTotal}
                </button>
              ) : (
                <button
                  onClick={() => startGame(g.id)}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A] hover:bg-[#f0ba5f] transition-colors"
                >
                  Start Live Scoring
                </button>
              )}
            </div>
          );
        })}
      </div>

      {finished.length > 0 && (
        <>
          <div className="px-5 py-3 border-t border-b border-white/5 bg-white/[0.02]">
            <p className="text-xs text-white/40 font-['JetBrains_Mono'] uppercase tracking-wide">Final scores</p>
          </div>
          <div className="divide-y divide-white/5">
            {finished.map((g) => {
              const quarters = g.quarters || { home: [0, 0, 0, 0], away: [0, 0, 0, 0] };
              const homeTotal = quarters.home.reduce((sum, val) => sum + (val || 0), 0);
              const awayTotal = quarters.away.reduce((sum, val) => sum + (val || 0), 0);
              
              return (
                <div key={g.id} className="px-5 py-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/70">
                        {g.away} @ {g.home}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-white/30">
                        <span>Q1: {quarters.home[0] || 0}-{quarters.away[0] || 0}</span>
                        <span>Q2: {quarters.home[1] || 0}-{quarters.away[1] || 0}</span>
                        <span>Q3: {quarters.home[2] || 0}-{quarters.away[2] || 0}</span>
                        <span>Q4: {quarters.home[3] || 0}-{quarters.away[3] || 0}</span>
                      </div>
                    </div>
                    <p className="font-['JetBrains_Mono'] text-lg text-[#E8A93D]">
                      {homeTotal}–{awayTotal}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {notFinal.length === 0 && finished.length === 0 && (
        <div className="px-5 py-12 text-center text-white/35">
          <p>No games available for scoring.</p>
          <p className="text-xs mt-1">Schedule a game first in the Games & Schedule section.</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// ANNOUNCEMENTS PANEL
// ============================================
function AnnouncementsPanel() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useAppContext();
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ text: "", expiry: "" });

  const handleAdd = () => {
    if (!form.text.trim()) return;
    addAnnouncement(form);
    setForm({ text: "", expiry: "" });
    setFormOpen(false);
  };

  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div>
          <h3 className="font-semibold">Announcements</h3>
          <p className="text-white/40 text-sm">Short messages scrolling in the ticker on the public homepage.</p>
        </div>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A] whitespace-nowrap"
        >
          <Plus size={15} /> Add Announcement
        </button>
      </div>

      {formOpen && (
        <div className="p-5 border-b border-white/5 bg-white/[0.02] space-y-3">
          <input
            type="text"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Short announcement text"
            maxLength={100}
            className="w-full bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
          />
          <div className="flex items-center gap-3">
            <label className="text-xs text-white/40 shrink-0">Remove after (optional)</label>
            <input
              type="date"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setFormOpen(false)} className="text-sm font-medium px-4 py-2 rounded-lg text-white/50 hover:text-white/80">
              Cancel
            </button>
            <button onClick={handleAdd} className="text-sm font-medium px-4 py-2 rounded-lg bg-[#2FA8A3] text-[#12181A]">
              Add to Ticker
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-white/5">
        {announcements.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-5 py-3.5 gap-4">
            <div className="min-w-0">
              <p className="text-sm text-white/85 truncate">{item.text}</p>
              {item.expiry && <p className="text-xs text-white/35 mt-0.5">Removes after {item.expiry}</p>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => deleteAnnouncement(item.id)}
                className="p-1.5 rounded text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="px-5 py-10 text-center text-white/35 text-sm">
            No announcements — the ticker will be empty on the public site.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// NEWS PANEL
// ============================================
function NewsStatusPill({ status }) {
  const map = {
    PUBLISHED: { color: "#3FA66E", bg: "rgba(63,166,110,0.12)" },
    DRAFT: { color: "#8B9A94", bg: "rgba(139,154,148,0.12)" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] font-medium px-2.5 py-1 rounded-full"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {status}
    </span>
  );
}

function NewsPanel() {
  const { news, addNews, deleteNews, toggleNewsStatus, toggleFeatured, updateNewsCategory, updateNews } = useAppContext();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ tag: "", title: "", excerpt: "", category: "League", image: null });
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ["League", "Teams", "Media", "Community", "Infrastructure", "Partnerships"];

  const handleEdit = (article) => {
    setEditingId(article.id);
    setForm({
      tag: article.tag || "",
      title: article.title || "",
      excerpt: article.excerpt || "",
      category: article.category || "League",
      image: article.image || null,
    });
    setImagePreview(article.image || null);
    setFormOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
  };

  const handleAdd = (publish) => {
    if (!form.title.trim()) return;
    
    const newsData = {
      tag: form.tag,
      title: form.title,
      excerpt: form.excerpt,
      category: form.category,
      image: form.image,
      status: publish ? "PUBLISHED" : "DRAFT",
      featured: false,
    };
    
    if (editingId) {
      updateNews(editingId, newsData);
    } else {
      addNews(newsData);
    }
    
    setForm({ tag: "", title: "", excerpt: "", category: "League", image: null });
    setImagePreview(null);
    setFormOpen(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm({ tag: "", title: "", excerpt: "", category: "League", image: null });
    setImagePreview(null);
  };

  const publishedNews = news.filter(n => n.status === "PUBLISHED");
  const draftNews = news.filter(n => n.status === "DRAFT");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">News Management</h3>
          <p className="text-white/40 text-sm">
            Write, publish, and manage articles. {publishedNews.length} published, {draftNews.length} drafts.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setForm({ tag: "", title: "", excerpt: "", category: "League", image: null });
            setImagePreview(null);
            setFormOpen(true);
          }}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A] whitespace-nowrap hover:bg-[#f0ba5f] transition-colors"
        >
          <Plus size={15} /> Write Article
        </button>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1A2124] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-[#1A2124] z-10 flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-semibold">
                {editingId ? "Edit Article" : "Write New Article"}
              </h3>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} className="text-white/60" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value.toUpperCase() })}
                  placeholder="Tag (e.g. TEAMS)"
                  className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Article title *"
                className="w-full bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
              />
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Article content / excerpt"
                rows={6}
                className="w-full bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40 resize-none"
              />
              
              <div className="space-y-2">
                <label className="text-sm text-white/60">Article Image (optional)</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 rounded-xl border-2 border-dashed border-white/20 bg-[#0D1214] flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Article" className="w-full h-full object-cover" />
                    ) : (
                      <Image size={32} className="text-white/20" />
                    )}
                  </div>
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0D1214] border border-white/10 hover:border-[#E8A93D]/40 transition-colors text-sm text-white/70">
                      <Upload size={16} />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-white/30 mt-1">PNG, JPG, SVG (max 2MB)</p>
                    {imagePreview && (
                      <button
                        onClick={removeImage}
                        className="text-xs text-[#C8102E] hover:underline mt-1 block"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                <button
                  onClick={handleCancel}
                  className="text-sm font-medium px-4 py-2 rounded-lg text-white/50 hover:text-white/80"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAdd(false)}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-white/[0.06] text-white/70"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleAdd(true)}
                  className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-[#2FA8A3] text-[#12181A]"
                >
                  <Send size={13} /> Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Published Articles</h4>
            <span className="text-xs text-white/40">{publishedNews.length} articles</span>
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {publishedNews.map((a) => (
            <NewsItem 
              key={a.id} 
              article={a} 
              onEdit={() => handleEdit(a)}
              onDelete={() => deleteNews(a.id)}
              onToggleStatus={() => toggleNewsStatus(a.id)}
              onToggleFeatured={() => toggleFeatured(a.id)}
              onCategoryChange={(cat) => updateNewsCategory(a.id, cat)}
              categories={categories}
            />
          ))}
          {publishedNews.length === 0 && (
            <div className="px-5 py-8 text-center text-white/35 text-sm">
              No published articles yet.
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Drafts</h4>
            <span className="text-xs text-white/40">{draftNews.length} drafts</span>
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {draftNews.map((a) => (
            <NewsItem 
              key={a.id} 
              article={a} 
              onEdit={() => handleEdit(a)}
              onDelete={() => deleteNews(a.id)}
              onToggleStatus={() => toggleNewsStatus(a.id)}
              onToggleFeatured={() => toggleFeatured(a.id)}
              onCategoryChange={(cat) => updateNewsCategory(a.id, cat)}
              categories={categories}
            />
          ))}
          {draftNews.length === 0 && (
            <div className="px-5 py-8 text-center text-white/35 text-sm">
              No drafts saved.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// NEWS ITEM COMPONENT
// ============================================
function NewsItem({ article, onEdit, onDelete, onToggleStatus, onToggleFeatured, onCategoryChange, categories }) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  return (
    <div className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {article.image && (
            <span className="text-[10px] font-['JetBrains_Mono'] px-1.5 py-0.5 rounded bg-[#2FA8A3]/20 text-[#2FA8A3]">
              📷 Image
            </span>
          )}
          {article.tag && (
            <span className="text-xs font-['JetBrains_Mono'] text-[#2FA8A3]">{article.tag}</span>
          )}
          <NewsStatusPill status={article.status} />
          {article.featured && (
            <span className="text-[10px] font-['JetBrains_Mono'] px-2 py-0.5 rounded-full bg-[#E8A93D]/20 text-[#E8A93D]">
              ★ Featured
            </span>
          )}
          <span className="text-[10px] text-white/30">·</span>
          <div className="relative">
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="text-[10px] text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
            >
              <Tag size={10} /> {article.category || "Uncategorized"}
            </button>
            {showCategoryMenu && (
              <div className="absolute top-full left-0 mt-1 bg-[#0D1214] border border-white/10 rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      onCategoryChange(cat);
                      setShowCategoryMenu(false);
                    }}
                    className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-white/5 transition-colors ${
                      article.category === cat ? 'text-[#E8A93D]' : 'text-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="font-medium text-sm mb-1">{article.title}</p>
        {article.excerpt && (
          <p className="text-xs text-white/40 line-clamp-1">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-4 mt-1 text-xs text-white/30">
          <span>{article.date || "Coming soon"}</span>
          {article.likes !== undefined && (
            <span className="flex items-center gap-1">
              <ThumbsUp size={10} /> {article.likes || 0}
            </span>
          )}
          {article.dislikes !== undefined && (
            <span className="flex items-center gap-1">
              <ThumbsUp size={10} className="rotate-180" /> {article.dislikes || 0}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
        <button
          onClick={onToggleFeatured}
          className={`text-xs font-medium px-2 py-1 rounded-lg transition-colors ${
            article.featured 
              ? "bg-[#E8A93D]/20 text-[#E8A93D]" 
              : "bg-white/[0.04] text-white/50 hover:text-white/70"
          }`}
        >
          {article.featured ? "★ Featured" : "Feature"}
        </button>
        <button
          onClick={onToggleStatus}
          className={`text-xs font-medium px-2 py-1 rounded-lg transition-colors ${
            article.status === "PUBLISHED" 
              ? "bg-white/[0.04] text-white/60 hover:text-white/85" 
              : "bg-[#2FA8A3]/20 text-[#2FA8A3]"
          }`}
        >
          {article.status === "PUBLISHED" ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg text-white/40 hover:text-[#E8A93D] hover:bg-[#E8A93D]/10 transition-colors"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ============================================
// HIGHLIGHTS PANEL
// ============================================
const finishedGames = ["Manjo vs. Yabassi — Jul 19, 2026", "Douala vs. Edéa — Aug 2, 2026", "Nkongsamba vs. Loum — Aug 9, 2026"];

function HighlightsPanel() {
  const { highlights, addHighlight, deleteHighlight } = useAppContext();
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ title: "", game: "", youtube: "" });

  const handleAdd = () => {
    if (!form.title.trim() || !form.youtube.trim()) return;
    addHighlight(form);
    setForm({ title: "", game: "", youtube: "" });
    setFormOpen(false);
  };

  return (
    <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-white/5">
        <div>
          <h3 className="font-semibold">Video Highlights</h3>
          <p className="text-white/40 text-sm">Add YouTube clips and tag each one to the game it's from.</p>
        </div>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#E8A93D] text-[#12181A] whitespace-nowrap"
        >
          <Plus size={15} /> Add Clip
        </button>
      </div>

      {formOpen && (
        <div className="p-5 border-b border-white/5 bg-white/[0.02] space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Clip title (e.g. Fourth Quarter Comeback)"
            className="w-full bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <select
              value={form.game}
              onChange={(e) => setForm({ ...form, game: e.target.value })}
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 focus:outline-none focus:border-[#E8A93D]/40"
            >
              <option value="">Tag to a game</option>
              {finishedGames.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <input
              type="url"
              value={form.youtube}
              onChange={(e) => setForm({ ...form, youtube: e.target.value })}
              placeholder="YouTube link"
              className="bg-[#12181A] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/85 placeholder:text-white/25 focus:outline-none focus:border-[#E8A93D]/40"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setFormOpen(false)} className="text-sm font-medium px-4 py-2 rounded-lg text-white/50 hover:text-white/80">
              Cancel
            </button>
            <button onClick={handleAdd} className="text-sm font-medium px-4 py-2 rounded-lg bg-[#2FA8A3] text-[#12181A]">
              Add to Library
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-white/5">
        {highlights.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-16 h-11 rounded-md bg-[#16211A] border border-white/10 flex items-center justify-center shrink-0">
                <Video size={16} className="text-white/30" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{c.title}</p>
                <p className="text-xs text-white/40 truncate">{c.game || "Not tagged to a game"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="hidden sm:flex items-center gap-1 text-xs text-white/40 font-['JetBrains_Mono']">
                <Eye size={12} /> {c.views || 0}
              </span>
              <span className="hidden sm:flex items-center gap-1 text-xs text-white/40 font-['JetBrains_Mono']">
                <ThumbsUp size={12} /> {c.likes || 0}
              </span>
              <a href={c.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/40 hover:text-[#2FA8A3] hover:bg-[#2FA8A3]/10 transition-colors">
                <ExternalLink size={15} />
              </a>
              <button
                onClick={() => deleteHighlight(c.id)}
                className="p-2 rounded-lg text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
        {highlights.length === 0 && (
          <div className="px-5 py-10 text-center text-white/35 text-sm">No highlight clips added yet.</div>
        )}
      </div>
    </div>
  );
}

// ============================================
// DONATIONS PANEL
// ============================================
function DonationStatusPill({ status }) {
  const map = {
    CONFIRMED: { color: "#3FA66E", bg: "rgba(63,166,110,0.12)" },
    PENDING: { color: "#E8A93D", bg: "rgba(232,169,61,0.12)" },
    FAILED: { color: "#C8102E", bg: "rgba(200,16,46,0.12)" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] font-medium px-2.5 py-1 rounded-full"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      {status}
    </span>
  );
}

function DonationsPanel() {
  const { donations } = useAppContext();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? donations : donations.filter((d) => d.status === filter.toUpperCase());

  const totalRaised = donations.filter((d) => d.status === "CONFIRMED").reduce((sum, d) => sum + d.amount, 0);
  const recurringCount = donations.filter((d) => d.recurring && d.status === "CONFIRMED").length;
  const avgDonation = Math.round(
    donations.filter((d) => d.status === "CONFIRMED").reduce((s, d) => s + d.amount, 0) /
      Math.max(1, donations.filter((d) => d.status === "CONFIRMED").length)
  );

  const categories = ["General Fund", "Equipment", "Travel & Logistics", "Youth Development"];
  const categoryTotals = categories.map((cat) => ({
    cat,
    total: donations.filter((d) => d.category === cat && d.status === "CONFIRMED").reduce((s, d) => s + d.amount, 0),
  }));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#1A2124] border border-white/5 rounded-xl p-5">
          <p className="text-white/45 text-xs mb-2">Total raised (confirmed)</p>
          <p className="font-['JetBrains_Mono'] text-xl font-semibold">{totalRaised.toLocaleString()} XAF</p>
        </div>
        <div className="bg-[#1A2124] border border-white/5 rounded-xl p-5">
          <p className="text-white/45 text-xs mb-2">Average donation</p>
          <p className="font-['JetBrains_Mono'] text-xl font-semibold">{avgDonation.toLocaleString()} XAF</p>
        </div>
        <div className="bg-[#1A2124] border border-white/5 rounded-xl p-5">
          <p className="text-white/45 text-xs mb-2 flex items-center gap-1"><Repeat size={12} /> Recurring donors</p>
          <p className="font-['JetBrains_Mono'] text-xl font-semibold">{recurringCount}</p>
        </div>
      </div>

      <div className="bg-[#1A2124] border border-white/5 rounded-xl p-5">
        <p className="text-xs text-white/40 font-['JetBrains_Mono'] uppercase tracking-wide mb-3">By category</p>
        <div className="space-y-2">
          {categoryTotals.map((c) => (
            <div key={c.cat} className="flex items-center justify-between text-sm">
              <span className="text-white/70 flex items-center gap-1.5"><Tag size={12} className="text-[#2FA8A3]" /> {c.cat}</span>
              <span className="font-['JetBrains_Mono'] text-white/60">{c.total.toLocaleString()} XAF</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/5 flex-wrap gap-3">
          <div className="flex gap-1.5">
            {["all", "confirmed", "pending", "failed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-colors ${
                  filter === f ? "bg-[#E8A93D] text-[#12181A]" : "bg-white/[0.04] text-white/50 hover:text-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-[#2FA8A3] text-[#12181A]">
            <Download size={15} /> Export to Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/40 font-['JetBrains_Mono'] text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Donor</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Reference</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-white/5">
                  <td className="px-5 py-3">
                    {d.name} {d.recurring && <span className="text-[10px] text-[#2FA8A3] ml-1">(recurring)</span>}
                  </td>
                  <td className="px-5 py-3 font-['JetBrains_Mono'] text-[#E8A93D]">{d.amount.toLocaleString()} XAF</td>
                  <td className="px-5 py-3 text-white/60">{d.category}</td>
                  <td className="px-5 py-3 text-white/60">{d.method}</td>
                  <td className="px-5 py-3 font-['JetBrains_Mono'] text-white/40">{d.ref}</td>
                  <td className="px-5 py-3"><DonationStatusPill status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/25 text-xs px-5 py-4 border-t border-white/5">
          Full export includes donor email, purchase date, and payment gateway transaction ID.
        </p>
      </div>
    </div>
  );
}

// ============================================
// SUPPORT TICKETS PANEL
// ============================================
function SupportTicketsPanel() {
  const { supportTickets, updateSupportTicketStatus, deleteSupportTicket } = useAppContext();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" 
    ? supportTickets 
    : supportTickets.filter(t => t.status === filter.toUpperCase());

  const getTypeFromRef = (ref) => {
    if (!ref) return 'Unknown';
    if (ref.startsWith('LEBL')) return 'Ticket';
    if (ref.startsWith('LBL-D')) return 'Donation';
    return 'Unknown';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-500';
      case 'RESOLVED': return 'bg-green-500/20 text-green-500';
      case 'IN_PROGRESS': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Support Tickets</h2>
          <p className="text-white/45 text-sm">Review and respond to user support requests</p>
        </div>
        <div className="flex gap-1.5">
          {["all", "pending", "in_progress", "resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-colors ${
                filter === f ? "bg-[#E8A93D] text-[#12181A]" : "bg-white/[0.04] text-white/50 hover:text-white/80"
              }`}
            >
              {f === 'all' ? 'All' : f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#1A2124] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/40 font-['JetBrains_Mono'] text-xs uppercase tracking-wide border-b border-white/5">
                <th className="px-5 py-3 font-medium">Ref</th>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Transaction Ref</th>
                <th className="px-5 py-3 font-medium">Message</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 font-['JetBrains_Mono'] text-xs text-white/50">
                    {ticket.ticketRef || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-white/80">{ticket.name}</p>
                      <p className="text-xs text-white/40">{ticket.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      getTypeFromRef(ticket.reference) === 'Ticket' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {getTypeFromRef(ticket.reference)}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-['JetBrains_Mono'] text-xs text-white/60">
                    {ticket.reference || '—'}
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-white/70 max-w-xs truncate" title={ticket.message}>
                      {ticket.message}
                    </p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-['JetBrains_Mono'] font-medium px-2.5 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status || 'PENDING'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {ticket.status !== 'RESOLVED' && (
                        <button
                          onClick={() => updateSupportTicketStatus(ticket.id, 'IN_PROGRESS')}
                          className="p-1.5 rounded text-white/40 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                          title="Mark In Progress"
                        >
                          <Clock size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => updateSupportTicketStatus(
                          ticket.id, 
                          ticket.status === 'RESOLVED' ? 'PENDING' : 'RESOLVED'
                        )}
                        className="p-1.5 rounded text-white/40 hover:text-green-400 hover:bg-green-400/10 transition-colors"
                        title={ticket.status === 'RESOLVED' ? 'Reopen' : 'Mark Resolved'}
                      >
                        <CheckCircle2 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this support ticket?')) {
                            deleteSupportTicket(ticket.id);
                          }
                        }}
                        className="p-1.5 rounded text-white/40 hover:text-[#C8102E] hover:bg-[#C8102E]/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-white/35 text-sm">
                    No support tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-white/25 text-xs px-5 py-4 border-t border-white/5">
          Support tickets are created when users submit a request through the public Support page.
        </p>
      </div>
    </div>
  );
}

// ============================================
// ADMIN LOGIN GATE
// ============================================
function AdminLogin() {
  const { login, loggingIn, authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      // authError is already surfaced from context
    }
  };

  return (
    <div className="min-h-screen bg-[#12181A] text-[#EDEFEE] font-['Inter'] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <div className="w-full max-w-sm bg-[#0D1214] border border-white/5 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8A93D] to-[#C8102E] flex items-center justify-center font-['Bebas_Neue'] text-[#12181A] text-sm">
            L
          </div>
          <span className="font-semibold text-sm tracking-wide text-white/90">LBL Admin</span>
        </div>
        <h1 className="font-['Bebas_Neue'] text-2xl tracking-wide mb-1">Sign in</h1>
        <p className="text-sm text-white/45 mb-6">Restricted to league administrators.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#E8A93D]/50"
              placeholder="admin@lbl.com"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#E8A93D]/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {authError && (
            <p className="text-xs text-[#C8102E] bg-[#C8102E]/10 border border-[#C8102E]/20 rounded-lg px-3 py-2">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-lg bg-[#E8A93D] text-[#12181A] font-semibold text-sm hover:bg-[#f0b955] transition-colors disabled:opacity-60"
          >
            {loggingIn ? <Loader2 size={16} className="animate-spin" /> : null}
            {loggingIn ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// MAIN ADMIN DASHBOARD
// ============================================
export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboardContent />;
}

function AdminDashboardContent() {
  const [active, setActive] = useState("overview");
  const {
    teams,
    games,
    donations,
    tickets,
    standings,
    news,
    supportTickets,
    resetSeason,
  } = useAppContext();
  const { logout } = useAuth();
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const activeLabel = navSections.find((s) => s.id === active)?.label;

  const pendingReports = supportTickets.filter((t) => t.status === "PENDING");

  const totalDonations = donations.filter(d => d.status === "CONFIRMED").reduce((sum, d) => sum + d.amount, 0);
  const totalTickets = tickets.length;
  const upcomingGames = games.filter(g => g.status === "UPCOMING").length;
  const totalTeams = teams.length;

  const statCards = [
    { label: "Teams", value: totalTeams, delta: "founding clubs", up: null },
    { label: "Donations (total)", value: `${totalDonations.toLocaleString()} XAF`, delta: "+12%", up: true },
    { label: "Ticket sales", value: `${totalTickets} tickets`, delta: "+8%", up: true },
    { label: "Upcoming games", value: `${upcomingGames}`, delta: `next: ${games.find(g => g.status === "UPCOMING")?.date || "TBD"}`, up: null },
  ];

  const handleResetSeason = async () => {
    if (resetConfirmText !== "RESET SEASON") {
      alert('Please type "RESET SEASON" to confirm');
      return;
    }

    setResetLoading(true);

    try {
      await resetSeason();
      setShowResetModal(false);
      setResetConfirmText("");
      alert('Season has been reset successfully! All game scores and standings have been cleared.');
    } catch (error) {
      console.error("Error resetting season:", error);
      alert('There was an error resetting the season. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12181A] text-[#EDEFEE] font-['Inter'] flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
      `}</style>

      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#0D1214] border-r border-white/5 flex flex-col">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-white/5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E8A93D] to-[#C8102E] flex items-center justify-center font-['Bebas_Neue'] text-[#12181A] text-xs">
            L
          </div>
          <span className="font-semibold text-sm tracking-wide text-white/90">LBL Admin</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {navSections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#E8A93D]/10 text-[#E8A93D] font-medium"
                    : "text-white/55 hover:bg-white/5 hover:text-white/85"
                }`}
              >
                <Icon size={17} />
                {s.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/45 hover:bg-white/5 hover:text-white/70 transition-colors"
          >
            <LogOut size={17} /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-white/80">{activeLabel}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative text-white/50 hover:text-white/80"
              >
                <Bell size={18} />
                {pendingReports.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[14px] h-3.5 px-0.5 rounded-full bg-[#C8102E] text-[9px] leading-3.5 font-semibold text-white text-center">
                    {pendingReports.length > 9 ? "9+" : pendingReports.length}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-[#1A2124] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-semibold">
                        {pendingReports.length > 0
                          ? `${pendingReports.length} new report${pendingReports.length > 1 ? "s" : ""}`
                          : "No new reports"}
                      </p>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                      {pendingReports.length === 0 ? (
                        <p className="px-4 py-6 text-center text-white/35 text-sm">
                          You're all caught up.
                        </p>
                      ) : (
                        pendingReports.slice(0, 8).map((t) => (
                          <button
                            key={t.id}
                            onClick={() => {
                              setActive("support");
                              setNotifOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-white/[0.03] transition-colors"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-sm text-white/85 truncate">{t.name || "Anonymous"}</span>
                              <span className="text-[10px] font-['JetBrains_Mono'] text-white/30 shrink-0">
                                {t.ticketRef}
                              </span>
                            </div>
                            <p className="text-xs text-white/45 truncate mt-0.5">{t.message}</p>
                          </button>
                        ))
                      )}
                    </div>
                    {pendingReports.length > 0 && (
                      <button
                        onClick={() => { setActive("support"); setNotifOpen(false); }}
                        className="w-full text-center text-xs font-medium text-[#E8A93D] px-4 py-2.5 border-t border-white/5 hover:bg-white/[0.03] transition-colors"
                      >
                        View all in Support & Issues
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#1A2124] border border-white/10 flex items-center justify-center text-xs font-medium">
              A
            </div>
          </div>
        </header>

        <main className="p-8 max-w-7xl">
          {active === "overview" && (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-semibold mb-1">Overview</h1>
                  <p className="text-white/45 text-sm">
                    A quick read on the league's activity across teams, games, and payments.
                  </p>
                </div>
                <button
                  onClick={() => setShowResetModal(true)}
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg bg-[#C8102E]/10 text-[#C8102E] hover:bg-[#C8102E]/20 transition-colors"
                >
                  <RotateCcw size={16} />
                  Reset Season
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((c) => (
                  <div key={c.label} className="bg-[#1A2124] border border-white/5 rounded-xl p-5">
                    <p className="text-white/45 text-xs mb-2">{c.label}</p>
                    <p className="font-['JetBrains_Mono'] text-xl font-semibold mb-1">{c.value}</p>
                    {c.up !== null ? (
                      <span
                        className={`inline-flex items-center gap-1 text-xs ${
                          c.up ? "text-[#3FA66E]" : "text-[#C8102E]"
                        }`}
                      >
                        {c.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                        {c.delta}
                      </span>
                    ) : (
                      <span className="text-xs text-white/40">{c.delta}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-[#1A2124] border border-white/5 rounded-xl p-6">
                <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => setActive("teams")}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm text-left"
                  >
                    <UserPlus size={16} className="text-[#E8A93D]" />
                    Add Team
                  </button>
                  <button
                    onClick={() => setActive("games")}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm text-left"
                  >
                    <Calendar size={16} className="text-[#E8A93D]" />
                    Schedule Game
                  </button>
                  <button
                    onClick={() => setActive("scores")}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm text-left"
                  >
                    <ClipboardEdit size={16} className="text-[#E8A93D]" />
                    Enter Score
                  </button>
                  <button
                    onClick={() => setActive("news")}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm text-left"
                  >
                    <Newspaper size={16} className="text-[#E8A93D]" />
                    Write News
                  </button>
                </div>
              </div>
            </>
          )}

          {active === "teams" && <TeamsPanel />}
          {active === "tickets" && <TicketSalesPreview />}
          {active === "comments" && <CommentsPanel />}
          {active === "admins" && <AdminsPanel />}
          {active === "games" && <GamesPanel />}
          {active === "scores" && <ScoresPanel />}
          {active === "news" && <NewsPanel />}
          {active === "announcements" && <AnnouncementsPanel />}
          {active === "highlights" && <HighlightsPanel />}
          {active === "donations" && <DonationsPanel />}
          {active === "support" && <SupportTicketsPanel />}

          {active !== "overview" &&
            active !== "teams" &&
            active !== "tickets" &&
            active !== "comments" &&
            active !== "admins" &&
            active !== "games" &&
            active !== "scores" &&
            active !== "news" &&
            active !== "announcements" &&
            active !== "highlights" &&
            active !== "donations" &&
            active !== "support" && (
            <>
              <h1 className="text-2xl font-semibold mb-1">{activeLabel}</h1>
              <p className="text-white/45 text-sm mb-8">This section manages {activeLabel.toLowerCase()}.</p>
              <PlaceholderPanel
                title={`${activeLabel} management`}
                description={`This is where admin will manage ${activeLabel.toLowerCase()}.`}
              />
            </>
          )}
        </main>
      </div>

      {/* Reset Season Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1A2124] rounded-2xl max-w-lg w-full border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C8102E]/20 flex items-center justify-center">
                <AlertTriangle size={20} className="text-[#C8102E]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Reset Season</h3>
                <p className="text-white/40 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-[#C8102E]/10 border border-[#C8102E]/20 rounded-lg p-4">
                <p className="text-sm text-[#C8102E]/80">
                  ⚠️ This will permanently reset:
                </p>
                <ul className="text-sm text-white/60 mt-2 space-y-1 list-disc list-inside">
                  <li>All game scores and results</li>
                  <li>All team standings (wins/losses)</li>
                </ul>
                <p className="text-sm text-white/60 mt-2">
                  Teams, rosters, news, donations, tickets, and highlights will be preserved.
                </p>
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">
                  Type <span className="text-[#C8102E] font-bold">RESET SEASON</span> to confirm
                </label>
                <input
                  type="text"
                  value={resetConfirmText}
                  onChange={(e) => setResetConfirmText(e.target.value.toUpperCase())}
                  placeholder="Type RESET SEASON here..."
                  className="w-full bg-[#0D1214] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/85 focus:outline-none focus:border-[#C8102E]/40"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-white/5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowResetModal(false);
                  setResetConfirmText("");
                }}
                className="px-4 py-2 rounded-lg text-white/60 hover:text-white/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetSeason}
                disabled={resetConfirmText !== "RESET SEASON" || resetLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  resetConfirmText === "RESET SEASON" && !resetLoading
                    ? "bg-[#C8102E] text-white hover:bg-[#e21536]"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                {resetLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <RotateCcw size={16} />
                    Reset Season
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}