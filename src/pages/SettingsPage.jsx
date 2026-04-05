import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Layout } from '../components';
import { Toast } from '../components/Toast';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  Moon,
  Sun,
  ShieldCheck,
  Eye,
  Zap,
  Shield,
  Palette,
  Bell,
  Globe,
  User,
  Camera,
  Trash2,
  Download
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const SettingsPage = () => {
  const { role, setRole, isDarkMode, setIsDarkMode } = useAppContext();
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  const handleRoleSwitch = (newRole) => {
    if (role !== newRole) {
      setRole(newRole);
      const roleName = newRole === 'admin' ? 'Administrator' : newRole === 'user' ? 'Standard User' : 'Viewer';
      setToast({ 
        isVisible: true, 
        message: `Switched to ${roleName} Role`, 
        type: newRole 
      });
    }
  };

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
    { id: 'access', icon: Shield, label: 'Access' },
    { id: 'data', icon: Globe, label: 'Data' },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120,
        behavior: 'smooth'
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto pb-20"
      >
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-6 mb-8 sm:mb-12 px-2 pb-6 sm:pb-0 border-b border-border-theme/50 sm:border-transparent">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-black text-text-theme tracking-tighter leading-tight sm:leading-none">
              Account <span className="text-primary italic">Settings</span>
            </h1>
            <p className="text-muted-theme text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.3em] mt-3 sm:mt-2 opacity-50 flex items-center justify-center sm:justify-start gap-2 max-w-[220px] mx-auto sm:max-w-none text-center sm:text-left">
              Manage your profile, security, and preferences
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-3.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-muted-theme bg-slate-50 dark:bg-white/[0.02] sm:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer border border-border-theme/50 sm:border-transparent">
              Discard
            </button>
            <button className="flex-1 sm:flex-none px-5 sm:px-8 py-3 sm:py-3.5 premium-gradient-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl shadow-lg shadow-primary/20 transition-transform duration-200 cursor-pointer">
              Save Changes
            </button>
          </div>
        </header>

        {/* Modern Segmented Control Navigation */}
        <nav className="hidden sm:flex overflow-x-auto sticky top-24 z-40 mb-12 glass-card p-1.5 rounded-[2rem] border-white/5 items-center gap-1.5 shadow-lg backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] text-muted-theme hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:text-text-theme transition-[background-color,color] duration-200 cursor-pointer whitespace-nowrap group relative overflow-hidden"
            >
              <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-muted-theme group-hover:text-primary transition-[transform,color] duration-200 group-hover:scale-110">
                <tab.icon size={16} />
              </div>
              <span className="relative z-10">{tab.label}</span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </nav>

        {/* Settings Content - Vertical Stack */}
        <div className="space-y-6 sm:space-y-10">

          {/* Profile Section */}
          <motion.section id="profile" variants={item} className="p-5 sm:p-8 glass-card rounded-[1.5rem] sm:rounded-[2rem] border-white/5 space-y-6 sm:space-y-8 scroll-mt-32 relative overflow-hidden group/section">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-24 -mt-24 blur-3xl group-hover/section:bg-primary/10 transition-colors duration-200" />

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left relative z-10">
              <div className="relative group/avatar shrink-0 mb-2 sm:mb-0">
                <div className="w-24 h-24 sm:w-24 sm:h-24 rounded-full sm:rounded-[1.75rem] bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-xl shadow-primary/10 relative overflow-hidden transition-transform duration-200 group-hover/avatar:rotate-6 border-4 border-white dark:border-slate-800/50">
                  ST
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200" />
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-800 text-primary rounded-2xl shadow-lg border border-border-theme hover:scale-110 active:scale-95 transition-[transform,background-color] duration-200 cursor-pointer z-20">
                  <Camera size={18} />
                </button>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h4 className="text-2xl sm:text-3xl font-black text-text-theme tracking-tighter">Sai Teja Gunishetti</h4>
                <p className="text-xs sm:text-sm text-muted-theme font-bold opacity-50 tracking-wide">Administrator • saiteja@moneynest.com</p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-3 sm:pt-4">
                  <span className="text-[10px] text-primary font-black uppercase tracking-[0.25em] px-5 py-2 bg-primary/10 rounded-2xl border border-primary/20 shadow-sm">Security: High</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-income animate-pulse shadow-[0_0_8px_var(--color-income)]" />
                  <span className="text-[10px] text-income font-black uppercase tracking-[0.2em] opacity-80">Online</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-border-theme/50 relative z-10">
              <div className="space-y-4 group/input">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-theme ml-1 opacity-40 group-focus-within/input:text-primary transition-colors">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30" />
                  <input type="text" defaultValue="Sai Teja Gunishetti" className="w-full bg-slate-50/50 dark:bg-slate-900/60 border border-border-theme rounded-2xl px-12 py-3.5 text-sm text-text-theme focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-hidden transition-all font-bold" />
                </div>
              </div>
              <div className="space-y-4 group/input">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-theme ml-1 opacity-40 group-focus-within/input:text-primary transition-colors">Email Address</label>
                <div className="relative">
                  <Shield size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30" />
                  <input type="email" defaultValue="saiteja@moneynest.com" className="w-full bg-slate-50/50 dark:bg-slate-900/60 border border-border-theme rounded-2xl px-12 py-3.5 text-sm text-text-theme focus:ring-4 focus:ring-primary/5 focus:border-primary/30 outline-hidden transition-[border-color,box-shadow] duration-200 font-bold" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Appearance Section */}
          <motion.section id="appearance" variants={item} className="p-5 sm:p-8 glass-card rounded-[1.5rem] sm:rounded-[2rem] border-white/5 space-y-6 sm:space-y-8 scroll-mt-32">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Palette size={26} strokeWidth={2.5} />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-text-theme tracking-tighter">Appearance</h3>
                <p className="text-[8px] sm:text-[10px] text-muted-theme font-bold sm:font-black uppercase tracking-widest sm:tracking-[0.2em] opacity-40 sm:opacity-50">Theme and visual preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { id: 'light', label: 'Light Mode', sub: 'Standard Visibility', icon: Sun, active: !isDarkMode, action: () => setIsDarkMode(false) },
                { id: 'dark', label: 'Dark Mode', sub: 'High Contrast', icon: Moon, active: isDarkMode, action: () => setIsDarkMode(true) }
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={theme.action}
                  className={cn(
                    "w-full flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border-theme/30 sm:border-border-theme transition-all group",
                    theme.active ? "bg-primary/5 border-primary/20 shadow-sm" : "hover:bg-white/[0.02]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                      theme.active ? "bg-primary text-white shadow-lg" : "bg-slate-100 dark:bg-slate-900 text-muted-theme opacity-40"
                    )}>
                      <theme.icon size={20} />
                    </div>
                    <div className="text-left">
                      <span className={cn("text-xs font-black uppercase tracking-widest block", theme.active ? "text-text-theme" : "text-muted-theme opacity-50")}>
                        {theme.label}
                      </span>
                      <span className="text-[8px] font-bold text-muted-theme opacity-30 uppercase tracking-widest">{theme.sub}</span>
                    </div>
                  </div>
                  {theme.active && <div className="w-2 h-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </motion.section>

          {/* Access Control & Data Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch font-inter">
             {/* Role Switcher */}
             <motion.section id="access" variants={item} className="p-5 sm:p-8 glass-card rounded-[1.5rem] sm:rounded-[2rem] border-white/5 space-y-6 sm:space-y-8 scroll-mt-32">
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-text-theme tracking-tighter">Access Control</h3>
                  <p className="text-[8px] sm:text-[10px] text-muted-theme font-bold sm:font-black uppercase tracking-widest sm:tracking-[0.2em] opacity-40 sm:opacity-50">Permissions and roles</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { id: 'admin', title: 'Administrator', desc: 'Full account access', icon: ShieldCheck, color: 'text-primary' },
                    { id: 'user', title: 'Standard User', desc: 'Edit and view access', icon: User, color: 'text-secondary' },
                    { id: 'viewer', title: 'Viewer', desc: 'Read-only access', icon: Eye, color: 'text-muted-theme' }
                  ].map((roleType) => (
                    <button
                      key={roleType.id}
                      onClick={() => handleRoleSwitch(roleType.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border-theme/30 sm:border-border-theme transition-all group",
                        role === roleType.id ? "bg-primary/5 border-primary/20 shadow-sm" : "hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                          role === roleType.id ? "bg-primary text-white shadow-lg" : "bg-slate-100 dark:bg-slate-900 text-muted-theme opacity-40"
                        )}>
                          <roleType.icon size={20} />
                        </div>
                        <div>
                          <span className={cn("text-xs font-black uppercase tracking-widest block", role === roleType.id ? "text-text-theme" : "text-muted-theme opacity-50")}>
                            {roleType.title}
                          </span>
                          <span className="text-[8px] font-bold text-muted-theme opacity-30 uppercase tracking-widest">{roleType.desc}</span>
                        </div>
                      </div>
                      {role === roleType.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </button>
                  ))}
                </div>
             </motion.section>

             {/* Data Integrity */}
             <motion.section id="data" variants={item} className="p-5 sm:p-8 glass-card rounded-[1.5rem] sm:rounded-[2rem] border-white/5 space-y-6 sm:space-y-8 scroll-mt-32">
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-text-theme tracking-tighter">Data Management</h3>
                  <p className="text-[8px] sm:text-[10px] text-muted-theme font-bold sm:font-black uppercase tracking-widest sm:tracking-[0.2em] opacity-40 sm:opacity-50">Export or delete your data</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border-theme/30 sm:border-border-theme hover:bg-primary/5 hover:border-primary/20 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center text-muted-theme group-hover:text-primary transition-colors">
                        <Download size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-widest text-text-theme">Export Data</p>
                        <p className="text-[8px] font-bold text-muted-theme opacity-40 mt-0.5">Download all records as JSON</p>
                      </div>
                    </div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-border-theme/30 sm:border-border-theme hover:bg-expense/5 hover:border-expense/20 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center text-muted-theme group-hover:text-expense transition-colors">
                        <Trash2 size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-widest text-text-theme">Delete Account Data</p>
                        <p className="text-[8px] font-bold text-muted-theme opacity-40 mt-0.5">Permanently remove all records</p>
                      </div>
                    </div>
                  </button>
                </div>
             </motion.section>
          </div>

          {/* Notifications Placeholder */}
          <motion.section id="notifications" variants={item} className="glass-card p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] text-center space-y-3 scroll-mt-32">
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="animate-bounce" />
            </div>
            <h3 className="text-xl font-black text-text-theme tracking-tight">Email Notifications</h3>
            <p className="text-muted-theme text-xs max-w-xs mx-auto font-medium">Notification settings are currently being developed.</p>
          </motion.section>
        </div>
      </motion.div>

      {typeof document !== 'undefined' && createPortal(
        <Toast 
          isVisible={toast.isVisible} 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
        />,
        document.body
      )}
    </Layout>
  );
};

export default SettingsPage;
