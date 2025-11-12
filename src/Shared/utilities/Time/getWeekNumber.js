import { DAY_MS } from "../../CONFIG";

export default (d) => {
  const y = d.getUTCFullYear();
  const t = Date.UTC(y, d.getUTCMonth(), d.getUTCDate());
  const doy = (((t - Date.UTC(y, 0, 1)) / DAY_MS) | 0) + 1;
  const w = ((d.getUTCDay() + 6) % 7) + 1;
  let week = ((doy - w + 10) / 7) | 0;
  let isoY = y;

  if (week < 1) {
    isoY = y - 1;
    week = weeksInYear(isoY);
  } else if (week > weeksInYear(y)) {
    isoY = y + 1;
    week = 1;
  }

  return week;
};

const weeksInYear = (y) => {
  const jan1 = ((((Date.UTC(y, 0, 1) / DAY_MS) | 0) + 3) % 7) + 1;
  const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  return jan1 === 4 || (leap && jan1 === 3) ? 53 : 52;
};
