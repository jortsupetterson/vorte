/**
 * @returns {Supported.MascotName}
 */

export default async () => {
  const cookie = await cookieStore.get("mascotName");
  return cookie?.value ?? "vor";
};
