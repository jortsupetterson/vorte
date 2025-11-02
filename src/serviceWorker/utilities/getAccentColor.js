const getAccentColor = async (params) => {
  return cookieStore.get("accent_color") || "#";
};
export default getAccentColor;
