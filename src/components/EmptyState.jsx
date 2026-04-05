import React from 'react';
import { PackageOpen, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export const EmptyState = ({ title, message, onAction }) => {
  const { role } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-16 text-center glass-card border-dashed border-2 bg-slate-50/50 dark:bg-white/[0.02]"
    >
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="w-24 h-24 bg-card-theme shadow-inner rounded-[2rem] flex items-center justify-center text-muted-theme border-2 border-border-theme relative z-10 transition-transform group-hover:scale-110 duration-700">
          <PackageOpen size={48} className="opacity-40 group-hover:opacity-80 transition-opacity" />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-black text-text-theme tracking-tighter">{title}</h3>
        <p className="text-muted-theme max-w-sm mt-3 text-[13px] leading-relaxed font-bold opacity-60">
          {message}
        </p>
        
        {role === 'admin' && onAction && (
          <button
            onClick={onAction}
            className="mt-10 px-8 py-4 premium-gradient-primary text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer mx-auto"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        )}
      </div>
    </motion.div>
  );
};
