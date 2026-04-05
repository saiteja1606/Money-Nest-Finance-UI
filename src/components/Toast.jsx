import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, ShieldCheck, Eye } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: <CheckCircle className="text-emerald-500" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />,
    info: <Info className="text-blue-500" size={18} />
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
          className="fixed bottom-8 right-8 z-[100] min-w-[320px]"
        >
          <div className={cn(
            "glass-card p-5 flex items-center gap-4 relative overflow-hidden group",
            type === 'success' ? "border-income/20 shadow-income/5" : 
            type === 'admin' ? "border-primary/20 shadow-primary/5" :
            type === 'viewer' ? "border-warning/20 shadow-warning/5" : 
            "border-expense/20 shadow-expense/5"
          )}>
            {/* Animated Status Glow */}
            <div className={cn(
              "absolute -left-12 -top-12 w-24 h-24 rounded-full opacity-10 blur-2xl animate-pulse",
              type === 'success' ? "bg-income" : 
              type === 'admin' ? "bg-primary" :
              type === 'viewer' ? "bg-warning" : 
              "bg-expense"
            )} />

            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110 duration-500",
              type === 'success' ? "premium-gradient-success text-white" : 
              type === 'admin' ? "premium-gradient-primary text-white" :
              type === 'viewer' ? "bg-warning text-slate-900" : 
              "premium-gradient-danger text-white"
            )}>
              {type === 'success' ? <CheckCircle size={24} /> : 
               type === 'admin' ? <ShieldCheck size={24} /> :
               type === 'viewer' ? <Eye size={24} /> :
               type === 'error' ? <AlertCircle size={24} /> : <Info size={24} />}
            </div>
            
            <div className="flex-1 pr-6 relative z-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-theme opacity-50 mb-1">
                Notification
              </h4>
              <p className="text-sm font-extrabold text-text-theme tracking-tight leading-snug">
                {message}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-muted-theme hover:text-text-theme hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer z-20"
            >
              <X size={14} />
            </button>
            
            {/* Animated Progress Timer Bar */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1 origin-left z-10",
                type === 'success' ? "bg-income" : 
                type === 'admin' ? "bg-primary" :
                type === 'viewer' ? "bg-warning" : 
                "bg-expense"
              )}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
