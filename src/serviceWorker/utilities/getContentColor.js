const getContentColor = async () => {
  const cookie = await cookieStore.get("contentColor");
  return cookie?.value ?? "#fff";
};
export default getContentColor;
