export class HomeNavigation extends HTMLElement {
  constructor() {
    if (benchmarks) performance.mark("HomeNavigationList:constructor");
    /******************************************
     * CONCURRENT AND ASYNCHRONOUS OPERATIONS *
     ******************************************/

    /**@type {Promise<HomeNavigationListData>} */
    this.data = swRPC({
      id: crypto.randomUUID(),
      rpc: "diff.HomeNavigationList",
      params: {
        is_demo,
      },
    });
    /************
     * ELEMENTS *
     ************
     */
    this.fragment = document.createDocumentFragment();
    //*************************************************************************//
    this.style = document.createElement("style");
    this.style.nonce = nonce;
    this.fragment.appendChild(this.style);
    //*************************************************************************//
    for (const namespace of NAMESPACES) {
      this[`${namespace}_list`] = document.createElement("ul");
      this.namepace.appendChild(document.createElement("li"));
    }
    //*************************************************************************//
  }
  async connectedCallback() {
    /********
     * INIT *
     ********
     */
    const abortController = new AbortController();
    const { signal } = abortController;
    /** @type {{feature_flags: SettingsStore["feature_flags"]}} */
    const { feature_flags, organizations } = await this.data;
    /************
     * MY VORTE *
     ************
     */
    if (!feature_flags.my_vorte.disabled) {
      this.my_vorte;
      for (const [key, value] of feature_flags.my_vorte.views) {
      }
    }
    if (!feature_flags.vortepreneur.disabled) {
    }

    this.appendChild(this.fragment);

    /****************************************
     * ELEMENT CONNECTION TIME MEASUREMENTS *
     ****************************************
     */
    if (benchmarks) {
      performance.mark("HomeNavigationList:isConnected");
      performance.measure(
        "HomeNavigationList:constructor->isConnected",
        "HomeNavigationList:constructor",
        "HomeNavigationList:isConnected"
      );
      console.log(
        performance.getEntriesByName(
          "HomeNavigationList:constructor->isConnected"
        )
      );
    }
  }
  async disconnectedCallback() {}
}
import swRPC from "../../core/swRPC";
import svgTable from "../../../Shared/Content/svgTable";
import { benchmarks } from "../../entrypoints/dashboard";
import { nonce } from "../../core/dashboard";
import { HomeNavigationListData } from "../../../../ServiceWorker/diffs/HomeNavigationListData";
import { NAMESPACES } from "../../../../Shared/VALUES";
