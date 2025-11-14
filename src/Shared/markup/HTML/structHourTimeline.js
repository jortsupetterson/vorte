const formatHourLabel = (stepMinutes) => {
  if (stepMinutes === MINUTES_PER_DAY) return "23.59";
  const hour = stepMinutes / 60;
  const hourText = hour.toString().padStart(2, "0");
  return `${hourText}.00`;
};

export default (startMinutes, endMinutes) => {
  let timeline = "";

  for (
    let minuteCursor = startMinutes;
    minuteCursor <= endMinutes;
    minuteCursor += MINUTES_PER_3_HOURS
  ) {
    timeline += `<span>${formatHourLabel(minuteCursor)}</span>`;
  }

  return html`<div id="hourTimeline">${timeline}</div>`;
};
import { MINUTES_PER_3_HOURS, MINUTES_PER_DAY } from "../../SAVINGS";
