export default async () => {
  const cookie = await cookieStore.get("anchorDate");
  const anchor = cookie?.value ?? new Date().toISOString().slice(0, 10);
  return new Date(anchor);
};
