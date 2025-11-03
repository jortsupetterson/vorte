const getAccentColor = async () => {
  const cookie = await cookieStore.get("accentColor");
  return cookie?.value ?? "#199473";
};
export default getAccentColor;
