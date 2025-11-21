/// <reference path="../../../Types/User.d.ts"/>

/**
 * @param {boolean} isDemo
 * @returns {User}
 */
export default async (isDemo) => {
  if (isDemo) return DEMO_USER;
  const userRes = await negotiateCache(new Request(`/user.json`));
  const userBytes = await userRes.arrayBuffer();
  /** @type {User} */
  const user = await zipper.unzip(userBytes);
  return user;
};
import negotiateCache from "../Negotiations/negotiateCache";
import zipper from "../../WebCrypto/zipper";
import { DEMO_USER } from "../../DEMO_OBJECTS/DEMO_USER";
