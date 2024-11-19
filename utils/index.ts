export const isClient = typeof window !== 'undefined';

export const noop = () => {};

export const formatCurrency = (value: string) => `₹${value}`;
