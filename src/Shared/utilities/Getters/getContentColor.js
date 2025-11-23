/**
 * @returns {Common.HEX_COLOR}
 */
export default async () => {
  const cookie = await cookieStore.get("contentColor");
  return cookie?.value ?? "#fff";
};
