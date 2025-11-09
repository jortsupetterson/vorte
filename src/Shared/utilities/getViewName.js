const getViewName = async () => {
  const cookie = await cookieStore.get("viewName");
  return cookie?.value ?? "home";
};
export default getViewName;
