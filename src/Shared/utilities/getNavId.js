const getNavId = async () => {
  const cookie = await cookieStore.get("navId");
  return cookie?.value ?? "home";
};
export default getNavId;
