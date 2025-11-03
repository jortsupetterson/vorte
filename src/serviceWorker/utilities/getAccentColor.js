const getAccentColor = async () => {
  return (await cookieStore.get("accentColor")?.value) ?? "#199473";
};
export default getAccentColor;
