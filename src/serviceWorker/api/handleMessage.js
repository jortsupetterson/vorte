import resourceForRender from "./handlers/resourceForRender";

const handlers = {
  resourceForRender,
};
const handleMessage = async (data) => {
  handlers[data.name](data.params);
};
export default handleMessage;
