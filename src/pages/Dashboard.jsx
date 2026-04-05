import React, { useState } from 'react';
import { 
  SummaryCard, 
  TransactionTable, 
  TransactionModal, 
  Layout, 
  InsightCard,
  EmptyState,
  VirtualCard,
  SavingsGoal,
  QuickActions,
  GoalModal
} from '../components';
import { BalanceTrendChart } from '../components/charts/BalanceTrendChart';
import { SpendingPieChart } from '../components/charts/SpendingPieChart';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles, TrendingUp, AlertCircle, Calendar, Zap, ArrowRight, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Dashboard = () => {
  const { stats, transactions, role, currency, exchangeRates } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleEdit = (transaction) => {
    if (role !== 'admin') return;
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    if (role !== 'admin') return;
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  if (transactions.length === 0) {
    return (
      <Layout>
        <EmptyState 
          title="No Transactions Found" 
          message="Your account is active. Add your first transaction to start tracking your finances."
          onAction={handleAdd}
        />
        <TransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          editingTransaction={editingTransaction}
        />
      </Layout>
    );
  }

  return (
    <Layout
      modals={
        <>
          <TransactionModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            editingTransaction={editingTransaction}
          />

          <GoalModal 
            isOpen={isGoalModalOpen}
            onClose={() => setIsGoalModalOpen(false)}
          />
        </>
      }
    >
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-10 pb-12"
      >
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
          <div className="space-y-1.5">
            <motion.h1 variants={item} className="text-3xl sm:text-4xl font-black text-text-theme tracking-tighter leading-none">
              Financial <span className="text-primary italic">Overview</span>
            </motion.h1>
            <div className="flex items-center gap-3 mt-1.5 sm:mt-2">
              <motion.p variants={item} className="text-muted-theme text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.3em] flex items-center gap-1.5 sm:gap-2 opacity-80">
                <Sparkles className="text-primary animate-pulse shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="leading-relaxed whitespace-nowrap">
                  <span className="hidden sm:inline">Real-time Transactions • </span>
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </motion.p>
              <div className="hidden sm:block h-4 w-[1px] bg-border-theme opacity-30" />
              <div className="hidden sm:flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-income animate-pulse shadow-[0_0_8px_var(--color-income)] shrink-0" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-income opacity-80">Live Account</span>
              </div>
            </div>
          </div>
          
          <motion.div variants={item} className="hidden sm:flex items-center gap-4">
             <div className="flex -space-x-3 pr-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black overflow-hidden shadow-md group cursor-pointer hover:z-30 transition-transform duration-200">
                    <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" className="group-hover:scale-110 transition-transform duration-200" />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-slate-900 bg-linear-to-tr from-primary/20 to-secondary/20 text-primary flex items-center justify-center text-[8px] font-black shadow-md">
                  +12
                </div>
             </div>
             <div className="h-10 w-[1px] bg-border-theme opacity-30 mx-1" />
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-theme leading-none">Account Synced</p>
                <p className="text-[8px] font-bold text-muted-theme mt-1 opacity-40">Stable Connection</p>
             </div>
          </motion.div>
        </div>

        {/* Level 1: Core Assets */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch pt-2 sm:pt-0">
          <motion.div variants={item} className="xl:col-span-4 flex justify-start">
            <div className="w-full max-w-sm">
              <VirtualCard />
            </div>
          </motion.div>
          
          <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={item} className="sm:col-span-2 lg:col-span-1">
              <SummaryCard 
                title="Total Balance" 
                amount={stats.balance} 
                icon="Wallet" 
                trend={12.5} 
                type="balance"
              />
            </motion.div>
            <motion.div variants={item}>
              <SummaryCard 
                title="Total Income" 
                amount={stats.income} 
                icon="TrendingUp" 
                trend={8.2} 
                type="income"
              />
            </motion.div>
            <motion.div variants={item}>
              <SummaryCard 
                title="Total Expenses" 
                amount={stats.expenses} 
                icon="TrendingDown" 
                trend={-4.3} 
                type="expense"
              />
            </motion.div>
          </div>
        </div>

        {/* Level 2: Real-time Dynamics & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div variants={item} className="lg:col-span-8 glass-card p-4 sm:p-8 rounded-[2.5rem] border-white/5 shadow-premium overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-black text-text-theme tracking-tighter">Balance <span className="text-primary">Trends</span></h3>
                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-theme mt-1 opacity-70">
                  {timeRange === 'monthly' ? '6-Month Spending History' : 'Current Week Overview'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-border-theme w-fit scale-90 sm:scale-100">
                <button 
                  onClick={() => setTimeRange('monthly')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-[background-color,color,box-shadow] duration-200",
                    timeRange === 'monthly' 
                      ? "bg-white dark:bg-slate-700 shadow-md text-text-theme" 
                      : "text-muted-theme hover:text-text-theme"
                  )}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setTimeRange('weekly')}
                  className={cn(
                    "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-[background-color,color,box-shadow] duration-200",
                    timeRange === 'weekly' 
                      ? "bg-white dark:bg-slate-700 shadow-md text-text-theme" 
                      : "text-muted-theme hover:text-text-theme"
                  )}
                >
                  Weekly
                </button>
              </div>
            </div>
            <div className="h-[300px] sm:h-[350px]">
              <BalanceTrendChart range={timeRange} />
            </div>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-4">
            <QuickActions onAddTransaction={handleAdd} />
          </motion.div>
        </div>

        {/* Level 3: Allocation, Goals & Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <motion.div variants={item}>
              <div className="glass-card p-8 rounded-[2.5rem] border-white/5 shadow-premium h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-text-theme tracking-tighter">Spending Categories</h3>
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-theme mt-1 opacity-70">Category Breakdown</p>
                </div>
                <div className="h-[280px]">
                  <SpendingPieChart />
                </div>
              </div>
           </motion.div>

           <motion.div variants={item}>
              <SavingsGoal onAdjust={() => setIsGoalModalOpen(true)} />
           </motion.div>

           <motion.div variants={item} className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-theme opacity-70">Spending Insights</h3>
                <Sparkles size={16} className="text-primary animate-pulse" />
              </div>
              <div className="space-y-4">
                <InsightCard 
                  title="Spending Alert" 
                  description="Your spending in 'Food' is 15% higher. Check our local food guide."
                  details="Analysis of your recent transactions shows a spike in restaurant dining over the last 14 days."
                  type="warning"
                  icon={AlertCircle}
                />
                <InsightCard 
                  title="Goal Strategy" 
                  description="You've maintained a 20% savings rate this month."
                  details={`By maintaining this velocity, you will reach your ${formatCurrency(10000 * exchangeRates[currency], currency)} emergency fund target by August 2026.`}
                  type="success"
                  icon={TrendingUp}
                />
              </div>
           </motion.div>
        </div>

        {/* Level 4: Ledger Entry Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-theme opacity-60">Recent Activity</h3>
            </div>
            <button 
              onClick={() => navigate('/transactions')}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-primary/70 transition-[color,transform] duration-200 flex items-center gap-2 group cursor-pointer"
            >
              View All Transactions
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          <motion.div variants={item} className="min-h-[300px]">
            <TransactionTable onEdit={handleEdit} limit={3} />
          </motion.div>
        </div>
      </motion.div>

    </Layout>
  );
};

export default Dashboard;
