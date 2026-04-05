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
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-sm">
                <PieChartIcon size={24} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-text-theme tracking-tighter leading-none">
                Financial <span className="text-secondary italic">Insights</span>
              </h1>
            </div>
            <p className="text-muted-theme text-[10px] font-black uppercase tracking-[0.3em] mt-1 opacity-60 flex items-center gap-2">
              AI-powered Analysis • Forecast Reliability: High
            </p>
          </div>
        </div>

        {/* Intelligence Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <div className="glass-card p-6 border-white/5 shadow-premium flex items-center gap-5 scale-100 hover:scale-[1.02] transition-transform duration-500">
              <div className="w-12 h-12 rounded-2xl bg-income/10 flex items-center justify-center text-income shadow-inner">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Savings Growth</p>
                <p className="text-xl font-black text-text-theme tracking-tighter">+22.4% <span className="text-[10px] text-income">↑</span></p>
              </div>
           </div>
           <div className="glass-card p-6 border-white/5 shadow-premium flex items-center gap-5 scale-100 hover:scale-[1.02] transition-transform duration-500">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Sparkles size={24} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Suggested Action</p>
                <p className="text-xl font-black text-text-theme tracking-tighter">Diversify Portfolio</p>
              </div>
           </div>
           <div className="glass-card p-6 border-white/5 shadow-premium flex items-center gap-5 scale-100 hover:scale-[1.02] transition-transform duration-500">
              <div className="w-12 h-12 rounded-2xl bg-expense/10 flex items-center justify-center text-expense shadow-inner">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-theme opacity-40 mb-1">Risk Level</p>
                <p className="text-xl font-black text-text-theme tracking-tighter">Minimal Risk</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            className="glass-card p-8 border-white/5 shadow-premium relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="mb-6 relative z-10">
              <h3 className="text-xl font-black text-text-theme tracking-tighter">Spending Categories</h3>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-theme mt-1 opacity-50">Category Breakdown</p>
            </div>
            <div className="h-[300px] relative z-10">
              <SpendingPieChart />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            className="glass-card p-8 border-white/5 shadow-premium relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="mb-6 relative z-10">
              <h3 className="text-xl font-black text-text-theme tracking-tighter">Historical Trends</h3>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-theme mt-1 opacity-50">6-Month Cash Flow</p>
            </div>
            <div className="h-[300px] relative z-10">
              <BalanceTrendChart />
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
             <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_var(--color-secondary)]" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-theme opacity-40">Insights Feed</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Spending Alert", desc: "Your 'Food' category is 15% higher this month.", details: `Recent transactions at 'The Grill House' and 'Sushi Zen' have increased your dining costs by ${formatCurrency(180 * exchangeRates[currency], currency)}.`, type: "warning", icon: AlertCircle },
              { title: "Saving Milestone", desc: `You've saved ${formatCurrency(1200 * exchangeRates[currency], currency)} more compared to February.`, details: "Reduced travel and shopping expenses this month have accelerated your savings by 22%.", type: "success", icon: Sparkles },
              { title: "Market Update", desc: "Market trends suggest exploring index funds.", details: "Diversification into S&P 500 ETFs could lower your portfolio volatility by 12%.", type: "info", icon: TrendingUp },
              { title: "Subscription Check", desc: "You have 5 active recurring payments.", details: "Your subscriptions include Netflix, Spotify, AWS, and two gym memberships.", type: "info", icon: Sparkles },
              { title: "Freelance Income", desc: "Your freelance income is up 20% this quarter.", details: "The 'UX Audit' project delivery in March contributed significantly to this growth.", type: "success", icon: TrendingUp }
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
