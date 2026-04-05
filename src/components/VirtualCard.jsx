import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';

export const VirtualCard = () => {
  const { stats, currency, exchangeRates } = useAppContext();
  const [isFlipped, setIsFlipped] = useState(false);

  const cardData = {
    number: "4532 8847 1290 8432",
    expiry: "12/28",
    holder: "Gunishetti Sai Teja",
    cvv: "***"
  };

  return (
    <div className="relative w-full max-w-sm aspect-[1.58/1] perspective-1000 group">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full cursor-default"
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-lg p-4 flex flex-col justify-between ${isFlipped ? "pointer-events-none" : "pointer-events-auto"}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background Gradients & Effects */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/95 to-secondary/95 dark:from-primary/90 dark:to-slate-900" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          {/* Glass Overlay */}
          <div className="absolute inset-0 backdrop-blur-sm opacity-20" />

          {/* Card Detail Content */}
          <div className="relative z-10 flex justify-between items-start">
            <div className="space-y-4">
              <div className="w-12 h-10 bg-linear-to-tr from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-inner overflow-hidden border border-white/20">
                <Cpu className="text-white/80" size={24} />
              </div>
              <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-black">Money Nest Premium</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Wifi size={24} className="text-white/40 rotate-90" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white"
                aria-label="Show card back"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <p className="text-white/70 text-xs font-medium">Account Balance</p>
            <p className="text-white text-3xl font-black tracking-tight shadow-sm font-mono leading-none">
              {formatCurrency(stats.balance * exchangeRates[currency], currency)}
            </p>
          </div>

          <div className="relative z-10 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Card Holder</p>
              <p className="text-white text-sm font-bold tracking-wide">{cardData.holder}</p>
            </div>
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-red-500/80 backdrop-blur-xs border border-white/10" />
              <div className="w-10 h-10 rounded-full bg-yellow-500/80 backdrop-blur-xs border border-white/10" />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-premium p-5 sm:p-6 flex flex-col justify-between ${isFlipped ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)"
          }}
        >
          {/* Base Material & Lighting */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-5 mix-blend-overlay" />

          {/* Magnetic Stripe */}
          <div className="absolute top-6 sm:top-8 left-0 w-full h-10 sm:h-12 bg-linear-to-b from-black via-slate-900 to-black shadow-lg border-y border-white/5 relative">
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.1)_1px,rgba(255,255,255,0.1)_2px)]" />
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            className="absolute top-2 right-4 sm:top-3 sm:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-95 text-white/60 hover:text-white border border-white/20 shadow-xl flex items-center justify-center cursor-pointer"
            aria-label="Show card front"
          >
            <EyeOff size={16} />
          </button>

          <div className="mt-10 sm:mt-12 space-y-4 sm:space-y-5 relative z-10">
            {/* Signature Panel */}
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <p className="text-white/20 text-[7px] font-black uppercase tracking-[0.3em]">Authorized Signature • Not Valid Unless Signed</p>
                <p className="text-white/20 text-[7px] font-black uppercase tracking-[0.3em]">Security Code</p>
              </div>
              <div className="flex items-center gap-0">
                <div className="flex-1 h-10 bg-slate-100 rounded-l-md border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,1)_5px,rgba(0,0,0,1)_6px)]" />
                  <p className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-serif italic text-sm opacity-50 select-none">Sai Teja G</p>
                </div>
                <div className="w-16 h-10 bg-white rounded-r-md border-y border-r border-white/10 flex items-center justify-center shadow-inner">
                  <p className="text-slate-900 font-mono font-black text-sm tracking-widest italic">{cardData.cvv}</p>
                </div>
              </div>
            </div>

            {/* Card Information */}
            <div className="flex justify-between items-center gap-2">
              <div className="space-y-0.5 sm:space-y-1.5 overflow-hidden">
                <p className="text-white/20 text-[7px] font-black uppercase tracking-[0.3em]">Card Number</p>
                <p className="text-white text-[11px] sm:text-sm font-mono tracking-widest sm:tracking-[0.2em] font-black drop-shadow-md whitespace-nowrap">
                  {cardData.number}
                </p>
              </div>
              <div className="space-y-0.5 sm:space-y-1.5 text-right shrink-0">
                <p className="text-white/20 text-[7px] font-black uppercase tracking-[0.3em]">Expiry</p>
                <p className="text-white font-mono font-black text-[11px] sm:text-xs tracking-widest">{cardData.expiry}</p>
              </div>
            </div>
          </div>

          {/* Micro-text & Logos */}
          <div className="relative z-10 flex justify-between items-center bg-white/5 p-3 sm:p-4 rounded-2xl border border-white/5 backdrop-blur-sm mt-auto">
            <div className="max-w-[180px]">
              <p className="text-[6px] text-white/20 font-medium leading-relaxed tracking-tight">
                Issued by Money Nest Reserve. This card is property of the issuer and must be returned upon request. Use of this card is subject to the terms and conditions of the Elite Membership Agreement.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded-sm bg-linear-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 relative overflow-hidden flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/10 blur-[2px]" />
                <div className="absolute inset-0 bg-conic-to-tr from-transparent via-white/5 to-transparent rotate-12 opacity-50" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-white tracking-widest italic opacity-40">ELITE</p>
                <p className="text-[6px] font-black text-primary tracking-[0.2em] uppercase">Reserve</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
