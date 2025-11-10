export default async (isDemo, viewName) => {
  const constructor = {
    async home() {
      const { firstname } = await fetchUserObject(isDemo);
      return {
        firstname,
      };
    },
  }[viewName];
  const JSON = await constructor(isDemo);
  return JSON;
};
import fetchUserObject from "../Utilities/fetchUserObject";
