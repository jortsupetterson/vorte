import DefaultView from "../components/views/default/DefaultView";
const viewMap = { default: DefaultView };

const mediaQuery = window.matchMedia("(max-width: 548px)");

const render = async (viewName) => {
  const requestedView = viewMap[viewName];

  ViewPanel.heading = requestedView.panel.heading;

  mediaQuery.matches && ViewMenu.open ? (ViewMenu.open = false) : null;
};

export default render;
