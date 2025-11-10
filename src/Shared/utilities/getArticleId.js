const getArticleId = async () => {
  const cookie = await cookieStore.get("articleId");
  return cookie?.value ?? "home";
};
export default getArticleId;
