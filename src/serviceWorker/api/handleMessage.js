import sendResourceForRender from "./handlers/sendResourceForRender";

const handlers = {
  sendResourceForRender,
};
const handleMessage = async (data) => {
  handlers[data.name](data.params);
};
export default handleMessage;
