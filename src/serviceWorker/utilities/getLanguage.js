const getLanguage = async (params) => {
  return cookieStore.get("lang") ?? "fi";
};
export default getLanguage;
