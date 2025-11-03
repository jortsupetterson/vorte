// optimize-fonts.js
// Asennus: npm i fontmin fs-extra path
// Käyttö: node optimize-fonts.js
import fs from "fs-extra";
import path from "node:path";
import Fontmin from "fontmin";

const SRC_DIR = "./src/assetsManagements/fonts";
const OUT_DIR = "./dist/static/fonts";

// Luo kohdehakemistot jos puuttuvat
await fs.ensureDir(OUT_DIR);

// Hae kaikki tiedostot rekursiivisesti
async function getAllFonts(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getAllFonts(res) : res;
    })
  );
  return files.flat();
}

const fontFiles = (await getAllFonts(SRC_DIR)).filter((f) =>
  /\.(ttf|otf|woff|woff2)$/i.test(f)
);

// Kopioi ja optimoi
for (const file of fontFiles) {
  const relPath = path.relative(SRC_DIR, file);
  const destPath = path.join(OUT_DIR, relPath);
  await fs.ensureDir(path.dirname(destPath));

  // Käytetään Fontmin vain jos TTF/OTF
  if (/\.(ttf|otf)$/i.test(file)) {
    const fontmin = new Fontmin()
      .src(file)
      .use(Fontmin.ttf2woff2())
      .dest(path.dirname(destPath));
    await new Promise((res, rej) =>
      fontmin.run((err) => (err ? rej(err) : res()))
    );
  } else {
    await fs.copy(file, destPath);
  }
}

console.log(`✓ Fontit kopioitu ja optimoitu → ${OUT_DIR}`);
