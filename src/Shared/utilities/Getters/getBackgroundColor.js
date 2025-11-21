/**
 * @returns {Common.HEX_COLOR}
 */
export default async () => {
  const cookie = await cookieStore.get("backgroundColor");
  return cookie?.value ?? "#000";
};
