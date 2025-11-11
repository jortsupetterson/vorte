export default async ({ isDemo, viewName }) => {
  const constructor = {
    async home() {
      const { firstname } = await fetchUserObject(isDemo);
      return {
        firstname,
      };
    },
    async calendar() {
      return {};
    },
    async calendar_day() {
      return {};
    },
    async calendar_week() {
      return {};
    },
    async calendar_month() {
      return {};
    },
  }[viewName];
  const JSON = await constructor(isDemo);
  return JSON;
};
import fetchUserObject from "../Utilities/fetchUserObject";
