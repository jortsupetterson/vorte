/**
 * @returns {Common.HEX_COLOR}
 */

export default async () => {
  const cookie = await cookieStore.get("accentColor");
  return cookie?.value ?? "#199473";
};
