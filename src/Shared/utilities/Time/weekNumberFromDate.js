import { WEEKS_IN_YEAR, DAY_MS } from "../../SAVINGS";

export default (anchorDate) => {
  const year = anchorDate.getUTCFullYear();

  const utcMidnight = Date.UTC(
    year,
    anchorDate.getUTCMonth(),
    anchorDate.getUTCDate()
  );

  const dayOfYear = (((utcMidnight - Date.UTC(year, 0, 1)) / DAY_MS) | 0) + 1;

  const isoWeekday = ((anchorDate.getUTCDay() + 6) % 7) + 1;

  let weekNumber = ((dayOfYear - isoWeekday + 10) / 7) | 0;
  let isoYear = year;

  if (weekNumber < 1) {
    isoYear = year - 1;
    weekNumber = WEEKS_IN_YEAR(isoYear);
  } else if (weekNumber > WEEKS_IN_YEAR(year)) {
    isoYear = year + 1;
    weekNumber = 1;
  }

  return weekNumber;
};
