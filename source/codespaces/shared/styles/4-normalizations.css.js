export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  figure,
  blockquote,
  dl,
  dd,
  ul,
  ol {
    margin: 0;
    padding: 0;
  }

  ul,
  ol {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  img,
  picture,
  video,
  canvas,
  svg,
  iframe {
    display: block;
    max-width: 100%;
    height: auto;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0.2rem;
    margin: 0;
    outline: none;
    appearance: none;
    min-width: max-content;
    min-height: max-content;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  legend {
    box-sizing: border-box;
  }

  progress {
    vertical-align: baseline;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    margin: 0;
    appearance: none;
  }

  ::-webkit-search-decoration {
    appearance: none;
  }

  a,
  button {
    transition: transform 0.2s ease;
  }

  img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    display: block;
  }

  details {
    display: block;
    margin: 0;
    padding: 0;
  }

  summary {
    display: block;
    cursor: pointer;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  summary::-webkit-details-marker,
  summary::marker {
    display: none;
    content: "";
  }
`;
