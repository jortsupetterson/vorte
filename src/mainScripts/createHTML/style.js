export default async (id, cssText) => {
  if (!document.getElementById(id)) {
    const styleEl = `<style  id="${id}-style" nonce="${await getNonce()}">${cssText}</style>`;
    const safeHTML = __policy ? __policy.createHTML(styleEl) : styleEl;
    document.head.insertAdjacentHTML("beforeend", safeHTML);
  }
};
import getNonce from "../../Shared/Utilities/getNonce";
import { __policy } from "../__policy";
