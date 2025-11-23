export default async ({ isDemo, viewName }) => {
  const constructor = {
    async home() {
      const { firstname } = await UserObject.read({ isDemo });
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
    async calendar_config() {
      return {};
    },
  }[viewName];
  const JSON = await constructor();
  return JSON;
};
import UserObject from "../Utilities/Storage/UserObject";
