/**
 * @param {"home"|`calendar_${string}`} viewName
 * @param {string[]} components CSS selectors
 * @param {object} [customParams]
 */

export default (viewName, components, customParams) => {
  return inlineStringify({
    name: "msgToSw",
    params: {
      name: "sendResourceForRender",
      params: {
        viewName,
        components,
        customParams: customParams ?? undefined,
      },
    },
  });
};

import inlineStringify from "./inlineStringify";
