/**
 * @returns {boolean}
 */
export default async () => {
  const cookie = await cookieStore.get("navStatus");
  const open = cookie?.value || "true";
  return open === "true";
};
