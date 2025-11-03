// ESM
import fs from "node:fs/promises";

/* ---------- HTML ---------- */
function minifyHTML(source) {
  return source.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
}
function looksHTML(source) {
  return /<\w[\s\S]*?>/m.test(source);
}

/* ---------- SQLite (D1) ---------- */
function minifySQLite(sql) {
  let out = "";
  let index = 0;
  const length = sql.length;

  let mode = "code"; // code|squote|dquote|bquote|bracket|blockcomment|linecomment
  let needSpace = false;

  const isWord = (ch) => /[A-Za-z0-9_\u00C0-\u024F]/.test(ch);
  const pushSpace = () => {
    if (needSpace) {
      out += " ";
      needSpace = false;
    }
  };

  while (index < length) {
    const char = sql[index];
    const nextChar = sql[index + 1];

    if (mode === "linecomment") {
      if (char === "\n" || char === "\r") mode = "code";
      index++;
      continue;
    }
    if (mode === "blockcomment") {
      if (char === "*" && nextChar === "/") {
        index += 2;
        mode = "code";
      } else {
        index++;
      }
      continue;
    }
    if (mode === "squote") {
      out += char;
      index++;
      if (char === "'" && sql[index] === "'") {
        out += sql[index++];
      } else if (char === "'") {
        mode = "code";
      }
      continue;
    }
    if (mode === "dquote") {
      out += char;
      index++;
      if (char === '"' && sql[index] === '"') {
        out += sql[index++];
      } else if (char === '"') {
        mode = "code";
      }
      continue;
    }
    if (mode === "bquote") {
      out += char;
      index++;
      if (char === "`" && sql[index] === "`") {
        out += sql[index++];
      } else if (char === "`") {
        mode = "code";
      }
      continue;
    }
    if (mode === "bracket") {
      out += char;
      index++;
      if (char === "]") mode = "code";
      continue;
    }

    if (char === "-" && nextChar === "-") {
      index += 2;
      mode = "linecomment";
      continue;
    }
    if (char === "/" && nextChar === "*") {
      index += 2;
      mode = "blockcomment";
      continue;
    }

    if (char === "'" || char === '"' || char === "`" || char === "[") {
      pushSpace();
      out += char;
      index++;
      mode =
        char === "'"
          ? "squote"
          : char === '"'
          ? "dquote"
          : char === "`"
          ? "bquote"
          : "bracket";
      continue;
    }

    if (char <= " ") {
      const prevChar = out[out.length - 1] || "";
      let lookahead = index + 1;
      while (lookahead < length && sql[lookahead] <= " ") lookahead++;
      const nextVisible = sql[lookahead] || "";
      if (isWord(prevChar) && isWord(nextVisible)) needSpace = true;
      index = lookahead;
      continue;
    }

    pushSpace();
    out += char;
    index++;
  }
  return out.trim();
}
function looksSQL(source) {
  if (!source || source.length < 8) return false;
  if (/<[a-zA-Z]/.test(source)) return false;
  return /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|WITH|BEGIN|COMMIT|PRAGMA)\b/i.test(
    source
  );
}

/* ---------- CSS ---------- */
function minifyCSS(css) {
  let out = "";
  let index = 0;
  const length = css.length;

  let mode = "code"; // code|squote|dquote|comment
  let pendingSpace = false;
  let parenDepth = 0;

  const emitSpaceIfNeeded = () => {
    if (pendingSpace) {
      out += " ";
      pendingSpace = false;
    }
  };
  const isWhitespace = (ch) =>
    ch === " " || ch === "\n" || ch === "\r" || ch === "\t" || ch === "\f";
  const isPunct = (ch) =>
    ch === ":" ||
    ch === ";" ||
    ch === "," ||
    ch === "{" ||
    ch === "}" ||
    ch === ">" ||
    ch === "+" ||
    ch === "~" ||
    ch === "=" ||
    ch === "(" ||
    ch === ")";

  while (index < length) {
    const char = css[index];
    const nextChar = css[index + 1];

    if (mode === "comment") {
      if (char === "*" && nextChar === "/") {
        index += 2;
        mode = "code";
      } else {
        index++;
      }
      continue;
    }

    if (mode === "squote") {
      out += char;
      index++;
      if (char === "'" && css[index - 2] !== "\\") mode = "code";
      continue;
    }
    if (mode === "dquote") {
      out += char;
      index++;
      if (char === '"' && css[index - 2] !== "\\") mode = "code";
      continue;
    }

    if (char === "/" && nextChar === "*") {
      index += 2;
      mode = "comment";
      continue;
    }
    if (char === "'") {
      emitSpaceIfNeeded();
      out += char;
      index++;
      mode = "squote";
      continue;
    }
    if (char === '"') {
      emitSpaceIfNeeded();
      out += char;
      index++;
      mode = "dquote";
      continue;
    }

    if (isWhitespace(char)) {
      let lookahead = index + 1;
      while (lookahead < length && isWhitespace(css[lookahead])) lookahead++;
      const prev = out[out.length - 1];
      const nextVisible = css[lookahead];
      const needSpace =
        prev && nextVisible && !isPunct(prev) && !isPunct(nextVisible);
      pendingSpace =
        needSpace && (parenDepth === 0 ? true : pendingSpace || true);
      index = lookahead;
      continue;
    }

    if (char === "(") parenDepth++;
    if (char === ")") parenDepth = Math.max(0, parenDepth - 1);

    if (isPunct(char)) {
      pendingSpace = false;
      if (char === ";" && nextChar === "}") {
        index++;
        continue;
      }
      out += char;
      index++;
      continue;
    }

    emitSpaceIfNeeded();
    out += char;
    index++;
  }

  return out.trim();
}
function looksCSS(source) {
  if (!source) return false;
  if (looksHTML(source) || looksSQL(source)) return false;
  if (/@(media|supports|import|keyframes|font-face)\b/i.test(source))
    return true;
  const hasBraces = /{[\s\S]*}/.test(source);
  const hasColon = /:/.test(source);
  const hasSelectorish = /[#.\w\-\[\]=:'"\s>+~(),*@]/.test(source);
  return hasBraces && hasColon && hasSelectorish;
}

/* ---------- Force one-line output (safe) ---------- */
function forceSingleLine(text) {
  // Preserve code semantics: remove newlines/tabs, collapse multiple spaces to one, trim ends.
  // Do NOT strip spaces around tokens globally to avoid breaking JS/CSS.
  return text
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/* ---------- Plugin ---------- */
export default function contentMinifierPlugin({ tags = ["sql", "css"] } = {}) {
  const tagMatchers = tags.map((tag) => ({
    tag,
    re: new RegExp(String.raw`${tag}\s*` + "`([\\s\\S]*?)`", "g"),
  }));
  const anyTemplate = /`([\s\S]*?)`/g;

  return {
    name: "content-minifier-one-line",
    setup(build) {
      // Encourage esbuild's own minifier; we still enforce the final single line ourselves.
      build.initialOptions.minify ??= true;
      build.initialOptions.format ??= "esm";
      build.initialOptions.sourcemap ??=
        build.initialOptions.sourcemap ?? false;
      build.initialOptions.metafile ??= true;

      // Minify raw .html files to text
      build.onLoad({ filter: /\.html$/ }, async (args) => {
        const src = await fs.readFile(args.path, "utf8");
        return { contents: minifyHTML(src), loader: "text" };
      });

      // Minify inline template literals in JS/TS
      build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
        let source = await fs.readFile(args.path, "utf8");

        // Pass 1: tagged templates like sql`...`, css`...`
        for (const m of tagMatchers) {
          source = source.replace(m.re, (full, body) => {
            if (m.tag.toLowerCase() === "sql")
              return full.replace(body, minifySQLite(body));
            if (m.tag.toLowerCase() === "css")
              return full.replace(body, minifyCSS(body));
            return full;
          });
        }

        // Pass 2: any other template -> try HTML/SQL/CSS heuristics
        source = source.replace(anyTemplate, (full, body) => {
          if (looksHTML(body)) return "`" + minifyHTML(body) + "`";
          if (looksSQL(body)) return "`" + minifySQLite(body) + "`";
          if (looksCSS(body)) return "`" + minifyCSS(body) + "`";
          return full;
        });

        return { contents: source, loader: "default" };
      });

      // Finalize: guarantee single-line outputs regardless of write mode
      build.onEnd(async (result) => {
        // write:false -> mutate in-memory outputFiles
        if (Array.isArray(result.outputFiles) && result.outputFiles.length) {
          for (const file of result.outputFiles) {
            if (/\.(js|mjs|cjs|css|html|txt)$/i.test(file.path)) {
              file.contents = new TextEncoder().encode(
                forceSingleLine(new TextDecoder().decode(file.contents))
              );
            }
          }
          return;
        }

        // write:true -> rewrite files on disk using the metafile outputs
        if (result.metafile && result.metafile.outputs) {
          const outputs = Object.keys(result.metafile.outputs).filter((p) =>
            /\.(js|mjs|cjs|css|html|txt)$/i.test(p)
          );
          await Promise.all(
            outputs.map(async (p) => {
              try {
                const buf = await fs.readFile(p);
                const next = forceSingleLine(buf.toString("utf8"));
                await fs.writeFile(p, next, "utf8");
              } catch {
                /* ignore individual file errors */
              }
            })
          );
        }
      });
    },
  };
}
