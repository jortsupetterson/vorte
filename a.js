const d = { s: 6.0, e: 21.0 },
  ev = getFromTill(eventList);
const s = Math.min(d.s, ev.s),
  e = Math.max(d.e, ev.e);
const length = Math.ceil(e - s);
