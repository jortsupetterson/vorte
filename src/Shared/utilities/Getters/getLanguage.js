/**
 * @returns {Supported.Language}
 */

export default async () => {
  const cookie = await cookieStore.get("lang");
  return cookie?.value ?? "en";
};
