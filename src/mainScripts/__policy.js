export const __policy = globalThis.trustedTypes
  ? globalThis.trustedTypes.createPolicy("vorte-ui", {
      createHTML(value) {
        return value;
      },
    })
  : null;
