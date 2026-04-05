import React, { useState, useEffect } from 'react';
import { X, Plus, Save, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const TransactionModal = ({ isOpen, onClose, editingTransaction }) => {
  const { addTransaction, updateTransaction, currency, exchangeRates } = useAppContext();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
    type: 'expense'
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        ...editingTransaction,
        amount: (editingTransaction.amount * exchangeRates[currency]).toFixed(2)
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Food',
        type: 'expense'
      });
    }
  }, [editingTransaction, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const transaction = {
      ...formData,
      amount: parseFloat(formData.amount) / exchangeRates[currency]
    };

    if (editingTransaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }
    onClose();
  };

  if (!isOpen) return null;

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
            {/* Premium Header Shine */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />

            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-sm">
                    {editingTransaction ? <Save size={24} /> : <Plus size={24} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-text-theme tracking-tighter">
                      {editingTransaction ? 'Edit' : 'New'} <span className="text-primary italic">Transaction</span>
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-theme opacity-50 mt-1">
                      Enter the transaction details below.
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-100/50 dark:bg-slate-900/50 rounded-[1.25rem] border border-border-theme">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'income' })}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all",
                      formData.type === 'income'
                        ? "premium-gradient-success text-white shadow-lg shadow-income/20"
                        : "text-muted-theme hover:text-text-theme"
                    )}
                  >
                    <ArrowUpCircle size={14} />
                    Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'expense' })}
                    className={cn(
                      "flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all",
                      formData.type === 'expense'
                        ? "premium-gradient-danger text-white shadow-lg shadow-expense/20"
                        : "text-muted-theme hover:text-text-theme"
                    )}
                  >
                    <ArrowDownCircle size={14} />
                    Expense
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme mb-2 block ml-1 group-focus-within/field:text-primary transition-all">Description</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border-theme rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-hidden text-text-theme placeholder:opacity-30 font-bold"
                      placeholder="e.g. Monthly Rent"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="group/field">
                      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme mb-2 block ml-1 group-focus-within/field:text-primary transition-all">Amount ({currency === 'INR' ? '₹' : '$'})</label>
                      <input
                        required
                        type="number"
                        step="0.01"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border-theme rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-hidden text-text-theme font-mono font-black"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      />
                    </div>
                    <div className="group/field">
                      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme mb-2 block ml-1 group-focus-within/field:text-primary transition-all">Transaction Date</label>
                      <input
                        required
                        type="date"
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border-theme rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-hidden text-text-theme font-bold"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme mb-2 block ml-1 group-focus-within/field:text-primary transition-all">Category</label>
                    <select
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-border-theme rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all outline-hidden text-text-theme font-bold cursor-pointer appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name} className="bg-white dark:bg-slate-900 text-text-theme">{c.name}</option>
                      ))}
                    </select>
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
                    className="flex-[1.5] py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] premium-gradient-primary text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Save Transaction
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
