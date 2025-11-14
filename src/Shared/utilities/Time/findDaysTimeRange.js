export default (events) => {
  let overflow = 0;
  let min = Infinity;
  let max = -Infinity;

  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    const date = new Date(event.starts_at);

    const startMinutes = date.getHours() * 60 + date.getMinutes();
    const endMinutes = startMinutes + event.duration_minutes;

    if (startMinutes < min) min = startMinutes;
    if (endMinutes > max) max = endMinutes;
  }

  if (max > MINUTES_PER_DAY) {
    overflow = max - MINUTES_PER_DAY;
    max = MINUTES_PER_DAY;
  }
  return { min, max, overflow };
};
import { MINUTES_PER_DAY } from "../../SAVINGS";
