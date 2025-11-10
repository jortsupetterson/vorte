const getNavStatus = async () => {
  const cookie = await cookieStore.get("navStatus");
  const open = cookie?.value || "true";
  return open === "true";
};
export default getNavStatus;
