const html = String.raw;
const alternateMarkup = (lang) => html`
  <link rel="canonical" href="https://vorte.app/${lang}" />
  <link rel="alternate" hreflang="fi" href="https://vorte.app/fi" />
  <link rel="alternate" hreflang="sv" href="https://vorte.app/sv" />
  <link rel="alternate" hreflang="en" href="https://vorte.app/en" />
  <link rel="alternate" hreflang="x-default" href="https://vorte.app/en" />
`;
export default alternateMarkup;
