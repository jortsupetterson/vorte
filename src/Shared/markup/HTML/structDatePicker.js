import svgTable from "../svgTable";
import inlineStringify from "../../Utilities/inlineStringify";
export default (unit, viewName, textContent) => {
  const prevParams = { [unit]: -1 };
  const nextParams = { [unit]: 1 };
  return html`
    <div id="datePicker">
      <button
        id="prev"
        data-fn="${inlineStringify({
          name: `msgToSw`,
          params: {
            type: `render`,
            params: {
              viewName: `${viewName}`,
              components: [`article main`],
              customParams: prevParams,
            },
          },
        })}"
      >
        ${svgTable["svgArrowLeft"]}
      </button>
      <button
        id="toggler"
        data-fn="${inlineStringify({
          name: `toggleDialog`,
          params: {
            tag: `date-wheel`,
          },
        })}"
      >
        ${textContent}
      </button>
      <button
        id="next"
        data-fn="${inlineStringify({
          name: `msgToSw`,
          params: {
            type: `render`,
            params: {
              viewName: `${viewName}`,
              components: [`article main`],
              customParams: nextParams,
            },
          },
        })}"
      >
        ${svgTable["svgArrowRight"]}
      </button>
    </div>
  `;
};
