export default async (isDemo) => {
  if (isDemo) return DEMO_CALENDAR;
  const userRes = await negotiateCache(new Request(`/calendar.json`));
  const userBytes = await userRes.arrayBuffer();
  const user = await zipper.unzip(userBytes);
  return user;
};
import negotiateCache from "../negotiateCache";
import zipper from "../../WebCrypto/zipper";
import { DEMO_CALENDAR } from "../../CONFIG";
