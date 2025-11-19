export default () => {
  let anchor_date = new Date(
    wheel_state.year,
    wheel_state.month,
    wheel_state.date
  )
    .toISOString()
    .slice(0, 10);
  functions.msgToSw({
    name: "sendResourceForRender",
    params: {
      viewName: "calendar_month",
      components: ["article main"],
      customParams: {
        anchor_date,
      },
    },
  });
  cookieStore.set({
    name: "anchorDate",
    value: anchor_date,
    expires: NOWplusYEAR,
  });
};
import { functions } from "../../../script";
import { NOWplusYEAR } from "../../../../Shared/CONFIG";
import { wheel_state } from "../1-state";
