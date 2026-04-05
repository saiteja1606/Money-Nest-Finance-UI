import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { categories } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';

const CustomTooltip = ({ active, payload, currency, exchangeRates }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 min-w-[140px] animate-in fade-in zoom-in-95 duration-200">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/50 mb-2">{payload[0].name}</p>
        <p className="font-mono text-sm font-black text-slate-900 dark:text-white tabular-nums">
          {formatCurrency(payload[0].value * exchangeRates[currency], currency)}
        </p>
      </div>
    );
  }
  return null;
};

export const SpendingPieChart = () => {
  const { transactions, currency, exchangeRates } = useAppContext();
  const [key, setKey] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  React.useEffect(() => {
    const handleResize = () => setKey(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const COLORS = [
    'hsl(221, 83%, 53%)', // Primary
    'hsl(262, 83%, 58%)', // Secondary
    'hsl(142, 71%, 45%)', // Success
    'hsl(38, 92%, 50%)',  // Warning
    'hsl(199, 89%, 48%)', // Accent
    'hsl(0, 84%, 60%)'    // Danger
  ];

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-theme opacity-50 space-y-3">
        <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center">
          <span className="text-xs font-black">∅</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest italic">No expenses recorded</p>
      </div>
    );
  }

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="w-full h-full min-h-[300px] relative group/pie">
      <ResponsiveContainer width="100%" height="100%" key={key}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="85%"
            paddingAngle={8}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            stroke="none"
            animationBegin={0}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                className="transition-all duration-500 outline-none"
                style={{ 
                  filter: activeIndex === index ? `drop-shadow(0 0 12px ${COLORS[index % COLORS.length]}44)` : 'none',
                  transform: activeIndex === index ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip currency={currency} exchangeRates={exchangeRates} />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Premium Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">
          {activeIndex !== null ? data[activeIndex].name : 'Composition'}
        </span>
        <span className="text-3xl font-black text-text-theme tracking-tighter font-mono transition-all duration-500 drop-shadow-sm">
          {activeIndex !== null 
            ? formatCurrency(data[activeIndex].value * exchangeRates[currency], currency)
            : formatCurrency(totalValue * exchangeRates[currency], currency)
          }
        </span>
        {activeIndex === null && (
          <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-border-theme scale-90">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
            <span className="text-[8px] font-black uppercase tracking-widest text-muted-theme">Portfolio Active</span>
          </div>
        )}
      </div>
    </div>
  );
};
