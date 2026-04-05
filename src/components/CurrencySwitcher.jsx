import React from 'react';
import { useAppContext } from '../context/AppContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const CurrencySwitcher = ({ className }) => {
  const { currency, setCurrency } = useAppContext();

  const currencies = [
    { id: 'INR', label: 'INR', symbol: '₹' },
    { id: 'USD', label: 'USD', symbol: '$' }
  ];

  return (
    <div className={cn(
      "flex items-center w-max bg-slate-100/50 dark:bg-white/5 p-1 rounded-xl backdrop-blur-md border border-border-theme/40",
      className
    )}>
      {currencies.map((curr) => (
        <button
          key={curr.id}
          onClick={() => setCurrency(curr.id)}
          className={cn(
            "flex items-center w-max shrink-0 whitespace-nowrap gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] font-black tracking-[0.1em] transition-all duration-300 cursor-pointer relative",
            currency === curr.id
              ? "bg-white dark:bg-slate-700 text-primary shadow-sm ring-1 ring-black/5 dark:ring-white/5"
              : "text-muted-theme hover:text-text-theme"
          )}
        >
          <span className={cn(
            "text-[12px] font-bold",
            currency === curr.id ? "text-primary" : "text-muted-theme opacity-60"
          )}>
            {curr.symbol}
          </span>
          <span className="opacity-80">{curr.label}</span>
          
          {currency === curr.id && (
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};
