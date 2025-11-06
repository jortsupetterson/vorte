import structCloseButton from "./CloseMenuButton/CloseButtonConstructor";
const closeButton = structCloseButton();
const structHeader = async () => {
  const header = document.createElement("header");
  header.appendChild(await closeButton);
  return header;
};
export default structHeader;
