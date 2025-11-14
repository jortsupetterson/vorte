export default (calendar, cursorDate, endDate = cursorDate) => {
  const out = {};

  while (cursorDate <= endDate) {
    const iso = cursorDate.toISOString().slice(0, 10);
    const dayNumber = cursorDate.getUTCDate();
    const events = calendar[iso];
    if (events) {
      out[dayNumber] = events;
    }
    cursorDate.setUTCDate(cursorDate.getUTCDate() + 1);
  }

  return out;
};
