import {
  BUILTIN_MODULES,
  FrameParser,
  NODE_VERSION,
  SyncClient,
  basename,
  builtinName,
  dirname,
  encodeClientFrame,
  encodePathForUrl,
  fileURLToPathLoose,
  getRandomValues,
  globToRegExp,
  init,
  init_version,
  isAbsolute,
  join,
  nativeCrypto,
  nodeSystemError,
  normalize,
  parse,
  pathToFileURLString,
  path_default,
  perfNow,
  randomUUID,
  relative,
  resolve,
  setCwdProvider,
  timeOrigin
} from "./chunks/chunk-X6I73DHQ.js";
import {
  Chi,
  HashMD,
  Maj,
  SHA224_IV,
  SHA256_IV,
  SHA384_IV,
  SHA512_IV,
  abool,
  abytes,
  add,
  add3H,
  add3L,
  add4H,
  add4L,
  add5H,
  add5L,
  aexists,
  ahash,
  anumber,
  aoutput,
  checkOpts,
  clean,
  copyBytes,
  createHasher,
  createView,
  fromNumH,
  fromNumL,
  kdfInputToBytes,
  md5,
  oidNist,
  ripemd160,
  rotl,
  rotr,
  rotr32H,
  rotr32L,
  rotrBH,
  rotrBL,
  rotrSH,
  rotrSL,
  sha1,
  shrSH,
  shrSL,
  split,
  swap32IfBE,
  swap8IfBE,
  u32
} from "./chunks/chunk-HHQLPURH.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunks/chunk-CEEP6M5H.js";

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i2 = 0, len = code.length; i2 < len; ++i2) {
      lookup[i2] = code[i2];
      revLookup[code.charCodeAt(i2)] = i2;
    }
    var i2;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i3;
      for (i3 = 0; i3 < len2; i3 += 4) {
        tmp = revLookup[b64.charCodeAt(i3)] << 18 | revLookup[b64.charCodeAt(i3 + 1)] << 12 | revLookup[b64.charCodeAt(i3 + 2)] << 6 | revLookup[b64.charCodeAt(i3 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i3)] << 2 | revLookup[b64.charCodeAt(i3 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i3)] << 10 | revLookup[b64.charCodeAt(i3 + 1)] << 4 | revLookup[b64.charCodeAt(i3 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i3 = start; i3 < end; i3 += 3) {
        tmp = (uint8[i3] << 16 & 16711680) + (uint8[i3 + 1] << 8 & 65280) + (uint8[i3 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i3 = 0, len22 = len2 - extraBytes; i3 < len22; i3 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i3, i3 + maxChunkLength > len22 ? len22 : i3 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i2 = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i2];
      i2 += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i2], i2 += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i2 = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i2] = m & 255, i2 += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i2] = e & 255, i2 += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i2 - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer13;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer13.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer13.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto2 = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto2, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto2);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer13.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer13.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer13.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer13.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf2 = new Uint8Array(length);
      Object.setPrototypeOf(buf2, Buffer13.prototype);
      return buf2;
    }
    function Buffer13(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer13.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer13.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer13.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer13.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer13.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer13, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer13.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer13.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer13.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer13.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf2 = createBuffer(length);
      const actual = buf2.write(string, encoding);
      if (actual !== length) {
        buf2 = buf2.slice(0, actual);
      }
      return buf2;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf2 = createBuffer(length);
      for (let i2 = 0; i2 < length; i2 += 1) {
        buf2[i2] = array[i2] & 255;
      }
      return buf2;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf2;
      if (byteOffset === void 0 && length === void 0) {
        buf2 = new Uint8Array(array);
      } else if (length === void 0) {
        buf2 = new Uint8Array(array, byteOffset);
      } else {
        buf2 = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf2, Buffer13.prototype);
      return buf2;
    }
    function fromObject(obj) {
      if (Buffer13.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf2 = createBuffer(len);
        if (buf2.length === 0) {
          return buf2;
        }
        obj.copy(buf2, 0, 0, len);
        return buf2;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer13.alloc(+length);
    }
    Buffer13.isBuffer = function isBuffer2(b) {
      return b != null && b._isBuffer === true && b !== Buffer13.prototype;
    };
    Buffer13.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer13.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer13.from(b, b.offset, b.byteLength);
      if (!Buffer13.isBuffer(a) || !Buffer13.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x2 = a.length;
      let y = b.length;
      for (let i2 = 0, len = Math.min(x2, y); i2 < len; ++i2) {
        if (a[i2] !== b[i2]) {
          x2 = a[i2];
          y = b[i2];
          break;
        }
      }
      if (x2 < y) return -1;
      if (y < x2) return 1;
      return 0;
    };
    Buffer13.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer13.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer13.alloc(0);
      }
      let i2;
      if (length === void 0) {
        length = 0;
        for (i2 = 0; i2 < list.length; ++i2) {
          length += list[i2].length;
        }
      }
      const buffer = Buffer13.allocUnsafe(length);
      let pos = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        let buf2 = list[i2];
        if (isInstance(buf2, Uint8Array)) {
          if (pos + buf2.length > buffer.length) {
            if (!Buffer13.isBuffer(buf2)) buf2 = Buffer13.from(buf2);
            buf2.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf2,
              pos
            );
          }
        } else if (!Buffer13.isBuffer(buf2)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf2.copy(buffer, pos);
        }
        pos += buf2.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer13.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer13.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer13.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i2 = b[n];
      b[n] = b[m];
      b[m] = i2;
    }
    Buffer13.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 2) {
        swap(this, i2, i2 + 1);
      }
      return this;
    };
    Buffer13.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 4) {
        swap(this, i2, i2 + 3);
        swap(this, i2 + 1, i2 + 2);
      }
      return this;
    };
    Buffer13.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i2 = 0; i2 < len; i2 += 8) {
        swap(this, i2, i2 + 7);
        swap(this, i2 + 1, i2 + 6);
        swap(this, i2 + 2, i2 + 5);
        swap(this, i2 + 3, i2 + 4);
      }
      return this;
    };
    Buffer13.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer13.prototype.toLocaleString = Buffer13.prototype.toString;
    Buffer13.prototype.equals = function equals(b) {
      if (!Buffer13.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer13.compare(this, b) === 0;
    };
    Buffer13.prototype.inspect = function inspect2() {
      let str = "";
      const max2 = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max2).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max2) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer13.prototype[customInspectSymbol] = Buffer13.prototype.inspect;
    }
    Buffer13.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer13.from(target, target.offset, target.byteLength);
      }
      if (!Buffer13.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x2 = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x2, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i2 = 0; i2 < len; ++i2) {
        if (thisCopy[i2] !== targetCopy[i2]) {
          x2 = thisCopy[i2];
          y = targetCopy[i2];
          break;
        }
      }
      if (x2 < y) return -1;
      if (y < x2) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer13.from(val, encoding);
      }
      if (Buffer13.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf2, i3) {
        if (indexSize === 1) {
          return buf2[i3];
        } else {
          return buf2.readUInt16BE(i3 * indexSize);
        }
      }
      let i2;
      if (dir) {
        let foundIndex = -1;
        for (i2 = byteOffset; i2 < arrLength; i2++) {
          if (read2(arr, i2) === read2(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
            if (foundIndex === -1) foundIndex = i2;
            if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i2 -= i2 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i2 = byteOffset; i2 >= 0; i2--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read2(arr, i2 + j) !== read2(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i2;
        }
      }
      return -1;
    }
    Buffer13.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer13.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer13.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf2, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf2.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        const parsed = parseInt(string.substr(i2 * 2, 2), 16);
        if (numberIsNaN(parsed)) return i2;
        buf2[offset + i2] = parsed;
      }
      return i2;
    }
    function utf8Write(buf2, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf2.length - offset), buf2, offset, length);
    }
    function asciiWrite(buf2, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf2, offset, length);
    }
    function base64Write(buf2, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf2, offset, length);
    }
    function ucs2Write(buf2, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf2.length - offset), buf2, offset, length);
    }
    Buffer13.prototype.write = function write2(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer13.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf2, start, end) {
      if (start === 0 && end === buf2.length) {
        return base64.fromByteArray(buf2);
      } else {
        return base64.fromByteArray(buf2.slice(start, end));
      }
    }
    function utf8Slice(buf2, start, end) {
      end = Math.min(buf2.length, end);
      const res = [];
      let i2 = start;
      while (i2 < end) {
        const firstByte = buf2[i2];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i2 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf2[i2 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf2[i2 + 1];
              thirdByte = buf2[i2 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf2[i2 + 1];
              thirdByte = buf2[i2 + 2];
              fourthByte = buf2[i2 + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i2 += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i2 = 0;
      while (i2 < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf2, start, end) {
      let ret = "";
      end = Math.min(buf2.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf2[i2] & 127);
      }
      return ret;
    }
    function latin1Slice(buf2, start, end) {
      let ret = "";
      end = Math.min(buf2.length, end);
      for (let i2 = start; i2 < end; ++i2) {
        ret += String.fromCharCode(buf2[i2]);
      }
      return ret;
    }
    function hexSlice(buf2, start, end) {
      const len = buf2.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out3 = "";
      for (let i2 = start; i2 < end; ++i2) {
        out3 += hexSliceLookupTable[buf2[i2]];
      }
      return out3;
    }
    function utf16leSlice(buf2, start, end) {
      const bytes2 = buf2.slice(start, end);
      let res = "";
      for (let i2 = 0; i2 < bytes2.length - 1; i2 += 2) {
        res += String.fromCharCode(bytes2[i2] + bytes2[i2 + 1] * 256);
      }
      return res;
    }
    Buffer13.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer13.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer13.prototype.readUintLE = Buffer13.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      return val;
    };
    Buffer13.prototype.readUintBE = Buffer13.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer13.prototype.readUint8 = Buffer13.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer13.prototype.readUint16LE = Buffer13.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer13.prototype.readUint16BE = Buffer13.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer13.prototype.readUint32LE = Buffer13.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer13.prototype.readUint32BE = Buffer13.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer13.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer13.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer13.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i2 = 0;
      while (++i2 < byteLength2 && (mul *= 256)) {
        val += this[offset + i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer13.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i2 = byteLength2;
      let mul = 1;
      let val = this[offset + --i2];
      while (i2 > 0 && (mul *= 256)) {
        val += this[offset + --i2] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer13.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer13.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer13.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer13.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer13.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer13.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer13.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer13.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer13.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer13.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer13.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf2, value, offset, ext, max2, min) {
      if (!Buffer13.isBuffer(buf2)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max2 || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf2.length) throw new RangeError("Index out of range");
    }
    Buffer13.prototype.writeUintLE = Buffer13.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i2 = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer13.prototype.writeUintBE = Buffer13.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i2 = byteLength2 - 1;
      let mul = 1;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        this[offset + i2] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer13.prototype.writeUint8 = Buffer13.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer13.prototype.writeUint16LE = Buffer13.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer13.prototype.writeUint16BE = Buffer13.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer13.prototype.writeUint32LE = Buffer13.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer13.prototype.writeUint32BE = Buffer13.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf2, value, offset, min, max2) {
      checkIntBI(value, min, max2, buf2, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf2, value, offset, min, max2) {
      checkIntBI(value, min, max2, buf2, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf2[offset + 7] = lo;
      lo = lo >> 8;
      buf2[offset + 6] = lo;
      lo = lo >> 8;
      buf2[offset + 5] = lo;
      lo = lo >> 8;
      buf2[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf2[offset + 3] = hi;
      hi = hi >> 8;
      buf2[offset + 2] = hi;
      hi = hi >> 8;
      buf2[offset + 1] = hi;
      hi = hi >> 8;
      buf2[offset] = hi;
      return offset + 8;
    }
    Buffer13.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer13.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer13.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i2 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i2 < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer13.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i2 = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i2] = value & 255;
      while (--i2 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i2 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i2] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer13.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer13.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer13.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer13.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer13.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer13.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer13.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf2, value, offset, ext, max2, min) {
      if (offset + ext > buf2.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf2, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf2, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf2, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer13.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer13.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf2, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf2, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf2, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer13.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer13.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer13.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer13.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer13.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer13.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i2;
      if (typeof val === "number") {
        for (i2 = start; i2 < end; ++i2) {
          this[i2] = val;
        }
      } else {
        const bytes2 = Buffer13.isBuffer(val) ? val : Buffer13.from(val, encoding);
        const len = bytes2.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i2 = 0; i2 < end - start; ++i2) {
          this[i2 + start] = bytes2[i2 % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i2 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`;
      }
      return `${val.slice(0, i2)}${res}`;
    }
    function checkBounds(buf2, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf2[offset] === void 0 || buf2[offset + byteLength2] === void 0) {
        boundsError(offset, buf2.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max2, buf2, offset, byteLength2) {
      if (value > max2 || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max2}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf2, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type2) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type2);
        throw new errors.ERR_OUT_OF_RANGE(type2 || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type2 || "offset",
        `>= ${type2 ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes2 = [];
      for (let i2 = 0; i2 < length; ++i2) {
        codePoint = string.charCodeAt(i2);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes2.push(239, 191, 189);
              continue;
            } else if (i2 + 1 === length) {
              if ((units -= 3) > -1) bytes2.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes2.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes2.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes2.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes2.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes2.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes2;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        byteArray.push(str.charCodeAt(i2) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i2 = 0; i2 < str.length; ++i2) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i2);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i2;
      for (i2 = 0; i2 < length; ++i2) {
        if (i2 + offset >= dst.length || i2 >= src.length) break;
        dst[i2 + offset] = src[i2];
      }
      return i2;
    }
    function isInstance(obj, type2) {
      return obj instanceof type2 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type2.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table2 = new Array(256);
      for (let i2 = 0; i2 < 16; ++i2) {
        const i16 = i2 * 16;
        for (let j = 0; j < 16; ++j) {
          table2[i16 + j] = alphabet[i2] + alphabet[j];
        }
      }
      return table2;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// src/node/events.ts
var events_exports = {};
__export(events_exports, {
  EventEmitter: () => EventEmitter,
  addAbortListener: () => addAbortListener,
  captureRejectionSymbol: () => captureRejectionSymbol,
  default: () => events_default,
  errorMonitor: () => errorMonitor,
  getEventListeners: () => getEventListeners,
  listenerCount: () => listenerCount,
  on: () => on,
  once: () => once,
  setMaxListeners: () => setMaxListeners
});
function callListener(target, fn, args) {
  const r = fn.apply(target, args);
  if (r && typeof r.then === "function" && (EventEmitter.captureRejections || target[kCapture])) {
    r.then(void 0, (err3) => {
      queueMicrotask(() => {
        const h = target[captureRejectionSymbol];
        if (typeof h === "function") h.call(target, err3);
        else target.emit("error", err3);
      });
    });
  }
}
function checkListener(l) {
  if (typeof l !== "function") {
    const err3 = new TypeError(`The "listener" argument must be of type function. Received ${l === null ? "null" : typeof l}`);
    err3.code = "ERR_INVALID_ARG_TYPE";
    throw err3;
  }
}
function once(emitter, name, opts = {}) {
  return new Promise((resolve3, reject) => {
    if (typeof emitter.addEventListener === "function" && typeof emitter.on !== "function") {
      emitter.addEventListener(name, (...a) => resolve3(a), { once: true });
      return;
    }
    const onError = (err3) => {
      emitter.removeListener(name, resolver);
      reject(err3);
    };
    const resolver = (...args) => {
      if (name !== "error") emitter.removeListener("error", onError);
      resolve3(args);
    };
    emitter.once(name, resolver);
    if (name !== "error") emitter.once("error", onError);
    opts.signal?.addEventListener("abort", () => {
      emitter.removeListener(name, resolver);
      emitter.removeListener("error", onError);
      reject(Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR" }));
    });
  });
}
function on(emitter, name, opts = {}) {
  const queue = [];
  const waiters = [];
  let error = null;
  let done = false;
  const handler = (...args) => {
    const w = waiters.shift();
    if (w) w.resolve({ value: args, done: false });
    else queue.push(args);
  };
  const errHandler = (err3) => {
    done = true;
    const w = waiters.shift();
    if (w) w.reject(err3);
    else error = err3;
  };
  emitter.on(name, handler);
  if (name !== "error") emitter.on("error", errHandler);
  const cleanup = () => {
    emitter.removeListener(name, handler);
    emitter.removeListener("error", errHandler);
  };
  opts.signal?.addEventListener("abort", () => errHandler(Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR" })));
  return {
    next() {
      if (queue.length) return Promise.resolve({ value: queue.shift(), done: false });
      if (error) {
        const e = error;
        error = null;
        return Promise.reject(e);
      }
      if (done) return Promise.resolve({ value: void 0, done: true });
      return new Promise((resolve3, reject) => waiters.push({ resolve: resolve3, reject }));
    },
    return() {
      cleanup();
      done = true;
      for (const w of waiters) w.resolve({ value: void 0, done: true });
      return Promise.resolve({ value: void 0, done: true });
    },
    throw(err3) {
      cleanup();
      return Promise.reject(err3);
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
function getEventListeners(emitter, name) {
  if (typeof emitter.listeners === "function") return emitter.listeners(name);
  return [];
}
function setMaxListeners(n = defaultMaxListeners, ...targets) {
  if (!targets.length) defaultMaxListeners = n;
  for (const t of targets) t.setMaxListeners?.(n);
}
function listenerCount(emitter, type2) {
  return emitter.listenerCount(type2);
}
function addAbortListener(signal, listener) {
  if (signal.aborted) queueMicrotask(listener);
  else signal.addEventListener("abort", listener, { once: true });
  return { [Symbol.dispose ?? /* @__PURE__ */ Symbol.for("dispose")]() {
    signal.removeEventListener("abort", listener);
  } };
}
var kCapture, errorMonitor, captureRejectionSymbol, defaultMaxListeners, EventEmitterImpl, EventEmitter, events_default;
var init_events = __esm({
  "src/node/events.ts"() {
    "use strict";
    kCapture = /* @__PURE__ */ Symbol("kCapture");
    errorMonitor = /* @__PURE__ */ Symbol("events.errorMonitor");
    captureRejectionSymbol = /* @__PURE__ */ Symbol.for("nodejs.rejection");
    defaultMaxListeners = 10;
    EventEmitterImpl = class {
      static get defaultMaxListeners() {
        return defaultMaxListeners;
      }
      static set defaultMaxListeners(n) {
        defaultMaxListeners = n;
      }
      static errorMonitor = errorMonitor;
      static captureRejectionSymbol = captureRejectionSymbol;
      static captureRejections = false;
      static usingDomains = false;
      static EventEmitter;
      static once;
      static on;
      static getEventListeners;
      static setMaxListeners;
      static listenerCount;
      static addAbortListener;
      static EventEmitterAsyncResource;
      setMaxListeners(n) {
        this._maxListeners = n;
        return this;
      }
      getMaxListeners() {
        return this._maxListeners ?? defaultMaxListeners;
      }
      _ev() {
        if (!this._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        return this._events;
      }
      emit(type2, ...args) {
        const events = this._ev();
        if (type2 === "error" && events[errorMonitor]) this.emit(errorMonitor, ...args);
        const handler = events[type2];
        if (handler === void 0) {
          if (type2 === "error") {
            const er = args[0];
            if (er instanceof Error) throw er;
            const err3 = new Error(`Unhandled error. (${er})`);
            err3.context = er;
            err3.code = "ERR_UNHANDLED_ERROR";
            throw err3;
          }
          return false;
        }
        if (typeof handler === "function") {
          callListener(this, handler, args);
        } else {
          const list = handler.slice();
          for (const fn of list) callListener(this, fn, args);
        }
        return true;
      }
      _add(type2, listener, prepend) {
        checkListener(listener);
        const events = this._ev();
        if (events.newListener !== void 0) {
          this.emit("newListener", type2, listener.listener ?? listener);
        }
        const existing = events[type2];
        if (existing === void 0) {
          events[type2] = listener;
          this._eventsCount++;
        } else if (typeof existing === "function") {
          events[type2] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) existing.unshift(listener);
        else existing.push(listener);
        return this;
      }
      on(type2, listener) {
        return this._add(type2, listener, false);
      }
      addListener(type2, listener) {
        return this._add(type2, listener, false);
      }
      prependListener(type2, listener) {
        return this._add(type2, listener, true);
      }
      _onceWrap(type2, listener) {
        checkListener(listener);
        let fired = false;
        const self2 = this;
        const w = function(...args) {
          if (fired) return;
          fired = true;
          self2.removeListener(type2, w);
          return listener.apply(self2, args);
        };
        w.listener = listener;
        return w;
      }
      once(type2, listener) {
        return this.on(type2, this._onceWrap(type2, listener));
      }
      prependOnceListener(type2, listener) {
        return this.prependListener(type2, this._onceWrap(type2, listener));
      }
      removeListener(type2, listener) {
        checkListener(listener);
        const events = this._ev();
        const list = events[type2];
        if (list === void 0) return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
          else delete events[type2];
          if (events.removeListener) this.emit("removeListener", type2, list.listener ?? listener);
        } else if (typeof list !== "function") {
          for (let i2 = list.length - 1; i2 >= 0; i2--) {
            if (list[i2] === listener || list[i2].listener === listener) {
              const removed = list[i2];
              list.splice(i2, 1);
              if (list.length === 1) events[type2] = list[0];
              if (events.removeListener !== void 0) this.emit("removeListener", type2, removed.listener ?? listener);
              break;
            }
          }
        }
        return this;
      }
      off(type2, listener) {
        return this.removeListener(type2, listener);
      }
      removeAllListeners(type2) {
        const events = this._ev();
        if (events.removeListener === void 0) {
          if (type2 === void 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type2] !== void 0) {
            if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
            else delete events[type2];
          }
          return this;
        }
        if (type2 === void 0) {
          for (const key of Reflect.ownKeys(events)) {
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        const listeners2 = events[type2];
        if (typeof listeners2 === "function") this.removeListener(type2, listeners2);
        else if (listeners2) for (let i2 = listeners2.length - 1; i2 >= 0; i2--) this.removeListener(type2, listeners2[i2]);
        return this;
      }
      listeners(type2) {
        const l = this._ev()[type2];
        if (!l) return [];
        if (typeof l === "function") return [l.listener ?? l];
        return l.map((x2) => x2.listener ?? x2);
      }
      rawListeners(type2) {
        const l = this._ev()[type2];
        if (!l) return [];
        return typeof l === "function" ? [l] : l.slice();
      }
      listenerCount(type2, listener) {
        const l = this._ev()[type2];
        if (!l) return 0;
        if (typeof l === "function") return listener ? +(l === listener || l.listener === listener) : 1;
        if (listener) return l.filter((x2) => x2 === listener || x2.listener === listener).length;
        return l.length;
      }
      eventNames() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._ev()) : [];
      }
    };
    EventEmitter = function EventEmitter2(opts) {
      EventEmitter2.init.call(this, opts);
    };
    EventEmitter.prototype = EventEmitterImpl.prototype;
    Object.defineProperty(EventEmitterImpl.prototype, "constructor", { value: EventEmitter, writable: true, configurable: true });
    for (const k of Object.getOwnPropertyNames(EventEmitterImpl)) {
      if (k === "prototype" || k === "length" || k === "name") continue;
      Object.defineProperty(EventEmitter, k, Object.getOwnPropertyDescriptor(EventEmitterImpl, k));
    }
    EventEmitter.init = function(opts) {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
      if (opts?.captureRejections) this[kCapture] = true;
    };
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.once = once;
    EventEmitter.on = on;
    EventEmitter.getEventListeners = getEventListeners;
    EventEmitter.setMaxListeners = setMaxListeners;
    EventEmitter.listenerCount = listenerCount;
    EventEmitter.addAbortListener = addAbortListener;
    EventEmitter.EventEmitterAsyncResource = class extends EventEmitter {
    };
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    events_default = EventEmitter;
  }
});

// node_modules/readable-stream/lib/ours/primordials.js
var require_primordials = __commonJS({
  "node_modules/readable-stream/lib/ours/primordials.js"(exports, module) {
    "use strict";
    var AggregateError2 = class extends Error {
      constructor(errors) {
        if (!Array.isArray(errors)) {
          throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
        }
        let message = "";
        for (let i2 = 0; i2 < errors.length; i2++) {
          message += `    ${errors[i2].stack}
`;
        }
        super(message);
        this.name = "AggregateError";
        this.errors = errors;
      }
    };
    module.exports = {
      AggregateError: AggregateError2,
      ArrayIsArray(self2) {
        return Array.isArray(self2);
      },
      ArrayPrototypeIncludes(self2, el) {
        return self2.includes(el);
      },
      ArrayPrototypeIndexOf(self2, el) {
        return self2.indexOf(el);
      },
      ArrayPrototypeJoin(self2, sep) {
        return self2.join(sep);
      },
      ArrayPrototypeMap(self2, fn) {
        return self2.map(fn);
      },
      ArrayPrototypePop(self2, el) {
        return self2.pop(el);
      },
      ArrayPrototypePush(self2, el) {
        return self2.push(el);
      },
      ArrayPrototypeSlice(self2, start, end) {
        return self2.slice(start, end);
      },
      Error,
      FunctionPrototypeCall(fn, thisArgs, ...args) {
        return fn.call(thisArgs, ...args);
      },
      FunctionPrototypeSymbolHasInstance(self2, instance) {
        return Function.prototype[Symbol.hasInstance].call(self2, instance);
      },
      MathFloor: Math.floor,
      Number,
      NumberIsInteger: Number.isInteger,
      NumberIsNaN: Number.isNaN,
      NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
      NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
      NumberParseInt: Number.parseInt,
      ObjectDefineProperties(self2, props) {
        return Object.defineProperties(self2, props);
      },
      ObjectDefineProperty(self2, name, prop) {
        return Object.defineProperty(self2, name, prop);
      },
      ObjectGetOwnPropertyDescriptor(self2, name) {
        return Object.getOwnPropertyDescriptor(self2, name);
      },
      ObjectKeys(obj) {
        return Object.keys(obj);
      },
      ObjectSetPrototypeOf(target, proto2) {
        return Object.setPrototypeOf(target, proto2);
      },
      Promise,
      PromisePrototypeCatch(self2, fn) {
        return self2.catch(fn);
      },
      PromisePrototypeThen(self2, thenFn, catchFn) {
        return self2.then(thenFn, catchFn);
      },
      PromiseReject(err3) {
        return Promise.reject(err3);
      },
      PromiseResolve(val) {
        return Promise.resolve(val);
      },
      ReflectApply: Reflect.apply,
      RegExpPrototypeTest(self2, value) {
        return self2.test(value);
      },
      SafeSet: Set,
      String,
      StringPrototypeSlice(self2, start, end) {
        return self2.slice(start, end);
      },
      StringPrototypeToLowerCase(self2) {
        return self2.toLowerCase();
      },
      StringPrototypeToUpperCase(self2) {
        return self2.toUpperCase();
      },
      StringPrototypeTrim(self2) {
        return self2.trim();
      },
      Symbol,
      SymbolFor: Symbol.for,
      SymbolAsyncIterator: Symbol.asyncIterator,
      SymbolHasInstance: Symbol.hasInstance,
      SymbolIterator: Symbol.iterator,
      SymbolDispose: Symbol.dispose || /* @__PURE__ */ Symbol("Symbol.dispose"),
      SymbolAsyncDispose: Symbol.asyncDispose || /* @__PURE__ */ Symbol("Symbol.asyncDispose"),
      TypedArrayPrototypeSet(self2, buf2, len) {
        return self2.set(buf2, len);
      },
      Boolean,
      Uint8Array
    };
  }
});

// node_modules/readable-stream/lib/ours/util/inspect.js
var require_inspect = __commonJS({
  "node_modules/readable-stream/lib/ours/util/inspect.js"(exports, module) {
    "use strict";
    module.exports = {
      format(format3, ...args) {
        return format3.replace(/%([sdifj])/g, function(...[_unused, type2]) {
          const replacement = args.shift();
          if (type2 === "f") {
            return replacement.toFixed(6);
          } else if (type2 === "j") {
            return JSON.stringify(replacement);
          } else if (type2 === "s" && typeof replacement === "object") {
            const ctor = replacement.constructor !== Object ? replacement.constructor.name : "";
            return `${ctor} {}`.trim();
          } else {
            return replacement.toString();
          }
        });
      },
      inspect(value) {
        switch (typeof value) {
          case "string":
            if (value.includes("'")) {
              if (!value.includes('"')) {
                return `"${value}"`;
              } else if (!value.includes("`") && !value.includes("${")) {
                return `\`${value}\``;
              }
            }
            return `'${value}'`;
          case "number":
            if (isNaN(value)) {
              return "NaN";
            } else if (Object.is(value, -0)) {
              return String(value);
            }
            return value;
          case "bigint":
            return `${String(value)}n`;
          case "boolean":
          case "undefined":
            return String(value);
          case "object":
            return "{}";
        }
      }
    };
  }
});

// node_modules/readable-stream/lib/ours/errors.js
var require_errors = __commonJS({
  "node_modules/readable-stream/lib/ours/errors.js"(exports, module) {
    "use strict";
    var { format: format3, inspect: inspect2 } = require_inspect();
    var { AggregateError: CustomAggregateError } = require_primordials();
    var AggregateError2 = globalThis.AggregateError || CustomAggregateError;
    var kIsNodeError = /* @__PURE__ */ Symbol("kIsNodeError");
    var kTypes = [
      "string",
      "function",
      "number",
      "object",
      // Accept 'Function' and 'Object' as alternative to the lower cased version.
      "Function",
      "Object",
      "boolean",
      "bigint",
      "symbol"
    ];
    var classRegExp = /^([A-Z][a-z0-9]*)+$/;
    var nodeInternalPrefix = "__node_internal_";
    var codes2 = {};
    function assert3(value, message) {
      if (!value) {
        throw new codes2.ERR_INTERNAL_ASSERTION(message);
      }
    }
    function addNumericalSeparator(val) {
      let res = "";
      let i2 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i2 >= start + 4; i2 -= 3) {
        res = `_${val.slice(i2 - 3, i2)}${res}`;
      }
      return `${val.slice(0, i2)}${res}`;
    }
    function getMessage(key, msg, args) {
      if (typeof msg === "function") {
        assert3(
          msg.length <= args.length,
          // Default options do not count.
          `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${msg.length}).`
        );
        return msg(...args);
      }
      const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
      assert3(
        expectedLength === args.length,
        `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`
      );
      if (args.length === 0) {
        return msg;
      }
      return format3(msg, ...args);
    }
    function E(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      class NodeError extends Base {
        constructor(...args) {
          super(getMessage(code, message, args));
        }
        toString() {
          return `${this.name} [${code}]: ${this.message}`;
        }
      }
      Object.defineProperties(NodeError.prototype, {
        name: {
          value: Base.name,
          writable: true,
          enumerable: false,
          configurable: true
        },
        toString: {
          value() {
            return `${this.name} [${code}]: ${this.message}`;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      NodeError.prototype.code = code;
      NodeError.prototype[kIsNodeError] = true;
      codes2[code] = NodeError;
    }
    function hideStackFrames(fn) {
      const hidden = nodeInternalPrefix + fn.name;
      Object.defineProperty(fn, "name", {
        value: hidden
      });
      return fn;
    }
    function aggregateTwoErrors(innerError, outerError) {
      if (innerError && outerError && innerError !== outerError) {
        if (Array.isArray(outerError.errors)) {
          outerError.errors.push(innerError);
          return outerError;
        }
        const err3 = new AggregateError2([outerError, innerError], outerError.message);
        err3.code = outerError.code;
        return err3;
      }
      return innerError || outerError;
    }
    var AbortError = class extends Error {
      constructor(message = "The operation was aborted", options = void 0) {
        if (options !== void 0 && typeof options !== "object") {
          throw new codes2.ERR_INVALID_ARG_TYPE("options", "Object", options);
        }
        super(message, options);
        this.code = "ABORT_ERR";
        this.name = "AbortError";
      }
    };
    E("ERR_ASSERTION", "%s", Error);
    E(
      "ERR_INVALID_ARG_TYPE",
      (name, expected, actual) => {
        assert3(typeof name === "string", "'name' must be a string");
        if (!Array.isArray(expected)) {
          expected = [expected];
        }
        let msg = "The ";
        if (name.endsWith(" argument")) {
          msg += `${name} `;
        } else {
          msg += `"${name}" ${name.includes(".") ? "property" : "argument"} `;
        }
        msg += "must be ";
        const types2 = [];
        const instances = [];
        const other = [];
        for (const value of expected) {
          assert3(typeof value === "string", "All expected entries have to be of type string");
          if (kTypes.includes(value)) {
            types2.push(value.toLowerCase());
          } else if (classRegExp.test(value)) {
            instances.push(value);
          } else {
            assert3(value !== "object", 'The value "object" should be written as "Object"');
            other.push(value);
          }
        }
        if (instances.length > 0) {
          const pos = types2.indexOf("object");
          if (pos !== -1) {
            types2.splice(types2, pos, 1);
            instances.push("Object");
          }
        }
        if (types2.length > 0) {
          switch (types2.length) {
            case 1:
              msg += `of type ${types2[0]}`;
              break;
            case 2:
              msg += `one of type ${types2[0]} or ${types2[1]}`;
              break;
            default: {
              const last = types2.pop();
              msg += `one of type ${types2.join(", ")}, or ${last}`;
            }
          }
          if (instances.length > 0 || other.length > 0) {
            msg += " or ";
          }
        }
        if (instances.length > 0) {
          switch (instances.length) {
            case 1:
              msg += `an instance of ${instances[0]}`;
              break;
            case 2:
              msg += `an instance of ${instances[0]} or ${instances[1]}`;
              break;
            default: {
              const last = instances.pop();
              msg += `an instance of ${instances.join(", ")}, or ${last}`;
            }
          }
          if (other.length > 0) {
            msg += " or ";
          }
        }
        switch (other.length) {
          case 0:
            break;
          case 1:
            if (other[0].toLowerCase() !== other[0]) {
              msg += "an ";
            }
            msg += `${other[0]}`;
            break;
          case 2:
            msg += `one of ${other[0]} or ${other[1]}`;
            break;
          default: {
            const last = other.pop();
            msg += `one of ${other.join(", ")}, or ${last}`;
          }
        }
        if (actual == null) {
          msg += `. Received ${actual}`;
        } else if (typeof actual === "function" && actual.name) {
          msg += `. Received function ${actual.name}`;
        } else if (typeof actual === "object") {
          var _actual$constructor;
          if ((_actual$constructor = actual.constructor) !== null && _actual$constructor !== void 0 && _actual$constructor.name) {
            msg += `. Received an instance of ${actual.constructor.name}`;
          } else {
            const inspected = inspect2(actual, {
              depth: -1
            });
            msg += `. Received ${inspected}`;
          }
        } else {
          let inspected = inspect2(actual, {
            colors: false
          });
          if (inspected.length > 25) {
            inspected = `${inspected.slice(0, 25)}...`;
          }
          msg += `. Received type ${typeof actual} (${inspected})`;
        }
        return msg;
      },
      TypeError
    );
    E(
      "ERR_INVALID_ARG_VALUE",
      (name, value, reason = "is invalid") => {
        let inspected = inspect2(value);
        if (inspected.length > 128) {
          inspected = inspected.slice(0, 128) + "...";
        }
        const type2 = name.includes(".") ? "property" : "argument";
        return `The ${type2} '${name}' ${reason}. Received ${inspected}`;
      },
      TypeError
    );
    E(
      "ERR_INVALID_RETURN_VALUE",
      (input, name, value) => {
        var _value$constructor;
        const type2 = value !== null && value !== void 0 && (_value$constructor = value.constructor) !== null && _value$constructor !== void 0 && _value$constructor.name ? `instance of ${value.constructor.name}` : `type ${typeof value}`;
        return `Expected ${input} to be returned from the "${name}" function but got ${type2}.`;
      },
      TypeError
    );
    E(
      "ERR_MISSING_ARGS",
      (...args) => {
        assert3(args.length > 0, "At least one arg needs to be specified");
        let msg;
        const len = args.length;
        args = (Array.isArray(args) ? args : [args]).map((a) => `"${a}"`).join(" or ");
        switch (len) {
          case 1:
            msg += `The ${args[0]} argument`;
            break;
          case 2:
            msg += `The ${args[0]} and ${args[1]} arguments`;
            break;
          default:
            {
              const last = args.pop();
              msg += `The ${args.join(", ")}, and ${last} arguments`;
            }
            break;
        }
        return `${msg} must be specified`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      (str, range, input) => {
        assert3(range, 'Missing "range" argument');
        let received;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          const limit = BigInt(2) ** BigInt(32);
          if (input > limit || input < -limit) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        } else {
          received = inspect2(input);
        }
        return `The value of "${str}" is out of range. It must be ${range}. Received ${received}`;
      },
      RangeError
    );
    E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
    E("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
    E("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
    E("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
    E("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
    E("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    E("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
    E("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
    E("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
    E("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
    E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
    module.exports = {
      AbortError,
      aggregateTwoErrors: hideStackFrames(aggregateTwoErrors),
      hideStackFrames,
      codes: codes2
    };
  }
});

// src/node/shims/abort-controller.ts
var abort_controller_exports = {};
__export(abort_controller_exports, {
  AbortController: () => AbortController2,
  AbortSignal: () => AbortSignal,
  default: () => abort_controller_default
});
var AbortController2, AbortSignal, abort_controller_default;
var init_abort_controller = __esm({
  "src/node/shims/abort-controller.ts"() {
    "use strict";
    AbortController2 = globalThis.AbortController;
    AbortSignal = globalThis.AbortSignal;
    abort_controller_default = AbortController2;
  }
});

// node_modules/readable-stream/lib/ours/util.js
var require_util = __commonJS({
  "node_modules/readable-stream/lib/ours/util.js"(exports, module) {
    "use strict";
    var bufferModule = require_buffer();
    var { format: format3, inspect: inspect2 } = require_inspect();
    var {
      codes: { ERR_INVALID_ARG_TYPE }
    } = require_errors();
    var { kResistStopPropagation, AggregateError: AggregateError2, SymbolDispose } = require_primordials();
    var AbortSignal2 = globalThis.AbortSignal || (init_abort_controller(), __toCommonJS(abort_controller_exports)).AbortSignal;
    var AbortController3 = globalThis.AbortController || (init_abort_controller(), __toCommonJS(abort_controller_exports)).AbortController;
    var AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    var Blob2 = globalThis.Blob || bufferModule.Blob;
    var isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
      return b instanceof Blob2;
    } : function isBlob2(b) {
      return false;
    };
    var validateAbortSignal = (signal, name) => {
      if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    var validateFunction = (value, name) => {
      if (typeof value !== "function") {
        throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
      }
    };
    module.exports = {
      AggregateError: AggregateError2,
      kEmptyObject: Object.freeze({}),
      once(callback) {
        let called = false;
        return function(...args) {
          if (called) {
            return;
          }
          called = true;
          callback.apply(this, args);
        };
      },
      createDeferredPromise: function() {
        let resolve3;
        let reject;
        const promise = new Promise((res, rej) => {
          resolve3 = res;
          reject = rej;
        });
        return {
          promise,
          resolve: resolve3,
          reject
        };
      },
      promisify(fn) {
        return new Promise((resolve3, reject) => {
          fn((err3, ...args) => {
            if (err3) {
              return reject(err3);
            }
            return resolve3(...args);
          });
        });
      },
      debuglog() {
        return function() {
        };
      },
      format: format3,
      inspect: inspect2,
      types: {
        isAsyncFunction(fn) {
          return fn instanceof AsyncFunction;
        },
        isArrayBufferView(arr) {
          return ArrayBuffer.isView(arr);
        }
      },
      isBlob,
      deprecate(fn, message) {
        return fn;
      },
      addAbortListener: (init_events(), __toCommonJS(events_exports)).addAbortListener || function addAbortListener2(signal, listener) {
        if (signal === void 0) {
          throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", signal);
        }
        validateAbortSignal(signal, "signal");
        validateFunction(listener, "listener");
        let removeEventListener;
        if (signal.aborted) {
          queueMicrotask(() => listener());
        } else {
          signal.addEventListener("abort", listener, {
            __proto__: null,
            once: true,
            [kResistStopPropagation]: true
          });
          removeEventListener = () => {
            signal.removeEventListener("abort", listener);
          };
        }
        return {
          __proto__: null,
          [SymbolDispose]() {
            var _removeEventListener;
            (_removeEventListener = removeEventListener) === null || _removeEventListener === void 0 ? void 0 : _removeEventListener();
          }
        };
      },
      AbortSignalAny: AbortSignal2.any || function AbortSignalAny(signals) {
        if (signals.length === 1) {
          return signals[0];
        }
        const ac = new AbortController3();
        const abort = () => ac.abort();
        signals.forEach((signal) => {
          validateAbortSignal(signal, "signals");
          signal.addEventListener("abort", abort, {
            once: true
          });
        });
        ac.signal.addEventListener(
          "abort",
          () => {
            signals.forEach((signal) => signal.removeEventListener("abort", abort));
          },
          {
            once: true
          }
        );
        return ac.signal;
      }
    };
    module.exports.promisify.custom = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
  }
});

// node_modules/readable-stream/lib/internal/validators.js
var require_validators = __commonJS({
  "node_modules/readable-stream/lib/internal/validators.js"(exports, module) {
    "use strict";
    var {
      ArrayIsArray,
      ArrayPrototypeIncludes,
      ArrayPrototypeJoin,
      ArrayPrototypeMap,
      NumberIsInteger,
      NumberIsNaN,
      NumberMAX_SAFE_INTEGER,
      NumberMIN_SAFE_INTEGER,
      NumberParseInt,
      ObjectPrototypeHasOwnProperty,
      RegExpPrototypeExec,
      String: String2,
      StringPrototypeToUpperCase,
      StringPrototypeTrim
    } = require_primordials();
    var {
      hideStackFrames,
      codes: { ERR_SOCKET_BAD_PORT, ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE, ERR_OUT_OF_RANGE, ERR_UNKNOWN_SIGNAL }
    } = require_errors();
    var { normalizeEncoding } = require_util();
    var { isAsyncFunction, isArrayBufferView } = require_util().types;
    var signals = {};
    function isInt32(value) {
      return value === (value | 0);
    }
    function isUint32(value) {
      return value === value >>> 0;
    }
    var octalReg = /^[0-7]+$/;
    var modeDesc = "must be a 32-bit unsigned integer or an octal string";
    function parseFileMode(value, name, def) {
      if (typeof value === "undefined") {
        value = def;
      }
      if (typeof value === "string") {
        if (RegExpPrototypeExec(octalReg, value) === null) {
          throw new ERR_INVALID_ARG_VALUE(name, value, modeDesc);
        }
        value = NumberParseInt(value, 8);
      }
      validateUint32(value, name);
      return value;
    }
    var validateInteger = hideStackFrames((value, name, min = NumberMIN_SAFE_INTEGER, max2 = NumberMAX_SAFE_INTEGER) => {
      if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      if (!NumberIsInteger(value)) throw new ERR_OUT_OF_RANGE(name, "an integer", value);
      if (value < min || value > max2) throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max2}`, value);
    });
    var validateInt32 = hideStackFrames((value, name, min = -2147483648, max2 = 2147483647) => {
      if (typeof value !== "number") {
        throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      }
      if (!NumberIsInteger(value)) {
        throw new ERR_OUT_OF_RANGE(name, "an integer", value);
      }
      if (value < min || value > max2) {
        throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max2}`, value);
      }
    });
    var validateUint32 = hideStackFrames((value, name, positive = false) => {
      if (typeof value !== "number") {
        throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      }
      if (!NumberIsInteger(value)) {
        throw new ERR_OUT_OF_RANGE(name, "an integer", value);
      }
      const min = positive ? 1 : 0;
      const max2 = 4294967295;
      if (value < min || value > max2) {
        throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max2}`, value);
      }
    });
    function validateString(value, name) {
      if (typeof value !== "string") throw new ERR_INVALID_ARG_TYPE(name, "string", value);
    }
    function validateNumber(value, name, min = void 0, max2) {
      if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
      if (min != null && value < min || max2 != null && value > max2 || (min != null || max2 != null) && NumberIsNaN(value)) {
        throw new ERR_OUT_OF_RANGE(
          name,
          `${min != null ? `>= ${min}` : ""}${min != null && max2 != null ? " && " : ""}${max2 != null ? `<= ${max2}` : ""}`,
          value
        );
      }
    }
    var validateOneOf = hideStackFrames((value, name, oneOf) => {
      if (!ArrayPrototypeIncludes(oneOf, value)) {
        const allowed = ArrayPrototypeJoin(
          ArrayPrototypeMap(oneOf, (v) => typeof v === "string" ? `'${v}'` : String2(v)),
          ", "
        );
        const reason = "must be one of: " + allowed;
        throw new ERR_INVALID_ARG_VALUE(name, value, reason);
      }
    });
    function validateBoolean(value, name) {
      if (typeof value !== "boolean") throw new ERR_INVALID_ARG_TYPE(name, "boolean", value);
    }
    function getOwnPropertyValueOrDefault(options, key, defaultValue) {
      return options == null || !ObjectPrototypeHasOwnProperty(options, key) ? defaultValue : options[key];
    }
    var validateObject = hideStackFrames((value, name, options = null) => {
      const allowArray = getOwnPropertyValueOrDefault(options, "allowArray", false);
      const allowFunction = getOwnPropertyValueOrDefault(options, "allowFunction", false);
      const nullable = getOwnPropertyValueOrDefault(options, "nullable", false);
      if (!nullable && value === null || !allowArray && ArrayIsArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
        throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
      }
    });
    var validateDictionary = hideStackFrames((value, name) => {
      if (value != null && typeof value !== "object" && typeof value !== "function") {
        throw new ERR_INVALID_ARG_TYPE(name, "a dictionary", value);
      }
    });
    var validateArray = hideStackFrames((value, name, minLength = 0) => {
      if (!ArrayIsArray(value)) {
        throw new ERR_INVALID_ARG_TYPE(name, "Array", value);
      }
      if (value.length < minLength) {
        const reason = `must be longer than ${minLength}`;
        throw new ERR_INVALID_ARG_VALUE(name, value, reason);
      }
    });
    function validateStringArray(value, name) {
      validateArray(value, name);
      for (let i2 = 0; i2 < value.length; i2++) {
        validateString(value[i2], `${name}[${i2}]`);
      }
    }
    function validateBooleanArray(value, name) {
      validateArray(value, name);
      for (let i2 = 0; i2 < value.length; i2++) {
        validateBoolean(value[i2], `${name}[${i2}]`);
      }
    }
    function validateAbortSignalArray(value, name) {
      validateArray(value, name);
      for (let i2 = 0; i2 < value.length; i2++) {
        const signal = value[i2];
        const indexedName = `${name}[${i2}]`;
        if (signal == null) {
          throw new ERR_INVALID_ARG_TYPE(indexedName, "AbortSignal", signal);
        }
        validateAbortSignal(signal, indexedName);
      }
    }
    function validateSignalName(signal, name = "signal") {
      validateString(signal, name);
      if (signals[signal] === void 0) {
        if (signals[StringPrototypeToUpperCase(signal)] !== void 0) {
          throw new ERR_UNKNOWN_SIGNAL(signal + " (signals must use all capital letters)");
        }
        throw new ERR_UNKNOWN_SIGNAL(signal);
      }
    }
    var validateBuffer = hideStackFrames((buffer, name = "buffer") => {
      if (!isArrayBufferView(buffer)) {
        throw new ERR_INVALID_ARG_TYPE(name, ["Buffer", "TypedArray", "DataView"], buffer);
      }
    });
    function validateEncoding(data, encoding) {
      const normalizedEncoding = normalizeEncoding(encoding);
      const length = data.length;
      if (normalizedEncoding === "hex" && length % 2 !== 0) {
        throw new ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
      }
    }
    function validatePort(port, name = "Port", allowZero = true) {
      if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && StringPrototypeTrim(port).length === 0 || +port !== +port >>> 0 || port > 65535 || port === 0 && !allowZero) {
        throw new ERR_SOCKET_BAD_PORT(name, port, allowZero);
      }
      return port | 0;
    }
    var validateAbortSignal = hideStackFrames((signal, name) => {
      if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    });
    var validateFunction = hideStackFrames((value, name) => {
      if (typeof value !== "function") throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
    });
    var validatePlainFunction = hideStackFrames((value, name) => {
      if (typeof value !== "function" || isAsyncFunction(value)) throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
    });
    var validateUndefined = hideStackFrames((value, name) => {
      if (value !== void 0) throw new ERR_INVALID_ARG_TYPE(name, "undefined", value);
    });
    function validateUnion(value, name, union) {
      if (!ArrayPrototypeIncludes(union, value)) {
        throw new ERR_INVALID_ARG_TYPE(name, `('${ArrayPrototypeJoin(union, "|")}')`, value);
      }
    }
    var linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
    function validateLinkHeaderFormat(value, name) {
      if (typeof value === "undefined" || !RegExpPrototypeExec(linkValueRegExp, value)) {
        throw new ERR_INVALID_ARG_VALUE(
          name,
          value,
          'must be an array or string of format "</styles.css>; rel=preload; as=style"'
        );
      }
    }
    function validateLinkHeaderValue(hints) {
      if (typeof hints === "string") {
        validateLinkHeaderFormat(hints, "hints");
        return hints;
      } else if (ArrayIsArray(hints)) {
        const hintsLength = hints.length;
        let result = "";
        if (hintsLength === 0) {
          return result;
        }
        for (let i2 = 0; i2 < hintsLength; i2++) {
          const link2 = hints[i2];
          validateLinkHeaderFormat(link2, "hints");
          result += link2;
          if (i2 !== hintsLength - 1) {
            result += ", ";
          }
        }
        return result;
      }
      throw new ERR_INVALID_ARG_VALUE(
        "hints",
        hints,
        'must be an array or string of format "</styles.css>; rel=preload; as=style"'
      );
    }
    module.exports = {
      isInt32,
      isUint32,
      parseFileMode,
      validateArray,
      validateStringArray,
      validateBooleanArray,
      validateAbortSignalArray,
      validateBoolean,
      validateBuffer,
      validateDictionary,
      validateEncoding,
      validateFunction,
      validateInt32,
      validateInteger,
      validateNumber,
      validateObject,
      validateOneOf,
      validatePlainFunction,
      validatePort,
      validateSignalName,
      validateString,
      validateUint32,
      validateUndefined,
      validateUnion,
      validateAbortSignal,
      validateLinkHeaderValue
    };
  }
});

// src/node/shims/process.ts
var process_exports = {};
__export(process_exports, {
  default: () => process_default
});
var fallback, proc2, process_default;
var init_process = __esm({
  "src/node/shims/process.ts"() {
    init_version();
    fallback = {
      env: {},
      nextTick: (fn, ...args) => queueMicrotask(() => fn(...args)),
      version: "v" + NODE_VERSION,
      versions: { node: NODE_VERSION },
      platform: "linux",
      argv: [],
      cwd: () => "/",
      emitWarning: () => {
      },
      stderr: { write: () => true }
    };
    proc2 = new Proxy(fallback, {
      get(t, k) {
        const real = globalThis.process;
        if (real && real !== proc2) return real[k];
        return t[k];
      }
    });
    process_default = proc2;
  }
});

// node_modules/readable-stream/lib/internal/shims/process.js
var require_process = __commonJS({
  "node_modules/readable-stream/lib/internal/shims/process.js"(exports, module) {
    "use strict";
    var process = ((base, esmKey, keys, isValid) => {
      if (esmKey in base && base[esmKey] === true) {
        let candidate;
        for (const key of keys) {
          if (!(key in base)) {
            continue;
          }
          candidate = base[key];
          if (isValid(candidate)) {
            return candidate;
          }
        }
      }
      return base;
    })((init_process(), __toCommonJS(process_exports)), "__esModule", ["default", "process"], (candidate) => "nextTick" in candidate);
    module.exports = process;
  }
});

// node_modules/readable-stream/lib/internal/streams/utils.js
var require_utils = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/utils.js"(exports, module) {
    "use strict";
    var { SymbolAsyncIterator, SymbolIterator, SymbolFor } = require_primordials();
    var kIsDestroyed = SymbolFor("nodejs.stream.destroyed");
    var kIsErrored = SymbolFor("nodejs.stream.errored");
    var kIsReadable = SymbolFor("nodejs.stream.readable");
    var kIsWritable = SymbolFor("nodejs.stream.writable");
    var kIsDisturbed = SymbolFor("nodejs.stream.disturbed");
    var kIsClosedPromise = SymbolFor("nodejs.webstream.isClosedPromise");
    var kControllerErrorFunction = SymbolFor("nodejs.webstream.controllerErrorFunction");
    function isReadableNodeStream(obj, strict3 = false) {
      var _obj$_readableState;
      return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!strict3 || typeof obj.pause === "function" && typeof obj.resume === "function") && (!obj._writableState || ((_obj$_readableState = obj._readableState) === null || _obj$_readableState === void 0 ? void 0 : _obj$_readableState.readable) !== false) && // Duplex
      (!obj._writableState || obj._readableState));
    }
    function isWritableNodeStream(obj) {
      var _obj$_writableState;
      return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || ((_obj$_writableState = obj._writableState) === null || _obj$_writableState === void 0 ? void 0 : _obj$_writableState.writable) !== false));
    }
    function isDuplexNodeStream(obj) {
      return !!(obj && typeof obj.pipe === "function" && obj._readableState && typeof obj.on === "function" && typeof obj.write === "function");
    }
    function isNodeStream(obj) {
      return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
    }
    function isReadableStream(obj) {
      return !!(obj && !isNodeStream(obj) && typeof obj.pipeThrough === "function" && typeof obj.getReader === "function" && typeof obj.cancel === "function");
    }
    function isWritableStream(obj) {
      return !!(obj && !isNodeStream(obj) && typeof obj.getWriter === "function" && typeof obj.abort === "function");
    }
    function isTransformStream(obj) {
      return !!(obj && !isNodeStream(obj) && typeof obj.readable === "object" && typeof obj.writable === "object");
    }
    function isWebStream(obj) {
      return isReadableStream(obj) || isWritableStream(obj) || isTransformStream(obj);
    }
    function isIterable(obj, isAsync) {
      if (obj == null) return false;
      if (isAsync === true) return typeof obj[SymbolAsyncIterator] === "function";
      if (isAsync === false) return typeof obj[SymbolIterator] === "function";
      return typeof obj[SymbolAsyncIterator] === "function" || typeof obj[SymbolIterator] === "function";
    }
    function isDestroyed(stream) {
      if (!isNodeStream(stream)) return null;
      const wState = stream._writableState;
      const rState = stream._readableState;
      const state = wState || rState;
      return !!(stream.destroyed || stream[kIsDestroyed] || state !== null && state !== void 0 && state.destroyed);
    }
    function isWritableEnded(stream) {
      if (!isWritableNodeStream(stream)) return null;
      if (stream.writableEnded === true) return true;
      const wState = stream._writableState;
      if (wState !== null && wState !== void 0 && wState.errored) return false;
      if (typeof (wState === null || wState === void 0 ? void 0 : wState.ended) !== "boolean") return null;
      return wState.ended;
    }
    function isWritableFinished(stream, strict3) {
      if (!isWritableNodeStream(stream)) return null;
      if (stream.writableFinished === true) return true;
      const wState = stream._writableState;
      if (wState !== null && wState !== void 0 && wState.errored) return false;
      if (typeof (wState === null || wState === void 0 ? void 0 : wState.finished) !== "boolean") return null;
      return !!(wState.finished || strict3 === false && wState.ended === true && wState.length === 0);
    }
    function isReadableEnded(stream) {
      if (!isReadableNodeStream(stream)) return null;
      if (stream.readableEnded === true) return true;
      const rState = stream._readableState;
      if (!rState || rState.errored) return false;
      if (typeof (rState === null || rState === void 0 ? void 0 : rState.ended) !== "boolean") return null;
      return rState.ended;
    }
    function isReadableFinished(stream, strict3) {
      if (!isReadableNodeStream(stream)) return null;
      const rState = stream._readableState;
      if (rState !== null && rState !== void 0 && rState.errored) return false;
      if (typeof (rState === null || rState === void 0 ? void 0 : rState.endEmitted) !== "boolean") return null;
      return !!(rState.endEmitted || strict3 === false && rState.ended === true && rState.length === 0);
    }
    function isReadable2(stream) {
      if (stream && stream[kIsReadable] != null) return stream[kIsReadable];
      if (typeof (stream === null || stream === void 0 ? void 0 : stream.readable) !== "boolean") return null;
      if (isDestroyed(stream)) return false;
      return isReadableNodeStream(stream) && stream.readable && !isReadableFinished(stream);
    }
    function isWritable2(stream) {
      if (stream && stream[kIsWritable] != null) return stream[kIsWritable];
      if (typeof (stream === null || stream === void 0 ? void 0 : stream.writable) !== "boolean") return null;
      if (isDestroyed(stream)) return false;
      return isWritableNodeStream(stream) && stream.writable && !isWritableEnded(stream);
    }
    function isFinished(stream, opts) {
      if (!isNodeStream(stream)) {
        return null;
      }
      if (isDestroyed(stream)) {
        return true;
      }
      if ((opts === null || opts === void 0 ? void 0 : opts.readable) !== false && isReadable2(stream)) {
        return false;
      }
      if ((opts === null || opts === void 0 ? void 0 : opts.writable) !== false && isWritable2(stream)) {
        return false;
      }
      return true;
    }
    function isWritableErrored(stream) {
      var _stream$_writableStat, _stream$_writableStat2;
      if (!isNodeStream(stream)) {
        return null;
      }
      if (stream.writableErrored) {
        return stream.writableErrored;
      }
      return (_stream$_writableStat = (_stream$_writableStat2 = stream._writableState) === null || _stream$_writableStat2 === void 0 ? void 0 : _stream$_writableStat2.errored) !== null && _stream$_writableStat !== void 0 ? _stream$_writableStat : null;
    }
    function isReadableErrored(stream) {
      var _stream$_readableStat, _stream$_readableStat2;
      if (!isNodeStream(stream)) {
        return null;
      }
      if (stream.readableErrored) {
        return stream.readableErrored;
      }
      return (_stream$_readableStat = (_stream$_readableStat2 = stream._readableState) === null || _stream$_readableStat2 === void 0 ? void 0 : _stream$_readableStat2.errored) !== null && _stream$_readableStat !== void 0 ? _stream$_readableStat : null;
    }
    function isClosed(stream) {
      if (!isNodeStream(stream)) {
        return null;
      }
      if (typeof stream.closed === "boolean") {
        return stream.closed;
      }
      const wState = stream._writableState;
      const rState = stream._readableState;
      if (typeof (wState === null || wState === void 0 ? void 0 : wState.closed) === "boolean" || typeof (rState === null || rState === void 0 ? void 0 : rState.closed) === "boolean") {
        return (wState === null || wState === void 0 ? void 0 : wState.closed) || (rState === null || rState === void 0 ? void 0 : rState.closed);
      }
      if (typeof stream._closed === "boolean" && isOutgoingMessage(stream)) {
        return stream._closed;
      }
      return null;
    }
    function isOutgoingMessage(stream) {
      return typeof stream._closed === "boolean" && typeof stream._defaultKeepAlive === "boolean" && typeof stream._removedConnection === "boolean" && typeof stream._removedContLen === "boolean";
    }
    function isServerResponse(stream) {
      return typeof stream._sent100 === "boolean" && isOutgoingMessage(stream);
    }
    function isServerRequest(stream) {
      var _stream$req;
      return typeof stream._consuming === "boolean" && typeof stream._dumped === "boolean" && ((_stream$req = stream.req) === null || _stream$req === void 0 ? void 0 : _stream$req.upgradeOrConnect) === void 0;
    }
    function willEmitClose(stream) {
      if (!isNodeStream(stream)) return null;
      const wState = stream._writableState;
      const rState = stream._readableState;
      const state = wState || rState;
      return !state && isServerResponse(stream) || !!(state && state.autoDestroy && state.emitClose && state.closed === false);
    }
    function isDisturbed2(stream) {
      var _stream$kIsDisturbed;
      return !!(stream && ((_stream$kIsDisturbed = stream[kIsDisturbed]) !== null && _stream$kIsDisturbed !== void 0 ? _stream$kIsDisturbed : stream.readableDidRead || stream.readableAborted));
    }
    function isErrored2(stream) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _stream$kIsErrored, _stream$_readableStat3, _stream$_writableStat3, _stream$_readableStat4, _stream$_writableStat4;
      return !!(stream && ((_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_stream$kIsErrored = stream[kIsErrored]) !== null && _stream$kIsErrored !== void 0 ? _stream$kIsErrored : stream.readableErrored) !== null && _ref5 !== void 0 ? _ref5 : stream.writableErrored) !== null && _ref4 !== void 0 ? _ref4 : (_stream$_readableStat3 = stream._readableState) === null || _stream$_readableStat3 === void 0 ? void 0 : _stream$_readableStat3.errorEmitted) !== null && _ref3 !== void 0 ? _ref3 : (_stream$_writableStat3 = stream._writableState) === null || _stream$_writableStat3 === void 0 ? void 0 : _stream$_writableStat3.errorEmitted) !== null && _ref2 !== void 0 ? _ref2 : (_stream$_readableStat4 = stream._readableState) === null || _stream$_readableStat4 === void 0 ? void 0 : _stream$_readableStat4.errored) !== null && _ref !== void 0 ? _ref : (_stream$_writableStat4 = stream._writableState) === null || _stream$_writableStat4 === void 0 ? void 0 : _stream$_writableStat4.errored));
    }
    module.exports = {
      isDestroyed,
      kIsDestroyed,
      isDisturbed: isDisturbed2,
      kIsDisturbed,
      isErrored: isErrored2,
      kIsErrored,
      isReadable: isReadable2,
      kIsReadable,
      kIsClosedPromise,
      kControllerErrorFunction,
      kIsWritable,
      isClosed,
      isDuplexNodeStream,
      isFinished,
      isIterable,
      isReadableNodeStream,
      isReadableStream,
      isReadableEnded,
      isReadableFinished,
      isReadableErrored,
      isNodeStream,
      isWebStream,
      isWritable: isWritable2,
      isWritableNodeStream,
      isWritableStream,
      isWritableEnded,
      isWritableFinished,
      isWritableErrored,
      isServerRequest,
      isServerResponse,
      willEmitClose,
      isTransformStream
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
    "use strict";
    var process = require_process();
    var { AbortError, codes: codes2 } = require_errors();
    var { ERR_INVALID_ARG_TYPE, ERR_STREAM_PREMATURE_CLOSE } = codes2;
    var { kEmptyObject, once: once2 } = require_util();
    var { validateAbortSignal, validateFunction, validateObject, validateBoolean } = require_validators();
    var { Promise: Promise2, PromisePrototypeThen, SymbolDispose } = require_primordials();
    var {
      isClosed,
      isReadable: isReadable2,
      isReadableNodeStream,
      isReadableStream,
      isReadableFinished,
      isReadableErrored,
      isWritable: isWritable2,
      isWritableNodeStream,
      isWritableStream,
      isWritableFinished,
      isWritableErrored,
      isNodeStream,
      willEmitClose: _willEmitClose,
      kIsClosedPromise
    } = require_utils();
    var addAbortListener2;
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    var nop = () => {
    };
    function eos(stream, options, callback) {
      var _options$readable, _options$writable;
      if (arguments.length === 2) {
        callback = options;
        options = kEmptyObject;
      } else if (options == null) {
        options = kEmptyObject;
      } else {
        validateObject(options, "options");
      }
      validateFunction(callback, "callback");
      validateAbortSignal(options.signal, "options.signal");
      callback = once2(callback);
      if (isReadableStream(stream) || isWritableStream(stream)) {
        return eosWeb(stream, options, callback);
      }
      if (!isNodeStream(stream)) {
        throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
      }
      const readable = (_options$readable = options.readable) !== null && _options$readable !== void 0 ? _options$readable : isReadableNodeStream(stream);
      const writable = (_options$writable = options.writable) !== null && _options$writable !== void 0 ? _options$writable : isWritableNodeStream(stream);
      const wState = stream._writableState;
      const rState = stream._readableState;
      const onlegacyfinish = () => {
        if (!stream.writable) {
          onfinish();
        }
      };
      let willEmitClose = _willEmitClose(stream) && isReadableNodeStream(stream) === readable && isWritableNodeStream(stream) === writable;
      let writableFinished = isWritableFinished(stream, false);
      const onfinish = () => {
        writableFinished = true;
        if (stream.destroyed) {
          willEmitClose = false;
        }
        if (willEmitClose && (!stream.readable || readable)) {
          return;
        }
        if (!readable || readableFinished) {
          callback.call(stream);
        }
      };
      let readableFinished = isReadableFinished(stream, false);
      const onend = () => {
        readableFinished = true;
        if (stream.destroyed) {
          willEmitClose = false;
        }
        if (willEmitClose && (!stream.writable || writable)) {
          return;
        }
        if (!writable || writableFinished) {
          callback.call(stream);
        }
      };
      const onerror = (err3) => {
        callback.call(stream, err3);
      };
      let closed = isClosed(stream);
      const onclose = () => {
        closed = true;
        const errored = isWritableErrored(stream) || isReadableErrored(stream);
        if (errored && typeof errored !== "boolean") {
          return callback.call(stream, errored);
        }
        if (readable && !readableFinished && isReadableNodeStream(stream, true)) {
          if (!isReadableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
        }
        if (writable && !writableFinished) {
          if (!isWritableFinished(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE());
        }
        callback.call(stream);
      };
      const onclosed = () => {
        closed = true;
        const errored = isWritableErrored(stream) || isReadableErrored(stream);
        if (errored && typeof errored !== "boolean") {
          return callback.call(stream, errored);
        }
        callback.call(stream);
      };
      const onrequest = () => {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        if (!willEmitClose) {
          stream.on("abort", onclose);
        }
        if (stream.req) {
          onrequest();
        } else {
          stream.on("request", onrequest);
        }
      } else if (writable && !wState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      if (!willEmitClose && typeof stream.aborted === "boolean") {
        stream.on("aborted", onclose);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (options.error !== false) {
        stream.on("error", onerror);
      }
      stream.on("close", onclose);
      if (closed) {
        process.nextTick(onclose);
      } else if (wState !== null && wState !== void 0 && wState.errorEmitted || rState !== null && rState !== void 0 && rState.errorEmitted) {
        if (!willEmitClose) {
          process.nextTick(onclosed);
        }
      } else if (!readable && (!willEmitClose || isReadable2(stream)) && (writableFinished || isWritable2(stream) === false)) {
        process.nextTick(onclosed);
      } else if (!writable && (!willEmitClose || isWritable2(stream)) && (readableFinished || isReadable2(stream) === false)) {
        process.nextTick(onclosed);
      } else if (rState && stream.req && stream.aborted) {
        process.nextTick(onclosed);
      }
      const cleanup = () => {
        callback = nop;
        stream.removeListener("aborted", onclose);
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
      if (options.signal && !closed) {
        const abort = () => {
          const endCallback = callback;
          cleanup();
          endCallback.call(
            stream,
            new AbortError(void 0, {
              cause: options.signal.reason
            })
          );
        };
        if (options.signal.aborted) {
          process.nextTick(abort);
        } else {
          addAbortListener2 = addAbortListener2 || require_util().addAbortListener;
          const disposable = addAbortListener2(options.signal, abort);
          const originalCallback = callback;
          callback = once2((...args) => {
            disposable[SymbolDispose]();
            originalCallback.apply(stream, args);
          });
        }
      }
      return cleanup;
    }
    function eosWeb(stream, options, callback) {
      let isAborted = false;
      let abort = nop;
      if (options.signal) {
        abort = () => {
          isAborted = true;
          callback.call(
            stream,
            new AbortError(void 0, {
              cause: options.signal.reason
            })
          );
        };
        if (options.signal.aborted) {
          process.nextTick(abort);
        } else {
          addAbortListener2 = addAbortListener2 || require_util().addAbortListener;
          const disposable = addAbortListener2(options.signal, abort);
          const originalCallback = callback;
          callback = once2((...args) => {
            disposable[SymbolDispose]();
            originalCallback.apply(stream, args);
          });
        }
      }
      const resolverFn = (...args) => {
        if (!isAborted) {
          process.nextTick(() => callback.apply(stream, args));
        }
      };
      PromisePrototypeThen(stream[kIsClosedPromise].promise, resolverFn, resolverFn);
      return nop;
    }
    function finished2(stream, opts) {
      var _opts;
      let autoCleanup = false;
      if (opts === null) {
        opts = kEmptyObject;
      }
      if ((_opts = opts) !== null && _opts !== void 0 && _opts.cleanup) {
        validateBoolean(opts.cleanup, "cleanup");
        autoCleanup = opts.cleanup;
      }
      return new Promise2((resolve3, reject) => {
        const cleanup = eos(stream, opts, (err3) => {
          if (autoCleanup) {
            cleanup();
          }
          if (err3) {
            reject(err3);
          } else {
            resolve3();
          }
        });
      });
    }
    module.exports = eos;
    module.exports.finished = finished2;
  }
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
    "use strict";
    var process = require_process();
    var {
      aggregateTwoErrors,
      codes: { ERR_MULTIPLE_CALLBACK },
      AbortError
    } = require_errors();
    var { Symbol: Symbol2 } = require_primordials();
    var { kIsDestroyed, isDestroyed, isFinished, isServerRequest } = require_utils();
    var kDestroy = Symbol2("kDestroy");
    var kConstruct = Symbol2("kConstruct");
    function checkError(err3, w, r) {
      if (err3) {
        err3.stack;
        if (w && !w.errored) {
          w.errored = err3;
        }
        if (r && !r.errored) {
          r.errored = err3;
        }
      }
    }
    function destroy2(err3, cb) {
      const r = this._readableState;
      const w = this._writableState;
      const s = w || r;
      if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
        if (typeof cb === "function") {
          cb();
        }
        return this;
      }
      checkError(err3, w, r);
      if (w) {
        w.destroyed = true;
      }
      if (r) {
        r.destroyed = true;
      }
      if (!s.constructed) {
        this.once(kDestroy, function(er) {
          _destroy(this, aggregateTwoErrors(er, err3), cb);
        });
      } else {
        _destroy(this, err3, cb);
      }
      return this;
    }
    function _destroy(self2, err3, cb) {
      let called = false;
      function onDestroy(err4) {
        if (called) {
          return;
        }
        called = true;
        const r = self2._readableState;
        const w = self2._writableState;
        checkError(err4, w, r);
        if (w) {
          w.closed = true;
        }
        if (r) {
          r.closed = true;
        }
        if (typeof cb === "function") {
          cb(err4);
        }
        if (err4) {
          process.nextTick(emitErrorCloseNT, self2, err4);
        } else {
          process.nextTick(emitCloseNT, self2);
        }
      }
      try {
        self2._destroy(err3 || null, onDestroy);
      } catch (err4) {
        onDestroy(err4);
      }
    }
    function emitErrorCloseNT(self2, err3) {
      emitErrorNT(self2, err3);
      emitCloseNT(self2);
    }
    function emitCloseNT(self2) {
      const r = self2._readableState;
      const w = self2._writableState;
      if (w) {
        w.closeEmitted = true;
      }
      if (r) {
        r.closeEmitted = true;
      }
      if (w !== null && w !== void 0 && w.emitClose || r !== null && r !== void 0 && r.emitClose) {
        self2.emit("close");
      }
    }
    function emitErrorNT(self2, err3) {
      const r = self2._readableState;
      const w = self2._writableState;
      if (w !== null && w !== void 0 && w.errorEmitted || r !== null && r !== void 0 && r.errorEmitted) {
        return;
      }
      if (w) {
        w.errorEmitted = true;
      }
      if (r) {
        r.errorEmitted = true;
      }
      self2.emit("error", err3);
    }
    function undestroy() {
      const r = this._readableState;
      const w = this._writableState;
      if (r) {
        r.constructed = true;
        r.closed = false;
        r.closeEmitted = false;
        r.destroyed = false;
        r.errored = null;
        r.errorEmitted = false;
        r.reading = false;
        r.ended = r.readable === false;
        r.endEmitted = r.readable === false;
      }
      if (w) {
        w.constructed = true;
        w.destroyed = false;
        w.closed = false;
        w.closeEmitted = false;
        w.errored = null;
        w.errorEmitted = false;
        w.finalCalled = false;
        w.prefinished = false;
        w.ended = w.writable === false;
        w.ending = w.writable === false;
        w.finished = w.writable === false;
      }
    }
    function errorOrDestroy(stream, err3, sync) {
      const r = stream._readableState;
      const w = stream._writableState;
      if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
        return this;
      }
      if (r !== null && r !== void 0 && r.autoDestroy || w !== null && w !== void 0 && w.autoDestroy)
        stream.destroy(err3);
      else if (err3) {
        err3.stack;
        if (w && !w.errored) {
          w.errored = err3;
        }
        if (r && !r.errored) {
          r.errored = err3;
        }
        if (sync) {
          process.nextTick(emitErrorNT, stream, err3);
        } else {
          emitErrorNT(stream, err3);
        }
      }
    }
    function construct(stream, cb) {
      if (typeof stream._construct !== "function") {
        return;
      }
      const r = stream._readableState;
      const w = stream._writableState;
      if (r) {
        r.constructed = false;
      }
      if (w) {
        w.constructed = false;
      }
      stream.once(kConstruct, cb);
      if (stream.listenerCount(kConstruct) > 1) {
        return;
      }
      process.nextTick(constructNT, stream);
    }
    function constructNT(stream) {
      let called = false;
      function onConstruct(err3) {
        if (called) {
          errorOrDestroy(stream, err3 !== null && err3 !== void 0 ? err3 : new ERR_MULTIPLE_CALLBACK());
          return;
        }
        called = true;
        const r = stream._readableState;
        const w = stream._writableState;
        const s = w || r;
        if (r) {
          r.constructed = true;
        }
        if (w) {
          w.constructed = true;
        }
        if (s.destroyed) {
          stream.emit(kDestroy, err3);
        } else if (err3) {
          errorOrDestroy(stream, err3, true);
        } else {
          process.nextTick(emitConstructNT, stream);
        }
      }
      try {
        stream._construct((err3) => {
          process.nextTick(onConstruct, err3);
        });
      } catch (err3) {
        process.nextTick(onConstruct, err3);
      }
    }
    function emitConstructNT(stream) {
      stream.emit(kConstruct);
    }
    function isRequest(stream) {
      return (stream === null || stream === void 0 ? void 0 : stream.setHeader) && typeof stream.abort === "function";
    }
    function emitCloseLegacy(stream) {
      stream.emit("close");
    }
    function emitErrorCloseLegacy(stream, err3) {
      stream.emit("error", err3);
      process.nextTick(emitCloseLegacy, stream);
    }
    function destroyer(stream, err3) {
      if (!stream || isDestroyed(stream)) {
        return;
      }
      if (!err3 && !isFinished(stream)) {
        err3 = new AbortError();
      }
      if (isServerRequest(stream)) {
        stream.socket = null;
        stream.destroy(err3);
      } else if (isRequest(stream)) {
        stream.abort();
      } else if (isRequest(stream.req)) {
        stream.req.abort();
      } else if (typeof stream.destroy === "function") {
        stream.destroy(err3);
      } else if (typeof stream.close === "function") {
        stream.close();
      } else if (err3) {
        process.nextTick(emitErrorCloseLegacy, stream, err3);
      } else {
        process.nextTick(emitCloseLegacy, stream);
      }
      if (!stream.destroyed) {
        stream[kIsDestroyed] = true;
      }
    }
    module.exports = {
      construct,
      destroyer,
      destroy: destroy2,
      undestroy,
      errorOrDestroy
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/legacy.js
var require_legacy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/legacy.js"(exports, module) {
    "use strict";
    var { ArrayIsArray, ObjectSetPrototypeOf } = require_primordials();
    var { EventEmitter: EE } = (init_events(), __toCommonJS(events_exports));
    function Stream3(opts) {
      EE.call(this, opts);
    }
    ObjectSetPrototypeOf(Stream3.prototype, EE.prototype);
    ObjectSetPrototypeOf(Stream3, EE);
    Stream3.prototype.pipe = function(dest, options) {
      const source = this;
      function ondata(chunk) {
        if (dest.writable && dest.write(chunk) === false && source.pause) {
          source.pause();
        }
      }
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      let didOnEnd = false;
      function onend() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        if (typeof dest.destroy === "function") dest.destroy();
      }
      function onerror(er) {
        var _this$listenerCount;
        cleanup();
        if (((_this$listenerCount = this.listenerCount) === null || _this$listenerCount === void 0 ? void 0 : _this$listenerCount.call(this, "error")) === 0) {
          this.emit("error", er);
        }
      }
      prependListener(source, "error", onerror);
      prependListener(dest, "error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (ArrayIsArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    module.exports = {
      Stream: Stream3,
      prependListener
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/add-abort-signal.js
var require_add_abort_signal = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/add-abort-signal.js"(exports, module) {
    "use strict";
    var { SymbolDispose } = require_primordials();
    var { AbortError, codes: codes2 } = require_errors();
    var { isNodeStream, isWebStream, kControllerErrorFunction } = require_utils();
    var eos = require_end_of_stream();
    var { ERR_INVALID_ARG_TYPE } = codes2;
    var addAbortListener2;
    var validateAbortSignal = (signal, name) => {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    module.exports.addAbortSignal = function addAbortSignal2(signal, stream) {
      validateAbortSignal(signal, "signal");
      if (!isNodeStream(stream) && !isWebStream(stream)) {
        throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream);
      }
      return module.exports.addAbortSignalNoValidate(signal, stream);
    };
    module.exports.addAbortSignalNoValidate = function(signal, stream) {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        return stream;
      }
      const onAbort = isNodeStream(stream) ? () => {
        stream.destroy(
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      } : () => {
        stream[kControllerErrorFunction](
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      };
      if (signal.aborted) {
        onAbort();
      } else {
        addAbortListener2 = addAbortListener2 || require_util().addAbortListener;
        const disposable = addAbortListener2(signal, onAbort);
        eos(stream, disposable[SymbolDispose]);
      }
      return stream;
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
    "use strict";
    var { StringPrototypeSlice, SymbolIterator, TypedArrayPrototypeSet, Uint8Array: Uint8Array2 } = require_primordials();
    var { Buffer: Buffer13 } = require_buffer();
    var { inspect: inspect2 } = require_util();
    module.exports = class BufferList {
      constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      push(v) {
        const entry = {
          data: v,
          next: null
        };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      }
      unshift(v) {
        const entry = {
          data: v,
          next: this.head
        };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      }
      shift() {
        if (this.length === 0) return;
        const ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      }
      clear() {
        this.head = this.tail = null;
        this.length = 0;
      }
      join(s) {
        if (this.length === 0) return "";
        let p = this.head;
        let ret = "" + p.data;
        while ((p = p.next) !== null) ret += s + p.data;
        return ret;
      }
      concat(n) {
        if (this.length === 0) return Buffer13.alloc(0);
        const ret = Buffer13.allocUnsafe(n >>> 0);
        let p = this.head;
        let i2 = 0;
        while (p) {
          TypedArrayPrototypeSet(ret, p.data, i2);
          i2 += p.data.length;
          p = p.next;
        }
        return ret;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
      consume(n, hasStrings) {
        const data = this.head.data;
        if (n < data.length) {
          const slice = data.slice(0, n);
          this.head.data = data.slice(n);
          return slice;
        }
        if (n === data.length) {
          return this.shift();
        }
        return hasStrings ? this._getString(n) : this._getBuffer(n);
      }
      first() {
        return this.head.data;
      }
      *[SymbolIterator]() {
        for (let p = this.head; p; p = p.next) {
          yield p.data;
        }
      }
      // Consumes a specified amount of characters from the buffered data.
      _getString(n) {
        let ret = "";
        let p = this.head;
        let c = 0;
        do {
          const str = p.data;
          if (n > str.length) {
            ret += str;
            n -= str.length;
          } else {
            if (n === str.length) {
              ret += str;
              ++c;
              if (p.next) this.head = p.next;
              else this.head = this.tail = null;
            } else {
              ret += StringPrototypeSlice(str, 0, n);
              this.head = p;
              p.data = StringPrototypeSlice(str, n);
            }
            break;
          }
          ++c;
        } while ((p = p.next) !== null);
        this.length -= c;
        return ret;
      }
      // Consumes a specified amount of bytes from the buffered data.
      _getBuffer(n) {
        const ret = Buffer13.allocUnsafe(n);
        const retLen = n;
        let p = this.head;
        let c = 0;
        do {
          const buf2 = p.data;
          if (n > buf2.length) {
            TypedArrayPrototypeSet(ret, buf2, retLen - n);
            n -= buf2.length;
          } else {
            if (n === buf2.length) {
              TypedArrayPrototypeSet(ret, buf2, retLen - n);
              ++c;
              if (p.next) this.head = p.next;
              else this.head = this.tail = null;
            } else {
              TypedArrayPrototypeSet(ret, new Uint8Array2(buf2.buffer, buf2.byteOffset, n), retLen - n);
              this.head = p;
              p.data = buf2.slice(n);
            }
            break;
          }
          ++c;
        } while ((p = p.next) !== null);
        this.length -= c;
        return ret;
      }
      // Make sure the linked list only shows the minimal necessary information.
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](_, options) {
        return inspect2(this, {
          ...options,
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: false
        });
      }
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
    "use strict";
    var { MathFloor, NumberIsInteger } = require_primordials();
    var { validateInteger } = require_validators();
    var { ERR_INVALID_ARG_VALUE } = require_errors().codes;
    var defaultHighWaterMarkBytes = 16 * 1024;
    var defaultHighWaterMarkObjectMode = 16;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getDefaultHighWaterMark2(objectMode) {
      return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
    }
    function setDefaultHighWaterMark2(objectMode, value) {
      validateInteger(value, "value", 0);
      if (objectMode) {
        defaultHighWaterMarkObjectMode = value;
      } else {
        defaultHighWaterMarkBytes = value;
      }
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!NumberIsInteger(hwm) || hwm < 0) {
          const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
          throw new ERR_INVALID_ARG_VALUE(name, hwm);
        }
        return MathFloor(hwm);
      }
      return getDefaultHighWaterMark2(state.objectMode);
    }
    module.exports = {
      getHighWaterMark,
      getDefaultHighWaterMark: getDefaultHighWaterMark2,
      setDefaultHighWaterMark: setDefaultHighWaterMark2
    };
  }
});

// src/node/string_decoder.ts
var string_decoder_exports = {};
__export(string_decoder_exports, {
  StringDecoder: () => StringDecoder,
  default: () => string_decoder_default
});
function normEnc(e) {
  const s = String(e ?? "utf8").toLowerCase();
  switch (s) {
    case "utf8":
    case "utf-8":
      return "utf8";
    case "ucs2":
    case "ucs-2":
    case "utf16le":
    case "utf-16le":
      return "utf16le";
    case "latin1":
    case "binary":
      return "latin1";
    case "base64":
    case "base64url":
    case "hex":
    case "ascii":
      return s;
  }
  const err3 = new TypeError(`Unknown encoding: ${e}`);
  err3.code = "ERR_UNKNOWN_ENCODING";
  throw err3;
}
var import_buffer3, StringDecoder, string_decoder_default;
var init_string_decoder = __esm({
  "src/node/string_decoder.ts"() {
    "use strict";
    import_buffer3 = __toESM(require_buffer(), 1);
    StringDecoder = class {
      encoding;
      td;
      pending = new Uint8Array(0);
      constructor(encoding) {
        this.encoding = normEnc(encoding);
        if (this.encoding === "utf8") this.td = new TextDecoder("utf-8");
        else if (this.encoding === "utf16le") this.td = new TextDecoder("utf-16le");
      }
      write(buf2) {
        if (typeof buf2 === "string") return buf2;
        if (this.td) return this.td.decode(buf2, { stream: true });
        const unit = this.encoding === "base64" || this.encoding === "base64url" ? 3 : 1;
        let data = buf2;
        if (this.pending.length) {
          const c = new Uint8Array(this.pending.length + buf2.length);
          c.set(this.pending);
          c.set(buf2, this.pending.length);
          data = c;
        }
        const keep = data.length % unit;
        this.pending = data.slice(data.length - keep);
        return import_buffer3.Buffer.from(data.buffer, data.byteOffset, data.length - keep).toString(this.encoding);
      }
      end(buf2) {
        let out3 = buf2 ? this.write(buf2) : "";
        if (this.td) out3 += this.td.decode();
        else if (this.pending.length) {
          out3 += import_buffer3.Buffer.from(this.pending).toString(this.encoding);
          this.pending = new Uint8Array(0);
        }
        return out3;
      }
      text(buf2, offset) {
        return this.write(buf2.subarray(offset));
      }
      get lastNeed() {
        return 0;
      }
      get lastTotal() {
        return 0;
      }
    };
    string_decoder_default = { StringDecoder };
  }
});

// node_modules/readable-stream/lib/internal/streams/from.js
var require_from = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/from.js"(exports, module) {
    "use strict";
    var process = require_process();
    var { PromisePrototypeThen, SymbolAsyncIterator, SymbolIterator } = require_primordials();
    var { Buffer: Buffer13 } = require_buffer();
    var { ERR_INVALID_ARG_TYPE, ERR_STREAM_NULL_VALUES } = require_errors().codes;
    function from(Readable2, iterable, opts) {
      let iterator;
      if (typeof iterable === "string" || iterable instanceof Buffer13) {
        return new Readable2({
          objectMode: true,
          ...opts,
          read() {
            this.push(iterable);
            this.push(null);
          }
        });
      }
      let isAsync;
      if (iterable && iterable[SymbolAsyncIterator]) {
        isAsync = true;
        iterator = iterable[SymbolAsyncIterator]();
      } else if (iterable && iterable[SymbolIterator]) {
        isAsync = false;
        iterator = iterable[SymbolIterator]();
      } else {
        throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
      }
      const readable = new Readable2({
        objectMode: true,
        highWaterMark: 1,
        // TODO(ronag): What options should be allowed?
        ...opts
      });
      let reading = false;
      readable._read = function() {
        if (!reading) {
          reading = true;
          next();
        }
      };
      readable._destroy = function(error, cb) {
        PromisePrototypeThen(
          close2(error),
          () => process.nextTick(cb, error),
          // nextTick is here in case cb throws
          (e) => process.nextTick(cb, e || error)
        );
      };
      async function close2(error) {
        const hadError = error !== void 0 && error !== null;
        const hasThrow = typeof iterator.throw === "function";
        if (hadError && hasThrow) {
          const { value, done } = await iterator.throw(error);
          await value;
          if (done) {
            return;
          }
        }
        if (typeof iterator.return === "function") {
          const { value } = await iterator.return();
          await value;
        }
      }
      async function next() {
        for (; ; ) {
          try {
            const { value, done } = isAsync ? await iterator.next() : iterator.next();
            if (done) {
              readable.push(null);
            } else {
              const res = value && typeof value.then === "function" ? await value : value;
              if (res === null) {
                reading = false;
                throw new ERR_STREAM_NULL_VALUES();
              } else if (readable.push(res)) {
                continue;
              } else {
                reading = false;
              }
            }
          } catch (err3) {
            readable.destroy(err3);
          }
          break;
        }
      }
      return readable;
    }
    module.exports = from;
  }
});

// node_modules/readable-stream/lib/internal/streams/readable.js
var require_readable = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/readable.js"(exports, module) {
    "use strict";
    var process = require_process();
    var {
      ArrayPrototypeIndexOf,
      NumberIsInteger,
      NumberIsNaN,
      NumberParseInt,
      ObjectDefineProperties,
      ObjectKeys,
      ObjectSetPrototypeOf,
      Promise: Promise2,
      SafeSet,
      SymbolAsyncDispose,
      SymbolAsyncIterator,
      Symbol: Symbol2
    } = require_primordials();
    module.exports = Readable2;
    Readable2.ReadableState = ReadableState;
    var { EventEmitter: EE } = (init_events(), __toCommonJS(events_exports));
    var { Stream: Stream3, prependListener } = require_legacy();
    var { Buffer: Buffer13 } = require_buffer();
    var { addAbortSignal: addAbortSignal2 } = require_add_abort_signal();
    var eos = require_end_of_stream();
    var debug2 = require_util().debuglog("stream", (fn) => {
      debug2 = fn;
    });
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var { getHighWaterMark, getDefaultHighWaterMark: getDefaultHighWaterMark2 } = require_state();
    var {
      aggregateTwoErrors,
      codes: {
        ERR_INVALID_ARG_TYPE,
        ERR_METHOD_NOT_IMPLEMENTED,
        ERR_OUT_OF_RANGE,
        ERR_STREAM_PUSH_AFTER_EOF,
        ERR_STREAM_UNSHIFT_AFTER_END_EVENT
      },
      AbortError
    } = require_errors();
    var { validateObject } = require_validators();
    var kPaused = Symbol2("kPaused");
    var { StringDecoder: StringDecoder2 } = (init_string_decoder(), __toCommonJS(string_decoder_exports));
    var from = require_from();
    ObjectSetPrototypeOf(Readable2.prototype, Stream3.prototype);
    ObjectSetPrototypeOf(Readable2, Stream3);
    var nop = () => {
    };
    var { errorOrDestroy } = destroyImpl;
    var kObjectMode = 1 << 0;
    var kEnded = 1 << 1;
    var kEndEmitted = 1 << 2;
    var kReading = 1 << 3;
    var kConstructed = 1 << 4;
    var kSync = 1 << 5;
    var kNeedReadable = 1 << 6;
    var kEmittedReadable = 1 << 7;
    var kReadableListening = 1 << 8;
    var kResumeScheduled = 1 << 9;
    var kErrorEmitted = 1 << 10;
    var kEmitClose = 1 << 11;
    var kAutoDestroy = 1 << 12;
    var kDestroyed = 1 << 13;
    var kClosed = 1 << 14;
    var kCloseEmitted = 1 << 15;
    var kMultiAwaitDrain = 1 << 16;
    var kReadingMore = 1 << 17;
    var kDataEmitted = 1 << 18;
    function makeBitMapDescriptor(bit) {
      return {
        enumerable: false,
        get() {
          return (this.state & bit) !== 0;
        },
        set(value) {
          if (value) this.state |= bit;
          else this.state &= ~bit;
        }
      };
    }
    ObjectDefineProperties(ReadableState.prototype, {
      objectMode: makeBitMapDescriptor(kObjectMode),
      ended: makeBitMapDescriptor(kEnded),
      endEmitted: makeBitMapDescriptor(kEndEmitted),
      reading: makeBitMapDescriptor(kReading),
      // Stream is still being constructed and cannot be
      // destroyed until construction finished or failed.
      // Async construction is opt in, therefore we start as
      // constructed.
      constructed: makeBitMapDescriptor(kConstructed),
      // A flag to be able to tell if the event 'readable'/'data' is emitted
      // immediately, or on a later tick.  We set this to true at first, because
      // any actions that shouldn't happen until "later" should generally also
      // not happen before the first read call.
      sync: makeBitMapDescriptor(kSync),
      // Whenever we return null, then we set a flag to say
      // that we're awaiting a 'readable' event emission.
      needReadable: makeBitMapDescriptor(kNeedReadable),
      emittedReadable: makeBitMapDescriptor(kEmittedReadable),
      readableListening: makeBitMapDescriptor(kReadableListening),
      resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
      // True if the error was already emitted and should not be thrown again.
      errorEmitted: makeBitMapDescriptor(kErrorEmitted),
      emitClose: makeBitMapDescriptor(kEmitClose),
      autoDestroy: makeBitMapDescriptor(kAutoDestroy),
      // Has it been destroyed.
      destroyed: makeBitMapDescriptor(kDestroyed),
      // Indicates whether the stream has finished destroying.
      closed: makeBitMapDescriptor(kClosed),
      // True if close has been emitted or would have been emitted
      // depending on emitClose.
      closeEmitted: makeBitMapDescriptor(kCloseEmitted),
      multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
      // If true, a maybeReadMore has been scheduled.
      readingMore: makeBitMapDescriptor(kReadingMore),
      dataEmitted: makeBitMapDescriptor(kDataEmitted)
    });
    function ReadableState(options, stream, isDuplex) {
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
      this.state = kEmitClose | kAutoDestroy | kConstructed | kSync;
      if (options && options.objectMode) this.state |= kObjectMode;
      if (isDuplex && options && options.readableObjectMode) this.state |= kObjectMode;
      this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark2(false);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = [];
      this.flowing = null;
      this[kPaused] = null;
      if (options && options.emitClose === false) this.state &= ~kEmitClose;
      if (options && options.autoDestroy === false) this.state &= ~kAutoDestroy;
      this.errored = null;
      this.defaultEncoding = options && options.defaultEncoding || "utf8";
      this.awaitDrainWriters = null;
      this.decoder = null;
      this.encoding = null;
      if (options && options.encoding) {
        this.decoder = new StringDecoder2(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable2(options) {
      if (!(this instanceof Readable2)) return new Readable2(options);
      const isDuplex = this instanceof require_duplex();
      this._readableState = new ReadableState(options, this, isDuplex);
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.construct === "function") this._construct = options.construct;
        if (options.signal && !isDuplex) addAbortSignal2(options.signal, this);
      }
      Stream3.call(this, options);
      destroyImpl.construct(this, () => {
        if (this._readableState.needReadable) {
          maybeReadMore(this, this._readableState);
        }
      });
    }
    Readable2.prototype.destroy = destroyImpl.destroy;
    Readable2.prototype._undestroy = destroyImpl.undestroy;
    Readable2.prototype._destroy = function(err3, cb) {
      cb(err3);
    };
    Readable2.prototype[EE.captureRejectionSymbol] = function(err3) {
      this.destroy(err3);
    };
    Readable2.prototype[SymbolAsyncDispose] = function() {
      let error;
      if (!this.destroyed) {
        error = this.readableEnded ? null : new AbortError();
        this.destroy(error);
      }
      return new Promise2((resolve3, reject) => eos(this, (err3) => err3 && err3 !== error ? reject(err3) : resolve3(null)));
    };
    Readable2.prototype.push = function(chunk, encoding) {
      return readableAddChunk(this, chunk, encoding, false);
    };
    Readable2.prototype.unshift = function(chunk, encoding) {
      return readableAddChunk(this, chunk, encoding, true);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront) {
      debug2("readableAddChunk", chunk);
      const state = stream._readableState;
      let err3;
      if ((state.state & kObjectMode) === 0) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (state.encoding !== encoding) {
            if (addToFront && state.encoding) {
              chunk = Buffer13.from(chunk, encoding).toString(state.encoding);
            } else {
              chunk = Buffer13.from(chunk, encoding);
              encoding = "";
            }
          }
        } else if (chunk instanceof Buffer13) {
          encoding = "";
        } else if (Stream3._isUint8Array(chunk)) {
          chunk = Stream3._uint8ArrayToBuffer(chunk);
          encoding = "";
        } else if (chunk != null) {
          err3 = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
        }
      }
      if (err3) {
        errorOrDestroy(stream, err3);
      } else if (chunk === null) {
        state.state &= ~kReading;
        onEofChunk(stream, state);
      } else if ((state.state & kObjectMode) !== 0 || chunk && chunk.length > 0) {
        if (addToFront) {
          if ((state.state & kEndEmitted) !== 0) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
          else if (state.destroyed || state.errored) return false;
          else addChunk(stream, state, chunk, true);
        } else if (state.ended) {
          errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
        } else if (state.destroyed || state.errored) {
          return false;
        } else {
          state.state &= ~kReading;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
            else maybeReadMore(stream, state);
          } else {
            addChunk(stream, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.state &= ~kReading;
        maybeReadMore(stream, state);
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync && stream.listenerCount("data") > 0) {
        if ((state.state & kMultiAwaitDrain) !== 0) {
          state.awaitDrainWriters.clear();
        } else {
          state.awaitDrainWriters = null;
        }
        state.dataEmitted = true;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if ((state.state & kNeedReadable) !== 0) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    Readable2.prototype.isPaused = function() {
      const state = this._readableState;
      return state[kPaused] === true || state.flowing === false;
    };
    Readable2.prototype.setEncoding = function(enc4) {
      const decoder = new StringDecoder2(enc4);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      const buffer = this._readableState.buffer;
      let content = "";
      for (const data of buffer) {
        content += decoder.write(data);
      }
      buffer.clear();
      if (content !== "") buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n > MAX_HWM) {
        throw new ERR_OUT_OF_RANGE("size", "<= 1GiB", n);
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if ((state.state & kObjectMode) !== 0) return 1;
      if (NumberIsNaN(n)) {
        if (state.flowing && state.length) return state.buffer.first().length;
        return state.length;
      }
      if (n <= state.length) return n;
      return state.ended ? state.length : 0;
    }
    Readable2.prototype.read = function(n) {
      debug2("read", n);
      if (n === void 0) {
        n = NaN;
      } else if (!NumberIsInteger(n)) {
        n = NumberParseInt(n, 10);
      }
      const state = this._readableState;
      const nOrig = n;
      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n !== 0) state.state &= ~kEmittedReadable;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      let doRead = (state.state & kNeedReadable) !== 0;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
        doRead = false;
        debug2("reading, ended or constructing", doRead);
      } else if (doRead) {
        debug2("do read");
        state.state |= kReading | kSync;
        if (state.length === 0) state.state |= kNeedReadable;
        try {
          this._read(state.highWaterMark);
        } catch (err3) {
          errorOrDestroy(this, err3);
        }
        state.state &= ~kSync;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      let ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        if (state.multiAwaitDrain) {
          state.awaitDrainWriters.clear();
        } else {
          state.awaitDrainWriters = null;
        }
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null && !state.errorEmitted && !state.closeEmitted) {
        state.dataEmitted = true;
        this.emit("data", ret);
      }
      return ret;
    };
    function onEofChunk(stream, state) {
      debug2("onEofChunk");
      if (state.ended) return;
      if (state.decoder) {
        const chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        state.emittedReadable = true;
        emitReadable_(stream);
      }
    }
    function emitReadable(stream) {
      const state = stream._readableState;
      debug2("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      const state = stream._readableState;
      debug2("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && !state.errored && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore && state.constructed) {
        state.readingMore = true;
        process.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        const len = state.length;
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable2.prototype._read = function(n) {
      throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
    };
    Readable2.prototype.pipe = function(dest, pipeOpts) {
      const src = this;
      const state = this._readableState;
      if (state.pipes.length === 1) {
        if (!state.multiAwaitDrain) {
          state.multiAwaitDrain = true;
          state.awaitDrainWriters = new SafeSet(state.awaitDrainWriters ? [state.awaitDrainWriters] : []);
        }
      }
      state.pipes.push(dest);
      debug2("pipe count=%d opts=%j", state.pipes.length, pipeOpts);
      const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      const endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) process.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug2("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug2("onend");
        dest.end();
      }
      let ondrain;
      let cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        if (ondrain) {
          dest.removeListener("drain", ondrain);
        }
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      function pause() {
        if (!cleanedUp) {
          if (state.pipes.length === 1 && state.pipes[0] === dest) {
            debug2("false write response, pause", 0);
            state.awaitDrainWriters = dest;
            state.multiAwaitDrain = false;
          } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
            debug2("false write response, pause", state.awaitDrainWriters.size);
            state.awaitDrainWriters.add(dest);
          }
          src.pause();
        }
        if (!ondrain) {
          ondrain = pipeOnDrain(src, dest);
          dest.on("drain", ondrain);
        }
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        const ret = dest.write(chunk);
        debug2("dest.write", ret);
        if (ret === false) {
          pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (dest.listenerCount("error") === 0) {
          const s = dest._writableState || dest._readableState;
          if (s && !s.errorEmitted) {
            errorOrDestroy(dest, er);
          } else {
            dest.emit("error", er);
          }
        }
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (dest.writableNeedDrain === true) {
        pause();
      } else if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src, dest) {
      return function pipeOnDrainFunctionResult() {
        const state = src._readableState;
        if (state.awaitDrainWriters === dest) {
          debug2("pipeOnDrain", 1);
          state.awaitDrainWriters = null;
        } else if (state.multiAwaitDrain) {
          debug2("pipeOnDrain", state.awaitDrainWriters.size);
          state.awaitDrainWriters.delete(dest);
        }
        if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && src.listenerCount("data")) {
          src.resume();
        }
      };
    }
    Readable2.prototype.unpipe = function(dest) {
      const state = this._readableState;
      const unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipes.length === 0) return this;
      if (!dest) {
        const dests = state.pipes;
        state.pipes = [];
        this.pause();
        for (let i2 = 0; i2 < dests.length; i2++)
          dests[i2].emit("unpipe", this, {
            hasUnpiped: false
          });
        return this;
      }
      const index = ArrayPrototypeIndexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      if (state.pipes.length === 0) this.pause();
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable2.prototype.on = function(ev, fn) {
      const res = Stream3.prototype.on.call(this, ev, fn);
      const state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false) this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug2("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            process.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable2.prototype.addListener = Readable2.prototype.on;
    Readable2.prototype.removeListener = function(ev, fn) {
      const res = Stream3.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable2.prototype.off = Readable2.prototype.removeListener;
    Readable2.prototype.removeAllListeners = function(ev) {
      const res = Stream3.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        process.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      const state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && state[kPaused] === false) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      } else if (!state.readableListening) {
        state.flowing = null;
      }
    }
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable2.prototype.resume = function() {
      const state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state[kPaused] = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug2("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable2.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState[kPaused] = true;
      return this;
    };
    function flow(stream) {
      const state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null) ;
    }
    Readable2.prototype.wrap = function(stream) {
      let paused = false;
      stream.on("data", (chunk) => {
        if (!this.push(chunk) && stream.pause) {
          paused = true;
          stream.pause();
        }
      });
      stream.on("end", () => {
        this.push(null);
      });
      stream.on("error", (err3) => {
        errorOrDestroy(this, err3);
      });
      stream.on("close", () => {
        this.destroy();
      });
      stream.on("destroy", () => {
        this.destroy();
      });
      this._read = () => {
        if (paused && stream.resume) {
          paused = false;
          stream.resume();
        }
      };
      const streamKeys = ObjectKeys(stream);
      for (let j = 1; j < streamKeys.length; j++) {
        const i2 = streamKeys[j];
        if (this[i2] === void 0 && typeof stream[i2] === "function") {
          this[i2] = stream[i2].bind(stream);
        }
      }
      return this;
    };
    Readable2.prototype[SymbolAsyncIterator] = function() {
      return streamToAsyncIterator(this);
    };
    Readable2.prototype.iterator = function(options) {
      if (options !== void 0) {
        validateObject(options, "options");
      }
      return streamToAsyncIterator(this, options);
    };
    function streamToAsyncIterator(stream, options) {
      if (typeof stream.read !== "function") {
        stream = Readable2.wrap(stream, {
          objectMode: true
        });
      }
      const iter = createAsyncIterator(stream, options);
      iter.stream = stream;
      return iter;
    }
    async function* createAsyncIterator(stream, options) {
      let callback = nop;
      function next(resolve3) {
        if (this === stream) {
          callback();
          callback = nop;
        } else {
          callback = resolve3;
        }
      }
      stream.on("readable", next);
      let error;
      const cleanup = eos(
        stream,
        {
          writable: false
        },
        (err3) => {
          error = err3 ? aggregateTwoErrors(error, err3) : null;
          callback();
          callback = nop;
        }
      );
      try {
        while (true) {
          const chunk = stream.destroyed ? null : stream.read();
          if (chunk !== null) {
            yield chunk;
          } else if (error) {
            throw error;
          } else if (error === null) {
            return;
          } else {
            await new Promise2(next);
          }
        }
      } catch (err3) {
        error = aggregateTwoErrors(error, err3);
        throw error;
      } finally {
        if ((error || (options === null || options === void 0 ? void 0 : options.destroyOnReturn) !== false) && (error === void 0 || stream._readableState.autoDestroy)) {
          destroyImpl.destroyer(stream, null);
        } else {
          stream.off("readable", next);
          cleanup();
        }
      }
    }
    ObjectDefineProperties(Readable2.prototype, {
      readable: {
        __proto__: null,
        get() {
          const r = this._readableState;
          return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
        },
        set(val) {
          if (this._readableState) {
            this._readableState.readable = !!val;
          }
        }
      },
      readableDidRead: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState.dataEmitted;
        }
      },
      readableAborted: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
        }
      },
      readableHighWaterMark: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState.highWaterMark;
        }
      },
      readableBuffer: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState && this._readableState.buffer;
        }
      },
      readableFlowing: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return this._readableState.flowing;
        },
        set: function(state) {
          if (this._readableState) {
            this._readableState.flowing = state;
          }
        }
      },
      readableLength: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState.length;
        }
      },
      readableObjectMode: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.objectMode : false;
        }
      },
      readableEncoding: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.encoding : null;
        }
      },
      errored: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.errored : null;
        }
      },
      closed: {
        __proto__: null,
        get() {
          return this._readableState ? this._readableState.closed : false;
        }
      },
      destroyed: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.destroyed : false;
        },
        set(value) {
          if (!this._readableState) {
            return;
          }
          this._readableState.destroyed = value;
        }
      },
      readableEnded: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._readableState ? this._readableState.endEmitted : false;
        }
      }
    });
    ObjectDefineProperties(ReadableState.prototype, {
      // Legacy getter for `pipesCount`.
      pipesCount: {
        __proto__: null,
        get() {
          return this.pipes.length;
        }
      },
      // Legacy property for `paused`.
      paused: {
        __proto__: null,
        get() {
          return this[kPaused] !== false;
        },
        set(value) {
          this[kPaused] = !!value;
        }
      }
    });
    Readable2._fromList = fromList;
    function fromList(n, state) {
      if (state.length === 0) return null;
      let ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      const state = stream._readableState;
      debug2("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        process.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug2("endReadableNT", state.endEmitted, state.length);
      if (!state.errored && !state.closeEmitted && !state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.emit("end");
        if (stream.writable && stream.allowHalfOpen === false) {
          process.nextTick(endWritableNT, stream);
        } else if (state.autoDestroy) {
          const wState = stream._writableState;
          const autoDestroy = !wState || wState.autoDestroy && // We don't expect the writable to ever 'finish'
          // if writable is explicitly set to false.
          (wState.finished || wState.writable === false);
          if (autoDestroy) {
            stream.destroy();
          }
        }
      }
    }
    function endWritableNT(stream) {
      const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
      if (writable) {
        stream.end();
      }
    }
    Readable2.from = function(iterable, opts) {
      return from(Readable2, iterable, opts);
    };
    var webStreamsAdapters;
    function lazyWebStreams() {
      if (webStreamsAdapters === void 0) webStreamsAdapters = {};
      return webStreamsAdapters;
    }
    Readable2.fromWeb = function(readableStream, options) {
      return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options);
    };
    Readable2.toWeb = function(streamReadable, options) {
      return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options);
    };
    Readable2.wrap = function(src, options) {
      var _ref, _src$readableObjectMo;
      return new Readable2({
        objectMode: (_ref = (_src$readableObjectMo = src.readableObjectMode) !== null && _src$readableObjectMo !== void 0 ? _src$readableObjectMo : src.objectMode) !== null && _ref !== void 0 ? _ref : true,
        ...options,
        destroy(err3, callback) {
          destroyImpl.destroyer(src, err3);
          callback(err3);
        }
      }).wrap(src);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/writable.js
var require_writable = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/writable.js"(exports, module) {
    "use strict";
    var process = require_process();
    var {
      ArrayPrototypeSlice,
      Error: Error2,
      FunctionPrototypeSymbolHasInstance,
      ObjectDefineProperty,
      ObjectDefineProperties,
      ObjectSetPrototypeOf,
      StringPrototypeToLowerCase,
      Symbol: Symbol2,
      SymbolHasInstance
    } = require_primordials();
    module.exports = Writable2;
    Writable2.WritableState = WritableState;
    var { EventEmitter: EE } = (init_events(), __toCommonJS(events_exports));
    var Stream3 = require_legacy().Stream;
    var { Buffer: Buffer13 } = require_buffer();
    var destroyImpl = require_destroy();
    var { addAbortSignal: addAbortSignal2 } = require_add_abort_signal();
    var { getHighWaterMark, getDefaultHighWaterMark: getDefaultHighWaterMark2 } = require_state();
    var {
      ERR_INVALID_ARG_TYPE,
      ERR_METHOD_NOT_IMPLEMENTED,
      ERR_MULTIPLE_CALLBACK,
      ERR_STREAM_CANNOT_PIPE,
      ERR_STREAM_DESTROYED,
      ERR_STREAM_ALREADY_FINISHED,
      ERR_STREAM_NULL_VALUES,
      ERR_STREAM_WRITE_AFTER_END,
      ERR_UNKNOWN_ENCODING
    } = require_errors().codes;
    var { errorOrDestroy } = destroyImpl;
    ObjectSetPrototypeOf(Writable2.prototype, Stream3.prototype);
    ObjectSetPrototypeOf(Writable2, Stream3);
    function nop() {
    }
    var kOnFinished = Symbol2("kOnFinished");
    function WritableState(options, stream, isDuplex) {
      if (typeof isDuplex !== "boolean") isDuplex = stream instanceof require_duplex();
      this.objectMode = !!(options && options.objectMode);
      if (isDuplex) this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
      this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark2(false);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      const noDecode = !!(options && options.decodeStrings === false);
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options && options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = onwrite.bind(void 0, stream);
      this.writecb = null;
      this.writelen = 0;
      this.afterWriteTickInfo = null;
      resetBuffer(this);
      this.pendingcb = 0;
      this.constructed = true;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = !options || options.emitClose !== false;
      this.autoDestroy = !options || options.autoDestroy !== false;
      this.errored = null;
      this.closed = false;
      this.closeEmitted = false;
      this[kOnFinished] = [];
    }
    function resetBuffer(state) {
      state.buffered = [];
      state.bufferedIndex = 0;
      state.allBuffers = true;
      state.allNoop = true;
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      return ArrayPrototypeSlice(this.buffered, this.bufferedIndex);
    };
    ObjectDefineProperty(WritableState.prototype, "bufferedRequestCount", {
      __proto__: null,
      get() {
        return this.buffered.length - this.bufferedIndex;
      }
    });
    function Writable2(options) {
      const isDuplex = this instanceof require_duplex();
      if (!isDuplex && !FunctionPrototypeSymbolHasInstance(Writable2, this)) return new Writable2(options);
      this._writableState = new WritableState(options, this, isDuplex);
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
        if (typeof options.construct === "function") this._construct = options.construct;
        if (options.signal) addAbortSignal2(options.signal, this);
      }
      Stream3.call(this, options);
      destroyImpl.construct(this, () => {
        const state = this._writableState;
        if (!state.writing) {
          clearBuffer(this, state);
        }
        finishMaybe(this, state);
      });
    }
    ObjectDefineProperty(Writable2, SymbolHasInstance, {
      __proto__: null,
      value: function(object) {
        if (FunctionPrototypeSymbolHasInstance(this, object)) return true;
        if (this !== Writable2) return false;
        return object && object._writableState instanceof WritableState;
      }
    });
    Writable2.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function _write(stream, chunk, encoding, cb) {
      const state = stream._writableState;
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = state.defaultEncoding;
      } else {
        if (!encoding) encoding = state.defaultEncoding;
        else if (encoding !== "buffer" && !Buffer13.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
        if (typeof cb !== "function") cb = nop;
      }
      if (chunk === null) {
        throw new ERR_STREAM_NULL_VALUES();
      } else if (!state.objectMode) {
        if (typeof chunk === "string") {
          if (state.decodeStrings !== false) {
            chunk = Buffer13.from(chunk, encoding);
            encoding = "buffer";
          }
        } else if (chunk instanceof Buffer13) {
          encoding = "buffer";
        } else if (Stream3._isUint8Array(chunk)) {
          chunk = Stream3._uint8ArrayToBuffer(chunk);
          encoding = "buffer";
        } else {
          throw new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
        }
      }
      let err3;
      if (state.ending) {
        err3 = new ERR_STREAM_WRITE_AFTER_END();
      } else if (state.destroyed) {
        err3 = new ERR_STREAM_DESTROYED("write");
      }
      if (err3) {
        process.nextTick(cb, err3);
        errorOrDestroy(stream, err3, true);
        return err3;
      }
      state.pendingcb++;
      return writeOrBuffer(stream, state, chunk, encoding, cb);
    }
    Writable2.prototype.write = function(chunk, encoding, cb) {
      return _write(this, chunk, encoding, cb) === true;
    };
    Writable2.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable2.prototype.uncork = function() {
      const state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing) clearBuffer(this, state);
      }
    };
    Writable2.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = StringPrototypeToLowerCase(encoding);
      if (!Buffer13.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    function writeOrBuffer(stream, state, chunk, encoding, callback) {
      const len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      const ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked || state.errored || !state.constructed) {
        state.buffered.push({
          chunk,
          encoding,
          callback
        });
        if (state.allBuffers && encoding !== "buffer") {
          state.allBuffers = false;
        }
        if (state.allNoop && callback !== nop) {
          state.allNoop = false;
        }
      } else {
        state.writelen = len;
        state.writecb = callback;
        state.writing = true;
        state.sync = true;
        stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      return ret && !state.errored && !state.destroyed;
    }
    function doWrite(stream, state, writev2, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev2) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, er, cb) {
      --state.pendingcb;
      cb(er);
      errorBuffer(state);
      errorOrDestroy(stream, er);
    }
    function onwrite(stream, er) {
      const state = stream._writableState;
      const sync = state.sync;
      const cb = state.writecb;
      if (typeof cb !== "function") {
        errorOrDestroy(stream, new ERR_MULTIPLE_CALLBACK());
        return;
      }
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
      if (er) {
        er.stack;
        if (!state.errored) {
          state.errored = er;
        }
        if (stream._readableState && !stream._readableState.errored) {
          stream._readableState.errored = er;
        }
        if (sync) {
          process.nextTick(onwriteError, stream, state, er, cb);
        } else {
          onwriteError(stream, state, er, cb);
        }
      } else {
        if (state.buffered.length > state.bufferedIndex) {
          clearBuffer(stream, state);
        }
        if (sync) {
          if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
            state.afterWriteTickInfo.count++;
          } else {
            state.afterWriteTickInfo = {
              count: 1,
              cb,
              stream,
              state
            };
            process.nextTick(afterWriteTick, state.afterWriteTickInfo);
          }
        } else {
          afterWrite(stream, state, 1, cb);
        }
      }
    }
    function afterWriteTick({ stream, state, count, cb }) {
      state.afterWriteTickInfo = null;
      return afterWrite(stream, state, count, cb);
    }
    function afterWrite(stream, state, count, cb) {
      const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;
      if (needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
      while (count-- > 0) {
        state.pendingcb--;
        cb();
      }
      if (state.destroyed) {
        errorBuffer(state);
      }
      finishMaybe(stream, state);
    }
    function errorBuffer(state) {
      if (state.writing) {
        return;
      }
      for (let n = state.bufferedIndex; n < state.buffered.length; ++n) {
        var _state$errored;
        const { chunk, callback } = state.buffered[n];
        const len = state.objectMode ? 1 : chunk.length;
        state.length -= len;
        callback(
          (_state$errored = state.errored) !== null && _state$errored !== void 0 ? _state$errored : new ERR_STREAM_DESTROYED("write")
        );
      }
      const onfinishCallbacks = state[kOnFinished].splice(0);
      for (let i2 = 0; i2 < onfinishCallbacks.length; i2++) {
        var _state$errored2;
        onfinishCallbacks[i2](
          (_state$errored2 = state.errored) !== null && _state$errored2 !== void 0 ? _state$errored2 : new ERR_STREAM_DESTROYED("end")
        );
      }
      resetBuffer(state);
    }
    function clearBuffer(stream, state) {
      if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
        return;
      }
      const { buffered, bufferedIndex, objectMode } = state;
      const bufferedLength = buffered.length - bufferedIndex;
      if (!bufferedLength) {
        return;
      }
      let i2 = bufferedIndex;
      state.bufferProcessing = true;
      if (bufferedLength > 1 && stream._writev) {
        state.pendingcb -= bufferedLength - 1;
        const callback = state.allNoop ? nop : (err3) => {
          for (let n = i2; n < buffered.length; ++n) {
            buffered[n].callback(err3);
          }
        };
        const chunks = state.allNoop && i2 === 0 ? buffered : ArrayPrototypeSlice(buffered, i2);
        chunks.allBuffers = state.allBuffers;
        doWrite(stream, state, true, state.length, chunks, "", callback);
        resetBuffer(state);
      } else {
        do {
          const { chunk, encoding, callback } = buffered[i2];
          buffered[i2++] = null;
          const len = objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, callback);
        } while (i2 < buffered.length && !state.writing);
        if (i2 === buffered.length) {
          resetBuffer(state);
        } else if (i2 > 256) {
          buffered.splice(0, i2);
          state.bufferedIndex = 0;
        } else {
          state.bufferedIndex = i2;
        }
      }
      state.bufferProcessing = false;
    }
    Writable2.prototype._write = function(chunk, encoding, cb) {
      if (this._writev) {
        this._writev(
          [
            {
              chunk,
              encoding
            }
          ],
          cb
        );
      } else {
        throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
      }
    };
    Writable2.prototype._writev = null;
    Writable2.prototype.end = function(chunk, encoding, cb) {
      const state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      let err3;
      if (chunk !== null && chunk !== void 0) {
        const ret = _write(this, chunk, encoding);
        if (ret instanceof Error2) {
          err3 = ret;
        }
      }
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (err3) {
      } else if (!state.errored && !state.ending) {
        state.ending = true;
        finishMaybe(this, state, true);
        state.ended = true;
      } else if (state.finished) {
        err3 = new ERR_STREAM_ALREADY_FINISHED("end");
      } else if (state.destroyed) {
        err3 = new ERR_STREAM_DESTROYED("end");
      }
      if (typeof cb === "function") {
        if (err3 || state.finished) {
          process.nextTick(cb, err3);
        } else {
          state[kOnFinished].push(cb);
        }
      }
      return this;
    };
    function needFinish(state) {
      return state.ending && !state.destroyed && state.constructed && state.length === 0 && !state.errored && state.buffered.length === 0 && !state.finished && !state.writing && !state.errorEmitted && !state.closeEmitted;
    }
    function callFinal(stream, state) {
      let called = false;
      function onFinish(err3) {
        if (called) {
          errorOrDestroy(stream, err3 !== null && err3 !== void 0 ? err3 : ERR_MULTIPLE_CALLBACK());
          return;
        }
        called = true;
        state.pendingcb--;
        if (err3) {
          const onfinishCallbacks = state[kOnFinished].splice(0);
          for (let i2 = 0; i2 < onfinishCallbacks.length; i2++) {
            onfinishCallbacks[i2](err3);
          }
          errorOrDestroy(stream, err3, state.sync);
        } else if (needFinish(state)) {
          state.prefinished = true;
          stream.emit("prefinish");
          state.pendingcb++;
          process.nextTick(finish, stream, state);
        }
      }
      state.sync = true;
      state.pendingcb++;
      try {
        stream._final(onFinish);
      } catch (err3) {
        onFinish(err3);
      }
      state.sync = false;
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.finalCalled = true;
          callFinal(stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state, sync) {
      if (needFinish(state)) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          if (sync) {
            state.pendingcb++;
            process.nextTick(
              (stream2, state2) => {
                if (needFinish(state2)) {
                  finish(stream2, state2);
                } else {
                  state2.pendingcb--;
                }
              },
              stream,
              state
            );
          } else if (needFinish(state)) {
            state.pendingcb++;
            finish(stream, state);
          }
        }
      }
    }
    function finish(stream, state) {
      state.pendingcb--;
      state.finished = true;
      const onfinishCallbacks = state[kOnFinished].splice(0);
      for (let i2 = 0; i2 < onfinishCallbacks.length; i2++) {
        onfinishCallbacks[i2]();
      }
      stream.emit("finish");
      if (state.autoDestroy) {
        const rState = stream._readableState;
        const autoDestroy = !rState || rState.autoDestroy && // We don't expect the readable to ever 'end'
        // if readable is explicitly set to false.
        (rState.endEmitted || rState.readable === false);
        if (autoDestroy) {
          stream.destroy();
        }
      }
    }
    ObjectDefineProperties(Writable2.prototype, {
      closed: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.closed : false;
        }
      },
      destroyed: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.destroyed : false;
        },
        set(value) {
          if (this._writableState) {
            this._writableState.destroyed = value;
          }
        }
      },
      writable: {
        __proto__: null,
        get() {
          const w = this._writableState;
          return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
        },
        set(val) {
          if (this._writableState) {
            this._writableState.writable = !!val;
          }
        }
      },
      writableFinished: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.finished : false;
        }
      },
      writableObjectMode: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.objectMode : false;
        }
      },
      writableBuffer: {
        __proto__: null,
        get() {
          return this._writableState && this._writableState.getBuffer();
        }
      },
      writableEnded: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.ending : false;
        }
      },
      writableNeedDrain: {
        __proto__: null,
        get() {
          const wState = this._writableState;
          if (!wState) return false;
          return !wState.destroyed && !wState.ending && wState.needDrain;
        }
      },
      writableHighWaterMark: {
        __proto__: null,
        get() {
          return this._writableState && this._writableState.highWaterMark;
        }
      },
      writableCorked: {
        __proto__: null,
        get() {
          return this._writableState ? this._writableState.corked : 0;
        }
      },
      writableLength: {
        __proto__: null,
        get() {
          return this._writableState && this._writableState.length;
        }
      },
      errored: {
        __proto__: null,
        enumerable: false,
        get() {
          return this._writableState ? this._writableState.errored : null;
        }
      },
      writableAborted: {
        __proto__: null,
        enumerable: false,
        get: function() {
          return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
        }
      }
    });
    var destroy2 = destroyImpl.destroy;
    Writable2.prototype.destroy = function(err3, cb) {
      const state = this._writableState;
      if (!state.destroyed && (state.bufferedIndex < state.buffered.length || state[kOnFinished].length)) {
        process.nextTick(errorBuffer, state);
      }
      destroy2.call(this, err3, cb);
      return this;
    };
    Writable2.prototype._undestroy = destroyImpl.undestroy;
    Writable2.prototype._destroy = function(err3, cb) {
      cb(err3);
    };
    Writable2.prototype[EE.captureRejectionSymbol] = function(err3) {
      this.destroy(err3);
    };
    var webStreamsAdapters;
    function lazyWebStreams() {
      if (webStreamsAdapters === void 0) webStreamsAdapters = {};
      return webStreamsAdapters;
    }
    Writable2.fromWeb = function(writableStream, options) {
      return lazyWebStreams().newStreamWritableFromWritableStream(writableStream, options);
    };
    Writable2.toWeb = function(streamWritable) {
      return lazyWebStreams().newWritableStreamFromStreamWritable(streamWritable);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/duplexify.js
var require_duplexify = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/duplexify.js"(exports, module) {
    var process = require_process();
    var bufferModule = require_buffer();
    var {
      isReadable: isReadable2,
      isWritable: isWritable2,
      isIterable,
      isNodeStream,
      isReadableNodeStream,
      isWritableNodeStream,
      isDuplexNodeStream,
      isReadableStream,
      isWritableStream
    } = require_utils();
    var eos = require_end_of_stream();
    var {
      AbortError,
      codes: { ERR_INVALID_ARG_TYPE, ERR_INVALID_RETURN_VALUE }
    } = require_errors();
    var { destroyer } = require_destroy();
    var Duplex2 = require_duplex();
    var Readable2 = require_readable();
    var Writable2 = require_writable();
    var { createDeferredPromise } = require_util();
    var from = require_from();
    var Blob2 = globalThis.Blob || bufferModule.Blob;
    var isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
      return b instanceof Blob2;
    } : function isBlob2(b) {
      return false;
    };
    var AbortController3 = globalThis.AbortController || (init_abort_controller(), __toCommonJS(abort_controller_exports)).AbortController;
    var { FunctionPrototypeCall } = require_primordials();
    var Duplexify = class extends Duplex2 {
      constructor(options) {
        super(options);
        if ((options === null || options === void 0 ? void 0 : options.readable) === false) {
          this._readableState.readable = false;
          this._readableState.ended = true;
          this._readableState.endEmitted = true;
        }
        if ((options === null || options === void 0 ? void 0 : options.writable) === false) {
          this._writableState.writable = false;
          this._writableState.ending = true;
          this._writableState.ended = true;
          this._writableState.finished = true;
        }
      }
    };
    module.exports = function duplexify(body, name) {
      if (isDuplexNodeStream(body)) {
        return body;
      }
      if (isReadableNodeStream(body)) {
        return _duplexify({
          readable: body
        });
      }
      if (isWritableNodeStream(body)) {
        return _duplexify({
          writable: body
        });
      }
      if (isNodeStream(body)) {
        return _duplexify({
          writable: false,
          readable: false
        });
      }
      if (isReadableStream(body)) {
        return _duplexify({
          readable: Readable2.fromWeb(body)
        });
      }
      if (isWritableStream(body)) {
        return _duplexify({
          writable: Writable2.fromWeb(body)
        });
      }
      if (typeof body === "function") {
        const { value, write: write2, final, destroy: destroy2 } = fromAsyncGen(body);
        if (isIterable(value)) {
          return from(Duplexify, value, {
            // TODO (ronag): highWaterMark?
            objectMode: true,
            write: write2,
            final,
            destroy: destroy2
          });
        }
        const then2 = value === null || value === void 0 ? void 0 : value.then;
        if (typeof then2 === "function") {
          let d;
          const promise = FunctionPrototypeCall(
            then2,
            value,
            (val) => {
              if (val != null) {
                throw new ERR_INVALID_RETURN_VALUE("nully", "body", val);
              }
            },
            (err3) => {
              destroyer(d, err3);
            }
          );
          return d = new Duplexify({
            // TODO (ronag): highWaterMark?
            objectMode: true,
            readable: false,
            write: write2,
            final(cb) {
              final(async () => {
                try {
                  await promise;
                  process.nextTick(cb, null);
                } catch (err3) {
                  process.nextTick(cb, err3);
                }
              });
            },
            destroy: destroy2
          });
        }
        throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or AsyncFunction", name, value);
      }
      if (isBlob(body)) {
        return duplexify(body.arrayBuffer());
      }
      if (isIterable(body)) {
        return from(Duplexify, body, {
          // TODO (ronag): highWaterMark?
          objectMode: true,
          writable: false
        });
      }
      if (isReadableStream(body === null || body === void 0 ? void 0 : body.readable) && isWritableStream(body === null || body === void 0 ? void 0 : body.writable)) {
        return Duplexify.fromWeb(body);
      }
      if (typeof (body === null || body === void 0 ? void 0 : body.writable) === "object" || typeof (body === null || body === void 0 ? void 0 : body.readable) === "object") {
        const readable = body !== null && body !== void 0 && body.readable ? isReadableNodeStream(body === null || body === void 0 ? void 0 : body.readable) ? body === null || body === void 0 ? void 0 : body.readable : duplexify(body.readable) : void 0;
        const writable = body !== null && body !== void 0 && body.writable ? isWritableNodeStream(body === null || body === void 0 ? void 0 : body.writable) ? body === null || body === void 0 ? void 0 : body.writable : duplexify(body.writable) : void 0;
        return _duplexify({
          readable,
          writable
        });
      }
      const then = body === null || body === void 0 ? void 0 : body.then;
      if (typeof then === "function") {
        let d;
        FunctionPrototypeCall(
          then,
          body,
          (val) => {
            if (val != null) {
              d.push(val);
            }
            d.push(null);
          },
          (err3) => {
            destroyer(d, err3);
          }
        );
        return d = new Duplexify({
          objectMode: true,
          writable: false,
          read() {
          }
        });
      }
      throw new ERR_INVALID_ARG_TYPE(
        name,
        [
          "Blob",
          "ReadableStream",
          "WritableStream",
          "Stream",
          "Iterable",
          "AsyncIterable",
          "Function",
          "{ readable, writable } pair",
          "Promise"
        ],
        body
      );
    };
    function fromAsyncGen(fn) {
      let { promise, resolve: resolve3 } = createDeferredPromise();
      const ac = new AbortController3();
      const signal = ac.signal;
      const value = fn(
        (async function* () {
          while (true) {
            const _promise = promise;
            promise = null;
            const { chunk, done, cb } = await _promise;
            process.nextTick(cb);
            if (done) return;
            if (signal.aborted)
              throw new AbortError(void 0, {
                cause: signal.reason
              });
            ({ promise, resolve: resolve3 } = createDeferredPromise());
            yield chunk;
          }
        })(),
        {
          signal
        }
      );
      return {
        value,
        write(chunk, encoding, cb) {
          const _resolve = resolve3;
          resolve3 = null;
          _resolve({
            chunk,
            done: false,
            cb
          });
        },
        final(cb) {
          const _resolve = resolve3;
          resolve3 = null;
          _resolve({
            done: true,
            cb
          });
        },
        destroy(err3, cb) {
          ac.abort();
          cb(err3);
        }
      };
    }
    function _duplexify(pair) {
      const r = pair.readable && typeof pair.readable.read !== "function" ? Readable2.wrap(pair.readable) : pair.readable;
      const w = pair.writable;
      let readable = !!isReadable2(r);
      let writable = !!isWritable2(w);
      let ondrain;
      let onfinish;
      let onreadable;
      let onclose;
      let d;
      function onfinished(err3) {
        const cb = onclose;
        onclose = null;
        if (cb) {
          cb(err3);
        } else if (err3) {
          d.destroy(err3);
        }
      }
      d = new Duplexify({
        // TODO (ronag): highWaterMark?
        readableObjectMode: !!(r !== null && r !== void 0 && r.readableObjectMode),
        writableObjectMode: !!(w !== null && w !== void 0 && w.writableObjectMode),
        readable,
        writable
      });
      if (writable) {
        eos(w, (err3) => {
          writable = false;
          if (err3) {
            destroyer(r, err3);
          }
          onfinished(err3);
        });
        d._write = function(chunk, encoding, callback) {
          if (w.write(chunk, encoding)) {
            callback();
          } else {
            ondrain = callback;
          }
        };
        d._final = function(callback) {
          w.end();
          onfinish = callback;
        };
        w.on("drain", function() {
          if (ondrain) {
            const cb = ondrain;
            ondrain = null;
            cb();
          }
        });
        w.on("finish", function() {
          if (onfinish) {
            const cb = onfinish;
            onfinish = null;
            cb();
          }
        });
      }
      if (readable) {
        eos(r, (err3) => {
          readable = false;
          if (err3) {
            destroyer(r, err3);
          }
          onfinished(err3);
        });
        r.on("readable", function() {
          if (onreadable) {
            const cb = onreadable;
            onreadable = null;
            cb();
          }
        });
        r.on("end", function() {
          d.push(null);
        });
        d._read = function() {
          while (true) {
            const buf2 = r.read();
            if (buf2 === null) {
              onreadable = d._read;
              return;
            }
            if (!d.push(buf2)) {
              return;
            }
          }
        };
      }
      d._destroy = function(err3, callback) {
        if (!err3 && onclose !== null) {
          err3 = new AbortError();
        }
        onreadable = null;
        ondrain = null;
        onfinish = null;
        if (onclose === null) {
          callback(err3);
        } else {
          onclose = callback;
          destroyer(w, err3);
          destroyer(r, err3);
        }
      };
      return d;
    }
  }
});

// node_modules/readable-stream/lib/internal/streams/duplex.js
var require_duplex = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/duplex.js"(exports, module) {
    "use strict";
    var {
      ObjectDefineProperties,
      ObjectGetOwnPropertyDescriptor,
      ObjectKeys,
      ObjectSetPrototypeOf
    } = require_primordials();
    module.exports = Duplex2;
    var Readable2 = require_readable();
    var Writable2 = require_writable();
    ObjectSetPrototypeOf(Duplex2.prototype, Readable2.prototype);
    ObjectSetPrototypeOf(Duplex2, Readable2);
    {
      const keys = ObjectKeys(Writable2.prototype);
      for (let i2 = 0; i2 < keys.length; i2++) {
        const method = keys[i2];
        if (!Duplex2.prototype[method]) Duplex2.prototype[method] = Writable2.prototype[method];
      }
    }
    function Duplex2(options) {
      if (!(this instanceof Duplex2)) return new Duplex2(options);
      Readable2.call(this, options);
      Writable2.call(this, options);
      if (options) {
        this.allowHalfOpen = options.allowHalfOpen !== false;
        if (options.readable === false) {
          this._readableState.readable = false;
          this._readableState.ended = true;
          this._readableState.endEmitted = true;
        }
        if (options.writable === false) {
          this._writableState.writable = false;
          this._writableState.ending = true;
          this._writableState.ended = true;
          this._writableState.finished = true;
        }
      } else {
        this.allowHalfOpen = true;
      }
    }
    ObjectDefineProperties(Duplex2.prototype, {
      writable: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writable")
      },
      writableHighWaterMark: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableHighWaterMark")
      },
      writableObjectMode: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableObjectMode")
      },
      writableBuffer: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableBuffer")
      },
      writableLength: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableLength")
      },
      writableFinished: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableFinished")
      },
      writableCorked: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableCorked")
      },
      writableEnded: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableEnded")
      },
      writableNeedDrain: {
        __proto__: null,
        ...ObjectGetOwnPropertyDescriptor(Writable2.prototype, "writableNeedDrain")
      },
      destroyed: {
        __proto__: null,
        get() {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set(value) {
          if (this._readableState && this._writableState) {
            this._readableState.destroyed = value;
            this._writableState.destroyed = value;
          }
        }
      }
    });
    var webStreamsAdapters;
    function lazyWebStreams() {
      if (webStreamsAdapters === void 0) webStreamsAdapters = {};
      return webStreamsAdapters;
    }
    Duplex2.fromWeb = function(pair, options) {
      return lazyWebStreams().newStreamDuplexFromReadableWritablePair(pair, options);
    };
    Duplex2.toWeb = function(duplex) {
      return lazyWebStreams().newReadableWritablePairFromDuplex(duplex);
    };
    var duplexify;
    Duplex2.from = function(body) {
      if (!duplexify) {
        duplexify = require_duplexify();
      }
      return duplexify(body, "body");
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/transform.js
var require_transform = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/transform.js"(exports, module) {
    "use strict";
    var { ObjectSetPrototypeOf, Symbol: Symbol2 } = require_primordials();
    module.exports = Transform2;
    var { ERR_METHOD_NOT_IMPLEMENTED } = require_errors().codes;
    var Duplex2 = require_duplex();
    var { getHighWaterMark } = require_state();
    ObjectSetPrototypeOf(Transform2.prototype, Duplex2.prototype);
    ObjectSetPrototypeOf(Transform2, Duplex2);
    var kCallback = Symbol2("kCallback");
    function Transform2(options) {
      if (!(this instanceof Transform2)) return new Transform2(options);
      const readableHighWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", true) : null;
      if (readableHighWaterMark === 0) {
        options = {
          ...options,
          highWaterMark: null,
          readableHighWaterMark,
          // TODO (ronag): 0 is not optimal since we have
          // a "bug" where we check needDrain before calling _write and not after.
          // Refs: https://github.com/nodejs/node/pull/32887
          // Refs: https://github.com/nodejs/node/pull/35941
          writableHighWaterMark: options.writableHighWaterMark || 0
        };
      }
      Duplex2.call(this, options);
      this._readableState.sync = false;
      this[kCallback] = null;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function final(cb) {
      if (typeof this._flush === "function" && !this.destroyed) {
        this._flush((er, data) => {
          if (er) {
            if (cb) {
              cb(er);
            } else {
              this.destroy(er);
            }
            return;
          }
          if (data != null) {
            this.push(data);
          }
          this.push(null);
          if (cb) {
            cb();
          }
        });
      } else {
        this.push(null);
        if (cb) {
          cb();
        }
      }
    }
    function prefinish() {
      if (this._final !== final) {
        final.call(this);
      }
    }
    Transform2.prototype._final = final;
    Transform2.prototype._transform = function(chunk, encoding, callback) {
      throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
    };
    Transform2.prototype._write = function(chunk, encoding, callback) {
      const rState = this._readableState;
      const wState = this._writableState;
      const length = rState.length;
      this._transform(chunk, encoding, (err3, val) => {
        if (err3) {
          callback(err3);
          return;
        }
        if (val != null) {
          this.push(val);
        }
        if (wState.ended || // Backwards compat.
        length === rState.length || // Backwards compat.
        rState.length < rState.highWaterMark) {
          callback();
        } else {
          this[kCallback] = callback;
        }
      });
    };
    Transform2.prototype._read = function() {
      if (this[kCallback]) {
        const callback = this[kCallback];
        this[kCallback] = null;
        callback();
      }
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/passthrough.js
var require_passthrough = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/passthrough.js"(exports, module) {
    "use strict";
    var { ObjectSetPrototypeOf } = require_primordials();
    module.exports = PassThrough2;
    var Transform2 = require_transform();
    ObjectSetPrototypeOf(PassThrough2.prototype, Transform2.prototype);
    ObjectSetPrototypeOf(PassThrough2, Transform2);
    function PassThrough2(options) {
      if (!(this instanceof PassThrough2)) return new PassThrough2(options);
      Transform2.call(this, options);
    }
    PassThrough2.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
    var process = require_process();
    var { ArrayIsArray, Promise: Promise2, SymbolAsyncIterator, SymbolDispose } = require_primordials();
    var eos = require_end_of_stream();
    var { once: once2 } = require_util();
    var destroyImpl = require_destroy();
    var Duplex2 = require_duplex();
    var {
      aggregateTwoErrors,
      codes: {
        ERR_INVALID_ARG_TYPE,
        ERR_INVALID_RETURN_VALUE,
        ERR_MISSING_ARGS,
        ERR_STREAM_DESTROYED,
        ERR_STREAM_PREMATURE_CLOSE
      },
      AbortError
    } = require_errors();
    var { validateFunction, validateAbortSignal } = require_validators();
    var {
      isIterable,
      isReadable: isReadable2,
      isReadableNodeStream,
      isNodeStream,
      isTransformStream,
      isWebStream,
      isReadableStream,
      isReadableFinished
    } = require_utils();
    var AbortController3 = globalThis.AbortController || (init_abort_controller(), __toCommonJS(abort_controller_exports)).AbortController;
    var PassThrough2;
    var Readable2;
    var addAbortListener2;
    function destroyer(stream, reading, writing) {
      let finished2 = false;
      stream.on("close", () => {
        finished2 = true;
      });
      const cleanup = eos(
        stream,
        {
          readable: reading,
          writable: writing
        },
        (err3) => {
          finished2 = !err3;
        }
      );
      return {
        destroy: (err3) => {
          if (finished2) return;
          finished2 = true;
          destroyImpl.destroyer(stream, err3 || new ERR_STREAM_DESTROYED("pipe"));
        },
        cleanup
      };
    }
    function popCallback(streams) {
      validateFunction(streams[streams.length - 1], "streams[stream.length - 1]");
      return streams.pop();
    }
    function makeAsyncIterable(val) {
      if (isIterable(val)) {
        return val;
      } else if (isReadableNodeStream(val)) {
        return fromReadable(val);
      }
      throw new ERR_INVALID_ARG_TYPE("val", ["Readable", "Iterable", "AsyncIterable"], val);
    }
    async function* fromReadable(val) {
      if (!Readable2) {
        Readable2 = require_readable();
      }
      yield* Readable2.prototype[SymbolAsyncIterator].call(val);
    }
    async function pumpToNode(iterable, writable, finish, { end }) {
      let error;
      let onresolve = null;
      const resume = (err3) => {
        if (err3) {
          error = err3;
        }
        if (onresolve) {
          const callback = onresolve;
          onresolve = null;
          callback();
        }
      };
      const wait = () => new Promise2((resolve3, reject) => {
        if (error) {
          reject(error);
        } else {
          onresolve = () => {
            if (error) {
              reject(error);
            } else {
              resolve3();
            }
          };
        }
      });
      writable.on("drain", resume);
      const cleanup = eos(
        writable,
        {
          readable: false
        },
        resume
      );
      try {
        if (writable.writableNeedDrain) {
          await wait();
        }
        for await (const chunk of iterable) {
          if (!writable.write(chunk)) {
            await wait();
          }
        }
        if (end) {
          writable.end();
          await wait();
        }
        finish();
      } catch (err3) {
        finish(error !== err3 ? aggregateTwoErrors(error, err3) : err3);
      } finally {
        cleanup();
        writable.off("drain", resume);
      }
    }
    async function pumpToWeb(readable, writable, finish, { end }) {
      if (isTransformStream(writable)) {
        writable = writable.writable;
      }
      const writer = writable.getWriter();
      try {
        for await (const chunk of readable) {
          await writer.ready;
          writer.write(chunk).catch(() => {
          });
        }
        await writer.ready;
        if (end) {
          await writer.close();
        }
        finish();
      } catch (err3) {
        try {
          await writer.abort(err3);
          finish(err3);
        } catch (err4) {
          finish(err4);
        }
      }
    }
    function pipeline2(...streams) {
      return pipelineImpl(streams, once2(popCallback(streams)));
    }
    function pipelineImpl(streams, callback, opts) {
      if (streams.length === 1 && ArrayIsArray(streams[0])) {
        streams = streams[0];
      }
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      const ac = new AbortController3();
      const signal = ac.signal;
      const outerSignal = opts === null || opts === void 0 ? void 0 : opts.signal;
      const lastStreamCleanup = [];
      validateAbortSignal(outerSignal, "options.signal");
      function abort() {
        finishImpl(new AbortError());
      }
      addAbortListener2 = addAbortListener2 || require_util().addAbortListener;
      let disposable;
      if (outerSignal) {
        disposable = addAbortListener2(outerSignal, abort);
      }
      let error;
      let value;
      const destroys = [];
      let finishCount = 0;
      function finish(err3) {
        finishImpl(err3, --finishCount === 0);
      }
      function finishImpl(err3, final) {
        var _disposable;
        if (err3 && (!error || error.code === "ERR_STREAM_PREMATURE_CLOSE")) {
          error = err3;
        }
        if (!error && !final) {
          return;
        }
        while (destroys.length) {
          destroys.shift()(error);
        }
        ;
        (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable[SymbolDispose]();
        ac.abort();
        if (final) {
          if (!error) {
            lastStreamCleanup.forEach((fn) => fn());
          }
          process.nextTick(callback, error, value);
        }
      }
      let ret;
      for (let i2 = 0; i2 < streams.length; i2++) {
        const stream = streams[i2];
        const reading = i2 < streams.length - 1;
        const writing = i2 > 0;
        const end = reading || (opts === null || opts === void 0 ? void 0 : opts.end) !== false;
        const isLastStream = i2 === streams.length - 1;
        if (isNodeStream(stream)) {
          let onError2 = function(err3) {
            if (err3 && err3.name !== "AbortError" && err3.code !== "ERR_STREAM_PREMATURE_CLOSE") {
              finish(err3);
            }
          };
          var onError = onError2;
          if (end) {
            const { destroy: destroy2, cleanup } = destroyer(stream, reading, writing);
            destroys.push(destroy2);
            if (isReadable2(stream) && isLastStream) {
              lastStreamCleanup.push(cleanup);
            }
          }
          stream.on("error", onError2);
          if (isReadable2(stream) && isLastStream) {
            lastStreamCleanup.push(() => {
              stream.removeListener("error", onError2);
            });
          }
        }
        if (i2 === 0) {
          if (typeof stream === "function") {
            ret = stream({
              signal
            });
            if (!isIterable(ret)) {
              throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
            }
          } else if (isIterable(stream) || isReadableNodeStream(stream) || isTransformStream(stream)) {
            ret = stream;
          } else {
            ret = Duplex2.from(stream);
          }
        } else if (typeof stream === "function") {
          if (isTransformStream(ret)) {
            var _ret;
            ret = makeAsyncIterable((_ret = ret) === null || _ret === void 0 ? void 0 : _ret.readable);
          } else {
            ret = makeAsyncIterable(ret);
          }
          ret = stream(ret, {
            signal
          });
          if (reading) {
            if (!isIterable(ret, true)) {
              throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i2 - 1}]`, ret);
            }
          } else {
            var _ret2;
            if (!PassThrough2) {
              PassThrough2 = require_passthrough();
            }
            const pt = new PassThrough2({
              objectMode: true
            });
            const then = (_ret2 = ret) === null || _ret2 === void 0 ? void 0 : _ret2.then;
            if (typeof then === "function") {
              finishCount++;
              then.call(
                ret,
                (val) => {
                  value = val;
                  if (val != null) {
                    pt.write(val);
                  }
                  if (end) {
                    pt.end();
                  }
                  process.nextTick(finish);
                },
                (err3) => {
                  pt.destroy(err3);
                  process.nextTick(finish, err3);
                }
              );
            } else if (isIterable(ret, true)) {
              finishCount++;
              pumpToNode(ret, pt, finish, {
                end
              });
            } else if (isReadableStream(ret) || isTransformStream(ret)) {
              const toRead = ret.readable || ret;
              finishCount++;
              pumpToNode(toRead, pt, finish, {
                end
              });
            } else {
              throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
            }
            ret = pt;
            const { destroy: destroy2, cleanup } = destroyer(ret, false, true);
            destroys.push(destroy2);
            if (isLastStream) {
              lastStreamCleanup.push(cleanup);
            }
          }
        } else if (isNodeStream(stream)) {
          if (isReadableNodeStream(ret)) {
            finishCount += 2;
            const cleanup = pipe(ret, stream, finish, {
              end
            });
            if (isReadable2(stream) && isLastStream) {
              lastStreamCleanup.push(cleanup);
            }
          } else if (isTransformStream(ret) || isReadableStream(ret)) {
            const toRead = ret.readable || ret;
            finishCount++;
            pumpToNode(toRead, stream, finish, {
              end
            });
          } else if (isIterable(ret)) {
            finishCount++;
            pumpToNode(ret, stream, finish, {
              end
            });
          } else {
            throw new ERR_INVALID_ARG_TYPE(
              "val",
              ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
              ret
            );
          }
          ret = stream;
        } else if (isWebStream(stream)) {
          if (isReadableNodeStream(ret)) {
            finishCount++;
            pumpToWeb(makeAsyncIterable(ret), stream, finish, {
              end
            });
          } else if (isReadableStream(ret) || isIterable(ret)) {
            finishCount++;
            pumpToWeb(ret, stream, finish, {
              end
            });
          } else if (isTransformStream(ret)) {
            finishCount++;
            pumpToWeb(ret.readable, stream, finish, {
              end
            });
          } else {
            throw new ERR_INVALID_ARG_TYPE(
              "val",
              ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
              ret
            );
          }
          ret = stream;
        } else {
          ret = Duplex2.from(stream);
        }
      }
      if (signal !== null && signal !== void 0 && signal.aborted || outerSignal !== null && outerSignal !== void 0 && outerSignal.aborted) {
        process.nextTick(abort);
      }
      return ret;
    }
    function pipe(src, dst, finish, { end }) {
      let ended = false;
      dst.on("close", () => {
        if (!ended) {
          finish(new ERR_STREAM_PREMATURE_CLOSE());
        }
      });
      src.pipe(dst, {
        end: false
      });
      if (end) {
        let endFn2 = function() {
          ended = true;
          dst.end();
        };
        var endFn = endFn2;
        if (isReadableFinished(src)) {
          process.nextTick(endFn2);
        } else {
          src.once("end", endFn2);
        }
      } else {
        finish();
      }
      eos(
        src,
        {
          readable: true,
          writable: false
        },
        (err3) => {
          const rState = src._readableState;
          if (err3 && err3.code === "ERR_STREAM_PREMATURE_CLOSE" && rState && rState.ended && !rState.errored && !rState.errorEmitted) {
            src.once("end", finish).once("error", finish);
          } else {
            finish(err3);
          }
        }
      );
      return eos(
        dst,
        {
          readable: false,
          writable: true
        },
        finish
      );
    }
    module.exports = {
      pipelineImpl,
      pipeline: pipeline2
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/compose.js
var require_compose = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/compose.js"(exports, module) {
    "use strict";
    var { pipeline: pipeline2 } = require_pipeline();
    var Duplex2 = require_duplex();
    var { destroyer } = require_destroy();
    var {
      isNodeStream,
      isReadable: isReadable2,
      isWritable: isWritable2,
      isWebStream,
      isTransformStream,
      isWritableStream,
      isReadableStream
    } = require_utils();
    var {
      AbortError,
      codes: { ERR_INVALID_ARG_VALUE, ERR_MISSING_ARGS }
    } = require_errors();
    var eos = require_end_of_stream();
    module.exports = function compose2(...streams) {
      if (streams.length === 0) {
        throw new ERR_MISSING_ARGS("streams");
      }
      if (streams.length === 1) {
        return Duplex2.from(streams[0]);
      }
      const orgStreams = [...streams];
      if (typeof streams[0] === "function") {
        streams[0] = Duplex2.from(streams[0]);
      }
      if (typeof streams[streams.length - 1] === "function") {
        const idx = streams.length - 1;
        streams[idx] = Duplex2.from(streams[idx]);
      }
      for (let n = 0; n < streams.length; ++n) {
        if (!isNodeStream(streams[n]) && !isWebStream(streams[n])) {
          continue;
        }
        if (n < streams.length - 1 && !(isReadable2(streams[n]) || isReadableStream(streams[n]) || isTransformStream(streams[n]))) {
          throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be readable");
        }
        if (n > 0 && !(isWritable2(streams[n]) || isWritableStream(streams[n]) || isTransformStream(streams[n]))) {
          throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be writable");
        }
      }
      let ondrain;
      let onfinish;
      let onreadable;
      let onclose;
      let d;
      function onfinished(err3) {
        const cb = onclose;
        onclose = null;
        if (cb) {
          cb(err3);
        } else if (err3) {
          d.destroy(err3);
        } else if (!readable && !writable) {
          d.destroy();
        }
      }
      const head = streams[0];
      const tail = pipeline2(streams, onfinished);
      const writable = !!(isWritable2(head) || isWritableStream(head) || isTransformStream(head));
      const readable = !!(isReadable2(tail) || isReadableStream(tail) || isTransformStream(tail));
      d = new Duplex2({
        // TODO (ronag): highWaterMark?
        writableObjectMode: !!(head !== null && head !== void 0 && head.writableObjectMode),
        readableObjectMode: !!(tail !== null && tail !== void 0 && tail.readableObjectMode),
        writable,
        readable
      });
      if (writable) {
        if (isNodeStream(head)) {
          d._write = function(chunk, encoding, callback) {
            if (head.write(chunk, encoding)) {
              callback();
            } else {
              ondrain = callback;
            }
          };
          d._final = function(callback) {
            head.end();
            onfinish = callback;
          };
          head.on("drain", function() {
            if (ondrain) {
              const cb = ondrain;
              ondrain = null;
              cb();
            }
          });
        } else if (isWebStream(head)) {
          const writable2 = isTransformStream(head) ? head.writable : head;
          const writer = writable2.getWriter();
          d._write = async function(chunk, encoding, callback) {
            try {
              await writer.ready;
              writer.write(chunk).catch(() => {
              });
              callback();
            } catch (err3) {
              callback(err3);
            }
          };
          d._final = async function(callback) {
            try {
              await writer.ready;
              writer.close().catch(() => {
              });
              onfinish = callback;
            } catch (err3) {
              callback(err3);
            }
          };
        }
        const toRead = isTransformStream(tail) ? tail.readable : tail;
        eos(toRead, () => {
          if (onfinish) {
            const cb = onfinish;
            onfinish = null;
            cb();
          }
        });
      }
      if (readable) {
        if (isNodeStream(tail)) {
          tail.on("readable", function() {
            if (onreadable) {
              const cb = onreadable;
              onreadable = null;
              cb();
            }
          });
          tail.on("end", function() {
            d.push(null);
          });
          d._read = function() {
            while (true) {
              const buf2 = tail.read();
              if (buf2 === null) {
                onreadable = d._read;
                return;
              }
              if (!d.push(buf2)) {
                return;
              }
            }
          };
        } else if (isWebStream(tail)) {
          const readable2 = isTransformStream(tail) ? tail.readable : tail;
          const reader = readable2.getReader();
          d._read = async function() {
            while (true) {
              try {
                const { value, done } = await reader.read();
                if (!d.push(value)) {
                  return;
                }
                if (done) {
                  d.push(null);
                  return;
                }
              } catch {
                return;
              }
            }
          };
        }
      }
      d._destroy = function(err3, callback) {
        if (!err3 && onclose !== null) {
          err3 = new AbortError();
        }
        onreadable = null;
        ondrain = null;
        onfinish = null;
        if (onclose === null) {
          callback(err3);
        } else {
          onclose = callback;
          if (isNodeStream(tail)) {
            destroyer(tail, err3);
          }
        }
      };
      return d;
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/operators.js
var require_operators = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/operators.js"(exports, module) {
    "use strict";
    var AbortController3 = globalThis.AbortController || (init_abort_controller(), __toCommonJS(abort_controller_exports)).AbortController;
    var {
      codes: { ERR_INVALID_ARG_VALUE, ERR_INVALID_ARG_TYPE, ERR_MISSING_ARGS, ERR_OUT_OF_RANGE },
      AbortError
    } = require_errors();
    var { validateAbortSignal, validateInteger, validateObject } = require_validators();
    var kWeakHandler = require_primordials().Symbol("kWeak");
    var kResistStopPropagation = require_primordials().Symbol("kResistStopPropagation");
    var { finished: finished2 } = require_end_of_stream();
    var staticCompose = require_compose();
    var { addAbortSignalNoValidate } = require_add_abort_signal();
    var { isWritable: isWritable2, isNodeStream } = require_utils();
    var { deprecate: deprecate2 } = require_util();
    var {
      ArrayPrototypePush,
      Boolean: Boolean2,
      MathFloor,
      Number: Number2,
      NumberIsNaN,
      Promise: Promise2,
      PromiseReject,
      PromiseResolve,
      PromisePrototypeThen,
      Symbol: Symbol2
    } = require_primordials();
    var kEmpty = Symbol2("kEmpty");
    var kEof = Symbol2("kEof");
    function compose2(stream, options) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      if (isNodeStream(stream) && !isWritable2(stream)) {
        throw new ERR_INVALID_ARG_VALUE("stream", stream, "must be writable");
      }
      const composedStream = staticCompose(this, stream);
      if (options !== null && options !== void 0 && options.signal) {
        addAbortSignalNoValidate(options.signal, composedStream);
      }
      return composedStream;
    }
    function map(fn, options) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      let concurrency = 1;
      if ((options === null || options === void 0 ? void 0 : options.concurrency) != null) {
        concurrency = MathFloor(options.concurrency);
      }
      let highWaterMark = concurrency - 1;
      if ((options === null || options === void 0 ? void 0 : options.highWaterMark) != null) {
        highWaterMark = MathFloor(options.highWaterMark);
      }
      validateInteger(concurrency, "options.concurrency", 1);
      validateInteger(highWaterMark, "options.highWaterMark", 0);
      highWaterMark += concurrency;
      return async function* map2() {
        const signal = require_util().AbortSignalAny(
          [options === null || options === void 0 ? void 0 : options.signal].filter(Boolean2)
        );
        const stream = this;
        const queue = [];
        const signalOpt = {
          signal
        };
        let next;
        let resume;
        let done = false;
        let cnt = 0;
        function onCatch() {
          done = true;
          afterItemProcessed();
        }
        function afterItemProcessed() {
          cnt -= 1;
          maybeResume();
        }
        function maybeResume() {
          if (resume && !done && cnt < concurrency && queue.length < highWaterMark) {
            resume();
            resume = null;
          }
        }
        async function pump() {
          try {
            for await (let val of stream) {
              if (done) {
                return;
              }
              if (signal.aborted) {
                throw new AbortError();
              }
              try {
                val = fn(val, signalOpt);
                if (val === kEmpty) {
                  continue;
                }
                val = PromiseResolve(val);
              } catch (err3) {
                val = PromiseReject(err3);
              }
              cnt += 1;
              PromisePrototypeThen(val, afterItemProcessed, onCatch);
              queue.push(val);
              if (next) {
                next();
                next = null;
              }
              if (!done && (queue.length >= highWaterMark || cnt >= concurrency)) {
                await new Promise2((resolve3) => {
                  resume = resolve3;
                });
              }
            }
            queue.push(kEof);
          } catch (err3) {
            const val = PromiseReject(err3);
            PromisePrototypeThen(val, afterItemProcessed, onCatch);
            queue.push(val);
          } finally {
            done = true;
            if (next) {
              next();
              next = null;
            }
          }
        }
        pump();
        try {
          while (true) {
            while (queue.length > 0) {
              const val = await queue[0];
              if (val === kEof) {
                return;
              }
              if (signal.aborted) {
                throw new AbortError();
              }
              if (val !== kEmpty) {
                yield val;
              }
              queue.shift();
              maybeResume();
            }
            await new Promise2((resolve3) => {
              next = resolve3;
            });
          }
        } finally {
          done = true;
          if (resume) {
            resume();
            resume = null;
          }
        }
      }.call(this);
    }
    function asIndexedPairs(options = void 0) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      return async function* asIndexedPairs2() {
        let index = 0;
        for await (const val of this) {
          var _options$signal;
          if (options !== null && options !== void 0 && (_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted) {
            throw new AbortError({
              cause: options.signal.reason
            });
          }
          yield [index++, val];
        }
      }.call(this);
    }
    async function some(fn, options = void 0) {
      for await (const unused of filter.call(this, fn, options)) {
        return true;
      }
      return false;
    }
    async function every(fn, options = void 0) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      return !await some.call(
        this,
        async (...args) => {
          return !await fn(...args);
        },
        options
      );
    }
    async function find(fn, options) {
      for await (const result of filter.call(this, fn, options)) {
        return result;
      }
      return void 0;
    }
    async function forEach(fn, options) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      async function forEachFn(value, options2) {
        await fn(value, options2);
        return kEmpty;
      }
      for await (const unused of map.call(this, forEachFn, options)) ;
    }
    function filter(fn, options) {
      if (typeof fn !== "function") {
        throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
      }
      async function filterFn(value, options2) {
        if (await fn(value, options2)) {
          return value;
        }
        return kEmpty;
      }
      return map.call(this, filterFn, options);
    }
    var ReduceAwareErrMissingArgs = class extends ERR_MISSING_ARGS {
      constructor() {
        super("reduce");
        this.message = "Reduce of an empty stream requires an initial value";
      }
    };
    async function reduce(reducer, initialValue, options) {
      var _options$signal2;
      if (typeof reducer !== "function") {
        throw new ERR_INVALID_ARG_TYPE("reducer", ["Function", "AsyncFunction"], reducer);
      }
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      let hasInitialValue = arguments.length > 1;
      if (options !== null && options !== void 0 && (_options$signal2 = options.signal) !== null && _options$signal2 !== void 0 && _options$signal2.aborted) {
        const err3 = new AbortError(void 0, {
          cause: options.signal.reason
        });
        this.once("error", () => {
        });
        await finished2(this.destroy(err3));
        throw err3;
      }
      const ac = new AbortController3();
      const signal = ac.signal;
      if (options !== null && options !== void 0 && options.signal) {
        const opts = {
          once: true,
          [kWeakHandler]: this,
          [kResistStopPropagation]: true
        };
        options.signal.addEventListener("abort", () => ac.abort(), opts);
      }
      let gotAnyItemFromStream = false;
      try {
        for await (const value of this) {
          var _options$signal3;
          gotAnyItemFromStream = true;
          if (options !== null && options !== void 0 && (_options$signal3 = options.signal) !== null && _options$signal3 !== void 0 && _options$signal3.aborted) {
            throw new AbortError();
          }
          if (!hasInitialValue) {
            initialValue = value;
            hasInitialValue = true;
          } else {
            initialValue = await reducer(initialValue, value, {
              signal
            });
          }
        }
        if (!gotAnyItemFromStream && !hasInitialValue) {
          throw new ReduceAwareErrMissingArgs();
        }
      } finally {
        ac.abort();
      }
      return initialValue;
    }
    async function toArray(options) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      const result = [];
      for await (const val of this) {
        var _options$signal4;
        if (options !== null && options !== void 0 && (_options$signal4 = options.signal) !== null && _options$signal4 !== void 0 && _options$signal4.aborted) {
          throw new AbortError(void 0, {
            cause: options.signal.reason
          });
        }
        ArrayPrototypePush(result, val);
      }
      return result;
    }
    function flatMap(fn, options) {
      const values = map.call(this, fn, options);
      return async function* flatMap2() {
        for await (const val of values) {
          yield* val;
        }
      }.call(this);
    }
    function toIntegerOrInfinity(number) {
      number = Number2(number);
      if (NumberIsNaN(number)) {
        return 0;
      }
      if (number < 0) {
        throw new ERR_OUT_OF_RANGE("number", ">= 0", number);
      }
      return number;
    }
    function drop(number, options = void 0) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      number = toIntegerOrInfinity(number);
      return async function* drop2() {
        var _options$signal5;
        if (options !== null && options !== void 0 && (_options$signal5 = options.signal) !== null && _options$signal5 !== void 0 && _options$signal5.aborted) {
          throw new AbortError();
        }
        for await (const val of this) {
          var _options$signal6;
          if (options !== null && options !== void 0 && (_options$signal6 = options.signal) !== null && _options$signal6 !== void 0 && _options$signal6.aborted) {
            throw new AbortError();
          }
          if (number-- <= 0) {
            yield val;
          }
        }
      }.call(this);
    }
    function take(number, options = void 0) {
      if (options != null) {
        validateObject(options, "options");
      }
      if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
        validateAbortSignal(options.signal, "options.signal");
      }
      number = toIntegerOrInfinity(number);
      return async function* take2() {
        var _options$signal7;
        if (options !== null && options !== void 0 && (_options$signal7 = options.signal) !== null && _options$signal7 !== void 0 && _options$signal7.aborted) {
          throw new AbortError();
        }
        for await (const val of this) {
          var _options$signal8;
          if (options !== null && options !== void 0 && (_options$signal8 = options.signal) !== null && _options$signal8 !== void 0 && _options$signal8.aborted) {
            throw new AbortError();
          }
          if (number-- > 0) {
            yield val;
          }
          if (number <= 0) {
            return;
          }
        }
      }.call(this);
    }
    module.exports.streamReturningOperators = {
      asIndexedPairs: deprecate2(asIndexedPairs, "readable.asIndexedPairs will be removed in a future version."),
      drop,
      filter,
      flatMap,
      map,
      take,
      compose: compose2
    };
    module.exports.promiseReturningOperators = {
      every,
      forEach,
      reduce,
      toArray,
      some,
      find
    };
  }
});

// node_modules/readable-stream/lib/stream/promises.js
var require_promises = __commonJS({
  "node_modules/readable-stream/lib/stream/promises.js"(exports, module) {
    "use strict";
    var { ArrayPrototypePop, Promise: Promise2 } = require_primordials();
    var { isIterable, isNodeStream, isWebStream } = require_utils();
    var { pipelineImpl: pl } = require_pipeline();
    var { finished: finished2 } = require_end_of_stream();
    require_stream();
    function pipeline2(...streams) {
      return new Promise2((resolve3, reject) => {
        let signal;
        let end;
        const lastArg = streams[streams.length - 1];
        if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
          const options = ArrayPrototypePop(streams);
          signal = options.signal;
          end = options.end;
        }
        pl(
          streams,
          (err3, value) => {
            if (err3) {
              reject(err3);
            } else {
              resolve3(value);
            }
          },
          {
            signal,
            end
          }
        );
      });
    }
    module.exports = {
      finished: finished2,
      pipeline: pipeline2
    };
  }
});

// node_modules/readable-stream/lib/stream.js
var require_stream = __commonJS({
  "node_modules/readable-stream/lib/stream.js"(exports, module) {
    "use strict";
    var { Buffer: Buffer13 } = require_buffer();
    var { ObjectDefineProperty, ObjectKeys, ReflectApply } = require_primordials();
    var {
      promisify: { custom: customPromisify }
    } = require_util();
    var { streamReturningOperators, promiseReturningOperators } = require_operators();
    var {
      codes: { ERR_ILLEGAL_CONSTRUCTOR }
    } = require_errors();
    var compose2 = require_compose();
    var { setDefaultHighWaterMark: setDefaultHighWaterMark2, getDefaultHighWaterMark: getDefaultHighWaterMark2 } = require_state();
    var { pipeline: pipeline2 } = require_pipeline();
    var { destroyer } = require_destroy();
    var eos = require_end_of_stream();
    var promises4 = require_promises();
    var utils = require_utils();
    var Stream3 = module.exports = require_legacy().Stream;
    Stream3.isDestroyed = utils.isDestroyed;
    Stream3.isDisturbed = utils.isDisturbed;
    Stream3.isErrored = utils.isErrored;
    Stream3.isReadable = utils.isReadable;
    Stream3.isWritable = utils.isWritable;
    Stream3.Readable = require_readable();
    for (const key of ObjectKeys(streamReturningOperators)) {
      let fn = function(...args) {
        if (new.target) {
          throw ERR_ILLEGAL_CONSTRUCTOR();
        }
        return Stream3.Readable.from(ReflectApply(op, this, args));
      };
      const op = streamReturningOperators[key];
      ObjectDefineProperty(fn, "name", {
        __proto__: null,
        value: op.name
      });
      ObjectDefineProperty(fn, "length", {
        __proto__: null,
        value: op.length
      });
      ObjectDefineProperty(Stream3.Readable.prototype, key, {
        __proto__: null,
        value: fn,
        enumerable: false,
        configurable: true,
        writable: true
      });
    }
    for (const key of ObjectKeys(promiseReturningOperators)) {
      let fn = function(...args) {
        if (new.target) {
          throw ERR_ILLEGAL_CONSTRUCTOR();
        }
        return ReflectApply(op, this, args);
      };
      const op = promiseReturningOperators[key];
      ObjectDefineProperty(fn, "name", {
        __proto__: null,
        value: op.name
      });
      ObjectDefineProperty(fn, "length", {
        __proto__: null,
        value: op.length
      });
      ObjectDefineProperty(Stream3.Readable.prototype, key, {
        __proto__: null,
        value: fn,
        enumerable: false,
        configurable: true,
        writable: true
      });
    }
    Stream3.Writable = require_writable();
    Stream3.Duplex = require_duplex();
    Stream3.Transform = require_transform();
    Stream3.PassThrough = require_passthrough();
    Stream3.pipeline = pipeline2;
    var { addAbortSignal: addAbortSignal2 } = require_add_abort_signal();
    Stream3.addAbortSignal = addAbortSignal2;
    Stream3.finished = eos;
    Stream3.destroy = destroyer;
    Stream3.compose = compose2;
    Stream3.setDefaultHighWaterMark = setDefaultHighWaterMark2;
    Stream3.getDefaultHighWaterMark = getDefaultHighWaterMark2;
    ObjectDefineProperty(Stream3, "promises", {
      __proto__: null,
      configurable: true,
      enumerable: true,
      get() {
        return promises4;
      }
    });
    ObjectDefineProperty(pipeline2, customPromisify, {
      __proto__: null,
      enumerable: true,
      get() {
        return promises4.pipeline;
      }
    });
    ObjectDefineProperty(eos, customPromisify, {
      __proto__: null,
      enumerable: true,
      get() {
        return promises4.finished;
      }
    });
    Stream3.Stream = Stream3;
    Stream3._isUint8Array = function isUint8Array(value) {
      return value instanceof Uint8Array;
    };
    Stream3._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
      return Buffer13.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    };
  }
});

// node_modules/readable-stream/lib/ours/browser.js
var require_browser = __commonJS({
  "node_modules/readable-stream/lib/ours/browser.js"(exports, module) {
    "use strict";
    var CustomStream = require_stream();
    var promises4 = require_promises();
    var originalDestroy = CustomStream.Readable.destroy;
    module.exports = CustomStream.Readable;
    module.exports._uint8ArrayToBuffer = CustomStream._uint8ArrayToBuffer;
    module.exports._isUint8Array = CustomStream._isUint8Array;
    module.exports.isDisturbed = CustomStream.isDisturbed;
    module.exports.isErrored = CustomStream.isErrored;
    module.exports.isReadable = CustomStream.isReadable;
    module.exports.Readable = CustomStream.Readable;
    module.exports.Writable = CustomStream.Writable;
    module.exports.Duplex = CustomStream.Duplex;
    module.exports.Transform = CustomStream.Transform;
    module.exports.PassThrough = CustomStream.PassThrough;
    module.exports.addAbortSignal = CustomStream.addAbortSignal;
    module.exports.finished = CustomStream.finished;
    module.exports.destroy = CustomStream.destroy;
    module.exports.destroy = originalDestroy;
    module.exports.pipeline = CustomStream.pipeline;
    module.exports.compose = CustomStream.compose;
    Object.defineProperty(CustomStream, "promises", {
      configurable: true,
      enumerable: true,
      get() {
        return promises4;
      }
    });
    module.exports.Stream = CustomStream.Stream;
    module.exports.default = module.exports;
  }
});

// src/node/buffer-patch.ts
var import_buffer = __toESM(require_buffer(), 1);
var B = import_buffer.Buffer;
var proto = import_buffer.Buffer.prototype;
var toB64 = (s) => {
  const t = s.replace(/-/g, "+").replace(/_/g, "/");
  return t + "=".repeat((4 - t.length % 4) % 4);
};
var origToString = proto.toString;
proto.toString = function(enc4, start, end) {
  if (typeof enc4 === "string" && enc4.toLowerCase() === "base64url") {
    return origToString.call(this, "base64", start, end).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return origToString.call(this, enc4, start, end);
};
var origFrom = B.from;
B.from = function(value, enc4, len) {
  if (typeof value === "string" && typeof enc4 === "string" && enc4.toLowerCase() === "base64url") return origFrom.call(B, toB64(value), "base64");
  return origFrom.call(B, value, enc4, len);
};
var origByteLength = B.byteLength;
B.byteLength = function(s, enc4) {
  if (typeof s === "string" && typeof enc4 === "string" && enc4.toLowerCase() === "base64url") return origByteLength.call(B, toB64(s), "base64");
  return origByteLength.call(B, s, enc4);
};
var origIsEncoding = B.isEncoding;
B.isEncoding = (e) => typeof e === "string" && e.toLowerCase() === "base64url" || origIsEncoding(e);
var origWrite = proto.write;
proto.write = function(s, ...rest) {
  const encIdx = rest.findIndex((a) => typeof a === "string");
  if (encIdx !== -1 && rest[encIdx].toLowerCase() === "base64url") {
    rest[encIdx] = "base64";
    s = toB64(s);
  }
  return origWrite.call(this, s, ...rest);
};
if (!B.copyBytesFrom) {
  B.copyBytesFrom = (view, offset = 0, length) => {
    const u82 = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
    const el = view.BYTES_PER_ELEMENT ?? 1;
    return origFrom.call(B, u82.slice(offset * el, length === void 0 ? void 0 : (offset + length) * el));
  };
}
if (!proto.toLocaleString) proto.toLocaleString = proto.toString;

// src/node/worker.ts
var bufferMod = __toESM(require_buffer(), 1);

// src/node/loop.ts
var nativeSetTimeout = globalThis.setTimeout.bind(globalThis);
var nativeClearTimeout = globalThis.clearTimeout.bind(globalThis);
var nativeSetInterval = globalThis.setInterval.bind(globalThis);
var nativeClearInterval = globalThis.clearInterval.bind(globalThis);
var refs = 0;
var onIdle = null;
var checkScheduled = false;
var idleGeneration = 0;
var channel = new MessageChannel();
var macrotasks = [];
channel.port1.onmessage = () => {
  const fn = macrotasks.shift();
  fn?.();
};
function macrotask(fn) {
  macrotasks.push(fn);
  channel.port2.postMessage(0);
}
function ref() {
  refs++;
  idleGeneration++;
}
function unref() {
  refs--;
  if (refs < 0) refs = 0;
  idleGeneration++;
  if (refs === 0) scheduleIdleCheck();
}
function activeRefs() {
  return refs;
}
function setIdleHandler(fn) {
  onIdle = fn;
}
function scheduleIdleCheck() {
  if (checkScheduled) return;
  checkScheduled = true;
  const gen = idleGeneration;
  macrotask(() => {
    nativeSetTimeout(() => {
      checkScheduled = false;
      if (refs === 0 && gen === idleGeneration && onIdle) onIdle();
      else if (refs === 0) scheduleIdleCheck();
    }, 4);
  });
}
function track(p) {
  ref();
  return p.finally(() => unref());
}
var tickQueue = [];
var tickScheduled = false;
var tickErrorHandler = (e) => {
  throw e;
};
function setTickErrorHandler(fn) {
  tickErrorHandler = fn;
}
function runTicks() {
  tickScheduled = false;
  while (tickQueue.length) {
    const t = tickQueue.shift();
    try {
      t.fn(...t.args);
    } catch (e) {
      tickErrorHandler(e);
    }
  }
}
function nextTick(fn, ...args) {
  if (typeof fn !== "function") {
    const err3 = new TypeError('The "callback" argument must be of type function');
    err3.code = "ERR_INVALID_ARG_TYPE";
    throw err3;
  }
  tickQueue.push({ fn, args });
  if (!tickScheduled) {
    tickScheduled = true;
    queueMicrotask(runTicks);
  }
}
var nextTimerId = 1;
var kHandle = /* @__PURE__ */ Symbol("handle");
var Timeout = class {
  [kHandle];
  _idleTimeout;
  _onTimeout;
  _timerArgs;
  _repeat;
  _destroyed = false;
  _ref = true;
  _id = nextTimerId++;
  constructor(fn, ms, args, repeat) {
    this._onTimeout = fn;
    this._idleTimeout = ms;
    this._timerArgs = args;
    this._repeat = repeat ? ms : null;
    ref();
    this._start();
  }
  _start() {
    const ms = Math.max(1, Math.min(this._idleTimeout || 1, 2 ** 31 - 1));
    if (this._repeat !== null) {
      this[kHandle] = nativeSetInterval(() => this._fire(), ms);
    } else {
      this[kHandle] = nativeSetTimeout(() => this._fire(), ms);
    }
  }
  _fire() {
    if (this._repeat === null) this._finish();
    try {
      this._onTimeout(...this._timerArgs);
    } catch (e) {
      tickErrorHandler(e);
    }
  }
  _finish() {
    if (this._destroyed) return;
    this._destroyed = true;
    timersById.delete(this._id);
    if (this._ref) unref();
  }
  close() {
    if (this._repeat !== null) nativeClearInterval(this[kHandle]);
    else nativeClearTimeout(this[kHandle]);
    this._finish();
    return this;
  }
  ref() {
    if (!this._ref && !this._destroyed) {
      this._ref = true;
      ref();
    }
    return this;
  }
  unref() {
    if (this._ref && !this._destroyed) {
      this._ref = false;
      unref();
    }
    return this;
  }
  hasRef() {
    return this._ref;
  }
  refresh() {
    if (this._destroyed) return this;
    if (this._repeat !== null) nativeClearInterval(this[kHandle]);
    else nativeClearTimeout(this[kHandle]);
    this._start();
    return this;
  }
  [Symbol.toPrimitive]() {
    return this._id;
  }
};
var timersById = /* @__PURE__ */ new Map();
function setTimeout2(fn, ms, ...args) {
  const t = new Timeout(fn, Number(ms) || 0, args, false);
  timersById.set(+t, t);
  return t;
}
function setInterval2(fn, ms, ...args) {
  const t = new Timeout(fn, Number(ms) || 0, args, true);
  timersById.set(+t, t);
  return t;
}
function clearTimeout2(t) {
  if (t == null) return;
  if (typeof t === "number" || typeof t === "string") {
    const tt = timersById.get(Number(t));
    tt?.close();
    timersById.delete(Number(t));
    return;
  }
  if (t instanceof Timeout) {
    t.close();
    timersById.delete(+t);
  }
}
var clearInterval2 = clearTimeout2;
var Immediate = class {
  _onImmediate;
  _argv;
  _destroyed = false;
  _ref = true;
  constructor(fn, args) {
    this._onImmediate = fn;
    this._argv = args;
    ref();
    macrotask(() => {
      if (this._destroyed) return;
      this._destroyed = true;
      if (this._ref) unref();
      try {
        fn(...args);
      } catch (e) {
        tickErrorHandler(e);
      }
    });
  }
  ref() {
    if (!this._ref && !this._destroyed) {
      this._ref = true;
      ref();
    }
    return this;
  }
  unref() {
    if (this._ref && !this._destroyed) {
      this._ref = false;
      unref();
    }
    return this;
  }
  hasRef() {
    return this._ref;
  }
};
function setImmediate2(fn, ...args) {
  return new Immediate(fn, args);
}
function clearImmediate(i2) {
  if (!i2 || i2._destroyed) return;
  i2._destroyed = true;
  if (i2.hasRef()) unref();
}
var Handle = class {
  _ref = false;
  _active = false;
  activate() {
    if (this._active) return;
    this._active = true;
    if (!this._unrefed) {
      this._ref = true;
      ref();
    }
  }
  deactivate() {
    if (!this._active) return;
    this._active = false;
    if (this._ref) {
      this._ref = false;
      unref();
    }
  }
  _unrefed = false;
  ref() {
    this._unrefed = false;
    if (this._active && !this._ref) {
      this._ref = true;
      ref();
    }
  }
  unref() {
    this._unrefed = true;
    if (this._ref) {
      this._ref = false;
      unref();
    }
  }
  hasRef() {
    return this._active && this._ref;
  }
};

// src/node/test-runner.ts
var proc = () => globalThis.process;
var out = (s) => proc().stdout.write(s);
function parseArgs(args) {
  let name = "<anonymous>";
  let opts = {};
  let fn;
  for (const a of args) {
    if (typeof a === "string") name = a;
    else if (typeof a === "function") fn = a;
    else if (a && typeof a === "object") opts = a;
  }
  if (name === "<anonymous>" && fn?.name) name = fn.name;
  return { name, opts, fn };
}
var Node_ = class {
  constructor(name, opts, fn, parent, isSuite) {
    this.name = name;
    this.opts = opts;
    this.fn = fn;
    this.parent = parent;
    this.isSuite = isSuite;
    this.skipped = opts.skip ?? false;
    this.todo = opts.todo ?? false;
  }
  name;
  opts;
  fn;
  parent;
  isSuite;
  children = [];
  hooks = { before: [], after: [], beforeEach: [], afterEach: [] };
  passed = true;
  error = null;
  skipped = false;
  todo = false;
  done = false;
  duration = 0;
  get depth() {
    return this.parent ? this.parent.depth + (this.parent.isRoot ? 0 : 1) : 0;
  }
  get isRoot() {
    return this.parent === null;
  }
  ancestorsEach(kind) {
    const chain = [];
    for (let n = this.parent; n; n = n.parent) chain.unshift(n);
    const fns = chain.flatMap((n) => n.hooks[kind]);
    return kind === "afterEach" ? fns.reverse() : fns;
  }
};
var root = new Node_("<root>", {}, void 0, null, true);
var currentSuite = root;
var currentTest = null;
var scheduled = false;
var running = null;
var counts = { tests: 0, suites: 0, pass: 0, fail: 0, skipped: 0, todo: 0 };
function callWithDone(fn, self2, arg) {
  if (fn.length >= 2) {
    return new Promise((resolve3, reject) => {
      let settled = false;
      const done = (err3) => {
        if (settled) return;
        settled = true;
        err3 ? reject(err3) : resolve3(void 0);
      };
      try {
        const r = fn.call(self2, arg, done);
        if (r && typeof r.then === "function") r.then(() => {
        }, done);
      } catch (e) {
        done(e);
      }
    });
  }
  try {
    return Promise.resolve(fn.call(self2, arg));
  } catch (e) {
    return Promise.reject(e);
  }
}
function withTimeout(p, ms) {
  if (!ms || !isFinite(ms)) return p;
  return new Promise((resolve3, reject) => {
    const t = setTimeout(() => reject(Object.assign(new Error(`test timed out after ${ms}ms`), { code: "ERR_TEST_FAILURE", failureType: "testTimeoutFailure" })), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve3(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      }
    );
  });
}
var TestContext = class {
  constructor(node) {
    this.node = node;
    if (node.opts.plan !== void 0) this.planned = node.opts.plan;
  }
  node;
  mock = new MockTracker();
  ac = new AbortController();
  planned = null;
  asserted = 0;
  get name() {
    return this.node.name;
  }
  get fullName() {
    const parts = [];
    for (let n = this.node; n && !n.isRoot; n = n.parent) parts.unshift(n.name);
    return parts.join(" > ");
  }
  get signal() {
    return this.ac.signal;
  }
  get filePath() {
    return proc().argv[1];
  }
  get assert() {
    const assert3 = globalThis.__ov.builtin("assert");
    const self2 = this;
    return new Proxy(assert3, {
      get(t, k) {
        const v = t[k];
        if (typeof v !== "function") return v;
        return (...a) => {
          self2.asserted++;
          return v.apply(t, a);
        };
      }
    });
  }
  plan(n) {
    this.planned = n;
  }
  diagnostic(msg) {
    out(`${"    ".repeat(this.node.depth + 1)}# ${msg}
`);
  }
  skip(msg) {
    this.node.skipped = msg ?? true;
  }
  todo(msg) {
    this.node.todo = msg ?? true;
  }
  runOnly(_v) {
  }
  before(fn) {
    this.node.hooks.before.push(fn);
  }
  after(fn) {
    this.node.hooks.after.push(fn);
  }
  beforeEach(fn) {
    this.node.hooks.beforeEach.push(fn);
  }
  afterEach(fn) {
    this.node.hooks.afterEach.push(fn);
  }
  test(...args) {
    const { name, opts, fn } = parseArgs(args);
    const child = new Node_(name, opts, fn, this.node, false);
    this.node.children.push(child);
    const p = runNode(child);
    this.pending.push(p);
    return p;
  }
  pending = [];
  /** @internal */
  _abort() {
    this.ac.abort();
  }
  /** @internal */
  _checkPlan() {
    if (this.planned !== null) {
      const got = this.asserted + this.node.children.length;
      if (got !== this.planned) throw Object.assign(new Error(`plan expected ${this.planned} assertions but received ${got}`), { code: "ERR_TEST_FAILURE" });
    }
  }
};
var SuiteContext = class {
  constructor(node) {
    this.node = node;
  }
  node;
  get name() {
    return this.node.name;
  }
  get signal() {
    return new AbortController().signal;
  }
  get filePath() {
    return proc().argv[1];
  }
};
function indent(n) {
  return "    ".repeat(n.depth);
}
function yamlError(e, ind) {
  const err3 = e;
  const lines = [`${ind}  ---`, `${ind}  duration_ms: 0`, `${ind}  failureType: 'testCodeFailure'`];
  const msg = String(err3?.message ?? err3).split("\n");
  lines.push(`${ind}  error: |-`, ...msg.map((l) => `${ind}    ${l}`));
  if (err3?.code) lines.push(`${ind}  code: '${err3.code}'`);
  const stack = String(err3?.stack ?? "").split("\n").slice(1, 6);
  if (stack.length) lines.push(`${ind}  stack: |-`, ...stack.map((l) => `${ind}    ${l.trim()}`));
  lines.push(`${ind}  ...`);
  return lines.join("\n") + "\n";
}
function report(n, index) {
  const ind = indent(n);
  if (n.children.length) out(`${ind}1..${n.children.length}
`);
  let directive = "";
  if (n.skipped) directive = ` # SKIP${typeof n.skipped === "string" ? " " + n.skipped : ""}`;
  else if (n.todo) directive = ` # TODO${typeof n.todo === "string" ? " " + n.todo : ""}`;
  out(`${ind}${n.passed ? "ok" : "not ok"} ${index} - ${n.name}${directive}
`);
  if (!n.passed) out(yamlError(n.error, ind));
  else out(`${ind}  ---
${ind}  duration_ms: ${n.duration.toFixed(3)}
${n.isSuite ? `${ind}  type: 'suite'
` : ""}${ind}  ...
`);
}
async function runHooks(fns, arg) {
  for (const h of fns) await callWithDone(h, void 0, arg);
}
async function runNode(n) {
  const parent = n.parent;
  const t0 = performance.now();
  const prevTest = currentTest;
  if (n.isSuite) counts.suites++;
  else counts.tests++;
  if (n.skipped || n.todo && !n.fn) {
    n.done = true;
    if (n.skipped) counts.skipped++;
    else counts.todo++;
    report(n, parent.children.indexOf(n) + 1);
    return;
  }
  const ctx = n.isSuite ? new SuiteContext(n) : new TestContext(n);
  try {
    if (n.isSuite) {
      await runHooks(n.hooks.before, ctx);
      for (const c of n.children) await runNode(c);
      await runHooks(n.hooks.after, ctx);
      if (n.children.some((c) => !c.passed && !c.todo)) {
        n.passed = false;
        n.error = new Error(`${n.children.filter((c) => !c.passed).length} subtests failed`);
      }
    } else {
      const tc = ctx;
      await runHooks(n.ancestorsEach("beforeEach"), tc);
      currentTest = n;
      try {
        if (n.fn) await withTimeout(callWithDone(n.fn, tc, tc), n.opts.timeout);
        await Promise.all(tc.pending);
        tc._checkPlan();
      } finally {
        currentTest = prevTest;
        tc._abort();
        tc.mock.reset();
      }
      await runHooks(n.hooks.after, tc);
      await runHooks(n.ancestorsEach("afterEach"), tc);
      if (n.children.some((c) => !c.passed && !c.todo)) {
        n.passed = false;
        n.error = new Error(`${n.children.filter((c) => !c.passed).length} subtests failed`);
      }
    }
  } catch (e) {
    n.passed = false;
    n.error = e;
  }
  n.duration = performance.now() - t0;
  n.done = true;
  if (n.isSuite) {
    if (n.error && !n.children.length) counts.fail++;
  } else if (n.todo) counts.todo++;
  else if (n.skipped) counts.skipped++;
  else if (n.passed) counts.pass++;
  else counts.fail++;
  report(n, parent.children.indexOf(n) + 1);
}
function schedule() {
  if (scheduled) return;
  scheduled = true;
  ref();
  setImmediate(() => {
    running = (async () => {
      out("TAP version 13\n");
      const t0 = performance.now();
      for (let i2 = 0; i2 < root.children.length; i2++) {
        const c = root.children[i2];
        if (!c.done) await runNode(c);
      }
      out(`1..${root.children.length}
`);
      out(`# tests ${counts.tests}
# suites ${counts.suites}
# pass ${counts.pass}
# fail ${counts.fail}
# cancelled 0
# skipped ${counts.skipped}
# todo ${counts.todo}
# duration_ms ${(performance.now() - t0).toFixed(3)}
`);
      if (counts.fail > 0) proc().exitCode = 1;
      unref();
    })();
  });
}
function register(isSuite, args, extra = {}) {
  const { name, opts, fn } = parseArgs(args);
  Object.assign(opts, extra);
  if (currentTest && !isSuite) {
    const child = new Node_(name, opts, fn, currentTest, false);
    currentTest.children.push(child);
    return runNode(child);
  }
  const n = new Node_(name, opts, fn, currentSuite, isSuite);
  currentSuite.children.push(n);
  if (isSuite) {
    const prev = currentSuite;
    currentSuite = n;
    try {
      if (fn && !n.skipped) {
        const r = fn.call(new SuiteContext(n), new SuiteContext(n));
        if (r && typeof r.then === "function") r.catch((e) => {
          n.passed = false;
          n.error = e;
        });
      }
    } catch (e) {
      n.passed = false;
      n.error = e;
    } finally {
      currentSuite = prev;
    }
  }
  schedule();
  if (n.parent === root) {
    return new Promise((resolve3) => {
      const check = () => n.done ? resolve3() : setTimeout(check, 1);
      setImmediate(check);
    });
  }
  return void 0;
}
function variants(isSuite) {
  const f = ((...a) => register(isSuite, a));
  f.skip = (...a) => register(isSuite, a, { skip: true });
  f.todo = (...a) => register(isSuite, a, { todo: true });
  f.only = (...a) => register(isSuite, a, { only: true });
  return f;
}
var test = variants(false);
var it = variants(false);
var describe = variants(true);
var suite = describe;
var hook = (kind) => (fn) => {
  if (currentTest) currentTest.hooks[kind].push(fn);
  else currentSuite.hooks[kind].push(fn);
};
var before = hook("before");
var after = hook("after");
var beforeEach = hook("beforeEach");
var afterEach = hook("afterEach");
function run() {
  throw Object.assign(new Error("node:test run() is not supported in OpenVessel"), { code: "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM" });
}
var MockFunctionContext = class {
  constructor(impl, original, restoreFn, times) {
    this.impl = impl;
    this.original = original;
    this.restoreFn = restoreFn;
    this.times = times;
  }
  impl;
  original;
  restoreFn;
  times;
  calls = [];
  onceImpls = /* @__PURE__ */ new Map();
  callCount() {
    return this.calls.length;
  }
  mockImplementation(fn) {
    this.impl = fn;
  }
  mockImplementationOnce(fn, onCall) {
    this.onceImpls.set(onCall ?? this.calls.length, fn);
  }
  resetCalls() {
    this.calls = [];
  }
  restore() {
    this.restoreFn();
  }
  /** @internal */
  _pick() {
    const once2 = this.onceImpls.get(this.calls.length);
    if (once2) {
      this.onceImpls.delete(this.calls.length);
      return once2;
    }
    if (this.calls.length >= this.times) return this.original;
    return this.impl;
  }
};
function makeMock(original, impl, restore, times = Infinity) {
  const ctx = new MockFunctionContext(impl ?? original, original, restore, times);
  const mocked = function(...args) {
    const fn = ctx._pick() ?? (() => void 0);
    const call = { arguments: args, this: this, target: new.target, stack: new Error() };
    try {
      const result = new.target ? Reflect.construct(fn, args, new.target) : fn.apply(this, args);
      call.result = result;
      ctx.calls.push(call);
      return result;
    } catch (e) {
      call.error = e;
      ctx.calls.push(call);
      throw e;
    }
  };
  Object.defineProperty(mocked, "mock", { value: ctx, enumerable: false });
  if (original) {
    Object.defineProperty(mocked, "name", { value: original.name });
    Object.defineProperty(mocked, "length", { value: original.length });
  }
  return mocked;
}
var MockTracker = class {
  restorers = [];
  fn(original, impl, opts) {
    if (original && typeof original === "object") {
      opts = original;
      original = void 0;
    }
    if (impl && typeof impl === "object") {
      opts = impl;
      impl = void 0;
    }
    const m = makeMock(original, impl, () => {
    }, opts?.times);
    return m;
  }
  method(obj, name, impl, opts = {}) {
    if (impl && typeof impl === "object") {
      opts = impl;
      impl = void 0;
    }
    let owner = obj;
    let desc;
    while (owner && !(desc = Object.getOwnPropertyDescriptor(owner, name))) owner = Object.getPrototypeOf(owner);
    if (!desc) throw Object.assign(new TypeError(`The argument 'methodName' must be a method. Received ${String(name)}`), { code: "ERR_INVALID_ARG_VALUE" });
    const ownDesc = Object.getOwnPropertyDescriptor(obj, name);
    const restore = () => {
      if (ownDesc) Object.defineProperty(obj, name, ownDesc);
      else delete obj[name];
    };
    const key = opts.getter ? "get" : opts.setter ? "set" : "value";
    const original = desc[key];
    const m = makeMock(original, impl, restore, opts.times);
    Object.defineProperty(obj, name, { ...desc, [key]: m });
    this.restorers.push(restore);
    return m;
  }
  getter(obj, name, impl, opts = {}) {
    return this.method(obj, name, impl, { ...opts, getter: true });
  }
  setter(obj, name, impl, opts = {}) {
    return this.method(obj, name, impl, { ...opts, setter: true });
  }
  reset() {
    this.restoreAll();
    this.restorers = [];
  }
  restoreAll() {
    for (const r of this.restorers.reverse()) r();
  }
  get timers() {
    throw Object.assign(new Error("mock.timers is not supported in OpenVessel"), { code: "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM" });
  }
};
var mock = new MockTracker();
var testModule = test;
Object.assign(testModule, { test, it, describe, suite, before, after, beforeEach, afterEach, run, mock, MockTracker });
var test_runner_default = testModule;

// src/node/util.ts
var import_buffer2 = __toESM(require_buffer(), 1);
var custom = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var kPromisify = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
var STYLES = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  gray: [90, 39],
  black: [30, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39],
  dim: [2, 22],
  strikethrough: [9, 29],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  bgBlack: [40, 49],
  blackBright: [90, 39],
  redBright: [91, 39],
  greenBright: [92, 39],
  yellowBright: [93, 39],
  blueBright: [94, 39],
  magentaBright: [95, 39],
  cyanBright: [96, 39],
  whiteBright: [97, 39],
  reset: [0, 0]
};
var STYLE_FOR = {
  special: "cyan",
  number: "yellow",
  bigint: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  symbol: "green",
  date: "magenta",
  regexp: "red",
  module: "underline"
};
function inspect(value, opts, depthArg, colorsArg) {
  let o;
  if (typeof opts === "boolean") o = { showHidden: opts, depth: depthArg, colors: colorsArg };
  else o = { ...opts ?? {} };
  const ctx = {
    depth: o.depth === void 0 ? 2 : o.depth === null ? Infinity : o.depth,
    colors: !!o.colors,
    showHidden: !!o.showHidden,
    breakLength: o.breakLength ?? 80,
    compact: o.compact ?? 3,
    maxArrayLength: o.maxArrayLength === null ? Infinity : o.maxArrayLength ?? 100,
    maxStringLength: o.maxStringLength === null ? Infinity : o.maxStringLength ?? 1e4,
    sorted: o.sorted,
    customInspect: o.customInspect !== false,
    getters: !!o.getters,
    seen: [],
    circular: /* @__PURE__ */ new Map()
  };
  const stylize = (s, type2) => {
    if (!ctx.colors) return s;
    const st = STYLES[STYLE_FOR[type2] ?? type2];
    return st ? `\x1B[${st[0]}m${s}\x1B[${st[1]}m` : s;
  };
  return formatValue(value, 0);
  function formatValue(v, level, inObject = false) {
    if (v === null) return stylize("null", "null");
    if (v === void 0) return stylize("undefined", "undefined");
    switch (typeof v) {
      case "string":
        if (v.length > ctx.maxStringLength) return stylize(quote(v.slice(0, ctx.maxStringLength), true), "string") + `... ${v.length - ctx.maxStringLength} more character${v.length - ctx.maxStringLength > 1 ? "s" : ""}`;
        return stylize(quote(v, true), "string");
      case "number":
        return stylize(Object.is(v, -0) ? "-0" : String(v), "number");
      case "bigint":
        return stylize(`${v}n`, "bigint");
      case "boolean":
        return stylize(String(v), "boolean");
      case "symbol":
        return stylize(v.toString(), "symbol");
      case "function":
      case "object":
        break;
      default:
        return String(v);
    }
    const obj = v;
    if (ctx.customInspect) {
      const fn = obj[custom];
      if (typeof fn === "function" && fn !== inspect) {
        const r = fn.call(obj, ctx.depth - level, { ...o, stylize, depth: ctx.depth - level }, inspect);
        if (r !== obj) return typeof r === "string" ? r : formatValue(r, level);
      }
    }
    if (ctx.seen.includes(obj)) {
      let idx = ctx.circular.get(obj);
      if (idx === void 0) {
        idx = ctx.circular.size + 1;
        ctx.circular.set(obj, idx);
      }
      return stylize(`[Circular *${idx}]`, "special");
    }
    return formatRaw(obj, level);
  }
  function keysOf(obj) {
    let keys = ctx.showHidden ? Reflect.ownKeys(obj) : Object.keys(obj);
    if (!ctx.showHidden) {
      for (const s of Object.getOwnPropertySymbols(obj)) if (Object.getOwnPropertyDescriptor(obj, s)?.enumerable) keys.push(s);
    }
    if (ctx.sorted) keys = [...keys].sort(typeof ctx.sorted === "function" ? ctx.sorted : void 0);
    return keys;
  }
  function formatProp(obj, key, level, arrayLike) {
    const desc = Object.getOwnPropertyDescriptor(obj, key) ?? { value: obj[key], enumerable: true };
    let str;
    if (desc.get || desc.set) {
      if (desc.get && ctx.getters) {
        try {
          str = `[Getter: ${formatValue(desc.get.call(obj), level + 1, true)}]`;
        } catch (e) {
          str = `[Getter: <Inspection threw (${e.message})>]`;
        }
      } else str = stylize(desc.get && desc.set ? "[Getter/Setter]" : desc.get ? "[Getter]" : "[Setter]", "special");
    } else {
      str = formatValue(desc.value, level + 1, true);
    }
    if (arrayLike) return str;
    let name;
    if (typeof key === "symbol") name = `[${stylize(key.toString(), "symbol")}]`;
    else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) name = key;
    else name = stylize(quote(key, true), "string");
    if (!desc.enumerable) name = `[${name}]`;
    return `${name}: ${str}`;
  }
  function formatRaw(obj, level) {
    let braces = ["{", "}"];
    let prefix = "";
    let entries = [];
    let keys = keysOf(obj);
    let base = "";
    const ctorName = getCtorName(obj);
    const tag = obj[Symbol.toStringTag];
    if (typeof obj === "function") {
      const name = obj.name ? `: ${obj.name}` : " (anonymous)";
      const isClass = Function.prototype.toString.call(obj).startsWith("class");
      base = stylize(`[${isClass ? "class" : obj.constructor?.name === "AsyncFunction" ? "AsyncFunction" : obj.constructor?.name === "GeneratorFunction" ? "GeneratorFunction" : "Function"}${name}]`, "special");
      keys = keys.filter((k) => k !== "prototype");
      if (!keys.length) return base;
    } else if (obj instanceof RegExp) {
      base = stylize(RegExp.prototype.toString.call(obj), "regexp");
      if (!keys.length) return base;
    } else if (obj instanceof Date) {
      base = stylize(isNaN(obj.getTime()) ? "Invalid Date" : obj.toISOString(), "date");
      if (!keys.length) return base;
    } else if (obj instanceof Error) {
      base = formatError(obj);
      keys = keys.filter((k) => k !== "stack" && k !== "message");
      if (!keys.length) return base;
    } else if (Array.isArray(obj)) {
      braces = ["[", "]"];
      if (ctorName !== "Array") prefix = `${ctorName}(${obj.length}) `;
    } else if (ArrayBuffer.isView(obj) && !(obj instanceof DataView)) {
      braces = ["[", "]"];
      prefix = `${ctorName}(${obj.length}) `;
    } else if (obj instanceof Map) {
      prefix = `Map(${obj.size}) `;
    } else if (obj instanceof Set) {
      prefix = `Set(${obj.size}) `;
    } else if (obj instanceof Promise) {
      prefix = "Promise ";
    } else if (obj instanceof WeakMap || obj instanceof WeakSet) {
      return `${ctorName} { ${stylize("<items unknown>", "special")} }`;
    } else if (obj instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && obj instanceof SharedArrayBuffer) {
      const bytes2 = new Uint8Array(obj);
      const hex = [...bytes2.subarray(0, 50)].map((b) => b.toString(16).padStart(2, "0")).join(" ");
      return `${ctorName} { [Uint8Contents]: <${hex}${bytes2.length > 50 ? ` ... ${bytes2.length - 50} more bytes` : ""}>, byteLength: ${bytes2.length} }`;
    } else if (typeof obj[Symbol.iterator] === "function" && /Iterator$/.test(tag ?? "")) {
      return `Object [${tag}] {}`;
    } else {
      if (ctorName === null) prefix = "[Object: null prototype] ";
      else if (ctorName !== "Object") prefix = `${ctorName} `;
      if (tag && tag !== ctorName) prefix = `${ctorName ?? "Object"} [${tag}] `;
      if (obj instanceof Number || obj instanceof String || obj instanceof Boolean) {
        base = `[${ctorName}: ${formatValue(obj.valueOf(), level)}]`;
        if (obj instanceof String) keys = keys.filter((k) => !/^\d+$/.test(String(k)) && k !== "length");
        if (!keys.length) return base;
      }
    }
    if (level > ctx.depth) {
      if (Array.isArray(obj)) return stylize("[Array]", "special");
      return stylize(`[${ctorName ?? "Object"}]`, "special");
    }
    ctx.seen.push(obj);
    try {
      if (Array.isArray(obj) || ArrayBuffer.isView(obj) && !(obj instanceof DataView)) {
        const arr = obj;
        const n = Math.min(arr.length, ctx.maxArrayLength);
        let holes = 0;
        for (let i2 = 0; i2 < n; i2++) {
          if (Array.isArray(arr) && !Object.prototype.hasOwnProperty.call(arr, i2)) {
            holes++;
            continue;
          }
          if (holes) {
            entries.push(stylize(`<${holes} empty item${holes > 1 ? "s" : ""}>`, "undefined"));
            holes = 0;
          }
          entries.push(formatValue(arr[i2], level + 1, true));
        }
        if (holes) entries.push(stylize(`<${holes} empty item${holes > 1 ? "s" : ""}>`, "undefined"));
        if (arr.length > n) entries.push(`... ${arr.length - n} more item${arr.length - n > 1 ? "s" : ""}`);
        keys = keys.filter((k) => typeof k === "symbol" || !/^\d+$/.test(k));
        if (ArrayBuffer.isView(obj)) keys = keys.filter((k) => k !== "length");
      } else if (obj instanceof Map) {
        let i2 = 0;
        for (const [k, val] of obj) {
          if (i2++ >= ctx.maxArrayLength) {
            entries.push(`... ${obj.size - ctx.maxArrayLength} more items`);
            break;
          }
          entries.push(`${formatValue(k, level + 1, true)} => ${formatValue(val, level + 1, true)}`);
        }
      } else if (obj instanceof Set) {
        let i2 = 0;
        for (const val of obj) {
          if (i2++ >= ctx.maxArrayLength) {
            entries.push(`... ${obj.size - ctx.maxArrayLength} more items`);
            break;
          }
          entries.push(formatValue(val, level + 1, true));
        }
      } else if (obj instanceof Promise) {
        entries.push(stylize("<pending>", "special"));
      }
      for (const k of keys) entries.push(formatProp(obj, k, level, false));
    } finally {
      ctx.seen.pop();
    }
    const idx = ctx.circular.get(obj);
    if (idx !== void 0) prefix = stylize(`<ref *${idx}>`, "special") + " " + prefix;
    if (base) {
      if (!entries.length) return base;
      return `${prefix}${base} ${braces[0]} ${entries.join(", ")} ${braces[1]}`;
    }
    if (!entries.length) {
      if (obj instanceof Map || obj instanceof Set) return `${prefix}{}`;
      return `${prefix}${braces[0]}${braces[1]}`;
    }
    const start = prefix + braces[0];
    const totalLen = entries.reduce((a, e) => a + e.length + 2, start.length);
    const multiline = entries.some((e) => e.includes("\n"));
    if (ctx.compact !== false && !multiline && totalLen + level * 2 <= ctx.breakLength) {
      return `${start} ${entries.join(", ")} ${braces[1]}`;
    }
    const indent2 = "  ".repeat(level + 1);
    if (braces[0] === "[" && entries.length > 6 && entries.every((e) => e.length <= 16 && !e.includes("\n"))) {
      const width = Math.max(...entries.map((e) => stripVTControlCharacters(e).length)) + 2;
      const cols = Math.max(1, Math.min(16, Math.floor((ctx.breakLength - indent2.length) / width), Math.round(Math.sqrt(2.5 * width * entries.length) / width)));
      const rows = [];
      for (let i2 = 0; i2 < entries.length; i2 += cols) rows.push(entries.slice(i2, i2 + cols).map((e, j, a) => j < a.length - 1 ? (e + ",").padEnd(width) : e).join(""));
      return `${start}
${indent2}${rows.join(",\n" + indent2)}
${"  ".repeat(level)}${braces[1]}`;
    }
    return `${start}
${indent2}${entries.join(`,
${indent2}`)}
${"  ".repeat(level)}${braces[1]}`;
  }
  function formatError(err3) {
    let stack = err3.stack || `${err3.name}: ${err3.message}`;
    if (!stack.includes(err3.message) && err3.message) stack = `${err3.name}: ${err3.message}
${stack}`;
    const cause = err3.cause;
    if (cause !== void 0 && !ctx.seen.includes(cause)) {
      ctx.seen.push(err3);
      stack += `
  [cause]: ${formatValue(cause, 1, true)}`;
      ctx.seen.pop();
    }
    if (err3 instanceof AggregateError && err3.errors?.length) {
      stack += ` {
  [errors]: ${formatValue(err3.errors, 1, true)}
}`;
    }
    return stack;
  }
}
inspect.custom = custom;
inspect.defaultOptions = { depth: 2, colors: false };
inspect.colors = Object.fromEntries(Object.entries(STYLES).map(([k, v]) => [k, v]));
inspect.styles = { ...STYLE_FOR };
function quote(s, quoted) {
  if (!quoted) return s;
  let q = "'";
  if (s.includes("'")) q = !s.includes('"') ? '"' : !s.includes("`") && !s.includes("${") ? "`" : "'";
  const esc = s.replace(/[\\\n\t\r\b\f\v\x00-\x1f\x7f]/g, (c) => {
    switch (c) {
      case "\\":
        return "\\\\";
      case "\n":
        return "\\n";
      case "	":
        return "\\t";
      case "\r":
        return "\\r";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\v":
        return "\\v";
      default:
        return "\\x" + c.charCodeAt(0).toString(16).padStart(2, "0");
    }
  });
  return q + (q === "'" ? esc.replace(/'/g, "\\'") : esc) + q;
}
function getCtorName(obj) {
  let o = obj;
  const seen = /* @__PURE__ */ new Set();
  while (o && !seen.has(o)) {
    seen.add(o);
    const d = Object.getOwnPropertyDescriptor(o, "constructor");
    if (d && typeof d.value === "function" && d.value.name) return d.value.name;
    o = Object.getPrototypeOf(o);
  }
  return o === null && Object.getPrototypeOf(obj) === null ? null : "Object";
}
function format(fmt, ...args) {
  return formatWithOptions({}, fmt, ...args);
}
function formatWithOptions(opts, fmt, ...args) {
  if (typeof fmt !== "string") {
    return [fmt, ...args].map((a) => typeof a === "string" ? a : inspect(a, { ...opts, depth: opts.depth ?? 2 })).join(" ");
  }
  let i2 = 0;
  let out3 = "";
  let last = 0;
  for (let j = 0; j < fmt.length - 1; j++) {
    if (fmt[j] !== "%") continue;
    const c = fmt[j + 1];
    if (c === "%") {
      out3 += fmt.slice(last, j) + "%";
      last = j + 2;
      j++;
      continue;
    }
    if (i2 >= args.length) continue;
    let rep = null;
    const a = args[i2];
    switch (c) {
      case "s":
        rep = typeof a === "string" ? a : typeof a === "bigint" ? `${a}n` : typeof a === "object" && a !== null ? inspect(a, { ...opts, depth: 0 }) : String(a);
        break;
      case "d":
      case "i":
        rep = typeof a === "bigint" ? `${a}n` : typeof a === "object" && a !== null ? "NaN" : String(c === "i" ? parseInt(String(a)) : Number(a));
        break;
      case "f":
        rep = String(parseFloat(String(a)));
        break;
      case "j":
        try {
          rep = JSON.stringify(a);
        } catch {
          rep = "[Circular]";
        }
        break;
      case "o":
        rep = inspect(a, { ...opts, showHidden: true, depth: 4 });
        break;
      case "O":
        rep = inspect(a, opts);
        break;
      case "c":
        rep = "";
        break;
    }
    if (rep === null) continue;
    out3 += fmt.slice(last, j) + rep;
    last = j + 2;
    j++;
    i2++;
  }
  out3 += fmt.slice(last);
  for (; i2 < args.length; i2++) {
    const a = args[i2];
    out3 += " " + (typeof a === "string" ? a : inspect(a, opts));
  }
  return out3;
}
function inherits(ctor, superCtor) {
  if (ctor === void 0 || ctor === null) throw new TypeError('The "ctor" argument must be of type function');
  if (superCtor === void 0 || superCtor === null) throw new TypeError('The "superCtor" argument must be of type function');
  Object.defineProperty(ctor, "super_", { value: superCtor, writable: true, configurable: true });
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}
function promisify(fn) {
  if (typeof fn !== "function") throw new TypeError('The "original" argument must be of type Function');
  if (fn[kPromisify]) {
    const f = fn[kPromisify];
    return f;
  }
  const customArgs = fn[/* @__PURE__ */ Symbol.for("nodejs.util.promisify.customArgs")];
  function promisified(...args) {
    return new Promise((resolve3, reject) => {
      fn.call(this, ...args, (err3, ...values) => {
        if (err3) return reject(err3);
        if (customArgs && values.length > 1) {
          const obj = {};
          customArgs.forEach((k, i2) => obj[k] = values[i2]);
          resolve3(obj);
        } else resolve3(values[0]);
      });
    });
  }
  Object.setPrototypeOf(promisified, Object.getPrototypeOf(fn));
  Object.defineProperty(promisified, kPromisify, { value: promisified });
  return Object.defineProperties(promisified, Object.getOwnPropertyDescriptors(fn));
}
promisify.custom = kPromisify;
function callbackify(fn) {
  return function(...args) {
    const cb = args.pop();
    fn.apply(this, args).then(
      (v) => queueMicrotask(() => cb(null, v)),
      (e) => queueMicrotask(() => cb(e ?? new Error("Promise was rejected with a falsy value")))
    );
  };
}
var warned = /* @__PURE__ */ new Set();
function deprecate(fn, msg, code) {
  return function(...args) {
    const key = code ?? msg;
    if (!warned.has(key)) {
      warned.add(key);
      globalThis.process?.emitWarning?.(msg, "DeprecationWarning", code);
    }
    return fn.apply(this, args);
  };
}
var debugEnv = () => String(globalThis.process?.env?.NODE_DEBUG ?? "");
function debuglog(section, cb) {
  let enabled;
  const fn = (...args) => {
    if (enabled === void 0) {
      const env = debugEnv();
      enabled = env.split(/[\s,]+/).some((s) => s === "*" || s.toLowerCase() === section.toLowerCase() || s.endsWith("*") && section.toLowerCase().startsWith(s.slice(0, -1).toLowerCase()));
    }
    if (enabled) globalThis.process?.stderr?.write(`${section.toUpperCase()} ${globalThis.process?.pid}: ${format(...args)}
`);
  };
  Object.defineProperty(fn, "enabled", { get: () => debugEnv().includes(section) });
  cb?.(fn);
  return fn;
}
var debug = debuglog;
function isDeepStrictEqual(a, b) {
  return deepEqual(a, b, true, /* @__PURE__ */ new Map());
}
function deepEqual(a, b, strict3, memo) {
  if (strict3 ? Object.is(a, b) : a == b || Number.isNaN(a) && Number.isNaN(b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }
  if (strict3 && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  const ta = Object.prototype.toString.call(a);
  if (ta !== Object.prototype.toString.call(b)) return false;
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;
  if (a instanceof Error && (a.message !== b.message || a.name !== b.name)) return false;
  if (ArrayBuffer.isView(a)) {
    if (a.length !== b.length || a.byteLength !== b.byteLength) return false;
    const x2 = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    const y = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
    for (let i2 = 0; i2 < x2.length; i2++) if (x2[i2] !== y[i2]) return false;
    return true;
  }
  if (memo.get(a) === b) return true;
  memo.set(a, b);
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), strict3, memo)) return false;
    return true;
  }
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    outer: for (const v of a) {
      if (b.has(v)) continue;
      if (typeof v === "object") {
        for (const w of b) if (deepEqual(v, w, strict3, memo)) continue outer;
      }
      return false;
    }
    return true;
  }
  if (a instanceof Number || a instanceof String || a instanceof Boolean) {
    if (!Object.is(a.valueOf(), b.valueOf())) return false;
  }
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (!deepEqual(a[k], b[k], strict3, memo)) return false;
  }
  if (strict3) {
    const sa = Object.getOwnPropertySymbols(a).filter((s) => Object.prototype.propertyIsEnumerable.call(a, s));
    const sb = Object.getOwnPropertySymbols(b).filter((s) => Object.prototype.propertyIsEnumerable.call(b, s));
    if (sa.length !== sb.length) return false;
    for (const s of sa) if (!deepEqual(a[s], b[s], strict3, memo)) return false;
  }
  return true;
}
function stripVTControlCharacters(s) {
  return s.replace(/[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d/#&.:=?%@~_]+)*|[a-zA-Z\d]+(?:;[-a-zA-Z\d/#&.:=?%@~_]*)*)?\u0007)|(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))/g, "");
}
function styleText(format3, text, opts) {
  const formats = Array.isArray(format3) ? format3 : [format3];
  const stream = opts?.stream ?? globalThis.process?.stdout;
  if (opts?.validateStream !== false && stream && !stream.isTTY && !globalThis.process?.env?.FORCE_COLOR) return text;
  let out3 = text;
  for (const f of formats) {
    const st = STYLES[f];
    if (!st) {
      const e = new TypeError(`The argument 'format' must be one of: ${Object.keys(STYLES).join(", ")}. Received '${f}'`);
      e.code = "ERR_INVALID_ARG_VALUE";
      throw e;
    }
    out3 = `\x1B[${st[0]}m${out3}\x1B[${st[1]}m`;
  }
  return out3;
}
function toUSVString(s) {
  return String(s).toWellFormed?.() ?? s;
}
function getSystemErrorName(n) {
  const names = { [-2]: "ENOENT", [-13]: "EACCES", [-17]: "EEXIST", [-20]: "ENOTDIR", [-21]: "EISDIR", [-22]: "EINVAL", [-39]: "ENOTEMPTY", [-98]: "EADDRINUSE", [-111]: "ECONNREFUSED" };
  return names[n] ?? `Unknown system error ${n}`;
}
function getSystemErrorMap() {
  return /* @__PURE__ */ new Map([[-2, ["ENOENT", "no such file or directory"]]]);
}
function aborted(signal, _resource) {
  return new Promise((resolve3) => {
    if (signal.aborted) resolve3();
    else signal.addEventListener("abort", () => resolve3(), { once: true });
  });
}
function parseArgs2(config = {}) {
  const args = config.args ?? globalThis.process?.argv?.slice(2) ?? [];
  const options = config.options ?? {};
  const strict3 = config.strict ?? true;
  const allowPositionals = config.allowPositionals ?? !strict3;
  const values = /* @__PURE__ */ Object.create(null);
  const positionals = [];
  const tokens = [];
  const shortMap = {};
  for (const [name, o] of Object.entries(options)) if (o.short) shortMap[o.short] = name;
  const store = (name, value, index, raw, inline) => {
    const o = options[name];
    if (!o && strict3) {
      const e = new TypeError(`Unknown option '${raw}'`);
      e.code = "ERR_PARSE_ARGS_UNKNOWN_OPTION";
      throw e;
    }
    if (o?.multiple) (values[name] ??= []).push(value);
    else values[name] = value;
    tokens.push({ kind: "option", name, rawName: raw, index, value: o?.type === "string" ? value : void 0, inlineValue: inline });
  };
  for (let i2 = 0; i2 < args.length; i2++) {
    const a = args[i2];
    if (a === "--") {
      positionals.push(...args.slice(i2 + 1));
      break;
    }
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      let name = eq === -1 ? a.slice(2) : a.slice(2, eq);
      if (config.allowNegative && name.startsWith("no-") && options[name.slice(3)]?.type === "boolean") {
        store(name.slice(3), false, i2, a);
        continue;
      }
      const o = options[name];
      if (o?.type === "string") store(name, eq === -1 ? args[++i2] : a.slice(eq + 1), i2, `--${name}`, eq !== -1);
      else store(name, eq === -1 ? true : a.slice(eq + 1), i2, `--${name}`);
      void name;
      continue;
    }
    if (a.startsWith("-") && a.length > 1) {
      for (let j = 1; j < a.length; j++) {
        const name = shortMap[a[j]] ?? a[j];
        const o = options[name];
        if (o?.type === "string") {
          store(name, a.slice(j + 1) || args[++i2], i2, `-${a[j]}`);
          break;
        }
        store(name, true, i2, `-${a[j]}`);
      }
      continue;
    }
    if (!allowPositionals && strict3) {
      const e = new TypeError(`Unexpected argument '${a}'. This command does not take positional arguments`);
      e.code = "ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL";
      throw e;
    }
    positionals.push(a);
    tokens.push({ kind: "positional", index: i2, value: a });
  }
  for (const [name, o] of Object.entries(options)) if (values[name] === void 0 && o.default !== void 0) values[name] = o.default;
  return config.tokens ? { values, positionals, tokens } : { values, positionals };
}
function getCallSite() {
  return [];
}
var getCallSites = getCallSite;
var MIMEType = class {
  type;
  subtype;
  params;
  constructor(s) {
    const [main, ...rest] = String(s).split(";");
    const [t, st] = main.trim().toLowerCase().split("/");
    this.type = t;
    this.subtype = st ?? "";
    this.params = new URLSearchParams(rest.map((r) => r.trim()).join("&"));
  }
  get essence() {
    return `${this.type}/${this.subtype}`;
  }
  toString() {
    const p = [...this.params].map(([k, v]) => `;${k}=${v}`).join("");
    return this.essence + p;
  }
};
var toStr = (v) => Object.prototype.toString.call(v);
var types = {
  isAnyArrayBuffer: (v) => v instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && v instanceof SharedArrayBuffer,
  isArrayBuffer: (v) => v instanceof ArrayBuffer,
  isSharedArrayBuffer: (v) => typeof SharedArrayBuffer !== "undefined" && v instanceof SharedArrayBuffer,
  isArrayBufferView: (v) => ArrayBuffer.isView(v),
  isArgumentsObject: (v) => toStr(v) === "[object Arguments]",
  isAsyncFunction: (v) => typeof v === "function" && toStr(v) === "[object AsyncFunction]",
  isGeneratorFunction: (v) => typeof v === "function" && /GeneratorFunction\]$/.test(toStr(v)),
  isGeneratorObject: (v) => toStr(v) === "[object Generator]",
  isBigInt64Array: (v) => v instanceof BigInt64Array,
  isBigUint64Array: (v) => v instanceof BigUint64Array,
  isBooleanObject: (v) => v instanceof Boolean,
  isNumberObject: (v) => v instanceof Number,
  isStringObject: (v) => v instanceof String,
  isSymbolObject: (v) => typeof v === "object" && toStr(v) === "[object Symbol]",
  isBigIntObject: (v) => typeof v === "object" && toStr(v) === "[object BigInt]",
  isBoxedPrimitive: (v) => v instanceof Boolean || v instanceof Number || v instanceof String || typeof v === "object" && /\[object (Symbol|BigInt)\]/.test(toStr(v)),
  isDataView: (v) => v instanceof DataView,
  isDate: (v) => v instanceof Date,
  isExternal: (_v) => false,
  isFloat32Array: (v) => v instanceof Float32Array,
  isFloat64Array: (v) => v instanceof Float64Array,
  isInt8Array: (v) => v instanceof Int8Array,
  isInt16Array: (v) => v instanceof Int16Array,
  isInt32Array: (v) => v instanceof Int32Array,
  isMap: (v) => v instanceof Map,
  isMapIterator: (v) => toStr(v) === "[object Map Iterator]",
  isModuleNamespaceObject: (v) => !!v && typeof v === "object" && v[Symbol.toStringTag] === "Module",
  isNativeError: (v) => v instanceof Error,
  isPromise: (v) => v instanceof Promise,
  isProxy: (_v) => false,
  isRegExp: (v) => v instanceof RegExp,
  isSet: (v) => v instanceof Set,
  isSetIterator: (v) => toStr(v) === "[object Set Iterator]",
  isTypedArray: (v) => ArrayBuffer.isView(v) && !(v instanceof DataView),
  isUint8Array: (v) => v instanceof Uint8Array,
  isUint8ClampedArray: (v) => v instanceof Uint8ClampedArray,
  isUint16Array: (v) => v instanceof Uint16Array,
  isUint32Array: (v) => v instanceof Uint32Array,
  isWeakMap: (v) => v instanceof WeakMap,
  isWeakSet: (v) => v instanceof WeakSet,
  isKeyObject: (v) => !!v && v[Symbol.toStringTag] === "KeyObject",
  isCryptoKey: (v) => typeof CryptoKey !== "undefined" && v instanceof CryptoKey
};
var isArray = Array.isArray;
var isBoolean = (v) => typeof v === "boolean";
var isNull = (v) => v === null;
var isNullOrUndefined = (v) => v == null;
var isNumber = (v) => typeof v === "number";
var isString = (v) => typeof v === "string";
var isSymbol = (v) => typeof v === "symbol";
var isUndefined = (v) => v === void 0;
var isRegExp = types.isRegExp;
var isObject = (v) => v !== null && typeof v === "object";
var isDate = types.isDate;
var isError = (v) => v instanceof Error;
var isFunction = (v) => typeof v === "function";
var isPrimitive = (v) => v === null || typeof v !== "object" && typeof v !== "function";
var isBuffer = (v) => import_buffer2.Buffer.isBuffer(v);
function _extend(target, source) {
  return Object.assign(target, source);
}
var TextEncoder2 = globalThis.TextEncoder;
var TextDecoder2 = globalThis.TextDecoder;
var util_default = {
  inspect,
  format,
  formatWithOptions,
  inherits,
  promisify,
  callbackify,
  deprecate,
  debuglog,
  debug,
  isDeepStrictEqual,
  stripVTControlCharacters,
  styleText,
  toUSVString,
  getSystemErrorName,
  getSystemErrorMap,
  aborted,
  parseArgs: parseArgs2,
  getCallSite,
  getCallSites,
  MIMEType,
  MIMEParams: URLSearchParams,
  types,
  TextEncoder: TextEncoder2,
  TextDecoder: TextDecoder2,
  isArray,
  isBoolean,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isRegExp,
  isObject,
  isDate,
  isError,
  isFunction,
  isPrimitive,
  isBuffer,
  _extend
};

// src/node/assert.ts
var AssertionError = class extends Error {
  actual;
  expected;
  operator;
  generatedMessage;
  code = "ERR_ASSERTION";
  constructor(opts) {
    const generated = !opts.message;
    super(typeof opts.message === "string" ? opts.message : generated ? `${inspect(opts.actual)} ${opts.operator} ${inspect(opts.expected)}` : String(opts.message));
    this.name = "AssertionError";
    this.actual = opts.actual;
    this.expected = opts.expected;
    this.operator = opts.operator ?? "fail";
    this.generatedMessage = generated;
    if (opts.stackStartFn) Error.captureStackTrace?.(this, opts.stackStartFn);
  }
};
function fail_(actual, expected, message, operator, fn) {
  if (message instanceof Error) throw message;
  throw new AssertionError({ message, actual, expected, operator, stackStartFn: fn });
}
function ok(value, message) {
  if (!value) fail_(value, true, message ?? "The expression evaluated to a falsy value", "==", ok);
}
function equal(a, b, message) {
  if (!(a == b || Number.isNaN(a) && Number.isNaN(b))) fail_(a, b, message, "==", equal);
}
function notEqual(a, b, message) {
  if (a == b || Number.isNaN(a) && Number.isNaN(b)) fail_(a, b, message, "!=", notEqual);
}
function strictEqual(a, b, message) {
  if (!Object.is(a, b)) fail_(a, b, message ?? `Expected values to be strictly equal:

${inspect(a)} !== ${inspect(b)}
`, "strictEqual", strictEqual);
}
function notStrictEqual(a, b, message) {
  if (Object.is(a, b)) fail_(a, b, message, "notStrictEqual", notStrictEqual);
}
function deepEqual_(a, b, message) {
  if (!deepEqual(a, b, false, /* @__PURE__ */ new Map())) fail_(a, b, message, "deepEqual", deepEqual_);
}
function notDeepEqual(a, b, message) {
  if (deepEqual(a, b, false, /* @__PURE__ */ new Map())) fail_(a, b, message, "notDeepEqual", notDeepEqual);
}
function deepStrictEqual(a, b, message) {
  if (!deepEqual(a, b, true, /* @__PURE__ */ new Map())) fail_(a, b, message ?? `Expected values to be strictly deep-equal:
${inspect(a)}

should equal

${inspect(b)}`, "deepStrictEqual", deepStrictEqual);
}
function notDeepStrictEqual(a, b, message) {
  if (deepEqual(a, b, true, /* @__PURE__ */ new Map())) fail_(a, b, message, "notDeepStrictEqual", notDeepStrictEqual);
}
function partialDeepStrictEqual(a, b, message) {
  const check = (x2, y) => {
    if (typeof y !== "object" || y === null) return Object.is(x2, y);
    if (typeof x2 !== "object" || x2 === null) return false;
    return Object.keys(y).every((k) => check(x2[k], y[k]));
  };
  if (!check(a, b)) fail_(a, b, message, "partialDeepStrictEqual", partialDeepStrictEqual);
}
function matchesExpected(err3, expected) {
  if (expected === void 0) return true;
  if (typeof expected === "function") {
    if (expected.prototype !== void 0 && err3 instanceof expected) return true;
    if (Error.isPrototypeOf(expected)) return false;
    return expected.call({}, err3) === true;
  }
  if (expected instanceof RegExp) return expected.test(String(err3));
  if (typeof expected === "object") {
    return Object.keys(expected).every((k) => {
      const v = expected[k];
      if (v instanceof RegExp && typeof err3[k] === "string") return v.test(err3[k]);
      return deepEqual(err3[k], v, true, /* @__PURE__ */ new Map());
    });
  }
  return false;
}
function checkThrown(e, expected, message, operator, fn) {
  if (matchesExpected(e, expected)) return;
  if (typeof expected === "function" && expected.prototype !== void 0 && (expected === Error || Error.isPrototypeOf(expected))) throw e;
  if (expected && typeof expected === "object" && !(expected instanceof RegExp)) {
    for (const k of Object.keys(expected)) {
      const v = expected[k];
      const ok2 = v instanceof RegExp && typeof e?.[k] === "string" ? v.test(e[k]) : deepEqual(e?.[k], v, true, /* @__PURE__ */ new Map());
      if (!ok2) fail_(e?.[k], v, message ?? `Expected values to be strictly deep-equal:
+ actual - expected

  Comparison {
+   ${k}: ${inspect(e?.[k])}
-   ${k}: ${inspect(v)}
  }`, operator, fn);
    }
  }
  fail_(e, expected, message ?? `The ${typeof expected === "function" ? `"validate" validation function` : "error"} is expected to match the expected value.

Actual message: "${e?.message}"`, operator, fn);
}
function throws(fn, expected, message) {
  if (typeof expected === "string") {
    message = expected;
    expected = void 0;
  }
  try {
    fn();
  } catch (e) {
    checkThrown(e, expected, message, "throws", throws);
    return;
  }
  fail_(void 0, expected, message ?? "Missing expected exception.", "throws", throws);
}
function doesNotThrow(fn, _expected, message) {
  try {
    fn();
  } catch (e) {
    fail_(e, void 0, message ?? `Got unwanted exception.
Actual message: "${e?.message}"`, "doesNotThrow", doesNotThrow);
  }
}
async function rejects(p, expected, message) {
  try {
    await (typeof p === "function" ? p() : p);
  } catch (e) {
    checkThrown(e, expected, message, "rejects", rejects);
    return;
  }
  fail_(void 0, expected, message ?? "Missing expected rejection.", "rejects", rejects);
}
async function doesNotReject(p, _expected, message) {
  try {
    await (typeof p === "function" ? p() : p);
  } catch (e) {
    fail_(e, void 0, message ?? "Got unwanted rejection.", "doesNotReject", doesNotReject);
  }
}
function match(s, re, message) {
  if (!re.test(s)) fail_(s, re, message ?? `The input did not match the regular expression ${re}. Input:

${inspect(s)}
`, "match", match);
}
function doesNotMatch(s, re, message) {
  if (re.test(s)) fail_(s, re, message, "doesNotMatch", doesNotMatch);
}
function fail(message) {
  if (message instanceof Error) throw message;
  throw new AssertionError({ message: message ?? "Failed", operator: "fail", stackStartFn: fail });
}
function ifError(v) {
  if (v !== null && v !== void 0) {
    if (v instanceof Error) throw v;
    throw new AssertionError({ message: `ifError got unwanted exception: ${inspect(v)}`, actual: v, operator: "ifError" });
  }
}
var assert = function assert2(value, message) {
  ok(value, message);
};
Object.assign(assert, {
  AssertionError,
  ok,
  equal,
  notEqual,
  strictEqual,
  notStrictEqual,
  deepEqual: deepEqual_,
  notDeepEqual,
  deepStrictEqual,
  notDeepStrictEqual,
  partialDeepStrictEqual,
  throws,
  doesNotThrow,
  rejects,
  doesNotReject,
  match,
  doesNotMatch,
  fail,
  ifError
});
var strict = function strict2(value, message) {
  ok(value, message);
};
Object.assign(strict, assert, { equal: strictEqual, notEqual: notStrictEqual, deepEqual: deepStrictEqual, notDeepEqual: notDeepStrictEqual });
strict.strict = strict;
assert.strict = strict;
assert.Assert = class Assert {
};
var assert_default = assert;

// src/node/child_process.ts
var import_buffer6 = __toESM(require_buffer(), 1);
init_events();

// src/node/fs.ts
var import_buffer5 = __toESM(require_buffer(), 1);
init_events();

// src/node/stream.ts
var import_browser = __toESM(require_browser(), 1);
var import_buffer4 = __toESM(require_buffer(), 1);
var rs = import_browser.default;
var Readable = rs.Readable;
var Writable = rs.Writable;
var Duplex = rs.Duplex;
var Transform = rs.Transform;
var PassThrough = rs.PassThrough;
var pipeline = rs.pipeline;
var finished = rs.finished;
var addAbortSignal = rs.addAbortSignal;
var compose = rs.compose;
var destroy = rs.destroy;
var isDisturbed = rs.isDisturbed;
var isErrored = rs.isErrored;
var isReadable = rs.isReadable;
var promises = rs.promises ?? rs.Stream?.promises;
var defaultHwm = 64 * 1024;
var defaultObjHwm = 16;
function getDefaultHighWaterMark(objectMode) {
  return objectMode ? defaultObjHwm : defaultHwm;
}
function setDefaultHighWaterMark(objectMode, value) {
  if (objectMode) defaultObjHwm = value;
  else defaultHwm = value;
}
function isWritable(s) {
  return !!s && s.writable !== false && !s.destroyed && !s.writableEnded;
}
Readable.fromWeb = function fromWeb(web, opts = {}) {
  const reader = web.getReader();
  return new Readable({
    ...opts,
    async read() {
      try {
        const { value, done } = await reader.read();
        if (done) this.push(null);
        else this.push(opts.objectMode || typeof value === "string" ? value : import_buffer4.Buffer.from(value.buffer, value.byteOffset, value.byteLength));
      } catch (e) {
        this.destroy(e);
      }
    },
    destroy(err3, cb) {
      reader.cancel(err3).catch(() => {
      });
      cb(err3);
    }
  });
};
Readable.toWeb = function toWeb(node, _opts) {
  let closed = false;
  return new ReadableStream({
    start(ctrl) {
      node.on("data", (chunk) => {
        if (closed) return;
        ctrl.enqueue(typeof chunk === "string" ? new TextEncoder().encode(chunk) : new Uint8Array(chunk));
        if ((ctrl.desiredSize ?? 1) <= 0) node.pause();
      });
      node.on("end", () => {
        if (!closed) {
          closed = true;
          ctrl.close();
        }
      });
      node.on("error", (e) => {
        if (!closed) {
          closed = true;
          ctrl.error(e);
        }
      });
    },
    pull() {
      node.resume();
    },
    cancel(reason) {
      closed = true;
      node.destroy(reason);
    }
  });
};
Writable.fromWeb = function fromWeb2(web, opts = {}) {
  const writer = web.getWriter();
  return new Writable({
    ...opts,
    write(chunk, _enc, cb) {
      writer.write(chunk).then(() => cb(), cb);
    },
    final(cb) {
      writer.close().then(() => cb(), cb);
    },
    destroy(err3, cb) {
      writer.abort(err3).catch(() => {
      });
      cb(err3);
    }
  });
};
Writable.toWeb = function toWeb2(node) {
  return new WritableStream({
    write(chunk) {
      return new Promise((resolve3, reject) => {
        const ok2 = node.write(chunk, (err3) => err3 ? reject(err3) : void 0);
        if (ok2) resolve3();
        else node.once("drain", resolve3);
      });
    },
    close() {
      return new Promise((resolve3) => node.end(resolve3));
    },
    abort(reason) {
      node.destroy(reason);
    }
  });
};
Duplex.fromWeb = function fromWeb3(pair, opts = {}) {
  const r = Readable.fromWeb(pair.readable, opts);
  const w = Writable.fromWeb(pair.writable, opts);
  return Duplex.from({ readable: r, writable: w });
};
Duplex.toWeb = function toWeb3(d) {
  return { readable: Readable.toWeb(d), writable: Writable.toWeb(d) };
};
function duplexPair(opts) {
  const a = new Duplex({ ...opts, read() {
  }, write(c, e, cb) {
    b.push(c, e);
    cb();
  }, final(cb) {
    b.push(null);
    cb();
  } });
  const b = new Duplex({ ...opts, read() {
  }, write(c, e, cb) {
    a.push(c, e);
    cb();
  }, final(cb) {
    a.push(null);
    cb();
  } });
  return [a, b];
}
var Stream = rs.Stream;
Object.assign(Stream, {
  Readable,
  Writable,
  Duplex,
  Transform,
  PassThrough,
  pipeline,
  finished,
  addAbortSignal,
  compose,
  destroy,
  isDisturbed,
  isErrored,
  isReadable,
  isWritable,
  getDefaultHighWaterMark,
  setDefaultHighWaterMark,
  duplexPair,
  Stream
});
if (!("promises" in Stream)) Object.defineProperty(Stream, "promises", { get: () => promises, enumerable: true, configurable: true });
var streamPromises = {
  pipeline: promises?.pipeline ?? ((...s) => new Promise((res, rej) => pipeline(...s, (e) => e ? rej(e) : res(void 0)))),
  finished: promises?.finished ?? ((s, o) => new Promise((res, rej) => finished(s, o ?? {}, (e) => e ? rej(e) : res(void 0))))
};
var consumers = {
  async arrayBuffer(s) {
    const b = await consumers.buffer(s);
    return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
  },
  async buffer(s) {
    const chunks = [];
    for await (const c of s) chunks.push(typeof c === "string" ? import_buffer4.Buffer.from(c) : import_buffer4.Buffer.from(c));
    return import_buffer4.Buffer.concat(chunks);
  },
  async text(s) {
    return (await consumers.buffer(s)).toString("utf8");
  },
  async json(s) {
    return JSON.parse(await consumers.text(s));
  },
  async blob(s) {
    return new Blob([await consumers.buffer(s)]);
  }
};
var stream_default = Stream;

// src/node/sys.ts
var SysError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.code = code;
  }
};
var client = null;
var postToKernel = () => {
};
function initSys(sab, post2) {
  postToKernel = post2;
  client = new SyncClient(sab, () => post2({ t: "sys" }));
}
function sys(op, args = {}, bin) {
  if (!client) throw new Error("syscalls not initialised");
  const r = client.call({ json: { op, ...args }, bin });
  const j = r.json;
  if (j.err) throw new SysError(j.err, j.msg ?? j.err);
  if (j.bin) {
    if (j.ok === null || j.ok === void 0) return r.bin ?? new Uint8Array(0);
    return { ...j.ok, bin: r.bin ?? new Uint8Array(0) };
  }
  return j.ok;
}
function post(msg, transfer = []) {
  postToKernel(msg, transfer);
}
function fsCall(syscall, pathArg, fn, dest) {
  try {
    return fn();
  } catch (e) {
    if (e instanceof SysError) {
      const err3 = nodeSystemError(e.code, syscall, pathArg, dest);
      Error.captureStackTrace?.(err3, fsCall);
      throw err3;
    }
    throw e;
  }
}

// src/node/fs.ts
var enc = new TextEncoder();
var constants = {
  UV_FS_SYMLINK_DIR: 1,
  UV_FS_SYMLINK_JUNCTION: 2,
  O_RDONLY: 0,
  O_WRONLY: 1,
  O_RDWR: 2,
  UV_DIRENT_UNKNOWN: 0,
  UV_DIRENT_FILE: 1,
  UV_DIRENT_DIR: 2,
  UV_DIRENT_LINK: 3,
  UV_DIRENT_FIFO: 4,
  UV_DIRENT_SOCKET: 5,
  UV_DIRENT_CHAR: 6,
  UV_DIRENT_BLOCK: 7,
  S_IFMT: 61440,
  S_IFREG: 32768,
  S_IFDIR: 16384,
  S_IFCHR: 8192,
  S_IFBLK: 24576,
  S_IFIFO: 4096,
  S_IFLNK: 40960,
  S_IFSOCK: 49152,
  O_CREAT: 64,
  O_EXCL: 128,
  UV_FS_O_FILEMAP: 0,
  O_NOCTTY: 256,
  O_TRUNC: 512,
  O_APPEND: 1024,
  O_DIRECTORY: 65536,
  O_NOATIME: 262144,
  O_NOFOLLOW: 131072,
  O_SYNC: 1052672,
  O_DSYNC: 4096,
  O_DIRECT: 16384,
  O_NONBLOCK: 2048,
  S_IRWXU: 448,
  S_IRUSR: 256,
  S_IWUSR: 128,
  S_IXUSR: 64,
  S_IRWXG: 56,
  S_IRGRP: 32,
  S_IWGRP: 16,
  S_IXGRP: 8,
  S_IRWXO: 7,
  S_IROTH: 4,
  S_IWOTH: 2,
  S_IXOTH: 1,
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  UV_FS_COPYFILE_EXCL: 1,
  COPYFILE_EXCL: 1,
  UV_FS_COPYFILE_FICLONE: 2,
  COPYFILE_FICLONE: 2,
  UV_FS_COPYFILE_FICLONE_FORCE: 4,
  COPYFILE_FICLONE_FORCE: 4
};
var F_OK = 0;
var R_OK = 4;
var W_OK = 2;
var X_OK = 1;
var cwdFn = () => "/";
function setCwd(fn) {
  cwdFn = fn;
}
function toPath(p, name = "path") {
  let s;
  if (typeof p === "string") s = p;
  else if (p instanceof URL) {
    if (p.protocol !== "file:") throw invalidArg(name, "The URL must be of scheme file");
    s = fileURLToPathLoose(p.href);
  } else if (p instanceof Uint8Array) s = import_buffer5.Buffer.from(p).toString();
  else if (p && typeof p === "object" && typeof p.href === "string" && p.protocol === "file:") s = fileURLToPathLoose(p.href);
  else throw invalidArg(name, `The "${name}" argument must be of type string or an instance of Buffer or URL. Received ${p === null ? "null" : typeof p}`);
  if (s.includes("\0")) throw invalidArg(name, `The argument '${name}' must be a string without null bytes`);
  if (s.startsWith("/")) return normalize(s).replace(/(.)\/$/, "$1");
  return resolve(cwdFn(), s);
}
function invalidArg(name, msg) {
  const e = new TypeError(msg);
  e.code = name === "path" && msg.includes("null bytes") ? "ERR_INVALID_ARG_VALUE" : "ERR_INVALID_ARG_TYPE";
  return e;
}
function flagsToNumber(flags, dflt2 = "r") {
  if (typeof flags === "number") return flags;
  switch (flags ?? dflt2) {
    case "r":
    case "rs":
    case "sr":
      return 0;
    case "r+":
    case "rs+":
    case "sr+":
      return 2;
    case "w":
      return 1 | 64 | 512;
    case "wx":
    case "xw":
      return 1 | 64 | 512 | 128;
    case "w+":
      return 2 | 64 | 512;
    case "wx+":
    case "xw+":
      return 2 | 64 | 512 | 128;
    case "a":
    case "as":
    case "sa":
      return 1 | 64 | 1024;
    case "ax":
    case "xa":
      return 1 | 64 | 1024 | 128;
    case "a+":
    case "as+":
    case "sa+":
      return 2 | 64 | 1024;
    case "ax+":
    case "xa+":
      return 2 | 64 | 1024 | 128;
  }
  const e = new TypeError(`The value "${flags}" is invalid for option "flags"`);
  e.code = "ERR_INVALID_ARG_VALUE";
  throw e;
}
function encodingOf(opts) {
  if (typeof opts === "string") return opts;
  if (opts && typeof opts === "object") return opts.encoding ?? null;
  return null;
}
function toBytes(data, encoding) {
  if (typeof data === "string") {
    if (!encoding || encoding === "utf8" || encoding === "utf-8") return enc.encode(data);
    return import_buffer5.Buffer.from(data, encoding);
  }
  if (data instanceof Uint8Array) return data;
  if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  if (data && typeof data === "object" && typeof data.toString === "function" && data.toString !== Object.prototype.toString) return enc.encode(String(data));
  const e = new TypeError(`The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received ${typeof data}`);
  e.code = "ERR_INVALID_ARG_TYPE";
  throw e;
}
var Stats = class {
  dev;
  ino;
  mode;
  nlink;
  uid;
  gid;
  rdev;
  size;
  blksize;
  blocks;
  atimeMs;
  mtimeMs;
  ctimeMs;
  birthtimeMs;
  atime;
  mtime;
  ctime;
  birthtime;
  constructor(raw) {
    if (raw) {
      Object.assign(this, raw);
      this.atime = new Date(raw.atimeMs);
      this.mtime = new Date(raw.mtimeMs);
      this.ctime = new Date(raw.ctimeMs);
      this.birthtime = new Date(raw.birthtimeMs);
    }
  }
  isFile() {
    return (this.mode & 61440) === 32768;
  }
  isDirectory() {
    return (this.mode & 61440) === 16384;
  }
  isSymbolicLink() {
    return (this.mode & 61440) === 40960;
  }
  isBlockDevice() {
    return (this.mode & 61440) === 24576;
  }
  isCharacterDevice() {
    return (this.mode & 61440) === 8192;
  }
  isFIFO() {
    return (this.mode & 61440) === 4096;
  }
  isSocket() {
    return (this.mode & 61440) === 49152;
  }
};
var BigIntStats = class extends Stats {
  constructor(raw) {
    super(raw);
    for (const k of ["dev", "ino", "mode", "nlink", "uid", "gid", "rdev", "size", "blksize", "blocks"]) this[k] = BigInt(raw[k]);
    for (const k of ["atime", "mtime", "ctime", "birthtime"]) {
      this[k + "Ms"] = BigInt(Math.floor(raw[`${k}Ms`]));
      this[k + "Ns"] = BigInt(Math.floor(raw[`${k}Ms`] * 1e6));
    }
  }
  isFile() {
    return (Number(this.mode) & 61440) === 32768;
  }
  isDirectory() {
    return (Number(this.mode) & 61440) === 16384;
  }
  isSymbolicLink() {
    return (Number(this.mode) & 61440) === 40960;
  }
};
function makeStats(raw, opts) {
  return opts?.bigint ? new BigIntStats(raw) : new Stats(raw);
}
var Dirent = class {
  name;
  parentPath;
  path;
  _type;
  constructor(name, type2, parentPath) {
    this.name = name;
    this._type = type2;
    this.parentPath = parentPath;
    this.path = parentPath;
  }
  isFile() {
    return this._type === 32768;
  }
  isDirectory() {
    return this._type === 16384;
  }
  isSymbolicLink() {
    return this._type === 40960;
  }
  isBlockDevice() {
    return this._type === 24576;
  }
  isCharacterDevice() {
    return this._type === 8192;
  }
  isFIFO() {
    return this._type === 4096;
  }
  isSocket() {
    return this._type === 49152;
  }
};
function existsSync(p) {
  try {
    sys("stat", { p: toPath(p) });
    return true;
  } catch {
    return false;
  }
}
function accessSync(p, mode = F_OK) {
  const path = toPath(p);
  fsCall("access", path, () => sys("access", { p: path, mode }));
}
function statSync(p, opts) {
  const path = toPath(p);
  try {
    return makeStats(sys("stat", { p: path }), opts);
  } catch (e) {
    if (opts?.throwIfNoEntry === false && e instanceof SysError && (e.code === "ENOENT" || e.code === "ENOTDIR")) return void 0;
    return fsCall("stat", path, () => {
      throw e;
    });
  }
}
function lstatSync(p, opts) {
  const path = toPath(p);
  try {
    return makeStats(sys("stat", { p: path, l: true }), opts);
  } catch (e) {
    if (opts?.throwIfNoEntry === false && e instanceof SysError && (e.code === "ENOENT" || e.code === "ENOTDIR")) return void 0;
    return fsCall("lstat", path, () => {
      throw e;
    });
  }
}
function fstatSync(fd2, opts) {
  return makeStats(fsCall("fstat", void 0, () => sys("fstat", { fd: fd2 })), opts);
}
function statfsSync(_p) {
  return { type: 2240043254, bsize: 4096, blocks: 1048576, bfree: 1048576, bavail: 1048576, files: 1048576, ffree: 1048576 };
}
function readFileSync(p, opts) {
  const encoding = encodingOf(opts);
  let bytes2;
  if (typeof p === "number") {
    bytes2 = readAllFd(p);
  } else {
    const path = toPath(p);
    bytes2 = fsCall("open", path, () => sys("readFile", { p: path }));
  }
  const buf2 = import_buffer5.Buffer.from(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
  if (encoding && encoding !== "buffer") return buf2.toString(encoding);
  return buf2;
}
function readAllFd(fd2) {
  const chunks = [];
  let total = 0;
  for (; ; ) {
    const d = fsCall("read", void 0, () => sys("read", { fd: fd2, len: 1 << 20, pos: null }));
    if (d.length === 0) break;
    chunks.push(d);
    total += d.length;
  }
  const out3 = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out3.set(c, off);
    off += c.length;
  }
  return out3;
}
function writeFileSync(p, data, opts) {
  const encoding = encodingOf(opts);
  const bytes2 = toBytes(data, encoding);
  if (typeof p === "number") {
    writeSync(p, bytes2);
    return;
  }
  const path = toPath(p);
  const flag = typeof opts === "object" && opts?.flag || "w";
  const mode = typeof opts === "object" && opts?.mode || 438;
  fsCall("open", path, () => sys("writeFile", { p: path, flags: flagsToNumber(flag), mode }, bytes2));
}
function appendFileSync(p, data, opts) {
  const o = typeof opts === "string" ? { encoding: opts } : { ...opts ?? {} };
  o.flag = o.flag ?? "a";
  writeFileSync(p, data, o);
}
function openSync(p, flags, mode = 438) {
  const path = toPath(p);
  return fsCall("open", path, () => sys("open", { p: path, flags: flagsToNumber(flags), mode }));
}
function closeSync(fd2) {
  fsCall("close", void 0, () => sys("close", { fd: fd2 }));
}
function readSync(fd2, buffer, offsetOrOpts, length, position) {
  let offset = 0;
  if (offsetOrOpts && typeof offsetOrOpts === "object") {
    offset = offsetOrOpts.offset ?? 0;
    length = offsetOrOpts.length;
    position = offsetOrOpts.position;
  } else offset = offsetOrOpts ?? 0;
  const view = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  length = length ?? view.length - offset;
  if (length === 0) return 0;
  const pos = position === void 0 || position === null || position === -1 ? null : Number(position);
  const d = fsCall("read", void 0, () => sys("read", { fd: fd2, len: length, pos }));
  view.set(d, offset);
  return d.length;
}
function writeSync(fd2, buffer, offsetOrPos, lengthOrEnc, position) {
  let bytes2;
  let pos = null;
  if (typeof buffer === "string") {
    bytes2 = toBytes(buffer, typeof lengthOrEnc === "string" ? lengthOrEnc : "utf8");
    pos = typeof offsetOrPos === "number" ? offsetOrPos : null;
  } else {
    const view = toBytes(buffer);
    if (offsetOrPos && typeof offsetOrPos === "object") {
      const o = offsetOrPos;
      bytes2 = view.subarray(o.offset ?? 0, (o.offset ?? 0) + (o.length ?? view.length - (o.offset ?? 0)));
      pos = o.position ?? null;
    } else {
      const off = offsetOrPos ?? 0;
      const len = typeof lengthOrEnc === "number" ? lengthOrEnc : view.length - off;
      bytes2 = view.subarray(off, off + len);
      pos = position ?? null;
    }
  }
  return fsCall("write", void 0, () => sys("write", { fd: fd2, pos }, bytes2));
}
function readvSync(fd2, buffers, position) {
  let total = 0;
  for (const b of buffers) {
    const n = readSync(fd2, b, 0, b.byteLength, position === null || position === void 0 ? null : position + total);
    total += n;
    if (n < b.byteLength) break;
  }
  return total;
}
function writevSync(fd2, buffers, position) {
  let total = 0;
  for (const b of buffers) total += writeSync(fd2, b, 0, b.byteLength, position === null || position === void 0 ? null : position + total);
  return total;
}
function ftruncateSync(fd2, len = 0) {
  fsCall("ftruncate", void 0, () => sys("ftruncate", { fd: fd2, len }));
}
function truncateSync(p, len = 0) {
  if (typeof p === "number") return ftruncateSync(p, len);
  const path = toPath(p);
  fsCall("open", path, () => sys("truncate", { p: path, len }));
}
function fsyncSync(_fd) {
}
var fdatasyncSync = fsyncSync;
function readdirSync(p, opts) {
  const path = toPath(p);
  const withTypes = typeof opts === "object" && opts?.withFileTypes;
  const recursive = typeof opts === "object" && opts?.recursive;
  const encoding = encodingOf(opts);
  const list = (dir, rel, out4) => {
    const entries = fsCall("scandir", dir, () => sys("readdir", { p: dir, types: true }));
    for (const [name, type2] of entries) {
      const relName = rel ? `${rel}/${name}` : name;
      if (withTypes) out4.push(new Dirent(name, type2, dir));
      else out4.push(encoding === "buffer" ? import_buffer5.Buffer.from(relName) : relName);
      if (recursive && type2 === 16384) list(`${dir}/${name}`, relName, out4);
    }
  };
  const out3 = [];
  list(path, "", out3);
  return out3;
}
function mkdirSync(p, opts) {
  const path = toPath(p);
  const recursive = typeof opts === "object" ? !!opts?.recursive : false;
  const mode = typeof opts === "number" ? opts : typeof opts === "string" ? parseInt(opts, 8) : opts?.mode ?? 511;
  return fsCall("mkdir", path, () => sys("mkdir", { p: path, recursive, mode })) ?? void 0;
}
function mkdtempSync(prefix, _opts) {
  const base = toPath(prefix + "XXXXXX").slice(0, -6);
  return fsCall("mkdtemp", prefix, () => sys("mkdtemp", { prefix: base }));
}
function rmdirSync(p, opts) {
  const path = toPath(p);
  if (opts?.recursive) return rmSync(path, { recursive: true, force: true });
  fsCall("rmdir", path, () => sys("rmdir", { p: path }));
}
function rmSync(p, opts) {
  const path = toPath(p);
  fsCall("rm", path, () => sys("rm", { p: path, recursive: !!opts?.recursive, force: !!opts?.force }));
}
function unlinkSync(p) {
  const path = toPath(p);
  fsCall("unlink", path, () => sys("unlink", { p: path }));
}
function renameSync(from, to) {
  const a = toPath(from, "oldPath");
  const b = toPath(to, "newPath");
  fsCall("rename", a, () => sys("rename", { from: a, to: b }), b);
}
function linkSync(existing, newPath) {
  const a = toPath(existing);
  const b = toPath(newPath);
  fsCall("link", a, () => sys("link", { from: a, to: b }), b);
}
function symlinkSync(target, p, _type) {
  const t = typeof target === "string" ? target : toPath(target);
  const path = toPath(p);
  fsCall("symlink", t, () => sys("symlink", { target: t, p: path }), path);
}
function readlinkSync(p, opts) {
  const path = toPath(p);
  const r = fsCall("readlink", path, () => sys("readlink", { p: path }));
  return encodingOf(opts) === "buffer" ? import_buffer5.Buffer.from(r) : r;
}
function realpathSync(p, opts) {
  const path = toPath(p);
  const r = fsCall("realpath", path, () => sys("realpath", { p: path }));
  return encodingOf(opts) === "buffer" ? import_buffer5.Buffer.from(r) : r;
}
realpathSync.native = realpathSync;
function chmodSync(p, mode) {
  const path = toPath(p);
  fsCall("chmod", path, () => sys("chmod", { p: path, mode: typeof mode === "string" ? parseInt(mode, 8) : mode }));
}
var lchmodSync = chmodSync;
function fchmodSync(fd2, mode) {
  fsCall("fchmod", void 0, () => sys("fchmod", { fd: fd2, mode: typeof mode === "string" ? parseInt(mode, 8) : mode }));
}
function chownSync(_p, _uid, _gid) {
}
var lchownSync = chownSync;
function fchownSync(_fd, _uid, _gid) {
}
function toMs(t) {
  if (t instanceof Date) return t.getTime();
  if (typeof t === "string") return Number(t) * 1e3;
  if (typeof t === "bigint") return Number(t) * 1e3;
  return Number(t) * 1e3;
}
function utimesSync(p, atime, mtime) {
  const path = toPath(p);
  fsCall("utime", path, () => sys("utimes", { p: path, atime: toMs(atime), mtime: toMs(mtime) }));
}
var lutimesSync = utimesSync;
function futimesSync(fd2, atime, mtime) {
  fsCall("futime", void 0, () => sys("futimes", { fd: fd2, atime: toMs(atime), mtime: toMs(mtime) }));
}
function copyFileSync(src, dest, mode = 0) {
  const a = toPath(src, "src");
  const b = toPath(dest, "dest");
  fsCall("copyfile", a, () => sys("copyFile", { from: a, to: b, excl: !!(mode & 1) }), b);
}
function cpSync(src, dest, opts = {}) {
  const a = toPath(src, "src");
  const b = toPath(dest, "dest");
  if (typeof opts.filter === "function") {
    const walk = (s, d) => {
      if (!opts.filter(s, d)) return;
      const st2 = lstatSync(s);
      if (st2.isDirectory()) {
        mkdirSync(d, { recursive: true });
        for (const n of readdirSync(s)) walk(`${s}/${n}`, `${d}/${n}`);
      } else if (st2.isSymbolicLink() && !opts.dereference) {
        try {
          unlinkSync(d);
        } catch {
        }
        symlinkSync(readlinkSync(s), d);
      } else {
        if (opts.errorOnExist && existsSync(d) && opts.force === false) throw fsCall("cp", d, () => {
          throw new SysError("EEXIST", "exists");
        });
        if (opts.force === false && existsSync(d)) return;
        copyFileSync(s, d);
      }
    };
    walk(a, b);
    return;
  }
  const st = statSync(a);
  if (st.isDirectory() && !opts.recursive) {
    const e = new Error(`Recursive option is required to copy a directory: ${a}`);
    e.code = "ERR_FS_EISDIR";
    throw e;
  }
  fsCall("cp", a, () => sys("cp", { from: a, to: b, force: opts.force !== false, errorOnExist: !!opts.errorOnExist, dereference: !!opts.dereference }), b);
}
function opendirSync(p, _opts) {
  const path = toPath(p);
  return new Dir(path, readdirSync(path, { withFileTypes: true }));
}
var Dir = class {
  constructor(path, entries) {
    this.path = path;
    this.entries = entries;
  }
  path;
  entries;
  i = 0;
  readSync() {
    return this.entries[this.i++] ?? null;
  }
  read(cb) {
    const d = this.readSync();
    if (cb) {
      macrotask(() => cb(null, d));
      return;
    }
    return Promise.resolve(d);
  }
  closeSync() {
  }
  close(cb) {
    if (cb) {
      macrotask(() => cb(null));
      return;
    }
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    let d;
    while (d = this.readSync()) yield d;
  }
  *entriesSync() {
    let d;
    while (d = this.readSync()) yield d;
  }
};
function globSync(pattern, opts = {}) {
  const patterns = Array.isArray(pattern) ? pattern : [pattern];
  const cwd = opts.cwd ? toPath(opts.cwd) : cwdFn();
  const out3 = /* @__PURE__ */ new Set();
  const exclude = typeof opts.exclude === "function" ? opts.exclude : null;
  const all = [];
  const walk = (dir, rel) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (exclude && exclude(r)) continue;
      all.push(r);
      if (e.isDirectory()) walk(`${dir}/${e.name}`, r);
    }
  };
  walk(cwd, "");
  for (const p of patterns) {
    const re = globToRegExp(p);
    for (const f of all) if (re.test(f)) out3.add(f);
  }
  return [...out3];
}
function callbackify2(fnSync) {
  return function(...args) {
    let cb = args[args.length - 1];
    if (typeof cb !== "function") {
      cb = null;
    } else args.pop();
    let result;
    let error = null;
    try {
      result = fnSync(...args);
    } catch (e) {
      error = e;
    }
    if (!cb) {
      if (error) throw error;
      return;
    }
    ref();
    macrotask(() => {
      unref();
      if (error) cb(error);
      else cb(null, result);
    });
  };
}
var access = callbackify2(accessSync);
var stat = callbackify2(statSync);
var lstat = callbackify2(lstatSync);
var fstat = callbackify2(fstatSync);
var statfs = callbackify2(statfsSync);
var readFile = callbackify2(readFileSync);
var writeFile = callbackify2(writeFileSync);
var appendFile = callbackify2(appendFileSync);
var open = callbackify2(openSync);
var close = callbackify2(closeSync);
var ftruncate = callbackify2(ftruncateSync);
var truncate = callbackify2(truncateSync);
var fsync = callbackify2(fsyncSync);
var fdatasync = fsync;
var readdir = callbackify2(readdirSync);
var mkdir = callbackify2(mkdirSync);
var mkdtemp = callbackify2(mkdtempSync);
var rmdir = callbackify2(rmdirSync);
var rm = callbackify2(rmSync);
var unlink = callbackify2(unlinkSync);
var rename = callbackify2(renameSync);
var link = callbackify2(linkSync);
var symlink = callbackify2(symlinkSync);
var readlink = callbackify2(readlinkSync);
var realpath = callbackify2(realpathSync);
realpath.native = realpath;
var chmod = callbackify2(chmodSync);
var lchmod = chmod;
var fchmod = callbackify2(fchmodSync);
var chown = callbackify2(chownSync);
var lchown = chown;
var fchown = callbackify2(fchownSync);
var utimes = callbackify2(utimesSync);
var lutimes = utimes;
var futimes = callbackify2(futimesSync);
var copyFile = callbackify2(copyFileSync);
var cp = callbackify2(cpSync);
var opendir = callbackify2(opendirSync);
var glob = callbackify2(globSync);
function exists(p, cb) {
  const r = existsSync(p);
  macrotask(() => cb(r));
}
function read(fd2, ...args) {
  const cb = args.pop();
  let buffer;
  let offset = 0;
  let length;
  let position = null;
  if (args.length === 0 || args.length === 1 && !ArrayBuffer.isView(args[0])) {
    const o = args[0] ?? {};
    buffer = o.buffer ?? import_buffer5.Buffer.alloc(16384);
    offset = o.offset ?? 0;
    length = o.length;
    position = o.position ?? null;
  } else {
    buffer = args[0];
    if (args[1] && typeof args[1] === "object") {
      offset = args[1].offset ?? 0;
      length = args[1].length;
      position = args[1].position ?? null;
    } else {
      offset = args[1] ?? 0;
      length = args[2];
      position = args[3] ?? null;
    }
  }
  const len = length ?? buffer.byteLength - offset;
  if (isStreamFd(fd2)) {
    readAsync(fd2, len).then(
      (d) => {
        new Uint8Array(buffer.buffer, buffer.byteOffset + offset, d.length).set(d);
        cb(null, d.length, buffer);
      },
      (e) => cb(e)
    );
    return;
  }
  try {
    const n = readSync(fd2, buffer, offset, len, position);
    ref();
    macrotask(() => {
      unref();
      cb(null, n, buffer);
    });
  } catch (e) {
    macrotask(() => cb(e));
  }
}
function write(fd2, buffer, ...args) {
  const cb = typeof args[args.length - 1] === "function" ? args.pop() : () => {
  };
  try {
    const n = writeSync(fd2, buffer, ...args);
    ref();
    macrotask(() => {
      unref();
      cb(null, n, buffer);
    });
  } catch (e) {
    macrotask(() => cb(e));
  }
}
var readv = callbackify2(readvSync);
var writev = callbackify2(writevSync);
var streamFdCache = /* @__PURE__ */ new Map();
function isStreamFd(fd2) {
  try {
    const s = sys("fstat", { fd: fd2 });
    const t = s.mode & 61440;
    const r = t === 4096 || t === 8192 || t === 49152;
    streamFdCache.set(fd2, r);
    return r;
  } catch {
    return false;
  }
}
var fdReaders = /* @__PURE__ */ new Map();
var readSeq = 1;
var pendingReads = /* @__PURE__ */ new Map();
function readAsync(fd2, len) {
  const id = readSeq++;
  ref();
  return new Promise((resolve3, reject) => {
    pendingReads.set(id, { resolve: resolve3, reject });
    post({ t: "readOnce", fd: fd2, len, id });
  }).finally(unref);
}
function startReading(fd2, onData) {
  fdReaders.set(fd2, { onData });
  post({ t: "readStart", fd: fd2 });
  return () => {
    if (fdReaders.get(fd2)?.onData === onData) {
      fdReaders.delete(fd2);
      post({ t: "readStop", fd: fd2 });
    }
  };
}
function onKernelData(msg) {
  if (msg.id !== void 0) {
    const p = pendingReads.get(msg.id);
    if (!p) return;
    pendingReads.delete(msg.id);
    if (msg.err) p.reject(fsCall("read", void 0, () => {
      throw new SysError(msg.err, msg.err);
    }));
    else p.resolve(msg.data ?? new Uint8Array(0));
    return;
  }
  const r = fdReaders.get(msg.fd);
  if (!r) return;
  if (msg.data === null) fdReaders.delete(msg.fd);
  r.onData(msg.data);
}
var watchers = /* @__PURE__ */ new Map();
var watchSeq = 1;
function onWatchEvent(msg) {
  watchers.get(msg.id)?.(msg);
}
var FSWatcher = class extends EventEmitter {
  id;
  handle = new Handle();
  constructor(path, opts, listener) {
    super();
    this.id = watchSeq++;
    const base = path;
    watchers.set(this.id, (ev) => {
      const rel = ev.path === base ? basename(base) : ev.path.startsWith(base + "/") ? ev.path.slice(base.length + 1) : basename(ev.path);
      this.emit("change", ev.type, rel);
    });
    if (listener) this.on("change", listener);
    sys("watch", { id: this.id, p: path, recursive: !!opts.recursive });
    this.handle.activate();
    if (opts.persistent === false) this.handle.unref();
  }
  close() {
    if (!watchers.has(this.id)) return;
    watchers.delete(this.id);
    try {
      sys("unwatch", { id: this.id });
    } catch {
    }
    this.handle.deactivate();
    macrotask(() => this.emit("close"));
  }
  ref() {
    this.handle.ref();
    return this;
  }
  unref() {
    this.handle.unref();
    return this;
  }
};
function watch(p, opts, listener) {
  if (typeof opts === "function") {
    listener = opts;
    opts = {};
  }
  if (typeof opts === "string") opts = { encoding: opts };
  const path = toPath(p);
  fsCall("watch", path, () => sys("stat", { p: path }));
  return new FSWatcher(path, opts ?? {}, listener);
}
var statWatchers = /* @__PURE__ */ new Map();
function watchFile(p, opts, listener) {
  if (typeof opts === "function") {
    listener = opts;
    opts = {};
  }
  const path = toPath(p);
  let w = statWatchers.get(path);
  const empty = new Stats({ dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0 });
  if (!w) {
    const interval = opts?.interval ?? 5007;
    const entry = { timer: null, listeners: /* @__PURE__ */ new Set(), prev: statSync(path, { throwIfNoEntry: false }) ?? empty };
    entry.timer = setInterval(() => {
      const cur = statSync(path, { throwIfNoEntry: false }) ?? empty;
      if (cur.mtimeMs !== entry.prev.mtimeMs || cur.size !== entry.prev.size || cur.ino !== entry.prev.ino) {
        const prev = entry.prev;
        entry.prev = cur;
        for (const l of entry.listeners) l(cur, prev);
      }
    }, Math.min(interval, 1e3));
    if (opts?.persistent === false) entry.timer.unref?.();
    statWatchers.set(path, entry);
    w = entry;
  }
  if (listener) w.listeners.add(listener);
  return { ref() {
  }, unref() {
  } };
}
function unwatchFile(p, listener) {
  const path = toPath(p);
  const w = statWatchers.get(path);
  if (!w) return;
  if (listener) w.listeners.delete(listener);
  else w.listeners.clear();
  if (!w.listeners.size) {
    clearInterval(w.timer);
    statWatchers.delete(path);
  }
}
var ReadStream = class extends Readable {
  path;
  fd;
  flags;
  mode;
  start;
  end;
  pos;
  bytesRead = 0;
  pending = true;
  _autoClose;
  _stopStream;
  constructor(p, opts = {}) {
    if (typeof opts === "string") opts = { encoding: opts };
    super({ highWaterMark: opts.highWaterMark ?? 64 * 1024, encoding: opts.encoding, emitClose: opts.emitClose ?? true, signal: opts.signal });
    this.path = p === null || p === void 0 ? "" : toPath(p);
    this.fd = opts.fd ?? null;
    this.flags = opts.flags ?? "r";
    this.mode = opts.mode ?? 438;
    this.start = opts.start;
    this.end = opts.end ?? Infinity;
    this.pos = this.start;
    this._autoClose = opts.autoClose ?? true;
    if (this.fd === null) {
      macrotask(() => this._openNow());
    } else this.pending = false;
  }
  _openNow() {
    if (this.fd !== null || this.destroyed) return;
    try {
      this.fd = openSync(this.path, this.flags, this.mode);
      this.pending = false;
      this.emit("open", this.fd);
      this.emit("ready");
    } catch (e) {
      this.destroy(e);
    }
  }
  _construct(cb) {
    cb();
  }
  _read(n) {
    if (this.fd === null) {
      this.once("open", () => this._read(n));
      return;
    }
    const fd2 = this.fd;
    if (isStreamFd(fd2)) {
      if (!this._stopStream) {
        this._stopStream = startReading(fd2, (d) => {
          if (d === null) {
            this._stopStream = void 0;
            this.push(null);
            return;
          }
          this.bytesRead += d.length;
          if (!this.push(import_buffer5.Buffer.from(d))) {
            this._stopStream?.();
            this._stopStream = void 0;
          }
        });
      }
      return;
    }
    const remaining = this.end === Infinity ? n : Math.min(n, this.end - (this.pos ?? this.bytesRead) + 1);
    if (remaining <= 0) {
      this.push(null);
      return;
    }
    const buf2 = import_buffer5.Buffer.allocUnsafe(remaining);
    let got;
    try {
      got = readSync(fd2, buf2, 0, remaining, this.pos ?? null);
    } catch (e) {
      this.destroy(e);
      return;
    }
    if (this.pos !== void 0) this.pos += got;
    this.bytesRead += got;
    this.push(got === 0 ? null : buf2.subarray(0, got));
  }
  _destroy(err3, cb) {
    this._stopStream?.();
    if (this.fd !== null && this._autoClose && this.fd > 2) {
      try {
        closeSync(this.fd);
      } catch {
      }
      this.fd = null;
    }
    cb(err3);
  }
  close(cb) {
    if (cb) this.once("close", cb);
    this.destroy();
  }
};
var WriteStream = class extends Writable {
  path;
  fd;
  flags;
  mode;
  start;
  pos;
  bytesWritten = 0;
  pending = true;
  _autoClose;
  constructor(p, opts = {}) {
    if (typeof opts === "string") opts = { encoding: opts };
    super({ highWaterMark: opts.highWaterMark, decodeStrings: true, emitClose: opts.emitClose ?? true, signal: opts.signal });
    this.path = p === null || p === void 0 ? "" : toPath(p);
    this.fd = opts.fd ?? null;
    this.flags = opts.flags ?? "w";
    this.mode = opts.mode ?? 438;
    this.start = opts.start;
    this.pos = this.start;
    this._autoClose = opts.autoClose ?? true;
    if (this.fd === null) {
      try {
        this.fd = openSync(this.path, this.flags, this.mode);
        this.pending = false;
        macrotask(() => {
          this.emit("open", this.fd);
          this.emit("ready");
        });
      } catch (e) {
        macrotask(() => this.destroy(e));
      }
    } else this.pending = false;
  }
  _write(chunk, encoding, cb) {
    try {
      const bytes2 = typeof chunk === "string" ? import_buffer5.Buffer.from(chunk, encoding) : chunk;
      const n = writeSync(this.fd, bytes2, 0, bytes2.length, this.pos ?? null);
      if (this.pos !== void 0) this.pos += n;
      this.bytesWritten += n;
      cb();
    } catch (e) {
      cb(e);
    }
  }
  _destroy(err3, cb) {
    if (this.fd !== null && this._autoClose && this.fd > 2) {
      try {
        closeSync(this.fd);
      } catch {
      }
      this.fd = null;
    }
    cb(err3);
  }
  close(cb) {
    if (cb) this.once("close", cb);
    if (!this.writableEnded) this.end();
    else this.destroy();
  }
  destroySoon() {
    this.end();
  }
};
function createReadStream(p, opts) {
  return new ReadStream(p, opts);
}
function createWriteStream(p, opts) {
  return new WriteStream(p, opts);
}
var FileHandle = class extends EventEmitter {
  constructor(fd2) {
    super();
    this.fd = fd2;
  }
  fd;
  async readFile(opts) {
    return readFileSync(this.fd, opts);
  }
  async writeFile(data, opts) {
    writeFileSync(this.fd, data, opts);
  }
  async appendFile(data, opts) {
    writeFileSync(this.fd, data, opts);
  }
  async read(buffer, offset, length, position) {
    if (buffer && !ArrayBuffer.isView(buffer)) {
      const o = buffer;
      buffer = o.buffer ?? import_buffer5.Buffer.alloc(16384);
      offset = o.offset;
      length = o.length;
      position = o.position;
    }
    buffer ??= import_buffer5.Buffer.alloc(16384);
    const bytesRead = readSync(this.fd, buffer, offset ?? 0, length ?? buffer.byteLength - (offset ?? 0), position ?? null);
    return { bytesRead, buffer };
  }
  async write(data, ...args) {
    const bytesWritten = writeSync(this.fd, data, ...args);
    return { bytesWritten, buffer: data };
  }
  async writev(buffers, position) {
    return { bytesWritten: writevSync(this.fd, buffers, position), buffers };
  }
  async readv(buffers, position) {
    return { bytesRead: readvSync(this.fd, buffers, position), buffers };
  }
  async stat(opts) {
    return fstatSync(this.fd, opts);
  }
  async truncate(len) {
    ftruncateSync(this.fd, len);
  }
  async sync() {
  }
  async datasync() {
  }
  async chmod(mode) {
    fchmodSync(this.fd, mode);
  }
  async chown() {
  }
  async utimes(a, m) {
    futimesSync(this.fd, a, m);
  }
  async close() {
    if (this.fd < 0) return;
    closeSync(this.fd);
    this.fd = -1;
    this.emit("close");
  }
  createReadStream(opts = {}) {
    return new ReadStream(null, { ...opts, fd: this.fd });
  }
  createWriteStream(opts = {}) {
    return new WriteStream(null, { ...opts, fd: this.fd });
  }
  readLines(opts) {
    const { createInterface: createInterface2 } = globalThis.__ov.builtin("readline");
    return createInterface2({ input: this.createReadStream(opts), crlfDelay: Infinity });
  }
  readableWebStream() {
    const fd2 = this.fd;
    return new ReadableStream({
      pull(ctrl) {
        const buf2 = new Uint8Array(65536);
        const n = readSync(fd2, buf2, 0, buf2.length, null);
        if (n === 0) ctrl.close();
        else ctrl.enqueue(buf2.subarray(0, n));
      }
    });
  }
  [Symbol.asyncDispose ?? /* @__PURE__ */ Symbol.for("asyncDispose")]() {
    return this.close();
  }
};
function promisifySync(fn) {
  return async (...args) => fn(...args);
}
var promises2 = {
  access: promisifySync(accessSync),
  stat: promisifySync(statSync),
  lstat: promisifySync(lstatSync),
  statfs: promisifySync(statfsSync),
  readFile: async (p, opts) => p instanceof FileHandle ? p.readFile(opts) : readFileSync(p, opts),
  writeFile: async (p, data, opts) => {
    if (p instanceof FileHandle) return p.writeFile(data, opts);
    if (data && typeof data === "object" && !(data instanceof Uint8Array) && !ArrayBuffer.isView(data) && (Symbol.asyncIterator in data || Symbol.iterator in data) && typeof data !== "string") {
      const chunks = [];
      for await (const c of data) chunks.push(typeof c === "string" ? enc.encode(c) : c);
      return writeFileSync(p, import_buffer5.Buffer.concat(chunks), opts);
    }
    return writeFileSync(p, data, opts);
  },
  appendFile: promisifySync(appendFileSync),
  open: async (p, flags, mode) => new FileHandle(openSync(p, flags, mode)),
  truncate: promisifySync(truncateSync),
  readdir: promisifySync(readdirSync),
  mkdir: promisifySync(mkdirSync),
  mkdtemp: promisifySync(mkdtempSync),
  rmdir: promisifySync(rmdirSync),
  rm: promisifySync(rmSync),
  unlink: promisifySync(unlinkSync),
  rename: promisifySync(renameSync),
  link: promisifySync(linkSync),
  symlink: promisifySync(symlinkSync),
  readlink: promisifySync(readlinkSync),
  realpath: promisifySync(realpathSync),
  chmod: promisifySync(chmodSync),
  lchmod: promisifySync(chmodSync),
  chown: promisifySync(chownSync),
  lchown: promisifySync(chownSync),
  utimes: promisifySync(utimesSync),
  lutimes: promisifySync(utimesSync),
  copyFile: promisifySync(copyFileSync),
  cp: async (src, dest, opts = {}) => {
    if (typeof opts.filter === "function") {
      const filter = opts.filter;
      const walk = async (s, d) => {
        if (!await filter(s, d)) return;
        const st = lstatSync(s);
        if (st.isDirectory()) {
          mkdirSync(d, { recursive: true });
          for (const n of readdirSync(s)) await walk(`${s}/${n}`, `${d}/${n}`);
        } else if (st.isSymbolicLink() && !opts.dereference) {
          try {
            unlinkSync(d);
          } catch {
          }
          symlinkSync(readlinkSync(s), d);
        } else if (!(opts.force === false && existsSync(d))) copyFileSync(s, d);
      };
      return walk(toPath(src), toPath(dest));
    }
    return cpSync(src, dest, opts);
  },
  opendir: promisifySync(opendirSync),
  watch: (p, opts = {}) => {
    const w = watch(p, { ...opts, persistent: opts.persistent ?? true });
    return on_(w, "change", opts.signal);
  },
  glob: async function* (pattern, opts) {
    for (const f of globSync(pattern, opts)) yield f;
  },
  constants,
  FileHandle
};
function on_(w, ev, signal) {
  const q = [];
  let waiter = null;
  let done = false;
  w.on(ev, (eventType, filename) => {
    const item = { eventType, filename };
    if (waiter) {
      waiter({ value: item, done: false });
      waiter = null;
    } else q.push(item);
  });
  signal?.addEventListener("abort", () => {
    done = true;
    w.close();
    waiter?.({ value: void 0, done: true });
  });
  return {
    next: () => q.length ? Promise.resolve({ value: q.shift(), done: false }) : done ? Promise.resolve({ value: void 0, done: true }) : new Promise((r) => waiter = r),
    return: () => {
      done = true;
      w.close();
      return Promise.resolve({ value: void 0, done: true });
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
var fs_default = {
  constants,
  F_OK,
  R_OK,
  W_OK,
  X_OK,
  Stats,
  BigIntStats,
  Dirent,
  Dir,
  FSWatcher,
  ReadStream,
  WriteStream,
  FileHandle,
  existsSync,
  accessSync,
  statSync,
  lstatSync,
  fstatSync,
  statfsSync,
  readFileSync,
  writeFileSync,
  appendFileSync,
  openSync,
  closeSync,
  readSync,
  writeSync,
  readvSync,
  writevSync,
  ftruncateSync,
  truncateSync,
  fsyncSync,
  fdatasyncSync,
  readdirSync,
  mkdirSync,
  mkdtempSync,
  rmdirSync,
  rmSync,
  unlinkSync,
  renameSync,
  linkSync,
  symlinkSync,
  readlinkSync,
  realpathSync,
  chmodSync,
  lchmodSync,
  fchmodSync,
  chownSync,
  lchownSync,
  fchownSync,
  utimesSync,
  lutimesSync,
  futimesSync,
  copyFileSync,
  cpSync,
  opendirSync,
  globSync,
  access,
  stat,
  lstat,
  fstat,
  statfs,
  readFile,
  writeFile,
  appendFile,
  open,
  close,
  read,
  write,
  readv,
  writev,
  ftruncate,
  truncate,
  fsync,
  fdatasync,
  readdir,
  mkdir,
  mkdtemp,
  rmdir,
  rm,
  unlink,
  rename,
  link,
  symlink,
  readlink,
  realpath,
  chmod,
  lchmod,
  fchmod,
  chown,
  lchown,
  fchown,
  utimes,
  lutimes,
  futimes,
  copyFile,
  cp,
  opendir,
  glob,
  exists,
  watch,
  watchFile,
  unwatchFile,
  createReadStream,
  createWriteStream,
  promises: promises2
};

// src/node/child_process.ts
var children = /* @__PURE__ */ new Map();
function onChildExit(msg) {
  const c = children.get(msg.pid);
  if (!c) return;
  c._onExit(msg.code, msg.signal);
}
function normStdio(stdio) {
  if (stdio === void 0 || stdio === null) return ["pipe", "pipe", "pipe"];
  if (typeof stdio === "string") return [stdio, stdio, stdio];
  const arr = [...stdio];
  while (arr.length < 3) arr.push("pipe");
  return arr.map((s) => {
    if (s && typeof s === "object" && typeof s.fd === "number") return s.fd;
    if (s && typeof s === "object" && s._isStdio) return s.fd;
    if (s === void 0 || s === null) return "pipe";
    return s;
  });
}
function toEnv(env) {
  const out3 = {};
  const src = env ?? globalThis.process.env;
  for (const k of Object.keys(src)) if (src[k] !== void 0) out3[k] = String(src[k]);
  return out3;
}
function shellArgv(command, args, shell) {
  if (!shell) return [command, ...args];
  const sh = typeof shell === "string" ? shell : "/bin/sh";
  const line = [command, ...args].join(" ");
  return [sh, "-c", line];
}
var PipeWritable = class extends Writable {
  constructor(fd2) {
    super({ decodeStrings: true, autoDestroy: true, emitClose: true });
    this.fd = fd2;
  }
  fd;
  _write(chunk, enc4, cb) {
    try {
      sys("write", { fd: this.fd, pos: null }, typeof chunk === "string" ? import_buffer6.Buffer.from(chunk, enc4) : chunk);
      cb();
    } catch (e) {
      const err3 = e instanceof SysError ? Object.assign(new Error(`write ${e.code}`), { code: e.code, errno: e.code === "EPIPE" ? -32 : -5, syscall: "write" }) : e;
      cb(err3);
    }
  }
  _final(cb) {
    this._closeFd();
    cb();
  }
  _destroy(err3, cb) {
    this._closeFd();
    cb(err3);
  }
  _closeFd() {
    if (this.fd < 0) return;
    try {
      sys("close", { fd: this.fd });
    } catch {
    }
    this.fd = -1;
  }
};
var PipeReadable = class extends Readable {
  constructor(fd2) {
    super({ highWaterMark: 64 * 1024 });
    this.fd = fd2;
  }
  fd;
  stop;
  _read() {
    if (this.stop || this.fd < 0) return;
    this.stop = startReading(this.fd, (d) => {
      if (d === null) {
        this.stop = void 0;
        this._closeFd();
        this.push(null);
        return;
      }
      if (!this.push(import_buffer6.Buffer.from(d))) {
        this.stop?.();
        this.stop = void 0;
      }
    });
  }
  _destroy(err3, cb) {
    this.stop?.();
    this.stop = void 0;
    this._closeFd();
    cb(err3);
  }
  _closeFd() {
    if (this.fd < 0) return;
    try {
      sys("close", { fd: this.fd });
    } catch {
    }
    this.fd = -1;
  }
};
var ChildProcess = class extends EventEmitter {
  pid;
  stdin = null;
  stdout = null;
  stderr = null;
  stdio = [];
  exitCode = null;
  signalCode = null;
  killed = false;
  connected = false;
  spawnfile = "";
  spawnargs = [];
  handle = new Handle();
  exited = false;
  openStreams = 0;
  closed = false;
  constructor() {
    super();
  }
  _spawn(argv, opts) {
    this.spawnfile = argv[0];
    this.spawnargs = argv;
    const stdio = normStdio(opts.stdio);
    const specs = stdio.map((s) => s === "overlapped" ? "pipe" : s === "ipc" ? "ignore" : s);
    let res;
    try {
      res = sys("spawn", { argv, env: toEnv(opts.env), cwd: opts.cwd ? String(opts.cwd) : void 0, stdio: specs, argv0: opts.argv0 });
    } catch (e) {
      const code = e instanceof SysError ? e.code : "ENOENT";
      const err3 = Object.assign(new Error(`spawn ${argv[0]} ${code}`), { errno: code === "ENOENT" ? -2 : -13, code, syscall: `spawn ${argv[0]}`, path: argv[0], spawnargs: argv.slice(1) });
      this.stdio = [this.stdin, this.stdout, this.stderr];
      this.handle.activate();
      nextTick(() => {
        this.handle.deactivate();
        this.emit("error", err3);
        this.emit("close", -2, null);
      });
      return;
    }
    this.pid = res.pid;
    children.set(res.pid, this);
    this.handle.activate();
    res.fds.forEach((fd2, i2) => {
      if (fd2 === null || fd2 === void 0) {
        this.stdio[i2] = null;
        return;
      }
      if (i2 === 0) {
        const w = new PipeWritable(fd2);
        this.stdio[i2] = w;
      } else {
        const r = new PipeReadable(fd2);
        this.openStreams++;
        r.on("close", () => this._streamClosed());
        r.on("end", () => {
        });
        this.stdio[i2] = r;
      }
    });
    this.stdin = this.stdio[0] ?? null;
    this.stdout = this.stdio[1] ?? null;
    this.stderr = this.stdio[2] ?? null;
    nextTick(() => this.emit("spawn"));
    if (opts.signal) {
      const onAbort = () => {
        this.kill(opts.killSignal ?? "SIGTERM");
        this.emit("error", Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR", cause: opts.signal.reason }));
      };
      if (opts.signal.aborted) nextTick(onAbort);
      else opts.signal.addEventListener("abort", onAbort, { once: true });
    }
    if (opts.timeout > 0) {
      const t = setTimeout(() => this.kill(opts.killSignal ?? "SIGTERM"), opts.timeout);
      this.once("exit", () => clearTimeout(t));
    }
  }
  _streamClosed() {
    this.openStreams--;
    this._maybeClose();
  }
  _maybeClose() {
    if (this.closed || !this.exited || this.openStreams > 0) return;
    this.closed = true;
    this.handle.deactivate();
    if (this.pid) children.delete(this.pid);
    this.emit("close", this.exitCode, this.signalCode);
  }
  _onExit(code, signal) {
    if (this.exited) return;
    this.exited = true;
    this.exitCode = code;
    this.signalCode = signal;
    if (this.stdin && !this.stdin.destroyed) this.stdin.destroy();
    this.emit("exit", code, signal);
    for (const s of this.stdio.slice(1)) {
      if (s && s.readable && !s.readableFlowing && !s._readableState?.readListening) s.resume();
    }
    macrotask(() => this._maybeClose());
  }
  kill(sig = "SIGTERM") {
    if (!this.pid || this.exited) return false;
    try {
      sys("kill", { pid: this.pid, sig });
      this.killed = true;
      return true;
    } catch {
      return false;
    }
  }
  ref() {
    this.handle.ref();
    this.stdout?.ref?.();
  }
  unref() {
    this.handle.unref();
  }
  send(_msg, ..._args) {
    const cb = _args.find((a) => typeof a === "function");
    const err3 = Object.assign(new Error("Channel closed"), { code: "ERR_IPC_CHANNEL_CLOSED" });
    if (cb) nextTick(cb, err3);
    return false;
  }
  disconnect() {
  }
  [Symbol.dispose ?? /* @__PURE__ */ Symbol.for("dispose")]() {
    this.kill();
  }
};
function parseArgs3(file, args, opts) {
  if (!Array.isArray(args)) {
    opts = args;
    args = [];
  }
  return [file, args.map(String), { ...opts ?? {} }];
}
function spawn(command, args, opts) {
  const [cmd, argv, o] = parseArgs3(command, args, opts);
  const cp2 = new ChildProcess();
  cp2._spawn(shellArgv(cmd, argv, o.shell), o);
  return cp2;
}
function fork(modulePath, args, opts) {
  const [mp, argv, o] = parseArgs3(String(modulePath instanceof URL ? modulePath.pathname : modulePath), args, opts);
  const execArgv = o.execArgv ?? globalThis.process.execArgv;
  const stdio = o.silent ? ["pipe", "pipe", "pipe"] : ["inherit", "inherit", "inherit"];
  const cp2 = new ChildProcess();
  cp2._spawn([o.execPath ?? "node", ...execArgv, mp, ...argv], { ...o, stdio: o.stdio ? o.stdio.filter((s) => s !== "ipc") : stdio });
  return cp2;
}
function collect(cp2, opts, cb, cmdLabel) {
  const enc4 = opts.encoding === "buffer" || opts.encoding === null ? null : opts.encoding ?? "utf8";
  const maxBuffer = opts.maxBuffer ?? 1024 * 1024 * 1024;
  const out3 = [];
  const err3 = [];
  let outLen = 0;
  let errLen = 0;
  let killedForBuffer = false;
  cp2.stdout?.on("data", (d) => {
    outLen += d.length;
    if (outLen > maxBuffer) {
      killedForBuffer = true;
      cp2.kill();
    } else out3.push(d);
  });
  cp2.stderr?.on("data", (d) => {
    errLen += d.length;
    if (errLen <= maxBuffer) err3.push(d);
  });
  const finish = (code, signal, spawnErr) => {
    const so = import_buffer6.Buffer.concat(out3);
    const se = import_buffer6.Buffer.concat(err3);
    const stdout = enc4 ? so.toString(enc4) : so;
    const stderr = enc4 ? se.toString(enc4) : se;
    if (!cb) return;
    if (spawnErr) return cb(Object.assign(spawnErr, { stdout, stderr }), stdout, stderr);
    if (code !== 0 || signal || killedForBuffer) {
      const e = new Error(`Command failed: ${cmdLabel}
${se.toString()}`);
      e.code = killedForBuffer ? "ERR_CHILD_PROCESS_STDIO_MAXBUFFER" : code;
      e.killed = cp2.killed;
      e.signal = signal;
      e.cmd = cmdLabel;
      e.stdout = stdout;
      e.stderr = stderr;
      return cb(e, stdout, stderr);
    }
    cb(null, stdout, stderr);
  };
  let spawnError;
  cp2.on("error", (e) => {
    spawnError = e;
  });
  cp2.on("close", (code, signal) => finish(code, signal, spawnError));
}
function exec(command, opts, cb) {
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  opts = { ...opts ?? {} };
  const cp2 = new ChildProcess();
  cp2._spawn([typeof opts.shell === "string" ? opts.shell : "/bin/sh", "-c", command], opts);
  collect(cp2, opts, cb, command);
  return cp2;
}
function execFile(file, args, opts, cb) {
  if (typeof args === "function") {
    cb = args;
    args = [];
    opts = {};
  } else if (typeof opts === "function") {
    cb = opts;
    if (!Array.isArray(args)) {
      opts = args;
      args = [];
    } else opts = {};
  }
  const [f, argv, o] = parseArgs3(file, args, opts);
  const cp2 = new ChildProcess();
  cp2._spawn(shellArgv(f, argv, o.shell), o);
  collect(cp2, o, cb, [f, ...argv].join(" "));
  return cp2;
}
var kCustomExec = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
exec[kCustomExec] = (command, opts) => {
  let child;
  const p = new Promise((resolve3, reject) => {
    child = exec(command, opts, (err3, stdout, stderr) => err3 ? reject(err3) : resolve3({ stdout, stderr }));
  });
  p.child = child;
  return p;
};
execFile[kCustomExec] = (file, args, opts) => {
  let child;
  const p = new Promise((resolve3, reject) => {
    child = execFile(file, args, opts, (err3, stdout, stderr) => err3 ? reject(err3) : resolve3({ stdout, stderr }));
  });
  p.child = child;
  return p;
};
function spawnSync(command, args, opts) {
  const [cmd, argv, o] = parseArgs3(command, args, opts);
  const full = shellArgv(cmd, argv, o.shell);
  const stdio = normStdio(o.stdio).map((s) => s === "overlapped" ? "pipe" : s === "ipc" ? "ignore" : s);
  let input;
  if (o.input !== void 0) input = typeof o.input === "string" ? import_buffer6.Buffer.from(o.input, o.encoding && o.encoding !== "buffer" ? o.encoding : "utf8") : o.input;
  try {
    const r = sys(
      "spawnSync",
      { argv: full, env: toEnv(o.env), cwd: o.cwd ? String(o.cwd) : void 0, stdio, timeout: o.timeout ?? 0, killSignal: o.killSignal },
      input
    );
    const outBuf = import_buffer6.Buffer.from(r.bin.subarray(0, r.outLen));
    const errBuf = import_buffer6.Buffer.from(r.bin.subarray(r.outLen));
    const enc4 = o.encoding && o.encoding !== "buffer" ? o.encoding : null;
    const stdout = stdio[1] === "pipe" ? enc4 ? outBuf.toString(enc4) : outBuf : null;
    const stderr = stdio[2] === "pipe" ? enc4 ? errBuf.toString(enc4) : errBuf : null;
    const result = { pid: r.pid, output: [null, stdout, stderr], stdout, stderr, status: r.status, signal: r.signal };
    if (r.error) result.error = Object.assign(new Error(`spawnSync ${cmd} ${r.error}`), { code: r.error, errno: -110, syscall: `spawnSync ${cmd}`, path: cmd, spawnargs: argv });
    return result;
  } catch (e) {
    const code = e instanceof SysError ? e.code : "ENOENT";
    const err3 = Object.assign(new Error(`spawnSync ${cmd} ${code}`), { code, errno: code === "ENOENT" ? -2 : -13, syscall: `spawnSync ${cmd}`, path: cmd, spawnargs: argv });
    return { pid: 0, output: [null, null, null], stdout: null, stderr: null, status: null, signal: null, error: err3 };
  }
}
function checkSync(r, label, opts) {
  if (r.error) throw r.error;
  if (r.status !== 0 || r.signal) {
    const stderr = r.stderr ? r.stderr.toString() : "";
    const e = new Error(`Command failed: ${label}${stderr ? "\n" + stderr : ""}`);
    e.status = r.status;
    e.signal = r.signal;
    e.output = r.output;
    e.stdout = r.stdout;
    e.stderr = r.stderr;
    e.pid = r.pid;
    throw e;
  }
  void opts;
  return r.stdout;
}
function execSync(command, opts = {}) {
  const o = { ...opts, stdio: opts.stdio ?? ["pipe", "pipe", "inherit"] };
  const r = spawnSync(typeof o.shell === "string" ? o.shell : "/bin/sh", ["-c", command], { ...o, shell: false });
  return checkSync(r, command, o);
}
function execFileSync(file, args, opts) {
  const [f, argv, o] = parseArgs3(file, args, opts);
  o.stdio = o.stdio ?? ["pipe", "pipe", "inherit"];
  const r = spawnSync(f, argv, o);
  return checkSync(r, [f, ...argv].join(" "), o);
}
var child_process_default = { ChildProcess, spawn, fork, exec, execFile, spawnSync, execSync, execFileSync };

// src/node/crypto.ts
var import_buffer7 = __toESM(require_buffer(), 1);

// node_modules/@noble/hashes/hmac.js
var _HMAC = class {
  oHash;
  iHash;
  blockLen;
  outputLen;
  canXOF = false;
  finished = false;
  destroyed = false;
  constructor(hash2, key) {
    ahash(hash2);
    abytes(key, void 0, "key");
    this.iHash = hash2.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("expected Hash instance");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
    for (let i2 = 0; i2 < pad.length; i2++)
      pad[i2] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash2.create();
    for (let i2 = 0; i2 < pad.length; i2++)
      pad[i2] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean(pad);
  }
  update(buf2) {
    aexists(this);
    this.iHash.update(buf2);
    return this;
  }
  digestInto(out3) {
    aexists(this);
    aoutput(out3, this);
    this.finished = true;
    const buf2 = out3.subarray(0, this.outputLen);
    this.iHash.digestInto(buf2);
    this.oHash.update(buf2);
    this.oHash.digestInto(buf2);
    this.destroy();
  }
  digest() {
    const out3 = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out3);
    return out3;
  }
  _cloneInto(to) {
    to ||= Object.create(Object.getPrototypeOf(this), {});
    const { oHash, iHash, finished: finished2, destroyed, blockLen, outputLen, canXOF } = this;
    to = to;
    to.finished = finished2;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.canXOF = canXOF;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = /* @__PURE__ */ (() => {
  const hmac_ = ((hash2, key, message) => new _HMAC(hash2, key).update(message).digest());
  hmac_.create = (hash2, key) => new _HMAC(hash2, key);
  return hmac_;
})();

// node_modules/@noble/hashes/pbkdf2.js
function pbkdf2Init(hash2, _password, _salt, _opts) {
  ahash(hash2);
  const opts = checkOpts({ dkLen: 32, asyncTick: 10 }, _opts);
  const { c, dkLen, asyncTick } = opts;
  anumber(c, "c");
  anumber(dkLen, "dkLen");
  anumber(asyncTick, "asyncTick");
  if (c < 1)
    throw new Error('"c" (iterations) must be >= 1');
  if (dkLen < 1)
    throw new Error('"dkLen" must be >= 1');
  if (dkLen > (2 ** 32 - 1) * hash2.outputLen)
    throw new Error("derived key too long");
  const p = kdfInputToBytes(_password, "password");
  try {
    const s = kdfInputToBytes(_salt, "salt");
    try {
      const DK = new Uint8Array(dkLen);
      const { iHash, oHash, outputLen } = hmac.create(hash2, p);
      const u = new Uint8Array(outputLen);
      const eng = pbkdf2Engine(iHash, oHash, s, u);
      return { c, dkLen, asyncTick, DK, outputLen, eng };
    } finally {
      if (typeof _salt === "string")
        clean(s);
    }
  } finally {
    if (typeof _password === "string")
      clean(p);
  }
}
function pbkdf2Engine(iHash, oHash, salt, u) {
  const counter = new Uint8Array(4);
  const view = createView(counter);
  const salted = iHash._cloneInto().update(salt);
  const work = oHash._cloneInto();
  const iClone = iHash._cloneInto;
  const oClone = oHash._cloneInto;
  return {
    u1: (ti, Ti) => {
      view.setInt32(0, ti, false);
      salted._cloneInto(work).update(counter).digestInto(u);
      oHash._cloneInto(work).update(u).digestInto(u);
      Ti.set(u.subarray(0, Ti.length));
    },
    // Whole `F` inner loop for the sync variant: one optimized function owns the hot loop.
    rounds: (c, Ti) => {
      for (let ui = 1; ui < c; ui++) {
        iClone.call(iHash, work).update(u).digestInto(u);
        oClone.call(oHash, work).update(u).digestInto(u);
        for (let i2 = 0; i2 < Ti.length; i2++)
          Ti[i2] ^= u[i2];
      }
    },
    output: (DK) => {
      iHash.destroy();
      oHash.destroy();
      salted.destroy();
      work.destroy();
      clean(u);
      return DK;
    }
  };
}
function pbkdf2(hash2, password, salt, opts) {
  const { c, dkLen, DK, outputLen, eng } = pbkdf2Init(hash2, password, salt, opts);
  for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += outputLen) {
    const Ti = DK.subarray(pos, pos + outputLen);
    eng.u1(ti, Ti);
    eng.rounds(c, Ti);
  }
  return eng.output(DK);
}

// node_modules/@noble/hashes/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA2_32B = class extends HashMD {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  // Numeric initializers matter: starting the fields as `undefined` changes
  // V8's field representation and makes sha256 3x slower (measured).
  A = 0;
  B = 0;
  C = 0;
  D = 0;
  E = 0;
  F = 0;
  G = 0;
  H = 0;
  constructor(outputLen, IV) {
    super(64, outputLen, 8, false);
    this.A = IV[0] | 0;
    this.B = IV[1] | 0;
    this.C = IV[2] | 0;
    this.D = IV[3] | 0;
    this.E = IV[4] | 0;
    this.F = IV[5] | 0;
    this.G = IV[6] | 0;
    this.H = IV[7] | 0;
  }
  get() {
    const { A, B: B3, C, D, E, F, G, H } = this;
    return [A, B3, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B3, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B3 | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  _cloneInto(to) {
    (to ||= new this.constructor()).set(...this.get());
    return this._cloneIntoMeta(to);
  }
  process(view, offset) {
    for (let i2 = 0; i2 < 16; i2++, offset += 4)
      SHA256_W[i2] = view.getUint32(offset, false);
    for (let i2 = 16; i2 < 64; i2++) {
      const W15 = SHA256_W[i2 - 15];
      const W2 = SHA256_W[i2 - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i2] = s1 + SHA256_W[i2 - 7] + s0 + SHA256_W[i2 - 16] | 0;
    }
    let { A, B: B3, C, D, E, F, G, H } = this;
    for (let i2 = 0; i2 < 64; i2++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i2] + SHA256_W[i2] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B3, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B3;
      B3 = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B3 = B3 + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B3, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.destroyed = true;
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var _SHA256 = class extends SHA2_32B {
  constructor() {
    super(32, SHA256_IV);
  }
};
var _SHA224 = class extends SHA2_32B {
  constructor() {
    super(28, SHA224_IV);
  }
};
var K512 = /* @__PURE__ */ (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA2_64B = class extends HashMD {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  // h -- high 32 bits, l -- low 32 bits
  // Numeric initializers matter: starting the fields as `undefined` changes
  // V8's field representation and slows hashing down (measured on sha256).
  Ah = 0;
  Al = 0;
  Bh = 0;
  Bl = 0;
  Ch = 0;
  Cl = 0;
  Dh = 0;
  Dl = 0;
  Eh = 0;
  El = 0;
  Fh = 0;
  Fl = 0;
  Gh = 0;
  Gl = 0;
  Hh = 0;
  Hl = 0;
  constructor(outputLen, IV) {
    super(128, outputLen, 16, false);
    this.Ah = IV[0] | 0;
    this.Al = IV[1] | 0;
    this.Bh = IV[2] | 0;
    this.Bl = IV[3] | 0;
    this.Ch = IV[4] | 0;
    this.Cl = IV[5] | 0;
    this.Dh = IV[6] | 0;
    this.Dl = IV[7] | 0;
    this.Eh = IV[8] | 0;
    this.El = IV[9] | 0;
    this.Fh = IV[10] | 0;
    this.Fl = IV[11] | 0;
    this.Gh = IV[12] | 0;
    this.Gl = IV[13] | 0;
    this.Hh = IV[14] | 0;
    this.Hl = IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  _cloneInto(to) {
    (to ||= new this.constructor()).set(...this.get());
    return this._cloneIntoMeta(to);
  }
  process(view, offset) {
    for (let i2 = 0; i2 < 16; i2++, offset += 4) {
      SHA512_W_H[i2] = view.getUint32(offset);
      SHA512_W_L[i2] = view.getUint32(offset += 4);
    }
    for (let i2 = 16; i2 < 80; i2++) {
      const W15h = SHA512_W_H[i2 - 15] | 0;
      const W15l = SHA512_W_L[i2 - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i2 - 2] | 0;
      const W2l = SHA512_W_L[i2 - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i2 - 7], SHA512_W_L[i2 - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i2 - 7], SHA512_W_H[i2 - 16]);
      SHA512_W_H[i2] = SUMh | 0;
      SHA512_W_L[i2] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i2 = 0; i2 < 80; i2++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i2], SHA512_W_L[i2]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i2], SHA512_W_H[i2]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    this.destroyed = true;
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var _SHA512 = class extends SHA2_64B {
  constructor() {
    super(64, SHA512_IV);
  }
};
var _SHA384 = class extends SHA2_64B {
  constructor() {
    super(48, SHA384_IV);
  }
};
var T256_IV = /* @__PURE__ */ Uint32Array.from([
  573645204,
  4230739756,
  2673172387,
  3360449730,
  596883563,
  1867755857,
  2520282905,
  1497426621,
  2519219938,
  2827943907,
  3193839141,
  1401305490,
  721525244,
  746961066,
  246885852,
  2177182882
]);
var _SHA512_256 = class extends SHA2_64B {
  constructor() {
    super(32, T256_IV);
  }
};
var sha256 = /* @__PURE__ */ createHasher(
  () => new _SHA256(),
  /* @__PURE__ */ oidNist(1)
);
var sha224 = /* @__PURE__ */ createHasher(
  () => new _SHA224(),
  /* @__PURE__ */ oidNist(4)
);
var sha512 = /* @__PURE__ */ createHasher(
  () => new _SHA512(),
  /* @__PURE__ */ oidNist(3)
);
var sha384 = /* @__PURE__ */ createHasher(
  () => new _SHA384(),
  /* @__PURE__ */ oidNist(2)
);
var sha512_256 = /* @__PURE__ */ createHasher(
  () => new _SHA512_256(),
  /* @__PURE__ */ oidNist(6)
);

// node_modules/@noble/hashes/scrypt.js
function XorAndSalsa(prev, pi, input, ii, out3, oi) {
  let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
  let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
  let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
  let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
  let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
  let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
  let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
  let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let i2 = 0; i2 < 8; i2 += 2) {
    x04 ^= rotl(x00 + x12 | 0, 7);
    x08 ^= rotl(x04 + x00 | 0, 9);
    x12 ^= rotl(x08 + x04 | 0, 13);
    x00 ^= rotl(x12 + x08 | 0, 18);
    x09 ^= rotl(x05 + x01 | 0, 7);
    x13 ^= rotl(x09 + x05 | 0, 9);
    x01 ^= rotl(x13 + x09 | 0, 13);
    x05 ^= rotl(x01 + x13 | 0, 18);
    x14 ^= rotl(x10 + x06 | 0, 7);
    x02 ^= rotl(x14 + x10 | 0, 9);
    x06 ^= rotl(x02 + x14 | 0, 13);
    x10 ^= rotl(x06 + x02 | 0, 18);
    x03 ^= rotl(x15 + x11 | 0, 7);
    x07 ^= rotl(x03 + x15 | 0, 9);
    x11 ^= rotl(x07 + x03 | 0, 13);
    x15 ^= rotl(x11 + x07 | 0, 18);
    x01 ^= rotl(x00 + x03 | 0, 7);
    x02 ^= rotl(x01 + x00 | 0, 9);
    x03 ^= rotl(x02 + x01 | 0, 13);
    x00 ^= rotl(x03 + x02 | 0, 18);
    x06 ^= rotl(x05 + x04 | 0, 7);
    x07 ^= rotl(x06 + x05 | 0, 9);
    x04 ^= rotl(x07 + x06 | 0, 13);
    x05 ^= rotl(x04 + x07 | 0, 18);
    x11 ^= rotl(x10 + x09 | 0, 7);
    x08 ^= rotl(x11 + x10 | 0, 9);
    x09 ^= rotl(x08 + x11 | 0, 13);
    x10 ^= rotl(x09 + x08 | 0, 18);
    x12 ^= rotl(x15 + x14 | 0, 7);
    x13 ^= rotl(x12 + x15 | 0, 9);
    x14 ^= rotl(x13 + x12 | 0, 13);
    x15 ^= rotl(x14 + x13 | 0, 18);
  }
  out3[oi++] = y00 + x00 | 0;
  out3[oi++] = y01 + x01 | 0;
  out3[oi++] = y02 + x02 | 0;
  out3[oi++] = y03 + x03 | 0;
  out3[oi++] = y04 + x04 | 0;
  out3[oi++] = y05 + x05 | 0;
  out3[oi++] = y06 + x06 | 0;
  out3[oi++] = y07 + x07 | 0;
  out3[oi++] = y08 + x08 | 0;
  out3[oi++] = y09 + x09 | 0;
  out3[oi++] = y10 + x10 | 0;
  out3[oi++] = y11 + x11 | 0;
  out3[oi++] = y12 + x12 | 0;
  out3[oi++] = y13 + x13 | 0;
  out3[oi++] = y14 + x14 | 0;
  out3[oi++] = y15 + x15 | 0;
}
function BlockMix(input, ii, out3, oi, r) {
  let head = oi + 0;
  let tail = oi + 16 * r;
  for (let i2 = 0; i2 < 16; i2++)
    out3[tail + i2] = input[ii + (2 * r - 1) * 16 + i2];
  for (let i2 = 0; i2 < r; i2++, head += 16, ii += 16) {
    XorAndSalsa(out3, tail, input, ii, out3, head);
    if (i2 > 0)
      tail += 16;
    XorAndSalsa(out3, head, input, ii += 16, out3, tail);
  }
}
var SCRYPT_DEFAULT_MAXMEM = 128 * 8 * (2 ** 20 + 1 + 1);
function scryptInit(password, salt, _opts) {
  const opts = checkOpts({
    dkLen: 32,
    asyncTick: 10,
    maxmem: SCRYPT_DEFAULT_MAXMEM
  }, _opts);
  const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
  anumber(N, "N");
  anumber(r, "r");
  anumber(p, "p");
  anumber(dkLen, "dkLen");
  anumber(asyncTick, "asyncTick");
  anumber(maxmem, "maxmem");
  if (onProgress !== void 0 && typeof onProgress !== "function")
    throw new Error('"onProgress" must be a function');
  if (r < 1)
    throw new Error('"r" expected integer >= 1');
  const blockSize = 128 * r;
  const blockSize32 = blockSize / 4;
  const pow32 = Math.pow(2, 32);
  if (N <= 1 || (N & N - 1) !== 0 || N > pow32)
    throw new Error('"N" expected a power of 2, and 2^1 <= N <= 2^32');
  if (p < 1 || p > (pow32 - 1) * 32 / blockSize)
    throw new Error('"p" expected integer 1..((2^32 - 1) * 32) / (128 * r)');
  if (dkLen < 1 || dkLen > (pow32 - 1) * 32)
    throw new Error('"dkLen" expected integer 1..(2^32 - 1) * 32');
  const memUsed = blockSize * (N + p + 1);
  if (memUsed > maxmem)
    throw new Error('"maxmem" limit was hit: memUsed(128*r*(N+p+1))=' + memUsed + ", maxmem=" + maxmem);
  const B3 = pbkdf2(sha256, password, salt, { c: 1, dkLen: blockSize * p });
  const B32 = u32(B3);
  const V = u32(new Uint8Array(blockSize * N));
  const tmp = u32(new Uint8Array(blockSize));
  let blockMixCb = () => {
  };
  if (onProgress) {
    const totalBlockMix = 2 * N * p;
    const callbackPer = Math.max(Math.floor(totalBlockMix / 1e4), 1);
    let blockMixCnt = 0;
    blockMixCb = () => {
      blockMixCnt++;
      if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix)) {
        try {
          onProgress(blockMixCnt / totalBlockMix);
        } catch (e) {
          clean(B3, V, tmp);
          throw e;
        }
      }
    };
  }
  return { N, r, p, dkLen, blockSize32, V, B32, B: B3, tmp, blockMixCb, asyncTick };
}
function scryptOutput(password, dkLen, B3, V, tmp) {
  const res = pbkdf2(sha256, password, B3, { c: 1, dkLen });
  clean(B3, V, tmp);
  return res;
}
function scrypt(password, salt, opts) {
  const { N, r, p, dkLen, blockSize32, V, B32, B: B3, tmp, blockMixCb } = scryptInit(password, salt, opts);
  swap32IfBE(B32);
  for (let pi = 0; pi < p; pi++) {
    const Pi = blockSize32 * pi;
    for (let i2 = 0; i2 < blockSize32; i2++)
      V[i2] = B32[Pi + i2];
    for (let i2 = 0, pos = 0; i2 < N - 1; i2++) {
      BlockMix(V, pos, V, pos += blockSize32, r);
      blockMixCb();
    }
    BlockMix(V, (N - 1) * blockSize32, B32, Pi, r);
    blockMixCb();
    for (let i2 = 0; i2 < N; i2++) {
      const j = (B32[Pi + blockSize32 - 16] & N - 1) >>> 0;
      for (let k = 0; k < blockSize32; k++)
        tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k];
      BlockMix(tmp, 0, B32, Pi, r);
      blockMixCb();
    }
  }
  swap32IfBE(B32);
  return scryptOutput(password, dkLen, B3, V, tmp);
}

// node_modules/@noble/hashes/sha3.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
for (let round = 0, R = _1n, x2 = 1, y = 0; round < 24; round++) {
  [x2, y] = [y, (2 * x2 + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x2));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var IOTAS = split(_SHA3_IOTA, true);
var SHA3_IOTA_H = IOTAS[0];
var SHA3_IOTA_L = IOTAS[1];
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
var B2 = new Uint32Array(5 * 2);
function keccakP(s, rounds = 24) {
  if (!(s instanceof Uint32Array))
    throw new TypeError('"s" expected Uint32Array(50), got type=' + typeof s);
  if (s.length !== 50)
    throw new RangeError('"s" expected Uint32Array(50), got length=' + s.length);
  anumber(rounds, "rounds");
  if (rounds < 1 || rounds > 24)
    throw new Error('"rounds" expected integer 1..24');
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x2 = 0; x2 < 10; x2++)
      B2[x2] = s[x2] ^ s[x2 + 10] ^ s[x2 + 20] ^ s[x2 + 30] ^ s[x2 + 40];
    for (let x2 = 0; x2 < 10; x2 += 2) {
      const idx1 = (x2 + 8) % 10;
      const idx0 = (x2 + 2) % 10;
      const B0 = B2[idx0];
      const B1 = B2[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B2[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B2[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x2 + y] ^= Th;
        s[x2 + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      const b0 = s[y], b1 = s[y + 1], b2 = s[y + 2], b3 = s[y + 3];
      s[y] ^= ~s[y + 2] & s[y + 4];
      s[y + 1] ^= ~s[y + 3] & s[y + 5];
      s[y + 2] ^= ~s[y + 4] & s[y + 6];
      s[y + 3] ^= ~s[y + 5] & s[y + 7];
      s[y + 4] ^= ~s[y + 6] & s[y + 8];
      s[y + 5] ^= ~s[y + 7] & s[y + 9];
      s[y + 6] ^= ~s[y + 8] & b0;
      s[y + 7] ^= ~s[y + 9] & b1;
      s[y + 8] ^= ~b0 & b2;
      s[y + 9] ^= ~b1 & b3;
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B2);
}
var Keccak = class _Keccak {
  state;
  pos = 0;
  posOut = 0;
  finished = false;
  state32;
  destroyed = false;
  blockLen;
  suffix;
  outputLen;
  canXOF;
  enableXOF = false;
  rounds;
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    anumber(blockLen, "blockLen");
    anumber(suffix, "suffix");
    anumber(rounds, "rounds");
    abool(enableXOF, "enableXOF");
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.canXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen, "outputLen");
    if (!(0 < blockLen && blockLen < 200))
      throw new Error('"blockLen" must be 1..199');
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    abytes(data);
    const { blockLen, state, state32 } = this;
    const len = data.length;
    const canUseU32 = blockLen % 4 === 0 && data.byteOffset % 4 === 0;
    const blockLen32 = blockLen / 4;
    const data32 = canUseU32 && len >= blockLen ? u32(data) : void 0;
    for (let pos = 0; pos < len; ) {
      if (data32 !== void 0 && this.pos === 0 && pos % 4 === 0 && len - pos >= blockLen) {
        for (let i2 = 0, o = pos / 4; i2 < blockLen32; i2++)
          state32[i2] ^= data32[o + i2];
        pos += blockLen;
        this.pos = blockLen;
        this.keccak();
        continue;
      }
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i2 = 0; i2 < take; i2++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out3) {
    aexists(this, false);
    abytes(out3);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out3.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out3.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out3;
  }
  xofInto(out3) {
    if (!this.enableXOF)
      throw new Error("XOF is not enabled");
    return this.writeInto(out3);
  }
  xof(bytes2) {
    anumber(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out3) {
    aoutput(out3, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out3.length === this.outputLen ? out3 : out3.subarray(0, this.outputLen));
    this.destroy();
  }
  digest() {
    const out3 = new Uint8Array(this.outputLen);
    this.digestInto(out3);
    return out3;
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to ||= new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds);
    to.blockLen = blockLen;
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.canXOF = this.canXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var genKeccak = (suffix, blockLen, outputLen, info = {}) => createHasher(() => new Keccak(blockLen, suffix, outputLen), info);
var sha3_224 = /* @__PURE__ */ genKeccak(
  6,
  144,
  28,
  /* @__PURE__ */ oidNist(7)
);
var sha3_256 = /* @__PURE__ */ genKeccak(
  6,
  136,
  32,
  /* @__PURE__ */ oidNist(8)
);
var sha3_384 = /* @__PURE__ */ genKeccak(
  6,
  104,
  48,
  /* @__PURE__ */ oidNist(9)
);
var sha3_512 = /* @__PURE__ */ genKeccak(
  6,
  72,
  64,
  /* @__PURE__ */ oidNist(10)
);
var genShake = (suffix, blockLen, outputLen, info = {}) => createHasher((opts = {}) => {
  opts = checkOpts({}, opts);
  return new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true);
}, info);
var shake128 = /* @__PURE__ */ genShake(31, 168, 16, /* @__PURE__ */ oidNist(11));
var shake256 = /* @__PURE__ */ genShake(31, 136, 32, /* @__PURE__ */ oidNist(12));

// node_modules/@noble/hashes/_blake.js
var BSIGMA = /* @__PURE__ */ Uint8Array.from([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  // Blake1, unused in others
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9
]);
function G1s(a, b, c, d, x2) {
  a = a + b + x2 | 0;
  d = rotr(d ^ a, 16);
  c = c + d | 0;
  b = rotr(b ^ c, 12);
  return { a, b, c, d };
}
function G2s(a, b, c, d, x2) {
  a = a + b + x2 | 0;
  d = rotr(d ^ a, 8);
  c = c + d | 0;
  b = rotr(b ^ c, 7);
  return { a, b, c, d };
}

// node_modules/@noble/hashes/blake2.js
var B2B_IV = /* @__PURE__ */ Uint32Array.from([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]);
var BBUF = /* @__PURE__ */ new Uint32Array(32);
function G1b(a, b, c, d, msg, x2) {
  const Xl = msg[x2], Xh = msg[x2 + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  const ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  let xh = Dh ^ Ah, xl = Dl ^ Al;
  Dh = rotr32H(xh, xl);
  Dl = rotr32L(xh, xl);
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  xh = Bh ^ Ch;
  xl = Bl ^ Cl;
  Bh = rotrSH(xh, xl, 24);
  Bl = rotrSL(xh, xl, 24);
  BBUF[2 * a] = Al;
  BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl;
  BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl;
  BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl;
  BBUF[2 * d + 1] = Dh;
}
function G2b(a, b, c, d, msg, x2) {
  const Xl = msg[x2], Xh = msg[x2 + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  const ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  let xh = Dh ^ Ah, xl = Dl ^ Al;
  Dh = rotrSH(xh, xl, 16);
  Dl = rotrSL(xh, xl, 16);
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  xh = Bh ^ Ch;
  xl = Bl ^ Cl;
  Bh = rotrBH(xh, xl, 63);
  Bl = rotrBL(xh, xl, 63);
  BBUF[2 * a] = Al;
  BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl;
  BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl;
  BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl;
  BBUF[2 * d + 1] = Dh;
}
function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
  anumber(keyLen);
  if (outputLen <= 0 || outputLen > keyLen)
    throw new Error('"dkLen" must be 1..' + keyLen + ", got " + outputLen);
  const { key, salt, personalization } = opts;
  if (key !== void 0 && (key.length < 1 || key.length > keyLen))
    throw new Error('"key" expected to be undefined or of length=1..' + keyLen);
  if (salt !== void 0)
    abytes(salt, saltLen, "salt");
  if (personalization !== void 0)
    abytes(personalization, persLen, "personalization");
}
var _BLAKE2 = class {
  buffer;
  buffer32;
  finished = false;
  destroyed = false;
  length = 0;
  pos = 0;
  blockLen;
  outputLen;
  canXOF = false;
  constructor(blockLen, outputLen) {
    anumber(blockLen);
    anumber(outputLen);
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.buffer = new Uint8Array(blockLen);
    this.buffer32 = u32(this.buffer);
  }
  update(data) {
    aexists(this);
    abytes(data);
    const { blockLen, buffer, buffer32 } = this;
    const len = data.length;
    const offset = data.byteOffset;
    const buf2 = data.buffer;
    for (let pos = 0; pos < len; ) {
      if (this.pos === blockLen) {
        swap32IfBE(buffer32);
        this.compress(buffer32, 0, false);
        swap32IfBE(buffer32);
        this.pos = 0;
      }
      const take = Math.min(blockLen - this.pos, len - pos);
      const dataOffset = offset + pos;
      if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
        const data32 = new Uint32Array(buf2, dataOffset, Math.floor((len - pos) / 4));
        swap32IfBE(data32);
        for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
          this.length += blockLen;
          this.compress(data32, pos32, false);
        }
        swap32IfBE(data32);
        continue;
      }
      buffer.set(pos === 0 && take === len ? data : data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      this.length += take;
      pos += take;
    }
    return this;
  }
  digestInto(out3) {
    aexists(this);
    aoutput(out3, this);
    if (out3.byteOffset & 3)
      throw new RangeError('"output" expected 4-byte aligned byteOffset, got ' + out3.byteOffset);
    const { pos, buffer32 } = this;
    this.finished = true;
    this.buffer.fill(0, pos);
    swap32IfBE(buffer32);
    this.compress(buffer32, 0, true);
    swap32IfBE(buffer32);
    const state = this.get();
    const out32 = out3 === this.buffer ? buffer32 : u32(out3);
    const full = Math.floor(this.outputLen / 4);
    for (let i2 = 0; i2 < full; i2++)
      out32[i2] = swap8IfBE(state[i2]);
    const tail = this.outputLen % 4;
    if (!tail)
      return;
    const off = full * 4;
    const word = state[full];
    for (let i2 = 0; i2 < tail; i2++)
      out3[off + i2] = word >>> 8 * i2;
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    const { buffer, length, finished: finished2, destroyed, outputLen, pos } = this;
    to ||= new this.constructor({ dkLen: outputLen });
    to.set(...this.get());
    to.buffer.set(buffer);
    to.destroyed = destroyed;
    to.finished = finished2;
    to.length = length;
    to.pos = pos;
    to.outputLen = outputLen;
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var _BLAKE2b = class extends _BLAKE2 {
  // Same IV words as SHA-512 / BLAKE2b, encoded as LE u32 low/high halves.
  v0l = B2B_IV[0] | 0;
  v0h = B2B_IV[1] | 0;
  v1l = B2B_IV[2] | 0;
  v1h = B2B_IV[3] | 0;
  v2l = B2B_IV[4] | 0;
  v2h = B2B_IV[5] | 0;
  v3l = B2B_IV[6] | 0;
  v3h = B2B_IV[7] | 0;
  v4l = B2B_IV[8] | 0;
  v4h = B2B_IV[9] | 0;
  v5l = B2B_IV[10] | 0;
  v5h = B2B_IV[11] | 0;
  v6l = B2B_IV[12] | 0;
  v6h = B2B_IV[13] | 0;
  v7l = B2B_IV[14] | 0;
  v7h = B2B_IV[15] | 0;
  constructor(opts = {}) {
    opts = checkOpts({}, opts);
    const olen = opts.dkLen === void 0 ? 64 : opts.dkLen;
    super(128, olen);
    checkBlake2Opts(olen, opts, 64, 16, 16);
    let { key, personalization, salt } = opts;
    let keyLength = 0;
    if (key !== void 0) {
      abytes(key, void 0, "key");
      keyLength = key.length;
    }
    this.v0l ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
    if (salt !== void 0) {
      abytes(salt, void 0, "salt");
      const slt = u32(copyBytes(salt));
      this.v4l ^= swap8IfBE(slt[0]);
      this.v4h ^= swap8IfBE(slt[1]);
      this.v5l ^= swap8IfBE(slt[2]);
      this.v5h ^= swap8IfBE(slt[3]);
    }
    if (personalization !== void 0) {
      abytes(personalization, void 0, "personalization");
      const pers = u32(copyBytes(personalization));
      this.v6l ^= swap8IfBE(pers[0]);
      this.v6h ^= swap8IfBE(pers[1]);
      this.v7l ^= swap8IfBE(pers[2]);
      this.v7h ^= swap8IfBE(pers[3]);
    }
    if (key !== void 0) {
      const tmp = new Uint8Array(this.blockLen);
      tmp.set(key);
      this.update(tmp);
      clean(tmp);
    }
  }
  // prettier-ignore
  get() {
    let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
    return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
  }
  // prettier-ignore
  set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
    this.v0l = v0l | 0;
    this.v0h = v0h | 0;
    this.v1l = v1l | 0;
    this.v1h = v1h | 0;
    this.v2l = v2l | 0;
    this.v2h = v2h | 0;
    this.v3l = v3l | 0;
    this.v3h = v3h | 0;
    this.v4l = v4l | 0;
    this.v4h = v4h | 0;
    this.v5l = v5l | 0;
    this.v5h = v5h | 0;
    this.v6l = v6l | 0;
    this.v6h = v6h | 0;
    this.v7l = v7l | 0;
    this.v7h = v7h | 0;
  }
  compress(msg, offset, isLast) {
    const { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
    {
      BBUF[0] = v0l;
      BBUF[1] = v0h;
      BBUF[2] = v1l;
      BBUF[3] = v1h;
      BBUF[4] = v2l;
      BBUF[5] = v2h;
      BBUF[6] = v3l;
      BBUF[7] = v3h;
      BBUF[8] = v4l;
      BBUF[9] = v4h;
      BBUF[10] = v5l;
      BBUF[11] = v5h;
      BBUF[12] = v6l;
      BBUF[13] = v6h;
      BBUF[14] = v7l;
      BBUF[15] = v7h;
    }
    BBUF.set(B2B_IV, 16);
    const l = fromNumL(this.length);
    const h = fromNumH(this.length);
    BBUF[24] = B2B_IV[8] ^ l;
    BBUF[25] = B2B_IV[9] ^ h;
    if (isLast) {
      BBUF[28] = ~BBUF[28];
      BBUF[29] = ~BBUF[29];
    }
    let j = 0;
    const s = BSIGMA;
    for (let i2 = 0; i2 < 12; i2++) {
      G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
      G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
      G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
      G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
      G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
      G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
      G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
      G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
      G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
      G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
      G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
      G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
      G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
      G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
      G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
      G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
    }
    this.v0l ^= BBUF[0] ^ BBUF[16];
    this.v0h ^= BBUF[1] ^ BBUF[17];
    this.v1l ^= BBUF[2] ^ BBUF[18];
    this.v1h ^= BBUF[3] ^ BBUF[19];
    this.v2l ^= BBUF[4] ^ BBUF[20];
    this.v2h ^= BBUF[5] ^ BBUF[21];
    this.v3l ^= BBUF[6] ^ BBUF[22];
    this.v3h ^= BBUF[7] ^ BBUF[23];
    this.v4l ^= BBUF[8] ^ BBUF[24];
    this.v4h ^= BBUF[9] ^ BBUF[25];
    this.v5l ^= BBUF[10] ^ BBUF[26];
    this.v5h ^= BBUF[11] ^ BBUF[27];
    this.v6l ^= BBUF[12] ^ BBUF[28];
    this.v6h ^= BBUF[13] ^ BBUF[29];
    this.v7l ^= BBUF[14] ^ BBUF[30];
    this.v7h ^= BBUF[15] ^ BBUF[31];
    clean(BBUF);
  }
  destroy() {
    this.destroyed = true;
    clean(this.buffer32);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var blake2b = /* @__PURE__ */ createHasher((opts) => new _BLAKE2b(opts));
function _compress(s, offset, msg, rounds, v0, v1, v2, v3, v4, v5, v6, v7, v82, v9, v10, v11, v12, v13, v14, v15) {
  let j = 0;
  for (let i2 = 0; i2 < rounds; i2++) {
    ({ a: v0, b: v4, c: v82, d: v12 } = G1s(v0, v4, v82, v12, msg[offset + s[j++]]));
    ({ a: v0, b: v4, c: v82, d: v12 } = G2s(v0, v4, v82, v12, msg[offset + s[j++]]));
    ({ a: v1, b: v5, c: v9, d: v13 } = G1s(v1, v5, v9, v13, msg[offset + s[j++]]));
    ({ a: v1, b: v5, c: v9, d: v13 } = G2s(v1, v5, v9, v13, msg[offset + s[j++]]));
    ({ a: v2, b: v6, c: v10, d: v14 } = G1s(v2, v6, v10, v14, msg[offset + s[j++]]));
    ({ a: v2, b: v6, c: v10, d: v14 } = G2s(v2, v6, v10, v14, msg[offset + s[j++]]));
    ({ a: v3, b: v7, c: v11, d: v15 } = G1s(v3, v7, v11, v15, msg[offset + s[j++]]));
    ({ a: v3, b: v7, c: v11, d: v15 } = G2s(v3, v7, v11, v15, msg[offset + s[j++]]));
    ({ a: v0, b: v5, c: v10, d: v15 } = G1s(v0, v5, v10, v15, msg[offset + s[j++]]));
    ({ a: v0, b: v5, c: v10, d: v15 } = G2s(v0, v5, v10, v15, msg[offset + s[j++]]));
    ({ a: v1, b: v6, c: v11, d: v12 } = G1s(v1, v6, v11, v12, msg[offset + s[j++]]));
    ({ a: v1, b: v6, c: v11, d: v12 } = G2s(v1, v6, v11, v12, msg[offset + s[j++]]));
    ({ a: v2, b: v7, c: v82, d: v13 } = G1s(v2, v7, v82, v13, msg[offset + s[j++]]));
    ({ a: v2, b: v7, c: v82, d: v13 } = G2s(v2, v7, v82, v13, msg[offset + s[j++]]));
    ({ a: v3, b: v4, c: v9, d: v14 } = G1s(v3, v4, v9, v14, msg[offset + s[j++]]));
    ({ a: v3, b: v4, c: v9, d: v14 } = G2s(v3, v4, v9, v14, msg[offset + s[j++]]));
  }
  return { v0, v1, v2, v3, v4, v5, v6, v7, v8: v82, v9, v10, v11, v12, v13, v14, v15 };
}
var B2S_IV = /* @__PURE__ */ SHA256_IV.slice();
var _BLAKE2s = class extends _BLAKE2 {
  // Internal state, same as SHA-256
  v0 = B2S_IV[0] | 0;
  v1 = B2S_IV[1] | 0;
  v2 = B2S_IV[2] | 0;
  v3 = B2S_IV[3] | 0;
  v4 = B2S_IV[4] | 0;
  v5 = B2S_IV[5] | 0;
  v6 = B2S_IV[6] | 0;
  v7 = B2S_IV[7] | 0;
  constructor(opts = {}) {
    opts = checkOpts({}, opts);
    const olen = opts.dkLen === void 0 ? 32 : opts.dkLen;
    super(64, olen);
    checkBlake2Opts(olen, opts, 32, 8, 8);
    let { key, personalization, salt } = opts;
    let keyLength = 0;
    if (key !== void 0) {
      abytes(key, void 0, "key");
      keyLength = key.length;
    }
    this.v0 ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
    if (salt !== void 0) {
      abytes(salt, void 0, "salt");
      const slt = u32(copyBytes(salt));
      this.v4 ^= swap8IfBE(slt[0]);
      this.v5 ^= swap8IfBE(slt[1]);
    }
    if (personalization !== void 0) {
      abytes(personalization, void 0, "personalization");
      const pers = u32(copyBytes(personalization));
      this.v6 ^= swap8IfBE(pers[0]);
      this.v7 ^= swap8IfBE(pers[1]);
    }
    if (key !== void 0) {
      const tmp = new Uint8Array(this.blockLen);
      tmp.set(key);
      this.update(tmp);
      clean(tmp);
    }
  }
  get() {
    const { v0, v1, v2, v3, v4, v5, v6, v7 } = this;
    return [v0, v1, v2, v3, v4, v5, v6, v7];
  }
  // prettier-ignore
  set(v0, v1, v2, v3, v4, v5, v6, v7) {
    this.v0 = v0 | 0;
    this.v1 = v1 | 0;
    this.v2 = v2 | 0;
    this.v3 = v3 | 0;
    this.v4 = v4 | 0;
    this.v5 = v5 | 0;
    this.v6 = v6 | 0;
    this.v7 = v7 | 0;
  }
  compress(msg, offset, isLast) {
    const l = fromNumL(this.length);
    const h = fromNumH(this.length);
    const { v0, v1, v2, v3, v4, v5, v6, v7, v8: v82, v9, v10, v11, v12, v13, v14, v15 } = _compress(BSIGMA, offset, msg, 10, this.v0, this.v1, this.v2, this.v3, this.v4, this.v5, this.v6, this.v7, B2S_IV[0], B2S_IV[1], B2S_IV[2], B2S_IV[3], l ^ B2S_IV[4], h ^ B2S_IV[5], isLast ? ~B2S_IV[6] : B2S_IV[6], B2S_IV[7]);
    this.v0 ^= v0 ^ v82;
    this.v1 ^= v1 ^ v9;
    this.v2 ^= v2 ^ v10;
    this.v3 ^= v3 ^ v11;
    this.v4 ^= v4 ^ v12;
    this.v5 ^= v5 ^ v13;
    this.v6 ^= v6 ^ v14;
    this.v7 ^= v7 ^ v15;
  }
  destroy() {
    this.destroyed = true;
    clean(this.buffer32);
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var blake2s = /* @__PURE__ */ createHasher((opts) => new _BLAKE2s(opts));

// src/node/crypto.ts
var HASHES = {
  md5,
  sha1,
  "sha-1": sha1,
  ripemd160,
  rmd160: ripemd160,
  sha224,
  sha256,
  "sha-256": sha256,
  sha384,
  "sha-384": sha384,
  sha512,
  "sha-512": sha512,
  "sha512-256": sha512_256,
  "sha3-224": sha3_224,
  "sha3-256": sha3_256,
  "sha3-384": sha3_384,
  "sha3-512": sha3_512,
  shake128,
  shake256,
  blake2b512: blake2b,
  blake2s256: blake2s
};
function algo(name) {
  const h = HASHES[String(name).toLowerCase()];
  if (!h) {
    const e = new Error(`Digest method not supported: ${name}`);
    e.code = "ERR_CRYPTO_INVALID_DIGEST";
    throw e;
  }
  return h;
}
function toBytes2(data, enc4) {
  if (typeof data === "string") return import_buffer7.Buffer.from(data, enc4 ?? "utf8");
  if (data instanceof Uint8Array) return data;
  if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  const e = new TypeError(`The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received ${data === null ? "null" : typeof data}`);
  e.code = "ERR_INVALID_ARG_TYPE";
  throw e;
}
function out2(bytes2, enc4) {
  const b = import_buffer7.Buffer.from(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
  return enc4 && enc4 !== "buffer" ? b.toString(enc4) : b;
}
var Hash = class _Hash extends Transform {
  h;
  done = false;
  algorithm;
  constructor(algorithm, opts, state) {
    super(opts);
    this.algorithm = algorithm;
    this.h = state ?? algo(algorithm).create(opts?.outputLength ? { dkLen: opts.outputLength } : void 0);
  }
  update(data, enc4) {
    if (this.done) {
      const e = new Error("Digest already called");
      e.code = "ERR_CRYPTO_HASH_FINALIZED";
      throw e;
    }
    this.h.update(toBytes2(data, enc4));
    return this;
  }
  digest(enc4) {
    if (this.done) {
      const e = new Error("Digest already called");
      e.code = "ERR_CRYPTO_HASH_FINALIZED";
      throw e;
    }
    this.done = true;
    return out2(this.h.digest(), enc4);
  }
  copy() {
    return new _Hash(this.algorithm, void 0, this.h.clone());
  }
  _transform(chunk, enc4, cb) {
    this.update(chunk, enc4);
    cb();
  }
  _flush(cb) {
    this.push(this.digest());
    cb();
  }
};
var Hmac = class extends Transform {
  h;
  done = false;
  constructor(algorithm, key, opts) {
    super(opts);
    const k = key && typeof key === "object" && key.export ? key.export() : toBytes2(key);
    this.h = hmac.create(algo(algorithm), k);
  }
  update(data, enc4) {
    this.h.update(toBytes2(data, enc4));
    return this;
  }
  digest(enc4) {
    if (this.done) return out2(new Uint8Array(0), enc4);
    this.done = true;
    return out2(this.h.digest(), enc4);
  }
  _transform(chunk, enc4, cb) {
    this.update(chunk, enc4);
    cb();
  }
  _flush(cb) {
    this.push(this.digest());
    cb();
  }
};
function createHash(algorithm, opts) {
  return new Hash(algorithm, opts);
}
function createHmac(algorithm, key, opts) {
  return new Hmac(algorithm, key, opts);
}
function hash(algorithm, data, outputEncoding = "hex") {
  const h = algo(algorithm).create();
  h.update(toBytes2(data));
  return out2(h.digest(), outputEncoding);
}
function getHashes() {
  return Object.keys(HASHES).filter((k) => !k.includes("-") || k.startsWith("sha3") || k === "sha512-256");
}
function getCiphers() {
  return ["aes-128-cbc", "aes-256-cbc", "aes-128-gcm", "aes-256-gcm"];
}
function getCurves() {
  return ["prime256v1", "secp384r1", "secp521r1"];
}
function randomBytes(n, cb) {
  const b = import_buffer7.Buffer.alloc(n);
  for (let i2 = 0; i2 < n; i2 += 65536) getRandomValues(b.subarray(i2, Math.min(n, i2 + 65536)));
  if (cb) {
    queueMicrotask(() => cb(null, b));
    return;
  }
  return b;
}
var pseudoRandomBytes = randomBytes;
var prng = randomBytes;
var rng = randomBytes;
function randomFillSync(buf2, offset = 0, size) {
  const view = new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength);
  const end = size === void 0 ? view.length : offset + size;
  for (let i2 = offset; i2 < end; i2 += 65536) getRandomValues(view.subarray(i2, Math.min(end, i2 + 65536)));
  return buf2;
}
function randomFill(buf2, ...args) {
  const cb = args.pop();
  randomFillSync(buf2, args[0], args[1]);
  queueMicrotask(() => cb(null, buf2));
}
function randomUUID2() {
  return randomUUID();
}
function randomInt(min, max2, cb) {
  if (typeof max2 === "function") {
    cb = max2;
    max2 = void 0;
  }
  if (max2 === void 0) {
    max2 = min;
    min = 0;
  }
  const range = max2 - min;
  const v = new Uint32Array(2);
  getRandomValues(v);
  const n = min + Math.floor((v[0] * 2 ** 21 + (v[1] >>> 11)) / 2 ** 53 * range);
  if (cb) {
    queueMicrotask(() => cb(null, n));
    return;
  }
  return n;
}
var getRandomValues2 = (a) => getRandomValues(a);
var webcrypto = nativeCrypto;
var subtle = nativeCrypto?.subtle;
function timingSafeEqual(a, b) {
  if (a.byteLength !== b.byteLength) {
    const e = new RangeError("Input buffers must have the same byte length");
    e.code = "ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH";
    throw e;
  }
  const x2 = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  const y = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
  let d = 0;
  for (let i2 = 0; i2 < x2.length; i2++) d |= x2[i2] ^ y[i2];
  return d === 0;
}
function pbkdf2Sync(password, salt, iterations, keylen, digest) {
  return import_buffer7.Buffer.from(pbkdf2(algo(digest), toBytes2(password), toBytes2(salt), { c: iterations, dkLen: keylen }));
}
function pbkdf22(password, salt, iterations, keylen, digest, cb) {
  try {
    const k = pbkdf2Sync(password, salt, iterations, keylen, digest);
    queueMicrotask(() => cb(null, k));
  } catch (e) {
    queueMicrotask(() => cb(e));
  }
}
function scryptSync(password, salt, keylen, opts = {}) {
  return import_buffer7.Buffer.from(scrypt(toBytes2(password), toBytes2(salt), { N: opts.N ?? opts.cost ?? 16384, r: opts.r ?? opts.blockSize ?? 8, p: opts.p ?? opts.parallelization ?? 1, dkLen: keylen }));
}
function scrypt2(password, salt, keylen, opts, cb) {
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  try {
    const k = scryptSync(password, salt, keylen, opts);
    queueMicrotask(() => cb(null, k));
  } catch (e) {
    queueMicrotask(() => cb(e));
  }
}
function hkdfSync(digest, ikm, salt, info, keylen) {
  const h = algo(digest);
  const prk = hmac(h, toBytes2(salt), toBytes2(ikm));
  const n = Math.ceil(keylen / h.outputLen);
  const okm = new Uint8Array(n * h.outputLen);
  let prev = new Uint8Array(0);
  for (let i2 = 0; i2 < n; i2++) {
    const input = new Uint8Array(prev.length + toBytes2(info).length + 1);
    input.set(prev);
    input.set(toBytes2(info), prev.length);
    input[input.length - 1] = i2 + 1;
    prev = hmac(h, prk, input);
    okm.set(prev, i2 * h.outputLen);
  }
  return okm.buffer.slice(0, keylen);
}
var KeyObject = class {
  constructor(type2, data) {
    this.type = type2;
    this.data = data;
  }
  type;
  data;
  export() {
    return import_buffer7.Buffer.from(this.data);
  }
  get symmetricKeySize() {
    return this.data.length;
  }
  equals(o) {
    return timingSafeEqual(this.data, o.data);
  }
  get [Symbol.toStringTag]() {
    return "KeyObject";
  }
};
function createSecretKey(key, enc4) {
  return new KeyObject("secret", toBytes2(key, enc4));
}
function unsupported(name) {
  return () => {
    const e = new Error(`crypto.${name} is not supported in OpenVessel`);
    e.code = "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM";
    throw e;
  };
}
var createCipheriv = unsupported("createCipheriv");
var createDecipheriv = unsupported("createDecipheriv");
var createSign = unsupported("createSign");
var createVerify = unsupported("createVerify");
var createPublicKey = unsupported("createPublicKey");
var createPrivateKey = unsupported("createPrivateKey");
var generateKeyPairSync = unsupported("generateKeyPairSync");
var generateKeyPair = unsupported("generateKeyPair");
var createDiffieHellman = unsupported("createDiffieHellman");
var createECDH = unsupported("createECDH");
var publicEncrypt = unsupported("publicEncrypt");
var privateDecrypt = unsupported("privateDecrypt");
var sign = unsupported("sign");
var verify = unsupported("verify");
var constants2 = { RSA_PKCS1_PADDING: 1, RSA_NO_PADDING: 3, RSA_PKCS1_OAEP_PADDING: 4, RSA_PKCS1_PSS_PADDING: 6, POINT_CONVERSION_COMPRESSED: 2, POINT_CONVERSION_UNCOMPRESSED: 4 };
function getFips() {
  return 0;
}
function setFips() {
}
function secureHeapUsed() {
  return { total: 0, min: 0, used: 0, utilization: 0 };
}
var crypto_default = {
  createHash,
  createHmac,
  hash,
  getHashes,
  getCiphers,
  getCurves,
  randomBytes,
  pseudoRandomBytes,
  prng,
  rng,
  randomFillSync,
  randomFill,
  randomUUID: randomUUID2,
  randomInt,
  getRandomValues: getRandomValues2,
  webcrypto,
  subtle,
  timingSafeEqual,
  pbkdf2Sync,
  pbkdf2: pbkdf22,
  scryptSync,
  scrypt: scrypt2,
  hkdfSync,
  KeyObject,
  createSecretKey,
  createCipheriv,
  createDecipheriv,
  createSign,
  createVerify,
  createPublicKey,
  createPrivateKey,
  generateKeyPairSync,
  generateKeyPair,
  createDiffieHellman,
  createECDH,
  publicEncrypt,
  privateDecrypt,
  sign,
  verify,
  constants: constants2,
  getFips,
  setFips,
  secureHeapUsed,
  Hash,
  Hmac
};

// src/node/worker.ts
init_events();

// src/node/http.ts
var import_buffer8 = __toESM(require_buffer(), 1);
init_events();

// src/node/net.ts
init_events();
function isIPv4(s) {
  return /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(s);
}
function isIPv6(s) {
  return s.includes(":") && /^[0-9a-fA-F:.]+$/.test(s.replace(/%.*$/, "").replace(/^\[|\]$/g, ""));
}
function isIP(s) {
  return isIPv4(s) ? 4 : isIPv6(s) ? 6 : 0;
}
var autoSelect = true;
function getDefaultAutoSelectFamily() {
  return autoSelect;
}
function setDefaultAutoSelectFamily(v) {
  autoSelect = v;
}
function getDefaultAutoSelectFamilyAttemptTimeout() {
  return 250;
}
function setDefaultAutoSelectFamilyAttemptTimeout() {
}
var Socket = class extends Duplex {
  remoteAddress = "127.0.0.1";
  remotePort = 5e4 + Math.floor(Math.random() * 1e4);
  remoteFamily = "IPv4";
  localAddress = "127.0.0.1";
  localPort = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  pending = false;
  readyState = "open";
  encrypted;
  timeout;
  _sink;
  _onEnd;
  handle = new Handle();
  constructor(opts = {}) {
    super({ allowHalfOpen: opts.allowHalfOpen ?? false });
    if (opts._sink) {
      this._sink = opts._sink;
      this._onEnd = opts._onEnd;
      this.handle.activate();
      this.once("close", () => this.handle.deactivate());
    }
  }
  /** Data arriving from the peer. */
  _feed(d) {
    if (d === null) {
      this.push(null);
      return;
    }
    this.bytesRead += d.length;
    this.push(globalThis.Buffer.from(d));
  }
  _read() {
  }
  _write(chunk, enc4, cb) {
    const b = typeof chunk === "string" ? globalThis.Buffer.from(chunk, enc4) : chunk;
    this.bytesWritten += b.length;
    if (!this._sink) {
      cb(Object.assign(new Error("This socket is not connected"), { code: "ENOTCONN" }));
      return;
    }
    this._sink(b);
    cb();
  }
  _final(cb) {
    this._onEnd?.();
    cb();
  }
  _destroy(err3, cb) {
    this.readyState = "closed";
    this._onEnd?.();
    this._onEnd = void 0;
    cb(err3);
  }
  connect(...args) {
    const opts = typeof args[0] === "object" ? args[0] : { port: args[0], host: typeof args[1] === "string" ? args[1] : "localhost" };
    const cb = args.find((a) => typeof a === "function");
    if (cb) this.once("connect", cb);
    this.connecting = true;
    nextTick(() => {
      this.connecting = false;
      const err3 = Object.assign(new Error(`connect ECONNREFUSED ${opts.host ?? "127.0.0.1"}:${opts.port}`), { code: "ECONNREFUSED", errno: -111, syscall: "connect", address: opts.host ?? "127.0.0.1", port: opts.port });
      this.destroy(err3);
    });
    return this;
  }
  setEncoding(enc4) {
    return super.setEncoding(enc4);
  }
  setKeepAlive() {
    return this;
  }
  setNoDelay() {
    return this;
  }
  setTimeout(ms, cb) {
    this.timeout = ms;
    if (cb) this.once("timeout", cb);
    return this;
  }
  address() {
    return { address: this.localAddress, family: "IPv4", port: this.localPort };
  }
  ref() {
    this.handle.ref();
    return this;
  }
  unref() {
    this.handle.unref();
    return this;
  }
  resetAndDestroy() {
    this.destroy();
    return this;
  }
  get bufferSize() {
    return 0;
  }
};
var Stream2 = Socket;
var Server = class extends EventEmitter {
  listening = false;
  maxConnections;
  _port = 0;
  _host = "";
  handle = new Handle();
  constructor(opts, listener) {
    super();
    if (typeof opts === "function") listener = opts;
    if (listener) this.on("connection", listener);
  }
  listen(...args) {
    let port = 0;
    let host = "";
    const cb = args.find((a) => typeof a === "function");
    if (typeof args[0] === "object" && args[0] !== null) {
      port = Number(args[0].port ?? 0);
      host = args[0].host ?? "";
    } else if (typeof args[0] === "string" && !/^\d+$/.test(args[0])) {
      port = 0;
    } else {
      port = Number(args[0] ?? 0);
      if (typeof args[1] === "string") host = args[1];
    }
    if (cb) this.once("listening", cb);
    try {
      this._port = sys("listen", { port, host, kind: this._kind() });
    } catch (e) {
      const code = e instanceof SysError ? e.code : "EADDRINUSE";
      const err3 = Object.assign(new Error(`listen ${code}: address already in use ${host || "::"}:${port}`), { code, errno: code === "EADDRINUSE" ? -98 : -13, syscall: "listen", address: host || "::", port });
      nextTick(() => this.emit("error", err3));
      return this;
    }
    this._host = host;
    this.listening = true;
    this.handle.activate();
    this._onListen(this._port);
    nextTick(() => this.emit("listening"));
    return this;
  }
  _kind() {
    return "tcp";
  }
  _onListen(_port) {
  }
  _onClose(_port) {
  }
  address() {
    if (!this.listening) return null;
    const h = this._host;
    const family = h && isIPv4(h) ? "IPv4" : h === "localhost" ? "IPv4" : "IPv6";
    const address = h === "localhost" ? "127.0.0.1" : h || "::";
    return { address, family, port: this._port };
  }
  close(cb) {
    if (!this.listening) {
      if (cb) nextTick(() => cb(Object.assign(new Error("Server is not running."), { code: "ERR_SERVER_NOT_RUNNING" })));
      return this;
    }
    this.listening = false;
    try {
      sys("unlisten", { port: this._port });
    } catch {
    }
    this._onClose(this._port);
    this.handle.deactivate();
    nextTick(() => {
      this.emit("close");
      cb?.();
    });
    return this;
  }
  getConnections(cb) {
    nextTick(() => cb(null, 0));
    return this;
  }
  ref() {
    this.handle.ref();
    return this;
  }
  unref() {
    this.handle.unref();
    return this;
  }
  [Symbol.asyncDispose ?? /* @__PURE__ */ Symbol.for("asyncDispose")]() {
    return new Promise((r) => this.close(() => r()));
  }
};
function createServer(opts, listener) {
  return new Server(opts, listener);
}
function connect(...args) {
  const s = new Socket();
  return s.connect(...args);
}
var createConnection = connect;
var BlockList = class {
  rules = [];
  addAddress(a) {
    this.rules.push(a);
  }
  addRange(a, b) {
    this.rules.push(`${a}-${b}`);
  }
  addSubnet(a, p) {
    this.rules.push(`${a}/${p}`);
  }
  check(a) {
    return this.rules.includes(a);
  }
};
var SocketAddress = class {
  address;
  port;
  family;
  flowlabel = 0;
  constructor(o = {}) {
    this.address = o.address ?? "127.0.0.1";
    this.port = o.port ?? 0;
    this.family = o.family ?? "ipv4";
  }
};
var net_default = { isIP, isIPv4, isIPv6, Socket, Stream: Stream2, Server, createServer, connect, createConnection, BlockList, SocketAddress, getDefaultAutoSelectFamily, setDefaultAutoSelectFamily, getDefaultAutoSelectFamilyAttemptTimeout, setDefaultAutoSelectFamilyAttemptTimeout };

// src/node/netbridge.ts
var listeners = /* @__PURE__ */ new Map();
var reqBodies = /* @__PURE__ */ new Map();
var wsSessions = /* @__PURE__ */ new Map();
var clientReqs = /* @__PURE__ */ new Map();
var nextClientRid = 1;
function registerListener(port, l) {
  listeners.set(port, l);
}
function unregisterListener(port) {
  listeners.delete(port);
}
function onReqBody(rid, h) {
  reqBodies.set(rid, h);
}
function onWs(rid, h) {
  wsSessions.set(rid, h);
}
function sendResponseHead(rid, status, statusText, headers) {
  post({ t: "http-res", rid, status, statusText, headers });
}
function sendResponseData(rid, data) {
  if (data.length) post({ t: "http-res-data", rid, data }, []);
}
function sendResponseEnd(rid) {
  post({ t: "http-res-end", rid });
}
function wsAccept(rid, protocol, headers) {
  post({ t: "ws-open", rid, protocol, headers });
}
function wsSend(rid, data, binary) {
  post({ t: "ws-send", rid, data, binary });
}
function wsClose(rid, code, reason) {
  wsSessions.delete(rid);
  post({ t: "ws-close", rid, code, reason });
}
function loopbackRequest(port, method, url, headers, h) {
  const crid = nextClientRid++;
  clientReqs.set(crid, h);
  post({ t: "loop-req", crid, port, method, url, headers });
  return {
    write(d) {
      post({ t: "loop-body", crid, data: d });
    },
    end() {
      post({ t: "loop-body-end", crid });
    },
    abort() {
      clientReqs.delete(crid);
      post({ t: "loop-abort", crid });
    }
  };
}
function onNetMessage(msg) {
  switch (msg.t) {
    case "http-req": {
      const l = listeners.get(msg.port);
      if (!l) {
        sendResponseHead(msg.rid, 503, "Service Unavailable", [["content-type", "text/plain"]]);
        sendResponseData(msg.rid, new TextEncoder().encode("no server"));
        sendResponseEnd(msg.rid);
        return true;
      }
      l.onRequest(msg);
      return true;
    }
    case "http-body":
      reqBodies.get(msg.rid)?.onData(msg.data);
      return true;
    case "http-body-end": {
      const b = reqBodies.get(msg.rid);
      reqBodies.delete(msg.rid);
      b?.onEnd();
      return true;
    }
    case "http-abort": {
      const b = reqBodies.get(msg.rid);
      reqBodies.delete(msg.rid);
      b?.onAbort?.();
      const w = wsSessions.get(msg.rid);
      wsSessions.delete(msg.rid);
      w?.onClose(1006, "");
      return true;
    }
    case "ws-msg":
      wsSessions.get(msg.rid)?.onMessage(msg.data, msg.binary);
      return true;
    case "ws-close": {
      const w = wsSessions.get(msg.rid);
      wsSessions.delete(msg.rid);
      w?.onClose(msg.code ?? 1005, msg.reason ?? "");
      return true;
    }
    case "loop-res":
      clientReqs.get(msg.crid)?.onHead(msg.status, msg.statusText, msg.headers);
      return true;
    case "loop-res-data":
      clientReqs.get(msg.crid)?.onData(msg.data);
      return true;
    case "loop-res-end": {
      const c = clientReqs.get(msg.crid);
      clientReqs.delete(msg.crid);
      c?.onEnd();
      return true;
    }
    case "loop-res-error": {
      const c = clientReqs.get(msg.crid);
      clientReqs.delete(msg.crid);
      c?.onError(msg.msg);
      return true;
    }
  }
  return false;
}

// src/node/netfetch.ts
var nativeFetch = globalThis.fetch.bind(globalThis);
var runtimeBase = "";
var pidLabel = "";
function setNetInfo(base, pid, cmd) {
  runtimeBase = base;
  pidLabel = `${pid} ${cmd}`.slice(0, 200);
}
var LOOPBACK = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "::1", "[::1]", "0.0.0.0", ""]);
function isLoopbackHost(h) {
  return LOOPBACK.has(h) || h.endsWith(".localhost");
}
function virtualPortExists(port) {
  try {
    return sys("portInfo", { port });
  } catch {
    return false;
  }
}
function fetchFailed(message, code, cause) {
  const c = Object.assign(new Error(message), { code, cause });
  return Object.assign(new TypeError("fetch failed"), { cause: c });
}
async function proxyFetch(url, init2) {
  const headers = new Headers();
  headers.set("x-ov-h", encodeURIComponent(JSON.stringify(init2.headers ?? [])));
  headers.set("x-ov-by", encodeURIComponent(pidLabel));
  if (init2.redirect) headers.set("x-ov-redirect", init2.redirect);
  const res = await nativeFetch(`${runtimeBase}/__ov/net?url=${encodeURIComponent(url)}`, {
    method: init2.method === "GET" || init2.method === "HEAD" ? init2.method : "POST",
    headers: { ...Object.fromEntries(headers), "x-ov-method": init2.method ?? "GET" },
    body: init2.method === "GET" || init2.method === "HEAD" ? void 0 : init2.body,
    signal: init2.signal ?? void 0,
    // @ts-ignore duplex is required by Chrome for streaming bodies
    duplex: init2.body instanceof ReadableStream ? "half" : void 0
  });
  const err3 = res.headers.get("x-ov-error");
  if (err3) {
    const msg = decodeURIComponent(res.headers.get("x-ov-message") ?? err3);
    throw fetchFailed(msg, err3 === "denied" ? "EACCES" : err3 === "timeout" ? "ETIMEDOUT" : "ECONNREFUSED");
  }
  const status = Number(res.headers.get("x-ov-status") ?? res.status);
  const statusText = decodeURIComponent(res.headers.get("x-ov-status-text") ?? res.statusText);
  const finalUrl = decodeURIComponent(res.headers.get("x-ov-url") ?? url);
  let outHeaders = [];
  try {
    outHeaders = JSON.parse(decodeURIComponent(res.headers.get("x-ov-rh") ?? "[]"));
  } catch {
  }
  const nullBody = status === 204 || status === 205 || status === 304 || init2.method === "HEAD";
  const r = new Response(nullBody ? null : res.body, { status: status === 0 ? 200 : status, statusText, headers: outHeaders });
  Object.defineProperty(r, "url", { value: finalUrl });
  Object.defineProperty(r, "redirected", { value: res.headers.get("x-ov-redirected") === "1" });
  return r;
}
function loopbackFetch(url, method, headers, body, signal) {
  const port = Number(url.port || (url.protocol === "https:" ? 443 : 80));
  return new Promise((resolve3, reject) => {
    let ctrl;
    const stream = new ReadableStream({
      start(c) {
        ctrl = c;
      },
      cancel() {
        handle.abort();
      }
    });
    const handle = loopbackRequest(port, method, url.pathname + url.search, headers, {
      onHead(status, statusText, h) {
        const nullBody = status === 204 || status === 205 || status === 304 || method === "HEAD";
        const r = new Response(nullBody ? null : stream, { status, statusText, headers: h.filter(([k]) => k.toLowerCase() !== "set-cookie" || true) });
        Object.defineProperty(r, "url", { value: url.href });
        resolve3(r);
      },
      onData(d) {
        ctrl.enqueue(d);
      },
      onEnd() {
        try {
          ctrl.close();
        } catch {
        }
      },
      onError(msg) {
        reject(fetchFailed(msg, "ECONNRESET"));
        try {
          ctrl.error(new Error(msg));
        } catch {
        }
      }
    });
    if (body && body.length) handle.write(body);
    handle.end();
    signal?.addEventListener("abort", () => {
      handle.abort();
      reject(signal.reason ?? Object.assign(new Error("This operation was aborted"), { name: "AbortError" }));
    });
  });
}
function ovFetch(input, init2) {
  return track(
    (async () => {
      let req;
      try {
        req = input instanceof Request && !init2 ? input : new Request(input, init2);
      } catch (e) {
        throw e;
      }
      const url = new URL(req.url);
      if (url.protocol === "data:" || url.protocol === "blob:") return nativeFetch(req);
      if (url.protocol === "file:") {
        const e = new TypeError("fetch failed");
        e.cause = new Error("not implemented... yet...");
        throw e;
      }
      const headers = [...req.headers];
      const body = req.method === "GET" || req.method === "HEAD" ? null : new Uint8Array(await req.arrayBuffer());
      if (isLoopbackHost(url.hostname)) {
        const port = Number(url.port || (url.protocol === "https:" ? 443 : 80));
        if (!virtualPortExists(port)) throw fetchFailed(`connect ECONNREFUSED 127.0.0.1:${port}`, "ECONNREFUSED");
        return loopbackFetch(url, req.method, headers, body, req.signal);
      }
      return proxyFetch(url.href, { method: req.method, headers, body, signal: req.signal, redirect: req.redirect });
    })()
  );
}

// src/node/http.ts
var METHODS = ["ACL", "BIND", "CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LINK", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCALENDAR", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "QUERY", "REBIND", "REPORT", "SEARCH", "SOURCE", "SUBSCRIBE", "TRACE", "UNBIND", "UNLINK", "UNLOCK", "UNSUBSCRIBE"];
var STATUS_CODES = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
};
var maxHeaderSize = 16384;
function validateHeaderName(name) {
  if (typeof name !== "string" || !/^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/.test(name)) {
    throw Object.assign(new TypeError(`Header name must be a valid HTTP token ["${name}"]`), { code: "ERR_INVALID_HTTP_TOKEN" });
  }
}
function validateHeaderValue(name, value) {
  if (value === void 0) throw Object.assign(new TypeError(`Invalid value "${value}" for header "${name}"`), { code: "ERR_HTTP_INVALID_HEADER_VALUE" });
  if (/[^\t\x20-\x7e\x80-\xff]/.test(String(value))) throw Object.assign(new TypeError(`Invalid character in header content ["${name}"]`), { code: "ERR_INVALID_CHAR" });
}
function headersToObject(pairs) {
  const out3 = /* @__PURE__ */ Object.create(null);
  for (const [k0, v] of pairs) {
    const k = k0.toLowerCase();
    if (k === "set-cookie") {
      (out3[k] ??= []).push(v);
    } else if (out3[k] !== void 0) {
      if (k === "cookie") out3[k] += "; " + v;
      else if (["content-type", "content-length", "user-agent", "referer", "host", "authorization", "proxy-authorization", "if-modified-since", "if-unmodified-since", "from", "location", "max-forwards", "retry-after", "etag", "last-modified", "server", "age", "expires"].includes(k)) continue;
      else out3[k] += ", " + v;
    } else out3[k] = v;
  }
  return out3;
}
var IncomingMessage = class extends Readable {
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  method;
  url;
  statusCode;
  statusMessage;
  headers = {};
  rawHeaders = [];
  trailers = {};
  rawTrailers = [];
  headersDistinct = {};
  trailersDistinct = {};
  complete = false;
  aborted = false;
  socket;
  connection;
  constructor(socket) {
    super();
    this.socket = socket ?? new Socket();
    this.connection = this.socket;
  }
  _setHeaders(pairs) {
    this.headers = headersToObject(pairs);
    this.rawHeaders = pairs.flat();
    const d = {};
    for (const [k, v] of pairs) (d[k.toLowerCase()] ??= []).push(v);
    this.headersDistinct = d;
  }
  _read() {
  }
  setTimeout(_ms, cb) {
    if (cb) this.once("timeout", cb);
    return this;
  }
};
var OutgoingMessage = class extends Writable {
  _headers = /* @__PURE__ */ new Map();
  headersSent = false;
  sendDate = true;
  finished = false;
  chunkedEncoding = false;
  useChunkedEncodingByDefault = true;
  shouldKeepAlive = false;
  socket = null;
  connection = null;
  constructor() {
    super();
  }
  setHeader(name, value) {
    if (this.headersSent) throw Object.assign(new Error("Cannot set headers after they are sent to the client"), { code: "ERR_HTTP_HEADERS_SENT" });
    validateHeaderName(name);
    this._headers.set(name.toLowerCase(), [name, value]);
    return this;
  }
  appendHeader(name, value) {
    const cur = this.getHeader(name);
    const add2 = Array.isArray(value) ? value : [value];
    if (cur === void 0) this.setHeader(name, add2.length === 1 ? add2[0] : add2);
    else this.setHeader(name, [...Array.isArray(cur) ? cur : [String(cur)], ...add2]);
    return this;
  }
  setHeaders(h) {
    for (const [k, v] of h) this.setHeader(k, v);
    return this;
  }
  getHeader(name) {
    return this._headers.get(name.toLowerCase())?.[1];
  }
  getHeaders() {
    const o = /* @__PURE__ */ Object.create(null);
    for (const [k, [, v]] of this._headers) o[k] = v;
    return o;
  }
  getHeaderNames() {
    return [...this._headers.keys()];
  }
  getRawHeaderNames() {
    return [...this._headers.values()].map(([n]) => n);
  }
  hasHeader(name) {
    return this._headers.has(name.toLowerCase());
  }
  removeHeader(name) {
    if (this.headersSent) throw Object.assign(new Error("Cannot remove headers after they are sent to the client"), { code: "ERR_HTTP_HEADERS_SENT" });
    this._headers.delete(name.toLowerCase());
  }
  flushHeaders() {
  }
  setTimeout(_ms, cb) {
    if (cb) this.once("timeout", cb);
    return this;
  }
  addTrailers(_h) {
  }
  _headerPairs() {
    const out3 = [];
    for (const [, [name, v]] of this._headers) {
      if (Array.isArray(v)) for (const x2 of v) out3.push([name, String(x2)]);
      else out3.push([name, String(v)]);
    }
    return out3;
  }
};
var ServerResponse = class extends OutgoingMessage {
  statusCode = 200;
  statusMessage = "";
  req;
  rid;
  isHead;
  strictContentLength = false;
  constructor(req, rid = 0) {
    super();
    this.req = req;
    this.rid = rid;
    this.isHead = req.method === "HEAD";
    this.socket = req.socket;
    this.connection = req.socket;
    this.once("finish", () => {
      this.finished = true;
      nextTick(() => this.emit("close"));
    });
  }
  writeHead(status, msg, headers) {
    if (this.headersSent) throw Object.assign(new Error("Cannot write headers after they are sent to the client"), { code: "ERR_HTTP_HEADERS_SENT" });
    if (typeof msg !== "string") {
      headers = msg;
      msg = void 0;
    }
    this.statusCode = status;
    if (msg) this.statusMessage = msg;
    if (Array.isArray(headers)) {
      if (headers.length && Array.isArray(headers[0])) for (const [k, v] of headers) this.appendHeader(k, v);
      else for (let i2 = 0; i2 < headers.length; i2 += 2) this.appendHeader(headers[i2], headers[i2 + 1]);
    } else if (headers) {
      for (const k of Object.keys(headers)) if (headers[k] !== void 0) this.setHeader(k, headers[k]);
    }
    this._sendHead();
    return this;
  }
  writeContinue() {
  }
  writeProcessing() {
  }
  writeEarlyHints(_h, cb) {
    cb?.();
  }
  _sendHead() {
    if (this.headersSent) return;
    this.headersSent = true;
    if (this.sendDate && !this.hasHeader("date")) this._headers.set("date", ["Date", (/* @__PURE__ */ new Date()).toUTCString()]);
    sendResponseHead(this.rid, this.statusCode, this.statusMessage || STATUS_CODES[this.statusCode] || "", this._headerPairs());
  }
  _write(chunk, enc4, cb) {
    this._sendHead();
    if (!this.isHead) {
      const b = typeof chunk === "string" ? import_buffer8.Buffer.from(chunk, enc4) : chunk;
      sendResponseData(this.rid, new Uint8Array(b.buffer, b.byteOffset, b.byteLength).slice());
    }
    cb();
  }
  _final(cb) {
    this._sendHead();
    sendResponseEnd(this.rid);
    cb();
  }
  end(chunk, enc4, cb) {
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = void 0;
    } else if (typeof enc4 === "function") {
      cb = enc4;
      enc4 = void 0;
    }
    if (!this.headersSent && chunk !== void 0 && chunk !== null && !this.hasHeader("content-length") && !this.hasHeader("transfer-encoding")) {
      const len = typeof chunk === "string" ? import_buffer8.Buffer.byteLength(chunk, enc4) : chunk.byteLength;
      this.setHeader("Content-Length", len);
    }
    return super.end(chunk, enc4, cb);
  }
  assignSocket(s) {
    this.socket = s;
  }
  detachSocket() {
  }
};
var Server2 = class extends Server {
  timeout = 0;
  keepAliveTimeout = 5e3;
  headersTimeout = 6e4;
  requestTimeout = 3e5;
  maxHeadersCount = null;
  maxRequestsPerSocket = 0;
  constructor(opts, listener) {
    super();
    if (typeof opts === "function") listener = opts;
    if (listener) this.on("request", listener);
  }
  _kind() {
    return "http";
  }
  _onListen(port) {
    registerListener(port, { onRequest: (msg) => this._handle(msg) });
  }
  _onClose(port) {
    unregisterListener(port);
  }
  setTimeout(ms, cb) {
    this.timeout = ms;
    if (cb) this.on("timeout", cb);
    return this;
  }
  closeAllConnections() {
  }
  closeIdleConnections() {
  }
  _handle(msg) {
    const socket = new Socket();
    socket.localPort = this._port;
    const req = new IncomingMessage(socket);
    req.method = msg.method;
    req.url = msg.url;
    req._setHeaders(msg.headers);
    if (msg.upgrade) {
      this._handleUpgrade(msg, req);
      return;
    }
    const res = new ServerResponse(req, msg.rid);
    if (msg.hasBody) {
      onReqBody(msg.rid, {
        onData: (d) => req.push(import_buffer8.Buffer.from(d)),
        onEnd: () => {
          req.complete = true;
          req.push(null);
        },
        onAbort: () => {
          req.aborted = true;
          req.destroy();
          res.destroy();
        }
      });
    } else {
      req.complete = true;
      req.push(null);
    }
    try {
      if (req.headers.expect === "100-continue" && this.listenerCount("checkContinue")) this.emit("checkContinue", req, res);
      else this.emit("request", req, res);
    } catch (e) {
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end(String(e?.stack ?? e));
      }
      throw e;
    }
  }
  /** WebSocket upgrade: hand the listener a socket that speaks the wire protocol. */
  _handleUpgrade(msg, req) {
    if (this.listenerCount("upgrade") === 0) {
      wsClose(msg.rid, 1011, "no upgrade handler");
      return;
    }
    let handshakeDone = false;
    let headBuf = "";
    const parser = new FrameParser((opcode, payload) => {
      if (opcode === 1) wsSend(msg.rid, new TextDecoder().decode(payload), false);
      else if (opcode === 2) wsSend(msg.rid, payload, true);
      else if (opcode === 8) {
        const code = payload.length >= 2 ? payload[0] << 8 | payload[1] : 1005;
        const reason = new TextDecoder().decode(payload.subarray(2));
        wsClose(msg.rid, code, reason);
        socket.destroy();
      } else if (opcode === 9) socket._feed(encodeClientFrame(payload, 10));
    });
    const socket = new Socket({
      _sink: (d) => {
        if (handshakeDone) {
          parser.push(d);
          return;
        }
        headBuf += new TextDecoder("latin1").decode(d);
        const end = headBuf.indexOf("\r\n\r\n");
        if (end === -1) return;
        const head = headBuf.slice(0, end);
        const rest = headBuf.slice(end + 4);
        handshakeDone = true;
        const lines = head.split("\r\n");
        const status = Number(lines[0].split(" ")[1]);
        const hdrs = lines.slice(1).map((l) => {
          const i2 = l.indexOf(":");
          return [l.slice(0, i2).trim(), l.slice(i2 + 1).trim()];
        });
        if (status !== 101) {
          wsClose(msg.rid, 1002, `handshake rejected (${status})`);
          socket.destroy();
          return;
        }
        const proto2 = hdrs.find(([k]) => k.toLowerCase() === "sec-websocket-protocol")?.[1] ?? null;
        wsAccept(msg.rid, proto2, hdrs);
        if (rest) parser.push(Uint8Array.from(rest, (c) => c.charCodeAt(0)));
      },
      _onEnd: () => {
        wsClose(msg.rid, 1e3, "");
      }
    });
    socket.localPort = this._port;
    req.socket = socket;
    req.connection = socket;
    onWs(msg.rid, {
      onMessage: (data, binary) => {
        const bytes2 = typeof data === "string" ? new TextEncoder().encode(data) : data;
        socket._feed(encodeClientFrame(bytes2, binary ? 2 : 1));
      },
      onClose: (code) => {
        const p = new Uint8Array([code >> 8, code & 255]);
        socket._feed(encodeClientFrame(p, 8));
        setTimeout(() => socket.destroy(), 100);
      }
    });
    if (!req.headers["sec-websocket-key"]) {
      const key = btoa(String.fromCharCode(...getRandomValues(new Uint8Array(16))));
      req.headers["sec-websocket-key"] = key;
      req.rawHeaders.push("Sec-WebSocket-Key", key);
    }
    if (!req.headers["sec-websocket-version"]) {
      req.headers["sec-websocket-version"] = "13";
      req.rawHeaders.push("Sec-WebSocket-Version", "13");
    }
    req.headers.upgrade ??= "websocket";
    req.headers.connection ??= "Upgrade";
    this.emit("upgrade", req, socket, import_buffer8.Buffer.alloc(0));
  }
};
function createServer2(opts, listener) {
  return new Server2(opts, listener);
}
var Agent = class extends EventEmitter {
  maxSockets;
  maxFreeSockets;
  keepAlive;
  options;
  sockets = {};
  freeSockets = {};
  requests = {};
  defaultPort = 80;
  protocol = "http:";
  constructor(opts = {}) {
    super();
    this.options = opts;
    this.maxSockets = opts.maxSockets ?? Infinity;
    this.maxFreeSockets = opts.maxFreeSockets ?? 256;
    this.keepAlive = !!opts.keepAlive;
  }
  destroy() {
  }
  getName(o = {}) {
    return `${o.host ?? "localhost"}:${o.port ?? ""}:${o.localAddress ?? ""}`;
  }
  createConnection() {
    return new Socket();
  }
};
var globalAgent = new Agent();
var ClientRequest = class extends OutgoingMessage {
  method;
  path;
  host;
  protocol;
  aborted = false;
  reusedSocket = false;
  maxHeadersCount = null;
  chunks = [];
  url;
  ctrl = new AbortController();
  handle = new Handle();
  res = null;
  constructor(url, opts, cb) {
    super();
    this.url = url;
    this.method = String(opts.method ?? "GET").toUpperCase();
    this.path = url.pathname + url.search;
    this.host = url.hostname;
    this.protocol = url.protocol;
    if (cb) this.once("response", cb);
    const headers = opts.headers;
    if (Array.isArray(headers)) {
      for (let i2 = 0; i2 < headers.length; i2 += 2) this.appendHeader(headers[i2], headers[i2 + 1]);
    } else if (headers) {
      for (const k of Object.keys(headers)) if (headers[k] !== void 0) this.setHeader(k, headers[k]);
    }
    if (opts.auth && !this.hasHeader("authorization")) this.setHeader("Authorization", "Basic " + btoa(opts.auth));
    if (opts.signal) opts.signal.addEventListener("abort", () => this.destroy(Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR" })));
    if (opts.timeout) this.setTimeout(opts.timeout);
    this.socket = new Socket();
    this.connection = this.socket;
    this.handle.activate();
    nextTick(() => this.emit("socket", this.socket));
  }
  _write(chunk, enc4, cb) {
    this.chunks.push(typeof chunk === "string" ? import_buffer8.Buffer.from(chunk, enc4) : import_buffer8.Buffer.from(chunk));
    cb();
  }
  _final(cb) {
    this.headersSent = true;
    cb();
    this._send();
  }
  async _send() {
    const body = this.chunks.length ? import_buffer8.Buffer.concat(this.chunks) : null;
    const headers = this._headerPairs();
    try {
      let res;
      if (isLoopbackHost(this.url.hostname)) {
        const port = Number(this.url.port || (this.url.protocol === "https:" ? 443 : 80));
        if (!virtualPortExists(port)) throw Object.assign(new Error(`connect ECONNREFUSED 127.0.0.1:${port}`), { code: "ECONNREFUSED", errno: -111, syscall: "connect", address: "127.0.0.1", port });
        res = await loopbackFetch(this.url, this.method, headers, body, this.ctrl.signal);
      } else {
        res = await proxyFetch(this.url.href, { method: this.method, headers, body, signal: this.ctrl.signal, redirect: "follow" });
      }
      const msg = new IncomingMessage(this.socket);
      msg.statusCode = res.status;
      msg.statusMessage = res.statusText || STATUS_CODES[res.status] || "";
      msg.url = "";
      msg._setHeaders([...res.headers]);
      this.res = msg;
      this.emit("response", msg);
      if (!res.body) {
        msg.complete = true;
        msg.push(null);
        this.handle.deactivate();
        this.emit("close");
        return;
      }
      const reader = res.body.getReader();
      for (; ; ) {
        const { value, done } = await reader.read();
        if (done) break;
        msg.push(import_buffer8.Buffer.from(value));
      }
      msg.complete = true;
      msg.push(null);
      this.handle.deactivate();
      msg.once("end", () => this.emit("close"));
    } catch (e) {
      this.handle.deactivate();
      if (this.aborted) return;
      const err3 = e?.cause && e.message === "fetch failed" ? Object.assign(new Error(e.cause.message), { code: e.cause.code ?? "ECONNREFUSED" }) : e;
      this.emit("error", err3);
      this.emit("close");
    }
  }
  abort() {
    if (this.aborted) return;
    this.aborted = true;
    this.ctrl.abort();
    this.handle.deactivate();
    nextTick(() => {
      this.emit("abort");
      this.emit("close");
    });
  }
  _destroy(err3, cb) {
    this.ctrl.abort();
    this.handle.deactivate();
    cb(err3);
  }
  setNoDelay() {
  }
  setSocketKeepAlive() {
  }
  setTimeout(ms, cb) {
    if (cb) this.once("timeout", cb);
    if (ms > 0) {
      const t = setTimeout(() => this.emit("timeout"), ms);
      this.once("response", () => clearTimeout(t));
      this.once("error", () => clearTimeout(t));
    }
    return this;
  }
};
function makeRequest(defaultProtocol) {
  return function request2(urlOrOpts, optsOrCb, cb) {
    let url;
    let opts;
    if (typeof urlOrOpts === "string" || urlOrOpts instanceof URL) {
      url = new URL(String(urlOrOpts));
      if (typeof optsOrCb === "function") {
        cb = optsOrCb;
        opts = {};
      } else opts = optsOrCb ?? {};
    } else {
      opts = urlOrOpts ?? {};
      cb = optsOrCb;
      const protocol = opts.protocol ?? defaultProtocol;
      const host = opts.hostname ?? (opts.host ? String(opts.host).replace(/:\d+$/, "") : "localhost");
      const port = opts.port ?? (opts.host && /:\d+$/.test(opts.host) ? opts.host.split(":").pop() : "");
      url = new URL(`${protocol}//${host.includes(":") ? `[${host}]` : host}${port ? `:${port}` : ""}${opts.path ?? "/"}`);
    }
    if (opts.method === void 0 && typeof urlOrOpts === "object" && !(urlOrOpts instanceof URL)) opts.method = urlOrOpts.method;
    return new ClientRequest(url, opts, cb);
  };
}
var request = makeRequest("http:");
function get(...args) {
  const req = request(...args);
  req.end();
  return req;
}
function setMaxIdleHTTPParsers() {
}
var WebSocket = globalThis.WebSocket;
var CloseEvent = globalThis.CloseEvent;
var MessageEvent = globalThis.MessageEvent;
var httpModule = { METHODS, STATUS_CODES, maxHeaderSize, validateHeaderName, validateHeaderValue, IncomingMessage, OutgoingMessage, ServerResponse, Server: Server2, createServer: createServer2, Agent, globalAgent, ClientRequest, request, get, setMaxIdleHTTPParsers, WebSocket, CloseEvent, MessageEvent };
var http_default = httpModule;
var httpsRequest = makeRequest("https:");
var HttpsAgent = class extends Agent {
  defaultPort = 443;
  protocol = "https:";
};
var https = {
  ...httpModule,
  Agent: HttpsAgent,
  globalAgent: new HttpsAgent(),
  request: httpsRequest,
  get(...args) {
    const req = httpsRequest(...args);
    req.end();
    return req;
  },
  createServer: (opts, listener) => new Server2(opts, listener),
  Server: Server2
};

// src/node/misc.ts
var import_buffer10 = __toESM(require_buffer(), 1);
init_events();

// src/node/process.ts
var import_buffer9 = __toESM(require_buffer(), 1);
init_events();
init_version();
init_version();
var textEncoder = new TextEncoder();
var StdWriteStream = class extends Writable {
  fd;
  isTTY;
  columns;
  rows;
  _type;
  _isStdio = true;
  constructor(fd2, tty2) {
    super({ decodeStrings: false, emitClose: false, autoDestroy: false });
    this.fd = fd2;
    this.isTTY = !!tty2;
    this._type = tty2 ? "tty" : "pipe";
    if (tty2) {
      this.columns = tty2.cols;
      this.rows = tty2.rows;
    }
  }
  _write(chunk, encoding, cb) {
    try {
      const bytes2 = typeof chunk === "string" ? encoding && encoding !== "utf8" && encoding !== "buffer" ? import_buffer9.Buffer.from(chunk, encoding) : textEncoder.encode(chunk) : chunk;
      sys("write", { fd: this.fd, pos: null }, bytes2);
      cb();
    } catch (e) {
      if (e instanceof SysError && e.code === "EPIPE") {
        cb();
        return;
      }
      cb(e);
    }
  }
  _writev(chunks, cb) {
    const parts = chunks.map(({ chunk, encoding }) => typeof chunk === "string" ? import_buffer9.Buffer.from(chunk, encoding) : chunk);
    this._write(import_buffer9.Buffer.concat(parts), "buffer", cb);
  }
  /** Writes synchronously (bypasses stream buffering), as stdout/stderr do in Node for TTYs/files. */
  write(chunk, encoding, cb) {
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = void 0;
    }
    if (this.destroyed || this.writableEnded) return super.write(chunk, encoding, cb);
    if (typeof chunk === "string" || chunk instanceof Uint8Array) {
      this._write(chunk, encoding ?? "utf8", (e) => {
        if (e) this.destroy(e);
        if (cb) nextTick(cb, e ?? null);
      });
      return true;
    }
    return super.write(chunk, encoding, cb);
  }
  getColorDepth(env = globalThis.process.env) {
    if (env.FORCE_COLOR !== void 0) {
      const v = env.FORCE_COLOR;
      if (v === "" || v === "1" || v === "true") return 4;
      if (v === "2") return 8;
      if (v === "3") return 24;
      return 1;
    }
    if (env.NO_COLOR !== void 0 || env.NODE_DISABLE_COLORS !== void 0 || env.TERM === "dumb") return 1;
    if (!this.isTTY) return 1;
    if (env.COLORTERM === "truecolor" || env.COLORTERM === "24bit") return 24;
    return 8;
  }
  hasColors(count = 16, env) {
    if (typeof count === "object") {
      env = count;
      count = 16;
    }
    return count <= 2 ** this.getColorDepth(env);
  }
  getWindowSize() {
    return [this.columns ?? 80, this.rows ?? 24];
  }
  cursorTo(x2, y, cb) {
    if (typeof y === "function") {
      cb = y;
      y = void 0;
    }
    return this.write(typeof y === "number" ? `\x1B[${y + 1};${x2 + 1}H` : `\x1B[${x2 + 1}G`, cb);
  }
  moveCursor(dx, dy, cb) {
    let s = "";
    if (dx < 0) s += `\x1B[${-dx}D`;
    else if (dx > 0) s += `\x1B[${dx}C`;
    if (dy < 0) s += `\x1B[${-dy}A`;
    else if (dy > 0) s += `\x1B[${dy}B`;
    return this.write(s, cb);
  }
  clearLine(dir, cb) {
    return this.write(dir < 0 ? "\x1B[1K" : dir > 0 ? "\x1B[0K" : "\x1B[2K", cb);
  }
  clearScreenDown(cb) {
    return this.write("\x1B[0J", cb);
  }
  _refreshSize(cols, rows) {
    if (cols === this.columns && rows === this.rows) return;
    this.columns = cols;
    this.rows = rows;
    this.emit("resize");
  }
  destroy(err3) {
    if (err3) this.emit("error", err3);
    return this;
  }
  end(...args) {
    const cb = args.find((a) => typeof a === "function");
    const data = args.find((a) => typeof a === "string" || a instanceof Uint8Array);
    if (data) this.write(data);
    if (cb) nextTick(cb);
    return this;
  }
};
var StdReadStream = class extends Readable {
  fd = 0;
  isTTY;
  isRaw = false;
  stop;
  handle = new Handle();
  constructor(tty2) {
    super({ highWaterMark: 64 * 1024, autoDestroy: false });
    this.isTTY = tty2;
  }
  _read() {
    if (this.stop) return;
    this.handle.activate();
    this.stop = startReading(0, (d) => {
      if (d === null) {
        this.stop = void 0;
        this.handle.deactivate();
        this.push(null);
        return;
      }
      if (!this.push(import_buffer9.Buffer.from(d))) {
        this.stop?.();
        this.stop = void 0;
        this.handle.deactivate();
      }
    });
  }
  pause() {
    super.pause();
    this.stop?.();
    this.stop = void 0;
    this.handle.deactivate();
    return this;
  }
  setRawMode(mode) {
    this.isRaw = !!mode;
    try {
      sys("setRawMode", { fd: 0, raw: !!mode });
    } catch {
    }
    return this;
  }
  ref() {
    this.handle.ref();
    return this;
  }
  unref() {
    this.handle.unref();
    return this;
  }
  destroy(err3) {
    this.stop?.();
    this.stop = void 0;
    this.handle.deactivate();
    return super.destroy(err3);
  }
};
function createProcess(init2) {
  const proc4 = new EventEmitter();
  let cwd = init2.cwd;
  const envTarget = { ...init2.env };
  proc4.env = new Proxy(envTarget, {
    set(t, k, v) {
      if (typeof k === "string") t[k] = String(v);
      return true;
    },
    defineProperty(t, k, d) {
      if (typeof k === "string") t[k] = String(d.value);
      return true;
    },
    deleteProperty(t, k) {
      if (typeof k === "string") delete t[k];
      return true;
    }
  });
  proc4.title = "node";
  proc4.argv = init2.argv;
  proc4.argv0 = "node";
  proc4.execArgv = init2.execArgv;
  proc4.execPath = "/usr/bin/node";
  proc4.pid = init2.pid;
  proc4.ppid = init2.ppid;
  proc4.platform = "linux";
  proc4.arch = "x64";
  proc4.version = "v" + NODE_VERSION;
  proc4.versions = {
    node: NODE_VERSION,
    acorn: "8.14.0",
    ada: "2.9.2",
    ares: "1.34.5",
    brotli: "1.1.0",
    cjs_module_lexer: "2.1.0",
    icu: "76.1",
    llhttp: "9.2.1",
    modules: "127",
    napi: "10",
    nghttp2: "1.64.0",
    openssl: "3.0.15+quic",
    simdjson: "3.10.1",
    simdutf: "6.0.3",
    tz: "2025a",
    undici: "6.21.1",
    unicode: "16.0",
    uv: "1.49.2",
    uvwasi: "0.0.21",
    v8: "12.4.254.21-node.33",
    zlib: "1.3.0.1-motley",
    openvessel: "0.1.0"
  };
  proc4.release = { name: "node", lts: "Jod", sourceUrl: "", headersUrl: "" };
  proc4.config = { variables: { napi_build_version: "10", node_shared: false } };
  proc4.features = { inspector: false, debug: false, uv: true, ipv6: true, tls_alpn: true, tls_sni: true, tls_ocsp: true, tls: true, cached_builtins: true, typescript: "strip", require_module: true };
  proc4.allowedNodeEnvironmentFlags = /* @__PURE__ */ new Set();
  proc4.exitCode = void 0;
  proc4.connected = false;
  proc4.channel = void 0;
  proc4.noDeprecation = false;
  proc4.throwDeprecation = false;
  proc4.traceDeprecation = false;
  proc4.sourceMapsEnabled = false;
  proc4.cwd = () => cwd;
  proc4.chdir = (dir) => {
    const target = dir.startsWith("/") ? dir : `${cwd}/${dir}`;
    try {
      cwd = sys("chdir", { p: target });
    } catch (e) {
      const err3 = new Error(`ENOENT: no such file or directory, chdir ${cwd} -> '${dir}'`);
      err3.code = e.code ?? "ENOENT";
      err3.syscall = "chdir";
      err3.path = dir;
      throw err3;
    }
  };
  proc4.umask = (m) => {
    if (m === void 0) return sys("umask");
    let mask = m ?? void 0;
    if (typeof mask === "string") {
      if (!/^[0-7]+$/.test(mask)) {
        throw Object.assign(new TypeError(`The argument 'mask' must be a 32-bit unsigned integer or an octal string. Received '${mask}'`), { code: "ERR_INVALID_ARG_VALUE" });
      }
      mask = parseInt(mask, 8);
    }
    if (typeof mask !== "number") {
      const got = mask === void 0 ? "undefined" : typeof mask === "object" ? `an instance of ${mask.constructor?.name ?? "Object"}` : `type ${typeof mask} (${String(mask)})`;
      throw Object.assign(new TypeError(`The "mask" argument must be of type number. Received ${got}`), { code: "ERR_INVALID_ARG_TYPE" });
    }
    if (!Number.isInteger(mask)) {
      throw Object.assign(new RangeError(`The value of "mask" is out of range. It must be an integer. Received ${mask}`), { code: "ERR_OUT_OF_RANGE" });
    }
    if (mask < 0 || mask > 4294967295) {
      throw Object.assign(new RangeError(`The value of "mask" is out of range. It must be >= 0 && <= 4294967295. Received ${mask}`), { code: "ERR_OUT_OF_RANGE" });
    }
    return sys("umask", { mask });
  };
  proc4.getuid = () => 1e3;
  proc4.geteuid = () => 1e3;
  proc4.getgid = () => 1e3;
  proc4.getegid = () => 1e3;
  proc4.getgroups = () => [1e3];
  proc4.setuid = proc4.setgid = proc4.seteuid = proc4.setegid = proc4.setgroups = () => {
  };
  proc4.nextTick = nextTick;
  const t0 = perfNow();
  proc4.hrtime = (prev) => {
    const now = perfNow();
    const sec = Math.floor((timeOrigin + now) / 1e3);
    const ns = Math.floor((timeOrigin + now) % 1e3 * 1e6);
    if (prev) {
      let ds = sec - prev[0];
      let dn = ns - prev[1];
      if (dn < 0) {
        ds--;
        dn += 1e9;
      }
      return [ds, dn];
    }
    return [sec, ns];
  };
  proc4.hrtime.bigint = () => BigInt(Math.floor((timeOrigin + perfNow()) * 1e6));
  proc4.uptime = () => (perfNow() - t0) / 1e3;
  proc4.memoryUsage = () => {
    const m = performance.memory;
    const used = m?.usedJSHeapSize ?? 5e7;
    return { rss: used * 1.5, heapTotal: m?.totalJSHeapSize ?? used, heapUsed: used, external: 0, arrayBuffers: 0 };
  };
  proc4.memoryUsage.rss = () => proc4.memoryUsage().rss;
  proc4.cpuUsage = (prev) => {
    const user = Math.floor((perfNow() - t0) * 1e3);
    return prev ? { user: user - prev.user, system: 0 } : { user, system: 0 };
  };
  proc4.resourceUsage = () => ({ userCPUTime: Math.floor((perfNow() - t0) * 1e3), systemCPUTime: 0, maxRSS: 1e5, fsRead: 0, fsWrite: 0 });
  proc4.constrainedMemory = () => 0;
  proc4.availableMemory = () => 4 * 1024 ** 3;
  proc4.kill = (pid, sig = "SIGTERM") => {
    if (sig === 0) {
      try {
        sys("kill", { pid, sig: 0 });
      } catch (e) {
        const err3 = new Error("kill ESRCH");
        err3.code = "ESRCH";
        err3.syscall = "kill";
        throw err3;
      }
      return true;
    }
    sys("kill", { pid, sig });
    return true;
  };
  proc4.abort = () => proc4.reallyExit(134);
  proc4.binding = (name) => {
    if (name === "natives") return {};
    if (name === "constants") return { os: {}, fs: {} };
    throw new Error(`No such module: ${name}`);
  };
  proc4._linkedBinding = proc4.binding;
  proc4.dlopen = (_module, filename) => {
    let message = "Native addons (.node files) cannot run in OpenVessel. Use the WebAssembly build of the package.";
    try {
      const head = sys("readFile", { p: String(filename) });
      if (head.length < 64) message = `${filename}: file too short`;
      else if (head[0] !== 127 || head[1] !== 69 || head[2] !== 76 || head[3] !== 70) message = `${filename}: invalid ELF header`;
    } catch {
      message = `${filename}: cannot open shared object file: No such file or directory`;
    }
    throw Object.assign(new Error(message), { code: "ERR_DLOPEN_FAILED" });
  };
  proc4.emitWarning = (warning, type2, code) => {
    let name = "Warning";
    let msg = warning;
    if (typeof type2 === "object" && type2) {
      code = type2.code;
      name = type2.type ?? name;
    } else if (typeof type2 === "string") name = type2;
    const w = typeof msg === "string" ? Object.assign(new Error(msg), { name }) : msg;
    if (code) w.code = code;
    if (name === "DeprecationWarning" && proc4.noDeprecation) return;
    nextTick(() => {
      proc4.emit("warning", w);
      if (proc4.listenerCount("warning") <= 1 && !proc4.execArgv.includes("--no-warnings") && !String(proc4.env.NODE_NO_WARNINGS).startsWith("1")) {
        try {
          sys("write", { fd: 2, pos: null }, textEncoder.encode(`(node:${proc4.pid}) ${code ? `[${code}] ` : ""}${w.name}: ${w.message}
`));
        } catch {
        }
      }
    });
  };
  proc4.on("warning", () => {
  });
  let captureCb = null;
  proc4.setUncaughtExceptionCaptureCallback = (fn) => {
    captureCb = fn;
  };
  proc4.hasUncaughtExceptionCaptureCallback = () => captureCb !== null;
  proc4._captureCb = () => captureCb;
  proc4.setSourceMapsEnabled = (v) => {
    proc4.sourceMapsEnabled = v;
  };
  proc4.loadEnvFile = (p = ".env") => {
    const text = globalThis.__ov.builtin("fs").readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const m = /^\s*(?:export\s+)?([\w.-]+)\s*=\s*(.*)?\s*$/.exec(line);
      if (!m) continue;
      let v = (m[2] ?? "").trim();
      if (/^(['"`]).*\1$/.test(v)) v = v.slice(1, -1);
      if (proc4.env[m[1]] === void 0) proc4.env[m[1]] = v;
    }
  };
  proc4.getBuiltinModule = (id) => {
    try {
      return globalThis.__ov.builtin(id.replace(/^node:/, ""));
    } catch {
      return void 0;
    }
  };
  proc4.report = { getReport: () => ({ header: { glibcVersionRuntime: "2.36" }, sharedObjects: [] }), directory: "", filename: "", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, signal: "SIGUSR2", writeReport: () => "" };
  proc4.stdout = new StdWriteStream(1, init2.ttys[1] ?? null);
  proc4.stderr = new StdWriteStream(2, init2.ttys[2] ?? null);
  let stdin = null;
  Object.defineProperty(proc4, "stdin", {
    configurable: true,
    enumerable: true,
    get() {
      stdin ??= new StdReadStream(!!init2.ttys[0]);
      return stdin;
    }
  });
  proc4.openStdin = () => {
    proc4.stdin.resume();
    return proc4.stdin;
  };
  const SIGS = /* @__PURE__ */ new Set(["SIGINT", "SIGTERM", "SIGHUP", "SIGQUIT", "SIGUSR1", "SIGUSR2", "SIGWINCH", "SIGBREAK", "SIGPIPE", "SIGCONT", "SIGTSTP"]);
  proc4.on("newListener", (ev) => {
    if (SIGS.has(ev) && proc4.listenerCount(ev) === 0) {
      try {
        sys("sigaction", { sig: ev, on: true });
      } catch {
      }
    }
  });
  proc4.on("removeListener", (ev) => {
    if (SIGS.has(ev) && proc4.listenerCount(ev) === 0) {
      try {
        sys("sigaction", { sig: ev, on: false });
      } catch {
      }
    }
  });
  proc4.ref = (h) => h?.ref?.();
  proc4.unref = (h) => h?.unref?.();
  proc4._getActiveHandles = () => [];
  proc4._getActiveRequests = () => [];
  proc4.getActiveResourcesInfo = () => [];
  void ref;
  void unref;
  return proc4;
}

// src/node/misc.ts
function makeConsole(stdout, stderr, opts = {}) {
  const out3 = stdout;
  const err3 = stderr ?? stdout;
  let indent2 = "";
  const counts2 = /* @__PURE__ */ new Map();
  const timers2 = /* @__PURE__ */ new Map();
  const colors = () => opts.colorMode === "auto" || opts.colorMode === void 0 ? !!out3?.isTTY && out3?.getColorDepth?.() > 2 : !!opts.colorMode;
  const write2 = (stream, s) => {
    const text = indent2 ? s.replace(/^/gm, indent2) : s;
    stream.write(text + "\n");
  };
  const fmt = (args) => formatWithOptions({ colors: colors() }, ...args);
  const c = {
    log: (...a) => write2(out3, fmt(a)),
    info: (...a) => write2(out3, fmt(a)),
    debug: (...a) => write2(out3, fmt(a)),
    warn: (...a) => write2(err3, fmt(a)),
    error: (...a) => write2(err3, fmt(a)),
    trace: (...a) => {
      const e = new Error(format(...a));
      e.name = "Trace";
      write2(err3, (e.stack ?? "").replace(/\n\s+at [^\n]*makeConsole[^\n]*/, ""));
    },
    dir: (o, o2) => write2(out3, inspect(o, { colors: colors(), ...o2 ?? {} })),
    dirxml: (...a) => write2(out3, fmt(a)),
    assert: (v, ...a) => {
      if (!v) write2(err3, "Assertion failed" + (a.length ? ": " + fmt(a) : ""));
    },
    count: (label = "default") => {
      const n = (counts2.get(label) ?? 0) + 1;
      counts2.set(label, n);
      write2(out3, `${label}: ${n}`);
    },
    countReset: (label = "default") => counts2.delete(label),
    time: (label = "default") => timers2.set(label, perfNow()),
    timeEnd: (label = "default") => {
      const t = timers2.get(label);
      if (t === void 0) return;
      timers2.delete(label);
      write2(out3, `${label}: ${fmtMs(perfNow() - t)}`);
    },
    timeLog: (label = "default", ...a) => {
      const t = timers2.get(label);
      if (t === void 0) return;
      write2(out3, `${label}: ${fmtMs(perfNow() - t)}${a.length ? " " + fmt(a) : ""}`);
    },
    group: (...a) => {
      if (a.length) write2(out3, fmt(a));
      indent2 += " ".repeat(opts.groupIndentation ?? 2);
    },
    groupCollapsed: (...a) => c.group(...a),
    groupEnd: () => {
      indent2 = indent2.slice(opts.groupIndentation ?? 2);
    },
    table: (data, cols) => write2(out3, table(data, cols)),
    clear: () => {
      if (out3.isTTY) out3.write("\x1B[1;1H\x1B[0J");
    },
    profile: () => {
    },
    profileEnd: () => {
    },
    timeStamp: () => {
    },
    context: () => c,
    createTask: () => ({ run: (fn) => fn() })
  };
  return c;
}
function fmtMs(ms) {
  if (ms >= 1e3) return `${(ms / 1e3).toFixed(3)}s`;
  return `${ms.toFixed(3)}ms`;
}
function table(data, cols) {
  if (data === null || typeof data !== "object") return String(data);
  const rows = Object.keys(data);
  const keys = /* @__PURE__ */ new Set();
  let hasValues = false;
  for (const r of rows) {
    const v = data[r];
    if (v !== null && typeof v === "object") for (const k of Object.keys(v)) keys.add(k);
    else hasValues = true;
  }
  const header = ["(index)", ...cols ?? [...keys], ...hasValues ? ["Values"] : []];
  const body = rows.map((r) => {
    const v = data[r];
    const cells = (cols ?? [...keys]).map((k) => v !== null && typeof v === "object" && k in v ? inspect(v[k]) : "");
    return [r, ...cells, ...hasValues ? [v !== null && typeof v === "object" ? "" : inspect(v)] : []];
  });
  const widths = header.map((h, i2) => Math.max(h.length, ...body.map((b) => b[i2].length)) + 2);
  const line = (l, m, r) => l + widths.map((w) => "\u2500".repeat(w)).join(m) + r;
  const row = (cells) => "\u2502" + cells.map((c, i2) => c.padStart(Math.floor((widths[i2] + c.length) / 2)).padEnd(widths[i2])).join("\u2502") + "\u2502";
  return [line("\u250C", "\u252C", "\u2510"), row(header), line("\u251C", "\u253C", "\u2524"), ...body.map(row), line("\u2514", "\u2534", "\u2518")].join("\n");
}
var ConsoleCtor = class {
  constructor(stdout, stderr, ignoreErrors) {
    let opts = { stdout, stderr };
    if (stdout && !stdout.write && stdout.stdout) opts = stdout;
    void ignoreErrors;
    return makeConsole(opts.stdout, opts.stderr, opts);
  }
};
function isatty(fd2) {
  try {
    return !!sys("isatty", { fd: fd2 });
  } catch {
    return false;
  }
}
var tty = { isatty, ReadStream: StdReadStream, WriteStream: StdWriteStream };
var timersPromises = {
  setTimeout(ms, value, opts = {}) {
    return new Promise((resolve3, reject) => {
      if (opts.signal?.aborted) return reject(abortErr(opts.signal));
      const t = setTimeout2(() => resolve3(value), ms);
      if (opts.ref === false) t.unref();
      opts.signal?.addEventListener("abort", () => {
        clearTimeout2(t);
        reject(abortErr(opts.signal));
      });
    });
  },
  setImmediate(value, opts = {}) {
    return new Promise((resolve3, reject) => {
      if (opts.signal?.aborted) return reject(abortErr(opts.signal));
      const i2 = setImmediate2(() => resolve3(value));
      if (opts.ref === false) i2.unref();
    });
  },
  async *setInterval(ms, value, opts = {}) {
    let pending = 0;
    let wake = null;
    const t = setInterval2(() => {
      pending++;
      wake?.();
    }, ms);
    if (opts.ref === false) t.unref();
    try {
      for (; ; ) {
        if (opts.signal?.aborted) throw abortErr(opts.signal);
        if (!pending) await new Promise((r) => wake = r);
        wake = null;
        pending--;
        yield value;
      }
    } finally {
      clearInterval2(t);
    }
  },
  scheduler: {
    wait: (ms, opts) => timersPromises.setTimeout(ms, void 0, opts),
    yield: () => timersPromises.setImmediate()
  }
};
function abortErr(signal) {
  return Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR", cause: signal.reason });
}
var timers = {
  setTimeout: setTimeout2,
  clearTimeout: clearTimeout2,
  setInterval: setInterval2,
  clearInterval: clearInterval2,
  setImmediate: setImmediate2,
  clearImmediate,
  promises: timersPromises,
  active: (t) => t?.refresh?.(),
  unenroll: (t) => clearTimeout2(t),
  enroll: () => {
  }
};
var kContext = /* @__PURE__ */ Symbol("vm.context");
var Script = class {
  constructor(code, opts = {}) {
    this.code = code;
    this.opts = opts;
    if (typeof opts === "string") this.opts = { filename: opts };
  }
  code;
  opts;
  runInThisContext(_o) {
    return runInThisContext(this.code, this.opts);
  }
  runInContext(ctx, _o) {
    return runInContext(this.code, ctx, this.opts);
  }
  runInNewContext(ctx, _o) {
    return runInNewContext(this.code, ctx, this.opts);
  }
  createCachedData() {
    return import_buffer10.Buffer.alloc(0);
  }
  cachedDataRejected = false;
};
function runInThisContext(code, opts) {
  const filename = typeof opts === "string" ? opts : opts?.filename;
  return (0, eval)(filename ? `${code}
//# sourceURL=${filename}` : code);
}
function createContext(sandbox = {}) {
  Object.defineProperty(sandbox, kContext, { value: true, enumerable: false });
  return sandbox;
}
function isContext(o) {
  return !!o?.[kContext];
}
function runInContext(code, ctx, opts) {
  const filename = typeof opts === "string" ? opts : opts?.filename;
  const fn = new Function("__ov_ctx", `with (__ov_ctx) { return eval(${JSON.stringify(code + (filename ? `
//# sourceURL=${filename}` : ""))}); }`);
  return fn(new Proxy(ctx, { has: (t, k) => k !== "__ov_ctx" && (k in t || !(k in globalThis)) }));
}
function runInNewContext(code, ctx = {}, opts) {
  return runInContext(code, createContext(ctx), opts);
}
function compileFunction(code, params = [], opts = {}) {
  const fn = new Function(...params, `${code}
//# sourceURL=${opts.filename ?? "vm.compileFunction"}`);
  return fn;
}
var vm = {
  Script,
  runInThisContext,
  runInContext,
  runInNewContext,
  createContext,
  isContext,
  compileFunction,
  measureMemory: () => Promise.resolve({ total: { jsMemoryEstimate: 0, jsMemoryRange: [0, 0] } }),
  constants: { USE_MAIN_CONTEXT_DEFAULT_LOADER: /* @__PURE__ */ Symbol("vm_dynamic_import_main_context_default"), DONT_CONTEXTIFY: /* @__PURE__ */ Symbol("vm_context_no_contextify") },
  SourceTextModule: void 0,
  SyntheticModule: void 0
};
var currentStores = /* @__PURE__ */ new Map();
var AsyncLocalStorage = class {
  enabled = true;
  static bind(fn) {
    const snap = new Map(currentStores);
    return function(...args) {
      const prev = currentStores;
      currentStores = snap;
      try {
        return fn.apply(this, args);
      } finally {
        currentStores = prev;
      }
    };
  }
  static snapshot() {
    const snap = new Map(currentStores);
    return (fn, ...args) => {
      const prev = currentStores;
      currentStores = snap;
      try {
        return fn(...args);
      } finally {
        currentStores = prev;
      }
    };
  }
  getStore() {
    return this.enabled ? currentStores.get(this) : void 0;
  }
  run(store, fn, ...args) {
    const prev = currentStores;
    const next = new Map(currentStores);
    next.set(this, store);
    currentStores = next;
    let r;
    try {
      r = fn(...args);
    } catch (e) {
      currentStores = prev;
      throw e;
    }
    if (r && typeof r.then === "function") {
      r.then(
        () => {
          if (currentStores === next) currentStores = prev;
        },
        () => {
          if (currentStores === next) currentStores = prev;
        }
      );
    } else currentStores = prev;
    return r;
  }
  exit(fn, ...args) {
    const prev = currentStores;
    const next = new Map(currentStores);
    next.delete(this);
    currentStores = next;
    try {
      return fn(...args);
    } finally {
      currentStores = prev;
    }
  }
  enterWith(store) {
    const next = new Map(currentStores);
    next.set(this, store);
    currentStores = next;
  }
  disable() {
    this.enabled = false;
  }
};
var AsyncResource = class _AsyncResource {
  type;
  snap = new Map(currentStores);
  constructor(type2, _opts) {
    this.type = type2;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    const prev = currentStores;
    currentStores = this.snap;
    try {
      return fn.apply(thisArg, args);
    } finally {
      currentStores = prev;
    }
  }
  bind(fn) {
    return ((...args) => this.runInAsyncScope(fn, void 0, ...args));
  }
  static bind(fn, type2 = "bound-anonymous-fn") {
    return new _AsyncResource(type2).bind(fn);
  }
  emitDestroy() {
    return this;
  }
  asyncId() {
    return 1;
  }
  triggerAsyncId() {
    return 0;
  }
};
var asyncHooks = {
  AsyncLocalStorage,
  AsyncResource,
  createHook: () => ({ enable() {
    return this;
  }, disable() {
    return this;
  } }),
  executionAsyncId: () => 1,
  triggerAsyncId: () => 0,
  executionAsyncResource: () => ({}),
  asyncWrapProviders: {}
};
var perfHooks = {
  performance: Object.assign(/* @__PURE__ */ Object.create(null), {
    now: () => perfNow(),
    timeOrigin: performance.timeOrigin,
    mark: (...a) => performance.mark(...a),
    measure: (...a) => performance.measure(...a),
    getEntries: () => performance.getEntries(),
    getEntriesByName: (n, t) => performance.getEntriesByName(n, t),
    getEntriesByType: (t) => performance.getEntriesByType(t),
    clearMarks: (n) => performance.clearMarks(n),
    clearMeasures: (n) => performance.clearMeasures(n),
    timerify: (fn) => fn,
    eventLoopUtilization: () => ({ idle: 0, active: 0, utilization: 0 }),
    nodeTiming: { name: "node", entryType: "node", startTime: 0, duration: perfNow(), nodeStart: 0, v8Start: 0, environment: 0, bootstrapComplete: 0, loopStart: 0, loopExit: -1, idleTime: 0 },
    toJSON: () => ({ timeOrigin: performance.timeOrigin })
  }),
  PerformanceObserver: globalThis.PerformanceObserver ?? class {
    observe() {
    }
    disconnect() {
    }
    static supportedEntryTypes = [];
  },
  PerformanceEntry: globalThis.PerformanceEntry,
  PerformanceMark: globalThis.PerformanceMark,
  PerformanceMeasure: globalThis.PerformanceMeasure,
  monitorEventLoopDelay: () => histogram(),
  createHistogram: () => histogram(),
  constants: { NODE_PERFORMANCE_GC_MAJOR: 4, NODE_PERFORMANCE_GC_MINOR: 1, NODE_PERFORMANCE_GC_INCREMENTAL: 8, NODE_PERFORMANCE_GC_WEAKCB: 16 }
};
function histogram() {
  return { enable() {
  }, disable() {
  }, reset() {
  }, percentile: () => 0, percentiles: /* @__PURE__ */ new Map(), min: 0, max: 0, mean: 0, stddev: 0, count: 0, exceeds: 0, record() {
  }, recordDelta() {
  } };
}
function fakeAddress(host, family = 4) {
  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host.endsWith(".localhost")) return family === 6 ? "::1" : "127.0.0.1";
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) return host;
  return family === 6 ? "64:ff9b::1" : "198.18.0.1";
}
var dns = {
  lookup(host, opts, cb) {
    if (typeof opts === "function") {
      cb = opts;
      opts = {};
    }
    if (typeof opts === "number") opts = { family: opts };
    const family = opts?.family === 6 ? 6 : 4;
    const address = fakeAddress(host, family);
    nextTick(() => opts?.all ? cb(null, [{ address, family }]) : cb(null, address, family));
  },
  lookupService(addr, port, cb) {
    nextTick(() => cb(null, addr === "127.0.0.1" ? "localhost" : addr, String(port)));
  },
  resolve: (_h, ...a) => {
    const cb = a.pop();
    nextTick(() => cb(Object.assign(new Error("queryA ENOTFOUND"), { code: "ENOTFOUND" })));
  },
  getDefaultResultOrder: () => "ipv4first",
  setDefaultResultOrder: () => {
  },
  getServers: () => ["127.0.0.53"],
  setServers: () => {
  },
  ADDRCONFIG: 1024,
  V4MAPPED: 2048,
  ALL: 256,
  NOTFOUND: "ENOTFOUND",
  promises: {
    lookup: async (host, opts = {}) => {
      if (typeof opts === "number") opts = { family: opts };
      const family = opts?.family === 6 ? 6 : 4;
      const address = fakeAddress(host, family);
      return opts?.all ? [{ address, family }] : { address, family };
    },
    resolve: async () => {
      throw Object.assign(new Error("queryA ENOTFOUND"), { code: "ENOTFOUND" });
    },
    resolve4: async () => {
      throw Object.assign(new Error("queryA ENOTFOUND"), { code: "ENOTFOUND" });
    },
    resolve6: async () => {
      throw Object.assign(new Error("queryAAAA ENOTFOUND"), { code: "ENOTFOUND" });
    },
    getDefaultResultOrder: () => "ipv4first",
    setDefaultResultOrder: () => {
    },
    Resolver: class {
      resolve4() {
        return Promise.reject(Object.assign(new Error("ENOTFOUND"), { code: "ENOTFOUND" }));
      }
      setServers() {
      }
    }
  },
  Resolver: class {
    resolve4(_h, cb) {
      nextTick(() => cb(Object.assign(new Error("ENOTFOUND"), { code: "ENOTFOUND" })));
    }
    setServers() {
    }
    cancel() {
    }
  }
};
var v8 = {
  getHeapStatistics: () => ({ total_heap_size: 5e7, total_heap_size_executable: 1e6, total_physical_size: 5e7, total_available_size: 4e9, used_heap_size: 4e7, heap_size_limit: 4e9, malloced_memory: 1e5, peak_malloced_memory: 1e6, does_zap_garbage: 0, number_of_native_contexts: 1, number_of_detached_contexts: 0, total_global_handles_size: 8192, used_global_handles_size: 2e3, external_memory: 0 }),
  getHeapSpaceStatistics: () => [],
  getHeapCodeStatistics: () => ({ code_and_metadata_size: 0, bytecode_and_metadata_size: 0, external_script_source_size: 0, cpu_profiler_metadata_size: 0 }),
  setFlagsFromString: () => {
  },
  cachedDataVersionTag: () => 0,
  serialize: (v) => import_buffer10.Buffer.from(new TextEncoder().encode(JSON.stringify(v))),
  deserialize: (b) => JSON.parse(new TextDecoder().decode(b)),
  writeHeapSnapshot: () => "",
  getHeapSnapshot: () => {
    throw new Error("not supported");
  },
  takeCoverage: () => {
  },
  stopCoverage: () => {
  },
  isStringOneByteRepresentation: (s) => /^[\x00-\xff]*$/.test(s),
  startupSnapshot: { isBuildingSnapshot: () => false, addSerializeCallback() {
  }, addDeserializeCallback() {
  }, setDeserializeMainFunction() {
  } },
  promiseHooks: { onInit: () => () => {
  }, onSettled: () => () => {
  }, onBefore: () => () => {
  }, onAfter: () => () => {
  }, createHook: () => () => {
  } },
  Serializer: class {
  },
  Deserializer: class {
  },
  DefaultSerializer: class {
  },
  DefaultDeserializer: class {
  },
  GCProfiler: class {
    start() {
    }
    stop() {
      return {};
    }
  }
};
var channels = /* @__PURE__ */ new Map();
var Channel = class {
  constructor(name) {
    this.name = name;
  }
  name;
  subs = /* @__PURE__ */ new Set();
  stores = /* @__PURE__ */ new Map();
  get hasSubscribers() {
    return this.subs.size > 0 || this.stores.size > 0;
  }
  publish(msg) {
    for (const s of this.subs) {
      try {
        s(msg, this.name);
      } catch (e) {
        nextTick(() => {
          throw e;
        });
      }
    }
  }
  subscribe(fn) {
    this.subs.add(fn);
  }
  unsubscribe(fn) {
    return this.subs.delete(fn);
  }
  bindStore(store, transform) {
    this.stores.set(store, transform ?? ((m) => m));
  }
  unbindStore(store) {
    return this.stores.delete(store);
  }
  runStores(data, fn, thisArg, ...args) {
    this.publish(data);
    return fn.apply(thisArg, args);
  }
};
function channel2(name) {
  let c = channels.get(name);
  if (!c) {
    c = new Channel(name);
    channels.set(name, c);
  }
  return c;
}
function tracingChannel(nameOrChannels) {
  const mk2 = (n) => typeof nameOrChannels === "string" ? channel2(`tracing:${nameOrChannels}:${n}`) : nameOrChannels[n];
  const t = { start: mk2("start"), end: mk2("end"), asyncStart: mk2("asyncStart"), asyncEnd: mk2("asyncEnd"), error: mk2("error") };
  Object.defineProperty(t, "hasSubscribers", { get: () => Object.values(t).some((c) => c?.hasSubscribers) });
  t.subscribe = (h) => {
    for (const k of Object.keys(h)) t[k]?.subscribe(h[k]);
  };
  t.unsubscribe = (h) => {
    for (const k of Object.keys(h)) t[k]?.unsubscribe(h[k]);
  };
  t.traceSync = (fn, ctx = {}, thisArg, ...args) => fn.apply(thisArg, args);
  t.tracePromise = (fn, ctx = {}, thisArg, ...args) => fn.apply(thisArg, args);
  t.traceCallback = (fn, _pos, ctx = {}, thisArg, ...args) => fn.apply(thisArg, args);
  return t;
}
var diagnosticsChannel = {
  channel: channel2,
  hasSubscribers: (n) => channels.get(n)?.hasSubscribers ?? false,
  subscribe: (n, fn) => channel2(n).subscribe(fn),
  unsubscribe: (n, fn) => channel2(n).unsubscribe(fn),
  tracingChannel,
  Channel
};
var BASE = 36;
var TMIN = 1;
var TMAX = 26;
var SKEW = 38;
var DAMP = 700;
function adapt(delta, num, first) {
  delta = first ? Math.floor(delta / DAMP) : delta >> 1;
  delta += Math.floor(delta / num);
  let k = 0;
  while (delta > (BASE - TMIN) * TMAX >> 1) {
    delta = Math.floor(delta / (BASE - TMIN));
    k += BASE;
  }
  return k + Math.floor((BASE - TMIN + 1) * delta / (delta + SKEW));
}
var digit = (d) => String.fromCharCode(d + 22 + 75 * +(d < 26));
function pEncode(input) {
  const cps = [...input].map((c) => c.codePointAt(0));
  let n = 128;
  let delta = 0;
  let bias = 72;
  let out3 = cps.filter((c) => c < 128).map((c) => String.fromCharCode(c)).join("");
  const b = out3.length;
  let h = b;
  if (b) out3 += "-";
  while (h < cps.length) {
    const m = Math.min(...cps.filter((c) => c >= n));
    delta += (m - n) * (h + 1);
    n = m;
    for (const c of cps) {
      if (c < n) delta++;
      if (c === n) {
        let q = delta;
        for (let k = BASE; ; k += BASE) {
          const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
          if (q < t) break;
          out3 += digit(t + (q - t) % (BASE - t));
          q = Math.floor((q - t) / (BASE - t));
        }
        out3 += digit(q);
        bias = adapt(delta, h + 1, h === b);
        delta = 0;
        h++;
      }
    }
    delta++;
    n++;
  }
  return out3;
}
function pDecode(input) {
  const out3 = [];
  let n = 128;
  let i2 = 0;
  let bias = 72;
  let basic = input.lastIndexOf("-");
  if (basic < 0) basic = 0;
  for (let j = 0; j < basic; j++) out3.push(input.charCodeAt(j));
  for (let idx = basic > 0 ? basic + 1 : 0; idx < input.length; ) {
    const oldi = i2;
    let w = 1;
    for (let k = BASE; ; k += BASE) {
      const cp2 = input.charCodeAt(idx++);
      const d = cp2 - 48 < 10 ? cp2 - 22 : cp2 - 65 < 26 ? cp2 - 65 : cp2 - 97 < 26 ? cp2 - 97 : BASE;
      i2 += d * w;
      const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
      if (d < t) break;
      w *= BASE - t;
    }
    bias = adapt(i2 - oldi, out3.length + 1, oldi === 0);
    n += Math.floor(i2 / (out3.length + 1));
    i2 %= out3.length + 1;
    out3.splice(i2++, 0, n);
  }
  return String.fromCodePoint(...out3);
}
var punycode = {
  version: "2.1.0",
  encode: pEncode,
  decode: pDecode,
  toASCII: (d) => d.split(".").map((l) => /[^\0-\x7f]/.test(l) ? "xn--" + pEncode(l) : l).join("."),
  toUnicode: (d) => d.split(".").map((l) => l.startsWith("xn--") ? pDecode(l.slice(4).toLowerCase()) : l).join("."),
  ucs2: { decode: (s) => [...s].map((c) => c.codePointAt(0)), encode: (a) => String.fromCodePoint(...a) }
};
var inspector = {
  open() {
  },
  close() {
  },
  url: () => void 0,
  waitForDebugger() {
  },
  console: globalThis.console,
  Session: class extends EventEmitter {
    connect() {
    }
    connectToMainThread() {
    }
    disconnect() {
    }
    post(_m, _p, cb) {
      cb?.(new Error("inspector is not available"));
    }
  },
  Network: { requestWillBeSent() {
  }, responseReceived() {
  }, loadingFinished() {
  }, loadingFailed() {
  } }
};
function unsupportedModule(name) {
  return new Proxy(
    {},
    {
      get(_t, k) {
        if (k === "__esModule" || typeof k === "symbol" || k === "then") return void 0;
        return function unsupported2() {
          throw Object.assign(new Error(`${name}.${String(k)} is not supported in OpenVessel`), { code: "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM" });
        };
      }
    }
  );
}
var cluster = Object.assign(new EventEmitter(), { isMaster: true, isPrimary: true, isWorker: false, workers: {}, settings: {}, setupMaster() {
}, setupPrimary() {
}, fork: () => {
  throw new Error("cluster.fork is not supported");
}, SCHED_NONE: 1, SCHED_RR: 2, schedulingPolicy: 2 });
var dgram = { createSocket: () => {
  throw Object.assign(new Error("UDP sockets are not supported in OpenVessel"), { code: "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM" });
}, Socket: class {
} };
var H2_HEADERS = ["STATUS", "METHOD", "AUTHORITY", "SCHEME", "PATH", "PROTOCOL", "ACCEPT", "ACCEPT_ENCODING", "ACCEPT_LANGUAGE", "AUTHORIZATION", "CACHE_CONTROL", "CONNECTION", "CONTENT_ENCODING", "CONTENT_LENGTH", "CONTENT_TYPE", "COOKIE", "DATE", "ETAG", "HOST", "IF_MODIFIED_SINCE", "IF_NONE_MATCH", "LAST_MODIFIED", "LOCATION", "RANGE", "REFERER", "SET_COOKIE", "TRANSFER_ENCODING", "UPGRADE", "USER_AGENT", "VARY", "X_FORWARDED_FOR"];
var h2Unsupported = function() {
  throw Object.assign(new Error("HTTP/2 is not supported in OpenVessel"), { code: "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM" });
};
var http2 = {
  constants: Object.fromEntries([
    ...H2_HEADERS.map((h) => [`HTTP2_HEADER_${h}`, h === "STATUS" || h === "METHOD" || h === "AUTHORITY" || h === "SCHEME" || h === "PATH" || h === "PROTOCOL" ? ":" + h.toLowerCase() : h.toLowerCase().replace(/_/g, "-")]),
    ...["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH", "CONNECT"].map((m) => [`HTTP2_METHOD_${m}`, m]),
    ["HTTP_STATUS_OK", 200],
    ["HTTP_STATUS_NOT_FOUND", 404],
    ["HTTP_STATUS_INTERNAL_SERVER_ERROR", 500],
    ["NGHTTP2_CANCEL", 8],
    ["NGHTTP2_NO_ERROR", 0]
  ]),
  Http2ServerRequest: class Http2ServerRequest {
  },
  Http2ServerResponse: class Http2ServerResponse {
  },
  Http2Session: class Http2Session extends EventEmitter {
  },
  ClientHttp2Session: class ClientHttp2Session extends EventEmitter {
  },
  ServerHttp2Session: class ServerHttp2Session extends EventEmitter {
  },
  Http2Stream: class Http2Stream extends EventEmitter {
  },
  createServer: h2Unsupported,
  createSecureServer: h2Unsupported,
  connect: h2Unsupported,
  getDefaultSettings: () => ({}),
  getPackedSettings: () => new Uint8Array(0),
  getUnpackedSettings: () => ({}),
  sensitiveHeaders: /* @__PURE__ */ Symbol("nodejs.http2.sensitiveHeaders")
};
var tls = {
  connect: () => {
    throw Object.assign(new Error("TLS sockets are not supported in OpenVessel"), { code: "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM" });
  },
  createServer: () => {
    throw new Error("tls.createServer is not supported");
  },
  createSecureContext: () => ({}),
  checkServerIdentity: () => void 0,
  rootCertificates: [],
  DEFAULT_ECDH_CURVE: "auto",
  DEFAULT_MIN_VERSION: "TLSv1.2",
  DEFAULT_MAX_VERSION: "TLSv1.3",
  getCiphers: () => ["tls_aes_256_gcm_sha384"],
  TLSSocket: class extends EventEmitter {
  },
  Server: class extends EventEmitter {
  },
  SecureContext: class {
  }
};
var traceEvents = { createTracing: () => ({ enable() {
}, disable() {
}, enabled: false, categories: "" }), getEnabledCategories: () => void 0 };
var domain = {
  create: () => {
    const d = new EventEmitter();
    d.run = (fn) => fn();
    d.add = () => {
    };
    d.remove = () => {
    };
    d.bind = (fn) => fn;
    d.intercept = (fn) => fn;
    d.enter = () => {
    };
    d.exit = () => {
    };
    d.dispose = () => {
    };
    return d;
  },
  active: null
};
var repl = {
  start: () => {
    throw new Error("repl is not supported yet");
  },
  builtinModules: []
};
var testModule2 = new Proxy(
  {},
  {
    get(_t, k) {
      if (k === "then" || typeof k === "symbol") return void 0;
      return () => {
        throw new Error("node:test is not supported in OpenVessel");
      };
    }
  }
);
var sea = { isSea: () => false, getAsset: () => {
  throw new Error("not a SEA");
} };
var sqlite = unsupportedModule("sqlite");

// src/node/module.ts
var dec = new TextDecoder();
var ESM_PREFIX = "/__ov/esm";
var BUILTIN_PREFIX = "/__ov/builtin/";
var lexerReady = false;
var lexerInit = init().then(() => {
  lexerReady = true;
});
var getBuiltin = () => {
  throw new Error("builtins not ready");
};
function setBuiltinGetter(fn) {
  getBuiltin = fn;
}
var conditions = [];
function setConditions(c) {
  conditions = c;
}
var runtimeBase2 = "";
function setRuntimeBase(o) {
  runtimeBase2 = o;
}
function moduleNotFound(request2, parent, cause) {
  const stack = [];
  for (let m = parent; m; m = m.parent ?? null) {
    if (m.filename) stack.push(m.filename);
    if (stack.length > 20) break;
  }
  let msg = cause?.message && !cause.message.startsWith("Cannot find module") ? cause.message : `Cannot find module '${request2}'`;
  if (stack.length) msg += `
Require stack:
- ${stack.join("\n- ")}`;
  const err3 = new Error(msg);
  err3.code = cause?.code && cause.code !== "ENOENT" ? cause.code : "MODULE_NOT_FOUND";
  err3.requireStack = stack;
  return err3;
}
function Module(id = "", parent) {
  this.id = id;
  this.path = dirname(id);
  this.exports = {};
  this.filename = null;
  this.loaded = false;
  this.children = [];
  this.paths = [];
  this.parent = parent;
  if (parent && parent.children) parent.children.push(this);
}
var M = Module;
M._cache = /* @__PURE__ */ Object.create(null);
M._pathCache = /* @__PURE__ */ Object.create(null);
M._extensions = /* @__PURE__ */ Object.create(null);
M.globalPaths = ["/home/user/.node_modules", "/home/user/.node_libraries", "/usr/lib/node"];
M.builtinModules = BUILTIN_MODULES.filter((m) => !m.startsWith("_")).concat(BUILTIN_MODULES.filter((m) => m.startsWith("_")));
M.Module = Module;
M.wrapper = ["(function (exports, require, module, __filename, __dirname) { ", "\n});"];
M.wrap = (s) => M.wrapper[0] + s + M.wrapper[1];
M.isBuiltin = (s) => builtinName(s) !== null;
M._initPaths = () => {
};
M._preloadModules = () => {
};
M.syncBuiltinESMExports = () => {
};
M.register = () => {
};
M.registerHooks = () => ({ deregister() {
} });
M.enableCompileCache = () => ({ status: 3 });
M.getCompileCacheDir = () => void 0;
M.flushCompileCache = () => {
};
M.findSourceMap = () => void 0;
M.SourceMap = class SourceMap {
  constructor(payload) {
    this.payload = payload;
  }
  payload;
  findEntry() {
    return {};
  }
};
M.constants = { compileCacheStatus: { FAILED: 0, ENABLED: 1, ALREADY_ENABLED: 2, DISABLED: 3 } };
M.runMain = () => {
};
M.stripTypeScriptTypes = (code) => stripTypesSync(code, "x.ts");
M._nodeModulePaths = (from) => {
  const out3 = [];
  let dir = resolve(from);
  for (; ; ) {
    if (basename(dir) !== "node_modules") out3.push(join(dir, "node_modules"));
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return out3;
};
M._resolveLookupPaths = (request2, parent) => {
  if (builtinName(request2)) return null;
  if (request2.startsWith("./") || request2.startsWith("../") || request2 === "." || request2 === "..") return [parent?.filename ? dirname(parent.filename) : process_cwd()];
  return [...parent?.paths ?? M._nodeModulePaths(process_cwd()), ...M.globalPaths];
};
function process_cwd() {
  return globalThis.process?.cwd?.() ?? "/";
}
M._findPath = (request2, paths) => {
  for (const p of paths) {
    try {
      return sys("resolve", { spec: isAbsolute(request2) ? request2 : join(p, request2), from: p, kind: "cjs", exts: Object.keys(M._extensions) });
    } catch {
    }
  }
  return false;
};
M._resolveFilename = function(request2, parent, _isMain, options) {
  if (typeof request2 !== "string") {
    const e = new TypeError(`The "id" argument must be of type string. Received ${typeof request2}`);
    e.code = "ERR_INVALID_ARG_TYPE";
    throw e;
  }
  const b = builtinName(request2);
  if (b && (request2.startsWith("node:") || !request2.includes("/") || BUILTIN_MODULES.includes(request2))) return request2.startsWith("node:") ? request2 : b;
  const from = parent?.filename ? dirname(parent.filename) : parent?.id && parent.id !== "." && parent.id !== "<repl>" ? parent.path : process_cwd();
  const exts = Object.keys(M._extensions);
  let paths;
  if (options?.paths) {
    paths = [];
    for (const p of options.paths) paths.push(...M._nodeModulePaths(resolve(from, p)));
    if (request2.startsWith(".")) {
      for (const p of options.paths) {
        try {
          return sys("resolve", { spec: request2, from: resolve(from, p), kind: "cjs", exts, conditions });
        } catch {
        }
      }
    }
  }
  const cacheKey = `${from}\0${request2}`;
  if (!paths) {
    const hit = M._pathCache[cacheKey];
    if (hit) return hit;
  }
  try {
    const r = sys("resolve", { spec: request2, from, kind: "cjs", exts, conditions, paths });
    const out3 = r.startsWith("node:") ? r.slice(5) : r;
    if (!paths) M._pathCache[cacheKey] = out3;
    return out3;
  } catch (e) {
    if (e instanceof SysError) throw moduleNotFound(request2, parent, e);
    throw e;
  }
};
M._load = function(request2, parent, isMain) {
  const b = builtinName(request2);
  if (b && (request2.startsWith("node:") || !M._cache[request2])) {
    if (request2.startsWith("node:") || BUILTIN_MODULES.includes(request2)) return getBuiltin(b);
  }
  const filename = M._resolveFilename(request2, parent, isMain);
  const bb = builtinName(filename);
  if (bb && !filename.startsWith("/")) return getBuiltin(bb);
  return loadFile(filename, parent, isMain);
};
function loadFile(filename, parent, isMain = false) {
  const cached = M._cache[filename];
  if (cached) {
    if (parent && !parent.children.includes(cached)) parent.children.push(cached);
    return cached.exports;
  }
  const module = new M(filename, parent);
  if (isMain) {
    module.id = ".";
    globalThis.process.mainModule = module;
    M._mainModule = module;
  }
  M._cache[filename] = module;
  let threw = true;
  try {
    module.load(filename);
    threw = false;
  } finally {
    if (threw) {
      delete M._cache[filename];
      if (parent) {
        const i2 = parent.children.indexOf(module);
        if (i2 !== -1) parent.children.splice(i2, 1);
      }
    }
  }
  return module.exports;
}
M.prototype.load = function(filename) {
  this.filename = filename;
  this.paths = M._nodeModulePaths(dirname(filename));
  const ext = findExtension(filename);
  M._extensions[ext](this, filename);
  this.loaded = true;
};
function findExtension(filename) {
  const name = basename(filename);
  let idx = 0;
  for (; ; ) {
    idx = name.indexOf(".", idx + 1);
    if (idx === -1) break;
    const ext = name.slice(idx);
    if (M._extensions[ext]) return ext;
  }
  return ".js";
}
M.prototype.require = function(id) {
  if (typeof id !== "string") {
    const e = new TypeError(`The "id" argument must be of type string. Received ${typeof id}`);
    e.code = "ERR_INVALID_ARG_TYPE";
    throw e;
  }
  if (id === "") {
    const e = new TypeError("The argument 'id' must be a non-empty string. Received ''");
    e.code = "ERR_INVALID_ARG_VALUE";
    throw e;
  }
  return M._load(id, this, false);
};
function makeRequire(mod) {
  const require2 = function require3(id) {
    return mod.require(id);
  };
  require2.resolve = function resolve3(request2, opts) {
    const r = M._resolveFilename(request2, mod, false, opts);
    return r;
  };
  require2.resolve.paths = (request2) => M._resolveLookupPaths(request2, mod);
  require2.main = M._mainModule;
  require2.extensions = M._extensions;
  require2.cache = M._cache;
  return require2;
}
M.prototype._compile = function(content, filename) {
  let src = content;
  if (src.charCodeAt(0) === 65279) src = src.slice(1);
  if (src.startsWith("#!")) src = "//" + src.slice(2);
  src = rewriteDynamicImports(src, filename);
  const wrapped = `(function (exports, require, module, __filename, __dirname, __ov_di) {${src}
})
//# sourceURL=${filename}`;
  let fn;
  try {
    fn = (0, eval)(wrapped);
  } catch (e) {
    if (e instanceof SyntaxError && looksLikeEsm(content)) {
      return requireEsm(this, content, filename);
    }
    if (e instanceof SyntaxError) e.message = `${e.message} (in ${filename})`;
    throw e;
  }
  const require2 = makeRequire(this);
  const fileUrl = pathToFileURLString(filename);
  const di = (spec, opts) => dimport(spec, opts, fileUrl);
  return fn.call(this.exports, this.exports, require2, this, filename, dirname(filename), di);
};
function looksLikeEsm(src) {
  if (!lexerReady) return /^\s*(import|export)\s/m.test(src);
  try {
    return !!parse(src)[3];
  } catch {
    return false;
  }
}
function rewriteDynamicImports(src, _filename) {
  if (!src.includes("import(") && !src.includes("import (")) return src;
  if (!lexerReady) return src.replace(/(^|[^.\w$])import\s*\(/g, "$1__ov_di(");
  let imports;
  try {
    [imports] = parse(src);
  } catch {
    return src.replace(/(^|[^.\w$])import\s*\(/g, "$1__ov_di(");
  }
  let out3 = "";
  let last = 0;
  for (const imp of imports) {
    if (imp.type !== "dynamic") continue;
    const kw = src.lastIndexOf("import", imp.dynamicStart ?? imp.start);
    if (kw < last || kw < imp.importStart) continue;
    out3 += src.slice(last, kw) + "__ov_di";
    last = kw + 6;
  }
  return out3 + src.slice(last);
}
var readText = (filename) => dec.decode(sys("readFile", { p: filename }));
M._extensions[".js"] = function(module, filename) {
  const content = readText(filename);
  const fmt = sys("moduleFormat", { p: filename });
  if (fmt === "module" || filename.endsWith(".mjs")) {
    requireEsm(module, content, filename);
    return;
  }
  module._compile(content, filename);
};
M._extensions[".json"] = function(module, filename) {
  const content = readText(filename);
  try {
    module.exports = JSON.parse(content.charCodeAt(0) === 65279 ? content.slice(1) : content);
  } catch (e) {
    e.message = `${filename}: ${e.message}`;
    throw e;
  }
};
M._extensions[".node"] = function(_module, filename) {
  const e = new Error(`Native addons are not supported in OpenVessel (tried to load ${filename}). Use the WebAssembly build of this package.`);
  e.code = "ERR_DLOPEN_FAILED";
  throw e;
};
var tsLoader = function(module, filename) {
  const content = readText(filename);
  const fmt = sys("moduleFormat", { p: filename });
  const js = stripTypesSync(content, filename);
  if (fmt === "module-typescript" && looksLikeEsm(js)) {
    requireEsm(module, js, filename);
    return;
  }
  module._compile(js, filename);
};
M._extensions[".ts"] = tsLoader;
M._extensions[".cts"] = tsLoader;
M._extensions[".mts"] = tsLoader;
var sucrase = null;
async function preloadSucrase() {
  sucrase ??= await import("./chunks/esm-AKDCBCJF.js");
}
function needSucrase() {
  if (!sucrase) {
    const e = new Error("internal: transformer not loaded");
    e.code = "ERR_INTERNAL";
    throw e;
  }
  return sucrase;
}
function stripTypesSync(code, filename) {
  return needSucrase().transform(code, { transforms: ["typescript"], filePath: filename, disableESTransforms: true, keepUnusedImports: true }).code;
}
function requireEsm(module, content, filename) {
  if (/(^|[^\w$.])await\s/.test(content) && hasTopLevelAwait(content)) {
    const e = new Error(`require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.
  From ${filename}`);
    e.code = "ERR_REQUIRE_ASYNC_MODULE";
    throw e;
  }
  const s = needSucrase();
  let js;
  try {
    js = s.transform(content, { transforms: ["imports"], filePath: filename, disableESTransforms: true, preserveDynamicImport: true, injectCreateRequireForImportRequire: false }).code;
  } catch (e) {
    throw e;
  }
  js = js.replace(/\bimport\.meta\b/g, "__ov_import_meta");
  const prelude = `var __ov_import_meta = globalThis.__ov.meta(${JSON.stringify(pathToFileURLString(filename))});`;
  module._compile(prelude + js, filename);
  const ex = module.exports;
  if (ex && typeof ex === "object" && Object.prototype.hasOwnProperty.call(ex, "module.exports")) module.exports = ex["module.exports"];
  else if (ex && typeof ex === "object" && !Object.prototype.hasOwnProperty.call(ex, "__esModule")) Object.defineProperty(ex, "__esModule", { value: true });
}
function hasTopLevelAwait(src) {
  let depth = 0;
  let i2 = 0;
  const n = src.length;
  while (i2 < n) {
    const c = src[i2];
    if (c === "/" && src[i2 + 1] === "/") {
      i2 = src.indexOf("\n", i2);
      if (i2 === -1) break;
      continue;
    }
    if (c === "/" && src[i2 + 1] === "*") {
      i2 = src.indexOf("*/", i2 + 2);
      if (i2 === -1) break;
      i2 += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const q = c;
      i2++;
      while (i2 < n && src[i2] !== q) {
        if (src[i2] === "\\") i2++;
        i2++;
      }
      i2++;
      continue;
    }
    if (c === "{" || c === "(") depth++;
    else if (c === "}" || c === ")") depth--;
    else if (depth === 0 && c === "a" && src.startsWith("await", i2) && !/[\w$]/.test(src[i2 - 1] ?? " ") && !/[\w$]/.test(src[i2 + 5] ?? " ")) return true;
    i2++;
  }
  return false;
}
M.createRequire = function createRequire(filename) {
  let f = typeof filename === "string" ? filename : filename.href;
  if (f.startsWith("file:")) f = fileURLToPathLoose(f);
  const mod = new M(f, null);
  mod.filename = f;
  mod.paths = M._nodeModulePaths(dirname(f));
  if (f.endsWith("/")) {
    mod.filename = join(f, "noop.js");
  }
  return makeRequire(mod);
};
M.findPackageJSON = function(spec, base) {
  let start = spec;
  if (spec.startsWith("file:")) start = fileURLToPathLoose(spec);
  else if (!spec.startsWith("/") && base) start = M._resolveFilename(spec, { filename: base.startsWith("file:") ? fileURLToPathLoose(base) : base, paths: [] });
  let dir = dirname(start);
  for (; ; ) {
    const pj = join(dir, "package.json");
    try {
      sys("stat", { p: pj });
      return pj;
    } catch {
    }
    const parent = dirname(dir);
    if (parent === dir) return void 0;
    dir = parent;
  }
};
function esmUrl(p, query = "") {
  return runtimeBase2 + ESM_PREFIX + encodePathForUrl(p) + query;
}
function builtinUrl(name) {
  return runtimeBase2 + BUILTIN_PREFIX + encodeURIComponent(name);
}
function resolveEsmUrl(spec, parentUrl) {
  const b = builtinName(spec);
  if (b) return builtinUrl(b);
  if (spec.startsWith("data:") || spec.startsWith("blob:")) return spec;
  if (spec.startsWith("http://") || spec.startsWith("https://")) {
    const e = new Error(`Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. Received protocol '${new URL(spec).protocol}'`);
    e.code = "ERR_UNSUPPORTED_ESM_URL_SCHEME";
    throw e;
  }
  const parent = parentUrl.startsWith("file:") ? fileURLToPathLoose(parentUrl) : parentUrl.startsWith("/") ? parentUrl : process_cwd() + "/";
  let r;
  try {
    r = sys("resolve", { spec, from: parent, kind: "esm", conditions });
  } catch (e) {
    if (e instanceof SysError) {
      const err3 = new Error(e.message);
      err3.code = e.code === "ENOENT" || e.code === "MODULE_NOT_FOUND" ? "ERR_MODULE_NOT_FOUND" : e.code;
      throw err3;
    }
    throw e;
  }
  if (r.path.startsWith("node:")) return builtinUrl(r.path.slice(5));
  return esmUrl(r.path, r.query);
}
function dimport(spec, _opts, parentUrl) {
  let s;
  if (spec instanceof URL) s = spec.href;
  else s = String(spec);
  let url;
  try {
    url = resolveEsmUrl(s, parentUrl);
  } catch (e) {
    return Promise.reject(e);
  }
  return track(import(
    /* @vite-ignore */
    url
  ));
}
function metaFor(fileUrl) {
  const filename = fileURLToPathLoose(fileUrl);
  return {
    url: fileUrl,
    filename,
    dirname: dirname(filename),
    main: false,
    resolve(spec, parent) {
      const p = parent ? String(parent) : fileUrl;
      const b = builtinName(spec);
      if (b) return "node:" + b;
      const r = sys("resolve", { spec, from: p.startsWith("file:") ? fileURLToPathLoose(p) : p, kind: "esm", conditions });
      if (r.path.startsWith("node:")) return r.path;
      return pathToFileURLString(r.path) + r.query;
    }
  };
}
function installStackMapping() {
  const E = Error;
  if (typeof E.captureStackTrace !== "function") return;
  const esmBase = runtimeBase2 + ESM_PREFIX;
  const mapName = (name) => {
    if (!name) return name;
    if (name.startsWith(esmBase)) {
      const q = name.search(/[?#]/);
      const p = q === -1 ? name.slice(esmBase.length) : name.slice(esmBase.length, q);
      return "file://" + p;
    }
    if (name.startsWith(runtimeBase2 + "/")) return "node:internal/" + name.slice(runtimeBase2.length + 1).replace(/\?.*$/, "");
    return name;
  };
  E.prepareStackTrace = (err3, frames) => {
    const head = errorHeader(err3);
    if (!frames.length) return head;
    const lines = frames.map((f) => {
      try {
        return "    at " + formatFrame(f, mapName);
      } catch {
        return "    at <unknown>";
      }
    });
    return head + "\n" + lines.join("\n");
  };
}
function errorHeader(err3) {
  let name = "Error";
  let message = "";
  try {
    name = err3?.name ?? "Error";
    message = err3?.message ?? "";
  } catch {
  }
  return message ? `${name}: ${message}` : String(name);
}
function formatFrame(f, mapName) {
  const file = mapName(f.getScriptNameOrSourceURL?.() ?? f.getFileName?.()) ?? "<anonymous>";
  const line = f.getLineNumber?.();
  const col = f.getColumnNumber?.();
  const loc = f.isNative?.() ? "native" : `${file}${line != null ? `:${line}` : ""}${col != null ? `:${col}` : ""}`;
  const fn = f.getFunctionName?.();
  const isTop = f.isToplevel?.();
  const isCtor = f.isConstructor?.();
  const isAsync = f.isAsync?.();
  const isPromiseAll = f.isPromiseAll?.();
  let typeName = null;
  try {
    typeName = isTop ? null : f.getTypeName?.();
  } catch {
  }
  const method = f.getMethodName?.();
  let name;
  if (isPromiseAll) return `async Promise.all (index ${f.getPromiseIndex?.()})`;
  if (isCtor) name = `new ${fn ?? "<anonymous>"}`;
  else if (isTop || !typeName) name = fn ?? "";
  else {
    name = fn ? fn.startsWith(typeName + ".") ? fn : `${typeName}.${fn}` : `${typeName}.${method ?? "<anonymous>"}`;
    if (method && fn && !fn.endsWith(method)) name += ` [as ${method}]`;
  }
  const prefix = isAsync ? "async " : "";
  return name ? `${prefix}${name} (${loc})` : `${prefix}${loc}`;
}
var module_default = M;

// src/node/os.ts
var hostnameValue = "openvessel";
var homeValue = "/home/user";
function setOsInfo(info) {
  if (info.hostname) hostnameValue = info.hostname;
  if (info.home) homeValue = info.home;
}
var EOL = "\n";
var devNull = "/dev/null";
var constants3 = {
  UV_UDP_REUSEADDR: 4,
  dlopen: { RTLD_LAZY: 1, RTLD_NOW: 2, RTLD_GLOBAL: 256, RTLD_LOCAL: 0 },
  errno: { E2BIG: 7, EACCES: 13, EADDRINUSE: 98, EAGAIN: 11, EBADF: 9, EBUSY: 16, ECONNREFUSED: 111, ECONNRESET: 104, EEXIST: 17, EINTR: 4, EINVAL: 22, EIO: 5, EISDIR: 21, EMFILE: 24, ENOENT: 2, ENOMEM: 12, ENOSPC: 28, ENOTDIR: 20, ENOTEMPTY: 39, EPERM: 1, EPIPE: 32, ETIMEDOUT: 110 },
  signals: { SIGHUP: 1, SIGINT: 2, SIGQUIT: 3, SIGILL: 4, SIGTRAP: 5, SIGABRT: 6, SIGIOT: 6, SIGBUS: 7, SIGFPE: 8, SIGKILL: 9, SIGUSR1: 10, SIGSEGV: 11, SIGUSR2: 12, SIGPIPE: 13, SIGALRM: 14, SIGTERM: 15, SIGCHLD: 17, SIGSTKFLT: 16, SIGCONT: 18, SIGSTOP: 19, SIGTSTP: 20, SIGTTIN: 21, SIGTTOU: 22, SIGURG: 23, SIGXCPU: 24, SIGXFSZ: 25, SIGVTALRM: 26, SIGPROF: 27, SIGWINCH: 28, SIGIO: 29, SIGPOLL: 29, SIGPWR: 30, SIGSYS: 31 },
  priority: { PRIORITY_LOW: 19, PRIORITY_BELOW_NORMAL: 10, PRIORITY_NORMAL: 0, PRIORITY_ABOVE_NORMAL: -7, PRIORITY_HIGH: -14, PRIORITY_HIGHEST: -20 }
};
function hostname() {
  return hostnameValue;
}
function homedir() {
  return globalThis.process?.env?.HOME ?? homeValue;
}
function tmpdir() {
  const t = globalThis.process?.env?.TMPDIR;
  return t ? t.replace(/(.)\/$/, "$1") : "/tmp";
}
function platform() {
  return "linux";
}
function type() {
  return "Linux";
}
function release() {
  return "6.1.0-openvessel";
}
function version() {
  return "#1 SMP OpenVessel";
}
function arch() {
  return "x64";
}
function machine() {
  return "x86_64";
}
function endianness() {
  return "LE";
}
function uptime() {
  return Math.floor(perfNow() / 1e3);
}
function loadavg() {
  return [0, 0, 0];
}
function totalmem() {
  return 4 * 1024 ** 3;
}
function freemem() {
  return 2 * 1024 ** 3;
}
function availableParallelism() {
  return Math.max(1, Math.min(navigator.hardwareConcurrency || 4, 8));
}
function cpus() {
  const n = availableParallelism();
  return Array.from({ length: n }, () => ({ model: "OpenVessel virtual CPU", speed: 2400, times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 } }));
}
function networkInterfaces() {
  return {
    lo: [
      { address: "127.0.0.1", netmask: "255.0.0.0", family: "IPv4", mac: "00:00:00:00:00:00", internal: true, cidr: "127.0.0.1/8" },
      { address: "::1", netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff", family: "IPv6", mac: "00:00:00:00:00:00", internal: true, cidr: "::1/128", scopeid: 0 }
    ]
  };
}
function userInfo(_opts) {
  return { uid: 1e3, gid: 1e3, username: "user", homedir: homedir(), shell: "/bin/sh" };
}
function getPriority() {
  return 0;
}
function setPriority() {
}
var os_default = { EOL, devNull, constants: constants3, hostname, homedir, tmpdir, platform, type, release, version, arch, machine, endianness, uptime, loadavg, totalmem, freemem, availableParallelism, cpus, networkInterfaces, userInfo, getPriority, setPriority };

// src/node/querystring.ts
function unescape(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s.replace(/%([0-9a-fA-F]{2})/g, (_m, h) => String.fromCharCode(parseInt(h, 16)));
  }
}
function escape(s) {
  return encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}
function parse2(str, sep = "&", eq = "=", opts = {}) {
  const out3 = /* @__PURE__ */ Object.create(null);
  if (typeof str !== "string" || str.length === 0) return out3;
  const decode2 = opts.decodeURIComponent ?? unescape;
  const maxKeys = opts.maxKeys ?? 1e3;
  let parts = str.split(sep);
  if (maxKeys > 0) parts = parts.slice(0, maxKeys);
  for (const part of parts) {
    if (!part) continue;
    const idx = part.indexOf(eq);
    const k = decode2((idx >= 0 ? part.slice(0, idx) : part).replace(/\+/g, " "));
    const v = idx >= 0 ? decode2(part.slice(idx + eq.length).replace(/\+/g, " ")) : "";
    const cur = out3[k];
    if (cur === void 0) out3[k] = v;
    else if (Array.isArray(cur)) cur.push(v);
    else out3[k] = [cur, v];
  }
  return out3;
}
function strOf(v) {
  if (typeof v === "string") return v;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  if (typeof v === "bigint" || typeof v === "boolean") return String(v);
  return "";
}
function stringify(obj, sep = "&", eq = "=", opts = {}) {
  if (!obj || typeof obj !== "object") return "";
  const encode2 = opts.encodeURIComponent ?? escape;
  const parts = [];
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const ks = encode2(strOf(k)) + eq;
    if (Array.isArray(v)) for (const x2 of v) parts.push(ks + encode2(strOf(x2)));
    else parts.push(ks + encode2(strOf(v)));
  }
  return parts.join(sep);
}
var decode = parse2;
var encode = stringify;
var querystring_default = { parse: parse2, stringify, decode, encode, escape, unescape };

// src/node/readline.ts
init_events();
init_string_decoder();
var kKeypressDecoder = /* @__PURE__ */ Symbol("keypress-decoder");
var ESC_KEYS = {
  "[A": { name: "up" },
  "[B": { name: "down" },
  "[C": { name: "right" },
  "[D": { name: "left" },
  "[E": { name: "clear" },
  "[F": { name: "end" },
  "[H": { name: "home" },
  OA: { name: "up" },
  OB: { name: "down" },
  OC: { name: "right" },
  OD: { name: "left" },
  OF: { name: "end" },
  OH: { name: "home" },
  OP: { name: "f1" },
  OQ: { name: "f2" },
  OR: { name: "f3" },
  OS: { name: "f4" },
  "[1~": { name: "home" },
  "[2~": { name: "insert" },
  "[3~": { name: "delete" },
  "[4~": { name: "end" },
  "[5~": { name: "pageup" },
  "[6~": { name: "pagedown" },
  "[7~": { name: "home" },
  "[8~": { name: "end" },
  "[Z": { name: "tab", shift: true },
  "[1;2A": { name: "up", shift: true },
  "[1;2B": { name: "down", shift: true },
  "[1;2C": { name: "right", shift: true },
  "[1;2D": { name: "left", shift: true },
  "[1;5A": { name: "up", ctrl: true },
  "[1;5B": { name: "down", ctrl: true },
  "[1;5C": { name: "right", ctrl: true },
  "[1;5D": { name: "left", ctrl: true },
  "[1;3C": { name: "right", meta: true },
  "[1;3D": { name: "left", meta: true }
};
function parseKeys(s) {
  const keys = [];
  let i2 = 0;
  while (i2 < s.length) {
    const c = s[i2];
    const base = { sequence: c, ctrl: false, meta: false, shift: false };
    if (c === "\x1B") {
      const rest = s.slice(i2 + 1);
      const m = /^(\[[0-9;]*[A-Za-z~]|O[A-Z])/.exec(rest);
      if (m) {
        const seq = m[1];
        const k = ESC_KEYS[seq] ?? { name: "undefined" };
        keys.push({ ...base, ...k, sequence: "\x1B" + seq, code: seq });
        i2 += 1 + seq.length;
        continue;
      }
      if (rest.length === 0) {
        keys.push({ ...base, name: "escape" });
        i2++;
        continue;
      }
      const n = rest[0];
      keys.push({ ...base, sequence: "\x1B" + n, name: n === "\x7F" ? "backspace" : n.toLowerCase(), meta: true, shift: /[A-Z]/.test(n) });
      i2 += 2;
      continue;
    }
    if (c === "\r") base.name = "return";
    else if (c === "\n") base.name = "enter";
    else if (c === "	") base.name = "tab";
    else if (c === "\x7F" || c === "\b") base.name = "backspace";
    else if (c === " ") base.name = "space";
    else if (c <= "" && c >= "") {
      base.name = String.fromCharCode(c.charCodeAt(0) + 96);
      base.ctrl = true;
    } else if (/[a-z0-9]/.test(c)) base.name = c;
    else if (/[A-Z]/.test(c)) {
      base.name = c.toLowerCase();
      base.shift = true;
    }
    keys.push(base);
    i2++;
  }
  return keys;
}
function emitKeypressEvents(stream, _iface) {
  if (stream[kKeypressDecoder]) return;
  stream[kKeypressDecoder] = new StringDecoder("utf8");
  const onData = (b) => {
    if (stream.listenerCount("keypress") === 0) return;
    const s = typeof b === "string" ? b : stream[kKeypressDecoder].write(b);
    for (const k of parseKeys(s)) stream.emit("keypress", k.name && k.name.length === 1 && !k.ctrl && !k.meta ? k.sequence : k.name === "space" ? " " : k.sequence.length === 1 && !k.ctrl ? k.sequence : void 0, k);
  };
  const onNew = (ev) => {
    if (ev === "keypress") {
      stream.on("data", onData);
      stream.removeListener("newListener", onNew);
    }
  };
  if (stream.listenerCount("keypress") > 0) stream.on("data", onData);
  else stream.on("newListener", onNew);
}
function clearLine(stream, dir, cb) {
  stream?.write?.(dir < 0 ? "\x1B[1K" : dir > 0 ? "\x1B[0K" : "\x1B[2K", cb);
  return true;
}
function clearScreenDown(stream, cb) {
  stream?.write?.("\x1B[0J", cb);
  return true;
}
function cursorTo(stream, x2, y, cb) {
  if (typeof y === "function") {
    cb = y;
    y = void 0;
  }
  stream?.write?.(typeof y === "number" ? `\x1B[${y + 1};${x2 + 1}H` : `\x1B[${x2 + 1}G`, cb);
  return true;
}
function moveCursor(stream, dx, dy, cb) {
  let s = "";
  if (dx < 0) s += `\x1B[${-dx}D`;
  else if (dx > 0) s += `\x1B[${dx}C`;
  if (dy < 0) s += `\x1B[${-dy}A`;
  else if (dy > 0) s += `\x1B[${dy}B`;
  stream?.write?.(s, cb);
  return true;
}
var Interface = class extends EventEmitter {
  input;
  output;
  terminal;
  line = "";
  cursor = 0;
  history = [];
  closed = false;
  _prompt = "> ";
  decoder = new StringDecoder("utf8");
  buf = "";
  paused = false;
  questionCb = null;
  crlfDelay;
  histIdx = -1;
  onData = (d) => this._data(typeof d === "string" ? d : this.decoder.write(d));
  onEnd = () => {
    if (this.buf.length) {
      const l = this.buf;
      this.buf = "";
      this._line(l);
    }
    this.close();
  };
  constructor(input, output, completer, terminal) {
    super();
    let opts = input;
    if (!input || typeof input.on === "function" || input.readable !== void 0) opts = { input, output, completer, terminal };
    this.input = opts.input;
    this.output = opts.output;
    this.terminal = opts.terminal ?? !!this.output?.isTTY;
    this.crlfDelay = opts.crlfDelay ?? 100;
    if (opts.prompt !== void 0) this._prompt = opts.prompt;
    if (opts.history) this.history = [...opts.history];
    if (this.input) {
      if (this.terminal && typeof this.input.setRawMode === "function") {
        emitKeypressEvents(this.input);
        this.input.setRawMode(true);
        this.input.on("keypress", this.onKey);
      } else {
        this.input.on("data", this.onData);
      }
      this.input.on("end", this.onEnd);
      this.input.resume?.();
    }
    opts.signal?.addEventListener("abort", () => this.close(), { once: true });
  }
  onKey = (_s, key) => {
    if (this.closed || !key) return;
    if (key.ctrl && key.name === "c") {
      if (this.listenerCount("SIGINT")) this.emit("SIGINT");
      else {
        this.close();
        globalThis.process.kill(globalThis.process.pid, "SIGINT");
      }
      return;
    }
    if (key.ctrl && key.name === "d" && this.line === "") {
      this.close();
      return;
    }
    switch (key.name) {
      case "return":
      case "enter": {
        const l = this.line;
        this.output?.write?.("\r\n");
        this.line = "";
        this.cursor = 0;
        this.histIdx = -1;
        if (l) this.history.unshift(l);
        this._line(l);
        return;
      }
      case "backspace":
        if (this.cursor > 0) {
          this.line = this.line.slice(0, this.cursor - 1) + this.line.slice(this.cursor);
          this.cursor--;
          this._refresh();
        }
        return;
      case "delete":
        this.line = this.line.slice(0, this.cursor) + this.line.slice(this.cursor + 1);
        this._refresh();
        return;
      case "left":
        if (this.cursor > 0) this.cursor--;
        this._refresh();
        return;
      case "right":
        if (this.cursor < this.line.length) this.cursor++;
        this._refresh();
        return;
      case "home":
        this.cursor = 0;
        this._refresh();
        return;
      case "end":
        this.cursor = this.line.length;
        this._refresh();
        return;
      case "up":
        if (this.histIdx + 1 < this.history.length) {
          this.histIdx++;
          this.line = this.history[this.histIdx];
          this.cursor = this.line.length;
          this._refresh();
        }
        return;
      case "down":
        if (this.histIdx > 0) {
          this.histIdx--;
          this.line = this.history[this.histIdx];
        } else {
          this.histIdx = -1;
          this.line = "";
        }
        this.cursor = this.line.length;
        this._refresh();
        return;
    }
    if (key.ctrl || key.meta) return;
    const ch = key.sequence;
    if (ch && ch.length >= 1 && ch >= " ") {
      this.line = this.line.slice(0, this.cursor) + ch + this.line.slice(this.cursor);
      this.cursor += ch.length;
      this._refresh();
    }
  };
  _refresh() {
    if (!this.output?.write) return;
    this.output.write(`\r\x1B[K${this._prompt}${this.line}`);
    const back = this.line.length - this.cursor;
    if (back > 0) this.output.write(`\x1B[${back}D`);
  }
  _data(s) {
    this.buf += s;
    let idx;
    while ((idx = this.buf.search(/\r\n|\n|\r/)) !== -1) {
      const l = this.buf.slice(0, idx);
      const nl = this.buf[idx] === "\r" && this.buf[idx + 1] === "\n" ? 2 : 1;
      this.buf = this.buf.slice(idx + nl);
      this._line(l);
      if (this.closed) return;
    }
  }
  _line(l) {
    if (this.questionCb) {
      const cb = this.questionCb;
      this.questionCb = null;
      cb(l);
      return;
    }
    this.emit("line", l);
  }
  getPrompt() {
    return this._prompt;
  }
  setPrompt(p) {
    this._prompt = p;
  }
  prompt(_preserveCursor) {
    if (this.paused) this.resume();
    this.output?.write?.(this._prompt);
  }
  question(q, opts, cb) {
    if (typeof opts === "function") cb = opts;
    if (this.closed) {
      const e = Object.assign(new Error("readline was closed"), { code: "ERR_USE_AFTER_CLOSE" });
      throw e;
    }
    this.questionCb = cb ?? null;
    this.output?.write?.(q);
  }
  write(d, key) {
    if (key) this.onKey(void 0, key);
    else if (d !== void 0 && d !== null) this._data(String(d));
  }
  pause() {
    if (this.paused) return this;
    this.paused = true;
    this.input?.pause?.();
    this.emit("pause");
    return this;
  }
  resume() {
    if (!this.paused) return this;
    this.paused = false;
    this.input?.resume?.();
    this.emit("resume");
    return this;
  }
  close() {
    if (this.closed) return;
    this.closed = true;
    if (this.input) {
      this.input.removeListener("data", this.onData);
      this.input.removeListener("end", this.onEnd);
      this.input.removeListener("keypress", this.onKey);
      if (this.terminal && typeof this.input.setRawMode === "function") this.input.setRawMode(false);
      this.input.pause?.();
    }
    this.emit("close");
  }
  getCursorPos() {
    return { rows: 0, cols: this.cursor + this._prompt.length };
  }
  [Symbol.asyncIterator]() {
    const queue = [];
    const waiters = [];
    let done = this.closed;
    this.on("line", (l) => {
      const w = waiters.shift();
      if (w) w({ value: l, done: false });
      else queue.push(l);
    });
    this.on("close", () => {
      done = true;
      for (const w of waiters.splice(0)) w({ value: void 0, done: true });
    });
    return {
      next: () => queue.length ? Promise.resolve({ value: queue.shift(), done: false }) : done ? Promise.resolve({ value: void 0, done: true }) : new Promise((r) => waiters.push(r)),
      return: () => {
        this.close();
        return Promise.resolve({ value: void 0, done: true });
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
  [Symbol.dispose ?? /* @__PURE__ */ Symbol.for("dispose")]() {
    this.close();
  }
};
function createInterface(input, output, completer, terminal) {
  return new Interface(input, output, completer, terminal);
}
var PromisesInterface = class extends Interface {
  question(q, opts) {
    return new Promise((resolve3, reject) => {
      if (opts?.signal) {
        if (opts.signal.aborted) return reject(Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR" }));
        opts.signal.addEventListener("abort", () => reject(Object.assign(new Error("The operation was aborted"), { name: "AbortError", code: "ABORT_ERR" })), { once: true });
      }
      super.question(q, resolve3);
    });
  }
};
var Readline = class {
  constructor(stream) {
    this.stream = stream;
  }
  stream;
  ops = [];
  clearLine(dir) {
    this.ops.push(dir < 0 ? "\x1B[1K" : dir > 0 ? "\x1B[0K" : "\x1B[2K");
    return this;
  }
  clearScreenDown() {
    this.ops.push("\x1B[0J");
    return this;
  }
  cursorTo(x2, y) {
    this.ops.push(typeof y === "number" ? `\x1B[${y + 1};${x2 + 1}H` : `\x1B[${x2 + 1}G`);
    return this;
  }
  moveCursor(dx, dy) {
    if (dx) this.ops.push(dx < 0 ? `\x1B[${-dx}D` : `\x1B[${dx}C`);
    if (dy) this.ops.push(dy < 0 ? `\x1B[${-dy}A` : `\x1B[${dy}B`);
    return this;
  }
  commit() {
    this.stream.write(this.ops.join(""));
    this.ops = [];
    return Promise.resolve();
  }
  rollback() {
    this.ops = [];
    return this;
  }
};
var promises3 = {
  Interface: PromisesInterface,
  Readline,
  createInterface: (input, output, completer, terminal) => new PromisesInterface(input, output, completer, terminal)
};
var readline_default = { Interface, createInterface, emitKeypressEvents, clearLine, clearScreenDown, cursorTo, moveCursor, promises: promises3 };

// src/node/worker.ts
init_string_decoder();

// src/node/url.ts
var URL2 = globalThis.URL;
var URLSearchParams2 = globalThis.URLSearchParams;
function err(code, msg, Ctor = TypeError) {
  const e = new Ctor(msg);
  e.code = code;
  return e;
}
function fileURLToPath(u, _opts) {
  let url;
  if (typeof u === "string") url = new URL2(u);
  else if (u && typeof u.href === "string") url = u;
  else throw err("ERR_INVALID_ARG_TYPE", `The "path" argument must be of type string or an instance of URL. Received ${typeof u}`);
  if (url.protocol !== "file:") throw err("ERR_INVALID_URL_SCHEME", "The URL must be of scheme file");
  if (url.hostname !== "" && url.hostname !== "localhost") throw err("ERR_INVALID_FILE_URL_HOST", `File URL host must be "localhost" or empty on linux`);
  const p = url.pathname;
  if (/%2f/i.test(p)) throw err("ERR_INVALID_FILE_URL_PATH", "File URL path must not include encoded / characters");
  return decodeURIComponent(p);
}
function pathToFileURL(p, _opts) {
  const cwd = globalThis.process?.cwd?.() ?? "/";
  let resolved = resolve(cwd, p);
  if (p.endsWith("/") && !resolved.endsWith("/")) resolved += "/";
  return new URL2("file://" + encodePathForUrl(resolved).replace(/\?/g, "%3F").replace(/#/g, "%23"));
}
function urlToHttpOptions(url) {
  const o = {
    protocol: url.protocol,
    hostname: url.hostname.startsWith("[") ? url.hostname.slice(1, -1) : url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: `${url.pathname || ""}${url.search || ""}`,
    href: url.href
  };
  if (url.port !== "") o.port = Number(url.port);
  if (url.username || url.password) o.auth = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
  return o;
}
function domainToASCII(d) {
  try {
    return new URL2(`http://${d}`).hostname;
  } catch {
    return "";
  }
}
function domainToUnicode(d) {
  return d;
}
var Url = class {
  protocol = null;
  slashes = null;
  auth = null;
  host = null;
  port = null;
  hostname = null;
  hash = null;
  search = null;
  query = null;
  pathname = null;
  path = null;
  href = "";
  format() {
    return format2(this);
  }
  resolve(rel) {
    return resolve2(this.href, rel);
  }
};
var slashedProtocols = /* @__PURE__ */ new Set(["http:", "https:", "ftp:", "gopher:", "file:", "ws:", "wss:"]);
function parse3(input, parseQuery = false, slashesDenoteHost = false) {
  if (input instanceof Url) return input;
  if (typeof input !== "string") throw err("ERR_INVALID_ARG_TYPE", 'The "url" argument must be of type string');
  const u = new Url();
  let rest = input.trim();
  const hashIdx = rest.indexOf("#");
  if (hashIdx !== -1) {
    u.hash = rest.slice(hashIdx);
    rest = rest.slice(0, hashIdx);
  }
  const qIdx = rest.indexOf("?");
  if (qIdx !== -1) {
    u.search = rest.slice(qIdx);
    u.query = rest.slice(qIdx + 1);
    rest = rest.slice(0, qIdx);
  } else if (parseQuery) {
    u.search = "";
    u.query = {};
  }
  if (parseQuery && typeof u.query === "string") u.query = parse2(u.query);
  const proto2 = /^([a-z0-9.+-]+:)/i.exec(rest);
  if (proto2) {
    u.protocol = proto2[1].toLowerCase();
    rest = rest.slice(proto2[1].length);
  }
  if (slashesDenoteHost || proto2 || /^\/\/[^@/]+@[^@/]+/.test(rest)) {
    const slashes = rest.startsWith("//");
    if (slashes && !(u.protocol === "javascript:")) {
      rest = rest.slice(2);
      u.slashes = true;
    }
  }
  if (u.slashes || u.protocol && !slashedProtocols.has(u.protocol) && false) {
    let end = rest.search(/[/\\]/);
    if (end === -1) end = rest.length;
    let hostPart = rest.slice(0, end);
    rest = rest.slice(end);
    const at = hostPart.lastIndexOf("@");
    if (at !== -1) {
      u.auth = decodeURIComponent(hostPart.slice(0, at));
      hostPart = hostPart.slice(at + 1);
    }
    const portM = /:(\d*)$/.exec(hostPart);
    if (portM) {
      if (portM[1]) u.port = portM[1];
      hostPart = hostPart.slice(0, portM.index);
    }
    u.hostname = hostPart.toLowerCase().replace(/^\[|\]$/g, "");
    u.host = hostPart.toLowerCase() + (u.port ? `:${u.port}` : "");
    if (u.protocol && slashedProtocols.has(u.protocol) && !rest) rest = "/";
  }
  u.pathname = rest || (u.slashes ? "/" : null);
  if (u.pathname === null && !u.search) u.pathname = rest || null;
  u.path = (u.pathname ?? "") + (u.search ?? "") || null;
  u.href = format2(u);
  return u;
}
function format2(obj, opts) {
  if (typeof obj === "string") obj = parse3(obj);
  if (obj instanceof URL2) {
    const u = new URL2(obj.href);
    if (opts?.auth === false) {
      u.username = "";
      u.password = "";
    }
    if (opts?.fragment === false) u.hash = "";
    if (opts?.search === false) u.search = "";
    return u.href;
  }
  let auth = obj.auth || "";
  if (auth) auth = encodeURIComponent(auth).replace(/%3A/i, ":") + "@";
  let protocol = obj.protocol || "";
  let pathname = obj.pathname || "";
  let hash2 = obj.hash || "";
  let host = "";
  let query = "";
  if (obj.host) host = auth + obj.host;
  else if (obj.hostname) {
    host = auth + (obj.hostname.includes(":") ? `[${obj.hostname}]` : obj.hostname);
    if (obj.port) host += ":" + obj.port;
  }
  if (obj.query && typeof obj.query === "object" && Object.keys(obj.query).length) query = stringify(obj.query);
  let search = obj.search || query && "?" + query || "";
  if (protocol && !protocol.endsWith(":")) protocol += ":";
  if (obj.slashes || (!protocol || slashedProtocols.has(protocol)) && host !== "") {
    host = "//" + (host || "");
    if (pathname && pathname[0] !== "/") pathname = "/" + pathname;
  } else if (!host) host = "";
  if (hash2 && hash2[0] !== "#") hash2 = "#" + hash2;
  if (search && search[0] !== "?") search = "?" + search;
  pathname = pathname.replace(/[?#]/g, (m) => encodeURIComponent(m));
  search = search.replace("#", "%23");
  return protocol + host + pathname + search + hash2;
}
function resolve2(from, to) {
  try {
    const base = new URL2(from, "resolve://");
    const r = new URL2(to, base);
    if (r.protocol === "resolve:") {
      const { pathname, search, hash: hash2 } = r;
      return pathname + search + hash2;
    }
    return r.href;
  } catch {
    return to;
  }
}
function resolveObject(from, to) {
  return parse3(resolve2(from, to));
}
var url_default = { URL: URL2, URLSearchParams: URLSearchParams2, fileURLToPath, pathToFileURL, urlToHttpOptions, domainToASCII, domainToUnicode, parse: parse3, format: format2, resolve: resolve2, resolveObject, Url };

// src/node/worker_threads.ts
init_events();
var RING_BYTES = 8 * 1024 * 1024;
var Ring = class _Ring {
  constructor(sab) {
    this.sab = sab;
    this.ctl = new Int32Array(sab, 0, 4);
    this.data = new Uint8Array(sab, 16);
  }
  sab;
  ctl;
  // [0]=write offset, [1]=read offset, [2]=wrap marker
  data;
  static create() {
    return new _Ring(new SharedArrayBuffer(RING_BYTES + 16));
  }
  /** Appends [len][seq][payload]; returns false if it does not fit. */
  push(seq, payload) {
    const need = 8 + payload.length;
    const cap = this.data.length;
    let w = Atomics.load(this.ctl, 0);
    const r = Atomics.load(this.ctl, 1);
    const used = w >= r ? w - r : cap - r + w;
    if (used + need + 8 >= cap) return false;
    if (w + need > cap) {
      if (r > 0 && r <= need) return false;
      new DataView(this.data.buffer, this.data.byteOffset).setUint32(w, 4294967295, true);
      w = 0;
    }
    const dv = new DataView(this.data.buffer, this.data.byteOffset);
    dv.setUint32(w, payload.length, true);
    dv.setUint32(w + 4, seq, true);
    this.data.set(payload, w + 8);
    Atomics.store(this.ctl, 0, w + need);
    return true;
  }
  peekSeq() {
    let r = Atomics.load(this.ctl, 1);
    const w = Atomics.load(this.ctl, 0);
    if (r === w) return null;
    const dv = new DataView(this.data.buffer, this.data.byteOffset);
    if (dv.getUint32(r, true) === 4294967295) {
      r = 0;
      if (r === w) return null;
    }
    return dv.getUint32(r + 4, true);
  }
  shift() {
    let r = Atomics.load(this.ctl, 1);
    const w = Atomics.load(this.ctl, 0);
    if (r === w) return null;
    const dv = new DataView(this.data.buffer, this.data.byteOffset);
    let len = dv.getUint32(r, true);
    if (len === 4294967295) {
      r = 0;
      if (r === w) {
        Atomics.store(this.ctl, 1, 0);
        return null;
      }
      len = dv.getUint32(r, true);
    }
    const seq = dv.getUint32(r + 4, true);
    const payload = this.data.slice(r + 8, r + 8 + len);
    Atomics.store(this.ctl, 1, r + 8 + len);
    return { seq, payload };
  }
};
var enc2 = new TextEncoder();
var dec2 = new TextDecoder();
function serialize(value) {
  const bins = [];
  let ok2 = true;
  const walk = (v, depth) => {
    if (!ok2 || depth > 64) {
      ok2 = false;
      return null;
    }
    if (v === null || typeof v === "number" || typeof v === "string" || typeof v === "boolean") {
      if (typeof v === "number" && !Number.isFinite(v)) return { $n: String(v) };
      return v;
    }
    if (v === void 0) return { $u: 1 };
    if (typeof v === "bigint") return { $bi: v.toString() };
    if (v instanceof Uint8Array && !(v.buffer instanceof SharedArrayBuffer)) {
      bins.push(v);
      return { $b: bins.length - 1, t: v.constructor.name };
    }
    if (ArrayBuffer.isView(v)) {
      if (v.buffer instanceof SharedArrayBuffer) {
        ok2 = false;
        return null;
      }
      bins.push(new Uint8Array(v.buffer, v.byteOffset, v.byteLength));
      return { $b: bins.length - 1, t: v.constructor.name };
    }
    if (v instanceof ArrayBuffer) {
      bins.push(new Uint8Array(v));
      return { $b: bins.length - 1, t: "ArrayBuffer" };
    }
    if (v instanceof Date) return { $d: v.getTime() };
    if (Array.isArray(v)) return v.map((x2) => walk(x2, depth + 1));
    if (v instanceof Map) return { $m: [...v].map(([k, x2]) => [walk(k, depth + 1), walk(x2, depth + 1)]) };
    if (v instanceof Set) return { $s: [...v].map((x2) => walk(x2, depth + 1)) };
    if (v instanceof Error) return { $e: { name: v.name, message: v.message, stack: v.stack } };
    if (typeof v === "object") {
      const proto2 = Object.getPrototypeOf(v);
      if (proto2 !== Object.prototype && proto2 !== null) {
        ok2 = false;
        return null;
      }
      const o = {};
      for (const k of Object.keys(v)) {
        const x2 = walk(v[k], depth + 1);
        o[k.startsWith("$") ? "$$" + k : k] = x2;
      }
      return o;
    }
    ok2 = false;
    return null;
  };
  const tree = walk(value, 0);
  if (!ok2) return null;
  const json = enc2.encode(JSON.stringify(tree));
  let total = 4 + json.length + 4;
  for (const b of bins) total += 4 + b.length;
  const out3 = new Uint8Array(total);
  const dv = new DataView(out3.buffer);
  dv.setUint32(0, json.length, true);
  out3.set(json, 4);
  let off = 4 + json.length;
  dv.setUint32(off, bins.length, true);
  off += 4;
  for (const b of bins) {
    dv.setUint32(off, b.length, true);
    out3.set(b, off + 4);
    off += 4 + b.length;
  }
  return out3;
}
function deserialize(data) {
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const jl = dv.getUint32(0, true);
  const tree = JSON.parse(dec2.decode(data.subarray(4, 4 + jl)));
  let off = 4 + jl;
  const n = dv.getUint32(off, true);
  off += 4;
  const bins = [];
  for (let i2 = 0; i2 < n; i2++) {
    const l = dv.getUint32(off, true);
    bins.push(data.slice(off + 4, off + 4 + l));
    off += 4 + l;
  }
  const ctors = { Uint8Array, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array, Uint8ClampedArray, BigInt64Array, BigUint64Array, DataView };
  const back = (v) => {
    if (v === null || typeof v !== "object") return v;
    if (Array.isArray(v)) return v.map(back);
    if ("$u" in v) return void 0;
    if ("$n" in v) return Number(v.$n);
    if ("$bi" in v) return BigInt(v.$bi);
    if ("$d" in v) return new Date(v.$d);
    if ("$m" in v) return new Map(v.$m.map(([k, x2]) => [back(k), back(x2)]));
    if ("$s" in v) return new Set(v.$s.map(back));
    if ("$e" in v) return Object.assign(new Error(v.$e.message), v.$e);
    if ("$b" in v) {
      const b = bins[v.$b];
      if (v.t === "ArrayBuffer") return b.buffer;
      if (v.t === "Buffer") return globalThis.Buffer.from(b);
      const C = ctors[v.t] ?? Uint8Array;
      return C === DataView ? new DataView(b.buffer) : new C(b.buffer, 0, b.byteLength / (C.BYTES_PER_ELEMENT ?? 1));
    }
    const o = {};
    for (const k of Object.keys(v)) o[k.startsWith("$$") ? k.slice(2) : k] = back(v[k]);
    return o;
  };
  return back(tree);
}
var kNative = /* @__PURE__ */ Symbol("native");
var nativeToWrapper = /* @__PURE__ */ new WeakMap();
var NodeMessagePort = class _NodeMessagePort extends EventEmitter {
  [kNative];
  handle = new Handle();
  started = false;
  /** Ring we write into (mirror for the peer's receiveMessageOnPort). */
  sendRing = null;
  /** Ring the peer writes into. */
  recvRing = null;
  seq = 1;
  consumed = /* @__PURE__ */ new Set();
  queued = [];
  onControl;
  closed = false;
  constructor(native) {
    super();
    this[kNative] = native;
    nativeToWrapper.set(native, this);
    native.onmessage = (ev) => this._receive(ev.data);
    native.onmessageerror = (ev) => this.emit("messageerror", ev.data);
    this.on("newListener", (ev) => {
      if (ev !== "message" || this.closed) return;
      if (!this.started) this.start();
      this.handle.activate();
    });
    this.on("removeListener", (ev) => {
      if (ev === "message" && this.listenerCount("message") === 0) this.handle.deactivate();
    });
  }
  _receive(env) {
    if (!env || typeof env !== "object" || !("k" in env)) {
      this._dispatch({ k: "m", d: env });
      return;
    }
    if (env.k === "ring") {
      this.recvRing = new Ring(env.ring);
      return;
    }
    if (env.k !== "m") {
      this.onControl?.(env);
      return;
    }
    if (env.s !== void 0 && this.consumed.has(env.s)) {
      this.consumed.delete(env.s);
      return;
    }
    if (env.s !== void 0 && this.recvRing) {
      this.dropMirrored(env.s);
    }
    this._dispatch(env);
  }
  dropMirrored(seq) {
    const ring = this.recvRing;
    for (; ; ) {
      const head = ring.peekSeq();
      if (head === null || head > seq) break;
      ring.shift();
    }
  }
  _dispatch(env) {
    if (!this.started) {
      this.queued.push(env);
      return;
    }
    this.emit("message", rewrap(env.d));
  }
  start() {
    this.started = true;
    this[kNative].start();
    if (this.listenerCount("message") > 0) this.handle.activate();
    queueMicrotask(() => {
      const q = this.queued;
      this.queued = [];
      for (const e of q) this.emit("message", rewrap(e.d));
    });
  }
  /** Enables the shared-ring mirror for this direction. */
  enableSync() {
    if (this.sendRing) return;
    this.sendRing = Ring.create();
    this[kNative].postMessage({ k: "ring", ring: this.sendRing.sab });
  }
  postMessage(value, transfer) {
    if (this.closed) return;
    const list = Array.isArray(transfer) ? transfer : transfer?.transfer ?? [];
    const natives = list.map((t) => t instanceof _NodeMessagePort ? t[kNative] : t);
    const s = this.seq++;
    if (this.sendRing) {
      const bytes2 = natives.length ? null : serialize(value);
      if (bytes2) this.sendRing.push(s, bytes2);
    }
    this[kNative].postMessage({ k: "m", d: unwrap(value), s }, natives);
  }
  _postControl(env) {
    this[kNative].postMessage(env);
  }
  /** Synchronous receive for receiveMessageOnPort. */
  _receiveSync() {
    if (this.queued.length) {
      const e = this.queued.shift();
      return { message: rewrap(e.d) };
    }
    const ring = this.recvRing;
    if (!ring) return void 0;
    const item = ring.shift();
    if (!item) return void 0;
    this.consumed.add(item.seq);
    return { message: deserialize(item.payload) };
  }
  close() {
    if (this.closed) return;
    this.closed = true;
    this.handle.deactivate();
    this[kNative].close();
    nextTick(() => this.emit("close"));
  }
  ref() {
    this.handle.ref();
    return this;
  }
  unref() {
    this.handle.unref();
    return this;
  }
  hasRef() {
    return this.handle.hasRef();
  }
  // DOM-style compatibility
  addEventListener(type2, fn) {
    this.on(type2, (data) => fn({ data }));
  }
  removeEventListener() {
  }
  set onmessage(fn) {
    this.removeAllListeners("message");
    if (fn) this.on("message", (data) => fn({ data }));
  }
};
function unwrap(v, depth = 0) {
  if (depth > 8 || v === null || typeof v !== "object") return v;
  if (v instanceof NodeMessagePort) return v[kNative];
  if (ArrayBuffer.isView(v) || v instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && v instanceof SharedArrayBuffer) return v;
  if (v instanceof WebAssembly.Memory || v instanceof WebAssembly.Module) return v;
  if (Array.isArray(v)) {
    let changed2 = false;
    const out4 = v.map((x2) => {
      const y = unwrap(x2, depth + 1);
      if (y !== x2) changed2 = true;
      return y;
    });
    return changed2 ? out4 : v;
  }
  const proto2 = Object.getPrototypeOf(v);
  if (proto2 !== Object.prototype && proto2 !== null) return v;
  let changed = false;
  const out3 = {};
  for (const k of Object.keys(v)) {
    const y = unwrap(v[k], depth + 1);
    if (y !== v[k]) changed = true;
    out3[k] = y;
  }
  return changed ? out3 : v;
}
function rewrap(v, depth = 0) {
  if (depth > 8 || v === null || typeof v !== "object") return v;
  if (typeof MessagePort !== "undefined" && v instanceof globalThis.MessagePort) return nativeToWrapper.get(v) ?? new NodeMessagePort(v);
  if (ArrayBuffer.isView(v) || v instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && v instanceof SharedArrayBuffer) return v;
  if (v instanceof WebAssembly.Memory || v instanceof WebAssembly.Module) return v;
  if (Array.isArray(v)) {
    for (let i2 = 0; i2 < v.length; i2++) v[i2] = rewrap(v[i2], depth + 1);
    return v;
  }
  const proto2 = Object.getPrototypeOf(v);
  if (proto2 !== Object.prototype && proto2 !== null) return v;
  for (const k of Object.keys(v)) v[k] = rewrap(v[k], depth + 1);
  return v;
}
var MessageChannel2 = class {
  port1;
  port2;
  constructor() {
    const ch = new globalThis.MessageChannel();
    this.port1 = new NodeMessagePort(ch.port1);
    this.port2 = new NodeMessagePort(ch.port2);
    this.port1.enableSync();
    this.port2.enableSync();
  }
};
var MessagePort = NodeMessagePort;
function receiveMessageOnPort(port) {
  if (!(port instanceof NodeMessagePort)) {
    const e = new TypeError('The "port" argument must be a MessagePort instance');
    e.code = "ERR_INVALID_ARG_TYPE";
    throw e;
  }
  return port._receiveSync();
}
var isMainThread = true;
var parentPort = null;
var workerData = null;
var threadId = 0;
var resourceLimits = {};
var SHARE_ENV = /* @__PURE__ */ Symbol.for("nodejs.worker_threads.SHARE_ENV");
var envData = /* @__PURE__ */ new Map();
function initThread(info) {
  isMainThread = info.isMain;
  threadId = info.isMain ? 0 : info.tid;
  if (info.parentPort) {
    parentPort = new NodeMessagePort(info.parentPort);
  }
  workerData = rewrap(info.workerData ?? null);
  for (const [k, v] of info.envData ?? []) envData.set(k, v);
}
function getEnvironmentData(k) {
  return envData.get(k);
}
function setEnvironmentData(k, v) {
  if (v === void 0) envData.delete(k);
  else envData.set(k, v);
}
function markAsUntransferable(_o) {
}
function isMarkedAsUntransferable(_o) {
  return false;
}
function markAsUncloneable(_o) {
}
function moveMessagePortToContext(p) {
  return p;
}
var BroadcastChannel = globalThis.BroadcastChannel;
var nextReq = 1;
var Worker2 = class extends EventEmitter {
  threadId = -1;
  port;
  handle = new Handle();
  exited = false;
  exitWaiters = [];
  resourceLimits = {};
  stdin = null;
  stdout;
  stderr;
  performance = { eventLoopUtilization: () => ({ idle: 0, active: 0, utilization: 0 }) };
  constructor(filename, opts = {}) {
    super();
    const ch = new globalThis.MessageChannel();
    this.port = new NodeMessagePort(ch.port1);
    this.port.onControl = (env2) => this._control(env2);
    this.port.on("message", (m) => this.emit("message", m));
    let file;
    let isEval = !!opts.eval;
    if (filename instanceof URL || typeof filename === "string" && filename.startsWith("file:")) {
      file = decodeURIComponent(new URL(String(filename)).pathname);
    } else if (typeof filename === "string" && filename.startsWith("data:")) {
      isEval = true;
      const comma = filename.indexOf(",");
      const meta = filename.slice(5, comma);
      const body = filename.slice(comma + 1);
      file = meta.includes("base64") ? atob(body) : decodeURIComponent(body);
      opts = { ...opts, type: "module" };
    } else {
      file = String(filename);
      if (!isEval && !file.startsWith("/")) {
        if (!file.startsWith("./") && !file.startsWith("../")) {
          const e = new TypeError(`The worker script or module filename must be an absolute path or a relative path starting with './' or '../'. Received "${file}"`);
          e.code = "ERR_WORKER_PATH";
          throw e;
        }
        file = globalThis.process.cwd() + "/" + file;
      }
    }
    const userTransfer = (opts.transferList ?? []).map((t) => t instanceof NodeMessagePort ? t[kNative] : t);
    const transfer = [ch.port2, ...userTransfer];
    const env = opts.env === SHARE_ENV || opts.env === void 0 ? { ...globalThis.process.env } : Object.fromEntries(Object.entries(opts.env).map(([k, v]) => [k, String(v)]));
    const reqId = nextReq++;
    this.threadId = sys("threadReserve", {});
    post(
      {
        t: "threadSpawn",
        reqId,
        tid: this.threadId,
        file,
        eval: isEval,
        evalType: opts.type,
        argv: (opts.argv ?? []).map(String),
        execArgv: opts.execArgv ?? globalThis.process.execArgv,
        env,
        workerData: unwrap(opts.workerData),
        envData: [...envData],
        port: ch.port2,
        transfer: userTransfer,
        name: opts.name
      },
      transfer
    );
    this.handle.activate();
    this.stdout = { on() {
    }, pipe() {
    }, setEncoding() {
    }, resume() {
    } };
    this.stderr = this.stdout;
    this.port.start();
  }
  _control(env) {
    switch (env.k) {
      case "online":
        this.emit("online");
        break;
      case "error": {
        const e = env.d;
        const err3 = e && typeof e === "object" && "message" in e ? Object.assign(new Error(e.message), e) : e;
        this.emit("error", err3);
        break;
      }
      case "exit":
        this._exit(env.code ?? 0);
        break;
    }
  }
  _exit(code) {
    if (this.exited) return;
    this.exited = true;
    this.handle.deactivate();
    this.port.close();
    this.emit("exit", code);
    for (const w of this.exitWaiters) w(code);
  }
  postMessage(value, transfer) {
    this.port.postMessage(value, transfer);
  }
  terminate(cb) {
    if (this.exited) {
      cb?.(null, 1);
      return Promise.resolve(1);
    }
    const p = new Promise((r) => this.exitWaiters.push(r));
    post({ t: "threadKill", tid: this.threadId });
    setTimeout(() => this._exit(1), 50);
    if (cb) p.then((c) => cb(null, c));
    return p;
  }
  ref() {
    this.handle.ref();
  }
  unref() {
    this.handle.unref();
  }
  getHeapSnapshot() {
    return Promise.reject(new Error("not supported"));
  }
};
function postMessageToThread() {
  return Promise.reject(new Error("postMessageToThread is not supported"));
}
var worker_threads_default = {
  isMainThread: void 0,
  parentPort: void 0,
  workerData: void 0,
  threadId: void 0,
  resourceLimits,
  SHARE_ENV,
  Worker: Worker2,
  MessageChannel: MessageChannel2,
  MessagePort,
  BroadcastChannel,
  receiveMessageOnPort,
  getEnvironmentData,
  setEnvironmentData,
  markAsUntransferable,
  isMarkedAsUntransferable,
  markAsUncloneable,
  moveMessagePortToContext,
  postMessageToThread
};

// src/node/wasi-path.ts
var WasiPathError = class extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
  code;
};
var S_IFMT = 61440;
var S_IFLNK = 40960;
var MAX_LINKS = 32;
function resolveBeneath(ops, dir, guestDir, p, follow) {
  if (p === "") throw new WasiPathError("ENOENT");
  if (p.includes("\0")) throw new WasiPathError("EINVAL");
  const guestRoot = normalize(guestDir).replace(/(.)\/$/, "$1");
  const fromAbsolute = (abs) => {
    if (!isAbsolute(guestRoot)) throw new WasiPathError("ENOTCAPABLE");
    const rel2 = relative(guestRoot, normalize(abs));
    if (rel2 === ".." || rel2.startsWith("../") || isAbsolute(rel2)) throw new WasiPathError("ENOTCAPABLE");
    return rel2 ? rel2.split("/") : [];
  };
  if (p.startsWith("/")) throw new WasiPathError("ENOTCAPABLE");
  let parts = [];
  let rest = p.split("/");
  const trailingSlash = p.endsWith("/");
  let links = 0;
  while (rest.length) {
    const c = rest.shift();
    if (c === "" || c === ".") continue;
    if (c === "..") {
      if (!parts.length) {
        if (guestRoot === "/") continue;
        throw new WasiPathError("ENOTCAPABLE");
      }
      parts.pop();
      continue;
    }
    parts.push(c);
    const last = rest.every((r) => r === "" || r === ".");
    if (last && !follow && !trailingSlash) break;
    const host = join(dir, ...parts);
    let mode;
    try {
      mode = ops.lstatMode(host);
    } catch (e) {
      if (last) break;
      throw e;
    }
    if ((mode & S_IFMT) !== S_IFLNK) continue;
    if (++links > MAX_LINKS) throw new WasiPathError("ELOOP");
    const target = ops.readlink(host);
    parts.pop();
    if (target.startsWith("/")) {
      parts = [];
      rest = [...fromAbsolute(target), ...rest];
    } else rest = [...target.split("/"), ...rest];
  }
  const rel = parts.join("/");
  return { host: rel ? join(dir, rel) : dir, rel };
}

// src/node/wasi.ts
var ERRNO = {
  E2BIG: 1,
  EACCES: 2,
  EADDRINUSE: 3,
  EAGAIN: 6,
  EBADF: 8,
  EBUSY: 10,
  ECANCELED: 11,
  ECHILD: 12,
  ECONNREFUSED: 14,
  ECONNRESET: 15,
  EEXIST: 20,
  EFAULT: 21,
  EFBIG: 22,
  EINTR: 27,
  EINVAL: 28,
  EIO: 29,
  EISDIR: 31,
  ELOOP: 32,
  EMFILE: 33,
  EMLINK: 34,
  ENAMETOOLONG: 37,
  ENFILE: 41,
  ENODEV: 43,
  ENOENT: 44,
  ENOEXEC: 45,
  ENOMEM: 48,
  ENOSPC: 51,
  ENOSYS: 52,
  ENOTCONN: 53,
  ENOTDIR: 54,
  ENOTEMPTY: 55,
  ENOTSUP: 58,
  ENOTTY: 59,
  ENXIO: 60,
  EPERM: 63,
  EPIPE: 64,
  ERANGE: 68,
  EROFS: 69,
  ESPIPE: 70,
  ESRCH: 71,
  ETIMEDOUT: 73,
  EXDEV: 75,
  ENOTCAPABLE: 76
};
var ESUCCESS = 0;
var EBADF = 8;
var ENOSYS = 52;
var FT_UNKNOWN = 0;
var FT_CHAR = 2;
var FT_DIR = 3;
var FT_REG = 4;
var FT_SYMLINK = 7;
var RIGHTS_ALL = 0x1fffffffn;
var LOOKUP_SYMLINK_FOLLOW = 1;
var FST_ATIM = 1;
var FST_ATIM_NOW = 2;
var FST_MTIM = 4;
var FST_MTIM_NOW = 8;
function errnoOf(e) {
  if (e instanceof WASIExit) throw e;
  if (e instanceof SysError) return ERRNO[e.code] ?? 29;
  const code = e?.code;
  if (code && ERRNO[code] !== void 0) return ERRNO[code];
  return 29;
}
function filetypeOf(mode) {
  switch (mode & 61440) {
    case 16384:
      return FT_DIR;
    case 32768:
      return FT_REG;
    case 40960:
      return FT_SYMLINK;
    case 8192:
      return FT_CHAR;
    default:
      return FT_UNKNOWN;
  }
}
var pathOps = {
  lstatMode: (p) => sys("stat", { p, l: true }).mode,
  readlink: (p) => sys("readlink", { p })
};
var WASIExit = class extends Error {
  constructor(code) {
    super(`WASI exit ${code}`);
    this.code = code;
  }
  code;
};
var Preview1 = class {
  wasiImport;
  fds = /* @__PURE__ */ new Map();
  args;
  env;
  memory = null;
  constructor(opts = {}) {
    this.args = opts.args ?? [];
    this.env = opts.env ?? [];
    this.fds.set(0, { kfd: opts.stdin ?? 0, path: "/dev/stdin", type: FT_CHAR });
    this.fds.set(1, { kfd: opts.stdout ?? 1, path: "/dev/stdout", type: FT_CHAR });
    this.fds.set(2, { kfd: opts.stderr ?? 2, path: "/dev/stderr", type: FT_CHAR });
    let next = 3;
    for (const [guest, host] of Object.entries(opts.preopens ?? {})) {
      const hostAbs = resolve(globalThis.process?.cwd?.() ?? "/", host);
      this.fds.set(next++, { kfd: null, path: hostAbs, guest, type: FT_DIR, preopen: guest });
    }
    this.wasiImport = this.makeImports();
  }
  /** The instance's memory (node_wasi.cc's _setMemory: it has to be a WebAssembly.Memory). */
  setMemory(m) {
    if (!(m instanceof WebAssembly.Memory)) throw Object.assign(new TypeError('"instance.exports.memory" property must be a WebAssembly.Memory object'), { code: "ERR_INVALID_ARG_TYPE" });
    this.memory = m;
  }
  view() {
    return new DataView(this.memory.buffer);
  }
  bytes() {
    return new Uint8Array(this.memory.buffer);
  }
  readStr(ptr, len) {
    return new TextDecoder().decode(this.bytes().slice(ptr, ptr + len));
  }
  /** A path argument looked up beneath its directory fd (wasi-path.ts); null for an unknown fd. */
  resolve(dirfd, ptr, len, follow) {
    const d = this.fds.get(dirfd);
    if (!d) return null;
    if (d.type !== FT_DIR) throw new WasiPathError("ENOTDIR");
    const guestDir = d.guest ?? d.path;
    const r = resolveBeneath(pathOps, d.path, guestDir, this.readStr(ptr, len), follow);
    return { host: r.host, guest: r.rel ? join(guestDir, r.rel) : guestDir };
  }
  makeImports() {
    const self2 = this;
    const enc4 = new TextEncoder();
    const wrap2 = (fn) => (...a) => {
      try {
        return fn(...a);
      } catch (e) {
        return errnoOf(e);
      }
    };
    const writeStrings = (list, ptrs, buf2) => {
      const v = self2.view();
      const b = self2.bytes();
      let off = buf2;
      list.forEach((s, i2) => {
        v.setUint32(ptrs + i2 * 4, off, true);
        const e = enc4.encode(s + "\0");
        b.set(e, off);
        off += e.length;
      });
      return ESUCCESS;
    };
    const sizes = (list, countPtr, sizePtr) => {
      const v = self2.view();
      v.setUint32(countPtr, list.length, true);
      v.setUint32(sizePtr, list.reduce((a, s) => a + enc4.encode(s).length + 1, 0), true);
      return ESUCCESS;
    };
    const iovecs = (ptr, len) => {
      const v = self2.view();
      const out3 = [];
      for (let i2 = 0; i2 < len; i2++) out3.push([v.getUint32(ptr + i2 * 8, true), v.getUint32(ptr + i2 * 8 + 4, true)]);
      return out3;
    };
    const writeFilestat = (ptr, st) => {
      const v = self2.view();
      v.setBigUint64(ptr, BigInt(st.dev ?? 0), true);
      v.setBigUint64(ptr + 8, BigInt(st.ino ?? 0), true);
      v.setUint8(ptr + 16, filetypeOf(st.mode));
      v.setBigUint64(ptr + 24, BigInt(st.nlink ?? 1), true);
      v.setBigUint64(ptr + 32, BigInt(st.size ?? 0), true);
      v.setBigUint64(ptr + 40, BigInt(Math.floor((st.atimeMs ?? 0) * 1e6)), true);
      v.setBigUint64(ptr + 48, BigInt(Math.floor((st.mtimeMs ?? 0) * 1e6)), true);
      v.setBigUint64(ptr + 56, BigInt(Math.floor((st.ctimeMs ?? 0) * 1e6)), true);
    };
    const setTimes = (p, l, atim, mtim, fst) => {
      if (fst & FST_ATIM && fst & FST_ATIM_NOW || fst & FST_MTIM && fst & FST_MTIM_NOW) return ERRNO.EINVAL;
      const now = Date.now();
      const st = fst & (FST_ATIM | FST_ATIM_NOW) && fst & (FST_MTIM | FST_MTIM_NOW) ? null : sys("stat", { p, l });
      const atime = fst & FST_ATIM ? Number(atim) / 1e6 : fst & FST_ATIM_NOW ? now : st.atimeMs;
      const mtime = fst & FST_MTIM ? Number(mtim) / 1e6 : fst & FST_MTIM_NOW ? now : st.mtimeMs;
      sys("utimes", { p, atime, mtime, l });
      return ESUCCESS;
    };
    const ensureKfd = (e) => {
      if (e.kfd === null) e.kfd = sys("open", { p: e.path, flags: 0, mode: 0 });
      return e.kfd;
    };
    const allocFd = (e) => {
      let fd2 = 3;
      while (self2.fds.has(fd2)) fd2++;
      self2.fds.set(fd2, e);
      return fd2;
    };
    return {
      args_get: wrap2((argv, buf2) => writeStrings(self2.args, argv, buf2)),
      args_sizes_get: wrap2((c, s) => sizes(self2.args, c, s)),
      environ_get: wrap2((envp, buf2) => writeStrings(self2.env, envp, buf2)),
      environ_sizes_get: wrap2((c, s) => sizes(self2.env, c, s)),
      clock_res_get: wrap2((_id, ptr) => {
        self2.view().setBigUint64(ptr, 1000n, true);
        return ESUCCESS;
      }),
      clock_time_get: wrap2((id, _prec, ptr) => {
        const ns = id === 0 ? BigInt(Date.now()) * 1000000n : BigInt(Math.floor((timeOrigin + perfNow()) * 1e6));
        self2.view().setBigUint64(ptr, ns, true);
        return ESUCCESS;
      }),
      fd_advise: () => ESUCCESS,
      fd_allocate: () => ESUCCESS,
      fd_close: wrap2((fd2) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        if (e.kfd !== null && fd2 > 2) sys("close", { fd: e.kfd });
        self2.fds.delete(fd2);
        return ESUCCESS;
      }),
      fd_datasync: () => ESUCCESS,
      fd_sync: () => ESUCCESS,
      fd_fdstat_get: wrap2((fd2, ptr) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const v = self2.view();
        v.setUint8(ptr, e.type);
        v.setUint16(ptr + 2, e.append ? 1 : 0, true);
        v.setBigUint64(ptr + 8, RIGHTS_ALL, true);
        v.setBigUint64(ptr + 16, RIGHTS_ALL, true);
        return ESUCCESS;
      }),
      fd_fdstat_set_flags: () => ESUCCESS,
      fd_fdstat_set_rights: () => ESUCCESS,
      fd_filestat_get: wrap2((fd2, ptr) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const st = e.kfd !== null ? sys("fstat", { fd: e.kfd }) : sys("stat", { p: e.path });
        writeFilestat(ptr, st);
        return ESUCCESS;
      }),
      fd_filestat_set_size: wrap2((fd2, size) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        sys("ftruncate", { fd: ensureKfd(e), len: Number(size) });
        return ESUCCESS;
      }),
      fd_filestat_set_times: wrap2((fd2, atim, mtim, fst) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        return setTimes(e.path, false, atim, mtim, fst);
      }),
      fd_pread: wrap2((fd2, iovs, iovsLen, offset, nread) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const kfd = ensureKfd(e);
        let total = 0;
        let pos = Number(offset);
        for (const [p, l] of iovecs(iovs, iovsLen)) {
          const d = sys("read", { fd: kfd, len: l, pos });
          self2.bytes().set(d, p);
          total += d.length;
          pos += d.length;
          if (d.length < l) break;
        }
        self2.view().setUint32(nread, total, true);
        return ESUCCESS;
      }),
      fd_pwrite: wrap2((fd2, iovs, iovsLen, offset, nwritten) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const kfd = ensureKfd(e);
        let total = 0;
        let pos = Number(offset);
        for (const [p, l] of iovecs(iovs, iovsLen)) {
          const n = sys("write", { fd: kfd, pos }, self2.bytes().slice(p, p + l));
          total += n;
          pos += n;
        }
        self2.view().setUint32(nwritten, total, true);
        return ESUCCESS;
      }),
      fd_prestat_get: wrap2((fd2, ptr) => {
        const e = self2.fds.get(fd2);
        if (!e || e.preopen === void 0) return EBADF;
        const v = self2.view();
        v.setUint8(ptr, 0);
        v.setUint32(ptr + 4, enc4.encode(e.preopen).length, true);
        return ESUCCESS;
      }),
      fd_prestat_dir_name: wrap2((fd2, ptr, len) => {
        const e = self2.fds.get(fd2);
        if (!e || e.preopen === void 0) return EBADF;
        self2.bytes().set(enc4.encode(e.preopen).subarray(0, len), ptr);
        return ESUCCESS;
      }),
      fd_read: wrap2((fd2, iovs, iovsLen, nread) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const kfd = ensureKfd(e);
        let total = 0;
        for (const [p, l] of iovecs(iovs, iovsLen)) {
          if (l === 0) continue;
          const d = sys("read", { fd: kfd, len: l, pos: null });
          self2.bytes().set(d, p);
          total += d.length;
          if (d.length < l) break;
        }
        self2.view().setUint32(nread, total, true);
        return ESUCCESS;
      }),
      fd_readdir: wrap2((fd2, buf2, bufLen, cookie, bufused) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        if (!e.dirents || Number(cookie) === 0) e.dirents = [[".", 16384], ["..", 16384], ...sys("readdir", { p: e.path, types: true })];
        const v = self2.view();
        const b = self2.bytes();
        let off = 0;
        for (let i2 = Number(cookie); i2 < e.dirents.length; i2++) {
          const [name, type2] = e.dirents[i2];
          const nb = enc4.encode(name);
          const header = new Uint8Array(24);
          const hv = new DataView(header.buffer);
          hv.setBigUint64(0, BigInt(i2 + 1), true);
          hv.setBigUint64(8, BigInt(i2 + 1), true);
          hv.setUint32(16, nb.length, true);
          hv.setUint8(20, filetypeOf(type2));
          const entry = new Uint8Array(24 + nb.length);
          entry.set(header);
          entry.set(nb, 24);
          const room = bufLen - off;
          if (room <= 0) break;
          b.set(entry.subarray(0, Math.min(room, entry.length)), buf2 + off);
          off += Math.min(room, entry.length);
          if (room < entry.length) break;
        }
        v.setUint32(bufused, off, true);
        return ESUCCESS;
      }),
      fd_renumber: wrap2((from, to) => {
        const e = self2.fds.get(from);
        if (!e) return EBADF;
        const old = self2.fds.get(to);
        if (old?.kfd !== null && old && to > 2) sys("close", { fd: old.kfd });
        self2.fds.set(to, e);
        self2.fds.delete(from);
        return ESUCCESS;
      }),
      fd_seek: wrap2((fd2, offset, whence, newOffset) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const pos = sys("lseek", { fd: ensureKfd(e), offset: Number(offset), whence });
        self2.view().setBigUint64(newOffset, BigInt(pos), true);
        return ESUCCESS;
      }),
      fd_tell: wrap2((fd2, ptr) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const pos = sys("lseek", { fd: ensureKfd(e), offset: 0, whence: 1 });
        self2.view().setBigUint64(ptr, BigInt(pos), true);
        return ESUCCESS;
      }),
      fd_write: wrap2((fd2, iovs, iovsLen, nwritten) => {
        const e = self2.fds.get(fd2);
        if (!e) return EBADF;
        const kfd = ensureKfd(e);
        const parts = iovecs(iovs, iovsLen);
        const total = parts.reduce((a, [, l]) => a + l, 0);
        const data = new Uint8Array(total);
        let off = 0;
        const b = self2.bytes();
        for (const [p, l] of parts) {
          data.set(b.subarray(p, p + l), off);
          off += l;
        }
        const n = total ? sys("write", { fd: kfd, pos: null }, data) : 0;
        self2.view().setUint32(nwritten, n, true);
        return ESUCCESS;
      }),
      path_create_directory: wrap2((dirfd, p, l) => {
        const r = self2.resolve(dirfd, p, l, false);
        if (!r) return EBADF;
        sys("mkdir", { p: r.host, recursive: false, mode: 511 });
        return ESUCCESS;
      }),
      path_filestat_get: wrap2((dirfd, flags, p, l, ptr) => {
        const r = self2.resolve(dirfd, p, l, !!(flags & LOOKUP_SYMLINK_FOLLOW));
        if (!r) return EBADF;
        writeFilestat(ptr, sys("stat", { p: r.host, l: true }));
        return ESUCCESS;
      }),
      path_filestat_set_times: wrap2((dirfd, flags, p, l, atim, mtim, fst) => {
        const r = self2.resolve(dirfd, p, l, !!(flags & LOOKUP_SYMLINK_FOLLOW));
        if (!r) return EBADF;
        return setTimes(r.host, true, atim, mtim, fst);
      }),
      path_link: wrap2((ofd, oflags, op, ol, nfd, np, nl) => {
        const a = self2.resolve(ofd, op, ol, !!(oflags & LOOKUP_SYMLINK_FOLLOW));
        const b = self2.resolve(nfd, np, nl, false);
        if (!a || !b) return EBADF;
        sys("link", { from: a.host, to: b.host });
        return ESUCCESS;
      }),
      path_open: wrap2((dirfd, dirflags, p, l, oflags, rightsBase, _ri, fdflags, fdOut) => {
        const r = self2.resolve(dirfd, p, l, !!(dirflags & LOOKUP_SYMLINK_FOLLOW));
        if (!r) return EBADF;
        const hp = r.host;
        const creat = oflags & 1;
        const directory = oflags & 2;
        const excl = oflags & 4;
        const trunc = oflags & 8;
        let st = null;
        try {
          st = sys("stat", { p: hp, l: true });
        } catch (e) {
          if (!creat) throw e;
        }
        if (st && creat && excl) return ERRNO.EEXIST;
        if (st && (st.mode & 61440) === 40960) return ERRNO.ELOOP;
        if (st && (st.mode & 61440) === 16384) {
          if (trunc) return ERRNO.EISDIR;
          const fd3 = allocFd({ kfd: null, path: hp, guest: r.guest, type: FT_DIR });
          self2.view().setUint32(fdOut, fd3, true);
          return ESUCCESS;
        }
        if (directory) return st ? ERRNO.ENOTDIR : ERRNO.ENOENT;
        const rb = BigInt(rightsBase);
        const write2 = (rb & 1n << 6n) !== 0n || (rb & 1n << 4n) !== 0n || (rb & 1n << 22n) !== 0n || !!creat || !!trunc;
        const read2 = (rb & 1n << 1n) !== 0n || (rb & 1n << 14n) !== 0n || !write2;
        let flags = read2 && write2 ? 2 : write2 ? 1 : 0;
        if (creat) flags |= 64;
        if (excl) flags |= 128;
        if (trunc) flags |= 512;
        if (fdflags & 1) flags |= 1024;
        const kfd = sys("open", { p: hp, flags, mode: 438 });
        const fd2 = allocFd({ kfd, path: hp, type: FT_REG, append: !!(fdflags & 1) });
        self2.view().setUint32(fdOut, fd2, true);
        return ESUCCESS;
      }),
      path_readlink: wrap2((dirfd, p, l, buf2, bufLen, used) => {
        const r = self2.resolve(dirfd, p, l, false);
        if (!r) return EBADF;
        const t = enc4.encode(sys("readlink", { p: r.host }));
        const n = Math.min(t.length, bufLen);
        self2.bytes().set(t.subarray(0, n), buf2);
        self2.view().setUint32(used, n, true);
        return ESUCCESS;
      }),
      path_remove_directory: wrap2((dirfd, p, l) => {
        const r = self2.resolve(dirfd, p, l, false);
        if (!r) return EBADF;
        sys("rmdir", { p: r.host });
        return ESUCCESS;
      }),
      path_rename: wrap2((ofd, op, ol, nfd, np, nl) => {
        const a = self2.resolve(ofd, op, ol, false);
        const b = self2.resolve(nfd, np, nl, false);
        if (!a || !b) return EBADF;
        sys("rename", { from: a.host, to: b.host });
        return ESUCCESS;
      }),
      path_symlink: wrap2((op, ol, dirfd, np, nl) => {
        const target = self2.readStr(op, ol);
        const r = self2.resolve(dirfd, np, nl, false);
        if (!r) return EBADF;
        sys("symlink", { target, p: r.host });
        return ESUCCESS;
      }),
      path_unlink_file: wrap2((dirfd, p, l) => {
        const r = self2.resolve(dirfd, p, l, false);
        if (!r) return EBADF;
        sys("unlink", { p: r.host });
        return ESUCCESS;
      }),
      poll_oneoff: wrap2((inPtr, outPtr, nsubs, neventsPtr) => {
        const v = self2.view();
        let timeout = Infinity;
        let events = 0;
        for (let i2 = 0; i2 < nsubs; i2++) {
          const base = inPtr + i2 * 48;
          const userdata = v.getBigUint64(base, true);
          const tag = v.getUint8(base + 8);
          if (tag === 0) {
            const t = v.getBigUint64(base + 24, true);
            const abs = v.getUint16(base + 40, true) & 1;
            const ns = abs ? Number(t) - (timeOrigin + perfNow()) * 1e6 : Number(t);
            timeout = Math.min(timeout, Math.max(0, ns / 1e6));
            const ev = outPtr + events * 32;
            v.setBigUint64(ev, userdata, true);
            v.setUint16(ev + 8, 0, true);
            v.setUint8(ev + 10, 0);
            events++;
          } else {
            const ev = outPtr + events * 32;
            v.setBigUint64(ev, userdata, true);
            v.setUint16(ev + 8, 0, true);
            v.setUint8(ev + 10, tag);
            v.setBigUint64(ev + 16, 1n, true);
            events++;
            timeout = 0;
          }
        }
        if (timeout > 0 && timeout !== Infinity) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, timeout);
        v.setUint32(neventsPtr, events, true);
        return ESUCCESS;
      }),
      proc_exit: (code) => {
        throw new WASIExit(code);
      },
      proc_raise: () => ENOSYS,
      sched_yield: () => ESUCCESS,
      random_get: wrap2((buf2, len) => {
        const tmp = new Uint8Array(len);
        for (let i2 = 0; i2 < len; i2 += 65536) getRandomValues(tmp.subarray(i2, Math.min(len, i2 + 65536)));
        self2.bytes().set(tmp, buf2);
        return ESUCCESS;
      }),
      sock_accept: () => ENOSYS,
      sock_recv: () => ENOSYS,
      sock_send: () => ENOSYS,
      sock_shutdown: () => ENOSYS
    };
  }
};
function argTypeError(name, type2, v) {
  const got = v === null || v === void 0 ? String(v) : typeof v === "function" ? `function ${v.name}` : typeof v === "object" ? `an instance of ${v.constructor?.name ?? "Object"}` : `type ${typeof v} (${typeof v === "string" ? `'${v}'` : String(v)})`;
  return Object.assign(new TypeError(`The "${name}" property must be of type ${type2}. Received ${got}`), { code: "ERR_INVALID_ARG_TYPE" });
}
function argValueError(name, v, reason) {
  return Object.assign(new TypeError(`The property '${name}' ${reason}. Received ${typeof v === "string" ? `'${v}'` : String(v)}`), { code: "ERR_INVALID_ARG_VALUE" });
}
var isObject2 = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
var WASI = class {
  wasiImport;
  impl;
  bindingName;
  returnOnExit;
  started = false;
  constructor(opts = {}) {
    if (!isObject2(opts)) throw argTypeError("options", "object", opts);
    if (typeof opts.version !== "string") throw argTypeError("options.version", "string", opts.version);
    if (opts.version === "unstable") this.bindingName = "wasi_unstable";
    else if (opts.version === "preview1") this.bindingName = "wasi_snapshot_preview1";
    else throw argValueError("options.version", opts.version, "unsupported WASI version");
    if (opts.args !== void 0 && !Array.isArray(opts.args)) throw argTypeError("options.args", "Array", opts.args);
    if (opts.env !== void 0 && !isObject2(opts.env)) throw argTypeError("options.env", "object", opts.env);
    if (opts.preopens !== void 0 && !isObject2(opts.preopens)) throw argTypeError("options.preopens", "object", opts.preopens);
    if (opts.returnOnExit !== void 0 && typeof opts.returnOnExit !== "boolean") throw argTypeError("options.returnOnExit", "boolean", opts.returnOnExit);
    const { stdin = 0, stdout = 1, stderr = 2 } = opts;
    for (const [k, v] of [["stdin", stdin], ["stdout", stdout], ["stderr", stderr]]) {
      if (typeof v !== "number") throw argTypeError(`options.${k}`, "number", v);
      if (!Number.isInteger(v) || v < 0 || v > 2147483647) {
        throw Object.assign(new RangeError(`The value of "options.${k}" is out of range. It must be >= 0 && <= 2147483647. Received ${v}`), { code: "ERR_OUT_OF_RANGE" });
      }
    }
    const env = Object.entries(opts.env ?? {}).filter(([, v]) => v !== void 0).map(([k, v]) => `${k}=${v}`);
    const preopens = Object.fromEntries(Object.entries(opts.preopens ?? {}).map(([k, v]) => [String(k), String(v)]));
    this.impl = new Preview1({ args: (opts.args ?? []).map(String), env, preopens, stdin, stdout, stderr });
    this.returnOnExit = opts.returnOnExit ?? true;
    this.wasiImport = this.impl.wasiImport;
  }
  getImportObject() {
    return { [this.bindingName]: this.wasiImport };
  }
  start(instance) {
    if (this.started) throw Object.assign(new Error("WASI instance has already started"), { code: "ERR_WASI_ALREADY_STARTED" });
    this.started = true;
    this.bind(instance);
    const { _start, _initialize } = instance.exports;
    if (typeof _start !== "function") throw argTypeError("instance.exports._start", "function", _start);
    if (_initialize !== void 0) throw argTypeError("instance.exports._initialize", "undefined", _initialize);
    try {
      _start();
    } catch (e) {
      if (e instanceof WASIExit) {
        if (this.returnOnExit) return e.code;
        globalThis.process.exit(e.code);
      }
      throw e;
    }
    return 0;
  }
  initialize(instance) {
    if (this.started) throw Object.assign(new Error("WASI instance has already started"), { code: "ERR_WASI_ALREADY_STARTED" });
    this.started = true;
    this.bind(instance);
    const { _start, _initialize } = instance.exports;
    if (_start !== void 0) throw argTypeError("instance.exports._start", "undefined", _start);
    if (_initialize !== void 0) {
      if (typeof _initialize !== "function") throw argTypeError("instance.exports._initialize", "function", _initialize);
      _initialize();
    }
  }
  bind(instance) {
    if (!isObject2(instance)) throw argTypeError("instance", "object", instance);
    if (!isObject2(instance.exports)) throw argTypeError("instance.exports", "object", instance.exports);
    this.impl.setMemory(instance.exports.memory);
  }
};
var wasiModule = { WASI };

// src/node/globals.ts
var HIDE = [
  "self",
  "WorkerGlobalScope",
  "DedicatedWorkerGlobalScope",
  "WorkerLocation",
  "WorkerNavigator",
  "importScripts",
  "postMessage",
  "close",
  "addEventListener",
  "removeEventListener",
  "dispatchEvent",
  "onmessage",
  "onmessageerror",
  "onerror",
  "onunhandledrejection",
  "onrejectionhandled",
  "onlanguagechange",
  "onoffline",
  "ononline",
  "location",
  "name",
  "origin",
  "isSecureContext",
  "crossOriginIsolated",
  "caches",
  "indexedDB",
  "IDBFactory",
  "XMLHttpRequest",
  "XMLHttpRequestUpload",
  "XMLHttpRequestEventTarget",
  "FileReaderSync",
  "Worker",
  "SharedWorker",
  "requestAnimationFrame",
  "cancelAnimationFrame",
  "OffscreenCanvas",
  "OffscreenCanvasRenderingContext2D",
  "ImageBitmap",
  "createImageBitmap",
  "Notification",
  "trustedTypes",
  "TrustedTypePolicy",
  "TrustedTypePolicyFactory",
  "reportError",
  "webkitRequestFileSystem",
  "webkitRequestFileSystemSync",
  "webkitResolveLocalFileSystemURL",
  "webkitResolveLocalFileSystemSyncURL",
  "FontFace",
  "FontFaceSet",
  "fonts",
  "scheduler",
  "Scheduler",
  "TaskController",
  "TaskSignal",
  "GPU",
  "gpu",
  "serviceWorker",
  "ServiceWorkerContainer",
  "StorageManager",
  "LockManager",
  "Serial",
  "HID",
  "USB",
  "MediaCapabilities"
];
function hideBrowserGlobals() {
  const g = globalThis;
  const stop = /* @__PURE__ */ new Set([EventTarget.prototype, Object.prototype, null]);
  for (const name of HIDE) {
    for (let obj2 = g; !stop.has(obj2); obj2 = Object.getPrototypeOf(obj2)) {
      const d = Object.getOwnPropertyDescriptor(obj2, name);
      if (d?.configurable) {
        try {
          delete obj2[name];
        } catch {
        }
      }
    }
    if (name in g) {
      try {
        Object.defineProperty(g, name, { value: void 0, writable: true, configurable: true, enumerable: false });
      } catch {
      }
    }
  }
  const hc = navigator?.hardwareConcurrency ?? 4;
  const nav = { hardwareConcurrency: hc, language: "en-US", languages: ["en-US"], platform: "linux", userAgent: "Node.js/22" };
  let obj = g;
  while (obj) {
    const d = Object.getOwnPropertyDescriptor(obj, "navigator");
    if (d?.configurable) delete obj.navigator;
    obj = Object.getPrototypeOf(obj);
  }
  Object.defineProperty(g, "navigator", { value: nav, writable: true, configurable: true, enumerable: true });
  matchNodeEnumerability();
}
var NODE_ENUMERABLE = /* @__PURE__ */ new Set(["global", "clearImmediate", "setImmediate", "clearInterval", "clearTimeout", "setInterval", "setTimeout", "queueMicrotask", "structuredClone", "atob", "btoa", "performance", "fetch", "navigator", "crypto"]);
function matchNodeEnumerability() {
  const g = globalThis;
  for (const name in g) {
    if (NODE_ENUMERABLE.has(name)) continue;
    const own = Object.getOwnPropertyDescriptor(g, name);
    try {
      if (own) {
        if (own.configurable) Object.defineProperty(g, name, { enumerable: false });
      } else {
        let proto2 = Object.getPrototypeOf(g);
        let d;
        while (proto2 && !(d = Object.getOwnPropertyDescriptor(proto2, name))) proto2 = Object.getPrototypeOf(proto2);
        if (d && (d.get || d.set)) Object.defineProperty(g, name, { get: d.get && (() => d.get.call(g)), set: d.set && ((v) => d.set.call(g, v)), configurable: true, enumerable: false });
        else Object.defineProperty(g, name, { value: g[name], writable: true, configurable: true, enumerable: false });
      }
    } catch {
    }
  }
}

// src/node/zlib.ts
var import_buffer11 = __toESM(require_buffer(), 1);

// node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b[i2] = start += 1 << eb[i2 - 1];
  }
  var r = new i32(b[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j = b[i2]; j < b[i2 + 1]; ++j) {
      r[j] = j - b[i2] << 5 | i2;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i2 = 0;
  var l = new u16(mb);
  for (; i2 < s; ++i2) {
    if (cd[i2])
      ++l[cd[i2] - 1];
  }
  var le = new u16(mb);
  for (i2 = 1; i2 < mb; ++i2) {
    le[i2] = le[i2 - 1] + l[i2 - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0; i2 < s; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v = le[cd[i2] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i2 = 0; i2 < s; ++i2) {
      if (cd[i2]) {
        co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];
      }
    }
  }
  return co;
});
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i2 = 1; i2 < a.length; ++i2) {
    if (a[i2] > m)
      m = a[i2];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err2 = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err2);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf2, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf2 || new u8(0);
  var noBuf = !buf2;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf2 = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf2.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf2);
      buf2 = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type2 = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type2) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err2(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf2.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type2 == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type2 == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i2 = 0; i2 < hcLen; ++i2) {
          clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i2 = 0; i2 < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i2++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i2++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err2(1);
      if (pos > tbts) {
        if (noSt)
          err2(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err2(0);
        break;
      }
      if (!c)
        err2(2);
      if (sym < 256)
        buf2[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add2 = sym - 254;
        if (sym > 264) {
          var i2 = sym - 257, b = fleb[i2];
          add2 = bits(dat, pos, (1 << b) - 1) + fl[i2];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err2(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err2(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add2;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err2(3);
          for (; bt < dend; ++bt)
            buf2[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf2[bt] = buf2[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf2.length && noBuf ? slc(buf2, 0, bt) : buf2.subarray(0, bt);
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i2 = 0; i2 < d.length; ++i2) {
    if (d[i2])
      t.push({ s: i2, f: d[i2] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i22 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i22].f ? i0++ : i22++];
    r = t[i0 != i1 && t[i0].f < t[i22].f ? i0++ : i22++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i2 = 1; i2 < s; ++i2) {
    if (t2[i2].s > maxSym)
      maxSym = t2[i2].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i2 = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i2 < s; ++i2) {
      var i2_1 = t2[i2].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i2].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i2;
    }
    for (; i2 >= 0 && dt; --i2) {
      var i2_3 = t2[i2].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i2 = 1; i2 <= s; ++i2) {
    if (c[i2] == cln && i2 != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i2];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i2 = 0; i2 < cl.length; ++i2)
    l += cf[i2] * cl[i2];
  return l;
};
var wfblk = function(out3, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out3[o] = s & 255;
  out3[o + 1] = s >> 8;
  out3[o + 2] = out3[o] ^ 255;
  out3[o + 3] = out3[o + 1] ^ 255;
  for (var i2 = 0; i2 < s; ++i2)
    out3[o + i2 + 4] = dat[i2];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out3, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out3, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i2 = 0; i2 < lclt.length; ++i2)
    ++lcfreq[lclt[i2] & 31];
  for (var i2 = 0; i2 < lcdt.length; ++i2)
    ++lcfreq[lcdt[i2] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out3, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out3, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out3, p, nlc - 257);
    wbits(out3, p + 5, ndc - 1);
    wbits(out3, p + 10, nlcc - 4);
    p += 14;
    for (var i2 = 0; i2 < nlcc; ++i2)
      wbits(out3, p + 3 * i2, lct[clim[i2]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it2 = 0; it2 < 2; ++it2) {
      var clct = lcts[it2];
      for (var i2 = 0; i2 < clct.length; ++i2) {
        var len = clct[i2] & 31;
        wbits(out3, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out3, p, clct[i2] >> 5 & 127), p += clct[i2] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i2 = 0; i2 < li; ++i2) {
    var sym = syms[i2];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out3, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out3, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out3, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out3, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out3, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out3, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl2, plvl, pre, post2, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post2);
  var w = o.subarray(pre, o.length - post2);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl2) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl2 - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i3) {
      return (dat[i3] ^ dat[i3 + 1] << bs1_1 ^ dat[i3 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i2 = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i2 + 2 < s; ++i2) {
      var hv = hsh(i2);
      var imod = i2 & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i2) {
        var rem = s - i2;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i2 - bs, pos);
          li = lc_1 = eb = 0, bs = i2;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i2 - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i2);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i2 + l] == dat[i2 + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i2 + nl] == dat[i2 + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i2 - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i2 + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i2];
          ++lf[dat[i2]];
        }
      }
    }
    for (i2 = Math.max(i2, wi); i2 < s; ++i2) {
      syms[li++] = dat[i2];
      ++lf[dat[i2]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i2 - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i2, st.w = wi;
    }
  } else {
    for (var i2 = st.w || 0; i2 < s + lst; i2 += 65535) {
      var e = i2 + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i2, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post2);
};
var crct = /* @__PURE__ */ (function() {
  var t = new Int32Array(256);
  for (var i2 = 0; i2 < 256; ++i2) {
    var c = i2, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i2] = c;
  }
  return t;
})();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i2 = 0; i2 < d.length; ++i2)
        cr = crct[cr & 255 ^ d[i2]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var adler = function() {
  var a = 1, b = 0;
  return {
    p: function(d) {
      var n = a, m = b;
      var l = d.length | 0;
      for (var i2 = 0; i2 != l; ) {
        var e = Math.min(i2 + 2655, l);
        for (; i2 < e; ++i2)
          m += n += d[i2];
        n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
      }
      a = n, b = m;
    },
    d: function() {
      a %= 65521, b %= 65521;
      return (a & 255) << 24 | (a & 65280) << 8 | (b & 255) << 8 | b >> 8;
    }
  };
};
var dopt = function(dat, opt, pre, post2, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post2, st);
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
var gzh = function(c, o) {
  var fn = o.filename;
  c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
  if (o.mtime != 0)
    wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
  if (fn) {
    c[3] = 8;
    for (var i2 = 0; i2 <= fn.length; ++i2)
      c[i2 + 10] = fn.charCodeAt(i2);
  }
};
var gzs = function(d) {
  if (d[0] != 31 || d[1] != 139 || d[2] != 8)
    err2(6, "invalid gzip data");
  var flg = d[3];
  var st = 10;
  if (flg & 4)
    st += (d[10] | d[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
    ;
  return st + (flg & 2);
};
var gzl = function(d) {
  var l = d.length;
  return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
var gzhl = function(o) {
  return 10 + (o.filename ? o.filename.length + 1 : 0);
};
var zlh = function(c, o) {
  var lv = o.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
  c[0] = 120, c[1] = fl2 << 6 | (o.dictionary && 32);
  c[1] |= 31 - (c[0] << 8 | c[1]) % 31;
  if (o.dictionary) {
    var h = adler();
    h.p(o.dictionary);
    wbytes(c, 2, h.d());
  }
};
var zls = function(d, dict) {
  if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
    err2(6, "invalid zlib data");
  if ((d[1] >> 5 & 1) == +!dict)
    err2(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
  return (d[1] >> 3 & 4) + 2;
};
function StrmOpt(opts, cb) {
  if (typeof opts == "function")
    cb = opts, opts = {};
  this.ondata = cb;
  return opts;
}
var Deflate = /* @__PURE__ */ (function() {
  function Deflate3(opts, cb) {
    if (typeof opts == "function")
      cb = opts, opts = {};
    this.ondata = cb;
    this.o = opts || {};
    this.s = { l: 0, i: 32768, w: 32768, z: 32768 };
    this.b = new u8(98304);
    if (this.o.dictionary) {
      var dict = this.o.dictionary.subarray(-32768);
      this.b.set(dict, 32768 - dict.length);
      this.s.i = 32768 - dict.length;
    }
  }
  Deflate3.prototype.p = function(c, f) {
    this.ondata(dopt(c, this.o, 0, 0, this.s), f);
  };
  Deflate3.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err2(5);
    if (this.s.l)
      err2(4);
    var endLen = chunk.length + this.s.z;
    if (endLen > this.b.length) {
      if (endLen > 2 * this.b.length - 32768) {
        var newBuf = new u8(endLen & -32768);
        newBuf.set(this.b.subarray(0, this.s.z));
        this.b = newBuf;
      }
      var split2 = this.b.length - this.s.z;
      this.b.set(chunk.subarray(0, split2), this.s.z);
      this.s.z = this.b.length;
      this.p(this.b, false);
      this.b.set(this.b.subarray(-32768));
      this.b.set(chunk.subarray(split2), 32768);
      this.s.z = chunk.length - split2 + 32768;
      this.s.i = 32766, this.s.w = 32768;
    } else {
      this.b.set(chunk, this.s.z);
      this.s.z += chunk.length;
    }
    this.s.l = final & 1;
    if (this.s.z > this.s.w + 8191 || final) {
      this.p(this.b, final || false);
      this.s.w = this.s.i, this.s.i -= 2;
    }
    if (final) {
      this.s = this.o = {};
      this.b = et;
    }
  };
  Deflate3.prototype.flush = function(sync) {
    if (!this.ondata)
      err2(5);
    if (this.s.l)
      err2(4);
    this.p(this.b, false);
    this.s.w = this.s.i, this.s.i -= 2;
    if (sync) {
      var c = new u8(6);
      c[0] = this.s.r >> 3;
      var ep = wfblk(c, this.s.r, et);
      this.s.r = 0;
      this.ondata(c.subarray(0, ep >> 3), false);
    }
  };
  return Deflate3;
})();
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var Inflate = /* @__PURE__ */ (function() {
  function Inflate3(opts, cb) {
    if (typeof opts == "function")
      cb = opts, opts = {};
    this.ondata = cb;
    var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
    this.s = { i: 0, b: dict ? dict.length : 0 };
    this.o = new u8(32768);
    this.p = new u8(0);
    if (dict)
      this.o.set(dict);
  }
  Inflate3.prototype.e = function(c) {
    if (!this.ondata)
      err2(5);
    if (this.d)
      err2(4);
    if (!this.p.length)
      this.p = c;
    else if (c.length) {
      var n = new u8(this.p.length + c.length);
      n.set(this.p), n.set(c, this.p.length), this.p = n;
    }
  };
  Inflate3.prototype.c = function(final) {
    this.s.i = +(this.d = final || false);
    var bts = this.s.b;
    var dt = inflt(this.p, this.s, this.o);
    this.ondata(slc(dt, bts, this.s.b), this.d);
    this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
    this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
  };
  Inflate3.prototype.push = function(chunk, final) {
    this.e(chunk), this.c(final);
  };
  return Inflate3;
})();
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var Gzip = /* @__PURE__ */ (function() {
  function Gzip3(opts, cb) {
    this.c = crc();
    this.l = 0;
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Gzip3.prototype.push = function(chunk, final) {
    this.c.p(chunk);
    this.l += chunk.length;
    Deflate.prototype.push.call(this, chunk, final);
  };
  Gzip3.prototype.p = function(c, f) {
    var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, this.s);
    if (this.v)
      gzh(raw, this.o), this.v = 0;
    if (f)
      wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
    this.ondata(raw, f);
  };
  Gzip3.prototype.flush = function(sync) {
    Deflate.prototype.flush.call(this, sync);
  };
  return Gzip3;
})();
function gzipSync(data, opts) {
  if (!opts)
    opts = {};
  var c = crc(), l = data.length;
  c.p(data);
  var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
  return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
var Gunzip = /* @__PURE__ */ (function() {
  function Gunzip3(opts, cb) {
    this.v = 1;
    this.r = 0;
    Inflate.call(this, opts, cb);
  }
  Gunzip3.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    this.r += chunk.length;
    if (this.v) {
      var p = this.p.subarray(this.v - 1);
      var s = p.length > 3 ? gzs(p) : 4;
      if (s > p.length) {
        if (!final)
          return;
      } else if (this.v > 1 && this.onmember) {
        this.onmember(this.r - p.length);
      }
      this.p = p.subarray(s), this.v = 0;
    }
    Inflate.prototype.c.call(this, 0);
    if (this.s.f && !this.s.l) {
      this.v = shft(this.s.p) + 9;
      this.s = { i: 0 };
      this.o = new u8(0);
      this.push(new u8(0), final);
    } else if (final) {
      Inflate.prototype.c.call(this, final);
    }
  };
  return Gunzip3;
})();
function gunzipSync(data, opts) {
  var st = gzs(data);
  if (st + 8 > data.length)
    err2(6, "invalid gzip data");
  return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
}
var Zlib = /* @__PURE__ */ (function() {
  function Zlib2(opts, cb) {
    this.c = adler();
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Zlib2.prototype.push = function(chunk, final) {
    this.c.p(chunk);
    Deflate.prototype.push.call(this, chunk, final);
  };
  Zlib2.prototype.p = function(c, f) {
    var raw = dopt(c, this.o, this.v && (this.o.dictionary ? 6 : 2), f && 4, this.s);
    if (this.v)
      zlh(raw, this.o), this.v = 0;
    if (f)
      wbytes(raw, raw.length - 4, this.c.d());
    this.ondata(raw, f);
  };
  Zlib2.prototype.flush = function(sync) {
    Deflate.prototype.flush.call(this, sync);
  };
  return Zlib2;
})();
function zlibSync(data, opts) {
  if (!opts)
    opts = {};
  var a = adler();
  a.p(data);
  var d = dopt(data, opts, opts.dictionary ? 6 : 2, 4);
  return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
var Unzlib = /* @__PURE__ */ (function() {
  function Unzlib2(opts, cb) {
    Inflate.call(this, opts, cb);
    this.v = opts && opts.dictionary ? 2 : 1;
  }
  Unzlib2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      if (this.p.length < 6 && !final)
        return;
      this.p = this.p.subarray(zls(this.p, this.v - 1)), this.v = 0;
    }
    if (final) {
      if (this.p.length < 4)
        err2(6, "invalid zlib data");
      this.p = this.p.subarray(0, -4);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Unzlib2;
})();
function unzlibSync(data, opts) {
  return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var Decompress = /* @__PURE__ */ (function() {
  function Decompress2(opts, cb) {
    this.o = StrmOpt.call(this, opts, cb) || {};
    this.G = Gunzip;
    this.I = Inflate;
    this.Z = Unzlib;
  }
  Decompress2.prototype.i = function() {
    var _this = this;
    this.s.ondata = function(dat, final) {
      _this.ondata(dat, final);
    };
  };
  Decompress2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      err2(5);
    if (!this.s) {
      if (this.p && this.p.length) {
        var n = new u8(this.p.length + chunk.length);
        n.set(this.p), n.set(chunk, this.p.length);
      } else
        this.p = chunk;
      if (this.p.length > 2) {
        this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(this.o) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(this.o) : new this.Z(this.o);
        this.i();
        this.s.push(this.p, final);
        this.p = null;
      }
    } else
      this.s.push(chunk, final);
  };
  return Decompress2;
})();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}

// src/node/zlib.ts
var constants4 = {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_BUF_ERROR: -5,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  ZLIB_VERNUM: 4865,
  DEFLATE: 1,
  INFLATE: 2,
  GZIP: 3,
  GUNZIP: 4,
  DEFLATERAW: 5,
  INFLATERAW: 6,
  UNZIP: 7,
  BROTLI_DECODE: 8,
  BROTLI_ENCODE: 9,
  Z_MIN_WINDOWBITS: 8,
  Z_MAX_WINDOWBITS: 15,
  Z_DEFAULT_WINDOWBITS: 15,
  Z_MIN_CHUNK: 64,
  Z_MAX_CHUNK: Infinity,
  Z_DEFAULT_CHUNK: 16384,
  Z_MIN_MEMLEVEL: 1,
  Z_MAX_MEMLEVEL: 9,
  Z_DEFAULT_MEMLEVEL: 8,
  Z_MIN_LEVEL: -1,
  Z_MAX_LEVEL: 9,
  Z_DEFAULT_LEVEL: -1,
  BROTLI_OPERATION_PROCESS: 0,
  BROTLI_OPERATION_FLUSH: 1,
  BROTLI_OPERATION_FINISH: 2,
  BROTLI_OPERATION_EMIT_METADATA: 3,
  BROTLI_PARAM_MODE: 0,
  BROTLI_MODE_GENERIC: 0,
  BROTLI_MODE_TEXT: 1,
  BROTLI_MODE_FONT: 2,
  BROTLI_PARAM_QUALITY: 1,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 11,
  BROTLI_DEFAULT_QUALITY: 11,
  BROTLI_PARAM_LGWIN: 2,
  BROTLI_PARAM_SIZE_HINT: 5
};
var codes = { Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_VERSION_ERROR: -6 };
function bytes(data) {
  if (typeof data === "string") return import_buffer11.Buffer.from(data);
  if (data instanceof Uint8Array) return data;
  if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  throw new TypeError('The "buffer" argument must be of type string or an instance of Buffer, TypedArray, DataView, or ArrayBuffer.');
}
var buf = (u) => import_buffer11.Buffer.from(u.buffer, u.byteOffset, u.byteLength);
var lvl = (o) => o?.level === void 0 || o.level < 0 ? 6 : o.level;
function zerr(e) {
  const err3 = new Error(e?.message ?? "zlib error");
  err3.code = "Z_DATA_ERROR";
  err3.errno = -3;
  return err3;
}
function wrap(fn) {
  return (data, opts) => {
    try {
      return buf(fn(bytes(data), opts));
    } catch (e) {
      throw zerr(e);
    }
  };
}
var gzipSync2 = wrap((d, o) => gzipSync(d, { level: lvl(o) }));
var gunzipSync2 = wrap((d) => gunzipSync(d));
var deflateSync2 = wrap((d, o) => zlibSync(d, { level: lvl(o) }));
var inflateSync2 = wrap((d) => unzlibSync(d));
var deflateRawSync = wrap((d, o) => deflateSync(d, { level: lvl(o) }));
var inflateRawSync = wrap((d) => inflateSync(d));
var unzipSync = wrap((d) => d[0] === 31 && d[1] === 139 ? gunzipSync(d) : unzlibSync(d));
function brotliUnsupported() {
  const e = new Error("Brotli is not supported in OpenVessel");
  e.code = "ERR_FEATURE_UNAVAILABLE_ON_PLATFORM";
  throw e;
}
var brotliCompressSync = (_d, _o) => brotliUnsupported();
var brotliDecompressSync = (_d, _o) => brotliUnsupported();
var zstdCompressSync = brotliCompressSync;
var zstdDecompressSync = brotliDecompressSync;
function asyncify(fn) {
  return (data, opts, cb) => {
    if (typeof opts === "function") {
      cb = opts;
      opts = void 0;
    }
    let r;
    try {
      r = fn(data, opts);
    } catch (e) {
      setTimeout(() => cb(e), 0);
      return;
    }
    setTimeout(() => cb(null, r), 0);
  };
}
var gzip = asyncify(gzipSync2);
var gunzip = asyncify(gunzipSync2);
var deflate = asyncify(deflateSync2);
var inflate = asyncify(inflateSync2);
var deflateRaw = asyncify(deflateRawSync);
var inflateRaw = asyncify(inflateRawSync);
var unzip = asyncify(unzipSync);
var brotliCompress = asyncify(brotliCompressSync);
var brotliDecompress = asyncify(brotliDecompressSync);
var ZStream = class extends Transform {
  s;
  bytesWritten = 0;
  constructor(make, opts) {
    super(opts);
    this.s = make((d, _final) => {
      if (d && d.length) this.push(buf(d));
    });
  }
  _transform(chunk, _enc, cb) {
    try {
      const b = bytes(chunk);
      this.bytesWritten += b.length;
      this.s.push(b, false);
      cb();
    } catch (e) {
      cb(zerr(e));
    }
  }
  _flush(cb) {
    try {
      this.s.push(new Uint8Array(0), true);
      cb();
    } catch (e) {
      cb(zerr(e));
    }
  }
  flush(_kind, cb) {
    cb?.();
  }
  params(_l, _s, cb) {
    cb?.();
  }
  reset() {
  }
  close(cb) {
    this.destroy();
    cb?.();
  }
};
var mk = (Cls, o) => (push) => {
  const s = o ? new Cls(o) : new Cls();
  s.ondata = (d, final) => push(d, final);
  return s;
};
var Gzip2 = class extends ZStream {
  constructor(o) {
    super(mk(Gzip, { level: lvl(o) }), o);
  }
};
var Gunzip2 = class extends ZStream {
  constructor(o) {
    super(mk(Gunzip), o);
  }
};
var Deflate2 = class extends ZStream {
  constructor(o) {
    super(mk(Zlib, { level: lvl(o) }), o);
  }
};
var Inflate2 = class extends ZStream {
  constructor(o) {
    super(mk(Unzlib), o);
  }
};
var DeflateRaw = class extends ZStream {
  constructor(o) {
    super(mk(Deflate, { level: lvl(o) }), o);
  }
};
var InflateRaw = class extends ZStream {
  constructor(o) {
    super(mk(Inflate), o);
  }
};
var Unzip = class extends ZStream {
  constructor(o) {
    super(mk(Decompress), o);
  }
};
var BrotliCompress = class extends ZStream {
  constructor(o) {
    super(() => brotliUnsupported(), o);
  }
};
var BrotliDecompress = class extends BrotliCompress {
};
var createGzip = (o) => new Gzip2(o);
var createGunzip = (o) => new Gunzip2(o);
var createDeflate = (o) => new Deflate2(o);
var createInflate = (o) => new Inflate2(o);
var createDeflateRaw = (o) => new DeflateRaw(o);
var createInflateRaw = (o) => new InflateRaw(o);
var createUnzip = (o) => new Unzip(o);
var createBrotliCompress = (o) => new BrotliCompress(o);
var createBrotliDecompress = (o) => new BrotliDecompress(o);
var crcTable = null;
function crc32(data, value = 0) {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c2 = n;
      for (let k = 0; k < 8; k++) c2 = c2 & 1 ? 3988292384 ^ c2 >>> 1 : c2 >>> 1;
      crcTable[n] = c2 >>> 0;
    }
  }
  const d = bytes(data);
  let c = (value ^ 4294967295) >>> 0;
  for (let i2 = 0; i2 < d.length; i2++) c = crcTable[(c ^ d[i2]) & 255] ^ c >>> 8;
  return (c ^ 4294967295) >>> 0;
}
var zlib_default = {
  constants: constants4,
  codes,
  crc32,
  gzipSync: gzipSync2,
  gunzipSync: gunzipSync2,
  deflateSync: deflateSync2,
  inflateSync: inflateSync2,
  deflateRawSync,
  inflateRawSync,
  unzipSync,
  brotliCompressSync,
  brotliDecompressSync,
  zstdCompressSync,
  zstdDecompressSync,
  gzip,
  gunzip,
  deflate,
  inflate,
  deflateRaw,
  inflateRaw,
  unzip,
  brotliCompress,
  brotliDecompress,
  Gzip: Gzip2,
  Gunzip: Gunzip2,
  Deflate: Deflate2,
  Inflate: Inflate2,
  DeflateRaw,
  InflateRaw,
  Unzip,
  BrotliCompress,
  BrotliDecompress,
  createGzip,
  createGunzip,
  createDeflate,
  createInflate,
  createDeflateRaw,
  createInflateRaw,
  createUnzip,
  createBrotliCompress,
  createBrotliDecompress
};

// src/node/worker.ts
var scopePost = self.postMessage.bind(self);
var scopeListen = self.addEventListener.bind(self);
var runtimeBase3 = new URL(".", self.location.href).href.replace(/\/$/, "");
var enc3 = new TextEncoder();
var proc3;
var exiting = false;
var isThread = false;
var threadPort = null;
self.onmessage = (ev) => {
  const msg = ev.data;
  if (msg?.t === "init") {
    boot(msg).catch((e) => fatal(e));
    return;
  }
  dispatch(msg);
};
function dispatch(msg) {
  switch (msg?.t) {
    case "fd-data":
      onKernelData(msg);
      return;
    case "child-exit":
      onChildExit(msg);
      return;
    case "watch":
      onWatchEvent(msg);
      return;
    case "signal":
      deliverSignal(msg.sig);
      return;
    case "thread-exit":
      return;
  }
  if (onNetMessage(msg)) return;
}
function deliverSignal(sig) {
  if (!proc3) return;
  if (sig === "SIGWINCH") {
    for (const fd2 of [1, 2]) {
      try {
        const s = sys("ttySize", { fd: fd2 });
        if (s) (fd2 === 1 ? proc3.stdout : proc3.stderr)._refreshSize(s.cols, s.rows);
      } catch {
      }
    }
  }
  if (proc3.listenerCount(sig) > 0) proc3.emit(sig, sig);
  else if (sig !== "SIGWINCH") exit(128 + { SIGINT: 2, SIGTERM: 15, SIGHUP: 1, SIGQUIT: 3 }[sig]);
}
var builtins = {};
var cache = /* @__PURE__ */ new Map();
function defineBuiltins() {
  const bufferExtras = {
    ...bufferMod,
    Blob: globalThis.Blob,
    File: globalThis.File,
    atob: globalThis.atob,
    btoa: globalThis.btoa,
    isUtf8: (b) => {
      try {
        new TextDecoder("utf-8", { fatal: true }).decode(b);
        return true;
      } catch {
        return false;
      }
    },
    isAscii: (b) => b.every((x2) => x2 < 128),
    transcode: (b, from, to) => bufferMod.Buffer.from(bufferMod.Buffer.from(b).toString(from), to),
    resolveObjectURL: () => void 0
  };
  const webStreams = {
    ReadableStream,
    WritableStream,
    TransformStream,
    ByteLengthQueuingStrategy,
    CountQueuingStrategy,
    TextEncoderStream,
    TextDecoderStream,
    CompressionStream,
    DecompressionStream,
    ReadableStreamDefaultReader,
    ReadableStreamBYOBReader: globalThis.ReadableStreamBYOBReader,
    ReadableStreamDefaultController,
    ReadableByteStreamController: globalThis.ReadableByteStreamController,
    WritableStreamDefaultWriter,
    WritableStreamDefaultController,
    TransformStreamDefaultController
  };
  const consoleMod = Object.assign(/* @__PURE__ */ Object.create(null), globalThis.console, { Console: ConsoleCtor });
  const constantsMod = { ...os_default.constants.errno, ...os_default.constants.signals, ...fs_default.constants, ...crypto_default.constants };
  const wtMod = worker_threads_default;
  Object.defineProperties(wtMod, {
    isMainThread: { get: () => isMainThread, enumerable: true },
    parentPort: { get: () => parentPort, enumerable: true },
    workerData: { get: () => workerData, enumerable: true },
    threadId: { get: () => threadId, enumerable: true }
  });
  Object.assign(builtins, {
    fs: () => fs_default,
    "fs/promises": () => fs_default.promises,
    path: () => path_default,
    "path/posix": () => path_default,
    "path/win32": () => path_default.win32,
    events: () => events_default,
    stream: () => stream_default,
    "stream/promises": () => streamPromises,
    "stream/web": () => webStreams,
    "stream/consumers": () => consumers,
    buffer: () => bufferExtras,
    util: () => util_default,
    "util/types": () => util_default.types,
    sys: () => util_default,
    os: () => os_default,
    url: () => url_default,
    querystring: () => querystring_default,
    string_decoder: () => string_decoder_default,
    crypto: () => crypto_default,
    zlib: () => zlib_default,
    assert: () => assert_default,
    "assert/strict": () => strict,
    child_process: () => child_process_default,
    worker_threads: () => wtMod,
    net: () => net_default,
    http: () => http_default,
    https: () => https,
    tty: () => tty,
    readline: () => readline_default,
    "readline/promises": () => readline_default.promises,
    timers: () => timers,
    "timers/promises": () => timersPromises,
    vm: () => vm,
    async_hooks: () => asyncHooks,
    perf_hooks: () => perfHooks,
    dns: () => dns,
    "dns/promises": () => dns.promises,
    v8: () => v8,
    diagnostics_channel: () => diagnosticsChannel,
    punycode: () => punycode,
    inspector: () => inspector,
    "inspector/promises": () => inspector,
    cluster: () => cluster,
    dgram: () => dgram,
    http2: () => http2,
    tls: () => tls,
    trace_events: () => traceEvents,
    domain: () => domain,
    repl: () => repl,
    test: () => test_runner_default,
    "test/reporters": () => ({}),
    sea: () => sea,
    sqlite: () => sqlite,
    console: () => consoleMod,
    constants: () => constantsMod,
    module: () => module_default,
    process: () => proc3,
    wasi: () => wasiModule,
    _stream_readable: () => stream_default.Readable,
    _stream_writable: () => stream_default.Writable,
    _stream_duplex: () => stream_default.Duplex,
    _stream_transform: () => stream_default.Transform,
    _stream_passthrough: () => stream_default.PassThrough,
    _http_agent: () => ({ Agent: http_default.Agent, globalAgent: http_default.globalAgent }),
    _http_client: () => ({ ClientRequest: http_default.ClientRequest }),
    _http_common: () => ({ methods: http_default.METHODS }),
    _http_incoming: () => ({ IncomingMessage: http_default.IncomingMessage }),
    _http_outgoing: () => ({ OutgoingMessage: http_default.OutgoingMessage }),
    _http_server: () => ({ Server: http_default.Server, ServerResponse: http_default.ServerResponse, STATUS_CODES: http_default.STATUS_CODES }),
    _stream_wrap: () => stream_default.Duplex,
    _tls_common: () => ({}),
    _tls_wrap: () => ({})
  });
}
function builtin(name) {
  const n = name.startsWith("node:") ? name.slice(5) : name;
  if (cache.has(n)) return cache.get(n);
  const f = builtins[n];
  if (!f) {
    const e = new Error(`No such built-in module: node:${n}`);
    e.code = "ERR_UNKNOWN_BUILTIN_MODULE";
    throw e;
  }
  const m = f();
  cache.set(n, m);
  return m;
}
function installGlobals() {
  const g = globalThis;
  g.global = g;
  g.process = proc3;
  g.Buffer = bufferMod.Buffer;
  g.setTimeout = setTimeout2;
  g.clearTimeout = clearTimeout2;
  g.setInterval = setInterval2;
  g.clearInterval = clearInterval2;
  g.setImmediate = setImmediate2;
  g.clearImmediate = clearImmediate;
  g.fetch = ovFetch;
  g.console = makeConsole(proc3.stdout, proc3.stderr);
  setTimeout2[/* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom")] = timersPromises.setTimeout;
  setImmediate2[/* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom")] = timersPromises.setImmediate;
  g.gc = () => {
  };
  const W = WebAssembly;
  for (const k of ["compile", "instantiate", "compileStreaming", "instantiateStreaming"]) {
    const orig = W[k];
    if (typeof orig === "function") W[k] = (...a) => track(orig.apply(W, a));
  }
  const subtle2 = crypto.subtle;
  if (subtle2) {
    for (const k of ["digest", "encrypt", "decrypt", "sign", "verify", "importKey", "exportKey", "generateKey", "deriveBits", "deriveKey"]) {
      const orig = subtle2[k];
      if (typeof orig === "function") {
        try {
          subtle2[k] = (...a) => track(orig.apply(subtle2, a));
        } catch {
        }
      }
    }
  }
  Object.defineProperty(g, "__ov_di", {
    value: (s, o) => dimport(s, o, pathToFileURLString(proc3.cwd() + "/[eval]")),
    configurable: true,
    writable: true
  });
  g.__ov = {
    builtin,
    requireForImport: (file) => loadFile(file, null, false),
    meta: metaFor,
    dimport
  };
}
function writeErr(s) {
  try {
    sys("write", { fd: 2, pos: null }, enc3.encode(s));
  } catch {
  }
}
function exit(code) {
  if (!exiting) {
    exiting = true;
    proc3.exitCode = code;
    if (!isThread) {
      try {
        proc3.emit("exit", code);
      } catch (e) {
        writeErr(String(e?.stack ?? e) + "\n");
      }
    }
  }
  const c = proc3.exitCode ?? code;
  if (isThread) {
    try {
      threadPort?.postMessage({ k: "exit", code: c });
    } catch {
    }
    sys("threadExit", { code: c });
  } else {
    sys("exit", { code: typeof c === "number" ? c : Number(c) || 0 });
  }
  const block = new Int32Array(new SharedArrayBuffer(4));
  for (; ; ) Atomics.wait(block, 0, 0);
}
function fatal(e) {
  writeErr(`[openvessel] runtime failure: ${e?.stack ?? e}
`);
  try {
    exit(1);
  } catch {
  }
}
var handlingError = false;
function uncaught(err3, origin) {
  if (exiting) return;
  const capture = proc3._captureCb?.();
  if (capture) {
    capture(err3);
    return;
  }
  if (origin === "unhandledRejection" && proc3.listenerCount("unhandledRejection") > 0) {
    proc3.emit("unhandledRejection", err3, Promise.reject(err3).catch(() => {
    }));
    return;
  }
  if (proc3.listenerCount("uncaughtException") > 0 && !handlingError) {
    handlingError = true;
    try {
      proc3.emit("uncaughtExceptionMonitor", err3, origin);
      proc3.emit("uncaughtException", err3, origin);
    } finally {
      handlingError = false;
    }
    return;
  }
  if (isThread && threadPort) {
    const e = err3;
    try {
      threadPort.postMessage({ k: "error", d: e instanceof Error ? { name: e.name, message: e.message, stack: e.stack, code: e.code } : e });
    } catch {
    }
    exit(1);
  }
  let text;
  if (err3 instanceof Error) text = util_default.inspect(err3);
  else if (origin === "unhandledRejection") text = `node:internal/process/promises:394
    triggerUncaughtException(err, true /* fromPromise */);
    ^

[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "${util_default.inspect(err3)}".] {
  code: 'ERR_UNHANDLED_REJECTION'
}`;
  else text = `Uncaught ${util_default.inspect(err3)}`;
  writeErr(`${text}

Node.js v${NODE_VERSION}
`);
  exit(proc3.exitCode && proc3.exitCode !== 0 ? proc3.exitCode : 1);
}
function installErrorHandlers() {
  scopeListen("error", (ev) => {
    ev.preventDefault();
    uncaught(ev.error ?? new Error(ev.message), "uncaughtException");
  });
  scopeListen("unhandledrejection", (ev) => {
    ev.preventDefault();
    uncaught(ev.reason, "unhandledRejection");
  });
  setTickErrorHandler((e) => uncaught(e, "uncaughtException"));
}
function splitOptions(s) {
  const out3 = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m;
  while (m = re.exec(s)) out3.push(m[1] ?? m[2] ?? m[3]);
  return out3;
}
function parseCli(argv, nodeOptions) {
  const o = { requires: [], imports: [], conditions: [], args: [], execArgv: [], envFiles: [] };
  const all = [...splitOptions(nodeOptions), ...argv];
  const valued = /* @__PURE__ */ new Set(["-e", "--eval", "-p", "--print", "-r", "--require", "--import", "--input-type", "-C", "--conditions", "--loader", "--experimental-loader", "--env-file", "--env-file-if-exists", "--stack-trace-limit", "--title", "--max-old-space-size", "--inspect-port", "--watch-path"]);
  const nodeOptCount = splitOptions(nodeOptions).length;
  let i2 = 0;
  for (; i2 < all.length; i2++) {
    let a = all[i2];
    if (a === "--") {
      i2++;
      break;
    }
    if (!a.startsWith("-") || a === "-") break;
    let val;
    const eq = a.indexOf("=");
    if (a.startsWith("--") && eq !== -1) {
      val = a.slice(eq + 1);
      a = a.slice(0, eq);
    } else if (valued.has(a) && !(a === "-p" || a === "--print")) {
      val = all[++i2];
    } else if ((a === "-p" || a === "--print") && all[i2 + 1] !== void 0 && !all[i2 + 1].startsWith("-")) {
      val = all[++i2];
    }
    if (i2 >= nodeOptCount || true) o.execArgv.push(val !== void 0 ? `${a}=${val}` : a);
    switch (a) {
      case "-e":
      case "--eval":
        o.evalCode = val;
        break;
      case "-p":
      case "--print":
        o.print = true;
        o.evalCode = val ?? o.evalCode;
        break;
      case "-r":
      case "--require":
        o.requires.push(val);
        break;
      case "--import":
        o.imports.push(val);
        break;
      case "--input-type":
        o.inputType = val;
        break;
      case "-C":
      case "--conditions":
        o.conditions.push(val);
        break;
      case "-v":
      case "--version":
        o.version = true;
        break;
      case "-h":
      case "--help":
        o.help = true;
        break;
      case "--env-file":
      case "--env-file-if-exists":
        o.envFiles.push(val);
        break;
      case "-c":
      case "--check":
        o.check = true;
        break;
      case "-i":
      case "--interactive":
        o.interactive = true;
        break;
      case "--stack-trace-limit":
        Error.stackTraceLimit = Number(val);
        break;
      case "--title":
        proc3.title = val;
        break;
      case "--loader":
      case "--experimental-loader":
        writeErr(`(node:${proc3.pid}) Warning: custom ESM loaders are not supported in OpenVessel; ignoring --loader ${val}
`);
        break;
      default:
    }
  }
  const rest = all.slice(i2);
  if (o.evalCode === void 0 && rest.length) {
    o.script = rest[0];
    o.args = rest.slice(1);
  } else o.args = rest;
  o.execArgv = o.execArgv.slice(0);
  return o;
}
async function runMain(o) {
  for (const f of o.envFiles) {
    try {
      proc3.loadEnvFile(f);
    } catch {
    }
  }
  for (const r of o.requires) module_default._load(r, { filename: proc3.cwd() + "/[preload]", paths: module_default._nodeModulePaths(proc3.cwd()) }, false);
  for (const imp of o.imports) await dimport(imp, void 0, pathToFileURLString(proc3.cwd() + "/"));
  if (o.version) {
    proc3.stdout.write(`v${NODE_VERSION}
`);
    return;
  }
  if (o.help) {
    proc3.stdout.write('Usage: node [options] [ script.js ] [arguments]\n       node -e "script" [arguments]\n');
    return;
  }
  if (o.evalCode !== void 0) {
    proc3.argv = ["/usr/bin/node", ...o.args];
    const isModule = o.inputType === "module";
    if (isModule) {
      await evalModule(o.evalCode);
      return;
    }
    const mod = new module_default("[eval]", null);
    mod.filename = proc3.cwd() + "/[eval]";
    mod.paths = module_default._nodeModulePaths(proc3.cwd());
    const req = module_default.createRequire(proc3.cwd() + "/[eval]");
    const g = globalThis;
    g.require = req;
    g.module = mod;
    g.exports = mod.exports;
    g.__filename = "[eval]";
    g.__dirname = ".";
    let result;
    try {
      result = (0, eval)(o.evalCode.replace(/(^|[^.\w$])import\s*\(/g, "$1__ov.dimport.__evalImport("));
    } catch (e) {
      if (e instanceof SyntaxError && /import|export|await/.test(String(e.message))) {
        await evalModule(o.evalCode);
        return;
      }
      throw e;
    }
    if (o.print) {
      const v = result instanceof Promise ? await result : result;
      proc3.stdout.write((typeof v === "string" ? v : util_default.inspect(v, { colors: proc3.stdout.isTTY })) + "\n");
    }
    return;
  }
  if (!o.script) {
    await repl2();
    return;
  }
  const file = path_default.resolve(proc3.cwd(), o.script);
  proc3.argv = ["/usr/bin/node", file, ...o.args];
  let st;
  try {
    st = sys("stat", { p: file });
  } catch {
  }
  if (!st) {
    const e = new Error(`Cannot find module '${file}'`);
    e.code = "MODULE_NOT_FOUND";
    e.requireStack = [];
    throw e;
  }
  const real = sys("realpath", { p: file });
  if (o.check) return;
  const fmt = sys("moduleFormat", { p: real });
  const ext = path_default.extname(real);
  let esm = fmt === "module" || fmt === "module-typescript" || ext === ".mjs" || ext === ".mts";
  if (fmt === null && ext !== ".cjs") {
    const src = new TextDecoder().decode(sys("readFile", { p: real }));
    esm = looksEsm(src);
  }
  if (esm) await dimport(pathToFileURLString(real), void 0, pathToFileURLString(proc3.cwd() + "/"));
  else loadFile(real, null, true);
}
async function evalModule(code) {
  const file = `${proc3.cwd()}/.ov-eval-${proc3.pid}-${Date.now()}.mjs`;
  sys("writeFile", { p: file, flags: 577, mode: 420 }, enc3.encode(code));
  try {
    await dimport(pathToFileURLString(file), void 0, pathToFileURLString(file));
  } finally {
    try {
      sys("unlink", { p: file });
    } catch {
    }
  }
}
function looksEsm(src) {
  return /(^|\n)\s*(import\s*[\w{*'"]|export\s+(default|const|let|var|function|class|async|\{|\*))/.test(src) || /\bimport\.meta\b/.test(src);
}
async function repl2() {
  const rl = readline_default.createInterface({ input: proc3.stdin, output: proc3.stdout, prompt: "> ", terminal: !!proc3.stdin.isTTY });
  proc3.stdout.write(`Welcome to Node.js v${NODE_VERSION} (OpenVessel).
Type ".exit" to quit.
`);
  const req = module_default.createRequire(proc3.cwd() + "/[repl]");
  globalThis.require = req;
  rl.prompt();
  await new Promise((resolve3) => {
    rl.on("line", async (line) => {
      if (line.trim() === ".exit") {
        rl.close();
        return;
      }
      if (line.trim()) {
        try {
          let v = (0, eval)(line);
          if (v instanceof Promise) v = await v;
          globalThis._ = v;
          proc3.stdout.write(util_default.inspect(v, { colors: true }) + "\n");
        } catch (e) {
          proc3.stdout.write("Uncaught " + util_default.inspect(e) + "\n");
        }
      }
      rl.prompt();
    });
    rl.on("close", () => resolve3());
  });
}
async function boot(init2) {
  isThread = init2.kind === "thread";
  initSys(init2.sab, (m, t) => scopePost(m, t ?? []));
  setRuntimeBase(runtimeBase3);
  const execArgvInit = init2.execArgv ?? [];
  proc3 = createProcess({ pid: init2.pid, ppid: init2.ppid, argv: init2.argv, execArgv: execArgvInit, env: init2.env, cwd: init2.cwd, ttys: init2.ttys, isThread });
  setCwd(() => proc3.cwd());
  setCwdProvider(() => proc3.cwd());
  setOsInfo({ hostname: init2.hostname, home: init2.env.HOME });
  setNetInfo(runtimeBase3, init2.pid, init2.argv.slice(0, 3).join(" "));
  defineBuiltins();
  setBuiltinGetter(builtin);
  installGlobals();
  installErrorHandlers();
  installStackMapping();
  hideBrowserGlobals();
  dimport.__evalImport = (s, o) => dimport(s, o, pathToFileURLString(proc3.cwd() + "/[eval]"));
  await Promise.all([lexerInit, preloadSucrase()]);
  proc3.reallyExit = (code) => exit(code);
  proc3.exit = (code) => {
    if (code !== void 0 && code !== null) proc3.exitCode = Number(code) || 0;
    exit(proc3.exitCode ?? 0);
  };
  setIdleHandler(() => {
    if (exiting) return;
    if (proc3.listenerCount("beforeExit") > 0 && !isThread) {
      proc3.emit("beforeExit", proc3.exitCode ?? 0);
      if (activeRefs() > 0) return;
      macrotask(() => {
        if (activeRefs() === 0) exit(proc3.exitCode ?? 0);
        else scheduleIdleCheck();
      });
      return;
    }
    exit(proc3.exitCode ?? 0);
  });
  if (isThread) {
    threadPort = init2.port ?? null;
    initThread({ isMain: false, tid: init2.tid, parentPort: init2.port, workerData: init2.workerData, envData: init2.envData });
    proc3.argv = ["/usr/bin/node", init2.file ?? "[worker eval]", ...init2.argv.slice(1)];
    threadPort?.postMessage({ k: "online" });
    try {
      if (init2.eval) {
        if (init2.evalType === "module") await import(
          /* @vite-ignore */
          `data:text/javascript,${encodeURIComponent(init2.file ?? "")}`
        );
        else {
          const req = module_default.createRequire(proc3.cwd() + "/[worker eval]");
          new Function("require", "__filename", "__dirname", "module", "exports", init2.file ?? "")(req, "[worker eval]", ".", { exports: {} }, {});
        }
      } else {
        const file = init2.file.startsWith("file:") ? fileURLToPathLoose(init2.file) : init2.file;
        const fmt = sys("moduleFormat", { p: file });
        if (fmt === "module" || file.endsWith(".mjs") || fmt === null && !file.endsWith(".cjs") && looksEsm(new TextDecoder().decode(sys("readFile", { p: file })))) {
          await dimport(pathToFileURLString(file), void 0, pathToFileURLString(file));
        } else loadFile(file, null, true);
      }
    } catch (e) {
      uncaught(e, "uncaughtException");
      return;
    }
    scheduleIdleCheck();
    return;
  }
  initThread({ isMain: true, tid: 0 });
  const opts = parseCli(init2.argv.slice(1), init2.env.NODE_OPTIONS ?? "");
  proc3.execArgv = opts.execArgv;
  const conds = [...opts.conditions];
  setConditions(conds);
  try {
    await runMain(opts);
  } catch (e) {
    uncaught(e, "uncaughtException");
    return;
  }
  scheduleIdleCheck();
}
export {
  builtin
};
//# sourceMappingURL=process.js.map
