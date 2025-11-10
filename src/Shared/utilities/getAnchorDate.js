export default async () => {
  const cookie = await cookieStore.get("anchorDate");
  const anchor = cookie?.value ?? new Date().toLocaleDateString("sv-SE");
  return new Date(anchor);
};
