export default async ({ isDemo, viewName }) => {
  const constructor = {
    async home() {},
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
  const JSON = await constructor(isDemo);
  return JSON;
};
import UserObject from "../Utilities/Storage/UserObject";
