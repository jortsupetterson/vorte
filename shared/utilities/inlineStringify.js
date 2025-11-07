const inlineStringify = (value) => {
  JSON.stringify(value).replace(/"/g, "&quot;");
};
export default inlineStringify;
