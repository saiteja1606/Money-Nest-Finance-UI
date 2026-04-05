import React from 'react';
import { Layout, InsightCard } from '../components';
import { BalanceTrendChart } from '../components/charts/BalanceTrendChart';
import { SpendingPieChart } from '../components/charts/SpendingPieChart';
import { Sparkles, TrendingUp, AlertCircle, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/helpers';

const InsightsPage = () => {
  const { currency, exchangeRates } = useAppContext();
  return (
    <Layout>
      <div className="space-y-8 sm:space-y-10 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 pb-6 border-b border-border-theme/50 sm:border-transparent">
          <div className="space-y-1 text-center sm:text-left flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-sm shrink-0">
                <PieChartIcon size={18} className="sm:hidden" />
                <PieChartIcon size={24} className="hidden sm:block" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-text-theme tracking-tighter leading-tight sm:leading-none">
                Financial <span className="text-secondary italic">Insights</span>
              </h1>
            </div>
            <p className="text-muted-theme text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.3em] mt-3 sm:mt-1 opacity-50 flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2">
              <span>AI-powered Analysis</span> <span className="hidden sm:inline">•</span> <span>Forecast Reliability: High</span>
            </p>
          </div>
        </div>

        {/* Intelligence Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 px-1 sm:px-0">
           <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-[2rem] border-border-theme/30 sm:border-white/5 shadow-sm sm:shadow-premium flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 transition-transform duration-500">
              <div className="w-12 h-12 rounded-2xl bg-income/10 flex items-center justify-center text-income shadow-inner">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Savings Growth</p>
                <p className="text-xl font-black text-text-theme tracking-tighter">+22.4% <span className="text-[10px] text-income">↑</span></p>
              </div>
           </div>
           <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-[2rem] border-border-theme/30 sm:border-white/5 shadow-sm sm:shadow-premium flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 transition-transform duration-500">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Suggested Action</p>
                <p className="text-xl font-black text-text-theme tracking-tighter">Diversify Portfolio</p>
              </div>
           </div>
           <div className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-[2rem] border-border-theme/30 sm:border-white/5 shadow-sm sm:shadow-premium flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 transition-transform duration-500">
              <div className="w-12 h-12 rounded-2xl bg-expense/10 flex items-center justify-center text-expense shadow-inner">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Risk Level</p>
                <p className="text-xl font-black text-text-theme tracking-tighter">Minimal Risk</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 overflow-hidden sm:overflow-visible px-1 sm:px-0">
          <motion.div 
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            className="glass-card p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-border-theme/30 sm:border-white/5 shadow-sm sm:shadow-premium relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="mb-4 sm:mb-6 relative z-10">
              <h3 className="text-lg sm:text-xl font-black text-text-theme tracking-tighter">Spending Categories</h3>
              <p className="text-[8px] sm:text-[10px] uppercase font-bold sm:font-black tracking-widest sm:tracking-[0.2em] text-muted-theme mt-1 opacity-40">Category Breakdown</p>
            </div>
            <div className="h-[300px] relative z-10">
              <SpendingPieChart />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            className="glass-card p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-border-theme/30 sm:border-white/5 shadow-sm sm:shadow-premium relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="mb-4 sm:mb-6 relative z-10">
              <h3 className="text-lg sm:text-xl font-black text-text-theme tracking-tighter">Historical Trends</h3>
              <p className="text-[8px] sm:text-[10px] uppercase font-bold sm:font-black tracking-widest sm:tracking-[0.2em] text-muted-theme mt-1 opacity-40">6-Month Cash Flow</p>
            </div>
            <div className="h-[300px] relative z-10">
              <BalanceTrendChart />
            </div>
          </motion.div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 px-3 sm:px-2 pt-4 border-t border-border-theme/30 sm:pt-0 sm:border-transparent">
             <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_var(--color-secondary)]" />
             <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest sm:tracking-[0.3em] text-muted-theme opacity-40">Insights Feed</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 px-1 sm:px-0">
            {[
              { title: "Spending Alert", description: "Food expenses are 18% higher than last week.", details: `Recent transactions at 'The Grill House' and 'Sushi Zen' have increased your dining costs by ${formatCurrency(180 * exchangeRates[currency], currency)}.`, type: "warning", icon: AlertCircle },
              { title: "Saving Milestone", description: "You've reached 78% of your monthly savings goal.", details: "Reduced travel and shopping expenses this month have accelerated your savings by 22%.", type: "success", icon: Sparkles },
              { title: "Market Update", description: "Your investments gained 4.2% overall this month.", details: "Diversification into S&P 500 ETFs could lower your portfolio volatility by 12%.", type: "info", icon: TrendingUp },
              { title: "Subscription Check", description: "3 recurring payments are due this week.", details: "Your upcoming subscriptions include Netflix ($15), Spotify ($10), and AWS ($25).", type: "warning", icon: AlertCircle },
              { title: "Freelance Income", description: "Your side income surged 20% this quarter.", details: "The 'UX Audit' project delivery in March contributed significantly to this growth.", type: "success", icon: TrendingUp }
            ].map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <InsightCard {...insight} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsightsPage;
