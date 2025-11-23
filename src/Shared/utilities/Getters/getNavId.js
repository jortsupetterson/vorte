/**
 * @returns {Common.ViewName}
 */
export default async () => {
  const cookie = await cookieStore.get("navId");
  return cookie?.value ?? "home";
};
