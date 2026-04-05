import React, { useState } from 'react';
import { Layout, TransactionTable, TransactionModal } from '../components';
import { useAppContext } from '../context/AppContext';
import { Search, Plus, Filter, ArrowUpDown, ReceiptText } from 'lucide-react';
import { motion } from 'framer-motion';

const TransactionsPage = () => {
  const { role, transactions } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <Layout
      modals={
        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          editingTransaction={editingTransaction}
        />
      }
    >
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                <ReceiptText size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-theme tracking-tighter leading-none">
                Transaction <span className="text-primary italic">History</span>
              </h1>
            </div>
            <p className="text-muted-theme text-[10px] font-black uppercase tracking-[0.3em] mt-1 opacity-60 flex items-center gap-2">
              Secure Ledger Access • Last synced: Just now
            </p>
          </div>
          
          {role === 'admin' && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className="w-full md:w-auto px-10 py-4 premium-gradient-primary text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              Add Transaction
            </motion.button>
          )}
        </div>

        {/* Premium Mini Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 sm:p-4 glass-card border-white/5 shadow-premium">
           <div className="p-4 border-r border-border-theme/50 last:border-none">
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Total Logs</p>
              <p className="text-xl font-black text-text-theme tracking-tighter font-mono">{transactions.length}</p>
           </div>
           <div className="p-4 border-r border-border-theme/50 last:border-none">
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Sync Latency</p>
              <p className="text-xl font-black text-income tracking-tighter font-mono">0.12ms</p>
           </div>
           <div className="p-4 border-r border-border-theme/50 last:border-none">
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Authorization</p>
              <p className="text-xl font-black text-primary tracking-tighter font-mono">Tier-1</p>
           </div>
           <div className="p-4 last:border-none">
              <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Integrity</p>
              <p className="text-xl font-black text-warning tracking-tighter font-mono">99.9%</p>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="flex items-center gap-3 px-2 mb-4">
             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-theme opacity-40">System Record Output</h3>
          </div>
          <TransactionTable onEdit={handleEdit} />
        </motion.div>
      </div>

    </Layout>
  );
};

export default TransactionsPage;
