import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-theme"
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Rings */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-[2.5rem] border-2 border-primary/20 border-t-primary shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-[2rem] border-2 border-secondary/20 border-b-secondary shadow-[0_0_12px_rgba(139,92,246,0.1)]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 premium-gradient-primary rounded-2xl text-white shadow-xl shadow-primary/20">
              <Wallet size={24} className="animate-pulse" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-black text-text-theme tracking-tighter">
            Money <span className="text-primary italic">Nest</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-theme opacity-50 mt-2">
            Loading your dashboard...
          </p>
        </div>
      </div>
    </motion.div>
  );
};
