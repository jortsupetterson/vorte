// scripts/plugins/contentMinifierPlugin.js (ESM)
import fs from "node:fs/promises";

function minifyHTML(source) {
  return source.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
}

/* --- SQLite (D1) --- */
function minifySQLite(sql) {
  let out = "",
    i = 0,
    n = sql.length,
    mode = "code";
  const isWord = (ch) => /[A-Za-z0-9_\u00C0-\u024F]/.test(ch);
  let needSpace = false;

  const pushSpace = () => {
    if (needSpace) {
      out += " ";
      needSpace = false;
    }
  };

  while (i < n) {
    const ch = sql[i],
      nx = sql[i + 1];
    if (mode === "linec") {
      if (ch === "\n" || ch === "\r") mode = "code";
      i++;
      continue;
    }
    if (mode === "blockc") {
      if (ch === "*" && nx === "/") {
        i += 2;
        mode = "code";
      } else i++;
      continue;
    }
    if (mode === "sq") {
      out += ch;
      i++;
      if (ch === "'" && sql[i] === "'") {
        out += sql[i++];
      } else if (ch === "'") mode = "code";
      continue;
    }
    if (mode === "dq") {
      out += ch;
      i++;
      if (ch === '"' && sql[i] === '"') {
        out += sql[i++];
      } else if (ch === '"') mode = "code";
      continue;
    }
    if (mode === "bq") {
      out += ch;
      i++;
      if (ch === "`" && sql[i] === "`") {
        out += sql[i++];
      } else if (ch === "`") mode = "code";
      continue;
    }
    if (mode === "br") {
      out += ch;
      i++;
      if (ch === "]") mode = "code";
      continue;
    }

    if (ch === "-" && nx === "-") {
      i += 2;
      mode = "linec";
      continue;
    }
    if (ch === "/" && nx === "*") {
      i += 2;
      mode = "blockc";
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`" || ch === "[") {
      pushSpace();
      out += ch;
      i++;
      mode = ch === "'" ? "sq" : ch === '"' ? "dq" : ch === "`" ? "bq" : "br";
      continue;
    }

    if (ch <= " ") {
      const prev = out[out.length - 1] || "";
      let j = i + 1;
      while (j < n && sql[j] <= " ") j++;
      const nextV = sql[j] || "";
      if (isWord(prev) && isWord(nextV)) needSpace = true;
      i = j;
      continue;
    }

    pushSpace();
    out += ch;
    i++;
  }
  return out.trim();
}

/* --- CSS --- */
function minifyCSS(css) {
  let out = "",
    i = 0,
    n = css.length,
    mode = "code",
    pendingSpace = false,
    paren = 0;

  const isWS = (c) =>
    c === " " || c === "\n" || c === "\r" || c === "\t" || c === "\f";
  const isP = (c) =>
    c === ":" ||
    c === ";" ||
    c === "," ||
    c === "{" ||
    c === "}" ||
    c === ">" ||
    c === "+" ||
    c === "~" ||
    c === "=" ||
    c === "(" ||
    c === ")";
  const emitSpace = () => {
    if (pendingSpace) {
      out += " ";
      pendingSpace = false;
    }
  };

  while (i < n) {
    const ch = css[i],
      nx = css[i + 1];

    if (mode === "comment") {
      if (ch === "*" && nx === "/") {
        i += 2;
        mode = "code";
      } else i++;
      continue;
    }
    if (mode === "sq") {
      out += ch;
      i++;
      if (ch === "'" && css[i - 2] !== "\\") mode = "code";
      continue;
    }
    if (mode === "dq") {
      out += ch;
      i++;
      if (ch === '"' && css[i - 2] !== "\\") mode = "code";
      continue;
    }

    if (ch === "/" && nx === "*") {
      i += 2;
      mode = "comment";
      continue;
    }
    if (ch === "'") {
      emitSpace();
      out += ch;
      i++;
      mode = "sq";
      continue;
    }
    if (ch === '"') {
      emitSpace();
      out += ch;
      i++;
      mode = "dq";
      continue;
    }

    if (isWS(ch)) {
      let j = i + 1;
      while (j < n && isWS(css[j])) j++;
      const prev = out[out.length - 1],
        nextV = css[j];
      const need = prev && nextV && !isP(prev) && !isP(nextV);
      pendingSpace = need && (paren === 0 ? true : pendingSpace || true);
      i = j;
      continue;
    }

    if (ch === "(") paren++;
    if (ch === ")") paren = Math.max(0, paren - 1);

    if (isP(ch)) {
      pendingSpace = false;
      if (ch === ";" && nx === "}") {
        i++;
        continue;
      }
      out += ch;
      i++;
      continue;
    }

    emitSpace();
    out += ch;
    i++;
  }
  return out.trim();
}

/* --- Tagatut templaten käsittely --- */
function replaceTagged(source, tag, transform) {
  // Osuu vain muotoon:  css`...`  (ei funktioiden/objektien sisäisiin backtickeihin ilman tagia)
  const re = new RegExp(String.raw`(\b${tag})\s*` + "`([\\s\\S]*?)`", "g");
  return source.replace(re, (_m, t, body) => `${t}\`` + transform(body) + "`");
}

export default function contentMinifierPlugin({
  tags = ["css", "sql", "html"],
} = {}) {
  return {
    name: "content-minifier-tagged-only",
    setup(build) {
      build.onLoad({ filter: /\.[cm]?[jt]sx?$/ }, async (args) => {
        let src = await fs.readFile(args.path, "utf8");

        if (tags.includes("css")) src = replaceTagged(src, "css", minifyCSS);
        if (tags.includes("sql")) src = replaceTagged(src, "sql", minifySQLite);
        if (tags.includes("html")) src = replaceTagged(src, "html", minifyHTML);

        return { contents: src, loader: "default" };
      });

      // .html tiedostot suoraviivaisesti
      build.onLoad({ filter: /\.html$/ }, async (args) => {
        const src = await fs.readFile(args.path, "utf8");
        return { contents: minifyHTML(src), loader: "text" };
      });
    },
  };
}
