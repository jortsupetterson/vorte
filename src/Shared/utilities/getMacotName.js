const getMascotName = async () => {
  const cookie = await cookieStore.get("mascotName");
  return cookie?.value ?? "vor";
};
export default getMascotName;
