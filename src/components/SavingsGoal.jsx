import React from 'react';
import { Target, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/helpers';
import { useAppContext } from '../context/AppContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const SavingsGoal = ({ onAdjust }) => {
  const { currency, exchangeRates, savingsGoal } = useAppContext();
  const { title, target: goalAmount, current: currentAmount } = savingsGoal;
  const percentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  
  return (
    <div className="glass-card p-7 group relative overflow-hidden h-full flex flex-col justify-between hover:scale-[1.02] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
      {/* Premium Glass Inner Border */}
      <div className="absolute inset-0 border border-white/5 dark:border-white/2 pointer-events-none rounded-[2rem]" />
      
      {/* Background Pattern */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-sm group-hover:rotate-6 transition-transform duration-500">
              <Target size={22} />
            </div>
            <div>
              <h3 className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-theme opacity-60">Strategic Goal</h3>
              <p className="text-sm font-extrabold text-text-theme tracking-tight mt-0.5">{title}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-income/10 text-income border border-income/20 text-[10px] font-black uppercase tracking-widest">
            <TrendingUp size={12} />
            On Track
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[28px] font-black text-text-theme tracking-tighter leading-none font-mono tabular-nums">
                {percentage}%
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-theme mt-1.5 opacity-50">Overall Progress</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-extrabold text-text-theme tabular-nums">{formatCurrency(currentAmount * exchangeRates[currency], currency)}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-theme opacity-40">Target: {formatCurrency(goalAmount * exchangeRates[currency], currency)}</p>
            </div>
          </div>

          {/* Premium Progress Bar Container */}
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-border-theme p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="h-full rounded-full premium-gradient-primary shadow-[0_0_12px_var(--color-primary)] relative"
            >
              {/* Shine effect on progress bar */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </motion.div>
          </div>
        </div>
      </div>

      <button 
        onClick={onAdjust}
        className="relative z-10 w-full group/btn flex items-center justify-between px-5 py-3.5 rounded-2xl bg-slate-100/50 dark:bg-slate-800/50 border border-border-theme hover:border-primary/30 transition-all cursor-pointer"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-theme group-hover/btn:text-primary transition-colors">Adjust Contribution</span>
        <ChevronRight size={14} className="text-muted-theme group-hover/btn:translate-x-1 transition-all" />
      </button>
    </div>
  );
};
