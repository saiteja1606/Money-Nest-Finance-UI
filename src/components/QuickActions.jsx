import React from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  CreditCard, 
  Send, 
  FileText, 
  Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAppContext } from '../context/AppContext';

const cn = (...inputs) => twMerge(clsx(inputs));

export const QuickActions = ({ onAddTransaction }) => {
  const { role } = useAppContext();
  
  const actions = [
    { 
      id: 'add', 
      label: 'Add New', 
      icon: Plus, 
      gradient: 'premium-gradient-primary', 
      onClick: onAddTransaction,
      adminOnly: true,
      badge: 'v1.2'
    },
    { 
      id: 'transfer', 
      label: 'Transfer', 
      icon: Send, 
      gradient: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900',
      description: 'Send & Receive'
    },
    { 
      id: 'pay', 
      label: 'Payments', 
      icon: CreditCard, 
      gradient: 'premium-gradient-success',
      description: 'Bills & Utilities'
    },
    { 
      id: 'export', 
      label: 'Exports', 
      icon: FileText, 
      gradient: 'bg-slate-100 dark:bg-slate-800 text-muted-theme',
      description: 'History Reports'
    }
  ].filter(action => !action.adminOnly || role === 'admin');

  return (
    <div className="glass-card p-6 h-full flex flex-col justify-between group/qa relative overflow-visible border-white/5">
      {/* Decorative Shine */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none rounded-[2rem]" />
      
      <div className="mb-6 relative z-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-theme opacity-60 flex items-center gap-2">
          <Zap size={14} className="text-primary animate-pulse" />
          Quick Actions
        </h3>
        <p className="text-sm font-extrabold text-text-theme tracking-tight mt-1">Frequent Operations</p>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10 flex-1">
        {actions.map((action, idx) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={action.onClick}
            className="group/btn flex flex-col items-center justify-center gap-3 p-4 rounded-[1.75rem] border border-border-theme hover:border-primary/20 bg-slate-50/50 dark:bg-white/[0.03] transition-all hover:shadow-glow active:scale-95 cursor-pointer h-full relative"
          >
            {action.badge && (
              <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-tighter shadow-sm">
                {action.badge}
              </span>
            )}
            
            <div className={cn(
              "p-3 rounded-2xl shadow-md transition-[transform,box-shadow] group-hover/btn:scale-110 duration-200",
              action.gradient,
              action.id === 'export' ? 'text-muted-theme' : action.id === 'transfer' ? '' : 'text-white'
            )}>
              <action.icon size={20} className="group-hover/btn:rotate-12 transition-transform" />
            </div>
            
            <div className="text-center overflow-hidden">
              <span className="text-[11px] font-black uppercase tracking-widest text-text-theme leading-none block">{action.label}</span>
              {action.description && (
                <span className="text-[8px] font-bold text-muted-theme opacity-40 mt-1 block truncate tracking-tighter">{action.description}</span>
              )}
            </div>
            
            <div className="absolute bottom-2 right-2 opacity-0 group-hover/btn:opacity-100 transition-opacity">
              <ArrowUpRight size={10} className="text-primary" />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-30 relative z-10 px-2">
        <span>Security: Encrypted</span>
        <span>Verified</span>
      </div>
    </div>
  );
};
