import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { mockTransactions } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- State ---
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('money-nest-transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('money-nest-role') || 'admin'; // Defaulting to Admin for the assignment display
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('money-nest-dark-mode') === 'true';
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('money-nest-currency') || 'INR';
  });

  const [savingsGoal, setSavingsGoal] = useState(() => {
    const saved = localStorage.getItem('money-nest-savings-goal');
    return saved ? JSON.parse(saved) : {
      title: "New Home Deposit",
      target: 500000,
      current: 41715
    };
  });

  const exchangeRates = {
    INR: 1,
    USD: 0.012
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortOption, setSortOption] = useState('Newest');

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('money-nest-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('money-nest-role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('money-nest-currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('money-nest-savings-goal', JSON.stringify(savingsGoal));
  }, [savingsGoal]);

  useEffect(() => {
    localStorage.setItem('money-nest-dark-mode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- Computed Stats ---
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;

    return { income, expenses, balance };
  }, [transactions]);

  // --- Transactions Actions ---
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `t${Date.now()}`,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSavingsGoal = (newGoal) => {
    setSavingsGoal(prev => ({ ...prev, ...newGoal }));
  };

  // --- Filtering Logic ---
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter((t) => {
      const matchesSearch =
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'All' || t.type === filterType.toLowerCase();
      return matchesSearch && matchesType;
    });

    if (sortOption === 'Newest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'Oldest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'Highest') {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortOption === 'Lowest') {
      result.sort((a, b) => a.amount - b.amount);
    }

    return result;
  }, [transactions, searchQuery, filterType, sortOption]);

  const value = {
    transactions,
    filteredTransactions,
    stats,
    role,
    setRole,
    isDarkMode,
    setIsDarkMode,
    currency,
    setCurrency,
    exchangeRates,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    sortOption,
    setSortOption,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    savingsGoal,
    updateSavingsGoal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
