const getContrastAmount = async () => {
  const cookie = await cookieStore.get("contrastAmount");
  return cookie?.value ?? "1";
};
export default getContrastAmount;
