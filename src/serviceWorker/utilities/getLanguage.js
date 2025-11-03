const getLanguage = async () => {
  const cookie = await cookieStore.get("lang");
  return cookie.value ?? "en";
};
export default getLanguage;
