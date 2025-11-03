const getLanguage = async () => {
  return (await cookieStore.get("lang")?.value) ?? "en";
};
export default getLanguage;
