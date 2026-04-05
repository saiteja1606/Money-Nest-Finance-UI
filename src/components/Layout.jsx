import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAppContext } from '../context/AppContext';
import { AlertCircle } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

export const Layout = ({ children, modals }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role } = useAppContext();

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-64 flex flex-col min-h-screen relative">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              transition={{ 
                duration: 0.6, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {modals}
        
        {/* Subtle Background Glows */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 left-64 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      </div>
    </div>
  );
};
