/**
 * @typedef {string} CSSSelector
 */

/**
 * @typedef {string} CSSText
 */

/**
 * @param {CSSSelector} name
 * @param {CSSText} cssText
 * @returns {void} Schedules a microtask that injects a style element with a `nonce` into <head>.
 */
export default async (name, cssText) => {
  queueMicrotask(async () => {
    if (!document.getElementById(`${name}-style`)) {
      const styleEl = `<style id="${name}-style" nonce="${await getNonce()}">${cssText}</style>`;
      const safeHTML = __policy ? __policy.createHTML(styleEl) : styleEl;
      document.head.insertAdjacentHTML("beforeend", safeHTML);
    }
  });
};

import getNonce from "../../Shared/Utilities/getNonce";
import { __policy } from "../__policy";
