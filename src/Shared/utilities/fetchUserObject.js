export default async (isDemo) => {
  if (isDemo) return DEMO_USER;
  const userRes = await negotiateCache(new Request(`/user.json`));
  const userBytes = await userRes.arrayBuffer();
  const user = await zipper.unzip(userBytes);
  return user;
};
import negotiateCache from "./negotiateCache";
import zipper from "../WebCrypto/zipper";
import { DEMO_USER } from "../CONFIG";
