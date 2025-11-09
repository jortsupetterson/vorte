const inlineStringify = (value) => {
  return JSON.stringify(value).replace(/"/g, "&quot;");
};
export default inlineStringify;
