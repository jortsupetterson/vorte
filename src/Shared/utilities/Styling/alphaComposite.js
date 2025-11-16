const normalizeHex = (hex) => {
  let value = String(hex).trim().replace("#", "");

  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (value.length === 8) {
    value = value.slice(0, 6);
  }

  if (value.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return value;
};

const hexToRgb = (hex) => {
  const value = normalizeHex(hex);
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return { r: red, g: green, b: blue };
};

const rgbToHex = ({ r, g, b }) => {
  return (
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
};

export default (underHex, overHex, alpha) => {
  const under = hexToRgb(underHex);
  const over = hexToRgb(overHex);

  const out = {
    r: Math.round(over.r * alpha + under.r * (1 - alpha)),
    g: Math.round(over.g * alpha + under.g * (1 - alpha)),
    b: Math.round(over.b * alpha + under.b * (1 - alpha)),
  };

  return rgbToHex(out);
};
