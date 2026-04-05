import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Menu 
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const icons = {
  Wallet,
  TrendingUp,
  TrendingDown
};

export const SummaryCard = ({ title, amount, icon, trend, type = 'balance' }) => {
  const { currency, exchangeRates } = useAppContext();
  const Icon = icons[icon] || Wallet;
  
  const getGradient = () => {
    switch (type) {
      case 'income': return 'premium-gradient-success';
      case 'expense': return 'premium-gradient-danger';
      default: return 'premium-gradient-primary';
    }
  };

  return (
    <div className="glass-card p-7 group h-full flex flex-col justify-between relative hover:scale-[1.02] transition-[transform,box-shadow] duration-200 ease-out">
      {/* Premium Glass Inner Border */}
      <div className="absolute inset-0 border border-white/5 dark:border-white/2 pointer-events-none rounded-[2rem]" />
      
      {/* Decorative Blob */}
      <div className={cn(
        "absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-5 blur-3xl transition-all group-hover:scale-150 duration-1000",
        type === 'income' ? "bg-income" : type === 'expense' ? "bg-expense" : "bg-primary"
      )} />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={cn(
          "p-3 rounded-2xl shadow-xl transition-all group-hover:shadow-2xl group-hover:-translate-y-1 duration-500",
          getGradient(),
          "text-white"
        )}>
          <Icon size={22} className="group-hover:rotate-6 transition-transform" />
        </div>
        
        {trend && (
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur-xl border transition-all",
            trend > 0 
              ? "bg-income/10 dark:bg-income/10 border-income/20 dark:border-income/20 text-income" 
              : "bg-expense/10 dark:bg-expense/10 border-expense/20 dark:border-expense/20 text-expense"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full animate-pulse",
              trend > 0 ? "bg-income" : "bg-expense"
            )} />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-theme mt-1 mb-2.5">{title}</h3>
        <p className="text-4xl font-black text-text-theme font-mono tracking-tighter tabular-nums leading-none">
          {formatCurrency(amount * exchangeRates[currency], currency)}
        </p>
      </div>
      
      {/* Animated Bottom Progress Highlight */}
      <div className={cn(
        "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-in-out opacity-20",
        type === 'income' ? "bg-income" : type === 'expense' ? "bg-expense" : "bg-primary"
      )} />
    </div>
  );
};
