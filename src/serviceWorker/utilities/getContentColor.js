const getContentColor = async () => {
  return (await cookieStore.get("contentColor")?.value) ?? "#fff";
};
export default getContentColor;
