/// <reference path="../../../Types/Content.d.ts" />
/**
 * @returns {}
 */
export default async () => {
  const cookie = await cookieStore.get("contentColor");
  return cookie?.value ?? "#fff";
};
