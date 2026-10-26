import {
  __esm
} from "./chunk-CEEP6M5H.js";

// src/node/version.ts
var NODE_VERSION;
var init_version = __esm({
  "src/node/version.ts"() {
    "use strict";
    NODE_VERSION = "22.23.4";
  }
});

// src/shared/node-path-support.ts
var cwdProvider = () => "/";
function setCwdProvider(fn) {
  cwdProvider = fn;
}
var __cwd = () => cwdProvider();
var __env = {};
function describeReceived(v) {
  if (v == null) return ` Received ${v}`;
  if (typeof v === "function") return ` Received function ${v.name || "<anonymous>"}`;
  if (typeof v === "object") {
    const name = v.constructor?.name;
    return name ? ` Received an instance of ${name}` : ` Received ${String(v)}`;
  }
  let shown = typeof v === "string" ? `'${v.length > 25 ? v.slice(0, 25) + "..." : v}'` : typeof v === "bigint" ? `${v}n` : String(v);
  return ` Received type ${typeof v} (${shown})`;
}
function invalidArgType(name, expected, v) {
  const e = new TypeError(`The "${name}" argument must be ${expected}.${describeReceived(v)}`);
  e.code = "ERR_INVALID_ARG_TYPE";
  Object.defineProperty(e, "name", { value: "TypeError", enumerable: false });
  return e;
}
function validateString(v, name) {
  if (typeof v !== "string") throw invalidArgType(name, "of type string", v);
}
function validateObject(v, name) {
  if (v === null || typeof v !== "object" || Array.isArray(v)) throw invalidArgType(name, "of type object", v);
}
function globToRegExp(glob2) {
  let re = "";
  let inGroup = 0;
  for (let i = 0; i < glob2.length; i++) {
    const c = glob2[i];
    if (c === "*") {
      if (glob2[i + 1] === "*") {
        const prevSlash = i === 0 || glob2[i - 1] === "/";
        i++;
        if (glob2[i + 1] === "/" && prevSlash) {
          i++;
          re += "(?:.*/)?";
        } else {
          re += ".*";
        }
      } else {
        re += "[^/]*";
      }
    } else if (c === "?") re += "[^/]";
    else if (c === "{") {
      inGroup++;
      re += "(?:";
    } else if (c === "}" && inGroup) {
      inGroup--;
      re += ")";
    } else if (c === "," && inGroup) re += "|";
    else if (c === "[") {
      const close = glob2.indexOf("]", i + 1);
      if (close === -1) re += "\\[";
      else {
        let cls = glob2.slice(i + 1, close);
        if (cls[0] === "!") cls = "^" + cls.slice(1);
        re += `[${cls.replace(/\\/g, "\\\\")}]`;
        i = close;
      }
    } else if (".+^$()|\\/".includes(c)) re += "\\" + c;
    else re += c;
  }
  return new RegExp(`^${re}$`);
}
function __glob(path, pattern, windows) {
  if (windows) {
    path = path.replace(/\\/g, "/");
    pattern = pattern.replace(/\\/g, "/");
    return globToRegExp(pattern.toLowerCase()).test(path.toLowerCase());
  }
  return globToRegExp(pattern).test(path);
}

// src/shared/node-path.ts
var isWindows = false;
var ArrayPrototypeIncludes = (a, v) => a.includes(v);
var ArrayPrototypeJoin = (a, s) => a.join(s);
var ArrayPrototypePush = (a, ...v) => a.push(...v);
var ArrayPrototypeSlice = (a, s, e) => a.slice(s, e);
var FunctionPrototypeBind = (f, t, ...a) => f.bind(t, ...a);
var StringPrototypeCharCodeAt = (s, i) => s.charCodeAt(i);
var StringPrototypeIncludes = (s, v) => s.includes(v);
var StringPrototypeIndexOf = (s, v, i) => s.indexOf(v, i);
var StringPrototypeLastIndexOf = (s, v, i) => i === void 0 ? s.lastIndexOf(v) : s.lastIndexOf(v, i);
var StringPrototypeRepeat = (s, n) => s.repeat(n);
var StringPrototypeReplace = (s, a, b) => s.replace(a, b);
var StringPrototypeSlice = (s, a, b) => s.slice(a, b);
var StringPrototypeSplit = (s, a, n) => s.split(a, n);
var StringPrototypeToLowerCase = (s) => s.toLowerCase();
var StringPrototypeToUpperCase = (s) => s.toUpperCase();
var CHAR_UPPERCASE_A = 65;
var CHAR_LOWERCASE_A = 97;
var CHAR_UPPERCASE_Z = 90;
var CHAR_LOWERCASE_Z = 122;
var CHAR_DOT = 46;
var CHAR_FORWARD_SLASH = 47;
var CHAR_BACKWARD_SLASH = 92;
var CHAR_COLON = 58;
var CHAR_QUESTION_MARK = 63;
function isPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}
function isPosixPathSeparator(code) {
  return code === CHAR_FORWARD_SLASH;
}
var WINDOWS_RESERVED_NAMES = [
  "CON",
  "PRN",
  "AUX",
  "NUL",
  "COM1",
  "COM2",
  "COM3",
  "COM4",
  "COM5",
  "COM6",
  "COM7",
  "COM8",
  "COM9",
  "LPT1",
  "LPT2",
  "LPT3",
  "LPT4",
  "LPT5",
  "LPT6",
  "LPT7",
  "LPT8",
  "LPT9",
  "COM\xB9",
  "COM\xB2",
  "COM\xB3",
  "LPT\xB9",
  "LPT\xB2",
  "LPT\xB3"
];
function isWindowsReservedName(path, colonIndex) {
  const devicePart = StringPrototypeToUpperCase(StringPrototypeSlice(path, 0, colonIndex));
  return ArrayPrototypeIncludes(WINDOWS_RESERVED_NAMES, devicePart);
}
function isWindowsDeviceRoot(code) {
  return code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z || code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z;
}
function normalizeString(path, allowAboveRoot, separator, isPathSeparator2) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code = 0;
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = StringPrototypeCharCodeAt(path, i);
    else if (isPathSeparator2(code))
      break;
    else
      code = CHAR_FORWARD_SLASH;
    if (isPathSeparator2(code)) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || StringPrototypeCharCodeAt(res, res.length - 1) !== CHAR_DOT || StringPrototypeCharCodeAt(res, res.length - 2) !== CHAR_DOT) {
          if (res.length > 2) {
            const lastSlashIndex = res.length - lastSegmentLength - 1;
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = StringPrototypeSlice(res, 0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - StringPrototypeLastIndexOf(res, separator);
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length !== 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? `${separator}..` : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += `${separator}${StringPrototypeSlice(path, lastSlash + 1, i)}`;
        else
          res = StringPrototypeSlice(path, lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === CHAR_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function formatExt(ext) {
  return ext ? `${ext[0] === "." ? "" : "."}${ext}` : "";
}
function _format(sep, pathObject) {
  validateObject(pathObject, "pathObject");
  const dir = pathObject.dir || pathObject.root;
  const base = pathObject.base || `${pathObject.name || ""}${formatExt(pathObject.ext)}`;
  if (!dir) {
    return base;
  }
  return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`;
}
function glob(path, pattern, windows) {
  validateString(path, "path");
  validateString(pattern, "pattern");
  return __glob(path, pattern, windows);
}
var forwardSlashRegExp = /\//g;
var win32 = {
  /**
   * path.resolve([from ...], to)
   * @param {...string} args
   * @returns {string}
   */
  resolve(...args) {
    let resolvedDevice = "";
    let resolvedTail = "";
    let resolvedAbsolute = false;
    for (let i = args.length - 1; i >= -1; i--) {
      let path;
      if (i >= 0) {
        path = args[i];
        validateString(path, `paths[${i}]`);
        if (path.length === 0) {
          continue;
        }
      } else if (resolvedDevice.length === 0) {
        path = __cwd();
        if (args.length === 0 || args.length === 1 && (args[0] === "" || args[0] === ".") && isPathSeparator(StringPrototypeCharCodeAt(path, 0))) {
          if (!isWindows) {
            path = StringPrototypeReplace(path, forwardSlashRegExp, "\\");
          }
          return path;
        }
      } else {
        path = __env[`=${resolvedDevice}`] || __cwd();
        if (path === void 0 || StringPrototypeToLowerCase(StringPrototypeSlice(path, 0, 2)) !== StringPrototypeToLowerCase(resolvedDevice) && StringPrototypeCharCodeAt(path, 2) === CHAR_BACKWARD_SLASH) {
          path = `${resolvedDevice}\\`;
        }
      }
      const len = path.length;
      let rootEnd = 0;
      let device = "";
      let isAbsolute2 = false;
      const code = StringPrototypeCharCodeAt(path, 0);
      if (len === 1) {
        if (isPathSeparator(code)) {
          rootEnd = 1;
          isAbsolute2 = true;
        }
      } else if (isPathSeparator(code)) {
        isAbsolute2 = true;
        if (isPathSeparator(StringPrototypeCharCodeAt(path, 1))) {
          let j = 2;
          let last = j;
          while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
            j++;
          }
          if (j < len && j !== last) {
            const firstPart = StringPrototypeSlice(path, last, j);
            last = j;
            while (j < len && isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
              j++;
            }
            if (j < len && j !== last) {
              last = j;
              while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
                j++;
              }
              if (j === len || j !== last) {
                if (firstPart !== "." && firstPart !== "?") {
                  device = `\\\\${firstPart}\\${StringPrototypeSlice(path, last, j)}`;
                  rootEnd = j;
                } else {
                  device = `\\\\${firstPart}`;
                  rootEnd = 4;
                }
              }
            }
          }
        } else {
          rootEnd = 1;
        }
      } else if (isWindowsDeviceRoot(code) && StringPrototypeCharCodeAt(path, 1) === CHAR_COLON) {
        device = StringPrototypeSlice(path, 0, 2);
        rootEnd = 2;
        if (len > 2 && isPathSeparator(StringPrototypeCharCodeAt(path, 2))) {
          isAbsolute2 = true;
          rootEnd = 3;
        }
      }
      if (device.length > 0) {
        if (resolvedDevice.length > 0) {
          if (StringPrototypeToLowerCase(device) !== StringPrototypeToLowerCase(resolvedDevice))
            continue;
        } else {
          resolvedDevice = device;
        }
      }
      if (resolvedAbsolute) {
        if (resolvedDevice.length > 0)
          break;
      } else {
        resolvedTail = `${StringPrototypeSlice(path, rootEnd)}\\${resolvedTail}`;
        resolvedAbsolute = isAbsolute2;
        if (isAbsolute2 && resolvedDevice.length > 0) {
          break;
        }
      }
    }
    resolvedTail = normalizeString(
      resolvedTail,
      !resolvedAbsolute,
      "\\",
      isPathSeparator
    );
    return resolvedAbsolute ? `${resolvedDevice}\\${resolvedTail}` : `${resolvedDevice}${resolvedTail}` || ".";
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  normalize(path) {
    validateString(path, "path");
    const len = path.length;
    if (len === 0)
      return ".";
    let rootEnd = 0;
    let device;
    let isAbsolute2 = false;
    const code = StringPrototypeCharCodeAt(path, 0);
    if (len === 1) {
      return isPosixPathSeparator(code) ? "\\" : path;
    }
    if (isPathSeparator(code)) {
      isAbsolute2 = true;
      if (isPathSeparator(StringPrototypeCharCodeAt(path, 1))) {
        let j = 2;
        let last = j;
        while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
          j++;
        }
        if (j < len && j !== last) {
          const firstPart = StringPrototypeSlice(path, last, j);
          last = j;
          while (j < len && isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
            j++;
          }
          if (j < len && j !== last) {
            last = j;
            while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
              j++;
            }
            if (j === len || j !== last) {
              if (firstPart === "." || firstPart === "?") {
                device = `\\\\${firstPart}`;
                rootEnd = 4;
                const colonIndex2 = StringPrototypeIndexOf(path, ":");
                const possibleDevice = StringPrototypeSlice(path, 4, colonIndex2 + 1);
                if (isWindowsReservedName(possibleDevice, possibleDevice.length - 1)) {
                  device = `\\\\?\\${possibleDevice}`;
                  rootEnd = 4 + possibleDevice.length;
                }
              } else if (j === len) {
                return `\\\\${firstPart}\\${StringPrototypeSlice(path, last)}\\`;
              } else {
                device = `\\\\${firstPart}\\${StringPrototypeSlice(path, last, j)}`;
                rootEnd = j;
              }
            }
          }
        }
      } else {
        rootEnd = 1;
      }
    } else {
      const colonIndex2 = StringPrototypeIndexOf(path, ":");
      if (colonIndex2 > 0) {
        if (isWindowsDeviceRoot(code) && colonIndex2 === 1) {
          device = StringPrototypeSlice(path, 0, 2);
          rootEnd = 2;
          if (len > 2 && isPathSeparator(StringPrototypeCharCodeAt(path, 2))) {
            isAbsolute2 = true;
            rootEnd = 3;
          }
        } else if (isWindowsReservedName(path, colonIndex2)) {
          device = StringPrototypeSlice(path, 0, colonIndex2 + 1);
          rootEnd = colonIndex2 + 1;
        }
      }
    }
    let tail = rootEnd < len ? normalizeString(
      StringPrototypeSlice(path, rootEnd),
      !isAbsolute2,
      "\\",
      isPathSeparator
    ) : "";
    if (tail.length === 0 && !isAbsolute2)
      tail = ".";
    if (tail.length > 0 && isPathSeparator(StringPrototypeCharCodeAt(path, len - 1)))
      tail += "\\";
    if (!isAbsolute2 && device === void 0 && StringPrototypeIncludes(path, ":")) {
      if (tail.length >= 2 && isWindowsDeviceRoot(StringPrototypeCharCodeAt(tail, 0)) && StringPrototypeCharCodeAt(tail, 1) === CHAR_COLON) {
        return `.\\${tail}`;
      }
      let index = StringPrototypeIndexOf(path, ":");
      do {
        if (index === len - 1 || isPathSeparator(StringPrototypeCharCodeAt(path, index + 1))) {
          return `.\\${tail}`;
        }
      } while ((index = StringPrototypeIndexOf(path, ":", index + 1)) !== -1);
    }
    const colonIndex = StringPrototypeIndexOf(path, ":");
    if (isWindowsReservedName(path, colonIndex)) {
      return `.\\${device ?? ""}${tail}`;
    }
    if (device === void 0) {
      return isAbsolute2 ? `\\${tail}` : tail;
    }
    return isAbsolute2 ? `${device}\\${tail}` : `${device}${tail}`;
  },
  /**
   * @param {string} path
   * @returns {boolean}
   */
  isAbsolute(path) {
    validateString(path, "path");
    const len = path.length;
    if (len === 0)
      return false;
    const code = StringPrototypeCharCodeAt(path, 0);
    return isPathSeparator(code) || // Possible device root
    len > 2 && isWindowsDeviceRoot(code) && StringPrototypeCharCodeAt(path, 1) === CHAR_COLON && isPathSeparator(StringPrototypeCharCodeAt(path, 2));
  },
  /**
   * @param {...string} args
   * @returns {string}
   */
  join(...args) {
    if (args.length === 0)
      return ".";
    const path = [];
    for (let i = 0; i < args.length; ++i) {
      const arg = args[i];
      validateString(arg, "path");
      if (arg.length > 0) {
        ArrayPrototypePush(path, arg);
      }
    }
    if (path.length === 0)
      return ".";
    const firstPart = path[0];
    let joined = ArrayPrototypeJoin(path, "\\");
    let needsReplace = true;
    let slashCount = 0;
    if (isPathSeparator(StringPrototypeCharCodeAt(firstPart, 0))) {
      ++slashCount;
      const firstLen = firstPart.length;
      if (firstLen > 1 && isPathSeparator(StringPrototypeCharCodeAt(firstPart, 1))) {
        ++slashCount;
        if (firstLen > 2) {
          if (isPathSeparator(StringPrototypeCharCodeAt(firstPart, 2)))
            ++slashCount;
          else {
            needsReplace = false;
          }
        }
      }
    }
    if (needsReplace) {
      while (slashCount < joined.length && isPathSeparator(StringPrototypeCharCodeAt(joined, slashCount))) {
        slashCount++;
      }
      if (slashCount >= 2)
        joined = `\\${StringPrototypeSlice(joined, slashCount)}`;
    }
    const parts = [];
    let part = "";
    for (let i = 0; i < joined.length; i++) {
      if (joined[i] === "\\") {
        if (part) parts.push(part);
        part = "";
        while (i + 1 < joined.length && joined[i + 1] === "\\") i++;
      } else {
        part += joined[i];
      }
    }
    if (part) parts.push(part);
    if (parts.some((p) => {
      const colonIndex = StringPrototypeIndexOf(p, ":");
      return colonIndex !== -1 && isWindowsReservedName(p, colonIndex);
    })) {
      let result = "";
      for (let i = 0; i < joined.length; i++) {
        result += joined[i] === "/" ? "\\" : joined[i];
      }
      return result;
    }
    return win32.normalize(joined);
  },
  /**
   * It will solve the relative path from `from` to `to`, for instance
   * from = 'C:\\orandea\\test\\aaa'
   * to = 'C:\\orandea\\impl\\bbb'
   * The output of the function should be: '..\\..\\impl\\bbb'
   * @param {string} from
   * @param {string} to
   * @returns {string}
   */
  relative(from, to) {
    validateString(from, "from");
    validateString(to, "to");
    if (from === to)
      return "";
    const fromOrig = win32.resolve(from);
    const toOrig = win32.resolve(to);
    if (fromOrig === toOrig)
      return "";
    from = StringPrototypeToLowerCase(fromOrig);
    to = StringPrototypeToLowerCase(toOrig);
    if (from === to)
      return "";
    if (fromOrig.length !== from.length || toOrig.length !== to.length) {
      const fromSplit = StringPrototypeSplit(fromOrig, "\\");
      const toSplit = StringPrototypeSplit(toOrig, "\\");
      if (fromSplit[fromSplit.length - 1] === "") {
        fromSplit.pop();
      }
      if (toSplit[toSplit.length - 1] === "") {
        toSplit.pop();
      }
      const fromLen2 = fromSplit.length;
      const toLen2 = toSplit.length;
      const length2 = fromLen2 < toLen2 ? fromLen2 : toLen2;
      let i2;
      for (i2 = 0; i2 < length2; i2++) {
        if (StringPrototypeToLowerCase(fromSplit[i2]) !== StringPrototypeToLowerCase(toSplit[i2])) {
          break;
        }
      }
      if (i2 === 0) {
        return toOrig;
      } else if (i2 === length2) {
        if (toLen2 > length2) {
          return ArrayPrototypeJoin(ArrayPrototypeSlice(toSplit, i2), "\\");
        }
        if (fromLen2 > length2) {
          return StringPrototypeRepeat("..\\", fromLen2 - 1 - i2) + "..";
        }
        return "";
      }
      return StringPrototypeRepeat("..\\", fromLen2 - i2) + ArrayPrototypeJoin(ArrayPrototypeSlice(toSplit, i2), "\\");
    }
    let fromStart = 0;
    while (fromStart < from.length && StringPrototypeCharCodeAt(from, fromStart) === CHAR_BACKWARD_SLASH) {
      fromStart++;
    }
    let fromEnd = from.length;
    while (fromEnd - 1 > fromStart && StringPrototypeCharCodeAt(from, fromEnd - 1) === CHAR_BACKWARD_SLASH) {
      fromEnd--;
    }
    const fromLen = fromEnd - fromStart;
    let toStart = 0;
    while (toStart < to.length && StringPrototypeCharCodeAt(to, toStart) === CHAR_BACKWARD_SLASH) {
      toStart++;
    }
    let toEnd = to.length;
    while (toEnd - 1 > toStart && StringPrototypeCharCodeAt(to, toEnd - 1) === CHAR_BACKWARD_SLASH) {
      toEnd--;
    }
    const toLen = toEnd - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for (; i < length; i++) {
      const fromCode = StringPrototypeCharCodeAt(from, fromStart + i);
      if (fromCode !== StringPrototypeCharCodeAt(to, toStart + i))
        break;
      else if (fromCode === CHAR_BACKWARD_SLASH)
        lastCommonSep = i;
    }
    if (i !== length) {
      if (lastCommonSep === -1)
        return toOrig;
    } else {
      if (toLen > length) {
        if (StringPrototypeCharCodeAt(to, toStart + i) === CHAR_BACKWARD_SLASH) {
          return StringPrototypeSlice(toOrig, toStart + i + 1);
        }
        if (i === 2) {
          return StringPrototypeSlice(toOrig, toStart + i);
        }
      }
      if (fromLen > length) {
        if (StringPrototypeCharCodeAt(from, fromStart + i) === CHAR_BACKWARD_SLASH) {
          lastCommonSep = i;
        } else if (i === 2) {
          lastCommonSep = 3;
        }
      }
      if (lastCommonSep === -1)
        lastCommonSep = 0;
    }
    let out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || StringPrototypeCharCodeAt(from, i) === CHAR_BACKWARD_SLASH) {
        out += out.length === 0 ? ".." : "\\..";
      }
    }
    toStart += lastCommonSep;
    if (out.length > 0)
      return `${out}${StringPrototypeSlice(toOrig, toStart, toEnd)}`;
    if (StringPrototypeCharCodeAt(toOrig, toStart) === CHAR_BACKWARD_SLASH)
      ++toStart;
    return StringPrototypeSlice(toOrig, toStart, toEnd);
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  toNamespacedPath(path) {
    if (typeof path !== "string" || path.length === 0)
      return path;
    const resolvedPath = win32.resolve(path);
    if (resolvedPath.length <= 2)
      return path;
    if (StringPrototypeCharCodeAt(resolvedPath, 0) === CHAR_BACKWARD_SLASH) {
      if (StringPrototypeCharCodeAt(resolvedPath, 1) === CHAR_BACKWARD_SLASH) {
        const code = StringPrototypeCharCodeAt(resolvedPath, 2);
        if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
          return `\\\\?\\UNC\\${StringPrototypeSlice(resolvedPath, 2)}`;
        }
      }
    } else if (isWindowsDeviceRoot(StringPrototypeCharCodeAt(resolvedPath, 0)) && StringPrototypeCharCodeAt(resolvedPath, 1) === CHAR_COLON && StringPrototypeCharCodeAt(resolvedPath, 2) === CHAR_BACKWARD_SLASH) {
      return `\\\\?\\${resolvedPath}`;
    }
    return resolvedPath;
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  dirname(path) {
    validateString(path, "path");
    const len = path.length;
    if (len === 0)
      return ".";
    let rootEnd = -1;
    let offset = 0;
    const code = StringPrototypeCharCodeAt(path, 0);
    if (len === 1) {
      return isPathSeparator(code) ? path : ".";
    }
    if (isPathSeparator(code)) {
      rootEnd = offset = 1;
      if (isPathSeparator(StringPrototypeCharCodeAt(path, 1))) {
        let j = 2;
        let last = j;
        while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
          j++;
        }
        if (j < len && j !== last) {
          last = j;
          while (j < len && isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
            j++;
          }
          if (j < len && j !== last) {
            last = j;
            while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
              j++;
            }
            if (j === len) {
              return path;
            }
            if (j !== last) {
              rootEnd = offset = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code) && StringPrototypeCharCodeAt(path, 1) === CHAR_COLON) {
      rootEnd = len > 2 && isPathSeparator(StringPrototypeCharCodeAt(path, 2)) ? 3 : 2;
      offset = rootEnd;
    }
    let end = -1;
    let matchedSlash = true;
    for (let i = len - 1; i >= offset; --i) {
      if (isPathSeparator(StringPrototypeCharCodeAt(path, i))) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1) {
      if (rootEnd === -1)
        return ".";
      end = rootEnd;
    }
    return StringPrototypeSlice(path, 0, end);
  },
  /**
   * @param {string} path
   * @param {string} [suffix]
   * @returns {string}
   */
  basename(path, suffix) {
    if (suffix !== void 0)
      validateString(suffix, "suffix");
    validateString(path, "path");
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    if (path.length >= 2 && isWindowsDeviceRoot(StringPrototypeCharCodeAt(path, 0)) && StringPrototypeCharCodeAt(path, 1) === CHAR_COLON) {
      start = 2;
    }
    if (suffix !== void 0 && suffix.length > 0 && suffix.length <= path.length) {
      if (suffix === path)
        return "";
      let extIdx = suffix.length - 1;
      let firstNonSlashEnd = -1;
      for (let i = path.length - 1; i >= start; --i) {
        const code = StringPrototypeCharCodeAt(path, i);
        if (isPathSeparator(code)) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === StringPrototypeCharCodeAt(suffix, extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end)
        end = firstNonSlashEnd;
      else if (end === -1)
        end = path.length;
      return StringPrototypeSlice(path, start, end);
    }
    for (let i = path.length - 1; i >= start; --i) {
      if (isPathSeparator(StringPrototypeCharCodeAt(path, i))) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1)
      return "";
    return StringPrototypeSlice(path, start, end);
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  extname(path) {
    validateString(path, "path");
    let start = 0;
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    if (path.length >= 2 && StringPrototypeCharCodeAt(path, 1) === CHAR_COLON && isWindowsDeviceRoot(StringPrototypeCharCodeAt(path, 0))) {
      start = startPart = 2;
    }
    for (let i = path.length - 1; i >= start; --i) {
      const code = StringPrototypeCharCodeAt(path, i);
      if (isPathSeparator(code)) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === CHAR_DOT) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return StringPrototypeSlice(path, startDot, end);
  },
  format: FunctionPrototypeBind(_format, null, "\\"),
  /**
   * @param {string} path
   * @returns {{
   *  dir: string;
   *  root: string;
   *  base: string;
   *  name: string;
   *  ext: string;
   *  }}
   */
  parse(path) {
    validateString(path, "path");
    const ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path.length === 0)
      return ret;
    const len = path.length;
    let rootEnd = 0;
    let code = StringPrototypeCharCodeAt(path, 0);
    if (len === 1) {
      if (isPathSeparator(code)) {
        ret.root = ret.dir = path;
        return ret;
      }
      ret.base = ret.name = path;
      return ret;
    }
    if (isPathSeparator(code)) {
      rootEnd = 1;
      if (isPathSeparator(StringPrototypeCharCodeAt(path, 1))) {
        let j = 2;
        let last = j;
        while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
          j++;
        }
        if (j < len && j !== last) {
          last = j;
          while (j < len && isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
            j++;
          }
          if (j < len && j !== last) {
            last = j;
            while (j < len && !isPathSeparator(StringPrototypeCharCodeAt(path, j))) {
              j++;
            }
            if (j === len) {
              rootEnd = j;
            } else if (j !== last) {
              rootEnd = j + 1;
            }
          }
        }
      }
    } else if (isWindowsDeviceRoot(code) && StringPrototypeCharCodeAt(path, 1) === CHAR_COLON) {
      if (len <= 2) {
        ret.root = ret.dir = path;
        return ret;
      }
      rootEnd = 2;
      if (isPathSeparator(StringPrototypeCharCodeAt(path, 2))) {
        if (len === 3) {
          ret.root = ret.dir = path;
          return ret;
        }
        rootEnd = 3;
      }
    }
    if (rootEnd > 0)
      ret.root = StringPrototypeSlice(path, 0, rootEnd);
    let startDot = -1;
    let startPart = rootEnd;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for (; i >= rootEnd; --i) {
      code = StringPrototypeCharCodeAt(path, i);
      if (isPathSeparator(code)) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === CHAR_DOT) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (end !== -1) {
      if (startDot === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        ret.base = ret.name = StringPrototypeSlice(path, startPart, end);
      } else {
        ret.name = StringPrototypeSlice(path, startPart, startDot);
        ret.base = StringPrototypeSlice(path, startPart, end);
        ret.ext = StringPrototypeSlice(path, startDot, end);
      }
    }
    if (startPart > 0 && startPart !== rootEnd)
      ret.dir = StringPrototypeSlice(path, 0, startPart - 1);
    else
      ret.dir = ret.root;
    return ret;
  },
  matchesGlob(path, pattern) {
    return glob(path, pattern, true);
  },
  sep: "\\",
  delimiter: ";",
  win32: null,
  posix: null
};
var posixCwd = (() => {
  if (isWindows) {
    const regexp = /\\/g;
    return () => {
      const cwd = StringPrototypeReplace(__cwd(), regexp, "/");
      return StringPrototypeSlice(cwd, StringPrototypeIndexOf(cwd, "/"));
    };
  }
  return () => __cwd();
})();
var posix = {
  /**
   * path.resolve([from ...], to)
   * @param {...string} args
   * @returns {string}
   */
  resolve(...args) {
    if (args.length === 0 || args.length === 1 && (args[0] === "" || args[0] === ".")) {
      const cwd = posixCwd();
      if (StringPrototypeCharCodeAt(cwd, 0) === CHAR_FORWARD_SLASH) {
        return cwd;
      }
    }
    let resolvedPath = "";
    let resolvedAbsolute = false;
    for (let i = args.length - 1; i >= 0 && !resolvedAbsolute; i--) {
      const path = args[i];
      validateString(path, `paths[${i}]`);
      if (path.length === 0) {
        continue;
      }
      resolvedPath = `${path}/${resolvedPath}`;
      resolvedAbsolute = StringPrototypeCharCodeAt(path, 0) === CHAR_FORWARD_SLASH;
    }
    if (!resolvedAbsolute) {
      const cwd = posixCwd();
      resolvedPath = `${cwd}/${resolvedPath}`;
      resolvedAbsolute = StringPrototypeCharCodeAt(cwd, 0) === CHAR_FORWARD_SLASH;
    }
    resolvedPath = normalizeString(
      resolvedPath,
      !resolvedAbsolute,
      "/",
      isPosixPathSeparator
    );
    if (resolvedAbsolute) {
      return `/${resolvedPath}`;
    }
    return resolvedPath.length > 0 ? resolvedPath : ".";
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  normalize(path) {
    validateString(path, "path");
    if (path.length === 0)
      return ".";
    const isAbsolute2 = StringPrototypeCharCodeAt(path, 0) === CHAR_FORWARD_SLASH;
    const trailingSeparator = StringPrototypeCharCodeAt(path, path.length - 1) === CHAR_FORWARD_SLASH;
    path = normalizeString(path, !isAbsolute2, "/", isPosixPathSeparator);
    if (path.length === 0) {
      if (isAbsolute2)
        return "/";
      return trailingSeparator ? "./" : ".";
    }
    if (trailingSeparator)
      path += "/";
    return isAbsolute2 ? `/${path}` : path;
  },
  /**
   * @param {string} path
   * @returns {boolean}
   */
  isAbsolute(path) {
    validateString(path, "path");
    return path.length > 0 && StringPrototypeCharCodeAt(path, 0) === CHAR_FORWARD_SLASH;
  },
  /**
   * @param {...string} args
   * @returns {string}
   */
  join(...args) {
    if (args.length === 0)
      return ".";
    const path = [];
    for (let i = 0; i < args.length; ++i) {
      const arg = args[i];
      validateString(arg, "path");
      if (arg.length > 0) {
        path.push(arg);
      }
    }
    if (path.length === 0)
      return ".";
    return posix.normalize(ArrayPrototypeJoin(path, "/"));
  },
  /**
   * @param {string} from
   * @param {string} to
   * @returns {string}
   */
  relative(from, to) {
    validateString(from, "from");
    validateString(to, "to");
    if (from === to)
      return "";
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to)
      return "";
    const fromStart = 1;
    const fromEnd = from.length;
    const fromLen = fromEnd - fromStart;
    const toStart = 1;
    const toLen = to.length - toStart;
    const length = fromLen < toLen ? fromLen : toLen;
    let lastCommonSep = -1;
    let i = 0;
    for (; i < length; i++) {
      const fromCode = StringPrototypeCharCodeAt(from, fromStart + i);
      if (fromCode !== StringPrototypeCharCodeAt(to, toStart + i))
        break;
      else if (fromCode === CHAR_FORWARD_SLASH)
        lastCommonSep = i;
    }
    if (i === length) {
      if (toLen > length) {
        if (StringPrototypeCharCodeAt(to, toStart + i) === CHAR_FORWARD_SLASH) {
          return StringPrototypeSlice(to, toStart + i + 1);
        }
        if (i === 0) {
          return StringPrototypeSlice(to, toStart + i);
        }
      } else if (fromLen > length) {
        if (StringPrototypeCharCodeAt(from, fromStart + i) === CHAR_FORWARD_SLASH) {
          lastCommonSep = i;
        } else if (i === 0) {
          lastCommonSep = 0;
        }
      }
    }
    let out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || StringPrototypeCharCodeAt(from, i) === CHAR_FORWARD_SLASH) {
        out += out.length === 0 ? ".." : "/..";
      }
    }
    return `${out}${StringPrototypeSlice(to, toStart + lastCommonSep)}`;
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  toNamespacedPath(path) {
    return path;
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  dirname(path) {
    validateString(path, "path");
    if (path.length === 0)
      return ".";
    const hasRoot = StringPrototypeCharCodeAt(path, 0) === CHAR_FORWARD_SLASH;
    let end = -1;
    let matchedSlash = true;
    for (let i = path.length - 1; i >= 1; --i) {
      if (StringPrototypeCharCodeAt(path, i) === CHAR_FORWARD_SLASH) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1)
      return hasRoot ? "/" : ".";
    if (hasRoot && end === 1)
      return "//";
    return StringPrototypeSlice(path, 0, end);
  },
  /**
   * @param {string} path
   * @param {string} [suffix]
   * @returns {string}
   */
  basename(path, suffix) {
    if (suffix !== void 0)
      validateString(suffix, "suffix");
    validateString(path, "path");
    let start = 0;
    let end = -1;
    let matchedSlash = true;
    if (suffix !== void 0 && suffix.length > 0 && suffix.length <= path.length) {
      if (suffix === path)
        return "";
      let extIdx = suffix.length - 1;
      let firstNonSlashEnd = -1;
      for (let i = path.length - 1; i >= 0; --i) {
        const code = StringPrototypeCharCodeAt(path, i);
        if (code === CHAR_FORWARD_SLASH) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code === StringPrototypeCharCodeAt(suffix, extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end)
        end = firstNonSlashEnd;
      else if (end === -1)
        end = path.length;
      return StringPrototypeSlice(path, start, end);
    }
    for (let i = path.length - 1; i >= 0; --i) {
      if (StringPrototypeCharCodeAt(path, i) === CHAR_FORWARD_SLASH) {
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
    }
    if (end === -1)
      return "";
    return StringPrototypeSlice(path, start, end);
  },
  /**
   * @param {string} path
   * @returns {string}
   */
  extname(path) {
    validateString(path, "path");
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;
    for (let i = path.length - 1; i >= 0; --i) {
      const char = path[i];
      if (char === "/") {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (char === ".") {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return StringPrototypeSlice(path, startDot, end);
  },
  format: FunctionPrototypeBind(_format, null, "/"),
  /**
   * @param {string} path
   * @returns {{
   *   dir: string;
   *   root: string;
   *   base: string;
   *   name: string;
   *   ext: string;
   *   }}
   */
  parse(path) {
    validateString(path, "path");
    const ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path.length === 0)
      return ret;
    const isAbsolute2 = StringPrototypeCharCodeAt(path, 0) === CHAR_FORWARD_SLASH;
    let start;
    if (isAbsolute2) {
      ret.root = "/";
      start = 1;
    } else {
      start = 0;
    }
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;
    for (; i >= start; --i) {
      const code = StringPrototypeCharCodeAt(path, i);
      if (code === CHAR_FORWARD_SLASH) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code === CHAR_DOT) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (end !== -1) {
      const start2 = startPart === 0 && isAbsolute2 ? 1 : startPart;
      if (startDot === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        ret.base = ret.name = StringPrototypeSlice(path, start2, end);
      } else {
        ret.name = StringPrototypeSlice(path, start2, startDot);
        ret.base = StringPrototypeSlice(path, start2, end);
        ret.ext = StringPrototypeSlice(path, startDot, end);
      }
    }
    if (startPart > 0)
      ret.dir = StringPrototypeSlice(path, 0, startPart - 1);
    else if (isAbsolute2)
      ret.dir = "/";
    return ret;
  },
  matchesGlob(path, pattern) {
    return glob(path, pattern, false);
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
posix.win32 = win32.win32 = win32;
posix.posix = win32.posix = posix;
win32._makeLong = win32.toNamespacedPath;
posix._makeLong = posix.toNamespacedPath;

// src/shared/path.ts
var resolve = posix.resolve;
var normalize = posix.normalize;
var isAbsolute = posix.isAbsolute;
var join = posix.join;
var relative = posix.relative;
var toNamespacedPath = posix.toNamespacedPath;
var dirname = posix.dirname;
var basename = posix.basename;
var extname = posix.extname;
var format = posix.format;
var parse = posix.parse;
var matchesGlob = posix.matchesGlob;
var path_default = posix;

// src/shared/resolve.ts
var ResolveError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.code = code;
  }
};
var BUILTIN_MODULES = [
  "_http_agent",
  "_http_client",
  "_http_common",
  "_http_incoming",
  "_http_outgoing",
  "_http_server",
  "_stream_duplex",
  "_stream_passthrough",
  "_stream_readable",
  "_stream_transform",
  "_stream_wrap",
  "_stream_writable",
  "_tls_common",
  "_tls_wrap",
  "assert",
  "assert/strict",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "dns/promises",
  "domain",
  "events",
  "fs",
  "fs/promises",
  "http",
  "http2",
  "https",
  "inspector",
  "inspector/promises",
  "module",
  "net",
  "os",
  "path",
  "path/posix",
  "path/win32",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "readline/promises",
  "repl",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
  "sys",
  "timers",
  "timers/promises",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "util/types",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib"
];
var BUILTIN_SET = new Set(BUILTIN_MODULES);
var NODE_ONLY = /* @__PURE__ */ new Set(["test", "test/reporters", "sqlite", "sea"]);
function builtinName(spec) {
  if (spec.startsWith("node:")) {
    const n = spec.slice(5);
    if (BUILTIN_SET.has(n) || NODE_ONLY.has(n)) return n;
    return null;
  }
  return BUILTIN_SET.has(spec) ? spec : null;
}
var CJS_CONDITIONS = ["require", "node", "module-sync", "default"];
var ESM_CONDITIONS = ["import", "node", "module-sync", "default"];
var Resolver = class {
  constructor(host) {
    this.host = host;
  }
  host;
  pkgCache = /* @__PURE__ */ new Map();
  readPackageJson(file) {
    const v = this.host.version ? this.host.version(file) : null;
    const hit = this.pkgCache.get(file);
    if (hit && (hit.v === v || !this.host.version) && v !== null) return hit.pkg;
    const text = this.host.readText(file);
    let pkg = null;
    if (text !== null) {
      try {
        pkg = JSON.parse(text);
      } catch {
        throw new ResolveError("ERR_INVALID_PACKAGE_CONFIG", `Invalid package config ${file}.`);
      }
    }
    if (this.pkgCache.size > 5e3) this.pkgCache.clear();
    this.pkgCache.set(file, { v, pkg });
    return pkg;
  }
  /** Finds the nearest package.json scope for a file. */
  findPackageScope(file) {
    let dir = dirname(file);
    for (; ; ) {
      if (basename(dir) === "node_modules") return null;
      const pj = join(dir, "package.json");
      if (this.host.kind(pj) === "file") {
        const pkg = this.readPackageJson(pj);
        if (pkg) return { dir, pkg };
      }
      const parent = dirname(dir);
      if (parent === dir) return null;
      dir = parent;
    }
  }
  /** Module format for a file path: 'module' | 'commonjs' | 'json' | 'wasm' | 'addon' | 'typescript' | null (detect). */
  formatOf(file) {
    const ext = extname(file);
    switch (ext) {
      case ".mjs":
        return "module";
      case ".cjs":
        return "commonjs";
      case ".json":
        return "json";
      case ".wasm":
        return "wasm";
      case ".node":
        return "addon";
      case ".mts":
        return "module-typescript";
      case ".cts":
        return "commonjs-typescript";
    }
    const scope = this.findPackageScope(file);
    const type = scope?.pkg.type;
    if (ext === ".ts") return type === "module" ? "module-typescript" : type === "commonjs" ? "commonjs-typescript" : "module-typescript";
    if (type === "module") return "module";
    if (type === "commonjs") return "commonjs";
    return null;
  }
  // ---------------------------------------------------------------------------
  // CommonJS
  resolveCjs(spec, fromDir, opts = {}) {
    const exts = opts.extensions ?? [".js", ".json", ".node"];
    const conditions = opts.conditions ?? CJS_CONDITIONS;
    const b = builtinName(spec);
    if (b && (spec.startsWith("node:") || !this.isShadowed(spec))) return "node:" + b;
    if (spec.startsWith("node:")) throw new ResolveError("ERR_UNKNOWN_BUILTIN_MODULE", `No such built-in module: ${spec}`);
    let file = null;
    if (spec.startsWith("file://")) spec = fileURLToPathLoose(spec);
    if (spec.startsWith("/") || spec === "." || spec === ".." || spec.startsWith("./") || spec.startsWith("../")) {
      const abs = resolve(fromDir, spec);
      file = this.loadAsFile(abs, exts) ?? this.loadAsDirectory(abs, exts);
      if (!file && spec.endsWith("/")) file = this.loadAsDirectory(abs, exts);
    } else if (spec.startsWith("#")) {
      file = this.packageImports(spec, fromDir, conditions, true, exts);
    } else {
      file = this.packageSelf(spec, fromDir, conditions, true, exts);
      if (!file) {
        const dirs = opts.paths ?? this.nodeModulesPaths(fromDir);
        for (const dir of dirs) {
          file = this.loadNodeModule(spec, dir, conditions, exts);
          if (file) break;
        }
      }
    }
    if (!file) {
      const err = new ResolveError("MODULE_NOT_FOUND", `Cannot find module '${spec}'`);
      throw err;
    }
    return this.real(file);
  }
  isShadowed(_spec) {
    return false;
  }
  real(p) {
    try {
      return this.host.realpath(p);
    } catch {
      return p;
    }
  }
  nodeModulesPaths(fromDir) {
    const out = [];
    let dir = resolve(fromDir);
    for (; ; ) {
      if (basename(dir) !== "node_modules") out.push(join(dir, "node_modules"));
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
    out.push("/home/user/.node_modules", "/home/user/.node_libraries", "/usr/lib/node");
    return out;
  }
  loadAsFile(p, exts) {
    if (this.host.kind(p) === "file") return p;
    for (const e of exts) if (this.host.kind(p + e) === "file") return p + e;
    return null;
  }
  loadIndex(p, exts) {
    for (const e of exts) {
      const f = join(p, "index" + e);
      if (this.host.kind(f) === "file") return f;
    }
    return null;
  }
  loadAsDirectory(p, exts) {
    if (this.host.kind(p) !== "dir") return null;
    const pj = join(p, "package.json");
    if (this.host.kind(pj) === "file") {
      const pkg = this.readPackageJson(pj);
      if (pkg && typeof pkg.main === "string" && pkg.main) {
        const m = resolve(p, pkg.main);
        const f = this.loadAsFile(m, exts) ?? this.loadIndex(m, exts);
        if (f) return f;
      }
    }
    return this.loadIndex(p, exts);
  }
  splitSpec(spec) {
    let name;
    if (spec.startsWith("@")) {
      const i = spec.indexOf("/");
      const j = i === -1 ? -1 : spec.indexOf("/", i + 1);
      name = j === -1 ? spec : spec.slice(0, j);
    } else {
      const i = spec.indexOf("/");
      name = i === -1 ? spec : spec.slice(0, i);
    }
    return { name, sub: "." + spec.slice(name.length) };
  }
  loadNodeModule(spec, nmDir, conditions, exts) {
    const { name, sub } = this.splitSpec(spec);
    const pkgDir = join(nmDir, name);
    if (this.host.kind(pkgDir) !== "dir") return null;
    const pkg = this.readPackageJson(join(pkgDir, "package.json"));
    if (pkg && pkg.exports !== void 0 && pkg.exports !== null) {
      const r = this.packageExportsResolve(pkgDir, sub, pkg.exports, conditions, spec);
      return this.host.kind(r) === "file" ? r : this.notFoundExport(r, spec);
    }
    const abs = join(nmDir, spec);
    return this.loadAsFile(abs, exts) ?? this.loadAsDirectory(abs, exts);
  }
  notFoundExport(r, spec) {
    throw new ResolveError("MODULE_NOT_FOUND", `Cannot find module '${r}' (resolved from '${spec}')`);
  }
  packageSelf(spec, fromDir, conditions, cjs, exts) {
    const scope = this.findPackageScope(join(fromDir, "x"));
    if (!scope || !scope.pkg.name || scope.pkg.exports === void 0 || scope.pkg.exports === null) return null;
    const { name, sub } = this.splitSpec(spec);
    if (name !== scope.pkg.name) return null;
    const r = this.packageExportsResolve(scope.dir, sub, scope.pkg.exports, conditions, spec);
    void cjs;
    void exts;
    return this.host.kind(r) === "file" ? r : null;
  }
  // ---------------------------------------------------------------------------
  // exports / imports (shared by CJS and ESM)
  packageExportsResolve(pkgDir, sub, exports, conditions, spec) {
    let map = exports;
    if (typeof exports === "string" || Array.isArray(exports) || exports && typeof exports === "object" && !Object.keys(exports).some((k2) => k2.startsWith("."))) {
      map = { ".": exports };
    }
    const obj = map;
    if (Object.prototype.hasOwnProperty.call(obj, sub) && !sub.includes("*")) {
      const r = this.targetResolve(pkgDir, obj[sub], "", false, false, conditions);
      if (r) return r;
      throw this.notExported(sub, pkgDir, spec);
    }
    let bestKey = "";
    let bestSub = "";
    for (const key of Object.keys(obj)) {
      const star = key.indexOf("*");
      if (star === -1) {
        if (key.endsWith("/") && sub.startsWith(key) && key.length > bestKey.length) {
          bestKey = key;
          bestSub = sub.slice(key.length);
        }
        continue;
      }
      const prefix = key.slice(0, star);
      const suffix = key.slice(star + 1);
      if (sub.startsWith(prefix) && sub !== prefix && (suffix === "" || sub.endsWith(suffix) && sub.length >= key.length)) {
        if (patternKeyCompare(bestKey, key) === 1) {
          bestKey = key;
          bestSub = sub.slice(prefix.length, sub.length - suffix.length);
        }
      }
    }
    if (bestKey) {
      const r = this.targetResolve(pkgDir, obj[bestKey], bestSub, bestKey.includes("*"), !bestKey.includes("*"), conditions);
      if (r) return r;
    }
    throw this.notExported(sub, pkgDir, spec);
  }
  notExported(sub, pkgDir, spec) {
    if (sub === ".") return new ResolveError("ERR_PACKAGE_PATH_NOT_EXPORTED", `No "exports" main defined in ${pkgDir}/package.json (resolving '${spec}')`);
    return new ResolveError("ERR_PACKAGE_PATH_NOT_EXPORTED", `Package subpath '${sub}' is not defined by "exports" in ${pkgDir}/package.json (resolving '${spec}')`);
  }
  targetResolve(pkgDir, target, subpath, pattern, folder, conditions, internal = false) {
    if (typeof target === "string") {
      if (!target.startsWith("./")) {
        if (internal && !target.startsWith("../") && !target.startsWith("/")) {
          return "bare:" + (pattern ? target.split("*").join(subpath) : target + subpath);
        }
        return null;
      }
      const resolved = pattern ? target.split("*").join(subpath) : target + (folder ? subpath : "");
      return join(pkgDir, resolved);
    }
    if (Array.isArray(target)) {
      for (const t of target) {
        try {
          const r = this.targetResolve(pkgDir, t, subpath, pattern, folder, conditions, internal);
          if (r) return r;
        } catch {
        }
      }
      return null;
    }
    if (target && typeof target === "object") {
      for (const [k2, v] of Object.entries(target)) {
        if (k2 === "default" || conditions.includes(k2)) {
          const r = this.targetResolve(pkgDir, v, subpath, pattern, folder, conditions, internal);
          if (r) return r;
          if (r === null && v === null) return null;
        }
      }
      return null;
    }
    return null;
  }
  packageImports(spec, fromDir, conditions, cjs, exts) {
    const scope = this.findPackageScope(join(fromDir, "x"));
    if (!scope || !scope.pkg.imports || typeof scope.pkg.imports !== "object") {
      throw new ResolveError(cjs ? "MODULE_NOT_FOUND" : "ERR_PACKAGE_IMPORT_NOT_DEFINED", `Package import specifier "${spec}" is not defined`);
    }
    const obj = scope.pkg.imports;
    let r = null;
    if (Object.prototype.hasOwnProperty.call(obj, spec) && !spec.includes("*")) {
      r = this.targetResolve(scope.dir, obj[spec], "", false, false, conditions, true);
    } else {
      let bestKey = "";
      let bestSub = "";
      for (const key of Object.keys(obj)) {
        const star = key.indexOf("*");
        if (star === -1) continue;
        const prefix = key.slice(0, star);
        const suffix = key.slice(star + 1);
        if (spec.startsWith(prefix) && spec !== prefix && (suffix === "" || spec.endsWith(suffix))) {
          if (patternKeyCompare(bestKey, key) === 1) {
            bestKey = key;
            bestSub = spec.slice(prefix.length, spec.length - suffix.length);
          }
        }
      }
      if (bestKey) r = this.targetResolve(scope.dir, obj[bestKey], bestSub, true, false, conditions, true);
    }
    if (!r) throw new ResolveError(cjs ? "MODULE_NOT_FOUND" : "ERR_PACKAGE_IMPORT_NOT_DEFINED", `Package import specifier "${spec}" is not defined in ${scope.dir}/package.json`);
    if (r.startsWith("bare:")) {
      const bare = r.slice(5);
      return cjs ? this.resolveCjs(bare, scope.dir, { conditions, extensions: exts }) : this.resolveEsm(bare, scope.dir + "/package.json", conditions).path;
    }
    return r;
  }
  // ---------------------------------------------------------------------------
  // ESM
  /** Resolves an ESM specifier from a parent file path. Returns a path or `node:x`. */
  resolveEsm(spec, parentFile, conditions = ESM_CONDITIONS) {
    const b = builtinName(spec);
    if (b) return { path: "node:" + b, query: "" };
    if (spec.startsWith("node:")) throw new ResolveError("ERR_UNKNOWN_BUILTIN_MODULE", `No such built-in module: ${spec}`);
    const parentDir = dirname(parentFile);
    let query = "";
    const cut = (s) => {
      const q = s.startsWith("#") ? s.indexOf("?") : s.search(/[?#]/);
      if (q !== -1) {
        query = s.slice(q);
        return s.slice(0, q);
      }
      return s;
    };
    let file;
    if (spec.startsWith("file:")) {
      file = fileURLToPathLoose(cut(spec));
    } else if (spec.startsWith("/") || spec.startsWith("./") || spec.startsWith("../") || spec === "." || spec === "..") {
      file = resolve(parentDir, safeDecode(cut(spec)));
    } else if (/^[a-z][a-z0-9+.-]*:/i.test(spec)) {
      if (spec.startsWith("data:")) return { path: spec, query: "" };
      throw new ResolveError("ERR_UNSUPPORTED_ESM_URL_SCHEME", `Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. Received protocol '${spec.split(":")[0]}:'`);
    } else if (spec.startsWith("#")) {
      file = this.packageImports(cut(spec), parentDir, conditions, false, []);
    } else {
      file = this.packageResolve(cut(spec), parentDir, conditions);
    }
    const kind = this.host.kind(file);
    if (kind === "dir") {
      const idx = this.loadIndex(file, [".js", ".mjs", ".json"]);
      if (idx) return { path: this.real(idx), query };
      throw new ResolveError("ERR_UNSUPPORTED_DIR_IMPORT", `Directory import '${file}' is not supported resolving ES modules imported from ${parentFile}`);
    }
    if (kind !== "file") {
      const alt = this.loadAsFile(file, [".js", ".mjs", ".cjs", ".json"]);
      if (alt && !spec.startsWith(".") && !spec.startsWith("/")) return { path: this.real(alt), query };
      if (alt) return { path: this.real(alt), query };
      throw new ResolveError("ERR_MODULE_NOT_FOUND", `Cannot find module '${file}' imported from ${parentFile}`);
    }
    return { path: this.real(file), query };
  }
  packageResolve(spec, parentDir, conditions) {
    const { name, sub } = this.splitSpec(spec);
    if (!name || name.startsWith(".") || name.includes("\\") || name.includes("%")) {
      throw new ResolveError("ERR_INVALID_MODULE_SPECIFIER", `Invalid module "${spec}"`);
    }
    const self = this.packageSelf(spec, parentDir, conditions, false, []);
    if (self) return self;
    for (const nm of this.nodeModulesPaths(parentDir)) {
      const pkgDir = join(nm, name);
      if (this.host.kind(pkgDir) !== "dir") continue;
      const pkg = this.readPackageJson(join(pkgDir, "package.json"));
      if (pkg && pkg.exports !== void 0 && pkg.exports !== null) {
        return this.packageExportsResolve(pkgDir, sub, pkg.exports, conditions, spec);
      }
      if (sub === ".") {
        const main = this.legacyMain(pkgDir, pkg);
        if (main) return main;
        throw new ResolveError("ERR_MODULE_NOT_FOUND", `Cannot find package '${pkgDir}' imported from ${parentDir}`);
      }
      return join(pkgDir, sub);
    }
    throw new ResolveError("ERR_MODULE_NOT_FOUND", `Cannot find package '${name}' imported from ${parentDir}/`);
  }
  legacyMain(pkgDir, pkg) {
    const exts = [".js", ".json", ".node"];
    if (pkg && typeof pkg.main === "string" && pkg.main) {
      const m = resolve(pkgDir, pkg.main);
      const f = this.loadAsFile(m, exts) ?? this.loadIndex(m, exts);
      if (f) return f;
    }
    return this.loadIndex(pkgDir, exts);
  }
};
function patternKeyCompare(a, b) {
  if (!a) return 1;
  const aStar = a.indexOf("*");
  const bStar = b.indexOf("*");
  const baseA = aStar === -1 ? a.length : aStar + 1;
  const baseB = bStar === -1 ? b.length : bStar + 1;
  if (baseA > baseB) return -1;
  if (baseB > baseA) return 1;
  if (aStar === -1) return 1;
  if (bStar === -1) return -1;
  if (a.length > b.length) return -1;
  if (b.length > a.length) return 1;
  return 0;
}
function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
function fileURLToPathLoose(u) {
  let s = u.replace(/^file:\/\/[^/]*/, "").replace(/^file:/, "");
  const q = s.search(/[?#]/);
  if (q !== -1) s = s.slice(0, q);
  return safeDecode(s) || "/";
}
function pathToFileURLString(p) {
  return "file://" + encodePathForUrl(p);
}
function encodePathForUrl(p) {
  return p.split("/").map((seg) => encodeURIComponent(seg).replace(/%40/g, "@").replace(/%2B/g, "+").replace(/%3A/g, ":").replace(/%2C/g, ",").replace(/%3D/g, "=").replace(/%24/g, "$").replace(/%26/g, "&").replace(/%21/g, "!").replace(/%27/g, "'").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2A/g, "*").replace(/%7E/g, "~")).join("/");
}

// src/shared/errno.ts
var errnoCodes = {
  EPERM: 1,
  ENOENT: 2,
  ESRCH: 3,
  EINTR: 4,
  EIO: 5,
  ENXIO: 6,
  E2BIG: 7,
  ENOEXEC: 8,
  EBADF: 9,
  ECHILD: 10,
  EAGAIN: 11,
  ENOMEM: 12,
  EACCES: 13,
  EFAULT: 14,
  EBUSY: 16,
  EEXIST: 17,
  EXDEV: 18,
  ENODEV: 19,
  ENOTDIR: 20,
  EISDIR: 21,
  EINVAL: 22,
  ENFILE: 23,
  EMFILE: 24,
  ENOTTY: 25,
  EFBIG: 27,
  ENOSPC: 28,
  ESPIPE: 29,
  EROFS: 30,
  EMLINK: 31,
  EPIPE: 32,
  ERANGE: 34,
  ENAMETOOLONG: 36,
  ENOSYS: 38,
  ENOTEMPTY: 39,
  ELOOP: 40,
  ENOTSOCK: 88,
  ENOTSUP: 95,
  EADDRINUSE: 98,
  EADDRNOTAVAIL: 99,
  ENETUNREACH: 101,
  ECONNRESET: 104,
  ENOTCONN: 107,
  ETIMEDOUT: 110,
  ECONNREFUSED: 111,
  EHOSTUNREACH: 113,
  ECANCELED: 125
};
var messages = {
  EPERM: "operation not permitted",
  ENOENT: "no such file or directory",
  ESRCH: "no such process",
  EBADF: "bad file descriptor",
  ECHILD: "no child processes",
  EAGAIN: "resource temporarily unavailable",
  EACCES: "permission denied",
  EBUSY: "resource busy or locked",
  EEXIST: "file already exists",
  EXDEV: "cross-device link not permitted",
  ENOTDIR: "not a directory",
  EISDIR: "illegal operation on a directory",
  EINVAL: "invalid argument",
  EMFILE: "too many open files",
  ENOTTY: "inappropriate ioctl for device",
  ENOSPC: "no space left on device",
  ESPIPE: "invalid seek",
  EROFS: "read-only file system",
  EPIPE: "broken pipe",
  ENAMETOOLONG: "name too long",
  ENOSYS: "function not implemented",
  ENOTEMPTY: "directory not empty",
  ELOOP: "too many symbolic links encountered",
  ENOTSOCK: "socket operation on non-socket",
  ENOTSUP: "operation not supported on socket",
  EADDRINUSE: "address already in use",
  ECONNREFUSED: "connection refused",
  ECONNRESET: "connection reset by peer",
  ENOEXEC: "exec format error",
  ETIMEDOUT: "connection timed out",
  ENOTCONN: "socket is not connected"
};
function errnoMessage(code) {
  return messages[code] ?? code.toLowerCase();
}
var KernelError = class extends Error {
  code;
  constructor(code, message) {
    super(message ?? errnoMessage(code));
    this.code = code;
  }
};
function kerr(code) {
  return new KernelError(code);
}
function nodeSystemError(code, syscall, path, dest) {
  let msg = `${code}: ${errnoMessage(code)}`;
  if (syscall) msg += `, ${syscall}`;
  if (path !== void 0) msg += ` '${path}'`;
  if (dest !== void 0) msg += ` -> '${dest}'`;
  const err = new Error(msg);
  err.code = code;
  const n = errnoCodes[code];
  if (n !== void 0) err.errno = -n;
  if (syscall) err.syscall = syscall;
  if (path !== void 0) err.path = path;
  if (dest !== void 0) err.dest = dest;
  return err;
}

// src/shared/syncchan.ts
var HEADER_BYTES = 64;
var DEFAULT_CHANNEL_BYTES = 4 * 1024 * 1024;
var FLAG_MORE = 1;
var enc = new TextEncoder();
var dec = new TextDecoder();
function createChannelBuffer(size = DEFAULT_CHANNEL_BYTES) {
  return new SharedArrayBuffer(size);
}
function encodeMessage(m) {
  const j = enc.encode(JSON.stringify(m.json ?? null));
  const bl = m.bin ? m.bin.length : 0;
  if (!bl) return { bytes: j, jl: j.length, bl: 0 };
  const bytes = new Uint8Array(j.length + bl);
  bytes.set(j, 0);
  bytes.set(m.bin, j.length);
  return { bytes, jl: j.length, bl };
}
function decodeMessage(bytes, jl, bl) {
  const json = JSON.parse(dec.decode(bytes.slice(0, jl)));
  const bin = bl ? bytes.slice(jl, jl + bl) : void 0;
  return { json, bin };
}
var SyncClient = class {
  constructor(sab, notify) {
    this.sab = sab;
    this.notify = notify;
    this.ctl = new Int32Array(sab, 0, HEADER_BYTES / 4);
    this.data = new Uint8Array(sab, HEADER_BYTES);
    this.cap = this.data.length;
  }
  sab;
  notify;
  ctl;
  data;
  cap;
  roundTrip() {
    Atomics.store(this.ctl, 0, 1);
    this.notify();
    while (Atomics.load(this.ctl, 0) === 1) Atomics.wait(this.ctl, 0, 1);
  }
  call(m) {
    const { bytes, jl, bl } = encodeMessage(m);
    const total = bytes.length;
    let off = 0;
    for (; ; ) {
      const n2 = Math.min(this.cap, total - off);
      this.data.set(bytes.subarray(off, off + n2), 0);
      off += n2;
      this.ctl[1] = jl;
      this.ctl[2] = bl;
      this.ctl[3] = n2;
      this.ctl[4] = off < total ? FLAG_MORE : 0;
      this.roundTrip();
      if (off >= total) break;
    }
    const rjl = this.ctl[1];
    const rbl = this.ctl[2];
    const rtotal = rjl + rbl;
    let n = this.ctl[3];
    if (!(this.ctl[4] & FLAG_MORE)) {
      const res = decodeMessage(this.data.subarray(0, n), rjl, rbl);
      Atomics.store(this.ctl, 0, 0);
      return res;
    }
    const buf = new Uint8Array(rtotal);
    let got = 0;
    for (; ; ) {
      buf.set(this.data.subarray(0, n), got);
      got += n;
      if (!(this.ctl[4] & FLAG_MORE)) break;
      this.ctl[1] = 0;
      this.ctl[2] = 0;
      this.ctl[3] = 0;
      this.ctl[4] = 0;
      this.roundTrip();
      n = this.ctl[3];
    }
    Atomics.store(this.ctl, 0, 0);
    return decodeMessage(buf, rjl, rbl);
  }
};
var SyncServer = class {
  constructor(sab) {
    this.sab = sab;
    this.ctl = new Int32Array(sab, 0, HEADER_BYTES / 4);
    this.data = new Uint8Array(sab, HEADER_BYTES);
    this.cap = this.data.length;
  }
  sab;
  ctl;
  data;
  cap;
  inbuf = null;
  inOff = 0;
  outbuf = null;
  outOff = 0;
  outJl = 0;
  outBl = 0;
  /** Returns the request when fully received, or null if this was an intermediate round. */
  receive() {
    if (Atomics.load(this.ctl, 0) !== 1) return null;
    if (this.outbuf) {
      this.sendNextChunk();
      return null;
    }
    const jl = this.ctl[1];
    const bl = this.ctl[2];
    const n = this.ctl[3];
    const more = this.ctl[4] & FLAG_MORE;
    if (!more && !this.inbuf) {
      return decodeMessage(this.data.subarray(0, n), jl, bl);
    }
    if (!this.inbuf) {
      this.inbuf = new Uint8Array(jl + bl);
      this.inOff = 0;
    }
    this.inbuf.set(this.data.subarray(0, n), this.inOff);
    this.inOff += n;
    if (more) {
      this.ctl[3] = 0;
      this.ctl[4] = 0;
      this.wake();
      return null;
    }
    const buf = this.inbuf;
    this.inbuf = null;
    return decodeMessage(buf, jl, bl);
  }
  respond(m) {
    const { bytes, jl, bl } = encodeMessage(m);
    if (bytes.length <= this.cap) {
      this.data.set(bytes, 0);
      this.ctl[1] = jl;
      this.ctl[2] = bl;
      this.ctl[3] = bytes.length;
      this.ctl[4] = 0;
      this.wake();
      return;
    }
    this.outbuf = bytes;
    this.outOff = 0;
    this.outJl = jl;
    this.outBl = bl;
    this.sendNextChunk();
  }
  sendNextChunk() {
    const buf = this.outbuf;
    const n = Math.min(this.cap, buf.length - this.outOff);
    this.data.set(buf.subarray(this.outOff, this.outOff + n), 0);
    this.outOff += n;
    this.ctl[1] = this.outJl;
    this.ctl[2] = this.outBl;
    this.ctl[3] = n;
    const more = this.outOff < buf.length;
    this.ctl[4] = more ? FLAG_MORE : 0;
    if (!more) this.outbuf = null;
    this.wake();
  }
  wake() {
    Atomics.store(this.ctl, 0, 2);
    Atomics.notify(this.ctl, 0);
  }
};

// node_modules/es-module-lexer/dist/lexer.js
var A = false;
var Q = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0];
var B = "undefined" != typeof Buffer;
var E = /\r\n?/g;
function C(A2, Q2, B2) {
  if (B2 < 1 || Q2 + B2 > A2.length) throw new SyntaxError();
  let E2 = 0;
  const C2 = Q2 + B2;
  for (let B3 = Q2; B3 < C2; B3++) {
    const Q3 = A2.charCodeAt(B3), C3 = 32 | Q3, g2 = Q3 >= 48 && Q3 <= 57 ? Q3 - 48 : C3 >= 97 && C3 <= 102 ? C3 - 87 : -1;
    if (-1 === g2) throw new SyntaxError();
    E2 = 16 * E2 + g2;
  }
  return E2;
}
function parse2(R2, H2 = "@") {
  w || k();
  const o = R2.length + 1, L = (w.__heap_base.value || w.__heap_base) + 4 * o + 16 - w.memory.buffer.byteLength;
  L > 0 && w.memory.grow(Math.ceil(L / 65536));
  const G = w.sa(o - 1);
  if (R2.length >= 64 && B) Buffer.from(w.memory.buffer, G, 2 * (o - 1)).write(R2, "utf16le");
  else {
    const A2 = w.memory.buffer;
    (null == D ? void 0 : D.buffer) !== A2 && (D = new Uint16Array(A2, G)), (Q ? I : g)(R2, D);
  }
  if (!w.parse()) throw Object.assign(new Error(`Parse error ${H2}:${R2.slice(0, w.e()).split("\n").length}:${w.e() - R2.lastIndexOf("\n", w.e() - 1)}`), { idx: w.e() });
  const N = [], M = [];
  for (; w.ri(); ) {
    const A2 = w.is(), Q2 = w.ie(), B2 = w.it(), E2 = 15 & B2, C2 = w.ai(), g2 = w.id(), I2 = w.ss(), D2 = w.se(), H3 = w.ip();
    let k2, o2 = false;
    if (1 & H3 ? k2 = i(-1 === g2 ? A2 : A2 + 1, -1 === g2 ? Q2 : Q2 - 1, A2, !!(2 & H3)) : -1 !== g2 && "`" === R2[A2] && (k2 = U(A2, Q2), o2 = void 0 !== k2), 3 === E2) N.push({ type: "import-meta", specifier: null, typeOnly: false, start: A2, end: Q2, importStart: I2, importEnd: D2 });
    else if (-1 !== g2) {
      const w2 = 5 === E2 ? "source" : 7 === E2 ? "defer" : null;
      N.push({ type: "dynamic", specifier: k2, glob: o2, phase: w2, start: A2, end: Q2, importStart: I2, importEnd: D2, dynamicStart: g2, attributes: null, attributesStart: C2, probablyTypeOnly: !!(16 & B2) });
    } else {
      let g3 = null;
      if (-1 !== C2) {
        for (g3 = [], w.rsa(); w.ra(); ) {
          const A3 = w.aks(), Q3 = w.ake(), B3 = w.avs(), E3 = w.ave();
          g3.push([Y(A3, Q3), Y(B3, E3)]);
        }
        0 === g3.length && (g3 = null);
      }
      const R3 = 4 === E2 ? "source" : 6 === E2 ? "defer" : null;
      N.push({ type: 8 === E2 ? "reexport-star" : "static", specifier: k2, phase: R3, start: A2, end: Q2, importStart: I2, importEnd: D2, attributes: g3, attributesStart: C2, typeOnly: !!(16 & B2) });
    }
  }
  let s = w.re();
  const J = 0 === s ? void 0 : new DataView(w.memory.buffer);
  for (; 0 !== s; ) {
    A;
    const Q2 = J.getUint32(s, true) - G >>> 1, B2 = J.getUint32(s + 4, true) - G >>> 1, E2 = J.getUint32(s + 8, true), C2 = 0 === E2 ? -1 : E2 - G >>> 1, g2 = J.getUint32(s + 12, true), I2 = 0 === g2 ? -1 : g2 - G >>> 1, D2 = J.getUint32(s + 16, true) - G >>> 1, R3 = J.getUint32(s + 20, true), H3 = J.getUint8(s + 24), k2 = J.getUint8(s + 25), o2 = !!(4 & k2);
    if (3 === H3) M.push({ type: "reexport-all", from: N[R3].specifier, importIndex: R3, start: Q2, end: B2, exportStart: D2, typeOnly: o2 });
    else {
      const A2 = Y(Q2, B2);
      if (1 === H3) {
        const E3 = C2 < 0 ? void 0 : Y(C2, I2);
        M.push({ type: "direct", name: A2, localName: E3, start: Q2, end: B2, localStart: C2, localEnd: I2, exportStart: D2, typeOnly: o2 });
      } else {
        const E3 = 3 & k2, g3 = 0 === E3 ? Y(C2, I2) : 1 === E3 ? "default" : null;
        M.push({ type: "reexport", name: A2, importName: g3, importNameStart: 0 === E3 ? C2 : -1, importNameEnd: 0 === E3 ? I2 : -1, from: N[R3].specifier, importIndex: R3, start: Q2, end: B2, exportStart: D2, typeOnly: o2 });
      }
    }
    s = w.re();
  }
  function i(A2, Q2, B2, g2 = false) {
    try {
      return (function(A3, Q3) {
        let B3 = A3.indexOf("\\");
        if (-1 === B3) return Q3 ? A3.replace(E, "\n") : A3;
        let g3 = A3.slice(0, B3), I2 = Q3 ? g3.replace(E, "\n") : g3;
        for (; ; ) {
          let D2 = B3 + 1;
          if (D2 >= A3.length) throw new SyntaxError();
          const w2 = A3.charCodeAt(D2++);
          switch (w2) {
            case 13:
              10 === A3.charCodeAt(D2) && D2++;
              break;
            case 10:
            case 8232:
            case 8233:
              break;
            case 114:
              I2 += "\r";
              break;
            case 110:
              I2 += "\n";
              break;
            case 116:
              I2 += "	";
              break;
            case 98:
              I2 += "\b";
              break;
            case 102:
              I2 += "\f";
              break;
            case 118:
              I2 += "\v";
              break;
            case 120:
              I2 += String.fromCharCode(C(A3, D2, 2)), D2 += 2;
              break;
            case 117: {
              let Q4;
              if (123 === A3.charCodeAt(D2)) {
                const B4 = A3.indexOf("}", ++D2);
                if (-1 === B4) throw new SyntaxError();
                Q4 = C(A3, D2, B4 - D2), D2 = B4 + 1;
              } else Q4 = C(A3, D2, 4), D2 += 4;
              if (Q4 > 1114111) throw new SyntaxError();
              Q4 <= 65535 ? I2 += String.fromCharCode(Q4) : (Q4 -= 65536, I2 += String.fromCharCode(55296 + (Q4 >> 10), 56320 + (1023 & Q4)));
              break;
            }
            case 48: {
              const Q4 = A3.charCodeAt(D2);
              if (Q4 >= 48 && Q4 <= 57) throw new SyntaxError();
              I2 += "\0";
              break;
            }
            default:
              if (w2 >= 49 && w2 <= 57) throw new SyntaxError();
              I2 += String.fromCharCode(w2);
          }
          const R3 = A3.indexOf("\\", D2);
          if (-1 === R3) return g3 = A3.slice(D2), I2 + (Q3 ? g3.replace(E, "\n") : g3);
          g3 = A3.slice(D2, R3), I2 += Q3 ? g3.replace(E, "\n") : g3, B3 = R3;
        }
      })(R2.slice(A2, Q2), g2);
    } catch (A3) {
      throw Object.assign(new Error(`Parse error ${H2}:${R2.slice(0, B2).split("\n").length}:${B2 - R2.lastIndexOf("\n", B2 - 1)}`), { idx: B2 });
    }
  }
  function Y(A2, Q2) {
    const B2 = R2.charCodeAt(A2);
    return 34 === B2 || 39 === B2 ? i(A2 + 1, Q2 - 1, A2) : R2.slice(A2, Q2);
  }
  function U(A2, Q2) {
    if (w.rts(), !w.rt()) return;
    let B2 = "", E2 = A2 + 1, C2 = A2 + 1, g2 = w.te();
    for (; C2 < Q2; ) {
      const A3 = R2.charCodeAt(C2);
      if (96 === A3) break;
      92 !== A3 ? 42 !== A3 ? 36 === A3 && 123 === R2.charCodeAt(C2 + 1) && C2 + 2 <= g2 ? (B2 += R2.slice(E2, C2) + "*", C2 = E2 = g2, g2 = w.rt() ? w.te() : -1) : C2++ : (B2 += R2.slice(E2, C2) + "\\*", E2 = ++C2) : C2 += 2;
    }
    return B2 + R2.slice(E2, C2);
  }
  return [N, M, !!w.f(), !!w.ms()];
}
function g(A2, Q2) {
  const B2 = A2.length;
  let E2 = 0;
  for (; E2 < B2; ) {
    const B3 = A2.charCodeAt(E2);
    Q2[E2++] = (255 & B3) << 8 | B3 >>> 8;
  }
}
function I(A2, Q2) {
  const B2 = A2.length;
  let E2 = 0;
  for (; E2 < B2; ) Q2[E2] = A2.charCodeAt(E2++);
}
var D;
var w;
var R = () => {
  return A2 = "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RQRAQcgMKAIAIANBA3RqQQhrKAIAQQVHDQFBzAwoAgAgAUECdGpBBGsoAgAiASgCBA0BIAEgBEECajYCBCAEIAEoAixHBEAgAUEANgIkC0HYDCACQQJqNgIAQQEQKhogAUHYDCgCACIBNgIQQdgMIAFBAms2AgAMAQsgAw0AAkACQEG0DCgCAEEBag4DAAIBAgsgBkEMahArRQ0BCxAsC0GsDEHYDCgCADYCAAtBACEFQYEMLQAADQELQdgMKAIAIQEMAQsLIAZBEGokACAFC+ABAQJ/AkACQAJAIABBIkYgAEEnRnJFBEAgAEEvRg0BIABB4ABHDQNB3AwoAgAhAkHYDCgCACEAA0ACQCAAIgFBAmoiACACSw0AAkACQCAALwEAIgNB3ABrDgUAAwMDAgELIAFBBGohAAwCCyADQSRHDQEgAS8BBEH7AEcNAUHYDCABQQRqNgIAEEoaQdgMQdgMKAIAQQJrIgA2AgAMAQsLQdgMIAA2AgAMAgsgABAuDAELQdgMKAIALwECIgBBKkcEQCAAQS9HDQIQIgwBCyABQQFzECNBAQ8LQQEhAgsgAgvAAQECf0HYDCgCACEBQQEhAiAAQQBBARAqIgBBLEYbRQRAAn8CQAJAAkACQAJAIABBOmsOBgEEBAIEAQALIABBJkYgAEH8AEZyDQAgAEHlAEYNAiAAQS5HDQMLQdgMKAIAQQJqIQFBAQwDC0HYDCgCACIALwECQT5HDQEgAEEEaiEBQQEMAgtB2AwoAgAiAEECakH6CkEMEB4NACAALwEOECZFDQAgAEEOaiEBQQEMAQtBAAshAkHYDCABNgIACyACCykBAX8gAEGgAUYgAEEJayICQRdNQQBBASACdCABcRtyRQRAQQAPC0EBCwvdAwEAQYAIC9UDeABwAG8AcgB0AHAAbwByAHQAbABhAHMAcwByAG8AbQBlAHQAYQB2AG8AeQBpAGUAZABlAGwAZQBpAG4AcwB0AGEAbgB0AHkAcgBlAHQAdQByAGQAZQBiAHUAZwBnAGUAYQB3AGEAaQB0AGgAcgB3AGgAaQBsAGUAZgBvAHIAaQBmAGMAYQB0AGMAZgBpAG4AYQBsAGwAZQBsAHMAYgByAGUAYQBjAG8AbgB0AGkAbgBzAHkAbgBjAHUAbgBjAHQAaQBvAG4AbwB1AHIAYwBlAGUAZgBlAHIAOwB5AHAAZQBuAHQAZQByAGYAYQBjAGUAbgBlAHcAawBlAHkAbwBmAGkAbgBmAGUAcgB0AHkAcABlAG8AZgB1AG4AaQBxAHUAZQBpAG0AcABvAHIAdAByAGUAYQBkAG8AbgBsAHkAYQBiAHMAdAByAGEAYwB0AHQAaABlAG4AYwBhAHQAYwBoAGYAaQBuAGEAbABsAHkAZQBjAGwAYQByAGUAeAB0AGUAbgBkAHMAbgB1AG0AYQBtAGUAcwBwAGEAYwBlAG8AbgBzAHQAbwBkAHUAbABlAGUAcQB1AGkAcgBlAGwAbwBiAGEAbABzAGEAdABpAHMAZgBpAGUAcw==", "undefined" != typeof Buffer ? Buffer.from(A2, "base64") : Uint8Array.from(atob(A2), (A3) => A3.charCodeAt(0));
  var A2;
};
var H;
var init = () => H || (H = w ? Promise.resolve() : WebAssembly.compile(R()).then(WebAssembly.instantiate).then(({ exports: A2 }) => {
  w || (w = A2);
}));
var k = () => {
  if (w) return;
  const A2 = new WebAssembly.Module(R());
  w = new WebAssembly.Instance(A2).exports;
};

// src/node/native.ts
var webcrypto = globalThis.crypto;
var perf = globalThis.performance;
var nativeCrypto = webcrypto;
var rawRandom = webcrypto.getRandomValues.bind(webcrypto);
var getRandomValues = (a) => {
  if (a && typeof SharedArrayBuffer !== "undefined" && a.buffer instanceof SharedArrayBuffer) {
    const tmp = new Uint8Array(a.byteLength);
    rawRandom(tmp);
    new Uint8Array(a.buffer, a.byteOffset, a.byteLength).set(tmp);
    return a;
  }
  return rawRandom(a);
};
var randomUUID = webcrypto.randomUUID.bind(webcrypto);
var perfNow = perf.now.bind(perf);
var timeOrigin = perf.timeOrigin;

// src/node/wscodec.ts
function encodeClientFrame(data, opcode) {
  const len = data.length;
  let headerLen = 2;
  if (len >= 126 && len < 65536) headerLen += 2;
  else if (len >= 65536) headerLen += 8;
  const out = new Uint8Array(headerLen + 4 + len);
  out[0] = 128 | opcode;
  if (len < 126) out[1] = 128 | len;
  else if (len < 65536) {
    out[1] = 128 | 126;
    out[2] = len >> 8;
    out[3] = len & 255;
  } else {
    out[1] = 128 | 127;
    const dv = new DataView(out.buffer);
    dv.setUint32(2, Math.floor(len / 2 ** 32));
    dv.setUint32(6, len >>> 0);
  }
  const mask = getRandomValues(new Uint8Array(4));
  out.set(mask, headerLen);
  for (let i = 0; i < len; i++) out[headerLen + 4 + i] = data[i] ^ mask[i & 3];
  return out;
}
var FrameParser = class {
  constructor(onMessage) {
    this.onMessage = onMessage;
  }
  onMessage;
  buf = new Uint8Array(0);
  fragments = [];
  fragOpcode = 0;
  push(chunk) {
    const b = new Uint8Array(this.buf.length + chunk.length);
    b.set(this.buf);
    b.set(chunk, this.buf.length);
    this.buf = b;
    for (; ; ) {
      const f = this.next();
      if (!f) break;
      if (f.opcode === 0) {
        this.fragments.push(f.payload);
        if (f.fin) {
          const total = this.fragments.reduce((a, x) => a + x.length, 0);
          const all = new Uint8Array(total);
          let off = 0;
          for (const x of this.fragments) {
            all.set(x, off);
            off += x.length;
          }
          this.fragments = [];
          this.onMessage(this.fragOpcode, all);
        }
      } else if (f.opcode < 8 && !f.fin) {
        this.fragOpcode = f.opcode;
        this.fragments = [f.payload];
      } else {
        this.onMessage(f.opcode, f.payload);
      }
    }
  }
  next() {
    const b = this.buf;
    if (b.length < 2) return null;
    const fin = (b[0] & 128) !== 0;
    const opcode = b[0] & 15;
    const masked = (b[1] & 128) !== 0;
    let len = b[1] & 127;
    let off = 2;
    if (len === 126) {
      if (b.length < 4) return null;
      len = b[2] << 8 | b[3];
      off = 4;
    } else if (len === 127) {
      if (b.length < 10) return null;
      const dv = new DataView(b.buffer, b.byteOffset);
      len = dv.getUint32(2) * 2 ** 32 + dv.getUint32(6);
      off = 10;
    }
    let mask = null;
    if (masked) {
      if (b.length < off + 4) return null;
      mask = b.subarray(off, off + 4);
      off += 4;
    }
    if (b.length < off + len) return null;
    let payload = b.slice(off, off + len);
    if (mask) for (let i = 0; i < payload.length; i++) payload[i] ^= mask[i & 3];
    this.buf = b.slice(off + len);
    return { fin, opcode, payload };
  }
};

export {
  setCwdProvider,
  globToRegExp,
  resolve,
  normalize,
  isAbsolute,
  join,
  relative,
  dirname,
  basename,
  extname,
  path_default,
  KernelError,
  kerr,
  nodeSystemError,
  createChannelBuffer,
  SyncClient,
  SyncServer,
  parse2 as parse,
  init,
  ResolveError,
  BUILTIN_MODULES,
  builtinName,
  CJS_CONDITIONS,
  ESM_CONDITIONS,
  Resolver,
  fileURLToPathLoose,
  pathToFileURLString,
  encodePathForUrl,
  nativeCrypto,
  getRandomValues,
  randomUUID,
  perfNow,
  timeOrigin,
  encodeClientFrame,
  FrameParser,
  NODE_VERSION,
  init_version
};
//# sourceMappingURL=chunk-X6I73DHQ.js.map
