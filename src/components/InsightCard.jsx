import React from 'react';
import { Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

export const InsightCard = ({ title, description, details, type = 'info', icon: Icon = Lightbulb }) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const accentColor = type === 'success' ? 'text-income' : type === 'warning' ? 'text-warning' : 'text-primary';
  const iconBg = type === 'success' ? 'bg-income/10' : type === 'warning' ? 'bg-warning/10' : 'bg-primary/10';

  return (
    <div className={cn(
      "p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-border-theme/30 sm:border-border-theme/50 bg-white dark:bg-slate-900/60 shadow-xs sm:shadow-sm flex flex-col gap-4 sm:gap-5 transition-all duration-500 hover:shadow-md group relative overflow-hidden",
      "text-text-theme"
    )}>
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className={cn(
            "p-3 rounded-xl sm:rounded-2xl shrink-0 transition-transform group-hover:-rotate-3 duration-500 flex items-center justify-center",
            iconBg, accentColor
          )}>
            <Icon size={20} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className={cn("text-[8px] sm:text-[10px] font-black uppercase tracking-widest sm:tracking-[0.25em] mb-1 flex items-center gap-2", accentColor)}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current opacity-80" />
              {title}
            </h4>
            <p className="text-sm sm:text-[15px] leading-snug font-bold tracking-tight text-text-theme">
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
          className={cn(
            "flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-wide hover:opacity-100 opacity-80 transition-all cursor-pointer self-end bg-current/5 hover:bg-current/10 px-3.5 py-1.5 rounded-full group/btn",
            accentColor
          )}
        >
          <span>{showDetails ? 'Close details' : 'Explore'}</span>
          <ArrowRight size={14} className={cn("transition-transform duration-500 group-hover/btn:translate-x-0.5", showDetails && "-rotate-90 group-hover/btn:translate-x-0 group-hover/btn:-translate-y-0.5")} />
        </button>
      </div>
    </div>
  );
};
