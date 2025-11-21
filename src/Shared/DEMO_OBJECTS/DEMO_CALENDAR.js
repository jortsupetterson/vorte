/// <reference path="../../Types/Calendar.d.ts"/>
/** @type {Calendar} */
export const DEMO_CALENDAR = {
  config: {
    categories: [
      {
        name: "Asiakastapaamiset",
        hex_color: "#ffffff",
      },
      {
        name: "Tiimipalaveri",
        hex_color: "#199473",
      },
    ],
    notifications: {
      push: true,
      email: false,
    },
    week_starts_on: "monday",
    displayed_on_week_view: {
      saturday: true,
      sunday: true,
    },
  },
  events: {
    [todayUtc.toISOString().slice(0, 10)]: [
      {
        host: DEMO_USER.id,
        invitees: DEMO_CONTACTS.filter((c) => c.relation === "teammate"),
        category: "Tiimipalaveri",
        info: "Muista miettiä agenda valmiiksi!",
        starts_at: new Date(Date.UTC(tY, tM, tD, 4, 0)).toISOString(),
        duration_minutes: 120,
      },
      {
        host: DEMO_USER.id,
        invitees: DEMO_CONTACTS.filter((c) => c.relation === "customer"),
        category: "Asiakastapaaminen",
        info: "0401234567 ennakkotietona...",
        starts_at: new Date(Date.UTC(tY, tM, tD, 10, 0)).toISOString(),
        duration_minutes: 90,
      },
    ],

    [tomorrowUtc.toISOString().slice(0, 10)]: [
      {
        host: DEMO_USER.id,
        invitees: DEMO_CONTACTS.filter((c) => c.relation === "teammate"),
        category: "Sprintin katselmointi",
        info: "Käy läpi viikon tärkeimmät tehtävät.",
        starts_at: new Date(Date.UTC(nY, nM, nD, 8, 30)).toISOString(),
        duration_minutes: 60,
      },
      {
        host: DEMO_USER.id,
        invitees: DEMO_CONTACTS.filter((c) => c.relation === "partner"),
        category: "Kumppanitapaaminen",
        info: "Kumppanin alustademo ja integraatioideat.",
        starts_at: new Date(Date.UTC(nY, nM, nD, 13, 15)).toISOString(),
        duration_minutes: 45,
      },
    ],

    [inTwoDaysUtc.toISOString().slice(0, 10)]: [
      {
        host: DEMO_USER.id,
        invitees: DEMO_CONTACTS.filter((c) => c.relation === "teammate"),
        category: "Fokusblokki",
        info: "Hiljainen työaika: tuotteistuksen kehitys.",
        starts_at: new Date(Date.UTC(aY, aM, aD, 5, 0)).toISOString(),
        duration_minutes: 180,
      },
      {
        host: DEMO_USER.id,
        invitees: DEMO_CONTACTS.filter((c) => c.relation === "customer"),
        category: "Onboarding",
        info: "Uuden asiakkaan käyttöönotto ja koulutus.",
        starts_at: new Date(Date.UTC(aY, aM, aD, 15, 0)).toISOString(),
        duration_minutes: 60,
      },
    ],
  },
};

export const DEFAULT_START = 4;
export const DEFAUlT_END = 19;
export const DEFAULT_PIXEL_HEIGHT = 1;

const now = new Date();
const year = now.getFullYear(),
  month = now.getMonth(),
  day = now.getDate();

const todayUtc = new Date(Date.UTC(year, month, day));
const tomorrowUtc = new Date(todayUtc);
tomorrowUtc.setUTCDate(tomorrowUtc.getUTCDate() + 1);
const inTwoDaysUtc = new Date(todayUtc);
inTwoDaysUtc.setUTCDate(inTwoDaysUtc.getUTCDate() + 2);

const tY = todayUtc.getUTCFullYear(),
  tM = todayUtc.getUTCMonth(),
  tD = todayUtc.getUTCDate();

const nY = tomorrowUtc.getUTCFullYear(),
  nM = tomorrowUtc.getUTCMonth(),
  nD = tomorrowUtc.getUTCDate();

const aY = inTwoDaysUtc.getUTCFullYear(),
  aM = inTwoDaysUtc.getUTCMonth(),
  aD = inTwoDaysUtc.getUTCDate();

const mondayOfWeek = getThisMonday(todayUtc);

const weekdayIsoList = [];
for (let weekdayOffset = 0; weekdayOffset < 5; weekdayOffset++) {
  const weekdayDate = new Date(mondayOfWeek);
  weekdayDate.setUTCDate(mondayOfWeek.getUTCDate() + weekdayOffset);
  weekdayIsoList.push(weekdayDate.toISOString().slice(0, 10));
}

for (const isoDate of weekdayIsoList) {
  if (!DEMO_CALENDAR[isoDate]) DEMO_CALENDAR[isoDate] = [];
}

const randomCategories = [
  "Tiimipalaveri",
  "Asiakastapaaminen",
  "Sprintin katselmointi",
  "Fokusblokki",
  "Onboarding",
];

const randomInfos = [
  "Lyhyt check-in tiimin kanssa.",
  "Asiakkaan tilannepäivitys ja seuraavat askeleet.",
  "Syvätyöjakso ilman kokouksia.",
  "Suunnittelusessio tulevaan sprinttiin.",
  "Dokumentoinnin päivitys ja siistiminen.",
];

const randomRelations = ["teammate", "customer"];
const hasOverlap = (eventsForDay, startMs, endMs) => {
  for (let eventIndex = 0; eventIndex < eventsForDay.length; eventIndex++) {
    const existing = eventsForDay[eventIndex];
    const existingStartMs = new Date(existing.starts_at).getTime();
    const existingEndMs = existingStartMs + existing.duration_minutes * 60_000;

    if (startMs < existingEndMs && endMs > existingStartMs) return true;
  }
  return false;
};

for (let index = 0; index < 10; index++) {
  const isoDate =
    weekdayIsoList[Math.floor(Math.random() * weekdayIsoList.length)];

  const randomHour = Math.floor(Math.random() * 24);
  const randomMinutesSlot = Math.floor(Math.random() * 12);
  const randomMinutes = randomMinutesSlot * 5;

  const durationMinutes = (Math.floor(Math.random() * 6) + 1) * 15;

  const startBase = new Date(isoDate + "T00:00:00Z");
  startBase.setUTCHours(randomHour, randomMinutes, 0, 0);

  const startMs = startBase.getTime();
  const endMs = startMs + durationMinutes * 60_000;

  const eventsForDay = DEMO_CALENDAR[isoDate];

  if (hasOverlap(eventsForDay, startMs, endMs)) continue;

  const relation =
    randomRelations[Math.floor(Math.random() * randomRelations.length)];
  const invitees = DEMO_CONTACTS.filter(
    (contact) => contact.relation === relation
  );

  eventsForDay.push({
    host: DEMO_USER.id,
    invitees,
    category:
      randomCategories[Math.floor(Math.random() * randomCategories.length)],
    info: randomInfos[Math.floor(Math.random() * randomInfos.length)],
    starts_at: startBase.toISOString(),
    duration_minutes: durationMinutes,
  });
}
