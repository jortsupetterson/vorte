/**
 * @param {string} b64
 */

export default (b64) => {
  b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
