/// <reference path="../../Types/User.d.ts"/>
/** @type {User} */
export const DEMO_USER = {
  id: crypto.randomUUID(),
  firstname: "Vieras",
  lastname: "Example",
  vortepreneur_organizations: ["Example Oy"],
  my_vorte_apps: ["home", "tasks", "calendar", "networking", "rte"],
  widget_list: [
    "welcome",
    "device_bound_passkey",
    "style_customization",
    "start_rte",
  ],
};
