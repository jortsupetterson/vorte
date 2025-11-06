const getActiveView = async () => {
  const cookie = await cookieStore.get("activeView");
  return cookie?.value ?? "default";
};
export default getActiveView;
