import React from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { RoleSwitcher } from './RoleSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const Header = ({ onOpenSidebar }) => {
  const { role, setRole, isDarkMode, setIsDarkMode } = useAppContext();

  return (
    <header className="header-bg shrink-0">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={onOpenSidebar}
            className="p-2 text-muted-theme hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-all active:scale-95"
          >
            <Menu size={20} />
          </button>
          <span className="font-extrabold text-text-theme uppercase tracking-[0.2em] text-[10px] opacity-80 mt-0.5">Money Nest</span>
        </div>

        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-text-theme flex items-center gap-2 tracking-tight">
              Finance Overview
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
            </h2>
            <div className={cn(
              "px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.25em] border backdrop-blur-md shadow-sm transition-all",
              role === 'admin' 
                ? "bg-primary/5 text-primary border-primary/20 shadow-primary/5" 
                : "bg-warning/5 text-warning border-warning/20 shadow-warning/5"
            )}>
              {role === 'admin' ? 'Administrator' : role.charAt(0).toUpperCase() + role.slice(1)}
            </div>
          </div>
          <p className="text-[10px] uppercase font-black tracking-[0.1em] text-muted-theme tracking-tight opacity-40 mt-0.5 flex items-center gap-2">
            Personal Finance Dashboard
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <CurrencySwitcher className="scale-90 hidden sm:flex" />
          <RoleSwitcher className="scale-90" />

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 text-muted-theme hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-[background-color,border-color,transform] duration-200 cursor-pointer border border-border-theme dark:border-border-theme/50 shadow-sm bg-white dark:bg-transparent"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
          </button>

          <div className="relative group/user cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-white font-black text-xs shadow-xl shadow-primary/20 border-2 border-white dark:border-slate-800 transition-all group-hover:scale-105 group-hover:-rotate-3 translate-y-0 hover:-translate-y-0.5">
              GS
            </div>
            <div className={cn(
              "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm",
              role === 'admin' ? "bg-primary shadow-[0_0_8px_var(--color-primary)]" : "bg-warning shadow-[0_0_8px_var(--color-warning)]"
            )} />
          </div>
        </div>
      </div>
    </header>
  );
};
