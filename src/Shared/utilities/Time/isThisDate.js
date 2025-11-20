import getAnchorDate from "../getAnchorDate";

export default async () => {
  return (
    (await getAnchorDate()).toISOString().slice(0, 10) ===
    new Date().toISOString().slice(0, 10)
  );
};
