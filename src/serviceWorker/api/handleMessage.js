import sendResourceForRender from "./handlers/sendResourceForRender";

const handlers = {
  sendResourceForRender,
};
const handleMessage = async ({ name, params }) => {
  handlers[name](params);
};
export default handleMessage;
