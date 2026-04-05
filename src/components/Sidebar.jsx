import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ReceiptText, 
  PieChart as PieChartIcon, 
  Settings, 
  LogOut,
  Wallet,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CurrencySwitcher } from './CurrencySwitcher';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const cn = (...inputs) => twMerge(clsx(inputs));

export const Sidebar = ({ isOpen, onClose }) => {
  const { role, isDarkMode, setIsDarkMode } = useAppContext();
  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Transactions', icon: ReceiptText, path: '/transactions' },
    { title: 'Insights', icon: PieChartIcon, path: '/insights' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-sidebar-theme z-[70] transition-[transform,background-color] duration-200 ease-in-out flex flex-col border-r border-border-theme shadow-lg",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-11 h-11 premium-gradient-primary rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
              <Wallet size={24} className="group-hover:animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black text-text-theme tracking-tighter leading-none">
                Money <span className="text-primary italic">Nest</span>
              </h1>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-theme opacity-40 mt-1">Personal Finance</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-muted-theme hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-all">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-5 py-4 space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={() => onClose && onClose()}
              className={({ isActive }) => cn(
                "w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all group relative overflow-hidden",
                isActive 
                  ? "bg-white dark:bg-primary/10 text-primary shadow-sm dark:shadow-none border border-border-theme/50 dark:border-transparent" 
                  : "text-muted-theme hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:text-text-theme"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-full shadow-[0_0_12px_var(--color-primary)]" 
                    />
                  )}
                  <item.icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "text-primary" : "opacity-60 group-hover:opacity-100")} />
                  <span className="tracking-tight">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-border-theme space-y-5">
          <div className="sm:hidden w-full mb-4">
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-theme opacity-50 mb-3 px-1">Preferences</h4>
            <div className="bg-slate-50/50 dark:bg-white/[0.02] p-3.5 rounded-[1.25rem] border border-border-theme/50 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-text-theme opacity-80 uppercase tracking-widest">Currency</span>
                <CurrencySwitcher className="origin-left" />
              </div>
              <div className="h-[1px] w-full bg-border-theme/50" />
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-text-theme opacity-80 uppercase tracking-widest">Theme</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center gap-2.5 px-3 py-2 text-muted-theme hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 cursor-pointer border border-border-theme/50 dark:border-border-theme/30 shadow-sm bg-white dark:bg-transparent w-full"
                >
                  {isDarkMode ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} />}
                  <span className="text-[9px] font-black uppercase tracking-[0.1em] text-text-theme leading-none mt-0.5">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 px-2 py-4 rounded-[1.5rem] bg-slate-50/50 dark:bg-white/[0.02] border border-border-theme/50 relative group/profile cursor-pointer hover:border-primary/20 transition-all">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-white text-base font-black shadow-lg relative overflow-hidden group-hover/profile:rotate-3 transition-transform">
                ST
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 shadow-md",
                role === 'admin' ? "bg-primary" : "bg-warning"
              )} />
            </div>
            <div className="overflow-hidden min-w-0">
              <h3 className="font-extrabold text-text-theme truncate text-sm tracking-tight">Sai Teja</h3>
              <p className={cn(
                "text-[9px] font-black uppercase tracking-[0.15em] mt-0.5",
                role === 'admin' ? "text-primary" : "text-warning"
              )}>
                {role === 'admin' ? 'Administrator' : role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
            </div>
          </div>

          <button className="w-full flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-[13px] font-bold text-muted-theme hover:bg-red-500/5 hover:text-red-500 transition-all group cursor-pointer border border-transparent hover:border-red-500/10">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="tracking-tight">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
