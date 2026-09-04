import React, { useState } from "react";
import { useAppContext } from '../context/AppContext';
import { 
  LifeBuoy, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Image, 
  User, 
  Hash, 
  ArrowRight,
  X
} from "lucide-react";

export default function Support() {
  const { addSupportTicket } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showImageGuide, setShowImageGuide] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !reference || !message) return;

    addSupportTicket({
      name,
      email,
      reference,
      message,
      status: "PENDING",
      date: new Date().toISOString().slice(0,10),
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setName("");
    setEmail("");
    setReference("");
    setMessage("");
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-lbl-orange/30 p-8 text-center shadow-sm">
        <div className="w-16 h-16 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-lbl-orange" />
        </div>
        <h3 className="font-bebas text-2xl tracking-wide mb-2">Support Request Sent!</h3>
        <p className="text-lbl-soft">
          An admin will review your issue and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">SUPPORT</h1>
      <p className="text-lbl-soft text-sm mb-8 max-w-xl">
        Having trouble with a payment? Contact our support team with your reference number.
      </p>

      {/* Quick Info Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <LifeBuoy size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-xl">Payment Issues</p>
          <p className="text-sm text-lbl-soft-light">We'll help resolve any transaction problems</p>
        </div>
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <Mail size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-xl">Response Time</p>
          <p className="text-sm text-lbl-soft-light">Usually within 24-48 hours</p>
        </div>
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
          <MessageSquare size={24} className="text-lbl-orange mx-auto mb-2" />
          <p className="font-bebas text-xl">Keep Your Ref</p>
          <p className="text-sm text-lbl-soft-light">Always include your reference number</p>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Support Form */}
        <form onSubmit={handleSubmit} className="md:col-span-3 bg-white rounded-2xl border border-lbl-soft/10 p-6 shadow-sm">
          <h2 className="font-bebas text-2xl tracking-wide mb-4">CONTACT SUPPORT</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-lbl-soft-light mb-1 block">Your Name *</label>
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

            <div>
              <label className="text-sm text-lbl-soft-light mb-1 block">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lbl-soft-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg pl-9 pr-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm text-lbl-soft-light">Reference Number *</label>
                <button
                  type="button"
                  onClick={() => setShowImageGuide(!showImageGuide)}
                  className="text-xs text-lbl-orange hover:underline flex items-center gap-1"
                >
                  <Image size={12} /> Where to find it?
                </button>
              </div>
              <div className="relative">
                <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lbl-soft-light" />
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value.toUpperCase())}
                  placeholder="e.g. LBL-D-2859 or LEBL-8821"
                  className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg pl-9 pr-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40 font-jetbrains"
                  required
                />
              </div>
              <p className="text-[10px] text-lbl-soft-light mt-1">
                Found on your receipt. Format: <span className="font-jetbrains">LBL-D-XXXX</span> (donation) or <span className="font-jetbrains">LEBL-XXXX</span> (ticket)
              </p>
            </div>

            <div>
              <label className="text-sm text-lbl-soft-light mb-1 block">Describe Your Issue *</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-3 text-lbl-soft-light" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What happened? Please be as detailed as possible..."
                  rows="4"
                  className="w-full bg-lbl-cream border border-lbl-soft/20 rounded-lg pl-9 pr-3 py-2 text-sm text-lbl-dark focus:outline-none focus:border-lbl-orange/40 resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-lbl-orange text-lbl-cream font-semibold px-6 py-3 rounded-full hover:bg-lbl-orange-dark transition-colors"
            >
              <Send size={18} /> Submit Support Request
            </button>

            <p className="text-xs text-lbl-soft-light text-center">
              We'll get back to you within 24-48 hours.
            </p>
          </div>
        </form>

        {/* Reference Image Guide */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-lbl-soft/10 p-6 shadow-sm sticky top-6">
            <h3 className="font-bebas text-xl tracking-wide mb-3">📍 FIND YOUR REFERENCE</h3>
            <p className="text-sm text-lbl-soft-light mb-4">
              Your reference number is located at the top of your receipt:
            </p>

            {/* Receipt Mockup */}
            <div className="bg-white rounded-xl border border-lbl-soft/10 p-4 shadow-sm relative">
              {/* This is a simplified receipt mockup showing where the ref is */}
              <div className="text-center mb-3">
                <div className="w-10 h-10 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-1">
                  <Image size={20} className="text-lbl-orange" />
                </div>
                <h4 className="font-bebas text-lg tracking-wide">LBL Receipt</h4>
                <div className="relative">
                  <span className="text-xs font-jetbrains font-bold text-lbl-orange bg-lbl-orange/10 px-3 py-1 rounded-full border-2 border-lbl-orange">
                    LBL-D-2859
                  </span>
                  {/* Animated arrow pointing to the reference */}
                  <div className="absolute -right-12 top-0 text-lbl-orange animate-pulse">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs border-t border-lbl-soft/10 pt-3">
                <div className="flex justify-between">
                  <span className="text-lbl-soft-light">Name</span>
                  <span className="font-medium">Wellington</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lbl-soft-light">Date</span>
                  <span>2026-08-26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lbl-soft-light">Type</span>
                  <span className="capitalize">Donation</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-lbl-soft/10">
                  <span className="font-semibold">Total</span>
                  <span className="font-jetbrains font-bold text-lbl-orange">25 XAF</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-lbl-soft/10 text-center">
                <p className="text-[10px] text-lbl-soft-light">
                  ⬆️ This is your reference number. Copy it exactly as shown.
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-lbl-cream rounded-xl border border-lbl-soft/10">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-lbl-orange shrink-0 mt-0.5" />
                <p className="text-xs text-lbl-soft-light">
                  <span className="font-semibold text-lbl-dark">Pro tip:</span> Your reference number is always shown at the top of your receipt. 
                  It starts with <span className="font-jetbrains font-semibold">LBL-D-</span> for donations or <span className="font-jetbrains font-semibold">LEBL-</span> for tickets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Guide Modal */}
      {showImageGuide && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowImageGuide(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-lbl-soft/10 flex items-start justify-between shrink-0">
              <div>
                <h2 className="font-bebas text-2xl tracking-wide">How to Find Your Reference</h2>
                <p className="text-sm text-lbl-soft-light">Look at the top of your receipt</p>
              </div>
              <button
                onClick={() => setShowImageGuide(false)}
                className="p-1.5 rounded-full hover:bg-lbl-soft/10 transition-colors text-lbl-soft-light"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="bg-white rounded-2xl border-2 border-lbl-orange/30 p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-3">
                    <Image size={32} className="text-lbl-orange" />
                  </div>
                  <h3 className="font-bebas text-2xl tracking-wide">LBL Receipt</h3>
                  
                  {/* Highlighted reference */}
                  <div className="my-4 p-3 bg-lbl-orange/10 rounded-xl border-2 border-lbl-orange border-dashed">
                    <p className="text-xs text-lbl-soft-light mb-1">Your reference number is here:</p>
                    <p className="font-jetbrains text-2xl font-bold text-lbl-orange">LBL-D-2859</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-xs text-lbl-soft-light">⬆️ Copy this number</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-left border-t border-lbl-soft/10 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Name</span>
                      <span>Wellington</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Date</span>
                      <span>2026-08-26</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Type</span>
                      <span>Donation</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-lbl-soft/10">
                      <span className="font-semibold">Total</span>
                      <span className="font-jetbrains font-bold text-lbl-orange">25 XAF</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-lbl-cream rounded-xl border border-lbl-soft/10">
                <p className="text-sm text-lbl-soft-light">
                  <span className="font-semibold text-lbl-dark">Remember:</span> Always include your reference number when contacting support. 
                  It helps us find your transaction quickly.
                </p>
              </div>

              <button
                onClick={() => setShowImageGuide(false)}
                className="w-full mt-4 bg-lbl-orange text-lbl-cream font-semibold px-6 py-3 rounded-full hover:bg-lbl-orange-dark transition-colors"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}