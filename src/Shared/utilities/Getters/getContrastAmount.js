export default async () => {
  const cookie = await cookieStore.get("contrastAmount");
  return cookie?.value ?? "1";
};
