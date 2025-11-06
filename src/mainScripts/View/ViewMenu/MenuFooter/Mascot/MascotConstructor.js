const structMascot = async () => {
  const mascotEl = document.createElement("img");
  mascotEl.src = `/images/${app.mascot.name}`;
  app.mascot.element = mascotEl;
  return mascotEl;
};

export default structMascot;
