export default (obj) => {
  const text = JSON.stringify(obj);
  let hashValue = 0;
  const length = text.length;

  for (let index = 0; index < length; index++) {
    hashValue = (hashValue * 31 + text.charCodeAt(index)) | 0;
  }

  return (hashValue >>> 0).toString(36);
};
