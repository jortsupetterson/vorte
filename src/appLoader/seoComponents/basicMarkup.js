const html = String.raw;
const basicMarkup = (lang) => html`
  <title>${title[lang]}</title>
  <meta name="author" content="Jori Lehtinen" />
  <meta name="description" content="${description[lang]}" />
`;
export default basicMarkup;
