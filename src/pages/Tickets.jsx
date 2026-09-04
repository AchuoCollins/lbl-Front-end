import React, { useState } from "react";
import { useAppContext } from '../context/AppContext';
import { Ticket, Calendar, MapPin, ShoppingBag, Users, CreditCard, CheckCircle, User } from "lucide-react";

export default function Tickets() {
  const { addTicket, games } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedGame, setSelectedGame] = useState(null);
  const [name, setName] = useState("");
  const [purchased, setPurchased] = useState(false);

  const availableGames = games.filter(g => g.status === "UPCOMING").map(g => ({
    id: g.id,
    home: g.home,
    away: g.away,
    date: g.date,
    venue: g.venue,
    price: parseInt(g.standard) || 15,
  }));

  const handlePurchase = () => {
    if (!selectedGame) return;
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    
    const totalAmount = selectedGame.price * quantity;
    const ticketType = quantity >= 3 ? "VIP" : "Regular";
    
    addTicket({
      name: name.trim(),
      game: `${selectedGame.away} @ ${selectedGame.home}`,
      type: ticketType,
      quantity: quantity,
      amount: totalAmount,
      status: "CONFIRMED",
    });
    
    setPurchased(true);
    setName("");
    setQuantity(1);
    setSelectedGame(null);
    setTimeout(() => setPurchased(false), 3000);
  };

  if (purchased) {
    return (
      <div className="bg-white rounded-2xl border border-lbl-orange/30 p-8 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-lbl-orange" />
        </div>
        <h3 className="font-bebas text-2xl tracking-wide mb-2">Tickets Purchased!</h3>
        <p className="text-lbl-soft">Your receipt has been sent to your notifications.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">TICKETS</h1>
      <p className="text-lbl-soft text-sm mb-8 max-w-xl">
        Secure your spot at the games. Support your local club and experience the action live.
      </p>

      {/* Ticket Info */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <Ticket size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-xl">General Admission</p>
          <p className="text-sm text-lbl-soft-light">From {selectedGame ? `${selectedGame.price} XAF` : "—"}</p>
        </div>
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <Users size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-xl">Group Discounts</p>
          <p className="text-sm text-lbl-soft-light">Available for 5+ tickets</p>
        </div>
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <CreditCard size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-xl">Secure Payment</p>
          <p className="text-sm text-lbl-soft-light">Multiple payment options</p>
        </div>
      </div>

      {/* Game Selection */}
      <h2 className="font-bebas text-2xl tracking-wide mb-4">SELECT A GAME</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {availableGames.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className={`text-left bg-white rounded-2xl border p-5 shadow-sm transition-all ${
              selectedGame?.id === game.id 
                ? "border-lbl-orange ring-2 ring-lbl-orange/20" 
                : "border-lbl-soft/10 hover:border-lbl-orange/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bebas text-lg tracking-wide">{game.away} @ {game.home}</span>
              <span className="text-sm font-bold text-lbl-orange">{game.price} XAF</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-lbl-soft-light">
              <span className="flex items-center gap-1"><Calendar size={14} /> {game.date}</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {game.venue}</span>
            </div>
          </button>
        ))}
        {availableGames.length === 0 && (
          <div className="col-span-2 bg-white rounded-2xl border border-lbl-soft/10 p-8 text-center text-lbl-soft-light">
            No upcoming games available for ticket purchase.
          </div>
        )}
      </div>

      {/* Purchase Section */}
      {selectedGame && (
        <div className="bg-white rounded-2xl border border-lbl-orange/30 p-6 shadow-sm">
          <h3 className="font-bebas text-xl tracking-wide text-lbl-orange mb-4">
            {selectedGame.away} @ {selectedGame.home}
          </h3>
          
          <div className="mb-4">
            <label className="text-sm text-lbl-soft-light mb-1 block">Your Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lbl-soft-light" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg pl-9 pr-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <label className="text-sm text-lbl-soft-light mb-1 block">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-lbl-soft/20 flex items-center justify-center hover:border-lbl-orange transition-colors"
                >
                  -
                </button>
                <span className="font-bebas text-xl w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-lbl-soft/20 flex items-center justify-center hover:border-lbl-orange transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-lbl-soft-light mb-1">Total</p>
              <p className="font-bebas text-2xl text-lbl-orange">{(selectedGame.price * quantity).toFixed(0)} XAF</p>
            </div>
            <button
              onClick={handlePurchase}
              disabled={!name.trim()}
              className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-full transition-colors ${
                name.trim()
                  ? "bg-lbl-orange text-lbl-cream hover:bg-lbl-orange-dark"
                  : "bg-lbl-soft/30 dark:bg-white/10 text-lbl-soft-light cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={18} /> Purchase Tickets
            </button>
          </div>
          <p className="text-xs text-lbl-soft-light mt-4">
            All ticket sales go directly to supporting the clubs and league operations.
          </p>
        </div>
      )}
    </div>
  );
}