import svgX from "../../../../components/markup/svgX";

const structCloseButton = async () => {
  const btn = document.createElement("button");
  btn.innerHTML = svgX;
  btn.addEventListener("click", async () => {
    btn.closest("view-menu").classList.remove("open");
  });
  return btn;
};

export default structCloseButton;
