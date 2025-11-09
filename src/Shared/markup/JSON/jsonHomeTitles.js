export default (language, firstname) => {
  const hours = new Date().getHours();
  const nameStr = firstname ? ` ${firstname}` : "";
  const table = [
    [
      0,
      5,
      {
        fi: `Jos olet vielä hereillä${nameStr}, yritys ei oo harrastus. 🌑`,
        sv: `Om du fortfarande är vaken${nameStr}, är det inget hobbyprojekt. 🌑`,
        en: `If you're still up${nameStr}, it’s not a side project anymore. 🌑`,
      },
    ],
    [
      6,
      9,
      {
        fi: `Aamu ei kysy fiilistä – se kysyy fokusta${nameStr}. ☕`,
        sv: `Morgonen bryr sig inte om känslan – bara fokus${nameStr}. ☕`,
        en: `Morning doesn’t care about mood – only focus${nameStr}. ☕`,
      },
    ],
    [
      10,
      13,
      {
        fi: `Päivä on bisneksen prime time${nameStr}. 🔧`,
        sv: `Dagen är företagets prime time${nameStr}. 🔧`,
        en: `Daytime is business prime time${nameStr}. 🔧`,
      },
    ],
    [
      14,
      17,
      {
        fi: `Iltapäivä erottaa tekijät tekosyistä, ${nameStr}. ⚙️`,
        sv: `Eftermiddagen skiljer doers från snackare, ${nameStr}. ⚙️`,
        en: `Afternoon separates doers from talkers, ${nameStr}. ⚙️`,
      },
    ],
    [
      18,
      21,
      {
        fi: `Ilta on strategian ja toiston aikaa${nameStr}. 📊`,
        sv: `Kvällen är för strategi och repetition${nameStr}. 📊`,
        en: `Evening is for strategy and repetition${nameStr}. 📊`,
      },
    ],
    [
      22,
      23,
      {
        fi: `Jos päässä pyörii luvut${nameStr}, sä oot oikealla tiellä. 🧠`,
        sv: `Om siffrorna snurrar i huvudet${nameStr}, är du på rätt väg. 🧠`,
        en: `If the numbers still spin in your head${nameStr}, you're on track. 🧠`,
      },
    ],
  ];

  for (const [from, till, text] of table) {
    if (hours >= from && hours <= till) return text[language];
  }
};
