export default () => {
  const item = wheelItems.shift();
  item.remove();

  const last = wheelItems[wheelItems.length - 1];
  const lastMonthNum = Number(last.dataset.monthNum);
  const nextMonthNum = (lastMonthNum + 1) % 12;

  item.dataset.monthNum = String(nextMonthNum);
  item.textContent = jsonTable["jsonMonths"][nextMonthNum][DOC.lang];

  wheel.insertBefore(item, wheel.lastChild);
  wheelItems.push(item);
};
