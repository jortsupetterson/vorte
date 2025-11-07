const functions = {
  structSpecifiedResourceInMarkup,
  create: "",
  update: "",
  delete: "",
};
const handleMessage = async (data) => {
  functions[data.name](data.params);
};
export default handleMessage;
