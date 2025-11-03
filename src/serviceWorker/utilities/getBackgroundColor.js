const getBackgroundColor = async () => {
  return (await cookieStore.get("backgroundColor")?.value) ?? "#000";
};
export default getBackgroundColor;
