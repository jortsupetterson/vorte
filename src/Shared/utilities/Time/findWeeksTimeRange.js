import findDaysTimeRange from "./findDaysTimeRange";

export default (event_list) => {
  let min = Infinity;
  let max = -Infinity;

  for (const key of Object.keys(event_list)) {
    const events = event_list[key];
    if (!events || events.length === 0) continue;

    const day = findDaysTimeRange(events);

    if (day.overflow > 0) return { min: 0, max: MINUTES_PER_DAY };
    if (day.min < min) min = day.min;
    if (day.max > max) max = day.max;
  }

  return { min, max };
};
import { MINUTES_PER_DAY } from "../../SAVINGS";
