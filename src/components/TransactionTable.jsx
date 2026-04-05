import React from 'react';
import {
  Search,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatDate, getIcon } from '../utils/helpers';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const TransactionTable = ({ onEdit, limit }) => {
  const {
    filteredTransactions,
    role,
    deleteTransaction,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    sortOption,
    setSortOption,
    currency,
    exchangeRates
  } = useAppContext();

  const displayTransactions = limit
    ? filteredTransactions.slice(0, limit)
    : filteredTransactions;

  return (
    <div className="glass-card rounded-3xl overflow-hidden h-full flex flex-col">
      {!limit && (
        <div className="p-6 border-b border-border-theme">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-theme" size={18} />
              <input
                type="text"
                placeholder="Search description or category..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-hidden text-text-theme"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-hidden text-text-theme cursor-pointer"
              >
                <option className="bg-white dark:bg-slate-900">All</option>
                <option className="bg-white dark:bg-slate-900">Income</option>
                <option className="bg-white dark:bg-slate-900">Expense</option>
              </select>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-hidden text-text-theme cursor-pointer"
              >
                <option className="bg-white dark:bg-slate-900">Newest</option>
                <option className="bg-white dark:bg-slate-900">Oldest</option>
                <option className="bg-white dark:bg-slate-900">Highest</option>
                <option className="bg-white dark:bg-slate-900">Lowest</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/20 text-muted-theme text-[10px] font-bold uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                {role === 'admin' && <th className="px-6 py-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-theme">
              {displayTransactions.map((t) => {
                const Icon = getIcon(t.category === 'Salary' ? 'Wallet' : t.category === 'Food' ? 'Utensils' : 'Tag');
                return (
                  <tr 
                    key={t.id} 
                    className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 transition-transform group-hover:scale-110 duration-500",
                          t.type === 'income' ? 'premium-gradient-success text-white' : 'bg-slate-100 dark:bg-slate-800 text-muted-theme'
                        )}>
                          <Icon size={18} className="group-hover:rotate-6 transition-transform" />
                        </div>
                        <div>
                          <p className="font-bold text-text-theme text-sm tracking-tight group-hover:text-primary transition-colors">{t.description}</p>
                          <p className="text-[10px] text-muted-theme font-medium uppercase tracking-[0.15em] opacity-60">Ref: {t.id.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-[0.15em] text-muted-theme border border-border-theme/60 dark:border-border-theme">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-xs text-muted-theme font-semibold">
                      {formatDate(t.date)}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <p className={cn(
                        "text-sm font-black font-mono tabular-nums tracking-tighter",
                        t.type === 'income' ? "text-income" : "text-text-theme"
                      )}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount * exchangeRates[currency], currency)}
                      </p>
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          <button
                            onClick={() => onEdit(t)}
                            className="p-2 text-muted-theme hover:text-primary hover:bg-primary/10 rounded-xl transition-all cursor-pointer"
                            aria-label="Edit transaction"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
                            className="p-2 text-muted-theme hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                            aria-label="Delete transaction"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-border-theme">
          {displayTransactions.map((t) => {
            const Icon = getIcon(t.category === 'Salary' ? 'Wallet' : t.category === 'Food' ? 'Utensils' : 'Tag');
            return (
              <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shrink-0",
                    t.type === 'income' ? 'premium-gradient-success text-white' : 'bg-white dark:bg-slate-800 border border-border-theme text-muted-theme'
                  )}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-extrabold text-text-theme text-[15px] leading-tight mb-1">{t.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-theme opacity-80">{t.category}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <span className="text-[10px] text-muted-theme font-semibold">{formatDate(t.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                  <p className={cn(
                    "font-black text-sm font-mono tabular-nums tracking-tighter",
                    t.type === 'income' ? "text-income" : "text-text-theme"
                  )}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount * exchangeRates[currency], currency)}
                  </p>
                  {role === 'admin' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onEdit(t)}
                        className="p-2 text-muted-theme hover:text-primary bg-slate-100 dark:bg-slate-800 rounded-xl transition-all"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 text-muted-theme hover:text-red-500 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center h-full flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-muted-theme">
              <Search size={24} />
            </div>
            <h3 className="text-text-theme font-bold">No transactions found</h3>
            <p className="text-muted-theme text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
