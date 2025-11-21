/**
 * @returns {Common.ViewName}
 */
export default async () => {
  const cookie = await cookieStore.get("articleId");
  return cookie?.value ?? "home";
};
