/// <reference path="../../Types/Calendar.d.ts" />
export const DEFAULT_START = 4;
export const DEFAULT_END = 19;
export const DEFAULT_PIXEL_HEIGHT = 1;

const now = new Date(),
  year = now.getFullYear(),
  month = now.getMonth(),
  day = now.getDate();

const todayUtc = new Date(Date.UTC(year, month, day)),
  tomorrowUtc = new Date(Date.UTC(year, month, day + 1)),
  inTwoDaysUtc = new Date(Date.UTC(year, month, day + 2));

const todayIso = todayUtc.toISOString().slice(0, 10),
  tomorrowIso = tomorrowUtc.toISOString().slice(0, 10),
  inTwoDaysIso = inTwoDaysUtc.toISOString().slice(0, 10);

const ID1 = crypto.randomUUID(),
  ID2 = crypto.randomUUID(),
  ID3 = crypto.randomUUID(),
  ID4 = crypto.randomUUID(),
  ID5 = crypto.randomUUID(),
  ID6 = crypto.randomUUID();

/** @type {Calendar} */
export const DEMO_CALENDAR = {
  config: {
    categories: [
      { id: ID1, name: "Asiakastapaamiset", hex_color: "#ffffff" },
      { id: ID2, name: "Tiimipalaverit", hex_color: "#199473" },
      { id: ID3, name: "Liiketoiminnan suunnittelu", hex_color: "#D97706" },
      { id: ID4, name: "Fokusblokit", hex_color: "#4B5563" },
      { id: ID5, name: "Uusasiakashankinta", hex_color: "#2563EB" },
      { id: ID6, name: "Verkostoituminen ja kumppanit", hex_color: "#0F766E" },
    ],
    notifications: {
      push: true,
      email: false,
    },
    week_starts_on: {
      monday: true,
      sunday: false,
    },
    displayed_on_week_view: {
      saturday: true,
      sunday: true,
    },
  },

  events: {
    [todayIso]: [
      {
        event_id: crypto.randomUUID(),
        event_host: DEMO_USER.id,
        event_invitees: DEMO_CONTACTS.filter(
          (contact) => contact.relation === "teammate"
        ).map((contact) => contact.id),
        event_category_id: ID2,
        event_info: "Muista miettiä agenda valmiiksi!",
        event_starts_at: new Date(
          Date.UTC(
            todayUtc.getUTCFullYear(),
            todayUtc.getUTCMonth(),
            todayUtc.getUTCDate(),
            4,
            0
          )
        ).toISOString(),
        event_duration_minutes: 120,
      },
      {
        event_id: crypto.randomUUID(),
        event_host: DEMO_USER.id,
        event_invitees: DEMO_CONTACTS.filter(
          (contact) => contact.relation === "customer"
        ).map((contact) => contact.id),
        event_category_id: ID1,
        event_info: "Puhelinmuistio ja kysymyslista asiakkaalle valmiiksi.",
        event_starts_at: new Date(
          Date.UTC(
            todayUtc.getUTCFullYear(),
            todayUtc.getUTCMonth(),
            todayUtc.getUTCDate(),
            10,
            0
          )
        ).toISOString(),
        event_duration_minutes: 90,
      },
    ],

    [tomorrowIso]: [
      {
        event_id: crypto.randomUUID(),
        event_host: DEMO_USER.id,
        event_invitees: DEMO_CONTACTS.filter(
          (contact) => contact.relation === "teammate"
        ).map((contact) => contact.id),
        event_category_id: ID3,
        event_info: "Käy läpi viikon tärkeimmät tehtävät ja tavoitteet.",
        event_starts_at: new Date(
          Date.UTC(
            tomorrowUtc.getUTCFullYear(),
            tomorrowUtc.getUTCMonth(),
            tomorrowUtc.getUTCDate(),
            8,
            30
          )
        ).toISOString(),
        event_duration_minutes: 60,
      },
      {
        event_id: crypto.randomUUID(),
        event_host: DEMO_USER.id,
        event_invitees: DEMO_CONTACTS.filter(
          (contact) => contact.relation === "partner"
        ).map((contact) => contact.id),
        event_category_id: ID6,
        event_info: "Yhteistyömahdollisuudet ja palveluiden esittely.",
        event_starts_at: new Date(
          Date.UTC(
            tomorrowUtc.getUTCFullYear(),
            tomorrowUtc.getUTCMonth(),
            tomorrowUtc.getUTCDate(),
            13,
            15
          )
        ).toISOString(),
        event_duration_minutes: 45,
      },
    ],

    [inTwoDaysIso]: [
      {
        event_id: crypto.randomUUID(),
        event_host: DEMO_USER.id,
        event_invitees: DEMO_CONTACTS.filter(
          (contact) => contact.relation === "teammate"
        ).map((contact) => contact.id),
        event_category_id: ID4,
        event_info:
          "Hiljainen työaika: tärkeimmät kehitys- ja suunnittelutehtävät.",
        event_starts_at: new Date(
          Date.UTC(
            inTwoDaysUtc.getUTCFullYear(),
            inTwoDaysUtc.getUTCMonth(),
            inTwoDaysUtc.getUTCDate(),
            5,
            0
          )
        ).toISOString(),
        event_duration_minutes: 180,
      },
      {
        event_id: crypto.randomUUID(),
        event_host: DEMO_USER.id,
        event_invitees: DEMO_CONTACTS.filter(
          (contact) => contact.relation === "customer"
        ).map((contact) => contact.id),
        event_category_id: ID5,
        event_info: "Ensitapaaminen uuden potentiaalisen asiakkaan kanssa.",
        event_starts_at: new Date(
          Date.UTC(
            inTwoDaysUtc.getUTCFullYear(),
            inTwoDaysUtc.getUTCMonth(),
            inTwoDaysUtc.getUTCDate(),
            15,
            0
          )
        ).toISOString(),
        event_duration_minutes: 60,
      },
    ],
  },
};

import { DEMO_USER } from "./DEMO_USER.js";
import { DEMO_CONTACTS } from "./DEMO_CONTACTS.js";
