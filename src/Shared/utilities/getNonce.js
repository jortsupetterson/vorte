export default async () => {
  const cookie = await cookieStore.get("nonce");
  if (cookie && cookie.value) return cookie.value;

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const binary = String.fromCharCode(...bytes);
  const b64 = btoa(binary).replace(/=+$/, "");

  cookieStore.set({
    name: "nonce",
    value: b64,
  });

  return b64;
};
