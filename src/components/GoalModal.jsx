import React, { useState, useEffect } from 'react';
import { X, Target, Save, TrendingUp, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/helpers';

export const GoalModal = ({ isOpen, onClose }) => {
  const { savingsGoal, updateSavingsGoal, currency, exchangeRates } = useAppContext();
  
  const [formData, setFormData] = useState({
    title: '',
    target: '',
    current: '',
    contribution: ''
  });

  useEffect(() => {
    if (savingsGoal && isOpen) {
      setFormData({
        title: savingsGoal.title,
        target: (savingsGoal.target * exchangeRates[currency]).toFixed(2),
        current: (savingsGoal.current * exchangeRates[currency]).toFixed(2),
        contribution: ''
      });
    }
  }, [savingsGoal, isOpen, currency, exchangeRates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const contributionValue = parseFloat(formData.contribution) || 0;
    const finalCurrent = parseFloat(formData.current) + contributionValue;
    
    const newGoal = {
      title: formData.title,
      target: parseFloat(formData.target) / exchangeRates[currency],
      current: finalCurrent / exchangeRates[currency]
    };

    updateSavingsGoal(newGoal);
    onClose();
  };

  if (!isOpen) return null;

  const currentPercentage = Math.min(Math.round((parseFloat(formData.current) / parseFloat(formData.target)) * 100), 100) || 0;
  const contributionValue = parseFloat(formData.contribution) || 0;
  const newPercentage = Math.min(Math.round(((parseFloat(formData.current) + contributionValue) / parseFloat(formData.target)) * 100), 100) || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-card w-full max-w-lg relative z-10 shadow-lg overflow-visible border-white/10"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-sm">
                    <Target size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-text-theme tracking-tighter">
                      Strategic <span className="text-primary italic">Goal</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-theme opacity-50 mt-1">
                      Adjust your savings target and contributions.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2.5 text-muted-theme hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress Simulation Card */}
              <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-[2rem] p-6 border border-border-theme mb-8">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-[10px] font-black uppercase tracking-widest text-muted-theme">Current Progress</span>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-text-theme">{currentPercentage}%</span>
                      {contributionValue > 0 && (
                        <span className="text-[10px] font-bold text-income animate-bounce">
                           → {newPercentage}%
                        </span>
                      )}
                   </div>
                </div>
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                   <div className="h-full rounded-full transition-all duration-700 ease-out flex">
                      <div 
                        className="h-full rounded-l-full premium-gradient-primary shadow-[0_0_12px_var(--color-primary)]" 
                        style={{ width: `${currentPercentage}%` }}
                      />
                      {contributionValue > 0 && (
                        <div 
                          className="h-full bg-income/40 border-l border-white/10" 
                          style={{ width: `${newPercentage - currentPercentage}%` }}
                        />
                      )}
                   </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group/field">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme mb-2 block ml-1 group-focus-within/field:text-primary transition-all">Goal Title</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border-theme rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-hidden text-text-theme placeholder:opacity-30 font-bold"
                    placeholder="e.g. New Home Deposit"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                   <div className="group/field">
                      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme mb-2 block ml-1 group-focus-within/field:text-primary transition-all">Target Amount ({currency === 'INR' ? '₹' : '$'})</label>
                      <input
                        required
                        type="number"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border-theme rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-hidden text-text-theme font-mono font-black"
                        value={formData.target}
                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                      />
                   </div>
                   <div className="group/field">
                      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme mb-2 block ml-1 group-focus-within/field:text-primary transition-all">Add Contribution</label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border-theme rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-income/10 focus:border-income/30 transition-all outline-hidden text-text-theme font-mono font-black pr-10"
                          placeholder="0.00"
                          value={formData.contribution}
                          onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                        />
                        <Plus size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-income" />
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800 text-muted-theme hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[1.5] py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] premium-gradient-primary text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Save size={14} />
                    Apply Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
