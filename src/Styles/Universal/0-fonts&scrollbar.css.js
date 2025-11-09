export default css`
  @font-face {
    font-family: "Inter";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url("/fonts/Inter-VariableFont_opsz,wght.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url("/fonts/Poppins/Thin.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url("/fonts/Poppins/ExtraLight.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url("/fonts/Poppins/Light.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url("/fonts/Poppins/Regular.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url("/fonts/Poppins/Medium.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url("/fonts/Poppins/SemiBold.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url("/fonts/Poppins/Bold.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url("/fonts/Poppins/ExtraBold.woff2") format("woff2");
  }

  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url("/fonts/Poppins/Black.woff2") format("woff2");
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  * {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  html,
  body {
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
  }
`;
