let lastVersionCheck = 0;
const CHECK_INTERVAL_MS = 60_000;

const checkForUpdate = async () => {
  const now = Date.now();
  if (now - lastVersionCheck < CHECK_INTERVAL_MS) return;
  lastVersionCheck = now;
  try {
    const res = await fetch("/version.txt", { cache: "no-store" });
    if (!res.ok) return;
    const networkBuildReference = await res.text();
    if (buildReference !== networkBuildReference) {
      await self.registration.update();
    }
  } catch {}
};
export default checkForUpdate;
