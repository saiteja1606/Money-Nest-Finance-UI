import React from 'react';
import { Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

export const InsightCard = ({ title, description, details, type = 'info', icon: Icon = Lightbulb }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const getStyles = () => {
    switch (type) {
      case 'success': return 'border-income/30 bg-income/5 text-income shadow-income/5';
      case 'warning': return 'border-warning/30 bg-warning/5 text-warning shadow-warning/5 overflow-hidden';
      default: return 'border-primary/30 bg-primary/5 text-primary shadow-blue-500/5';
    }
  };

  return (
    <div className={cn(
      "p-6 rounded-[2rem] border flex flex-col gap-5 transition-all duration-500 hover:shadow-glow glass-card group",
      getStyles()
    )}>
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-5">
          <div className={cn(
            "p-3.5 rounded-2xl bg-card-theme shadow-inner shrink-0 border border-border-theme transition-transform group-hover:-rotate-3 duration-500",
            "bg-linear-to-b from-white to-slate-50/50 dark:from-slate-800 dark:to-slate-900"
          )}>
            <Icon size={22} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] mb-1.5 opacity-60 flex items-center gap-2">
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", 
                type === 'success' ? 'bg-income' : type === 'warning' ? 'bg-warning' : 'bg-primary'
              )} />
              {title}
            </h4>
            <p className="text-[15px] leading-snug font-bold tracking-tight text-text-theme">
              {description}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && details && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-5 px-1 border-t border-current/10 mt-2 space-y-4">
                <p className="text-xs font-semibold leading-relaxed opacity-90 text-text-theme/80">
                  {details}
                </p>
                <div className="p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-2 opacity-70">
                    <Zap size={12} className="text-primary" />
                    AI Recommendation
                  </p>
                  <p className="text-[11px] font-bold italic leading-relaxed">
                    Based on your trajectory, we recommend optimizing your emergency fund allocation for better returns.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-inherit hover:opacity-100 opacity-70 transition-all cursor-pointer self-end group/btn"
        >
          {showDetails ? 'Minimize' : 'View Details'}
          <div className="p-1 px-2 rounded-full bg-current/10 group-hover/btn:bg-current/20 transition-colors">
            <ArrowRight size={10} className={cn("transition-transform duration-500", showDetails && "-rotate-90")} />
          </div>
        </button>
      </div>
    </div>
  );
};
