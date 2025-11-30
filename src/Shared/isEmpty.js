/**
 * @param {object} o
 * @returns {boolean}
 */
export default (o) => {
  for (const k in o) return false;
  return true;
};
