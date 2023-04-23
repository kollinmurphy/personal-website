function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var buildExports = {};
var build = {
  get exports() {
    return buildExports;
  },
  set exports(v) {
    buildExports = v;
  }
};
/*!
 * 
 *   canvas-txt v3.0.0
 *   https://github.com/geongeorge/Canvas-Txt
 * 
 *   Copyright (c) Geon George (https://geongeorge.com)
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 * 
 */
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }("undefined" != typeof self ? self : commonjsGlobal, function() {
    return function(t) {
      var e = {};
      function n(r) {
        if (e[r])
          return e[r].exports;
        var i = e[r] = { i: r, l: false, exports: {} };
        return t[r].call(i.exports, i, i.exports, n), i.l = true, i.exports;
      }
      return n.m = t, n.c = e, n.d = function(t2, e2, r) {
        n.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: r });
      }, n.r = function(t2) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      }, n.t = function(t2, e2) {
        if (1 & e2 && (t2 = n(t2)), 8 & e2)
          return t2;
        if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
          return t2;
        var r = /* @__PURE__ */ Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
          for (var i in t2)
            n.d(r, i, function(e3) {
              return t2[e3];
            }.bind(null, i));
        return r;
      }, n.n = function(t2) {
        var e2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return n.d(e2, "a", e2), e2;
      }, n.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, n.p = "", n(n.s = 0);
    }([function(t, e, n) {
      function r(t2, e2) {
        return function(t3) {
          if (Array.isArray(t3))
            return t3;
        }(t2) || function(t3, e3) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t3)) {
            var n2 = [], r2 = true, i2 = false, o2 = void 0;
            try {
              for (var a, u = t3[Symbol.iterator](); !(r2 = (a = u.next()).done) && (n2.push(a.value), !e3 || n2.length !== e3); r2 = true)
                ;
            } catch (t4) {
              i2 = true, o2 = t4;
            } finally {
              try {
                r2 || null == u.return || u.return();
              } finally {
                if (i2)
                  throw o2;
              }
            }
            return n2;
          }
        }(t2, e2) || function(t3, e3) {
          if (t3) {
            if ("string" == typeof t3)
              return i(t3, e3);
            var n2 = Object.prototype.toString.call(t3).slice(8, -1);
            return "Object" === n2 && t3.constructor && (n2 = t3.constructor.name), "Map" === n2 || "Set" === n2 ? Array.from(n2) : "Arguments" === n2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2) ? i(t3, e3) : void 0;
          }
        }(t2, e2) || function() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function i(t2, e2) {
        (null == e2 || e2 > t2.length) && (e2 = t2.length);
        for (var n2 = 0, r2 = Array(e2); n2 < e2; n2++)
          r2[n2] = t2[n2];
        return r2;
      }
      n.r(e);
      var o = { debug: false, align: "center", vAlign: "middle", fontSize: 14, fontWeight: "", fontStyle: "", fontVariant: "", font: "Arial", lineHeight: null, justify: false, drawText: function(t2, e2, n2, i2, o2, a) {
        var u = this, f = r([n2, i2, o2, a].map(function(t3) {
          return parseInt(t3);
        }), 4);
        if (n2 = f[0], i2 = f[1], o2 = f[2], a = f[3], !(0 >= o2 || 0 >= a || 0 >= this.fontSize)) {
          var s = n2 + o2, l = i2 + a;
          this.textSize && console.error("%cCanvas-Txt:", "font-weight: bold;", "textSize is depricated and has been renamed to fontSize");
          var c = this.fontStyle, h = this.fontVariant, d = this.fontWeight, p = this.fontSize, y = this.font, b = "".concat(c, " ").concat(h, " ").concat(d, " ").concat(p, "px ").concat(y);
          t2.font = b;
          var g, v = i2 + a / 2 + parseInt(this.fontSize) / 2;
          "right" === this.align ? (g = s, t2.textAlign = "right") : "left" === this.align ? (g = n2, t2.textAlign = "left") : (g = n2 + o2 / 2, t2.textAlign = "center");
          var m = [], x = e2.split("\n"), S = this.justify ? t2.measureText(" ").width : 0;
          x.forEach(function(e3) {
            var n3 = t2.measureText(e3).width;
            if (n3 <= o2)
              m.push(e3);
            else {
              var r2, i3, a2, f2 = e3, s2 = o2;
              for (n3 = t2.measureText(f2).width; n3 > s2; ) {
                for (r2 = 0, i3 = 0, a2 = ""; i3 < s2; )
                  r2++, a2 = f2.substr(0, r2), i3 = t2.measureText(f2.substr(0, r2)).width;
                r2--, a2 = a2.substr(0, r2);
                var l2 = r2;
                if (" " != f2.substr(r2, 1)) {
                  for (; " " != f2.substr(r2, 1) && 0 != r2; )
                    r2--;
                  0 == r2 && (r2 = l2), a2 = f2.substr(0, r2);
                }
                a2 = u.justify ? u.justifyLine(t2, a2, S, " ", o2) : a2, f2 = f2.substr(r2), n3 = t2.measureText(f2).width, m.push(a2);
              }
              0 < n3 && m.push(f2);
            }
          });
          var T = this.lineHeight ? this.lineHeight : this.getTextHeight(t2, e2, b), j = T * (m.length - 1), A = i2;
          return "top" === this.vAlign ? v = i2 + this.fontSize : "bottom" === this.vAlign ? (v = l - j, A = l) : (A = i2 + a / 2, v -= j / 2), m.forEach(function(e3) {
            e3 = e3.trim(), t2.fillText(e3, g, v), v += T;
          }), this.debug && (t2.lineWidth = 3, t2.strokeStyle = "#00909e", t2.strokeRect(n2, i2, o2, a), t2.lineWidth = 2, t2.strokeStyle = "#f6d743", t2.beginPath(), t2.moveTo(g, i2), t2.lineTo(g, l), t2.stroke(), t2.strokeStyle = "#ff6363", t2.beginPath(), t2.moveTo(n2, A), t2.lineTo(s, A), t2.stroke()), { height: j + T };
        }
      }, getTextHeight: function(t2, e2, n2) {
        var r2 = t2.textBaseline, i2 = t2.font;
        t2.textBaseline = "bottom", t2.font = n2;
        var o2 = t2.measureText(e2).actualBoundingBoxAscent;
        return t2.textBaseline = r2, t2.font = i2, o2;
      }, justifyLine: function(t2, e2, n2, r2, i2) {
        var o2 = Math.floor, a = e2.trim(), u = t2.measureText(a).width, f = a.split(/\s+/).length - 1, s = o2((i2 - u) / n2);
        if (0 >= f || 0 >= s)
          return a;
        for (var l = o2(s / f), c = s - f * l, h = [], d = 0; d < l; d++)
          h.push(r2);
        return h = h.join(""), a.replace(/\s+/g, function(t3) {
          var e3 = 0 < c ? h + r2 : h;
          return c--, t3 + e3;
        });
      } };
      e.default = o;
    }]);
  });
})(build);
const index = /* @__PURE__ */ getDefaultExportFromCjs(buildExports);
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [buildExports]);
export {
  index$1 as i
};
