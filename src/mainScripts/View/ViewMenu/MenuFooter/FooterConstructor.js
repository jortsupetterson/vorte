import structMascot from "./Mascot/MascotConstructor";

const mascot = structMascot();
const structFooter = async () => {
  const footer = document.createElement("footer");
  footer.appendChild(await mascot);
  return footer;
};
export default structFooter;
