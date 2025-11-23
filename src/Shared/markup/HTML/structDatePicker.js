import svgTable from "../svgTable";
import inlineStringify from "../../Utilities/inlineStringify";
export default (unit, viewName, toggler) => {
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
      ${toggler}
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
