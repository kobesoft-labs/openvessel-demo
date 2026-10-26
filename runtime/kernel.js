import {
  CJS_CONDITIONS,
  ESM_CONDITIONS,
  FrameParser,
  KernelError,
  NODE_VERSION,
  ResolveError,
  Resolver,
  SyncServer,
  basename,
  builtinName,
  createChannelBuffer,
  dirname,
  encodeClientFrame,
  encodePathForUrl,
  extname,
  init,
  init_version,
  join,
  kerr,
  normalize,
  parse,
  pathToFileURLString,
  relative,
  resolve
} from "./chunks/chunk-X6I73DHQ.js";
import {
  __commonJS,
  __toESM
} from "./chunks/chunk-CEEP6M5H.js";

// node_modules/cjs-module-lexer/lexer.js
var require_lexer = __commonJS({
  "node_modules/cjs-module-lexer/lexer.js"(exports, module) {
    var source;
    var pos;
    var end;
    var STACK_DEPTH = 2048;
    var openTokenDepth;
    var templateDepth;
    var lastTokenPos;
    var lastSlashWasDivision;
    var templateStack;
    var templateStackDepth;
    var openTokenPosStack;
    var openClassPosStack;
    var nextBraceIsClass;
    var starExportMap;
    var lastStarExportSpecifier;
    var _exports;
    var unsafeGetters;
    var reexports;
    function resetState() {
      openTokenDepth = 0;
      templateDepth = -1;
      lastTokenPos = -1;
      lastSlashWasDivision = false;
      templateStack = new Array(1024);
      templateStackDepth = 0;
      openTokenPosStack = new Array(1024);
      openClassPosStack = new Array(1024);
      nextBraceIsClass = false;
      starExportMap = /* @__PURE__ */ Object.create(null);
      lastStarExportSpecifier = null;
      _exports = /* @__PURE__ */ new Set();
      unsafeGetters = /* @__PURE__ */ new Set();
      reexports = /* @__PURE__ */ new Set();
    }
    var Import = 0;
    var ExportAssign = 1;
    var ExportStar = 2;
    function pushOpenToken(tokenPos) {
      if (openTokenDepth === STACK_DEPTH)
        throw new Error("Maximum nesting depth exceeded.");
      openTokenPosStack[openTokenDepth++] = tokenPos;
    }
    function pushTemplate() {
      if (templateStackDepth === STACK_DEPTH || openTokenDepth === STACK_DEPTH)
        throw new Error("Maximum nesting depth exceeded.");
      templateStack[templateStackDepth++] = templateDepth;
      templateDepth = ++openTokenDepth;
    }
    function parseCJS(source2, name = "@") {
      resetState();
      try {
        parseSource(source2);
      } catch (e) {
        e.message += `
  at ${name}:${source2.slice(0, pos).split("\n").length}:${pos - source2.lastIndexOf("\n", pos - 1)}`;
        e.loc = pos;
        throw e;
      }
      const result = { exports: [..._exports].filter((expt) => expt !== void 0 && !unsafeGetters.has(expt)), reexports: [...reexports].filter((reexpt) => reexpt !== void 0) };
      resetState();
      return result;
    }
    function decode(str2) {
      if (str2[0] === '"' || str2[0] === "'") {
        try {
          const decoded = scanStringLiteral(str2);
          for (let i = 0; i < decoded.length; i++) {
            const surrogatePrefix = decoded.charCodeAt(i) & 64512;
            if (surrogatePrefix < 55296) {
              continue;
            } else if (surrogatePrefix === 55296) {
              if ((decoded.charCodeAt(++i) & 64512) !== 56320)
                return;
            } else {
              return;
            }
          }
          return decoded;
        } catch {
        }
      } else {
        return str2;
      }
    }
    function parseSource(cjsSource) {
      source = cjsSource;
      pos = -1;
      end = source.length - 1;
      let ch = 0;
      if (source.charCodeAt(0) === 35 && source.charCodeAt(1) === 33) {
        if (source.length === 2)
          return true;
        pos += 2;
        while (pos++ < end) {
          ch = source.charCodeAt(pos);
          if (ch === 10 || ch === 13)
            break;
        }
      }
      while (pos++ < end) {
        ch = source.charCodeAt(pos);
        if (ch === 32 || ch < 14 && ch > 8)
          continue;
        if (openTokenDepth === 0) {
          switch (ch) {
            case 105:
              if (source.startsWith("mport", pos + 1) && keywordStart(pos))
                throwIfImportStatement();
              skipTokenRun();
              lastTokenPos = pos;
              continue;
            case 114:
              const startPos = pos;
              if (tryParseRequire(Import) && keywordStart(startPos))
                tryBacktrackAddStarExportBinding(startPos - 1);
              skipTokenRun();
              lastTokenPos = pos;
              continue;
            case 95:
              if (source.startsWith("interopRequireWildcard", pos + 1) && (keywordStart(pos) || source.charCodeAt(pos - 1) === 46)) {
                const startPos2 = pos;
                pos += 23;
                if (source.charCodeAt(pos) === 40) {
                  pos++;
                  pushOpenToken(lastTokenPos);
                  if (tryParseRequire(Import) && keywordStart(startPos2)) {
                    tryBacktrackAddStarExportBinding(startPos2 - 1);
                  }
                }
              } else if (source.startsWith("_export", pos + 1) && (keywordStart(pos) || source.charCodeAt(pos - 1) === 46)) {
                pos += 8;
                if (source.startsWith("Star", pos))
                  pos += 4;
                if (source.charCodeAt(pos) === 40) {
                  pushOpenToken(lastTokenPos);
                  if (source.charCodeAt(pos + 1) === 114) {
                    pos++;
                    tryParseRequire(ExportStar);
                  }
                }
              }
              skipTokenRun();
              lastTokenPos = pos;
              continue;
          }
        }
        switch (ch) {
          case 101:
            if (source.startsWith("xport", pos + 1) && keywordStart(pos)) {
              if (source.charCodeAt(pos + 6) === 115)
                tryParseExportsDotAssign(false);
              else if (openTokenDepth === 0)
                throwIfExportStatement();
            }
            skipTokenRun();
            break;
          case 99:
            if (source.charCodeAt(pos + 1) === 108 && keywordStart(pos) && source.startsWith("ass", pos + 2) && isBrOrWs(source.charCodeAt(pos + 5)))
              nextBraceIsClass = true;
            skipTokenRun();
            break;
          case 109:
            if (source.startsWith("odule", pos + 1) && keywordStart(pos))
              tryParseModuleExportsDotAssign();
            skipTokenRun();
            break;
          case 79:
            if (source.startsWith("bject", pos + 1) && keywordStart(pos))
              tryParseObjectDefineOrKeys(openTokenDepth === 0);
            skipTokenRun();
            break;
          case 40:
            pushOpenToken(lastTokenPos);
            break;
          case 41:
            if (openTokenDepth === 0)
              throw new Error("Unexpected closing bracket.");
            openTokenDepth--;
            break;
          case 123:
            pushOpenToken(lastTokenPos);
            openClassPosStack[openTokenDepth - 1] = nextBraceIsClass;
            nextBraceIsClass = false;
            break;
          case 125:
            if (openTokenDepth === 0)
              throw new Error("Unexpected closing brace.");
            if (openTokenDepth-- === templateDepth) {
              templateDepth = templateStack[--templateStackDepth];
              templateString();
            } else {
              if (templateDepth !== -1 && openTokenDepth < templateDepth)
                throw new Error("Unexpected closing brace.");
            }
            break;
          case 60:
            break;
          case 39:
          case 34:
            stringLiteral(ch);
            break;
          case 47: {
            const next_ch = source.charCodeAt(pos + 1);
            if (next_ch === 47) {
              lineComment();
              continue;
            } else if (next_ch === 42) {
              blockComment();
              continue;
            } else {
              const lastToken = source.charCodeAt(lastTokenPos);
              if (isExpressionPunctuator(lastToken) && !(lastToken === 46 && (source.charCodeAt(lastTokenPos - 1) >= 48 && source.charCodeAt(lastTokenPos - 1) <= 57)) && !(lastToken === 43 && source.charCodeAt(lastTokenPos - 1) === 43) && !(lastToken === 45 && source.charCodeAt(lastTokenPos - 1) === 45) || lastToken === 41 && isParenKeyword(openTokenPosStack[openTokenDepth]) || lastToken === 125 && (isExpressionTerminator(openTokenPosStack[openTokenDepth]) || openClassPosStack[openTokenDepth]) || lastToken === 47 && lastSlashWasDivision || isExpressionKeyword(lastTokenPos) || !lastToken) {
                regularExpression();
                lastSlashWasDivision = false;
              } else {
                lastSlashWasDivision = true;
              }
            }
            break;
          }
          case 96:
            templateString();
            break;
          default:
            if (isTokenRunChar(ch))
              skipTokenRun();
        }
        lastTokenPos = pos;
      }
      if (templateDepth !== -1)
        throw new Error("Unterminated template.");
      if (openTokenDepth)
        throw new Error("Unterminated braces.");
    }
    function tryBacktrackAddStarExportBinding(bPos) {
      while (source.charCodeAt(bPos) === 32 && bPos >= 0)
        bPos--;
      if (source.charCodeAt(bPos) === 61) {
        bPos--;
        while (source.charCodeAt(bPos) === 32 && bPos >= 0)
          bPos--;
        let codePoint;
        const id_end = bPos;
        let identifierStart = false;
        while ((codePoint = codePointAtLast(bPos)) && bPos >= 0) {
          if (codePoint === 92)
            return;
          if (!isIdentifierChar(codePoint, true))
            break;
          identifierStart = isIdentifierStart(codePoint, true);
          bPos -= codePointLen(codePoint);
        }
        if (identifierStart && source.charCodeAt(bPos) === 32) {
          const starExportId = source.slice(bPos + 1, id_end + 1);
          while (source.charCodeAt(bPos) === 32 && bPos >= 0)
            bPos--;
          switch (source.charCodeAt(bPos)) {
            case 114:
              if (!source.startsWith("va", bPos - 2))
                return;
              break;
            case 116:
              if (!source.startsWith("le", bPos - 2) && !source.startsWith("cons", bPos - 4))
                return;
              break;
            default:
              return;
          }
          starExportMap[starExportId] = lastStarExportSpecifier;
        }
      }
    }
    function tryParseObjectHasOwnProperty(it_id) {
      let ch = commentWhitespace();
      if (ch !== 79 || !source.startsWith("bject", pos + 1)) return false;
      pos += 6;
      ch = commentWhitespace();
      if (ch !== 46) return false;
      pos++;
      ch = commentWhitespace();
      if (ch === 112) {
        if (!source.startsWith("rototype", pos + 1)) return false;
        pos += 9;
        ch = commentWhitespace();
        if (ch !== 46) return false;
        pos++;
        ch = commentWhitespace();
      }
      if (ch !== 104 || !source.startsWith("asOwnProperty", pos + 1)) return false;
      pos += 14;
      ch = commentWhitespace();
      if (ch !== 46) return false;
      pos++;
      ch = commentWhitespace();
      if (ch !== 99 || !source.startsWith("all", pos + 1)) return false;
      pos += 4;
      ch = commentWhitespace();
      if (ch !== 40) return false;
      pos++;
      ch = commentWhitespace();
      if (!identifier()) return false;
      ch = commentWhitespace();
      if (ch !== 44) return false;
      pos++;
      ch = commentWhitespace();
      if (!source.startsWith(it_id, pos)) return false;
      pos += it_id.length;
      ch = commentWhitespace();
      if (ch !== 41) return false;
      pos++;
      return true;
    }
    function tryParseObjectDefineOrKeys(keys) {
      pos += 6;
      let revertPos = pos - 1;
      let ch = commentWhitespace();
      if (ch === 46) {
        pos++;
        ch = commentWhitespace();
        if (ch === 100 && source.startsWith("efineProperty", pos + 1)) {
          let expt;
          while (true) {
            pos += 14;
            revertPos = pos - 1;
            ch = commentWhitespace();
            if (ch !== 40) break;
            pos++;
            ch = commentWhitespace();
            if (!readExportsOrModuleDotExports(ch)) break;
            ch = commentWhitespace();
            if (ch !== 44) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 39 && ch !== 34) break;
            const exportPos = pos;
            stringLiteral(ch);
            expt = source.slice(exportPos, ++pos);
            ch = commentWhitespace();
            if (ch !== 44) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 123) break;
            pos++;
            ch = commentWhitespace();
            if (ch === 101) {
              if (!source.startsWith("numerable", pos + 1)) break;
              pos += 10;
              ch = commentWhitespace();
              if (ch !== 58) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 116 || !source.startsWith("rue", pos + 1)) break;
              pos += 4;
              ch = commentWhitespace();
              if (ch !== 44) break;
              pos++;
              ch = commentWhitespace();
            }
            if (ch === 118) {
              if (!source.startsWith("alue", pos + 1)) break;
              pos += 5;
              ch = commentWhitespace();
              if (ch !== 58) break;
              _exports.add(decode(expt));
              pos = revertPos;
              return;
            } else if (ch === 103) {
              if (!source.startsWith("et", pos + 1)) break;
              pos += 3;
              ch = commentWhitespace();
              if (ch === 58) {
                pos++;
                ch = commentWhitespace();
                if (ch !== 102) break;
                if (!source.startsWith("unction", pos + 1)) break;
                pos += 8;
                let lastPos = pos;
                ch = commentWhitespace();
                if (ch !== 40 && (lastPos === pos || !identifier())) break;
                ch = commentWhitespace();
              }
              if (ch !== 40) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 41) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 123) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 114) break;
              if (!source.startsWith("eturn", pos + 1)) break;
              pos += 6;
              ch = commentWhitespace();
              if (!identifier()) break;
              ch = commentWhitespace();
              if (ch === 46) {
                pos++;
                commentWhitespace();
                if (!identifier()) break;
                ch = commentWhitespace();
              } else if (ch === 91) {
                pos++;
                ch = commentWhitespace();
                if (ch === 39 || ch === 34) stringLiteral(ch);
                else break;
                pos++;
                ch = commentWhitespace();
                if (ch !== 93) break;
                pos++;
                ch = commentWhitespace();
              }
              if (ch === 59) {
                pos++;
                ch = commentWhitespace();
              }
              if (ch !== 125) break;
              pos++;
              ch = commentWhitespace();
              if (ch === 44) {
                pos++;
                ch = commentWhitespace();
              }
              if (ch !== 125) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 41) break;
              _exports.add(decode(expt));
              return;
            }
            break;
          }
          if (expt) {
            unsafeGetters.add(decode(expt));
          }
        } else if (keys && ch === 107 && source.startsWith("eys", pos + 1)) {
          while (true) {
            pos += 4;
            revertPos = pos - 1;
            ch = commentWhitespace();
            if (ch !== 40) break;
            pos++;
            ch = commentWhitespace();
            const id_start = pos;
            if (!identifier()) break;
            const id2 = source.slice(id_start, pos);
            ch = commentWhitespace();
            if (ch !== 41) break;
            revertPos = pos++;
            ch = commentWhitespace();
            if (ch !== 46) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 102 || !source.startsWith("orEach", pos + 1)) break;
            pos += 7;
            ch = commentWhitespace();
            revertPos = pos - 1;
            if (ch !== 40) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 102 || !source.startsWith("unction", pos + 1)) break;
            pos += 8;
            ch = commentWhitespace();
            if (ch !== 40) break;
            pos++;
            ch = commentWhitespace();
            const it_id_start = pos;
            if (!identifier()) break;
            const it_id = source.slice(it_id_start, pos);
            ch = commentWhitespace();
            if (ch !== 41) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 123) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 105 || source.charCodeAt(pos + 1) !== 102) break;
            pos += 2;
            ch = commentWhitespace();
            if (ch !== 40) break;
            pos++;
            ch = commentWhitespace();
            if (!source.startsWith(it_id, pos)) break;
            pos += it_id.length;
            ch = commentWhitespace();
            if (ch === 61) {
              if (!source.startsWith("==", pos + 1)) break;
              pos += 3;
              ch = commentWhitespace();
              if (ch !== 34 && ch !== 39) break;
              let quot = ch;
              if (!source.startsWith("default", pos + 1)) break;
              pos += 8;
              ch = commentWhitespace();
              if (ch !== quot) break;
              pos += 1;
              ch = commentWhitespace();
              if (ch !== 124 || source.charCodeAt(pos + 1) !== 124) break;
              pos += 2;
              ch = commentWhitespace();
              if (source.slice(pos, pos + it_id.length) !== it_id) break;
              pos += it_id.length;
              ch = commentWhitespace();
              if (ch !== 61 || source.slice(pos + 1, pos + 3) !== "==") break;
              pos += 3;
              ch = commentWhitespace();
              if (ch !== 34 && ch !== 39) break;
              quot = ch;
              if (!source.startsWith("__esModule", pos + 1)) break;
              pos += 11;
              ch = commentWhitespace();
              if (ch !== quot) break;
              pos += 1;
              ch = commentWhitespace();
              if (ch !== 41) break;
              pos += 1;
              ch = commentWhitespace();
              if (ch !== 114 || !source.startsWith("eturn", pos + 1)) break;
              pos += 6;
              ch = commentWhitespace();
              if (ch === 59)
                pos++;
              ch = commentWhitespace();
              if (ch === 105 && source.charCodeAt(pos + 1) === 102) {
                let inIf = true;
                pos += 2;
                ch = commentWhitespace();
                if (ch !== 40) break;
                pos++;
                const ifInnerPos = pos;
                if (tryParseObjectHasOwnProperty(it_id)) {
                  ch = commentWhitespace();
                  if (ch !== 41) break;
                  pos++;
                  ch = commentWhitespace();
                  if (ch !== 114 || !source.startsWith("eturn", pos + 1)) break;
                  pos += 6;
                  ch = commentWhitespace();
                  if (ch === 59)
                    pos++;
                  ch = commentWhitespace();
                  if (ch === 105 && source.charCodeAt(pos + 1) === 102) {
                    pos += 2;
                    ch = commentWhitespace();
                    if (ch !== 40) break;
                    pos++;
                  } else {
                    inIf = false;
                  }
                } else {
                  pos = ifInnerPos;
                }
                if (inIf) {
                  if (!source.startsWith(it_id, pos)) break;
                  pos += it_id.length;
                  ch = commentWhitespace();
                  if (ch !== 105 || !source.startsWith("n ", pos + 1)) break;
                  pos += 3;
                  ch = commentWhitespace();
                  if (!readExportsOrModuleDotExports(ch)) break;
                  ch = commentWhitespace();
                  if (ch !== 38 || source.charCodeAt(pos + 1) !== 38) break;
                  pos += 2;
                  ch = commentWhitespace();
                  if (!readExportsOrModuleDotExports(ch)) break;
                  ch = commentWhitespace();
                  if (ch !== 91) break;
                  pos++;
                  ch = commentWhitespace();
                  if (!source.startsWith(it_id, pos)) break;
                  pos += it_id.length;
                  ch = commentWhitespace();
                  if (ch !== 93) break;
                  pos++;
                  ch = commentWhitespace();
                  if (ch !== 61 || !source.startsWith("==", pos + 1)) break;
                  pos += 3;
                  ch = commentWhitespace();
                  if (!source.startsWith(id2, pos)) break;
                  pos += id2.length;
                  ch = commentWhitespace();
                  if (ch !== 91) break;
                  pos++;
                  ch = commentWhitespace();
                  if (!source.startsWith(it_id, pos)) break;
                  pos += it_id.length;
                  ch = commentWhitespace();
                  if (ch !== 93) break;
                  pos++;
                  ch = commentWhitespace();
                  if (ch !== 41) break;
                  pos++;
                  ch = commentWhitespace();
                  if (ch !== 114 || !source.startsWith("eturn", pos + 1)) break;
                  pos += 6;
                  ch = commentWhitespace();
                  if (ch === 59)
                    pos++;
                  ch = commentWhitespace();
                }
              }
            } else if (ch === 33) {
              if (!source.startsWith("==", pos + 1)) break;
              pos += 3;
              ch = commentWhitespace();
              if (ch !== 34 && ch !== 39) break;
              const quot = ch;
              if (!source.startsWith("default", pos + 1)) break;
              pos += 8;
              ch = commentWhitespace();
              if (ch !== quot) break;
              pos += 1;
              ch = commentWhitespace();
              if (ch === 38) {
                if (source.charCodeAt(pos + 1) !== 38) break;
                pos += 2;
                ch = commentWhitespace();
                if (ch !== 33) break;
                pos += 1;
                ch = commentWhitespace();
                if (ch === 79 && source.startsWith("bject", pos + 1) && source[pos + 6] === ".") {
                  if (!tryParseObjectHasOwnProperty(it_id)) break;
                } else if (identifier()) {
                  ch = commentWhitespace();
                  if (ch !== 46) break;
                  pos++;
                  ch = commentWhitespace();
                  if (ch !== 104 || !source.startsWith("asOwnProperty", pos + 1)) break;
                  pos += 14;
                  ch = commentWhitespace();
                  if (ch !== 40) break;
                  pos += 1;
                  ch = commentWhitespace();
                  if (!source.startsWith(it_id, pos)) break;
                  pos += it_id.length;
                  ch = commentWhitespace();
                  if (ch !== 41) break;
                  pos += 1;
                } else break;
                ch = commentWhitespace();
              }
              if (ch !== 41) break;
              pos += 1;
              ch = commentWhitespace();
            } else break;
            if (readExportsOrModuleDotExports(ch)) {
              ch = commentWhitespace();
              if (ch !== 91) break;
              pos++;
              ch = commentWhitespace();
              if (source.slice(pos, pos + it_id.length) !== it_id) break;
              pos += it_id.length;
              ch = commentWhitespace();
              if (ch !== 93) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 61) break;
              pos++;
              ch = commentWhitespace();
              if (source.slice(pos, pos + id2.length) !== id2) break;
              pos += id2.length;
              ch = commentWhitespace();
              if (ch !== 91) break;
              pos++;
              ch = commentWhitespace();
              if (source.slice(pos, pos + it_id.length) !== it_id) break;
              pos += it_id.length;
              ch = commentWhitespace();
              if (ch !== 93) break;
              pos++;
              ch = commentWhitespace();
              if (ch === 59) {
                pos++;
                ch = commentWhitespace();
              }
            } else if (ch === 79) {
              if (source.slice(pos + 1, pos + 6) !== "bject") break;
              pos += 6;
              ch = commentWhitespace();
              if (ch !== 46) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 100 || !source.startsWith("efineProperty", pos + 1)) break;
              pos += 14;
              ch = commentWhitespace();
              if (ch !== 40) break;
              pos++;
              ch = commentWhitespace();
              if (!readExportsOrModuleDotExports(ch)) break;
              ch = commentWhitespace();
              if (ch !== 44) break;
              pos++;
              ch = commentWhitespace();
              if (!source.startsWith(it_id, pos)) break;
              pos += it_id.length;
              ch = commentWhitespace();
              if (ch !== 44) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 123) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 101 || !source.startsWith("numerable", pos + 1)) break;
              pos += 10;
              ch = commentWhitespace();
              if (ch !== 58) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 116 && !source.startsWith("rue", pos + 1)) break;
              pos += 4;
              ch = commentWhitespace();
              if (ch !== 44) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 103 || !source.startsWith("et", pos + 1)) break;
              pos += 3;
              ch = commentWhitespace();
              if (ch === 58) {
                pos++;
                ch = commentWhitespace();
                if (ch !== 102) break;
                if (!source.startsWith("unction", pos + 1)) break;
                pos += 8;
                let lastPos = pos;
                ch = commentWhitespace();
                if (ch !== 40 && (lastPos === pos || !identifier())) break;
                ch = commentWhitespace();
              }
              if (ch !== 40) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 41) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 123) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 114 || !source.startsWith("eturn", pos + 1)) break;
              pos += 6;
              ch = commentWhitespace();
              if (!source.startsWith(id2, pos)) break;
              pos += id2.length;
              ch = commentWhitespace();
              if (ch !== 91) break;
              pos++;
              ch = commentWhitespace();
              if (!source.startsWith(it_id, pos)) break;
              pos += it_id.length;
              ch = commentWhitespace();
              if (ch !== 93) break;
              pos++;
              ch = commentWhitespace();
              if (ch === 59) {
                pos++;
                ch = commentWhitespace();
              }
              if (ch !== 125) break;
              pos++;
              ch = commentWhitespace();
              if (ch === 44) {
                pos++;
                ch = commentWhitespace();
              }
              if (ch !== 125) break;
              pos++;
              ch = commentWhitespace();
              if (ch !== 41) break;
              pos++;
              ch = commentWhitespace();
              if (ch === 59) {
                pos++;
                ch = commentWhitespace();
              }
            } else break;
            if (ch !== 125) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 41) break;
            const starExportSpecifier = starExportMap[id2];
            if (starExportSpecifier) {
              reexports.add(decode(starExportSpecifier));
              pos = revertPos;
              return;
            }
            return;
          }
        }
      }
      pos = revertPos;
    }
    function readExportsOrModuleDotExports(ch) {
      const revertPos = pos;
      if (ch === 109 && source.startsWith("odule", pos + 1)) {
        pos += 6;
        ch = commentWhitespace();
        if (ch !== 46) {
          pos = revertPos;
          return false;
        }
        pos++;
        ch = commentWhitespace();
      }
      if (ch === 101 && source.startsWith("xports", pos + 1)) {
        pos += 7;
        return true;
      } else {
        pos = revertPos;
        return false;
      }
    }
    function tryParseModuleExportsDotAssign() {
      pos += 6;
      const revertPos = pos - 1;
      let ch = commentWhitespace();
      if (ch === 46) {
        pos++;
        ch = commentWhitespace();
        if (ch === 101 && source.startsWith("xports", pos + 1)) {
          tryParseExportsDotAssign(true);
          return;
        }
      }
      pos = revertPos;
    }
    function tryParseExportsDotAssign(assign) {
      pos += 7;
      const revertPos = pos - 1;
      let ch = commentWhitespace();
      switch (ch) {
        // exports.asdf
        case 46: {
          pos++;
          ch = commentWhitespace();
          const startPos = pos;
          if (identifier()) {
            const endPos = pos;
            ch = commentWhitespace();
            if (ch === 61) {
              _exports.add(decode(source.slice(startPos, endPos)));
              return;
            }
          }
          break;
        }
        // exports['asdf']
        case 91: {
          pos++;
          ch = commentWhitespace();
          if (ch === 39 || ch === 34) {
            const startPos = pos;
            stringLiteral(ch);
            const endPos = ++pos;
            ch = commentWhitespace();
            if (ch !== 93) break;
            pos++;
            ch = commentWhitespace();
            if (ch !== 61) break;
            _exports.add(decode(source.slice(startPos, endPos)));
          }
          break;
        }
        // module.exports =
        case 61: {
          if (assign) {
            if (reexports.size)
              reexports = /* @__PURE__ */ new Set();
            pos++;
            ch = commentWhitespace();
            if (ch === 123) {
              tryParseLiteralExports();
              return;
            }
            if (ch === 114)
              tryParseRequire(ExportAssign);
          }
        }
      }
      pos = revertPos;
    }
    function tryParseRequire(requireType) {
      const revertPos = pos;
      if (source.startsWith("equire", pos + 1)) {
        pos += 7;
        let ch = commentWhitespace();
        if (ch === 40) {
          pos++;
          ch = commentWhitespace();
          const reexportStart = pos;
          if (ch === 39 || ch === 34) {
            stringLiteral(ch);
            const reexportEnd = ++pos;
            ch = commentWhitespace();
            if (ch === 41) {
              switch (requireType) {
                case ExportAssign:
                  reexports.add(decode(source.slice(reexportStart, reexportEnd)));
                  return true;
                case ExportStar:
                  reexports.add(decode(source.slice(reexportStart, reexportEnd)));
                  return true;
                default:
                  lastStarExportSpecifier = decode(source.slice(reexportStart, reexportEnd));
                  return true;
              }
            }
          }
        }
        pos = revertPos;
      }
      return false;
    }
    function tryParseLiteralExports() {
      const revertPos = pos - 1;
      while (pos++ < end) {
        let ch = commentWhitespace();
        const startPos = pos;
        if (identifier()) {
          const endPos = pos;
          ch = commentWhitespace();
          if (ch === 58) {
            pos++;
            ch = commentWhitespace();
            if (!identifier()) {
              pos = revertPos;
              return;
            }
            ch = source.charCodeAt(pos);
          }
          _exports.add(decode(source.slice(startPos, endPos)));
        } else if (ch === 46 && source.startsWith("..", pos + 1)) {
          pos += 3;
          if (source.charCodeAt(pos) === 114 && tryParseRequire(ExportAssign)) {
            pos++;
          } else if (!identifier()) {
            pos = revertPos;
            return;
          }
          ch = commentWhitespace();
        } else if (ch === 39 || ch === 34) {
          const startPos2 = pos;
          stringLiteral(ch);
          const endPos = ++pos;
          ch = commentWhitespace();
          if (ch === 58) {
            pos++;
            ch = commentWhitespace();
            if (!identifier()) {
              pos = revertPos;
              return;
            }
            ch = source.charCodeAt(pos);
            _exports.add(decode(source.slice(startPos2, endPos)));
          }
        } else {
          pos = revertPos;
          return;
        }
        if (ch === 125)
          return;
        if (ch !== 44) {
          pos = revertPos;
          return;
        }
      }
    }
    function scanStringLiteral(source2) {
      const quote = source2[0];
      if (quote === '"') {
        try {
          return JSON.parse(source2);
        } catch {
        }
      } else if (quote === "'" && source2.length > 1 && source2[source2.length - 1] === "'" && source2.indexOf('"') === -1) {
        try {
          return JSON.parse('"' + source2.slice(1, -1) + '"');
        } catch {
        }
      }
      let parsed = "";
      let index = { v: 1 };
      while (index.v < source2.length) {
        const char = source2[index.v];
        switch (char) {
          case quote: {
            return parsed;
          }
          case "\\": {
            ++index.v;
            parsed += scanEscapeSequence(source2, index);
            break;
          }
          case "\r":
          case "\n": {
            throw new SyntaxError();
          }
          default: {
            ++index.v;
            parsed += char;
          }
        }
      }
      throw new SyntaxError();
    }
    function scanEscapeSequence(source2, index) {
      if (index.v === source2.length) {
        throw new SyntaxError();
      }
      const char = source2[index.v];
      ++index.v;
      switch (char) {
        case "\r": {
          if (source2[index.v] === "\n") {
            ++index.v;
          }
        }
        case "\n":
        case "\u2028":
        case "\u2029": {
          return "";
        }
        case "r": {
          return "\r";
        }
        case "n": {
          return "\n";
        }
        case "t": {
          return "	";
        }
        case "b": {
          return "\b";
        }
        case "f": {
          return "\f";
        }
        case "v": {
          return "\v";
        }
        case "x": {
          return scanHexEscapeSequence(source2, index);
        }
        case "u": {
          return scanUnicodeEscapeSequence(source2, index);
        }
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7": {
          return scanOctalEscapeSequence(char, source2, index);
        }
        default: {
          return char;
        }
      }
    }
    function scanHexEscapeSequence(source2, index) {
      const a = readHex(source2[index.v]);
      ++index.v;
      const b = readHex(source2[index.v]);
      ++index.v;
      return String.fromCodePoint(a * 16 + b);
    }
    function scanUnicodeEscapeSequence(source2, index) {
      let result = 0;
      if (source2[index.v] === "{") {
        ++index.v;
        do {
          result = result * 16 + readHex(source2[index.v]);
          if (result > 1114111) {
            throw new SyntaxError();
          }
          ++index.v;
        } while (source2[index.v] !== "}");
        ++index.v;
      } else {
        for (let i = 0; i < 4; ++i) {
          result = result * 16 + readHex(source2[index.v]);
          ++index.v;
        }
      }
      return String.fromCodePoint(result);
    }
    function scanOctalEscapeSequence(char, source2, index) {
      let toRead = char <= "3" ? 2 : 1;
      let result = +char;
      do {
        char = source2[index.v];
        if (char < "0" || char > "7") {
          break;
        }
        result = result * 8 + +char;
        ++index.v;
        --toRead;
      } while (toRead > 0);
      return String.fromCodePoint(result);
    }
    function readHex(char) {
      if (char >= "0" && char <= "9") {
        return +char;
      } else if (char >= "a" && char <= "f") {
        return char.charCodeAt(0) - 87;
      } else if (char >= "A" && char <= "F") {
        return char.charCodeAt(0) - 55;
      }
      throw new SyntaxError();
    }
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF\u1AC0\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938];
    var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
    function isInAstralSet(code, set) {
      let pos2 = 65536;
      for (let i = 0; i < set.length; i += 2) {
        pos2 += set[i];
        if (pos2 > code) return false;
        pos2 += set[i + 1];
        if (pos2 >= code) return true;
      }
    }
    function isIdentifierStart(code, astral) {
      if (code < 65) return code === 36;
      if (code < 91) return true;
      if (code < 97) return code === 95;
      if (code < 123) return true;
      if (code <= 65535) return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
      if (astral === false) return false;
      return isInAstralSet(code, astralIdentifierStartCodes);
    }
    function isIdentifierChar(code, astral) {
      if (code < 48) return code === 36;
      if (code < 58) return true;
      if (code < 65) return false;
      if (code < 91) return true;
      if (code < 97) return code === 95;
      if (code < 123) return true;
      if (code <= 65535) return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
      if (astral === false) return false;
      return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
    }
    function identifier() {
      let ch = source.codePointAt(pos);
      if (!isIdentifierStart(ch, true) || ch === "\\")
        return false;
      pos += codePointLen(ch);
      while (ch = source.codePointAt(pos)) {
        if (isIdentifierChar(ch, true)) {
          pos += codePointLen(ch);
        } else if (ch === "\\") {
          return false;
        } else {
          break;
        }
      }
      return true;
    }
    function codePointLen(ch) {
      if (ch < 65536) return 1;
      return 2;
    }
    function codePointAtLast(bPos) {
      const ch = source.charCodeAt(bPos);
      if ((ch & 64512) === 56320)
        return ((source.charCodeAt(bPos - 1) & 1023) << 10 | ch & 1023) + 65536;
      return ch;
    }
    function esmSyntaxErr(msg) {
      return Object.assign(new Error(msg), { code: "ERR_LEXER_ESM_SYNTAX" });
    }
    function throwIfImportStatement() {
      const startPos = pos;
      pos += 6;
      const ch = commentWhitespace();
      switch (ch) {
        // dynamic import
        case 40:
          pushOpenToken(startPos);
          return;
        // import.meta
        case 46:
          throw esmSyntaxErr("Unexpected import.meta in CJS module.");
        default:
          if (pos === startPos + 6)
            break;
        case 34:
        case 39:
        case 123:
        case 42:
          if (openTokenDepth !== 0) {
            pos--;
            return;
          }
          throw esmSyntaxErr("Unexpected import statement in CJS module.");
      }
    }
    function throwIfExportStatement() {
      pos += 6;
      const curPos = pos;
      const ch = commentWhitespace();
      if (pos === curPos && !isPunctuator(ch))
        return;
      throw esmSyntaxErr("Unexpected export statement in CJS module.");
    }
    function commentWhitespace() {
      let ch;
      do {
        ch = source.charCodeAt(pos);
        if (ch === 47) {
          const next_ch = source.charCodeAt(pos + 1);
          if (next_ch === 47)
            lineComment();
          else if (next_ch === 42)
            blockComment();
          else
            return ch;
        } else if (!isBrOrWs(ch)) {
          return ch;
        }
      } while (pos++ < end);
      return ch;
    }
    function templateString() {
      while (pos++ < end) {
        const ch = source.charCodeAt(pos);
        if (ch === 36 && source.charCodeAt(pos + 1) === 123) {
          pos++;
          pushTemplate();
          return;
        }
        if (ch === 96)
          return;
        if (ch === 92)
          pos++;
      }
      syntaxError();
    }
    function blockComment() {
      pos++;
      while (pos++ < end) {
        const ch = source.charCodeAt(pos);
        if (ch === 42 && source.charCodeAt(pos + 1) === 47) {
          pos++;
          return;
        }
      }
    }
    function lineComment() {
      while (pos++ < end) {
        const ch = source.charCodeAt(pos);
        if (ch === 10 || ch === 13)
          return;
      }
    }
    function stringLiteral(quote) {
      while (pos++ < end) {
        let ch = source.charCodeAt(pos);
        if (ch === quote)
          return;
        if (ch === 92) {
          ch = source.charCodeAt(++pos);
          if (ch === 13 && source.charCodeAt(pos + 1) === 10)
            pos++;
        } else if (isBr(ch))
          break;
      }
      throw new Error("Unterminated string.");
    }
    function regexCharacterClass() {
      while (pos++ < end) {
        let ch = source.charCodeAt(pos);
        if (ch === 93)
          return ch;
        if (ch === 92)
          pos++;
        else if (ch === 10 || ch === 13)
          break;
      }
      throw new Error("Syntax error reading regular expression class.");
    }
    function regularExpression() {
      while (pos++ < end) {
        let ch = source.charCodeAt(pos);
        if (ch === 47)
          return;
        if (ch === 91)
          ch = regexCharacterClass();
        else if (ch === 92)
          pos++;
        else if (ch === 10 || ch === 13)
          break;
      }
      throw new Error("Syntax error reading regular expression.");
    }
    function isBr(c) {
      return c === 13 || c === 10;
    }
    function isBrOrWs(c) {
      return c > 8 && c < 14 || c === 32 || c === 160;
    }
    function isBrOrWsOrPunctuatorNotDot(c) {
      return c > 8 && c < 14 || c === 32 || c === 160 || isPunctuator(c) && c !== 46;
    }
    function isTokenRunChar(ch) {
      const lower = ch | 32;
      return lower >= 97 && lower <= 122 || ch >= 48 && ch <= 57 || ch === 36 || ch === 95 || ch === 92 || ch > 127 && ch !== 160;
    }
    function skipTokenRun() {
      if (!isTokenRunChar(source.charCodeAt(pos)))
        return;
      while (isTokenRunChar(source.charCodeAt(pos + 1)))
        pos++;
    }
    function keywordStart(pos2) {
      return pos2 === 0 || isBrOrWsOrPunctuatorNotDot(source.charCodeAt(pos2 - 1));
    }
    function readPrecedingKeyword(pos2, match) {
      if (pos2 < match.length - 1)
        return false;
      return source.startsWith(match, pos2 - match.length + 1) && (pos2 === 0 || isBrOrWsOrPunctuatorNotDot(source.charCodeAt(pos2 - match.length)));
    }
    function readPrecedingKeyword1(pos2, ch) {
      return source.charCodeAt(pos2) === ch && (pos2 === 0 || isBrOrWsOrPunctuatorNotDot(source.charCodeAt(pos2 - 1)));
    }
    function isExpressionKeyword(pos2) {
      switch (source.charCodeAt(pos2)) {
        case 100:
          switch (source.charCodeAt(pos2 - 1)) {
            case 105:
              return readPrecedingKeyword(pos2 - 2, "vo");
            case 108:
              return readPrecedingKeyword(pos2 - 2, "yie");
            default:
              return false;
          }
        case 101:
          switch (source.charCodeAt(pos2 - 1)) {
            case 115:
              switch (source.charCodeAt(pos2 - 2)) {
                case 108:
                  return readPrecedingKeyword1(
                    pos2 - 3,
                    101
                    /*e*/
                  );
                case 97:
                  return readPrecedingKeyword1(
                    pos2 - 3,
                    99
                    /*c*/
                  );
                default:
                  return false;
              }
            case 116:
              return readPrecedingKeyword(pos2 - 2, "dele");
            default:
              return false;
          }
        case 102:
          if (source.charCodeAt(pos2 - 1) !== 111 || source.charCodeAt(pos2 - 2) !== 101)
            return false;
          switch (source.charCodeAt(pos2 - 3)) {
            case 99:
              return readPrecedingKeyword(pos2 - 4, "instan");
            case 112:
              return readPrecedingKeyword(pos2 - 4, "ty");
            default:
              return false;
          }
        case 110:
          return readPrecedingKeyword1(
            pos2 - 1,
            105
            /*i*/
          ) || readPrecedingKeyword(pos2 - 1, "retur");
        case 111:
          return readPrecedingKeyword1(
            pos2 - 1,
            100
            /*d*/
          );
        case 114:
          return readPrecedingKeyword(pos2 - 1, "debugge");
        case 116:
          return readPrecedingKeyword(pos2 - 1, "awai");
        case 119:
          switch (source.charCodeAt(pos2 - 1)) {
            case 101:
              return readPrecedingKeyword1(
                pos2 - 2,
                110
                /*n*/
              );
            case 111:
              return readPrecedingKeyword(pos2 - 2, "thr");
            default:
              return false;
          }
      }
      return false;
    }
    function isParenKeyword(curPos) {
      return source.charCodeAt(curPos) === 101 && source.startsWith("whil", curPos - 4) || source.charCodeAt(curPos) === 114 && source.startsWith("fo", curPos - 2) || source.charCodeAt(curPos - 1) === 105 && source.charCodeAt(curPos) === 102;
    }
    function isPunctuator(ch) {
      return ch === 33 || ch === 37 || ch === 38 || ch > 39 && ch < 48 || ch > 57 && ch < 64 || ch === 91 || ch === 93 || ch === 94 || ch > 122 && ch < 127;
    }
    function isExpressionPunctuator(ch) {
      return ch === 33 || ch === 37 || ch === 38 || ch > 39 && ch < 47 && ch !== 41 || ch > 57 && ch < 64 || ch === 91 || ch === 94 || ch > 122 && ch < 127 && ch !== 125;
    }
    function isExpressionTerminator(curPos) {
      switch (source.charCodeAt(curPos)) {
        case 62:
          return source.charCodeAt(curPos - 1) === 61;
        case 59:
        case 41:
          return true;
        case 104:
          return source.startsWith("catc", curPos - 4);
        case 121:
          return source.startsWith("finall", curPos - 6);
        case 101:
          return source.startsWith("els", curPos - 3);
      }
      return false;
    }
    var initPromise = Promise.resolve();
    module.exports.init = () => initPromise;
    module.exports.initSync = () => {
    };
    module.exports.parse = parseCJS;
  }
});

// src/shared/policy.ts
var PRESETS = {
  npm: ["registry.npmjs.org", "registry.npmjs.com", "registry.yarnpkg.com", "registry.npmmirror.com"],
  fonts: ["fonts.googleapis.com", "fonts.gstatic.com", "fonts.bunny.net", "api.fontshare.com", "cdn.fontshare.com", "api.fontsource.org", "use.typekit.net", "p.typekit.net", "rsms.me"],
  icons: ["api.iconify.design", "api.simplesvg.com", "api.unisvg.com", "code.iconify.design", "kit.fontawesome.com", "ka-f.fontawesome.com"],
  cdn: ["cdn.jsdelivr.net", "fastly.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "esm.sh", "cdn.skypack.dev", "ga.jspm.io"],
  github: ["github.com", "codeload.github.com", "raw.githubusercontent.com", "objects.githubusercontent.com", "api.github.com", "gist.githubusercontent.com"]
};
var DEFAULT_POLICY = {
  mode: "ask",
  presets: ["npm", "fonts", "icons", "cdn"],
  allow: [],
  deny: []
};
function canonicalHost(h) {
  try {
    return new URL(`http://${h.includes(":") ? `[${h}]` : h}/`).hostname.replace(/^\[|\]$/g, "");
  } catch {
    return null;
  }
}
function parsePattern(pattern) {
  const p = pattern.trim().toLowerCase();
  if (!p) return null;
  if (p.startsWith("[")) {
    const m2 = /^\[([^\]]+)\](?::(\d+))?$/.exec(p);
    if (!m2) return null;
    const host2 = canonicalHost(m2[1]);
    return host2 === null ? null : { host: host2, port: m2[2] ?? null };
  }
  if (p.indexOf(":") !== p.lastIndexOf(":")) {
    const host2 = canonicalHost(p);
    return host2 === null ? null : { host: host2, port: null };
  }
  const m = /^(.*):(\d+)$/.exec(p);
  const host = m ? m[1] : p;
  const canon = host.includes("*") ? host : canonicalHost(host);
  return canon === null ? null : { host: canon, port: m ? m[2] : null };
}
function matches(pattern, host, port) {
  const p = parsePattern(pattern);
  if (!p) return false;
  if (p.port && p.port !== port) return false;
  if (p.host === "*") return true;
  if (p.host.startsWith("*.")) {
    const base = p.host.slice(2);
    return host === base || host.endsWith("." + base);
  }
  return host === p.host;
}
function hostOf(url) {
  const u = new URL(url);
  const port = u.port || (u.protocol === "https:" || u.protocol === "wss:" ? "443" : u.protocol === "http:" || u.protocol === "ws:" ? "80" : "");
  return { host: u.hostname.toLowerCase().replace(/^\[|\]$/g, ""), port, origin: u.origin };
}
function isLoopbackHost(hostname2) {
  const h = canonicalHost(hostname2.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, ""));
  if (h === null) return false;
  return h === "localhost" || h.endsWith(".localhost") || /^127\./.test(h) || h === "0.0.0.0" || h === "::1" || h === "::" || /^::ffff:7f[0-9a-f]{2}:/.test(h);
}
function decide(policy2, url, sessionAllow2, sessionDeny2) {
  let h;
  let u;
  try {
    h = hostOf(url);
    u = new URL(url);
  } catch {
    return "deny";
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return "deny";
  if (isLoopbackHost(h.host)) return "deny";
  for (const d of policy2.deny) if (matches(d, h.host, h.port)) return "deny";
  if (sessionDeny2.has(h.host)) return "deny";
  if (policy2.mode === "allow-all") return "allow";
  if (sessionAllow2.has(h.host)) return "allow";
  for (const name of policy2.presets) for (const p of PRESETS[name]) if (matches(p, h.host, h.port)) return "allow";
  for (const a of policy2.allow) if (matches(a, h.host, h.port)) return "allow";
  return policy2.mode === "ask" ? "ask" : "deny";
}
function normalizePolicy(p) {
  return {
    mode: p?.mode ?? DEFAULT_POLICY.mode,
    // own properties only: inherited names such as "toString" are not presets
    presets: [...p?.presets ?? DEFAULT_POLICY.presets].filter((x) => typeof x === "string" && Object.prototype.hasOwnProperty.call(PRESETS, x)),
    allow: [...p?.allow ?? []].filter((x) => typeof x === "string"),
    deny: [...p?.deny ?? []].filter((x) => typeof x === "string")
  };
}

// src/kernel/base.ts
var RUNTIME_BASE = typeof location !== "undefined" ? new URL(".", location.href).href.replace(/\/$/, "") : "";

// src/kernel/vfs.ts
var S_IFMT = 61440;
var S_IFSOCK = 49152;
var S_IFLNK = 40960;
var S_IFREG = 32768;
var S_IFBLK = 24576;
var S_IFDIR = 16384;
var S_IFCHR = 8192;
var S_IFIFO = 4096;
var DEV_ID = 2049;
var MAX_SYMLINKS = 40;
var PATH_MAX = 4096;
var NAME_MAX = 255;
var byteLength = (s) => s.length * 3 <= NAME_MAX ? s.length : textEncoder.encode(s).length;
function checkNames(path, parts) {
  if (path.length >= PATH_MAX / 3 && textEncoder.encode(path).length >= PATH_MAX) throw kerr("ENAMETOOLONG");
  for (const part of parts) if (part.length > NAME_MAX / 3 && byteLength(part) > NAME_MAX) throw kerr("ENAMETOOLONG");
}
var textEncoder = new TextEncoder();
function isDir(n) {
  return (n.mode & S_IFMT) === S_IFDIR;
}
function isFile(n) {
  return (n.mode & S_IFMT) === S_IFREG;
}
function isLink(n) {
  return (n.mode & S_IFMT) === S_IFLNK;
}
var PROC_UID = 1e3;
var PROC_GID = 1e3;
function permits(n, want) {
  const shift = n.uid === PROC_UID ? 6 : n.gid === PROC_GID ? 3 : 0;
  return (n.mode >> shift & want) === want;
}
function splitPath(p) {
  const out = [];
  for (const part of p.split("/")) {
    if (part === "" || part === ".") continue;
    out.push(part);
  }
  return out;
}
var VFS = class {
  root;
  nextIno = 1;
  watchers = /* @__PURE__ */ new Set();
  /** Bumped on every mutation; lets callers cache lookups cheaply. */
  generation = 0;
  /**
   * The file mode creation mask that mkdir() and file creation apply when the caller passes none:
   * 0o022 for the host API and the kernel's own files. System calls pass the process's umask, and
   * builtin programs get a view that applies theirs (forProcess()).
   */
  umask = 18;
  constructor() {
    this.root = this.newInode(S_IFDIR | 493);
    this.root.entries = /* @__PURE__ */ new Map();
    this.root.parent = this.root;
    this.root.nlink = 2;
  }
  newInode(mode) {
    const now = Date.now();
    return {
      ino: this.nextIno++,
      mode,
      uid: 1e3,
      gid: 1e3,
      nlink: 1,
      atimeMs: now,
      mtimeMs: now,
      ctimeMs: now,
      birthtimeMs: now,
      size: 0
    };
  }
  onChange(fn) {
    this.watchers.add(fn);
    return () => this.watchers.delete(fn);
  }
  /**
   * The same file system for a builtin program, creating files with the process's umask. (Builtins
   * call the VFS synchronously, so the mask is swapped in for the length of each call only.)
   */
  forProcess(proc) {
    const wrapped = /* @__PURE__ */ new Map();
    return new Proxy(this, {
      get: (t, k) => {
        const v = Reflect.get(t, k);
        if (typeof v !== "function") return v;
        let w = wrapped.get(k);
        if (!w) {
          w = (...args) => {
            const prev = t.umask;
            t.umask = proc.umask ?? prev;
            try {
              return v.apply(t, args);
            } finally {
              t.umask = prev;
            }
          };
          wrapped.set(k, w);
        }
        return w;
      }
    });
  }
  emit(type, path) {
    this.generation++;
    if (this.watchers.size === 0) return;
    for (const w of this.watchers) w({ type, path });
  }
  // ---------- path walking ----------
  /**
   * Walks `path` (absolute) and returns the inode. Follows symlinks in all
   * intermediate components; follows the last one only if `follow`.
   */
  lookup(path, follow = true) {
    return this.walk(path, follow, 0).node;
  }
  tryLookup(path, follow = true) {
    try {
      return this.lookup(path, follow);
    } catch {
      return void 0;
    }
  }
  walk(path, follow, depth) {
    if (depth > MAX_SYMLINKS) throw kerr("ELOOP");
    const parts = splitPath(path);
    checkNames(path, parts);
    let node = this.root;
    let realParts = [];
    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      if (!isDir(node)) throw kerr("ENOTDIR");
      if (name === "..") {
        node = node.parent;
        realParts.pop();
        continue;
      }
      const child = node.entries.get(name);
      if (!child) throw kerr("ENOENT");
      const last = i === parts.length - 1;
      if (isLink(child) && (!last || follow)) {
        const target = child.target;
        const base = target.startsWith("/") ? target : "/" + realParts.join("/") + "/" + target;
        const res = this.walk(base, true, depth + 1);
        node = res.node;
        realParts = splitPath(res.real);
        continue;
      }
      node = child;
      realParts.push(name);
    }
    if (path.endsWith("/") && parts.length > 0 && !isDir(node)) throw kerr("ENOTDIR");
    return { node, real: "/" + realParts.join("/") };
  }
  realpath(path) {
    return this.walk(path, true, 0).real;
  }
  /** Returns the parent directory inode and the final name component. */
  lookupParent(path, rootError = "EEXIST") {
    const parts = splitPath(path);
    checkNames(path, parts);
    if (parts.length === 0) throw kerr(rootError);
    const name = parts[parts.length - 1];
    const dirPath = "/" + parts.slice(0, -1).join("/");
    const dir = this.lookup(dirPath, true);
    if (!isDir(dir)) throw kerr("ENOTDIR");
    if (name === ".." || name === ".") throw kerr("EINVAL");
    return { dir, name, dirPath };
  }
  // ---------- stat ----------
  statOf(n) {
    return {
      dev: DEV_ID,
      ino: n.ino,
      mode: n.mode,
      nlink: n.nlink,
      uid: n.uid,
      gid: n.gid,
      rdev: n.rdev ?? 0,
      size: isDir(n) ? 4096 : isLink(n) ? textEncoder.encode(n.target).length : n.size,
      blksize: 4096,
      blocks: Math.ceil(n.size / 512),
      atimeMs: n.atimeMs,
      mtimeMs: n.mtimeMs,
      ctimeMs: n.ctimeMs,
      birthtimeMs: n.birthtimeMs
    };
  }
  stat(path) {
    return this.statOf(this.lookup(path, true));
  }
  lstat(path) {
    return this.statOf(this.lookup(path, false));
  }
  exists(path) {
    return this.tryLookup(path) !== void 0;
  }
  // ---------- directories ----------
  mkdir(path, mode = 511, recursive = false, umask = this.umask) {
    if (recursive) {
      const parts = splitPath(path);
      let cur = "";
      let first;
      for (const part of parts) {
        cur += "/" + part;
        const existing = this.tryLookup(cur);
        if (existing) {
          if (!isDir(existing)) throw kerr("ENOTDIR");
          continue;
        }
        this.mkdir(cur, mode, false, umask);
        first ??= cur;
      }
      return first;
    }
    const { dir, name } = this.lookupParent(path);
    if (dir.entries.has(name)) throw kerr("EEXIST");
    const node = this.newInode(S_IFDIR | mode & 1023 & ~umask);
    node.entries = /* @__PURE__ */ new Map();
    node.parent = dir;
    node.nlink = 2;
    dir.entries.set(name, node);
    dir.nlink++;
    this.touchDir(dir);
    this.emit("rename", path);
    return path;
  }
  readdir(path) {
    const node = this.lookup(path);
    if (!isDir(node)) throw kerr("ENOTDIR");
    node.atimeMs = Date.now();
    return [...node.entries.keys()];
  }
  /** Directory listing with d_type style info: [name, type] (type = S_IF* constant). */
  readdirTypes(path) {
    const node = this.lookup(path);
    if (!isDir(node)) throw kerr("ENOTDIR");
    const out = [];
    for (const [name, child] of node.entries) out.push([name, child.mode & S_IFMT]);
    return out;
  }
  rmdir(path) {
    const { dir, name } = this.lookupParent(path, "EBUSY");
    const node = dir.entries.get(name);
    if (!node) throw kerr("ENOENT");
    if (!isDir(node)) throw kerr("ENOTDIR");
    if (node.entries.size > 0) throw kerr("ENOTEMPTY");
    dir.entries.delete(name);
    dir.nlink--;
    node.nlink = 0;
    this.touchDir(dir);
    this.emit("rename", path);
  }
  /** rm -rf semantics; returns silently if missing when `force`. */
  rmrf(path, force = true) {
    const node = this.tryLookup(path, false);
    if (!node) {
      if (force) return;
      throw kerr("ENOENT");
    }
    if (node === this.root) throw kerr("EBUSY");
    if (isDir(node)) {
      for (const name of [...node.entries.keys()]) this.rmrf(path.replace(/\/$/, "") + "/" + name, true);
      this.rmdir(path);
    } else {
      this.unlink(path);
    }
  }
  touchDir(dir) {
    const now = Date.now();
    dir.mtimeMs = now;
    dir.ctimeMs = now;
  }
  // ---------- files ----------
  /** Creates (or truncates/opens) a regular file; returns its inode. */
  createFile(path, mode = 438, opts = {}) {
    const { dir, name } = this.lookupParent(path, "EISDIR");
    let node = dir.entries.get(name);
    if (node && isLink(node)) {
      const real = this.resolveLinkTarget(path, node);
      if (opts.excl) throw kerr("EEXIST");
      const existing = this.tryLookup(real);
      if (existing) {
        node = existing;
      } else {
        return this.createFile(real, mode, opts);
      }
    }
    if (node) {
      if (opts.excl) throw kerr("EEXIST");
      if (isDir(node)) throw kerr("EISDIR");
      if (opts.trunc && isFile(node)) this.truncateNode(node, 0, path);
      return node;
    }
    node = this.newInode(S_IFREG | mode & 4095 & ~(opts.umask ?? this.umask));
    node.data = new Uint8Array(0);
    dir.entries.set(name, node);
    this.touchDir(dir);
    this.emit("rename", path);
    return node;
  }
  resolveLinkTarget(path, link) {
    const t = link.target;
    if (t.startsWith("/")) return t;
    const parts = splitPath(path);
    parts.pop();
    return "/" + [...parts, t].join("/");
  }
  readFile(path) {
    const node = this.lookup(path);
    if (isDir(node)) throw kerr("EISDIR");
    if (node.device) return new Uint8Array(0);
    node.atimeMs = Date.now();
    return this.contents(node);
  }
  /** A regular file's bytes (filling in a hole left by truncate()). */
  contents(node) {
    if (node.data.length < node.size) this.ensureCapacity(node, node.size);
    return node.data.subarray(0, node.size);
  }
  /** Writes a whole file (creating parents is the caller's job). */
  writeFile(path, data, mode = 438, umask = this.umask) {
    const bytes = typeof data === "string" ? textEncoder.encode(data) : data;
    const node = this.createFile(path, mode, { umask });
    if (node.device) {
      node.device.write(bytes);
      return node;
    }
    node.data = bytes.slice();
    node.size = bytes.length;
    const now = Date.now();
    node.mtimeMs = now;
    node.ctimeMs = now;
    this.emit("change", path);
    return node;
  }
  /** Writes and creates missing parent directories. */
  writeFileP(path, data, mode = 438, umask = this.umask) {
    const parts = splitPath(path);
    if (parts.length > 1) this.mkdir("/" + parts.slice(0, -1).join("/"), 511, true, umask);
    return this.writeFile(path, data, mode, umask);
  }
  readAt(node, buf, position) {
    if (isDir(node)) throw kerr("EISDIR");
    if (node.device) {
      const d = node.device.read(buf.length);
      if (!d) return 0;
      buf.set(d);
      return d.length;
    }
    if (position >= node.size) return 0;
    const n = Math.min(buf.length, node.size - position);
    const data = node.data;
    if (position + n <= data.length) buf.set(data.subarray(position, position + n));
    else {
      const stored = data.subarray(Math.min(position, data.length), position + n);
      buf.set(stored);
      buf.fill(0, stored.length, n);
    }
    node.atimeMs = Date.now();
    return n;
  }
  writeAt(node, data, position, pathForEvent) {
    if (isDir(node)) throw kerr("EISDIR");
    if (node.device) return node.device.write(data);
    const end = position + data.length;
    this.ensureCapacity(node, end);
    node.data.set(data, position);
    if (end > node.size) node.size = end;
    const now = Date.now();
    node.mtimeMs = now;
    node.ctimeMs = now;
    if (pathForEvent) this.emit("change", pathForEvent);
    else this.generation++;
    return data.length;
  }
  ensureCapacity(node, size) {
    const cur = node.data;
    if (cur.length >= size) return;
    let cap = Math.max(size, cur.length * 2, 64);
    if (cap > size + 64 * 1024 * 1024) cap = size;
    const next = new Uint8Array(cap);
    next.set(cur.subarray(0, node.size));
    node.data = next;
  }
  truncateNode(node, len, pathForEvent) {
    if (isDir(node)) throw kerr("EISDIR");
    if (!isFile(node)) return;
    if (len > node.size) node.data.fill(0, node.size, Math.min(len, node.data.length));
    node.size = len;
    const now = Date.now();
    node.mtimeMs = now;
    node.ctimeMs = now;
    if (pathForEvent) this.emit("change", pathForEvent);
    else this.generation++;
  }
  truncate(path, len = 0) {
    this.truncateNode(this.lookup(path), len, path);
  }
  unlink(path) {
    const { dir, name } = this.lookupParent(path, "EISDIR");
    const node = dir.entries.get(name);
    if (!node) throw kerr("ENOENT");
    if (isDir(node)) throw kerr("EISDIR");
    dir.entries.delete(name);
    node.nlink--;
    node.ctimeMs = Date.now();
    this.touchDir(dir);
    this.emit("rename", path);
  }
  rename(from, to) {
    const src = this.lookupParent(from, "EBUSY");
    const node = src.dir.entries.get(src.name);
    if (!node) throw kerr("ENOENT");
    const dst = this.lookupParent(to, "EBUSY");
    if (isDir(node)) {
      let p = dst.dir;
      while (p) {
        if (p === node) throw kerr("EINVAL");
        if (p === this.root) break;
        p = p.parent;
      }
    }
    const existing = dst.dir.entries.get(dst.name);
    if (existing === node) return;
    if (existing) {
      if (isDir(existing)) {
        if (!isDir(node)) throw kerr("EISDIR");
        if (existing.entries.size > 0) throw kerr("ENOTEMPTY");
        dst.dir.nlink--;
      } else if (isDir(node)) {
        throw kerr("ENOTDIR");
      }
      existing.nlink--;
    }
    src.dir.entries.delete(src.name);
    dst.dir.entries.set(dst.name, node);
    if (isDir(node)) {
      node.parent = dst.dir;
      src.dir.nlink--;
      if (!existing) dst.dir.nlink++;
    }
    node.ctimeMs = Date.now();
    this.touchDir(src.dir);
    this.touchDir(dst.dir);
    this.emit("rename", from);
    this.emit("rename", to);
  }
  link(existingPath, newPath) {
    const node = this.lookup(existingPath, false);
    if (isDir(node)) throw kerr("EPERM");
    const { dir, name } = this.lookupParent(newPath);
    if (dir.entries.has(name)) throw kerr("EEXIST");
    dir.entries.set(name, node);
    node.nlink++;
    node.ctimeMs = Date.now();
    this.touchDir(dir);
    this.emit("rename", newPath);
  }
  symlink(target, path) {
    const { dir, name } = this.lookupParent(path);
    if (dir.entries.has(name)) throw kerr("EEXIST");
    const node = this.newInode(S_IFLNK | 511);
    node.target = target;
    dir.entries.set(name, node);
    this.touchDir(dir);
    this.emit("rename", path);
  }
  readlink(path) {
    const node = this.lookup(path, false);
    if (!isLink(node)) throw kerr("EINVAL");
    return node.target;
  }
  chmod(path, mode, follow = true) {
    const node = this.lookup(path, follow);
    node.mode = node.mode & S_IFMT | mode & 4095;
    node.ctimeMs = Date.now();
    this.emit("change", path);
  }
  /** The attributes of an inode were changed through a descriptor (fchmod, futimes): watchers of its path see a 'change'. */
  touched(path) {
    if (path) this.emit("change", path);
    else this.generation++;
  }
  chown(path, uid, gid, follow = true) {
    const node = this.lookup(path, follow);
    if (uid >= 0) node.uid = uid;
    if (gid >= 0) node.gid = gid;
    node.ctimeMs = Date.now();
  }
  utimes(path, atimeMs, mtimeMs, follow = true) {
    const node = this.lookup(path, follow);
    node.atimeMs = atimeMs;
    node.mtimeMs = mtimeMs;
    node.ctimeMs = Date.now();
    this.emit("change", path);
  }
  mknodChar(path, device, rdev, mode = 438) {
    const { dir, name } = this.lookupParent(path);
    const node = this.newInode(S_IFCHR | mode);
    node.device = device;
    node.rdev = rdev;
    dir.entries.set(name, node);
  }
  /** mkfifo(3): a FIFO inode (EEXIST if the name exists). */
  mknodFifo(path, mode = 438) {
    const { dir, name } = this.lookupParent(path);
    if (dir.entries.has(name)) throw kerr("EEXIST");
    const node = this.newInode(S_IFIFO | mode & 4095);
    dir.entries.set(name, node);
    this.touchDir(dir);
    this.emit("rename", path);
    return node;
  }
  /** bind(2) of a Unix domain socket: a socket inode at `path` (EADDRINUSE if the name exists). */
  mknodSock(path, mode = 511 & ~this.umask) {
    const { dir, name } = this.lookupParent(path);
    if (dir.entries.has(name)) throw kerr("EADDRINUSE");
    const node = this.newInode(S_IFSOCK | mode);
    dir.entries.set(name, node);
    this.touchDir(dir);
    this.emit("rename", path);
    return node;
  }
  /** Recursively copies `from` to `to` (files, dirs, symlinks). */
  copy(from, to, opts = {}) {
    const node = this.lookup(from, !!opts.dereference);
    if (isDir(node)) {
      if (!this.exists(to)) this.mkdir(to, node.mode & 4095);
      for (const name of node.entries.keys()) this.copy(`${from}/${name}`, `${to}/${name}`, opts);
      return;
    }
    const existing = this.tryLookup(to, false);
    if (existing) {
      if (opts.errorOnExist) throw new KernelError("EEXIST");
      if (opts.force === false) return;
      if (isDir(existing)) throw kerr("EISDIR");
      this.unlink(to);
    }
    if (isLink(node)) {
      this.symlink(node.target, to);
      return;
    }
    const n = this.writeFile(to, this.contents(node), node.mode & 4095);
    n.mode = n.mode & S_IFMT | node.mode & 4095;
  }
};

// src/kernel/io.ts
var O_RDONLY = 0;
var O_WRONLY = 1;
var O_RDWR = 2;
var O_ACCMODE = 3;
var O_CREAT = 64;
var O_TRUNC = 512;
var O_APPEND = 1024;
var OpenFile = class {
  constructor(kind, flags, opts = {}) {
    this.kind = kind;
    this.flags = flags;
    this.opts = opts;
  }
  kind;
  flags;
  opts;
  refs = 1;
  pos = 0;
  closed = false;
  dirCursor;
  onClose;
  /** sockets: half-close the write side */
  shutdownWrite;
  /** a socketpair end: the other end */
  peer;
  /** the connecting end the kernel itself holds (an HTTP request from the preview bridged to TCP) */
  bridged;
  get readable() {
    return (this.flags & O_ACCMODE) !== O_WRONLY;
  }
  get writable() {
    return (this.flags & O_ACCMODE) !== O_RDONLY;
  }
  ref() {
    this.refs++;
    return this;
  }
  unref() {
    if (--this.refs > 0) return;
    this.closed = true;
    this.onClose?.();
  }
  /** Synchronous-ish read for regular files; for streams use readAsync. */
  readFileAt(buf, position) {
    if (!this.readable) throw kerr("EBADF");
    const { vfs, node } = this.opts;
    if (!vfs || !node) throw kerr("EBADF");
    if (isDir(node)) throw kerr("EISDIR");
    const pos = position ?? this.pos;
    const n = vfs.readAt(node, buf, pos);
    if (position === null || position === void 0) this.pos += n;
    return n;
  }
  writeFileAt(data, position) {
    if (!this.writable) throw kerr("EBADF");
    const { vfs, node, path } = this.opts;
    if (!vfs || !node) throw kerr("EBADF");
    let pos = position ?? this.pos;
    if (this.flags & O_APPEND) pos = node.size;
    const n = vfs.writeAt(node, data, pos, path);
    if (position === null || position === void 0) this.pos = pos + n;
    return n;
  }
  /** Reads from any kind; may wait (pipes, tty). */
  async read(max, position = null) {
    if (!this.readable) throw kerr("EBADF");
    switch (this.kind) {
      case "file": {
        const buf = new Uint8Array(max);
        const n = this.readFileAt(buf, position);
        return buf.subarray(0, n);
      }
      case "null":
        return new Uint8Array(0);
      case "dir":
        throw kerr("EISDIR");
      default: {
        const r = this.opts.reader ?? this.opts.tty;
        if (!r) throw kerr("EBADF");
        const d = await r.read(max);
        return d ?? new Uint8Array(0);
      }
    }
  }
  /** Non-blocking read: undefined means EAGAIN. */
  tryRead(max, position = null) {
    if (this.kind === "file" || this.kind === "null" || this.kind === "dir") {
      const buf = new Uint8Array(max);
      if (this.kind === "null") return buf.subarray(0, 0);
      const n = this.readFileAt(buf, position);
      return buf.subarray(0, n);
    }
    const r = this.opts.reader ?? this.opts.tty;
    if (!r) throw kerr("EBADF");
    const d = r.tryRead(max);
    if (d === void 0) return void 0;
    return d ?? new Uint8Array(0);
  }
  write(data, position = null) {
    if (!this.writable) throw kerr("EBADF");
    switch (this.kind) {
      case "file":
        return this.writeFileAt(data, position);
      case "null":
        return data.length;
      case "dir":
        throw kerr("EISDIR");
      default: {
        const w = this.opts.writer ?? this.opts.tty;
        if (!w) throw kerr("EBADF");
        return w.write(data);
      }
    }
  }
};
var Pipe = class {
  constructor(id2) {
    this.id = id2;
  }
  id;
  chunks = [];
  size = 0;
  /** stream positions (bytes ever written / read), to keep attachments with their byte */
  writePos = 0;
  readPos = 0;
  attachments = [];
  readers = 0;
  writers = 0;
  waiting = [];
  drainWaiters = [];
  /** Called when there is new data or EOF (for push-style readers). */
  onReadable = /* @__PURE__ */ new Set();
  onBroken;
  /**
   * A FIFO's pipe before both ends have been opened: reads wait for a writer and writes are kept
   * for a reader (Linux blocks open(2) instead; the ends here open at once).
   */
  awaitingWriter = false;
  awaitingReader = false;
  /** what a non-blocking write may fill up to (Linux's default pipe buffer) */
  capacity = 65536;
  /** Room left for a non-blocking writer. */
  get space() {
    return Math.max(0, this.capacity - this.size);
  }
  /** Calls fn once the buffer has been read empty, or nobody reads any more. */
  onDrain(fn) {
    if (this.size === 0 || this.readers === 0) fn();
    else this.drainWaiters.push(fn);
  }
  readEnd() {
    const self2 = this;
    return {
      pipe: self2,
      read: (max) => self2.read(max),
      tryRead: (max) => self2.tryRead(max)
    };
  }
  writeEnd() {
    const self2 = this;
    return { pipe: self2, write: (d) => self2.write(d) };
  }
  get buffered() {
    return this.size;
  }
  write(data, attachment) {
    if (this.readers === 0 && !this.awaitingReader) {
      this.onBroken?.();
      throw kerr("EPIPE");
    }
    if (data.length === 0) return 0;
    const copy = data.slice();
    if (attachment) this.attachments.push({ at: this.writePos, item: attachment });
    this.writePos += copy.length;
    if (this.waiting.length > 0 && this.chunks.length === 0 && this.attachments.length === 0) {
      const w = this.waiting.shift();
      if (copy.length <= w.max) {
        this.readPos += copy.length;
        w.resolve(copy);
        this.notify();
        return data.length;
      }
      this.readPos += w.max;
      w.resolve(copy.subarray(0, w.max));
      this.chunks.push(copy.subarray(w.max));
      this.size += copy.length - w.max;
    } else {
      this.chunks.push(copy);
      this.size += copy.length;
    }
    this.flushWaiting();
    this.notify();
    return data.length;
  }
  notify() {
    for (const fn of [...this.onReadable]) fn();
  }
  /** Takes up to max bytes, never past the byte the next attachment belongs to. */
  take(max) {
    for (const a of this.attachments) {
      if (a.at > this.readPos) {
        max = Math.min(max, a.at - this.readPos);
        break;
      }
    }
    const d = this.takeBytes(max);
    this.readPos += d.length;
    while (this.attachments.length && this.attachments[0].at < this.readPos) this.attachments.shift().item.file?.unref();
    return d;
  }
  /** Like tryRead, also returning what was sent along with the first byte. */
  tryReadAttached(max) {
    if (this.size > 0) {
      const item = this.attachments[0]?.at === this.readPos ? this.attachments.shift().item : void 0;
      const data = this.take(max);
      if (this.size === 0) this.flushWaiting();
      return { data, item };
    }
    if (this.writers === 0) return null;
    return void 0;
  }
  takeBytes(max) {
    if (this.chunks.length === 1 || this.chunks[0].length >= max) {
      const c = this.chunks[0];
      if (c.length <= max) {
        this.chunks.shift();
        this.size -= c.length;
        return c;
      }
      this.chunks[0] = c.subarray(max);
      this.size -= max;
      return c.subarray(0, max);
    }
    const n = Math.min(max, this.size);
    const out = new Uint8Array(n);
    let off = 0;
    while (off < n) {
      const c = this.chunks[0];
      const need = n - off;
      if (c.length <= need) {
        out.set(c, off);
        off += c.length;
        this.chunks.shift();
      } else {
        out.set(c.subarray(0, need), off);
        this.chunks[0] = c.subarray(need);
        off += need;
      }
    }
    this.size -= n;
    return out;
  }
  flushWaiting() {
    while (this.waiting.length > 0 && this.size > 0) {
      const w = this.waiting.shift();
      w.resolve(this.take(w.max));
    }
    if (this.size === 0) {
      const d = this.drainWaiters;
      this.drainWaiters = [];
      for (const fn of d) fn();
    }
  }
  tryRead(max) {
    if (this.size > 0) {
      const d = this.take(max);
      if (this.size === 0) this.flushWaiting();
      return d;
    }
    if (this.writers === 0 && !this.awaitingWriter) return null;
    return void 0;
  }
  read(max) {
    const d = this.tryRead(max);
    if (d !== void 0) return Promise.resolve(d);
    return new Promise((resolve2) => this.waiting.push({ max, resolve: resolve2 }));
  }
  closeWriter() {
    this.writers--;
    if (this.writers <= 0) {
      this.writers = 0;
      const w = this.waiting;
      this.waiting = [];
      for (const x of w) x.resolve(null);
      this.notify();
    }
  }
  closeReader() {
    this.readers--;
    if (this.readers <= 0) {
      this.readers = 0;
      this.chunks = [];
      this.size = 0;
      for (const a of this.attachments.splice(0)) a.item.file?.unref();
      const d = this.drainWaiters;
      this.drainWaiters = [];
      for (const fn of d) fn();
    }
  }
};
var nextPipeId = 1;
function openFifo(node, flags) {
  let pipe = node.fifo;
  if (!pipe) {
    pipe = new Pipe(nextPipeId++);
    pipe.awaitingReader = pipe.awaitingWriter = true;
    node.fifo = pipe;
  }
  const p = pipe;
  const acc = flags & O_ACCMODE;
  const release = () => {
    if (p.readers === 0 && p.writers === 0 && !p.awaitingReader && node.fifo === p) node.fifo = void 0;
  };
  const reader = acc !== O_WRONLY;
  const writer = acc !== O_RDONLY;
  if (reader) {
    p.readers++;
    p.awaitingReader = false;
  }
  if (writer) {
    p.writers++;
    p.awaitingWriter = false;
  }
  const f = new OpenFile("pipe", flags, { reader: reader ? p.readEnd() : void 0, writer: writer ? p.writeEnd() : void 0 });
  f.onClose = () => {
    if (reader) p.closeReader();
    if (writer) p.closeWriter();
    release();
  };
  if (writer) p.notify();
  return f;
}
function createPipe() {
  const pipe = new Pipe(nextPipeId++);
  pipe.readers = 1;
  pipe.writers = 1;
  const r = new OpenFile("pipe", O_RDONLY, { reader: pipe.readEnd() });
  const w = new OpenFile("pipe", O_WRONLY, { writer: pipe.writeEnd() });
  r.onClose = () => pipe.closeReader();
  w.onClose = () => {
    if (globalThis.__ovTrace) console.warn(`[trace] pipe ${pipe.id} writer closed`, new Error().stack);
    pipe.closeWriter();
  };
  return { pipe, r, w };
}
function createSocketPair() {
  const a = createPipe();
  const b = createPipe();
  a.pipe.capacity = b.pipe.capacity = 212992;
  const end = (r, w) => {
    const f = new OpenFile("socket", O_RDWR, { reader: r.opts.reader, writer: w.opts.writer });
    let writeOpen = true;
    f.shutdownWrite = () => {
      if (!writeOpen) return;
      writeOpen = false;
      w.unref();
    };
    f.onClose = () => {
      r.unref();
      f.shutdownWrite();
    };
    return f;
  };
  const x = end(a.r, b.w);
  const y = end(b.r, a.w);
  x.peer = y;
  y.peer = x;
  return [x, y];
}
var enc = new TextEncoder();
var Tty = class {
  constructor(id2, hooks) {
    this.id = id2;
    this.hooks = hooks;
  }
  id;
  hooks;
  raw = false;
  echo = true;
  cols = 80;
  rows = 24;
  foregroundPgid = 0;
  line = [];
  ready = [];
  eof = false;
  waiting = [];
  onReadable = /* @__PURE__ */ new Set();
  /** Output from processes → terminal (with \n → \r\n). */
  write(data) {
    if (this.raw) {
    }
    let count = 0;
    for (let i = 0; i < data.length; i++) if (data[i] === 10 && (i === 0 || data[i - 1] !== 13)) count++;
    if (count === 0) {
      this.hooks.output(data.slice());
      return data.length;
    }
    const out = new Uint8Array(data.length + count);
    let j = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 10 && (i === 0 || data[i - 1] !== 13)) out[j++] = 13;
      out[j++] = data[i];
    }
    this.hooks.output(out);
    return data.length;
  }
  resize(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.hooks.signal("SIGWINCH");
  }
  /** Input from the terminal (keyboard). */
  input(data) {
    if (this.raw) {
      this.pushReady(data.slice());
      return;
    }
    for (const b of data) this.inputByte(b);
  }
  echoBytes(bytes) {
    if (this.echo) this.write(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes));
  }
  inputByte(b) {
    switch (b) {
      case 3:
        this.line = [];
        this.echoBytes(enc.encode("^C\n"));
        this.hooks.signal("SIGINT");
        return;
      case 28:
        this.line = [];
        this.hooks.signal("SIGQUIT");
        return;
      case 26:
        this.hooks.signal("SIGTSTP");
        return;
      case 4:
        if (this.line.length === 0) {
          this.pushEof();
        } else {
          this.pushReady(new Uint8Array(this.line));
          this.line = [];
        }
        return;
      case 127:
      case 8: {
        if (this.line.length > 0) {
          let n = 1;
          while (n < this.line.length && (this.line[this.line.length - n] & 192) === 128) n++;
          this.line.splice(this.line.length - n, n);
          this.echoBytes([8, 32, 8]);
        }
        return;
      }
      case 21:
        if (this.line.length > 0) {
          this.echoBytes(enc.encode("\r\x1B[K"));
          this.line = [];
        }
        return;
      case 13:
      case 10: {
        this.line.push(10);
        this.echoBytes([10]);
        this.pushReady(new Uint8Array(this.line));
        this.line = [];
        return;
      }
      case 27:
        this.line.push(b);
        return;
      default:
        this.line.push(b);
        if (b >= 32 || b === 9) this.echoBytes([b]);
    }
  }
  pushReady(d) {
    if (d.length === 0) return;
    this.ready.push(d);
    this.flush();
  }
  pushEof() {
    this.eof = true;
    this.flush();
  }
  flush() {
    while (this.waiting.length > 0 && (this.ready.length > 0 || this.eof)) {
      const w = this.waiting.shift();
      const d = this.takeReady(w.max);
      w.resolve(d);
    }
    for (const fn of [...this.onReadable]) fn();
  }
  takeReady(max) {
    if (this.ready.length === 0) {
      if (this.eof) {
        this.eof = false;
        return null;
      }
      return new Uint8Array(0);
    }
    const c = this.ready[0];
    if (c.length <= max) {
      this.ready.shift();
      return c;
    }
    this.ready[0] = c.subarray(max);
    return c.subarray(0, max);
  }
  tryRead(max) {
    if (this.ready.length > 0 || this.eof) return this.takeReady(max);
    return void 0;
  }
  read(max) {
    const d = this.tryRead(max);
    if (d !== void 0) return Promise.resolve(d);
    return new Promise((resolve2) => this.waiting.push({ max, resolve: resolve2 }));
  }
  /** Discards pending input (used when the foreground job changes). */
  flushInput() {
    this.line = [];
  }
};

// src/kernel/proc.ts
var SIGNALS = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGQUIT: 3,
  SIGILL: 4,
  SIGTRAP: 5,
  SIGABRT: 6,
  SIGBUS: 7,
  SIGFPE: 8,
  SIGKILL: 9,
  SIGUSR1: 10,
  SIGSEGV: 11,
  SIGUSR2: 12,
  SIGPIPE: 13,
  SIGALRM: 14,
  SIGTERM: 15,
  SIGSTKFLT: 16,
  SIGCHLD: 17,
  SIGCONT: 18,
  SIGSTOP: 19,
  SIGTSTP: 20,
  SIGTTIN: 21,
  SIGTTOU: 22,
  SIGURG: 23,
  SIGXCPU: 24,
  SIGXFSZ: 25,
  SIGVTALRM: 26,
  SIGPROF: 27,
  SIGWINCH: 28,
  SIGIO: 29,
  SIGPWR: 30,
  SIGSYS: 31
};
var ALIASES = { SIGIOT: "SIGABRT", SIGPOLL: "SIGIO", SIGCLD: "SIGCHLD", SIGUNUSED: "SIGSYS" };
var SIGRTMIN = 34;
var SIGRTMAX = 64;
var NAMES = new Map(Object.entries(SIGNALS).map(([k, v]) => [v, k]));
var ACTIONS = {
  SIGQUIT: "core",
  SIGILL: "core",
  SIGTRAP: "core",
  SIGABRT: "core",
  SIGBUS: "core",
  SIGFPE: "core",
  SIGSEGV: "core",
  SIGXCPU: "core",
  SIGXFSZ: "core",
  SIGSYS: "core",
  SIGCHLD: "ign",
  SIGURG: "ign",
  SIGWINCH: "ign",
  SIGCONT: "cont",
  SIGSTOP: "stop",
  SIGTSTP: "stop",
  SIGTTIN: "stop",
  SIGTTOU: "stop"
};
function defaultAction(sig) {
  return ACTIONS[sig] ?? "term";
}
function signalName(n) {
  return canonicalSignal(n) ?? (typeof n === "number" ? `SIG${n}` : n.startsWith("SIG") ? n : "SIG" + n);
}
function canonicalSignal(n) {
  if (typeof n === "string") {
    if (/^\d+$/.test(n)) return canonicalSignal(Number(n));
    const s = n.startsWith("SIG") ? n : "SIG" + n;
    if (SIGNALS[s]) return s;
    if (ALIASES[s]) return ALIASES[s];
    const rt = /^SIGRT(MIN|MAX)(?:([+-])(\d+))?$/.exec(s);
    if (rt) return canonicalSignal((rt[1] === "MIN" ? SIGRTMIN : SIGRTMAX) + (rt[2] === "-" ? -1 : 1) * Number(rt[3] ?? 0));
    const num = /^SIG(\d+)$/.exec(s);
    return num ? canonicalSignal(Number(num[1])) : null;
  }
  if (!Number.isInteger(n) || n < 1 || n > SIGRTMAX) return null;
  if (n < 32) return NAMES.get(n);
  if (n < SIGRTMIN) return `SIG${n}`;
  if (n === SIGRTMIN) return "SIGRTMIN";
  if (n === SIGRTMAX) return "SIGRTMAX";
  return n - SIGRTMIN <= 15 ? `SIGRTMIN+${n - SIGRTMIN}` : `SIGRTMAX-${SIGRTMAX - n}`;
}
function signalNumber(s) {
  if (s === 0 || s === "0" || s === "SIG0") return 0;
  const name = canonicalSignal(s);
  if (!name) return -1;
  if (SIGNALS[name]) return SIGNALS[name];
  if (name.startsWith("SIGRTMIN")) return SIGRTMIN + Number(name.slice(8) || 0);
  if (name.startsWith("SIGRTMAX")) return SIGRTMAX + Number(name.slice(8) || 0);
  return Number(name.slice(3));
}
var Proc = class {
  pid;
  ppid;
  pgid;
  argv;
  env;
  cwd;
  /** file mode creation mask, inherited by children */
  umask = 18;
  /** the Node.js runtime (script URL) the process started with; its worker threads get the same */
  runtime;
  /** RLIMIT_NOFILE (ulimit -n), inherited by children */
  nofile = 1024;
  fds = /* @__PURE__ */ new Map();
  tty;
  title;
  kind = "builtin";
  state = "running";
  status = null;
  children = /* @__PURE__ */ new Set();
  /** Signals the process installed handlers for (node processes). */
  handledSignals = /* @__PURE__ */ new Set();
  /** Builtin programs: return true to swallow a signal. */
  onSignal;
  threads = /* @__PURE__ */ new Map();
  abort = new AbortController();
  exitWaiters = [];
  startedAt = Date.now();
  /** Notified once the process exits (after fds are closed). */
  onExit = /* @__PURE__ */ new Set();
  constructor(init2) {
    this.pid = init2.pid;
    this.ppid = init2.ppid;
    this.pgid = init2.pgid;
    this.argv = init2.argv;
    this.env = init2.env;
    this.cwd = init2.cwd;
    this.title = init2.argv[0] ?? "?";
  }
  get exited() {
    if (this.status) return Promise.resolve(this.status);
    return new Promise((r) => this.exitWaiters.push(r));
  }
  /**
   * Allocates the lowest free fd >= min. The fd takes over the caller's reference to `file`; when
   * every number below RLIMIT_NOFILE is taken, the reference is dropped and it fails with EMFILE.
   */
  allocFd(file2, min = 0) {
    let fd;
    try {
      fd = this.freeFd(min);
    } catch (e) {
      file2.unref();
      throw e;
    }
    this.fds.set(fd, file2);
    return fd;
  }
  /** The lowest free fd >= min; EMFILE when it would reach RLIMIT_NOFILE. */
  freeFd(min = 0) {
    let fd = min;
    while (this.fds.has(fd)) fd++;
    if (fd >= this.nofile) throw kerr("EMFILE");
    return fd;
  }
  getFd(fd) {
    const f = this.fds.get(fd);
    if (!f) throw kerr("EBADF");
    return f;
  }
  closeFd(fd) {
    const f = this.fds.get(fd);
    if (!f) throw kerr("EBADF");
    this.fds.delete(fd);
    f.unref();
  }
  dupTo(oldFd, newFd) {
    const f = this.getFd(oldFd);
    if (oldFd === newFd) return;
    const prev = this.fds.get(newFd);
    this.fds.set(newFd, f.ref());
    prev?.unref();
  }
  closeAll() {
    for (const f of this.fds.values()) f.unref();
    this.fds.clear();
  }
  finish(status) {
    if (this.state === "exited") return;
    this.state = "exited";
    this.status = status;
    this.closeAll();
    const ws = this.exitWaiters;
    this.exitWaiters = [];
    for (const w of ws) w(status);
    for (const fn of this.onExit) fn(status);
  }
};
function exitCodeOf(s) {
  if (s.code !== null) return s.code;
  const n = signalNumber(s.signal ?? "SIGTERM");
  return 128 + (n > 0 ? n : 15);
}

// src/kernel/kernel.ts
function leaveListener(rec, pid) {
  if (rec.acceptors) rec.acceptors = rec.acceptors.filter((a) => a.pid !== pid);
  if (rec.pid !== pid) return true;
  const heir = rec.acceptors?.shift();
  if (!heir) return false;
  rec.pid = heir.pid;
  rec.tid = heir.tid;
  return true;
}
var enc2 = new TextEncoder();
var dec = new TextDecoder();
var BUILTIN_SHEBANG = "/ov/builtin";
var Kernel = class {
  constructor(hooks) {
    this.hooks = hooks;
    this.setupFs();
  }
  hooks;
  vfs = new VFS();
  procs = /* @__PURE__ */ new Map();
  programs = /* @__PURE__ */ new Map();
  ports = /* @__PURE__ */ new Map();
  /** Unix domain socket listeners, by the socket inode (the name can be renamed or unlinked) */
  unixSockets = /* @__PURE__ */ new Map();
  nextPid = 1;
  nextTid = 1;
  nextTtyId = 1;
  /** Handler for synchronous syscalls from node threads (set by syscalls.ts). */
  syscall;
  /** Handler for async messages from node threads. */
  asyncMessage;
  hostname = "openvessel";
  // ---------------------------------------------------------------------------
  // file system layout
  setupFs() {
    const v = this.vfs;
    for (const d of ["/bin", "/usr/bin", "/usr/local/bin", "/usr/lib/node_modules", "/usr/local/lib", "/home/user", "/tmp", "/etc", "/dev", "/proc", "/var/tmp", "/root", "/opt"]) {
      v.mkdir(d, 493, true);
    }
    v.chmod("/tmp", 1023);
    v.writeFile("/etc/passwd", "root:x:0:0:root:/root:/bin/sh\nuser:x:1000:1000:user:/home/user:/bin/sh\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin\n");
    v.writeFile("/etc/group", "root:x:0:\nuser:x:1000:\nnogroup:x:65534:\n");
    v.writeFile("/etc/hostname", `${this.hostname}
`);
    v.writeFile("/etc/hosts", "127.0.0.1 localhost\n::1 localhost\n");
    v.writeFile("/etc/os-release", 'NAME="OpenVessel"\nID=openvessel\nPRETTY_NAME="OpenVessel"\n');
    v.writeFile("/etc/shells", "/bin/sh\n/bin/bash\n");
    const nullDev = { read: () => new Uint8Array(0), write: (d) => d.length };
    const zeroDev = { read: (n) => new Uint8Array(Math.min(n, 65536)), write: (d) => d.length };
    const randDev = {
      read: (n) => crypto.getRandomValues(new Uint8Array(Math.min(n, 65536))),
      write: (d) => d.length
    };
    v.mknodChar("/dev/null", nullDev, 259);
    v.mknodChar("/dev/zero", zeroDev, 261);
    v.mknodChar("/dev/random", randDev, 264);
    v.mknodChar("/dev/urandom", randDev, 265);
    v.mknodChar("/dev/tty", nullDev, 1280);
    v.mkdir("/dev/fd", 493);
    v.symlink("/proc/self/fd/0", "/dev/stdin");
    v.symlink("/proc/self/fd/1", "/dev/stdout");
    v.symlink("/proc/self/fd/2", "/dev/stderr");
    const cpus = globalThis.navigator?.hardwareConcurrency || 4;
    let cpuinfo = "";
    for (let i = 0; i < cpus; i++) cpuinfo += `processor	: ${i}
model name	: OpenVessel Virtual CPU
cpu MHz		: 2400.000
cpu cores	: ${cpus}

`;
    v.writeFile("/proc/cpuinfo", cpuinfo);
    v.writeFile("/proc/meminfo", "MemTotal:        8388608 kB\nMemFree:         4194304 kB\nMemAvailable:    4194304 kB\n");
    v.writeFile("/proc/version", "Linux version 6.8.0-openvessel (user@openvessel) #1 SMP OpenVessel\n");
  }
  /** Installs a builtin program as an executable file in /bin (or another dir). */
  registerProgram(name, fn, dirs = ["/bin"]) {
    this.programs.set(name, fn);
    for (const d of dirs) {
      const p = `${d}/${name}`;
      if (!this.vfs.exists(p)) this.vfs.writeFile(p, `#!${BUILTIN_SHEBANG} ${name}
`, 493);
      this.vfs.chmod(p, 493);
    }
  }
  defaultEnv() {
    return {
      PATH: "/usr/local/bin:/usr/bin:/bin",
      HOME: "/home/user",
      USER: "user",
      LOGNAME: "user",
      SHELL: "/bin/sh",
      TERM: "xterm-256color",
      LANG: "en_US.UTF-8",
      TMPDIR: "/tmp",
      HOSTNAME: this.hostname,
      // napi-rs loaders: older ones force WASI for any non-empty value, newer ones only for 'true' or 'error'
      NAPI_RS_FORCE_WASI: "true"
    };
  }
  createTty(output) {
    const tty2 = new Tty(this.nextTtyId++, {
      output,
      signal: (sig) => {
        if (sig === "SIGWINCH") {
          for (const p of this.procs.values()) if (p.tty === tty2 && p.state === "running") this.kill(p.pid, "SIGWINCH", true);
          return;
        }
        this.killGroup(tty2.foregroundPgid, sig);
      }
    });
    return tty2;
  }
  // ---------------------------------------------------------------------------
  // paths
  resolvePath(cwd, p) {
    if (!p) throw kerr("ENOENT");
    return resolve(cwd, p);
  }
  /**
   * Finds an executable for `cmd` (PATH lookup when no slash). As in execvp(3), an empty PATH entry
   * is the working directory and an unset PATH is /bin:/usr/bin.
   */
  which(cmd, env2, cwd) {
    if (cmd.includes("/")) {
      const p = this.resolvePath(cwd, cmd);
      const n = this.vfs.tryLookup(p);
      return n && !isDir(n) ? p : null;
    }
    for (const dir of (env2.PATH ?? "/bin:/usr/bin").split(":")) {
      const p = join(this.resolvePath(cwd, dir || "."), cmd);
      const n = this.vfs.tryLookup(p);
      if (n && (n.mode & S_IFMT) === S_IFREG && permits(n, 1)) return p;
    }
    return null;
  }
  // ---------------------------------------------------------------------------
  // processes
  get(pid) {
    const p = this.procs.get(pid);
    if (!p) throw kerr("ESRCH");
    return p;
  }
  /**
   * Spawns a process. Resolves the executable (builtin, shebang script, node)
   * synchronously and returns the running process. Throws ENOENT/EACCES.
   */
  spawn(opts) {
    const parent = opts.ppid ? this.procs.get(opts.ppid) : void 0;
    const env2 = opts.env ?? (parent ? { ...parent.env } : this.defaultEnv());
    const cwd = opts.cwd ?? parent?.cwd ?? "/home/user";
    const argv = [...opts.argv];
    if (argv.length === 0) throw kerr("EINVAL");
    const plan = this.planExec(argv, env2, cwd, opts.searchPath !== false);
    if (plan.kind === "node" && plan.direct) plan.argv[0] = opts.argv0 ?? argv[0];
    const pid = this.nextPid++;
    const pgid = opts.pgid === 0 ? pid : opts.pgid ?? parent?.pgid ?? pid;
    const proc = new Proc({ pid, ppid: opts.ppid ?? 0, pgid, argv: plan.argv, env: plan.env ?? env2, cwd });
    proc.tty = opts.tty ?? parent?.tty;
    if (parent) {
      proc.nofile = parent.nofile;
      proc.umask = parent.umask;
    }
    const stdio = opts.stdio ?? [];
    for (let i = 0; i < stdio.length; i++) {
      const f = stdio[i];
      if (f) proc.fds.set(i, f.ref());
    }
    this.procs.set(pid, proc);
    parent?.children.add(pid);
    proc.onExit.add((status) => {
      this.hooks.onProcessExit?.(pid, status);
      for (const [port, rec] of this.ports) {
        if (!leaveListener(rec, pid)) {
          this.ports.delete(port);
          this.hooks.onUnlisten?.(port, pid);
        }
      }
      for (const [ino, rec] of this.unixSockets) if (rec.pid === pid) this.unixSockets.delete(ino);
      for (const c of proc.children) {
        const cp2 = this.procs.get(c);
        if (cp2) cp2.ppid = 0;
      }
      proc.children.clear();
      const t = setTimeout(() => {
        this.procs.delete(pid);
        this.procs.get(proc.ppid)?.children.delete(pid);
      }, 6e4);
      t?.unref?.();
    });
    if (plan.kind === "builtin") {
      proc.kind = "builtin";
      proc.title = plan.name;
      this.runBuiltin(proc, this.programs.get(plan.name));
    } else {
      proc.kind = "node";
      proc.title = "node";
      this.startNode(proc);
    }
    return proc;
  }
  /**
   * Determines how to run argv: builtin program or node, following shebangs. `env` is set when a
   * `#!/usr/bin/env` line changes the environment of the program.
   */
  planExec(argv, env2, cwd, searchPath = true) {
    let depth = 0;
    let newEnv;
    for (; ; ) {
      if (depth++ > 8) throw kerr("ELOOP");
      const cmd = argv[0];
      const file2 = searchPath || cmd.includes("/") ? this.which(cmd, newEnv ?? env2, cwd) : null;
      if (!file2) {
        if (!cmd.includes("/") && this.programs.has(cmd)) return { kind: "builtin", name: cmd, argv, env: newEnv };
        throw new KernelError("ENOENT", `${cmd}: command not found`);
      }
      const node = this.vfs.lookup(file2);
      if (!permits(node, 1)) throw new KernelError("EACCES", `${cmd}: Permission denied`);
      const head2 = dec.decode(node.data.subarray(0, Math.min(node.size, 256)));
      const shebang = head2.startsWith("#!") ? /^[ \t]*([^ \t\n]+)[ \t]*([^\n]*?)[ \t]*(?:\n|$)/.exec(head2.slice(2)) : null;
      if (shebang) {
        let interp = shebang[1];
        let iargs = shebang[2] ? [shebang[2]] : [];
        if (interp === BUILTIN_SHEBANG) {
          const name = shebang[2];
          if (name === "node") return { kind: "node", argv: ["node", ...argv.slice(1)], direct: depth === 1, env: newEnv };
          if (!this.programs.has(name)) throw new KernelError("ENOENT", `${name}: builtin missing`);
          return { kind: "builtin", name, argv, env: newEnv };
        }
        if (interp === "/usr/bin/env" || interp === "/bin/env") {
          const r = envShebang(iargs[0], newEnv ?? env2);
          if (r.argv.length) {
            newEnv = r.env;
            interp = r.argv[0];
            iargs = r.argv.slice(1);
          }
        }
        const base = basename(interp);
        if (base === "node" || base === "nodejs" || base === "bun" || base === "deno") {
          return { kind: "node", argv: ["node", ...iargs, file2, ...argv.slice(1)], env: newEnv };
        }
        argv = [interp, ...iargs, file2, ...argv.slice(1)];
        continue;
      }
      if (/\.(c|m)?js$/.test(file2)) return { kind: "node", argv: ["node", file2, ...argv.slice(1)], env: newEnv };
      return { kind: "builtin", name: "sh", argv: ["sh", file2, ...argv.slice(1)], env: newEnv };
    }
  }
  /**
   * execve(2): a new program in an existing process (same pid, cwd and stdio). The caller has
   * closed the descriptors that don't survive; the old program's threads are stopped here.
   * Throws (ENOENT, EACCES…) before anything changes when the program can't be run.
   */
  execImage(proc, argv, env2, argv0) {
    const plan = this.planExec(argv, env2, proc.cwd, true);
    if (plan.kind === "node" && plan.direct) plan.argv[0] = argv0 ?? argv[0];
    for (const t of proc.threads.values()) {
      try {
        t.worker.terminate();
      } catch {
      }
    }
    proc.threads.clear();
    proc.handledSignals.clear();
    for (const [port, rec] of this.ports) {
      if ((rec.pid === proc.pid || rec.acceptors?.some((a) => a.pid === proc.pid)) && !leaveListener(rec, proc.pid)) {
        this.ports.delete(port);
        this.hooks.onUnlisten?.(port, proc.pid);
      }
    }
    for (const [ino, rec] of this.unixSockets) if (rec.pid === proc.pid) this.unixSockets.delete(ino);
    proc.argv = plan.argv;
    proc.env = plan.env ?? env2;
    if (plan.kind === "builtin") {
      proc.kind = "builtin";
      proc.title = plan.name;
      this.runBuiltin(proc, this.programs.get(plan.name));
    } else {
      proc.kind = "node";
      proc.title = "node";
      this.startNode(proc);
    }
  }
  runBuiltin(proc, fn) {
    const ctx = new ProgramContext(this, proc);
    queueMicrotask(async () => {
      let code = 0;
      try {
        code = await fn(ctx);
      } catch (e) {
        if (e instanceof ExitSignal) code = e.code;
        else {
          try {
            ctx.err(`${proc.title}: ${e?.message ?? e}
`);
          } catch {
          }
          code = 1;
        }
      }
      if (proc.state === "running") proc.finish({ code, signal: null });
    });
  }
  // ---------------------------------------------------------------------------
  // node processes
  startNode(proc, extra = {}) {
    this.startThread(proc, {
      kind: "main",
      ...extra
    });
  }
  /** Starts a node thread (main or worker_threads) for `proc`. */
  startThread(proc, init2, transfer = [], parentTid, explicitTid) {
    const tid = explicitTid ?? this.nextTid++;
    if (init2.kind === "main") proc.runtime = this.hooks.runtime?.();
    const worker = this.hooks.createWorker(`node:${proc.pid}:${tid}`, proc.runtime);
    const sab = createChannelBuffer();
    const thread = { tid, worker, server: new SyncServer(sab), busy: false, parentTid };
    proc.threads.set(tid, thread);
    worker.onmessage = (ev) => this.onThreadMessage(proc, thread, ev.data);
    worker.onerror = (ev) => {
      ev.preventDefault?.();
      this.hooks.log?.(`worker error pid=${proc.pid}: ${ev.message}`);
      if (init2.kind === "main") this.exitProcess(proc, { code: 1, signal: null });
    };
    const ttyInfo = {};
    for (const fd of [0, 1, 2]) {
      const f = proc.fds.get(fd);
      ttyInfo[fd] = f?.kind === "tty" && f.opts.tty ? { cols: f.opts.tty.cols, rows: f.opts.tty.rows } : null;
    }
    worker.postMessage(
      {
        t: "init",
        pid: proc.pid,
        ppid: proc.ppid,
        tid,
        argv: proc.argv,
        env: proc.env,
        cwd: proc.cwd,
        sab,
        ttys: ttyInfo,
        hostname: this.hostname,
        ...init2
      },
      transfer
    );
    return thread;
  }
  onThreadMessage(proc, thread, msg) {
    if (msg?.t === "sys") {
      const req = thread.server.receive();
      if (!req) return;
      const { op, ...args } = req.json;
      let result;
      try {
        result = this.syscall(proc, thread, op, args, req.bin);
      } catch (e) {
        thread.server.respond(errorResponse(e));
        return;
      }
      if (result instanceof Promise) {
        result.then(
          (r) => thread.server.respond(okResponse(r)),
          (e) => thread.server.respond(errorResponse(e))
        );
      } else {
        thread.server.respond(okResponse(result));
      }
      return;
    }
    this.asyncMessage(proc, thread, msg);
  }
  exitProcess(proc, status) {
    if (proc.state === "exited") return;
    for (const t of proc.threads.values()) {
      try {
        t.worker.terminate();
      } catch {
      }
    }
    proc.threads.clear();
    proc.abort.abort();
    proc.finish(status);
  }
  /** Posts an async message to the main thread of a node process. */
  post(proc, msg, transfer = []) {
    const main2 = proc.threads.values().next().value;
    main2?.worker.postMessage(msg, transfer);
  }
  /** To the thread that asked (its main thread may be blocked, e.g. in Atomics.wait), or the main thread once it has gone. */
  postTo(proc, thread, msg, transfer = []) {
    if (proc.threads.get(thread.tid) === thread) thread.worker.postMessage(msg, transfer);
    else this.post(proc, msg, transfer);
  }
  // ---------------------------------------------------------------------------
  // signals
  /**
   * Sends a signal (a number 1–64 or a name; 0 does nothing). EINVAL for something that is no signal,
   * ESRCH for an unknown pid. Without a handler the signal's default action applies: ignored (SIGCHLD,
   * SIGURG, SIGWINCH, and SIGCONT, as nothing is ever stopped) or the process ends. There is no stopped
   * state, so the stop signals (SIGSTOP, SIGTSTP, SIGTTIN, SIGTTOU) end the process too.
   */
  kill(pid, sig = "SIGTERM", soft = false) {
    const num = signalNumber(sig);
    if (num < 0) throw kerr("EINVAL");
    const proc = this.get(pid);
    if (proc.state !== "running" || num === 0) return;
    const name = signalName(sig);
    const action = defaultAction(name);
    if (proc.kind === "node") {
      if (proc.handledSignals.has(name) && name !== "SIGKILL" && name !== "SIGSTOP") {
        this.post(proc, { t: "signal", sig: name });
        return;
      }
      if (action === "ign" || action === "cont") {
        if (name === "SIGWINCH") this.post(proc, { t: "signal", sig: name });
        return;
      }
      this.exitProcess(proc, { code: null, signal: name });
      return;
    }
    if (proc.onSignal?.(name)) return;
    if (action === "ign" || action === "cont") return;
    if (soft) return;
    proc.abort.abort(name);
    proc.finish({ code: null, signal: name });
  }
  /** Signals every running process of a group; returns how many there were. */
  killGroup(pgid, sig) {
    if (!pgid) return 0;
    let n = 0;
    for (const p of [...this.procs.values()]) {
      if (p.pgid !== pgid || p.state !== "running") continue;
      this.kill(p.pid, sig);
      n++;
    }
    return n;
  }
  // ---------------------------------------------------------------------------
  // file helpers used by programs and syscalls
  /**
   * The fd of process `pid` that `abs` names when it is /proc/self/fd/N, /proc/<pid>/fd/N or
   * /dev/fd/N, or a symlink to one (/dev/stdin, /dev/stdout, /dev/stderr); null otherwise.
   */
  procFdOf(abs, pid) {
    if (!abs.startsWith("/dev/") && !abs.startsWith("/proc/")) return null;
    for (let i = 0; i < 40; i++) {
      const fd = fdPathOf(abs, pid);
      if (fd !== null) return fd;
      const n = this.vfs.tryLookup(abs, false);
      if (!n || !isLink(n)) return null;
      abs = resolve(dirname(abs), n.target);
    }
    return null;
  }
  openFile(proc, p, flags, mode = 438) {
    const abs = this.resolvePath(proc.cwd, p);
    const procFd = this.procFdOf(abs, proc.pid);
    if (procFd !== null) {
      const owner = proc;
      const f = owner.fds?.get(procFd);
      if (!f) throw kerr("ENOENT");
      if (f.kind === "file" && f.opts.node && f.opts.vfs) return new OpenFile("file", flags, { vfs: f.opts.vfs, node: f.opts.node, path: f.opts.path });
      return f.ref();
    }
    if (abs === "/dev/tty") {
      const tty2 = proc.tty;
      if (!tty2) throw kerr("ENXIO");
      return new OpenFile("tty", O_RDWR, { tty: tty2 });
    }
    const O_CREAT2 = 64;
    const O_EXCL = 128;
    const O_TRUNC2 = 512;
    const O_DIRECTORY = 65536;
    const O_NOFOLLOW = 131072;
    let node = this.vfs.tryLookup(abs, !(flags & O_NOFOLLOW));
    if (node && flags & O_EXCL && flags & O_CREAT2) throw kerr("EEXIST");
    if (node && isLink(node)) throw kerr("ELOOP");
    if (!node) {
      if (!(flags & O_CREAT2)) {
        this.vfs.lookup(abs);
      }
      node = this.vfs.createFile(abs, mode, { excl: !!(flags & O_EXCL), umask: proc.umask ?? 18 });
    } else {
      if (flags & O_DIRECTORY && !isDir(node)) throw kerr("ENOTDIR");
      if (isDir(node) && (flags & 3) !== O_RDONLY) throw kerr("EISDIR");
      if (flags & O_TRUNC2 && (flags & 3) !== O_RDONLY && !node.device) this.vfs.truncateNode(node, 0, abs);
    }
    if ((node.mode & S_IFMT) === S_IFIFO) return openFifo(node, flags);
    if (node.device) return new OpenFile("file", flags, { vfs: this.vfs, node, path: abs });
    return new OpenFile(isDir(node) ? "dir" : "file", flags, { vfs: this.vfs, node, path: abs });
  }
};
function envShebang(arg, env2) {
  if (arg === void 0) return { argv: [], env: env2 };
  const s = /^-v*S[ \t]*(.*)$/s.exec(arg);
  const words = s ? splitEnvS(s[1], env2) : [arg];
  const out = { ...env2 };
  let i = 0;
  for (; s && i < words.length && words[i].startsWith("-"); i++) {
    const w = words[i];
    if (w === "--") {
      i++;
      break;
    }
    if (w === "-" || w === "-i" || w === "--ignore-environment") for (const k of Object.keys(out)) delete out[k];
    else if (w === "-u" || w === "--unset") delete out[words[++i]];
    else if (w.startsWith("-u")) delete out[w.slice(2)];
  }
  for (; i < words.length; i++) {
    const eq = words[i].indexOf("=");
    if (eq <= 0) break;
    out[words[i].slice(0, eq)] = words[i].slice(eq + 1);
  }
  return { argv: words.slice(i), env: out };
}
function splitEnvS(s, env2) {
  const words = [];
  let cur = null;
  const esc = { t: "	", n: "\n", r: "\r", f: "\f", v: "\v", _: " ", "\\": "\\", '"': '"', "'": "'", "$": "$", "#": "#" };
  let quote = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quote === "'") {
      if (c === "'") quote = "";
      else if (c === "\\" && (s[i + 1] === "\\" || s[i + 1] === "'")) cur += s[++i];
      else cur += c;
      continue;
    }
    if (c === "\\") {
      const n = s[++i];
      if (n === "c") break;
      cur = (cur ?? "") + (esc[n] ?? n ?? "");
      continue;
    }
    if (c === "$" && s[i + 1] === "{") {
      const end = s.indexOf("}", i);
      if (end > i) {
        cur = (cur ?? "") + (env2[s.slice(i + 2, end)] ?? "");
        i = end;
        continue;
      }
    }
    if (quote === '"') {
      if (c === '"') quote = "";
      else cur += c;
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      cur ??= "";
    } else if (c === " " || c === "	" || c === "\n") {
      if (cur !== null) words.push(cur);
      cur = null;
    } else if (c === "#" && cur === null) break;
    else cur = (cur ?? "") + c;
  }
  if (cur !== null) words.push(cur);
  return words;
}
function fdPathOf(abs, pid) {
  const m = /^\/(?:proc\/(self|\d+)|dev)\/fd\/(\d+)$/.exec(abs);
  if (!m || m[1] !== void 0 && m[1] !== "self" && Number(m[1]) !== pid) return null;
  return Number(m[2]);
}
var ExitSignal = class {
  constructor(code) {
    this.code = code;
  }
  code;
};
function okResponse(r) {
  if (r instanceof Uint8Array) return { json: { ok: null, bin: true }, bin: r };
  if (r && typeof r === "object" && r.__bin instanceof Uint8Array) {
    const { __bin, ...rest } = r;
    return { json: { ok: rest, bin: true }, bin: __bin };
  }
  return { json: { ok: r === void 0 ? null : r } };
}
function errorResponse(e) {
  if (e instanceof KernelError) return { json: { err: e.code, msg: e.message } };
  const err = e;
  return { json: { err: err?.code ?? "EIO", msg: String(err?.message ?? err) } };
}
var ProgramContext = class _ProgramContext {
  constructor(kernel2, proc) {
    this.kernel = kernel2;
    this.proc = proc;
  }
  kernel;
  proc;
  get argv() {
    return this.proc.argv;
  }
  get env() {
    return this.proc.env;
  }
  get cwd() {
    return this.proc.cwd;
  }
  set cwd(v) {
    this.proc.cwd = v;
  }
  procVfs;
  /** The file system, creating files and directories with this process's umask. */
  get vfs() {
    return this.procVfs ??= this.kernel.vfs.forProcess(this.proc);
  }
  get signal() {
    return this.proc.abort.signal;
  }
  resolve(p) {
    return this.kernel.resolvePath(this.proc.cwd, p);
  }
  /** Writes bytes/string to an fd (ignores EPIPE). */
  write(fd, data) {
    const f = this.proc.fds.get(fd);
    if (!f) return;
    const bytes = typeof data === "string" ? enc2.encode(data) : data;
    try {
      f.write(bytes);
    } catch (e) {
      if (e?.code === "EPIPE") throw new ExitSignal(141);
      throw e;
    }
  }
  out(s) {
    this.write(1, s);
  }
  err(s) {
    this.write(2, s);
  }
  async read(fd = 0, max = 65536) {
    const f = this.proc.fds.get(fd);
    if (!f) return null;
    const abort = this.signal;
    if (abort.aborted) throw new ExitSignal(130);
    const d = await f.read(max);
    if (d.length === 0) return null;
    return d;
  }
  async readAll(fd = 0) {
    const chunks = [];
    let total = 0;
    for (; ; ) {
      const d = await this.read(fd);
      if (!d) break;
      chunks.push(d);
      total += d.length;
    }
    const out = new Uint8Array(total);
    let off = 0;
    for (const c of chunks) {
      out.set(c, off);
      off += c.length;
    }
    return out;
  }
  async readAllText(fd = 0) {
    return dec.decode(await this.readAll(fd));
  }
  isatty(fd) {
    return this.proc.fds.get(fd)?.kind === "tty";
  }
  spawn(argv, opts = {}) {
    const stdio = opts.stdio ?? [0, 1, 2].map((fd) => this.proc.fds.get(fd) ?? null);
    return this.kernel.spawn({
      argv,
      env: opts.env ?? { ...this.proc.env },
      cwd: opts.cwd ?? this.proc.cwd,
      stdio,
      ppid: this.proc.pid,
      pgid: opts.pgid,
      searchPath: opts.searchPath
    });
  }
  /** Spawns and waits; returns the exit code. */
  async run(argv, opts = {}) {
    const p = this.spawn(argv, opts);
    return exitCodeOf(await p.exited);
  }
  /** Spawns and captures stdout (stderr passes through). */
  async capture(argv, opts = {}) {
    const { r, w } = createPipe();
    const p = this.spawn(argv, { ...opts, stdio: [this.proc.fds.get(0) ?? null, w, this.proc.fds.get(2) ?? null] });
    w.unref();
    const reader = new _ProgramContext(this.kernel, { fds: /* @__PURE__ */ new Map([[0, r]]), abort: new AbortController() });
    const out = await reader.readAllText(0);
    r.unref();
    const st = await p.exited;
    return { code: exitCodeOf(st), stdout: out };
  }
  exit(code) {
    throw new ExitSignal(code);
  }
};

// src/kernel/sh/arith.ts
var TOKEN = /\s*([0-9][0-9a-zA-Z@_]*(?:#[0-9a-zA-Z@_]+)?|[A-Za-z_][A-Za-z0-9_]*|\*\*=?|<<=|>>=|\+\+|--|&&|\|\||==|!=|<=|>=|<<|>>|[-+*/%&|^]=|[-+*/%<>=!~&|^?:(),])/y;
var wrap = (v) => BigInt.asIntN(64, v);
function evalArith(src, get, set) {
  const toks = [];
  TOKEN.lastIndex = 0;
  let pos = 0;
  while (pos < src.length) {
    if (/^\s*$/.test(src.slice(pos))) break;
    TOKEN.lastIndex = pos;
    const m = TOKEN.exec(src);
    if (!m) throw new Error(`syntax error: invalid arithmetic operator (error token is "${src.slice(pos).trim()}")`);
    toks.push(m[1]);
    pos = TOKEN.lastIndex;
  }
  let i = 0;
  const peek = () => toks[i];
  const next = () => toks[i++];
  let skip = 0;
  const isName2 = (t) => !!t && /^[A-Za-z_]/.test(t);
  const valueOf = (name, depth = 0) => {
    if (skip) return 0n;
    const v = get(name);
    if (v === void 0 || v.trim() === "") return 0n;
    const t = v.trim();
    if (/^[-+]?[0-9]/.test(t) && /^[-+]?[0-9][0-9a-zA-Z@_#]*$/.test(t)) {
      const neg = t.startsWith("-");
      const n = toNumber(t.replace(/^[-+]/, ""));
      return wrap(neg ? -n : n);
    }
    if (depth < 8 && /^[A-Za-z_][A-Za-z0-9_]*$/.test(t)) return valueOf(t, depth + 1);
    return evalArith(v, get, set);
  };
  const assignVar = (name, v) => {
    if (!skip) set(name, String(v));
  };
  const primary = () => {
    const t = next();
    if (t === void 0) throw new Error("syntax error: operand expected");
    if (t === "(") {
      const v = comma();
      if (next() !== ")") throw new Error("syntax error: ')' expected");
      return { v: v.v };
    }
    if (t === "++" || t === "--") {
      const name = next();
      if (!isName2(name)) throw new Error("syntax error: variable expected");
      const nv = wrap(valueOf(name) + (t === "++" ? 1n : -1n));
      assignVar(name, nv);
      return { v: nv };
    }
    if (t === "+" || t === "-" || t === "!" || t === "~") {
      const r2 = unary();
      if (t === "-") return { v: wrap(-r2.v) };
      if (t === "!") return { v: r2.v ? 0n : 1n };
      if (t === "~") return { v: ~r2.v };
      return { v: r2.v };
    }
    if (isName2(t)) {
      if (peek() === "++" || peek() === "--") {
        const op = next();
        const old = valueOf(t);
        assignVar(t, wrap(old + (op === "++" ? 1n : -1n)));
        return { v: old };
      }
      return { v: valueOf(t), name: t };
    }
    return { v: toNumber(t) };
  };
  const unary = primary;
  const BIN = {
    "**": [14, (a, b) => {
      if (b < 0n) throw new Error("exponent less than 0");
      let r2 = 1n;
      let base = a;
      let e = b;
      while (e > 0n) {
        if (e & 1n) r2 = wrap(r2 * base);
        base = wrap(base * base);
        e >>= 1n;
      }
      return r2;
    }],
    "*": [13, (a, b) => wrap(a * b)],
    "/": [13, (a, b) => {
      if (b === 0n) throw new Error("division by 0");
      return wrap(a / b);
    }],
    "%": [13, (a, b) => {
      if (b === 0n) throw new Error("division by 0");
      return wrap(a % b);
    }],
    "+": [12, (a, b) => wrap(a + b)],
    "-": [12, (a, b) => wrap(a - b)],
    // the shift count is taken modulo 64, as the x86-64 build of bash does
    "<<": [11, (a, b) => wrap(a << BigInt.asUintN(6, b))],
    ">>": [11, (a, b) => a >> BigInt.asUintN(6, b)],
    "<": [10, (a, b) => a < b ? 1n : 0n],
    "<=": [10, (a, b) => a <= b ? 1n : 0n],
    ">": [10, (a, b) => a > b ? 1n : 0n],
    ">=": [10, (a, b) => a >= b ? 1n : 0n],
    "==": [9, (a, b) => a === b ? 1n : 0n],
    "!=": [9, (a, b) => a !== b ? 1n : 0n],
    "&": [8, (a, b) => a & b],
    "^": [7, (a, b) => a ^ b],
    "|": [6, (a, b) => a | b]
  };
  const apply = (op, a, b) => {
    if (skip && (op === "/" || op === "%" || op === "**")) return 0n;
    return BIN[op][1](a, b);
  };
  const binary = (minPrec) => {
    let left = unary();
    for (; ; ) {
      const op = peek();
      if (op === "&&" && minPrec <= 5) {
        next();
        if (!left.v) skip++;
        const r2 = binary(6);
        if (!left.v) skip--;
        left = { v: left.v && r2.v ? 1n : 0n };
        continue;
      }
      if (op === "||" && minPrec <= 4) {
        next();
        if (left.v) skip++;
        const r2 = binary(5);
        if (left.v) skip--;
        left = { v: left.v || r2.v ? 1n : 0n };
        continue;
      }
      const b = op !== void 0 ? BIN[op] : void 0;
      if (!b || b[0] < minPrec) break;
      next();
      const right = binary(op === "**" ? b[0] : b[0] + 1);
      left = { v: apply(op, left.v, right.v) };
    }
    return left;
  };
  const ternary = () => {
    const c = binary(4);
    if (peek() === "?") {
      next();
      if (!c.v) skip++;
      const a = assign();
      if (!c.v) skip--;
      if (next() !== ":") throw new Error("syntax error: ':' expected");
      if (c.v) skip++;
      const b = ternary();
      if (c.v) skip--;
      return c.v ? a : b;
    }
    return c;
  };
  const assign = () => {
    if (isName2(toks[i]) && toks[i + 1] && /^([-+*/%&|^]|<<|>>|\*\*)?=$/.test(toks[i + 1]) && toks[i + 1] !== "==") {
      const name = next();
      const op = next();
      const rhs = assign().v;
      let v = rhs;
      if (op !== "=") v = apply(op.slice(0, -1), valueOf(name), rhs);
      assignVar(name, v);
      return { v };
    }
    return ternary();
  };
  const comma = () => {
    let r2 = assign();
    while (peek() === ",") {
      next();
      r2 = assign();
    }
    return r2;
  };
  if (toks.length === 0) return 0n;
  const r = comma();
  if (i < toks.length) throw new Error(`syntax error in expression (error token is "${toks.slice(i).join(" ")}")`);
  return r.v;
}
function toNumber(t) {
  let base = 10;
  let digits = t;
  const hash = t.indexOf("#");
  if (hash !== -1) {
    base = Number(t.slice(0, hash));
    digits = t.slice(hash + 1);
    if (!/^[0-9]+$/.test(t.slice(0, hash)) || base < 2 || base > 64) throw new Error(`invalid arithmetic base (error token is "${t}")`);
  } else if (/^0[xX]/.test(t)) {
    base = 16;
    digits = t.slice(2);
  } else if (t.length > 1 && t[0] === "0") {
    base = 8;
    digits = t.slice(1);
  }
  if (!digits) throw new Error(`invalid number (error token is "${t}")`);
  let v = 0n;
  const b = BigInt(base);
  for (const c of digits) {
    let d;
    if (c >= "0" && c <= "9") d = c.charCodeAt(0) - 48;
    else if (c >= "a" && c <= "z") d = c.charCodeAt(0) - 97 + 10;
    else if (c >= "A" && c <= "Z") d = c.charCodeAt(0) - 65 + (base <= 36 ? 10 : 36);
    else if (c === "@") d = 62;
    else if (c === "_") d = 63;
    else d = 99;
    if (d >= base) throw new Error(`value too great for base (error token is "${t}")`);
    v = BigInt.asIntN(64, v * b + BigInt(d));
  }
  return v;
}

// src/kernel/sh/mode.ts
var WHO_BITS = { u: 2496, g: 1080, o: 519 };
function applySymbolicMode(mode, spec, opts = {}) {
  for (const clause of spec.split(",")) {
    const m = /^([ugoa]*)((?:[-+=](?:[rwxXst]*|[ugo]))+)$/.exec(clause);
    if (!m) return null;
    let who = 0;
    for (const c of m[1] || "a") who |= c === "a" ? 4095 : WHO_BITS[c];
    const limit = m[1] ? 4095 : ~(opts.umask ?? 0) & 4095;
    const ops = m[2].match(/[-+=][^-+=]*/g);
    for (const op of ops) {
      const kind = op[0];
      const perms = op.slice(1);
      let bits = 0;
      if (/^[ugo]$/.test(perms)) {
        const shift = perms === "u" ? 6 : perms === "g" ? 3 : 0;
        const rwx = mode >> shift & 7;
        bits = rwx << 6 | rwx << 3 | rwx;
      } else {
        for (const c of perms) {
          if (c === "r") bits |= 292;
          else if (c === "w") bits |= 146;
          else if (c === "x") bits |= 73;
          else if (c === "X") {
            if (opts.isDir || mode & 73) bits |= 73;
          } else if (c === "s") bits |= 3072;
          else if (c === "t") bits |= 512;
        }
      }
      bits &= who;
      if (kind === "+") mode |= bits & limit;
      else if (kind === "-") mode &= ~(bits & limit);
      else {
        const clear2 = opts.isDir ? who & ~3072 : who;
        mode = mode & ~clear2 | bits & limit;
      }
    }
  }
  return mode & 4095;
}
function symbolicUmask(mask) {
  const allowed = ~mask & 511;
  const part = (shift) => {
    const v = allowed >> shift & 7;
    return (v & 4 ? "r" : "") + (v & 2 ? "w" : "") + (v & 1 ? "x" : "");
  };
  return `u=${part(6)},g=${part(3)},o=${part(0)}`;
}

// src/kernel/sh/parse.ts
var ShellSyntaxError = class extends Error {
  incomplete;
  constructor(msg, incomplete = false) {
    super(msg);
    this.incomplete = incomplete;
  }
};
var RESERVED = /* @__PURE__ */ new Set(["if", "then", "else", "elif", "fi", "do", "done", "case", "esac", "while", "until", "for", "in", "{", "}", "!", "function", "[[", "]]"]);
var META = /* @__PURE__ */ new Set([" ", "	", "\n", ";", "&", "|", "<", ">", "(", ")"]);
var NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;
var ANSI_C_ESCAPES = { a: "\x07", b: "\b", e: "\x1B", E: "\x1B", f: "\f", n: "\n", r: "\r", t: "	", v: "\v", "\\": "\\", "'": "'", '"': '"', "?": "?" };
function parse2(src) {
  return new Parser(src).parseProgram();
}
var Parser = class _Parser {
  constructor(s, aliases) {
    this.s = s;
    this.aliases = aliases;
  }
  s;
  aliases;
  i = 0;
  pending = [];
  /** Text spliced in by alias expansion: an alias isn't expanded again inside its own text. */
  aliasRegions = [];
  /** The last alias ended with a blank: the next word is checked for an alias too. */
  aliasNextWord = false;
  eof() {
    return this.i >= this.s.length;
  }
  ch(o = 0) {
    return this.s[this.i + o];
  }
  fail(msg) {
    throw new ShellSyntaxError(msg, this.eof());
  }
  /** Skips blanks, comments and line continuations (not newlines). */
  skipBlank() {
    for (; ; ) {
      const c = this.ch();
      if (c === " " || c === "	" || c === "\r") this.i++;
      else if (c === "\\" && this.ch(1) === "\n") this.i += 2;
      else if (c === "#") {
        while (!this.eof() && this.ch() !== "\n") this.i++;
      } else break;
    }
  }
  /** Skips blanks and newlines (reading pending heredocs). */
  skipLinebreaks() {
    for (; ; ) {
      this.skipBlank();
      if (this.ch() === "\n") {
        this.i++;
        this.readHeredocs();
      } else break;
    }
  }
  readHeredocs() {
    const list = this.pending;
    this.pending = [];
    for (const r of list) {
      const hd = r.heredoc;
      const lines = [];
      for (; ; ) {
        if (this.eof()) break;
        let end = this.s.indexOf("\n", this.i);
        if (end === -1) end = this.s.length;
        let line = this.s.slice(this.i, end);
        this.i = Math.min(end + 1, this.s.length);
        if (hd.strip) line = line.replace(/^\t+/, "");
        if (line === hd.delim) break;
        lines.push(line);
      }
      const raw = lines.length ? lines.join("\n") + "\n" : "";
      hd.raw = raw;
      hd.body = hd.quoted ? [{ t: "sq", v: raw }] : [{ t: "dq", parts: new _Parser(raw).parseDqContent(true) }];
    }
  }
  /** Peeks a reserved word at the current position (command position). */
  peekReserved() {
    this.skipBlank();
    let j = this.i;
    while (j < this.s.length && !META.has(this.s[j]) && !"\"'`$\\".includes(this.s[j])) j++;
    const w = this.s.slice(this.i, j);
    if (!RESERVED.has(w)) return null;
    const next = this.s[j];
    if (next !== void 0 && !META.has(next)) return null;
    return w;
  }
  expectReserved(w) {
    this.skipLinebreaks();
    if (this.peekReserved() !== w) this.fail(`syntax error: expected '${w}'`);
    this.i += w.length;
  }
  parseProgram() {
    const list = this.parseList([]);
    this.skipLinebreaks();
    if (!this.eof()) this.fail(`syntax error near unexpected token '${this.s.slice(this.i, this.i + 10)}'`);
    return list;
  }
  /**
   * Parses the next complete command (a list up to the end of the line), or null at the end.
   * Scripts run one such command at a time, so an alias defined on a line applies from the next
   * line on, and a syntax error further down doesn't stop the lines before it (as in bash).
   */
  parseNext() {
    this.skipLinebreaks();
    if (this.eof()) return null;
    const items = [];
    for (; ; ) {
      const node = this.parseAndOr();
      this.skipBlank();
      let async = false;
      if (this.ch() === "&" && this.ch(1) !== "&") {
        this.i++;
        async = true;
      } else if (this.ch() === ";" && this.ch(1) !== ";" && this.ch(1) !== "&") {
        this.i++;
      } else if (!this.eof() && this.ch() !== "\n") {
        this.fail(`syntax error near unexpected token '${this.ch() === ";" ? this.s.slice(this.i, this.i + 2) : this.ch()}'`);
      }
      items.push({ node, async });
      this.skipBlank();
      if (this.eof()) {
        this.readHeredocs();
        break;
      }
      if (this.ch() === "\n") {
        this.i++;
        this.readHeredocs();
        break;
      }
    }
    if (items.length === 1 && !items[0].async) return items[0].node;
    return { t: "list", items };
  }
  /**
   * Alias expansion at a command word: the alias text replaces the word in the input, so it may
   * hold several commands, pipes or reserved words. Returns true when it expanded one.
   */
  tryAlias() {
    if (!this.aliases?.size) return false;
    this.skipBlank();
    let j = this.i;
    while (j < this.s.length && !META.has(this.s[j]) && !"\"'`$\\".includes(this.s[j])) j++;
    if (j === this.i || j < this.s.length && !META.has(this.s[j])) return false;
    const w = this.s.slice(this.i, j);
    const v = this.aliases.get(w);
    if (v === void 0) return false;
    if (this.aliasRegions.some((r) => r.name === w && this.i >= r.start && this.i < r.end)) return false;
    const keep = this.aliasNextWord && this.aliasRegions.some((r) => r.start <= this.i && j < r.end);
    const delta = v.length - w.length;
    for (const r of this.aliasRegions) if (r.end > this.i) r.end += delta;
    this.s = this.s.slice(0, this.i) + v + this.s.slice(j);
    this.aliasRegions.push({ name: w, start: this.i, end: this.i + v.length });
    this.aliasNextWord = keep || /[ \t]$/.test(v);
    return true;
  }
  /** Parses a compound list until one of the terminators (reserved words, `)`, `;;`). */
  parseList(terms) {
    const items = [];
    for (; ; ) {
      this.skipLinebreaks();
      if (this.eof()) break;
      const c = this.ch();
      if (c === ")" && terms.includes(")")) break;
      if (c === ";" && this.ch(1) === ";" && terms.includes(";;")) break;
      if (c === ";" && this.ch(1) === "&" && terms.includes(";;")) break;
      const rw = this.peekReserved();
      if (rw && terms.includes(rw)) break;
      if (c === ")" || c === "}" && !terms.length) this.fail(`syntax error near unexpected token '${c}'`);
      const node = this.parseAndOr();
      this.skipBlank();
      let async = false;
      if (this.ch() === "&" && this.ch(1) !== "&") {
        this.i++;
        async = true;
      } else if (this.ch() === ";" && this.ch(1) !== ";" && this.ch(1) !== "&") {
        this.i++;
      } else if (this.ch() === "\n") {
      } else if (!this.eof()) {
        const c2 = this.ch();
        if (!(c2 === ")" || c2 === ";" && (this.ch(1) === ";" || this.ch(1) === "&" && terms.includes(";;")) || this.peekReserved())) {
          this.fail(`syntax error near unexpected token '${c2}'`);
        }
      }
      items.push({ node, async });
    }
    if (items.length === 1 && !items[0].async) return items[0].node;
    return { t: "list", items };
  }
  parseAndOr() {
    const first = this.parsePipeline();
    const rest = [];
    for (; ; ) {
      this.skipBlank();
      const two = this.s.slice(this.i, this.i + 2);
      if (two === "&&" || two === "||") {
        this.i += 2;
        this.skipLinebreaks();
        rest.push({ op: two, node: this.parsePipeline() });
      } else break;
    }
    return rest.length ? { t: "andor", first, rest } : first;
  }
  parsePipeline() {
    this.skipBlank();
    let bang = false;
    if (this.peekReserved() === "!") {
      this.i++;
      bang = true;
    }
    const cmds = [this.parseCommand()];
    for (; ; ) {
      this.skipBlank();
      if (this.ch() === "|" && this.ch(1) !== "|") {
        this.i++;
        if (this.ch() === "&") {
          this.i++;
          const prev = cmds[cmds.length - 1];
          (prev.redirs ??= []).push({ fd: 2, op: ">&", target: [{ t: "lit", v: "1" }] });
        }
        this.skipLinebreaks();
        cmds.push(this.parseCommand());
      } else break;
    }
    if (cmds.length === 1 && !bang) return cmds[0];
    return { t: "pipeline", cmds, bang };
  }
  parseCommand() {
    this.skipBlank();
    while (this.tryAlias()) ;
    const rw = this.peekReserved();
    let node = null;
    switch (rw) {
      case "if":
        node = this.parseIf();
        break;
      case "while":
      case "until":
        node = this.parseWhile(rw === "until");
        break;
      case "for":
        node = this.parseFor();
        break;
      case "case":
        node = this.parseCase();
        break;
      case "{": {
        this.i++;
        const body = this.parseList(["}"]);
        this.expectReserved("}");
        node = { t: "group", body, redirs: [] };
        break;
      }
      case "[[":
        node = this.parseDbracket();
        break;
      case "function": {
        this.i += 8;
        this.skipBlank();
        const name = this.readName();
        this.skipBlank();
        if (this.ch() === "(" && this.ch(1) === ")") this.i += 2;
        this.skipLinebreaks();
        return { t: "func", name, body: this.parseCommand() };
      }
      default:
        if (rw && rw !== "!") this.fail(`syntax error near unexpected token '${rw}'`);
    }
    if (!node && this.ch() === "(") {
      this.i++;
      if (this.ch() === "(") {
        this.i++;
        const start = this.i;
        let depth = 0;
        while (!this.eof()) {
          if (this.ch() === "(") depth++;
          else if (this.ch() === ")") {
            if (depth === 0 && this.ch(1) === ")") break;
            depth--;
          }
          this.i++;
        }
        const expr = this.s.slice(start, this.i);
        this.i += 2;
        node = { t: "simple", assigns: [], words: [[{ t: "lit", v: "((" }], [{ t: "dq", parts: new _Parser(expr).parseDqContent(true) }]], redirs: [] };
        return node;
      }
      const body = this.parseList([")"]);
      this.skipLinebreaks();
      if (this.ch() !== ")") this.fail("syntax error: expected ')'");
      this.i++;
      node = { t: "subshell", body, redirs: [] };
    }
    if (node) {
      node.redirs = this.parseRedirs();
      return node;
    }
    return this.parseSimple();
  }
  parseRedirs() {
    const out = [];
    for (; ; ) {
      this.skipBlank();
      const r = this.tryRedir();
      if (!r) break;
      out.push(r);
    }
    return out;
  }
  readName() {
    const m = /^[A-Za-z_][A-Za-z0-9_.:-]*/.exec(this.s.slice(this.i));
    if (!m) this.fail("syntax error: expected name");
    this.i += m[0].length;
    return m[0];
  }
  parseIf() {
    this.i += 2;
    const clauses = [];
    let elseBody;
    const cond = this.parseList(["then"]);
    this.expectReserved("then");
    const body = this.parseList(["elif", "else", "fi"]);
    clauses.push({ cond, body });
    for (; ; ) {
      this.skipLinebreaks();
      const rw = this.peekReserved();
      if (rw === "elif") {
        this.i += 4;
        const c = this.parseList(["then"]);
        this.expectReserved("then");
        const b = this.parseList(["elif", "else", "fi"]);
        clauses.push({ cond: c, body: b });
      } else if (rw === "else") {
        this.i += 4;
        elseBody = this.parseList(["fi"]);
      } else if (rw === "fi") {
        this.i += 2;
        break;
      } else this.fail("syntax error: expected 'fi'");
    }
    return { t: "if", clauses, else: elseBody, redirs: [] };
  }
  parseWhile(until) {
    this.i += until ? 5 : 5;
    const cond = this.parseList(["do"]);
    this.expectReserved("do");
    const body = this.parseList(["done"]);
    this.expectReserved("done");
    return { t: "while", until, cond, body, redirs: [] };
  }
  parseFor() {
    this.i += 3;
    this.skipBlank();
    const name = this.readName();
    this.skipBlank();
    let words = null;
    this.skipLinebreaks();
    if (this.peekReserved() === "in") {
      this.i += 2;
      words = [];
      for (; ; ) {
        this.skipBlank();
        const c = this.ch();
        if (c === void 0 || c === ";" || c === "\n") break;
        words.push(this.readWord());
      }
    }
    this.skipBlank();
    if (this.ch() === ";") this.i++;
    this.expectReserved("do");
    const body = this.parseList(["done"]);
    this.expectReserved("done");
    return { t: "for", name, words, body, redirs: [] };
  }
  parseCase() {
    this.i += 4;
    this.skipBlank();
    const word = this.readWord();
    this.expectReserved("in");
    const items = [];
    for (; ; ) {
      this.skipLinebreaks();
      if (this.peekReserved() === "esac") {
        this.i += 4;
        break;
      }
      if (this.eof()) this.fail("syntax error: expected 'esac'");
      if (this.ch() === "(") this.i++;
      const patterns = [];
      for (; ; ) {
        this.skipBlank();
        patterns.push(this.readWord());
        this.skipBlank();
        if (this.ch() === "|") {
          this.i++;
          continue;
        }
        if (this.ch() === ")") {
          this.i++;
          break;
        }
        this.fail("syntax error in case pattern");
      }
      const body = this.parseList(["esac", ";;"]);
      let term = ";;";
      this.skipLinebreaks();
      if (this.ch() === ";" && (this.ch(1) === ";" || this.ch(1) === "&")) {
        term = this.ch(1) === "&" ? ";&" : ";;";
        this.i += 2;
        if (term === ";;" && this.ch() === "&") {
          term = ";;&";
          this.i++;
        }
      }
      items.push({ patterns, body: body.t === "list" && body.items.length === 0 ? null : body, term });
    }
    return { t: "case", word, items, redirs: [] };
  }
  parseDbracket() {
    this.i += 2;
    const words = [];
    for (; ; ) {
      this.skipBlank();
      if (this.eof()) this.fail("syntax error: expected ']]'");
      if (this.s.startsWith("]]", this.i)) {
        this.i += 2;
        break;
      }
      const c = this.ch();
      if (words.length && wordToLiteral(words[words.length - 1]) === "=~") words.push(this.readRegexWord());
      else if (c === "&" && this.ch(1) === "&") {
        this.i += 2;
        words.push([{ t: "lit", v: "&&" }]);
      } else if (c === "|" && this.ch(1) === "|") {
        this.i += 2;
        words.push([{ t: "lit", v: "||" }]);
      } else if (c === "(" || c === ")" || c === "<" || c === ">") {
        this.i++;
        words.push([{ t: "lit", v: c }]);
      } else if (c === "\n") this.i++;
      else words.push(this.readWord(true));
    }
    return { t: "dbracket", words, redirs: [] };
  }
  /**
   * The regex operand of `[[ s =~ re ]]`: as in bash, `( ) | < >` are part of it, and blanks too
   * inside parentheses.
   */
  readRegexWord() {
    const parts = [];
    let depth = 0;
    while (!this.eof()) {
      const c = this.ch();
      if ((c === " " || c === "	") && depth > 0) {
        parts.push({ t: "lit", v: c });
        this.i++;
      } else if ("()|<>".includes(c)) {
        if (c === ")" && depth === 0) break;
        if (c === "(") depth++;
        else if (c === ")") depth--;
        parts.push({ t: "lit", v: c });
        this.i++;
      } else {
        const at = this.i;
        const w = this.readWord(true);
        if (this.i === at) break;
        parts.push(...w);
      }
    }
    return parts;
  }
  parseSimple() {
    const assigns = [];
    const words = [];
    const redirs = [];
    for (; ; ) {
      this.skipBlank();
      const c = this.ch();
      if (c === void 0 || c === "\n" || c === ";" || c === "&" || c === "|" || c === ")") {
        if (c === "&" && this.ch(1) === ">") {
          const r2 = this.tryRedir();
          if (r2) {
            redirs.push(r2);
            continue;
          }
        }
        break;
      }
      const r = this.tryRedir();
      if (r) {
        redirs.push(r);
        continue;
      }
      if (c === "(") {
        if (words.length === 1 && assigns.length === 0 && this.s.slice(this.i).match(/^\(\s*\)/)) {
          const name = wordToLiteral(words[0]);
          if (name === null) this.fail("syntax error: bad function name");
          this.i = this.s.indexOf(")", this.i) + 1;
          this.skipLinebreaks();
          return { t: "func", name, body: this.parseCommand() };
        }
        this.fail("syntax error near unexpected token '('");
      }
      if (words.length === 0) {
        const m = /^([A-Za-z_][A-Za-z0-9_]*)(\+?)=/.exec(this.s.slice(this.i, this.i + 256));
        if (m) {
          this.i += m[0].length;
          let value;
          if (this.ch() === "(") {
            const end = this.s.indexOf(")", this.i);
            const inner = this.s.slice(this.i + 1, end === -1 ? this.s.length : end);
            this.i = end === -1 ? this.s.length : end + 1;
            value = [{ t: "lit", v: inner.trim() }];
          } else {
            const c2 = this.ch();
            value = c2 === void 0 || META.has(c2) ? [] : this.readWord(false, true);
          }
          assigns.push({ name: m[1], value, append: m[2] === "+" });
          continue;
        }
      }
      if (words.length === 0 ? this.tryAlias() : this.aliasNextWord && (this.aliasNextWord = false, this.tryAlias())) continue;
      words.push(this.readWord());
    }
    this.aliasNextWord = false;
    if (words.length === 0 && assigns.length === 0 && redirs.length === 0) {
      this.fail(`syntax error near unexpected token '${this.ch() ?? "newline"}'`);
    }
    return { t: "simple", assigns, words, redirs };
  }
  tryRedir() {
    const rest = this.s.slice(this.i, this.i + 4);
    const m = /^(\d)?(&>>|&>|<<<|<<-|<<|>>|>&|<&|>\||<>|>|<)/.exec(rest);
    if (!m) return null;
    this.i += m[0].length;
    const fd = m[1] !== void 0 ? Number(m[1]) : null;
    const op = m[2];
    this.skipBlank();
    if (op === "<<" || op === "<<-") {
      const delimWord = this.readWord();
      const quoted = delimWord.some((p) => p.t !== "lit") || wordToRawish(delimWord).includes("\\");
      const delim = wordToRawish(delimWord).replace(/\\/g, "");
      const r = { fd, op: "<<", target: [], heredoc: { body: [], quoted, strip: op === "<<-", delim } };
      this.pending.push(r);
      return r;
    }
    const c = this.ch();
    if (c === void 0 || c === "\n" || META.has(c)) this.fail(`syntax error near unexpected token '${c ?? "newline"}'`);
    return { fd, op, target: this.readWord() };
  }
  /** Reads a word (stops at metacharacters). */
  readWord(inDbracket = false, assignValue = false) {
    const parts = [];
    let lit = "";
    const flush = () => {
      if (lit) parts.push({ t: "lit", v: lit });
      lit = "";
    };
    const start = this.i;
    while (!this.eof()) {
      const c = this.ch();
      if (META.has(c)) {
        if (inDbracket && (c === "<" || c === ">")) break;
        break;
      }
      if (inDbracket && c === "]" && this.ch(1) === "]" && this.i === start) break;
      if (c === "\\") {
        if (this.ch(1) === "\n") {
          this.i += 2;
          continue;
        }
        flush();
        parts.push({ t: "sq", v: this.ch(1) ?? "" });
        this.i += 2;
        continue;
      }
      if (c === "'") {
        flush();
        const end = this.s.indexOf("'", this.i + 1);
        if (end === -1) {
          this.i = this.s.length;
          this.fail("unexpected EOF while looking for matching quote");
        }
        parts.push({ t: "sq", v: this.s.slice(this.i + 1, end) });
        this.i = end + 1;
        continue;
      }
      if (c === "$" && this.ch(1) === "'") {
        flush();
        this.i += 2;
        parts.push({ t: "sq", v: this.readAnsiC() });
        continue;
      }
      if (c === '"') {
        flush();
        this.i++;
        parts.push({ t: "dq", parts: this.parseDqContent(false) });
        continue;
      }
      if (c === "$" || c === "`") {
        const p = this.readDollar();
        if (p) {
          flush();
          parts.push(p);
          continue;
        }
      }
      if (c === "~" && this.i === start) {
        const m = /^~([A-Za-z0-9_.-]*)/.exec(this.s.slice(this.i));
        const after = this.s[this.i + m[0].length];
        if (after === void 0 || after === "/" || META.has(after) || assignValue && after === ":") {
          flush();
          parts.push({ t: "tilde", user: m[1] });
          this.i += m[0].length;
          continue;
        }
      }
      lit += c;
      this.i++;
    }
    flush();
    return parts;
  }
  readAnsiC() {
    let out = "";
    while (!this.eof()) {
      const c = this.ch();
      if (c === "'") {
        this.i++;
        return out;
      }
      if (c === "\\") {
        const n = this.ch(1);
        this.i += 2;
        const simple = ANSI_C_ESCAPES[n ?? ""];
        if (simple !== void 0) {
          out += simple;
          continue;
        }
        if (n !== void 0 && n >= "0" && n <= "7") {
          const m = /^[0-7]{0,2}/.exec(this.s.slice(this.i));
          out += String.fromCharCode(parseInt(n + m[0], 8) & 255);
          this.i += m[0].length;
          continue;
        }
        const hex = n === "x" ? 2 : n === "u" ? 4 : n === "U" ? 8 : 0;
        if (hex) {
          const m = new RegExp(`^[0-9a-fA-F]{1,${hex}}`).exec(this.s.slice(this.i));
          if (!m) {
            out += "\\" + n;
            continue;
          }
          const cp2 = parseInt(m[0], 16);
          out += n === "x" ? String.fromCharCode(cp2) : cp2 <= 1114111 ? String.fromCodePoint(cp2) : "";
          this.i += m[0].length;
          continue;
        }
        if (n === "c" && this.i < this.s.length) {
          out += String.fromCharCode(this.s.charCodeAt(this.i) & 31);
          this.i++;
          continue;
        }
        out += "\\" + (n ?? "");
        continue;
      }
      out += c;
      this.i++;
    }
    this.fail("unexpected EOF while looking for matching quote");
  }
  /** Parses the inside of double quotes (until `"` unless `toEnd`). */
  parseDqContent(toEnd) {
    const parts = [];
    let lit = "";
    const flush = () => {
      if (lit) parts.push({ t: "sq", v: lit });
      lit = "";
    };
    while (!this.eof()) {
      const c = this.ch();
      if (c === '"' && !toEnd) {
        this.i++;
        flush();
        return parts;
      }
      if (c === "\\") {
        const n = this.ch(1);
        if (n === "$" || n === "`" || n === '"' || n === "\\" || n === "\n") {
          if (n !== "\n") lit += n;
          this.i += 2;
          continue;
        }
        lit += c;
        this.i++;
        continue;
      }
      if (c === "$" || c === "`") {
        const p = this.readDollar();
        if (p) {
          flush();
          parts.push(p);
          continue;
        }
      }
      lit += c;
      this.i++;
    }
    if (!toEnd) this.fail('unexpected EOF while looking for matching `"`');
    flush();
    return parts;
  }
  /** Reads $x ${...} $(...) $((...)) or `...`; returns null if `$` is literal. */
  readDollar() {
    const c = this.ch();
    if (c === "`") {
      let j = this.i + 1;
      let src = "";
      while (j < this.s.length && this.s[j] !== "`") {
        if (this.s[j] === "\\" && "$`\\".includes(this.s[j + 1])) {
          src += this.s[j + 1];
          j += 2;
          continue;
        }
        src += this.s[j++];
      }
      if (j >= this.s.length) {
        this.i = j;
        this.fail("unexpected EOF while looking for matching ``");
      }
      this.i = j + 1;
      return { t: "cmd", src };
    }
    const n = this.ch(1);
    if (n === "(" && this.ch(2) === "(") {
      const start = this.i + 3;
      let j = start;
      let depth = 0;
      while (j < this.s.length) {
        const cj = this.s[j];
        if (cj === "(") depth++;
        else if (cj === ")") {
          if (depth === 0 && this.s[j + 1] === ")") break;
          depth--;
        }
        j++;
      }
      if (j >= this.s.length) {
        this.i = j;
        this.fail("unexpected EOF in arithmetic");
      }
      const inner = this.s.slice(start, j);
      this.i = j + 2;
      return { t: "arith", expr: new _Parser(inner).parseDqContent(true) };
    }
    if (n === "(") {
      const start = this.i + 2;
      const end = findMatchingParen(this.s, start);
      if (end === -1) {
        this.i = this.s.length;
        this.fail("unexpected EOF while looking for matching `)`");
      }
      this.i = end + 1;
      return { t: "cmd", src: this.s.slice(start, end) };
    }
    if (n === "{") {
      const start = this.i + 2;
      let j = start;
      let depth = 0;
      while (j < this.s.length) {
        const cj = this.s[j];
        if (cj === "\\") {
          j += 2;
          continue;
        }
        if (cj === "'" && depth >= 0) {
          const e = this.s.indexOf("'", j + 1);
          j = e === -1 ? this.s.length : e + 1;
          continue;
        }
        if (cj === "{") depth++;
        else if (cj === "}") {
          if (depth === 0) break;
          depth--;
        }
        j++;
      }
      if (j >= this.s.length) {
        this.i = this.s.length;
        this.fail("unexpected EOF while looking for matching `}`");
      }
      const inner = this.s.slice(start, j);
      this.i = j + 1;
      return parseBraceParam(inner);
    }
    if (n !== void 0 && /[A-Za-z_]/.test(n)) {
      const m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(this.s.slice(this.i + 1));
      this.i += 1 + m[0].length;
      return { t: "param", name: m[0] };
    }
    if (n !== void 0 && /[0-9@*#?$!\-]/.test(n)) {
      this.i += 2;
      return { t: "param", name: n };
    }
    return null;
  }
};
function findMatchingParen(s, start) {
  let depth = 0;
  let j = start;
  while (j < s.length) {
    const c = s[j];
    if (c === "\\") {
      j += 2;
      continue;
    }
    if (c === "'") {
      const e = s.indexOf("'", j + 1);
      if (e === -1) return -1;
      j = e + 1;
      continue;
    }
    if (c === '"') {
      j++;
      while (j < s.length && s[j] !== '"') {
        if (s[j] === "\\") j++;
        else if (s[j] === "$" && s[j + 1] === "(") {
          const e = findMatchingParen(s, j + 2);
          if (e === -1) return -1;
          j = e;
        }
        j++;
      }
      j++;
      continue;
    }
    if (c === "#" && (j === start || /\s/.test(s[j - 1]))) {
      while (j < s.length && s[j] !== "\n") j++;
      continue;
    }
    if (c === "(") depth++;
    else if (c === ")") {
      if (depth === 0) return j;
      depth--;
    }
    j++;
  }
  return -1;
}
function parseBraceParam(inner) {
  if (inner.startsWith("#") && inner.length > 1 && /^#[A-Za-z_0-9@*#?]/.test(inner) && !/^#[#%]/.test(inner.slice(1))) {
    const m2 = /^([^[]*)\[(.*)\]$/.exec(inner.slice(1));
    if (m2) return { t: "param", name: m2[1], length: true, index: m2[2] };
    return { t: "param", name: inner.slice(1), length: true };
  }
  const m = /^([A-Za-z_][A-Za-z0-9_]*|[0-9]+|[@*#?$!\-])/.exec(inner);
  if (!m) throw new ShellSyntaxError(`bad substitution: \${${inner}}`);
  const name = m[1];
  let rest = inner.slice(name.length);
  if (!rest) return { t: "param", name };
  let index;
  if (rest.startsWith("[")) {
    const e = rest.indexOf("]");
    index = rest.slice(1, e);
    rest = rest.slice(e + 1);
    if (!rest) return { t: "param", name, index };
  }
  const opm = /^(:-|:=|:\?|:\+|-|=|\?|\+|##|#|%%|%|\/\/|\/#|\/%|\/|\^\^|\^|,,|,|:)/.exec(rest);
  if (!opm) throw new ShellSyntaxError(`bad substitution: \${${inner}}`);
  const op = opm[1];
  const argSrc = rest.slice(op.length);
  if (op.startsWith("/")) {
    let k = 0;
    let pat = "";
    while (k < argSrc.length && argSrc[k] !== "/") {
      if (argSrc[k] === "\\") pat += argSrc[k++];
      pat += argSrc[k++];
    }
    const rep = argSrc.slice(k + 1);
    return { t: "param", name, index, op, arg: new Parser(pat).readWordAll(), arg2: new Parser(rep).readWordAll() };
  }
  if (op === ":") {
    const [off, len] = argSrc.split(":");
    return { t: "param", name, index, op: ":", arg: [{ t: "lit", v: off }], arg2: len !== void 0 ? [{ t: "lit", v: len }] : void 0 };
  }
  return { t: "param", name, index, op, arg: new Parser(argSrc).readWordAll() };
}
Parser.prototype.readWordAll = function() {
  const parts = [];
  while (this.i < this.s.length) {
    const w = this.readWord();
    parts.push(...w);
    if (this.i < this.s.length) {
      parts.push({ t: "lit", v: this.s[this.i] });
      this.i++;
    }
  }
  return parts;
};
function wordToLiteral(w) {
  let s = "";
  for (const p of w) {
    if (p.t === "lit" || p.t === "sq") s += p.v;
    else return null;
  }
  return s;
}
function wordToRawish(w) {
  let s = "";
  for (const p of w) {
    if (p.t === "lit" || p.t === "sq") s += p.v;
    else if (p.t === "dq") s += wordToRawish(p.parts);
  }
  return s;
}
function isName(s) {
  return NAME_RE.test(s);
}

// src/kernel/sh/pattern.ts
var cache = /* @__PURE__ */ new Map();
function patternToRegexSource(pat, opts = {}) {
  let re = "";
  const any = opts.pathname ? "[^/]" : "[\\s\\S]";
  for (let i = 0; i < pat.length; i++) {
    const c = pat[i];
    if (c === "\\") {
      const n = pat[++i] ?? "\\";
      re += escapeRe(n);
    } else if (c === "*") {
      while (pat[i + 1] === "*") i++;
      re += `${any}*`;
    } else if (c === "?") {
      re += any;
    } else if (c === "[") {
      let j = i + 1;
      let neg = false;
      if (pat[j] === "!" || pat[j] === "^") {
        neg = true;
        j++;
      }
      let cls = "";
      let first = true;
      while (j < pat.length && (pat[j] !== "]" || first)) {
        first = false;
        const cj = pat[j];
        if (cj === "\\") {
          cls += escapeRe(pat[j + 1] ?? "");
          j += 2;
          continue;
        }
        if (cj === "[" && pat[j + 1] === ":") {
          const end = pat.indexOf(":]", j + 2);
          if (end !== -1) {
            const name = pat.slice(j + 2, end);
            cls += POSIX_CLASSES[name] ?? "";
            j = end + 2;
            continue;
          }
        }
        cls += cj === "^" || cj === "\\" || cj === "]" ? "\\" + cj : cj;
        j++;
      }
      if (j >= pat.length) {
        re += "\\[";
        continue;
      }
      re += `[${neg ? "^" : ""}${cls}]`;
      i = j;
    } else {
      re += escapeRe(c);
    }
  }
  return re;
}
var POSIX_CLASSES = {
  alpha: "a-zA-Z",
  digit: "0-9",
  alnum: "a-zA-Z0-9",
  upper: "A-Z",
  lower: "a-z",
  space: "\\s",
  blank: " \\t",
  punct: "!-\\/:-@\\[-`{-~",
  xdigit: "0-9a-fA-F",
  word: "\\w"
};
function escapeRe(c) {
  return /[\\^$.*+?()[\]{}|/-]/.test(c) ? "\\" + c : c;
}
function eregToRegexSource(re) {
  let out = "";
  for (let i = 0; i < re.length; i++) {
    const c = re[i];
    if (c === "\\") {
      const n = re[++i];
      if (n === void 0) throw new Error("trailing backslash");
      if ("wWsSbB".includes(n)) out += "\\" + n;
      else if (n === "<") out += "\\b(?=\\w)";
      else if (n === ">") out += "\\b(?<=\\w)";
      else if (/[1-9]/.test(n)) out += "\\" + n;
      else out += escapeRe(n);
    } else if (c === "[") {
      let j = i + 1;
      let cls = "";
      if (re[j] === "^") {
        cls += "^";
        j++;
      }
      if (re[j] === "]") {
        cls += "\\]";
        j++;
      }
      for (; j < re.length && re[j] !== "]"; j++) {
        const cj = re[j];
        if (cj === "[" && (re[j + 1] === ":" || re[j + 1] === "=" || re[j + 1] === ".")) {
          const close = re.indexOf(re[j + 1] + "]", j + 2);
          if (close === -1) throw new Error("unterminated bracket expression");
          const name = re.slice(j + 2, close);
          if (re[j + 1] === ":") {
            if (POSIX_CLASSES[name] === void 0) throw new Error(`invalid character class ${name}`);
            cls += POSIX_CLASSES[name];
          } else cls += name.replace(/[\\\]^-]/g, "\\$&");
          j = close + 1;
          continue;
        }
        cls += cj === "\\" || cj === "^" && cls !== "" && cls !== "^" ? "\\" + cj : cj;
      }
      if (j >= re.length) throw new Error("unterminated bracket expression");
      out += `[${cls}]`;
      i = j;
    } else if (c === "{") {
      const m = /^\{(\d+)(,(\d*))?\}/.exec(re.slice(i));
      if (m && out !== "") {
        out += m[0];
        i += m[0].length - 1;
      } else out += "\\{";
    } else if (c === "}") out += "\\}";
    else if (c === "/") out += "\\/";
    else out += c;
  }
  return out;
}
function matchPattern(pat, s) {
  let re = cache.get(pat);
  if (!re) {
    re = new RegExp(`^${patternToRegexSource(pat)}$`);
    if (cache.size > 500) cache.clear();
    cache.set(pat, re);
  }
  return re.test(s);
}
function hasGlobChars(pat) {
  for (let i = 0; i < pat.length; i++) {
    const c = pat[i];
    if (c === "\\") {
      i++;
      continue;
    }
    if (c === "*" || c === "?" || c === "[") return true;
  }
  return false;
}
function unescapePattern(pat) {
  return pat.replace(/\\([\s\S])/g, "$1");
}
function removeMatch(s, pat, op) {
  const src = patternToRegexSource(pat);
  if (op === "#" || op === "##") {
    const re = new RegExp(`^${src}`);
    const lens = [];
    for (let i = 0; i <= s.length; i++) if (new RegExp(`^(?:${src})$`).test(s.slice(0, i))) lens.push(i);
    void re;
    if (!lens.length) return s;
    return s.slice(op === "#" ? lens[0] : lens[lens.length - 1]);
  }
  const starts = [];
  for (let i = s.length; i >= 0; i--) if (new RegExp(`^(?:${src})$`).test(s.slice(i))) starts.push(i);
  if (!starts.length) return s;
  return s.slice(0, op === "%" ? starts[0] : starts[starts.length - 1]);
}
function replaceMatch(s, pat, rep, op) {
  const src = patternToRegexSource(pat);
  if (!src) return s;
  if (op === "/#") return s.replace(new RegExp(`^(?:${src})`), () => rep);
  if (op === "/%") return s.replace(new RegExp(`(?:${src})$`), () => rep);
  return s.replace(new RegExp(src, op === "//" ? "g" : ""), () => rep);
}

// src/kernel/sh/test.ts
var UID = 1e3;
var UNARY_OPS = /* @__PURE__ */ new Set(["-a", "-b", "-c", "-d", "-e", "-f", "-g", "-h", "-k", "-p", "-r", "-s", "-t", "-u", "-w", "-x", "-G", "-L", "-N", "-O", "-S", "-z", "-n", "-v", "-o"]);
var BINARY_OPS = /* @__PURE__ */ new Set(["=", "==", "!=", "<", ">", "-eq", "-ne", "-lt", "-le", "-gt", "-ge", "-nt", "-ot", "-ef"]);
function builtinTest(sh, args) {
  const vfs = sh.kernel.vfs;
  const st = (p, follow = true) => {
    try {
      return follow ? vfs.stat(sh.resolve(p)) : vfs.lstat(sh.resolve(p));
    } catch {
      return null;
    }
  };
  const num = (s) => {
    if (!/^\s*-?\d+\s*$/.test(s)) throw new Error(`${s}: integer expression expected`);
    return parseInt(s, 10);
  };
  const type = (a, t, follow = true) => {
    const s = st(a, follow);
    return !!s && (s.mode & S_IFMT) === t;
  };
  const access = (a, bit) => {
    const s = st(a);
    if (!s) return false;
    const shift = s.uid === UID ? 6 : s.gid === UID ? 3 : 0;
    return (s.mode >> shift & bit) !== 0;
  };
  const unary = (op, a) => {
    switch (op) {
      case "-e":
      case "-a":
        return !!st(a);
      case "-f":
        return type(a, S_IFREG);
      case "-d":
        return type(a, S_IFDIR);
      case "-L":
      case "-h":
        return type(a, S_IFLNK, false);
      case "-p":
        return type(a, S_IFIFO);
      case "-c":
        return type(a, S_IFCHR);
      case "-b":
        return type(a, S_IFBLK);
      case "-S":
        return type(a, S_IFSOCK);
      case "-s":
        return !!st(a) && st(a).size > 0;
      case "-r":
        return access(a, 4);
      case "-w":
        return access(a, 2);
      case "-x":
        return access(a, 1);
      case "-u":
        return !!st(a) && (st(a).mode & 2048) !== 0;
      case "-g":
        return !!st(a) && (st(a).mode & 1024) !== 0;
      case "-k":
        return !!st(a) && (st(a).mode & 512) !== 0;
      case "-O":
        return st(a)?.uid === UID;
      case "-G":
        return st(a)?.gid === UID;
      case "-N":
        return !!st(a) && st(a).mtimeMs > st(a).atimeMs;
      case "-z":
        return a.length === 0;
      case "-n":
        return a.length !== 0;
      case "-t":
        return sh.fds.get(Number(a))?.kind === "tty";
      case "-v":
        return sh.getVar(a) !== void 0;
      case "-o":
        return sh.optionIsSet(a);
    }
    return null;
  };
  const binary = (a, op, b) => {
    switch (op) {
      case "=":
      case "==":
        return a === b;
      case "!=":
        return a !== b;
      case "<":
        return a < b;
      case ">":
        return a > b;
      case "-eq":
        return num(a) === num(b);
      case "-ne":
        return num(a) !== num(b);
      case "-lt":
        return num(a) < num(b);
      case "-le":
        return num(a) <= num(b);
      case "-gt":
        return num(a) > num(b);
      case "-ge":
        return num(a) >= num(b);
      case "-nt":
        return (st(a)?.mtimeMs ?? -1) > (st(b)?.mtimeMs ?? -1);
      case "-ot":
        return (st(a)?.mtimeMs ?? Infinity) < (st(b)?.mtimeMs ?? Infinity);
      case "-ef":
        return !!st(a) && st(a).ino === st(b)?.ino;
    }
    return null;
  };
  let i = 0;
  const expr = () => {
    let v = andE();
    while (args[i] === "-o") {
      i++;
      const r = andE();
      v = v || r;
    }
    return v;
  };
  const andE = () => {
    let v = notE();
    while (args[i] === "-a") {
      i++;
      const r = notE();
      v = v && r;
    }
    return v;
  };
  const notE = () => {
    if (args[i] === "!" && i + 1 < args.length) {
      i++;
      return !notE();
    }
    return prim();
  };
  const prim = () => {
    const remaining = args.length - i;
    if (args[i] === "(" && remaining >= 3) {
      i++;
      const v = expr();
      if (args[i] === ")") i++;
      return v;
    }
    if (remaining >= 3) {
      const r = binary(args[i], args[i + 1], args[i + 2]);
      if (r !== null) {
        i += 3;
        return r;
      }
    }
    if (remaining >= 2) {
      const r = unary(args[i], args[i + 1]);
      if (r !== null) {
        i += 2;
        return r;
      }
    }
    const a = args[i++];
    return a !== void 0 && a !== "";
  };
  try {
    if (args.length === 0) return 1;
    const v = expr();
    if (i < args.length) {
      sh.err("sh: test: too many arguments\n");
      return 2;
    }
    return v ? 0 : 1;
  } catch (e) {
    sh.err(`sh: test: ${e.message}
`);
    return 2;
  }
}

// src/kernel/sh/printf.ts
function unescape(s) {
  let stop = false;
  const out = s.replace(/\\(0[0-7]{0,3}|[0-7]{1,3}|x[0-9a-fA-F]{1,2}|[abcefnrtv\\"'])/g, (_m, e) => {
    if (e === "c") {
      stop = true;
      return "";
    }
    if (/^[0-7]/.test(e)) return String.fromCharCode(parseInt(e, 8));
    if (e[0] === "x") return String.fromCharCode(parseInt(e.slice(1), 16));
    return { a: "\x07", b: "\b", e: "\x1B", f: "\f", n: "\n", r: "\r", t: "	", v: "\v", "\\": "\\", '"': '"', "'": "'" }[e];
  });
  if (stop) {
    const idx = out.indexOf("\0STOP");
    void idx;
  }
  return { s: out, stop };
}
function toNum(a) {
  if (a === void 0 || a === "") return 0;
  if (/^['"]/.test(a)) return a.charCodeAt(1) || 0;
  const n = Number(a.trim());
  if (Number.isNaN(n)) {
    const p = parseFloat(a);
    return Number.isNaN(p) ? 0 : p;
  }
  return n;
}
function formatPrintf(fmt, args) {
  let out = "";
  let ai = 0;
  let first = true;
  while (first || ai < args.length && ai > 0) {
    first = false;
    const startAi = ai;
    let i = 0;
    while (i < fmt.length) {
      const c = fmt[i];
      if (c === "\\") {
        const m2 = /^\\(0[0-7]{0,3}|[0-7]{1,3}|x[0-9a-fA-F]{1,2}|[abcefnrtv\\"'])/.exec(fmt.slice(i));
        if (m2) {
          const u = unescape(m2[0]);
          if (u.stop) return out;
          out += u.s;
          i += m2[0].length;
          continue;
        }
        out += c;
        i++;
        continue;
      }
      if (c !== "%") {
        out += c;
        i++;
        continue;
      }
      if (fmt[i + 1] === "%") {
        out += "%";
        i += 2;
        continue;
      }
      const m = /^%([-+ #0]*)(\*|\d+)?(?:\.(\*|\d+))?([diouxXeEfFgGcsbq])/.exec(fmt.slice(i));
      if (!m) {
        out += c;
        i++;
        continue;
      }
      i += m[0].length;
      const flags = m[1];
      let width = m[2] === "*" ? toNum(args[ai++]) : m[2] ? Number(m[2]) : 0;
      let prec = m[3] === "*" ? toNum(args[ai++]) : m[3] !== void 0 ? Number(m[3]) : void 0;
      const conv = m[4];
      const arg = args[ai++];
      let s;
      switch (conv) {
        case "d":
        case "i":
          s = String(Math.trunc(toNum(arg)));
          if (flags.includes("+") && !s.startsWith("-")) s = "+" + s;
          else if (flags.includes(" ") && !s.startsWith("-")) s = " " + s;
          break;
        case "u":
          s = String(Math.abs(Math.trunc(toNum(arg))));
          break;
        case "o":
          s = Math.trunc(toNum(arg)).toString(8);
          break;
        case "x":
          s = Math.trunc(toNum(arg)).toString(16);
          if (flags.includes("#") && s !== "0") s = "0x" + s;
          break;
        case "X":
          s = Math.trunc(toNum(arg)).toString(16).toUpperCase();
          break;
        case "e":
        case "E":
          s = toNum(arg).toExponential(prec ?? 6);
          if (conv === "E") s = s.toUpperCase();
          prec = void 0;
          break;
        case "f":
        case "F":
          s = toNum(arg).toFixed(prec ?? 6);
          prec = void 0;
          break;
        case "g":
        case "G":
          s = String(Number(toNum(arg).toPrecision(prec || 6)));
          prec = void 0;
          break;
        case "c":
          s = (arg ?? "").slice(0, 1);
          break;
        case "b":
          s = unescape(arg ?? "").s;
          break;
        case "q":
          s = /^[A-Za-z0-9_./=:@%+-]+$/.test(arg ?? "") ? arg ?? "''" : `'${(arg ?? "").replace(/'/g, "'\\''")}'`;
          break;
        default:
          s = arg ?? "";
      }
      if (prec !== void 0 && (conv === "s" || conv === "b")) s = s.slice(0, prec);
      if (width && s.length < width) {
        if (flags.includes("-")) s = s.padEnd(width);
        else if (flags.includes("0") && /[diouxXeEfFgG]/.test(conv)) {
          const neg = s.startsWith("-") || s.startsWith("+");
          s = neg ? s[0] + s.slice(1).padStart(width - 1, "0") : s.padStart(width, "0");
        } else s = s.padStart(width);
      }
      void width;
      out += s;
    }
    if (ai === startAi) break;
  }
  return out;
}

// src/kernel/sh/interp.ts
var BreakSig = class {
  constructor(n) {
    this.n = n;
  }
  n;
};
var ContinueSig = class {
  constructor(n) {
    this.n = n;
  }
  n;
};
var ReturnSig = class {
  constructor(code) {
    this.code = code;
  }
  code;
};
var InterruptSig = class {
};
var pendingJobs = /* @__PURE__ */ new WeakMap();
var FATAL_SIGNALS = /* @__PURE__ */ new Set(["SIGHUP", "SIGINT", "SIGQUIT", "SIGTERM", "SIGUSR1", "SIGUSR2", "SIGALRM", "SIGPIPE", "SIGABRT"]);
var enc3 = new TextEncoder();
var dec2 = new TextDecoder();
var Shell = class _Shell {
  /** `init` false: an empty shell that clone() fills in. */
  constructor(ctx, init2 = true) {
    this.ctx = ctx;
    this.cwd = ctx.cwd;
    this.shellPid = ctx.proc.pid;
    this.umask = ctx.proc.umask;
    if (!init2) return;
    for (const [k, v] of Object.entries(ctx.env)) {
      this.vars.set(k, v);
      this.exported.add(k);
    }
    for (const [fd, f] of ctx.proc.fds) this.fds.set(fd, f.ref());
    if (!this.vars.has("PWD")) this.vars.set("PWD", this.cwd);
    this.vars.set("PWD", this.cwd);
    this.exported.add("PWD");
    if (!this.vars.has("IFS")) this.vars.set("IFS", " 	\n");
    this.vars.set("PPID", String(ctx.proc.ppid));
  }
  ctx;
  vars = /* @__PURE__ */ new Map();
  exported = /* @__PURE__ */ new Set();
  readonlyVars = /* @__PURE__ */ new Set();
  funcs = /* @__PURE__ */ new Map();
  aliases = /* @__PURE__ */ new Map();
  positional = [];
  arg0 = "sh";
  status = 0;
  /** $!: pid of the last background job. */
  lastBg = 0;
  /** Background jobs by pid: their exit status, kept until `wait` collects it. */
  bgJobs = /* @__PURE__ */ new Map();
  opts = { errexit: false, xtrace: false, nounset: false, pipefail: false, noglob: false, interactive: false };
  fds = /* @__PURE__ */ new Map();
  locals = [];
  /** trap actions by condition (EXIT, ERR, INT, TERM…); '' ignores the signal. */
  traps = /* @__PURE__ */ new Map();
  /** Signals received for which a trap is set, run at the next command boundary. */
  pendingTraps = [];
  trapWaiters = [];
  inTrap = false;
  /** Indexed arrays (only BASH_REMATCH is one). */
  arrays = /* @__PURE__ */ new Map();
  /** This shell is its process (not an in-process subshell): exec and signal traps act on the process. */
  ownsProc = false;
  /** $$: the pid of the shell, also in subshells and background jobs. */
  shellPid;
  /** The file mode creation mask; an in-process subshell has its own copy. */
  umask;
  /** Run the next external simple command in this process (exec), as the last command of a job. */
  execLast = false;
  cwd;
  depth = 0;
  /** errexit suppressed (inside conditions). */
  noErrexit = 0;
  history = [];
  get kernel() {
    return this.ctx.kernel;
  }
  /** Creates a subshell copy (shares nothing mutable with the parent). */
  clone() {
    const s = new _Shell(this.ctx, false);
    s.ctx = this.ctx;
    s.vars = new Map(this.vars);
    s.exported = new Set(this.exported);
    s.readonlyVars = new Set(this.readonlyVars);
    s.funcs = new Map(this.funcs);
    s.aliases = new Map(this.aliases);
    s.positional = [...this.positional];
    s.arg0 = this.arg0;
    s.status = this.status;
    s.lastBg = this.lastBg;
    s.bgJobs = /* @__PURE__ */ new Map();
    s.opts = { ...this.opts, interactive: false };
    s.fds = /* @__PURE__ */ new Map();
    for (const [fd, f] of this.fds) s.fds.set(fd, f.ref());
    s.locals = [];
    for (const [k, v] of this.traps) if (v === "" && k !== "EXIT" && k !== "ERR") s.traps.set(k, v);
    s.arrays = new Map(this.arrays);
    s.opts_allexport = this.opts_allexport;
    s.shellPid = this.shellPid;
    s.umask = this.umask;
    s.pipelinePgid = this.pipelinePgid;
    s.onSpawn = this.onSpawn;
    s.onSigint = this.onSigint;
    s.cwd = this.cwd;
    s.depth = this.depth;
    s.noErrexit = this.noErrexit;
    return s;
  }
  /** The child shell of a background job, in its own process. */
  adoptProcess(ctx) {
    this.ctx = ctx;
    this.releaseFds();
    for (const [fd, f] of ctx.proc.fds) this.fds.set(fd, f.ref());
    ctx.proc.umask = this.umask;
    this.ownsProc = true;
    this.installSignalHandler();
  }
  releaseFds() {
    for (const f of this.fds.values()) f.unref();
    this.fds.clear();
  }
  // ---------------------------------------------------------------------------
  // variables
  getVar(name) {
    switch (name) {
      case "?":
        return String(this.status);
      case "$":
        return String(this.shellPid);
      case "!":
        return this.lastBg ? String(this.lastBg) : "";
      case "#":
        return String(this.positional.length);
      case "0":
        return this.arg0;
      case "@":
      case "*":
        return this.positional.join(name === "*" ? (this.vars.get("IFS") ?? " ")[0] ?? "" : " ");
      case "-":
        return (this.opts.errexit ? "e" : "") + (this.opts.xtrace ? "x" : "") + (this.opts.nounset ? "u" : "") + (this.opts.interactive ? "i" : "");
      case "RANDOM":
        return String(Math.floor(Math.random() * 32768));
      case "SECONDS":
        return String(Math.floor((Date.now() - this.ctx.proc.startedAt) / 1e3));
      case "PWD":
        return this.cwd;
      case "BASHPID":
        return String(this.ctx.proc.pid);
    }
    if (/^[0-9]+$/.test(name)) return this.positional[Number(name) - 1];
    return this.vars.get(name);
  }
  setVar(name, value, exportIt = false) {
    if (this.readonlyVars.has(name)) throw new ShellError(`${name}: readonly variable`);
    this.vars.set(name, value);
    if (exportIt || this.opts_allexport) this.exported.add(name);
    if (name === "PWD") this.cwd = value;
  }
  opts_allexport = false;
  unsetVar(name) {
    if (this.readonlyVars.has(name)) throw new ShellError(`${name}: readonly variable`);
    this.vars.delete(name);
    this.exported.delete(name);
  }
  envForChild(extra) {
    const env2 = {};
    for (const k of this.exported) {
      const v = this.vars.get(k);
      if (v !== void 0) env2[k] = v;
    }
    env2.PWD = this.cwd;
    if (extra) Object.assign(env2, extra);
    return env2;
  }
  // ---------------------------------------------------------------------------
  // output helpers
  write(fd, s) {
    const f = this.fds.get(fd);
    if (!f) return;
    try {
      f.write(typeof s === "string" ? enc3.encode(s) : s);
    } catch (e) {
      if (e?.code === "EPIPE") throw new ExitSignal(141);
      throw e;
    }
  }
  out(s) {
    this.write(1, s);
  }
  err(s) {
    this.write(2, s);
  }
  async readFd(fd, max = 65536) {
    const f = this.fds.get(fd);
    if (!f) return null;
    const d = await f.read(max);
    return d.length ? d : null;
  }
  resolve(p) {
    return resolve(this.cwd, p);
  }
  // ---------------------------------------------------------------------------
  // running
  /**
   * Parses and runs `src` one complete command (line) at a time. An error that abandons a command
   * (assigning a readonly variable, a bad $(( )) …) skips the rest of that line and goes on with
   * the next, as bash does; a syntax error stops with status 2.
   */
  async runSource(src, name = this.arg0) {
    const parser = new Parser(src, this.aliases);
    let st = 0;
    for (; ; ) {
      let node;
      try {
        node = parser.parseNext();
      } catch (e) {
        if (!(e instanceof ShellSyntaxError)) throw e;
        this.err(`${name}: ${e.message}
`);
        this.status = 2;
        return 2;
      }
      if (!node) return st;
      try {
        st = await this.exec(node);
      } catch (e) {
        if (!(e instanceof ShellError)) throw e;
        this.err(`sh: ${e.message}
`);
        this.status = st = e.code;
        if (this.opts.errexit && this.noErrexit === 0) throw new ExitSignal(st);
      }
    }
  }
  /**
   * Runs `body` as a subshell in `sub` (a clone): `exit`, errors and stray `return`/`break` end
   * the subshell only, then its EXIT trap runs and its fds are released.
   */
  static async isolated(sub, body) {
    let code;
    try {
      code = await body();
    } catch (e) {
      if (e instanceof ExitSignal) code = e.code;
      else if (e instanceof ReturnSig) code = e.code;
      else if (e instanceof BreakSig || e instanceof ContinueSig) code = 0;
      else if (e instanceof ShellError) {
        try {
          sub.err(`sh: ${e.message}
`);
        } catch {
        }
        code = e.code;
      } else {
        sub.releaseFds();
        throw e;
      }
    }
    try {
      return await sub.runExitTrap(code);
    } finally {
      sub.releaseFds();
    }
  }
  // ---------------------------------------------------------------------------
  // traps
  /** Runs the EXIT trap (once) and returns the shell's exit status: `code`, or the trap's `exit`. */
  async runExitTrap(code) {
    const action = this.traps.get("EXIT");
    this.traps.delete("EXIT");
    if (!action) return code;
    this.status = code;
    try {
      await this.runSource(action, "trap");
    } catch (e) {
      if (e instanceof ExitSignal) return e.code;
      if (e instanceof ReturnSig || e instanceof BreakSig || e instanceof ContinueSig || e instanceof InterruptSig) return code;
      throw e;
    }
    return code;
  }
  /** Runs the traps of the signals that arrived since the last command, keeping $?. */
  async runPendingTraps() {
    if (this.inTrap) return;
    this.inTrap = true;
    try {
      while (this.pendingTraps.length) {
        const sig = this.pendingTraps.shift();
        const action = this.traps.get(sig);
        if (!action) continue;
        const saved = this.status;
        await this.runSource(action, "trap");
        this.status = saved;
      }
    } finally {
      this.inTrap = false;
    }
  }
  /** Resolves when a trapped signal arrives (`wait` returns early then). */
  waitForTrap() {
    if (this.pendingTraps.length) return Promise.resolve();
    return new Promise((r) => this.trapWaiters.push(r));
  }
  /** The signal whose trap is about to run (for wait's status). */
  pendingTrapSignal() {
    return this.pendingTraps[0];
  }
  /** The process's signal handler: trapped signals are queued, the rest take their default action. */
  installSignalHandler() {
    const proc = this.ctx.proc;
    proc.onSignal = (sig) => {
      const name = sig.replace(/^SIG/, "");
      const action = this.traps.get(name);
      if (action !== void 0) {
        if (action !== "") {
          this.pendingTraps.push(name);
          const ws = this.trapWaiters;
          this.trapWaiters = [];
          for (const w of ws) w();
        }
        return true;
      }
      if (this.opts.interactive && (sig === "SIGINT" || sig === "SIGTSTP" || sig === "SIGQUIT" || sig === "SIGTERM" || sig === "SIGWINCH")) {
        if (sig === "SIGINT") this.interrupted = true;
        return true;
      }
      if (FATAL_SIGNALS.has(sig) && this.traps.has("EXIT")) {
        void this.dieOfSignal(sig);
        return true;
      }
      return false;
    };
  }
  async dieOfSignal(sig) {
    const proc = this.ctx.proc;
    try {
      await this.runExitTrap(128 + (SIGNALS[sig] ?? 15));
    } catch {
    }
    if (proc.state !== "running") return;
    proc.abort.abort(sig);
    proc.finish({ code: null, signal: sig });
  }
  setUmask(mask) {
    this.umask = mask;
    if (this.ownsProc) this.ctx.proc.umask = mask;
  }
  /** `set -o` / `[[ -o name ]]`: whether a shell option is on. */
  optionIsSet(name) {
    switch (name) {
      case "errexit":
        return this.opts.errexit;
      case "xtrace":
        return this.opts.xtrace;
      case "nounset":
        return this.opts.nounset;
      case "pipefail":
        return this.opts.pipefail;
      case "noglob":
        return this.opts.noglob;
      case "allexport":
        return this.opts_allexport;
      case "interactive":
        return this.opts.interactive;
    }
    return false;
  }
  async exec(node) {
    if (this.ctx.signal.aborted) throw new ExitSignal(130);
    if (this.pendingTraps.length) await this.runPendingTraps();
    if (this.interrupted) {
      this.interrupted = false;
      throw new InterruptSig();
    }
    let st;
    switch (node.t) {
      case "simple":
        st = await this.execSimple(node);
        break;
      case "pipeline":
        st = await this.execPipeline(node);
        break;
      case "andor": {
        this.noErrexit++;
        let s;
        try {
          s = await this.exec(node.first);
        } finally {
          this.noErrexit--;
        }
        for (let i = 0; i < node.rest.length; i++) {
          const { op, node: n } = node.rest[i];
          if (op === "&&" && s === 0 || op === "||" && s !== 0) {
            const last = i === node.rest.length - 1;
            if (!last) this.noErrexit++;
            try {
              s = await this.exec(n);
            } finally {
              if (!last) this.noErrexit--;
            }
          }
        }
        st = s;
        this.status = st;
        return st;
      }
      case "list": {
        st = 0;
        for (const item of node.items) {
          if (item.async) {
            this.spawnAsync(item.node);
            st = 0;
          } else {
            st = await this.exec(item.node);
          }
          this.status = st;
        }
        return st;
      }
      case "subshell": {
        st = await this.withRedirs(node.redirs, async () => {
          const sub = this.clone();
          return _Shell.isolated(sub, () => sub.exec(node.body));
        });
        break;
      }
      case "group":
        st = await this.withRedirs(node.redirs, () => this.exec(node.body));
        break;
      case "if":
        st = await this.withRedirs(node.redirs, async () => {
          for (const c of node.clauses) {
            if (await this.cond(c.cond) === 0) return this.exec(c.body);
          }
          if (node.else) return this.exec(node.else);
          return 0;
        });
        break;
      case "while":
        st = await this.withRedirs(node.redirs, async () => {
          let s = 0;
          for (; ; ) {
            const c = await this.cond(node.cond);
            if (node.until ? c === 0 : c !== 0) break;
            try {
              s = await this.exec(node.body);
            } catch (e) {
              if (e instanceof BreakSig) {
                if (e.n > 1) throw new BreakSig(e.n - 1);
                break;
              }
              if (e instanceof ContinueSig) {
                if (e.n > 1) throw new ContinueSig(e.n - 1);
                continue;
              }
              throw e;
            }
          }
          return s;
        });
        break;
      case "for":
        st = await this.withRedirs(node.redirs, async () => {
          const items = node.words ? await this.expandWords(node.words) : [...this.positional];
          let s = 0;
          for (const it of items) {
            this.setVar(node.name, it);
            try {
              s = await this.exec(node.body);
            } catch (e) {
              if (e instanceof BreakSig) {
                if (e.n > 1) throw new BreakSig(e.n - 1);
                break;
              }
              if (e instanceof ContinueSig) {
                if (e.n > 1) throw new ContinueSig(e.n - 1);
                continue;
              }
              throw e;
            }
          }
          return s;
        });
        break;
      case "case":
        st = await this.withRedirs(node.redirs, async () => {
          const w = await this.expandSingle(node.word);
          let s = 0;
          let k = 0;
          while (k < node.items.length) {
            let hit = false;
            for (const p of node.items[k].patterns) {
              if (matchPattern(await this.expandPattern(p), w)) {
                hit = true;
                break;
              }
            }
            if (!hit) {
              k++;
              continue;
            }
            for (; ; ) {
              const item = node.items[k];
              s = item.body ? await this.exec(item.body) : 0;
              if (item.term !== ";&" || k === node.items.length - 1) break;
              k++;
            }
            if (node.items[k].term !== ";;&") return s;
            k++;
          }
          return s;
        });
        break;
      case "func":
        this.funcs.set(node.name, node.body);
        st = 0;
        break;
      case "dbracket":
        st = await this.withRedirs(node.redirs, () => this.execDbracket(node.words));
        break;
    }
    this.status = st;
    if (st !== 0 && this.noErrexit === 0 && (node.t === "simple" || node.t === "pipeline" || node.t === "subshell") && this.depth === 0 && this.traps.get("ERR") && !this.inTrap) {
      this.inTrap = true;
      try {
        await this.runSource(this.traps.get("ERR"), "trap");
      } finally {
        this.inTrap = false;
      }
      this.status = st;
    }
    if (this.pendingTraps.length) {
      await this.runPendingTraps();
      this.status = st;
    }
    if (st !== 0 && this.opts.errexit && this.noErrexit === 0 && node.t !== "func") {
      throw new ExitSignal(st);
    }
    return st;
  }
  async cond(n) {
    this.noErrexit++;
    try {
      return await this.exec(n);
    } finally {
      this.noErrexit--;
    }
  }
  /**
   * `cmd &`: the job runs in a new process (a copy of this shell, as fork does), so $! is a real
   * pid that kill and wait can use. A simple command is exec'd in that process, so $! is the
   * command's own pid. With job control (interactive) the job gets its own process group.
   */
  spawnAsync(node) {
    const sub = this.clone();
    sub.releaseFds();
    const maxFd = Math.max(2, ...this.fds.keys());
    const stdio = [];
    for (let i = 0; i <= maxFd; i++) stdio.push(this.fds.get(i) ?? null);
    let proc;
    try {
      proc = this.kernel.spawn({
        argv: [...this.ctx.proc.argv],
        env: this.envForChild(),
        cwd: this.cwd,
        stdio,
        ppid: this.ctx.proc.pid,
        pgid: this.opts.interactive ? 0 : void 0,
        searchPath: false
      });
    } catch (e) {
      this.err(`sh: fork: ${e.message}
`);
      this.status = 1;
      return;
    }
    pendingJobs.set(proc, async (ctx) => {
      sub.adoptProcess(ctx);
      if (node.t === "simple") sub.execLast = true;
      return _Shell.isolated(sub, () => sub.exec(node));
    });
    this.lastBg = proc.pid;
    this.bgJobs.set(proc.pid, proc.exited.then(exitCodeOf));
    if (this.opts.interactive) this.err(`[${this.bgJobs.size}] ${proc.pid}
`);
  }
  // ---------------------------------------------------------------------------
  // pipelines
  async execPipeline(node) {
    const n = node.cmds.length;
    if (n === 1) {
      const s2 = node.bang ? await this.cond(node.cmds[0]) : await this.exec(node.cmds[0]);
      return node.bang ? s2 === 0 ? 1 : 0 : s2;
    }
    const pipes = Array.from({ length: n - 1 }, () => createPipe());
    const tty2 = this.opts.interactive ? this.ctx.proc.tty : void 0;
    let pgid;
    let sigint = false;
    const runs = [];
    for (let i = 0; i < n; i++) {
      const sub = this.clone();
      if (i > 0) {
        sub.fds.get(0)?.unref();
        sub.fds.set(0, pipes[i - 1].r);
      }
      if (i < n - 1) {
        sub.fds.get(1)?.unref();
        sub.fds.set(1, pipes[i].w);
      }
      if (tty2) {
        sub.pipelinePgid = () => pgid;
        sub.onSpawn = (p) => {
          if (pgid !== void 0) return;
          pgid = p.pgid;
          tty2.foregroundPgid = pgid;
        };
        sub.onSigint = () => sigint = true;
      }
      runs.push(_Shell.isolated(sub, () => sub.exec(node.cmds[i])));
    }
    let codes;
    try {
      codes = await Promise.all(runs);
    } finally {
      if (tty2 && pgid !== void 0) {
        tty2.foregroundPgid = this.ctx.proc.pgid;
        tty2.raw = false;
        tty2.echo = true;
      }
    }
    let s = codes[n - 1];
    if (this.opts.pipefail) {
      for (let i = n - 1; i >= 0; i--) if (codes[i] !== 0) {
        s = codes[i];
        break;
      }
    }
    if (node.bang) s = s === 0 ? 1 : 0;
    if (sigint) throw new InterruptSig();
    return s;
  }
  /** Set in the commands of a pipeline run with job control: the pipeline's process group. */
  pipelinePgid;
  onSpawn;
  /** A command of the pipeline died of ^C. */
  onSigint;
  // ---------------------------------------------------------------------------
  // simple commands
  async execSimple(node) {
    let execTail = this.execLast;
    this.execLast = false;
    this.lastSubstStatus = void 0;
    const words = await this.expandWords(node.words);
    const assigns = [];
    for (const a of node.assigns) {
      let v = await this.expandSingle(a.value, true);
      if (a.append) v = (this.getVar(a.name) ?? "") + v;
      assigns.push([a.name, v]);
    }
    if (this.opts.xtrace) {
      const ps4 = this.vars.get("PS4") ?? "+ ";
      this.err(ps4 + [...assigns.map(([k, v]) => `${k}=${v}`), ...words].map(quoteForTrace).join(" ") + "\n");
    }
    if (words.length === 0) {
      for (const [k, v] of assigns) this.setVar(k, v);
      if (node.redirs.length) return this.withRedirs(node.redirs, async () => 0);
      return this.lastSubstStatus ?? 0;
    }
    let cmd = words[0];
    let args = words.slice(1);
    if (cmd === "exec" && args.length && this.ownsProc && args[0] !== "--" && !this.funcs.has(args[0]) && !BUILTINS[args[0]]) {
      cmd = args[0];
      args = args.slice(1);
      execTail = true;
    }
    if (cmd === "exec" && args.length === 0) {
      const saved = this.fds;
      try {
        this.fds = await this.applyRedirs(node.redirs, saved, true);
      } catch (e) {
        this.err(`sh: ${e.message}
`);
        return 1;
      }
      for (const f of saved.values()) f.unref();
      return 0;
    }
    const fn = this.funcs.get(cmd);
    if (fn) {
      return this.withRedirs(node.redirs, async () => {
        const savedPos = this.positional;
        const savedArg0 = this.arg0;
        const savedVals = assigns.map(([k]) => [k, this.vars.get(k)]);
        for (const [k, v] of assigns) this.setVar(k, v);
        this.positional = args;
        this.locals.push(/* @__PURE__ */ new Map());
        this.depth++;
        if (this.depth > 200) {
          this.depth--;
          throw new ShellError("maximum function nesting level exceeded");
        }
        try {
          return await this.exec(fn);
        } catch (e) {
          if (e instanceof ReturnSig) return e.code;
          throw e;
        } finally {
          this.depth--;
          const scope = this.locals.pop();
          for (const [k, v] of scope) {
            if (v === void 0) this.vars.delete(k);
            else this.vars.set(k, v);
          }
          this.positional = savedPos;
          this.arg0 = savedArg0;
          for (const [k, v] of savedVals) {
            if (v === void 0) this.vars.delete(k);
            else this.vars.set(k, v);
          }
        }
      });
    }
    const bi = BUILTINS[cmd];
    if (bi) {
      const special = SPECIAL_BUILTINS.has(cmd);
      const savedVals = [];
      for (const [k, v] of assigns) {
        if (!special) savedVals.push([k, this.vars.get(k)]);
        this.setVar(k, v);
      }
      try {
        return await this.withRedirs(node.redirs, async () => {
          try {
            return await bi(this, args);
          } catch (e) {
            if (e instanceof ShellError) {
              this.err(`sh: ${cmd}: ${e.message}
`);
              return e.code;
            }
            throw e;
          }
        });
      } finally {
        for (const [k, v] of savedVals) {
          if (v === void 0) this.vars.delete(k);
          else this.vars.set(k, v);
        }
      }
    }
    let fds;
    try {
      fds = await this.applyRedirs(node.redirs, this.fds, false);
    } catch (e) {
      this.err(`sh: ${e.message}
`);
      return 1;
    }
    try {
      const env2 = this.envForChild(Object.fromEntries(assigns));
      if (execTail) return await this.execImage(cmd, args, env2, fds);
      const maxFd = Math.max(2, ...fds.keys());
      const stdio = [];
      for (let i = 0; i <= maxFd; i++) stdio.push(fds.get(i) ?? null);
      let proc;
      try {
        const pg = this.pipelinePgid?.();
        proc = this.kernel.spawn({
          argv: [cmd, ...args],
          env: env2,
          cwd: this.cwd,
          stdio,
          ppid: this.ctx.proc.pid,
          pgid: pg !== void 0 ? pg : this.pipelinePgid || this.opts.interactive ? 0 : void 0
        });
      } catch (e) {
        return this.spawnError(cmd, e);
      }
      proc.umask = this.umask;
      this.onSpawn?.(proc);
      const tty2 = this.ctx.proc.tty;
      const fg = this.opts.interactive && tty2;
      if (fg) tty2.foregroundPgid = proc.pgid;
      const st = await proc.exited;
      if (fg) {
        tty2.foregroundPgid = this.ctx.proc.pgid;
        tty2.raw = false;
        tty2.echo = true;
      }
      if (st.signal && (this.opts.interactive || this.onSigint) && st.signal !== "SIGINT" && st.signal !== "SIGPIPE") this.err(`${st.signal}
`);
      if (st.signal === "SIGINT") {
        if (this.opts.interactive) throw new InterruptSig();
        this.onSigint?.();
      }
      return exitCodeOf(st);
    } finally {
      if (fds !== this.fds) for (const f of fds.values()) f.unref();
    }
  }
  lastSubstStatus;
  spawnError(cmd, e) {
    if (e.code === "ENOENT") {
      this.err(`sh: ${cmd}: command not found
`);
      return 127;
    }
    if (e.code === "EACCES") {
      this.err(`sh: ${cmd}: Permission denied
`);
      return 126;
    }
    this.err(`sh: ${cmd}: ${e.message}
`);
    return 126;
  }
  /**
   * exec: replaces the program of this shell's process with the command (same pid and fds), then
   * waits for it; the process ends with the command's status.
   */
  async execImage(cmd, args, env2, fds) {
    const proc = this.ctx.proc;
    const old = proc.fds;
    proc.fds = /* @__PURE__ */ new Map();
    for (const [k, f] of fds) proc.fds.set(k, f.ref());
    const oldCwd = proc.cwd;
    proc.cwd = this.cwd;
    proc.umask = this.umask;
    const onSignal = proc.onSignal;
    proc.onSignal = void 0;
    try {
      this.kernel.execImage(proc, [cmd, ...args], env2);
    } catch (e) {
      for (const f of proc.fds.values()) f.unref();
      proc.fds = old;
      proc.cwd = oldCwd;
      proc.onSignal = onSignal;
      const code = this.spawnError(cmd, e);
      if (this.opts.interactive) return code;
      throw new ExitSignal(code);
    }
    for (const f of old.values()) f.unref();
    this.releaseFds();
    this.traps.clear();
    throw new ExitSignal(exitCodeOf(await proc.exited));
  }
  /** Runs `fn` with redirections applied to this shell's fds, then restores. */
  async withRedirs(redirs, fn) {
    if (!redirs.length) return fn();
    const saved = this.fds;
    try {
      this.fds = await this.applyRedirs(redirs, saved, false);
    } catch (e) {
      this.err(`sh: ${e.message}
`);
      return 1;
    }
    try {
      return await fn();
    } finally {
      for (const f of this.fds.values()) f.unref();
      this.fds = saved;
    }
  }
  /** Returns a new fd map (refs taken) with redirections applied. */
  async applyRedirs(redirs, base, permanent) {
    if (!redirs.length) return base;
    const fds = /* @__PURE__ */ new Map();
    for (const [k, f] of base) fds.set(k, f.ref());
    const set = (fd, f) => {
      fds.get(fd)?.unref();
      if (f) fds.set(fd, f);
      else fds.delete(fd);
    };
    try {
      for (const r of redirs) {
        if (r.heredoc) {
          const body = r.heredoc.quoted ? r.heredoc.raw ?? "" : await this.expandSingle(r.heredoc.body);
          const { r: rd, w } = createPipe();
          if (body) w.write(enc3.encode(body));
          w.unref();
          set(r.fd ?? 0, rd);
          continue;
        }
        const target = await this.expandSingle(r.target);
        const fd = r.fd ?? (r.op.startsWith("<") ? 0 : 1);
        switch (r.op) {
          case ">":
          case ">|":
            set(fd, this.open(target, O_WRONLY | O_CREAT | O_TRUNC));
            break;
          case ">>":
            set(fd, this.open(target, O_WRONLY | O_CREAT | O_APPEND));
            break;
          case "<":
            set(fd, this.open(target, O_RDONLY));
            break;
          case "<>":
            set(fd, this.open(target, O_RDWR | O_CREAT));
            break;
          case "&>":
            {
              const f = this.open(target, O_WRONLY | O_CREAT | O_TRUNC);
              set(1, f);
              set(2, f.ref());
            }
            break;
          case "&>>":
            {
              const f = this.open(target, O_WRONLY | O_CREAT | O_APPEND);
              set(1, f);
              set(2, f.ref());
            }
            break;
          case ">&":
          case "<&": {
            if (target === "-") {
              set(fd, null);
            } else if (/^[0-9]+$/.test(target)) {
              const src = fds.get(Number(target));
              if (!src) throw new ShellError(`${target}: Bad file descriptor`);
              set(fd, src.ref());
            } else if (r.op === ">&") {
              const f = this.open(target, O_WRONLY | O_CREAT | O_TRUNC);
              set(1, f);
              set(2, f.ref());
            } else throw new ShellError(`${target}: ambiguous redirect`);
            break;
          }
          case "<<<": {
            const { r: rd, w } = createPipe();
            w.write(enc3.encode(target + "\n"));
            w.unref();
            set(fd, rd);
            break;
          }
        }
      }
    } catch (e) {
      for (const f of fds.values()) f.unref();
      throw e;
    }
    void permanent;
    return fds;
  }
  open(target, flags) {
    try {
      return this.kernel.openFile({ cwd: this.cwd, fds: this.fds, tty: this.ctx.proc.tty, umask: this.umask }, target, flags, 438);
    } catch (e) {
      const msg = e.code === "ENOENT" ? "No such file or directory" : e.code === "EISDIR" ? "Is a directory" : e.code === "EACCES" ? "Permission denied" : e.message;
      throw new ShellError(`${target}: ${msg}`);
    }
  }
  // ---------------------------------------------------------------------------
  // [[ ... ]]
  async execDbracket(words) {
    const toks = words.map((w) => ({ w, op: w.length === 1 && w[0].t === "lit" ? w[0].v : null }));
    const isOp = (k, ...ops) => toks[k]?.op !== null && toks[k]?.op !== void 0 && ops.includes(toks[k].op);
    let i = 0;
    const fail2 = (msg) => {
      throw new DbracketError(msg);
    };
    const orExpr = async () => {
      let v = await andExpr();
      while (isOp(i, "||")) {
        i++;
        if (v) {
          await andExpr(true);
          continue;
        }
        v = await andExpr();
      }
      return v;
    };
    let skipping = 0;
    const andExpr = async (skip = false) => {
      if (skip) skipping++;
      try {
        let v = await notExpr();
        while (isOp(i, "&&")) {
          i++;
          if (!v) {
            skipping++;
            try {
              await notExpr();
            } finally {
              skipping--;
            }
            continue;
          }
          v = await notExpr();
        }
        return v;
      } finally {
        if (skip) skipping--;
      }
    };
    const notExpr = async () => {
      if (isOp(i, "!")) {
        i++;
        return !await notExpr();
      }
      if (isOp(i, "(")) {
        i++;
        const v = await orExpr();
        if (!isOp(i, ")")) fail2("expected `)'");
        i++;
        return v;
      }
      return primary();
    };
    const str2 = async (k) => skipping ? "" : this.expandSingle(toks[k].w);
    const arith = async (k) => {
      if (skipping) return 0n;
      const e = await str2(k);
      try {
        return evalArith(e, (n) => this.getVar(n), (n, val) => this.setVar(n, val));
      } catch (err) {
        throw new ShellError(`${e}: ${err.message}`);
      }
    };
    const primary = async () => {
      if (i >= toks.length) fail2("unexpected end of expression");
      const bop = toks[i + 1]?.op;
      if (i + 2 < toks.length && bop && (BINARY_OPS.has(bop) || bop === "=~")) {
        const a = i;
        const c = i + 2;
        i += 3;
        if (skipping) return false;
        switch (bop) {
          case "==":
          case "=":
            return matchPattern(await this.expandPattern(toks[c].w), await str2(a));
          case "!=":
            return !matchPattern(await this.expandPattern(toks[c].w), await str2(a));
          case "=~":
            return this.regexMatch(await str2(a), toks[c].w);
          case "<":
            return await str2(a) < await str2(c);
          case ">":
            return await str2(a) > await str2(c);
          case "-eq":
            return await arith(a) === await arith(c);
          case "-ne":
            return await arith(a) !== await arith(c);
          case "-lt":
            return await arith(a) < await arith(c);
          case "-le":
            return await arith(a) <= await arith(c);
          case "-gt":
            return await arith(a) > await arith(c);
          case "-ge":
            return await arith(a) >= await arith(c);
          default:
            return builtinTest(this, [await str2(a), bop, await str2(c)]) === 0;
        }
      }
      const uop = toks[i].op;
      if (uop && UNARY_OPS.has(uop) && i + 1 < toks.length && !isOp(i + 1, "&&", "||", ")")) {
        const a = i + 1;
        i += 2;
        if (skipping) return false;
        return builtinTest(this, [uop, await str2(a)]) === 0;
      }
      if (toks[i].op && /^-./.test(toks[i].op) && i + 1 < toks.length && !isOp(i + 1, "&&", "||", ")")) fail2(`unexpected argument \`${toks[i + 1].op ?? "\u2026"}' to conditional unary operator`);
      const k = i++;
      if (i < toks.length && !isOp(i, "&&", "||", ")")) fail2("conditional binary operator expected");
      return await str2(k) !== "";
    };
    try {
      if (!toks.length) fail2("unexpected end of expression");
      const v = await orExpr();
      if (i < toks.length) fail2(`syntax error near \`${toks[i].op ?? "\u2026"}'`);
      return v ? 0 : 1;
    } catch (e) {
      if (!(e instanceof DbracketError)) throw e;
      this.err(`sh: [[: ${e.message}
`);
      return 2;
    }
  }
  /**
   * [[ s =~ re ]]: `re` is a POSIX extended regular expression; quoted parts of it match
   * literally. Sets BASH_REMATCH (the match and its groups). An invalid regex gives status 2.
   */
  async regexMatch(s, w) {
    const segs = await this.expandSegs(w, false);
    let src = "";
    for (const seg of segs) {
      if ("brk" in seg) src += " ";
      else src += seg.quoted ? seg.s.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&") : seg.s;
    }
    let re;
    try {
      re = new RegExp(eregToRegexSource(src));
    } catch {
      throw new DbracketError(`invalid regular expression \`${src}'`);
    }
    const m = re.exec(s);
    const groups = m ? [...m].map((g) => g ?? "") : [];
    this.arrays.set("BASH_REMATCH", groups);
    this.vars.set("BASH_REMATCH", groups[0] ?? "");
    return !!m;
  }
  // ---------------------------------------------------------------------------
  // expansion
  async expandWords(words) {
    const out = [];
    for (const w of words) {
      for (const f of await this.expandFields(w)) {
        if (f.glob && !this.opts.noglob) {
          const matches2 = this.glob(f.pat);
          if (matches2.length) {
            out.push(...matches2);
            continue;
          }
        }
        out.push(f.value);
      }
    }
    return out;
  }
  /** Expansion without field splitting or globbing (assignments, redirect targets). */
  async expandSingle(w, assignment = false) {
    const segs = await this.expandSegs(w, false, assignment);
    let s = "";
    for (const seg of segs) if (!("brk" in seg)) s += seg.s;
    else s += " ";
    return s;
  }
  /** Expansion into a pattern string (quoted chars escaped). */
  async expandPattern(w) {
    const segs = await this.expandSegs(w, false);
    let s = "";
    for (const seg of segs) {
      if ("brk" in seg) s += " ";
      else s += seg.quoted ? escapePattern(seg.s) : seg.s;
    }
    return s;
  }
  async expandFields(w) {
    const segs = await this.expandSegs(w, false);
    const ifs = this.vars.get("IFS") ?? " 	\n";
    const fields = [];
    let cur = null;
    const ensure = () => cur ??= { value: "", pat: "", glob: false };
    const push = () => {
      if (cur) fields.push(cur);
      cur = null;
    };
    let sawQuoted = false;
    for (const seg of segs) {
      if ("brk" in seg) {
        push();
        sawQuoted = false;
        continue;
      }
      if (seg.quoted) {
        const f = ensure();
        f.value += seg.s;
        f.pat += escapePattern(seg.s);
        sawQuoted = true;
        continue;
      }
      if (!seg.split || ifs === "") {
        const f = ensure();
        f.value += seg.s;
        f.pat += seg.s;
        if (hasGlobChars(seg.s)) f.glob = true;
        continue;
      }
      let i = 0;
      const s = seg.s;
      while (i < s.length) {
        const c = s[i];
        if (ifs.includes(c)) {
          const ws = " 	\n".includes(c);
          if (cur) push();
          else if (!ws) fields.push({ value: "", pat: "", glob: false });
          i++;
          continue;
        }
        let j = i;
        while (j < s.length && !ifs.includes(s[j])) j++;
        const part = s.slice(i, j);
        const f = ensure();
        f.value += part;
        f.pat += part;
        if (hasGlobChars(part)) f.glob = true;
        i = j;
      }
    }
    if (cur) push();
    else if (sawQuoted && fields.length === 0) fields.push({ value: "", pat: "", glob: false });
    if (fields.length === 0 && segs.some((s) => !("brk" in s) && s.quoted)) fields.push({ value: "", pat: "", glob: false });
    return fields;
  }
  async expandSegs(w, inDq, assignment = false) {
    const segs = [];
    for (const p of w) await this.expandPart(p, inDq, segs, assignment);
    return segs;
  }
  async expandPart(p, inDq, segs, assignment = false) {
    switch (p.t) {
      case "lit":
        segs.push({ s: p.v, quoted: inDq, split: false });
        return;
      case "sq":
        segs.push({ s: p.v, quoted: true, split: false });
        return;
      case "dq": {
        const only = p.parts.length === 1 ? p.parts[0] : null;
        if (only?.t === "param" && only.name === "@" && !only.op && !only.length && this.positional.length === 0) return;
        const before = segs.length;
        for (const q of p.parts) await this.expandPart(q, true, segs);
        if (segs.length === before) segs.push({ s: "", quoted: true, split: false });
        return;
      }
      case "tilde": {
        const home = p.user ? p.user === "root" ? "/root" : `/home/${p.user}` : this.vars.get("HOME") ?? "/home/user";
        segs.push({ s: home, quoted: true, split: false });
        return;
      }
      case "cmd": {
        const s = await this.commandSubst(p.src);
        segs.push({ s, quoted: inDq, split: !inDq && !assignment });
        return;
      }
      case "arith": {
        const expr = await this.expandSingle(p.expr);
        let v;
        try {
          v = evalArith(expr, (n) => this.getVar(n), (n, val) => this.setVar(n, val));
        } catch (e) {
          throw new ShellError(`${expr}: ${e.message}`);
        }
        segs.push({ s: String(v), quoted: inDq, split: !inDq && !assignment });
        return;
      }
      case "param":
        await this.expandParam(p, inDq, segs, assignment);
        return;
    }
  }
  async expandParam(p, inDq, segs, assignment) {
    const name = p.name;
    if ((name === "@" || name === "*") && !p.op && !p.length) {
      if (inDq && name === "@") {
        this.positional.forEach((v, i) => {
          if (i > 0) segs.push({ brk: true });
          segs.push({ s: v, quoted: true, split: false });
        });
        return;
      }
      if (inDq) {
        segs.push({ s: this.getVar("*") ?? "", quoted: true, split: false });
        return;
      }
      this.positional.forEach((v, i) => {
        if (i > 0) segs.push({ brk: true });
        segs.push({ s: v, quoted: false, split: true });
      });
      return;
    }
    let val = this.getVar(name);
    if (p.index !== void 0) {
      const arr = this.arrays.get(name);
      const all = p.index === "@" || p.index === "*";
      if (p.length && all) {
        segs.push({ s: String(arr ? arr.length : val === void 0 ? 0 : 1), quoted: inDq, split: false });
        return;
      }
      if (arr) val = all ? arr.join(" ") : arr[Number(evalArith(p.index, (n) => this.getVar(n), (n, v) => this.setVar(n, v)))];
      else if (!all && Number(evalArith(p.index, (n) => this.getVar(n), (n, v) => this.setVar(n, v))) !== 0) val = void 0;
    }
    if (p.length) {
      segs.push({ s: String(name === "@" || name === "*" ? this.positional.length : [...val ?? ""].length), quoted: inDq, split: false });
      return;
    }
    const op = p.op;
    const unsetOrNull = val === void 0 || op?.startsWith(":") && val === "";
    switch (op) {
      case ":-":
      case "-":
        if (op === ":-" ? unsetOrNull : val === void 0) {
          const segs2 = await this.expandSegs(p.arg ?? [], inDq);
          for (const s of segs2) if (!("brk" in s) && !inDq && !s.quoted) s.split = !assignment;
          segs.push(...segs2);
          return;
        }
        break;
      case ":=":
      case "=":
        if (op === ":=" ? unsetOrNull : val === void 0) {
          val = await this.expandSingle(p.arg ?? []);
          this.setVar(name, val);
        }
        break;
      case ":?":
      case "?":
        if (op === ":?" ? unsetOrNull : val === void 0) {
          const msg = p.arg?.length ? await this.expandSingle(p.arg) : "parameter null or not set";
          this.expansionError(`${name}: ${msg}`);
        }
        break;
      case ":+":
      case "+":
        if (op === ":+" ? !unsetOrNull : val !== void 0) {
          const segs2 = await this.expandSegs(p.arg ?? [], inDq);
          for (const s of segs2) if (!("brk" in s) && !inDq && !s.quoted) s.split = !assignment;
          segs.push(...segs2);
        }
        return;
      case "#":
      case "##":
      case "%":
      case "%%": {
        const pat = await this.expandPattern(p.arg ?? []);
        val = removeMatch(val ?? "", pat, op);
        break;
      }
      case "/":
      case "//":
      case "/#":
      case "/%": {
        const pat = await this.expandPattern(p.arg ?? []);
        const rep = await this.expandSingle(p.arg2 ?? []);
        val = replaceMatch(val ?? "", pat, rep, op);
        break;
      }
      case "^^":
        val = (val ?? "").toUpperCase();
        break;
      case "^":
        val = (val ?? "").replace(/^./, (c) => c.toUpperCase());
        break;
      case ",,":
        val = (val ?? "").toLowerCase();
        break;
      case ",":
        val = (val ?? "").replace(/^./, (c) => c.toLowerCase());
        break;
      case ":": {
        const s = val ?? "";
        const off = Number(await this.expandSingle(p.arg ?? [])) || 0;
        const start = off < 0 ? Math.max(0, s.length + off) : off;
        if (p.arg2) {
          const len = Number(await this.expandSingle(p.arg2)) || 0;
          val = len < 0 ? s.slice(start, s.length + len) : s.slice(start, start + len);
        } else val = s.slice(start);
        break;
      }
    }
    if (val === void 0) {
      if (this.opts.nounset && !/^[@*#?$!0-]$/.test(name)) this.expansionError(`${name}: unbound variable`);
      val = "";
    }
    segs.push({ s: val, quoted: inDq, split: !inDq && !assignment });
  }
  /**
   * ${p:?msg} or an unset variable under set -u: a non-interactive shell exits (status 1); an
   * interactive one abandons the command line and keeps running.
   */
  expansionError(msg) {
    if (this.opts.interactive) throw new ShellError(msg);
    this.err(`sh: ${msg}
`);
    throw new ExitSignal(1);
  }
  async commandSubst(src) {
    const { r, w } = createPipe();
    const sub = this.clone();
    sub.fds.get(1)?.unref();
    sub.fds.set(1, w);
    const reader = (async () => {
      const chunks2 = [];
      for (; ; ) {
        const d = await r.read(65536);
        if (d.length === 0) break;
        chunks2.push(d);
      }
      return chunks2;
    })();
    const code = await _Shell.isolated(sub, () => sub.runSource(src, "sh"));
    const chunks = await reader;
    r.unref();
    this.lastSubstStatus = code;
    this.status = code;
    let total = 0;
    for (const c of chunks) total += c.length;
    const buf = new Uint8Array(total);
    let off = 0;
    for (const c of chunks) {
      buf.set(c, off);
      off += c.length;
    }
    return dec2.decode(buf).replace(/\n+$/, "");
  }
  /** Pathname expansion. `pat` uses backslash escapes for quoted chars. */
  glob(pat) {
    const abs = pat.startsWith("/");
    const parts = pat.split("/").filter((x, i) => x !== "" || i === 0);
    let bases = [abs ? "/" : ""];
    const vfs = this.kernel.vfs;
    for (let i = abs ? 1 : 0; i < parts.length; i++) {
      const part = parts[i];
      if (part === "") continue;
      const next = [];
      if (!hasGlobChars(part)) {
        const lit = unescapePattern(part);
        for (const b of bases) {
          const p = b === "" ? lit : b.endsWith("/") ? b + lit : `${b}/${lit}`;
          if (vfs.tryLookup(this.resolve(p), false)) next.push(p);
        }
      } else if (part === "**") {
        for (const b of bases) {
          const walk = (dir, rel) => {
            next.push(rel);
            let names;
            try {
              names = vfs.readdir(this.resolve(dir || "."));
            } catch {
              return;
            }
            for (const n of names.sort()) {
              if (n.startsWith(".")) continue;
              const full = dir === "" ? n : dir.endsWith("/") ? dir + n : `${dir}/${n}`;
              const node = vfs.tryLookup(this.resolve(full));
              if (node && isDir(node)) walk(full, full);
            }
          };
          walk(b, b);
        }
      } else {
        const re = new RegExp(`^${patternToRegexSource(part, { pathname: true })}$`);
        for (const b of bases) {
          let names;
          try {
            names = vfs.readdir(this.resolve(b || "."));
          } catch {
            continue;
          }
          for (const n of names.sort()) {
            if (n.startsWith(".") && !part.startsWith(".") && !part.startsWith("\\.")) continue;
            if (!re.test(n)) continue;
            const p = b === "" ? n : b.endsWith("/") ? b + n : `${b}/${n}`;
            if (i < parts.length - 1) {
              const node = vfs.tryLookup(this.resolve(p));
              if (!node || !isDir(node)) continue;
            }
            next.push(p);
          }
        }
      }
      bases = next;
      if (!bases.length) break;
    }
    if (pat.endsWith("/")) {
      bases = bases.filter((b) => {
        const node = vfs.tryLookup(this.resolve(b));
        return !!node && isDir(node);
      }).map((b) => b.endsWith("/") ? b : b + "/");
    }
    return bases.filter((b) => b !== "" && b !== "/").sort();
  }
  // ---------------------------------------------------------------------------
  // interactive mode
  prompt() {
    const ps1 = this.vars.get("PS1");
    if (ps1 !== void 0) return ps1.replace(/\\w/g, this.prettyCwd()).replace(/\\u/g, "user").replace(/\\h/g, this.kernel.hostname).replace(/\\\$/g, "$");
    return `\x1B[1;32muser@${this.kernel.hostname}\x1B[0m:\x1B[1;34m${this.prettyCwd()}\x1B[0m$ `;
  }
  prettyCwd() {
    const home = this.vars.get("HOME") ?? "/home/user";
    if (this.cwd === home) return "~";
    if (this.cwd.startsWith(home + "/")) return "~" + this.cwd.slice(home.length);
    return this.cwd;
  }
  async interactive() {
    this.opts.interactive = true;
    const proc = this.ctx.proc;
    this.installSignalHandler();
    const tty2 = proc.fds.get(0)?.opts.tty;
    if (tty2) tty2.foregroundPgid = proc.pgid;
    let buffer = "";
    for (; ; ) {
      const line = await this.readLine(buffer ? "> " : this.prompt());
      if (line === null) {
        if (buffer) {
          buffer = "";
          continue;
        }
        this.out("exit\n");
        return this.status;
      }
      const src = buffer ? buffer + "\n" + line : line;
      try {
        parse2(src);
      } catch (e) {
        if (e instanceof ShellSyntaxError && e.incomplete) {
          buffer = src;
          continue;
        }
      }
      buffer = "";
      if (!src.trim()) continue;
      if (this.history[this.history.length - 1] !== src) this.history.push(src);
      this.interrupted = false;
      try {
        this.status = await this.runSource(src);
      } catch (e) {
        if (e instanceof ExitSignal) return e.code;
        if (e instanceof BreakSig || e instanceof ContinueSig || e instanceof ReturnSig) continue;
        if (e instanceof InterruptSig) {
          this.status = 130;
          continue;
        }
        if (e instanceof ShellError) {
          this.err(`sh: ${e.message}
`);
          this.status = e.code;
          continue;
        }
        this.err(`sh: ${e?.message ?? e}
`);
        this.status = 1;
      }
    }
  }
  interrupted = false;
  /** Line editor (raw mode on a tty; plain read otherwise). */
  async readLine(prompt) {
    const f = this.fds.get(0);
    const tty2 = f?.opts.tty;
    if (!tty2) {
      this.err(prompt);
      return this.readPlainLine();
    }
    tty2.raw = true;
    tty2.echo = false;
    this.err(prompt);
    let buf = [];
    let cursor = 0;
    let hist = this.history.length;
    let saved = "";
    const redraw = () => {
      const s = buf.join("");
      this.err(`\r\x1B[K${prompt}${s}`);
      const back = buf.length - cursor;
      if (back > 0) this.err(`\x1B[${back}D`);
    };
    let pending = "";
    try {
      for (; ; ) {
        const d = await f.read(4096);
        if (d.length === 0) return null;
        let s = pending + dec2.decode(d, { stream: true });
        pending = "";
        for (let i = 0; i < s.length; i++) {
          const c = s[i];
          const code = c.charCodeAt(0);
          if (c === "\x1B") {
            const rest = s.slice(i);
            const m = /^\x1b(\[[0-9;]*[A-Za-z~]|O[A-Za-z]|[bf])/.exec(rest);
            if (!m) {
              if (rest.length < 4) {
                pending = rest;
                break;
              }
              continue;
            }
            i += m[0].length - 1;
            const seq2 = m[1];
            if (seq2 === "[A" || seq2 === "OA") {
              if (hist > 0) {
                if (hist === this.history.length) saved = buf.join("");
                hist--;
                buf = [...this.history[hist]];
                cursor = buf.length;
                redraw();
              }
            } else if (seq2 === "[B" || seq2 === "OB") {
              if (hist < this.history.length) {
                hist++;
                buf = [...hist === this.history.length ? saved : this.history[hist]];
                cursor = buf.length;
                redraw();
              }
            } else if (seq2 === "[C" || seq2 === "OC") {
              if (cursor < buf.length) {
                cursor++;
                this.err("\x1B[C");
              }
            } else if (seq2 === "[D" || seq2 === "OD") {
              if (cursor > 0) {
                cursor--;
                this.err("\x1B[D");
              }
            } else if (seq2 === "[H" || seq2 === "OH" || seq2 === "[1~") {
              cursor = 0;
              redraw();
            } else if (seq2 === "[F" || seq2 === "OF" || seq2 === "[4~") {
              cursor = buf.length;
              redraw();
            } else if (seq2 === "[3~") {
              if (cursor < buf.length) {
                buf.splice(cursor, 1);
                redraw();
              }
            } else if (seq2 === "b" || seq2 === "[1;5D") {
              while (cursor > 0 && buf[cursor - 1] === " ") cursor--;
              while (cursor > 0 && buf[cursor - 1] !== " ") cursor--;
              redraw();
            } else if (seq2 === "f" || seq2 === "[1;5C") {
              while (cursor < buf.length && buf[cursor] === " ") cursor++;
              while (cursor < buf.length && buf[cursor] !== " ") cursor++;
              redraw();
            }
            continue;
          }
          if (c === "\r" || c === "\n") {
            this.err("\r\n");
            return buf.join("");
          }
          if (code === 3) {
            this.err("^C\r\n");
            this.status = 130;
            buf = [];
            cursor = 0;
            hist = this.history.length;
            this.err(prompt);
            continue;
          }
          if (code === 4) {
            if (buf.length === 0) {
              this.err("\r\n");
              return null;
            }
            if (cursor < buf.length) {
              buf.splice(cursor, 1);
              redraw();
            }
            continue;
          }
          if (code === 127 || code === 8) {
            if (cursor > 0) {
              buf.splice(cursor - 1, 1);
              cursor--;
              redraw();
            }
            continue;
          }
          if (code === 1) {
            cursor = 0;
            redraw();
            continue;
          }
          if (code === 5) {
            cursor = buf.length;
            redraw();
            continue;
          }
          if (code === 11) {
            buf.length = cursor;
            redraw();
            continue;
          }
          if (code === 21) {
            buf.splice(0, cursor);
            cursor = 0;
            redraw();
            continue;
          }
          if (code === 23) {
            let j = cursor;
            while (j > 0 && buf[j - 1] === " ") j--;
            while (j > 0 && buf[j - 1] !== " ") j--;
            buf.splice(j, cursor - j);
            cursor = j;
            redraw();
            continue;
          }
          if (code === 12) {
            this.err("\x1B[H\x1B[2J");
            redraw();
            continue;
          }
          if (code === 9) {
            const res = this.complete(buf.slice(0, cursor).join(""));
            if (res.insert) {
              buf.splice(cursor, 0, ...res.insert);
              cursor += [...res.insert].length;
              redraw();
            } else if (res.options.length > 1) {
              this.err("\r\n" + res.options.join("  ") + "\r\n");
              redraw();
            }
            continue;
          }
          if (code < 32) continue;
          buf.splice(cursor, 0, c);
          cursor++;
          if (cursor === buf.length) this.err(c);
          else redraw();
        }
      }
    } finally {
      tty2.raw = false;
      tty2.echo = true;
    }
  }
  lineBuf = "";
  async readPlainLine() {
    for (; ; ) {
      const nl2 = this.lineBuf.indexOf("\n");
      if (nl2 !== -1) {
        const line = this.lineBuf.slice(0, nl2);
        this.lineBuf = this.lineBuf.slice(nl2 + 1);
        return line;
      }
      const d = await this.readFd(0);
      if (!d) {
        if (this.lineBuf) {
          const l = this.lineBuf;
          this.lineBuf = "";
          return l;
        }
        return null;
      }
      this.lineBuf += dec2.decode(d);
    }
  }
  /** Tab completion: commands for the first word, paths otherwise. */
  complete(before) {
    const m = /(\S*)$/.exec(before);
    const word = m[1];
    const isFirst = before.slice(0, before.length - word.length).trim() === "";
    let candidates = [];
    const vfs = this.kernel.vfs;
    if (isFirst && !word.includes("/")) {
      const set = /* @__PURE__ */ new Set([...Object.keys(BUILTINS), ...this.funcs.keys()]);
      for (const dir of (this.vars.get("PATH") ?? "").split(":")) {
        try {
          for (const n of vfs.readdir(dir)) set.add(n);
        } catch {
        }
      }
      candidates = [...set].filter((n) => n.startsWith(word)).sort();
    } else {
      const slash = word.lastIndexOf("/");
      const dirPart = slash >= 0 ? word.slice(0, slash + 1) : "";
      const base = word.slice(slash + 1);
      const dirAbs = this.resolve((dirPart || ".").replace(/^~(?=\/|$)/, this.vars.get("HOME") ?? "/home/user"));
      try {
        for (const n of vfs.readdir(dirAbs)) {
          if (!n.startsWith(base)) continue;
          if (n.startsWith(".") && !base.startsWith(".")) continue;
          const node = vfs.tryLookup(`${dirAbs}/${n}`);
          candidates.push(dirPart + n + (node && isDir(node) ? "/" : ""));
        }
      } catch {
      }
      candidates.sort();
    }
    if (candidates.length === 0) return { insert: "", options: [] };
    if (candidates.length === 1) {
      const c = candidates[0];
      return { insert: c.slice(word.length) + (c.endsWith("/") ? "" : " "), options: candidates };
    }
    let prefix = candidates[0];
    for (const c of candidates) while (!c.startsWith(prefix)) prefix = prefix.slice(0, -1);
    return { insert: prefix.slice(word.length), options: candidates.map((c) => c.replace(/^.*\/(?=.)/, "")) };
  }
};
var ShellError = class extends Error {
  constructor(msg, code = 1) {
    super(msg);
    this.code = code;
  }
  code;
};
var DbracketError = class extends Error {
};
function escapePattern(s) {
  return s.replace(/[\\*?[\]]/g, (c) => "\\" + c);
}
function quoteForTrace(s) {
  return /^[A-Za-z0-9_./=:@%+-]+$/.test(s) ? s : `'${s.replace(/'/g, "'\\''")}'`;
}
var SPECIAL_BUILTINS = /* @__PURE__ */ new Set([":", ".", "break", "continue", "eval", "exec", "exit", "export", "readonly", "return", "set", "shift", "trap", "unset", "source"]);
var BUILTINS = {
  ":": () => 0,
  true: () => 0,
  false: () => 1,
  cd(sh, args) {
    let target = args[0];
    if (target === "-L" || target === "-P") target = args[1];
    if (target === void 0) target = sh.getVar("HOME") ?? "/";
    else if (target === "-") {
      target = sh.getVar("OLDPWD") ?? sh.cwd;
      sh.out(target + "\n");
    }
    let dir = sh.resolve(target);
    if (!target.startsWith("/") && !target.startsWith(".") && sh.getVar("CDPATH")) {
      for (const base of sh.getVar("CDPATH").split(":")) {
        const cand = resolve(sh.cwd, base || ".", target);
        const n = sh.kernel.vfs.tryLookup(cand);
        if (n && isDir(n)) {
          dir = cand;
          break;
        }
      }
    }
    const node = sh.kernel.vfs.tryLookup(dir);
    if (!node) throw new ShellError(`${target}: No such file or directory`);
    if (!isDir(node)) throw new ShellError(`${target}: Not a directory`);
    sh.setVar("OLDPWD", sh.cwd, true);
    sh.cwd = dir;
    sh.vars.set("PWD", dir);
    if (sh.ownsProc) sh.ctx.proc.cwd = dir;
    return 0;
  },
  pwd(sh) {
    sh.out(sh.cwd + "\n");
    return 0;
  },
  export(sh, args) {
    if (args.length === 0 || args[0] === "-p") {
      for (const k of [...sh.exported].sort()) {
        const v = sh.vars.get(k);
        if (v !== void 0) sh.out(`export ${k}='${v.replace(/'/g, "'\\''")}'
`);
      }
      return 0;
    }
    for (const a of args) {
      if (a === "-n") continue;
      const eq = a.indexOf("=");
      if (eq > 0) sh.setVar(a.slice(0, eq), a.slice(eq + 1), true);
      else if (isName(a)) sh.exported.add(a);
      else throw new ShellError(`\`${a}': not a valid identifier`);
    }
    return 0;
  },
  readonly(sh, args) {
    for (const a of args) {
      if (a === "-p") continue;
      const eq = a.indexOf("=");
      const name = eq > 0 ? a.slice(0, eq) : a;
      if (eq > 0) sh.setVar(name, a.slice(eq + 1));
      sh.readonlyVars.add(name);
    }
    return 0;
  },
  unset(sh, args) {
    let funcs = false;
    for (const a of args) {
      if (a === "-f") {
        funcs = true;
        continue;
      }
      if (a === "-v") continue;
      if (funcs) sh.funcs.delete(a);
      else sh.unsetVar(a);
    }
    return 0;
  },
  set(sh, args) {
    if (args.length === 0) {
      for (const [k, v] of [...sh.vars].sort()) sh.out(`${k}='${v.replace(/'/g, "'\\''")}'
`);
      return 0;
    }
    let i = 0;
    for (; i < args.length; i++) {
      const a = args[i];
      if (a === "--") {
        i++;
        sh.positional = args.slice(i);
        return 0;
      }
      if (/^[-+][a-zA-Z]+$/.test(a)) {
        const on = a[0] === "-";
        for (const c of a.slice(1)) {
          if (c === "e") sh.opts.errexit = on;
          else if (c === "x") sh.opts.xtrace = on;
          else if (c === "u") sh.opts.nounset = on;
          else if (c === "f") sh.opts.noglob = on;
          else if (c === "a") sh.opts_allexport = on;
          else if (c === "o") {
            const name = args[++i];
            if (name === void 0) {
              for (const n of ["allexport", "errexit", "noglob", "nounset", "pipefail", "xtrace"]) sh.out(`${n.padEnd(15)}	${sh.optionIsSet(n) ? "on" : "off"}
`);
              continue;
            }
            if (name === "pipefail") sh.opts.pipefail = on;
            else if (name === "errexit") sh.opts.errexit = on;
            else if (name === "nounset") sh.opts.nounset = on;
            else if (name === "xtrace") sh.opts.xtrace = on;
            else if (name === "noglob") sh.opts.noglob = on;
            else if (name === "allexport") sh.opts_allexport = on;
          }
        }
        continue;
      }
      sh.positional = args.slice(i);
      return 0;
    }
    return 0;
  },
  shift(sh, args) {
    const n = args[0] ? Number(args[0]) : 1;
    if (n > sh.positional.length) return 1;
    sh.positional = sh.positional.slice(n);
    return 0;
  },
  exit(sh, args) {
    throw new ExitSignal(args[0] !== void 0 ? Number(args[0]) & 255 : sh.status);
  },
  return(sh, args) {
    throw new ReturnSig(args[0] !== void 0 ? Number(args[0]) & 255 : sh.status);
  },
  break(_sh, args) {
    throw new BreakSig(args[0] ? Number(args[0]) : 1);
  },
  continue(_sh, args) {
    throw new ContinueSig(args[0] ? Number(args[0]) : 1);
  },
  echo(sh, args) {
    let newline = true;
    let escapes = false;
    let i = 0;
    for (; i < args.length; i++) {
      const a = args[i];
      if (!/^-[neE]+$/.test(a)) break;
      for (const c of a.slice(1)) {
        if (c === "n") newline = false;
        else if (c === "e") escapes = true;
        else if (c === "E") escapes = false;
      }
    }
    let s = args.slice(i).join(" ");
    if (escapes) {
      const cut2 = s.indexOf("\\c");
      if (cut2 !== -1) {
        s = s.slice(0, cut2);
        newline = false;
      }
      s = s.replace(/\\(0[0-7]{0,3}|x[0-9a-fA-F]{1,2}|[abefnrtv\\])/g, (_m, e) => {
        if (e[0] === "0") return String.fromCharCode(parseInt(e.slice(1) || "0", 8));
        if (e[0] === "x") return String.fromCharCode(parseInt(e.slice(1), 16));
        return { a: "\x07", b: "\b", e: "\x1B", f: "\f", n: "\n", r: "\r", t: "	", v: "\v", "\\": "\\" }[e];
      });
    }
    sh.out(s + (newline ? "\n" : ""));
    return 0;
  },
  printf(sh, args) {
    if (args.length === 0) throw new ShellError("usage: printf format [arguments]", 2);
    let varName;
    if (args[0] === "-v") {
      varName = args[1];
      args = args.slice(2);
    }
    const out = formatPrintf(args[0], args.slice(1));
    if (varName) sh.setVar(varName, out);
    else sh.out(out);
    return 0;
  },
  test: (sh, args) => builtinTest(sh, args),
  "[": (sh, args) => {
    if (args[args.length - 1] !== "]") {
      sh.err("sh: [: missing `]'\n");
      return 2;
    }
    return builtinTest(sh, args.slice(0, -1));
  },
  "((": (sh, args) => {
    const expr = args.join(" ");
    try {
      const v = evalArith(expr, (n) => sh.getVar(n), (n, val) => sh.setVar(n, val));
      return v !== 0n ? 0 : 1;
    } catch (e) {
      if (e instanceof ShellError) throw e;
      sh.err(`sh: ((: ${expr}: ${e.message}
`);
      return 1;
    }
  },
  let(sh, args) {
    if (!args.length) throw new ShellError("expression expected");
    let v = 0n;
    for (const a of args) {
      try {
        v = evalArith(a, (n) => sh.getVar(n), (n, val) => sh.setVar(n, val));
      } catch (e) {
        if (e instanceof ShellError) throw e;
        throw new ShellError(`${a}: ${e.message}`);
      }
    }
    return v !== 0n ? 0 : 1;
  },
  async read(sh, args) {
    let raw = false;
    let prompt = "";
    let delim = "\n";
    let nchars = -1;
    let silent = false;
    const names = [];
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a === "-r") raw = true;
      else if (a === "-p") prompt = args[++i];
      else if (a === "-d") delim = args[++i] || "\0";
      else if (a === "-n" || a === "-N") nchars = Number(args[++i]);
      else if (a === "-s") silent = true;
      else if (a === "-t" || a === "-u" || a === "-a") i++;
      else names.push(a);
    }
    void silent;
    if (prompt) sh.err(prompt);
    let line = "";
    let gotAny = false;
    const f = sh.fds.get(0);
    if (!f) return 1;
    let eof = false;
    for (; ; ) {
      const d = await f.read(1);
      if (d.length === 0) {
        eof = true;
        break;
      }
      gotAny = true;
      const c = String.fromCharCode(d[0]);
      if (c === delim) break;
      if (!raw && c === "\\") {
        const n = await f.read(1);
        if (n.length && n[0] !== 10) line += String.fromCharCode(n[0]);
        continue;
      }
      line += c;
      if (nchars > 0 && line.length >= nchars) break;
    }
    line = new TextDecoder().decode(Uint8Array.from(line, (c) => c.charCodeAt(0)));
    if (names.length === 0) names.push("REPLY");
    const ifs = sh.vars.get("IFS") ?? " 	\n";
    if (names.length === 1) {
      sh.setVar(names[0], names[0] === "REPLY" ? line : trimIfs(line, ifs));
    } else {
      let rest = trimIfs(line, ifs);
      for (let i = 0; i < names.length; i++) {
        if (i === names.length - 1) {
          sh.setVar(names[i], rest);
          break;
        }
        const m = new RegExp(`^([^${escapeClass(ifs)}]*)[${escapeClass(ifs)}]*`).exec(rest);
        sh.setVar(names[i], m[1]);
        rest = rest.slice(m[0].length);
      }
    }
    return eof && !gotAny ? 1 : eof && line === "" ? 1 : 0;
  },
  async source(sh, args) {
    if (!args[0]) throw new ShellError("filename argument required", 2);
    let file2 = args[0];
    if (!file2.includes("/")) {
      const found = sh.kernel.which(file2, { PATH: sh.getVar("PATH") ?? "" }, sh.cwd);
      file2 = found ?? file2;
    }
    let src;
    try {
      src = dec2.decode(sh.kernel.vfs.readFile(sh.resolve(file2)));
    } catch {
      throw new ShellError(`${args[0]}: No such file or directory`);
    }
    const saved = sh.positional;
    if (args.length > 1) sh.positional = args.slice(1);
    try {
      return await sh.runSource(src, args[0]);
    } catch (e) {
      if (e instanceof ReturnSig) return e.code;
      throw e;
    } finally {
      if (args.length > 1) sh.positional = saved;
    }
  },
  async eval(sh, args) {
    return sh.runSource(args.join(" "));
  },
  async exec(sh, args) {
    const code = await sh.runSource(args.map((a) => `'${a.replace(/'/g, "'\\''")}'`).join(" "));
    throw new ExitSignal(code);
  },
  alias(sh, args) {
    if (!args.length) {
      for (const [k, v] of sh.aliases) sh.out(`alias ${k}='${v}'
`);
      return 0;
    }
    for (const a of args) {
      const eq = a.indexOf("=");
      if (eq > 0) sh.aliases.set(a.slice(0, eq), a.slice(eq + 1));
      else if (sh.aliases.has(a)) sh.out(`alias ${a}='${sh.aliases.get(a)}'
`);
    }
    return 0;
  },
  unalias(sh, args) {
    for (const a of args) sh.aliases.delete(a);
    return 0;
  },
  type(sh, args) {
    let st = 0;
    for (const a of args) {
      if (a.startsWith("-")) continue;
      if (sh.funcs.has(a)) sh.out(`${a} is a function
`);
      else if (sh.aliases.has(a)) sh.out(`${a} is aliased to \`${sh.aliases.get(a)}'
`);
      else if (BUILTINS[a]) sh.out(`${a} is a shell builtin
`);
      else {
        const p = sh.kernel.which(a, { PATH: sh.getVar("PATH") ?? "" }, sh.cwd);
        if (p) sh.out(`${a} is ${p}
`);
        else {
          sh.err(`sh: type: ${a}: not found
`);
          st = 1;
        }
      }
    }
    return st;
  },
  async command(sh, args) {
    if (args[0] === "-v" || args[0] === "-V") {
      let st = 0;
      for (const a of args.slice(1)) {
        if (BUILTINS[a] || sh.funcs.has(a)) sh.out(a + "\n");
        else {
          const p = sh.kernel.which(a, { PATH: sh.getVar("PATH") ?? "" }, sh.cwd);
          if (p) sh.out(p + "\n");
          else st = 1;
        }
      }
      return st;
    }
    if (!args.length) return 0;
    const saved = sh.funcs;
    sh.funcs = /* @__PURE__ */ new Map();
    try {
      return await sh.runSource(args.map((a) => `'${a.replace(/'/g, "'\\''")}'`).join(" "));
    } finally {
      sh.funcs = saved;
    }
  },
  hash: () => 0,
  builtin: async (sh, args) => {
    const b = BUILTINS[args[0]];
    if (!b) return 1;
    return b(sh, args.slice(1));
  },
  async wait(sh, args) {
    const interrupted = /* @__PURE__ */ Symbol();
    const untilTrap = async (p) => {
      if (!sh.ownsProc) return p;
      return Promise.race([p, sh.waitForTrap().then(() => interrupted)]);
    };
    const statusOfTrap = () => 128 + (SIGNALS["SIG" + (sh.pendingTrapSignal() ?? "TERM")] ?? 15);
    if (args.length) {
      let st = 0;
      for (const a of args) {
        const pid = a === "%%" || a === "%+" || a === "%" ? sh.lastBg : Number(a);
        const j = sh.bgJobs.get(pid);
        if (!j) {
          sh.err(`sh: wait: pid ${a} is not a child of this shell
`);
          st = 127;
          continue;
        }
        const r2 = await untilTrap(j);
        if (r2 === interrupted) return statusOfTrap();
        st = r2;
        sh.bgJobs.delete(pid);
      }
      return st;
    }
    const r = await untilTrap(Promise.all(sh.bgJobs.values()));
    if (r === interrupted) return statusOfTrap();
    sh.bgJobs.clear();
    return 0;
  },
  trap(sh, args) {
    const signalSpec = (s) => {
      if (/^\d+$/.test(s)) {
        const n = Number(s);
        if (n === 0) return "EXIT";
        const name = Object.keys(SIGNALS).find((k) => SIGNALS[k] === n);
        return name ? name.slice(3) : null;
      }
      const u = s.toUpperCase().replace(/^SIG/, "");
      if (u === "EXIT" || u === "ERR" || u === "DEBUG" || u === "RETURN") return u;
      return SIGNALS["SIG" + u] !== void 0 ? u : null;
    };
    const show = (name) => {
      const v = sh.traps.get(name);
      if (v !== void 0) sh.out(`trap -- '${v.replace(/'/g, "'\\''")}' ${name === "EXIT" || name === "ERR" || name === "DEBUG" || name === "RETURN" ? name : "SIG" + name}
`);
    };
    if (args[0] === "--") args = args.slice(1);
    if (args[0] === "-l") {
      sh.out(Object.entries(SIGNALS).map(([k, v]) => `${String(v).padStart(2)}) ${k}`).join("\n") + "\n");
      return 0;
    }
    if (args.length === 0 || args[0] === "-p") {
      const names = args.length > 1 ? args.slice(1).map(signalSpec) : [...sh.traps.keys()];
      for (const n of names) if (n) show(n);
      return 0;
    }
    let action = args[0];
    let sigs = args.slice(1);
    if (action === "-" || args.length === 1 && signalSpec(action) !== null || /^\d+$/.test(action)) {
      if (action !== "-") sigs = args;
      action = null;
    }
    let st = 0;
    for (const s of sigs) {
      const name = signalSpec(s);
      if (!name || name === "KILL" || name === "STOP") {
        sh.err(`sh: trap: ${s}: invalid signal specification
`);
        st = 1;
        continue;
      }
      if (action === null) sh.traps.delete(name);
      else sh.traps.set(name, action);
    }
    return st;
  },
  local(sh, args) {
    const scope = sh.locals[sh.locals.length - 1];
    for (const a of args) {
      if (a.startsWith("-")) continue;
      const eq = a.indexOf("=");
      const name = eq > 0 ? a.slice(0, eq) : a;
      if (scope && !scope.has(name)) scope.set(name, sh.vars.get(name));
      if (eq > 0) sh.setVar(name, a.slice(eq + 1));
      else if (!sh.vars.has(name)) sh.setVar(name, "");
    }
    return 0;
  },
  declare(sh, args) {
    const exp = args.includes("-x");
    for (const a of args) {
      if (a.startsWith("-")) continue;
      const eq = a.indexOf("=");
      const name = eq > 0 ? a.slice(0, eq) : a;
      const scope = sh.locals[sh.locals.length - 1];
      if (scope && !scope.has(name)) scope.set(name, sh.vars.get(name));
      if (eq > 0) sh.setVar(name, a.slice(eq + 1), exp);
      else if (exp) sh.exported.add(name);
    }
    return 0;
  },
  ulimit(sh, args) {
    let i = 0;
    let which2 = "f";
    while (i < args.length && args[i].startsWith("-")) {
      if (args[i] === "-a") {
        sh.out(`open files                          (-n) ${sh.ctx.proc.nofile}
`);
        return 0;
      }
      which2 = args[i].slice(-1);
      i++;
    }
    const value = args[i];
    if (value === void 0) {
      sh.out((which2 === "n" ? String(sh.ctx.proc.nofile) : "unlimited") + "\n");
      return 0;
    }
    if (which2 === "n") {
      const n = value === "unlimited" ? 1024 * 1024 : Number(value);
      if (!Number.isInteger(n) || n < 0) throw new ShellError(`ulimit: ${value}: invalid number`);
      sh.ctx.proc.nofile = n;
    }
    return 0;
  },
  umask(sh, args) {
    let symbolic = false;
    let reusable = false;
    while (args[0]?.startsWith("-") && args[0].length > 1) {
      const a = args.shift();
      if (a === "--") break;
      for (const c of a.slice(1)) {
        if (c === "S") symbolic = true;
        else if (c === "p") reusable = true;
        else throw new ShellError(`${a}: invalid option`, 2);
      }
    }
    const mask = sh.umask;
    if (!args.length) {
      const v = symbolic ? symbolicUmask(mask) : mask.toString(8).padStart(4, "0");
      sh.out((reusable ? `umask ${symbolic ? "-S " : ""}` : "") + v + "\n");
      return 0;
    }
    const spec = args[0];
    if (/^[0-7]+$/.test(spec)) {
      sh.setUmask(parseInt(spec, 8) & 511);
      return 0;
    }
    const allowed = applySymbolicMode(~mask & 511, spec, { umask: 0 });
    if (allowed === null) throw new ShellError(`${spec}: invalid symbolic mode operator`);
    sh.setUmask(~allowed & 511);
    return 0;
  },
  getopts(sh, args) {
    const [spec, name, ...rest] = args;
    const argv = rest.length ? rest : sh.positional;
    let ind = Number(sh.getVar("OPTIND") ?? "1");
    const sub = Number(sh.vars.get("__OV_OPTSUB") ?? "1");
    const arg = argv[ind - 1];
    if (!arg || arg === "--" || !arg.startsWith("-") || arg === "-") {
      if (arg === "--") sh.setVar("OPTIND", String(ind + 1));
      sh.setVar(name, "?");
      return 1;
    }
    const c = arg[sub];
    const k = spec.indexOf(c);
    let nextSub = sub + 1;
    if (k === -1) {
      sh.setVar(name, "?");
    } else {
      sh.setVar(name, c);
      if (spec[k + 1] === ":") {
        if (arg.length > sub + 1) sh.setVar("OPTARG", arg.slice(sub + 1));
        else {
          sh.setVar("OPTARG", argv[ind] ?? "");
          ind++;
        }
        nextSub = arg.length;
      }
    }
    if (nextSub >= arg.length) {
      ind++;
      nextSub = 1;
    }
    sh.setVar("OPTIND", String(ind));
    sh.vars.set("__OV_OPTSUB", String(nextSub));
    return 0;
  },
  jobs: () => 0,
  times: () => 0,
  pushd(sh, args) {
    const stack = (sh.vars.get("__OV_DIRSTACK") ?? "").split("\n").filter(Boolean);
    stack.push(sh.cwd);
    sh.vars.set("__OV_DIRSTACK", stack.join("\n"));
    return BUILTINS.cd(sh, args);
  },
  popd(sh) {
    const stack = (sh.vars.get("__OV_DIRSTACK") ?? "").split("\n").filter(Boolean);
    const d = stack.pop();
    sh.vars.set("__OV_DIRSTACK", stack.join("\n"));
    if (!d) return 1;
    return BUILTINS.cd(sh, [d]);
  },
  history(sh) {
    sh.history.forEach((h, i) => sh.out(`${String(i + 1).padStart(5)}  ${h}
`));
    return 0;
  }
};
BUILTINS["."] = BUILTINS.source;
BUILTINS.typeset = BUILTINS.declare;
function trimIfs(s, ifs) {
  const ws = [...ifs].filter((c) => " 	\n".includes(c)).join("");
  if (!ws) return s;
  const re = new RegExp(`^[${escapeClass(ws)}]+|[${escapeClass(ws)}]+$`, "g");
  return s.replace(re, "");
}
function escapeClass(s) {
  return s.replace(/[\\\]^-]/g, "\\$&").replace(/\t/g, "\\t").replace(/\n/g, "\\n");
}
async function shProgram(ctx) {
  const job = pendingJobs.get(ctx.proc);
  if (job) {
    pendingJobs.delete(ctx.proc);
    return job(ctx);
  }
  const sh = new Shell(ctx);
  sh.ownsProc = true;
  const args = ctx.argv.slice(1);
  let readCommand = false;
  let interactive = false;
  let i = 0;
  for (; i < args.length; i++) {
    const a = args[i];
    if (a === "--" || a === "-") {
      i++;
      break;
    }
    if (a.startsWith("--")) {
      if (["--login", "--norc", "--noprofile", "--posix", "--noediting"].includes(a)) continue;
      if (a === "--rcfile" || a === "--init-file") {
        i++;
        continue;
      }
      ctx.err(`sh: ${a}: invalid option
`);
      return 2;
    }
    if (!/^[-+]./.test(a)) break;
    const on = a[0] === "-";
    for (const c of a.slice(1)) {
      if (c === "c" && on) readCommand = true;
      else if (c === "i" && on) interactive = true;
      else if (c === "s" || c === "l") {
      } else if (c === "o") await BUILTINS.set(sh, [`${a[0]}o`, args[++i] ?? ""]);
      else if ("euxfavnhmbCBHPTE".includes(c)) await BUILTINS.set(sh, [a[0] + c]);
      else {
        ctx.err(`sh: ${a[0]}${c}: invalid option
`);
        return 2;
      }
    }
  }
  const rest = args.slice(i);
  sh.installSignalHandler();
  let code;
  try {
    code = await runMain();
  } catch (e) {
    if (e instanceof ExitSignal) code = e.code;
    else if (e instanceof ShellError) {
      sh.err(`sh: ${e.message}
`);
      code = e.code;
    } else if (e instanceof ReturnSig) code = e.code;
    else if (e instanceof BreakSig || e instanceof ContinueSig || e instanceof InterruptSig) code = sh.status;
    else {
      sh.releaseFds();
      throw e;
    }
  }
  try {
    return await sh.runExitTrap(code);
  } finally {
    sh.releaseFds();
  }
  async function runMain() {
    if (readCommand) {
      if (!rest.length) {
        ctx.err("sh: -c: option requires an argument\n");
        return 2;
      }
      sh.arg0 = rest[1] ?? ctx.argv[0];
      sh.positional = rest.slice(2);
      return await sh.runSource(rest[0]);
    }
    if (rest.length > 0) {
      const file2 = rest[0];
      let src2;
      try {
        src2 = dec2.decode(ctx.vfs.readFile(sh.resolve(file2)));
      } catch {
        ctx.err(`sh: ${file2}: No such file or directory
`);
        return 127;
      }
      if (src2.startsWith("#!")) src2 = src2.slice(src2.indexOf("\n") + 1);
      sh.arg0 = file2;
      sh.positional = rest.slice(1);
      return await sh.runSource(src2, file2);
    }
    if (interactive || ctx.isatty(0)) {
      try {
        const rc = dec2.decode(ctx.vfs.readFile((sh.getVar("HOME") ?? "/home/user") + "/.shrc"));
        await sh.runSource(rc);
      } catch {
      }
      return await sh.interactive();
    }
    const src = await ctx.readAllText(0);
    return await sh.runSource(src);
  }
}

// src/kernel/coreutils.ts
var enc4 = new TextEncoder();
var dec3 = new TextDecoder();
function getopt(argv, withArg = "", longMap = {}, stopAtOperand = false) {
  const flags = /* @__PURE__ */ new Set();
  const opts = /* @__PURE__ */ new Map();
  const all = /* @__PURE__ */ new Map();
  const args = [];
  const setOpt = (k, v) => {
    opts.set(k, v);
    if (!all.has(k)) all.set(k, []);
    all.get(k).push(v);
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") {
      args.push(...argv.slice(i + 1));
      break;
    }
    if (a.startsWith("--") && a.length > 2) {
      const eq = a.indexOf("=");
      const name = eq > 0 ? a.slice(2, eq) : a.slice(2);
      const mapped = longMap[name] ?? name;
      if (eq > 0) setOpt(mapped, a.slice(eq + 1));
      else if (withArg.includes(mapped) && mapped.length === 1) setOpt(mapped, argv[++i] ?? "");
      else flags.add(mapped);
      continue;
    }
    if (a.startsWith("-") && a.length > 1) {
      for (let j = 1; j < a.length; j++) {
        const c = a[j];
        if (withArg.includes(c)) {
          const v = j + 1 < a.length ? a.slice(j + 1) : argv[++i] ?? "";
          setOpt(c, v);
          break;
        }
        flags.add(c);
      }
      continue;
    }
    if (stopAtOperand) {
      args.push(...argv.slice(i));
      break;
    }
    args.push(a);
  }
  return { flags, opts, all, args };
}
function errMsg(e) {
  switch (e?.code) {
    case "ENOENT":
      return "No such file or directory";
    case "ENOTDIR":
      return "Not a directory";
    case "EISDIR":
      return "Is a directory";
    case "EEXIST":
      return "File exists";
    case "ENOTEMPTY":
      return "Directory not empty";
    case "EACCES":
      return "Permission denied";
    case "EPERM":
      return "Operation not permitted";
    case "ESRCH":
      return "No such process";
    case "ENXIO":
      return "No such device or address";
    case "ELOOP":
      return "Too many levels of symbolic links";
    default:
      return e?.message ?? String(e);
  }
}
function spawnCommand(ctx, name, argv, opts = {}) {
  try {
    return ctx.spawn(argv, opts);
  } catch (e) {
    ctx.err(`${name}: '${argv[0]}': ${errMsg(e)}
`);
    return e?.code === "ENOENT" ? 127 : 126;
  }
}
async function runCommand(ctx, name, argv, opts = {}) {
  const p = spawnCommand(ctx, name, argv, opts);
  return typeof p === "number" ? p : exitCodeOf(await p.exited);
}
function parseDuration(s) {
  if (/^inf(inity)?$/i.test(s)) return Infinity;
  const m = /^(\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?([smhd]?)$/i.exec(s);
  if (!m) return null;
  const n = Number(s.slice(0, s.length - m[2].length));
  return Number.isFinite(n) ? n * { s: 1e3, m: 6e4, h: 36e5, d: 864e5, "": 1e3 }[m[2].toLowerCase()] : null;
}
function parseSignal(s) {
  if (/^\d+$/.test(s)) {
    const n = Number(s);
    return n === 0 || Object.values(SIGNALS).includes(n) ? n : null;
  }
  return SIGNALS["SIG" + s.toUpperCase().replace(/^SIG/, "")] ?? null;
}
async function eachInput(ctx, files, name, fn) {
  let st = 0;
  if (files.length === 0) files = ["-"];
  for (const f of files) {
    if (f === "-") {
      await fn(await ctx.readAll(0), "-");
      continue;
    }
    try {
      await fn(ctx.vfs.readFile(ctx.resolve(f)), f);
    } catch (e) {
      ctx.err(`${name}: ${f}: ${errMsg(e)}
`);
      st = 1;
    }
  }
  return st;
}
async function eachLine(ctx, files, name, fn) {
  return eachInput(ctx, files, name, (data, file2) => {
    const text = dec3.decode(data);
    const lines = text.split("\n");
    if (lines[lines.length - 1] === "") lines.pop();
    for (const l of lines) if (fn(l, file2) === false) break;
  });
}
function modeString(mode) {
  const t = mode & S_IFMT;
  const c = t === S_IFDIR ? "d" : t === S_IFLNK ? "l" : t === S_IFREG ? "-" : t === S_IFCHR ? "c" : t === S_IFIFO ? "p" : t === S_IFSOCK ? "s" : t === S_IFBLK ? "b" : "?";
  const bits = [..."rwxrwxrwx"].map((b, i) => mode & 1 << 8 - i ? b : "-");
  const special = (i, bit, ch) => {
    if (mode & bit) bits[i] = bits[i] === "x" ? ch : ch.toUpperCase();
  };
  special(2, 2048, "s");
  special(5, 1024, "s");
  special(8, 512, "t");
  return c + bits.join("");
}
function humanSize(n) {
  const units = ["", "K", "M", "G", "T"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return i === 0 ? String(n) : (v < 10 ? v.toFixed(1) : Math.round(v).toString()) + units[i];
}
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function lsDate(ms) {
  const d = new Date(ms);
  const recent = Math.abs(Date.now() - ms) < 180 * 864e5;
  const day = String(d.getDate()).padStart(2, " ");
  if (recent) return `${MONTHS[d.getMonth()]} ${day} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${MONTHS[d.getMonth()]} ${day}  ${d.getFullYear()}`;
}
var ls = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1), "", { all: "a", "almost-all": "A", long: "l", human: "h", recursive: "R", color: "color" });
  const all = flags.has("a");
  const almost = flags.has("A");
  const long = flags.has("l");
  const one = flags.has("1") || !ctx.isatty(1);
  const color = ctx.isatty(1) && !flags.has("no-color");
  const targets2 = args.length ? args : ["."];
  let st = 0;
  const vfs = ctx.vfs;
  const fmtName = (name, s, full) => {
    if (!color) return name;
    const t = s.mode & S_IFMT;
    if (t === S_IFDIR) return `\x1B[1;34m${name}\x1B[0m`;
    if (t === S_IFLNK) return `\x1B[1;36m${name}\x1B[0m`;
    if (s.mode & 73) return `\x1B[1;32m${name}\x1B[0m`;
    void full;
    return name;
  };
  const listDir = (dir, label) => {
    const abs = ctx.resolve(dir);
    let names = vfs.readdir(abs).sort((a, b) => a.localeCompare(b));
    if (!all && !almost) names = names.filter((n) => !n.startsWith("."));
    if (all) names = [".", "..", ...names];
    if (flags.has("t")) names.sort((a, b) => (vfs.tryLookup(join(abs, b), false)?.mtimeMs ?? 0) - (vfs.tryLookup(join(abs, a), false)?.mtimeMs ?? 0));
    if (flags.has("r")) names.reverse();
    if (label) ctx.out(`${dir}:
`);
    printEntries(names.map((n) => ({ name: n, full: join(abs, n) })), true);
    if (flags.has("R")) {
      for (const n of names) {
        if (n === "." || n === "..") continue;
        const node = vfs.tryLookup(join(abs, n), false);
        if (node && isDir(node)) {
          ctx.out("\n");
          listDir(join(dir, n), true);
        }
      }
    }
  };
  const printEntries = (entries, inDir) => {
    if (long) {
      const rows = entries.map((e) => {
        const s = vfs.lstat(e.full);
        let name = fmtName(e.name, s, e.full);
        if ((s.mode & S_IFMT) === S_IFLNK) name += ` -> ${vfs.readlink(e.full)}`;
        return [modeString(s.mode), String(s.nlink), "user", "user", flags.has("h") ? humanSize(s.size) : String(s.size), lsDate(s.mtimeMs), name];
      });
      if (inDir) {
        const total = entries.reduce((a, e) => a + Math.ceil(vfs.lstat(e.full).size / 1024), 0);
        ctx.out(`total ${total}
`);
      }
      const w = [0, 0, 0, 0, 0];
      for (const r of rows) for (let i = 0; i < 5; i++) w[i] = Math.max(w[i], r[i].length);
      for (const r of rows) ctx.out(`${r[0]} ${r[1].padStart(w[1])} ${r[2].padEnd(w[2])} ${r[3].padEnd(w[3])} ${r[4].padStart(w[4])} ${r[5]} ${r[6]}
`);
      return;
    }
    if (one) {
      for (const e of entries) ctx.out(fmtName(e.name, vfs.lstat(e.full), e.full) + "\n");
      return;
    }
    if (!entries.length) return;
    const cols = ctx.proc.tty?.cols ?? 80;
    const width = Math.max(...entries.map((e) => [...e.name].length)) + 2;
    const per = Math.max(1, Math.floor(cols / width));
    const rowsN = Math.ceil(entries.length / per);
    for (let r = 0; r < rowsN; r++) {
      let line = "";
      for (let c = 0; c < per; c++) {
        const e = entries[c * rowsN + r];
        if (!e) continue;
        const pad = width - [...e.name].length;
        line += fmtName(e.name, vfs.lstat(e.full), e.full) + " ".repeat(pad);
      }
      ctx.out(line.trimEnd() + "\n");
    }
  };
  const files = [];
  const dirs = [];
  for (const t of targets2) {
    try {
      const n = vfs.lookup(ctx.resolve(t), true);
      if (isDir(n) && !flags.has("d")) dirs.push(t);
      else files.push({ name: t, full: ctx.resolve(t) });
    } catch (e) {
      ctx.err(`ls: cannot access '${t}': ${errMsg(e)}
`);
      st = 2;
    }
  }
  printEntries(files, false);
  dirs.forEach((d, i) => {
    if (i > 0 || files.length) ctx.out("\n");
    listDir(d, targets2.length > 1 || flags.has("R"));
  });
  return st;
};
var cat = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  let lineNo = 1;
  let atLineStart = true;
  const emit2 = (d) => {
    if (!flags.has("n")) return ctx.out(d);
    const text = dec3.decode(d, { stream: true });
    let out = "";
    for (const part of text.split(/(?<=\n)/)) {
      if (!part) continue;
      if (atLineStart) out += `${String(lineNo++).padStart(6)}	`;
      out += part;
      atLineStart = part.endsWith("\n");
    }
    ctx.out(out);
  };
  let st = 0;
  for (const f of args.length ? args : ["-"]) {
    if (f === "-") {
      for (let d; d = await ctx.read(0); ) emit2(d);
      continue;
    }
    try {
      emit2(ctx.vfs.readFile(ctx.resolve(f)));
    } catch (e) {
      ctx.err(`cat: ${f}: ${errMsg(e)}
`);
      st = 1;
    }
  }
  return st;
};
var mkdir = async (ctx) => {
  const { flags, opts, args } = getopt(ctx.argv.slice(1), "m", { parents: "p" });
  let st = 0;
  const mode = opts.has("m") ? parseInt(opts.get("m"), 8) : 511;
  for (const a of args) {
    try {
      if (flags.has("p")) ctx.vfs.mkdir(ctx.resolve(a), mode, true);
      else ctx.vfs.mkdir(ctx.resolve(a), mode);
    } catch (e) {
      ctx.err(`mkdir: cannot create directory '${a}': ${errMsg(e)}
`);
      st = 1;
    }
  }
  if (!args.length) {
    ctx.err("mkdir: missing operand\n");
    return 1;
  }
  return st;
};
var mkfifo = async (ctx) => {
  const { opts, args } = getopt(ctx.argv.slice(1), "m");
  if (!args.length) {
    ctx.err("mkfifo: missing operand\n");
    return 1;
  }
  const mode = opts.has("m") ? parseInt(opts.get("m"), 8) : 438 & ~ctx.proc.umask;
  let st = 0;
  for (const a of args) {
    try {
      ctx.vfs.mknodFifo(ctx.resolve(a), mode);
    } catch (e) {
      ctx.err(`mkfifo: cannot create fifo '${a}': ${errMsg(e)}
`);
      st = 1;
    }
  }
  return st;
};
var rm = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1), "", { recursive: "r", force: "f", verbose: "v", dir: "d" });
  const recursive = flags.has("r") || flags.has("R");
  const force = flags.has("f");
  let st = 0;
  for (const a of args) {
    const abs = ctx.resolve(a);
    if (recursive && abs === "/") {
      ctx.err(`rm: it is dangerous to operate recursively on '/'
rm: use --no-preserve-root to override this failsafe
`);
      st = 1;
      continue;
    }
    if (/(^|\/)\.\.?\/*$/.test(a)) {
      ctx.err(`rm: refusing to remove '.' or '..' directory: skipping '${a}'
`);
      st = 1;
      continue;
    }
    const node = ctx.vfs.tryLookup(abs, false);
    if (!node) {
      if (!force) {
        ctx.err(`rm: cannot remove '${a}': No such file or directory
`);
        st = 1;
      }
      continue;
    }
    try {
      if (isDir(node)) {
        if (!recursive && !flags.has("d")) {
          ctx.err(`rm: cannot remove '${a}': Is a directory
`);
          st = 1;
          continue;
        }
        if (recursive) ctx.vfs.rmrf(abs);
        else ctx.vfs.rmdir(abs);
        if (flags.has("v")) ctx.out(`removed directory '${a}'
`);
      } else {
        ctx.vfs.unlink(abs);
        if (flags.has("v")) ctx.out(`removed '${a}'
`);
      }
    } catch (e) {
      ctx.err(`rm: cannot remove '${a}': ${errMsg(e)}
`);
      st = 1;
    }
  }
  if (!args.length && !force) {
    ctx.err("rm: missing operand\n");
    return 1;
  }
  return st;
};
var rmdir = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  let st = 0;
  for (const a of args) {
    try {
      ctx.vfs.rmdir(ctx.resolve(a));
      if (flags.has("p")) {
        let d = dirname(a);
        while (d !== "." && d !== "/") {
          ctx.vfs.rmdir(ctx.resolve(d));
          d = dirname(d);
        }
      }
    } catch (e) {
      ctx.err(`rmdir: failed to remove '${a}': ${errMsg(e)}
`);
      st = 1;
    }
  }
  return st;
};
var cp = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1), "", { recursive: "r", force: "f" });
  if (args.length < 2) {
    ctx.err("cp: missing file operand\n");
    return 1;
  }
  const dest = args.pop();
  const destAbs = ctx.resolve(dest);
  const destNode = ctx.vfs.tryLookup(destAbs);
  const destIsDir = !!destNode && isDir(destNode);
  if (args.length > 1 && !destIsDir) {
    ctx.err(`cp: target '${dest}' is not a directory
`);
    return 1;
  }
  let st = 0;
  for (const src of args) {
    const srcAbs = ctx.resolve(src);
    const target = destIsDir ? join(destAbs, basename(srcAbs)) : destAbs;
    try {
      const node = ctx.vfs.lookup(srcAbs, !flags.has("P") && !flags.has("d"));
      if (isDir(node) && !(flags.has("r") || flags.has("R") || flags.has("a"))) {
        ctx.err(`cp: -r not specified; omitting directory '${src}'
`);
        st = 1;
        continue;
      }
      if (flags.has("n") && ctx.vfs.exists(target)) continue;
      ctx.vfs.copy(srcAbs, target, { dereference: !flags.has("a") && !flags.has("P") && !flags.has("d") ? isDir(node) ? false : true : false });
    } catch (e) {
      ctx.err(`cp: cannot copy '${src}': ${errMsg(e)}
`);
      st = 1;
    }
  }
  return st;
};
var mv = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  if (args.length < 2) {
    ctx.err("mv: missing file operand\n");
    return 1;
  }
  const dest = args.pop();
  const destAbs = ctx.resolve(dest);
  const destNode = ctx.vfs.tryLookup(destAbs);
  const destIsDir = !!destNode && isDir(destNode);
  let st = 0;
  for (const src of args) {
    const srcAbs = ctx.resolve(src);
    const target = destIsDir ? join(destAbs, basename(srcAbs)) : destAbs;
    try {
      if (flags.has("n") && ctx.vfs.exists(target)) continue;
      const existing = ctx.vfs.tryLookup(target, false);
      if (existing && !isDir(existing) && target !== srcAbs) ctx.vfs.unlink(target);
      ctx.vfs.rename(srcAbs, target);
    } catch (e) {
      ctx.err(`mv: cannot move '${src}' to '${dest}': ${errMsg(e)}
`);
      st = 1;
    }
  }
  return st;
};
var touch = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1), "dtr");
  const now = Date.now();
  for (const a of args) {
    const abs = ctx.resolve(a);
    if (!ctx.vfs.exists(abs)) {
      if (flags.has("c")) continue;
      try {
        ctx.vfs.createFile(abs);
      } catch (e) {
        ctx.err(`touch: cannot touch '${a}': ${errMsg(e)}
`);
        return 1;
      }
    } else ctx.vfs.utimes(abs, now, now);
  }
  return 0;
};
var ln = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  if (args.length < 1) return 1;
  const target = args[0];
  let link = args[1] ?? basename(target);
  const linkAbs0 = ctx.resolve(link);
  const ln0 = ctx.vfs.tryLookup(linkAbs0);
  if (ln0 && isDir(ln0) && !flags.has("n")) link = join(link, basename(target));
  const linkAbs = ctx.resolve(link);
  try {
    if (flags.has("f") && ctx.vfs.tryLookup(linkAbs, false)) ctx.vfs.unlink(linkAbs);
    if (flags.has("s")) ctx.vfs.symlink(target, linkAbs);
    else ctx.vfs.link(ctx.resolve(target), linkAbs);
  } catch (e) {
    ctx.err(`ln: failed to create link '${link}': ${errMsg(e)}
`);
    return 1;
  }
  return 0;
};
var chmod = async (ctx) => {
  const SYMBOLIC = /^[ugoa]*(?:[-+=](?:[rwxXst]*|[ugo]))+(?:,[ugoa]*(?:[-+=](?:[rwxXst]*|[ugo]))+)*$/;
  const flags = /* @__PURE__ */ new Set();
  const args = [];
  let modeSpec;
  const argv = ctx.argv.slice(1);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") {
      args.push(...argv.slice(i + 1));
      break;
    }
    if (modeSpec === void 0 && a.startsWith("-") && SYMBOLIC.test(a)) modeSpec = a;
    else if (a === "--recursive") flags.add("R");
    else if (a.startsWith("--")) {
    } else if (/^-[Rcfv]+$/.test(a)) for (const c of a.slice(1)) flags.add(c);
    else if (modeSpec === void 0) modeSpec = a;
    else args.push(a);
  }
  if (modeSpec === void 0 && args.length) modeSpec = args.shift();
  if (modeSpec === void 0 || !args.length) {
    ctx.err(modeSpec === void 0 ? "chmod: missing operand\n" : `chmod: missing operand after '${modeSpec}'
`);
    return 1;
  }
  const octal2 = /^[0-7]{1,4}$/.test(modeSpec);
  if (!octal2 && !SYMBOLIC.test(modeSpec)) {
    ctx.err(`chmod: invalid mode: '${modeSpec}'
`);
    return 1;
  }
  const apply = (p, top = true) => {
    const node = ctx.vfs.lookup(p, top);
    if (isLink(node)) return;
    const mode = octal2 ? parseInt(modeSpec, 8) : applySymbolicMode(node.mode & 4095, modeSpec, { isDir: isDir(node), umask: ctx.proc.umask });
    ctx.vfs.chmod(p, mode);
    if (flags.has("R") && isDir(node)) for (const n of ctx.vfs.readdir(p)) apply(join(p, n), false);
  };
  let st = 0;
  for (const a of args) {
    try {
      apply(ctx.resolve(a));
    } catch (e) {
      ctx.err(`chmod: cannot access '${a}': ${errMsg(e)}
`);
      st = 1;
    }
  }
  return st;
};
var head = async (ctx) => {
  const argv = ctx.argv.slice(1).map((a) => /^-\d+$/.test(a) ? `-n${a.slice(1)}` : a);
  const { opts, args } = getopt(argv, "nc");
  const n = Number(opts.get("n") ?? 10);
  const multi = args.length > 1;
  if (!args.length && (opts.has("c") ? Number(opts.get("c")) >= 0 : n >= 0)) {
    let left = opts.has("c") ? Number(opts.get("c")) : n;
    while (left > 0) {
      const d = await ctx.read(0);
      if (!d) break;
      let end = d.length;
      if (opts.has("c")) end = Math.min(d.length, left);
      else
        for (let i = 0; i < d.length; i++)
          if (d[i] === 10 && --left === 0) {
            end = i + 1;
            break;
          }
      if (opts.has("c")) left -= end;
      ctx.out(d.subarray(0, end));
    }
    return 0;
  }
  return eachInput(ctx, args, "head", (d, f) => {
    if (multi) ctx.out(`==> ${f} <==
`);
    if (opts.has("c")) {
      ctx.out(d.subarray(0, Number(opts.get("c"))));
      return;
    }
    const text = dec3.decode(d);
    const lines = text.split("\n");
    const take = n < 0 ? lines.slice(0, Math.max(0, lines.length - 1 + n)) : lines.slice(0, n);
    const hadNl = lines.length > take.length;
    ctx.out(take.join("\n") + (hadNl && take.length ? "\n" : ""));
  });
};
var tail = async (ctx) => {
  const argv = ctx.argv.slice(1).map((a) => /^-\d+$/.test(a) ? `-n${a.slice(1)}` : a);
  const { opts, args, flags } = getopt(argv, "nc");
  const spec = opts.get("n") ?? "10";
  const fromStart = spec.startsWith("+");
  const n = Math.abs(Number(spec));
  let nth = 0;
  const st = await eachInput(ctx, args, "tail", (d, f) => {
    if (args.length > 1 && !flags.has("q")) ctx.out(`${nth++ ? "\n" : ""}==> ${f === "-" ? "standard input" : f} <==
`);
    if (opts.has("c")) {
      const c = opts.get("c");
      const k = Math.abs(Number(c));
      ctx.out(c.startsWith("+") ? d.subarray(Math.max(0, k - 1)) : d.subarray(Math.max(0, d.length - k)));
      return;
    }
    const text = dec3.decode(d);
    const lines = text.split("\n");
    const trailing = lines[lines.length - 1] === "";
    if (trailing) lines.pop();
    const out = fromStart ? lines.slice(Math.max(0, n - 1)) : n === 0 ? [] : lines.slice(Math.max(0, lines.length - n));
    if (out.length) ctx.out(out.join("\n") + (trailing ? "\n" : ""));
  });
  if (flags.has("f") && args.length === 1) {
    const abs = ctx.resolve(args[0]);
    let size = ctx.vfs.stat(abs).size;
    while (!ctx.signal.aborted) {
      await new Promise((r) => setTimeout(r, 250));
      try {
        const s = ctx.vfs.stat(abs).size;
        if (s > size) {
          ctx.out(ctx.vfs.readFile(abs).subarray(size, s));
          size = s;
        } else if (s < size) size = s;
      } catch {
      }
    }
  }
  return st;
};
var wc = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  const showL = flags.has("l") || !flags.has("w") && !flags.has("c") && !flags.has("m");
  const showW = flags.has("w") || !flags.has("l") && !flags.has("c") && !flags.has("m");
  const showC = flags.has("c") || flags.has("m") || !flags.has("l") && !flags.has("w");
  const totals = [0, 0, 0];
  const rows = [];
  const st = await eachInput(ctx, args, "wc", (d, f) => {
    const text = dec3.decode(d);
    const l = (text.match(/\n/g) ?? []).length;
    const w = text.split(/\s+/).filter(Boolean).length;
    const c = flags.has("m") ? [...text].length : d.length;
    totals[0] += l;
    totals[1] += w;
    totals[2] += c;
    rows.push([l, w, c, f === "-" ? "" : f]);
  });
  if (rows.length > 1) rows.push([totals[0], totals[1], totals[2], "total"]);
  const width = rows.length === 1 && args.length === 0 ? 0 : Math.max(...rows.flatMap((r) => [String(r[0]).length, String(r[1]).length, String(r[2]).length]));
  for (const r of rows) {
    const parts = [];
    if (showL) parts.push(String(r[0]).padStart(width));
    if (showW) parts.push(String(r[1]).padStart(width));
    if (showC) parts.push(String(r[2]).padStart(width));
    ctx.out(parts.join(" ") + (r[3] ? ` ${r[3]}` : "") + "\n");
  }
  return st;
};
function sedEscape(s, i) {
  const n = s[i + 1];
  const simple = { n: "\n", t: "	", r: "\r", f: "\f", v: "\v", a: "\x07" };
  if (n in simple) return { ch: simple[n], len: 2 };
  const m = /^(d([0-9]{3})|o([0-7]{3})|x([0-9a-fA-F]{2})|c(.))/.exec(s.slice(i + 1));
  if (!m) return null;
  const code = m[2] ? parseInt(m[2], 10) : m[3] ? parseInt(m[3], 8) : m[4] ? parseInt(m[4], 16) : m[5].toUpperCase().charCodeAt(0) ^ 64;
  return { ch: String.fromCharCode(code), len: 1 + m[0].length };
}
function posixRegexToJs(p, extended, sed2 = false) {
  let ere = "";
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (c === "[") {
      let j = i + 1;
      let head2 = "[";
      if (p[j] === "^") head2 += p[j++];
      if (p[j] === "]") head2 += p[j++];
      let body = "";
      for (; j < p.length && p[j] !== "]"; j++) {
        if (p[j] === "[" && ":=.".includes(p[j + 1] ?? "")) {
          const close = p.indexOf(p[j + 1] + "]", j + 2);
          if (close !== -1) {
            body += p.slice(j, close + 2);
            j = close + 1;
            continue;
          }
        }
        const e = sed2 && p[j] === "\\" ? sedEscape(p, j) : null;
        if (e) {
          body += e.ch;
          j += e.len - 1;
        } else body += p[j];
      }
      ere += head2 + body + (j < p.length ? "]" : "");
      i = j;
      continue;
    }
    if (c === "\\" && i + 1 < p.length) {
      const e = sed2 ? sedEscape(p, i) : null;
      if (e) {
        ere += /[\\^$.*+?()[\]{}|]/.test(e.ch) ? "\\" + e.ch : e.ch;
        i += e.len - 1;
        continue;
      }
      const n = p[++i];
      if (!extended && "(){}|+?".includes(n)) ere += n;
      else ere += "\\" + n;
      continue;
    }
    if (!extended && "(){}|+?".includes(c)) {
      ere += "\\" + c;
      continue;
    }
    if (!extended && c === "*" && (ere === "" || ere === "^" || ere.endsWith("(") || ere.endsWith("|"))) {
      ere += "\\*";
      continue;
    }
    ere += c;
  }
  return eregToRegexSource(ere);
}
var grep = async (ctx) => {
  const name = ctx.argv[0].split("/").pop();
  const { flags, opts, all, args } = getopt(ctx.argv.slice(1), "efmABCd", {
    "ignore-case": "i",
    "invert-match": "v",
    "line-number": "n",
    count: "c",
    recursive: "r",
    "dereference-recursive": "R",
    "files-with-matches": "l",
    "files-without-match": "L",
    quiet: "q",
    silent: "q",
    "word-regexp": "w",
    "line-regexp": "x",
    "only-matching": "o",
    "extended-regexp": "E",
    "fixed-strings": "F",
    "basic-regexp": "G",
    "perl-regexp": "P",
    "no-filename": "h",
    "with-filename": "H",
    "no-messages": "s",
    regexp: "e",
    file: "f",
    "max-count": "m",
    "after-context": "A",
    "before-context": "B",
    context: "C",
    text: "a",
    include: "include",
    exclude: "exclude",
    "exclude-dir": "exclude-dir",
    color: "color",
    colour: "color"
  });
  const patterns = [...all.get("e") ?? []];
  for (const f of all.get("f") ?? []) {
    try {
      const text = dec3.decode(f === "-" ? await ctx.readAll(0) : ctx.vfs.readFile(ctx.resolve(f)));
      patterns.push(...text.split("\n").filter((l, i, a) => i < a.length - 1 || l !== ""));
    } catch (e) {
      ctx.err(`${name}: ${f}: ${errMsg(e)}
`);
      return 2;
    }
  }
  if (!all.has("e") && !all.has("f")) {
    if (!args.length) {
      ctx.err(`Usage: ${name} [OPTION]... PATTERNS [FILE]...
`);
      return 2;
    }
    patterns.push(...args.shift().split("\n"));
  }
  const extended = flags.has("E") || name === "egrep";
  const fixed = flags.has("F") || name === "fgrep";
  let re;
  try {
    let src = patterns.map((p) => fixed ? p.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") : flags.has("P") ? p : posixRegexToJs(p, extended)).map((p) => `(?:${p})`).join("|");
    if (!patterns.length) src = "(?!)";
    if (flags.has("w")) src = `(?<![\\w])(?:${src})(?![\\w])`;
    if (flags.has("x")) src = `^(?:${src})$`;
    re = new RegExp(src, flags.has("i") || flags.has("y") ? "i" : "");
  } catch (e) {
    ctx.err(`${name}: ${e?.message ?? "invalid regular expression"}
`);
    return 2;
  }
  const num = (k) => {
    const v = opts.get(k);
    if (v === void 0) return void 0;
    if (!/^\d+$/.test(v)) throw new Error(`${v}: invalid context length argument`);
    return Number(v);
  };
  let after;
  let before;
  try {
    after = num("A") ?? num("C") ?? 0;
    before = num("B") ?? num("C") ?? 0;
  } catch (e) {
    ctx.err(`${name}: ${e.message}
`);
    return 2;
  }
  const maxCount = opts.has("m") ? Number(opts.get("m")) : Infinity;
  const invert = flags.has("v");
  const recursive = flags.has("r") || flags.has("R");
  let files = args;
  if (recursive) {
    if (!files.length) files = ["."];
    const expanded = [];
    const include = all.get("include") ?? [];
    const exclude = all.get("exclude") ?? [];
    const excludeDir = all.get("exclude-dir") ?? [];
    const walk = (p, top) => {
      const node = ctx.vfs.tryLookup(ctx.resolve(p), top || flags.has("R"));
      if (!node) {
        if (top) expanded.push(p);
        return;
      }
      if (isDir(node)) {
        if (!top && excludeDir.some((g) => matchPattern(g, basename(p)))) return;
        for (const n of ctx.vfs.readdir(ctx.resolve(p)).sort()) walk(p === "." && !args.length ? n : join(p, n), false);
      } else if (isLink(node)) {
      } else {
        const base = basename(p);
        if (include.length && !include.some((g) => matchPattern(g, base))) return;
        if (exclude.some((g) => matchPattern(g, base))) return;
        expanded.push(p);
      }
    };
    for (const f of files) walk(f, true);
    files = expanded;
  }
  const showName = flags.has("H") || (files.length > 1 || recursive) && !flags.has("h");
  const context = (after > 0 || before > 0) && !flags.has("o");
  let matched = false;
  let printedAny = false;
  const st = await eachInput(ctx, files, name, (d, f) => {
    const label = f === "-" ? "(standard input)" : f;
    let count = 0;
    const text = dec3.decode(d);
    const lines = text.split("\n");
    if (lines[lines.length - 1] === "") lines.pop();
    if (text.includes("\0") && !flags.has("a")) {
      for (const l of lines) {
        if (re.test(l) !== invert && ++count) break;
      }
      if (count) {
        matched = true;
        if (flags.has("l")) ctx.out(label + "\n");
        else if (flags.has("c")) ctx.out((showName ? `${label}:` : "") + "1\n");
        else if (!flags.has("q") && !flags.has("L")) ctx.out(`Binary file ${label} matches
`);
      } else if (flags.has("L")) ctx.out(label + "\n");
      return;
    }
    let lastPrinted = -1;
    let afterLeft = 0;
    const emit2 = (i, sep) => {
      if (context && printedAny && (lastPrinted === -1 || i > lastPrinted + 1)) ctx.out("--\n");
      ctx.out((showName ? label + sep : "") + (flags.has("n") ? `${i + 1}${sep}` : "") + lines[i] + "\n");
      lastPrinted = i;
      printedAny = true;
    };
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      const hit = count < maxCount && re.test(l) !== invert;
      if (!hit) {
        if (afterLeft > 0) {
          emit2(i, "-");
          afterLeft--;
        } else if (count >= maxCount) break;
        continue;
      }
      matched = true;
      count++;
      if (flags.has("q")) return;
      if (flags.has("l") || flags.has("L") || flags.has("c")) {
        if (count >= maxCount || flags.has("l") || flags.has("L")) break;
        continue;
      }
      if (flags.has("o")) {
        if (invert) continue;
        const g = new RegExp(re.source, re.flags + "g");
        for (const m of l.matchAll(g)) {
          if (m[0] === "") continue;
          ctx.out((showName ? `${label}:` : "") + (flags.has("n") ? `${i + 1}:` : "") + m[0] + "\n");
        }
        continue;
      }
      for (let j = Math.max(lastPrinted + 1, i - before); j < i; j++) emit2(j, "-");
      emit2(i, ":");
      afterLeft = after;
    }
    if (flags.has("c")) ctx.out((showName ? `${label}:` : "") + count + "\n");
    if (flags.has("l") && count) ctx.out(label + "\n");
    if (flags.has("L") && !count) ctx.out(label + "\n");
  });
  if (flags.has("q") && matched) return 0;
  if (st) return 2;
  return matched ? 0 : 1;
};
var find = async (ctx) => {
  const argv = ctx.argv.slice(1);
  const roots = [];
  let i = 0;
  while (i < argv.length && !argv[i].startsWith("-") && argv[i] !== "!" && argv[i] !== "(") roots.push(argv[i++]);
  if (!roots.length) roots.push(".");
  const expr = argv.slice(i);
  let maxDepth = Infinity;
  let minDepth = 0;
  let hasAction = false;
  let k = 0;
  const parseOr = () => {
    let left = parseAnd();
    while (expr[k] === "-o" || expr[k] === "-or") {
      k++;
      const right = parseAnd();
      const l = left;
      left = (p, s, d) => l(p, s, d) || right(p, s, d);
    }
    return left;
  };
  const parseAnd = () => {
    let left = parseNot();
    while (k < expr.length && expr[k] !== "-o" && expr[k] !== "-or" && expr[k] !== ")") {
      if (expr[k] === "-a" || expr[k] === "-and") k++;
      const right = parseNot();
      const l = left;
      left = (p, s, d) => l(p, s, d) && right(p, s, d);
    }
    return left;
  };
  const parseNot = () => {
    if (expr[k] === "!" || expr[k] === "-not") {
      k++;
      const inner = parseNot();
      return (p, s, d) => !inner(p, s, d);
    }
    if (expr[k] === "(") {
      k++;
      const inner = parseOr();
      k++;
      return inner;
    }
    return parsePrim();
  };
  const parsePrim = () => {
    const t = expr[k++];
    switch (t) {
      case "-name":
      case "-iname": {
        const pat = expr[k++];
        const ci = t === "-iname";
        return (p) => matchPattern(ci ? pat.toLowerCase() : pat, ci ? basename(p).toLowerCase() : basename(p));
      }
      case "-path":
      case "-wholename": {
        const pat = expr[k++];
        return (p) => matchPattern(pat, p);
      }
      case "-type": {
        const ty = expr[k++];
        return (_p, s) => {
          const m = s.mode & S_IFMT;
          const types = { f: S_IFREG, d: S_IFDIR, l: S_IFLNK, p: S_IFIFO, s: S_IFSOCK, c: S_IFCHR, b: S_IFBLK };
          return ty.split(",").some((t2) => types[t2] === m);
        };
      }
      case "-maxdepth":
        maxDepth = Number(expr[k++]);
        return () => true;
      case "-mindepth":
        minDepth = Number(expr[k++]);
        return () => true;
      case "-empty":
        return (p, s) => (s.mode & S_IFMT) === S_IFDIR ? ctx.vfs.readdir(ctx.resolve(p)).length === 0 : (s.mode & S_IFMT) === S_IFREG && s.size === 0;
      case "-newer": {
        const ref = ctx.vfs.stat(ctx.resolve(expr[k++])).mtimeMs;
        return (_p, s) => s.mtimeMs > ref;
      }
      case "-size": {
        const spec = expr[k++];
        const m = /^([+-]?)(\d+)([ckMG]?)$/.exec(spec);
        const mult = { c: 1, k: 1024, M: 1 << 20, G: 1 << 30, "": 512 }[m?.[3] ?? ""] ?? 512;
        const n = Number(m?.[2] ?? 0) * mult;
        return (_p, s) => m?.[1] === "+" ? s.size > n : m?.[1] === "-" ? s.size < n : Math.ceil(s.size / mult) * mult === n;
      }
      case "-print":
        hasAction = true;
        return (p) => {
          ctx.out(p + "\n");
          return true;
        };
      case "-print0":
        hasAction = true;
        return (p) => {
          ctx.out(p + "\0");
          return true;
        };
      case "-prune":
        return () => {
          prune = true;
          return true;
        };
      case "-delete":
        hasAction = true;
        return (p) => {
          deletions.push(p);
          return true;
        };
      case "-exec": {
        hasAction = true;
        const cmd = [];
        while (k < expr.length && expr[k] !== ";" && !(expr[k] === "+" && expr[k - 1] === "{}")) cmd.push(expr[k++]);
        if (k >= expr.length) throw new Error("missing argument to `-exec'");
        const batch = expr[k++] === "+";
        if (batch) {
          const run = { argv: cmd.slice(0, -1), paths: [] };
          batches.push(run);
          return (p) => {
            run.paths.push(p);
            return true;
          };
        }
        return (p) => {
          execs.push(cmd.map((c) => c.split("{}").join(p)));
          return true;
        };
      }
      case "-true":
        return () => true;
      case "-false":
        return () => false;
      default:
        throw new Error(`unknown predicate '${t}'`);
    }
  };
  let pred;
  let prune = false;
  const deletions = [];
  const execs = [];
  const batches = [];
  try {
    pred = expr.length ? parseOr() : () => true;
  } catch (e) {
    ctx.err(`find: ${e.message}
`);
    return 1;
  }
  let st = 0;
  const visit = (display, abs, depth) => {
    let s;
    try {
      s = ctx.vfs.lstat(abs);
    } catch (e) {
      ctx.err(`find: '${display}': ${errMsg(e)}
`);
      st = 1;
      return;
    }
    prune = false;
    if (depth >= minDepth) {
      const ok = pred(display, s, depth);
      if (ok && !hasAction) ctx.out(display + "\n");
    }
    if ((s.mode & S_IFMT) === S_IFDIR && depth < maxDepth && !prune) {
      for (const n of ctx.vfs.readdir(abs).sort()) visit(display.endsWith("/") ? display + n : `${display}/${n}`, join(abs, n), depth + 1);
    }
  };
  for (const r of roots) visit(r, ctx.resolve(r), 0);
  for (const d of deletions.reverse()) {
    try {
      ctx.vfs.rmrf(ctx.resolve(d));
    } catch {
    }
  }
  for (const c of execs) {
    const code = await ctx.run(c);
    if (code) st = 1;
  }
  for (const b of batches) {
    if (!b.paths.length) continue;
    const code = await ctx.run([...b.argv, ...b.paths]);
    if (code) st = 1;
  }
  return st;
};
var sort = async (ctx) => {
  const { flags, opts, args } = getopt(ctx.argv.slice(1), "tko");
  const lines = [];
  const st = await eachLine(ctx, args, "sort", (l) => {
    lines.push(l);
  });
  const sep = opts.get("t");
  const keySpec = opts.get("k");
  const key = (l) => {
    if (!keySpec) return l;
    const n = parseInt(keySpec, 10) - 1;
    const fields = sep ? l.split(sep) : l.trim().split(/\s+/);
    return fields.slice(n).join(sep ?? " ");
  };
  const numeric = flags.has("n") || flags.has("h");
  lines.sort((a, b) => {
    const ka = key(a);
    const kb = key(b);
    let c;
    if (numeric) c = (parseFloat(ka) || 0) - (parseFloat(kb) || 0);
    else if (flags.has("f")) c = ka.toLowerCase() < kb.toLowerCase() ? -1 : ka.toLowerCase() > kb.toLowerCase() ? 1 : 0;
    else c = ka < kb ? -1 : ka > kb ? 1 : 0;
    return c;
  });
  if (flags.has("r")) lines.reverse();
  let out = flags.has("u") ? lines.filter((l, i) => i === 0 || l !== lines[i - 1]) : lines;
  void out;
  const text = out.map((l) => l + "\n").join("");
  if (opts.has("o")) ctx.vfs.writeFile(ctx.resolve(opts.get("o")), text);
  else ctx.out(text);
  return st;
};
var uniq = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  const lines = [];
  const st = await eachLine(ctx, args.slice(0, 1), "uniq", (l) => {
    lines.push(l);
  });
  const groups = [];
  for (const l of lines) {
    const last = groups[groups.length - 1];
    const eq = last && (flags.has("i") ? last[0].toLowerCase() === l.toLowerCase() : last[0] === l);
    if (eq) last[1]++;
    else groups.push([l, 1]);
  }
  for (const [l, n] of groups) {
    if (flags.has("d") && n < 2) continue;
    if (flags.has("u") && n > 1) continue;
    ctx.out((flags.has("c") ? `${String(n).padStart(7)} ` : "") + l + "\n");
  }
  return st;
};
var cut = async (ctx) => {
  const { opts, args } = getopt(ctx.argv.slice(1), "dfcb");
  const delim = opts.get("d") ?? "	";
  const listSpec = opts.get("f") ?? opts.get("c") ?? opts.get("b") ?? "";
  const ranges = listSpec.split(",").map((r) => {
    const [a, b] = r.split("-");
    const from = a ? Number(a) : 1;
    const to = r.includes("-") ? b ? Number(b) : Infinity : from;
    return [from, to];
  });
  const want = (i) => ranges.some(([a, b]) => i >= a && i <= b);
  return eachLine(ctx, args, "cut", (l) => {
    if (opts.has("f")) {
      if (!l.includes(delim)) {
        ctx.out(l + "\n");
        return;
      }
      ctx.out(l.split(delim).filter((_, i) => want(i + 1)).join(delim) + "\n");
    } else ctx.out([...l].filter((_, i) => want(i + 1)).join("") + "\n");
  });
};
function expandTrSet(s) {
  const out = [];
  const classes = {
    "[:lower:]": "abcdefghijklmnopqrstuvwxyz",
    "[:upper:]": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "[:digit:]": "0123456789",
    "[:space:]": " 	\n\r\f\v",
    "[:alpha:]": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "[:alnum:]": "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  };
  for (let i = 0; i < s.length; i++) {
    const cls = Object.keys(classes).find((k) => s.startsWith(k, i));
    if (cls) {
      out.push(...classes[cls]);
      i += cls.length - 1;
      continue;
    }
    let c = s[i];
    if (c === "\\") {
      const n = s[++i];
      c = n === "n" ? "\n" : n === "t" ? "	" : n === "r" ? "\r" : n === "\\" ? "\\" : n;
    }
    if (s[i + 1] === "-" && i + 2 < s.length) {
      const end = s[i + 2];
      for (let x = c.charCodeAt(0); x <= end.charCodeAt(0); x++) out.push(String.fromCharCode(x));
      i += 2;
      continue;
    }
    out.push(c);
  }
  return out;
}
var tr = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1), "", { complement: "c", delete: "d", "squeeze-repeats": "s", truncate: "t" });
  const complement = flags.has("c") || flags.has("C");
  const del = flags.has("d");
  const set1 = expandTrSet(args[0] ?? "");
  const set2 = expandTrSet(args[1] ?? "");
  if (!args.length || !del && !flags.has("s") && args.length < 2) {
    ctx.err(args.length ? `tr: missing operand after '${args[0]}'
` : "tr: missing operand\n");
    return 1;
  }
  if (flags.has("t") && !complement) set1.splice(set2.length);
  const inSet1 = (c) => set1.includes(c) !== complement;
  const translating = !del && set2.length > 0;
  const map = (c) => {
    if (!translating || !inSet1(c)) return c;
    if (complement) return set2[set2.length - 1];
    return set2[Math.min(set1.lastIndexOf(c), set2.length - 1)];
  };
  const squeezeSet = del || translating ? set2 : null;
  const inSqueeze = (c) => squeezeSet ? squeezeSet.includes(c) : inSet1(c);
  const text = await ctx.readAllText(0);
  let out = "";
  let prev = null;
  for (const c of text) {
    if (del && inSet1(c)) continue;
    const r = map(c);
    if (flags.has("s") && r === prev && inSqueeze(r)) continue;
    out += r;
    prev = r;
  }
  ctx.out(out);
  return 0;
};
function compileSedReplacement(rep) {
  const out = [];
  for (let i = 0; i < rep.length; i++) {
    const c = rep[i];
    if (c === "&") out.push({ group: 0 });
    else if (c === "\\" && i + 1 < rep.length) {
      const n = rep[i + 1];
      const e = sedEscape(rep, i);
      if (/[0-9]/.test(n)) out.push({ group: Number(n) });
      else if ("ULulE".includes(n)) out.push({ conv: n });
      else if (e) {
        out.push({ lit: e.ch });
        i += e.len - 1;
        continue;
      } else out.push({ lit: n });
      i++;
    } else out.push({ lit: c });
  }
  return out;
}
function applySedReplacement(rep, groups) {
  let out = "";
  let mode = null;
  let once = null;
  const add2 = (s) => {
    if (mode === "U") s = s.toUpperCase();
    else if (mode === "L") s = s.toLowerCase();
    if (once && s) {
      s = (once === "u" ? s[0].toUpperCase() : s[0].toLowerCase()) + s.slice(1);
      once = null;
    }
    out += s;
  };
  for (const r of rep) {
    if ("lit" in r) add2(r.lit);
    else if ("group" in r) add2(groups[r.group] ?? "");
    else if (r.conv === "U" || r.conv === "L") mode = r.conv;
    else if (r.conv === "E") mode = null;
    else once = r.conv;
  }
  return out;
}
var sed = async (ctx) => {
  const argv = ctx.argv.slice(1);
  const scripts = [];
  const files = [];
  let quiet = false;
  let inPlace = null;
  let extended = false;
  const operands = [];
  let scriptGiven = false;
  try {
    for (let i = 0; i < argv.length; i++) {
      const a = argv[i];
      if (a === "--") {
        operands.push(...argv.slice(i + 1));
        break;
      }
      if (a.startsWith("--")) {
        const eq = a.indexOf("=");
        const name = eq > 0 ? a.slice(2, eq) : a.slice(2);
        const val = eq > 0 ? a.slice(eq + 1) : void 0;
        if (name === "quiet" || name === "silent") quiet = true;
        else if (name === "regexp-extended") extended = true;
        else if (name === "in-place") inPlace = val ?? "";
        else if (name === "expression") {
          scripts.push(val ?? argv[++i] ?? "");
          scriptGiven = true;
        } else if (name === "file") {
          scripts.push(dec3.decode(ctx.vfs.readFile(ctx.resolve(val ?? argv[++i] ?? ""))).replace(/\n$/, ""));
          scriptGiven = true;
        }
        continue;
      }
      if (a.startsWith("-") && a.length > 1) {
        for (let j = 1; j < a.length; j++) {
          const c = a[j];
          if (c === "n") quiet = true;
          else if (c === "E" || c === "r") extended = true;
          else if (c === "i") {
            inPlace = a.slice(j + 1);
            break;
          } else if (c === "e" || c === "f") {
            const v = j + 1 < a.length ? a.slice(j + 1) : argv[++i] ?? "";
            scripts.push(c === "e" ? v : dec3.decode(ctx.vfs.readFile(ctx.resolve(v))).replace(/\n$/, ""));
            scriptGiven = true;
            break;
          } else if (!"suz".includes(c)) throw new Error(`invalid option -- '${c}'`);
        }
        continue;
      }
      operands.push(a);
    }
  } catch (e) {
    ctx.err(`sed: ${e.code ? errMsg(e) : e.message}
`);
    return 1;
  }
  if (!scriptGiven) {
    if (!operands.length) {
      ctx.err("Usage: sed [OPTION]... {script-only-if-no-other-script} [input-file]...\n");
      return 1;
    }
    scripts.push(operands.shift());
  }
  files.push(...operands);
  const cmds = [];
  const toRe = (src, flagsStr = "") => new RegExp(posixRegexToJs(src, extended, true), flagsStr);
  const script = scripts.join("\n");
  let p = 0;
  const readDelimited = (delim) => {
    let out = "";
    while (p < script.length && script[p] !== delim) {
      if (script[p] === "\\" && script[p + 1] === delim) {
        out += delim;
        p += 2;
        continue;
      }
      if (script[p] === "\\" && script[p + 1] === "n") {
        out += "\n";
        p += 2;
        continue;
      }
      if (script[p] === "\\" && p + 1 < script.length) {
        out += script.slice(p, p + 2);
        p += 2;
        continue;
      }
      out += script[p++];
    }
    if (p >= script.length) throw new Error(`unterminated expression (missing '${delim}')`);
    p++;
    return out;
  };
  const readAddr = () => {
    if (/\d/.test(script[p])) {
      const m = /^\d+/.exec(script.slice(p));
      p += m[0].length;
      return { line: Number(m[0]) };
    }
    if (script[p] === "$") {
      p++;
      return { last: true };
    }
    if (script[p] === "/" || script[p] === "\\") {
      const d = script[p] === "\\" ? script[++p] : "/";
      p++;
      const src = readDelimited(d);
      let fl = "";
      if (script[p] === "I") {
        fl = "i";
        p++;
      }
      return { re: toRe(src, fl) };
    }
    return void 0;
  };
  try {
    while (p < script.length) {
      while (p < script.length && /[\s;]/.test(script[p])) p++;
      if (p >= script.length) break;
      const cmd = { neg: false, c: "" };
      cmd.a1 = readAddr();
      if (cmd.a1 && script[p] === ",") {
        p++;
        cmd.a2 = readAddr();
      }
      while (script[p] === " ") p++;
      if (script[p] === "!") {
        cmd.neg = true;
        p++;
      }
      cmd.c = script[p++];
      if (cmd.c === "s") {
        const d = script[p++];
        const pat = readDelimited(d);
        let rep = readDelimited(d);
        let fl = "";
        while (p < script.length && /[gipI0-9]/.test(script[p])) {
          const f = script[p++];
          if (f === "g") cmd.global = true;
          else if (f === "i" || f === "I") fl += "i";
          else if (f === "p") cmd.print = true;
          else cmd.nth = Number(f);
        }
        cmd.re = toRe(pat, fl + "g");
        cmd.rep = compileSedReplacement(rep);
      } else if (cmd.c === "y") {
        const d = script[p++];
        cmd.from = readDelimited(d);
        cmd.to = readDelimited(d);
      } else if (cmd.c === "a" || cmd.c === "i" || cmd.c === "c") {
        if (script[p] === "\\") p++;
        if (script[p] === "\n") p++;
        while (script[p] === " ") p++;
        let end = script.indexOf("\n", p);
        if (end === -1) end = script.length;
        cmd.text = script.slice(p, end);
        p = end;
      } else if (cmd.c === "{" || cmd.c === "}") {
      }
      cmds.push(cmd);
    }
  } catch (e) {
    ctx.err(`sed: ${e.message}
`);
    return 1;
  }
  const processText = (text) => {
    const lines = text.split("\n");
    const trailing = lines[lines.length - 1] === "";
    if (trailing) lines.pop();
    let out = "";
    const matchAddr = (a, n, l, isLast) => a.line !== void 0 ? n === a.line : a.last ? isLast : a.re.test(l);
    for (let n = 1; n <= lines.length; n++) {
      let line = lines[n - 1];
      const isLast = n === lines.length;
      let deleted = false;
      let append = "";
      let quit = false;
      for (const c of cmds) {
        let sel = true;
        if (c.a1 && c.a2) {
          if (c.inRange) {
            sel = true;
            if (matchAddr(c.a2, n, line, isLast) || c.a2.line !== void 0 && n >= c.a2.line) c.inRange = false;
          } else if (matchAddr(c.a1, n, line, isLast)) {
            sel = true;
            c.inRange = !(c.a2.line !== void 0 && c.a2.line <= n);
          } else sel = false;
        } else if (c.a1) sel = matchAddr(c.a1, n, line, isLast);
        if (c.neg) sel = !sel;
        if (!sel) continue;
        switch (c.c) {
          case "s": {
            let count = 0;
            let did = false;
            c.re.lastIndex = 0;
            line = line.replace(c.re, (...m) => {
              count++;
              if (c.nth && count !== c.nth || !c.global && !c.nth && count > 1) return m[0];
              did = true;
              const groups = m.slice(1, -2);
              return applySedReplacement(c.rep, [m[0], ...groups]);
            });
            if (did && c.print) out += line + "\n";
            break;
          }
          case "d":
            deleted = true;
            break;
          case "p":
            out += line + "\n";
            break;
          case "=":
            out += n + "\n";
            break;
          case "q":
            quit = true;
            break;
          case "y":
            line = [...line].map((ch) => {
              const i = c.from.indexOf(ch);
              return i === -1 ? ch : c.to[i];
            }).join("");
            break;
          case "a":
            append += c.text + "\n";
            break;
          case "i":
            out += c.text + "\n";
            break;
          case "c":
            out += c.text + "\n";
            deleted = true;
            break;
        }
        if (deleted || quit) break;
      }
      if (!deleted && !quiet) out += line + (isLast && !trailing ? "" : "\n");
      out += append;
      if (quit) break;
    }
    return out;
  };
  if (inPlace !== null) {
    for (const f of files) {
      const abs = ctx.resolve(f);
      const text = dec3.decode(ctx.vfs.readFile(abs));
      if (inPlace) ctx.vfs.writeFile(abs + inPlace, text);
      ctx.vfs.writeFile(abs, processText(text));
    }
    return 0;
  }
  let all = "";
  const st = await eachInput(ctx, files, "sed", (d) => {
    all += dec3.decode(d);
  });
  ctx.out(processText(all));
  return st;
};
function xargsItems(input) {
  const out = [];
  let cur = null;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === "'" || c === '"') {
      const end = input.indexOf(c, i + 1);
      if (end === -1) throw new Error(`unmatched ${c === '"' ? "double" : "single"} quote; by default quotes are special to xargs unless you use the -0 option`);
      cur = (cur ?? "") + input.slice(i + 1, end);
      i = end;
    } else if (c === "\\" && i + 1 < input.length) cur = (cur ?? "") + input[++i];
    else if (/\s/.test(c)) {
      if (cur !== null) out.push(cur);
      cur = null;
    } else cur = (cur ?? "") + c;
  }
  if (cur !== null) out.push(cur);
  return out;
}
var xargs = async (ctx) => {
  const { flags, opts, args } = getopt(ctx.argv.slice(1), "nIdPLsEa", { null: "0", "no-run-if-empty": "r", "max-args": "n", delimiter: "d", replace: "I", "max-lines": "L", "max-procs": "P", verbose: "t", "arg-file": "a" }, true);
  let input;
  try {
    input = opts.has("a") ? dec3.decode(ctx.vfs.readFile(ctx.resolve(opts.get("a")))) : await ctx.readAllText(0);
  } catch (e) {
    ctx.err(`xargs: ${opts.get("a")}: ${errMsg(e)}
`);
    return 1;
  }
  const repl = opts.get("I") ?? (flags.has("i") ? "{}" : void 0);
  let items;
  try {
    if (flags.has("0")) items = input.split("\0");
    else if (opts.has("d")) items = input.split(sedEscape(opts.get("d"), 0)?.ch ?? opts.get("d")[0]);
    else if (repl !== void 0) items = input.split("\n").map((l) => l.replace(/^[ \t]+/, "")).filter((l) => l !== "");
    else items = xargsItems(input);
  } catch (e) {
    ctx.err(`xargs: ${e.message}
`);
    return 1;
  }
  if ((flags.has("0") || opts.has("d")) && items[items.length - 1] === "") items.pop();
  const cmd = args.length ? args : ["echo"];
  const groups = [];
  if (repl !== void 0) for (const it of items) groups.push(cmd.map((c) => c.split(repl).join(it)));
  else {
    const n = opts.has("n") ? Math.max(1, Number(opts.get("n"))) : opts.has("L") ? Math.max(1, Number(opts.get("L"))) : items.length || 1;
    if (!items.length && !flags.has("r")) groups.push(cmd);
    for (let i = 0; i < items.length; i += n) groups.push([...cmd, ...items.slice(i, i + n)]);
  }
  let st = 0;
  for (const g of groups) {
    if (flags.has("t")) ctx.err(g.join(" ") + "\n");
    const p = spawnCommand(ctx, "xargs", g);
    if (typeof p === "number") return p;
    const res = await p.exited;
    if (res.signal) {
      ctx.err(`xargs: ${g[0]}: terminated by signal ${SIGNALS[res.signal] ?? 15}
`);
      return 125;
    }
    if (res.code === 255) {
      ctx.err(`xargs: ${g[0]}: exited with status 255; aborting
`);
      return 124;
    }
    if (res.code) st = 123;
  }
  return st;
};
var tee = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  const files = args.map((f) => ctx.kernel.openFile(ctx.proc, f, 1 | 64 | (flags.has("a") ? 1024 : 512)));
  try {
    for (; ; ) {
      const d = await ctx.read(0);
      if (!d) break;
      ctx.out(d);
      for (const f of files) f.write(d);
    }
  } finally {
    for (const f of files) f.unref();
  }
  return 0;
};
var env = async (ctx) => {
  const argv = ctx.argv.slice(1);
  const e = { ...ctx.env };
  let i = 0;
  let clear2 = false;
  let chdir;
  for (; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-i" || a === "-" || a === "--ignore-environment") clear2 = true;
    else if (a === "-u" || a === "--unset") delete e[argv[++i]];
    else if (/^-u./.test(a) || a.startsWith("--unset=")) delete e[a.slice(a.startsWith("-u") ? 2 : 8)];
    else if (a === "-C" || a === "--chdir") chdir = argv[++i];
    else if (a === "--") {
      i++;
      break;
    } else if (a === "-S") {
      const rest = argv.slice(i + 1).join(" ").split(/\s+/);
      argv.splice(i, argv.length - i, ...rest);
      i--;
    } else if (a.includes("=") && !a.startsWith("=")) {
      const eq = a.indexOf("=");
      e[a.slice(0, eq)] = a.slice(eq + 1);
    } else break;
  }
  const env2 = clear2 ? Object.fromEntries(Object.entries(e).filter(([k]) => argv.slice(0, i).some((a) => a.startsWith(k + "=")))) : e;
  if (i >= argv.length) {
    for (const [k, v] of Object.entries(env2)) ctx.out(`${k}=${v}
`);
    return 0;
  }
  return runCommand(ctx, "env", argv.slice(i), { env: env2, cwd: chdir === void 0 ? void 0 : ctx.resolve(chdir) });
};
var which = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  let st = 0;
  for (const a of args) {
    if (flags.has("a")) {
      let found = false;
      for (const dir of (ctx.env.PATH ?? "").split(":")) {
        const p2 = join(dir, a);
        const n = ctx.vfs.tryLookup(p2);
        if (n && !isDir(n) && n.mode & 73) {
          ctx.out(p2 + "\n");
          found = true;
        }
      }
      if (!found) st = 1;
      continue;
    }
    const p = ctx.kernel.which(a, ctx.env, ctx.cwd);
    if (p) ctx.out(p + "\n");
    else st = 1;
  }
  return st;
};
var basename2 = async (ctx) => {
  const { flags, opts, args } = getopt(ctx.argv.slice(1), "s");
  if (flags.has("a") || opts.has("s")) {
    for (const a of args) ctx.out(basename(a, opts.get("s")) + "\n");
  } else ctx.out(basename(args[0] ?? "", args[1]) + "\n");
  return 0;
};
var dirname2 = async (ctx) => {
  for (const a of ctx.argv.slice(1)) ctx.out(dirname(a) + "\n");
  return 0;
};
var realpath = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  let st = 0;
  for (const a of args) {
    try {
      ctx.out(ctx.vfs.realpath(ctx.resolve(a)) + "\n");
    } catch (e) {
      if (flags.has("m")) ctx.out(ctx.resolve(a) + "\n");
      else {
        ctx.err(`realpath: ${a}: ${errMsg(e)}
`);
        st = 1;
      }
    }
  }
  return st;
};
var readlink = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  let st = 0;
  for (const a of args) {
    try {
      if (flags.has("f") || flags.has("e") || flags.has("m")) ctx.out(ctx.vfs.realpath(ctx.resolve(a)) + "\n");
      else ctx.out(ctx.vfs.readlink(ctx.resolve(a)) + "\n");
    } catch {
      st = 1;
    }
  }
  return st;
};
function fileTypeName(s) {
  switch (s.mode & S_IFMT) {
    case S_IFDIR:
      return "directory";
    case S_IFLNK:
      return "symbolic link";
    case S_IFIFO:
      return "fifo";
    case S_IFSOCK:
      return "socket";
    case S_IFCHR:
      return "character special file";
    case S_IFBLK:
      return "block special file";
    default:
      return s.size ? "regular file" : "regular empty file";
  }
}
var stat = async (ctx) => {
  const argv = ctx.argv.slice(1).flatMap((a, i, arr) => a === "--printf" || a === "--format" ? [] : arr[i - 1] === "--printf" || arr[i - 1] === "--format" ? [`${arr[i - 1]}=${a}`] : [a]);
  const { opts, args, flags } = getopt(argv, "c", { format: "c", dereference: "L", "file-system": "f", terse: "t" });
  if (!args.length) {
    ctx.err("stat: missing operand\n");
    return 1;
  }
  const printf = opts.get("printf");
  const fmt = printf ?? opts.get("c");
  const tz = ctx.env.TZ;
  const time = (ms) => strftime("%Y-%m-%d %H:%M:%S.%N %z", new Date(Math.floor(ms)), tz, Math.round(ms % 1e3 * 1e6));
  const escapes = (f) => f.replace(/\\(n|t|\\|"|0)/g, (_m, c) => ({ n: "\n", t: "	", "\\": "\\", '"': '"', "0": "\0" })[c]);
  let st = 0;
  for (const a of args) {
    let s;
    try {
      s = flags.has("L") || flags.has("f") ? ctx.vfs.stat(ctx.resolve(a)) : ctx.vfs.lstat(ctx.resolve(a));
    } catch (e) {
      ctx.err(`stat: cannot ${flags.has("f") ? "read file system information for" : "stat"} '${a}': ${errMsg(e)}
`);
      st = 1;
      continue;
    }
    if (flags.has("f")) {
      const fs = { n: a, i: "0", l: "255", t: "1021994", T: "tmpfs", s: "4096", S: "4096", b: "1048576", f: "1048576", a: "1048576", c: "0", d: "0" };
      if (fmt !== void 0) ctx.out((printf !== void 0 ? escapes(fmt) : fmt).replace(/%([a-zA-Z%])/g, (_m, c) => c === "%" ? "%" : fs[c] ?? "?") + (printf !== void 0 ? "" : "\n"));
      else ctx.out(`  File: "${a}"
    ID: 0        Namelen: 255     Type: tmpfs
Block size: 4096       Fundamental block size: 4096
Blocks: Total: 1048576    Free: 1048576    Available: 1048576
Inodes: Total: 0          Free: 0
`);
      continue;
    }
    const isLnk = (s.mode & S_IFMT) === S_IFLNK;
    const quoted = () => isLnk ? `'${a}' -> '${ctx.vfs.readlink(ctx.resolve(a))}'` : `'${a}'`;
    const field = (c) => {
      switch (c) {
        case "a":
          return (s.mode & 4095).toString(8);
        case "A":
          return modeString(s.mode);
        case "b":
          return String(s.blocks);
        case "B":
          return "512";
        case "d":
          return String(s.dev);
        case "D":
          return s.dev.toString(16);
        case "f":
          return s.mode.toString(16);
        case "F":
          return fileTypeName(s);
        case "g":
          return String(s.gid);
        case "G":
          return "user";
        case "h":
          return String(s.nlink);
        case "i":
          return String(s.ino);
        case "n":
          return a;
        case "N":
          return quoted();
        case "o":
          return String(s.blksize);
        case "s":
          return String(s.size);
        case "t":
          return (s.rdev >> 8 & 4095).toString(16);
        case "T":
          return (s.rdev & 255).toString(16);
        case "u":
          return String(s.uid);
        case "U":
          return "user";
        case "w":
          return time(s.birthtimeMs);
        case "W":
          return String(Math.floor(s.birthtimeMs / 1e3));
        case "x":
          return time(s.atimeMs);
        case "X":
          return String(Math.floor(s.atimeMs / 1e3));
        case "y":
          return time(s.mtimeMs);
        case "Y":
          return String(Math.floor(s.mtimeMs / 1e3));
        case "z":
          return time(s.ctimeMs);
        case "Z":
          return String(Math.floor(s.ctimeMs / 1e3));
        case "%":
          return "%";
        default:
          return "?";
      }
    };
    if (fmt !== void 0) {
      ctx.out((printf !== void 0 ? escapes(fmt) : fmt).replace(/%([a-zA-Z%])/g, (_m, c) => field(c)) + (printf !== void 0 ? "" : "\n"));
      continue;
    }
    if (flags.has("t")) {
      ctx.out(`${a} ${s.size} ${s.blocks} ${s.mode.toString(16)} ${s.uid} ${s.gid} ${s.dev.toString(16)} ${s.ino} ${s.nlink} 0 0 ${field("X")} ${field("Y")} ${field("Z")} ${field("W")} ${s.blksize}
`);
      continue;
    }
    ctx.out(
      `  File: ${isLnk ? quoted().replace(/'/g, "") : a}
  Size: ${String(s.size).padEnd(15)} Blocks: ${String(s.blocks).padEnd(10)} IO Block: ${String(s.blksize).padEnd(6)} ${fileTypeName(s)}
Device: ${s.dev.toString(16)}h/${s.dev}d	Inode: ${String(s.ino).padEnd(11)} Links: ${s.nlink}
Access: (${(s.mode & 4095).toString(8).padStart(4, "0")}/${modeString(s.mode)})  Uid: ( ${String(s.uid).padStart(4)}/    user)   Gid: ( ${String(s.gid).padStart(4)}/    user)
Access: ${time(s.atimeMs)}
Modify: ${time(s.mtimeMs)}
Change: ${time(s.ctimeMs)}
 Birth: ${time(s.birthtimeMs)}
`
    );
  }
  return st;
};
var du = async (ctx) => {
  const { flags, args, opts } = getopt(ctx.argv.slice(1), "d", { "max-depth": "d" });
  const targets2 = args.length ? args : ["."];
  const maxDepth = flags.has("s") ? 0 : opts.has("d") ? Number(opts.get("d")) : Infinity;
  const fmt = (n) => flags.has("h") ? humanSize(n) : String(Math.ceil(n / 1024));
  const walk = (disp, abs, depth) => {
    const s = ctx.vfs.lstat(abs);
    let total = (s.mode & S_IFMT) === S_IFDIR ? 4096 : s.size;
    if ((s.mode & S_IFMT) === S_IFDIR) {
      for (const n of ctx.vfs.readdir(abs)) total += walk(`${disp}/${n}`, join(abs, n), depth + 1);
      if (depth <= maxDepth) ctx.out(`${fmt(total)}	${disp}
`);
    } else if (flags.has("a") && depth <= maxDepth) ctx.out(`${fmt(total)}	${disp}
`);
    return total;
  };
  for (const t of targets2) {
    try {
      const total = walk(t, ctx.resolve(t), 0);
      if (!isDir(ctx.vfs.lookup(ctx.resolve(t), false))) ctx.out(`${fmt(total)}	${t}
`);
    } catch (e) {
      ctx.err(`du: ${t}: ${errMsg(e)}
`);
    }
  }
  return 0;
};
var ZONE_ABBR = {
  "Asia/Tokyo": ["JST"],
  Japan: ["JST"],
  "Asia/Seoul": ["KST"],
  "Asia/Shanghai": ["CST"],
  "Asia/Taipei": ["CST"],
  "Asia/Hong_Kong": ["HKT"],
  "Asia/Kolkata": ["IST"],
  "Asia/Calcutta": ["IST"],
  "Asia/Jakarta": ["WIB"],
  "Asia/Manila": ["PST"],
  "Europe/Moscow": ["MSK"],
  "Europe/Berlin": ["CET", "CEST"],
  "Europe/Paris": ["CET", "CEST"],
  "Europe/Madrid": ["CET", "CEST"],
  "Europe/Rome": ["CET", "CEST"],
  "Europe/Amsterdam": ["CET", "CEST"],
  "Europe/Brussels": ["CET", "CEST"],
  "Europe/Vienna": ["CET", "CEST"],
  "Europe/Zurich": ["CET", "CEST"],
  "Europe/Stockholm": ["CET", "CEST"],
  "Europe/Oslo": ["CET", "CEST"],
  "Europe/Copenhagen": ["CET", "CEST"],
  "Europe/Prague": ["CET", "CEST"],
  "Europe/Warsaw": ["CET", "CEST"],
  "Europe/Helsinki": ["EET", "EEST"],
  "Europe/Athens": ["EET", "EEST"],
  "Europe/Kyiv": ["EET", "EEST"],
  "Europe/Kiev": ["EET", "EEST"],
  "Europe/Lisbon": ["WET", "WEST"],
  "Australia/Sydney": ["AEST", "AEDT"],
  "Australia/Melbourne": ["AEST", "AEDT"],
  "Australia/Brisbane": ["AEST"],
  "Australia/Adelaide": ["ACST", "ACDT"],
  "Australia/Perth": ["AWST"],
  "Pacific/Auckland": ["NZST", "NZDT"]
};
function zoneOffset(min, style) {
  const a = Math.abs(min);
  const h = String(Math.floor(a / 60)).padStart(2, "0");
  const m = String(a % 60).padStart(2, "0");
  const sign = min < 0 ? "-" : "+";
  if (style === "name") return sign + h + (a % 60 ? m : "");
  return sign + h + (style === ":z" ? ":" : "") + m;
}
function wallClock(t, tz) {
  const name = tz?.replace(/^:/, "");
  let iana;
  if (name === void 0) iana = Intl.DateTimeFormat().resolvedOptions().timeZone;
  else if (name) {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: name });
      iana = name;
    } catch {
    }
  }
  if (iana) {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: iana, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
    const offsetAt = (at) => {
      const p = Object.fromEntries(fmt.formatToParts(at).map((x) => [x.type, x.value]));
      return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(at.getTime() / 1e3) * 1e3) / 6e4);
    };
    const offset2 = offsetAt(t);
    let zone = new Intl.DateTimeFormat("en-US", { timeZone: iana, timeZoneName: "short" }).formatToParts(t).find((x) => x.type === "timeZoneName")?.value ?? "";
    if (/^GMT[+-]/.test(zone) || zone === "GMT" && offset2 !== 0 || !zone) {
      const y = t.getUTCFullYear();
      const dst = offset2 > Math.min(offsetAt(new Date(Date.UTC(y, 0, 1))), offsetAt(new Date(Date.UTC(y, 6, 1))));
      const known = ZONE_ABBR[iana];
      zone = known && (dst ? known[1] : known[0]) || zoneOffset(offset2, "name");
    }
    if (/^(Etc\/)?(UTC|UCT|Universal|Zulu)$/.test(iana)) zone = "UTC";
    return { d: new Date(t.getTime() + offset2 * 6e4), offset: offset2, zone };
  }
  const m = /^([A-Za-z]{3,}|<[^>]+>)(?:([+-]?)(\d{1,2})(?::(\d{2}))?)?/.exec(name ?? "");
  const offset = m?.[3] ? (m[2] === "-" ? 1 : -1) * (Number(m[3]) * 60 + Number(m[4] ?? 0)) : 0;
  return { d: new Date(t.getTime() + offset * 6e4), offset, zone: m ? m[1].replace(/^<|>$/g, "") : "UTC" };
}
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function strftime(fmt, t, tz, nanos = t.getTime() % 1e3 * 1e6) {
  const { d, offset, zone } = wallClock(t, tz);
  const Y = d.getUTCFullYear();
  const mo = d.getUTCMonth();
  const day = d.getUTCDate();
  const H = d.getUTCHours();
  const wd = d.getUTCDay();
  const yday = Math.floor((Date.UTC(Y, mo, day) - Date.UTC(Y, 0, 1)) / 864e5);
  const thursday = new Date(Date.UTC(Y, mo, day + 3 - (wd + 6) % 7));
  const isoYear = thursday.getUTCFullYear();
  const isoWeek = 1 + Math.floor((thursday.getTime() - Date.UTC(isoYear, 0, 1)) / (7 * 864e5));
  return fmt.replace(/%([-_0^#]*)(\d*)(:{0,3})([a-zA-Z%+])/g, (whole, fl, width, colons, c) => {
    let v;
    let pad = "0";
    let w = 2;
    switch (c) {
      case "a":
        v = DAYS[wd].slice(0, 3);
        w = 0;
        break;
      case "A":
        v = DAYS[wd];
        w = 0;
        break;
      case "b":
      case "h":
        v = MONTH_NAMES[mo].slice(0, 3);
        w = 0;
        break;
      case "B":
        v = MONTH_NAMES[mo];
        w = 0;
        break;
      case "c":
        v = strftime("%a %b %e %H:%M:%S %Y", t, tz);
        w = 0;
        break;
      case "C":
        v = Math.floor(Y / 100);
        break;
      case "d":
        v = day;
        break;
      case "D":
      case "x":
        v = strftime("%m/%d/%y", t, tz);
        w = 0;
        break;
      case "e":
        v = day;
        pad = " ";
        break;
      case "F":
        v = strftime("%Y-%m-%d", t, tz);
        w = 0;
        break;
      case "g":
        v = isoYear % 100;
        break;
      case "G":
        v = isoYear;
        w = 4;
        break;
      case "H":
        v = H;
        break;
      case "I":
        v = H % 12 || 12;
        break;
      case "j":
        v = yday + 1;
        w = 3;
        break;
      case "k":
        v = H;
        pad = " ";
        break;
      case "l":
        v = H % 12 || 12;
        pad = " ";
        break;
      case "m":
        v = mo + 1;
        break;
      case "M":
        v = d.getUTCMinutes();
        break;
      case "n":
        v = "\n";
        w = 0;
        break;
      case "N":
        v = String(Math.floor(nanos)).padStart(9, "0").slice(0, width ? Number(width) : 9);
        width = "";
        w = 0;
        break;
      case "p":
        v = H < 12 ? "AM" : "PM";
        w = 0;
        break;
      case "P":
        v = H < 12 ? "am" : "pm";
        w = 0;
        break;
      case "r":
        v = strftime("%I:%M:%S %p", t, tz);
        w = 0;
        break;
      case "R":
        v = strftime("%H:%M", t, tz);
        w = 0;
        break;
      case "s":
        v = Math.floor(t.getTime() / 1e3);
        w = 0;
        break;
      case "S":
        v = d.getUTCSeconds();
        break;
      case "t":
        v = "	";
        w = 0;
        break;
      case "T":
      case "X":
        v = strftime("%H:%M:%S", t, tz);
        w = 0;
        break;
      case "u":
        v = wd || 7;
        w = 1;
        break;
      case "U":
        v = Math.floor((yday + 7 - wd) / 7);
        break;
      case "V":
        v = isoWeek;
        break;
      case "w":
        v = wd;
        w = 1;
        break;
      case "W":
        v = Math.floor((yday + 7 - (wd + 6) % 7) / 7);
        break;
      case "y":
        v = Y % 100;
        break;
      case "Y":
        v = Y;
        w = 0;
        break;
      case "z":
        v = colons ? zoneOffset(offset, ":z") + (colons.length > 1 ? ":00" : "") : zoneOffset(offset, "z");
        w = 0;
        break;
      case "Z":
        v = zone;
        w = 0;
        break;
      case "%":
        v = "%";
        w = 0;
        break;
      default:
        return whole;
    }
    let str2 = String(v);
    if (fl.includes("-")) return str2;
    if (fl.includes("_")) pad = " ";
    else if (fl.includes("0")) pad = "0";
    if (fl.includes("^")) str2 = str2.toUpperCase();
    else if (fl.includes("#")) str2 = /[a-z]/.test(str2) ? str2.toUpperCase() : str2.toLowerCase();
    const n = width ? Number(width) : w;
    return typeof v === "number" && v < 0 && pad === "0" ? "-" + String(-v).padStart(n - 1, "0") : str2.padStart(n, pad);
  });
}
var date = async (ctx) => {
  const argv = ctx.argv.slice(1);
  let utc = false;
  let when;
  let ref;
  let fmt;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-u" || a === "--utc" || a === "--universal") utc = true;
    else if (a === "-d" || a === "--date") when = argv[++i];
    else if (a.startsWith("--date=")) when = a.slice(7);
    else if (/^-d./.test(a)) when = a.slice(2);
    else if (a === "-r" || a === "--reference") ref = argv[++i];
    else if (a.startsWith("--reference=")) ref = a.slice(12);
    else if (a === "-R" || a === "--rfc-email") fmt = "%a, %d %b %Y %H:%M:%S %z";
    else if (/^(-I|--iso-8601)/.test(a)) {
      const spec = a.startsWith("-I") ? a.slice(2) : a.slice(11).replace(/^=/, "");
      const parts = { "": "%Y-%m-%d", date: "%Y-%m-%d", hours: "%Y-%m-%dT%H%:z", minutes: "%Y-%m-%dT%H:%M%:z", seconds: "%Y-%m-%dT%H:%M:%S%:z", ns: "%Y-%m-%dT%H:%M:%S,%N%:z" };
      fmt = parts[spec];
      if (!fmt) {
        ctx.err(`date: invalid argument '${spec}' for '--iso-8601'
`);
        return 1;
      }
    } else if (a.startsWith("+")) fmt = a.slice(1);
    else {
      ctx.err(`date: invalid date '${a}'
`);
      return 1;
    }
  }
  const tz = utc ? "UTC0" : ctx.env.TZ;
  let t = /* @__PURE__ */ new Date();
  if (ref !== void 0) {
    try {
      t = new Date(ctx.vfs.stat(ctx.resolve(ref)).mtimeMs);
    } catch (e) {
      ctx.err(`date: ${ref}: ${errMsg(e)}
`);
      return 1;
    }
  }
  if (when !== void 0) {
    const v = when.trim();
    const rel = /^(now|today)$/i.test(v) ? 0 : /^tomorrow$/i.test(v) ? 864e5 : /^yesterday$/i.test(v) ? -864e5 : null;
    if (rel !== null) t = new Date(Date.now() + rel);
    else if (v.startsWith("@") && /^@-?\d+(\.\d+)?$/.test(v)) t = new Date(Number(v.slice(1)) * 1e3);
    else {
      const local = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(v);
      if (local) {
        const guess = Date.UTC(+local[1], +local[2] - 1, +local[3], +(local[4] ?? 0), +(local[5] ?? 0), +(local[6] ?? 0));
        t = new Date(guess - wallClock(new Date(guess), tz).offset * 6e4);
        t = new Date(guess - wallClock(t, tz).offset * 6e4);
      } else t = new Date(v);
    }
    if (Number.isNaN(t.getTime())) {
      ctx.err(`date: invalid date '${when}'
`);
      return 1;
    }
  }
  ctx.out(strftime(fmt ?? "%a %b %e %H:%M:%S %Z %Y", t, tz) + "\n");
  return 0;
};
var sleep = async (ctx) => {
  let ms = 0;
  const argv = ctx.argv.slice(1);
  if (!argv.length) {
    ctx.err("sleep: missing operand\n");
    return 1;
  }
  for (const a of argv) {
    const d = parseDuration(a);
    if (d === null) {
      ctx.err(`sleep: invalid time interval '${a}'
`);
      return 1;
    }
    ms += d;
  }
  await new Promise((resolve2) => {
    const t = ms === Infinity ? void 0 : setTimeout(resolve2, ms);
    ctx.signal.addEventListener("abort", () => {
      clearTimeout(t);
      resolve2();
    });
  });
  return 0;
};
var uname = async (ctx) => {
  const { flags } = getopt(ctx.argv.slice(1));
  const parts = [];
  const all = flags.has("a");
  if (all || flags.has("s") || flags.size === 0) parts.push("Linux");
  if (all || flags.has("n")) parts.push(ctx.kernel.hostname);
  if (all || flags.has("r")) parts.push("6.1.0-openvessel");
  if (all || flags.has("v")) parts.push("#1 SMP");
  if (all || flags.has("m") || flags.has("p")) parts.push("x86_64");
  if (all || flags.has("o")) parts.push("GNU/Linux");
  ctx.out(parts.join(" ") + "\n");
  return 0;
};
var ps = async (ctx) => {
  ctx.out("  PID  PPID CMD\n");
  for (const p of ctx.kernel.procs.values()) {
    if (p.state !== "running") continue;
    ctx.out(`${String(p.pid).padStart(5)} ${String(p.ppid).padStart(5)} ${p.argv.join(" ")}
`);
  }
  return 0;
};
var kill = async (ctx) => {
  const args = ctx.argv.slice(1);
  const names = Object.keys(SIGNALS);
  if (/^(-l|-L|--list|--table)$/.test(args[0] ?? "")) {
    if (args.length === 1) {
      if (args[0] === "-L" || args[0] === "--table") ctx.out(names.map((k) => `${String(SIGNALS[k]).padStart(2)} ${k.slice(3)}`).join("\n") + "\n");
      else ctx.out(names.map((k) => k.slice(3)).join(" ") + "\n");
      return 0;
    }
    let st2 = 0;
    for (const a of args.slice(1)) {
      const n = /^\d+$/.test(a) ? Number(a) & 127 : parseSignal(a);
      const k = names.find((x) => SIGNALS[x] === n);
      if (n === null || /^\d+$/.test(a) && !k) {
        ctx.err(`kill: ${a}: invalid signal specification
`);
        st2 = 1;
      } else ctx.out((/^\d+$/.test(a) ? k.slice(3) : String(n)) + "\n");
    }
    return st2;
  }
  let sig = 15;
  let i = 0;
  if (args[0] === "-s" || args[0] === "-n" || args[0] === "--signal") {
    if (args.length < 2) {
      ctx.err(`kill: ${args[0]}: option requires an argument
`);
      return 2;
    }
    sig = parseSignal(args[1]);
    i = 2;
  } else if (args[0]?.startsWith("--signal=")) {
    sig = parseSignal(args[0].slice(9));
    i = 1;
  } else if (args[0] && args[0] !== "--" && /^-./.test(args[0])) {
    sig = parseSignal(args[0].slice(1));
    i = 1;
  }
  if (sig === null) {
    ctx.err(`kill: ${args[i - 1].replace(/^-(?!-)/, "").replace(/^--signal=/, "")}: invalid signal specification
`);
    return 1;
  }
  if (args[i] === "--") i++;
  const pids = args.slice(i);
  if (!pids.length) {
    ctx.err("kill: usage: kill [-s sigspec | -n signum | -sigspec] pid ... or kill -l [sigspec]\n");
    return 2;
  }
  let st = 0;
  for (const a of pids) {
    if (!/^-?\d+$/.test(a)) {
      ctx.err(`kill: ${a}: arguments must be process or job IDs
`);
      st = 1;
      continue;
    }
    const pid = Number(a);
    const running = [...ctx.kernel.procs.values()].filter((p) => p.state === "running");
    const targets2 = pid > 0 ? running.filter((p) => p.pid === pid) : pid === 0 ? running.filter((p) => p.pgid === ctx.proc.pgid) : pid === -1 ? running.filter((p) => p.pid !== ctx.proc.pid) : running.filter((p) => p.pgid === -pid);
    if (!targets2.length) {
      ctx.err(`kill: (${a}) - No such process
`);
      st = 1;
      continue;
    }
    if (sig) for (const p of targets2) ctx.kernel.kill(p.pid, signalName(sig));
  }
  return st;
};
var seq = async (ctx) => {
  const argv = ctx.argv.slice(1);
  let sep = "\n";
  let fmt;
  let equalWidth = false;
  const nums = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (nums.length || /^-\.?\d/.test(a) || !a.startsWith("-") || a === "-") nums.push(a);
    else if (a === "--") {
      nums.push(...argv.slice(i + 1));
      break;
    } else if (a === "-w" || a === "--equal-width") equalWidth = true;
    else if (a.startsWith("--separator=")) sep = a.slice(12);
    else if (a.startsWith("--format=")) fmt = a.slice(9);
    else if (a === "-s" || a === "--separator" || a === "-f" || a === "--format") {
      if (i + 1 >= argv.length) {
        ctx.err(`seq: option requires an argument -- '${a.replace(/^-+/, "")[0]}'
`);
        return 1;
      }
      if (a[1] === "s" || a === "--separator") sep = argv[++i];
      else fmt = argv[++i];
    } else if (/^-[sf]/.test(a)) {
      if (a[1] === "s") sep = a.slice(2);
      else fmt = a.slice(2);
    } else {
      ctx.err(`seq: invalid option -- '${a.slice(1)}'
`);
      return 1;
    }
  }
  if (!nums.length || nums.length > 3) {
    ctx.err(nums.length ? `seq: extra operand '${nums[3]}'
` : "seq: missing operand\n");
    return 1;
  }
  for (const n of nums) {
    if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(n)) {
      ctx.err(`seq: invalid floating point argument: '${n}'
`);
      return 1;
    }
  }
  const [firstS, incS, lastS] = nums.length === 1 ? ["1", "1", nums[0]] : nums.length === 2 ? [nums[0], "1", nums[1]] : nums;
  const first = Number(firstS);
  const inc = Number(incS);
  const last = Number(lastS);
  if (inc === 0) {
    ctx.err(`seq: invalid Zero increment value: '${incS}'
`);
    return 1;
  }
  const decimals = (x) => /e/i.test(x) ? 0 : x.split(".")[1]?.length ?? 0;
  const prec = Math.max(decimals(firstS), decimals(incS));
  const show = (x) => {
    if (fmt) return fmt.replace(/%([-+ 0#]*)(\d*)(?:\.(\d+))?([fgeFGE])/, (_m, fl, w, p, conv) => {
      let v = /[fF]/.test(conv) ? x.toFixed(p === void 0 ? 6 : Number(p)) : /[eE]/.test(conv) ? x.toExponential(p === void 0 ? 6 : Number(p)) : String(Number(x.toPrecision(Number(p ?? 6) || 1)));
      if (fl.includes("+") && x >= 0) v = "+" + v;
      if (w) v = fl.includes("-") ? v.padEnd(Number(w)) : fl.includes("0") ? v.startsWith("-") ? "-" + v.slice(1).padStart(Number(w) - 1, "0") : v.padStart(Number(w), "0") : v.padStart(Number(w));
      return v.replace(/%%/g, "%");
    });
    return x.toFixed(prec);
  };
  const out = [];
  for (let k = 0; ; k++) {
    const x = first + k * inc;
    if (inc > 0 ? x > last + 1e-10 * Math.abs(inc) : x < last - 1e-10 * Math.abs(inc)) break;
    out.push(show(x));
  }
  if (equalWidth && !fmt) {
    const w = Math.max(...out.map((o) => o.length));
    for (let k = 0; k < out.length; k++) out[k] = out[k].startsWith("-") ? "-" + out[k].slice(1).padStart(w - 1, "0") : out[k].padStart(w, "0");
  }
  if (out.length) ctx.out(out.join(sep) + "\n");
  return 0;
};
var yes = async (ctx) => {
  const s = (ctx.argv.slice(1).join(" ") || "y") + "\n";
  const chunk = enc4.encode(s.repeat(Math.max(1, Math.floor(4096 / s.length))));
  while (!ctx.signal.aborted) {
    ctx.out(chunk);
    await new Promise((r) => setTimeout(r, 0));
  }
  return 0;
};
var mktemp = async (ctx) => {
  const { flags, opts, args } = getopt(ctx.argv.slice(1), "p");
  const tmpl = args[0] ?? "tmp.XXXXXXXXXX";
  const dir = opts.get("p") ?? (flags.has("t") || !args[0] ? ctx.env.TMPDIR ?? "/tmp" : "");
  const name = tmpl.replace(/X+$/, (m) => Array.from({ length: m.length }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join(""));
  const full = ctx.resolve(dir ? join(dir, name) : name);
  if (flags.has("d")) ctx.vfs.mkdir(full, 448);
  else ctx.vfs.createFile(full, 384, { excl: true });
  ctx.out(full + "\n");
  return 0;
};
var base64 = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1));
  let data = new Uint8Array(0);
  await eachInput(ctx, args, "base64", (d) => {
    data = d;
  });
  if (flags.has("d")) {
    const bin = atob(dec3.decode(data).replace(/\s+/g, ""));
    ctx.out(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  } else {
    let s = "";
    for (let i = 0; i < data.length; i += 32768) s += String.fromCharCode(...data.subarray(i, i + 32768));
    const b = btoa(s);
    ctx.out((flags.has("w") ? b : b.replace(/(.{76})/g, "$1\n")) + "\n");
  }
  return 0;
};
function hashProgram(algo) {
  return async (ctx) => {
    const { args } = getopt(ctx.argv.slice(1));
    const results = [];
    const st = await eachInput(ctx, args, ctx.argv[0], async (d, f) => {
      let hex;
      if (algo === "MD5") {
        const { md5 } = await import("./chunks/legacy-WWAR6VCT.js");
        hex = [...md5(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
      } else {
        const h = new Uint8Array(await crypto.subtle.digest(algo, d.slice()));
        hex = [...h].map((b) => b.toString(16).padStart(2, "0")).join("");
      }
      results.push(`${hex}  ${f}`);
    });
    if (results.length) ctx.out(results.join("\n") + "\n");
    return st;
  };
}
function editScript(a, b) {
  const n = a.length;
  const m = b.length;
  const max = n + m;
  const off = max + 1;
  const v = new Int32Array(2 * max + 3);
  const trace = [];
  let found = false;
  for (let d = 0; d <= max && !found; d++) {
    if ((d + 1) * v.length > 3e7) return null;
    trace.push(v.slice());
    for (let k = -d; k <= d; k += 2) {
      let x2 = k === -d || k !== d && v[off + k - 1] < v[off + k + 1] ? v[off + k + 1] : v[off + k - 1] + 1;
      let y2 = x2 - k;
      while (x2 < n && y2 < m && a[x2] === b[y2]) {
        x2++;
        y2++;
      }
      v[off + k] = x2;
      if (x2 >= n && y2 >= m) {
        found = true;
        break;
      }
    }
  }
  const ops = [];
  let x = n;
  let y = m;
  for (let d = trace.length - 1; d >= 0; d--) {
    const vd = trace[d];
    const k = x - y;
    const prevK = k === -d || k !== d && vd[off + k - 1] < vd[off + k + 1] ? k + 1 : k - 1;
    const prevX = d ? vd[off + prevK] : 0;
    const prevY = d ? prevX - prevK : 0;
    while (x > prevX && y > prevY) {
      ops.push(" ");
      x--;
      y--;
    }
    if (d) ops.push(x === prevX ? "+" : "-");
    x = prevX;
    y = prevY;
  }
  return ops.reverse();
}
var diff = async (ctx) => {
  const argv = ctx.argv.slice(1).map((a2) => a2 === "--unified" ? "-u" : a2);
  const { args, flags, opts, all } = getopt(argv, "UL", { unified: "U", brief: "q", "report-identical-files": "s", "ignore-case": "i", "ignore-all-space": "w", "ignore-space-change": "b", label: "L", text: "a" });
  if (args.length !== 2) {
    ctx.err(args.length > 2 ? `diff: extra operand '${args[2]}'
` : `diff: missing operand after '${args[0] ?? "diff"}'
`);
    return 2;
  }
  const files = [];
  for (const f of args) {
    try {
      if (f === "-") files.push({ data: await ctx.readAll(0), mtime: Date.now() });
      else {
        const abs = ctx.resolve(f);
        const st = ctx.vfs.stat(abs);
        if ((st.mode & S_IFMT) === S_IFDIR) throw Object.assign(new Error("Is a directory"), { code: "EISDIR" });
        files.push({ data: ctx.vfs.readFile(abs), mtime: st.mtimeMs });
      }
    } catch (e) {
      ctx.err(`diff: ${f}: ${errMsg(e)}
`);
      return 2;
    }
  }
  const [A, B] = files;
  const same = A.data.length === B.data.length && A.data.every((x, i2) => x === B.data[i2]);
  if (!flags.has("a") && (A.data.includes(0) || B.data.includes(0))) {
    if (same) return 0;
    ctx.out(`Binary files ${args[0]} and ${args[1]} differ
`);
    return 1;
  }
  const split = (d) => {
    const lines = dec3.decode(d).split("\n");
    const noeol = lines[lines.length - 1] !== "";
    if (!noeol) lines.pop();
    return { lines, noeol };
  };
  const a = split(A.data);
  const b = split(B.data);
  const norm = (l) => {
    if (flags.has("w")) l = l.replace(/\s+/g, "");
    else if (flags.has("b")) l = l.replace(/\s+/g, " ").replace(/ $/, "");
    return flags.has("i") ? l.toLowerCase() : l;
  };
  const keys = (x) => x.lines.map((l, i2) => norm(l) + (x.noeol && i2 === x.lines.length - 1 ? "\0" : ""));
  const ka = keys(a);
  const kb = keys(b);
  let pre = 0;
  while (pre < ka.length && pre < kb.length && ka[pre] === kb[pre]) pre++;
  let suf = 0;
  while (suf < ka.length - pre && suf < kb.length - pre && ka[ka.length - 1 - suf] === kb[kb.length - 1 - suf]) suf++;
  if (pre + suf === ka.length && pre + suf === kb.length) {
    if (flags.has("s")) ctx.out(`Files ${args[0]} and ${args[1]} are identical
`);
    return 0;
  }
  if (flags.has("q")) {
    ctx.out(`Files ${args[0]} and ${args[1]} differ
`);
    return 1;
  }
  const midA = ka.slice(pre, ka.length - suf);
  const midB = kb.slice(pre, kb.length - suf);
  const mid = editScript(midA, midB) ?? [...midA.map(() => "-"), ...midB.map(() => "+")];
  const ops = [...Array(pre).fill(" "), ...mid, ...Array(suf).fill(" ")];
  const blocks = [];
  let i = 0;
  let j = 0;
  for (let k = 0; k < ops.length; ) {
    if (ops[k] === " ") {
      i++;
      j++;
      k++;
      continue;
    }
    const blk = { i1: i, i2: i, j1: j, j2: j };
    for (; k < ops.length && ops[k] !== " "; k++) {
      if (ops[k] === "-") blk.i2 = ++i;
      else blk.j2 = ++j;
    }
    blocks.push(blk);
  }
  const line = (x, idx, prefix) => {
    ctx.out(prefix + x.lines[idx] + "\n");
    if (x.noeol && idx === x.lines.length - 1) ctx.out("\\ No newline at end of file\n");
  };
  if (!flags.has("u") && !opts.has("U")) {
    const range = (s0, e) => e - s0 === 1 ? `${s0 + 1}` : `${s0 + 1},${e}`;
    for (const k of blocks) {
      if (k.i1 === k.i2) ctx.out(`${k.i1}a${range(k.j1, k.j2)}
`);
      else if (k.j1 === k.j2) ctx.out(`${range(k.i1, k.i2)}d${k.j1}
`);
      else ctx.out(`${range(k.i1, k.i2)}c${range(k.j1, k.j2)}
`);
      for (let x = k.i1; x < k.i2; x++) line(a, x, "< ");
      if (k.i1 !== k.i2 && k.j1 !== k.j2) ctx.out("---\n");
      for (let x = k.j1; x < k.j2; x++) line(b, x, "> ");
    }
    return 1;
  }
  const C = opts.has("U") ? Math.max(0, Number(opts.get("U")) || 0) : 3;
  const labels = all.get("L") ?? [];
  const stamp = (f) => strftime("%Y-%m-%d %H:%M:%S.%N %z", new Date(Math.floor(f.mtime)), ctx.env.TZ, Math.round(f.mtime % 1e3 * 1e6));
  ctx.out(`--- ${labels[0] ?? `${args[0]}	${stamp(A)}`}
+++ ${labels[1] ?? `${args[1]}	${stamp(B)}`}
`);
  for (let h = 0; h < blocks.length; ) {
    let last = h;
    while (last + 1 < blocks.length && blocks[last + 1].i1 - blocks[last].i2 <= 2 * C) last++;
    const aStart = Math.max(0, blocks[h].i1 - C);
    const aEnd = Math.min(a.lines.length, blocks[last].i2 + C);
    const bStart = blocks[h].j1 - (blocks[h].i1 - aStart);
    const bEnd = blocks[last].j2 + (aEnd - blocks[last].i2);
    const head2 = (s0, e) => `${e - s0 ? s0 + 1 : s0}${e - s0 === 1 ? "" : `,${e - s0}`}`;
    ctx.out(`@@ -${head2(aStart, aEnd)} +${head2(bStart, bEnd)} @@
`);
    let x = aStart;
    for (let k = h; k <= last; k++) {
      const blk = blocks[k];
      for (; x < blk.i1; x++) line(a, x, " ");
      for (let y = blk.i1; y < blk.i2; y++) line(a, y, "-");
      for (let y = blk.j1; y < blk.j2; y++) line(b, y, "+");
      x = blk.i2;
    }
    for (; x < aEnd; x++) line(a, x, " ");
    h = last + 1;
  }
  return 1;
};
var clear = async (ctx) => {
  ctx.out("\x1B[H\x1B[2J\x1B[3J");
  return 0;
};
var nproc = async (ctx) => {
  ctx.out(`${navigator.hardwareConcurrency || 4}
`);
  return 0;
};
function shellBuiltinProgram(name) {
  return async (ctx) => {
    const sh = new Shell(ctx);
    try {
      return await BUILTINS[name](sh, ctx.argv.slice(1));
    } finally {
      sh.releaseFds();
    }
  };
}
var timeProg = async (ctx) => {
  const t0 = performance.now();
  const code = ctx.argv.length > 1 ? await runCommand(ctx, "time", ctx.argv.slice(1)) : 0;
  const dt = (performance.now() - t0) / 1e3;
  ctx.err(`
real	${Math.floor(dt / 60)}m${(dt % 60).toFixed(3)}s
`);
  return code;
};
var timeout = async (ctx) => {
  const { flags, opts, args } = getopt(ctx.argv.slice(1), "sk", { signal: "s", "kill-after": "k", "preserve-status": "preserve-status", foreground: "foreground", verbose: "v" }, true);
  if (args.length < 2) {
    ctx.err(args.length ? `timeout: missing operand after '${args[0]}'
` : "timeout: missing operand\n");
    return 125;
  }
  const ms = parseDuration(args[0]);
  const killAfter = opts.has("k") ? parseDuration(opts.get("k")) : null;
  if (ms === null || opts.has("k") && killAfter === null) {
    ctx.err(`timeout: invalid time interval '${ms === null ? args[0] : opts.get("k")}'
`);
    return 125;
  }
  const sig = opts.has("s") ? parseSignal(opts.get("s")) : 15;
  if (sig === null) {
    ctx.err(`timeout: ${opts.get("s")}: invalid signal
`);
    return 125;
  }
  const p = spawnCommand(ctx, "timeout", args.slice(1));
  if (typeof p === "number") return p;
  let timedOut = false;
  let killed = false;
  const timers = [];
  const send = (s) => {
    try {
      ctx.kernel.kill(p.pid, s);
    } catch {
    }
  };
  if (ms > 0)
    timers.push(
      setTimeout(() => {
        timedOut = true;
        if (flags.has("v")) ctx.err(`timeout: sending signal ${signalName(sig).slice(3)} to command '${args[1]}'
`);
        if (sig) send(signalName(sig));
        if (killAfter !== null)
          timers.push(
            setTimeout(() => {
              killed = true;
              if (flags.has("v")) ctx.err(`timeout: sending signal KILL to command '${args[1]}'
`);
              send("SIGKILL");
            }, killAfter)
          );
      }, ms)
    );
  const st = await p.exited;
  for (const t of timers) clearTimeout(t);
  if (!timedOut || flags.has("preserve-status")) return exitCodeOf(st);
  return killed || sig === 9 ? 137 : 124;
};
var id = async (ctx) => {
  const a = ctx.argv.slice(1);
  if (a.includes("-u")) ctx.out("1000\n");
  else if (a.includes("-g")) ctx.out("1000\n");
  else if (a.includes("-un") || a.includes("-nu")) ctx.out("user\n");
  else ctx.out("uid=1000(user) gid=1000(user) groups=1000(user)\n");
  return 0;
};
var df = async (ctx) => {
  ctx.out("Filesystem     1K-blocks  Used Available Use% Mounted on\nvfs              4194304     0   4194304   0% /\n");
  return 0;
};
var free = async (ctx) => {
  ctx.out("               total        used        free\nMem:         4194304           0     4194304\n");
  return 0;
};
var hostname = async (ctx) => {
  ctx.out(ctx.kernel.hostname + "\n");
  return 0;
};
var whoami = async (ctx) => {
  ctx.out("user\n");
  return 0;
};
var tty = async (ctx) => {
  const silent = ctx.argv.slice(1).some((a) => a === "-s" || a === "--silent" || a === "--quiet");
  if (ctx.isatty(0)) {
    if (!silent) ctx.out("/dev/tty\n");
    return 0;
  }
  if (!silent) ctx.out("not a tty\n");
  return 1;
};
var stty = async (ctx) => {
  const tty2 = ctx.proc.fds.get(0)?.opts.tty;
  if (!tty2) return 1;
  const a = ctx.argv.slice(1);
  if (a[0] === "size") ctx.out(`${tty2.rows} ${tty2.cols}
`);
  else if (a.includes("raw")) tty2.raw = true;
  else if (a.includes("-raw") || a.includes("sane") || a.includes("cooked")) tty2.raw = false;
  if (a.includes("-echo")) tty2.echo = false;
  if (a.includes("echo")) tty2.echo = true;
  return 0;
};
var nohup = async (ctx) => {
  const argv = ctx.argv.slice(1);
  if (argv[0] === "--") argv.shift();
  if (!argv.length) {
    ctx.err("nohup: missing operand\n");
    return 125;
  }
  return runCommand(ctx, "nohup", argv);
};
var nice = async (ctx) => {
  const argv = ctx.argv.slice(1);
  let i = 0;
  for (; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-n" || a === "--adjustment") i++;
    else if (/^-n-?\d+$/.test(a) || /^--adjustment=/.test(a) || /^--?\d+$/.test(a)) continue;
    else if (a === "--") {
      i++;
      break;
    } else break;
  }
  if (i >= argv.length) {
    ctx.out("0\n");
    return 0;
  }
  return runCommand(ctx, "nice", argv.slice(i));
};
var less = async (ctx) => cat(ctx);
var file = async (ctx) => {
  const { flags, args } = getopt(ctx.argv.slice(1), "", { brief: "b", dereference: "L", "mime-type": "mime-type" });
  if (!args.length) {
    ctx.err("Usage: file [-bL] file ...\n");
    return 1;
  }
  for (const a of args) {
    let what;
    try {
      const n = ctx.vfs.lookup(ctx.resolve(a), flags.has("L"));
      const t = n.mode & S_IFMT;
      if (t === S_IFDIR) what = "directory";
      else if (t === S_IFLNK) what = `symbolic link to ${n.target}`;
      else if (t === S_IFIFO) what = "fifo (named pipe)";
      else if (t === S_IFSOCK) what = "socket";
      else if (t === S_IFCHR || t === S_IFBLK) {
        const rdev = ctx.vfs.stat(ctx.resolve(a)).rdev;
        what = `${t === S_IFCHR ? "character" : "block"} special (${rdev >> 8 & 4095}/${rdev & 255})`;
      } else {
        const d = ctx.vfs.readFile(ctx.resolve(a)).subarray(0, 4096);
        const text = dec3.decode(d);
        if (d.length === 0) what = "empty";
        else if (d.includes(0)) what = "data";
        else if (text.startsWith("#!")) what = `${text.slice(2).split("\n")[0].trim().split(/\s+/).pop()} script, ASCII text executable`;
        else what = /[^\x00-\x7f]/.test(text) ? text.includes("\uFFFD") ? "ISO-8859 text" : "Unicode text, UTF-8 text" : "ASCII text";
      }
    } catch (e) {
      what = `cannot open \`${a}' (${errMsg(e)})`;
    }
    ctx.out(flags.has("b") ? `${what}
` : `${a}: ${what}
`);
  }
  return 0;
};
var rev = async (ctx) => eachLine(ctx, ctx.argv.slice(1), "rev", (l) => {
  ctx.out([...l].reverse().join("") + "\n");
});
var nl = async (ctx) => {
  let n = 1;
  return eachLine(ctx, ctx.argv.slice(1), "nl", (l) => {
    ctx.out(l.trim() ? `${String(n++).padStart(6)}	${l}
` : "\n");
  });
};
var truncateProg = async (ctx) => {
  const { opts, args } = getopt(ctx.argv.slice(1), "s");
  const size = Number(opts.get("s") ?? 0);
  for (const a of args) {
    const abs = ctx.resolve(a);
    if (!ctx.vfs.exists(abs)) ctx.vfs.createFile(abs);
    ctx.vfs.truncate(abs, size);
  }
  return 0;
};
var sha256sum = hashProgram("SHA-256");
function installCoreutils(kernel2) {
  const progs = {
    ls,
    cat,
    mkdir,
    mkfifo,
    rm,
    rmdir,
    cp,
    mv,
    touch,
    ln,
    chmod,
    head,
    tail,
    wc,
    grep,
    egrep: grep,
    fgrep: grep,
    find,
    sort,
    uniq,
    cut,
    tr,
    sed,
    xargs,
    tee,
    env,
    which,
    basename: basename2,
    dirname: dirname2,
    realpath,
    readlink,
    stat,
    du,
    df,
    free,
    date,
    sleep,
    uname,
    ps,
    kill,
    seq,
    yes,
    mktemp,
    base64,
    diff,
    clear,
    nproc,
    id,
    hostname,
    whoami,
    tty,
    stty,
    nohup,
    nice,
    less,
    more: less,
    file,
    rev,
    nl,
    timeout,
    time: timeProg,
    truncate: truncateProg,
    sha256sum,
    sha1sum: hashProgram("SHA-1"),
    sha512sum: hashProgram("SHA-512"),
    md5sum: hashProgram("MD5"),
    echo: shellBuiltinProgram("echo"),
    printf: shellBuiltinProgram("printf"),
    test: shellBuiltinProgram("test"),
    "[": shellBuiltinProgram("["),
    true: shellBuiltinProgram("true"),
    false: shellBuiltinProgram("false"),
    pwd: shellBuiltinProgram("pwd"),
    chown: async () => 0,
    sync: async () => 0,
    true_: async () => 0
  };
  delete progs.true_;
  for (const [name, fn] of Object.entries(progs)) kernel2.registerProgram(name, fn, ["/bin"]);
  kernel2.vfs.writeFile("/usr/bin/env", "#!/ov/builtin env\n", 493);
  kernel2.vfs.chmod("/usr/bin/env", 493);
}

// src/kernel/esm.ts
var import_lexer = __toESM(require_lexer(), 1);

// src/shared/builtin-exports.json
var builtin_exports_default = { assert: ["Assert", "AssertionError", "CallTracker", "deepEqual", "deepStrictEqual", "doesNotMatch", "doesNotReject", "doesNotThrow", "equal", "fail", "ifError", "match", "notDeepEqual", "notDeepStrictEqual", "notEqual", "notStrictEqual", "ok", "partialDeepStrictEqual", "rejects", "strict", "strictEqual", "throws"], "assert/strict": ["Assert", "AssertionError", "CallTracker", "deepEqual", "deepStrictEqual", "doesNotMatch", "doesNotReject", "doesNotThrow", "equal", "fail", "ifError", "match", "notDeepEqual", "notDeepStrictEqual", "notEqual", "notStrictEqual", "ok", "partialDeepStrictEqual", "rejects", "strict", "strictEqual", "throws"], async_hooks: ["AsyncLocalStorage", "AsyncResource", "asyncWrapProviders", "createHook", "executionAsyncId", "executionAsyncResource", "triggerAsyncId"], buffer: ["Blob", "Buffer", "File", "INSPECT_MAX_BYTES", "SlowBuffer", "atob", "btoa", "constants", "isAscii", "isUtf8", "kMaxLength", "kStringMaxLength", "resolveObjectURL", "transcode"], child_process: ["ChildProcess", "_forkChild", "exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"], cluster: ["SCHED_NONE", "SCHED_RR", "Worker", "_events", "_eventsCount", "_maxListeners", "disconnect", "fork", "isMaster", "isPrimary", "isWorker", "schedulingPolicy", "settings", "setupMaster", "setupPrimary", "workers"], console: ["Console", "assert", "clear", "context", "count", "countReset", "createTask", "debug", "dir", "dirxml", "error", "group", "groupCollapsed", "groupEnd", "info", "log", "profile", "profileEnd", "table", "time", "timeEnd", "timeLog", "timeStamp", "trace", "warn"], constants: ["COPYFILE_EXCL", "COPYFILE_FICLONE", "COPYFILE_FICLONE_FORCE", "DH_CHECK_P_NOT_PRIME", "DH_CHECK_P_NOT_SAFE_PRIME", "DH_NOT_SUITABLE_GENERATOR", "DH_UNABLE_TO_CHECK_GENERATOR", "E2BIG", "EACCES", "EADDRINUSE", "EADDRNOTAVAIL", "EAFNOSUPPORT", "EAGAIN", "EALREADY", "EBADF", "EBADMSG", "EBUSY", "ECANCELED", "ECHILD", "ECONNABORTED", "ECONNREFUSED", "ECONNRESET", "EDEADLK", "EDESTADDRREQ", "EDOM", "EDQUOT", "EEXIST", "EFAULT", "EFBIG", "EHOSTUNREACH", "EIDRM", "EILSEQ", "EINPROGRESS", "EINTR", "EINVAL", "EIO", "EISCONN", "EISDIR", "ELOOP", "EMFILE", "EMLINK", "EMSGSIZE", "EMULTIHOP", "ENAMETOOLONG", "ENETDOWN", "ENETRESET", "ENETUNREACH", "ENFILE", "ENGINE_METHOD_ALL", "ENGINE_METHOD_CIPHERS", "ENGINE_METHOD_DH", "ENGINE_METHOD_DIGESTS", "ENGINE_METHOD_DSA", "ENGINE_METHOD_EC", "ENGINE_METHOD_NONE", "ENGINE_METHOD_PKEY_ASN1_METHS", "ENGINE_METHOD_PKEY_METHS", "ENGINE_METHOD_RAND", "ENGINE_METHOD_RSA", "ENOBUFS", "ENODATA", "ENODEV", "ENOENT", "ENOEXEC", "ENOLCK", "ENOLINK", "ENOMEM", "ENOMSG", "ENOPROTOOPT", "ENOSPC", "ENOSR", "ENOSTR", "ENOSYS", "ENOTCONN", "ENOTDIR", "ENOTEMPTY", "ENOTSOCK", "ENOTSUP", "ENOTTY", "ENXIO", "EOPNOTSUPP", "EOVERFLOW", "EPERM", "EPIPE", "EPROTO", "EPROTONOSUPPORT", "EPROTOTYPE", "ERANGE", "EROFS", "ESPIPE", "ESRCH", "ESTALE", "ETIME", "ETIMEDOUT", "ETXTBSY", "EWOULDBLOCK", "EXDEV", "F_OK", "OPENSSL_VERSION_NUMBER", "O_APPEND", "O_CREAT", "O_DIRECT", "O_DIRECTORY", "O_DSYNC", "O_EXCL", "O_NOATIME", "O_NOCTTY", "O_NOFOLLOW", "O_NONBLOCK", "O_RDONLY", "O_RDWR", "O_SYNC", "O_TRUNC", "O_WRONLY", "POINT_CONVERSION_COMPRESSED", "POINT_CONVERSION_HYBRID", "POINT_CONVERSION_UNCOMPRESSED", "PRIORITY_ABOVE_NORMAL", "PRIORITY_BELOW_NORMAL", "PRIORITY_HIGH", "PRIORITY_HIGHEST", "PRIORITY_LOW", "PRIORITY_NORMAL", "RSA_NO_PADDING", "RSA_PKCS1_OAEP_PADDING", "RSA_PKCS1_PADDING", "RSA_PKCS1_PSS_PADDING", "RSA_PSS_SALTLEN_AUTO", "RSA_PSS_SALTLEN_DIGEST", "RSA_PSS_SALTLEN_MAX_SIGN", "RSA_X931_PADDING", "RTLD_DEEPBIND", "RTLD_GLOBAL", "RTLD_LAZY", "RTLD_LOCAL", "RTLD_NOW", "R_OK", "SIGABRT", "SIGALRM", "SIGBUS", "SIGCHLD", "SIGCONT", "SIGFPE", "SIGHUP", "SIGILL", "SIGINT", "SIGIO", "SIGIOT", "SIGKILL", "SIGPIPE", "SIGPOLL", "SIGPROF", "SIGPWR", "SIGQUIT", "SIGSEGV", "SIGSTKFLT", "SIGSTOP", "SIGSYS", "SIGTERM", "SIGTRAP", "SIGTSTP", "SIGTTIN", "SIGTTOU", "SIGURG", "SIGUSR1", "SIGUSR2", "SIGVTALRM", "SIGWINCH", "SIGXCPU", "SIGXFSZ", "SSL_OP_ALL", "SSL_OP_ALLOW_NO_DHE_KEX", "SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION", "SSL_OP_CIPHER_SERVER_PREFERENCE", "SSL_OP_CISCO_ANYCONNECT", "SSL_OP_COOKIE_EXCHANGE", "SSL_OP_CRYPTOPRO_TLSEXT_BUG", "SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS", "SSL_OP_LEGACY_SERVER_CONNECT", "SSL_OP_NO_COMPRESSION", "SSL_OP_NO_ENCRYPT_THEN_MAC", "SSL_OP_NO_QUERY_MTU", "SSL_OP_NO_RENEGOTIATION", "SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION", "SSL_OP_NO_SSLv2", "SSL_OP_NO_SSLv3", "SSL_OP_NO_TICKET", "SSL_OP_NO_TLSv1", "SSL_OP_NO_TLSv1_1", "SSL_OP_NO_TLSv1_2", "SSL_OP_NO_TLSv1_3", "SSL_OP_PRIORITIZE_CHACHA", "SSL_OP_TLS_ROLLBACK_BUG", "S_IFBLK", "S_IFCHR", "S_IFDIR", "S_IFIFO", "S_IFLNK", "S_IFMT", "S_IFREG", "S_IFSOCK", "S_IRGRP", "S_IROTH", "S_IRUSR", "S_IRWXG", "S_IRWXO", "S_IRWXU", "S_IWGRP", "S_IWOTH", "S_IWUSR", "S_IXGRP", "S_IXOTH", "S_IXUSR", "TLS1_1_VERSION", "TLS1_2_VERSION", "TLS1_3_VERSION", "TLS1_VERSION", "UV_DIRENT_BLOCK", "UV_DIRENT_CHAR", "UV_DIRENT_DIR", "UV_DIRENT_FIFO", "UV_DIRENT_FILE", "UV_DIRENT_LINK", "UV_DIRENT_SOCKET", "UV_DIRENT_UNKNOWN", "UV_FS_COPYFILE_EXCL", "UV_FS_COPYFILE_FICLONE", "UV_FS_COPYFILE_FICLONE_FORCE", "UV_FS_O_FILEMAP", "UV_FS_SYMLINK_DIR", "UV_FS_SYMLINK_JUNCTION", "W_OK", "X_OK", "defaultCoreCipherList"], crypto: ["Certificate", "Cipher", "Cipheriv", "Decipher", "Decipheriv", "DiffieHellman", "DiffieHellmanGroup", "ECDH", "Hash", "Hmac", "KeyObject", "Sign", "Verify", "X509Certificate", "checkPrime", "checkPrimeSync", "constants", "createCipheriv", "createDecipheriv", "createDiffieHellman", "createDiffieHellmanGroup", "createECDH", "createHash", "createHmac", "createPrivateKey", "createPublicKey", "createSecretKey", "createSign", "createVerify", "diffieHellman", "generateKey", "generateKeyPair", "generateKeyPairSync", "generateKeySync", "generatePrime", "generatePrimeSync", "getCipherInfo", "getCiphers", "getCurves", "getDiffieHellman", "getFips", "getHashes", "getRandomValues", "hash", "hkdf", "hkdfSync", "pbkdf2", "pbkdf2Sync", "privateDecrypt", "privateEncrypt", "publicDecrypt", "publicEncrypt", "randomBytes", "randomFill", "randomFillSync", "randomInt", "randomUUID", "scrypt", "scryptSync", "secureHeapUsed", "setEngine", "setFips", "sign", "subtle", "timingSafeEqual", "verify", "webcrypto"], dgram: ["Socket", "_createSocketHandle", "createSocket"], diagnostics_channel: ["Channel", "channel", "hasSubscribers", "subscribe", "tracingChannel", "unsubscribe"], dns: ["ADDRCONFIG", "ADDRGETNETWORKPARAMS", "ALL", "BADFAMILY", "BADFLAGS", "BADHINTS", "BADNAME", "BADQUERY", "BADRESP", "BADSTR", "CANCELLED", "CONNREFUSED", "DESTRUCTION", "EOF", "FILE", "FORMERR", "LOADIPHLPAPI", "NODATA", "NOMEM", "NONAME", "NOTFOUND", "NOTIMP", "NOTINITIALIZED", "REFUSED", "Resolver", "SERVFAIL", "TIMEOUT", "V4MAPPED", "getDefaultResultOrder", "getServers", "lookup", "lookupService", "promises", "resolve", "resolve4", "resolve6", "resolveAny", "resolveCaa", "resolveCname", "resolveMx", "resolveNaptr", "resolveNs", "resolvePtr", "resolveSoa", "resolveSrv", "resolveTlsa", "resolveTxt", "reverse", "setDefaultResultOrder", "setServers"], "dns/promises": ["ADDRGETNETWORKPARAMS", "BADFAMILY", "BADFLAGS", "BADHINTS", "BADNAME", "BADQUERY", "BADRESP", "BADSTR", "CANCELLED", "CONNREFUSED", "DESTRUCTION", "EOF", "FILE", "FORMERR", "LOADIPHLPAPI", "NODATA", "NOMEM", "NONAME", "NOTFOUND", "NOTIMP", "NOTINITIALIZED", "REFUSED", "Resolver", "SERVFAIL", "TIMEOUT", "getDefaultResultOrder", "getServers", "lookup", "lookupService", "resolve", "resolve4", "resolve6", "resolveAny", "resolveCaa", "resolveCname", "resolveMx", "resolveNaptr", "resolveNs", "resolvePtr", "resolveSoa", "resolveSrv", "resolveTlsa", "resolveTxt", "reverse", "setDefaultResultOrder", "setServers"], domain: ["Domain", "_stack", "active", "create", "createDomain"], events: ["EventEmitter", "EventEmitterAsyncResource", "addAbortListener", "captureRejectionSymbol", "captureRejections", "defaultMaxListeners", "errorMonitor", "getEventListeners", "getMaxListeners", "init", "listenerCount", "on", "once", "setMaxListeners", "usingDomains"], fs: ["Dir", "Dirent", "F_OK", "FileReadStream", "FileWriteStream", "R_OK", "ReadStream", "Stats", "W_OK", "WriteStream", "X_OK", "_toUnixTimestamp", "access", "accessSync", "appendFile", "appendFileSync", "chmod", "chmodSync", "chown", "chownSync", "close", "closeSync", "constants", "copyFile", "copyFileSync", "cp", "cpSync", "createReadStream", "createWriteStream", "exists", "existsSync", "fchmod", "fchmodSync", "fchown", "fchownSync", "fdatasync", "fdatasyncSync", "fstat", "fstatSync", "fsync", "fsyncSync", "ftruncate", "ftruncateSync", "futimes", "futimesSync", "glob", "globSync", "lchmod", "lchmodSync", "lchown", "lchownSync", "link", "linkSync", "lstat", "lstatSync", "lutimes", "lutimesSync", "mkdir", "mkdirSync", "mkdtemp", "mkdtempSync", "open", "openAsBlob", "openSync", "opendir", "opendirSync", "promises", "read", "readFile", "readFileSync", "readSync", "readdir", "readdirSync", "readlink", "readlinkSync", "readv", "readvSync", "realpath", "realpathSync", "rename", "renameSync", "rm", "rmSync", "rmdir", "rmdirSync", "stat", "statSync", "statfs", "statfsSync", "symlink", "symlinkSync", "truncate", "truncateSync", "unlink", "unlinkSync", "unwatchFile", "utimes", "utimesSync", "watch", "watchFile", "write", "writeFile", "writeFileSync", "writeSync", "writev", "writevSync"], "fs/promises": ["access", "appendFile", "chmod", "chown", "constants", "copyFile", "cp", "glob", "lchmod", "lchown", "link", "lstat", "lutimes", "mkdir", "mkdtemp", "open", "opendir", "readFile", "readdir", "readlink", "realpath", "rename", "rm", "rmdir", "stat", "statfs", "symlink", "truncate", "unlink", "utimes", "watch", "writeFile"], http: ["Agent", "ClientRequest", "CloseEvent", "IncomingMessage", "METHODS", "MessageEvent", "OutgoingMessage", "STATUS_CODES", "Server", "ServerResponse", "WebSocket", "_connectionListener", "createServer", "get", "globalAgent", "maxHeaderSize", "request", "setMaxIdleHTTPParsers", "validateHeaderName", "validateHeaderValue"], http2: ["Http2ServerRequest", "Http2ServerResponse", "connect", "constants", "createSecureServer", "createServer", "getDefaultSettings", "getPackedSettings", "getUnpackedSettings", "performServerHandshake", "sensitiveHeaders"], https: ["Agent", "Server", "createServer", "get", "globalAgent", "request"], inspector: ["Network", "NetworkResources", "Session", "close", "console", "open", "url", "waitForDebugger"], "inspector/promises": ["Network", "NetworkResources", "Session", "close", "console", "open", "url", "waitForDebugger"], module: ["Module", "SourceMap", "_cache", "_debug", "_extensions", "_findPath", "_initPaths", "_load", "_nodeModulePaths", "_pathCache", "_preloadModules", "_resolveFilename", "_resolveLookupPaths", "builtinModules", "constants", "createRequire", "enableCompileCache", "findPackageJSON", "findSourceMap", "flushCompileCache", "getCompileCacheDir", "getSourceMapsSupport", "globalPaths", "isBuiltin", "register", "registerHooks", "runMain", "setSourceMapsSupport", "stripTypeScriptTypes", "syncBuiltinESMExports"], net: ["BlockList", "Server", "Socket", "SocketAddress", "Stream", "_createServerHandle", "_normalizeArgs", "_setSimultaneousAccepts", "connect", "createConnection", "createServer", "getDefaultAutoSelectFamily", "getDefaultAutoSelectFamilyAttemptTimeout", "isIP", "isIPv4", "isIPv6", "setDefaultAutoSelectFamily", "setDefaultAutoSelectFamilyAttemptTimeout"], os: ["EOL", "arch", "availableParallelism", "constants", "cpus", "devNull", "endianness", "freemem", "getPriority", "homedir", "hostname", "loadavg", "machine", "networkInterfaces", "platform", "release", "setPriority", "tmpdir", "totalmem", "type", "uptime", "userInfo", "version"], path: ["_makeLong", "basename", "delimiter", "dirname", "extname", "format", "isAbsolute", "join", "matchesGlob", "normalize", "parse", "posix", "relative", "resolve", "sep", "toNamespacedPath", "win32"], "path/posix": ["_makeLong", "basename", "delimiter", "dirname", "extname", "format", "isAbsolute", "join", "matchesGlob", "normalize", "parse", "posix", "relative", "resolve", "sep", "toNamespacedPath", "win32"], "path/win32": ["_makeLong", "basename", "delimiter", "dirname", "extname", "format", "isAbsolute", "join", "matchesGlob", "normalize", "parse", "posix", "relative", "resolve", "sep", "toNamespacedPath", "win32"], perf_hooks: ["Performance", "PerformanceEntry", "PerformanceMark", "PerformanceMeasure", "PerformanceObserver", "PerformanceObserverEntryList", "PerformanceResourceTiming", "constants", "createHistogram", "monitorEventLoopDelay", "performance"], process: ["_debugEnd", "_debugProcess", "_events", "_eventsCount", "_exiting", "_fatalException", "_getActiveHandles", "_getActiveRequests", "_kill", "_linkedBinding", "_maxListeners", "_preload_modules", "_rawDebug", "_startProfilerIdleNotifier", "_stopProfilerIdleNotifier", "_tickCallback", "abort", "allowedNodeEnvironmentFlags", "arch", "argv", "argv0", "assert", "availableMemory", "binding", "chdir", "config", "constrainedMemory", "cpuUsage", "cwd", "debugPort", "dlopen", "domain", "emitWarning", "env", "execArgv", "execPath", "execve", "exit", "exitCode", "features", "finalization", "getActiveResourcesInfo", "getBuiltinModule", "getegid", "geteuid", "getgid", "getgroups", "getuid", "hasUncaughtExceptionCaptureCallback", "hrtime", "initgroups", "kill", "loadEnvFile", "memoryUsage", "moduleLoadList", "nextTick", "noProcessWarnings", "openStdin", "pid", "platform", "ppid", "reallyExit", "ref", "release", "report", "resourceUsage", "setSourceMapsEnabled", "setUncaughtExceptionCaptureCallback", "setegid", "seteuid", "setgid", "setgroups", "setuid", "sourceMapsEnabled", "stderr", "stdin", "stdout", "threadCpuUsage", "title", "umask", "unref", "uptime", "version", "versions"], punycode: ["decode", "encode", "toASCII", "toUnicode", "ucs2", "version"], querystring: ["decode", "encode", "escape", "parse", "stringify", "unescape", "unescapeBuffer"], readline: ["Interface", "clearLine", "clearScreenDown", "createInterface", "cursorTo", "emitKeypressEvents", "moveCursor", "promises"], "readline/promises": ["Interface", "Readline", "createInterface"], repl: ["REPLServer", "REPL_MODE_SLOPPY", "REPL_MODE_STRICT", "Recoverable", "isValidSyntax", "start", "writer"], stream: ["Duplex", "PassThrough", "Readable", "Stream", "Transform", "Writable", "_isArrayBufferView", "_isUint8Array", "_uint8ArrayToBuffer", "addAbortSignal", "compose", "destroy", "duplexPair", "finished", "getDefaultHighWaterMark", "isDestroyed", "isDisturbed", "isErrored", "isReadable", "isWritable", "pipeline", "promises", "setDefaultHighWaterMark"], "stream/consumers": ["arrayBuffer", "blob", "buffer", "json", "text"], "stream/promises": ["finished", "pipeline"], "stream/web": ["ByteLengthQueuingStrategy", "CompressionStream", "CountQueuingStrategy", "DecompressionStream", "ReadableByteStreamController", "ReadableStream", "ReadableStreamBYOBReader", "ReadableStreamBYOBRequest", "ReadableStreamDefaultController", "ReadableStreamDefaultReader", "TextDecoderStream", "TextEncoderStream", "TransformStream", "TransformStreamDefaultController", "WritableStream", "WritableStreamDefaultController", "WritableStreamDefaultWriter"], string_decoder: ["StringDecoder"], sys: ["MIMEParams", "MIMEType", "TextDecoder", "TextEncoder", "_errnoException", "_exceptionWithHostPort", "_extend", "aborted", "callbackify", "debug", "debuglog", "deprecate", "diff", "format", "formatWithOptions", "getCallSite", "getCallSites", "getSystemErrorMap", "getSystemErrorMessage", "getSystemErrorName", "inherits", "inspect", "isArray", "isBoolean", "isBuffer", "isDate", "isDeepStrictEqual", "isError", "isFunction", "isNull", "isNullOrUndefined", "isNumber", "isObject", "isPrimitive", "isRegExp", "isString", "isSymbol", "isUndefined", "log", "parseArgs", "parseEnv", "promisify", "setTraceSigInt", "stripVTControlCharacters", "styleText", "toUSVString", "transferableAbortController", "transferableAbortSignal", "types"], timers: ["_unrefActive", "active", "clearImmediate", "clearInterval", "clearTimeout", "enroll", "promises", "setImmediate", "setInterval", "setTimeout", "unenroll"], "timers/promises": ["scheduler", "setImmediate", "setInterval", "setTimeout"], tls: ["CLIENT_RENEG_LIMIT", "CLIENT_RENEG_WINDOW", "DEFAULT_CIPHERS", "DEFAULT_ECDH_CURVE", "DEFAULT_MAX_VERSION", "DEFAULT_MIN_VERSION", "SecureContext", "Server", "TLSSocket", "checkServerIdentity", "connect", "convertALPNProtocols", "createSecureContext", "createSecurePair", "createServer", "getCACertificates", "getCiphers", "rootCertificates", "setDefaultCACertificates"], trace_events: ["createTracing", "getEnabledCategories"], tty: ["ReadStream", "WriteStream", "isatty"], url: ["URL", "URLSearchParams", "Url", "domainToASCII", "domainToUnicode", "fileURLToPath", "fileURLToPathBuffer", "format", "parse", "pathToFileURL", "resolve", "resolveObject", "urlToHttpOptions"], util: ["MIMEParams", "MIMEType", "TextDecoder", "TextEncoder", "_errnoException", "_exceptionWithHostPort", "_extend", "aborted", "callbackify", "debug", "debuglog", "deprecate", "diff", "format", "formatWithOptions", "getCallSite", "getCallSites", "getSystemErrorMap", "getSystemErrorMessage", "getSystemErrorName", "inherits", "inspect", "isArray", "isBoolean", "isBuffer", "isDate", "isDeepStrictEqual", "isError", "isFunction", "isNull", "isNullOrUndefined", "isNumber", "isObject", "isPrimitive", "isRegExp", "isString", "isSymbol", "isUndefined", "log", "parseArgs", "parseEnv", "promisify", "setTraceSigInt", "stripVTControlCharacters", "styleText", "toUSVString", "transferableAbortController", "transferableAbortSignal", "types"], "util/types": ["isAnyArrayBuffer", "isArgumentsObject", "isArrayBuffer", "isArrayBufferView", "isAsyncFunction", "isBigInt64Array", "isBigIntObject", "isBigUint64Array", "isBooleanObject", "isBoxedPrimitive", "isCryptoKey", "isDataView", "isDate", "isExternal", "isFloat16Array", "isFloat32Array", "isFloat64Array", "isGeneratorFunction", "isGeneratorObject", "isInt16Array", "isInt32Array", "isInt8Array", "isKeyObject", "isMap", "isMapIterator", "isModuleNamespaceObject", "isNativeError", "isNumberObject", "isPromise", "isProxy", "isRegExp", "isSet", "isSetIterator", "isSharedArrayBuffer", "isStringObject", "isSymbolObject", "isTypedArray", "isUint16Array", "isUint32Array", "isUint8Array", "isUint8ClampedArray", "isWeakMap", "isWeakSet"], v8: ["DefaultDeserializer", "DefaultSerializer", "Deserializer", "GCProfiler", "Serializer", "cachedDataVersionTag", "deserialize", "getCppHeapStatistics", "getHeapCodeStatistics", "getHeapSnapshot", "getHeapSpaceStatistics", "getHeapStatistics", "isStringOneByteRepresentation", "promiseHooks", "queryObjects", "serialize", "setFlagsFromString", "setHeapSnapshotNearHeapLimit", "startupSnapshot", "stopCoverage", "takeCoverage", "writeHeapSnapshot"], vm: ["Script", "compileFunction", "constants", "createContext", "createScript", "isContext", "measureMemory", "runInContext", "runInNewContext", "runInThisContext"], wasi: ["WASI"], worker_threads: ["BroadcastChannel", "MessageChannel", "MessagePort", "SHARE_ENV", "Worker", "getEnvironmentData", "isInternalThread", "isMainThread", "isMarkedAsUntransferable", "markAsUncloneable", "markAsUntransferable", "moveMessagePortToContext", "parentPort", "postMessageToThread", "receiveMessageOnPort", "resourceLimits", "setEnvironmentData", "threadId", "threadName", "workerData"], zlib: ["BrotliCompress", "BrotliDecompress", "Deflate", "DeflateRaw", "Gunzip", "Gzip", "Inflate", "InflateRaw", "Unzip", "ZstdCompress", "ZstdDecompress", "brotliCompress", "brotliCompressSync", "brotliDecompress", "brotliDecompressSync", "codes", "constants", "crc32", "createBrotliCompress", "createBrotliDecompress", "createDeflate", "createDeflateRaw", "createGunzip", "createGzip", "createInflate", "createInflateRaw", "createUnzip", "createZstdCompress", "createZstdDecompress", "deflate", "deflateRaw", "deflateRawSync", "deflateSync", "gunzip", "gunzipSync", "gzip", "gzipSync", "inflate", "inflateRaw", "inflateRawSync", "inflateSync", "unzip", "unzipSync", "zstdCompress", "zstdCompressSync", "zstdDecompress", "zstdDecompressSync"], sea: ["getAsset", "getAssetAsBlob", "getAssetKeys", "getRawAsset", "isSea"], sqlite: ["DatabaseSync", "StatementSync", "backup", "constants"], test: ["after", "afterEach", "assert", "before", "beforeEach", "describe", "it", "mock", "only", "run", "skip", "snapshot", "suite", "test", "todo"], "test/reporters": ["dot", "junit", "lcov", "spec", "tap"] };

// src/kernel/esm.ts
var ESM_PREFIX = "/__ov/esm";
var BUILTIN_PREFIX = "/__ov/builtin/";
var ERROR_PREFIX = "/__ov/esm-error";
var MW_PREFIX = "/__ov/mw/";
var dec4 = new TextDecoder();
var ID = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
var RESERVED2 = /* @__PURE__ */ new Set(["break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "export", "extends", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "return", "super", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "yield", "let", "static", "enum", "await", "implements", "package", "protected", "interface", "private", "public", "null", "true", "false", "arguments", "eval"]);
function esmUrlFor(p, query = "") {
  return RUNTIME_BASE + ESM_PREFIX + encodePathForUrl(p) + query;
}
function builtinUrlFor(name) {
  return RUNTIME_BASE + BUILTIN_PREFIX + encodeURIComponent(name);
}
function errorUrlFor(code, msg, names) {
  return `${RUNTIME_BASE}${ERROR_PREFIX}?code=${encodeURIComponent(code)}&msg=${encodeURIComponent(msg)}&names=${encodeURIComponent(names.join(","))}`;
}
function vfsResolveHost(kernel2) {
  const vfs = kernel2.vfs;
  return {
    kind(p) {
      const n = vfs.tryLookup(p, true);
      if (!n) return null;
      return isDir(n) ? "dir" : "file";
    },
    readText(p) {
      try {
        return dec4.decode(vfs.readFile(p));
      } catch {
        return null;
      }
    },
    realpath(p) {
      return vfs.realpath(p);
    },
    version(p) {
      const n = vfs.tryLookup(p, true);
      return n ? `${n.ino}:${n.mtimeMs}:${n.size}` : null;
    }
  };
}
var EsmService = class {
  constructor(kernel2) {
    this.kernel = kernel2;
    this.resolver = new Resolver(vfsResolveHost(kernel2));
    this.ready = init();
  }
  kernel;
  resolver;
  ready;
  cache = /* @__PURE__ */ new Map();
  /** Sources registered by processes, keyed by "<pid>/<id>". */
  registered = /* @__PURE__ */ new Map();
  register(pid, id2, source) {
    this.registered.set(`${pid}/${id2}`, source);
  }
  dropProcess(pid) {
    const prefix = `${pid}/`;
    for (const k of this.registered.keys()) if (k.startsWith(prefix)) this.registered.delete(k);
  }
  sucrase;
  async load(pathname, search) {
    await this.ready;
    if (pathname === ERROR_PREFIX) {
      const q = new URLSearchParams(search);
      const names = [...new Set((q.get("names") ?? "").split(",").filter(Boolean))];
      let body = throwingModule(q.get("code") ?? "ERR_MODULE_NOT_FOUND", q.get("msg") ?? "module not found");
      const ids = names.filter((n) => n !== "default");
      if (ids.length) body += `let ${ids.map((n, i) => `__x${i}`).join(", ")};
export { ${ids.map((n, i) => `__x${i} as ${ID.test(n) && !RESERVED2.has(n) ? n : JSON.stringify(n)}`).join(", ")} };
`;
      if (names.includes("default")) body += "export default undefined;\n";
      return { status: 200, type: "text/javascript", body };
    }
    if (pathname.startsWith(MW_PREFIX)) {
      const key = pathname.slice(MW_PREFIX.length).replace(/\.mjs$/, "");
      const body = this.registered.get(key);
      if (body === void 0) return { status: 200, type: "text/javascript", body: throwingModule("ERR_INTERNAL_ASSERTION", `module ${key} is not registered`) };
      return { status: 200, type: "text/javascript", body };
    }
    if (pathname.startsWith(BUILTIN_PREFIX)) {
      const name = decodeURIComponent(pathname.slice(BUILTIN_PREFIX.length)).replace(/\.mjs$/, "");
      return { status: 200, type: "text/javascript", body: builtinFacade(name) };
    }
    if (!pathname.startsWith(ESM_PREFIX + "/")) return { status: 404, type: "text/plain", body: "not found" };
    let file2;
    try {
      file2 = decodeURIComponent(pathname.slice(ESM_PREFIX.length));
    } catch {
      file2 = pathname.slice(ESM_PREFIX.length);
    }
    try {
      return { status: 200, type: "text/javascript", body: await this.moduleSource(file2, search) };
    } catch (e) {
      return { status: 200, type: "text/javascript", body: throwingModule(e?.code ?? "ERR_MODULE_NOT_FOUND", e?.message ?? String(e)) };
    }
  }
  async moduleSource(file2, search) {
    const vfs = this.kernel.vfs;
    const node = vfs.tryLookup(file2, true);
    if (!node) throw new ResolveError("ERR_MODULE_NOT_FOUND", `Cannot find module '${file2}'`);
    if (isDir(node)) throw new ResolveError("ERR_UNSUPPORTED_DIR_IMPORT", `Directory import '${file2}' is not supported`);
    const params = new URLSearchParams(search);
    const forceJson = params.has("ov-json");
    const version = `${node.ino}:${node.mtimeMs}:${node.size}:${forceJson}`;
    const key = file2;
    const hit = this.cache.get(key);
    if (hit && hit.v === version) return hit.body;
    const src = dec4.decode(vfs.readFile(file2));
    let format = forceJson ? "json" : this.resolver.formatOf(file2);
    let body;
    switch (format) {
      case "json":
        body = `export default JSON.parse(${JSON.stringify(src)});
`;
        break;
      case "addon":
        throw new ResolveError("ERR_DLOPEN_FAILED", `Native addons are not supported in OpenVessel: ${file2}`);
      case "wasm":
        throw new ResolveError("ERR_UNKNOWN_FILE_EXTENSION", `WebAssembly ES module integration is not supported: ${file2}`);
      case "commonjs":
      case "commonjs-typescript":
        body = this.cjsFacade(file2, src);
        break;
      case "module-typescript":
        body = await this.rewriteEsm(file2, await this.stripTypes(src, file2));
        break;
      case "module":
        body = await this.rewriteEsm(file2, src);
        break;
      default: {
        let isEsm = false;
        try {
          const r = parse(src);
          isEsm = !!r[3];
        } catch {
          isEsm = false;
        }
        format = isEsm ? "module" : "commonjs";
        body = isEsm ? await this.rewriteEsm(file2, src) : this.cjsFacade(file2, src);
      }
    }
    if (this.cache.size > 4e3) this.cache.clear();
    this.cache.set(key, { v: version, body });
    return body;
  }
  async stripTypes(src, file2) {
    this.sucrase ??= await import("./chunks/esm-AKDCBCJF.js");
    return this.sucrase.transform(src, { transforms: ["typescript"], filePath: file2, disableESTransforms: true, keepUnusedImports: true }).code;
  }
  /** Rewrites import specifiers, import.meta and dynamic import(). */
  async rewriteEsm(file2, src) {
    const fileUrl = pathToFileURLString(file2);
    let imports;
    try {
      [imports] = parse(src, file2);
    } catch (e) {
      return src;
    }
    let out = "";
    let last = 0;
    let usesMeta = false;
    let usesDyn = false;
    if (src.startsWith("#!")) {
      out = "//";
      last = 2;
    }
    const edits = [];
    for (const imp of imports) {
      if (imp.type === "import-meta") {
        edits.push({ s: imp.start, e: imp.end, text: "__ov_m()" });
        usesMeta = true;
        continue;
      }
      if (imp.type === "dynamic") {
        const kw = src.lastIndexOf("import", imp.dynamicStart ?? imp.start);
        if (kw >= 0 && kw >= imp.importStart) {
          edits.push({ s: kw, e: kw + 6, text: "__ov_di" });
          usesDyn = true;
        }
        continue;
      }
      if (imp.specifier == null) continue;
      const spec = imp.specifier;
      let url;
      const isJsonAttr = Array.isArray(imp.attributes) && imp.attributes.some(([k, v]) => k === "type" && v === "json");
      try {
        url = this.resolveToUrl(spec, file2, isJsonAttr);
      } catch (e) {
        const names = importedNames(src.slice(imp.importStart, imp.start));
        const msg = `${e?.message ?? e}`;
        url = errorUrlFor(e?.code ?? "ERR_MODULE_NOT_FOUND", msg, names);
      }
      edits.push({ s: imp.start, e: imp.end, text: url.replace(/['"\\\n]/g, (c) => "\\" + c) });
      if (imp.attributesStart != null && imp.attributesStart >= 0) {
        const open = src.indexOf("{", imp.attributesStart);
        const close = src.indexOf("}", open);
        const kwPos = Math.max(src.lastIndexOf("with", imp.attributesStart), src.lastIndexOf("assert", imp.attributesStart));
        if (open !== -1 && close !== -1 && kwPos > imp.end) edits.push({ s: kwPos, e: close + 1, text: "" });
      }
    }
    edits.sort((a, b) => a.s - b.s);
    for (const ed of edits) {
      if (ed.s < last) continue;
      out += src.slice(last, ed.s) + ed.text;
      last = ed.e;
    }
    out += src.slice(last);
    const lit = JSON.stringify(fileUrl);
    let tail2 = "";
    if (usesMeta) tail2 += `
var __ov_mo;function __ov_m(){return __ov_mo||(__ov_mo=globalThis.__ov.meta(${lit}))}`;
    if (usesDyn) tail2 += `
function __ov_di(s,o){return globalThis.__ov.dimport(s,o,${lit})}`;
    if (tail2) {
      const m = /\n\/\/# sourceMappingURL=[^\n]*\s*$/.exec(out);
      if (m) out = out.slice(0, m.index) + tail2 + m[0];
      else out += tail2;
    }
    out += `
//# sourceURL=${fileUrl}`;
    return out;
  }
  resolveToUrl(spec, parentFile, json = false) {
    const b = builtinName(spec);
    if (b) return builtinUrlFor(b);
    const r = this.resolver.resolveEsm(spec, parentFile, ESM_CONDITIONS);
    if (r.path.startsWith("node:")) return builtinUrlFor(r.path.slice(5));
    if (r.path.startsWith("data:")) return r.path;
    let q = r.query;
    if (json && !r.path.endsWith(".json")) q += (q ? "&" : "?") + "ov-json";
    return esmUrlFor(r.path, q);
  }
  /** ES module facade over a CommonJS module (named exports via cjs-module-lexer). */
  cjsFacade(file2, src) {
    const names = /* @__PURE__ */ new Set();
    this.collectCjsExports(file2, src, names, /* @__PURE__ */ new Set(), 0);
    names.delete("default");
    const lit = JSON.stringify(file2);
    let body = `const __m = globalThis.__ov.requireForImport(${lit});
export default __m;
export { __m as "module.exports" };
`;
    const list = [...names].filter((n) => n !== "module.exports");
    if (list.length) {
      const binds = list.map((n, i) => `${JSON.stringify(n)}: __e${i}`).join(", ");
      body += `const { ${binds} } = (__m !== null && (typeof __m === 'object' || typeof __m === 'function')) ? __m : {};
`;
      body += `export { ${list.map((n, i) => `__e${i} as ${ID.test(n) && !RESERVED2.has(n) ? n : JSON.stringify(n)}`).join(", ")} };
`;
    }
    return body;
  }
  collectCjsExports(file2, src, names, seen, depth) {
    if (seen.has(file2) || depth > 8) return;
    seen.add(file2);
    let res;
    try {
      res = (0, import_lexer.parse)(src);
    } catch {
      return;
    }
    for (const n of res.exports) names.add(n);
    for (const re of res.reexports) {
      if (builtinName(re)) continue;
      try {
        const target = this.resolver.resolveCjs(re, dirname(file2));
        if (target.startsWith("node:")) continue;
        if (!/\.(c?js|json)$/.test(target) && extname(target) !== "") continue;
        const tsrc = dec4.decode(this.kernel.vfs.readFile(target));
        this.collectCjsExports(target, tsrc, names, seen, depth + 1);
      } catch {
      }
    }
  }
};
function builtinFacade(name) {
  const lit = JSON.stringify(name);
  const names = (builtin_exports_default[name] ?? []).filter((n) => !RESERVED2.has(n));
  let body = `const m = globalThis.__ov.builtin(${lit});
export default m;
`;
  if (names.length) body += `export const { ${names.join(", ")} } = m;
`;
  return body;
}
function importedNames(clause) {
  const names = [];
  const c = clause.replace(/^\s*(import|export)\s+/, "").replace(/\s+from\s*['"]?$/, "").replace(/\btype\s+/g, "");
  const brace = /\{([^}]*)\}/.exec(c);
  if (brace) {
    for (const part of brace[1].split(",")) {
      const p = part.trim();
      if (!p) continue;
      const m = /^("[^"]+"|'[^']+'|[\w$]+)(?:\s+as\s+.+)?$/.exec(p);
      if (m) names.push(m[1].replace(/^["']|["']$/g, ""));
    }
  }
  const before = brace ? c.slice(0, brace.index) : c;
  const def = /^\s*([\w$]+)\s*(,|$)/.exec(before);
  if (def && def[1] !== "from" && !c.trimStart().startsWith("*") && !/^\s*export/.test(clause)) names.push("default");
  return names;
}
function throwingModule(code, message) {
  return `const e = new Error(${JSON.stringify(message)}); e.code = ${JSON.stringify(code)}; throw e;
export {};
`;
}

// src/kernel/tcp.ts
var enc5 = new TextEncoder();
var dec5 = new TextDecoder();
var EPHEMERAL_LOW = 32768;
var EPHEMERAL_HIGH = 60999;
var TcpBridge = class {
  constructor(kernel2) {
    this.kernel = kernel2;
  }
  kernel;
  /** Ephemeral ports of open connections (the connecting ends') */
  portsInUse = /* @__PURE__ */ new Set();
  nextPort = EPHEMERAL_LOW + Math.floor(Math.random() * (EPHEMERAL_HIGH - EPHEMERAL_LOW + 1));
  /** A free ephemeral port (not listened on, not used by another connection); 0 when all are taken. */
  ephemeralPort() {
    for (let i = 0; i <= EPHEMERAL_HIGH - EPHEMERAL_LOW; i++) {
      const p = this.nextPort;
      this.nextPort = p >= EPHEMERAL_HIGH ? EPHEMERAL_LOW : p + 1;
      if (!this.portsInUse.has(p) && !this.kernel.ports.has(p)) return p;
    }
    return 0;
  }
  /**
   * Opens a connection to a listener; returns the connecting side's end and its port. The connecting
   * side gets an ephemeral port (`from.port` given: that one, e.g. 0 for a Unix domain socket), which
   * the accepting side sees as remotePort and which is free again once the connecting end is closed.
   */
  connect(rec, from = { address: "127.0.0.1" }, accept = "tcp-accept") {
    let owner = rec;
    if (rec.acceptors?.length) {
      const all = [{ pid: rec.pid, tid: rec.tid }, ...rec.acceptors].filter((a) => this.kernel.procs.get(a.pid)?.state === "running");
      if (all.length) owner = all[rec.next = ((rec.next ?? -1) + 1) % all.length];
    }
    const proc = this.kernel.procs.get(owner.pid);
    if (!proc || proc.state !== "running") return null;
    const port = from.port ?? this.ephemeralPort();
    if (from.port === void 0 && !port) return null;
    const [serverEnd, clientEnd] = createSocketPair();
    let fd;
    try {
      fd = proc.allocFd(serverEnd, 3);
    } catch {
      clientEnd.unref();
      return null;
    }
    if (from.port === void 0) {
      this.portsInUse.add(port);
      const close = clientEnd.onClose;
      clientEnd.onClose = () => {
        close?.();
        this.portsInUse.delete(port);
      };
    }
    const thread = proc.threads.get(owner.tid) ?? proc.threads.values().next().value;
    thread?.worker.postMessage({ t: accept, port: rec.port, fd, remoteAddress: from.address, remotePort: port });
    this.lastAcceptor = { pid: proc.pid, tid: thread?.tid ?? 0 };
    return { end: clientEnd, port };
  }
  /** Who was handed the last connection made by connect(). */
  lastAcceptor = null;
  /** NetRouter.request for raw listeners: HTTP message ⇄ HTTP/1.1 bytes. */
  request(rec, init2, responder) {
    const conn = this.connect(rec)?.end;
    if (!conn) {
      responder.error(`connect ECONNREFUSED 127.0.0.1:${rec.port}`);
      return null;
    }
    conn.bridged = true;
    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      conn.unref();
    };
    const write = (d) => {
      if (closed) return;
      try {
        conn.write(d);
      } catch {
        close();
      }
    };
    const headers = init2.headers.filter(([k]) => !/^(connection|keep-alive|transfer-encoding|upgrade|sec-websocket-key|sec-websocket-version)$/i.test(k));
    if (!headers.some(([k]) => k.toLowerCase() === "host")) headers.unshift(["Host", `localhost:${rec.port}`]);
    const chunked = init2.hasBody && !headers.some(([k]) => k.toLowerCase() === "content-length");
    if (init2.upgrade) {
      const key = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
      headers.push(["Connection", "Upgrade"], ["Upgrade", "websocket"], ["Sec-WebSocket-Version", "13"], ["Sec-WebSocket-Key", key]);
    } else {
      headers.push(["Connection", "close"]);
      if (chunked) headers.push(["Transfer-Encoding", "chunked"]);
    }
    let head2 = `${init2.method} ${init2.url} HTTP/1.1\r
`;
    for (const [k, v] of headers) head2 += `${k}: ${v}\r
`;
    write(enc5.encode(head2 + "\r\n"));
    const parser = new ResponseParser(responder, () => upgraded());
    let ws = null;
    const upgraded = () => {
      ws = new FrameParser((opcode, payload) => {
        if (opcode === 1) responder.wsMessage?.(dec5.decode(payload), false);
        else if (opcode === 2) responder.wsMessage?.(payload, true);
        else if (opcode === 8) {
          const code = payload.length >= 2 ? payload[0] << 8 | payload[1] : 1005;
          responder.wsClose?.(code, dec5.decode(payload.subarray(2)));
          close();
        } else if (opcode === 9) write(encodeClientFrame(payload, 10));
      });
      return ws;
    };
    (async () => {
      try {
        for (; ; ) {
          const d = await conn.read(65536);
          if (!d.length) break;
          const frames = ws;
          if (frames) frames.push(d);
          else {
            const rest = parser.push(d);
            const upgradedFrames = ws;
            if (rest && upgradedFrames) upgradedFrames.push(rest);
          }
        }
        if (ws) responder.wsClose?.(1006, "");
        else parser.finish();
      } catch (e) {
        if (!parser.done) responder.error(e?.message ?? "connection reset");
      } finally {
        close();
      }
    })();
    return {
      body: (d) => {
        if (!chunked) return write(d);
        write(enc5.encode(d.length.toString(16) + "\r\n"));
        write(d);
        write(enc5.encode("\r\n"));
      },
      bodyEnd: () => {
        if (chunked) write(enc5.encode("0\r\n\r\n"));
      },
      abort: close,
      wsSend: (data, binary) => write(encodeClientFrame(typeof data === "string" ? enc5.encode(data) : data, binary ? 2 : 1)),
      wsClose: (code, reason) => {
        const r = enc5.encode(reason);
        const p = new Uint8Array(2 + r.length);
        p[0] = code >> 8;
        p[1] = code & 255;
        p.set(r, 2);
        write(encodeClientFrame(p, 8));
      },
      done: () => {
      }
    };
  }
};
var ResponseParser = class {
  constructor(responder, onUpgrade) {
    this.responder = responder;
    this.onUpgrade = onUpgrade;
  }
  responder;
  onUpgrade;
  done = false;
  buf = new Uint8Array(0);
  state = "head";
  remaining = 0;
  /** Feeds bytes; returns bytes left over after a 101 Switching Protocols. */
  push(chunk) {
    const b = new Uint8Array(this.buf.length + chunk.length);
    b.set(this.buf);
    b.set(chunk, this.buf.length);
    this.buf = b;
    for (; ; ) {
      switch (this.state) {
        case "head": {
          const end = indexOf(this.buf, "\r\n\r\n");
          if (end < 0) return null;
          const text = dec5.decode(this.buf.subarray(0, end));
          this.buf = this.buf.subarray(end + 4);
          const [statusLine, ...lines] = text.split("\r\n");
          const m = /^HTTP\/1\.[01] (\d{3}) ?(.*)$/.exec(statusLine);
          const status = m ? Number(m[1]) : 502;
          const headers = [];
          for (const l of lines) {
            const i = l.indexOf(":");
            if (i > 0) headers.push([l.slice(0, i).trim(), l.slice(i + 1).trim()]);
          }
          const get = (n) => headers.find(([k]) => k.toLowerCase() === n)?.[1];
          if (status === 101) {
            this.responder.wsOpen?.(get("sec-websocket-protocol") ?? null, headers);
            this.state = "end";
            this.done = true;
            this.onUpgrade();
            return this.buf.length ? this.buf : null;
          }
          if (status >= 100 && status < 200) continue;
          this.responder.head(status, m?.[2] ?? "", headers.filter(([k]) => !/^(transfer-encoding|connection|keep-alive)$/i.test(k)));
          const te = get("transfer-encoding");
          const cl = get("content-length");
          if (te && /chunked/i.test(te)) this.state = "chunk-size";
          else if (cl !== void 0) {
            this.remaining = Number(cl);
            this.state = this.remaining > 0 ? "length" : "end";
          } else if (status === 204 || status === 304) this.state = "end";
          else this.state = "close";
          if (this.state === "end") this.finishOk();
          break;
        }
        case "length": {
          if (!this.buf.length) return null;
          const n = Math.min(this.remaining, this.buf.length);
          this.responder.data(this.buf.slice(0, n));
          this.buf = this.buf.subarray(n);
          this.remaining -= n;
          if (this.remaining === 0) {
            this.state = "end";
            this.finishOk();
          }
          break;
        }
        case "chunk-size": {
          const end = indexOf(this.buf, "\r\n");
          if (end < 0) return null;
          const size = parseInt(dec5.decode(this.buf.subarray(0, end)).split(";")[0], 16);
          this.buf = this.buf.subarray(end + 2);
          if (!size) this.state = "trailers";
          else {
            this.remaining = size;
            this.state = "chunk-data";
          }
          break;
        }
        case "chunk-data": {
          if (!this.buf.length) return null;
          const n = Math.min(this.remaining, this.buf.length);
          this.responder.data(this.buf.slice(0, n));
          this.buf = this.buf.subarray(n);
          this.remaining -= n;
          if (this.remaining === 0) this.state = "chunk-crlf";
          break;
        }
        case "chunk-crlf":
          if (this.buf.length < 2) return null;
          this.buf = this.buf.subarray(2);
          this.state = "chunk-size";
          break;
        case "trailers": {
          const end = indexOf(this.buf, "\r\n");
          if (end < 0) return null;
          this.buf = this.buf.subarray(end + 2);
          if (end === 0) {
            this.state = "end";
            this.finishOk();
          }
          break;
        }
        case "close":
          if (this.buf.length) this.responder.data(this.buf.slice());
          this.buf = new Uint8Array(0);
          return null;
        case "end":
          return null;
      }
    }
  }
  finishOk() {
    if (this.done) return;
    this.done = true;
    this.responder.end();
  }
  /** The connection closed. */
  finish() {
    if (this.done) return;
    if (this.state === "close") this.finishOk();
    else {
      this.done = true;
      this.responder.error(this.state === "head" ? "socket hang up" : "incomplete response");
    }
  }
};
function indexOf(b, s) {
  const n = s.length;
  outer: for (let i = 0; i + n <= b.length; i++) {
    for (let j = 0; j < n; j++) if (b[i + j] !== s.charCodeAt(j)) continue outer;
    return i;
  }
  return -1;
}

// src/kernel/net.ts
var NetRouter = class {
  constructor(kernel2) {
    this.kernel = kernel2;
    this.tcp = new TcpBridge(kernel2);
  }
  kernel;
  nextRid = 1;
  pending = /* @__PURE__ */ new Map();
  tcp;
  /** Starts a request; returns a handle to stream the body / ws messages, or null if nobody listens. */
  request(port, init2, responder) {
    const rec = this.kernel.ports.get(port);
    if (rec?.host === "raw") return this.tcp.request(rec, init2, responder);
    const proc = rec ? this.kernel.procs.get(rec.pid) : void 0;
    if (!rec || !proc || proc.state !== "running" || rec.host === "tcp-only") {
      responder.error(`connect ECONNREFUSED 127.0.0.1:${port}`);
      return null;
    }
    const rid = this.nextRid++;
    this.pending.set(rid, { proc, tid: rec.tid, responder, port });
    const thread = proc.threads.get(rec.tid) ?? proc.threads.values().next().value;
    const post = (m, t = []) => thread?.worker.postMessage(m, t);
    post({ t: "http-req", rid, port, method: init2.method, url: init2.url, headers: init2.headers, hasBody: init2.hasBody, upgrade: init2.upgrade });
    const onExit = () => {
      if (this.pending.has(rid)) {
        this.pending.delete(rid);
        responder.error("server process exited");
      }
    };
    proc.onExit.add(onExit);
    return {
      rid,
      body: (d) => post({ t: "http-body", rid, data: d }),
      bodyEnd: () => post({ t: "http-body-end", rid }),
      abort: () => {
        this.pending.delete(rid);
        proc.onExit.delete(onExit);
        post({ t: "http-abort", rid });
      },
      wsSend: (data, binary) => post({ t: "ws-msg", rid, data, binary }),
      wsClose: (code, reason) => post({ t: "ws-close", rid, code, reason }),
      done: () => proc.onExit.delete(onExit)
    };
  }
  /** Messages from the server process about a request. Returns true if handled. */
  fromProcess(msg) {
    const p = this.pending.get(msg.rid);
    switch (msg.t) {
      case "http-res":
        p?.responder.head(msg.status, msg.statusText, msg.headers);
        return true;
      case "http-res-data":
        p?.responder.data(msg.data);
        return true;
      case "http-res-end":
        if (p) {
          this.pending.delete(msg.rid);
          p.responder.end();
        }
        return true;
      case "http-res-error":
        if (p) {
          this.pending.delete(msg.rid);
          p.responder.error(msg.msg);
        }
        return true;
      case "ws-open":
        p?.responder.wsOpen?.(msg.protocol, msg.headers);
        return true;
      case "ws-send":
        p?.responder.wsMessage?.(msg.data, msg.binary);
        return true;
      case "ws-close":
        if (p) {
          this.pending.delete(msg.rid);
          p.responder.wsClose?.(msg.code, msg.reason);
        }
        return true;
    }
    return false;
  }
};

// src/kernel/npm/cli.ts
init_version();

// src/kernel/npm/semver.ts
var VERSION_RE = /^\s*[=v]*\s*(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-.]+)?\s*$/;
function parse3(v) {
  const m = VERSION_RE.exec(v);
  if (!m) return null;
  return {
    major: +m[1],
    minor: +m[2],
    patch: +m[3],
    prerelease: m[4] ? m[4].split(".").map((p) => /^\d+$/.test(p) ? +p : p) : [],
    raw: v.trim().replace(/^[=v]+/, "")
  };
}
function valid(v) {
  const p = parse3(v);
  return p ? `${p.major}.${p.minor}.${p.patch}${p.prerelease.length ? "-" + p.prerelease.join(".") : ""}` : null;
}
function cmpPre(a, b) {
  if (!a.length && !b.length) return 0;
  if (!a.length) return 1;
  if (!b.length) return -1;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i];
    const y = b[i];
    if (x === void 0) return -1;
    if (y === void 0) return 1;
    if (x === y) continue;
    if (typeof x === "number" && typeof y === "number") return x < y ? -1 : 1;
    if (typeof x === "number") return -1;
    if (typeof y === "number") return 1;
    return x < y ? -1 : 1;
  }
  return 0;
}
function compare(a, b) {
  const x = typeof a === "string" ? parse3(a) : a;
  const y = typeof b === "string" ? parse3(b) : b;
  if (x.major !== y.major) return x.major < y.major ? -1 : 1;
  if (x.minor !== y.minor) return x.minor < y.minor ? -1 : 1;
  if (x.patch !== y.patch) return x.patch < y.patch ? -1 : 1;
  return cmpPre(x.prerelease, y.prerelease);
}
var ANY = [];
function partial(s) {
  const m = /^[=v]*(\d+|[xX*])(?:\.(\d+|[xX*]))?(?:\.(\d+|[xX*]))?(?:-([0-9A-Za-z-.]+))?(?:\+[0-9A-Za-z-.]+)?$/.exec(s.trim());
  if (!m) return null;
  const n = (x) => x === void 0 || /^[xX*]$/.test(x) ? null : +x;
  return { major: n(m[1]), minor: n(m[2]), patch: n(m[3]), pre: m[4] ? m[4].split(".").map((p) => /^\d+$/.test(p) ? +p : p) : [] };
}
function ver(major, minor, patch, pre = []) {
  return { major, minor, patch, prerelease: pre, raw: `${major}.${minor}.${patch}${pre.length ? "-" + pre.join(".") : ""}` };
}
function expandComparator(tok) {
  const m = /^(<=|>=|<|>|=|~>|~|\^)?\s*(.*)$/.exec(tok.trim());
  if (!m) return null;
  const op = m[1] ?? "";
  const p = partial(m[2]);
  if (!p) return null;
  const { major, minor, patch, pre } = p;
  if (op === "^") {
    if (major === null) return ANY;
    if (minor === null) return [{ op: ">=", v: ver(major, 0, 0) }, { op: "<", v: ver(major + 1, 0, 0, [0]) }];
    if (patch === null) {
      if (major === 0) return [{ op: ">=", v: ver(0, minor, 0) }, { op: "<", v: ver(0, minor + 1, 0, [0]) }];
      return [{ op: ">=", v: ver(major, minor, 0) }, { op: "<", v: ver(major + 1, 0, 0, [0]) }];
    }
    const lo = ver(major, minor, patch, pre);
    if (major > 0) return [{ op: ">=", v: lo }, { op: "<", v: ver(major + 1, 0, 0, [0]) }];
    if (minor > 0) return [{ op: ">=", v: lo }, { op: "<", v: ver(0, minor + 1, 0, [0]) }];
    return [{ op: ">=", v: lo }, { op: "<", v: ver(0, 0, patch + 1, [0]) }];
  }
  if (op === "~" || op === "~>") {
    if (major === null) return ANY;
    if (minor === null) return [{ op: ">=", v: ver(major, 0, 0) }, { op: "<", v: ver(major + 1, 0, 0, [0]) }];
    const lo = ver(major, minor, patch ?? 0, patch === null ? [] : pre);
    return [{ op: ">=", v: lo }, { op: "<", v: ver(major, minor + 1, 0, [0]) }];
  }
  if (op === "" || op === "=") {
    if (major === null) return ANY;
    if (minor === null) return [{ op: ">=", v: ver(major, 0, 0) }, { op: "<", v: ver(major + 1, 0, 0, [0]) }];
    if (patch === null) return [{ op: ">=", v: ver(major, minor, 0) }, { op: "<", v: ver(major, minor + 1, 0, [0]) }];
    return [{ op: "=", v: ver(major, minor, patch, pre) }];
  }
  if (major === null) return op === "<" || op === ">" ? [{ op: "<", v: ver(0, 0, 0, [0]) }] : ANY;
  if (op === ">") {
    if (minor === null) return [{ op: ">=", v: ver(major + 1, 0, 0) }];
    if (patch === null) return [{ op: ">=", v: ver(major, minor + 1, 0) }];
    return [{ op: ">", v: ver(major, minor, patch, pre) }];
  }
  if (op === ">=") return [{ op: ">=", v: ver(major, minor ?? 0, patch ?? 0, pre) }];
  if (op === "<") {
    if (minor === null) return [{ op: "<", v: ver(major, 0, 0, [0]) }];
    if (patch === null) return [{ op: "<", v: ver(major, minor, 0, [0]) }];
    return [{ op: "<", v: ver(major, minor, patch, pre) }];
  }
  if (minor === null) return [{ op: "<", v: ver(major + 1, 0, 0, [0]) }];
  if (patch === null) return [{ op: "<", v: ver(major, minor + 1, 0, [0]) }];
  return [{ op: "<=", v: ver(major, minor, patch, pre) }];
}
var rangeCache = /* @__PURE__ */ new Map();
function parseRange(range) {
  const key = range;
  if (rangeCache.has(key)) return rangeCache.get(key);
  const out = [];
  for (let part of range.split("||")) {
    part = part.trim();
    if (part === "" || part === "*" || part === "x" || part === "X") {
      out.push(ANY);
      continue;
    }
    const hy = /^(\S+)\s+-\s+(\S+)$/.exec(part);
    if (hy) {
      const a = partial(hy[1]);
      const b = partial(hy[2]);
      if (!a || !b) {
        rangeCache.set(key, null);
        return null;
      }
      const set2 = [];
      if (a.major !== null) set2.push({ op: ">=", v: ver(a.major, a.minor ?? 0, a.patch ?? 0, a.pre) });
      if (b.major !== null) {
        if (b.minor === null) set2.push({ op: "<", v: ver(b.major + 1, 0, 0, [0]) });
        else if (b.patch === null) set2.push({ op: "<", v: ver(b.major, b.minor + 1, 0, [0]) });
        else set2.push({ op: "<=", v: ver(b.major, b.minor, b.patch, b.pre) });
      }
      out.push(set2);
      continue;
    }
    const toks = part.replace(/(<=|>=|<|>|=|~>|~|\^)\s+/g, "$1").split(/\s+/).filter(Boolean);
    const set = [];
    for (const t of toks) {
      const c = expandComparator(t);
      if (!c) {
        rangeCache.set(key, null);
        return null;
      }
      set.push(...c);
    }
    out.push(set);
  }
  rangeCache.set(key, out);
  return out;
}
function testSet(set, v, includePrerelease) {
  for (const c of set) {
    const r = compare(v, c.v);
    switch (c.op) {
      case "<":
        if (!(r < 0)) return false;
        break;
      case "<=":
        if (!(r <= 0)) return false;
        break;
      case ">":
        if (!(r > 0)) return false;
        break;
      case ">=":
        if (!(r >= 0)) return false;
        break;
      case "=":
        if (r !== 0) return false;
        break;
    }
  }
  if (v.prerelease.length && !includePrerelease) {
    for (const c of set) {
      if (c.v.prerelease.length && c.v.prerelease[0] !== 0 && c.v.major === v.major && c.v.minor === v.minor && c.v.patch === v.patch) return true;
      if (c.v.prerelease.length && c.v.prerelease.length && !(c.v.prerelease.length === 1 && c.v.prerelease[0] === 0) && c.v.major === v.major && c.v.minor === v.minor && c.v.patch === v.patch) return true;
    }
    return false;
  }
  return true;
}
function satisfies(version, range, opts = {}) {
  const v = typeof version === "string" ? parse3(version) : version;
  if (!v) return false;
  const r = parseRange(range);
  if (!r) return false;
  return r.some((set) => testSet(set, v, !!opts.includePrerelease));
}
function maxSatisfying(versions, range, opts = {}) {
  let best = null;
  const r = parseRange(range);
  if (!r) return null;
  for (const s of versions) {
    const v = parse3(s);
    if (!v) continue;
    if (!r.some((set) => testSet(set, v, !!opts.includePrerelease))) continue;
    if (!best || compare(v, best) > 0) best = v;
  }
  return best ? best.raw : null;
}
function validRange(range) {
  return parseRange(range) !== null;
}

// src/kernel/npm/install.ts
var dec6 = new TextDecoder();
var enc6 = new TextEncoder();
var SUBSTITUTES = [
  { name: "esbuild", to: "esbuild-wasm" },
  { name: "rollup", to: "@rollup/wasm-node", when: (v) => (parse3(v)?.major ?? 0) >= 4 },
  { name: "lightningcss", to: "lightningcss-wasm" },
  { name: "sass-embedded", to: "sass" }
];
var compatIndex = null;
function compatOrigin() {
  return RUNTIME_BASE || null;
}
function loadCompat() {
  const origin = compatOrigin();
  if (!origin) return Promise.resolve({});
  const p = compatIndex ??= fetch(`${origin}/compat/index.json`).then((r) => {
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    return r.json();
  });
  return p.catch(() => {
    if (compatIndex === p) compatIndex = null;
    return {};
  });
}
var DEP_PINS = [
  // emscripten + emnapi 1.1 glue; @emnapi/runtime 1.2+ changed the callback-info stack it uses
  { pkg: "@img/sharp-wasm32", range: "<0.34.0", dep: "@emnapi/runtime", spec: "1.1.1" }
];
function pinnedSpec(from, dep, spec) {
  const pin = DEP_PINS.find((p) => p.pkg === from.name && p.dep === dep && satisfies(from.version, p.range));
  return pin ? pin.spec : spec;
}
var UPGRADES = [{ name: "sharp", range: "<0.33.0", to: "^0.34.0" }];
function pnpmWorkspacePackages(yaml) {
  const out = [];
  let inPackages = false;
  for (const line of yaml.split(/\r?\n/)) {
    if (/^\S/.test(line)) {
      inPackages = /^packages\s*:/.test(line);
      const inline = /^packages\s*:\s*\[(.*)\]/.exec(line);
      if (inline) for (const p of inline[1].split(",")) out.push(p.trim().replace(/^['"]|['"]$/g, ""));
      continue;
    }
    const m = inPackages && /^\s*-\s*['"]?([^'"#\n]+?)['"]?\s*(#.*)?$/.exec(line);
    if (m) out.push(m[1]);
  }
  return out.filter(Boolean);
}
function listWorkspaces(vfs, root, pkg) {
  pkg ??= readJsonFile(vfs, join(root, "package.json"));
  const patterns = Array.isArray(pkg?.workspaces) ? pkg.workspaces : pkg?.workspaces?.packages ?? [];
  let pnpmWs = [];
  try {
    pnpmWs = pnpmWorkspacePackages(dec6.decode(vfs.readFile(join(root, "pnpm-workspace.yaml"))));
  } catch {
  }
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const pat of [...patterns, ...pnpmWs]) {
    if (pat.startsWith("!")) continue;
    for (const dir of expandWorkspaceGlob(vfs, root, pat)) {
      const wpkg = readJsonFile(vfs, join(dir, "package.json"));
      if (!wpkg?.name || dir === root || seen.has(dir)) continue;
      seen.add(dir);
      out.push({ name: wpkg.name, dir, pkg: wpkg });
    }
  }
  return out;
}
function expandWorkspaceGlob(vfs, root, pat) {
  const parts = pat.replace(/^\.\//, "").replace(/\/$/, "").split("/");
  let bases = [root];
  for (const part of parts) {
    const next = [];
    for (const b of bases) {
      if (part === "*" || part === "**") {
        try {
          for (const [name, t] of vfs.readdirTypes(b)) if (t === 16384 && name !== "node_modules" && !name.startsWith(".")) next.push(join(b, name));
        } catch {
        }
      } else if (part.includes("*")) {
        const re = new RegExp("^" + part.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$");
        try {
          for (const [name, t] of vfs.readdirTypes(b)) if (t === 16384 && re.test(name)) next.push(join(b, name));
        } catch {
        }
      } else next.push(join(b, part));
    }
    bases = next;
  }
  return bases.filter((d) => vfs.exists(join(d, "package.json")));
}
var SKIP = /* @__PURE__ */ new Set(["fsevents", "bufferutil", "utf-8-validate", "cpu-features", "ssh2"]);
var Node = class {
  name;
  version;
  pkg;
  parent;
  /** Packages in this node's node_modules. */
  children = /* @__PURE__ */ new Map();
  /** Absolute directory of this package. */
  dir;
  source;
  dev = false;
  optional = false;
  isRoot = false;
  isWorkspace = false;
  /** The registry manifest of name@version, before a compat package or substitute replaced it. */
  origin;
  constructor(name, version, pkg, parent, dir, source) {
    this.name = name;
    this.version = version;
    this.pkg = pkg;
    this.parent = parent;
    this.dir = dir;
    this.source = source;
  }
  get nodeModules() {
    return join(this.dir, "node_modules");
  }
  /** Resolution chain: this node, its container, and so on up to the root. */
  *chain() {
    let n = this;
    while (n) {
      yield n;
      n = n.parent;
    }
  }
};
function withWasiBinding(opt) {
  if (!opt) return opt;
  const names = Object.keys(opt);
  if (names.some((n) => n.includes("wasm32"))) return opt;
  const native = names.find((n) => /-(linux|darwin|win32|freebsd|android)-(x64|arm64|arm|ia32)(-gnu|-musl|-msvc|-gnueabihf|-eabi)?$/.test(n));
  if (!native) return opt;
  const base = native.replace(/-(linux|darwin|win32|freebsd|android)-(x64|arm64|arm|ia32)(-gnu|-musl|-msvc|-gnueabihf|-eabi)?$/, "");
  return { ...opt, [`${base}-wasm32-wasi`]: opt[native] };
}
function withEmnapi(name, deps) {
  if (!name.endsWith("-wasm32-wasi") || deps?.["@emnapi/core"]) return deps;
  return { "@emnapi/core": "^1.4.0", "@emnapi/runtime": "^1.4.0", ...deps };
}
function pickWasmRuntime(versions, range, emnapi) {
  const pinned = emnapi && valid(emnapi);
  if (!pinned || !isRange(range)) return null;
  const candidates = Object.keys(versions).filter((v) => satisfies(v, range)).sort((a, b) => compare(b, a));
  const ok = (v) => {
    const peer = versions[v].peerDependencies?.["@emnapi/core"];
    return !peer || satisfies(pinned, peer, { includePrerelease: true });
  };
  return candidates.find(ok) ?? null;
}
function withSharpWasm(n, opt) {
  if (n.name !== "sharp" || !satisfies(n.version, ">=0.35.0-0", { includePrerelease: true }) || opt?.["@img/sharp-wasm32"]) return opt;
  return { ...opt, "@img/sharp-wasm32": n.version };
}
function platformOk(pkg) {
  const check = (list, want) => {
    if (!list || !list.length) return true;
    if (list.includes("!" + want)) return false;
    const pos = list.filter((x) => !x.startsWith("!"));
    return pos.length === 0 || pos.includes(want);
  };
  return check(pkg.os, "linux") && check(pkg.cpu, "wasm32");
}
function isRange(spec) {
  return validRange(spec);
}
var Installer = class {
  constructor(o) {
    this.o = o;
  }
  o;
  root;
  edges = /* @__PURE__ */ new Map();
  nodes = [];
  overrides = {};
  warned = /* @__PURE__ */ new Set();
  workspaces = /* @__PURE__ */ new Map();
  /** The compat index, asked once per install. */
  compat = null;
  readJson(p) {
    try {
      return JSON.parse(dec6.decode(this.o.vfs.readFile(p)));
    } catch {
      return null;
    }
  }
  async run() {
    const t0 = performance.now();
    const rootPkg = this.readJson(join(this.o.root, "package.json"));
    if (!rootPkg) throw Object.assign(new Error(`Could not read package.json in ${this.o.root}`), { code: "ENOENT" });
    this.root = new Node(rootPkg.name ?? basename(this.o.root), rootPkg.version ?? "0.0.0", rootPkg, null, this.o.root, { kind: "link" });
    this.root.isRoot = true;
    this.collectOverrides(rootPkg);
    this.setupWorkspaces(rootPkg);
    const queue = [];
    const enqueueDeps = (n, includeDev) => {
      const pkg = n.pkg;
      const add2 = (deps, dev, optional, peer) => {
        for (const [name, spec] of Object.entries(deps ?? {})) {
          if (SKIP.has(name)) continue;
          queue.push({ from: n, name, spec: String(spec), dev, optional, peer });
          if (!/^(file|link|workspace|git|github|https?):/.test(String(spec)) && !String(spec).includes("/") && !this.workspaces.has(name)) this.o.registry.packument(this.aliasTarget(name, String(spec))).catch(() => {
          });
        }
      };
      if (!n.isRoot) pkg.dependencies = withEmnapi(n.name, pkg.dependencies);
      add2(pkg.dependencies, n.dev, n.optional, false);
      if (!this.o.omitOptional) add2(withWasiBinding(withSharpWasm(n, pkg.optionalDependencies)), n.dev, true, false);
      if (includeDev && !this.o.omitDev) add2(pkg.devDependencies, true, false, false);
      if (!this.o.omitPeer && !n.isRoot) {
        const meta = pkg.peerDependenciesMeta ?? {};
        const peers = {};
        for (const [k, v] of Object.entries(pkg.peerDependencies ?? {})) if (!meta[k]?.optional) peers[k] = v;
        add2(peers, n.dev, n.optional, true);
      }
    };
    enqueueDeps(this.root, true);
    for (const ws of this.workspaces.values()) enqueueDeps(ws, true);
    let processed = 0;
    while (queue.length) {
      const item = queue.shift();
      processed++;
      if (processed % 50 === 0) this.o.progress?.(`resolving\u2026 ${this.nodes.length} packages`);
      const placeFrom = item.peer ? item.from.parent ?? item.from : item.from;
      let itemSpec = item.spec;
      if (item.name === "@napi-rs/wasm-runtime" && item.from.name.endsWith("-wasm32-wasi") && !this.overrides[item.name]) {
        const p = await this.o.registry.packument(item.name).catch(() => null);
        const v = p && pickWasmRuntime(p.versions, itemSpec, item.from.pkg.dependencies?.["@emnapi/core"]);
        if (v) itemSpec = v;
      }
      const spec = this.overrides[item.name] ?? pinnedSpec(item.from, item.name, itemSpec);
      const visible = this.findVisible(placeFrom, item.name);
      if (visible && (visible.isWorkspace || this.satisfiesNode(visible, spec) && this.peerSetOk(visible, item.from))) {
        this.addEdge(item.from, item.name, spec, visible, item.spec, item.peer);
        if (!item.dev) this.clearDev(visible);
        if (!item.optional) this.clearOptional(visible);
        continue;
      }
      if (visible && item.peer) {
        this.warnOnce(`peer:${item.from.name}:${item.name}`, `npm warn ERESOLVE ${item.from.name}@${item.from.version} wants peer ${item.name}@"${spec}", found ${visible.version}`);
        this.addEdge(item.from, item.name, spec, visible, item.spec, item.peer);
        continue;
      }
      let resolved;
      try {
        resolved = await this.resolve(item.name, spec);
      } catch (e) {
        if (item.optional) {
          this.warnOnce(`opt:${item.name}`, `npm warn optional skipping ${item.name}@${spec}: ${e.message}`);
          continue;
        }
        throw e;
      }
      if (!resolved) continue;
      if (!platformOk(resolved.pkg)) {
        if (!item.optional) this.warnOnce(`plat:${item.name}`, `npm warn EBADPLATFORM skipping ${item.name}@${resolved.version} (needs ${[resolved.pkg.os, resolved.pkg.cpu].filter(Boolean).join(" / ")})`);
        continue;
      }
      if (resolved.pkg.deprecated) this.warnOnce(`dep:${item.name}@${resolved.version}`, `npm warn deprecated ${item.name}@${resolved.version}: ${resolved.pkg.deprecated}`);
      const pinned = spec !== item.spec && this.overrides[item.name] === void 0;
      const level = pinned ? placeFrom : this.choosePlacement(placeFrom, item.name, resolved.version, resolved.pkg);
      const node = new Node(item.name, resolved.version, resolved.pkg, level, join(level.nodeModules, item.name), resolved.source);
      node.dev = item.dev;
      node.optional = item.optional;
      node.origin = resolved.origin;
      level.children.set(item.name, node);
      this.nodes.push(node);
      this.addEdge(item.from, item.name, spec, node, item.spec, item.peer);
      enqueueDeps(node, false);
    }
    this.o.progress?.(`fetching ${this.nodes.length} packages\u2026`);
    const added = await this.materialize();
    this.linkBins();
    this.writeHiddenLock();
    return { added, total: this.nodes.length, ms: performance.now() - t0 };
  }
  warnOnce(key, msg) {
    if (this.warned.has(key)) return;
    this.warned.add(key);
    this.o.warn(msg);
  }
  collectOverrides(pkg) {
    const take = (o) => {
      if (!o || typeof o !== "object") return;
      for (const [k, v] of Object.entries(o)) {
        if (typeof v !== "string") continue;
        const name = k.replace(/^\*\*\//, "").replace(/@[^@/]+$/, (m) => k.startsWith("@") && k.indexOf("@", 1) === -1 ? m : "");
        if (name.includes("/") && !name.startsWith("@")) continue;
        this.overrides[name] = v.startsWith("$") ? pkg.dependencies?.[v.slice(1)] ?? pkg.devDependencies?.[v.slice(1)] ?? "*" : v;
      }
    };
    take(pkg.overrides);
    take(pkg.resolutions);
    take(pkg.pnpm?.overrides);
  }
  setupWorkspaces(pkg) {
    for (const ws of listWorkspaces(this.o.vfs, this.o.root, pkg)) {
      const n = new Node(ws.name, ws.pkg.version ?? "0.0.0", ws.pkg, this.root, ws.dir, { kind: "link", linkTarget: ws.dir });
      n.isWorkspace = true;
      this.workspaces.set(ws.name, n);
      this.root.children.set(ws.name, n);
      this.nodes.push(n);
    }
  }
  addEdge(from, name, spec, target, rawSpec = spec, peer = false) {
    let l = this.edges.get(name);
    if (!l) this.edges.set(name, l = []);
    l.push({ from, name, spec, rawSpec, target, peer });
  }
  clearDev(n) {
    n.dev = false;
  }
  clearOptional(n) {
    n.optional = false;
  }
  /** A reused package must see the same peer instances as the dependent that wants it. */
  peerSetOk(n, dependent) {
    const pkg = n.pkg;
    const peers = Object.keys(pkg.peerDependencies ?? {});
    if (!peers.length) return true;
    const deps = { ...dependent.pkg.dependencies, ...dependent.pkg.optionalDependencies };
    for (const pn of peers) {
      const own = deps[pn];
      if (own === void 0) continue;
      const theirs = this.findVisible(n, pn);
      const mine = this.findVisible(dependent, pn);
      if (theirs && !this.satisfiesNode(theirs, own)) return false;
      if (mine && theirs && mine !== theirs && this.satisfiesNode(mine, own)) return false;
    }
    return true;
  }
  findVisible(from, name) {
    for (const n of from.chain()) {
      const c = n.children.get(name);
      if (c) return c;
      if (n.isRoot && this.workspaces.has(name)) return this.workspaces.get(name);
    }
    return null;
  }
  satisfiesNode(n, spec) {
    if (n.isWorkspace) return true;
    if (spec.startsWith("npm:")) {
      const at = spec.lastIndexOf("@");
      const range = at > 4 ? spec.slice(at + 1) : "*";
      return isRange(range) ? satisfies(n.version, range, { includePrerelease: true }) : true;
    }
    if (/^(workspace|file|link|catalog):/.test(spec)) return true;
    if (/^(git|github:|https?:)|^[\w-]+\/[\w.-]+(#.*)?$/.test(spec)) return n.source.tarball !== void 0;
    if (!isRange(spec)) return true;
    return satisfies(n.version, spec, { includePrerelease: parse3(n.version)?.prerelease.length ? true : false });
  }
  /** Highest level (container) where name@version can be placed without conflicts. */
  choosePlacement(from, name, version, pkg) {
    let target = from;
    let cur = from;
    const meta = pkg?.peerDependenciesMeta ?? {};
    const peers = Object.entries(pkg?.peerDependencies ?? {}).filter(([k]) => !meta[k]?.optional);
    while (cur.parent) {
      const parent = cur.parent;
      if (parent.children.has(name)) break;
      if (this.wouldShadow(parent, name, version)) break;
      const fromDeps = { ...from.pkg.dependencies, ...from.pkg.optionalDependencies, ...from.isRoot ? from.pkg.devDependencies : {} };
      if (peers.some(([pn, range]) => {
        const v = this.findVisible(parent, pn);
        const here = this.findVisible(cur, pn);
        if (v && v !== here && !this.satisfiesNode(v, String(range))) return true;
        const own = fromDeps[pn];
        if (own === void 0) return false;
        const mine = this.findVisible(from, pn);
        if (mine && this.satisfiesNode(mine, own)) return v !== mine;
        return !!v && !this.satisfiesNode(v, own);
      })) break;
      cur = parent;
      target = cur;
    }
    if (target.children.has(name)) return from;
    return target;
  }
  wouldShadow(level, name, version) {
    const edges = this.edges.get(name);
    if (!edges) return false;
    for (const e of edges) {
      if (e.target.version === version) continue;
      let passes = false;
      for (const n of e.from.chain()) {
        if (n === level) {
          passes = true;
          break;
        }
        if (n.children.get(name) === e.target) break;
      }
      if (passes) return true;
    }
    return false;
  }
  aliasTarget(name, spec) {
    if (spec.startsWith("npm:")) {
      const s = spec.slice(4);
      const at = s.lastIndexOf("@");
      return at > 0 ? s.slice(0, at) : s;
    }
    return name;
  }
  pickVersion(p, name, range) {
    const versions = Object.keys(p.versions ?? {});
    if (!isRange(range)) {
      const tagged = p["dist-tags"]?.[range];
      return tagged && p.versions[tagged] ? tagged : null;
    }
    const hints = this.o.lock.versions.get(name);
    if (hints) {
      const ok = [...hints].filter((v) => p.versions[v] && satisfies(v, range, { includePrerelease: true })).sort((a, b) => compare(b, a));
      if (ok.length) return ok[0];
    }
    const latest = p["dist-tags"]?.latest;
    if (latest && satisfies(latest, range)) return latest;
    return maxSatisfying(versions, range) ?? maxSatisfying(versions, range, { includePrerelease: true });
  }
  async resolve(name, spec) {
    if (spec.startsWith("workspace:") || this.workspaces.has(name)) {
      const ws = this.workspaces.get(name);
      if (ws) return null;
      spec = spec.replace(/^workspace:/, "");
      if (spec === "*" || spec === "^" || spec === "~") spec = "*";
    }
    if (spec.startsWith("catalog:")) spec = "*";
    if (spec.startsWith("file:") || spec.startsWith("link:")) {
      const target = resolve(this.o.root, spec.replace(/^(file|link):/, ""));
      const pkg2 = this.readJson(join(target, "package.json"));
      if (!pkg2) throw Object.assign(new Error(`could not read ${target}/package.json`), { code: "ENOENT" });
      return { version: pkg2.version ?? "0.0.0", pkg: pkg2, source: { kind: "link", linkTarget: target } };
    }
    const gh = /^(?:github:|git\+https:\/\/github\.com\/|git\+ssh:\/\/git@github\.com[:/]|https:\/\/github\.com\/|git:\/\/github\.com\/)?([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:#(.+))?$/.exec(spec);
    if (gh && !spec.startsWith("npm:") && !spec.startsWith("@") && (spec.includes("github") || /^[\w.-]+\/[\w.-]+(#.*)?$/.test(spec))) {
      const ref = gh[3] ?? "HEAD";
      const tarball = `https://codeload.github.com/${gh[1]}/${gh[2]}/tar.gz/${ref.replace(/^semver:/, "")}`;
      const entries = await this.o.registry.tarball(tarball);
      const pj = entries.find((e) => /^[^/]+\/package\.json$/.test(e.path));
      const pkg2 = pj ? JSON.parse(dec6.decode(pj.data)) : { name, version: "0.0.0" };
      return { version: pkg2.version ?? "0.0.0", pkg: { ...pkg2, dist: { tarball } }, source: { kind: "tarball", tarball } };
    }
    if (/^https?:\/\//.test(spec)) {
      const entries = await this.o.registry.tarball(spec);
      const pj = entries.find((e) => /^[^/]+\/package\.json$/.test(e.path));
      const pkg2 = pj ? JSON.parse(dec6.decode(pj.data)) : { name, version: "0.0.0" };
      return { version: pkg2.version ?? "0.0.0", pkg: { ...pkg2, dist: { tarball: spec } }, source: { kind: "tarball", tarball: spec } };
    }
    let realName = name;
    let range = spec || "*";
    if (spec.startsWith("npm:")) {
      const s = spec.slice(4);
      const at = s.lastIndexOf("@");
      if (at > 0) {
        realName = s.slice(0, at);
        range = s.slice(at + 1) || "*";
      } else {
        realName = s;
        range = "*";
      }
    }
    range = range.trim();
    const p = await this.o.registry.packument(realName);
    let version = this.pickVersion(p, realName, range);
    const up = version && UPGRADES.find((u) => u.name === realName && satisfies(version, u.range));
    if (up) version = this.pickVersion(p, realName, up.to);
    if (!version) throw Object.assign(new Error(`No matching version found for ${realName}@${range}.`), { code: "ETARGET" });
    const origin = p.versions[version];
    let pkg = origin;
    let source = { kind: "registry", tarball: pkg.dist.tarball, integrity: pkg.dist.integrity, shasum: pkg.dist.shasum, realName: realName !== name ? realName : void 0, realVersion: version };
    const compat = (await (this.compat ??= loadCompat()))[realName];
    if (compat && satisfies(version, compat.range, { includePrerelease: true })) {
      pkg = { ...compat.pkg, name: realName, version, dist: { tarball: `${compatOrigin()}/compat/${compat.file}`, integrity: compat.integrity } };
      source = { kind: "registry", tarball: `${compatOrigin()}/compat/${compat.file}`, integrity: compat.integrity, realName: compat.pkg.name, realVersion: compat.pkg.version ?? version };
      return { version, pkg, source, origin };
    }
    const sub = SUBSTITUTES.find((s) => s.name === realName && (!s.when || s.when(version)));
    if (sub) {
      try {
        const sp = await this.o.registry.packument(sub.to);
        const sv = sp.versions[version] ? version : maxSatisfying(Object.keys(sp.versions), `~${version}`) ?? maxSatisfying(Object.keys(sp.versions), `^${version}`);
        if (sv) {
          const spkg = sp.versions[sv];
          pkg = { ...spkg, name: realName, version, bin: spkg.bin ?? pkg.bin };
          source = { kind: "registry", tarball: spkg.dist.tarball, integrity: spkg.dist.integrity, shasum: spkg.dist.shasum, realName: sub.to, realVersion: sv };
        }
      } catch {
      }
    }
    return { version, pkg, source, origin };
  }
  // ---------------------------------------------------------------------------
  // writing files
  readHiddenLock() {
    const j = this.readJson(join(this.o.root, "node_modules/.package-lock.json"));
    return j?.packages ?? {};
  }
  rel(dir) {
    return relative(this.o.root, dir);
  }
  async materialize() {
    const vfs = this.o.vfs;
    const prev = this.readHiddenLock();
    const want = /* @__PURE__ */ new Map();
    for (const n of this.nodes) if (!n.isWorkspace) want.set(this.rel(n.dir), n);
    for (const ws of this.workspaces.values()) {
      const link = join(this.root.nodeModules, ws.name);
      want.set(this.rel(link), ws);
    }
    for (const loc of Object.keys(prev)) {
      if (!loc.startsWith("node_modules/") && !loc.includes("/node_modules/")) continue;
      if (!want.has(loc)) vfs.rmrf(join(this.o.root, loc));
    }
    const made = /* @__PURE__ */ new Set();
    const mkdirp = (d) => {
      if (made.has(d)) return;
      if (!vfs.exists(d)) vfs.mkdir(d, 493, true);
      made.add(d);
    };
    let added = 0;
    let done = 0;
    const total = want.size;
    const jobs = [];
    for (const [loc, n] of want) {
      const old = prev[loc];
      const at = join(this.o.root, loc);
      const pj = this.readJson(join(at, "package.json"));
      const link = n.source.kind === "link";
      const ino = vfs.tryLookup(at, false);
      const shapeOk = !!ino && (link ? isLink(ino) : isDir(ino));
      if (old && old.version === n.version && pj && pj.version === n.version && (old.resolved ?? "") === this.resolvedOf(n) && !!old.link === link && shapeOk) {
        done++;
        continue;
      }
      if (link) {
        mkdirp(dirname(at));
        if (vfs.tryLookup(at, false)) vfs.rmrf(at);
        vfs.symlink(relative(dirname(at), n.source.linkTarget), at);
        added++;
        continue;
      }
      const existing = vfs.tryLookup(n.dir, false);
      if (existing && !isDir(existing)) vfs.rmrf(n.dir);
      else if (existing) {
        for (const name of vfs.readdir(n.dir)) if (name !== "node_modules") vfs.rmrf(join(n.dir, name));
      }
      jobs.push(
        (async () => {
          const entries = await this.o.registry.tarball(n.source.tarball, n.source.integrity, n.source.shasum);
          mkdirp(n.dir);
          for (const e of entries) {
            const rel = e.path.replace(/^[^/]*\/?/, "");
            if (!rel || rel.includes("..")) continue;
            const target = join(n.dir, rel);
            if (e.type === "dir") {
              mkdirp(target);
              continue;
            }
            mkdirp(dirname(target));
            if (e.type === "symlink") {
              try {
                vfs.symlink(e.linkname, target);
              } catch {
              }
              continue;
            }
            if (e.type !== "file") continue;
            let data = e.data;
            if (rel === "package.json" && n.source.realName) {
              try {
                const j = JSON.parse(dec6.decode(data));
                j.name = n.name;
                j.version = n.version;
                j._openvesselSource = `${n.source.realName}@${n.source.realVersion ?? n.version}`;
                data = enc6.encode(JSON.stringify(j, null, 2));
              } catch {
              }
            }
            vfs.writeFile(target, data, e.mode & 73 ? 493 : 420);
            if (e.mode & 73) vfs.chmod(target, 493);
          }
          added++;
          done++;
          if (done % 25 === 0) this.o.progress?.(`extracting\u2026 ${done}/${total}`);
        })()
      );
    }
    const results = await Promise.allSettled(jobs);
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length) throw failed[0].reason;
    return added;
  }
  binsOf(n) {
    const pkg = n.pkg;
    let bin = pkg.bin;
    if (!bin) {
      const pj = this.readJson(join(n.dir, "package.json"));
      bin = pj?.bin;
      if (!bin && pj?.directories?.bin) {
        const d = join(n.dir, pj.directories.bin);
        try {
          bin = Object.fromEntries(this.o.vfs.readdir(d).map((f) => [f, join(pj.directories.bin, f)]));
        } catch {
        }
      }
    }
    if (!bin) return {};
    if (typeof bin === "string") return { [n.name.replace(/^@[^/]+\//, "")]: bin };
    return bin;
  }
  linkBins() {
    const vfs = this.o.vfs;
    const byContainer = /* @__PURE__ */ new Map();
    for (const n of this.nodes) {
      if (!n.parent) continue;
      let l = byContainer.get(n.parent);
      if (!l) byContainer.set(n.parent, l = []);
      l.push(n);
    }
    for (const [container, list] of byContainer) {
      const binDir = join(container.nodeModules, ".bin");
      const direct = new Set(Object.keys({ ...container.pkg.dependencies, ...container.pkg.devDependencies, ...container.pkg.optionalDependencies }));
      list.sort((a, b) => Number(direct.has(a.name)) - Number(direct.has(b.name)));
      for (const n of list) {
        const bins = this.binsOf(n);
        for (const [bname, rel] of Object.entries(bins)) {
          if (!bname || bname.includes("/") || bname.includes("..")) continue;
          const target = join(n.isWorkspace ? n.dir : n.dir, rel);
          if (!vfs.exists(binDir)) vfs.mkdir(binDir, 493, true);
          const link = join(binDir, bname);
          try {
            if (vfs.tryLookup(link, false)) vfs.unlink(link);
            vfs.symlink(relative(binDir, target), link);
            if (vfs.exists(target)) vfs.chmod(target, 493);
          } catch {
          }
        }
      }
    }
  }
  /** `resolved` in the hidden lockfile: the tarball URL, or a link's target relative to the project. */
  resolvedOf(n) {
    return n.source.tarball ?? (n.source.linkTarget ? this.rel(n.source.linkTarget) : "");
  }
  writeHiddenLock() {
    const packages = {};
    for (const n of this.nodes) {
      const entry = { version: n.version, resolved: this.resolvedOf(n), integrity: n.source.integrity, dev: n.dev || void 0, optional: n.optional || void 0, link: n.source.kind === "link" || void 0 };
      if (n.isWorkspace) {
        packages[this.rel(join(this.root.nodeModules, n.name))] = entry;
        packages[this.rel(n.dir)] = { name: n.name, version: n.version };
      } else packages[this.rel(n.dir)] = entry;
    }
    const nm = join(this.o.root, "node_modules");
    if (!this.o.vfs.exists(nm)) this.o.vfs.mkdir(nm, 493, true);
    this.o.vfs.writeFile(join(nm, ".package-lock.json"), JSON.stringify({ name: this.root.name, lockfileVersion: 3, requires: true, packages }, null, 2));
  }
  /**
   * The tree as a Yarn v1 lockfile: one entry per package, keyed by every `name@spec` that resolved to
   * it, with the registry's own manifest (not a compat package's or substitute's).
   */
  yarnLockfile() {
    const byNode = /* @__PURE__ */ new Map();
    for (const list of this.edges.values()) {
      for (const e of list) {
        if (e.peer || e.target.isWorkspace || e.target.source.kind === "link") continue;
        let keys = byNode.get(e.target);
        if (!keys) byNode.set(e.target, keys = /* @__PURE__ */ new Set());
        keys.add(`${e.name}@${e.rawSpec}`);
      }
    }
    const entries = [];
    for (const [n, keys] of byNode) {
      const m = n.origin ?? n.pkg;
      const tarball = n.origin?.dist.tarball ?? n.source.tarball;
      const shasum = n.origin ? n.origin.dist.shasum : n.source.shasum;
      const integrity = n.origin ? n.origin.dist.integrity : n.source.integrity;
      const sorted = [...keys].sort();
      const key = sorted.join(", ");
      let text = `${sorted.map(yarnQuote).join(", ")}:
  version ${yarnQuote(n.version)}
  resolved ${yarnQuote(shasum ? `${tarball}#${shasum}` : tarball)}
`;
      if (integrity) text += `  integrity ${yarnQuote(integrity)}
`;
      for (const field of ["dependencies", "optionalDependencies"]) {
        const deps = Object.entries(m[field] ?? {}).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
        if (deps.length) text += `  ${field}:
` + deps.map(([k, v]) => `    ${yarnQuote(k)} ${yarnQuote(String(v))}
`).join("");
      }
      entries.push([key, text]);
    }
    entries.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
    return "# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n# yarn lockfile v1\n\n\n" + entries.map(([, t]) => t).join("\n");
  }
  /** Flat list of installed packages (for `npm ls`). */
  listTop() {
    return [...this.root.children.values()].map((n) => ({ name: n.name, version: n.version }));
  }
};
function yarnQuote(s) {
  return s.startsWith("true") || s.startsWith("false") || /[:\s\\",[\]]/.test(s) || /^[0-9]/.test(s) || !/^[a-zA-Z]/.test(s) ? JSON.stringify(s) : s;
}
function readJsonFile(vfs, p) {
  try {
    return JSON.parse(dec6.decode(vfs.readFile(p)));
  } catch {
    return null;
  }
}

// src/kernel/npm/lockfile.ts
function add(h, name, version) {
  if (!name || !/^\d+\.\d+\.\d+/.test(version)) return;
  let s = h.get(name);
  if (!s) h.set(name, s = /* @__PURE__ */ new Set());
  s.add(version);
}
function nameFromNmPath(p) {
  const i = p.lastIndexOf("node_modules/");
  return i === -1 ? p : p.slice(i + 13);
}
function parsePackageLock(text, h) {
  const j = JSON.parse(text);
  if (j.packages) {
    for (const [k, v] of Object.entries(j.packages)) {
      if (!k || !v?.version) continue;
      if (v.link) continue;
      add(h, v.name ?? nameFromNmPath(k), v.version);
    }
  } else if (j.dependencies) {
    const walk = (deps) => {
      for (const [name, v] of Object.entries(deps)) {
        if (v?.version) add(h, name, String(v.version).replace(/^npm:.*@/, ""));
        if (v?.dependencies) walk(v.dependencies);
      }
    };
    walk(j.dependencies);
  }
}
function yarnPatternName(spec) {
  const npm = spec.indexOf("@npm:", 1);
  if (npm > 0) {
    const real = spec.slice(npm + 5);
    const at2 = real.lastIndexOf("@");
    return at2 > 0 ? real.slice(0, at2) : spec.slice(0, npm);
  }
  const at = spec.lastIndexOf("@");
  return at > 0 ? spec.slice(0, at) : spec;
}
function parseYarnLock(text, h) {
  if (/^__metadata:/m.test(text)) {
    for (const m of text.matchAll(/^\s+resolution:\s+"?((?:@[^@/"\s]+\/)?[^@"\s]+)@npm:([^"\s:]+)[^"\s]*"?\s*$/gm)) add(h, m[1], m[2]);
    return;
  }
  let names = [];
  for (const line of text.split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    if (!line.startsWith(" ")) {
      names = line.replace(/:\s*$/, "").split(/,\s*/).map((s) => yarnPatternName(s.trim().replace(/^"|"$/g, "")));
      continue;
    }
    const m = /^\s+version:?\s+"?([^"\s]+)"?/.exec(line);
    if (m) for (const n of names) add(h, n, m[1]);
  }
}
function parsePnpmLock(text, h) {
  let section = "";
  for (const line of text.split("\n")) {
    if (/^\S/.test(line)) {
      section = line.replace(/:.*$/, "");
      continue;
    }
    if (section !== "packages" && section !== "snapshots") continue;
    const m = /^ {2}'?\/?((?:@[^/@\s']+\/)?[^/@\s'(]+)[@/](\d+\.\d+\.\d+[^\s:'(]*)/.exec(line);
    if (m) add(h, m[1], m[2]);
  }
}
function parseBunLock(text, h) {
  const re = /"((?:@[^"@/]+\/)?[^"@/]+)@(\d+\.\d+\.\d+[^"]*)"/g;
  let m;
  while (m = re.exec(text)) add(h, m[1], m[2]);
}
function readLockHints(read) {
  const versions = /* @__PURE__ */ new Map();
  const order = [
    ["package-lock.json", parsePackageLock],
    ["npm-shrinkwrap.json", parsePackageLock],
    ["pnpm-lock.yaml", parsePnpmLock],
    ["yarn.lock", parseYarnLock],
    ["bun.lock", parseBunLock]
  ];
  for (const [file2, fn] of order) {
    const t = read(file2);
    if (t === null) continue;
    try {
      fn(t, versions);
      return { versions, source: file2 };
    } catch {
    }
  }
  return { versions, source: null };
}

// src/kernel/npm/tar.ts
async function gunzip(data) {
  const ds = new DecompressionStream("gzip");
  const stream = new Blob([data]).stream().pipeThrough(ds);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
var dec7 = new TextDecoder();
function str(b, off, len) {
  let end = off;
  while (end < off + len && b[end] !== 0) end++;
  return dec7.decode(b.subarray(off, end));
}
function octal(b, off, len) {
  if (b[off] & 128) {
    let v = 0;
    for (let i = off + 1; i < off + len; i++) v = v * 256 + b[i];
    return v;
  }
  const s = str(b, off, len).trim();
  return s ? parseInt(s, 8) : 0;
}
function parsePax(data) {
  const out = {};
  let i = 0;
  while (i < data.length) {
    let sp = i;
    while (sp < data.length && data[sp] !== 32) sp++;
    const len = parseInt(dec7.decode(data.subarray(i, sp)), 10);
    if (!len) break;
    const rec = dec7.decode(data.subarray(sp + 1, i + len - 1));
    const eq = rec.indexOf("=");
    if (eq > 0) out[rec.slice(0, eq)] = rec.slice(eq + 1);
    i += len;
  }
  return out;
}
function untar(buf) {
  const out = [];
  let off = 0;
  let paxNext = null;
  let paxGlobal = {};
  let longName = null;
  let longLink = null;
  while (off + 512 <= buf.length) {
    const h = buf.subarray(off, off + 512);
    if (h.every((x) => x === 0)) break;
    let name = str(h, 0, 100);
    const mode = octal(h, 100, 8);
    const size = octal(h, 124, 12);
    const mtime = octal(h, 136, 12);
    const typeflag = String.fromCharCode(h[156] || 48);
    let linkname = str(h, 157, 100);
    const magic = str(h, 257, 6);
    if (magic.startsWith("ustar")) {
      const prefix = str(h, 345, 155);
      if (prefix) name = `${prefix}/${name}`;
    }
    const dataStart = off + 512;
    const data = buf.subarray(dataStart, dataStart + size);
    off = dataStart + Math.ceil(size / 512) * 512;
    if (typeflag === "x") {
      paxNext = parsePax(data);
      continue;
    }
    if (typeflag === "g") {
      paxGlobal = { ...paxGlobal, ...parsePax(data) };
      continue;
    }
    if (typeflag === "L") {
      longName = str(data, 0, data.length);
      continue;
    }
    if (typeflag === "K") {
      longLink = str(data, 0, data.length);
      continue;
    }
    const pax = { ...paxGlobal, ...paxNext ?? {} };
    if (pax.path) name = pax.path;
    if (pax.linkpath) linkname = pax.linkpath;
    if (longName) name = longName;
    if (longLink) linkname = longLink;
    paxNext = null;
    longName = null;
    longLink = null;
    const type = typeflag === "0" || typeflag === "\0" || typeflag === "7" ? "file" : typeflag === "5" ? "dir" : typeflag === "2" ? "symlink" : typeflag === "1" ? "hardlink" : "other";
    out.push({ path: name, type, mode, data, linkname, mtime });
  }
  return out;
}

// src/kernel/npm/registry.ts
var isLocalUrl = (url, isLoopback) => {
  try {
    return isLoopback(new URL(url).hostname);
  } catch {
    return false;
  }
};
function proxiedFetch(origin, opts = {}) {
  return async (url, init2 = {}) => {
    if (opts.loopback && opts.isLoopback && isLocalUrl(url, opts.isLoopback)) return opts.loopback(url, init2);
    const headers = new Headers(init2.headers);
    const pairs = [...headers];
    const ov = { "x-ov-h": encodeURIComponent(JSON.stringify(pairs)), "x-ov-by": encodeURIComponent(init2.initiator ?? "npm"), "x-ov-method": init2.method ?? "GET" };
    if (opts.token) ov["x-ov-k"] = opts.token;
    if (init2.redirect === "error") ov["x-ov-redirect"] = "error";
    const res = await fetch(`${origin}/__ov/net?url=${encodeURIComponent(url)}`, {
      method: init2.method === "GET" || !init2.method || init2.method === "HEAD" ? init2.method ?? "GET" : "POST",
      headers: ov,
      body: init2.body,
      signal: init2.signal
    });
    const err = res.headers.get("x-ov-error");
    if (err) {
      const msg = decodeURIComponent(res.headers.get("x-ov-message") ?? err);
      throw Object.assign(new Error(msg), { code: err === "denied" ? "EACCES" : err === "timeout" ? "ETIMEDOUT" : "ECONNREFUSED" });
    }
    const status = Number(res.headers.get("x-ov-status") ?? res.status);
    let rh = null;
    try {
      rh = JSON.parse(decodeURIComponent(res.headers.get("x-ov-rh") ?? "null"));
    } catch {
    }
    const out = new Headers();
    for (const [k, v] of rh ?? [...res.headers].filter(([k2]) => !k2.startsWith("x-ov-"))) {
      try {
        out.append(k, v);
      } catch {
      }
    }
    const nullBody = status === 204 || status === 205 || status === 304 || init2.method === "HEAD";
    if (nullBody) void res.body?.cancel();
    const r = new Response(nullBody ? null : res.body, { status: status || 200, statusText: decodeURIComponent(res.headers.get("x-ov-status-text") ?? ""), headers: out });
    Object.defineProperty(r, "url", { value: decodeURIComponent(res.headers.get("x-ov-url") ?? encodeURIComponent(url)) });
    return r;
  };
}
var Registry = class {
  constructor(fetchFn2, registryUrl = "https://registry.npmjs.org/", scopes = {}, cacheName = "openvessel-npm-v1", maxConcurrency = 16) {
    this.fetchFn = fetchFn2;
    this.registryUrl = registryUrl;
    this.scopes = scopes;
    this.cacheName = cacheName;
    this.maxConcurrency = maxConcurrency;
    if (!this.registryUrl.endsWith("/")) this.registryUrl += "/";
  }
  fetchFn;
  registryUrl;
  scopes;
  cacheName;
  maxConcurrency;
  packuments = /* @__PURE__ */ new Map();
  active = 0;
  queue = [];
  async limit(fn) {
    if (this.active >= this.maxConcurrency) await new Promise((r) => this.queue.push(r));
    this.active++;
    try {
      return await fn();
    } finally {
      this.active--;
      this.queue.shift()?.();
    }
  }
  registryFor(name) {
    if (name.startsWith("@")) {
      const scope = name.split("/")[0];
      const r = this.scopes[scope];
      if (r) return r.endsWith("/") ? r : r + "/";
    }
    return this.registryUrl;
  }
  packument(name) {
    let p = this.packuments.get(name);
    if (!p) {
      p = this.limit(() => this.fetchPackument(name));
      this.packuments.set(name, p);
      p.catch(() => this.packuments.delete(name));
    }
    return p;
  }
  async fetchPackument(name) {
    const url = this.registryFor(name) + name.replace("/", "%2f");
    let lastErr;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await this.fetchFn(url, { headers: { accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*" } });
        if (res.status === 404) throw Object.assign(new Error(`404 Not Found - GET ${url} - '${name}' is not in this registry.`), { code: "E404" });
        if (!res.ok) throw Object.assign(new Error(`${res.status} ${res.statusText} - GET ${url}`), { code: "E" + res.status });
        return await res.json();
      } catch (e) {
        lastErr = e;
        if (e?.code === "E404" || e?.code === "EACCES") throw e;
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }
    }
    throw lastErr;
  }
  /** Downloads and unpacks a tarball (with integrity verification and caching). */
  async tarball(url, integrity, shasum) {
    const bytes = await this.limit(() => this.fetchTarball(url, integrity, shasum));
    const raw = bytes[0] === 31 && bytes[1] === 139 ? await gunzip(bytes) : bytes;
    return untar(raw);
  }
  async fetchTarball(url, integrity, shasum) {
    const cache2 = typeof caches !== "undefined" ? await caches.open(this.cacheName).catch(() => null) : null;
    if (cache2) {
      const hit = await cache2.match(url).catch(() => void 0);
      if (hit) {
        const b = new Uint8Array(await hit.arrayBuffer());
        if (await verify(b, integrity, shasum)) return b;
        await cache2.delete(url).catch(() => {
        });
      }
    }
    let lastErr;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const own = !!RUNTIME_BASE && url.startsWith(`${RUNTIME_BASE}/compat/`);
        const res = own ? await fetch(url) : await this.fetchFn(url);
        if (!res.ok) throw Object.assign(new Error(`${res.status} ${res.statusText} - GET ${url}`), { code: "E" + res.status });
        const b = new Uint8Array(await res.arrayBuffer());
        if (!await verify(b, integrity, shasum)) throw Object.assign(new Error(`integrity checksum failed for ${url}`), { code: "EINTEGRITY" });
        if (cache2) await cache2.put(url, new Response(b, { headers: { "content-type": "application/octet-stream" } })).catch(() => {
        });
        return b;
      } catch (e) {
        lastErr = e;
        if (e?.code === "EACCES" || e?.code === "E404") throw e;
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
      }
    }
    throw lastErr;
  }
};
function b64(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode(...bytes.subarray(i, i + 32768));
  return btoa(s);
}
async function verify(data, integrity, shasum) {
  if (integrity) {
    for (const part of integrity.split(/\s+/)) {
      const m = /^(sha512|sha384|sha256|sha1)-(.+)$/.exec(part);
      if (!m) continue;
      const algo = { sha512: "SHA-512", sha384: "SHA-384", sha256: "SHA-256", sha1: "SHA-1" }[m[1]];
      const digest = new Uint8Array(await crypto.subtle.digest(algo, data));
      if (b64(digest) === m[2]) return true;
    }
    return false;
  }
  if (shasum) {
    const digest = new Uint8Array(await crypto.subtle.digest("SHA-1", data));
    return [...digest].map((x) => x.toString(16).padStart(2, "0")).join("") === shasum;
  }
  return true;
}

// src/kernel/npm/cli.ts
var dec8 = new TextDecoder();
var NPM_VERSION = "10.9.3";
var PM_VERSIONS = { npm: NPM_VERSION, pnpm: "9.15.9", yarn: "1.22.22", bun: "1.2.21" };
var fetchFn = null;
var sharedRegistry = null;
function setNpmFetch(f) {
  fetchFn = f;
  sharedRegistry = null;
}
function getNetFetch() {
  if (!fetchFn) throw new Error("network is not configured");
  return fetchFn;
}
function readNpmrc(ctx, dir) {
  const out = {};
  const files = [join(ctx.env.HOME ?? "/home/user", ".npmrc")];
  let d = dir;
  const chain = [];
  for (; ; ) {
    chain.push(join(d, ".npmrc"));
    const p = dirname(d);
    if (p === d) break;
    d = p;
  }
  files.push(...chain.reverse());
  for (const f of files) {
    try {
      for (const line of dec8.decode(ctx.vfs.readFile(f)).split("\n")) {
        const m = /^\s*([^#;=\s][^=]*?)\s*=\s*(.*?)\s*$/.exec(line);
        if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "").replace(/\$\{([^}]+)\}/g, (_x, k) => ctx.env[k] ?? "");
      }
    } catch {
    }
  }
  for (const [k, v] of Object.entries(ctx.env)) {
    const m = /^npm_config_(.+)$/i.exec(k);
    if (m) out[m[1].toLowerCase().replace(/_/g, "-")] = v;
  }
  return out;
}
function getRegistry(ctx, dir) {
  const rc = readNpmrc(ctx, dir);
  const url = rc.registry ?? "https://registry.npmjs.org/";
  const scopes = {};
  for (const [k, v] of Object.entries(rc)) if (/^@[^:]+:registry$/.test(k)) scopes[k.split(":")[0]] = v;
  if (!fetchFn) throw new Error("npm: network is not configured");
  if (!sharedRegistry || sharedRegistry.registryUrl !== (url.endsWith("/") ? url : url + "/") || JSON.stringify(sharedRegistry.scopes) !== JSON.stringify(scopes)) {
    sharedRegistry = new Registry(fetchFn, url, scopes);
  }
  return sharedRegistry;
}
function findProjectRoot(ctx, from) {
  let d = from;
  for (; ; ) {
    if (ctx.vfs.exists(join(d, "package.json"))) return d;
    const p = dirname(d);
    if (p === d) return null;
    d = p;
  }
}
function findWorkspaceRoot(ctx, dir) {
  let d = dirname(dir);
  for (; ; ) {
    if (ctx.vfs.exists(join(d, "package.json")) || ctx.vfs.exists(join(d, "pnpm-workspace.yaml"))) {
      if (listWorkspaces(ctx.vfs, d).some((w) => w.dir === dir)) return d;
    }
    const p = dirname(d);
    if (p === d) return null;
    d = p;
  }
}
function writeJson(ctx, p, data) {
  ctx.vfs.writeFile(p, JSON.stringify(data, null, 2) + "\n");
}
function fmtTime(ms) {
  return ms < 1e3 ? `${Math.round(ms)}ms` : `${Math.round(ms / 100) / 10}s`;
}
var NPM_CONFIGS = new Set(
  "_auth access all allow-same-version audit audit-level auth-type before bin-links browser ca cache cafile call cert cidr ci-name color commit-hooks cpu depth description desc diff diff-dst-prefix diff-ignore-all-space diff-name-only diff-no-prefix diff-src-prefix diff-text diff-unified dry-run editor engine-strict expect-result-count expect-results fetch-retries fetch-retry-factor fetch-retry-maxtimeout fetch-retry-mintimeout fetch-timeout force foreground-scripts format-package-lock fund git git-tag-version global global-style globalconfig heading help https-proxy if-present ignore-scripts include include-staged include-workspace-root init-author-email init-author-name init-author-url init-license init-module init-type init-version init-private install-links install-strategy json key legacy-bundling legacy-peer-deps libc link local local-address location lockfile-version loglevel logs-dir logs-max long maxsockets message node-options noproxy offline omit omit-lockfile-registry-resolved only optional os otp pack-destination package package-lock package-lock-only parseable porcelain prefer-dedupe prefer-offline prefer-online prefix preid production dev progress provenance provenance-file proxy quiet read-only readonly rebuild-bundle reg registry replace-registry-host save save-bundle save-dev save-exact save-optional save-peer save-prefix save-prod sbom-format sbom-type scope script-shell searchexclude searchlimit searchopts searchstaleness shell shrinkwrap sign-git-commit sign-git-tag silent strict-peer-deps strict-ssl tag tag-version-prefix timing umask unicode update-notifier usage user-agent userconfig verbose version versions viewer which workspace workspaces workspaces-update yes enjoy-by dir cwd".split(" ")
);
var VALUE_OPTS = {
  npm: ["--prefix", "-C", "--registry", "--loglevel", "--cache", "--userconfig", "--tag", "--otp", "--omit", "--include", "--workspace", "-w", "--script-shell", "--save-prefix"],
  pnpm: ["--dir", "-C", "--prefix", "--filter", "-F", "--registry", "--loglevel", "--reporter", "--store-dir", "--modules-dir", "--virtual-store-dir", "--workspace-concurrency", "--omit", "--include"],
  yarn: ["--cwd", "--registry", "--network-timeout", "--modules-folder", "--cache-folder", "--global-folder", "--link-folder", "--mutex"],
  bun: ["--cwd", "--filter", "-F", "--registry", "--cache-dir", "--backend", "--omit"]
};
var EXEC_VALUE_OPTS = { npm: ["--package", "-p", "--call", "-c"], pnpm: ["--package"], yarn: ["--package", "-p"], bun: ["--package", "-p"] };
function parseFlags(args, pm, o = {}) {
  const f = {
    dev: false,
    exact: false,
    global: false,
    omitOptional: false,
    ignoreScripts: false,
    silent: false,
    legacyPeerDeps: false,
    json: false,
    ifPresent: false,
    noLockfile: false,
    help: false,
    version: false,
    workspaces: [],
    allWorkspaces: false,
    includeWorkspaceRoot: false,
    filters: [],
    recursive: false,
    workspaceRoot: false,
    packages: [],
    shellMode: false,
    config: {},
    rest: [],
    passthrough: [],
    dashDash: false,
    stop: args.length
  };
  const valued = /* @__PURE__ */ new Set([...VALUE_OPTS[pm], ...o.exec ? EXEC_VALUE_OPTS[pm] : [], "--dir", "--cwd"]);
  for (let i = 0; i < args.length; i++) {
    let a = args[i];
    if (a === "--") {
      f.passthrough = args.slice(i + 1);
      f.dashDash = true;
      f.stop = i;
      break;
    }
    if (!a.startsWith("-") || a === "-") {
      if (o.stopAtPositional) {
        f.stop = i;
        break;
      }
      f.rest.push(a);
      continue;
    }
    let value;
    const eq = a.indexOf("=");
    if (a.startsWith("--") && eq > 0) {
      value = a.slice(eq + 1);
      a = a.slice(0, eq);
    } else if (valued.has(a)) value = args[++i] ?? "";
    if (pm === "npm" && a.startsWith("--")) {
      const neg = a.startsWith("--no-");
      f.config[neg ? a.slice(5) : a.slice(2)] = neg ? "false" : value ?? "true";
    }
    switch (a) {
      case "-D":
      case "--save-dev":
      case "--dev":
        f.dev = true;
        break;
      case "-d":
        if (pm === "bun") f.dev = true;
        break;
      case "-E":
      case "--save-exact":
      case "--exact":
        f.exact = true;
        break;
      case "-g":
      case "--global":
        f.global = true;
        break;
      case "--production":
      case "--prod":
        f.omitDev = value !== "false";
        break;
      case "-P":
        if (pm === "pnpm") f.omitDev = true;
        break;
      case "-p":
        if (value !== void 0) f.packages.push(value);
        else if (pm === "bun") f.omitDev = true;
        break;
      case "--package":
        if (value !== void 0) f.packages.push(value);
        break;
      case "--omit":
        if (value === "dev") f.omitDev = true;
        if (value === "optional") f.omitOptional = true;
        break;
      case "--include":
        if (value === "dev") f.omitDev = false;
        if (value === "optional") f.omitOptional = false;
        break;
      case "--no-optional":
        f.omitOptional = true;
        break;
      case "--ignore-scripts":
        f.ignoreScripts = true;
        break;
      case "-y":
      case "--yes":
        f.yes = true;
        break;
      case "--no":
      case "--no-yes":
        f.yes = false;
        break;
      case "-s":
      case "--silent":
        f.silent = true;
        break;
      case "--loglevel":
      case "--reporter":
        if (value === "silent") f.silent = true;
        break;
      case "--legacy-peer-deps":
      case "--force":
        f.legacyPeerDeps = true;
        break;
      case "--json":
        f.json = true;
        break;
      case "--if-present":
        f.ifPresent = true;
        break;
      case "--frozen-lockfile":
      case "--pure-lockfile":
      case "--no-lockfile":
        if (pm === "yarn") f.noLockfile = true;
        break;
      case "-h":
      case "--help":
        f.help = true;
        break;
      case "-v":
      case "--version":
        f.version = true;
        break;
      case "-w":
      case "--workspace":
        if (value !== void 0) f.workspaces.push(value);
        else if (pm === "pnpm") f.workspaceRoot = true;
        break;
      case "--workspace-root":
        f.workspaceRoot = true;
        break;
      case "--workspaces":
      case "-ws":
        f.allWorkspaces = value !== "false";
        break;
      case "--include-workspace-root":
        f.includeWorkspaceRoot = true;
        break;
      case "--filter":
      case "-F":
        if (value !== void 0) f.filters.push(value);
        break;
      case "-r":
      case "--recursive":
        if (pm === "pnpm") f.recursive = true;
        break;
      case "-c":
      case "--call":
        if (value !== void 0) f.call = value;
        else if (pm === "pnpm") f.shellMode = true;
        break;
      case "--shell-mode":
        f.shellMode = true;
        break;
      case "--prefix":
      case "-C":
      case "--dir":
      case "--cwd":
        if (value !== void 0) f.prefix = value;
        break;
      default:
    }
  }
  return f;
}
function table(spec) {
  const m = /* @__PURE__ */ new Map();
  for (const [op, names] of Object.entries(spec)) for (const n of names.split(" ")) m.set(n, op);
  return m;
}
var COMMANDS = {
  npm: table({
    install: "install i in ins inst insta instal isnt isnta isntal isntall add",
    ci: "ci clean-install ic install-clean isntall-clean",
    update: "update up upgrade udpate",
    remove: "uninstall unlink remove rm r un",
    run: "run run-script rum urn",
    script: "test t tst start stop restart",
    exec: "exec x",
    init: "init create innit",
    view: "view info show v",
    ls: "ls list la ll",
    why: "why explain",
    reinstall: "prune dedupe ddp rebuild rb",
    config: "config c",
    get: "get",
    set: "set",
    prefix: "prefix",
    root: "root",
    pkg: "pkg",
    cache: "cache",
    help: "help",
    unsupported0: "audit fund",
    unsupported: "doctor outdated login logout adduser publish unpublish whoami link ln pack version deprecate dist-tag owner search token team access"
  }),
  pnpm: table({
    install: "install i",
    add: "add",
    ci: "ci",
    update: "update up upgrade",
    remove: "remove rm uninstall un uni",
    run: "run run-script",
    script: "test t tst start restart",
    local: "exec",
    dlx: "dlx",
    create: "create",
    init: "init",
    view: "view info show v",
    ls: "list ls la ll",
    why: "why",
    reinstall: "prune dedupe rebuild rb",
    config: "config c",
    get: "get",
    set: "set",
    prefix: "prefix",
    root: "root",
    bin: "bin",
    pkg: "pkg",
    help: "help",
    unsupported0: "audit",
    unsupported: "outdated publish login logout whoami doctor link ln unlink pack patch patch-commit store fetch deploy env setup server licenses import install-test it recursive m multi"
  }),
  yarn: table({
    install: "install",
    add: "add",
    update: "upgrade",
    remove: "remove",
    run: "run",
    local: "exec",
    dlx: "dlx",
    create: "create",
    init: "init",
    view: "info",
    ls: "list",
    why: "why",
    config: "config",
    cache: "cache",
    bin: "bin",
    global: "global",
    workspace: "workspace",
    workspaces: "workspaces",
    help: "help",
    unsupported0: "audit",
    unsupported: "outdated login logout publish link unlink pack version versions check autoclean import licenses owner policies tag team access generate-lock-entry upgrade-interactive unplug node"
  }),
  bun: table({
    install: "install i",
    add: "add a",
    update: "update",
    remove: "remove rm",
    run: "run",
    dlx: "x",
    shell: "exec",
    create: "create c",
    init: "init",
    view: "info",
    why: "why",
    bunpm: "pm",
    help: "help",
    unsupported0: "audit",
    unsupported: "test build outdated link unlink publish patch patch-commit upgrade repl list"
  })
};
var SCRIPT_ALIASES = { t: "test", tst: "test" };
var GLOBAL_DIR = "/usr/local/lib/node_modules/.ov-global";
var Npm = class {
  constructor(ctx, pm) {
    this.ctx = ctx;
    this.pm = pm;
  }
  ctx;
  pm;
  /** npm: the command line's `--name` options, given to scripts as npm_config_<name> */
  cliConfig = {};
  out(s) {
    this.ctx.out(s);
  }
  err(s) {
    this.ctx.err(s);
  }
  userAgent() {
    return `${this.pm}/${PM_VERSIONS[this.pm]} npm/? node/v${NODE_VERSION} linux x64 workspaces/false`;
  }
  async install(dir, f, opts = {}) {
    const ctx = this.ctx;
    const t0 = performance.now();
    const rootPkg = readJsonFile(ctx.vfs, join(dir, "package.json"));
    if (!rootPkg) {
      this.err(`npm error code ENOENT
npm error Could not read package.json: ${dir}/package.json
`);
      return 254;
    }
    const lock = opts.noLock ? { versions: /* @__PURE__ */ new Map(), source: null } : readLockHints((n) => {
      try {
        return dec8.decode(ctx.vfs.readFile(join(dir, n)));
      } catch {
        return null;
      }
    });
    if (!f.ignoreScripts) {
      const c = await this.runLifecycle(dir, rootPkg, "preinstall");
      if (c) return c;
    }
    const isTty = ctx.isatty(2);
    let lastLen = 0;
    const progress = (s) => {
      if (!isTty || f.silent) return;
      const line = `\r\x1B[K${s}`;
      lastLen = s.length;
      ctx.err(line);
    };
    const inst = new Installer({
      root: dir,
      vfs: ctx.vfs,
      registry: getRegistry(ctx, dir),
      lock,
      omitDev: f.omitDev ?? ctx.env.NODE_ENV === "production",
      omitOptional: f.omitOptional,
      omitPeer: f.legacyPeerDeps || readNpmrc(ctx, dir)["legacy-peer-deps"] === "true",
      log: (s) => !f.silent && this.out(s + "\n"),
      warn: (s) => {
        if (f.silent) return;
        if (isTty && lastLen) ctx.err("\r\x1B[K");
        lastLen = 0;
        this.err(s + "\n");
      },
      progress
    });
    let res;
    try {
      res = await inst.run();
    } catch (e) {
      if (isTty && lastLen) ctx.err("\r\x1B[K");
      const code = e?.code ?? "EUNKNOWN";
      this.err(`npm error code ${code}
npm error ${e?.message ?? e}
`);
      if (code === "EACCES") this.err("npm error network access was denied by the OpenVessel network policy\n");
      return 1;
    }
    if (isTty && lastLen) ctx.err("\r\x1B[K");
    let savedLock = false;
    if (this.pm === "yarn" && opts.saveLock !== false && !f.noLockfile) {
      const text = inst.yarnLockfile();
      const file2 = join(dir, "yarn.lock");
      let old = null;
      try {
        old = dec8.decode(ctx.vfs.readFile(file2));
      } catch {
      }
      if (old !== text) {
        ctx.vfs.writeFile(file2, text);
        savedLock = true;
      }
    }
    if (!f.ignoreScripts) {
      for (const s of ["install", "postinstall", "preprepare", "prepare", "postprepare"]) {
        const c = await this.runLifecycle(dir, rootPkg, s);
        if (c) return c;
      }
    }
    if (!f.silent) {
      if (this.pm === "pnpm") this.out(`Packages: +${res.added}
Done in ${fmtTime(performance.now() - t0)}
`);
      else if (this.pm === "yarn") this.out(`${savedLock ? "success Saved lockfile.\n" : res.added ? "" : "success Already up-to-date.\n"}Done in ${fmtTime(performance.now() - t0)}.
`);
      else this.out(`
${res.added ? `added ${res.added} package${res.added === 1 ? "" : "s"}` : "up to date"}${res.added && res.total !== res.added ? `, and audited ${res.total + 1} packages` : ""} in ${fmtTime(performance.now() - t0)}
`);
    }
    return 0;
  }
  async runLifecycle(dir, pkg, event) {
    const script = pkg.scripts?.[event];
    if (!script) return 0;
    return this.runScript(dir, pkg, event, [], { quiet: false });
  }
  scriptEnv(dir, pkg, event, script) {
    const env2 = { ...this.ctx.env };
    const bins = [];
    let d = dir;
    for (; ; ) {
      bins.push(join(d, "node_modules/.bin"));
      const p = dirname(d);
      if (p === d) break;
      d = p;
    }
    env2.PATH = [...bins, env2.PATH ?? "/usr/local/bin:/usr/bin:/bin"].join(":");
    env2.npm_lifecycle_event = event;
    env2.npm_lifecycle_script = script;
    env2.npm_package_name = pkg.name ?? "";
    env2.npm_package_version = pkg.version ?? "";
    env2.npm_package_json = join(dir, "package.json");
    if (event !== "npx" || !env2.npm_config_user_agent) env2.npm_config_user_agent = this.userAgent();
    env2.npm_execpath = `/usr/lib/node_modules/${this.pm}/bin/${this.pm}-cli.js`;
    env2.npm_node_execpath = "/usr/bin/node";
    env2.npm_command = event === "test" || event === "start" ? event : "run-script";
    env2.INIT_CWD = this.ctx.cwd;
    env2.NODE = "/usr/bin/node";
    env2.COLOR = this.ctx.isatty(1) ? "1" : "0";
    for (const [k, v] of Object.entries(this.cliConfig)) env2[`npm_config_${k.replace(/-/g, "_")}`] = v;
    return env2;
  }
  async runScript(dir, pkg, name, args, o) {
    const script = pkg.scripts?.[name];
    if (script === void 0) return 0;
    const quoted = args.map((a) => /^[\w./:=@%+-]+$/.test(a) ? a : `'${a.replace(/'/g, "'\\''")}'`).join(" ");
    const full = quoted ? `${script} ${quoted}` : script;
    if (!o.quiet) {
      if (this.pm === "yarn") this.out(`$ ${full}
`);
      else this.out(`
> ${pkg.name ?? ""}${pkg.version ? "@" + pkg.version : ""} ${name}${this.pm === "pnpm" ? " " + dir : ""}
> ${full}

`);
    }
    const code = await this.ctx.run(["/bin/sh", "-c", full], { env: this.scriptEnv(dir, pkg, name, full), cwd: dir });
    return code;
  }
  async run(dir, name, args, f) {
    const pkg = readJsonFile(this.ctx.vfs, join(dir, "package.json"));
    if (!pkg) {
      this.err(`npm error code ENOENT
npm error Could not read package.json in ${dir}
`);
      return 254;
    }
    if (!name) {
      const scripts = Object.entries(pkg.scripts ?? {});
      this.out(`Scripts available in ${pkg.name ?? dir} via \`npm run-script\`:
`);
      for (const [k, v] of scripts) this.out(`  ${k}
    ${v}
`);
      return 0;
    }
    if (pkg.scripts?.[name] === void 0) {
      if (name === "start" && this.ctx.vfs.exists(join(dir, "server.js"))) {
        return this.ctx.run(["node", "server.js", ...args], { cwd: dir });
      }
      if (f.ifPresent) return 0;
      this.err(`npm error Missing script: "${name}"
npm error
npm error To see a list of scripts, run:
npm error   npm run
`);
      return 1;
    }
    for (const stage of [`pre${name}`, name, `post${name}`]) {
      if (pkg.scripts?.[stage] === void 0) continue;
      const code = await this.runScript(dir, pkg, stage, stage === name ? args : [], { quiet: f.silent });
      if (code) {
        if (!f.silent && this.pm === "npm") this.err(`npm error Lifecycle script \`${stage}\` failed with error:
npm error code ${code}
npm error path ${dir}
npm error command failed
npm error command sh -c ${pkg.scripts[stage]}
`);
        return code;
      }
    }
    return 0;
  }
  /** Adds packages to `dir`'s package.json, then installs `installDir` (the workspace root). */
  async add(dir, specs, f, installDir = dir) {
    const ctx = this.ctx;
    const pjPath = join(dir, "package.json");
    let pkg = readJsonFile(ctx.vfs, pjPath);
    if (!pkg) {
      pkg = { name: basename(dir), version: "1.0.0" };
    }
    const reg = getRegistry(ctx, dir);
    const field = f.dev ? "devDependencies" : "dependencies";
    for (const spec of specs) {
      const { name, range } = splitSpec(spec);
      let saveRange = range;
      if (!range || !/^(file:|link:|workspace:|https?:|git|github:|npm:)/.test(range)) {
        try {
          const p = await reg.packument(name);
          const v = !range ? p["dist-tags"].latest : validRange(range) ? maxSatisfying(Object.keys(p.versions), range) : p["dist-tags"][range];
          if (!v) {
            this.err(`npm error code ETARGET
npm error notarget No matching version found for ${spec}.
`);
            return 1;
          }
          saveRange = f.exact ? v : !range || !validRange(range) || range === v ? `^${v}` : range;
        } catch (e) {
          this.err(`npm error code ${e?.code ?? "E404"}
npm error ${e?.message ?? e}
`);
          return 1;
        }
      }
      pkg[field] = { ...pkg[field] ?? {}, [name]: saveRange };
      if (field === "devDependencies" && pkg.dependencies?.[name]) delete pkg.dependencies[name];
      if (field === "dependencies" && pkg.devDependencies?.[name]) delete pkg.devDependencies[name];
      pkg[field] = Object.fromEntries(Object.entries(pkg[field]).sort(([a], [b]) => a.localeCompare(b)));
    }
    writeJson(ctx, pjPath, pkg);
    return this.install(installDir, f);
  }
  async remove(dir, names, f, installDir = dir) {
    const pjPath = join(dir, "package.json");
    const pkg = readJsonFile(this.ctx.vfs, pjPath);
    if (!pkg) return 1;
    for (const n of names) {
      for (const fld of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) if (pkg[fld]) delete pkg[fld][n];
    }
    writeJson(this.ctx, pjPath, pkg);
    return this.install(installDir, f);
  }
  /** node_modules/.bin/<name> in `dir` or an ancestor. */
  findLocalBin(dir, name) {
    let d = dir;
    for (; ; ) {
      const b = join(d, "node_modules/.bin", name);
      if (this.ctx.vfs.tryLookup(b)) return b;
      const p = dirname(d);
      if (p === d) return null;
      d = p;
    }
  }
  /**
   * Runs a command with the project's binaries on PATH, without installing anything (pnpm exec, yarn
   * exec, and pnpm/yarn/bun commands that are neither built in nor a script).
   */
  async runLocal(dir, args, o) {
    const [cmd, ...rest] = args;
    const pkg = readJsonFile(this.ctx.vfs, join(dir, "package.json")) ?? {};
    const env2 = this.scriptEnv(dir, pkg, cmd, args.join(" "));
    const bin = this.findLocalBin(dir, cmd) ?? (o.anyCommand ? this.ctx.kernel.which(cmd, env2, dir) : null);
    if (!bin) {
      if (this.pm === "pnpm") this.err(` ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL  Command "${cmd}" not found
`);
      else if (this.pm === "bun") this.err(`error: Script not found "${cmd}"
`);
      else this.err(`error Command "${cmd}" not found.
`);
      return 1;
    }
    return this.ctx.run([bin, ...rest], { env: env2, cwd: dir });
  }
  /** npx / npm exec / pnpm dlx / yarn dlx / bunx */
  async exec(dir, args, f, opts = {}) {
    const vfs = this.ctx.vfs;
    const packages = f.packages;
    const call = f.call ?? (f.shellMode && args.length ? args.join(" ") : void 0);
    if (!args.length && call === void 0) {
      this.err("npm error npx requires a command\n");
      return 1;
    }
    const cwd = opts.cwd ?? this.ctx.cwd;
    const projectPkg = () => readJsonFile(vfs, join(dir, "package.json")) ?? {};
    const [first, ...rest] = args;
    const { name, range } = splitSpec(first ?? "");
    const binName = packages.length ? first : name.replace(/^@[^/]+\//, "");
    if (!opts.forceInstall && !packages.length && call === void 0 && !range) {
      const b = this.findLocalBin(dir, first);
      if (b) return this.ctx.run([b, ...rest], { env: this.scriptEnv(dir, projectPkg(), "npx", args.join(" ")), cwd });
      const g = this.ctx.kernel.which(first, this.ctx.env, this.ctx.cwd);
      if (g && !g.startsWith("/bin/") && !first.startsWith("create-")) return this.ctx.run([g, ...rest], { cwd });
    }
    if (call !== void 0 && !packages.length) {
      const env3 = this.scriptEnv(dir, projectPkg(), "npx", call);
      return this.ctx.run(["/bin/sh", "-c", call], { env: env3, cwd });
    }
    const pkgs = packages.length ? packages : [first];
    const key = pkgs.join(" ").replace(/[^\w@.-]+/g, "_").slice(0, 100);
    const home = this.ctx.env.HOME ?? "/home/user";
    const cacheDir = join(home, ".npm/_npx", key);
    const fresh = !vfs.exists(join(cacheDir, "node_modules/.package-lock.json"));
    if (fresh || opts.forceInstall) {
      if (fresh && this.pm === "npm" && f.yes === false) {
        this.err(`npm error npx canceled due to missing packages and no YES option: ${JSON.stringify(pkgs)}
`);
        return 1;
      }
      vfs.mkdir(cacheDir, 493, true);
      const deps = {};
      for (const p of pkgs) {
        const s = splitSpec(p);
        deps[s.name] = s.range || "latest";
      }
      writeJson(this.ctx, join(cacheDir, "package.json"), { name: "npx-cache", private: true, dependencies: deps });
      const code = await this.install(cacheDir, { ...f, silent: true, ignoreScripts: true, omitDev: true }, { saveLock: false });
      if (code) return code;
      if (fresh && this.pm === "npm" && f.yes === void 0 && !f.silent) {
        const installed = Object.keys(deps).map((n) => `${n}@${readJsonFile(vfs, join(cacheDir, "node_modules", n, "package.json"))?.version ?? deps[n]}`);
        this.err(`npm warn exec The following package${installed.length > 1 ? "s were" : " was"} not found and will be installed: ${installed.join(", ")}
`);
      }
    }
    const env2 = this.scriptEnv(dir, projectPkg(), "npx", call ?? args.join(" "));
    env2.PATH = `${join(cacheDir, "node_modules/.bin")}:${env2.PATH}`;
    if (call !== void 0) return this.ctx.run(["/bin/sh", "-c", call], { env: env2, cwd });
    let bin;
    if (packages.length) bin = join(cacheDir, "node_modules/.bin", first);
    else {
      const pj = readJsonFile(vfs, join(cacheDir, "node_modules", name, "package.json"));
      const bins = typeof pj?.bin === "string" ? { [name.replace(/^@[^/]+\//, "")]: pj.bin } : pj?.bin ?? {};
      if (bins[binName]) bin = join(cacheDir, "node_modules/.bin", binName);
      else if (Object.keys(bins).length === 1) bin = join(cacheDir, "node_modules/.bin", Object.keys(bins)[0]);
      else bin = join(cacheDir, "node_modules/.bin", binName);
    }
    if (!vfs.tryLookup(bin)) {
      this.err(`npm error could not determine executable to run for ${first}
`);
      return 1;
    }
    return this.ctx.run([bin, ...rest], { env: env2, cwd });
  }
  /** The full registry document (the installer's abbreviated one has no description, license, …). */
  async fullPackument(dir, name) {
    const url = getRegistry(this.ctx, dir).registryFor(name) + name.replace("/", "%2f");
    const res = await getNetFetch()(url, { headers: { accept: "application/json" } });
    if (res.status === 404) throw Object.assign(new Error(`404 Not Found - GET ${url} - '${name}' is not in this registry.`), { code: "E404" });
    if (!res.ok) throw Object.assign(new Error(`${res.status} ${res.statusText} - GET ${url}`), { code: "E" + res.status });
    return res.json();
  }
  async view(dir, args, f) {
    let [spec, ...fields] = args;
    if (!spec || spec === ".") {
      const own = readJsonFile(this.ctx.vfs, join(findProjectRoot(this.ctx, dir) ?? dir, "package.json"));
      if (!own?.name) {
        this.err("npm error code EUSAGE\nnpm error Usage: npm view [<package-spec>] [<field>[.subfield]...]\n");
        return 1;
      }
      spec = own.name;
    }
    const { name, range } = splitSpec(spec);
    let p;
    try {
      p = await this.fullPackument(dir, name);
    } catch (e) {
      this.err(`npm error code ${e?.code ?? "E404"}
npm error ${e?.message}
`);
      return 1;
    }
    const all = Object.keys(p.versions ?? {});
    const tag = p["dist-tags"]?.[range || "latest"];
    const versions = tag && p.versions[tag] ? [tag] : validRange(range) ? all.filter((v) => satisfies(v, range)) : [];
    if (!versions.length) {
      this.err(`npm error code E404
npm error 404 No match found for version ${range}
npm error 404
npm error 404  '${spec}' is not in this registry.
`);
      return 1;
    }
    versions.sort((a, b) => compare(a, b));
    const dataOf = (v) => {
      const { versions: _v, ...top } = p;
      return { ...top, ...p.versions[v], versions: all, "dist-tags": p["dist-tags"], time: p.time };
    };
    if (f.json) {
      const vals = versions.map((v) => {
        const d = dataOf(v);
        if (!fields.length) return d;
        if (fields.length === 1) return lookup(d, fields[0]);
        return Object.fromEntries(fields.map((fld) => [fld, lookup(d, fld)]));
      });
      this.out(JSON.stringify(vals.length === 1 ? vals[0] : vals, null, 2) + "\n");
      return 0;
    }
    for (const v of versions) {
      const d = dataOf(v);
      if (fields.length) {
        const multi = versions.length > 1;
        for (const fld of fields) {
          const val = lookup(d, fld);
          if (val === void 0) continue;
          const shown = fields.length === 1 && !multi && typeof val === "string" ? val : inspect(val);
          this.out(`${multi ? `${name}@${v} ` : ""}${fields.length > 1 ? `${fld} = ` : ""}${shown}
`);
        }
      } else this.out(viewSummary(d, all.length));
    }
    return 0;
  }
  ls(dir) {
    const pkg = readJsonFile(this.ctx.vfs, join(dir, "package.json")) ?? {};
    const lock = readJsonFile(this.ctx.vfs, join(dir, "node_modules/.package-lock.json"));
    this.out(`${pkg.name ?? ""}@${pkg.version ?? ""} ${dir}
`);
    const direct = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.optionalDependencies }).sort();
    direct.forEach((n, i) => {
      const v = lock?.packages?.[`node_modules/${n}`]?.version;
      this.out(`${i === direct.length - 1 ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500"} ${n}@${v ?? "UNMET DEPENDENCY"}
`);
    });
    return 0;
  }
  init(dir, f) {
    const pj = join(dir, "package.json");
    if (this.ctx.vfs.exists(pj) && !f.yes) {
      this.out(`package.json already exists in ${dir}
`);
      return 0;
    }
    const pkg = { name: basename(dir).toLowerCase().replace(/[^a-z0-9._-]/g, "-"), version: "1.0.0", description: "", main: "index.js", scripts: { test: 'echo "Error: no test specified" && exit 1' }, keywords: [], author: "", license: "ISC" };
    writeJson(this.ctx, pj, pkg);
    this.out(`Wrote to ${pj}:

${JSON.stringify(pkg, null, 2)}

`);
    return 0;
  }
  async globalInstall(specs, f) {
    const ctx = this.ctx;
    ctx.vfs.mkdir(GLOBAL_DIR, 493, true);
    if (!ctx.vfs.exists(join(GLOBAL_DIR, "package.json"))) writeJson(ctx, join(GLOBAL_DIR, "package.json"), { name: "global", private: true });
    const code = await this.add(GLOBAL_DIR, specs, { ...f, dev: false, ignoreScripts: true });
    if (code) return code;
    this.linkGlobalBins();
    return 0;
  }
  async globalRemove(names, f) {
    if (!this.ctx.vfs.exists(join(GLOBAL_DIR, "package.json"))) return 0;
    const code = await this.remove(GLOBAL_DIR, names, { ...f, ignoreScripts: true });
    this.linkGlobalBins();
    return code;
  }
  /** Links the binaries of the globally installed packages (not of their dependencies) into /usr/local/bin. */
  linkGlobalBins() {
    const vfs = this.ctx.vfs;
    const bdir = join(GLOBAL_DIR, "node_modules/.bin");
    const want = /* @__PURE__ */ new Map();
    const gpkg = readJsonFile(vfs, join(GLOBAL_DIR, "package.json")) ?? {};
    for (const n of Object.keys(gpkg.dependencies ?? {})) {
      const pj = readJsonFile(vfs, join(GLOBAL_DIR, "node_modules", n, "package.json"));
      const bins = typeof pj?.bin === "string" ? [n.replace(/^@[^/]+\//, "")] : Object.keys(pj?.bin ?? {});
      for (const b of bins) if (vfs.tryLookup(join(bdir, b), false)) want.set(b, join(bdir, b));
    }
    try {
      for (const b of vfs.readdir("/usr/local/bin")) {
        const link = `/usr/local/bin/${b}`;
        const ino = vfs.tryLookup(link, false);
        if (ino && isLink(ino) && vfs.readlink(link).startsWith(GLOBAL_DIR + "/") && !want.has(b)) vfs.unlink(link);
      }
    } catch {
    }
    for (const [b, target] of want) {
      const link = `/usr/local/bin/${b}`;
      if (vfs.tryLookup(link, false)) vfs.unlink(link);
      vfs.symlink(target, link);
    }
  }
};
function lookup(o, field) {
  return field.split(".").reduce((x, k) => x?.[k], o);
}
function inspect(v, indent = "") {
  if (typeof v === "string") return `'${v.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n")}'`;
  if (v === null || typeof v !== "object") return String(v);
  const inner = indent + "  ";
  const items = Array.isArray(v) ? v.map((x) => inspect(x, inner)) : Object.entries(v).map(([k, x]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : inspect(k)}: ${inspect(x, inner)}`);
  const [open, close] = Array.isArray(v) ? ["[", "]"] : ["{", "}"];
  if (!items.length) return open + close;
  const one = `${open} ${items.join(", ")} ${close}`;
  if (one.length + indent.length <= 72 && !one.includes("\n")) return one;
  return `${open}
${items.map((x) => inner + x).join(",\n")}
${indent}${close}`;
}
function fmtBytes(n) {
  if (n < 1e3) return `${n} B`;
  if (n < 1e6) return `${(n / 1e3).toFixed(1)} kB`;
  if (n < 1e9) return `${(n / 1e6).toFixed(1)} MB`;
  return `${(n / 1e9).toFixed(1)} GB`;
}
function viewSummary(d, versionCount) {
  const person = (p) => typeof p === "string" ? p : `${p.name ?? ""}${p.email ? ` <${p.email}>` : ""}`;
  const license = typeof d.license === "string" ? d.license : d.license?.type ?? "Proprietary";
  const deps = Object.entries(d.dependencies ?? {});
  let s = `
${d.name}@${d.version} | ${license} | deps: ${deps.length || "none"} | versions: ${versionCount}
`;
  if (d.deprecated) s += `DEPRECATED - ${d.deprecated}
`;
  if (d.description) s += `${d.description}
`;
  if (d.homepage) s += `${d.homepage}
`;
  if (Array.isArray(d.keywords) && d.keywords.length) s += `
keywords: ${d.keywords.join(", ")}
`;
  const bins = typeof d.bin === "string" ? [d.name.replace(/^@[^/]+\//, "")] : Object.keys(d.bin ?? {});
  if (bins.length) s += `
bin: ${bins.join(", ")}
`;
  if (d.dist) {
    s += `
dist
.tarball: ${d.dist.tarball}
`;
    if (d.dist.shasum) s += `.shasum: ${d.dist.shasum}
`;
    if (d.dist.integrity) s += `.integrity: ${d.dist.integrity}
`;
    if (d.dist.unpackedSize) s += `.unpackedSize: ${fmtBytes(d.dist.unpackedSize)}
`;
  }
  if (deps.length) s += `
dependencies:
${deps.map(([k, v]) => `${k}: ${v}`).join("\n")}
`;
  if (Array.isArray(d.maintainers) && d.maintainers.length) s += `
maintainers:
${d.maintainers.map((m) => `- ${person(m)}`).join("\n")}
`;
  s += `
dist-tags:
${Object.entries(d["dist-tags"] ?? {}).map(([k, x]) => `${k}: ${x}`).join("\n")}
`;
  const when = d.time?.[d.version];
  if (when) s += `
published ${when.slice(0, 10)}${d._npmUser ? ` by ${person(d._npmUser)}` : ""}
`;
  return s;
}
function splitSpec(spec) {
  if (spec.startsWith("@")) {
    const at2 = spec.indexOf("@", 1);
    return at2 === -1 ? { name: spec, range: "" } : { name: spec.slice(0, at2), range: spec.slice(at2 + 1) };
  }
  const at = spec.indexOf("@");
  return at === -1 ? { name: spec, range: "" } : { name: spec.slice(0, at), range: spec.slice(at + 1) };
}
function globRe(pat) {
  return new RegExp("^" + pat.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "\0").replace(/\*/g, "[^/]*").replace(/\u0000/g, ".*") + "$");
}
function selectProjects(ctx, pm, root, f) {
  const rootPkg = readJsonFile(ctx.vfs, join(root, "package.json")) ?? {};
  const ws = listWorkspaces(ctx.vfs, root, rootPkg);
  const rootProject = { name: rootPkg.name ?? basename(root), dir: root, pkg: rootPkg };
  if (pm === "npm") {
    if (!f.workspaces.length && !f.allWorkspaces) return null;
    let picked;
    if (f.allWorkspaces) picked = ws;
    else {
      picked = [];
      for (const sel of f.workspaces) {
        const abs = ctx.resolve(sel);
        const hits = ws.filter((w) => w.name === sel || w.dir === abs || w.dir.startsWith(abs + "/"));
        if (!hits.length) return { error: `npm error No workspaces found:
npm error   --workspace=${sel}
` };
        for (const h of hits) if (!picked.includes(h)) picked.push(h);
      }
    }
    if (!picked.length) return { error: "npm error No workspaces found!\n" };
    return f.includeWorkspaceRoot ? [rootProject, ...picked] : picked;
  }
  if (!f.filters.length && !f.recursive) return null;
  const candidates = [rootProject, ...ws];
  if (!f.filters.length) return f.includeWorkspaceRoot ? candidates : ws;
  const matches2 = (p, sel) => {
    sel = sel.replace(/^\.\.\./, "").replace(/\.\.\.$/, "").replace(/^\^/, "");
    const pathSel = /^\{(.*)\}$/.exec(sel)?.[1] ?? (sel.startsWith(".") || sel.startsWith("/") ? sel : null);
    if (pathSel !== null) return globRe(resolve(root, pathSel)).test(p.dir);
    return globRe(sel).test(p.name);
  };
  const inc = f.filters.filter((s) => !s.startsWith("!"));
  const exc = f.filters.filter((s) => s.startsWith("!")).map((s) => s.slice(1));
  return candidates.filter((p) => (inc.length ? inc.some((s) => matches2(p, s)) : p !== rootProject) && !exc.some((s) => matches2(p, s)));
}
var USAGE = (pm) => `Usage: ${pm} <command>

Commands: install, ci, add, remove, run, exec, test, start, init, view, ls, create
(OpenVessel ${pm}-compatible front end)
`;
async function main(ctx, pm, argv) {
  const npm = new Npm(ctx, pm);
  const lead = parseFlags(argv, pm, { stopAtPositional: true });
  const leadArgs = argv.slice(0, lead.stop);
  const cmd = lead.dashDash ? lead.passthrough[0] : argv[lead.stop];
  const after = lead.dashDash ? lead.passthrough.slice(1) : argv.slice(lead.stop + 1);
  const all = (o = {}) => parseFlags([...leadArgs, ...after], pm, o);
  if (lead.help) {
    ctx.out(USAGE(pm));
    return 0;
  }
  if (lead.version && !cmd) {
    ctx.out(PM_VERSIONS[pm] + "\n");
    return 0;
  }
  const baseDir = lead.prefix ? ctx.resolve(lead.prefix) : ctx.cwd;
  const projectDir = () => findProjectRoot(ctx, baseDir) ?? baseDir;
  const wsRoot = (dir) => findWorkspaceRoot(ctx, dir) ?? dir;
  if (!cmd) {
    if (pm === "yarn" || pm === "pnpm" || pm === "bun") return npm.install(wsRoot(projectDir()), lead);
    ctx.out(`npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>

npm@${NPM_VERSION}
`);
    return 1;
  }
  let op = COMMANDS[pm].get(cmd);
  if (!op && pm !== "npm") {
    const dir = projectDir();
    const pkg = readJsonFile(ctx.vfs, join(dir, "package.json"));
    if (pkg?.scripts?.[cmd] !== void 0 || (pm === "pnpm" || pm === "bun") && (lead.recursive || lead.filters.length)) op = "script";
    else if (pm === "bun" && /\.(m?[jt]s|cjs|tsx?)$/.test(cmd)) return ctx.run(["node", cmd, ...after]);
    else return npm.runLocal(dir, [cmd, ...after], { anyCommand: pm === "pnpm" });
  }
  if (!op) {
    ctx.err(`Unknown command: "${cmd}"

To see a list of supported npm commands, run:
  npm help
`);
    return 1;
  }
  const passesArgs = op === "run" || op === "script" || op === "dlx" || op === "local" || op === "shell" || op === "workspace" || op === "workspaces" || op === "global" || op === "bunpm";
  const f = pm === "npm" || !passesArgs ? all({ exec: op === "exec" }) : lead;
  if (pm === "npm") {
    npm.cliConfig = f.config;
    for (const k of Object.keys(f.config)) {
      if (!NPM_CONFIGS.has(k) && !f.silent) ctx.err(`npm warn Unknown cli config "--${k}". This will stop working in the next major version of npm.
`);
    }
  }
  if (f.help) {
    ctx.out(USAGE(pm));
    return 0;
  }
  const eachProjectWith = async (sf, dir, fn, o = {}) => {
    const sel = selectProjects(ctx, pm, wsRoot(dir), sf);
    if (sel === null) return fn({ name: "", dir, pkg: null });
    if ("error" in sel) {
      ctx.err(sel.error);
      return 1;
    }
    if (!sel.length) {
      if (pm === "pnpm") ctx.out(`No projects matched the filters in "${wsRoot(dir)}"
`);
      else ctx.err(pm === "bun" ? "error: No packages matched the filter\n" : "npm error No workspaces found!\n");
      return pm === "pnpm" ? 0 : 1;
    }
    const name = o.needScript;
    const todo = name && pm !== "npm" ? sel.filter((p) => p.pkg?.scripts?.[name] !== void 0) : sel;
    if (!todo.length && !sf.ifPresent) {
      ctx.err(pm === "bun" ? `error: No packages matched the filter or have the script "${name}"
` : ` ERR_PNPM_RECURSIVE_RUN_NO_SCRIPT  None of the selected packages has a "${name}" script
`);
      return 1;
    }
    let last = 0;
    for (const p of todo) {
      const code = await fn(p);
      if (code) {
        last = code;
        if (pm !== "npm") return code;
      }
    }
    return last;
  };
  const eachProject = (dir, fn) => eachProjectWith(f, dir, fn);
  const runScript = (name, args, sf) => {
    const dir = pm === "pnpm" && sf.workspaceRoot ? wsRoot(projectDir()) : projectDir();
    return eachProjectWith(sf, dir, (p) => npm.run(p.dir, name, args, sf), { needScript: name });
  };
  const scriptArgs = (args) => {
    if (args[0] !== "--" || pm === "pnpm" || pm === "npm") return args;
    if (pm === "yarn") ctx.err(`warning From Yarn 1.0 onwards, scripts don't require "--" for options to be forwarded. In a future version, any explicit "--" will be forwarded as-is to the scripts.
`);
    return args.slice(1);
  };
  switch (op) {
    case "install":
    case "add": {
      if (f.global) return npm.globalInstall(f.rest, f);
      const dir = projectDir();
      const root = wsRoot(dir);
      if (f.rest.length) {
        if (pm === "pnpm" && f.workspaceRoot) return npm.add(root, f.rest, f, root);
        const sel = selectProjects(ctx, pm, root, f);
        if (sel && "error" in sel) {
          ctx.err(sel.error);
          return 1;
        }
        if (sel?.length) {
          for (const p of sel.slice(0, -1)) {
            const code = await npm.add(p.dir, f.rest, { ...f, silent: true }, root);
            if (code) return code;
          }
          return npm.add(sel[sel.length - 1].dir, f.rest, f, root);
        }
        return npm.add(dir, f.rest, f, root);
      }
      if (op === "add") {
        ctx.err(`${pm} add requires at least one package
`);
        return 1;
      }
      return npm.install(root, f);
    }
    case "ci": {
      const dir = wsRoot(projectDir());
      ctx.vfs.rmrf(join(dir, "node_modules"));
      return npm.install(dir, f);
    }
    case "update":
      return npm.install(wsRoot(projectDir()), f, { noLock: true });
    case "remove": {
      if (f.global) return npm.globalRemove(f.rest, f);
      const dir = projectDir();
      const root = wsRoot(dir);
      const sel = selectProjects(ctx, pm, root, f);
      if (sel && "error" in sel) {
        ctx.err(sel.error);
        return 1;
      }
      if (sel?.length) {
        for (const p of sel.slice(0, -1)) {
          const code = await npm.remove(p.dir, f.rest, { ...f, silent: true }, root);
          if (code) return code;
        }
        return npm.remove(sel[sel.length - 1].dir, f.rest, f, root);
      }
      return npm.remove(dir, f.rest, f, root);
    }
    case "run": {
      if (pm === "npm") return runScript(f.rest[0], [...f.rest.slice(1), ...f.passthrough], f);
      const g = parseFlags(after, pm, { stopAtPositional: true });
      const sf = parseFlags([...leadArgs, ...after.slice(0, g.stop)], pm);
      if (sf.help) {
        ctx.out(USAGE(pm));
        return 0;
      }
      if (g.dashDash) return runScript(g.passthrough[0], scriptArgs(g.passthrough.slice(1)), sf);
      return runScript(after[g.stop], scriptArgs(after.slice(g.stop + 1)), sf);
    }
    case "script": {
      const name = COMMANDS[pm].has(cmd) ? SCRIPT_ALIASES[cmd] ?? cmd : cmd;
      if (pm === "npm") return runScript(name, [...f.rest, ...f.passthrough], f);
      return runScript(name, scriptArgs(after), lead);
    }
    case "exec": {
      const execArgs = [...f.rest, ...f.passthrough];
      return eachProject(baseDir, (p) => npm.exec(p.pkg ? p.dir : baseDir, execArgs, f, { cwd: p.pkg ? p.dir : void 0 }));
    }
    case "dlx": {
      const g = parseFlags(after, pm, { exec: true, stopAtPositional: true });
      const xf = parseFlags([...leadArgs, ...after.slice(0, g.stop)], pm, { exec: true });
      if (xf.help) {
        ctx.out(USAGE(pm));
        return 0;
      }
      const execArgs = g.dashDash ? g.passthrough : after.slice(g.stop);
      return npm.exec(baseDir, execArgs, xf, { forceInstall: pm === "pnpm" || pm === "yarn" });
    }
    case "local": {
      const g = parseFlags(after, pm, { stopAtPositional: true });
      const args = g.dashDash ? g.passthrough : after.slice(g.stop);
      if (!args.length) {
        ctx.err(pm === "pnpm" ? " ERR_PNPM_EXEC_MISSING_COMMAND  'pnpm exec' requires a command to run\n" : "error No command specified.\n");
        return 1;
      }
      const ef = parseFlags([...leadArgs, ...after.slice(0, g.stop)], pm);
      const dir = pm === "pnpm" && ef.workspaceRoot ? wsRoot(projectDir()) : projectDir();
      return eachProjectWith(ef, dir, (p) => npm.runLocal(p.dir, args, { anyCommand: true }));
    }
    case "shell": {
      const dir = projectDir();
      const script = after.join(" ");
      return ctx.run(["/bin/sh", "-c", script], { env: npm.scriptEnv(dir, readJsonFile(ctx.vfs, join(dir, "package.json")) ?? {}, "exec", script), cwd: ctx.cwd });
    }
    case "create":
    case "init": {
      if (!f.rest.length || op === "init" && pm !== "npm") {
        if (op === "create") {
          ctx.err(pm === "pnpm" ? " ERR_PNPM_MISSING_ARGS  Missing the template package name.\n" : `${pm} create requires a package name
`);
          return 1;
        }
        return npm.init(baseDir, f);
      }
      const at = after.indexOf(f.rest[0]);
      const init2 = f.rest[0];
      const iargs = pm === "npm" ? [...f.rest.slice(1), ...f.passthrough] : after.slice(at + 1).filter((a, i) => !(i === 0 && a === "--"));
      let pkgName;
      if (init2.startsWith("@")) {
        const [scope, n] = init2.split("/");
        pkgName = n ? `${scope}/create-${n.replace(/@.*$/, "")}` : `${scope}/create`;
      } else pkgName = `create-${init2}`;
      const version = !init2.startsWith("@") && init2.includes("@") ? "@" + init2.split("@")[1] : "";
      return npm.exec(baseDir, [pkgName.replace(/@[^/]*$/, "") + version, ...iargs], { ...f, packages: [] }, { forceInstall: true });
    }
    case "view":
      return npm.view(baseDir, f.rest, f);
    case "ls":
    case "why":
      return npm.ls(f.global ? GLOBAL_DIR : projectDir());
    case "reinstall":
      return npm.install(wsRoot(projectDir()), f);
    case "get":
    case "set":
    case "config": {
      const rest = op === "config" ? f.rest : [op, ...f.rest];
      const rc = readNpmrc(ctx, baseDir);
      if (rest[0] === "get") {
        const k = rest[1] ?? "registry";
        ctx.out((rc[k] ?? (k === "registry" ? "https://registry.npmjs.org/" : k === "prefix" ? "/usr/local" : "undefined")) + "\n");
        return 0;
      }
      if (rest[0] === "set" && rest[1]) {
        const [k, v] = rest[1].includes("=") ? rest[1].split("=") : [rest[1], rest[2]];
        const file2 = join(ctx.env.HOME ?? "/home/user", ".npmrc");
        let text = "";
        try {
          text = dec8.decode(ctx.vfs.readFile(file2));
        } catch {
        }
        text = text.split("\n").filter((l) => l && !l.startsWith(k + "=")).concat(`${k}=${v}`).join("\n") + "\n";
        ctx.vfs.writeFile(file2, text);
        return 0;
      }
      if (rest[0] === "list" || rest[0] === "ls") {
        for (const [k, v] of Object.entries(rc)) ctx.out(`${k} = "${v}"
`);
        return 0;
      }
      return 0;
    }
    case "prefix":
      ctx.out((f.global ? "/usr/local" : projectDir()) + "\n");
      return 0;
    case "root":
      ctx.out((f.global ? join(GLOBAL_DIR, "node_modules") : join(projectDir(), "node_modules")) + "\n");
      return 0;
    case "bin":
      ctx.out((f.global ? "/usr/local/bin" : join(projectDir(), "node_modules/.bin")) + "\n");
      return 0;
    case "pkg": {
      const dir = projectDir();
      const pjPath = join(dir, "package.json");
      const pkg = readJsonFile(ctx.vfs, pjPath) ?? {};
      if (f.rest[0] === "get") {
        const v = f.rest[1] ? f.rest[1].split(".").reduce((o, k) => o?.[k], pkg) : pkg;
        ctx.out(JSON.stringify(v, null, 2) + "\n");
        return 0;
      }
      if (f.rest[0] === "set") {
        for (const kv of f.rest.slice(1)) {
          const eq = kv.indexOf("=");
          const keys = kv.slice(0, eq).split(".");
          let o = pkg;
          for (const k of keys.slice(0, -1)) o = o[k] ??= {};
          o[keys[keys.length - 1]] = kv.slice(eq + 1);
        }
        writeJson(ctx, pjPath, pkg);
        return 0;
      }
      return 1;
    }
    case "cache":
      if (f.rest[0] === "clean" || f.rest[0] === "clear" || f.rest[0] === "verify" || f.rest[0] === "rm") {
        if (typeof caches !== "undefined") await caches.delete("openvessel-npm-v1").catch(() => {
        });
        ctx.out("Cache cleaned\n");
      }
      return 0;
    case "help":
      if (pm === "npm") {
        ctx.out(`npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>

npm@${NPM_VERSION}
`);
      } else ctx.out(USAGE(pm));
      return 0;
    case "global": {
      const [sub, ...rest] = after;
      if (sub === "add") return main(ctx, pm, [...leadArgs, "add", "-g", ...rest]);
      if (sub === "remove") return main(ctx, pm, [...leadArgs, "remove", "-g", ...rest]);
      if (sub === "bin") return main(ctx, pm, [...leadArgs, "bin", "-g"]);
      if (sub === "list") return npm.ls(GLOBAL_DIR);
      ctx.err(`yarn global ${sub ?? ""} is not supported in OpenVessel
`);
      return 1;
    }
    case "workspace": {
      const [name, ...rest] = after;
      const root = wsRoot(projectDir());
      const ws = listWorkspaces(ctx.vfs, root).find((w) => w.name === name);
      if (!ws) {
        ctx.err(`error Unknown workspace "${name ?? ""}".
`);
        return 1;
      }
      return main(ctx, pm, [...leadArgs, "--cwd", ws.dir, ...rest]);
    }
    case "workspaces": {
      const [sub, ...rest] = after;
      const root = wsRoot(projectDir());
      const list = listWorkspaces(ctx.vfs, root);
      if (sub === "run") {
        for (const ws of list) {
          const code = await main(ctx, pm, [...leadArgs, "--cwd", ws.dir, "run", ...rest]);
          if (code) return code;
        }
        return 0;
      }
      if (sub === "info") {
        const names = new Set(list.map((w) => w.name));
        const info = {};
        for (const w of list) {
          const deps = Object.keys({ ...w.pkg.dependencies, ...w.pkg.devDependencies, ...w.pkg.optionalDependencies }).filter((n) => names.has(n));
          info[w.name] = { location: relative(root, w.dir), workspaceDependencies: deps, mismatchedWorkspaceDependencies: [] };
        }
        ctx.out(JSON.stringify(info, null, 2) + "\n");
        return 0;
      }
      ctx.err(`yarn workspaces ${sub ?? ""} is not supported in OpenVessel
`);
      return 1;
    }
    case "bunpm": {
      const [sub, ...rest] = after;
      if (sub === "ls") return main(ctx, "npm", [...leadArgs, "ls", ...rest]);
      if (sub === "bin") {
        ctx.out((rest.includes("-g") ? "/usr/local/bin" : join(projectDir(), "node_modules/.bin")) + "\n");
        return 0;
      }
      if (sub === "cache") {
        if (rest[0] === "rm") {
          if (typeof caches !== "undefined") await caches.delete("openvessel-npm-v1").catch(() => {
          });
          ctx.out("Cache cleaned\n");
        }
        return 0;
      }
      if (sub === "view") return npm.view(baseDir, rest, parseFlags(rest, pm));
      ctx.err(`bun pm ${sub ?? ""} is not supported in OpenVessel
`);
      return 1;
    }
    case "unsupported0":
    case "unsupported":
      ctx.err(`${pm} ${cmd} is not supported in OpenVessel
`);
      return op === "unsupported0" ? 0 : 1;
  }
}
function npxArgv(args) {
  const g = parseFlags(args, "npm", { exec: true, stopAtPositional: true });
  if (g.dashDash || g.stop >= args.length) return ["exec", ...args];
  return ["exec", ...args.slice(0, g.stop), "--", ...args.slice(g.stop)];
}
function installNpm(kernel2) {
  const front = (pm) => async (ctx) => main(ctx, pm, ctx.argv.slice(1));
  kernel2.registerProgram("npm", front("npm"), ["/usr/bin"]);
  kernel2.registerProgram("pnpm", front("pnpm"), ["/usr/bin"]);
  kernel2.registerProgram("yarn", front("yarn"), ["/usr/bin"]);
  kernel2.registerProgram("bun", front("bun"), ["/usr/bin"]);
  kernel2.registerProgram("npx", async (ctx) => main(ctx, "npm", npxArgv(ctx.argv.slice(1))), ["/usr/bin"]);
  kernel2.registerProgram("pnpx", async (ctx) => main(ctx, "pnpm", ["dlx", ...ctx.argv.slice(1)]), ["/usr/bin"]);
  kernel2.registerProgram("bunx", async (ctx) => main(ctx, "bun", ["x", ...ctx.argv.slice(1)]), ["/usr/bin"]);
  kernel2.registerProgram("corepack", async (ctx) => {
    ctx.err("corepack: package managers are built into OpenVessel; nothing to do\n");
    return 0;
  }, ["/usr/bin"]);
}

// src/kernel/outbound.ts
var enc7 = new TextEncoder();
var dec9 = new TextDecoder();
var HOP = /^(connection|keep-alive|proxy-connection|transfer-encoding|upgrade|te|trailer|host|content-length)$/i;
var targets = /* @__PURE__ */ new WeakMap();
function connectOutbound(base, target, by) {
  const [processEnd, ours] = createSocketPair();
  targets.set(processEnd, target);
  void serve(base, target, by, ours);
  return processEnd;
}
function markOutboundTls(f, servername) {
  const t = targets.get(f);
  if (!t) return false;
  t.tls = true;
  if (servername) t.host = servername;
  return true;
}
var Reader = class {
  constructor(f) {
    this.f = f;
  }
  f;
  buf = new Uint8Array(0);
  eof = false;
  async fill() {
    if (this.eof) return false;
    const d = await this.f.read(65536);
    if (!d || !d.length) {
      this.eof = true;
      return false;
    }
    const b = new Uint8Array(this.buf.length + d.length);
    b.set(this.buf);
    b.set(d, this.buf.length);
    this.buf = b;
    return true;
  }
  /** Bytes up to (not including) the delimiter, or null at EOF. */
  async until(delim, limit = 1 << 20) {
    for (; ; ) {
      const i = indexOf2(this.buf, delim);
      if (i >= 0) {
        const out = this.buf.slice(0, i);
        this.buf = this.buf.subarray(i + delim.length);
        return out;
      }
      if (this.buf.length > limit || !await this.fill()) return null;
    }
  }
  async take(n) {
    while (this.buf.length < n) if (!await this.fill()) return null;
    const out = this.buf.slice(0, n);
    this.buf = this.buf.subarray(n);
    return out;
  }
  /** Peeks at the first bytes without consuming them. */
  async peek(n) {
    while (this.buf.length < n && await this.fill()) ;
    return this.buf.subarray(0, n);
  }
};
async function serve(base, target, by, conn) {
  const r = new Reader(conn);
  const write = (d) => conn.write(typeof d === "string" ? enc7.encode(d) : d);
  try {
    const first = dec9.decode(await r.peek(8));
    if (first && !/^[A-Z]{3,10} /.test(first)) return;
    for (; ; ) {
      const head2 = await r.until("\r\n\r\n");
      if (!head2) return;
      const [line, ...lines] = dec9.decode(head2).split("\r\n");
      const m = /^([A-Z]+) (\S+) HTTP\/1\.([01])$/.exec(line);
      if (!m) {
        write("HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");
        return;
      }
      const [, method, path, minor] = m;
      const headers = [];
      for (const l of lines) {
        const i = l.indexOf(":");
        if (i > 0) headers.push([l.slice(0, i).trim(), l.slice(i + 1).trim()]);
      }
      const get = (n) => headers.find(([k]) => k.toLowerCase() === n)?.[1];
      const body = await readBody(r, get("transfer-encoding"), get("content-length"));
      if (body === null) return;
      const keepAlive = minor === "1" ? !/close/i.test(get("connection") ?? "") : /keep-alive/i.test(get("connection") ?? "");
      if (/websocket/i.test(get("upgrade") ?? "")) {
        write("HTTP/1.1 501 Not Implemented\r\nConnection: close\r\nContent-Type: text/plain\r\n\r\nOpenVessel: WebSocket upgrades to outside hosts are not supported over raw sockets\n");
        return;
      }
      const host = get("host") ?? (target.port === (target.tls ? 443 : 80) ? target.host : `${target.host}:${target.port}`);
      const url = /^https?:\/\//i.test(path) ? path : `${target.tls ? "https" : "http"}://${host}${path}`;
      const ok = await forward(base, by, url, method, headers, body, write);
      if (!ok || !keepAlive) return;
    }
  } catch {
  } finally {
    conn.unref();
  }
}
async function readBody(r, te, cl) {
  if (te && /chunked/i.test(te)) {
    const parts = [];
    for (; ; ) {
      const sizeLine = await r.until("\r\n");
      if (sizeLine === null) return null;
      const size = parseInt(dec9.decode(sizeLine).split(";")[0], 16);
      if (!size) {
        for (; ; ) {
          const t = await r.until("\r\n");
          if (t === null || t.length === 0) break;
        }
        break;
      }
      const d = await r.take(size);
      if (!d || await r.take(2) === null) return null;
      parts.push(d);
    }
    return concat(parts);
  }
  const n = Number(cl ?? 0);
  if (!n) return new Uint8Array(0);
  return r.take(n);
}
async function forward(base, by, url, method, headers, body, write) {
  const pass = headers.filter(([k]) => !HOP.test(k));
  let res;
  try {
    res = await fetch(`${base}/__ov/net?url=${encodeURIComponent(url)}`, {
      method: method === "GET" || method === "HEAD" ? method : "POST",
      headers: { "x-ov-h": encodeURIComponent(JSON.stringify(pass)), "x-ov-by": encodeURIComponent(by), "x-ov-method": method },
      body: method === "GET" || method === "HEAD" ? void 0 : body
    });
  } catch (e) {
    return fail(write, 502, `request to ${url} failed: ${e.message}`);
  }
  const err = res.headers.get("x-ov-error");
  if (err) return fail(write, err === "denied" ? 403 : 502, decodeURIComponent(res.headers.get("x-ov-message") ?? err));
  const status = Number(res.headers.get("x-ov-status") ?? 200);
  const statusText = decodeURIComponent(res.headers.get("x-ov-status-text") ?? "") || "OK";
  let rh = [];
  try {
    rh = JSON.parse(decodeURIComponent(res.headers.get("x-ov-rh") ?? "[]"));
  } catch {
  }
  const out = rh.filter(([k]) => !/^(content-encoding|content-length|transfer-encoding|connection|keep-alive)$/i.test(k));
  const nullBody = status === 204 || status === 304 || method === "HEAD" || status >= 100 && status < 200;
  let head2 = `HTTP/1.1 ${status} ${statusText}\r
`;
  for (const [k, v] of out) head2 += `${k}: ${v}\r
`;
  if (!nullBody) head2 += "Transfer-Encoding: chunked\r\n";
  write(head2 + "\r\n");
  if (nullBody) {
    await res.body?.cancel();
    return true;
  }
  const reader = res.body?.getReader();
  if (reader) {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value.length) continue;
      write(value.length.toString(16) + "\r\n");
      write(value);
      write("\r\n");
    }
  }
  write("0\r\n\r\n");
  return true;
}
function fail(write, status, message) {
  const b = enc7.encode(message + "\n");
  write(`HTTP/1.1 ${status} ${status === 403 ? "Forbidden" : "Bad Gateway"}\r
Content-Type: text/plain\r
Content-Length: ${b.length}\r
Connection: close\r
X-OpenVessel-Error: 1\r
\r
`);
  write(b);
  return false;
}
function concat(parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}
function indexOf2(b, s) {
  const n = s.length;
  outer: for (let i = 0; i + n <= b.length; i++) {
    for (let j = 0; j < n; j++) if (b[i + j] !== s.charCodeAt(j)) continue outer;
    return i;
  }
  return -1;
}

// src/kernel/syscalls.ts
var enc8 = new TextEncoder();
function installSyscalls(kernel2, esm2, net2) {
  const vfs = kernel2.vfs;
  const watchers = /* @__PURE__ */ new Map();
  const readers = /* @__PURE__ */ new Map();
  const pings = /* @__PURE__ */ new Map();
  let nextPing = 1;
  const socketPeersReading = (p) => {
    const out = [];
    for (const f of p.fds.values()) {
      const pipe = f.kind === "socket" ? f.opts.writer?.pipe : void 0;
      if (!pipe) continue;
      for (const st of readers.values()) if (st.active && st.pipe === pipe && st.proc && st.proc !== p && st.thread && !out.includes(st)) out.push(st);
    }
    return out;
  };
  const reservedTids = /* @__PURE__ */ new Set();
  const tlsEnds = /* @__PURE__ */ new WeakMap();
  let nextTid = 1e5;
  const BASE_FDS = 30;
  const FDS_PER_THREAD = 8;
  const nodeThreadIds = /* @__PURE__ */ new WeakMap();
  const threadWatchers = /* @__PURE__ */ new Map();
  const threadGone = (proc, tid) => {
    const key = `${proc.pid}:${tid}`;
    const ws = threadWatchers.get(key);
    threadWatchers.delete(key);
    for (const w of ws ?? []) if (proc.threads.get(w.tid) === w) w.worker.postMessage({ t: "thread-gone", tid });
  };
  const abs = (proc, p) => {
    if (typeof p !== "string" || p === "") throw kerr("ENOENT");
    return p.startsWith("/") ? normalize(p) : resolve(proc.cwd, p);
  };
  const checkDirWritable = (p) => {
    if (!permits(vfs.lookup(dirname(p)), 3)) throw kerr("EACCES");
  };
  const checkPerm = (n, want) => {
    if (want && !permits(n, want)) throw kerr("EACCES");
  };
  const accessFor = (flags) => {
    const acc = flags & O_ACCMODE;
    return (acc !== O_WRONLY ? 4 : 0) | (acc !== O_RDONLY || flags & 512 ? 2 : 0);
  };
  const fdFile = (proc, fd) => {
    const f = proc.fds.get(fd);
    if (!f) throw kerr("ENOENT");
    return f;
  };
  const procDirStat = (proc, p, l) => {
    const m = /^\/proc\/(self|\d+)(\/fd)?$/.exec(p);
    if (!m || m[1] !== "self" && Number(m[1]) !== proc.pid) return null;
    const st = vfs.lstat("/proc");
    if (m[1] === "self" && !m[2] && l) return { ...st, ino: 0, mode: S_IFLNK | 511, nlink: 1, size: String(proc.pid).length };
    return { ...st, ino: 0, mode: S_IFDIR | (m[2] ? 320 : 365), nlink: 2 };
  };
  const fstatOf = (f) => {
    if (f.opts.node) return vfs.statOf(f.opts.node);
    const now = Date.now();
    const mode = f.kind === "tty" ? S_IFCHR | 400 : f.kind === "pipe" ? S_IFIFO | 384 : f.kind === "socket" ? S_IFSOCK | 384 : S_IFCHR | 438;
    return { dev: 0, ino: 0, mode, nlink: 1, uid: 1e3, gid: 1e3, rdev: 0, size: 0, blksize: 4096, blocks: 0, atimeMs: now, mtimeMs: now, ctimeMs: now, birthtimeMs: now };
  };
  const buildStdio = (proc, specs) => {
    const child = [];
    const parentFds = [];
    const toClose = [];
    try {
      buildStdioInto(proc, specs, child, parentFds, toClose);
    } catch (e) {
      for (const f of toClose) f.unref();
      for (const fd of parentFds) if (fd !== null) proc.closeFd(fd);
      throw e;
    }
    return { child, parentFds, toClose };
  };
  const buildStdioInto = (proc, specs, child, parentFds, toClose) => {
    specs.forEach((s, i) => {
      if ((s === "pipe" || s === "overlapped") && i > 2) {
        const [mine, theirs] = createSocketPair();
        child.push(theirs);
        toClose.push(theirs);
        parentFds.push(proc.allocFd(mine, 3));
      } else if (s === "pipe" || s === "overlapped") {
        const { r, w } = createPipe();
        if (i === 0) {
          child.push(r);
          toClose.push(r);
          parentFds.push(proc.allocFd(w, 3));
        } else {
          child.push(w);
          toClose.push(w);
          parentFds.push(proc.allocFd(r, 3));
        }
      } else if (s === "inherit") {
        child.push(proc.fds.get(i) ?? null);
        parentFds.push(null);
      } else if (s === "ipc") {
        const [mine, theirs] = createSocketPair();
        child.push(theirs);
        toClose.push(theirs);
        parentFds.push(proc.allocFd(mine, 3));
      } else if (s === "ignore" || s === null || s === void 0) {
        const f = kernel2.openFile(proc, "/dev/null", i === 0 ? O_RDONLY : O_WRONLY);
        child.push(f);
        toClose.push(f);
        parentFds.push(null);
      } else if (typeof s === "number") {
        child.push(proc.fds.get(s) ?? null);
        parentFds.push(null);
      } else {
        child.push(null);
        parentFds.push(null);
      }
    });
  };
  const spawnChild = (proc, a, stdio) => {
    const env2 = a.env ?? proc.env;
    const cwd = a.cwd ? abs(proc, a.cwd) : proc.cwd;
    if (a.cwd) {
      const n = vfs.tryLookup(cwd);
      if (!n || !isDir(n)) throw new KernelError("ENOENT", `spawn: cwd ${cwd} does not exist`);
    }
    return kernel2.spawn({ argv: a.argv, argv0: a.argv0, env: env2, cwd, stdio, ppid: proc.pid });
  };
  const udpPorts = /* @__PURE__ */ new Map();
  const udpLeave = (port, p) => {
    const rec = udpPorts.get(port);
    if (!rec) return;
    rec.members = rec.members.filter((m) => m.proc !== p);
    if (!rec.members.length) udpPorts.delete(port);
  };
  const udpJoin = (port, p, thread) => {
    let rec = udpPorts.get(port);
    if (!rec) udpPorts.set(port, rec = { members: [], next: 0, queue: [] });
    if (rec.members.some((m) => m.proc === p)) return;
    rec.members.push({ proc: p, thread, receiving: false });
    p.onExit.add(() => udpLeave(port, p));
  };
  const udpDeliver = (port) => {
    const rec = udpPorts.get(port);
    if (!rec) return;
    while (rec.queue.length) {
      const live = rec.members.filter((m2) => m2.receiving && m2.proc.state === "running");
      if (!live.length) return;
      const m = live[rec.next = (rec.next + 1) % live.length];
      const d = rec.queue.shift();
      kernel2.postTo(m.proc, m.thread, { t: "udp-msg", port, data: d.data, from: d.from });
    }
  };
  const registeredPids = /* @__PURE__ */ new Set();
  kernel2.syscall = (proc, thread, op, a, bin) => {
    switch (op) {
      // ---------------- files ----------------
      case "stat": {
        const p = abs(proc, a.p);
        const own = fdPathOf(p, proc.pid);
        if (a.l && own !== null) return { ...fstatOf(fdFile(proc, own)), mode: S_IFLNK | 448, size: 64 };
        const fd = a.l ? null : kernel2.procFdOf(p, proc.pid);
        if (fd !== null) return fstatOf(fdFile(proc, fd));
        const dir = procDirStat(proc, p, !!a.l);
        if (dir) return dir;
        return a.l ? vfs.lstat(p) : vfs.stat(p);
      }
      case "fstat":
        return fstatOf(proc.getFd(a.fd));
      case "fdKind":
        return proc.fds.get(a.fd)?.kind ?? null;
      case "access": {
        const n = vfs.lookup(abs(proc, a.p));
        checkPerm(n, (a.mode ?? 0) & 7);
        return null;
      }
      case "open": {
        const p = abs(proc, a.p);
        const flags = a.flags ?? 0;
        proc.freeFd(3);
        const existing = kernel2.procFdOf(p, proc.pid) === null && p !== "/dev/tty" ? vfs.tryLookup(p, !(flags & 131072)) : void 0;
        if (existing) {
          if ((flags & 192) !== 192) checkPerm(existing, accessFor(flags));
        } else if (flags & 64 && !vfs.tryLookup(p)) checkDirWritable(p);
        const f = kernel2.openFile(proc, p, flags, a.mode ?? 438);
        return proc.allocFd(f, 3);
      }
      case "close":
        if (globalThis.__ovTrace && proc.fds.get(a.fd)?.kind === "pipe") console.warn(`[trace] pid ${proc.pid} (${proc.argv.slice(0, 3).join(" ")}) close pipe fd ${a.fd}`, new Error().stack?.split("\n").slice(0, 1).join(""));
        readers.get(`${proc.pid}:${a.fd}`)?.stop?.();
        proc.closeFd(a.fd);
        return null;
      case "read": {
        const f = proc.getFd(a.fd);
        if (globalThis.__ovTrace && a.fd === 0) console.warn(`[trace] pid ${proc.pid} sync read fd 0 kind=${f.kind}`);
        const len = Math.min(a.len ?? 65536, 16 * 1024 * 1024);
        if (f.kind === "file" || f.kind === "null" || f.kind === "dir") {
          if (f.kind === "dir") throw kerr("EISDIR");
          const buf = new Uint8Array(len);
          if (f.kind === "null") return buf.subarray(0, 0);
          const n = f.readFileAt(buf, a.pos ?? null);
          return buf.subarray(0, n);
        }
        const d = f.tryRead(len, null);
        if (d !== void 0) return d;
        return f.read(len).then((x) => x);
      }
      case "write": {
        const f = proc.getFd(a.fd);
        const data = bin ?? new Uint8Array(0);
        if (a.sendHandle) {
          const pipe2 = f.opts.writer?.pipe;
          if (!pipe2 || f.kind !== "socket" || !data.length) throw kerr("EINVAL");
          const { fd: sendFd, ...meta } = a.sendHandle;
          const item = { meta };
          if (typeof sendFd === "number") item.file = proc.getFd(sendFd).ref();
          try {
            return pipe2.write(data, item);
          } catch (e) {
            item.file?.unref();
            throw e;
          }
        }
        const pipe = a.nonblock ? f.opts.writer?.pipe : void 0;
        if (pipe && f.writable && pipe.readers > 0) {
          const n = Math.min(data.length, pipe.space);
          return n > 0 ? f.write(data.subarray(0, n)) : 0;
        }
        return f.write(data, a.pos ?? null);
      }
      case "lseek": {
        const f = proc.getFd(a.fd);
        if (f.kind !== "file" || !f.opts.node) throw kerr("ESPIPE");
        const size = f.opts.node.size;
        const pos = a.whence === 0 ? a.offset : a.whence === 1 ? f.pos + a.offset : size + a.offset;
        if (pos < 0) throw kerr("EINVAL");
        f.pos = pos;
        return pos;
      }
      case "readFile": {
        const p = abs(proc, a.p);
        const fd = kernel2.procFdOf(p, proc.pid);
        if (fd !== null) {
          const f = fdFile(proc, fd);
          if (f.kind === "file" && f.opts.node) return vfs.contents(f.opts.node).slice();
          return (async () => {
            const parts = [];
            for (let d; (d = await f.read(65536)).length; ) parts.push(d);
            const out = new Uint8Array(parts.reduce((n2, x) => n2 + x.length, 0));
            let off = 0;
            for (const x of parts) {
              out.set(x, off);
              off += x.length;
            }
            return out;
          })();
        }
        const n = vfs.lookup(p);
        checkPerm(n, 4);
        if (isDir(n)) throw kerr("EISDIR");
        if (n.device) return n.device.read(65536) ?? new Uint8Array(0);
        return vfs.readFile(p);
      }
      case "writeFile": {
        const p = abs(proc, a.p);
        const flags = a.flags ?? 577;
        const data = bin ?? new Uint8Array(0);
        const existing = vfs.tryLookup(p);
        if (existing && flags & 128) throw kerr("EEXIST");
        if (existing && !isDir(existing)) checkPerm(existing, 2);
        if (flags & 1024) {
          if (!existing && flags & 64) checkDirWritable(p);
          const f = kernel2.openFile(proc, p, flags, a.mode ?? 438);
          try {
            f.write(data);
          } finally {
            f.unref();
          }
          return null;
        }
        if (existing && isDir(existing)) throw kerr("EISDIR");
        if (existing?.device) {
          existing.device.write(data);
          return null;
        }
        vfs.lookupParent(p);
        if (!existing) checkDirWritable(p);
        vfs.writeFile(p, data, a.mode ?? 438, proc.umask);
        return null;
      }
      case "readdir": {
        const p = abs(proc, a.p);
        checkPerm(vfs.lookup(p), 4);
        if (a.types) {
          return vfs.readdirTypes(p);
        }
        return vfs.readdir(p);
      }
      case "mkdir": {
        const p = abs(proc, a.p);
        let first = p;
        if (a.recursive) while (first !== "/" && !vfs.tryLookup(dirname(first))) first = dirname(first);
        if (!vfs.tryLookup(first)) checkDirWritable(first);
        const r = vfs.mkdir(p, a.mode ?? 511, !!a.recursive, proc.umask);
        return a.recursive ? r ?? null : null;
      }
      case "mkdtemp": {
        for (let i = 0; i < 100; i++) {
          const suffix = Array.from({ length: 6 }, () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]).join("");
          const p = abs(proc, a.prefix + suffix);
          if (vfs.exists(p)) continue;
          checkDirWritable(p);
          vfs.mkdir(p, 448, false, proc.umask);
          return p;
        }
        throw kerr("EEXIST");
      }
      case "rmdir": {
        const p = abs(proc, a.p);
        if (vfs.tryLookup(p, false)) checkDirWritable(p);
        vfs.rmdir(p);
        return null;
      }
      case "rm": {
        const p = abs(proc, a.p);
        const n = vfs.tryLookup(p, false);
        if (!n) {
          if (a.force) return null;
          throw kerr("ENOENT");
        }
        if (isDir(n)) {
          if (!a.recursive) throw new KernelError("ERR_FS_EISDIR", `Path is a directory: rm returned EISDIR (is a directory) ${p}`);
          vfs.rmrf(p);
        } else vfs.unlink(p);
        return null;
      }
      case "unlink": {
        const p = abs(proc, a.p);
        const n = vfs.lookup(p, false);
        if (isDir(n)) throw kerr("EISDIR");
        checkDirWritable(p);
        vfs.unlink(p);
        return null;
      }
      case "rename": {
        const from = abs(proc, a.from);
        const to = abs(proc, a.to);
        if (vfs.tryLookup(from, false)) {
          checkDirWritable(from);
          if (vfs.tryLookup(dirname(to))) checkDirWritable(to);
        }
        vfs.rename(from, to);
        return null;
      }
      case "link": {
        const to = abs(proc, a.to);
        if (vfs.tryLookup(dirname(to)) && !vfs.tryLookup(to, false)) checkDirWritable(to);
        vfs.link(abs(proc, a.from), to);
        return null;
      }
      case "symlink": {
        const p = abs(proc, a.p);
        if (vfs.tryLookup(dirname(p)) && !vfs.tryLookup(p, false)) checkDirWritable(p);
        vfs.symlink(a.target, p);
        return null;
      }
      case "readlink": {
        const p = abs(proc, a.p);
        if (p === "/proc/self") return String(proc.pid);
        const own = fdPathOf(p, proc.pid);
        if (own !== null) {
          const f = fdFile(proc, own);
          if (f.opts.path) return f.opts.path;
          if (f.kind === "tty") return "/dev/tty";
          const id2 = f.opts.reader?.pipe?.id ?? f.opts.writer?.pipe?.id ?? 0;
          return `${f.kind === "socket" ? "socket" : "pipe"}:[${id2}]`;
        }
        return vfs.readlink(p);
      }
      case "realpath":
        return vfs.realpath(abs(proc, a.p));
      case "chmod":
        vfs.chmod(abs(proc, a.p), a.mode);
        return null;
      case "fchmod": {
        const f = proc.getFd(a.fd);
        const n = f.opts.node;
        if (n) {
          n.mode = n.mode & ~4095 | a.mode & 4095;
          n.ctimeMs = Date.now();
          vfs.touched(f.opts.path);
        }
        return null;
      }
      case "utimes":
        vfs.utimes(abs(proc, a.p), a.atime, a.mtime, !a.l);
        return null;
      case "futimes": {
        const f = proc.getFd(a.fd);
        const n = f.opts.node;
        if (n) {
          n.atimeMs = a.atime;
          n.mtimeMs = a.mtime;
          n.ctimeMs = Date.now();
          vfs.touched(f.opts.path);
        }
        return null;
      }
      case "truncate": {
        const p = abs(proc, a.p);
        checkPerm(vfs.lookup(p), 2);
        vfs.truncate(p, a.len ?? 0);
        return null;
      }
      case "ftruncate": {
        const f = proc.getFd(a.fd);
        if (!f.opts.node || !f.writable) throw kerr("EINVAL");
        vfs.truncateNode(f.opts.node, a.len ?? 0, f.opts.path);
        return null;
      }
      case "copyFile": {
        const from = abs(proc, a.from);
        const to = abs(proc, a.to);
        const n = vfs.lookup(from);
        if (isDir(n)) throw kerr("EISDIR");
        checkPerm(n, 4);
        const dest = vfs.tryLookup(to);
        if (a.excl && dest) throw kerr("EEXIST");
        vfs.lookupParent(to);
        if (dest) checkPerm(dest, 2);
        else checkDirWritable(to);
        const data = vfs.readFile(from);
        const out = vfs.writeFile(to, data, n.mode & 4095);
        out.mode = out.mode & ~4095 | n.mode & 4095;
        return null;
      }
      case "cp": {
        const from = abs(proc, a.from);
        const to = abs(proc, a.to);
        const parent = dirname(to);
        if (!vfs.exists(parent)) vfs.mkdir(parent, 511, true);
        vfs.copy(from, to, { force: a.force, errorOnExist: a.errorOnExist, dereference: a.dereference });
        return null;
      }
      case "watch": {
        const base = abs(proc, a.p);
        const key = `${proc.pid}:${a.id}`;
        const below = base === "/" ? "/" : base + "/";
        const stop = vfs.onChange((ev) => {
          const inside = ev.path === base || (a.recursive ? ev.path.startsWith(below) : dirname(ev.path) === base);
          if (!inside) return;
          kernel2.postTo(proc, thread, { t: "watch", id: a.id, type: ev.type, path: ev.path });
        });
        watchers.set(key, stop);
        proc.onExit.add(() => {
          watchers.get(key)?.();
          watchers.delete(key);
        });
        return null;
      }
      case "unwatch": {
        const key = `${proc.pid}:${a.id}`;
        watchers.get(key)?.();
        watchers.delete(key);
        return null;
      }
      // ---------------- modules ----------------
      case "resolve": {
        const extra = a.conditions ?? [];
        if (a.kind === "esm") {
          const from = a.from.endsWith("/") ? a.from + "[importer]" : a.from;
          const r = esm2.resolver.resolveEsm(a.spec, from, extra.length ? [...ESM_CONDITIONS, ...extra] : ESM_CONDITIONS);
          return r;
        }
        return esm2.resolver.resolveCjs(a.spec, a.from, { extensions: a.exts, conditions: extra.length ? [...CJS_CONDITIONS, ...extra] : CJS_CONDITIONS, paths: a.paths });
      }
      case "moduleFormat":
        return esm2.resolver.formatOf(abs(proc, a.p));
      // ---------------- process ----------------
      case "esmRegister":
        esm2.register(proc.pid, a.id, a.source);
        if (!registeredPids.has(proc.pid)) {
          registeredPids.add(proc.pid);
          proc.onExit.add(() => {
            esm2.dropProcess(proc.pid);
            registeredPids.delete(proc.pid);
          });
        }
        return null;
      case "getcwd":
        return proc.cwd;
      case "umask": {
        const old = proc.umask;
        if (typeof a.mask === "number") proc.umask = a.mask & 511;
        return old;
      }
      case "chdir": {
        const p = abs(proc, a.p);
        const n = vfs.lookup(p);
        if (!isDir(n)) throw kerr("ENOTDIR");
        checkPerm(n, 1);
        const real = vfs.realpath(p);
        proc.cwd = real;
        return real;
      }
      case "exit": {
        const status = { code: (a.code ?? 0) & 255, signal: null };
        const peers = socketPeersReading(proc);
        const unread = [];
        for (const f of proc.fds.values()) {
          const pipe = f.kind === "pipe" ? f.opts.writer?.pipe : void 0;
          if (pipe && pipe.buffered > 0 && pipe.readers > 0 && !unread.includes(pipe)) unread.push(pipe);
        }
        if (!peers.length && !unread.length) {
          kernel2.exitProcess(proc, status);
          return null;
        }
        const drained = unread.map(
          (pipe) => new Promise((resolve2) => {
            const t0 = Date.now();
            const poll = () => pipe.buffered === 0 || pipe.readers === 0 || Date.now() - t0 > 250 ? resolve2() : setTimeout(poll, 2);
            poll();
          })
        );
        const waits = peers.map(
          (st) => new Promise((resolve2) => {
            const id2 = nextPing++;
            pings.set(id2, resolve2);
            kernel2.postTo(st.proc, st.thread, { t: "ping", id: id2 });
            setTimeout(() => {
              pings.delete(id2);
              resolve2();
            }, 250);
          })
        );
        void Promise.all([...waits, ...drained]).then(() => kernel2.exitProcess(proc, status));
        return null;
      }
      case "udpBind": {
        let port = Number(a.port) || 0;
        if (port === 0) {
          do
            port = 49152 + Math.floor(Math.random() * 16e3);
          while (udpPorts.has(port));
        } else if (udpPorts.has(port) && !a.reuse) throw kerr("EADDRINUSE");
        udpJoin(port, proc, thread);
        return port;
      }
      case "udpJoin": {
        if (!udpPorts.has(Number(a.port))) throw kerr("EINVAL");
        udpJoin(Number(a.port), proc, thread);
        return null;
      }
      case "udpRecv": {
        const m = udpPorts.get(Number(a.port))?.members.find((x) => x.proc === proc);
        if (m) {
          m.receiving = !!a.on;
          m.thread = thread;
          if (m.receiving) udpDeliver(Number(a.port));
        }
        return null;
      }
      case "udpClose":
        udpLeave(Number(a.port), proc);
        return null;
      case "udpSend": {
        const rec = udpPorts.get(Number(a.port));
        if (rec && rec.queue.length < 1024) {
          rec.queue.push({ data: (bin ?? new Uint8Array(0)).slice(), from: { address: a.fromAddress && a.fromAddress !== "0.0.0.0" ? a.fromAddress : "127.0.0.1", port: Number(a.from) || 0 } });
          udpDeliver(Number(a.port));
        }
        return null;
      }
      case "execve": {
        kernel2.planExec([...a.argv], a.env ?? proc.env, proc.cwd, true);
        for (const fd of [...proc.fds.keys()]) {
          if (fd <= 2) continue;
          readers.get(`${proc.pid}:${fd}`)?.stop?.();
          try {
            proc.closeFd(fd);
          } catch {
          }
        }
        for (const [key, stop] of watchers) {
          if (!key.startsWith(`${proc.pid}:`)) continue;
          stop();
          watchers.delete(key);
        }
        kernel2.execImage(proc, [...a.argv], a.env ?? proc.env, a.argv0);
        return new Promise(() => {
        });
      }
      case "kill": {
        const sig = a.sig ?? "SIGTERM";
        const num = signalNumber(sig);
        if (num < 0) throw kerr("EINVAL");
        const pid = Number(a.pid);
        let targets2;
        if (pid > 0) {
          const t = kernel2.get(pid);
          if (t.state !== "running") throw kerr("ESRCH");
          targets2 = [t];
        } else {
          const pgid = pid === 0 ? proc.pgid : -pid;
          targets2 = [...kernel2.procs.values()].filter((p) => p.state === "running" && (pid === -1 ? p !== proc : p.pgid === pgid));
          if (!targets2.length) throw kerr("ESRCH");
        }
        if (num === 0) return null;
        targets2.sort((x, y) => Number(x === proc) - Number(y === proc));
        for (const t of targets2) if (t.state === "running") kernel2.kill(t.pid, sig);
        return null;
      }
      case "sigaction":
        if (a.on) proc.handledSignals.add(signalName(a.sig));
        else proc.handledSignals.delete(signalName(a.sig));
        return null;
      case "spawn": {
        if (globalThis.__ovTrace) console.warn(`[trace] pid ${proc.pid} spawn ${a.argv.join(" ")}`);
        const { child, parentFds, toClose } = buildStdio(proc, a.stdio ?? ["pipe", "pipe", "pipe"]);
        let c;
        try {
          c = spawnChild(proc, a, child);
        } catch (e) {
          for (const f of toClose) f.unref();
          const code = e?.code;
          if (a.keepStdioOnError && (code === "ENOENT" || code === "EACCES")) return { pid: 0, fds: parentFds, error: code };
          for (const fd of parentFds) if (fd !== null) proc.closeFd(fd);
          throw e;
        }
        for (const f of toClose) f.unref();
        c.onExit.add((st) => kernel2.postTo(proc, thread, { t: "child-exit", pid: c.pid, code: st.code, signal: st.signal }));
        return { pid: c.pid, fds: parentFds };
      }
      case "spawnSync": {
        const specs = a.stdio ?? ["pipe", "pipe", "pipe"];
        const child = [];
        const toClose = [];
        let stdinW = null;
        let outR = null;
        let errR = null;
        specs.forEach((s, i) => {
          if (s === "pipe" || s === "overlapped") {
            const { r, w } = createPipe();
            if (i === 0) {
              child.push(r);
              toClose.push(r);
              stdinW = w;
            } else {
              child.push(w);
              toClose.push(w);
              if (i === 1) outR = r;
              else if (i === 2) errR = r;
              else r.unref();
            }
          } else if (s === "inherit") child.push(proc.fds.get(i) ?? null);
          else if (typeof s === "number") child.push(proc.fds.get(s) ?? null);
          else {
            const f = kernel2.openFile(proc, "/dev/null", i === 0 ? O_RDONLY : O_WRONLY);
            child.push(f);
            toClose.push(f);
          }
        });
        let c;
        try {
          c = spawnChild(proc, a, child);
        } finally {
          for (const f of toClose) f.unref();
        }
        if (stdinW) {
          const w = stdinW;
          try {
            if (bin && bin.length) w.write(bin);
          } catch {
          }
          w.unref();
        }
        const drain = async (f) => {
          if (!f) return new Uint8Array(0);
          const chunks = [];
          for (; ; ) {
            const d = await f.read(65536);
            if (!d.length) break;
            chunks.push(d);
          }
          f.unref();
          let n = 0;
          for (const x of chunks) n += x.length;
          const out = new Uint8Array(n);
          let o = 0;
          for (const x of chunks) {
            out.set(x, o);
            o += x.length;
          }
          return out;
        };
        let timedOut = false;
        let timer;
        if (a.timeout > 0) {
          timer = setTimeout(() => {
            timedOut = true;
            try {
              kernel2.kill(c.pid, a.killSignal ?? "SIGTERM");
            } catch {
            }
          }, a.timeout);
        }
        return Promise.all([drain(outR), drain(errR), c.exited]).then(([out, err, st]) => {
          clearTimeout(timer);
          const bin2 = new Uint8Array(out.length + err.length);
          bin2.set(out, 0);
          bin2.set(err, out.length);
          return { __bin: bin2, pid: c.pid, status: st.code, signal: st.signal, outLen: out.length, error: timedOut ? "ETIMEDOUT" : void 0 };
        });
      }
      case "isatty": {
        const f = proc.fds.get(a.fd);
        return f?.kind === "tty";
      }
      case "ttySize": {
        const f = proc.fds.get(a.fd);
        const t = f?.opts.tty;
        return t ? { cols: t.cols, rows: t.rows } : null;
      }
      case "setRawMode": {
        const t = proc.fds.get(a.fd)?.opts.tty;
        if (!t) throw kerr("ENOTTY");
        t.raw = !!a.raw;
        t.echo = !a.raw;
        return null;
      }
      case "threadReserve": {
        const tid = nextTid++;
        reservedTids.add(tid);
        if (!a.nodeId) return tid;
        const threadId = (nodeThreadIds.get(proc) ?? 0) + 1;
        nodeThreadIds.set(proc, threadId);
        return { tid, threadId };
      }
      case "watchThread": {
        if (!proc.threads.has(a.tid)) {
          thread.worker.postMessage({ t: "thread-gone", tid: a.tid });
          return null;
        }
        const key = `${proc.pid}:${a.tid}`;
        const ws = threadWatchers.get(key) ?? [];
        if (!ws.includes(thread)) ws.push(thread);
        threadWatchers.set(key, ws);
        return null;
      }
      case "threadExit": {
        const t = proc.threads.get(thread.tid);
        proc.threads.delete(thread.tid);
        threadGone(proc, thread.tid);
        setTimeout(() => t?.worker.terminate(), 0);
        if (t?.parentTid !== void 0) proc.threads.get(t.parentTid)?.worker.postMessage({ t: "thread-exit", tid: thread.tid, code: a.code ?? 0 });
        return null;
      }
      // ---------------- network ----------------
      case "listen": {
        let port = Number(a.port) || 0;
        if (port === 0) {
          do
            port = 49152 + Math.floor(Math.random() * 16e3);
          while (kernel2.ports.has(port));
        }
        const existing = kernel2.ports.get(port);
        if (existing && existing.pid !== proc.pid) throw kerr("EADDRINUSE");
        if (existing) throw kerr("EADDRINUSE");
        kernel2.ports.set(port, { port, pid: proc.pid, tid: thread.tid, host: a.kind === "http" ? a.host || "" : a.kind === "raw" ? "raw" : "tcp-only" });
        if (a.kind === "http" || a.kind === "raw") kernel2.hooks.onListen?.(port, proc.pid);
        return port;
      }
      case "unlisten": {
        const rec = kernel2.ports.get(a.port);
        if (rec && (rec.pid === proc.pid || rec.acceptors?.some((x) => x.pid === proc.pid)) && !leaveListener(rec, proc.pid)) {
          kernel2.ports.delete(a.port);
          kernel2.hooks.onUnlisten?.(a.port, proc.pid);
        }
        return null;
      }
      case "tlsHello": {
        const f = proc.fds.get(a.fd);
        const peer = f?.peer;
        if (!f || !peer || peer.bridged) return { wait: false, certs: null };
        const certs = a.certs ?? [];
        const theirs = tlsEnds.get(peer);
        if (theirs) {
          tlsEnds.delete(peer);
          theirs.notify(certs);
          return { wait: false, certs: theirs.certs };
        }
        tlsEnds.set(f, { certs, notify: (c) => kernel2.postTo(proc, thread, { t: "tls-peer", fd: a.fd, certs: c }) });
        return { wait: true, certs: null };
      }
      case "listenShare": {
        const rec = kernel2.ports.get(Number(a.port));
        if (!rec) throw kerr("EINVAL");
        if (rec.pid !== proc.pid && !rec.acceptors?.some((x) => x.pid === proc.pid)) (rec.acceptors ??= []).push({ pid: proc.pid, tid: thread.tid });
        return null;
      }
      case "tcpConnect": {
        const rec = kernel2.ports.get(Number(a.port));
        if (!rec || rec.host !== "raw") throw kerr("ECONNREFUSED");
        proc.freeFd(3);
        const address = String(a.host ?? "").includes(":") ? "::1" : "127.0.0.1";
        const conn = net2.tcp.connect(rec, { address });
        if (!conn) throw kerr("ECONNREFUSED");
        const by = net2.tcp.lastAcceptor;
        return { fd: proc.allocFd(conn.end, 3), self: by?.pid === proc.pid && by?.tid === thread.tid, localAddress: address, localPort: conn.port };
      }
      case "tcpConnectOut": {
        const end = connectOutbound(RUNTIME_BASE, { host: String(a.host), port: Number(a.port), tls: !!a.tls }, `${proc.pid} ${proc.argv.slice(0, 3).join(" ")}`.slice(0, 200));
        return proc.allocFd(end, 3);
      }
      case "tcpSetTls": {
        const f = proc.fds.get(a.fd);
        return f ? markOutboundTls(f, a.servername) : false;
      }
      case "shutdown": {
        const f = proc.fds.get(a.fd);
        if (!f) throw kerr("EBADF");
        if (!f.shutdownWrite) throw kerr("ENOTSOCK");
        f.shutdownWrite();
        return null;
      }
      case "unixListen": {
        const node = kernel2.vfs.mknodSock(abs(proc, a.p), 511 & ~proc.umask);
        kernel2.unixSockets.set(node.ino, { port: node.ino, pid: proc.pid, tid: thread.tid, host: "unix", path: abs(proc, a.p) });
        return node.ino;
      }
      case "unixUnlisten": {
        const rec = kernel2.unixSockets.get(a.ino);
        if (rec && rec.pid === proc.pid) {
          kernel2.unixSockets.delete(a.ino);
          try {
            if (kernel2.vfs.lookup(rec.path, false).ino === a.ino) kernel2.vfs.unlink(rec.path);
          } catch {
          }
        }
        return null;
      }
      case "unixConnect": {
        const node = kernel2.vfs.lookup(abs(proc, a.p), true);
        const rec = kernel2.unixSockets.get(node.ino);
        if (!rec || (node.mode & 61440) !== S_IFSOCK) throw kerr("ECONNREFUSED");
        proc.freeFd(3);
        const conn = net2.tcp.connect(rec, { address: "", port: 0 }, "pipe-accept");
        if (!conn) throw kerr("ECONNREFUSED");
        return proc.allocFd(conn.end, 3);
      }
      case "portInfo":
        return kernel2.ports.has(a.port);
    }
    throw new KernelError("ENOSYS", `unknown syscall ${op}`);
  };
  const loopReqs = /* @__PURE__ */ new Map();
  kernel2.asyncMessage = (proc, thread, msg) => {
    if (net2.fromProcess(msg)) return;
    switch (msg?.t) {
      case "pong": {
        const done = pings.get(msg.id);
        pings.delete(msg.id);
        done?.();
        return;
      }
      case "readStart": {
        let pump3 = function() {
          if (pumping) return;
          pumping = true;
          try {
            while (state.active && proc.state === "running") {
              let r;
              try {
                r = readPipe.tryReadAttached(65536);
              } catch {
                r = null;
              }
              if (r === void 0) return;
              if (r === null || r.data.length === 0) {
                kernel2.postTo(proc, thread, { t: "fd-data", fd: msg.fd, data: null });
                release();
                return;
              }
              let handle;
              try {
                handle = r.item ? { ...r.item.meta, ...r.item.file ? { fd: proc.allocFd(r.item.file, 3) } : {} } : void 0;
              } catch {
                handle = void 0;
              }
              kernel2.postTo(proc, thread, { t: "fd-data", fd: msg.fd, data: r.data, handle });
            }
          } finally {
            pumping = false;
          }
        };
        var pump2 = pump3;
        const key = `${proc.pid}:${msg.fd}`;
        const existing = readers.get(key);
        if (existing?.active) return;
        const state = { active: true, proc, thread };
        readers.set(key, state);
        const f = proc.fds.get(msg.fd);
        if (!f) {
          kernel2.postTo(proc, thread, { t: "fd-data", fd: msg.fd, data: null });
          return;
        }
        f.ref();
        let released = false;
        const release = () => {
          if (released) return;
          released = true;
          state.active = false;
          proc.onExit.delete(release);
          notifier?.delete(pump3);
          f.unref();
          if (readers.get(key) === state) readers.delete(key);
        };
        proc.onExit.add(release);
        state.stop = release;
        const readPipe = f.opts.reader?.pipe;
        state.pipe = readPipe;
        const notifier = readPipe?.onReadable;
        let pumping = false;
        if (notifier) {
          notifier.add(pump3);
          pump3();
          return;
        }
        (async () => {
          try {
            while (state.active && proc.state === "running") {
              const d = await f.read(65536);
              if (proc.state !== "running") break;
              if (d.length === 0) {
                kernel2.postTo(proc, thread, { t: "fd-data", fd: msg.fd, data: null });
                state.active = false;
                break;
              }
              kernel2.postTo(proc, thread, { t: "fd-data", fd: msg.fd, data: d });
            }
          } catch (e) {
            kernel2.postTo(proc, thread, { t: "fd-data", fd: msg.fd, data: null });
          } finally {
            release();
          }
        })();
        return;
      }
      case "writeWait": {
        const notify = () => kernel2.postTo(proc, thread, { t: "fd-writable", fd: msg.fd });
        const pipe = proc.fds.get(msg.fd)?.opts.writer?.pipe;
        if (pipe) pipe.onDrain(notify);
        else notify();
        return;
      }
      case "readStop": {
        const st = readers.get(`${proc.pid}:${msg.fd}`);
        if (st) {
          st.active = false;
          if (st.stop && proc.fds.get(msg.fd)?.opts.reader?.pipe) st.stop();
        }
        return;
      }
      case "readOnce": {
        const f = proc.fds.get(msg.fd);
        if (!f) {
          kernel2.postTo(proc, thread, { t: "fd-data", id: msg.id, data: null, err: "EBADF" });
          return;
        }
        f.read(msg.len ?? 65536).then(
          (d) => {
            if (globalThis.__ovTrace && d.length === 0) console.warn(`[trace] pid ${proc.pid} (${proc.argv.slice(0, 3).join(" ")}) readOnce fd ${msg.fd} EOF kind=${f.kind}`);
            kernel2.postTo(proc, thread, { t: "fd-data", id: msg.id, data: d });
          },
          (e) => kernel2.postTo(proc, thread, { t: "fd-data", id: msg.id, data: null, err: e?.code ?? "EIO" })
        );
        return;
      }
      case "threadSpawn": {
        const tid = msg.tid;
        reservedTids.delete(tid);
        if (proc.threads.size * FDS_PER_THREAD + BASE_FDS > proc.nofile) {
          thread.worker.postMessage({ t: "thread-exit", tid, code: 1, initFailed: "EMFILE" });
          return;
        }
        const t = kernel2.startThread(
          proc,
          {
            kind: "thread",
            tid,
            file: msg.file,
            eval: msg.eval,
            evalType: msg.evalType,
            argv: ["node", ...msg.argv ?? []],
            execArgv: msg.execArgv,
            env: msg.env,
            workerData: msg.workerData,
            envData: msg.envData,
            port: msg.port,
            name: msg.name,
            threadId: msg.threadId,
            resourceLimits: msg.resourceLimits,
            envRings: msg.envRings,
            trackUnmanagedFds: msg.trackUnmanagedFds,
            sharedEnv: msg.sharedEnv
          },
          [msg.port, ...msg.transfer ?? []],
          thread.tid,
          tid
        );
        void t;
        return;
      }
      case "threadKill": {
        const t = proc.threads.get(msg.tid);
        if (t) {
          t.worker.terminate();
          proc.threads.delete(msg.tid);
          threadGone(proc, msg.tid);
          thread.worker.postMessage({ t: "thread-exit", tid: msg.tid, code: 1, terminated: true });
        }
        return;
      }
      case "loop-req": {
        const key = `${proc.pid}:${msg.crid}`;
        const reply = (m, tr2 = []) => thread.worker.postMessage({ ...m, crid: msg.crid }, tr2);
        const h = net2.request(msg.port, { method: msg.method, url: msg.url, headers: msg.headers, hasBody: true }, {
          head: (status, statusText, headers) => reply({ t: "loop-res", status, statusText, headers }),
          data: (d) => reply({ t: "loop-res-data", data: d }),
          end: () => {
            loopReqs.delete(key);
            reply({ t: "loop-res-end" });
          },
          error: (m) => {
            loopReqs.delete(key);
            reply({ t: "loop-res-error", msg: m });
          }
        });
        if (h) loopReqs.set(key, h);
        return;
      }
      case "loop-body":
        loopReqs.get(`${proc.pid}:${msg.crid}`)?.body(msg.data);
        return;
      case "loop-body-end":
        loopReqs.get(`${proc.pid}:${msg.crid}`)?.bodyEnd();
        return;
      case "loop-abort": {
        const key = `${proc.pid}:${msg.crid}`;
        loopReqs.get(key)?.abort();
        loopReqs.delete(key);
        return;
      }
    }
  };
  void S_IFREG;
  void O_ACCMODE;
  void exitCodeOf;
  void enc8;
}

// src/kernel/curl.ts
var REASONS = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  206: "Partial Content",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  410: "Gone",
  418: "I'm a teapot",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout"
};
var WITH_VALUE = { o: "output", X: "request", H: "header", d: "data", A: "user-agent", e: "referer", u: "user", w: "write-out", D: "dump-header", m: "max-time" };
var SHORT_FLAGS = { O: "remote-name", s: "silent", S: "show-error", L: "location", f: "fail", k: "insecure", i: "include", I: "head", v: "verbose", G: "get" };
async function curl(ctx) {
  const args = ctx.argv.slice(1);
  let url = "";
  let method = null;
  let output = null;
  let dumpHeader = null;
  let writeOut = null;
  let maxTime = 0;
  const set = /* @__PURE__ */ new Set();
  const headers = [];
  const data = [];
  const option = (name, value) => {
    if (name === "output") output = value;
    else if (name === "request") method = value;
    else if (name === "header") {
      const c = value.indexOf(":");
      headers.push([value.slice(0, c).trim(), value.slice(c + 1).trim()]);
    } else if (name === "data" || name === "data-raw" || name === "data-binary" || name === "data-ascii") {
      let v = value;
      if (name !== "data-raw" && v.startsWith("@")) v = new TextDecoder().decode(v === "@-" ? new Uint8Array(0) : ctx.vfs.readFile(ctx.resolve(v.slice(1))));
      if (name === "data" || name === "data-ascii") v = v.replace(/[\r\n]/g, "");
      data.push(v);
    } else if (name === "user-agent") headers.push(["User-Agent", value]);
    else if (name === "referer") headers.push(["Referer", value]);
    else if (name === "user") headers.push(["Authorization", `Basic ${btoa(value)}`]);
    else if (name === "write-out") writeOut = value;
    else if (name === "dump-header") dumpHeader = value;
    else if (name === "max-time") maxTime = Number(value);
    else if (name === "url") url = value;
  };
  const LONG_VALUE = /* @__PURE__ */ new Set([...Object.values(WITH_VALUE), "data-raw", "data-binary", "data-ascii", "url", "connect-timeout", "retry"]);
  try {
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a.startsWith("--")) {
        const eq = a.indexOf("=");
        const name = eq > 0 ? a.slice(2, eq) : a.slice(2);
        if (LONG_VALUE.has(name)) option(name, eq > 0 ? a.slice(eq + 1) : args[++i] ?? "");
        else set.add(name);
      } else if (a.startsWith("-") && a.length > 1) {
        for (let k = 1; k < a.length; k++) {
          const c = a[k];
          if (WITH_VALUE[c]) {
            option(WITH_VALUE[c], k + 1 < a.length ? a.slice(k + 1) : args[++i] ?? "");
            break;
          }
          if (!SHORT_FLAGS[c]) throw Object.assign(new Error(`option -${c}: is unknown`), { curl: 2 });
          set.add(SHORT_FLAGS[c]);
        }
      } else url = a;
    }
  } catch (e) {
    ctx.err(`curl: ${e.curl ? e.message : `(26) ${e.message}`}
`);
    return e.curl ?? 26;
  }
  const silent = set.has("silent") && !set.has("show-error");
  if (!url) {
    ctx.err("curl: no URL specified!\n");
    return 2;
  }
  if (!/^[a-z]+:\/\//i.test(url)) url = "http://" + url;
  const headOnly = set.has("head");
  let body;
  if (data.length && set.has("get")) url += (url.includes("?") ? "&" : "?") + data.join("&");
  else if (data.length) {
    body = data.join("&");
    if (!headers.some(([k]) => k.toLowerCase() === "content-type")) headers.push(["Content-Type", "application/x-www-form-urlencoded"]);
  }
  const verb = method ?? (headOnly ? "HEAD" : body !== void 0 ? "POST" : "GET");
  const abort = new AbortController();
  const timer = maxTime > 0 ? setTimeout(() => abort.abort(), maxTime * 1e3) : void 0;
  try {
    const res = await getNetFetch()(url, { method: verb, headers, body, signal: abort.signal, initiator: `${ctx.proc.pid} ${ctx.argv.slice(0, 3).join(" ")}`.slice(0, 200) });
    const rh = res.headers.get("x-ov-rh");
    const resHeaders = rh ? JSON.parse(decodeURIComponent(rh)) : [...res.headers];
    const status = Number(res.headers.get("x-ov-status") ?? res.status);
    const statusText = (res.headers.has("x-ov-status-text") ? decodeURIComponent(res.headers.get("x-ov-status-text")) : res.statusText) || REASONS[status] || "";
    const effective = res.headers.has("x-ov-url") ? decodeURIComponent(res.headers.get("x-ov-url")) : url;
    if (set.has("fail") && status >= 400) {
      if (!silent) ctx.err(`curl: (22) The requested URL returned error: ${status}
`);
      return 22;
    }
    const head2 = `HTTP/1.1 ${status}${statusText ? " " + statusText : ""}\r
${resHeaders.map(([k, v]) => `${k}: ${v}\r
`).join("")}\r
`;
    if (dumpHeader !== null) {
      if (dumpHeader === "-") ctx.out(head2);
      else ctx.vfs.writeFile(ctx.resolve(dumpHeader), head2);
    }
    const bytes = headOnly ? new Uint8Array(0) : new Uint8Array(await res.arrayBuffer());
    const target = output ?? (set.has("remote-name") ? basename(new URL(url).pathname) || "index.html" : null);
    const toStdout = target === null || target === "-";
    const headBytes = (set.has("include") || headOnly) && dumpHeader !== "-" ? new TextEncoder().encode(head2) : new Uint8Array(0);
    const all = new Uint8Array(headBytes.length + bytes.length);
    all.set(headBytes);
    all.set(bytes, headBytes.length);
    if (toStdout) ctx.out(all);
    else ctx.vfs.writeFile(ctx.resolve(target), all);
    if (writeOut !== null) {
      const contentType = resHeaders.find(([k]) => k.toLowerCase() === "content-type")?.[1] ?? "";
      const vars = { http_code: String(status).padStart(3, "0"), response_code: String(status), url_effective: effective, content_type: contentType, size_download: String(bytes.length), method: verb };
      ctx.out(writeOut.replace(/%\{(\w+)\}/g, (m, k) => vars[k] ?? m).replace(/\\n/g, "\n").replace(/\\t/g, "	").replace(/\\r/g, "\r"));
    }
    return 0;
  } catch (e) {
    if (abort.signal.aborted) {
      if (!silent) ctx.err(`curl: (28) Operation timed out after ${Math.round(maxTime * 1e3)} milliseconds
`);
      return 28;
    }
    if (!silent) ctx.err(`curl: (7) ${e?.message ?? e}
`);
    return 7;
  } finally {
    clearTimeout(timer);
  }
}
async function wget(ctx) {
  const args = ctx.argv.slice(1);
  const out = args.indexOf("-O");
  const url = args.find((a, i) => !a.startsWith("-") && args[i - 1] !== "-O");
  if (!url) {
    ctx.err("wget: missing URL\n");
    return 1;
  }
  const file2 = out >= 0 ? args[out + 1] : basename(new URL(url).pathname) || "index.html";
  ctx.proc.argv = ["curl", "-fsSL", url, ...file2 === "-" ? [] : ["-o", file2]];
  return curl(ctx);
}
function installCurl(kernel2) {
  kernel2.registerProgram("curl", curl, ["/usr/bin"]);
  kernel2.registerProgram("wget", wget, ["/usr/bin"]);
}

// src/kernel/index.ts
var enc9 = new TextEncoder();
var dec10 = new TextDecoder();
var processUrl = new URL("./process.js", import.meta.url).href;
var nodePortUrl = new URL("./node-process.js", import.meta.url).href;
function processScript() {
  try {
    return dec10.decode(kernel.vfs.readFile("/etc/openvessel/node")).trim() === "legacy" ? processUrl : nodePortUrl;
  } catch {
    return nodePortUrl;
  }
}
var WARM = 2;
var warm = /* @__PURE__ */ new Map();
function topUp(url) {
  const list = warm.get(url) ?? [];
  warm.set(url, list);
  while (list.length < WARM) list.push(new Worker(url, { type: "module", name: "node (idle)" }));
}
function takeWorker(name, url = processScript()) {
  const list = warm.get(url);
  const w = list?.shift();
  setTimeout(() => topUp(url), 0);
  return w ?? new Worker(url, { type: "module", name });
}
var kernel = new Kernel({
  createWorker: (name, runtime) => takeWorker(name, runtime),
  runtime: processScript,
  onListen: (port, pid) => emit({ ev: "server-ready", port, pid }),
  onUnlisten: (port) => emit({ ev: "port-closed", port }),
  log: (m) => console.warn("[openvessel]", m)
});
var esm = new EsmService(kernel);
var net = new NetRouter(kernel);
installSyscalls(kernel, esm, net);
kernel.registerProgram("sh", shProgram, ["/bin"]);
kernel.registerProgram("bash", shProgram, ["/bin"]);
kernel.registerProgram("dash", shProgram, ["/bin"]);
installCoreutils(kernel);
kernel.vfs.writeFile("/usr/bin/node", "#!/ov/builtin node\n", 493);
kernel.vfs.chmod("/usr/bin/node", 493);
kernel.vfs.symlink("/usr/bin/node", "/usr/bin/nodejs");
installNpm(kernel);
var KERNEL_TOKEN = crypto.randomUUID();
var netFetch = proxiedFetch(RUNTIME_BASE, { token: KERNEL_TOKEN, isLoopback: isLoopbackHost, loopback: (url, init2) => loopbackFetch(url, init2 ?? {}) });
setNpmFetch(netFetch);
installCurl(kernel);
kernel.vfs.writeFile("/home/user/.shrc", "alias ll='ls -l'\nalias la='ls -la'\n");
var policy = normalizePolicy(void 0);
var sessionAllow = /* @__PURE__ */ new Set();
var sessionDeny = /* @__PURE__ */ new Set();
var nextPermId = 1;
var PERMISSION_TIMEOUT = 5 * 6e4;
var pendingPerms = /* @__PURE__ */ new Map();
var permByHost = /* @__PURE__ */ new Map();
function checkNetwork(url, initiator, source) {
  const d = decide(policy, url, sessionAllow, sessionDeny);
  if (d === "allow") return Promise.resolve({ allow: true, cache: true });
  if (d === "deny") return Promise.resolve({ allow: false, cache: false });
  if (!hostPort) return Promise.resolve({ allow: false, cache: false });
  const { host } = hostOf(url);
  const existing = permByHost.get(host);
  if (existing !== void 0) {
    return new Promise((r) => pendingPerms.get(existing).waiters.push(r));
  }
  const id2 = nextPermId++;
  return new Promise((resolve2) => {
    const timer = setTimeout(() => settlePerm(id2, "timeout"), PERMISSION_TIMEOUT);
    pendingPerms.set(id2, { host, waiters: [resolve2], timer });
    permByHost.set(host, id2);
    emit({ ev: "permission-request", id: id2, url, host, initiator, source });
  });
}
function settlePerm(id2, decision) {
  const p = pendingPerms.get(id2);
  if (!p) return;
  pendingPerms.delete(id2);
  permByHost.delete(p.host);
  clearTimeout(p.timer);
  if (decision === "session") sessionAllow.add(p.host);
  else if (decision === "deny-session") sessionDeny.add(p.host);
  const allow = decision === "once" || decision === "session";
  const verdict = { allow, cache: decision === "session", timeout: decision === "timeout" || void 0 };
  for (const w of p.waiters) w(verdict);
  emit({ ev: "permission-settled", id: id2, host: p.host, allowed: allow, decision });
}
function initiatorOf(claimed, token) {
  const label = typeof claimed === "string" ? claimed.slice(0, 200) : "";
  if (token === KERNEL_TOKEN && label) return label;
  const pid = /^(\d+)(?:\s|$)/.exec(label)?.[1];
  const proc = pid ? kernel.procs.get(Number(pid)) : void 0;
  if (proc && proc.state === "running") return `${proc.pid} ${proc.argv.slice(0, 3).join(" ")}`.slice(0, 200);
  return "process";
}
var previewPorts = /* @__PURE__ */ new Set();
function policyChanged() {
  for (const p of previewPorts) p.postMessage({ k: "net-flush" });
}
async function loopbackFetch(url, init2, hops = 0) {
  const u = new URL(url);
  const port = Number(u.port) || (u.protocol === "https:" ? 443 : 80);
  const method = (init2.method ?? "GET").toUpperCase();
  const headers = [...new Headers(init2.headers)];
  if (!headers.some(([k]) => k === "host")) headers.unshift(["host", u.host]);
  const body = init2.body == null || method === "GET" || method === "HEAD" ? null : new Uint8Array(await new Response(init2.body).arrayBuffer());
  const signal = init2.signal;
  if (signal?.aborted) throw signal.reason ?? new DOMException("The operation was aborted.", "AbortError");
  const res = await new Promise((resolve2, reject) => {
    let ctrl;
    let headSeen = false;
    const stream = new ReadableStream({
      start(c) {
        ctrl = c;
      },
      cancel() {
        h?.abort();
      }
    });
    const h = net.request(port, { method, url: u.pathname + u.search, headers, hasBody: !!body }, {
      head: (status, statusText, hs) => {
        headSeen = true;
        const out = new Headers();
        for (const [k, v] of hs) {
          try {
            out.append(k, v);
          } catch {
          }
        }
        const nullBody = status === 204 || status === 205 || status === 304 || method === "HEAD";
        const r = new Response(nullBody ? null : stream, { status: status >= 200 && status <= 599 ? status : 502, statusText, headers: out });
        Object.defineProperty(r, "url", { value: u.href });
        resolve2(r);
      },
      data: (d) => {
        try {
          ctrl.enqueue(d);
        } catch {
        }
      },
      end: () => {
        try {
          ctrl.close();
        } catch {
        }
      },
      error: (msg) => {
        if (!headSeen) reject(Object.assign(new Error(msg), { code: /ECONNREFUSED/.test(msg) ? "ECONNREFUSED" : "ECONNRESET" }));
        else
          try {
            ctrl.error(new Error(msg));
          } catch {
          }
      }
    });
    if (h && body) {
      if (body.length) h.body(body);
      h.bodyEnd();
    }
    signal?.addEventListener("abort", () => {
      h?.abort();
      reject(signal.reason ?? new DOMException("The operation was aborted.", "AbortError"));
    });
  });
  const location2 = res.headers.get("location");
  if (res.status >= 300 && res.status < 400 && location2 && init2.redirect !== "manual") {
    void res.body?.cancel();
    if (init2.redirect === "error" || hops >= 20) throw Object.assign(new Error(`redirect from ${url} was not followed`), { code: "ECONNREFUSED" });
    const next = new URL(location2, u).href;
    const toGet = res.status === 303 || (res.status === 301 || res.status === 302) && method === "POST";
    const nextInit = toGet ? { ...init2, method: method === "HEAD" ? "HEAD" : "GET", body: void 0 } : init2;
    return isLoopbackHost(new URL(next).hostname) ? loopbackFetch(next, nextInit, hops + 1) : netFetch(next, nextInit);
  }
  return res;
}
var hostPort = null;
function emit(ev, transfer = []) {
  hostPort?.postMessage(ev, transfer);
}
var hostProcs = /* @__PURE__ */ new Map();
function toBytes(d) {
  if (typeof d === "string") return enc9.encode(d);
  if (d instanceof Uint8Array) return d;
  if (d instanceof ArrayBuffer) return new Uint8Array(d);
  throw new TypeError("data must be a string or Uint8Array");
}
async function pump(f, onData) {
  for (; ; ) {
    const d = await f.read(65536);
    if (!d.length) break;
    onData(d);
  }
  f.unref();
}
var methods = {
  ping: () => "pong",
  "debug.trace": (a) => globalThis.__ovTrace = !!a.on,
  "debug.esm": (a) => esm.load(a.pathname, a.search ?? ""),
  "fs.readFile": (a) => {
    const data = kernel.vfs.readFile(a.path);
    return a.encoding ? dec10.decode(data) : data.slice();
  },
  "fs.writeFile": (a) => {
    if (a.mkdirs !== false) kernel.vfs.writeFileP(a.path, toBytes(a.data), a.mode ?? 420);
    else kernel.vfs.writeFile(a.path, toBytes(a.data), a.mode ?? 420);
    return null;
  },
  "fs.mkdir": (a) => kernel.vfs.mkdir(a.path, 493, a.recursive ?? true) ?? null,
  "fs.readdir": (a) => a.withTypes ? kernel.vfs.readdirTypes(a.path).map(([name, t]) => ({ name, type: t === 16384 ? "dir" : t === 40960 ? "symlink" : "file" })) : kernel.vfs.readdir(a.path),
  "fs.rm": (a) => {
    if (a.recursive) kernel.vfs.rmrf(a.path, a.force ?? true);
    else {
      const n = kernel.vfs.lookup(a.path, false);
      if (isDir(n)) kernel.vfs.rmdir(a.path);
      else kernel.vfs.unlink(a.path);
    }
    return null;
  },
  "fs.stat": (a) => {
    const s = kernel.vfs.stat(a.path);
    return { ...s, isDirectory: (s.mode & 61440) === 16384, isFile: (s.mode & 61440) === 32768 };
  },
  "fs.exists": (a) => kernel.vfs.exists(a.path),
  "fs.rename": (a) => {
    kernel.vfs.rename(a.from, a.to);
    return null;
  },
  mount: (a) => {
    const base = a.path ?? "/home/user/app";
    kernel.vfs.mkdir(base, 493, true);
    let n = 0;
    for (const [rel, data] of Object.entries(a.files)) {
      const p = `${base}/${rel}`.replace(/\/+/g, "/");
      if (data === null || typeof data === "object" && data.dir) kernel.vfs.mkdir(p, 493, true);
      else if (typeof data === "object" && typeof data.symlink === "string") {
        kernel.vfs.mkdir(p.slice(0, p.lastIndexOf("/")) || "/", 493, true);
        kernel.vfs.symlink(data.symlink, p);
      } else {
        const node = kernel.vfs.writeFileP(p, toBytes(data), 420);
        if (/\.(sh|bash)$/.test(p) || typeof data === "string" && data.startsWith("#!")) node.mode |= 73;
      }
      n++;
    }
    return n;
  },
  export: (a) => {
    const out = {};
    const skip = new Set(a.exclude ?? ["node_modules", ".git"]);
    const walk = (dir, rel) => {
      for (const [name, t] of kernel.vfs.readdirTypes(dir)) {
        if (skip.has(name)) continue;
        const p = `${dir}/${name}`;
        const r = rel ? `${rel}/${name}` : name;
        if (t === 16384) walk(p, r);
        else if (t === 32768) out[r] = kernel.vfs.readFile(p).slice();
      }
    };
    walk(a.path, "");
    return out;
  },
  spawn: (a) => {
    const env2 = { ...kernel.defaultEnv(), ...a.env ?? {} };
    const cwd = a.cwd ?? "/home/user";
    kernel.vfs.mkdir(cwd, 493, true);
    if (a.terminal) {
      let pid2 = 0;
      const tty2 = kernel.createTty((d) => emit({ ev: "output", pid: pid2, data: d }));
      tty2.cols = a.terminal.cols ?? 80;
      tty2.rows = a.terminal.rows ?? 24;
      const f = kernel.openFile({ cwd, tty: tty2 }, "/dev/tty", 2);
      const p2 = kernel.spawn({ argv: a.argv, env: env2, cwd, stdio: [f, f, f], pgid: 0, tty: tty2 });
      f.unref();
      pid2 = p2.pid;
      tty2.foregroundPgid = p2.pgid;
      hostProcs.set(pid2, { pid: pid2, tty: tty2 });
      p2.exited.then((st) => {
        hostProcs.delete(pid2);
        emit({ ev: "exit", pid: pid2, code: exitCodeOf(st), signal: st.signal });
      });
      return { pid: pid2 };
    }
    const inp = createPipe();
    const out = createPipe();
    const err = createPipe();
    const p = kernel.spawn({ argv: a.argv, env: env2, cwd, stdio: [inp.r, out.w, err.w], pgid: 0 });
    inp.r.unref();
    out.w.unref();
    err.w.unref();
    const pid = p.pid;
    hostProcs.set(pid, { pid, stdin: inp.w });
    const done = Promise.all([
      pump(out.r, (d) => emit({ ev: "output", pid, data: d, stream: "stdout" })),
      pump(err.r, (d) => emit({ ev: "output", pid, data: d, stream: "stderr" })),
      p.exited
    ]);
    done.then(([, , st]) => {
      const hp = hostProcs.get(pid);
      hp?.stdin?.unref();
      hostProcs.delete(pid);
      emit({ ev: "exit", pid, code: exitCodeOf(st), signal: st.signal });
    });
    return { pid };
  },
  input: (a) => {
    const hp = hostProcs.get(a.pid);
    if (!hp) return false;
    if (hp.tty) {
      hp.tty.input(toBytes(a.data));
      return true;
    }
    if (a.data === null) {
      hp.stdin?.unref();
      hp.stdin = void 0;
      return true;
    }
    try {
      hp.stdin?.write(toBytes(a.data));
    } catch {
    }
    return true;
  },
  resize: (a) => {
    hostProcs.get(a.pid)?.tty?.resize(a.cols, a.rows);
    return null;
  },
  kill: (a) => {
    try {
      kernel.killGroup(kernel.get(a.pid).pgid, a.signal ?? "SIGTERM");
    } catch {
    }
    return null;
  },
  ps: () => [...kernel.procs.values()].filter((p) => p.state === "running").map((p) => ({ pid: p.pid, ppid: p.ppid, argv: p.argv, cwd: p.cwd })),
  ports: () => [...kernel.ports.values()].filter((r) => r.host !== "tcp-only").map((r) => ({ port: r.port, pid: r.pid })),
  "network.setPolicy": (a) => {
    policy = normalizePolicy(a.policy);
    policyChanged();
    return policy;
  },
  "network.getPolicy": () => policy,
  "network.clearSession": () => {
    sessionAllow.clear();
    sessionDeny.clear();
    policyChanged();
    return null;
  },
  "permission.respond": (a) => {
    if (!pendingPerms.has(a.id)) return false;
    const d = a.decision;
    settlePerm(a.id, d === "once" || d === "session" || d === "deny-session" ? d : "deny");
    return true;
  },
  watch: (a) => {
    const base = a.path;
    const id2 = a.id;
    const stop = kernel.vfs.onChange((ev) => {
      if (ev.path === base || ev.path.startsWith(base.endsWith("/") ? base : base + "/")) emit({ ev: "fs-change", id: id2, type: ev.type, path: ev.path });
    });
    watches.set(id2, stop);
    return null;
  },
  unwatch: (a) => {
    watches.get(a.id)?.();
    watches.delete(a.id);
    return null;
  }
};
var watches = /* @__PURE__ */ new Map();
var ARGS = {
  "fs.readFile": { path: "string" },
  "fs.writeFile": { path: "string" },
  "fs.mkdir": { path: "string" },
  "fs.readdir": { path: "string" },
  "fs.rm": { path: "string" },
  "fs.stat": { path: "string" },
  "fs.exists": { path: "string" },
  "fs.rename": { from: "string", to: "string" },
  mount: { files: "object" },
  export: { path: "string" },
  spawn: { argv: "string[]" },
  input: { pid: "number" },
  resize: { pid: "number", cols: "number", rows: "number" },
  kill: { pid: "number" },
  "permission.respond": { id: "number" },
  watch: { path: "string" },
  unwatch: {}
};
function received(v) {
  if (v === null || v === void 0) return `Received ${v}`;
  if (typeof v === "object") return Array.isArray(v) ? "Received an instance of Array" : `Received an instance of ${v.constructor?.name ?? "Object"}`;
  return `Received type ${typeof v} (${String(v).slice(0, 25)})`;
}
function checkArgs(m, a) {
  for (const [name, type] of Object.entries(Object.prototype.hasOwnProperty.call(ARGS, m) ? ARGS[m] : {})) {
    const v = a[name];
    const ok = type === "string[]" ? Array.isArray(v) && v.every((x) => typeof x === "string") : type === "object" ? typeof v === "object" && v !== null : typeof v === type;
    if (!ok) {
      const what = type === "string[]" ? "an instance of Array of strings" : type === "object" ? "of type object" : `of type ${type}`;
      throw Object.assign(new TypeError(`The "${name}" argument must be ${what}. ${received(v)}`), { code: "ERR_INVALID_ARG_TYPE" });
    }
    if (type === "string[]" && !v.length) throw Object.assign(new TypeError(`The argument '${name}' must not be empty. Received []`), { code: "ERR_INVALID_ARG_VALUE" });
  }
}
function errorCode(e) {
  if (typeof e?.code === "string" && e.code) return e.code;
  if (e instanceof TypeError) return "ERR_INVALID_ARG_TYPE";
  if (e instanceof RangeError) return "ERR_OUT_OF_RANGE";
  return "ERR_INVALID_ARG_VALUE";
}
function attachHost(port) {
  hostPort = port;
  port.onmessage = async (ev) => {
    const msg = ev.data;
    if (msg?.t === "preview-port") {
      attachPreview(msg.port);
      return;
    }
    const { id: id2, m, a } = msg ?? {};
    const fn = typeof m === "string" && Object.prototype.hasOwnProperty.call(methods, m) ? methods[m] : void 0;
    if (!fn) {
      port.postMessage({ id: id2, e: { message: `unknown method ${m}`, code: "ENOSYS" } });
      return;
    }
    try {
      const args = a && typeof a === "object" ? a : {};
      checkArgs(m, args);
      const r = await fn(args);
      const transfer = r instanceof Uint8Array ? [r.buffer] : [];
      port.postMessage({ id: id2, r }, transfer);
    } catch (e) {
      port.postMessage({ id: id2, e: { message: e?.message ?? String(e), code: errorCode(e) } });
    }
  };
  port.postMessage({ ev: "ready" });
}
function attachSw(port) {
  port.onmessage = async (ev) => {
    const msg = ev.data;
    if (!msg || typeof msg.id !== "number") return;
    if (msg.k === "esm") {
      const r = await esm.load(msg.pathname, msg.search ?? "");
      port.postMessage({ id: msg.id, ...r });
      return;
    }
    if (msg.k === "net") {
      const v = await checkNetwork(String(msg.url), initiatorOf(msg.initiator, msg.token), "runtime");
      port.postMessage({ id: msg.id, allow: v.allow, timeout: !!v.timeout });
    }
  };
}
function attachPreview(port) {
  const handles = /* @__PURE__ */ new Map();
  const send = (m, t = []) => port.postMessage(m, t);
  previewPorts.add(port);
  port.addEventListener("close", () => {
    previewPorts.delete(port);
    for (const h of handles.values()) h?.abort();
    handles.clear();
  });
  port.onmessage = async (ev) => {
    const m = ev.data;
    if (!m || typeof m.id !== "number" || typeof m.k !== "string") return;
    switch (m.k) {
      case "req": {
        const h = net.request(Number(m.port), { method: String(m.method), url: String(m.url), headers: m.headers ?? [], hasBody: !!m.hasBody }, {
          head: (status, statusText, headers) => send({ k: "head", id: m.id, status, statusText, headers }),
          data: (d) => send({ k: "data", id: m.id, data: d }),
          end: () => {
            handles.delete(m.id);
            send({ k: "end", id: m.id });
          },
          error: (msg) => {
            handles.delete(m.id);
            send({ k: "error", id: m.id, msg });
          }
        });
        if (h) handles.set(m.id, h);
        return;
      }
      case "body":
        if (m.data instanceof Uint8Array) handles.get(m.id)?.body(m.data);
        return;
      case "body-end":
        handles.get(m.id)?.bodyEnd();
        return;
      case "abort":
        handles.get(m.id)?.abort();
        handles.delete(m.id);
        return;
      case "ws-open": {
        let opened = false;
        let closed = false;
        const fail2 = (reason) => {
          if (closed) return;
          closed = true;
          handles.get(m.id)?.abort();
          handles.delete(m.id);
          send({ k: "ws-closed", id: m.id, code: 1006, reason });
        };
        const h = net.request(Number(m.port), { method: "GET", url: String(m.url), headers: m.headers ?? [], hasBody: false, upgrade: true }, {
          // an ordinary response instead of 101: the upgrade failed (the browser's WebSocket does the same)
          head: (status) => fail2(`Unexpected server response: ${status}`),
          data: () => {
          },
          end: () => {
            if (!opened) fail2("Unexpected server response");
          },
          error: (msg) => fail2(msg),
          wsOpen: (protocol) => {
            opened = true;
            send({ k: "ws-opened", id: m.id, protocol });
          },
          wsMessage: (data, binary) => send({ k: "ws-msg", id: m.id, data, binary }),
          wsClose: (code, reason) => {
            if (closed) return;
            closed = true;
            handles.delete(m.id);
            send({ k: "ws-closed", id: m.id, code, reason });
          }
        });
        if (h && !closed) handles.set(m.id, h);
        else if (h) h.abort();
        return;
      }
      case "ws-msg":
        if (typeof m.data === "string" || m.data instanceof Uint8Array) handles.get(m.id)?.wsSend(m.data, !!m.binary);
        return;
      case "ws-close":
        handles.get(m.id)?.wsClose(Number(m.code) || 1e3, String(m.reason ?? ""));
        handles.delete(m.id);
        return;
      case "net": {
        const v = await checkNetwork(String(m.url), "preview", "preview");
        send({ k: "net-result", id: m.id, allow: v.allow, cache: v.cache, timeout: !!v.timeout });
        return;
      }
    }
  };
}
self.onmessage = (ev) => {
  const msg = ev.data;
  if (msg?.t === "host-port") attachHost(msg.port);
  else if (msg?.t === "sw-port") attachSw(msg.port);
  else if (msg?.t === "policy") {
    policy = normalizePolicy(msg.policy);
    policyChanged();
  }
};
export {
  checkNetwork
};
//# sourceMappingURL=kernel.js.map
