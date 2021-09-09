export const formatCommas = (n?: number): string =>
  Math.round(n || 0).toLocaleString();
