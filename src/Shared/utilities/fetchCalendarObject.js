export default async (isDemo) => {
  if (isDemo)
    return {
      open_on_start: DEFAULT_CALENDAR_OPEN_ON_START_CHOICE,
    };
  const userRes = await negotiateCache(new Request(`/calendar.json`));
  const userBytes = await userRes.arrayBuffer();
  const user = await zipper.unzip(userBytes);
  return user;
};
import negotiateCache from "./negotiateCache";
import zipper from "../WebCrypto/zipper";
import { DEFAULT_CALENDAR_OPEN_ON_START_CHOICE } from "../CONFIG";
