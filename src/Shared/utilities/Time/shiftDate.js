export default async ({ years, months, weeks, days }) => {
  const d = await getAnchorDate();
  if (years) d.setFullYear(d.getFullYear() + years);
  if (months) d.setMonth(d.getMonth() + months);
  if (weeks) d.setDate(d.getDate() + 7 * weeks);
  if (days) d.setDate(d.getDate() + days);
  cookieStore.set({
    name: "anchorDate",
    value: d.toISOString().slice(0, 10),
    expires: NOWplusYEAR,
  });
  return d;
};
import { NOWplusYEAR } from "../../CONFIG";
import getAnchorDate from "../getAnchorDate";
