export default () => {
  const item = wheelItems.pop();
  item.remove();

  const first = wheelItems[0];
  const firstMonthNum = Number(first.dataset.monthNum);
  const prevMonthNum = (firstMonthNum + 11) % 12;

  item.dataset.monthNum = String(prevMonthNum);
  item.textContent = jsonTable["jsonMonths"][prevMonthNum][DOC.lang];

  wheel.insertBefore(item, wheelItems[0]);
  wheelItems.unshift(item);
};
