export default (viewName) => {
  const cut = viewName.indexOf("_");
  return cut === -1 ? viewName : viewName.slice(0, cut);
};
