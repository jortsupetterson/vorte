import jsonTable from "../markup/jsonTable";
import getWeekNum from "./getWeekNum";
export default (anchor_date, language) => {
  const year = anchor_date.getFullYear();
  const month = anchor_date.getMonth();
  const firstDay = new Date(year, month, 1);
  const start = (firstDay.getDay() + 6) % 7;
  const daysThis = new Date(year, month + 1, 0).getDate();
  const daysPrev = new Date(year, month, 0).getDate();

  const cells = new Array(42);
  for (let i = 0; i < 42; i++) {
    const day = i - start + 1;
    cells[i] =
      day < 1
        ? { d: daysPrev + day, type: "prev" }
        : day > daysThis
        ? { d: day - daysThis, type: "next" }
        : { d: day, type: "curr" };
  }

  const table = new Array(7);

  const head = new Array(8);
  head[0] = null;
  const labels = jsonTable["jsonWeekdayAbbrevations"][language];
  for (let c = 0; c < 7; c++) head[c + 1] = labels[c];
  table[0] = head;

  for (let r = 0; r < 6; r++) {
    const row = new Array(8);
    const monday = new Date(year, month, 1 - start + r * 7);
    row[0] = getWeekNum(monday);
    const base = r * 7;
    for (let c = 0; c < 7; c++) row[c + 1] = cells[base + c];
    table[r + 1] = row;
  }
  return table;
};
