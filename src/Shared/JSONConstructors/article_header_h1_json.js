export default async (isDemo, viewName) => {
  const constructor = {
    async home() {
      const { firstname } = await getUserObject(isDemo);
      return {
        firstname,
      };
    },
  }[viewName];
  const JSON = await constructor(isDemo);
  return JSON;
};
import getUserObject from "../Utilities/getUserObject";
