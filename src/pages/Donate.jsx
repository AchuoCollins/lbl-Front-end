import React, { useState } from "react";
import { useAppContext } from '../context/AppContext';
import { Heart, Award, Users, Gift, ChevronRight, CheckCircle } from "lucide-react";

export default function Donate() {
  const { addDonation } = useAppContext();
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedTier, setSelectedTier] = useState("standard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const tiers = [
    { id: "standard", label: "Standard", min: 10, desc: "Help equip clubs with basic gear" },
    { id: "supporter", label: "Supporter", min: 50, desc: "Support venue rentals and operations" },
    { id: "champion", label: "Champion", min: 100, desc: "Be a founding contributor" },
  ];

  const presetAmounts = [10, 25, 50, 100, 250];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || amount <= 0) return;

    addDonation({
      name: name,
      amount: amount,
      category: selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1),
      method: "Card",
      message: message,
      status: "CONFIRMED",
    });
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setAmount(25);
    setCustomAmount("");
    setSelectedTier("standard");
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-lbl-orange/30 p-8 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-lbl-orange" />
        </div>
        <h3 className="font-bebas text-2xl tracking-wide mb-2">Thank You!</h3>
        <p className="text-lbl-soft">Your receipt has been sent to your notifications.</p>
      </div>
    );
  }

  // ============================================
  // MAIN FORM — THIS WAS MISSING!
  // ============================================
  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">SUPPORT THE LBL</h1>
      <p className="text-lbl-soft text-sm mb-8 max-w-xl">
        Your donation directly helps equip clubs, secure venues, and build the league's infrastructure.
      </p>

      {/* Impact Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <Award size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-2xl">7</p>
          <p className="text-sm text-lbl-soft-light">Clubs Supported</p>
        </div>
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <Users size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-2xl">100+</p>
          <p className="text-sm text-lbl-soft-light">Players Benefiting</p>
        </div>
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <Heart size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-2xl">0</p>
          <p className="text-sm text-lbl-soft-light">Community Events</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-lbl-soft/10 p-6 shadow-sm">
        {/* Amount Selection */}
        <div className="mb-6">
          <label className="font-bebas text-xl tracking-wide mb-3 block">CHOOSE AMOUNT</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => { setAmount(amt); setCustomAmount(""); }}
                className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium ${
                  amount === amt && !customAmount
                    ? "bg-lbl-orange text-lbl-cream border-lbl-orange"
                    : "border-lbl-soft/20 text-lbl-soft hover:border-lbl-orange"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lbl-soft-light">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setAmount(parseFloat(e.target.value) || 0); }}
              placeholder="Custom amount..."
              className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg pl-7 pr-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40"
              min="1"
            />
          </div>
        </div>

        {/* Tier Selection */}
        <div className="mb-6">
          <label className="font-bebas text-xl tracking-wide mb-3 block">SUPPORTER TIER</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedTier === tier.id
                    ? "border-lbl-orange ring-2 ring-lbl-orange/20 bg-lbl-orange/5"
                    : "border-lbl-soft/10 hover:border-lbl-orange/30"
                }`}
              >
                <h4 className="font-bebas text-lg">{tier.label}</h4>
                <p className="text-xs text-lbl-soft-light mt-1">{tier.desc}</p>
                <p className="text-sm font-bold text-lbl-orange mt-2">${tier.min}+</p>
              </button>
            ))}
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-lbl-soft-light mb-1 block">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg px-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40"
              required
            />
          </div>
          <div>
            <label className="text-sm text-lbl-soft-light mb-1 block">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg px-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40"
              required
            />
          </div>
        </div>

        {/* Message box */}
        <div className="mb-6">
          <label className="text-sm text-lbl-soft-light mb-1 block">Message / Dedication (Optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message to the league or a specific club..."
            rows="3"
            className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg px-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-lbl-orange text-lbl-cream font-semibold px-6 py-3 rounded-full hover:bg-lbl-orange-dark transition-colors"
        >
          <Heart size={18} /> Donate ${amount > 0 ? amount.toFixed(2) : "0.00"}
        </button>

        <p className="text-xs text-lbl-soft-light text-center mt-4">
          All donations go directly to the Littoral Basketball League and its founding clubs.
        </p>
      </form>
    </div>
  );
}