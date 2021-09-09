export function findIndexOfAttr(
  array: any[],
  attr: string,
  value: any
): number {
  if (!array?.length) {
    return -1;
  }
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}
