import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Toast } from './Toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const RoleSwitcher = ({ className }) => {
  const { role, setRole } = useAppContext();
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  const handleRoleSwitch = (newRole) => {
    if (role !== newRole) {
      setRole(newRole);
      setToast({ 
        isVisible: true, 
        message: `Switched to ${newRole === 'admin' ? 'Administrator' : 'Viewer'} Role`, 
        type: newRole 
      });
    }
  };

  return (
    <>
      <div className={cn(
        "flex items-center bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl backdrop-blur-sm border border-border-theme",
        className
      )}>
        <button
          onClick={() => handleRoleSwitch('viewer')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer",
            role === 'viewer'
              ? "bg-white dark:bg-slate-700 text-text-theme shadow-premium"
              : "text-muted-theme hover:text-slate-600 dark:hover:text-slate-300"
          )}
        >
          <Eye size={14} className="opacity-70" />
          <span>Viewer</span>
        </button>
        <button
          onClick={() => handleRoleSwitch('admin')}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer",
            role === 'admin'
              ? "bg-white dark:bg-slate-700 text-text-theme shadow-premium"
              : "text-muted-theme hover:text-slate-600 dark:hover:text-slate-300"
          )}
        >
          <ShieldCheck size={14} className="opacity-70" />
          <span>Admin</span>
        </button>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <Toast 
          isVisible={toast.isVisible} 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
        />,
        document.body
      )}
    </>
  );
};
