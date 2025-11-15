import jsonTable from "../../markup/jsonTable";
import getThisMonday from "./getThisMonday";
import getWeekNumber from "./weekNumberFromDate";

export default (anchorDate, language) => {
  const year = anchorDate.getFullYear();
  const month = anchorDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const start = (firstDay.getDay() + 6) % 7;

  const daysThis = new Date(year, month + 1, 0).getDate();
  const daysPrev = new Date(year, month, 0).getDate();

  const cells = new Array(42);
  for (let cellIndex = 0; cellIndex < 42; cellIndex++) {
    const day = cellIndex - start + 1;
    cells[cellIndex] =
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
  for (let colIndex = 0; colIndex < 7; colIndex++) {
    head[colIndex + 1] = labels[colIndex];
  }
  table[0] = head;

  let currentMonday = getThisMonday(firstDay);

  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    if (weekIndex > 0) {
      currentMonday.setUTCDate(currentMonday.getUTCDate() + 7);
    }

    const rowArray = new Array(8);
    rowArray[0] = {
      date: new Date(currentMonday).toISOString().slice(0, 10),
      number: getWeekNumber(currentMonday),
    };

    const base = weekIndex * 7;
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      rowArray[dayIndex + 1] = cells[base + dayIndex];
    }

    table[weekIndex + 1] = rowArray;
  }

  return table;
};
