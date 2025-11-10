const MS_PER_DAY = 86400000;
export default (date) => {
  const y = date.getUTCFullYear(),
    m = date.getUTCMonth(),
    d0 = date.getUTCDate();
  const d = new Date(Date.UTC(y, m, d0));
  const dow = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dow);
  const yearStartMs = Date.UTC(d.getUTCFullYear(), 0, 1);
  return Math.floor(((+d - yearStartMs) / MS_PER_DAY + 7) / 7);
};
