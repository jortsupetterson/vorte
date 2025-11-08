const getBackgroundColor = async () => {
  const cookie = await cookieStore.get("backgroundColor");
  return cookie?.value ?? "#000";
};
export default getBackgroundColor;
