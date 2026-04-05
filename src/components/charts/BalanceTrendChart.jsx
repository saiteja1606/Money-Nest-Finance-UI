import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { chartData, weeklyChartData } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';
import { useAppContext } from '../../context/AppContext';

const CustomTooltip = ({ active, payload, label, currency, exchangeRates }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 min-w-[180px] animate-in fade-in zoom-in-95 duration-200">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/50 mb-3">{label} Analysis</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-6">
            <span className="text-[11px] font-bold text-slate-600 dark:text-white/70">Income</span>
            <span className="font-mono text-xs font-black text-income tabular-nums">{formatCurrency(payload[0].value * exchangeRates[currency], currency)}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[11px] font-bold text-slate-600 dark:text-white/70">Expenses</span>
            <span className="font-mono text-xs font-black text-expense tabular-nums">{formatCurrency(payload[1].value * exchangeRates[currency], currency)}</span>
          </div>
          <div className="h-[1px] bg-slate-100 dark:bg-white/5 my-1" />
          <div className="flex items-center justify-between gap-6">
            <span className="text-[11px] font-black uppercase tracking-widest text-primary">Balance</span>
            <span className="font-mono text-sm font-black text-slate-900 dark:text-white tabular-nums">{formatCurrency(payload[2].value * exchangeRates[currency], currency)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const BalanceTrendChart = ({ range = 'monthly' }) => {
  const { currency, exchangeRates } = useAppContext();
  const [key, setKey] = React.useState(0);
  const data = range === 'monthly' ? chartData : weeklyChartData;

  React.useEffect(() => {
    const handleResize = () => setKey(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full min-h-[250px] relative group/chart">
      <ResponsiveContainer width="100%" height="100%" key={`${range}-${key}`}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="4 4" 
            vertical={false} 
            stroke="currentColor" 
            className="text-slate-200 dark:text-slate-800" 
            opacity={0.6} 
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: 'currentColor', fontWeight: 700, opacity: 0.5 }}
            dy={15}
            className="text-muted-theme"
          />
          <YAxis 
            hide
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip 
            content={<CustomTooltip currency={currency} exchangeRates={exchangeRates} />} 
            cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4', className: 'text-primary' }}
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            stroke="hsl(142, 71%, 45%)" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#colorIncome)" 
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            stroke="hsl(0, 84%, 60%)" 
            strokeWidth={2.5}
            fillOpacity={1} 
            fill="url(#colorExpense)" 
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="hsl(221, 83%, 53%)" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
