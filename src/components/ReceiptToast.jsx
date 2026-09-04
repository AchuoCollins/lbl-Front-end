import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { toPng } from 'html-to-image';
import { X, Download, Ticket, Heart, Calendar, User, CreditCard, Tag, Clock, CheckCircle } from 'lucide-react';

export default function ReceiptToast() {
  const { currentReceipt, clearReceipt } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // 5 minutes in seconds
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef(null);

  // Auto-dismiss after 5 minutes
  useEffect(() => {
    if (!currentReceipt) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          clearReceipt();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentReceipt, clearReceipt]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentReceipt) return null;

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(receiptRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `receipt-${currentReceipt.ref}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  const isTicket = currentReceipt.type === 'ticket';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-md mx-auto sm:mx-0">
      <div className="bg-white rounded-2xl shadow-2xl border border-lbl-orange/30 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-lbl-orange/10 to-lbl-orange/5 px-4 py-2.5 sm:px-5 sm:py-3 border-b border-lbl-soft/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {isTicket ? (
              <Ticket size={18} className="text-lbl-orange shrink-0" />
            ) : (
              <Heart size={18} className="text-lbl-orange shrink-0" />
            )}
            <span className="font-bebas text-base sm:text-lg tracking-wide whitespace-nowrap">Receipt</span>
            <span className="text-[10px] sm:text-xs font-jetbrains text-lbl-soft-light bg-white/50 px-1.5 sm:px-2 py-0.5 rounded-full truncate max-w-[80px] sm:max-w-none">
              {currentReceipt.ref}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="text-[10px] sm:text-xs text-lbl-soft-light font-jetbrains whitespace-nowrap">
              <Clock size={12} className="inline mr-1" />
              {formatTime(timeLeft)}
            </span>
            <button
              onClick={clearReceipt}
              className="p-1 hover:bg-lbl-soft/10 rounded-full transition-colors text-lbl-soft-light"
              aria-label="Close receipt"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-medium text-sm sm:text-base text-lbl-dark truncate">{currentReceipt.name}</p>
              <p className="text-xs sm:text-sm text-lbl-soft-light truncate">{currentReceipt.details}</p>
            </div>
            <span className="font-jetbrains text-base sm:text-xl font-bold text-lbl-orange shrink-0">
              {currentReceipt.amount.toLocaleString()} XAF
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-[10px] sm:text-xs text-lbl-soft-light">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="shrink-0" /> {currentReceipt.date || 'Today'}
            </span>
            <span className={`text-[10px] font-jetbrains font-semibold px-2 py-0.5 rounded-full ${
              currentReceipt.status === 'CONFIRMED' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300'
            }`}>
              {currentReceipt.status}
            </span>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-4 border-t border-lbl-soft/10">
            <div ref={receiptRef} className="bg-white rounded-xl p-3 sm:p-4 border border-lbl-soft/10 max-h-[70vh] overflow-y-auto">
              <div className="text-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-lbl-orange/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  {isTicket ? (
                    <Ticket size={20} className="sm:size-6 text-lbl-orange" />
                  ) : (
                    <Heart size={20} className="sm:size-6 text-lbl-orange" />
                  )}
                </div>
                <h4 className="font-bebas text-lg sm:text-xl tracking-wide">LBL Receipt</h4>
                <p className="text-[10px] sm:text-xs text-lbl-soft-light font-jetbrains">{currentReceipt.ref}</p>
              </div>

              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-lbl-soft-light">Name</span>
                  <span className="font-medium">{currentReceipt.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lbl-soft-light">Date</span>
                  <span>{currentReceipt.date || 'Today'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lbl-soft-light">Type</span>
                  <span className="capitalize">{currentReceipt.type}</span>
                </div>
                {isTicket ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Game</span>
                      <span className="text-right max-w-[60%] truncate">{currentReceipt.game}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Ticket Type</span>
                      <span>{currentReceipt.typeLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Quantity</span>
                      <span>{currentReceipt.quantity}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Category</span>
                      <span>{currentReceipt.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lbl-soft-light">Method</span>
                      <span>{currentReceipt.method}</span>
                    </div>
                    {currentReceipt.message && (
                      <div className="flex justify-between">
                        <span className="text-lbl-soft-light">Message</span>
                        <span className="text-right italic max-w-[60%] text-xs sm:text-sm">"{currentReceipt.message}"</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-between pt-2 border-t border-lbl-soft/10">
                  <span className="font-semibold">Total</span>
                  <span className="font-jetbrains font-bold text-lbl-orange text-base sm:text-lg">
                    {currentReceipt.amount.toLocaleString()} XAF
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lbl-soft-light">Status</span>
                  <span className={`font-semibold ${
                    currentReceipt.status === 'CONFIRMED' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {currentReceipt.status}
                  </span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-lbl-soft/10 text-center">
                <p className="text-[10px] text-lbl-soft-light">
                  Littoral Basketball League · Thank you for your support!
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              disabled={downloading}
              className="w-full mt-3 flex items-center justify-center gap-2 bg-lbl-orange text-lbl-cream font-semibold px-4 py-2.5 rounded-lg hover:bg-lbl-orange-dark transition-colors disabled:opacity-50 text-sm"
            >
              <Download size={16} />
              {downloading ? 'Generating...' : 'Download as Image'}
            </button>
          </div>
        )}

        {/* Footer hint */}
        <div className="px-4 py-1.5 sm:px-5 sm:py-2 border-t border-lbl-soft/10 bg-lbl-cream/30 text-center">
          <p className="text-[10px] text-lbl-soft-light">
            Tap to {expanded ? 'collapse' : 'expand'} · Auto-closes in {formatTime(timeLeft)}
          </p>
        </div>
      </div>
    </div>
  );
}