import structHeader from "./MenuHeader/HeaderConstructor";
import structMain from "./MenuMain/MainConstructor";
import structFooter from "./MenuFooter/FooterConstructor";

const header = structHeader();
const main = structMain();
const footer = structFooter();

const structMenu = async () => {
  const menu = document.createElement("view-menu");
  menu.appendChild(await header);
  menu.appendChild(await main);
  menu.appendChild(await footer);
  return menu;
};

export default structMenu;
