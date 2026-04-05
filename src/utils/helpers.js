import * as LucideIcons from 'lucide-react';

/**
 * Format a number as currency (INR or USD)
 */
export const formatCurrency = (amount, currency = 'INR') => {
  const config = {
    INR: { locale: 'en-IN', currency: 'INR' },
    USD: { locale: 'en-US', currency: 'USD' }
  };
  
  const { locale, currency: currencyCode } = config[currency] || config.INR;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format a date string
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Get a Lucide icon component by name
 */
export const getIcon = (iconName) => {
  const Icon = LucideIcons[iconName];
  return Icon ? Icon : LucideIcons.HelpCircle;
};

/**
 * Calculate percentage change
 */
export const calculateTrend = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
