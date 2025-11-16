export const EMPTY_LIST = [];
export const EMPTY_OBJ = {};
export const MINUTES_PER_DAY = 1440;
export const MINUTES_PER_3_HOURS = 180;
export const DAY_MS = 86400000;
export const WEEKS_IN_YEAR = (y) => {
  const jan1 = ((((Date.UTC(y, 0, 1) / DAY_MS) | 0) + 3) % 7) + 1;
  const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  return jan1 === 4 || (leap && jan1 === 3) ? 53 : 52;
};
export const DOC =
  typeof document === "undefined" ? null : document.documentElement;
