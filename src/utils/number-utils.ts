export const formatCommas = (n: number): string =>
  parseFloat(stableToFixed(n, 2)).toLocaleString();

// Fix for inconsistent rounding using normal toFixed
// https://stackoverflow.com/a/23560569
export function stableToFixed(num: number, precision: number): string {
  return (+`${Math.round(+`${num}e${precision}`)}e${-precision}`).toFixed(
    precision
  );
}
