export const SUPPORTED_LANGUAGES = ["fi", "sv", "en"];
export const DAY_MS = 86400000;
export const NOWplusYEAR = new Date(Date.now() + 31536000 * 1000);

export const DEMO_USER = {
  id: crypto.randomUUID(),
  firstname: "Botti",
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

export const DEMO_CONTACTS = [
  {
    id: crypto.randomUUID(),
    firstname: "Teemu",
    lastname: "Tiimiläinen",
    relation: "teammate",
  },
  {
    id: crypto.randomUUID(),
    firstname: "Carla",
    lastname: "Customer",
    relation: "customer",
  },
];
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const day = now.getDate();

export const DEMO_CALENDAR = {
  [now.toISOString().slice(0, 10)]: [
    {
      host: DEMO_USER.id,
      invitees: DEMO_CONTACTS.filter((c) => c.relation === "teammate"),
      category: "Tiimi palaveri",
      info: "Muista miettiä agenda valmiiksi!",
      starts_at: new Date(Date.UTC(year, month, day, 6, 0)).toISOString(),
      duration_minutes: 120,
    },
    {
      host: DEMO_USER.id,
      invitees: DEMO_CONTACTS.filter((c) => c.relation === "customer"),
      category: "Asiakastapaaminen",
      info: "0401234567 ennakkotietona...",
      starts_at: new Date(Date.UTC(year, month, day, 12, 0)).toISOString(),
      duration_minutes: 90,
    },
  ],
};
