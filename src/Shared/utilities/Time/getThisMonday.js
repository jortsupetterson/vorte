import { DAY_MS } from "../../CONFIG.js";

export default (d) => {
  const time = d.getTime();
  const utcMidnight = time - (((time % DAY_MS) + DAY_MS) % DAY_MS);
  const offsetDays = (d.getUTCDay() + 6) % 7;
  return new Date(utcMidnight - offsetDays * DAY_MS);
};
