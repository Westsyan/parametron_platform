/*
 Highcharts JS v5.0.12 (2017-05-24)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (I, T) {
    "object" === typeof module && module.exports ? module.exports = I.document ? T(I) : T : I.Highcharts = T(I)
})("undefined" !== typeof window ? window : this, function (I) {
    I = function () {
        var a = window, x = a.document, C = a.navigator && a.navigator.userAgent || "",
            E = x && x.createElementNS && !!x.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            D = /(edge|msie|trident)/i.test(C) && !window.opera, m = !E, g = /Firefox/.test(C),
            d = g && 4 > parseInt(C.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "5.0.12",
            deg2rad: 2 * Math.PI / 360,
            doc: x,
            hasBidiBug: d,
            hasTouch: x && void 0 !== x.documentElement.ontouchstart,
            isMS: D,
            isWebKit: /AppleWebKit/.test(C),
            isFirefox: g,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(C),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: E,
            vml: m,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            },
            charts: []
        }
    }();
    (function (a) {
        var x = [], C = a.charts, E = a.doc, D = a.win;
        a.error = function (m, g) {
            m = a.isNumber(m) ? "Highcharts error #" +
                m + ": www.highcharts.com/errors/" + m : m;
            if (g) throw Error(m);
            D.console && console.log(m)
        };
        a.Fx = function (a, g, d) {
            this.options = g;
            this.elem = a;
            this.prop = d
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], g = this.paths[1], d = [], r = this.now, l = a.length, n;
                if (1 === r) d = this.toD; else if (l === g.length && 1 > r) for (; l--;) n = parseFloat(a[l]), d[l] = isNaN(n) ? a[l] : r * parseFloat(g[l] - n) + n; else d = g;
                this.elem.attr("d", d, null, !0)
            }, update: function () {
                var a = this.elem, g = this.prop, d = this.now, r = this.options.step;
                if (this[g + "Setter"]) this[g +
                "Setter"](); else a.attr ? a.element && a.attr(g, d, null, !0) : a.style[g] = d + this.unit;
                r && r.call(a, d, this)
            }, run: function (a, g, d) {
                var m = this, l = function (a) {
                    return l.stopped ? !1 : m.step(a)
                }, n;
                this.startTime = +new Date;
                this.start = a;
                this.end = g;
                this.unit = d;
                this.now = this.start;
                this.pos = 0;
                l.elem = this.elem;
                l.prop = this.prop;
                l() && 1 === x.push(l) && (l.timerId = setInterval(function () {
                    for (n = 0; n < x.length; n++) x[n]() || x.splice(n--, 1);
                    x.length || clearInterval(l.timerId)
                }, 13))
            }, step: function (m) {
                var g = +new Date, d, r = this.options, l = this.elem,
                    n = r.complete, k = r.duration, c = r.curAnim;
                l.attr && !l.element ? m = !1 : m || g >= k + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), d = c[this.prop] = !0, a.objectEach(c, function (a) {
                    !0 !== a && (d = !1)
                }), d && n && n.call(l), m = !1) : (this.pos = r.easing((g - this.startTime) / k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), m = !0);
                return m
            }, initPath: function (m, g, d) {
                function r(a) {
                    var e, b;
                    for (u = a.length; u--;) e = "M" === a[u] || "L" === a[u], b = /[a-zA-Z]/.test(a[u + 3]), e && b && a.splice(u + 1, 0, a[u + 1], a[u + 2], a[u + 1], a[u + 2])
                }

                function l(a, f) {
                    for (; a.length < e;) {
                        a[0] = f[e - a.length];
                        var c = a.slice(0, b);
                        [].splice.apply(a, [0, 0].concat(c));
                        F && (c = a.slice(a.length - b), [].splice.apply(a, [a.length, 0].concat(c)), u--)
                    }
                    a[0] = "M"
                }

                function n(a, c) {
                    for (var k = (e - a.length) / b; 0 < k && k--;) p = a.slice().splice(a.length / L - b, b * L), p[0] = c[e - b - k * b], f && (p[b - 6] = p[b - 2], p[b - 5] = p[b - 1]), [].splice.apply(a, [a.length / L, 0].concat(p)), F && k--
                }

                g = g || "";
                var k, c = m.startX, v = m.endX, f = -1 < g.indexOf("C"), b = f ? 7 : 3, e, p, u;
                g = g.split(" ");
                d = d.slice();
                var F = m.isArea, L = F ? 2 : 1, B;
                f && (r(g),
                    r(d));
                if (c && v) {
                    for (u = 0; u < c.length; u++) if (c[u] === v[0]) {
                        k = u;
                        break
                    } else if (c[0] === v[v.length - c.length + u]) {
                        k = u;
                        B = !0;
                        break
                    }
                    void 0 === k && (g = [])
                }
                g.length && a.isNumber(k) && (e = d.length + k * L * b, B ? (l(g, d), n(d, g)) : (l(d, g), n(g, d)));
                return [g, d]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.extend = function (a, g) {
            var d;
            a || (a = {});
            for (d in g) a[d] = g[d];
            return a
        };
        a.merge = function () {
            var m, g = arguments, d, r = {}, l =
                function (d, k) {
                    "object" !== typeof d && (d = {});
                    a.objectEach(k, function (c, g) {
                        !a.isObject(c, !0) || a.isClass(c) || a.isDOMElement(c) ? d[g] = k[g] : d[g] = l(d[g] || {}, c)
                    });
                    return d
                };
            !0 === g[0] && (r = g[1], g = Array.prototype.slice.call(g, 2));
            d = g.length;
            for (m = 0; m < d; m++) r = l(r, g[m]);
            return r
        };
        a.pInt = function (a, g) {
            return parseInt(a, g || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (m,
                               g) {
            return !!m && "object" === typeof m && (!g || !a.isArray(m))
        };
        a.isDOMElement = function (m) {
            return a.isObject(m) && "number" === typeof m.nodeType
        };
        a.isClass = function (m) {
            var g = m && m.constructor;
            return !(!a.isObject(m, !0) || a.isDOMElement(m) || !g || !g.name || "Object" === g.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, g) {
            for (var d = a.length; d--;) if (a[d] === g) {
                a.splice(d, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (m, g, d) {
            var r;
            a.isString(g) ? a.defined(d) ?
                m.setAttribute(g, d) : m && m.getAttribute && (r = m.getAttribute(g)) : a.defined(g) && a.isObject(g) && a.objectEach(g, function (a, d) {
                m.setAttribute(d, a)
            });
            return r
        };
        a.splat = function (m) {
            return a.isArray(m) ? m : [m]
        };
        a.syncTimeout = function (a, g, d) {
            if (g) return setTimeout(a, g, d);
            a.call(0, d)
        };
        a.pick = function () {
            var a = arguments, g, d, r = a.length;
            for (g = 0; g < r; g++) if (d = a[g], void 0 !== d && null !== d) return d
        };
        a.css = function (m, g) {
            a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")");
            a.extend(m.style,
                g)
        };
        a.createElement = function (m, g, d, r, l) {
            m = E.createElement(m);
            var n = a.css;
            g && a.extend(m, g);
            l && n(m, {padding: 0, border: "none", margin: 0});
            d && n(m, d);
            r && r.appendChild(m);
            return m
        };
        a.extendClass = function (m, g) {
            var d = function () {
            };
            d.prototype = new m;
            a.extend(d.prototype, g);
            return d
        };
        a.pad = function (a, g, d) {
            return Array((g || 2) + 1 - String(a).length).join(d || 0) + a
        };
        a.relativeLength = function (a, g) {
            return /%$/.test(a) ? g * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a, g, d) {
            var m = a[g];
            a[g] = function () {
                var a = Array.prototype.slice.call(arguments),
                    g = arguments, k = this;
                k.proceed = function () {
                    m.apply(k, arguments.length ? arguments : g)
                };
                a.unshift(m);
                a = d.apply(this, a);
                k.proceed = null;
                return a
            }
        };
        a.getTZOffset = function (m) {
            var g = a.Date;
            return 6E4 * (g.hcGetTimezoneOffset && g.hcGetTimezoneOffset(m) || g.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (m, g, d) {
            if (!a.defined(g) || isNaN(g)) return a.defaultOptions.lang.invalidDate || "";
            m = a.pick(m, "%Y-%m-%d %H:%M:%S");
            var r = a.Date, l = new r(g - a.getTZOffset(g)), n = l[r.hcGetHours](), k = l[r.hcGetDay](),
                c = l[r.hcGetDate](), v = l[r.hcGetMonth](),
                f = l[r.hcGetFullYear](), b = a.defaultOptions.lang, e = b.weekdays, p = b.shortWeekdays, u = a.pad,
                r = a.extend({
                    a: p ? p[k] : e[k].substr(0, 3),
                    A: e[k],
                    d: u(c),
                    e: u(c, 2, " "),
                    w: k,
                    b: b.shortMonths[v],
                    B: b.months[v],
                    m: u(v + 1),
                    y: f.toString().substr(2, 2),
                    Y: f,
                    H: u(n),
                    k: n,
                    I: u(n % 12 || 12),
                    l: n % 12 || 12,
                    M: u(l[r.hcGetMinutes]()),
                    p: 12 > n ? "AM" : "PM",
                    P: 12 > n ? "am" : "pm",
                    S: u(l.getSeconds()),
                    L: u(Math.round(g % 1E3), 3)
                }, a.dateFormats);
            a.objectEach(r, function (a, e) {
                for (; -1 !== m.indexOf("%" + e);) m = m.replace("%" + e, "function" === typeof a ? a(g) : a)
            });
            return d ? m.substr(0,
                1).toUpperCase() + m.substr(1) : m
        };
        a.formatSingle = function (m, g) {
            var d = /\.([0-9])/, r = a.defaultOptions.lang;
            /f$/.test(m) ? (d = (d = m.match(d)) ? d[1] : -1, null !== g && (g = a.numberFormat(g, d, r.decimalPoint, -1 < m.indexOf(",") ? r.thousandsSep : ""))) : g = a.dateFormat(m, g);
            return g
        };
        a.format = function (m, g) {
            for (var d = "{", r = !1, l, n, k, c, v = [], f; m;) {
                d = m.indexOf(d);
                if (-1 === d) break;
                l = m.slice(0, d);
                if (r) {
                    l = l.split(":");
                    n = l.shift().split(".");
                    c = n.length;
                    f = g;
                    for (k = 0; k < c; k++) f = f[n[k]];
                    l.length && (f = a.formatSingle(l.join(":"), f));
                    v.push(f)
                } else v.push(l);
                m = m.slice(d + 1);
                d = (r = !r) ? "}" : "{"
            }
            v.push(m);
            return v.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (m, g, d, r, l) {
            var n, k = m;
            d = a.pick(d, 1);
            n = m / d;
            g || (g = l ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === r && (1 === d ? g = a.grep(g, function (a) {
                return 0 === a % 1
            }) : .1 >= d && (g = [1 / d])));
            for (r = 0; r < g.length && !(k = g[r], l && k * d >= m || !l && n <= (g[r] + (g[r + 1] || g[r])) / 2); r++) ;
            return k = a.correctFloat(k * d, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort =
            function (a, g) {
                var d = a.length, m, l;
                for (l = 0; l < d; l++) a[l].safeI = l;
                a.sort(function (a, d) {
                    m = g(a, d);
                    return 0 === m ? a.safeI - d.safeI : m
                });
                for (l = 0; l < d; l++) delete a[l].safeI
            };
        a.arrayMin = function (a) {
            for (var g = a.length, d = a[0]; g--;) a[g] < d && (d = a[g]);
            return d
        };
        a.arrayMax = function (a) {
            for (var g = a.length, d = a[0]; g--;) a[g] > d && (d = a[g]);
            return d
        };
        a.destroyObjectProperties = function (m, g) {
            a.objectEach(m, function (a, r) {
                a && a !== g && a.destroy && a.destroy();
                delete m[r]
            })
        };
        a.discardElement = function (m) {
            var g = a.garbageBin;
            g || (g = a.createElement("div"));
            m && g.appendChild(m);
            g.innerHTML = ""
        };
        a.correctFloat = function (a, g) {
            return parseFloat(a.toPrecision(g || 14))
        };
        a.setAnimation = function (m, g) {
            g.renderer.globalAnimation = a.pick(m, g.options.chart.animation, !0)
        };
        a.animObject = function (m) {
            return a.isObject(m) ? a.merge(m) : {duration: m ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (m, g, d, r) {
            m = +m || 0;
            g = +g;
            var l = a.defaultOptions.lang, n = (m.toString().split(".")[1] || "").length,
                k, c;
            -1 === g ? g = Math.min(n, 20) : a.isNumber(g) || (g = 2);
            c = (Math.abs(m) + Math.pow(10, -Math.max(g, n) - 1)).toFixed(g);
            n = String(a.pInt(c));
            k = 3 < n.length ? n.length % 3 : 0;
            d = a.pick(d, l.decimalPoint);
            r = a.pick(r, l.thousandsSep);
            m = (0 > m ? "-" : "") + (k ? n.substr(0, k) + r : "");
            m += n.substr(k).replace(/(\d{3})(?=\d)/g, "$1" + r);
            g && (m += d + c.slice(-g));
            return m
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (m, g, d) {
            if ("width" === g) return Math.min(m.offsetWidth, m.scrollWidth) - a.getStyle(m, "padding-left") -
                a.getStyle(m, "padding-right");
            if ("height" === g) return Math.min(m.offsetHeight, m.scrollHeight) - a.getStyle(m, "padding-top") - a.getStyle(m, "padding-bottom");
            if (m = D.getComputedStyle(m, void 0)) m = m.getPropertyValue(g), a.pick(d, !0) && (m = a.pInt(m));
            return m
        };
        a.inArray = function (a, g) {
            return g.indexOf ? g.indexOf(a) : [].indexOf.call(g, a)
        };
        a.grep = function (a, g) {
            return [].filter.call(a, g)
        };
        a.find = function (a, g) {
            return [].find.call(a, g)
        };
        a.map = function (a, g) {
            for (var d = [], r = 0, l = a.length; r < l; r++) d[r] = g.call(a[r], a[r], r, a);
            return d
        };
        a.offset = function (a) {
            var g = E.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (D.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                left: a.left + (D.pageXOffset || g.scrollLeft) - (g.clientLeft || 0)
            }
        };
        a.stop = function (a, g) {
            for (var d = x.length; d--;) x[d].elem !== a || g && g !== x[d].prop || (x[d].stopped = !0)
        };
        a.each = function (a, g, d) {
            return Array.prototype.forEach.call(a, g, d)
        };
        a.objectEach = function (a, g, d) {
            for (var r in a) a.hasOwnProperty(r) && g.call(d, a[r], r, a)
        };
        a.addEvent = function (m, g, d) {
            function r(a) {
                a.target =
                    a.srcElement || D;
                d.call(m, a)
            }

            var l = m.hcEvents = m.hcEvents || {};
            m.addEventListener ? m.addEventListener(g, d, !1) : m.attachEvent && (m.hcEventsIE || (m.hcEventsIE = {}), m.hcEventsIE[d.toString()] = r, m.attachEvent("on" + g, r));
            l[g] || (l[g] = []);
            l[g].push(d);
            return function () {
                a.removeEvent(m, g, d)
            }
        };
        a.removeEvent = function (m, g, d) {
            function r(a, f) {
                m.removeEventListener ? m.removeEventListener(a, f, !1) : m.attachEvent && (f = m.hcEventsIE[f.toString()], m.detachEvent("on" + a, f))
            }

            function l() {
                var c, f;
                m.nodeName && (g ? (c = {}, c[g] = !0) : c = k,
                    a.objectEach(c, function (a, e) {
                        if (k[e]) for (f = k[e].length; f--;) r(e, k[e][f])
                    }))
            }

            var n, k = m.hcEvents, c;
            k && (g ? (n = k[g] || [], d ? (c = a.inArray(d, n), -1 < c && (n.splice(c, 1), k[g] = n), r(g, d)) : (l(), k[g] = [])) : (l(), m.hcEvents = {}))
        };
        a.fireEvent = function (m, g, d, r) {
            var l;
            l = m.hcEvents;
            var n, k;
            d = d || {};
            if (E.createEvent && (m.dispatchEvent || m.fireEvent)) l = E.createEvent("Events"), l.initEvent(g, !0, !0), a.extend(l, d), m.dispatchEvent ? m.dispatchEvent(l) : m.fireEvent(g, l); else if (l) for (l = l[g] || [], n = l.length, d.target || a.extend(d, {
                preventDefault: function () {
                    d.defaultPrevented =
                        !0
                }, target: m, type: g
            }), g = 0; g < n; g++) (k = l[g]) && !1 === k.call(m, d) && d.preventDefault();
            r && !d.defaultPrevented && r(d)
        };
        a.animate = function (m, g, d) {
            var r, l = "", n, k, c;
            a.isObject(d) || (c = arguments, d = {duration: c[2], easing: c[3], complete: c[4]});
            a.isNumber(d.duration) || (d.duration = 400);
            d.easing = "function" === typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine;
            d.curAnim = a.merge(g);
            a.objectEach(g, function (c, f) {
                a.stop(m, f);
                k = new a.Fx(m, d, f);
                n = null;
                "d" === f ? (k.paths = k.initPath(m, m.d, g.d), k.toD = g.d, r = 0, n = 1) : m.attr ?
                    r = m.attr(f) : (r = parseFloat(a.getStyle(m, f)) || 0, "opacity" !== f && (l = "px"));
                n || (n = c);
                n && n.match && n.match("px") && (n = n.replace(/px/g, ""));
                k.run(r, n, l)
            })
        };
        a.seriesType = function (m, g, d, r, l) {
            var n = a.getOptions(), k = a.seriesTypes;
            if (k[m]) return a.error(27);
            n.plotOptions[m] = a.merge(n.plotOptions[g], d);
            k[m] = a.extendClass(k[g] || function () {
            }, r);
            k[m].prototype.type = m;
            l && (k[m].prototype.pointClass = a.extendClass(a.Point, l));
            return k[m]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), g = 0;
            return function () {
                return "highcharts-" +
                    a + "-" + g++
            }
        }();
        D.jQuery && (D.jQuery.fn.highcharts = function () {
            var m = [].slice.call(arguments);
            if (this[0]) return m[0] ? (new (a[a.isString(m[0]) ? m.shift() : "Chart"])(this[0], m[0], m[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        });
        E && !E.defaultView && (a.getStyle = function (m, g) {
            var d = {width: "clientWidth", height: "clientHeight"}[g];
            if (m.style[g]) return a.pInt(m.style[g]);
            "opacity" === g && (g = "filter");
            if (d) return m.style.zoom = 1, Math.max(m[d] - 2 * a.getStyle(m, "padding"), 0);
            m = m.currentStyle[g.replace(/\-(\w)/g,
                function (a, d) {
                    return d.toUpperCase()
                })];
            "filter" === g && (m = m.replace(/alpha\(opacity=([0-9]+)\)/, function (a, d) {
                return d / 100
            }));
            return "" === m ? 1 : a.pInt(m)
        });
        Array.prototype.forEach || (a.each = function (a, g, d) {
            for (var r = 0, l = a.length; r < l; r++) if (!1 === g.call(d, a[r], r, a)) return r
        });
        Array.prototype.indexOf || (a.inArray = function (a, g) {
            var d, r = 0;
            if (g) for (d = g.length; r < d; r++) if (g[r] === a) return r;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, g) {
            for (var d = [], r = 0, l = a.length; r < l; r++) g(a[r], r) && d.push(a[r]);
            return d
        });
        Array.prototype.find || (a.find = function (a, g) {
            var d, r = a.length;
            for (d = 0; d < r; d++) if (g(a[d], d)) return a[d]
        })
    })(I);
    (function (a) {
        var x = a.each, C = a.isNumber, E = a.map, D = a.merge, m = a.pInt;
        a.Color = function (g) {
            if (!(this instanceof a.Color)) return new a.Color(g);
            this.init(g)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [m(a[1]), m(a[2]), m(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [m(a[1]), m(a[2]), m(a[3]), 1]
                }
            }], names: {none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000"}, init: function (g) {
                var d, r, l, n;
                if ((this.input = g = this.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = E(g.stops, function (d) {
                    return new a.Color(d[1])
                }); else if (g && "#" === g[0] && (d = g.length, g = parseInt(g.substr(1), 16), 7 === d ? r = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === d && (r = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 | g & 240, (g & 15) << 4 | g & 15, 1])), !r) for (l = this.parsers.length; l-- &&
                !r;) n = this.parsers[l], (d = n.regex.exec(g)) && (r = n.parse(d));
                this.rgba = r || []
            }, get: function (a) {
                var d = this.input, g = this.rgba, l;
                this.stops ? (l = D(d), l.stops = [].concat(l.stops), x(this.stops, function (d, k) {
                    l.stops[k] = [l.stops[k][0], d.get(a)]
                })) : l = g && C(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : d;
                return l
            }, brighten: function (a) {
                var d, g = this.rgba;
                if (this.stops) x(this.stops, function (d) {
                    d.brighten(a)
                }); else if (C(a) && 0 !== a) for (d = 0; 3 > d; d++) g[d] += m(255 * a), 0 >
                g[d] && (g[d] = 0), 255 < g[d] && (g[d] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }, tweenTo: function (a, d) {
                var g, l;
                a.rgba.length ? (g = this.rgba, a = a.rgba, l = 1 !== a[3] || 1 !== g[3], a = (l ? "rgba(" : "rgb(") + Math.round(a[0] + (g[0] - a[0]) * (1 - d)) + "," + Math.round(a[1] + (g[1] - a[1]) * (1 - d)) + "," + Math.round(a[2] + (g[2] - a[2]) * (1 - d)) + (l ? "," + (a[3] + (g[3] - a[3]) * (1 - d)) : "") + ")") : a = a.input || "none";
                return a
            }
        };
        a.color = function (g) {
            return new a.Color(g)
        }
    })(I);
    (function (a) {
        var x, C, E = a.addEvent, D = a.animate, m = a.attr, g = a.charts,
            d = a.color, r = a.css, l = a.createElement, n = a.defined, k = a.deg2rad, c = a.destroyObjectProperties,
            v = a.doc, f = a.each, b = a.extend, e = a.erase, p = a.grep, u = a.hasTouch, F = a.inArray, L = a.isArray,
            B = a.isFirefox, H = a.isMS, t = a.isObject, G = a.isString, z = a.isWebKit, A = a.merge, w = a.noop,
            J = a.objectEach, h = a.pick, q = a.pInt, Q = a.removeEvent, K = a.splat, N = a.stop, M = a.svg,
            P = a.SVG_NS, R = a.symbolSizes, O = a.win;
        x = a.SVGElement = function () {
            return this
        };
        b(x.prototype, {
            opacity: 1,
            SVG_NS: P,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function (a, h) {
                this.element = "span" === h ? l(h) : v.createElementNS(this.SVG_NS, h);
                this.renderer = a
            },
            animate: function (y, q, e) {
                q = a.animObject(h(q, this.renderer.globalAnimation, !0));
                0 !== q.duration ? (e && (q.complete = e), D(this, y, q)) : (this.attr(y, null, e), q.step && q.step.call(this));
                return this
            },
            colorGradient: function (y, h, q) {
                var e = this.renderer, b, c, d, p, k, u, g, z, w, S, t = [], K;
                y.radialGradient ? c = "radialGradient" : y.linearGradient && (c = "linearGradient");
                c && (d = y[c], k = e.gradients, g = y.stops, S = q.radialReference, L(d) && (y[c] =
                    d = {
                        x1: d[0],
                        y1: d[1],
                        x2: d[2],
                        y2: d[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === c && S && !n(d.gradientUnits) && (p = d, d = A(d, e.getRadialAttr(S, p), {gradientUnits: "userSpaceOnUse"})), J(d, function (a, y) {
                    "id" !== y && t.push(y, a)
                }), J(g, function (a) {
                    t.push(a)
                }), t = t.join(","), k[t] ? S = k[t].attr("id") : (d.id = S = a.uniqueKey(), k[t] = u = e.createElement(c).attr(d).add(e.defs), u.radAttr = p, u.stops = [], f(g, function (y) {
                    0 === y[1].indexOf("rgba") ? (b = a.color(y[1]), z = b.get("rgb"), w = b.get("a")) : (z = y[1], w = 1);
                    y = e.createElement("stop").attr({
                        offset: y[0],
                        "stop-color": z, "stop-opacity": w
                    }).add(u);
                    u.stops.push(y)
                })), K = "url(" + e.url + "#" + S + ")", q.setAttribute(h, K), q.gradient = t, y.toString = function () {
                    return K
                })
            },
            applyTextOutline: function (y) {
                var h = this.element, q, b, c, d, p;
                -1 !== y.indexOf("contrast") && (y = y.replace(/contrast/g, this.renderer.getContrast(h.style.fill)));
                y = y.split(" ");
                b = y[y.length - 1];
                if ((c = y[0]) && "none" !== c && a.svg) {
                    this.fakeTS = !0;
                    y = [].slice.call(h.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a,
                                                                 y, h) {
                        return 2 * y + h
                    });
                    for (p = y.length; p--;) q = y[p], "highcharts-text-outline" === q.getAttribute("class") && e(y, h.removeChild(q));
                    d = h.firstChild;
                    f(y, function (a, y) {
                        0 === y && (a.setAttribute("x", h.getAttribute("x")), y = h.getAttribute("y"), a.setAttribute("y", y || 0), null === y && h.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        m(a, {
                            "class": "highcharts-text-outline",
                            fill: b,
                            stroke: b,
                            "stroke-width": c,
                            "stroke-linejoin": "round"
                        });
                        h.insertBefore(a, d)
                    })
                }
            },
            attr: function (a, h, q, e) {
                var y, b = this.element, f, c = this, d, p;
                "string" === typeof a &&
                void 0 !== h && (y = a, a = {}, a[y] = h);
                "string" === typeof a ? c = (this[a + "Getter"] || this._defaultGetter).call(this, a, b) : (J(a, function (y, h) {
                    d = !1;
                    e || N(this, h);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h) && (f || (this.symbolAttr(a), f = !0), d = !0);
                    !this.rotation || "x" !== h && "y" !== h || (this.doTransform = !0);
                    d || (p = this[h + "Setter"] || this._defaultSetter, p.call(this, y, h, b))
                }, this), this.afterSetters());
                q && q();
                return c
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform =
                    !1)
            },
            addClass: function (a, h) {
                var y = this.attr("class") || "";
                -1 === y.indexOf(a) && (h || (a = (y + (y ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== m(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                m(this.element, "class", (m(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var y = this;
                f("x y r start end width height innerR anchorX anchorY".split(" "), function (q) {
                    y[q] = h(a[q], y[q])
                });
                y.attr({
                    d: y.renderer.symbols[y.symbolName](y.x,
                        y.y, y.width, y.height, y)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, h) {
                var y = this, q = {}, e;
                h = h || a.strokeWidth || 0;
                e = Math.round(h) % 2 / 2;
                a.x = Math.floor(a.x || y.x || 0) + e;
                a.y = Math.floor(a.y || y.y || 0) + e;
                a.width = Math.floor((a.width || y.width || 0) - 2 * e);
                a.height = Math.floor((a.height || y.height || 0) - 2 * e);
                n(a.strokeWidth) && (a.strokeWidth = h);
                J(a, function (a, h) {
                    y[h] !== a && (y[h] = q[h] = a)
                });
                return q
            },
            css: function (a) {
                var h = this.styles, y = {}, e = this.element,
                    f, c = "", d, p = !h, k = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                h && J(a, function (a, q) {
                    a !== h[q] && (y[q] = a, p = !0)
                });
                p && (h && (a = b(h, y)), f = this.textWidth = a && a.width && "auto" !== a.width && "text" === e.nodeName.toLowerCase() && q(a.width), this.styles = a, f && !M && this.renderer.forExport && delete a.width, H && !M ? r(this.element, a) : (d = function (a, h) {
                    return "-" + h.toLowerCase()
                }, J(a, function (a, h) {
                    -1 === F(h, k) && (c += h.replace(/([A-Z])/g, d) + ":" + a + ";")
                }), c && m(e, "style", c)), this.added && ("text" === this.element.nodeName &&
                this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function (a) {
                return O.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function () {
                var a = this.getStyle("stroke-width"), h;
                a.indexOf("px") === a.length - 2 ? a = q(a) : (h = v.createElementNS(P, "rect"), m(h, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(h), a = h.getBBox().width, h.parentNode.removeChild(h));
                return a
            },
            on: function (a, h) {
                var y = this, q = y.element;
                u && "click" ===
                a ? (q.ontouchstart = function (a) {
                    y.touchEventFired = Date.now();
                    a.preventDefault();
                    h.call(q, a)
                }, q.onclick = function (a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (y.touchEventFired || 0)) && h.call(q, a)
                }) : q["on" + a] = h;
                return this
            },
            setRadialReference: function (a) {
                var h = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                h && h.radAttr && h.animate(this.renderer.getRadialAttr(a, h.radAttr));
                return this
            },
            translate: function (a, h) {
                return this.attr({translateX: a, translateY: h})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, q = this.translateY || 0, e = this.scaleX, b = this.scaleY,
                    f = this.inverted, c = this.rotation, d = this.element;
                f && (a += this.width, q += this.height);
                a = ["translate(" + a + "," + q + ")"];
                f ? a.push("rotate(90) scale(-1,1)") : c && a.push("rotate(" + c + " " + (d.getAttribute("x") || 0) + " " + (d.getAttribute("y") || 0) + ")");
                (n(e) || n(b)) && a.push("scale(" + h(e, 1) + " " + h(b, 1) + ")");
                a.length && d.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, q, b) {
                var y, f, c, d, p = {};
                f = this.renderer;
                c = f.alignedObjects;
                var k, u;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = q, !b || G(b)) this.alignTo = y = b || "renderer", e(c, this), c.push(this), b = null
                } else a = this.alignOptions, q = this.alignByTranslate, y = this.alignTo;
                b = h(b, f[y], f);
                y = a.align;
                f = a.verticalAlign;
                c = (b.x || 0) + (a.x || 0);
                d = (b.y || 0) + (a.y || 0);
                "right" === y ? k = 1 : "center" === y && (k = 2);
                k && (c += (b.width - (a.width || 0)) / k);
                p[q ?
                    "translateX" : "x"] = Math.round(c);
                "bottom" === f ? u = 1 : "middle" === f && (u = 2);
                u && (d += (b.height - (a.height || 0)) / u);
                p[q ? "translateY" : "y"] = Math.round(d);
                this[this.placed ? "animate" : "attr"](p);
                this.placed = !0;
                this.alignAttr = p;
                return this
            },
            getBBox: function (a, q) {
                var y, e = this.renderer, c, d = this.element, p = this.styles, u, g = this.textStr, z, w = e.cache,
                    A = e.cacheKeys, t;
                q = h(q, this.rotation);
                c = q * k;
                u = d && x.prototype.getStyle.call(d, "font-size");
                void 0 !== g && (t = g.toString(), -1 === t.indexOf("\x3c") && (t = t.replace(/[0-9]/g, "0")), t += ["",
                    q || 0, u, p && p.width, p && p.textOverflow].join());
                t && !a && (y = w[t]);
                if (!y) {
                    if (d.namespaceURI === this.SVG_NS || e.forExport) {
                        try {
                            (z = this.fakeTS && function (a) {
                                f(d.querySelectorAll(".highcharts-text-outline"), function (h) {
                                    h.style.display = a
                                })
                            }) && z("none"), y = d.getBBox ? b({}, d.getBBox()) : {
                                width: d.offsetWidth,
                                height: d.offsetHeight
                            }, z && z("")
                        } catch (V) {
                        }
                        if (!y || 0 > y.width) y = {width: 0, height: 0}
                    } else y = this.htmlGetBBox();
                    e.isSVG && (a = y.width, e = y.height, p && "11px" === p.fontSize && 17 === Math.round(e) && (y.height = e = 14), q && (y.width = Math.abs(e *
                        Math.sin(c)) + Math.abs(a * Math.cos(c)), y.height = Math.abs(e * Math.cos(c)) + Math.abs(a * Math.sin(c))));
                    if (t && 0 < y.height) {
                        for (; 250 < A.length;) delete w[A.shift()];
                        w[t] || A.push(t);
                        w[t] = y
                    }
                }
                return y
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var h = this;
                h.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        h.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var h = this.renderer, q = this.element, y;
                a && (this.parentGroup =
                    a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && h.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) y = this.zIndexSetter();
                y || (a ? a.element : h.box).appendChild(q);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var h = a.parentNode;
                h && h.removeChild(a)
            },
            destroy: function () {
                var a = this, h = a.element || {}, q = a.renderer.isSVG && "SPAN" === h.nodeName && a.parentGroup,
                    b = h.ownerSVGElement;
                h.onclick = h.onmouseout = h.onmouseover = h.onmousemove = h.point = null;
                N(a);
                a.clipPath && b && (f(b.querySelectorAll("[clip-path]"),
                    function (h) {
                        -1 < h.getAttribute("clip-path").indexOf(a.clipPath.element.id + ")") && h.removeAttribute("clip-path")
                    }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (b = 0; b < a.stops.length; b++) a.stops[b] = a.stops[b].destroy();
                    a.stops = null
                }
                for (a.safeRemoveChild(h); q && q.div && 0 === q.div.childNodes.length;) h = q.parentGroup, a.safeRemoveChild(q.div), delete q.div, q = h;
                a.alignTo && e(a.renderer.alignedObjects, a);
                J(a, function (h, q) {
                    delete a[q]
                });
                return null
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" ===
                a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = h(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, h, q) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                q.setAttribute(h, a);
                this[h] = a
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            },
            opacitySetter: function (a, h, q) {
                this[h] = a;
                q.setAttribute(h, a)
            },
            titleSetter: function (a) {
                var q =
                    this.element.getElementsByTagName("title")[0];
                q || (q = v.createElementNS(this.SVG_NS, "title"), this.element.appendChild(q));
                q.firstChild && q.removeChild(q.firstChild);
                q.appendChild(v.createTextNode(String(h(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, h, q) {
                "string" === typeof a ? q.setAttribute(h, a) : a && this.colorGradient(a, h, q)
            },
            visibilitySetter: function (a, h, q) {
                "inherit" === a ? q.removeAttribute(h) :
                    q.setAttribute(h, a)
            },
            zIndexSetter: function (a, h) {
                var e = this.renderer, b = this.parentGroup, y = (b || e).element || e.box, f, c = this.element, d;
                f = this.added;
                var p;
                n(a) && (c.zIndex = a, a = +a, this[h] === a && (f = !1), this[h] = a);
                if (f) {
                    (a = this.zIndex) && b && (b.handleZ = !0);
                    h = y.childNodes;
                    for (p = 0; p < h.length && !d; p++) b = h[p], f = b.zIndex, b !== c && (q(f) > a || !n(a) && n(f) || 0 > a && !n(f) && y !== e.box) && (y.insertBefore(c, b), d = !0);
                    d || y.appendChild(c)
                }
                return d
            },
            _defaultSetter: function (a, h, q) {
                q.setAttribute(h, a)
            }
        });
        x.prototype.yGetter = x.prototype.xGetter;
        x.prototype.translateXSetter = x.prototype.translateYSetter = x.prototype.rotationSetter = x.prototype.verticalAlignSetter = x.prototype.scaleXSetter = x.prototype.scaleYSetter = function (a, h) {
            this[h] = a;
            this.doTransform = !0
        };
        C = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        b(C.prototype, {
            Element: x, SVG_NS: P, init: function (a, h, q, e, b, f) {
                var y;
                e = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"});
                y = e.element;
                a.appendChild(y);
                -1 === a.innerHTML.indexOf("xmlns") && m(y, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = y;
                this.boxWrapper = e;
                this.alignedObjects = [];
                this.url = (B || z) && v.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(v.createTextNode("Created with Highcharts 5.0.12"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = f;
                this.forExport = b;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(h, q, !1);
                var c;
                B && a.getBoundingClientRect && (h = function () {
                    r(a, {left: 0, top: 0});
                    c = a.getBoundingClientRect();
                    r(a, {left: Math.ceil(c.left) - c.left + "px", top: Math.ceil(c.top) - c.top + "px"})
                }, h(), this.unSubPixelFix = E(O, "resize", h))
            }, definition: function (a) {
                function h(a, e) {
                    var b;
                    f(K(a), function (a) {
                        var y = q.createElement(a.tagName), f = {};
                        J(a, function (a, h) {
                            "tagName" !== h && "children" !== h && "textContent" !== h && (f[h] = a)
                        });
                        y.attr(f);
                        y.add(e || q.defs);
                        a.textContent && y.element.appendChild(v.createTextNode(a.textContent));
                        h(a.children ||
                            [], y);
                        b = y
                    });
                    return b
                }

                var q = this;
                return h(a)
            }, isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }, destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                c(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            }, createElement: function (a) {
                var h = new this.Element;
                h.init(this, a);
                return h
            }, draw: w, getRadialAttr: function (a, h) {
                return {
                    cx: a[0] - a[2] / 2 + h.cx * a[2], cy: a[1] - a[2] / 2 + h.cy * a[2],
                    r: h.r * a[2]
                }
            }, getSpanWidth: function (a, h) {
                var q = a.getBBox(!0).width;
                !M && this.forExport && (q = this.measureSpanWidth(h.firstChild.data, a.styles));
                return q
            }, applyEllipsis: function (a, h, q, e) {
                var b = this.getSpanWidth(a, h), f = b > e, b = q, y, c = 0, d = q.length, p = function (a) {
                    h.removeChild(h.firstChild);
                    a && h.appendChild(v.createTextNode(a))
                };
                if (f) {
                    for (; c <= d;) y = Math.ceil((c + d) / 2), b = q.substring(0, y) + "\u2026", p(b), b = this.getSpanWidth(a, h), c === d ? c = d + 1 : b > e ? d = y - 1 : c = y;
                    0 === d && p("")
                }
                return f
            }, buildText: function (a) {
                var e = a.element,
                    b = this, c = b.forExport, y = h(a.textStr, "").toString(), d = -1 !== y.indexOf("\x3c"),
                    k = e.childNodes, u, g, z, w, t = m(e, "x"), A = a.styles, n = a.textWidth, K = A && A.lineHeight,
                    B = A && A.textOutline, Q = A && "ellipsis" === A.textOverflow, l = A && "nowrap" === A.whiteSpace,
                    H, F = k.length, G = n && !a.added && this.box, N = function (a) {
                        return K ? q(K) : b.fontMetrics(void 0, a.getAttribute("style") ? a : e).h
                    }, A = [y, Q, l, K, B, A && A.fontSize, n].join();
                if (A !== a.textCache) {
                    for (a.textCache = A; F--;) e.removeChild(k[F]);
                    d || B || Q || n || -1 !== y.indexOf(" ") ? (u = /<.*class="([^"]+)".*>/,
                        g = /<.*style="([^"]+)".*>/, z = /<.*href="([^"]+)".*>/, G && G.appendChild(e), y = d ? y.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [y], y = p(y, function (a) {
                        return "" !== a
                    }), f(y, function (h, q) {
                        var y, d = 0;
                        h = h.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        y = h.split("|||");
                        f(y, function (h) {
                            if ("" !==
                                h || 1 === y.length) {
                                var f = {}, p = v.createElementNS(b.SVG_NS, "tspan"), k, A;
                                u.test(h) && (k = h.match(u)[1], m(p, "class", k));
                                g.test(h) && (A = h.match(g)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), m(p, "style", A));
                                z.test(h) && !c && (m(p, "onclick", 'location.href\x3d"' + h.match(z)[1] + '"'), r(p, {cursor: "pointer"}));
                                h = (h.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                                if (" " !== h) {
                                    p.appendChild(v.createTextNode(h));
                                    d ? f.dx = 0 : q && null !== t && (f.x = t);
                                    m(p, f);
                                    e.appendChild(p);
                                    !d && H && (!M && c && r(p, {display: "block"}),
                                        m(p, "dy", N(p)));
                                    if (n) {
                                        f = h.replace(/([^\^])-/g, "$1- ").split(" ");
                                        k = 1 < y.length || q || 1 < f.length && !l;
                                        var K = [], B, F = N(p), G = a.rotation;
                                        for (Q && (w = b.applyEllipsis(a, p, h, n)); !Q && k && (f.length || K.length);) a.rotation = 0, B = b.getSpanWidth(a, p), h = B > n, void 0 === w && (w = h), h && 1 !== f.length ? (p.removeChild(p.firstChild), K.unshift(f.pop())) : (f = K, K = [], f.length && !l && (p = v.createElementNS(P, "tspan"), m(p, {
                                            dy: F,
                                            x: t
                                        }), A && m(p, "style", A), e.appendChild(p)), B > n && (n = B)), f.length && p.appendChild(v.createTextNode(f.join(" ").replace(/- /g,
                                            "-")));
                                        a.rotation = G
                                    }
                                    d++
                                }
                            }
                        });
                        H = H || e.childNodes.length
                    }), w && a.attr("title", a.textStr), G && G.removeChild(e), B && a.applyTextOutline && a.applyTextOutline(B)) : e.appendChild(v.createTextNode(y.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
                }
            }, getContrast: function (a) {
                a = d(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }, button: function (a, h, q, e, b, f, c, d, p) {
                var y = this.label(a, h, q, p, null, null, null, null, "button"), k = 0;
                y.attr(A({padding: 8, r: 2}, b));
                E(y.element, H ? "mouseover" : "mouseenter", function () {
                    3 !== k && y.setState(1)
                });
                E(y.element, H ? "mouseout" : "mouseleave", function () {
                    3 !== k && y.setState(k)
                });
                y.setState = function (a) {
                    1 !== a && (y.state = k = a);
                    y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0])
                };
                return y.on("click", function (a) {
                    3 !== k && e.call(y, a)
                })
            }, crispLine: function (a, h) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - h % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + h % 2 / 2);
                return a
            }, path: function (a) {
                var h = {};
                L(a) ? h.d = a : t(a) && b(h, a);
                return this.createElement("path").attr(h)
            },
            circle: function (a, h, q) {
                a = t(a) ? a : {x: a, y: h, r: q};
                h = this.createElement("circle");
                h.xSetter = h.ySetter = function (a, h, q) {
                    q.setAttribute("c" + h, a)
                };
                return h.attr(a)
            }, arc: function (a, h, q, e, b, f) {
                t(a) ? (e = a, h = e.y, q = e.r, a = e.x) : e = {innerR: e, start: b, end: f};
                a = this.symbol("arc", a, h, q, q, e);
                a.r = q;
                return a
            }, rect: function (a, h, q, e, b, f) {
                b = t(a) ? a.r : b;
                f = this.createElement("rect");
                a = t(a) ? a : void 0 === a ? {} : {x: a, y: h, width: Math.max(q, 0), height: Math.max(e, 0)};
                b && (a.r = b);
                f.rSetter = function (a, h, q) {
                    m(q, {rx: a, ry: a})
                };
                return f.attr(a)
            },
            setSize: function (a, q, e) {
                var b = this.alignedObjects, f = b.length;
                this.width = a;
                this.height = q;
                for (this.boxWrapper.animate({width: a, height: q}, {
                    step: function () {
                        this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                    }, duration: h(e, !0) ? void 0 : 0
                }); f--;) b[f].align()
            }, g: function (a) {
                var h = this.createElement("g");
                return a ? h.attr({"class": "highcharts-" + a}) : h
            }, image: function (a, h, q, e, f) {
                var c = {preserveAspectRatio: "none"};
                1 < arguments.length && b(c, {x: h, y: q, width: e, height: f});
                c = this.createElement("image").attr(c);
                c.element.setAttributeNS ? c.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : c.element.setAttribute("hc-svg-href", a);
                return c
            }, symbol: function (a, q, e, c, d, p) {
                var y = this, k, u = /^url\((.*?)\)$/, A = u.test(a), z = !A && (this.symbols[a] ? a : "circle"),
                    w = z && this.symbols[z],
                    t = n(q) && w && w.call(this.symbols, Math.round(q), Math.round(e), c, d, p), K, P;
                w ? (k = this.path(t), b(k, {
                    symbolName: z,
                    x: q,
                    y: e,
                    width: c,
                    height: d
                }), p && b(k, p)) : A && (K = a.match(u)[1], k = this.image(K), k.imgwidth = h(R[K] && R[K].width, p && p.width), k.imgheight =
                    h(R[K] && R[K].height, p && p.height), P = function () {
                    k.attr({width: k.width, height: k.height})
                }, f(["width", "height"], function (a) {
                    k[a + "Setter"] = function (a, h) {
                        var q = {}, e = this["img" + h], b = "width" === h ? "translateX" : "translateY";
                        this[h] = a;
                        n(e) && (this.element && this.element.setAttribute(h, e), this.alignByTranslate || (q[b] = ((this[h] || 0) - e) / 2, this.attr(q)))
                    }
                }), n(q) && k.attr({
                    x: q,
                    y: e
                }), k.isImg = !0, n(k.imgwidth) && n(k.imgheight) ? P() : (k.attr({width: 0, height: 0}), l("img", {
                    onload: function () {
                        var a = g[y.chartIndex];
                        0 === this.width &&
                        (r(this, {position: "absolute", top: "-999em"}), v.body.appendChild(this));
                        R[K] = {width: this.width, height: this.height};
                        k.imgwidth = this.width;
                        k.imgheight = this.height;
                        k.element && P();
                        this.parentNode && this.parentNode.removeChild(this);
                        y.imgCount--;
                        if (!y.imgCount && a && a.onload) a.onload()
                    }, src: K
                }), this.imgCount++));
                return k
            }, symbols: {
                circle: function (a, h, q, e) {
                    return this.arc(a + q / 2, h + e / 2, q / 2, e / 2, {start: 0, end: 2 * Math.PI, open: !1})
                }, square: function (a, h, q, e) {
                    return ["M", a, h, "L", a + q, h, a + q, h + e, a, h + e, "Z"]
                }, triangle: function (a,
                                       h, q, e) {
                    return ["M", a + q / 2, h, "L", a + q, h + e, a, h + e, "Z"]
                }, "triangle-down": function (a, h, q, e) {
                    return ["M", a, h, "L", a + q, h, a + q / 2, h + e, "Z"]
                }, diamond: function (a, h, q, e) {
                    return ["M", a + q / 2, h, "L", a + q, h + e / 2, a + q / 2, h + e, a, h + e / 2, "Z"]
                }, arc: function (a, h, q, e, b) {
                    var f = b.start, c = b.r || q, d = b.r || e || q, p = b.end - .001;
                    q = b.innerR;
                    e = b.open;
                    var k = Math.cos(f), y = Math.sin(f), u = Math.cos(p), p = Math.sin(p);
                    b = b.end - f < Math.PI ? 0 : 1;
                    c = ["M", a + c * k, h + d * y, "A", c, d, 0, b, 1, a + c * u, h + d * p];
                    n(q) && c.push(e ? "M" : "L", a + q * u, h + q * p, "A", q, q, 0, b, 0, a + q * k, h + q * y);
                    c.push(e ? "" :
                        "Z");
                    return c
                }, callout: function (a, h, q, e, b) {
                    var f = Math.min(b && b.r || 0, q, e), c = f + 6, p = b && b.anchorX;
                    b = b && b.anchorY;
                    var d;
                    d = ["M", a + f, h, "L", a + q - f, h, "C", a + q, h, a + q, h, a + q, h + f, "L", a + q, h + e - f, "C", a + q, h + e, a + q, h + e, a + q - f, h + e, "L", a + f, h + e, "C", a, h + e, a, h + e, a, h + e - f, "L", a, h + f, "C", a, h, a, h, a + f, h];
                    p && p > q ? b > h + c && b < h + e - c ? d.splice(13, 3, "L", a + q, b - 6, a + q + 6, b, a + q, b + 6, a + q, h + e - f) : d.splice(13, 3, "L", a + q, e / 2, p, b, a + q, e / 2, a + q, h + e - f) : p && 0 > p ? b > h + c && b < h + e - c ? d.splice(33, 3, "L", a, b + 6, a - 6, b, a, b - 6, a, h + f) : d.splice(33, 3, "L", a, e / 2, p, b, a, e / 2, a, h + f) :
                        b && b > e && p > a + c && p < a + q - c ? d.splice(23, 3, "L", p + 6, h + e, p, h + e + 6, p - 6, h + e, a + f, h + e) : b && 0 > b && p > a + c && p < a + q - c && d.splice(3, 3, "L", p - 6, h, p, h - 6, p + 6, h, q - f, h);
                    return d
                }
            }, clipRect: function (h, q, e, b) {
                var f = a.uniqueKey(), c = this.createElement("clipPath").attr({id: f}).add(this.defs);
                h = this.rect(h, q, e, b, 0).add(c);
                h.id = f;
                h.clipPath = c;
                h.count = 0;
                return h
            }, text: function (a, h, q, e) {
                var b = !M && this.forExport, f = {};
                if (e && (this.allowHTML || !this.forExport)) return this.html(a, h, q);
                f.x = Math.round(h || 0);
                q && (f.y = Math.round(q));
                if (a || 0 === a) f.text =
                    a;
                a = this.createElement("text").attr(f);
                b && a.css({position: "absolute"});
                e || (a.xSetter = function (a, h, q) {
                    var e = q.getElementsByTagName("tspan"), b, f = q.getAttribute(h), c;
                    for (c = 0; c < e.length; c++) b = e[c], b.getAttribute(h) === f && b.setAttribute(h, a);
                    q.setAttribute(h, a)
                });
                return a
            }, fontMetrics: function (a, h) {
                a = h && x.prototype.getStyle.call(h, "font-size");
                a = /px/.test(a) ? q(a) : /em/.test(a) ? parseFloat(a) * (h ? this.fontMetrics(null, h.parentNode).f : 16) : 12;
                h = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: h, b: Math.round(.8 * h), f: a}
            }, rotCorr: function (a,
                                  h, q) {
                var e = a;
                h && q && (e = Math.max(e * Math.cos(h * k), 4));
                return {x: -a / 3 * Math.sin(h * k), y: e}
            }, label: function (h, q, e, c, p, d, k, u, g) {
                var z = this, w = z.g("button" !== g && "label"), t = w.text = z.text("", 0, 0, k).attr({zIndex: 1}), y,
                    K, P = 0, v = 3, B = 0, l, F, H, r, m, G = {}, N, R = /^url\((.*?)\)$/.test(c), J = R, L, M, O, S;
                g && w.addClass("highcharts-" + g);
                J = !0;
                L = function () {
                    return y.strokeWidth() % 2 / 2
                };
                M = function () {
                    var a = t.element.style, h = {};
                    K = (void 0 === l || void 0 === F || m) && n(t.textStr) && t.getBBox();
                    w.width = (l || K.width || 0) + 2 * v + B;
                    w.height = (F || K.height ||
                        0) + 2 * v;
                    N = v + z.fontMetrics(a && a.fontSize, t).b;
                    J && (y || (w.box = y = z.symbols[c] || R ? z.symbol(c) : z.rect(), y.addClass(("button" === g ? "" : "highcharts-label-box") + (g ? " highcharts-" + g + "-box" : "")), y.add(w), a = L(), h.x = a, h.y = (u ? -N : 0) + a), h.width = Math.round(w.width), h.height = Math.round(w.height), y.attr(b(h, G)), G = {})
                };
                O = function () {
                    var a = B + v, h;
                    h = u ? 0 : N;
                    n(l) && K && ("center" === m || "right" === m) && (a += {center: .5, right: 1}[m] * (l - K.width));
                    if (a !== t.x || h !== t.y) t.attr("x", a), void 0 !== h && t.attr("y", h);
                    t.x = a;
                    t.y = h
                };
                S = function (a, h) {
                    y ? y.attr(a,
                        h) : G[a] = h
                };
                w.onAdd = function () {
                    t.add(w);
                    w.attr({text: h || 0 === h ? h : "", x: q, y: e});
                    y && n(p) && w.attr({anchorX: p, anchorY: d})
                };
                w.widthSetter = function (h) {
                    l = a.isNumber(h) ? h : null
                };
                w.heightSetter = function (a) {
                    F = a
                };
                w["text-alignSetter"] = function (a) {
                    m = a
                };
                w.paddingSetter = function (a) {
                    n(a) && a !== v && (v = w.padding = a, O())
                };
                w.paddingLeftSetter = function (a) {
                    n(a) && a !== B && (B = a, O())
                };
                w.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== P && (P = a, K && w.attr({x: H}))
                };
                w.textSetter = function (a) {
                    void 0 !== a && t.textSetter(a);
                    M();
                    O()
                };
                w["stroke-widthSetter"] = function (a, h) {
                    a && (J = !0);
                    this["stroke-width"] = a;
                    S(h, a)
                };
                w.rSetter = function (a, h) {
                    S(h, a)
                };
                w.anchorXSetter = function (a, h) {
                    p = w.anchorX = a;
                    S(h, Math.round(a) - L() - H)
                };
                w.anchorYSetter = function (a, h) {
                    d = w.anchorY = a;
                    S(h, a - r)
                };
                w.xSetter = function (a) {
                    w.x = a;
                    P && (a -= P * ((l || K.width) + 2 * v));
                    H = Math.round(a);
                    w.attr("translateX", H)
                };
                w.ySetter = function (a) {
                    r = w.y = Math.round(a);
                    w.attr("translateY", r)
                };
                var U = w.css;
                return b(w, {
                    css: function (a) {
                        if (a) {
                            var h = {};
                            a = A(a);
                            f(w.textProps, function (q) {
                                void 0 !== a[q] &&
                                (h[q] = a[q], delete a[q])
                            });
                            t.css(h)
                        }
                        return U.call(w, a)
                    }, getBBox: function () {
                        return {width: K.width + 2 * v, height: K.height + 2 * v, x: K.x - v, y: K.y - v}
                    }, destroy: function () {
                        Q(w.element, "mouseenter");
                        Q(w.element, "mouseleave");
                        t && (t = t.destroy());
                        y && (y = y.destroy());
                        x.prototype.destroy.call(w);
                        w = z = M = O = S = null
                    }
                })
            }
        });
        a.Renderer = C
    })(I);
    (function (a) {
        var x = a.attr, C = a.createElement, E = a.css, D = a.defined, m = a.each, g = a.extend, d = a.isFirefox,
            r = a.isMS, l = a.isWebKit, n = a.pInt, k = a.SVGRenderer, c = a.win, v = a.wrap;
        g(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var b =
                    this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = g(this.styles, a);
                E(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, b = this.element, e = this.x ||
                        0, c = this.y || 0, d = this.textAlign || "left", k = {left: 0, center: .5, right: 1}[d],
                        g = this.styles;
                    E(b, {marginLeft: this.translateX || 0, marginTop: this.translateY || 0});
                    this.inverted && m(b.childNodes, function (e) {
                        a.invertChild(e, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var v = this.rotation, H = n(this.textWidth), t = g && g.whiteSpace,
                            r = [v, d, b.innerHTML, this.textWidth, this.textAlign].join();
                        r !== this.cTT && (g = a.fontMetrics(b.style.fontSize).b, D(v) && this.setSpanRotation(v, k, g), E(b, {
                            width: "",
                            whiteSpace: t || "nowrap"
                        }), b.offsetWidth > H && /[ \-]/.test(b.textContent ||
                            b.innerText) && E(b, {
                            width: H + "px",
                            display: "block",
                            whiteSpace: t || "normal"
                        }), this.getSpanCorrection(b.offsetWidth, g, k, v, d));
                        E(b, {left: e + (this.xCorr || 0) + "px", top: c + (this.yCorr || 0) + "px"});
                        l && (g = b.offsetHeight);
                        this.cTT = r
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, b, e) {
                var f = {},
                    k = r ? "-ms-transform" : l ? "-webkit-transform" : d ? "MozTransform" : c.opera ? "-o-transform" : "";
                f[k] = f.transform = "rotate(" + a + "deg)";
                f[k + (d ? "Origin" : "-origin")] = f.transformOrigin = 100 * b + "% " + e + "px";
                E(this.element, f)
            }, getSpanCorrection: function (a,
                                            b, e) {
                this.xCorr = -a * e;
                this.yCorr = -b
            }
        });
        g(k.prototype, {
            html: function (a, b, e) {
                var f = this.createElement("span"), c = f.element, d = f.renderer, k = d.isSVG, n = function (a, e) {
                    m(["opacity", "visibility"], function (b) {
                        v(a, b + "Setter", function (a, b, f, c) {
                            a.call(this, b, f, c);
                            e[f] = b
                        })
                    })
                };
                f.textSetter = function (a) {
                    a !== c.innerHTML && delete this.bBox;
                    c.innerHTML = this.textStr = a;
                    f.htmlUpdateTransform()
                };
                k && n(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (a, e) {
                    "align" === e && (e = "textAlign");
                    f[e] = a;
                    f.htmlUpdateTransform()
                };
                f.attr({text: a, x: Math.round(b), y: Math.round(e)}).css({position: "absolute"});
                c.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                k && (f.add = function (a) {
                    var e, b = d.box.parentNode, p = [];
                    if (this.parentGroup = a) {
                        if (e = a.div, !e) {
                            for (; a;) p.push(a), a = a.parentGroup;
                            m(p.reverse(), function (a) {
                                var c, d = x(a.element, "class");
                                d && (d = {className: d});
                                e = a.div = a.div || C("div", d, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    },
                                    e || b);
                                c = e.style;
                                g(a, {
                                    on: function () {
                                        f.on.apply({element: p[0].div}, arguments);
                                        return a
                                    }, translateXSetter: function (h, q) {
                                        c.left = h + "px";
                                        a[q] = h;
                                        a.doTransform = !0
                                    }, translateYSetter: function (h, q) {
                                        c.top = h + "px";
                                        a[q] = h;
                                        a.doTransform = !0
                                    }
                                });
                                n(a, c)
                            })
                        }
                    } else e = b;
                    e.appendChild(c);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            }
        })
    })(I);
    (function (a) {
        function x() {
            var g = a.defaultOptions.global, l = d.moment;
            if (g.timezone) {
                if (l) return function (a) {
                    return -l.tz(a, g.timezone).utcOffset()
                };
                a.error(25)
            }
            return g.useUTC &&
                g.getTimezoneOffset
        }

        function C() {
            var r = a.defaultOptions.global, l, n = r.useUTC, k = n ? "getUTC" : "get", c = n ? "setUTC" : "set";
            a.Date = l = r.Date || d.Date;
            l.hcTimezoneOffset = n && r.timezoneOffset;
            l.hcGetTimezoneOffset = x();
            l.hcMakeTime = function (a, f, b, e, c, d) {
                var p;
                n ? (p = l.UTC.apply(0, arguments), p += D(p)) : p = (new l(a, f, g(b, 1), g(e, 0), g(c, 0), g(d, 0))).getTime();
                return p
            };
            E("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                l["hcGet" + a] = k + a
            });
            E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                l["hcSet" +
                a] = c + a
            })
        }

        var E = a.each, D = a.getTZOffset, m = a.merge, g = a.pick, d = a.win;
        a.defaultOptions = {
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {useUTC: !0},
            chart: {
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}},
                width: null,
                height: null
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {},
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {}
            },
            loading: {},
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan class\x3d"highcharts-header"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cspan class\x3d"highcharts-strong"\x3e{point.y}\x3c/span\x3e\x3cbr/\x3e'
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (d) {
            a.defaultOptions =
                m(!0, a.defaultOptions, d);
            C();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        C()
    })(I);
    (function (a) {
        var x = a.correctFloat, C = a.defined, E = a.destroyObjectProperties, D = a.isNumber, m = a.pick, g = a.deg2rad;
        a.Tick = function (a, g, l, n) {
            this.axis = a;
            this.pos = g;
            this.type = l || "";
            this.isNewLabel = this.isNew = !0;
            l || n || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, g = a.options, l = a.chart, n = a.categories, k = a.names, c = this.pos, v =
                        g.labels, f = a.tickPositions, b = c === f[0], e = c === f[f.length - 1],
                    k = n ? m(n[c], k[c], c) : c, n = this.label, f = f.info, p;
                a.isDatetimeAxis && f && (p = g.dateTimeLabelFormats[f.higherRanks[c] || f.unitName]);
                this.isFirst = b;
                this.isLast = e;
                g = a.labelFormatter.call({
                    axis: a,
                    chart: l,
                    isFirst: b,
                    isLast: e,
                    dateTimeLabelFormat: p,
                    value: a.isLog ? x(a.lin2log(k)) : k
                });
                C(n) ? n && n.attr({text: g}) : (this.labelLength = (this.label = n = C(g) && v.enabled ? l.renderer.text(g, 0, 0, v.useHTML).add(a.labelGroup) : null) && n.getBBox().width, this.rotation = 0)
            }, getLabelSize: function () {
                return this.label ?
                    this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var d = this.axis, l = a.x, n = d.chart.chartWidth, k = d.chart.spacing,
                    c = m(d.labelLeft, Math.min(d.pos, k[3])), k = m(d.labelRight, Math.max(d.pos + d.len, n - k[1])),
                    v = this.label, f = this.rotation, b = {left: 0, center: .5, right: 1}[d.labelAlign],
                    e = v.getBBox().width, p = d.getSlotWidth(), u = p, F = 1, L, B = {};
                if (f) 0 > f && l - b * e < c ? L = Math.round(l / Math.cos(f * g) - c) : 0 < f && l + b * e > k && (L = Math.round((n - l) / Math.cos(f * g))); else if (n = l + (1 - b) * e, l - b * e < c ? u = a.x + u * (1 - b) - c :
                        n > k && (u = k - a.x + u * b, F = -1), u = Math.min(p, u), u < p && "center" === d.labelAlign && (a.x += F * (p - u - b * (p - Math.min(e, u)))), e > u || d.autoRotation && (v.styles || {}).width) L = u;
                L && (B.width = L, (d.options.labels.style || {}).textOverflow || (B.textOverflow = "ellipsis"), v.css(B))
            }, getPosition: function (a, g, l, n) {
                var d = this.axis, c = d.chart, v = n && c.oldChartHeight || c.chartHeight;
                return {
                    x: a ? d.translate(g + l, null, null, n) + d.transB : d.left + d.offset + (d.opposite ? (n && c.oldChartWidth || c.chartWidth) - d.right - d.left : 0),
                    y: a ? v - d.bottom + d.offset - (d.opposite ?
                        d.height : 0) : v - d.translate(g + l, null, null, n) - d.transB
                }
            }, getLabelPosition: function (a, m, l, n, k, c, v, f) {
                var b = this.axis, e = b.transA, d = b.reversed, u = b.staggerLines, F = b.tickRotCorr || {x: 0, y: 0},
                    r = k.y;
                C(r) || (r = 0 === b.side ? l.rotation ? -8 : -l.getBBox().height : 2 === b.side ? F.y + 8 : Math.cos(l.rotation * g) * (F.y - l.getBBox(!1, 0).height / 2));
                a = a + k.x + F.x - (c && n ? c * e * (d ? -1 : 1) : 0);
                m = m + r - (c && !n ? c * e * (d ? 1 : -1) : 0);
                u && (l = v / (f || 1) % u, b.opposite && (l = u - l - 1), m += b.labelOffset / u * l);
                return {x: a, y: Math.round(m)}
            }, getMarkPath: function (a, g, l, n, k, c) {
                return c.crispLine(["M",
                    a, g, "L", a + (k ? 0 : -l), g + (k ? l : 0)], n)
            }, renderGridLine: function (a, g, l) {
                var d = this.axis, k = this.gridLine, c = {}, v = this.pos, f = this.type, b = d.tickmarkOffset,
                    e = d.chart.renderer;
                k || (f || (c.zIndex = 1), a && (c.opacity = 0), this.gridLine = k = e.path().attr(c).addClass("highcharts-" + (f ? f + "-" : "") + "grid-line").add(d.gridGroup));
                if (!a && k && (a = d.getPlotLinePath(v + b, k.strokeWidth() * l, a, !0))) k[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: g
                })
            }, renderMark: function (a, g, l) {
                var d = this.axis, k = d.chart.renderer, c = this.type, v = d.tickSize(c ? c + "Tick" :
                    "tick"), f = this.mark, b = !f, e = a.x;
                a = a.y;
                v && (d.opposite && (v[0] = -v[0]), b && (this.mark = f = k.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(d.axisGroup)), f[b ? "attr" : "animate"]({
                    d: this.getMarkPath(e, a, v[0], f.strokeWidth() * l, d.horiz, k),
                    opacity: g
                }))
            }, renderLabel: function (a, g, l, n) {
                var d = this.axis, c = d.horiz, v = d.options, f = this.label, b = v.labels, e = b.step,
                    p = d.tickmarkOffset, u = !0, F = a.x;
                a = a.y;
                f && D(F) && (f.xy = a = this.getLabelPosition(F, a, f, c, b, p, n, e), this.isFirst && !this.isLast && !m(v.showFirstLabel, 1) || this.isLast &&
                !this.isFirst && !m(v.showLastLabel, 1) ? u = !1 : !c || d.isRadial || b.step || b.rotation || g || 0 === l || this.handleOverflow(a), e && n % e && (u = !1), u && D(a.y) ? (a.opacity = l, f[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (f.attr("y", -9999), this.isNewLabel = !0), this.isNew = !1)
            }, render: function (a, g, l) {
                var d = this.axis, k = d.horiz, c = this.getPosition(k, this.pos, d.tickmarkOffset, g), v = c.x,
                    f = c.y, d = k && v === d.pos + d.len || !k && f === d.pos ? -1 : 1;
                l = m(l, 1);
                this.isActive = !0;
                this.renderGridLine(g, l, d);
                this.renderMark(c, l, d);
                this.renderLabel(c,
                    g, l, a)
            }, destroy: function () {
                E(this, this.axis)
            }
        }
    })(I);
    var T = function (a) {
        var x = a.addEvent, C = a.animObject, E = a.arrayMax, D = a.arrayMin, m = a.correctFloat, g = a.defaultOptions,
            d = a.defined, r = a.deg2rad, l = a.destroyObjectProperties, n = a.each, k = a.extend, c = a.fireEvent,
            v = a.format, f = a.getMagnitude, b = a.grep, e = a.inArray, p = a.isArray, u = a.isNumber, F = a.isString,
            L = a.merge, B = a.normalizeTickInterval, H = a.objectEach, t = a.pick, G = a.removeEvent, z = a.splat,
            A = a.syncTimeout, w = a.Tick, J = function () {
                this.init.apply(this, arguments)
            };
        a.extend(J.prototype,
            {
                defaultOptions: {
                    dateTimeLabelFormats: {
                        millisecond: "%H:%M:%S.%L",
                        second: "%H:%M:%S",
                        minute: "%H:%M",
                        hour: "%H:%M",
                        day: "%e. %b",
                        week: "%e. %b",
                        month: "%b '%y",
                        year: "%Y"
                    },
                    endOnTick: !1,
                    labels: {enabled: !0, x: 0},
                    minPadding: .01,
                    maxPadding: .01,
                    minorTickLength: 2,
                    minorTickPosition: "outside",
                    startOfWeek: 1,
                    startOnTick: !1,
                    tickLength: 10,
                    tickmarkPlacement: "between",
                    tickPixelInterval: 100,
                    tickPosition: "outside",
                    title: {align: "middle"},
                    type: "linear"
                },
                defaultYAxisOptions: {
                    endOnTick: !0,
                    tickPixelInterval: 72,
                    showLastLabel: !0,
                    labels: {x: -8},
                    maxPadding: .05,
                    minPadding: .05,
                    startOnTick: !0,
                    title: {rotation: 270, text: "Values"},
                    stackLabels: {
                        enabled: !1, formatter: function () {
                            return a.numberFormat(this.total, -1)
                        }
                    }
                },
                defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
                defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
                defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
                defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
                init: function (a, q) {
                    var h = q.isX, b = this;
                    b.chart = a;
                    b.horiz = a.inverted && !b.isZAxis ? !h : h;
                    b.isXAxis = h;
                    b.coll = b.coll || (h ? "xAxis" : "yAxis");
                    b.opposite = q.opposite;
                    b.side = q.side || (b.horiz ? b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
                    b.setOptions(q);
                    var f = this.options, c = f.type;
                    b.labelFormatter = f.labels.formatter || b.defaultLabelFormatter;
                    b.userOptions = q;
                    b.minPixelPadding = 0;
                    b.reversed = f.reversed;
                    b.visible = !1 !== f.visible;
                    b.zoomEnabled = !1 !== f.zoomEnabled;
                    b.hasNames = "category" === c || !0 === f.categories;
                    b.categories = f.categories || b.hasNames;
                    b.names = b.names || [];
                    b.plotLinesAndBandsGroups =
                        {};
                    b.isLog = "logarithmic" === c;
                    b.isDatetimeAxis = "datetime" === c;
                    b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;
                    b.isLinked = d(f.linkedTo);
                    b.ticks = {};
                    b.labelEdge = [];
                    b.minorTicks = {};
                    b.plotLinesAndBands = [];
                    b.alternateBands = {};
                    b.len = 0;
                    b.minRange = b.userMinRange = f.minRange || f.maxZoom;
                    b.range = f.range;
                    b.offset = f.offset || 0;
                    b.stacks = {};
                    b.oldStacks = {};
                    b.stacksTouched = 0;
                    b.max = null;
                    b.min = null;
                    b.crosshair = t(f.crosshair, z(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
                    q = b.options.events;
                    -1 === e(b, a.axes) && (h ? a.axes.splice(a.xAxis.length,
                        0, b) : a.axes.push(b), a[b.coll].push(b));
                    b.series = b.series || [];
                    a.inverted && !b.isZAxis && h && void 0 === b.reversed && (b.reversed = !0);
                    H(q, function (a, h) {
                        x(b, h, a)
                    });
                    b.lin2log = f.linearToLogConverter || b.lin2log;
                    b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log)
                },
                setOptions: function (a) {
                    this.options = L(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], L(g[this.coll], a))
                },
                defaultLabelFormatter: function () {
                    var h = this.axis, q = this.value, b = h.categories, e = this.dateTimeLabelFormat, f = g.lang,
                        c = f.numericSymbols, f = f.numericSymbolMagnitude || 1E3, d = c && c.length, p,
                        k = h.options.labels.format, h = h.isLog ? Math.abs(q) : h.tickInterval;
                    if (k) p = v(k, this); else if (b) p = q; else if (e) p = a.dateFormat(e, q); else if (d && 1E3 <= h) for (; d-- && void 0 === p;) b = Math.pow(f, d + 1), h >= b && 0 === 10 * q % b && null !== c[d] && 0 !== q && (p = a.numberFormat(q / b, -1) + c[d]);
                    void 0 === p && (p = 1E4 <= Math.abs(q) ? a.numberFormat(q, -1) : a.numberFormat(q,
                        -1, void 0, ""));
                    return p
                },
                getSeriesExtremes: function () {
                    var a = this, q = a.chart;
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    n(a.series, function (h) {
                        if (h.visible || !q.options.chart.ignoreHiddenSeries) {
                            var e = h.options, f = e.threshold, c;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= f && (f = null);
                            if (a.isXAxis) e = h.xData, e.length && (h = D(e), u(h) || h instanceof Date || (e = b(e, function (a) {
                                return u(a)
                            }), h = D(e)), a.dataMin = Math.min(t(a.dataMin, e[0]),
                                h), a.dataMax = Math.max(t(a.dataMax, e[0]), E(e))); else if (h.getExtremes(), c = h.dataMax, h = h.dataMin, d(h) && d(c) && (a.dataMin = Math.min(t(a.dataMin, h), h), a.dataMax = Math.max(t(a.dataMax, c), c)), d(f) && (a.threshold = f), !e.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                },
                translate: function (a, q, b, e, f, c) {
                    var h = this.linkedParent || this, d = 1, p = 0, k = e ? h.oldTransA : h.transA;
                    e = e ? h.oldMin : h.min;
                    var g = h.minPixelPadding;
                    f = (h.isOrdinal || h.isBroken || h.isLog && f) && h.lin2val;
                    k || (k = h.transA);
                    b && (d *= -1, p = h.len);
                    h.reversed &&
                    (d *= -1, p -= d * (h.sector || h.len));
                    q ? (a = (a * d + p - g) / k + e, f && (a = h.lin2val(a))) : (f && (a = h.val2lin(a)), a = d * (a - e) * k + p + d * g + (u(c) ? k * c : 0));
                    return a
                },
                toPixels: function (a, q) {
                    return this.translate(a, !1, !this.horiz, null, !0) + (q ? 0 : this.pos)
                },
                toValue: function (a, q) {
                    return this.translate(a - (q ? 0 : this.pos), !0, !this.horiz, null, !0)
                },
                getPlotLinePath: function (a, q, b, e, f) {
                    var h = this.chart, c = this.left, d = this.top, p, k, g = b && h.oldChartHeight || h.chartHeight,
                        w = b && h.oldChartWidth || h.chartWidth, z;
                    p = this.transB;
                    var A = function (a, h, q) {
                        if (a <
                            h || a > q) e ? a = Math.min(Math.max(h, a), q) : z = !0;
                        return a
                    };
                    f = t(f, this.translate(a, null, null, b));
                    a = b = Math.round(f + p);
                    p = k = Math.round(g - f - p);
                    u(f) ? this.horiz ? (p = d, k = g - this.bottom, a = b = A(a, c, c + this.width)) : (a = c, b = w - this.right, p = k = A(p, d, d + this.height)) : z = !0;
                    return z && !e ? null : h.renderer.crispLine(["M", a, p, "L", b, k], q || 1)
                },
                getLinearTickPositions: function (a, q, b) {
                    var h, e = m(Math.floor(q / a) * a);
                    b = m(Math.ceil(b / a) * a);
                    var f = [];
                    if (this.single) return [q];
                    for (q = e; q <= b;) {
                        f.push(q);
                        q = m(q + a);
                        if (q === h) break;
                        h = q
                    }
                    return f
                },
                getMinorTickPositions: function () {
                    var a =
                            this, q = a.options, b = a.tickPositions, e = a.minorTickInterval, f = [],
                        c = a.pointRangePadding || 0, d = a.min - c, c = a.max + c, p = c - d;
                    if (p && p / e < a.len / 3) if (a.isLog) n(this.paddedTicks, function (h, q, b) {
                        q && f.push.apply(f, a.getLogTickPositions(e, b[q - 1], b[q], !0))
                    }); else if (a.isDatetimeAxis && "auto" === q.minorTickInterval) f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), d, c, q.startOfWeek)); else for (q = d + (b[0] - d) % e; q <= c && q !== f[0]; q += e) f.push(q);
                    0 !== f.length && a.trimTicks(f);
                    return f
                },
                adjustForMinRange: function () {
                    var a = this.options,
                        q = this.min, b = this.max, e, f, c, p, k, g, w, u;
                    this.isXAxis && void 0 === this.minRange && !this.isLog && (d(a.min) || d(a.max) ? this.minRange = null : (n(this.series, function (a) {
                        g = a.xData;
                        for (p = w = a.xIncrement ? 1 : g.length - 1; 0 < p; p--) if (k = g[p] - g[p - 1], void 0 === c || k < c) c = k
                    }), this.minRange = Math.min(5 * c, this.dataMax - this.dataMin)));
                    b - q < this.minRange && (f = this.dataMax - this.dataMin >= this.minRange, u = this.minRange, e = (u - b + q) / 2, e = [q - e, t(a.min, q - e)], f && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), q = E(e), b = [q + u, t(a.max, q + u)],
                    f && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = D(b), b - q < u && (e[0] = b - u, e[1] = t(a.min, b - u), q = E(e)));
                    this.min = q;
                    this.max = b
                },
                getClosest: function () {
                    var a;
                    this.categories ? a = 1 : n(this.series, function (h) {
                        var q = h.closestPointRange, b = h.visible || !h.chart.options.chart.ignoreHiddenSeries;
                        !h.noSharedTooltip && d(q) && b && (a = d(a) ? Math.min(a, q) : q)
                    });
                    return a
                },
                nameToX: function (a) {
                    var h = p(this.categories), b = h ? this.categories : this.names, f = a.options.x, c;
                    a.series.requireSorting = !1;
                    d(f) || (f = !1 === this.options.uniqueNames ?
                        a.series.autoIncrement() : e(a.name, b));
                    -1 === f ? h || (c = b.length) : c = f;
                    void 0 !== c && (this.names[c] = a.name);
                    return c
                },
                updateNames: function () {
                    var a = this;
                    0 < this.names.length && (this.names.length = 0, this.minRange = this.userMinRange, n(this.series || [], function (h) {
                        h.xIncrement = null;
                        if (!h.points || h.isDirtyData) h.processData(), h.generatePoints();
                        n(h.points, function (b, q) {
                            var e;
                            b.options && (e = a.nameToX(b), void 0 !== e && e !== b.x && (b.x = e, h.xData[q] = e))
                        })
                    }))
                },
                setAxisTranslation: function (a) {
                    var h = this, b = h.max - h.min, e = h.axisPointRange ||
                        0, f, c = 0, d = 0, p = h.linkedParent, k = !!h.categories, g = h.transA, w = h.isXAxis;
                    if (w || k || e) f = h.getClosest(), p ? (c = p.minPointOffset, d = p.pointRangePadding) : n(h.series, function (a) {
                        var b = k ? 1 : w ? t(a.options.pointRange, f, 0) : h.axisPointRange || 0;
                        a = a.options.pointPlacement;
                        e = Math.max(e, b);
                        h.single || (c = Math.max(c, F(a) ? 0 : b / 2), d = Math.max(d, "on" === a ? 0 : b))
                    }), p = h.ordinalSlope && f ? h.ordinalSlope / f : 1, h.minPointOffset = c *= p, h.pointRangePadding = d *= p, h.pointRange = Math.min(e, b), w && (h.closestPointRange = f);
                    a && (h.oldTransA = g);
                    h.translationSlope =
                        h.transA = g = h.options.staticScale || h.len / (b + d || 1);
                    h.transB = h.horiz ? h.left : h.bottom;
                    h.minPixelPadding = g * c
                },
                minFromRange: function () {
                    return this.max - this.range
                },
                setTickInterval: function (h) {
                    var b = this, e = b.chart, p = b.options, k = b.isLog, g = b.log2lin, w = b.isDatetimeAxis,
                        z = b.isXAxis, A = b.isLinked, y = p.maxPadding, v = p.minPadding, l = p.tickInterval,
                        F = p.tickPixelInterval, H = b.categories, G = b.threshold, r = b.softThreshold, J, L, C, x;
                    w || H || A || this.getTickAmount();
                    C = t(b.userMin, p.min);
                    x = t(b.userMax, p.max);
                    A ? (b.linkedParent = e[b.coll][p.linkedTo],
                        e = b.linkedParent.getExtremes(), b.min = t(e.min, e.dataMin), b.max = t(e.max, e.dataMax), p.type !== b.linkedParent.options.type && a.error(11, 1)) : (!r && d(G) && (b.dataMin >= G ? (J = G, v = 0) : b.dataMax <= G && (L = G, y = 0)), b.min = t(C, J, b.dataMin), b.max = t(x, L, b.dataMax));
                    k && (b.positiveValuesOnly && !h && 0 >= Math.min(b.min, t(b.dataMin, b.min)) && a.error(10, 1), b.min = m(g(b.min), 15), b.max = m(g(b.max), 15));
                    b.range && d(b.max) && (b.userMin = b.min = C = Math.max(b.min, b.minFromRange()), b.userMax = x = b.max, b.range = null);
                    c(b, "foundExtremes");
                    b.beforePadding &&
                    b.beforePadding();
                    b.adjustForMinRange();
                    !(H || b.axisPointRange || b.usePercentage || A) && d(b.min) && d(b.max) && (g = b.max - b.min) && (!d(C) && v && (b.min -= g * v), !d(x) && y && (b.max += g * y));
                    u(p.softMin) && (b.min = Math.min(b.min, p.softMin));
                    u(p.softMax) && (b.max = Math.max(b.max, p.softMax));
                    u(p.floor) && (b.min = Math.max(b.min, p.floor));
                    u(p.ceiling) && (b.max = Math.min(b.max, p.ceiling));
                    r && d(b.dataMin) && (G = G || 0, !d(C) && b.min < G && b.dataMin >= G ? b.min = G : !d(x) && b.max > G && b.dataMax <= G && (b.max = G));
                    b.tickInterval = b.min === b.max || void 0 === b.min ||
                    void 0 === b.max ? 1 : A && !l && F === b.linkedParent.options.tickPixelInterval ? l = b.linkedParent.tickInterval : t(l, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, H ? 1 : (b.max - b.min) * F / Math.max(b.len, F));
                    z && !h && n(b.series, function (a) {
                        a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                    });
                    b.setAxisTranslation(!0);
                    b.beforeSetTickPositions && b.beforeSetTickPositions();
                    b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                    b.pointRange && !l && (b.tickInterval = Math.max(b.pointRange,
                        b.tickInterval));
                    h = t(p.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                    !l && b.tickInterval < h && (b.tickInterval = h);
                    w || k || l || (b.tickInterval = B(b.tickInterval, null, f(b.tickInterval), t(p.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                    this.tickAmount || (b.tickInterval = b.unsquish());
                    this.setTickPositions()
                },
                setTickPositions: function () {
                    var a = this.options, b, e = a.tickPositions, f = a.tickPositioner, c = a.startOnTick,
                        p = a.endOnTick;
                    this.tickmarkOffset = this.categories &&
                    "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                    this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                    this.single = this.min === this.max && d(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                    this.tickPositions = b = e && e.slice();
                    !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange,
                        !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, f && (f = f.apply(this, [this.min, this.max]))) && (this.tickPositions = b = f);
                    this.paddedTicks = b.slice(0);
                    this.trimTicks(b, c, p);
                    this.isLinked || (this.single && (this.min -= .5, this.max += .5), e || f || this.adjustTickAmount())
                },
                trimTicks: function (a, b, e) {
                    var h = a[0], f = a[a.length - 1], c = this.minPointOffset || 0;
                    if (!this.isLinked) {
                        if (b &&
                            -Infinity !== h) this.min = h; else for (; this.min - c > a[0];) a.shift();
                        if (e) this.max = f; else for (; this.max + c < a[a.length - 1];) a.pop();
                        0 === a.length && d(h) && a.push((f + h) / 2)
                    }
                },
                alignToOthers: function () {
                    var a = {}, b, e = this.options;
                    !1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || this.isLog || n(this.chart[this.coll], function (h) {
                        var e = h.options, e = [h.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                        h.series.length && (a[e] ? b = !0 : a[e] = 1)
                    });
                    return b
                },
                getTickAmount: function () {
                    var a = this.options, b = a.tickAmount, e =
                        a.tickPixelInterval;
                    !d(a.tickInterval) && this.len < e && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                    !b && this.alignToOthers() && (b = Math.ceil(this.len / e) + 1);
                    4 > b && (this.finalTickAmt = b, b = 5);
                    this.tickAmount = b
                },
                adjustTickAmount: function () {
                    var a = this.tickInterval, b = this.tickPositions, e = this.tickAmount, f = this.finalTickAmt,
                        c = b && b.length;
                    if (c < e) {
                        for (; b.length < e;) b.push(m(b[b.length - 1] + a));
                        this.transA *= (c - 1) / (e - 1);
                        this.max = b[b.length - 1]
                    } else c > e && (this.tickInterval *= 2, this.setTickPositions());
                    if (d(f)) {
                        for (a = e = b.length; a--;) (3 === f && 1 === a % 2 || 2 >= f && 0 < a && a < e - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                },
                setScale: function () {
                    var a, b;
                    this.oldMin = this.min;
                    this.oldMax = this.max;
                    this.oldAxisLength = this.len;
                    this.setAxisSize();
                    b = this.len !== this.oldAxisLength;
                    n(this.series, function (b) {
                        if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                    });
                    b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw =
                        !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
                },
                setExtremes: function (a, b, e, f, d) {
                    var h = this, q = h.chart;
                    e = t(e, !0);
                    n(h.series, function (a) {
                        delete a.kdTree
                    });
                    d = k(d, {min: a, max: b});
                    c(h, "setExtremes", d, function () {
                        h.userMin = a;
                        h.userMax = b;
                        h.eventArgs = d;
                        e && q.redraw(f)
                    })
                },
                zoom: function (a, b) {
                    var h = this.dataMin, e = this.dataMax, f = this.options,
                        c = Math.min(h, t(f.min, h)), f = Math.max(e, t(f.max, e));
                    if (a !== this.min || b !== this.max) this.allowZoomOutside || (d(h) && (a < c && (a = c), a > f && (a = f)), d(e) && (b < c && (b = c), b > f && (b = f))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                    return !0
                },
                setAxisSize: function () {
                    var a = this.chart, b = this.options, e = b.offsets || [0, 0, 0, 0], f = this.horiz,
                        c = t(b.width, a.plotWidth - e[3] + e[1]), d = t(b.height, a.plotHeight - e[0] + e[2]),
                        p = t(b.top, a.plotTop + e[0]), b = t(b.left, a.plotLeft + e[3]), e = /%$/;
                    e.test(d) && (d =
                        Math.round(parseFloat(d) / 100 * a.plotHeight));
                    e.test(p) && (p = Math.round(parseFloat(p) / 100 * a.plotHeight + a.plotTop));
                    this.left = b;
                    this.top = p;
                    this.width = c;
                    this.height = d;
                    this.bottom = a.chartHeight - d - p;
                    this.right = a.chartWidth - c - b;
                    this.len = Math.max(f ? c : d, 0);
                    this.pos = f ? b : p
                },
                getExtremes: function () {
                    var a = this.isLog, b = this.lin2log;
                    return {
                        min: a ? m(b(this.min)) : this.min,
                        max: a ? m(b(this.max)) : this.max,
                        dataMin: this.dataMin,
                        dataMax: this.dataMax,
                        userMin: this.userMin,
                        userMax: this.userMax
                    }
                },
                getThreshold: function (a) {
                    var b =
                        this.isLog, h = this.lin2log, e = b ? h(this.min) : this.min, b = b ? h(this.max) : this.max;
                    null === a ? a = e : e > a ? a = e : b < a && (a = b);
                    return this.translate(a, 0, 1, 0, 1)
                },
                autoLabelAlign: function (a) {
                    a = (t(a, 0) - 90 * this.side + 720) % 360;
                    return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
                },
                tickSize: function (a) {
                    var b = this.options, h = b[a + "Length"],
                        e = t(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                    if (e && h) return "inside" === b[a + "Position"] && (h = -h), [h, e]
                },
                labelMetrics: function () {
                    var a = this.tickPositions && this.tickPositions[0] || 0;
                    return this.chart.renderer.fontMetrics(this.options.labels.style &&
                        this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
                },
                unsquish: function () {
                    var a = this.options.labels, b = this.horiz, e = this.tickInterval, f = e,
                        c = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e), p, k = a.rotation,
                        g = this.labelMetrics(), w, u = Number.MAX_VALUE, z, A = function (a) {
                            a /= c || 1;
                            a = 1 < a ? Math.ceil(a) : 1;
                            return a * e
                        };
                    b ? (z = !a.staggerLines && !a.step && (d(k) ? [k] : c < t(a.autoRotationLimit, 80) && a.autoRotation)) && n(z, function (a) {
                        var b;
                        if (a === k || a && -90 <= a && 90 >= a) w = A(Math.abs(g.h / Math.sin(r * a))), b = w +
                            Math.abs(a / 360), b < u && (u = b, p = a, f = w)
                    }) : a.step || (f = A(g.h));
                    this.autoRotation = z;
                    this.labelRotation = t(p, k);
                    return f
                },
                getSlotWidth: function () {
                    var a = this.chart, b = this.horiz, e = this.options.labels,
                        f = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), c = a.margin[3];
                    return b && 2 > (e.step || 0) && !e.rotation && (this.staggerLines || 1) * this.len / f || !b && (c && c - a.spacing[3] || .33 * a.chartWidth)
                },
                renderUnsquish: function () {
                    var a = this.chart, b = a.renderer, e = this.tickPositions, f = this.ticks, c = this.options.labels,
                        d = this.horiz,
                        p = this.getSlotWidth(), k = Math.max(1, Math.round(p - 2 * (c.padding || 5))), g = {},
                        w = this.labelMetrics(), u = c.style && c.style.textOverflow, z, A = 0, t, v;
                    F(c.rotation) || (g.rotation = c.rotation || 0);
                    n(e, function (a) {
                        (a = f[a]) && a.labelLength > A && (A = a.labelLength)
                    });
                    this.maxLabelLength = A;
                    if (this.autoRotation) A > k && A > w.h ? g.rotation = this.labelRotation : this.labelRotation = 0; else if (p && (z = {width: k + "px"}, !u)) for (z.textOverflow = "clip", t = e.length; !d && t--;) if (v = e[t], k = f[v].label) k.styles && "ellipsis" === k.styles.textOverflow ? k.css({textOverflow: "clip"}) :
                        f[v].labelLength > p && k.css({width: p + "px"}), k.getBBox().height > this.len / e.length - (w.h - w.f) && (k.specCss = {textOverflow: "ellipsis"});
                    g.rotation && (z = {width: (A > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, u || (z.textOverflow = "ellipsis"));
                    if (this.labelAlign = c.align || this.autoLabelAlign(this.labelRotation)) g.align = this.labelAlign;
                    n(e, function (a) {
                        var b = (a = f[a]) && a.label;
                        b && (b.attr(g), z && b.css(L(z, b.specCss)), delete b.specCss, a.rotation = g.rotation)
                    });
                    this.tickRotCorr = b.rotCorr(w.b, this.labelRotation ||
                        0, 0 !== this.side)
                },
                hasData: function () {
                    return this.hasVisibleSeries || d(this.min) && d(this.max) && !!this.tickPositions
                },
                addTitle: function (a) {
                    var b = this.chart.renderer, h = this.horiz, e = this.opposite, f = this.options.title, c;
                    this.axisTitle || ((c = f.textAlign) || (c = (h ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: e ? "right" : "left",
                        middle: "center",
                        high: e ? "left" : "right"
                    })[f.align]), this.axisTitle = b.text(f.text, 0, 0, f.useHTML).attr({
                        zIndex: 7,
                        rotation: f.rotation || 0,
                        align: c
                    }).addClass("highcharts-axis-title").add(this.axisGroup),
                        this.axisTitle.isNew = !0);
                    this.axisTitle[a ? "show" : "hide"](!0)
                },
                generateTick: function (a) {
                    var b = this.ticks;
                    b[a] ? b[a].addLabel() : b[a] = new w(this, a)
                },
                getOffset: function () {
                    var a = this, b = a.chart, e = b.renderer, f = a.options, c = a.tickPositions, p = a.ticks,
                        k = a.horiz, g = a.side, w = b.inverted && !a.isZAxis ? [1, 0, 3, 2][g] : g, u, z, A = 0, v,
                        l = 0, B = f.title, F = f.labels, m = 0, G = b.axisOffset, b = b.clipOffset,
                        r = [-1, 1, 1, -1][g], J = f.className, L = a.axisParent, C = this.tickSize("tick");
                    u = a.hasData();
                    a.showAxis = z = u || t(f.showEmpty, !0);
                    a.staggerLines =
                        a.horiz && F.staggerLines;
                    a.axisGroup || (a.gridGroup = e.g("grid").attr({zIndex: f.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (J || "")).add(L), a.axisGroup = e.g("axis").attr({zIndex: f.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (J || "")).add(L), a.labelGroup = e.g("axis-labels").attr({zIndex: F.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (J || "")).add(L));
                    u || a.isLinked ? (n(c, function (b, e) {
                        a.generateTick(b, e)
                    }), a.renderUnsquish(), !1 === F.reserveSpace ||
                    0 !== g && 2 !== g && {
                        1: "left",
                        3: "right"
                    }[g] !== a.labelAlign && "center" !== a.labelAlign || n(c, function (a) {
                        m = Math.max(p[a].getLabelSize(), m)
                    }), a.staggerLines && (m *= a.staggerLines, a.labelOffset = m * (a.opposite ? -1 : 1))) : H(p, function (a, b) {
                        a.destroy();
                        delete p[b]
                    });
                    B && B.text && !1 !== B.enabled && (a.addTitle(z), z && !1 !== B.reserveSpace && (a.titleOffset = A = a.axisTitle.getBBox()[k ? "height" : "width"], v = B.offset, l = d(v) ? 0 : t(B.margin, k ? 5 : 10)));
                    a.renderLine();
                    a.offset = r * t(f.offset, G[g]);
                    a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                    e = 0 === g ?
                        -a.labelMetrics().h : 2 === g ? a.tickRotCorr.y : 0;
                    l = Math.abs(m) + l;
                    m && (l = l - e + r * (k ? t(F.y, a.tickRotCorr.y + 8 * r) : F.x));
                    a.axisTitleMargin = t(v, l);
                    G[g] = Math.max(G[g], a.axisTitleMargin + A + r * a.offset, l, u && c.length && C ? C[0] + r * a.offset : 0);
                    c = 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                    0 < f.offset && (c -= 2 * f.offset);
                    b[w] = Math.max(b[w] || c, c)
                },
                getLinePath: function (a) {
                    var b = this.chart, e = this.opposite, h = this.offset, f = this.horiz,
                        c = this.left + (e ? this.width : 0) + h,
                        h = b.chartHeight - this.bottom - (e ? this.height : 0) + h;
                    e && (a *= -1);
                    return b.renderer.crispLine(["M",
                        f ? this.left : c, f ? h : this.top, "L", f ? b.chartWidth - this.right : c, f ? h : b.chartHeight - this.bottom], a)
                },
                renderLine: function () {
                    this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup))
                },
                getTitlePosition: function () {
                    var a = this.horiz, b = this.left, e = this.top, f = this.len, c = this.options.title,
                        p = a ? b : e, d = this.opposite, k = this.offset, g = c.x || 0, w = c.y || 0,
                        u = this.chart.renderer.fontMetrics(c.style && c.style.fontSize, this.axisTitle).f, f = {
                            low: p + (a ? 0 : f), middle: p + f / 2, high: p + (a ?
                            f : 0)
                        }[c.align],
                        b = (a ? e + this.height : b) + (a ? 1 : -1) * (d ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? u : 0);
                    return {
                        x: a ? f + g : b + (d ? this.width : 0) + k + g,
                        y: a ? b + w - (d ? this.height : 0) + k : f + w
                    }
                },
                renderMinorTick: function (a) {
                    var b = this.chart.hasRendered && u(this.oldMin), e = this.minorTicks;
                    e[a] || (e[a] = new w(this, a, "minor"));
                    b && e[a].isNew && e[a].render(null, !0);
                    e[a].render(null, !1, 1)
                },
                renderTick: function (a, b) {
                    var e = this.isLinked, h = this.ticks, f = this.chart.hasRendered && u(this.oldMin);
                    if (!e || a >= this.min && a <= this.max) h[a] || (h[a] = new w(this,
                        a)), f && h[a].isNew && h[a].render(b, !0, .1), h[a].render(b)
                },
                render: function () {
                    var b = this, e = b.chart, f = b.options, c = b.isLog, p = b.lin2log, d = b.isLinked,
                        k = b.tickPositions, g = b.axisTitle, z = b.ticks, t = b.minorTicks, v = b.alternateBands,
                        l = f.stackLabels, B = f.alternateGridColor, F = b.tickmarkOffset, m = b.axisLine,
                        G = b.showAxis, r = C(e.renderer.globalAnimation), J, L;
                    b.labelEdge.length = 0;
                    b.overlap = !1;
                    n([z, t, v], function (a) {
                        H(a, function (a) {
                            a.isActive = !1
                        })
                    });
                    if (b.hasData() || d) b.minorTickInterval && !b.categories && n(b.getMinorTickPositions(),
                        function (a) {
                            b.renderMinorTick(a)
                        }), k.length && (n(k, function (a, e) {
                        b.renderTick(a, e)
                    }), F && (0 === b.min || b.single) && (z[-1] || (z[-1] = new w(b, -1, null, !0)), z[-1].render(-1))), B && n(k, function (h, f) {
                        L = void 0 !== k[f + 1] ? k[f + 1] + F : b.max - F;
                        0 === f % 2 && h < b.max && L <= b.max + (e.polar ? -F : F) && (v[h] || (v[h] = new a.PlotLineOrBand(b)), J = h + F, v[h].options = {
                            from: c ? p(J) : J,
                            to: c ? p(L) : L,
                            color: B
                        }, v[h].render(), v[h].isActive = !0)
                    }), b._addedPlotLB || (n((f.plotLines || []).concat(f.plotBands || []), function (a) {
                        b.addPlotBandOrLine(a)
                    }), b._addedPlotLB =
                        !0);
                    n([z, t, v], function (a) {
                        var b, h = [], f = r.duration;
                        H(a, function (a, b) {
                            a.isActive || (a.render(b, !1, 0), a.isActive = !1, h.push(b))
                        });
                        A(function () {
                            for (b = h.length; b--;) a[h[b]] && !a[h[b]].isActive && (a[h[b]].destroy(), delete a[h[b]])
                        }, a !== v && e.hasRendered && f ? f : 0)
                    });
                    m && (m[m.isPlaced ? "animate" : "attr"]({d: this.getLinePath(m.strokeWidth())}), m.isPlaced = !0, m[G ? "show" : "hide"](!0));
                    g && G && (f = b.getTitlePosition(), u(f.y) ? (g[g.isNew ? "attr" : "animate"](f), g.isNew = !1) : (g.attr("y", -9999), g.isNew = !0));
                    l && l.enabled && b.renderStackTotals();
                    b.isDirty = !1
                },
                redraw: function () {
                    this.visible && (this.render(), n(this.plotLinesAndBands, function (a) {
                        a.render()
                    }));
                    n(this.series, function (a) {
                        a.isDirty = !0
                    })
                },
                keepProps: "extKey hcEvents names series userMax userMin".split(" "),
                destroy: function (a) {
                    var b = this, h = b.stacks, f = b.plotLinesAndBands, c;
                    a || G(b);
                    H(h, function (a, b) {
                        l(a);
                        h[b] = null
                    });
                    n([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                        l(a)
                    });
                    if (f) for (a = f.length; a--;) f[a].destroy();
                    n("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
                        function (a) {
                            b[a] && (b[a] = b[a].destroy())
                        });
                    for (c in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[c] = b.plotLinesAndBandsGroups[c].destroy();
                    H(b, function (a, h) {
                        -1 === e(h, b.keepProps) && delete b[h]
                    })
                },
                drawCrosshair: function (a, b) {
                    var e, h = this.crosshair, f = t(h.snap, !0), c, p = this.cross;
                    a || (a = this.cross && this.cross.e);
                    this.crosshair && !1 !== (d(b) || !f) ? (f ? d(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), d(c) && (e = this.getPlotLinePath(b && (this.isXAxis ?
                        b.x : t(b.stackY, b.y)), null, null, null, c) || null), d(e) ? (b = this.categories && !this.isRadial, p || (this.cross = p = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + h.className).attr({zIndex: t(h.zIndex, 2)}).add()), p.show().attr({d: e}), b && !h.width && p.attr({"stroke-width": this.transA}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
                },
                hideCrosshair: function () {
                    this.cross && this.cross.hide()
                }
            });
        return a.Axis = J
    }(I);
    (function (a) {
        var x = a.Axis, C = a.Date,
            E = a.dateFormat, D = a.defaultOptions, m = a.defined, g = a.each, d = a.extend, r = a.getMagnitude,
            l = a.getTZOffset, n = a.normalizeTickInterval, k = a.pick, c = a.timeUnits;
        x.prototype.getTimeTicks = function (a, f, b, e) {
            var p = [], u = {}, v = D.global.useUTC, n, B = new C(f - Math.max(l(f), l(b))), H = C.hcMakeTime,
                t = a.unitRange, G = a.count, z;
            if (m(f)) {
                B[C.hcSetMilliseconds](t >= c.second ? 0 : G * Math.floor(B.getMilliseconds() / G));
                if (t >= c.second) B[C.hcSetSeconds](t >= c.minute ? 0 : G * Math.floor(B.getSeconds() / G));
                if (t >= c.minute) B[C.hcSetMinutes](t >= c.hour ?
                    0 : G * Math.floor(B[C.hcGetMinutes]() / G));
                if (t >= c.hour) B[C.hcSetHours](t >= c.day ? 0 : G * Math.floor(B[C.hcGetHours]() / G));
                if (t >= c.day) B[C.hcSetDate](t >= c.month ? 1 : G * Math.floor(B[C.hcGetDate]() / G));
                t >= c.month && (B[C.hcSetMonth](t >= c.year ? 0 : G * Math.floor(B[C.hcGetMonth]() / G)), n = B[C.hcGetFullYear]());
                if (t >= c.year) B[C.hcSetFullYear](n - n % G);
                if (t === c.week) B[C.hcSetDate](B[C.hcGetDate]() - B[C.hcGetDay]() + k(e, 1));
                n = B[C.hcGetFullYear]();
                e = B[C.hcGetMonth]();
                var A = B[C.hcGetDate](), w = B[C.hcGetHours]();
                if (C.hcTimezoneOffset ||
                    C.hcGetTimezoneOffset) z = (!v || !!C.hcGetTimezoneOffset) && (b - f > 4 * c.month || l(f) !== l(b)), B = B.getTime(), B = new C(B + l(B));
                v = B.getTime();
                for (f = 1; v < b;) p.push(v), v = t === c.year ? H(n + f * G, 0) : t === c.month ? H(n, e + f * G) : !z || t !== c.day && t !== c.week ? z && t === c.hour ? H(n, e, A, w + f * G) : v + t * G : H(n, e, A + f * G * (t === c.day ? 1 : 7)), f++;
                p.push(v);
                t <= c.hour && 1E4 > p.length && g(p, function (a) {
                    0 === a % 18E5 && "000000000" === E("%H%M%S%L", a) && (u[a] = "day")
                })
            }
            p.info = d(a, {higherRanks: u, totalRange: t * G});
            return p
        };
        x.prototype.normalizeTimeTickInterval = function (a,
                                                          f) {
            var b = f || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            f = b[b.length - 1];
            var e = c[f[0]], p = f[1], d;
            for (d = 0; d < b.length && !(f = b[d], e = c[f[0]], p = f[1], b[d + 1] && a <= (e * p[p.length - 1] + c[b[d + 1][0]]) / 2); d++) ;
            e === c.year && a < 5 * e && (p = [1, 2, 5]);
            a = n(a / e, p, "year" === f[0] ? Math.max(r(a / e), 1) : 1);
            return {unitRange: e, count: a, unitName: f[0]}
        }
    })(I);
    (function (a) {
        var x = a.Axis, C = a.getMagnitude,
            E = a.map, D = a.normalizeTickInterval, m = a.pick;
        x.prototype.getLogTickPositions = function (a, d, r, l) {
            var g = this.options, k = this.len, c = this.lin2log, v = this.log2lin, f = [];
            l || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), f = this.getLinearTickPositions(a, d, r); else if (.08 <= a) for (var k = Math.floor(d), b, e, p, u, F, g = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; k < r + 1 && !F; k++) for (e = g.length, b = 0; b < e && !F; b++) p = v(c(k) * g[b]), p > d && (!l || u <= r) && void 0 !== u && f.push(u), u > r && (F = !0), u = p; else d = c(d), r = c(r), a = g[l ? "minorTickInterval" :
                "tickInterval"], a = m("auto" === a ? null : a, this._minorAutoInterval, g.tickPixelInterval / (l ? 5 : 1) * (r - d) / ((l ? k / this.tickPositions.length : k) || 1)), a = D(a, null, C(a)), f = E(this.getLinearTickPositions(a, d, r), v), l || (this._minorAutoInterval = a / 5);
            l || (this.tickInterval = a);
            return f
        };
        x.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        x.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(I);
    (function (a, x) {
        var C = a.arrayMax, E = a.arrayMin, D = a.defined, m = a.destroyObjectProperties, g = a.each, d = a.erase,
            r = a.merge, l =
                a.pick;
        a.PlotLineOrBand = function (a, d) {
            this.axis = a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var d = this, k = d.axis, c = k.horiz, g = d.options, f = g.label, b = d.label, e = g.to, p = g.from,
                    u = g.value, F = D(p) && D(e), m = D(u), B = d.svgElem, H = !B, t = [], G = l(g.zIndex, 0),
                    z = g.events, t = {"class": "highcharts-plot-" + (F ? "band " : "line ") + (g.className || "")},
                    A = {}, w = k.chart.renderer, J = F ? "bands" : "lines", h;
                h = k.log2lin;
                k.isLog && (p = h(p), e = h(e), u = h(u));
                A.zIndex = G;
                J += "-" + G;
                (h = k.plotLinesAndBandsGroups[J]) || (k.plotLinesAndBandsGroups[J] =
                    h = w.g("plot-" + J).attr(A).add());
                H && (d.svgElem = B = w.path().attr(t).add(h));
                if (m) t = k.getPlotLinePath(u, B.strokeWidth()); else if (F) t = k.getPlotBandPath(p, e, g); else return;
                H && t && t.length ? (B.attr({d: t}), z && a.objectEach(z, function (a, b) {
                    B.on(b, function (a) {
                        z[b].apply(d, [a])
                    })
                })) : B && (t ? (B.show(), B.animate({d: t})) : (B.hide(), b && (d.label = b = b.destroy())));
                f && D(f.text) && t && t.length && 0 < k.width && 0 < k.height && !t.flat ? (f = r({
                    align: c && F && "center",
                    x: c ? !F && 4 : 10,
                    verticalAlign: !c && F && "middle",
                    y: c ? F ? 16 : 10 : F ? 6 : -4,
                    rotation: c &&
                    !F && 90
                }, f), this.renderLabel(f, t, F, G)) : b && b.hide();
                return d
            }, renderLabel: function (a, d, c, g) {
                var f = this.label, b = this.axis.chart.renderer;
                f || (f = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (c ? "band" : "line") + "-label " + (a.className || "")
                }, f.zIndex = g, this.label = f = b.text(a.text, 0, 0, a.useHTML).attr(f).add());
                g = [d[1], d[4], c ? d[6] : d[1]];
                d = [d[2], d[5], c ? d[7] : d[2]];
                c = E(g);
                b = E(d);
                f.align(a, !1, {x: c, y: b, width: C(g) - c, height: C(d) - b});
                f.show()
            }, destroy: function () {
                d(this.axis.plotLinesAndBands,
                    this);
                delete this.axis;
                m(this)
            }
        };
        a.extend(x.prototype, {
            getPlotBandPath: function (a, d) {
                var c = this.getPlotLinePath(d, null, null, !0), g = this.getPlotLinePath(a, null, null, !0),
                    f = this.horiz, b = 1;
                a = a < this.min && d < this.min || a > this.max && d > this.max;
                g && c ? (a && (g.flat = g.toString() === c.toString(), b = 0), g.push(f && c[4] === g[4] ? c[4] + b : c[4], f || c[5] !== g[5] ? c[5] : c[5] + b, f && c[1] === g[1] ? c[1] + b : c[1], f || c[2] !== g[2] ? c[2] : c[2] + b)) : g = null;
                return g
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a,
                    "plotLines")
            }, addPlotBandOrLine: function (d, g) {
                var c = (new a.PlotLineOrBand(this, d)).render(), k = this.userOptions;
                c && (g && (k[g] = k[g] || [], k[g].push(d)), this.plotLinesAndBands.push(c));
                return c
            }, removePlotBandOrLine: function (a) {
                for (var k = this.plotLinesAndBands, c = this.options, l = this.userOptions, f = k.length; f--;) k[f].id === a && k[f].destroy();
                g([c.plotLines || [], l.plotLines || [], c.plotBands || [], l.plotBands || []], function (b) {
                    for (f = b.length; f--;) b[f].id === a && d(b, b[f])
                })
            }, removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(I, T);
    (function (a) {
        var x = a.dateFormat, C = a.each, E = a.extend, D = a.format, m = a.isNumber, g = a.map, d = a.merge,
            r = a.pick, l = a.splat, n = a.syncTimeout, k = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            }, cleanSplit: function (a) {
                C(this.chart.series, function (c) {
                    var f =
                        c && c.tt;
                    f && (!f.isActive || a ? c.tt = f.destroy() : f.isActive = !1)
                })
            }, applyFilter: function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{tagName: "feGaussianBlur", in: "SourceAlpha", stdDeviation: 1}, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{tagName: "feFuncA", type: "linear", slope: .3}]
                    }, {
                        tagName: "feMerge",
                        children: [{tagName: "feMergeNode"}, {tagName: "feMergeNode", in: "SourceGraphic"}]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            }, getLabel: function () {
                var a = this.chart.renderer, d = this.options;
                this.label || (this.label = this.split ? a.g("tooltip") : a.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius
                }), this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                d(!0, this.chart.options.tooltip.userOptions,
                    a);
                this.init(this.chart, d(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            }, move: function (a, d, f, b) {
                var e = this, c = e.now,
                    g = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - c.x) || 1 < Math.abs(d - c.y)),
                    k = e.followPointer || 1 < e.len;
                E(c, {
                    x: g ? (2 * c.x + a) / 3 : a,
                    y: g ? (c.y + d) / 2 : d,
                    anchorX: k ? void 0 : g ? (2 * c.anchorX + f) / 3 : f,
                    anchorY: k ? void 0 : g ?
                        (c.anchorY + b) / 2 : b
                });
                e.getLabel().attr(c);
                g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    e && e.move(a, d, f, b)
                }, 32))
            }, hide: function (a) {
                var c = this;
                clearTimeout(this.hideTimer);
                a = r(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = n(function () {
                    c.getLabel()[a ? "fadeOut" : "hide"]();
                    c.isHidden = !0
                }, a))
            }, getAnchor: function (a, d) {
                var f, b = this.chart, e = b.inverted, c = b.plotTop, k = b.plotLeft, n = 0, m = 0, B, v;
                a = l(a);
                f = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d =
                    b.pointer.normalize(d)), f = [d.chartX - b.plotLeft, d.chartY - c]);
                f || (C(a, function (a) {
                    B = a.series.yAxis;
                    v = a.series.xAxis;
                    n += a.plotX + (!e && v ? v.left - k : 0);
                    m += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && B ? B.top - c : 0)
                }), n /= a.length, m /= a.length, f = [e ? b.plotWidth - m : n, this.shared && !e && 1 < a.length && d ? d.chartY - c : e ? b.plotHeight - n : m]);
                return g(f, Math.round)
            }, getPosition: function (a, d, f) {
                var b = this.chart, e = this.distance, c = {}, g = f.h || 0, k,
                    l = ["y", b.chartHeight, d, f.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight], B = ["x",
                        b.chartWidth, a, f.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
                    n = !this.followPointer && r(f.ttBelow, !b.inverted === !!f.negative),
                    t = function (a, b, h, f, d, p) {
                        var k = h < f - e, q = f + e + h < b, w = f - e - h;
                        f += e;
                        if (n && q) c[a] = f; else if (!n && k) c[a] = w; else if (k) c[a] = Math.min(p - h, 0 > w - g ? w : w - g); else if (q) c[a] = Math.max(d, f + g + h > b ? f : f + g); else return !1
                    }, m = function (a, b, h, f) {
                        var d;
                        f < e || f > b - e ? d = !1 : c[a] = f < h / 2 ? 1 : f > b - h / 2 ? b - h - 2 : f - h / 2;
                        return d
                    }, z = function (a) {
                        var b = l;
                        l = B;
                        B = b;
                        k = a
                    }, A = function () {
                        !1 !== t.apply(0, l) ? !1 !== m.apply(0, B) || k || (z(!0),
                            A()) : k ? c.x = c.y = 0 : (z(!0), A())
                    };
                (b.inverted || 1 < this.len) && z();
                A();
                return c
            }, defaultFormatter: function (a) {
                var c = this.points || l(this), f;
                f = [a.tooltipFooterHeaderFormatter(c[0])];
                f = f.concat(a.bodyFormatter(c));
                f.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return f
            }, refresh: function (a, d) {
                var f, b, e = a, c, g = {}, k = [];
                f = this.options.formatter || this.defaultFormatter;
                var g = this.shared, n;
                clearTimeout(this.hideTimer);
                this.followPointer = l(e)[0].series.tooltipOptions.followPointer;
                c = this.getAnchor(e, d);
                d = c[0];
                b = c[1];
                !g || e.series && e.series.noSharedTooltip ? g = e.getLabelConfig() : (C(e, function (a) {
                    a.setState("hover");
                    k.push(a.getLabelConfig())
                }), g = {x: e[0].category, y: e[0].y}, g.points = k, e = e[0]);
                this.len = k.length;
                g = f.call(g, this);
                n = e.series;
                this.distance = r(n.tooltipOptions.distance, 16);
                !1 === g ? this.hide() : (f = this.getLabel(), this.isHidden && f.attr({opacity: 1}).show(), this.split ? this.renderSplit(g, a) : (f.css({width: this.chart.spacingBox.width}), f.attr({text: g && g.join ? g.join("") : g}), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" +
                    r(e.colorIndex, n.colorIndex)), this.updatePosition({
                    plotX: d,
                    plotY: b,
                    negative: e.negative,
                    ttBelow: e.ttBelow,
                    h: c[2] || 0
                })), this.isHidden = !1)
            }, renderSplit: function (c, d) {
                var f = this, b = [], e = this.chart, p = e.renderer, g = !0, k = this.options, l, n = this.getLabel();
                C(c.slice(0, d.length + 1), function (a, c) {
                    c = d[c - 1] || {isHeader: !0, plotX: d[0].plotX};
                    var u = c.series || f, z = u.tt,
                        A = "highcharts-color-" + r(c.colorIndex, (c.series || {}).colorIndex, "none");
                    z || (u.tt = z = p.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + A).attr({
                        padding: k.padding,
                        r: k.borderRadius
                    }).add(n));
                    z.isActive = !0;
                    z.attr({text: a});
                    a = z.getBBox();
                    A = a.width + z.strokeWidth();
                    c.isHeader ? (l = a.height, A = Math.max(0, Math.min(c.plotX + e.plotLeft - A / 2, e.chartWidth - A))) : A = c.plotX + e.plotLeft - r(k.distance, 16) - A;
                    0 > A && (g = !1);
                    a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                    a -= e.plotTop;
                    b.push({
                        target: c.isHeader ? e.plotHeight + l : a,
                        rank: c.isHeader ? 1 : 0,
                        size: u.tt.getBBox().height + 1,
                        point: c,
                        x: A,
                        tt: z
                    })
                });
                this.cleanSplit();
                a.distribute(b, e.plotHeight + l);
                C(b, function (a) {
                    var b = a.point,
                        f = b.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: g || b.isHeader ? a.x : b.plotX + e.plotLeft + r(k.distance, 16),
                        y: a.pos + e.plotTop,
                        anchorX: b.isHeader ? b.plotX + e.plotLeft : b.plotX + f.xAxis.pos,
                        anchorY: b.isHeader ? a.pos + e.plotTop - 15 : b.plotY + f.yAxis.pos
                    })
                })
            }, updatePosition: function (a) {
                var c = this.chart, f = this.getLabel(),
                    f = (this.options.positioner || this.getPosition).call(this, f.width, f.height, a);
                this.move(Math.round(f.x), Math.round(f.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            }, getDateFormat: function (a,
                                        d, f, b) {
                var e = x("%m-%d %H:%M:%S.%L", d), c, g, l = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3},
                    n = "millisecond";
                for (g in k) {
                    if (a === k.week && +x("%w", d) === f && "00:00:00.000" === e.substr(6)) {
                        g = "week";
                        break
                    }
                    if (k[g] > a) {
                        g = n;
                        break
                    }
                    if (l[g] && e.substr(l[g]) !== "01-01 00:00:00.000".substr(l[g])) break;
                    "week" !== g && (n = g)
                }
                g && (c = b[g]);
                return c
            }, getXDateFormat: function (a, d, f) {
                d = d.dateTimeLabelFormats;
                var b = f && f.closestPointRange;
                return (b ? this.getDateFormat(b, a.x, f.options.startOfWeek, d) : d.day) || d.year
            }, tooltipFooterHeaderFormatter: function (a,
                                                       d) {
                var f = d ? "footer" : "header";
                d = a.series;
                var b = d.tooltipOptions, e = b.xDateFormat, c = d.xAxis,
                    g = c && "datetime" === c.options.type && m(a.key), f = b[f + "Format"];
                g && !e && (e = this.getXDateFormat(a, b, c));
                g && e && (f = f.replace("{point.key}", "{point.key:" + e + "}"));
                return D(f, {point: a, series: d})
            }, bodyFormatter: function (a) {
                return g(a, function (a) {
                    var f = a.series.tooltipOptions;
                    return (f.pointFormatter || a.point.tooltipFormatter).call(a.point, f.pointFormat)
                })
            }
        }
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.attr, E = a.charts, D = a.css, m = a.defined,
            g = a.doc, d = a.each, r = a.extend, l = a.fireEvent, n = a.offset, k = a.pick, c = a.removeEvent,
            v = a.splat, f = a.Tooltip, b = a.win;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                f && b.tooltip.enabled && (a.tooltip = new f(a, b.tooltip), this.followTouchMove = k(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function (a) {
                var b = this.chart, e = b.options.chart, f =
                    e.zoomType || "", b = b.inverted;
                /touch/.test(a.type) && (f = k(e.pinchType, f));
                this.zoomX = a = /x/.test(f);
                this.zoomY = f = /y/.test(f);
                this.zoomHor = a && !b || f && b;
                this.zoomVert = f && !b || a && b;
                this.hasZoom = a || f
            }, normalize: function (a, f) {
                var e, c;
                a = a || b.event;
                a.target || (a.target = a.srcElement);
                c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                f || (this.chartPosition = f = n(this.chart.container));
                void 0 === c.pageX ? (e = Math.max(a.x, a.clientX - f.left), f = a.y) : (e = c.pageX - f.left, f = c.pageY - f.top);
                return r(a, {
                    chartX: Math.round(e),
                    chartY: Math.round(f)
                })
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                d(this.chart.axes, function (e) {
                    b[e.isXAxis ? "xAxis" : "yAxis"].push({axis: e, value: e.toValue(a[e.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, getKDPoints: function (a, b, f) {
                var e = [], c, g, p;
                d(a, function (a) {
                    c = a.noSharedTooltip && b;
                    g = !b && a.directTouch;
                    a.visible && !g && k(a.options.enableMouseTracking, !0) && (p = a.searchPoint(f, !c && 0 > a.options.findNearestPointBy.indexOf("y"))) && p.series && e.push(p)
                });
                e.sort(function (a, e) {
                    var f = a.distX - e.distX, c = a.dist -
                        e.dist,
                        d = (e.series.group && e.series.group.zIndex) - (a.series.group && a.series.group.zIndex);
                    return 0 !== f && b ? f : 0 !== c ? c : 0 !== d ? d : a.series.index > e.series.index ? -1 : 1
                });
                if (b && e[0] && !e[0].series.noSharedTooltip) for (a = e.length; a--;) (e[a].x !== e[0].x || e[a].series.noSharedTooltip) && e.splice(a, 1);
                return e
            }, getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            }, getChartCoordinatesFromPoint: function (a, b) {
                var e = a.series, f = e.xAxis, e = e.yAxis;
                if (f && e) return b ? {
                    chartX: f.len + f.pos -
                    a.clientX, chartY: e.len + e.pos - a.plotY
                } : {chartX: a.clientX + f.pos, chartY: a.plotY + e.pos}
            }, getHoverData: function (b, f, c, d, g, k) {
                var e = b, p = f, e = g ? c : [p];
                d = !(!d || !b);
                f = p && !p.stickyTracking;
                var u = function (a, b) {
                    return 0 === b
                }, z;
                d ? u = function (a) {
                    return a === b
                } : f ? u = function (a) {
                    return a.series === p
                } : e = a.grep(c, function (a) {
                    return a.stickyTracking
                });
                z = d && !g ? [b] : this.getKDPoints(e, g, k);
                p = (e = a.find(z, u)) && e.series;
                d || f || !g || (z = this.getKDPoints(c, g, k));
                z.sort(function (a, b) {
                    return a.series.index - b.series.index
                });
                return {
                    hoverPoint: e,
                    hoverSeries: p, hoverPoints: z
                }
            }, runPointActions: function (b, f) {
                var e = this.chart, c = e.tooltip, p = c ? c.shared : !1, l = f || e.hoverPoint,
                    n = l && l.series || e.hoverSeries;
                f = this.getHoverData(l, n, e.series, !!f || n && n.directTouch && this.isDirectTouch, p, b);
                var t, m, l = f.hoverPoint;
                t = (n = f.hoverSeries) && n.tooltipOptions.followPointer;
                m = (p = p && l && !l.series.noSharedTooltip) ? f.hoverPoints : l ? [l] : [];
                if (l && (l !== e.hoverPoint || c && c.isHidden)) {
                    d(e.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, m) && b.setState()
                    });
                    d(m || [], function (a) {
                        a.setState("hover")
                    });
                    if (e.hoverSeries !== n) n.onMouseOver();
                    e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                    l.firePointEvent("mouseOver");
                    e.hoverPoints = m;
                    e.hoverPoint = l;
                    c && c.refresh(p ? m : l, b)
                } else t && c && !c.isHidden && (n = c.getAnchor([{}], b), c.updatePosition({
                    plotX: n[0],
                    plotY: n[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = x(g, "mousemove", function (b) {
                    var e = E[a.hoverChartIndex];
                    if (e) e.pointer.onDocumentMouseMove(b)
                }));
                d(e.axes, function (e) {
                    k(e.crosshair.snap, !0) ? a.find(m, function (a) {
                        return a.series[e.coll] === e
                    }) ? e.drawCrosshair(b,
                        l) : e.hideCrosshair() : e.drawCrosshair(b)
                })
            }, reset: function (a, b) {
                var e = this.chart, f = e.hoverSeries, c = e.hoverPoint, g = e.hoverPoints, p = e.tooltip,
                    k = p && p.shared ? g : c;
                a && k && d(v(k), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) p && k && (p.refresh(k), c && (c.setState(c.state, !0), d(e.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, c)
                }))); else {
                    if (c) c.onMouseOut();
                    g && d(g, function (a) {
                        a.setState()
                    });
                    if (f) f.onMouseOut();
                    p && p.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    d(e.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = e.hoverPoints = e.hoverPoint = null
                }
            }, scaleGroups: function (a, b) {
                var e = this.chart, f;
                d(e.series, function (c) {
                    f = a || c.getPlotBox();
                    c.xAxis && c.xAxis.zoomEnabled && c.group && (c.group.attr(f), c.markerGroup && (c.markerGroup.attr(f), c.markerGroup.clip(b ? e.clipRect : null)), c.dataLabelsGroup && c.dataLabelsGroup.attr(f))
                });
                e.clipRect.attr(b || e.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, e = b.options.chart, f = a.chartX, c = a.chartY, d = this.zoomHor,
                    g = this.zoomVert, k = b.plotLeft, l = b.plotTop, z = b.plotWidth, A = b.plotHeight, w,
                    n = this.selectionMarker, h = this.mouseDownX, q = this.mouseDownY,
                    m = e.panKey && a[e.panKey + "Key"];
                n && n.touch || (f < k ? f = k : f > k + z && (f = k + z), c < l ? c = l : c > l + A && (c = l + A), this.hasDragged = Math.sqrt(Math.pow(h - f, 2) + Math.pow(q - c, 2)), 10 < this.hasDragged && (w = b.isInsidePlot(h - k, q - l), b.hasCartesianSeries && (this.zoomX || this.zoomY) &&
                w && !m && !n && (this.selectionMarker = n = b.renderer.rect(k, l, d ? 1 : z, g ? 1 : A, 0).attr({
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), n && d && (f -= h, n.attr({
                    width: Math.abs(f),
                    x: (0 < f ? 0 : f) + h
                })), n && g && (f = c - q, n.attr({
                    height: Math.abs(f),
                    y: (0 < f ? 0 : f) + q
                })), w && !n && e.panning && b.pan(a, e.panning)))
            }, drop: function (a) {
                var b = this, e = this.chart, f = this.hasPinched;
                if (this.selectionMarker) {
                    var c = {originalEvent: a, xAxis: [], yAxis: []}, g = this.selectionMarker,
                        k = g.attr ? g.attr("x") : g.x, n = g.attr ? g.attr("y") : g.y, v = g.attr ? g.attr("width") :
                        g.width, z = g.attr ? g.attr("height") : g.height, A;
                    if (this.hasDragged || f) d(e.axes, function (e) {
                        if (e.zoomEnabled && m(e.min) && (f || b[{xAxis: "zoomX", yAxis: "zoomY"}[e.coll]])) {
                            var d = e.horiz, h = "touchend" === a.type ? e.minPixelPadding : 0,
                                g = e.toValue((d ? k : n) + h), d = e.toValue((d ? k + v : n + z) - h);
                            c[e.coll].push({axis: e, min: Math.min(g, d), max: Math.max(g, d)});
                            A = !0
                        }
                    }), A && l(e, "selection", c, function (a) {
                        e.zoom(r(a, f ? {animation: !1} : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    f && this.scaleGroups()
                }
                e && (D(e.container, {cursor: e._cursor}),
                    e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            }, onDocumentMouseUp: function (b) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(b)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, e = this.chartPosition;
                a = this.normalize(a, e);
                !e || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY -
                    b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (b) {
                var e = E[a.hoverChartIndex];
                e && (b.relatedTarget || b.toElement) && (e.pointer.reset(), e.pointer.chartPosition = null)
            }, onContainerMouseMove: function (b) {
                var e = this.chart;
                m(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = e.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === e.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop) ||
                e.openMenu || this.runPointActions(b)
            }, inClass: function (a, b) {
                for (var e; a;) {
                    if (e = C(a, "class")) {
                        if (-1 !== e.indexOf(b)) return !0;
                        if (-1 !== e.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            }, onContainerClick: function (a) {
                var b =
                    this.chart, e = b.hoverPoint, f = b.plotLeft, c = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (l(e.series, "click", r(a, {point: e})), b.hoverPoint && e.firePointEvent("click", a)) : (r(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - f, a.chartY - c) && l(b, "click", a)))
            }, setDOMEvents: function () {
                var b = this, f = b.chart.container;
                f.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                f.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                f.onclick = function (a) {
                    b.onContainerClick(a)
                };
                x(f, "mouseleave", b.onContainerMouseLeave);
                1 === a.chartCount && x(g, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (f.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, f.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, 1 === a.chartCount && x(g, "touchend", b.onDocumentTouchEnd))
            }, destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                c(b.chart.container, "mouseleave", b.onContainerMouseLeave);
                a.chartCount || (c(g, "mouseup", b.onDocumentMouseUp), c(g, "touchend", b.onDocumentTouchEnd));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, e) {
                    b[e] = null
                })
            }
        }
    })(I);
    (function (a) {
        var x = a.charts, C = a.each, E = a.extend, D = a.map, m = a.noop, g = a.pick;
        E(a.Pointer.prototype, {
            pinchTranslate: function (a, g, l, n, k, c) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, g, l, n, k, c);
                this.zoomVert && this.pinchTranslateDirection(!1, a, g, l, n, k, c)
            }, pinchTranslateDirection: function (a, g, l, n, k, c, m, f) {
                var b = this.chart, e = a ? "x" : "y", d = a ? "X" : "Y", u = "chart" + d, v = a ? "width" : "height",
                    r = b["plot" + (a ? "Left" : "Top")], B, H, t = f || 1, G = b.inverted, z = b.bounds[a ? "h" : "v"],
                    A = 1 === g.length, w = g[0][u], J = l[0][u], h = !A && g[1][u], q = !A && l[1][u], Q;
                l = function () {
                    !A && 20 < Math.abs(w - h) && (t = f || Math.abs(J - q) / Math.abs(w - h));
                    H = (r - J) / t + w;
                    B = b["plot" + (a ? "Width" : "Height")] / t
                };
                l();
                g = H;
                g < z.min ? (g = z.min, Q = !0) : g + B > z.max && (g = z.max - B, Q = !0);
                Q ? (J -= .8 * (J - m[e][0]), A || (q -= .8 * (q - m[e][1])), l()) : m[e] = [J, q];
                G || (c[e] = H - r, c[v] = B);
                c = G ? 1 / t : t;
                k[v] = B;
                k[e] = g;
                n[G ? a ? "scaleY" : "scaleX" : "scale" + d] = t;
                n["translate" + d] = c * r + (J - c * w)
            }, pinch: function (a) {
                var d = this, l = d.chart, n = d.pinchDown, k = a.touches, c = k.length, v = d.lastValidTouch,
                    f = d.hasZoom, b = d.selectionMarker, e = {},
                    p = 1 === c && (d.inClass(a.target, "highcharts-tracker") && l.runTrackerClick || d.runChartClick),
                    u = {};
                1 < c && (d.initiated = !0);
                f && d.initiated && !p && a.preventDefault();
                D(k, function (a) {
                    return d.normalize(a)
                });
                "touchstart" === a.type ? (C(k, function (a, b) {
                    n[b] = {chartX: a.chartX, chartY: a.chartY}
                }), v.x = [n[0].chartX, n[1] && n[1].chartX], v.y = [n[0].chartY, n[1] && n[1].chartY], C(l.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = l.bounds[a.horiz ? "h" : "v"], e = a.minPixelPadding, f = a.toPixels(g(a.options.min,
                            a.dataMin)), c = a.toPixels(g(a.options.max, a.dataMax)), d = Math.max(f, c);
                        b.min = Math.min(a.pos, Math.min(f, c) - e);
                        b.max = Math.max(a.pos + a.len, d + e)
                    }
                }), d.res = !0) : d.followTouchMove && 1 === c ? this.runPointActions(d.normalize(a)) : n.length && (b || (d.selectionMarker = b = E({
                    destroy: m,
                    touch: !0
                }, l.plotBox)), d.pinchTranslate(n, k, e, b, u, v), d.hasPinched = f, d.scaleGroups(e, u), d.res && (d.res = !1, this.reset(!1, 0)))
            }, touch: function (d, m) {
                var l = this.chart, n, k;
                if (l.index !== a.hoverChartIndex) this.onContainerMouseLeave({relatedTarget: !0});
                a.hoverChartIndex = l.index;
                1 === d.touches.length ? (d = this.normalize(d), (k = l.isInsidePlot(d.chartX - l.plotLeft, d.chartY - l.plotTop)) && !l.openMenu ? (m && this.runPointActions(d), "touchmove" === d.type && (m = this.pinchDown, n = m[0] ? 4 <= Math.sqrt(Math.pow(m[0].chartX - d.chartX, 2) + Math.pow(m[0].chartY - d.chartY, 2)) : !1), g(n, !0) && this.pinch(d)) : m && this.reset()) : 2 === d.touches.length && this.pinch(d)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (d) {
                x[a.hoverChartIndex] &&
                x[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.charts, E = a.css, D = a.doc, m = a.extend, g = a.noop, d = a.Pointer,
            r = a.removeEvent, l = a.win, n = a.wrap;
        if (!a.hasTouch && (l.PointerEvent || l.MSPointerEvent)) {
            var k = {}, c = !!l.PointerEvent, v = function () {
                var b = [];
                b.item = function (a) {
                    return this[a]
                };
                a.objectEach(k, function (a) {
                    b.push({pageX: a.pageX, pageY: a.pageY, target: a.target})
                });
                return b
            }, f = function (b, f, c, d) {
                "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !C[a.hoverChartIndex] ||
                (d(b), d = C[a.hoverChartIndex].pointer, d[f]({
                    type: c,
                    target: b.currentTarget,
                    preventDefault: g,
                    touches: v()
                }))
            };
            m(d.prototype, {
                onContainerPointerDown: function (a) {
                    f(a, "onContainerTouchStart", "touchstart", function (a) {
                        k[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    f(a, "onContainerTouchMove", "touchmove", function (a) {
                        k[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                        k[a.pointerId].target || (k[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) {
                    f(a,
                        "onDocumentTouchEnd", "touchend", function (a) {
                            delete k[a.pointerId]
                        })
                }, batchMSEvents: function (a) {
                    a(this.chart.container, c ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, c ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(D, c ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            n(d.prototype, "init", function (a, f, c) {
                a.call(this, f, c);
                this.hasZoom && E(f.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            n(d.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(x)
            });
            n(d.prototype, "destroy", function (a) {
                this.batchMSEvents(r);
                a.call(this)
            })
        }
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.css, E = a.discardElement, D = a.defined, m = a.each, g = a.isFirefox,
            d = a.marginNames, r = a.merge, l = a.pick, n = a.setAnimation, k = a.stableSort, c = a.win, v = a.wrap;
        a.Legend = function (a, b) {
            this.init(a, b)
        };
        a.Legend.prototype = {
            init: function (a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), x(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function (a) {
                var b = l(a.padding, 8);
                this.options = a;
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = l(a.symbolWidth, 16);
                this.pages = []
            }, update: function (a, b) {
                var f = this.chart;
                this.setOptions(r(!0, this.options, a));
                this.destroy();
                f.isDirtyLegend = f.isDirtyBox = !0;
                l(b, !0) && f.redraw()
            }, colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden")
            }, positionItem: function (a) {
                var b = this.options,
                    f = b.symbolPadding, b = !b.rtl, c = a._legendItemPos, d = c[0], c = c[1], g = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? d : this.legendWidth - d - 2 * f - 4, c);
                g && (g.x = d, g.y = c)
            }, destroyItem: function (a) {
                var b = a.checkbox;
                m(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && E(a.checkbox)
            }, destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                m(this.getAllItems(), function (b) {
                    m(["legendItem", "legendGroup"], a, b)
                });
                m("clipRect up down pager nav box title group".split(" "),
                    a, this);
                this.display = null
            }, positionCheckboxes: function (a) {
                var b = this.group && this.group.alignAttr, f, c = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                b && (f = b.translateY, m(this.allItems, function (e) {
                    var g = e.checkbox, k;
                    g && (k = f + d + g.y + (a || 0) + 3, C(g, {
                        left: b.translateX + e.checkboxOffset + g.x - 20 + "px",
                        top: k + "px",
                        display: k > f - 6 && k < f + c - 6 ? "" : "none"
                    }))
                }))
            }, renderTitle: function () {
                var a = this.options, b = this.padding, e = a.title, c = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, b - 3, b - 4, null, null,
                    null, a.useHTML, null, "legend-title").attr({zIndex: 1}).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: c}));
                this.titleHeight = c
            }, setText: function (f) {
                var b = this.options;
                f.legendItem.attr({text: b.labelFormat ? a.format(b.labelFormat, f) : b.labelFormatter.call(f)})
            }, renderItem: function (a) {
                var b = this.chart, e = b.renderer, f = this.options, c = "horizontal" === f.layout,
                    d = this.symbolWidth, g = f.symbolPadding, k = this.padding, n = c ? l(f.itemDistance, 20) : 0,
                    t = !f.rtl,
                    m = f.width, z = f.itemMarginBottom || 0, A = this.itemMarginTop, w = a.legendItem, v = !a.series,
                    h = !v && a.series.drawLegendSymbol ? a.series : a, q = h.options,
                    r = this.createCheckboxForItem && q && q.showCheckbox, q = d + g + n + (r ? 20 : 0), K = f.useHTML,
                    N = a.options.className;
                w || (a.legendGroup = e.g("legend-item").addClass("highcharts-" + h.type + "-series highcharts-color-" + a.colorIndex + (N ? " " + N : "") + (v ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = w = e.text("", t ? d + g : -g, this.baseline || 0, K).attr({
                    align: t ?
                        "left" : "right", zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(12, w), this.baseline = this.fontMetrics.f + 3 + A, w.attr("y", this.baseline)), this.symbolHeight = f.symbolHeight || this.fontMetrics.f, h.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, w, K), r && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                w.css({width: (f.itemWidth || b.spacingBox.width) - q});
                this.setText(a);
                e = w.getBBox();
                d = a.checkboxOffset = f.itemWidth || a.legendItemWidth || e.width + q;
                this.itemHeight =
                    e = Math.round(a.legendItemHeight || e.height || this.symbolHeight);
                c && this.itemX - k + d > (m || b.spacingBox.width - 2 * k - f.x) && (this.itemX = k, this.itemY += A + this.lastLineHeight + z, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, d);
                this.lastItemY = A + this.itemY + z;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                c ? this.itemX += d : (this.itemY += A + e + z, this.lastLineHeight = e);
                this.offsetWidth = m || Math.max((c ? this.itemX - k - n : d) + k, this.offsetWidth)
            }, getAllItems: function () {
                var a =
                    [];
                m(this.chart.series, function (b) {
                    var f = b && b.options;
                    b && l(f.showInLegend, D(f.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === f.legendType ? b.data : b)))
                });
                return a
            }, adjustMargins: function (a, b) {
                var f = this.chart, c = this.options,
                    g = c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0);
                c.floating || m([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e, k) {
                    e.test(g) && !D(a[k]) && (f[d[k]] = Math.max(f[d[k]], f.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] *
                        c[k % 2 ? "x" : "y"] + l(c.margin, 12) + b[k]))
                })
            }, render: function () {
                var a = this, b = a.chart, e = b.renderer, c = a.group, d, g, l, n, v = a.box, t = a.options,
                    G = a.padding;
                a.itemX = G;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                c || (a.group = c = e.g("legend").attr({zIndex: 7}).add(), a.contentGroup = e.g().attr({zIndex: 1}).add(c), a.scrollGroup = e.g().add(a.contentGroup));
                a.renderTitle();
                d = a.getAllItems();
                k(d, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                t.reversed && d.reverse();
                a.allItems = d;
                a.display = g = !!d.length;
                a.lastLineHeight = 0;
                m(d, function (b) {
                    a.renderItem(b)
                });
                l = (t.width || a.offsetWidth) + G;
                n = a.lastItemY + a.lastLineHeight + a.titleHeight;
                n = a.handleOverflow(n);
                n += G;
                v || (a.box = v = e.rect().addClass("highcharts-legend-box").attr({r: t.borderRadius}).add(c), v.isNew = !0);
                0 < l && 0 < n && (v[v.isNew ? "attr" : "animate"](v.crisp({
                    x: 0,
                    y: 0,
                    width: l,
                    height: n
                }, v.strokeWidth())), v.isNew = !1);
                v[g ? "show" : "hide"]();
                "none" === c.getStyle("display") && (l = n = 0);
                a.legendWidth = l;
                a.legendHeight = n;
                m(d, function (b) {
                    a.positionItem(b)
                });
                g && c.align(r(t, {width: l, height: n}), !0, "spacingBox");
                b.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var b = this, e = this.chart, c = e.renderer, f = this.options, d = f.y, g = this.padding,
                    e = e.spacingBox.height + ("top" === f.verticalAlign ? -d : d) - g, d = f.maxHeight, k,
                    n = this.clipRect, t = f.navigation, v = l(t.animation, !0), z = t.arrowSize || 12, A = this.nav,
                    w = this.pages, r, h = this.allItems, q = function (a) {
                        "number" === typeof a ? n.attr({height: a}) : n && (b.clipRect = n.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip =
                            a ? "rect(" + g + "px,9999px," + (g + a) + "px,0)" : "auto")
                    };
                "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (e /= 2);
                d && (e = Math.min(e, d));
                w.length = 0;
                a > e && !1 !== t.enabled ? (this.clipHeight = k = Math.max(e - 20 - this.titleHeight - g, 0), this.currentPage = l(this.currentPage, 1), this.fullHeight = a, m(h, function (a, b) {
                    var e = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var c = w.length;
                    if (!c || e - w[c - 1] > k && (r || e) !== w[c - 1]) w.push(r || e), c++;
                    b === h.length - 1 && e + a - w[c - 1] > k && w.push(e);
                    e !== r && (r = e)
                }), n || (n = b.clipRect =
                    c.clipRect(0, g, 9999, 0), b.contentGroup.clip(n)), q(k), A || (this.nav = A = c.g().attr({zIndex: 1}).add(this.group), this.up = c.symbol("triangle", 0, 0, z, z).on("click", function () {
                    b.scroll(-1, v)
                }).add(A), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation").add(A), this.down = c.symbol("triangle-down", 0, 0, z, z).on("click", function () {
                    b.scroll(1, v)
                }).add(A)), b.scroll(0), a = e) : A && (q(), this.nav = A.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, b) {
                var e = this.pages,
                    c = e.length;
                a = this.currentPage + a;
                var f = this.clipHeight, d = this.pager, g = this.padding;
                a > c && (a = c);
                0 < a && (void 0 !== b && n(b, this.chart), this.nav.attr({
                    translateX: g,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), d.attr({text: a + "/" + c}), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), b = -e[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: b}),
                    this.currentPage = a, this.positionCheckboxes(b))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, b) {
                var e = a.symbolHeight, c = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, c ? e : a.symbolWidth, e, l(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(b.legendGroup)
            }, drawLineMarker: function (a) {
                var b = this.options.marker, e, c = a.symbolWidth, f = a.symbolHeight;
                e = f / 2;
                var d = this.chart.renderer, g = this.legendGroup;
                a = a.baseline - Math.round(.3 *
                    a.fontMetrics.b);
                this.legendLine = d.path(["M", 0, a, "L", c, a]).addClass("highcharts-graph").attr({}).add(g);
                b && !1 !== b.enabled && (e = Math.min(l(b.radius, e), e), 0 === this.symbol.indexOf("url") && (b = r(b, {
                    width: f,
                    height: f
                }), e = 0), this.legendSymbol = b = d.symbol(this.symbol, c / 2 - e, a - e, 2 * e, 2 * e, b).addClass("highcharts-point").add(g), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(c.navigator.userAgent) || g) && v(a.Legend.prototype, "positionItem", function (a, b) {
            var e = this, c = function () {
                b._legendItemPos && a.call(e, b)
            };
            c();
            setTimeout(c)
        })
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.animObject, E = a.attr, D = a.doc, m = a.Axis, g = a.createElement,
            d = a.defaultOptions, r = a.discardElement, l = a.charts, n = a.defined, k = a.each, c = a.extend,
            v = a.find, f = a.fireEvent, b = a.getStyle, e = a.grep, p = a.isNumber, u = a.isObject, F = a.isString,
            L = a.Legend, B = a.marginNames, H = a.merge, t = a.objectEach, G = a.Pointer, z = a.pick, A = a.pInt,
            w = a.removeEvent, J = a.seriesTypes, h = a.splat, q = a.svg, Q = a.syncTimeout, K = a.win, N = a.Renderer,
            M = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b,
                            e) {
            return new M(a, b, e)
        };
        c(M.prototype, {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (F(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, e) {
                var c, f, h = b.series, g = b.plotOptions || {};
                b.series = null;
                c = H(d, b);
                for (f in c.plotOptions) c.plotOptions[f].tooltip = g[f] && H(g[f].tooltip) || void 0;
                c.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                c.series = b.series = h;
                this.userOptions = b;
                b = c.chart;
                f = b.events;
                this.margin = [];
                this.spacing =
                    [];
                this.bounds = {h: {}, v: {}};
                this.callback = e;
                this.isResizing = 0;
                this.options = c;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var k = this;
                k.index = l.length;
                l.push(k);
                a.chartCount++;
                f && t(f, function (a, b) {
                    x(k, b, a)
                });
                k.xAxis = [];
                k.yAxis = [];
                k.pointCount = k.colorCounter = k.symbolCounter = 0;
                k.firstRender()
            }, initSeries: function (b) {
                var c = this.options.chart;
                (c = J[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            }, orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a <
                b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1))
            }, isInsidePlot: function (a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                var e = this.axes, h = this.series, d = this.pointer, g = this.legend, q = this.isDirtyLegend, w, z,
                    p = this.hasCartesianSeries, A = this.isDirtyBox, l, n = this.renderer, m = n.isHidden(), t = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                m && this.temporaryDisplay();
                this.layOutTitles();
                for (b = h.length; b--;) if (l =
                        h[b], l.options.stacking && (w = !0, l.isDirty)) {
                    z = !0;
                    break
                }
                if (z) for (b = h.length; b--;) l = h[b], l.options.stacking && (l.isDirty = !0);
                k(h, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), q = !0);
                    a.isDirtyData && f(a, "updatedData")
                });
                q && g.options.enabled && (g.render(), this.isDirtyLegend = !1);
                w && this.getStacks();
                p && k(e, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                p && (k(e, function (a) {
                    a.isDirty && (A = !0)
                }), k(e, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey =
                        b, t.push(function () {
                        f(a, "afterSetExtremes", c(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (A || w) && a.redraw()
                }));
                A && this.drawChartBox();
                f(this, "predraw");
                k(h, function (a) {
                    (A || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                d && d.reset(!0);
                n.draw();
                f(this, "redraw");
                f(this, "render");
                m && this.temporaryDisplay(!0);
                k(t, function (a) {
                    a.call()
                })
            }, get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }

                var c, e = this.series, f;
                c = v(this.axes, b) || v(this.series, b);
                for (f = 0; !c && f < e.length; f++) c =
                    v(e[f].points || [], b);
                return c
            }, getAxes: function () {
                var a = this, b = this.options, c = b.xAxis = h(b.xAxis || {}), b = b.yAxis = h(b.yAxis || {});
                k(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                k(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                k(c, function (b) {
                    new m(a, b)
                })
            }, getSelectedPoints: function () {
                var a = [];
                k(this.series, function (b) {
                    a = a.concat(e(b.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return e(this.series, function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, c) {
                var e = this, f = e.options,
                    h;
                h = f.title = H(f.title, a);
                f = f.subtitle = H(f.subtitle, b);
                k([["title", a, h], ["subtitle", b, f]], function (a, b) {
                    var c = a[0], f = e[c], h = a[1];
                    a = a[2];
                    f && h && (e[c] = f = f.destroy());
                    a && a.text && !f && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), e[c].update = function (a) {
                        e.setTitle(!b && a, b && a)
                    })
                });
                e.layOutTitles(c)
            }, layOutTitles: function (a) {
                var b = 0, e, f = this.renderer, h = this.spacingBox;
                k(["title", "subtitle"], function (a) {
                    var e = this[a], d = this.options[a];
                    a = "title" ===
                    a ? -3 : d.verticalAlign ? 0 : b + 2;
                    var g;
                    e && (g = f.fontMetrics(g, e).b, e.css({width: (d.width || h.width + d.widthAdjust) + "px"}).align(c({y: a + g}, d), !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + e.getBBox(d.useHTML).height)))
                }, this);
                e = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && e && (this.isDirtyBox = e, this.hasRendered && z(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var c = this.options.chart, e = c.width, c = c.height, f = this.renderTo;
                n(e) || (this.containerWidth = b(f, "width"));
                n(c) ||
                (this.containerHeight = b(f, "height"));
                this.chartWidth = Math.max(0, e || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(c, this.chartWidth) || this.containerHeight || 400)
            }, temporaryDisplay: function (c) {
                var e = this.renderTo;
                if (c) for (; e && e.style;) e.hcOrigStyle && (a.css(e, e.hcOrigStyle), delete e.hcOrigStyle), e = e.parentNode; else for (; e && e.style;) "none" === b(e, "display", !1) && (e.hcOrigStyle = {
                    display: e.style.display,
                    height: e.style.height,
                    overflow: e.style.overflow
                }, c = {display: "block", overflow: "hidden"},
                e !== this.renderTo && (c.height = 0), a.css(e, c), e.style.setProperty && e.style.setProperty("display", "block", "important")), e = e.parentNode
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, e = this.options, c = e.chart, f, h;
                b = this.renderTo;
                var d = a.uniqueKey(), k;
                b || (this.renderTo = b = c.renderTo);
                F(b) && (this.renderTo = b = D.getElementById(b));
                b || a.error(13, !0);
                f = A(E(b, "data-highcharts-chart"));
                p(f) && l[f] && l[f].hasRendered && l[f].destroy();
                E(b, "data-highcharts-chart",
                    this.index);
                b.innerHTML = "";
                c.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                f = this.chartWidth;
                h = this.chartHeight;
                this.container = b = g("div", {id: d}, void 0, b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[c.renderer] || N)(b, f, h, null, c.forExport, e.exporting && e.exporting.allowHTML);
                this.setClassName(c.className);
                for (k in e.defs) this.renderer.definition(e.defs[k]);
                this.renderer.chartIndex = this.index
            }, getMargins: function (a) {
                var b = this.spacing, e = this.margin, c = this.titleOffset;
                this.resetMargins();
                c && !n(e[0]) && (this.plotTop = Math.max(this.plotTop, c + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(e, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], e = a.margin;
                a.hasCartesianSeries && k(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                k(B, function (c, f) {
                    n(e[f]) || (a[c] += b[f])
                });
                a.setChartSize()
            }, reflow: function (a) {
                var e = this, c = e.options.chart, f = e.renderTo, h = n(c.width), d = c.width || b(f, "width"),
                    c = c.height || b(f, "height"), f = a ? a.target : K;
                if (!h && !e.isPrinting && d && c && (f === K || f === D)) {
                    if (d !== e.containerWidth || c !== e.containerHeight) clearTimeout(e.reflowTimeout), e.reflowTimeout = Q(function () {
                        e.container && e.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    e.containerWidth = d;
                    e.containerHeight = c
                }
            }, initReflow: function () {
                var a = this, b;
                b = x(K, "resize", function (b) {
                    a.reflow(b)
                });
                x(a, "destroy", b)
            }, setSize: function (b,
                                  e, c) {
                var h = this, d = h.renderer;
                h.isResizing += 1;
                a.setAnimation(c, h);
                h.oldChartHeight = h.chartHeight;
                h.oldChartWidth = h.chartWidth;
                void 0 !== b && (h.options.chart.width = b);
                void 0 !== e && (h.options.chart.height = e);
                h.getChartSize();
                h.setChartSize(!0);
                d.setSize(h.chartWidth, h.chartHeight, c);
                k(h.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                h.isDirtyLegend = !0;
                h.isDirtyBox = !0;
                h.layOutTitles();
                h.getMargins();
                h.redraw(c);
                h.oldChartHeight = null;
                f(h, "resize");
                Q(function () {
                        h && f(h, "endResize", null, function () {
                            --h.isResizing
                        })
                    },
                    C(void 0).duration)
            }, setChartSize: function (a) {
                function b(a) {
                    a = q[a] || 0;
                    return Math.max(l || a, a) / 2
                }

                var e = this.inverted, c = this.renderer, f = this.chartWidth, h = this.chartHeight,
                    d = this.options.chart, g = this.spacing, q = this.clipOffset, w, z, p, A, l;
                this.plotLeft = w = Math.round(this.plotLeft);
                this.plotTop = z = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(f - w - this.marginRight));
                this.plotHeight = A = Math.max(0, Math.round(h - z - this.marginBottom));
                this.plotSizeX = e ? A : p;
                this.plotSizeY = e ? p : A;
                this.plotBorderWidth =
                    d.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {x: g[3], y: g[0], width: f - g[3] - g[1], height: h - g[0] - g[2]};
                this.plotBox = c.plotBox = {x: w, y: z, width: p, height: A};
                l = 2 * Math.floor(this.plotBorderWidth / 2);
                e = Math.ceil(b(3));
                c = Math.ceil(b(0));
                this.clipBox = {
                    x: e,
                    y: c,
                    width: Math.floor(this.plotSizeX - b(1) - e),
                    height: Math.max(0, Math.floor(this.plotSizeY - b(2) - c))
                };
                a || k(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                k(["margin", "spacing"], function (e) {
                    var c =
                        b[e], f = u(c) ? c : [c, c, c, c];
                    k(["Top", "Right", "Bottom", "Left"], function (c, h) {
                        a[e][h] = z(b[e + c], f[h])
                    })
                });
                k(B, function (b, e) {
                    a[b] = z(a.margin[e], a.spacing[e])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = []
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, e = this.chartWidth, c = this.chartHeight,
                    f = this.chartBackground, h = this.plotBackground, d = this.plotBorder, g, k, q = this.plotLeft,
                    w = this.plotTop, z = this.plotWidth, p = this.plotHeight, A = this.plotBox, l = this.clipRect,
                    n = this.clipBox, m = "animate";
                f || (this.chartBackground =
                    f = b.rect().addClass("highcharts-background").add(), m = "attr");
                g = k = f.strokeWidth();
                f[m]({x: k / 2, y: k / 2, width: e - k - g % 2, height: c - k - g % 2, r: a.borderRadius});
                m = "animate";
                h || (m = "attr", this.plotBackground = h = b.rect().addClass("highcharts-plot-background").add());
                h[m](A);
                l ? l.animate({width: n.width, height: n.height}) : this.clipRect = b.clipRect(n);
                m = "animate";
                d || (m = "attr", this.plotBorder = d = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                d[m](d.crisp({x: q, y: w, width: z, height: p}, -d.strokeWidth()));
                this.isDirtyBox =
                    !1
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, e, c = a.options.series, f, h;
                k(["inverted", "angular", "polar"], function (d) {
                    e = J[b.type || b.defaultSeriesType];
                    h = b[d] || e && e.prototype[d];
                    for (f = c && c.length; !h && f--;) (e = J[c[f].type]) && e.prototype[d] && (h = !0);
                    a[d] = h
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                k(b, function (a) {
                    a.linkedSeries.length = 0
                });
                k(b, function (b) {
                    var e = b.options.linkedTo;
                    F(e) && (e = ":previous" === e ? a.series[b.index - 1] : a.get(e)) && e.linkedParent !== b && (e.linkedSeries.push(b), b.linkedParent =
                        e, b.visible = z(b.options.visible, e.options.visible, b.visible))
                })
            }, renderSeries: function () {
                k(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            }, renderLabels: function () {
                var a = this, b = a.options.labels;
                b.items && k(b.items, function (e) {
                    var f = c(b.style, e.style), h = A(f.left) + a.plotLeft, d = A(f.top) + a.plotTop + 12;
                    delete f.left;
                    delete f.top;
                    a.renderer.text(e.html, h, d).attr({zIndex: 2}).css(f).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, e = this.options, c, f, h;
                this.setTitle();
                this.legend = new L(this, e.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                e = this.plotWidth;
                c = this.plotHeight -= 21;
                k(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < e / this.plotWidth;
                h = 1.05 < c / this.plotHeight;
                if (f || h) k(a, function (a) {
                    (a.horiz && f || !a.horiz && h) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && k(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b = this;
                a = H(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (K.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            }, destroy: function () {
                var b = this,
                    e = b.axes, c = b.series, h = b.container, d, g = h && h.parentNode;
                f(b, "destroy");
                b.renderer.forExport ? a.erase(l, b) : l[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                w(b);
                for (d = e.length; d--;) e[d] = e[d].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (d = c.length; d--;) c[d] = c[d].destroy();
                k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
                    function (a) {
                        var e = b[a];
                        e && e.destroy && (b[a] = e.destroy())
                    });
                h && (h.innerHTML = "", w(h), g && r(h));
                t(b, function (a, e) {
                    delete b[e]
                })
            }, isReadyToRender: function () {
                var a = this;
                return q || K != K.top || "complete" === D.readyState ? !0 : (D.attachEvent("onreadystatechange", function () {
                    D.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === D.readyState && a.firstRender()
                }), !1)
            }, firstRender: function () {
                var a = this, b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    f(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    k(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    f(a, "beforeRender");
                    G && (a.pointer = new G(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            }, onload: function () {
                k([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                f(this, "load");
                f(this, "render");
                n(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(I);
    (function (a) {
        var x, C = a.each, E = a.extend, D = a.erase, m = a.fireEvent,
            g = a.format, d = a.isArray, r = a.isNumber, l = a.pick, n = a.removeEvent;
        a.Point = x = function () {
        };
        a.Point.prototype = {
            init: function (a, c, d) {
                var f = a.chart.options.chart.colorCount;
                this.series = a;
                this.applyOptions(c, d);
                a.options.colorByPoint ? (c = a.colorCounter, a.colorCounter++, a.colorCounter === f && (a.colorCounter = 0)) : c = a.colorIndex;
                this.colorIndex = l(this.colorIndex, c);
                a.chart.pointCount++;
                return this
            }, applyOptions: function (a, c) {
                var d = this.series, f = d.options.pointValKey || d.pointValKey;
                a = x.prototype.optionsToObject.call(this,
                    a);
                E(this, a);
                this.options = this.options ? E(this.options, a) : a;
                a.group && delete this.group;
                f && (this.y = this[f]);
                this.isNull = l(this.isValid && !this.isValid(), null === this.x || !r(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d && (this.x = void 0 === c ? d.autoIncrement(this) : c);
                return this
            }, optionsToObject: function (a) {
                var c = {}, g = this.series, f = g.options.keys, b = f || g.pointArrayMap || ["y"], e = b.length, k = 0,
                    l = 0;
                if (r(a) ||
                    null === a) c[b[0]] = a; else if (d(a)) for (!f && a.length > e && (g = typeof a[0], "string" === g ? c.name = a[0] : "number" === g && (c.x = a[0]), k++); l < e;) f && void 0 === a[k] || (c[b[l]] = a[k]), k++, l++; else "object" === typeof a && (c = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
                return c
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" +
                    this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            }, getZone: function () {
                var a = this.series, c = a.zones, a = a.zoneAxis || "y", d = 0, f;
                for (f = c[d]; this[a] >= f.value;) f = c[++d];
                f && f.color && !this.options.color && (this.color = f.color);
                return f
            }, destroy: function () {
                var a = this.series.chart, c = a.hoverPoints, d;
                a.pointCount--;
                c && (this.setState(), D(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) n(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (d in this) this[d] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], c, d = 6; d--;) c = a[d], this[c] && (this[c] = this[c].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total ||
                    this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var c = this.series, d = c.tooltipOptions, f = l(d.valueDecimals, ""), b = d.valuePrefix || "",
                    e = d.valueSuffix || "";
                C(c.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (b || e) a = a.replace(c + "}", b + c + "}" + e);
                    a = a.replace(c + "}", c + ":,." + f + "f}")
                });
                return g(a, {point: this, series: this.series})
            }, firePointEvent: function (a, c, d) {
                var f = this, b = this.series.options;
                (b.point.events[a] || f.options && f.options.events && f.options.events[a]) && this.importEvents();
                "click" === a && b.allowPointSelect &&
                (d = function (a) {
                    f.select && f.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                m(this, a, c, d)
            }, visible: !0
        }
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.animObject, E = a.arrayMax, D = a.arrayMin, m = a.correctFloat, g = a.Date,
            d = a.defaultOptions, r = a.defined, l = a.each, n = a.erase, k = a.extend, c = a.fireEvent, v = a.grep,
            f = a.isArray, b = a.isNumber, e = a.isString, p = a.merge, u = a.objectEach, F = a.pick, L = a.removeEvent,
            B = a.splat, H = a.SVGElement, t = a.syncTimeout, G = a.win;
        a.Series = a.seriesType("line", null, {
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {duration: 1E3},
            events: {},
            marker: {radius: 4, states: {hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2}}},
            point: {events: {}},
            dataLabels: {
                align: "center", formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                }, verticalAlign: "bottom", x: 0, y: 0, padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {animation: {duration: 50}, lineWidthPlus: 1, marker: {}, halo: {size: 10}},
                select: {marker: {}}
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var e = this, c, f = a.series, d;
                e.chart = a;
                e.options = b = e.setOptions(b);
                e.linkedSeries = [];
                e.bindAxes();
                k(e, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
                c = b.events;
                u(c, function (a, b) {
                    x(e, b, a)
                });
                if (c && c.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                e.getColor();
                e.getSymbol();
                l(e.parallelArrays, function (a) {
                    e[a +
                    "Data"] = []
                });
                e.setData(b.data, !1);
                e.isCartesian && (a.hasCartesianSeries = !0);
                f.length && (d = f[f.length - 1]);
                e._i = F(d && d._i, -1) + 1;
                a.orderSeries(this.insert(f))
            },
            insert: function (a) {
                var e = this.options.index, c;
                if (b(e)) {
                    for (c = a.length; c--;) if (e >= F(a[c].options.index, a[c]._i)) {
                        a.splice(c + 1, 0, this);
                        break
                    }
                    -1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return F(c, a.length - 1)
            },
            bindAxes: function () {
                var b = this, e = b.options, c = b.chart, f;
                l(b.axisTypes || [], function (h) {
                    l(c[h], function (a) {
                        f = a.options;
                        if (e[h] === f.index || void 0 !==
                            e[h] && e[h] === f.id || void 0 === e[h] && 0 === f.index) b.insert(a.series), b[h] = a, a.isDirty = !0
                    });
                    b[h] || b.optionalAxis === h || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, e) {
                var c = a.series, f = arguments, h = b(e) ? function (b) {
                    var f = "y" === b && c.toYData ? c.toYData(a) : a[b];
                    c[b + "Data"][e] = f
                } : function (a) {
                    Array.prototype[e].apply(c[a + "Data"], Array.prototype.slice.call(f, 2))
                };
                l(c.parallelArrays, h)
            },
            autoIncrement: function () {
                var a = this.options, b = this.xIncrement, e, c = a.pointIntervalUnit, b = F(b, a.pointStart, 0);
                this.pointInterval =
                    e = F(this.pointInterval, a.pointInterval, 1);
                c && (a = new g(b), "day" === c ? a = +a[g.hcSetDate](a[g.hcGetDate]() + e) : "month" === c ? a = +a[g.hcSetMonth](a[g.hcGetMonth]() + e) : "year" === c && (a = +a[g.hcSetFullYear](a[g.hcGetFullYear]() + e)), e = a - b);
                this.xIncrement = b + e;
                return b
            },
            setOptions: function (a) {
                var b = this.chart, e = b.options, c = e.plotOptions, f = (b.userOptions || {}).plotOptions || {},
                    g = c[this.type];
                this.userOptions = a;
                b = p(g, c.series, a);
                this.tooltipOptions = p(d.tooltip, d.plotOptions.series && d.plotOptions.series.tooltip, d.plotOptions[this.type].tooltip,
                    e.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, a.tooltip);
                this.stickyTracking = F(a.stickyTracking, f[this.type] && f[this.type].stickyTracking, f.series && f.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === g.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative"
                });
                a.length && r(a[a.length - 1].value) && a.push({});
                return b
            },
            getCyclic: function (a, b, e) {
                var c, f = this.chart, d = this.userOptions, g = a + "Index", k = a + "Counter",
                    w = e ? e.length : F(f.options.chart[a + "Count"], f[a + "Count"]);
                b || (c = F(d[g], d["_" + g]), r(c) || (f.series.length || (f[k] = 0), d["_" + g] = c = f[k] % w, f[k] += 1), e && (b = e[c]));
                void 0 !== c && (this[g] = c);
                this[a] = b
            },
            getColor: function () {
                this.getCyclic("color")
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (c, d, g, k) {
                var h = this, q = h.points, p = q && q.length || 0, n, w = h.options, A = h.chart, z = null,
                    m = h.xAxis, t = w.turboThreshold, u = this.xData, B = this.yData,
                    v = (n = h.pointArrayMap) && n.length;
                c = c || [];
                n = c.length;
                d = F(d, !0);
                if (!1 !== k && n && p === n && !h.cropped && !h.hasGroupedData && h.visible) l(c, function (a, b) {
                    q[b].update && a !== w.data[b] && q[b].update(a, !1, null, !1)
                }); else {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    l(this.parallelArrays, function (a) {
                        h[a + "Data"].length = 0
                    });
                    if (t && n > t) {
                        for (g = 0; null === z && g < n;) z = c[g], g++;
                        if (b(z)) for (g =
                                           0; g < n; g++) u[g] = this.autoIncrement(), B[g] = c[g]; else if (f(z)) if (v) for (g = 0; g < n; g++) z = c[g], u[g] = z[0], B[g] = z.slice(1, v + 1); else for (g = 0; g < n; g++) z = c[g], u[g] = z[0], B[g] = z[1]; else a.error(12)
                    } else for (g = 0; g < n; g++) void 0 !== c[g] && (z = {series: h}, h.pointClass.prototype.applyOptions.apply(z, [c[g]]), h.updateParallelArrays(z, g));
                    e(B[0]) && a.error(14, !0);
                    h.data = [];
                    h.options.data = h.userOptions.data = c;
                    for (g = p; g--;) q[g] && q[g].destroy && q[g].destroy();
                    m && (m.minRange = m.userMinRange);
                    h.isDirty = A.isDirtyBox = !0;
                    h.isDirtyData =
                        !!q;
                    g = !1
                }
                "point" === w.legendType && (this.processData(), this.generatePoints());
                d && A.redraw(g)
            },
            processData: function (b) {
                var e = this.xData, c = this.yData, f = e.length, d;
                d = 0;
                var g, k, p = this.xAxis, l, n = this.options;
                l = n.cropThreshold;
                var z = this.getExtremesFromAll || n.getExtremesFromAll, m = this.isCartesian, n = p && p.val2lin,
                    t = p && p.isLog, u, B;
                if (m && !this.isDirty && !p.isDirty && !this.yAxis.isDirty && !b) return !1;
                p && (b = p.getExtremes(), u = b.min, B = b.max);
                if (m && this.sorted && !z && (!l || f > l || this.forceCrop)) if (e[f - 1] < u || e[0] > B) e = [],
                    c = []; else if (e[0] < u || e[f - 1] > B) d = this.cropData(this.xData, this.yData, u, B), e = d.xData, c = d.yData, d = d.start, g = !0;
                for (l = e.length || 1; --l;) f = t ? n(e[l]) - n(e[l - 1]) : e[l] - e[l - 1], 0 < f && (void 0 === k || f < k) ? k = f : 0 > f && this.requireSorting && a.error(15);
                this.cropped = g;
                this.cropStart = d;
                this.processedXData = e;
                this.processedYData = c;
                this.closestPointRange = k
            },
            cropData: function (a, b, e, c) {
                var f = a.length, d = 0, g = f, k = F(this.cropShoulder, 1), p;
                for (p = 0; p < f; p++) if (a[p] >= e) {
                    d = Math.max(0, p - k);
                    break
                }
                for (e = p; e < f; e++) if (a[e] > c) {
                    g = e + k;
                    break
                }
                return {
                    xData: a.slice(d,
                        g), yData: b.slice(d, g), start: d, end: g
                }
            },
            generatePoints: function () {
                var a = this.options, b = a.data, e = this.data, c, f = this.processedXData, d = this.processedYData,
                    g = this.pointClass, k = f.length, p = this.cropStart || 0, l, n = this.hasGroupedData, a = a.keys,
                    m, t = [], u;
                e || n || (e = [], e.length = b.length, e = this.data = e);
                a && n && (this.options.keys = !1);
                for (u = 0; u < k; u++) l = p + u, n ? (m = (new g).init(this, [f[u]].concat(B(d[u]))), m.dataGroup = this.groupMap[u]) : (m = e[l]) || void 0 === b[l] || (e[l] = m = (new g).init(this, b[l], f[u])), m && (m.index = l, t[u] = m);
                this.options.keys =
                    a;
                if (e && (k !== (c = e.length) || n)) for (u = 0; u < c; u++) u !== p || n || (u += k), e[u] && (e[u].destroyElements(), e[u].plotX = void 0);
                this.data = e;
                this.points = t
            },
            getExtremes: function (a) {
                var e = this.yAxis, c = this.processedXData, d, h = [], g = 0;
                d = this.xAxis.getExtremes();
                var k = d.min, p = d.max, l, n, m, t;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (t = 0; t < d; t++) if (n = c[t], m = a[t], l = (b(m, !0) || f(m)) && (!e.positiveValuesOnly || m.length || 0 < m), n = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[t] || n) >=
                        k && (c[t] || n) <= p, l && n) if (l = m.length) for (; l--;) null !== m[l] && (h[g++] = m[l]); else h[g++] = m;
                this.dataMin = D(h);
                this.dataMax = E(h)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options, e = a.stacking, c = this.xAxis, f = c.categories, d = this.yAxis, g = this.points,
                    k = g.length, p = !!this.modifyValue, l = a.pointPlacement, n = "between" === l || b(l),
                    t = a.threshold, u = a.startFromThreshold ? t : 0, B, v, G, H, C = Number.MAX_VALUE;
                "between" === l && (l = .5);
                b(l) && (l *= F(a.pointRange || c.pointRange));
                for (a =
                         0; a < k; a++) {
                    var x = g[a], L = x.x, D = x.y;
                    v = x.low;
                    var E = e && d.stacks[(this.negStacks && D < (u ? 0 : t) ? "-" : "") + this.stackKey], I;
                    d.positiveValuesOnly && null !== D && 0 >= D && (x.isNull = !0);
                    x.plotX = B = m(Math.min(Math.max(-1E5, c.translate(L, 0, 0, 0, 1, l, "flags" === this.type)), 1E5));
                    e && this.visible && !x.isNull && E && E[L] && (H = this.getStackIndicator(H, L, this.index), I = E[L], D = I.points[H.key], v = D[0], D = D[1], v === u && H.key === E[L].base && (v = F(t, d.min)), d.positiveValuesOnly && 0 >= v && (v = null), x.total = x.stackTotal = I.total, x.percentage = I.total && x.y /
                        I.total * 100, x.stackY = D, I.setOffset(this.pointXOffset || 0, this.barW || 0));
                    x.yBottom = r(v) ? d.translate(v, 0, 1, 0, 1) : null;
                    p && (D = this.modifyValue(D, x));
                    x.plotY = v = "number" === typeof D && Infinity !== D ? Math.min(Math.max(-1E5, d.translate(D, 0, 1, 0, 1)), 1E5) : void 0;
                    x.isInside = void 0 !== v && 0 <= v && v <= d.len && 0 <= B && B <= c.len;
                    x.clientX = n ? m(c.translate(L, 0, 0, 0, 1, l)) : B;
                    x.negative = x.y < (t || 0);
                    x.category = f && void 0 !== f[x.x] ? f[x.x] : x.x;
                    x.isNull || (void 0 !== G && (C = Math.min(C, Math.abs(B - G))), G = B);
                    x.zone = this.zones.length && x.getZone()
                }
                this.closestPointRangePx =
                    C
            },
            getValidPoints: function (a, b) {
                var e = this.chart;
                return v(a || this.points || [], function (a) {
                    return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart, e = this.options, c = b.renderer, f = b.inverted, d = this.clipBox,
                    g = d || b.clipBox,
                    k = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, e.xAxis, e.yAxis].join(),
                    p = b[k], l = b[k + "m"];
                p || (a && (g.width = 0, b[k + "m"] = l = c.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[k] = p = c.clipRect(g),
                    p.count = {length: 0});
                a && !p.count[this.index] && (p.count[this.index] = !0, p.count.length += 1);
                !1 !== e.clip && (this.group.clip(a || d ? p : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = k);
                a || (p.count[this.index] && (delete p.count[this.index], --p.count.length), 0 === p.count.length && k && b[k] && (d || (b[k] = b[k].destroy()), b[k + "m"] && (b[k + "m"] = b[k + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart, e = C(this.options.animation), c;
                a ? this.setClip(e) : (c = this.sharedClipKey, (a = b[c]) && a.animate({width: b.plotSizeX}, e),
                b[c + "m"] && b[c + "m"].animate({width: b.plotSizeX + 99}, e), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                c(this, "afterAnimate")
            },
            drawPoints: function () {
                var a = this.points, e = this.chart, c, f, d, g, k = this.options.marker, p, l, n, m,
                    t = this[this.specialGroup] || this.markerGroup,
                    u = F(k.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * k.radius);
                if (!1 !== k.enabled || this._hasPointMarkers) for (f = 0; f < a.length; f++) d = a[f], c = d.plotY, g = d.graphic, p = d.marker || {}, l = !!d.marker, n = u && void 0 === p.enabled || p.enabled,
                    m = d.isInside, n && b(c) && null !== d.y ? (c = F(p.symbol, this.symbol), d.hasImage = 0 === c.indexOf("url"), n = this.markerAttribs(d, d.selected && "select"), g ? g[m ? "show" : "hide"](!0).animate(n) : m && (0 < n.width || d.hasImage) && (d.graphic = g = e.renderer.symbol(c, n.x, n.y, n.width, n.height, l ? p : k).add(t)), g && g.addClass(d.getClassName(), !0)) : g && (d.graphic = g.destroy())
            },
            markerAttribs: function (a, b) {
                var e = this.options.marker, c = a.marker || {}, f = F(c.radius, e.radius);
                b && (e = e.states[b], b = c.states && c.states[b], f = F(b && b.radius, e && e.radius, f +
                    (e && e.radiusPlus || 0)));
                a.hasImage && (f = 0);
                a = {x: Math.floor(a.plotX) - f, y: a.plotY - f};
                f && (a.width = a.height = 2 * f);
                return a
            },
            destroy: function () {
                var a = this, b = a.chart, e = /AppleWebKit\/533/.test(G.navigator.userAgent), f, d, g = a.data || [],
                    k, p;
                c(a, "destroy");
                L(a);
                l(a.axisTypes || [], function (b) {
                    (p = a[b]) && p.series && (n(p.series, a), p.isDirty = p.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (d = g.length; d--;) (k = g[d]) && k.destroy && k.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                u(a, function (a,
                               b) {
                    a instanceof H && !a.survive && (f = e && "group" === b ? "hide" : "destroy", a[f]())
                });
                b.hoverSeries === a && (b.hoverSeries = null);
                n(b.series, a);
                b.orderSeries();
                u(a, function (b, e) {
                    delete a[e]
                })
            },
            getGraphPath: function (a, b, e) {
                var c = this, f = c.options, d = f.step, g, k = [], p = [], n;
                a = a || c.points;
                (g = a.reversed) && a.reverse();
                (d = {right: 1, center: 2}[d] || d && 3) && g && (d = 4 - d);
                !f.connectNulls || b || e || (a = this.getValidPoints(a));
                l(a, function (g, h) {
                    var l = g.plotX, q = g.plotY, m = a[h - 1];
                    (g.leftCliff || m && m.rightCliff) && !e && (n = !0);
                    g.isNull && !r(b) &&
                    0 < h ? n = !f.connectNulls : g.isNull && !b ? n = !0 : (0 === h || n ? h = ["M", g.plotX, g.plotY] : c.getPointSpline ? h = c.getPointSpline(a, g, h) : d ? (h = 1 === d ? ["L", m.plotX, q] : 2 === d ? ["L", (m.plotX + l) / 2, m.plotY, "L", (m.plotX + l) / 2, q] : ["L", l, m.plotY], h.push("L", l, q)) : h = ["L", l, q], p.push(g.x), d && p.push(g.x), k.push.apply(k, h), n = !1)
                });
                k.xMap = p;
                return c.graphPath = k
            },
            drawGraph: function () {
                var a = this, b = (this.gappedPath || this.getGraphPath).call(this),
                    e = [["graph", "highcharts-graph"]];
                l(this.zones, function (a, b) {
                    e.push(["zone-graph-" + b, "highcharts-graph highcharts-zone-graph-" +
                    b + " " + (a.className || "")])
                });
                l(e, function (e, c) {
                    c = e[0];
                    var f = a[c];
                    f ? (f.endX = b.xMap, f.animate({d: b})) : b.length && (a[c] = a.chart.renderer.path(b).addClass(e[1]).attr({zIndex: 1}).add(a.group));
                    f && (f.startX = b.xMap, f.isArea = b.isArea)
                })
            },
            applyZones: function () {
                var a = this, b = this.chart, e = b.renderer, c = this.zones, f, d, g = this.clips || [], k,
                    p = this.graph, n = this.area, m = Math.max(b.chartWidth, b.chartHeight),
                    t = this[(this.zoneAxis || "y") + "Axis"], u, B, v = b.inverted, r, G, H, x, C = !1;
                c.length && (p || n) && t && void 0 !== t.min && (B = t.reversed,
                    r = t.horiz, p && p.hide(), n && n.hide(), u = t.getExtremes(), l(c, function (c, h) {
                    f = B ? r ? b.plotWidth : 0 : r ? 0 : t.toPixels(u.min);
                    f = Math.min(Math.max(F(d, f), 0), m);
                    d = Math.min(Math.max(Math.round(t.toPixels(F(c.value, u.max), !0)), 0), m);
                    C && (f = d = t.toPixels(u.max));
                    G = Math.abs(f - d);
                    H = Math.min(f, d);
                    x = Math.max(f, d);
                    t.isXAxis ? (k = {
                        x: v ? x : H,
                        y: 0,
                        width: G,
                        height: m
                    }, r || (k.x = b.plotHeight - k.x)) : (k = {
                        x: 0,
                        y: v ? x : H,
                        width: m,
                        height: G
                    }, r && (k.y = b.plotWidth - k.y));
                    g[h] ? g[h].animate(k) : (g[h] = e.clipRect(k), p && a["zone-graph-" + h].clip(g[h]), n && a["zone-area-" +
                    h].clip(g[h]));
                    C = c.value > u.max
                }), this.clips = g)
            },
            invertGroups: function (a) {
                function b() {
                    l(["group", "markerGroup"], function (b) {
                        e[b] && (c.renderer.isVML && e[b].attr({
                            width: e.yAxis.len,
                            height: e.xAxis.len
                        }), e[b].width = e.yAxis.len, e[b].height = e.xAxis.len, e[b].invert(a))
                    })
                }

                var e = this, c = e.chart, f;
                e.xAxis && (f = x(c, "resize", b), x(e, "destroy", f), b(a), e.invertGroups = b)
            },
            plotGroup: function (a, b, e, c, f) {
                var d = this[a], g = !d;
                g && (this[a] = d = this.chart.renderer.g().attr({zIndex: c || .1}).add(f));
                d.addClass("highcharts-" + b + " highcharts-series-" +
                    this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""), !0);
                d.attr({visibility: e})[g ? "attr" : "animate"](this.getPlotBox());
                return d
            },
            getPlotBox: function () {
                var a = this.chart, b = this.xAxis, e = this.yAxis;
                a.inverted && (b = e, e = this.xAxis);
                return {translateX: b ? b.left : a.plotLeft, translateY: e ? e.top : a.plotTop, scaleX: 1, scaleY: 1}
            },
            render: function () {
                var a = this, b = a.chart, e, c = a.options,
                    f = !!a.animate && b.renderer.isSVG && C(c.animation).duration, d = a.visible ? "inherit" :
                    "hidden", g = c.zIndex, k = a.hasRendered, p = b.seriesGroup, l = b.inverted;
                e = a.plotGroup("group", "series", d, g, p);
                a.markerGroup = a.plotGroup("markerGroup", "markers", d, g, p);
                f && a.animate(!0);
                e.inverted = a.isCartesian ? l : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(l);
                !1 === c.clip || a.sharedClipKey || k || e.clip(b.clipRect);
                f && a.animate();
                k || (a.animationTimeout = t(function () {
                        a.afterAnimate()
                    },
                    f));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart, b = this.isDirty || this.isDirtyData, e = this.group, c = this.xAxis,
                    f = this.yAxis;
                e && (a.inverted && e.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), e.animate({translateX: F(c && c.left, a.plotLeft), translateY: F(f && f.top, a.plotTop)}));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var e = this.xAxis, c = this.yAxis, f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? e.len - a.chartY +
                        e.pos : a.chartX - e.pos, plotY: f ? c.len - a.chartX + c.pos : a.chartY - c.pos
                }, b)
            },
            buildKDTree: function () {
                function a(e, c, f) {
                    var d, g;
                    if (g = e && e.length) return d = b.kdAxisArray[c % f], e.sort(function (a, b) {
                        return a[d] - b[d]
                    }), g = Math.floor(g / 2), {
                        point: e[g],
                        left: a(e.slice(0, g), c + 1, f),
                        right: a(e.slice(g + 1), c + 1, f)
                    }
                }

                this.buildingKdTree = !0;
                var b = this, e = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                t(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), e, e);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function e(a, b, h, k) {
                    var p = b.point, l = c.kdAxisArray[h % k], n, m, t = p;
                    m = r(a[f]) && r(p[f]) ? Math.pow(a[f] - p[f], 2) : null;
                    n = r(a[d]) && r(p[d]) ? Math.pow(a[d] - p[d], 2) : null;
                    n = (m || 0) + (n || 0);
                    p.dist = r(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    p.distX = r(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                    l = a[l] - p[l];
                    n = 0 > l ? "left" : "right";
                    m = 0 > l ? "right" : "left";
                    b[n] && (n = e(a, b[n], h + 1, k), t = n[g] < t[g] ? n : p);
                    b[m] && Math.sqrt(l * l) < t[g] && (a = e(a, b[m], h + 1, k), t = a[g] < t[g] ? a : t);
                    return t
                }

                var c = this, f = this.kdAxisArray[0], d = this.kdAxisArray[1],
                    g = b ? "distX" : "dist";
                b = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return e(a, this.kdTree, b, b)
            }
        })
    })(I);
    (function (a) {
        function x(a, c, d, f, b) {
            var e = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = c;
            this.x = f;
            this.total = null;
            this.points = {};
            this.stack = b;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: c.align || (e ? d ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (e ? "middle" : d ? "bottom" : "top"),
                y: n(c.y, e ? 4 : d ?
                    14 : -6),
                x: n(c.x, e ? d ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (e ? d ? "right" : "left" : "center")
        }

        var C = a.Axis, E = a.Chart, D = a.correctFloat, m = a.defined, g = a.destroyObjectProperties, d = a.each,
            r = a.format, l = a.objectEach, n = a.pick;
        a = a.Series;
        x.prototype = {
            destroy: function () {
                g(this, this.axis)
            }, render: function (a) {
                var c = this.options, d = c.format, d = d ? r(d, this) : c.formatter.call(this);
                this.label ? this.label.attr({
                    text: d,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(d, null, null, c.useHTML).css(c.style).attr({
                    align: this.textAlign,
                    rotation: c.rotation, visibility: "hidden"
                }).add(a)
            }, setOffset: function (a, c) {
                var d = this.axis, f = d.chart, b = f.inverted, e = d.reversed,
                    e = this.isNegative && !e || !this.isNegative && e,
                    g = d.translate(d.usePercentage ? 100 : this.total, 0, 0, 0, 1), d = d.translate(0),
                    d = Math.abs(g - d);
                a = f.xAxis[0].translate(this.x) + a;
                var k = f.plotHeight, b = {
                    x: b ? e ? g : g - d : a,
                    y: b ? k - a - c : e ? k - g - d : k - g,
                    width: b ? d : c,
                    height: b ? c : d
                };
                if (c = this.label) c.align(this.alignOptions, null, b), b = c.alignAttr, c[!1 === this.options.crop || f.isInsidePlot(b.x, b.y) ? "show" : "hide"](!0)
            }
        };
        E.prototype.getStacks = function () {
            var a = this;
            d(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            d(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + n(c.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function () {
            var a = this.series, c, d = n(this.options.reversedStacks, !0), f = a.length, b;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (b = f; b--;) a[d ? b : f - b - 1].setStackedPoints();
                for (b = f; b--;) c = a[d ? b : f - b - 1], c.setStackCliffs &&
                c.setStackCliffs();
                if (this.usePercentage) for (b = 0; b < f; b++) a[b].setPercentStacks()
            }
        };
        C.prototype.renderStackTotals = function () {
            var a = this.chart, c = a.renderer, d = this.stacks, f = this.stackTotalGroup;
            f || (this.stackTotalGroup = f = c.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
            f.translate(a.plotLeft, a.plotTop);
            l(d, function (a) {
                l(a, function (a) {
                    a.render(f)
                })
            })
        };
        C.prototype.resetStacks = function () {
            var a = this, c = a.stacks;
            a.isXAxis || l(c, function (c) {
                l(c, function (f, b) {
                    f.touched < a.stacksTouched ? (f.destroy(),
                        delete c[b]) : (f.total = null, f.cum = null)
                })
            })
        };
        C.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), l(a, function (a) {
                l(a, function (a) {
                    a.cum = a.total
                })
            }))
        };
        a.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData, c = this.processedYData, d = [], f = c.length, b = this.options,
                    e = b.threshold, g = b.startFromThreshold ? e : 0, l = b.stack, b = b.stacking, r = this.stackKey,
                    C = "-" +
                        r, B = this.negStacks, H = this.yAxis, t = H.stacks, G = H.oldStacks, z, A, w, J, h, q, E;
                H.stacksTouched += 1;
                for (h = 0; h < f; h++) q = a[h], E = c[h], z = this.getStackIndicator(z, q, this.index), J = z.key, w = (A = B && E < (g ? 0 : e)) ? C : r, t[w] || (t[w] = {}), t[w][q] || (G[w] && G[w][q] ? (t[w][q] = G[w][q], t[w][q].total = null) : t[w][q] = new x(H, H.options.stackLabels, A, q, l)), w = t[w][q], null !== E && (w.points[J] = w.points[this.index] = [n(w.cum, g)], m(w.cum) || (w.base = J), w.touched = H.stacksTouched, 0 < z.index && !1 === this.singleStacks && (w.points[J][0] = w.points[this.index + "," +
                q + ",0"][0])), "percent" === b ? (A = A ? r : C, B && t[A] && t[A][q] ? (A = t[A][q], w.total = A.total = Math.max(A.total, w.total) + Math.abs(E) || 0) : w.total = D(w.total + (Math.abs(E) || 0))) : w.total = D(w.total + (E || 0)), w.cum = n(w.cum, g) + (E || 0), null !== E && (w.points[J].push(w.cum), d[h] = w.cum);
                "percent" === b && (H.usePercentage = !0);
                this.stackedYData = d;
                H.oldStacks = {}
            }
        };
        a.prototype.setPercentStacks = function () {
            var a = this, c = a.stackKey, g = a.yAxis.stacks, f = a.processedXData, b;
            d([c, "-" + c], function (e) {
                for (var c = f.length, d, k; c--;) if (d = f[c], b = a.getStackIndicator(b,
                        d, a.index, e), d = (k = g[e] && g[e][d]) && k.points[b.key]) k = k.total ? 100 / k.total : 0, d[0] = D(d[0] * k), d[1] = D(d[1] * k), a.stackedYData[c] = d[1]
            })
        };
        a.prototype.getStackIndicator = function (a, c, d, f) {
            !m(a) || a.x !== c || f && a.key !== f ? a = {x: c, index: 0, key: f} : a.index++;
            a.key = [d, c, a.index].join();
            return a
        }
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.Axis, E = a.createElement, D = a.css, m = a.defined, g = a.each, d = a.erase,
            r = a.extend, l = a.fireEvent, n = a.inArray, k = a.isNumber, c = a.isObject, v = a.isArray, f = a.merge,
            b = a.objectEach, e = a.pick, p = a.Point, u = a.Series,
            F = a.seriesTypes, L = a.setAnimation, B = a.splat;
        r(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var d, f = this;
                a && (b = e(b, !0), l(f, "addSeries", {options: a}, function () {
                    d = f.initSeries(a);
                    f.isDirtyLegend = !0;
                    f.linkSeries();
                    b && f.redraw(c)
                }));
                return d
            },
            addAxis: function (a, b, c, d) {
                var g = b ? "xAxis" : "yAxis", k = this.options;
                a = f(a, {index: this[g].length, isX: b});
                new C(this, a);
                k[g] = B(k[g] || {});
                k[g].push(a);
                e(c, !0) && this.redraw(d)
            },
            showLoading: function (a) {
                var b = this, e = b.options, c = b.loadingDiv, d = function () {
                    c && D(c, {
                        left: b.plotLeft +
                        "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px"
                    })
                };
                c || (b.loadingDiv = c = E("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = E("span", {className: "highcharts-loading-inner"}, null, c), x(b, "redraw", d));
                c.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || e.lang.loading;
                b.loadingShown = !0;
                d()
            },
            hideLoading: function () {
                var a = this.loadingDiv;
                a && (a.className = "highcharts-loading highcharts-loading-hidden");
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
            update: function (a, c) {
                var d = this, p = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, l = a.chart, t,
                    u;
                if (l) {
                    f(!0, d.options.chart, l);
                    "className" in l && d.setClassName(l.className);
                    if ("inverted" in l || "polar" in l) d.propFromSeries(), t = !0;
                    "alignTicks" in l && (t = !0);
                    b(l, function (a, b) {
                        -1 !== n("chart." + b, d.propsRequireUpdateSeries) && (u = !0);
                        -1 !== n(b, d.propsRequireDirtyBox) && (d.isDirtyBox =
                            !0)
                    })
                }
                a.plotOptions && f(!0, this.options.plotOptions, a.plotOptions);
                b(a, function (a, b) {
                    if (d[b] && "function" === typeof d[b].update) d[b].update(a, !1); else if ("function" === typeof d[p[b]]) d[p[b]](a);
                    "chart" !== b && -1 !== n(b, d.propsRequireUpdateSeries) && (u = !0)
                });
                g("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && g(B(a[b]), function (a, e) {
                        (e = m(a.id) && d.get(a.id) || d[b][e]) && e.coll === b && e.update(a, !1)
                    })
                });
                t && g(d.axes, function (a) {
                    a.update({}, !1)
                });
                u && g(d.series, function (a) {
                    a.update({}, !1)
                });
                a.loading &&
                f(!0, d.options.loading, a.loading);
                t = l && l.width;
                l = l && l.height;
                k(t) && t !== d.chartWidth || k(l) && l !== d.chartHeight ? d.setSize(t, l) : e(c, !0) && d.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        r(p.prototype, {
            update: function (a, b, d, f) {
                function g() {
                    k.applyOptions(a);
                    null === k.y && h && (k.graphic = h.destroy());
                    c(a, !0) && (h && h.element && a && a.marker && a.marker.symbol && (k.graphic = h.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()));
                    p = k.index;
                    l.updateParallelArrays(k, p);
                    m.data[p] = c(m.data[p],
                        !0) || c(a, !0) ? k.options : a;
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === m.legendType && (n.isDirtyLegend = !0);
                    b && n.redraw(d)
                }

                var k = this, l = k.series, h = k.graphic, p, n = l.chart, m = l.options;
                b = e(b, !0);
                !1 === f ? g() : k.firePointEvent("update", {options: a}, g)
            }, remove: function (a, b) {
                this.series.removePoint(n(this, this.series.data), a, b)
            }
        });
        r(u.prototype, {
            addPoint: function (a, b, c, d) {
                var f = this.options, g = this.data, k = this.chart, h = this.xAxis, h = h && h.hasNames && h.names,
                    l = f.data, p, n,
                    m = this.xData, t, u;
                b = e(b, !0);
                p = {series: this};
                this.pointClass.prototype.applyOptions.apply(p, [a]);
                u = p.x;
                t = m.length;
                if (this.requireSorting && u < m[t - 1]) for (n = !0; t && m[t - 1] > u;) t--;
                this.updateParallelArrays(p, "splice", t, 0, 0);
                this.updateParallelArrays(p, t);
                h && p.name && (h[u] = p.name);
                l.splice(t, 0, a);
                n && (this.data.splice(t, 0, null), this.processData());
                "point" === f.legendType && this.generatePoints();
                c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(p, "shift"), l.shift()));
                this.isDirtyData = this.isDirty =
                    !0;
                b && k.redraw(d)
            }, removePoint: function (a, b, c) {
                var d = this, f = d.data, g = f[a], k = d.points, h = d.chart, l = function () {
                    k && k.length === f.length && k.splice(a, 1);
                    f.splice(a, 1);
                    d.options.data.splice(a, 1);
                    d.updateParallelArrays(g || {series: d}, "splice", a, 1);
                    g && g.destroy();
                    d.isDirty = !0;
                    d.isDirtyData = !0;
                    b && h.redraw()
                };
                L(c, h);
                b = e(b, !0);
                g ? g.firePointEvent("remove", null, l) : l()
            }, remove: function (a, b, c) {
                function d() {
                    f.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    e(a, !0) && g.redraw(b)
                }

                var f = this, g = f.chart;
                !1 !== c ? l(f,
                    "remove", null, d) : d()
            }, update: function (a, b) {
                var c = this, d = c.chart, k = c.userOptions, l = c.oldType || c.type,
                    p = a.type || k.type || d.options.chart.type, h = F[l].prototype,
                    n = ["group", "markerGroup", "dataLabelsGroup"], m;
                if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, b);
                if (p && p !== l || void 0 !== a.zIndex) n.length = 0;
                g(n, function (a) {
                    n[a] = c[a];
                    delete c[a]
                });
                a = f(k, {animation: !1, index: c.index, pointStart: c.xData[0]}, {data: c.options.data}, a);
                c.remove(!1, null, !1);
                for (m in h) c[m] = void 0;
                r(c, F[p || l].prototype);
                g(n, function (a) {
                    c[a] = n[a]
                });
                c.init(d, a);
                c.oldType = l;
                d.linkSeries();
                e(b, !0) && d.redraw(!1)
            }
        });
        r(C.prototype, {
            update: function (a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = f(this.userOptions, a);
                this.destroy(!0);
                this.init(c, r(a, {events: void 0}));
                c.isDirtyBox = !0;
                e(b, !0) && c.redraw()
            }, remove: function (a) {
                for (var b = this.chart, c = this.coll, f = this.series, k = f.length; k--;) f[k] && f[k].remove(!1);
                d(b.axes, this);
                d(b[c], this);
                v(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                g(b[c], function (a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                e(a, !0) && b.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a}, b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(I);
    (function (a) {
        var x = a.each, C = a.map, E = a.pick, D = a.Series, m = a.seriesType;
        m("area", "line", {softThreshold: !1, threshold: 0}, {
            singleStacks: !1, getStackPoints: function () {
                var g = [], d = [], m = this.xAxis, l = this.yAxis, n = l.stacks[this.stackKey], k = {},
                    c = this.points, v = this.index, f = l.series, b = f.length, e, p = E(l.options.reversedStacks,
                    !0) ? 1 : -1, u;
                if (this.options.stacking) {
                    for (u = 0; u < c.length; u++) k[c[u].x] = c[u];
                    a.objectEach(n, function (a, b) {
                        null !== a.total && d.push(b)
                    });
                    d.sort(function (a, b) {
                        return a - b
                    });
                    e = C(f, function () {
                        return this.visible
                    });
                    x(d, function (a, c) {
                        var f = 0, r, t;
                        if (k[a] && !k[a].isNull) g.push(k[a]), x([-1, 1], function (f) {
                            var g = 1 === f ? "rightNull" : "leftNull", l = 0, m = n[d[c + f]];
                            if (m) for (u = v; 0 <= u && u < b;) r = m.points[u], r || (u === v ? k[a][g] = !0 : e[u] && (t = n[a].points[u]) && (l -= t[1] - t[0])), u += p;
                            k[a][1 === f ? "rightCliff" : "leftCliff"] = l
                        }); else {
                            for (u = v; 0 <=
                            u && u < b;) {
                                if (r = n[a].points[u]) {
                                    f = r[1];
                                    break
                                }
                                u += p
                            }
                            f = l.translate(f, 0, 1, 0, 1);
                            g.push({isNull: !0, plotX: m.translate(a, 0, 0, 0, 1), x: a, plotY: f, yBottom: f})
                        }
                    })
                }
                return g
            }, getGraphPath: function (a) {
                var d = D.prototype.getGraphPath, g = this.options, l = g.stacking, n = this.yAxis, k, c, m = [],
                    f = [], b = this.index, e, p = n.stacks[this.stackKey], u = g.threshold,
                    F = n.getThreshold(g.threshold), x, g = g.connectNulls || "percent" === l, B = function (c, d, g) {
                        var k = a[c];
                        c = l && p[k.x].points[b];
                        var t = k[g + "Null"] || 0;
                        g = k[g + "Cliff"] || 0;
                        var B, r, k = !0;
                        g || t ? (B = (t ?
                            c[0] : c[1]) + g, r = c[0] + g, k = !!t) : !l && a[d] && a[d].isNull && (B = r = u);
                        void 0 !== B && (f.push({
                            plotX: e,
                            plotY: null === B ? F : n.getThreshold(B),
                            isNull: k,
                            isCliff: !0
                        }), m.push({plotX: e, plotY: null === r ? F : n.getThreshold(r), doCurve: !1}))
                    };
                a = a || this.points;
                l && (a = this.getStackPoints());
                for (k = 0; k < a.length; k++) if (c = a[k].isNull, e = E(a[k].rectPlotX, a[k].plotX), x = E(a[k].yBottom, F), !c || g) g || B(k, k - 1, "left"), c && !l && g || (f.push(a[k]), m.push({
                    x: k,
                    plotX: e,
                    plotY: x
                })), g || B(k, k + 1, "right");
                k = d.call(this, f, !0, !0);
                m.reversed = !0;
                c = d.call(this, m,
                    !0, !0);
                c.length && (c[0] = "L");
                c = k.concat(c);
                d = d.call(this, f, !1, g);
                c.xMap = k.xMap;
                this.areaPath = c;
                return d
            }, drawGraph: function () {
                this.areaPath = [];
                D.prototype.drawGraph.apply(this);
                var a = this, d = this.areaPath, m = this.options, l = [["area", "highcharts-area"]];
                x(this.zones, function (a, d) {
                    l.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + a.className])
                });
                x(l, function (g) {
                    var k = g[0], c = a[k];
                    c ? (c.endX = d.xMap, c.animate({d: d})) : (c = a[k] = a.chart.renderer.path(d).addClass(g[1]).attr({zIndex: 0}).add(a.group),
                        c.isArea = !0);
                    c.startX = d.xMap;
                    c.shiftUnit = m.step ? 2 : 1
                })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(I);
    (function (a) {
        var x = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, E, D) {
                var m = E.plotX, g = E.plotY, d = a[D - 1];
                D = a[D + 1];
                var r, l, n, k;
                if (d && !d.isNull && !1 !== d.doCurve && !E.isCliff && D && !D.isNull && !1 !== D.doCurve && !E.isCliff) {
                    a = d.plotY;
                    n = D.plotX;
                    D = D.plotY;
                    var c = 0;
                    r = (1.5 * m + d.plotX) / 2.5;
                    l = (1.5 * g + a) / 2.5;
                    n = (1.5 * m + n) / 2.5;
                    k = (1.5 * g + D) / 2.5;
                    n !== r && (c = (k - l) * (n - m) / (n - r) + g - k);
                    l += c;
                    k += c;
                    l >
                    a && l > g ? (l = Math.max(a, g), k = 2 * g - l) : l < a && l < g && (l = Math.min(a, g), k = 2 * g - l);
                    k > D && k > g ? (k = Math.max(D, g), l = 2 * g - k) : k < D && k < g && (k = Math.min(D, g), l = 2 * g - k);
                    E.rightContX = n;
                    E.rightContY = k
                }
                E = ["C", x(d.rightContX, d.plotX), x(d.rightContY, d.plotY), x(r, m), x(l, g), m, g];
                d.rightContX = d.rightContY = null;
                return E
            }
        })
    })(I);
    (function (a) {
        var x = a.seriesTypes.area.prototype, C = a.seriesType;
        C("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: x.getStackPoints,
            getGraphPath: x.getGraphPath,
            setStackCliffs: x.setStackCliffs,
            drawGraph: x.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(I);
    (function (a) {
        var x = a.animObject, C = a.each, E = a.extend, D = a.isNumber, m = a.merge, g = a.pick, d = a.Series,
            r = a.seriesType, l = a.svg;
        r("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {hover: {halo: !1}},
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0
        }, {
            cropShoulder: 0, directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () {
                d.prototype.init.apply(this, arguments);
                var a = this, g = a.chart;
                g.hasRendered && C(g.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            }, getColumnMetrics: function () {
                var a = this, d = a.options, c = a.xAxis, l = a.yAxis, f = c.reversed, b, e = {}, p = 0;
                !1 === d.grouping ? p = 1 : C(a.chart.series, function (c) {
                    var d = c.options, f = c.yAxis, g;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || l.len !== f.len || l.pos !== f.pos || (d.stacking ? (b = c.stackKey,
                    void 0 === e[b] && (e[b] = p++), g = e[b]) : !1 !== d.grouping && (g = p++), c.columnIndex = g)
                });
                var m = Math.min(Math.abs(c.transA) * (c.ordinalSlope || d.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
                    r = m * d.groupPadding, x = (m - 2 * r) / (p || 1),
                    d = Math.min(d.maxPointWidth || c.len, g(d.pointWidth, x * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (x - d) / 2 + (r + ((a.columnIndex || 0) + (f ? 1 : 0)) * x - m / 2) * (f ? -1 : 1)
                };
                return a.columnMetrics
            }, crispCol: function (a, d, c, g) {
                var f = this.chart, b = this.borderWidth, e = -(b % 2 ? .5 : 0), b = b % 2 ? .5 : 1;
                f.inverted && f.renderer.isVML && (b += 1);
                this.options.crisp && (c = Math.round(a + c) + e, a = Math.round(a) + e, c -= a);
                g = Math.round(d + g) + b;
                e = .5 >= Math.abs(d) && .5 < g;
                d = Math.round(d) + b;
                g -= d;
                e && g && (--d, g += 1);
                return {x: a, y: d, width: c, height: g}
            }, translate: function () {
                var a = this, k = a.chart, c = a.options, l = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    l = a.borderWidth = g(c.borderWidth, l ? 0 : 1), f = a.yAxis,
                    b = a.translatedThreshold = f.getThreshold(c.threshold), e = g(c.minPointLength, 5),
                    p = a.getColumnMetrics(), m = p.width, r = a.barW = Math.max(m, 1 +
                    2 * l), x = a.pointXOffset = p.offset;
                k.inverted && (b -= .5);
                c.pointPadding && (r = Math.ceil(r));
                d.prototype.translate.apply(a);
                C(a.points, function (c) {
                    var d = g(c.yBottom, b), l = 999 + Math.abs(d), l = Math.min(Math.max(-l, c.plotY), f.len + l),
                        p = c.plotX + x, n = r, u = Math.min(l, d), B, v = Math.max(l, d) - u;
                    Math.abs(v) < e && e && (v = e, B = !f.reversed && !c.negative || f.reversed && c.negative, u = Math.abs(u - b) > e ? d - e : b - (B ? e : 0));
                    c.barX = p;
                    c.pointWidth = m;
                    c.tooltipPos = k.inverted ? [f.len + f.pos - k.plotLeft - l, a.xAxis.len - p - n / 2, v] : [p + n / 2, l + f.pos - k.plotTop, v];
                    c.shapeType =
                        "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [p, b, n, 0] : [p, u, n, v])
                })
            }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            }, drawPoints: function () {
                var a = this, d = this.chart, c = d.renderer, g = a.options.animationLimit || 250, f;
                C(a.points, function (b) {
                    var e = b.graphic;
                    if (D(b.plotY) && null !== b.y) {
                        f = b.shapeArgs;
                        if (e) e[d.pointCount < g ? "animate" : "attr"](m(f)); else b.graphic = e = c[b.shapeType](f).add(b.group ||
                            a.group);
                        e.addClass(b.getClassName(), !0)
                    } else e && (b.graphic = e.destroy())
                })
            }, animate: function (a) {
                var d = this, c = this.yAxis, g = d.options, f = this.chart.inverted, b = {};
                l && (a ? (b.scaleY = .001, a = Math.min(c.pos + c.len, Math.max(c.pos, c.toPixels(g.threshold))), f ? b.translateX = a - c.len : b.translateY = a, d.group.attr(b)) : (b[f ? "translateX" : "translateY"] = c.pos, d.group.animate(b, E(x(d.options.animation), {
                    step: function (a, b) {
                        d.group.attr({scaleY: Math.max(.001, b.pos)})
                    }
                })), d.animate = null))
            }, remove: function () {
                var a = this, g = a.chart;
                g.hasRendered && C(g.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                d.prototype.remove.apply(a, arguments)
            }
        })
    })(I);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
    })(I);
    (function (a) {
        var x = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
                lineWidth: 0,
                findNearestPointBy: "xy",
                marker: {enabled: !0},
                tooltip: {
                    headerFormat: '\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cspan class\x3d"highcharts-header"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                    pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
                }
            },
            {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function () {
                    this.options.lineWidth && x.prototype.drawGraph.call(this)
                }
            })
    })(I);
    (function (a) {
        var x = a.pick, C = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, D = this.chart, m = 2 * (a.slicedOffset || 0), g = D.plotWidth - 2 * m,
                    D = D.plotHeight - 2 * m, d = a.center,
                    d = [x(d[0], "50%"), x(d[1], "50%"), a.size || "100%", a.innerSize || 0], r = Math.min(g, D), l, n;
                for (l = 0; 4 > l; ++l) n =
                    d[l], a = 2 > l || 2 === l && /%$/.test(n), d[l] = C(n, [g, D, r, d[2]][l]) + (a ? m : 0);
                d[3] > d[2] && (d[3] = d[2]);
                return d
            }
        }
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.defined, E = a.each, D = a.extend, m = a.inArray, g = a.noop, d = a.pick, r = a.Point,
            l = a.Series, n = a.seriesType, k = a.setAnimation;
        n("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30, enabled: !0, formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                }, x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0}
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var c = this, d = c.points, b = c.startAngleRad;
                a || (E(d, function (a) {
                    var e = a.graphic, d = a.shapeArgs;
                    e && (e.attr({r: a.startR || c.center[3] / 2, start: b, end: b}), e.animate({
                        r: d.r,
                        start: d.start,
                        end: d.end
                    }, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function () {
                var a,
                    d = 0, f = this.points, b = f.length, e, g = this.options.ignoreHiddenPoint;
                for (a = 0; a < b; a++) e = f[a], d += g && !e.visible ? 0 : e.isNull ? 0 : e.y;
                this.total = d;
                for (a = 0; a < b; a++) e = f[a], e.percentage = 0 < d && (e.visible || !g) ? e.y / d * 100 : 0, e.total = d
            },
            generatePoints: function () {
                l.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var c = 0, f = this.options, b = f.slicedOffset, e = b + (f.borderWidth || 0), g, k, l,
                    m = f.startAngle || 0, n = this.startAngleRad = Math.PI / 180 * (m - 90),
                    m = (this.endAngleRad = Math.PI / 180 *
                        (d(f.endAngle, m + 360) - 90)) - n, r = this.points, t, G = f.dataLabels.distance,
                    f = f.ignoreHiddenPoint, z, A = r.length, w;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, e, c) {
                    l = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + c.labelDistance), 1));
                    return a[0] + (e ? -1 : 1) * Math.cos(l) * (a[2] / 2 + c.labelDistance)
                };
                for (z = 0; z < A; z++) {
                    w = r[z];
                    w.labelDistance = d(w.options.dataLabels && w.options.dataLabels.distance, G);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, w.labelDistance);
                    g = n + c * m;
                    if (!f || w.visible) c += w.percentage / 100;
                    k =
                        n + c * m;
                    w.shapeType = "arc";
                    w.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * g) / 1E3,
                        end: Math.round(1E3 * k) / 1E3
                    };
                    l = (k + g) / 2;
                    l > 1.5 * Math.PI ? l -= 2 * Math.PI : l < -Math.PI / 2 && (l += 2 * Math.PI);
                    w.slicedTranslation = {
                        translateX: Math.round(Math.cos(l) * b),
                        translateY: Math.round(Math.sin(l) * b)
                    };
                    k = Math.cos(l) * a[2] / 2;
                    t = Math.sin(l) * a[2] / 2;
                    w.tooltipPos = [a[0] + .7 * k, a[1] + .7 * t];
                    w.half = l < -Math.PI / 2 || l > Math.PI / 2 ? 1 : 0;
                    w.angle = l;
                    g = Math.min(e, w.labelDistance / 5);
                    w.labelPos = [a[0] + k + Math.cos(l) * w.labelDistance, a[1] + t +
                    Math.sin(l) * w.labelDistance, a[0] + k + Math.cos(l) * g, a[1] + t + Math.sin(l) * g, a[0] + k, a[1] + t, 0 > w.labelDistance ? "center" : w.half ? "right" : "left", l]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this, d = a.chart.renderer, f, b, e;
                E(a.points, function (c) {
                    c.isNull || (b = c.graphic, e = c.shapeArgs, f = c.getTranslate(), b ? b.setRadialReference(a.center).animate(D(e, f)) : (c.graphic = b = d[c.shapeType](e).setRadialReference(a.center).attr(f).add(a.group), c.visible || b.attr({visibility: "hidden"})), b.addClass(c.getClassName()))
                })
            },
            searchPoint: g,
            sortByAngle: function (a, d) {
                a.sort(function (a, b) {
                    return void 0 !== a.angle && (b.angle - a.angle) * d
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: g
        }, {
            init: function () {
                r.prototype.init.apply(this, arguments);
                var a = this, g;
                a.name = d(a.name, "Slice");
                g = function (c) {
                    a.slice("select" === c.type)
                };
                x(a, "select", g);
                x(a, "unselect", g);
                return a
            }, isValid: function () {
                return a.isNumber(this.y, !0) && 0 <= this.y
            }, setVisible: function (a, g) {
                var c = this, b = c.series, e = b.chart, k = b.options.ignoreHiddenPoint;
                g = d(g, k);
                a !== c.visible && (c.visible = c.options.visible = a = void 0 === a ? !c.visible : a, b.options.data[m(c, b.data)] = c.options, E(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (c[b]) c[b][a ? "show" : "hide"](!0)
                }), c.legendItem && e.legend.colorizeItem(c, a), a || "hover" !== c.state || c.setState(""), k && (b.isDirty = !0), g && e.redraw())
            }, slice: function (a, g, f) {
                var b = this.series;
                k(f, b.chart);
                d(g, !0);
                this.sliced = this.options.sliced = C(a) ? a : !this.sliced;
                b.options.data[m(this, b.data)] = this.options;
                this.graphic.animate(this.getTranslate())
            },
            getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {translateX: 0, translateY: 0}
            }, haloPath: function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r,
                    start: c.start,
                    end: c.end
                })
            }
        })
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.arrayMax, E = a.defined, D = a.each, m = a.extend, g = a.format, d = a.map,
            r = a.merge, l = a.noop, n = a.pick, k = a.relativeLength, c = a.Series, v = a.seriesTypes,
            f = a.stableSort;
        a.distribute = function (a, e) {
            function b(a,
                       b) {
                return a.target - b.target
            }

            var c, g = !0, k = a, l = [], m;
            m = 0;
            for (c = a.length; c--;) m += a[c].size;
            if (m > e) {
                f(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (m = c = 0; m <= e;) m += a[c].size, c++;
                l = a.splice(c - 1, a.length)
            }
            f(a, b);
            for (a = d(a, function (a) {
                return {size: a.size, targets: [a.target]}
            }); g;) {
                for (c = a.length; c--;) g = a[c], m = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, m - g.size / 2), e - g.size);
                c = a.length;
                for (g = !1; c--;) 0 < c && a[c - 1].pos + a[c - 1].size > a[c].pos && (a[c - 1].size += a[c].size,
                    a[c - 1].targets = a[c - 1].targets.concat(a[c].targets), a[c - 1].pos + a[c - 1].size > e && (a[c - 1].pos = e - a[c - 1].size), a.splice(c, 1), g = !0)
            }
            c = 0;
            D(a, function (a) {
                var b = 0;
                D(a.targets, function () {
                    k[c].pos = a.pos + b;
                    b += k[c].size;
                    c++
                })
            });
            k.push.apply(k, l);
            f(k, b)
        };
        c.prototype.drawDataLabels = function () {
            var b = this, c = b.options, d = c.dataLabels, f = b.points, k, l, m = b.hasRendered || 0, v, t,
                G = n(d.defer, !!c.animation), z = b.chart.renderer;
            if (d.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(d), t = b.plotGroup("dataLabelsGroup",
                "data-labels", G && !m ? "hidden" : "visible", d.zIndex || 6), G && (t.attr({opacity: +m}), m || x(b, "afterAnimate", function () {
                b.visible && t.show(!0);
                t[c.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })), l = d, D(f, function (c) {
                var e, f = c.dataLabel, h, m, p = c.connector, u = !f;
                k = c.dlOptions || c.options && c.options.dataLabels;
                if (e = n(k && k.enabled, l.enabled) && null !== c.y) d = r(l, k), h = c.getLabelConfig(), v = d.format ? g(d.format, h) : d.formatter.call(h, d), h = d.rotation, m = {
                    r: d.borderRadius || 0,
                    rotation: h,
                    padding: d.padding,
                    zIndex: 1
                }, a.objectEach(m,
                    function (a, b) {
                        void 0 === a && delete m[b]
                    });
                !f || e && E(v) ? e && E(v) && (f ? m.text = v : (f = c.dataLabel = z[h ? "text" : "label"](v, 0, -9999, d.shape, null, null, d.useHTML, null, "data-label"), f.addClass("highcharts-data-label-color-" + c.colorIndex + " " + (d.className || "") + (d.useHTML ? "highcharts-tracker" : ""))), f.attr(m), f.added || f.add(t), b.alignDataLabel(c, f, d, null, u)) : (c.dataLabel = f = f.destroy(), p && (c.connector = p.destroy()))
            })
        };
        c.prototype.alignDataLabel = function (a, c, d, f, g) {
            var b = this.chart, e = b.inverted, k = n(a.plotX, -9999), l = n(a.plotY,
                -9999), p = c.getBBox(), r, u = d.rotation, w = d.align,
                v = this.visible && (a.series.forceDL || b.isInsidePlot(k, Math.round(l), e) || f && b.isInsidePlot(k, e ? f.x + 1 : f.y + f.height - 1, e)),
                h = "justify" === n(d.overflow, "justify");
            if (v && (r = b.renderer.fontMetrics(void 0, c).b, f = m({
                    x: e ? b.plotWidth - l : k,
                    y: Math.round(e ? b.plotHeight - k : l),
                    width: 0,
                    height: 0
                }, f), m(d, {
                    width: p.width,
                    height: p.height
                }), u ? (h = !1, k = b.renderer.rotCorr(r, u), k = {
                    x: f.x + d.x + f.width / 2 + k.x,
                    y: f.y + d.y + {top: 0, middle: .5, bottom: 1}[d.verticalAlign] * f.height
                }, c[g ? "attr" : "animate"](k).attr({align: w}),
                    l = (u + 720) % 360, l = 180 < l && 360 > l, "left" === w ? k.y -= l ? p.height : 0 : "center" === w ? (k.x -= p.width / 2, k.y -= p.height / 2) : "right" === w && (k.x -= p.width, k.y -= l ? 0 : p.height)) : (c.align(d, null, f), k = c.alignAttr), h ? a.isLabelJustified = this.justifyDataLabel(c, d, k, p, f, g) : n(d.crop, !0) && (v = b.isInsidePlot(k.x, k.y) && b.isInsidePlot(k.x + p.width, k.y + p.height)), d.shape && !u)) c[g ? "attr" : "animate"]({
                anchorX: e ? b.plotWidth - a.plotY : a.plotX,
                anchorY: e ? b.plotHeight - a.plotX : a.plotY
            });
            v || (c.attr({y: -9999}), c.placed = !1)
        };
        c.prototype.justifyDataLabel =
            function (a, c, d, f, g, k) {
                var b = this.chart, e = c.align, l = c.verticalAlign, m, p, n = a.box ? 0 : a.padding || 0;
                m = d.x + n;
                0 > m && ("right" === e ? c.align = "left" : c.x = -m, p = !0);
                m = d.x + f.width - n;
                m > b.plotWidth && ("left" === e ? c.align = "right" : c.x = b.plotWidth - m, p = !0);
                m = d.y + n;
                0 > m && ("bottom" === l ? c.verticalAlign = "top" : c.y = -m, p = !0);
                m = d.y + f.height - n;
                m > b.plotHeight && ("top" === l ? c.verticalAlign = "bottom" : c.y = b.plotHeight - m, p = !0);
                p && (a.placed = !k, a.align(c, null, g));
                return p
            };
        v.pie && (v.pie.prototype.drawDataLabels = function () {
            var b = this, d = b.data,
                f, g = b.chart, k = b.options.dataLabels, l = n(k.connectorPadding, 10), m = n(k.connectorWidth, 1),
                r = g.plotWidth, t = g.plotHeight, v, z = b.center, A = z[2] / 2, w = z[1], x, h, q, I, K = [[], []], N,
                M, P, R, O = [0, 0, 0, 0];
            b.visible && (k.enabled || b._hasPointLabels) && (D(d, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), c.prototype.drawDataLabels.apply(b), D(d, function (a) {
                a.dataLabel && a.visible && (K[a.half].push(a), a.dataLabel._pos =
                    null)
            }), D(K, function (c, d) {
                var e, m, p = c.length, n = [], u;
                if (p) for (b.sortByAngle(c, d - .5), 0 < b.maxLabelDistance && (e = Math.max(0, w - A - b.maxLabelDistance), m = Math.min(w + A + b.maxLabelDistance, g.plotHeight), D(c, function (a) {
                    0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, w - A - a.labelDistance), a.bottom = Math.min(w + A + a.labelDistance, g.plotHeight), u = a.dataLabel.getBBox().height || 21, a.positionsIndex = n.push({
                        target: a.labelPos[1] - a.top + u / 2,
                        size: u,
                        rank: a.y
                    }) - 1)
                }), a.distribute(n, m + u - e)), R = 0; R < p; R++) f = c[R], m = f.positionsIndex,
                    q = f.labelPos, x = f.dataLabel, P = !1 === f.visible ? "hidden" : "inherit", e = q[1], n && E(n[m]) ? void 0 === n[m].pos ? P = "hidden" : (I = n[m].size, M = f.top + n[m].pos) : M = e, delete f.positionIndex, N = k.justify ? z[0] + (d ? -1 : 1) * (A + f.labelDistance) : b.getX(M < f.top + 2 || M > f.bottom - 2 ? e : M, d, f), x._attr = {
                    visibility: P,
                    align: q[6]
                }, x._pos = {
                    x: N + k.x + ({left: l, right: -l}[q[6]] || 0),
                    y: M + k.y - 10
                }, q.x = N, q.y = M, h = x.getBBox().width, e = null, N - h < l ? (e = Math.round(h - N + l), O[3] = Math.max(e, O[3])) : N + h > r - l && (e = Math.round(N + h - r + l), O[1] = Math.max(e, O[1])), 0 > M - I / 2 ? O[0] =
                    Math.max(Math.round(-M + I / 2), O[0]) : M + I / 2 > t && (O[2] = Math.max(Math.round(M + I / 2 - t), O[2])), x.sideOverflow = e
            }), 0 === C(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), m && D(this.points, function (a) {
                var c;
                v = a.connector;
                if ((x = a.dataLabel) && x._pos && a.visible && 0 < a.labelDistance) {
                    P = x._attr.visibility;
                    if (c = !v) a.connector = v = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup);
                    v[c ? "attr" : "animate"]({d: b.connectorPath(a.labelPos)});
                    v.attr("visibility",
                        P)
                } else v && (a.connector = v.destroy())
            }))
        }, v.pie.prototype.connectorPath = function (a) {
            var b = a.x, c = a.y;
            return n(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, v.pie.prototype.placeDataLabels = function () {
            D(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width +
                    "px", textOverflow: "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -9999}))
            }, this)
        }, v.pie.prototype.alignDataLabel = l, v.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center, c = this.options, d = c.center, f = c.minSize || 80, g, l = null !== c.size;
            l || (null !== d[0] ? g = Math.max(b[2] - Math.max(a[1], a[3]), f) : (g = Math.max(b[2] - a[1] - a[3], f), b[0] += (a[3] - a[1]) / 2), null !== d[1] ? g = Math.max(Math.min(g, b[2] - Math.max(a[0], a[2])), f) : (g = Math.max(Math.min(g, b[2] - a[0] -
                a[2]), f), b[1] += (a[0] - a[2]) / 2), g < b[2] ? (b[2] = g, b[3] = Math.min(k(c.innerSize || 0, g), g), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : l = !0);
            return l
        });
        v.column && (v.column.prototype.alignDataLabel = function (a, d, f, g, k) {
            var b = this.chart.inverted, e = a.series, l = a.dlBox || a.shapeArgs,
                m = n(a.below, a.plotY > n(this.translatedThreshold, e.yAxis.len)),
                p = n(f.inside, !!this.options.stacking);
            l && (g = r(l), 0 > g.y && (g.height += g.y, g.y = 0), l = g.y + g.height - e.yAxis.len, 0 < l && (g.height -= l), b && (g = {
                x: e.yAxis.len - g.y - g.height,
                y: e.xAxis.len - g.x - g.width, width: g.height, height: g.width
            }), p || (b ? (g.x += m ? 0 : g.width, g.width = 0) : (g.y += m ? g.height : 0, g.height = 0)));
            f.align = n(f.align, !b || p ? "center" : m ? "right" : "left");
            f.verticalAlign = n(f.verticalAlign, b || p ? "middle" : m ? "top" : "bottom");
            c.prototype.alignDataLabel.call(this, a, d, f, g, k);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({color: a.contrastColor})
        })
    })(I);
    (function (a) {
        var x = a.Chart, C = a.each, E = a.pick, D = a.addEvent;
        x.prototype.callbacks.push(function (a) {
            function g() {
                var d = [];
                C(a.series ||
                    [], function (a) {
                    var g = a.options.dataLabels, m = a.dataLabelCollections || ["dataLabel"];
                    (g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && C(m, function (g) {
                        C(a.points, function (a) {
                            a[g] && (a[g].labelrank = E(a.labelrank, a.shapeArgs && a.shapeArgs.height), d.push(a[g]))
                        })
                    })
                });
                a.hideOverlappingLabels(d)
            }

            g();
            D(a, "redraw", g)
        });
        x.prototype.hideOverlappingLabels = function (a) {
            var g = a.length, d, m, l, n, k, c, v, f, b, e = function (a, b, c, d, e, f, g, k) {
                return !(e > a + c || e + g < a || f > b + d || f + k < b)
            };
            for (m = 0; m < g; m++) if (d = a[m]) d.oldOpacity =
                d.opacity, d.newOpacity = 1;
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (m = 0; m < g; m++) for (l = a[m], d = m + 1; d < g; ++d) if (n = a[d], l && n && l !== n && l.placed && n.placed && 0 !== l.newOpacity && 0 !== n.newOpacity && (k = l.alignAttr, c = n.alignAttr, v = l.parentGroup, f = n.parentGroup, b = 2 * (l.box ? 0 : l.padding), k = e(k.x + v.translateX, k.y + v.translateY, l.width - b, l.height - b, c.x + f.translateX, c.y + f.translateY, n.width - b, n.height - b))) (l.labelrank < n.labelrank ? l : n).newOpacity = 0;
            C(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !==
                c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(I);
    (function (a) {
        var x = a.addEvent, C = a.Chart, E = a.createElement, D = a.css, m = a.defaultOptions, g = a.defaultPlotOptions,
            d = a.each, r = a.extend, l = a.fireEvent, n = a.hasTouch, k = a.inArray, c = a.isObject, v = a.Legend,
            f = a.merge, b = a.pick, e = a.Point, p = a.Series, u = a.seriesTypes, F = a.svg, I;
        I = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, b = a.chart.pointer, c = function (a) {
                    var c = b.getPointFromEvent(a);
                    void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                };
                d(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (d(a.trackerGroups, function (d) {
                    if (a[d] && (a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        }), n)) a[d].on("touchstart", c)
                }), a._hasTracking = !0)
            }, drawTrackerGraph: function () {
                var a = this, b = a.options.trackByArea, c = [].concat(b ? a.areaPath : a.graphPath),
                    e = c.length, f = a.chart, g = f.pointer, k = f.renderer, l = f.options.tooltip.snap, h = a.tracker,
                    m, p = function () {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    }, r = "rgba(192,192,192," + (F ? .0001 : .002) + ")";
                if (e && !b) for (m = e + 1; m--;) "M" === c[m] && c.splice(m + 1, 0, c[m + 1] - l, c[m + 2], "L"), (m && "M" === c[m] || m === e) && c.splice(m, 0, "L", c[m - 2] + l, c[m - 1]);
                h ? h.attr({d: c}) : a.graph && (a.tracker = k.path(c).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: r,
                    fill: b ? r : "none",
                    "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * l),
                    zIndex: 2
                }).add(a.group),
                    d([a.tracker, a.markerGroup], function (a) {
                        a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function (a) {
                            g.onTrackerMouseOut(a)
                        });
                        if (n) a.on("touchstart", p)
                    }))
            }
        };
        u.column && (u.column.prototype.drawTracker = I.drawTrackerPoint);
        u.pie && (u.pie.prototype.drawTracker = I.drawTrackerPoint);
        u.scatter && (u.scatter.prototype.drawTracker = I.drawTrackerPoint);
        r(v.prototype, {
            setItemEvents: function (a, b, c) {
                var d = this.chart.renderer.boxWrapper,
                    e = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ?
                    b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    d.addClass(e)
                }).on("mouseout", function () {
                    d.removeClass(e);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : l(a, "legendItemClick", b, c)
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox = E("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                x(a.checkbox, "click",
                    function (b) {
                        l(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                            a.select()
                        })
                    })
            }
        });
        r(C.prototype, {
            showResetZoom: function () {
                var a = this, b = m.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states,
                    f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
            }, zoomOut: function () {
                var a =
                    this;
                l(a, "selection", {resetSelection: !0}, function () {
                    a.zoom()
                })
            }, zoom: function (a) {
                var e, f = this.pointer, g = !1, k;
                !a || a.resetSelection ? d(this.axes, function (a) {
                    e = a.zoom()
                }) : d(a.xAxis.concat(a.yAxis), function (a) {
                    var b = a.axis;
                    f[b.isXAxis ? "zoomX" : "zoomY"] && (e = b.zoom(a.min, a.max), b.displayBtn && (g = !0))
                });
                k = this.resetZoomButton;
                g && !k ? this.showResetZoom() : !g && c(k) && (this.resetZoomButton = k.destroy());
                e && this.redraw(b(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }, pan: function (a, b) {
                var c = this,
                    e = c.hoverPoints, f;
                e && d(e, function (a) {
                    a.setState()
                });
                d("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, e = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d],
                        k = (b.pointRange || 0) / 2, l = b.getExtremes(), m = b.toValue(g - e, !0) + k,
                        k = b.toValue(g + b.len - e, !0) - k, n = k < m, g = n ? k : m, m = n ? m : k,
                        k = Math.min(l.dataMin, b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                        n = Math.max(l.dataMax, b.toValue(b.toPixels(l.max) + b.minPixelPadding)), p;
                    p = k - g;
                    0 < p && (m += p, g = k);
                    p = m - n;
                    0 < p && (m = n, g -= p);
                    b.series.length && g !==
                    l.min && m !== l.max && (b.setExtremes(g, m, !1, !1, {trigger: "pan"}), f = !0);
                    c[d] = e
                });
                f && c.redraw(!1);
                D(c.container, {cursor: "move"})
            }
        });
        r(e.prototype, {
            select: function (a, c) {
                var e = this, f = e.series, g = f.chart;
                a = b(a, !e.selected);
                e.firePointEvent(a ? "select" : "unselect", {accumulate: c}, function () {
                    e.selected = e.options.selected = a;
                    f.options.data[k(e, f.data)] = e.options;
                    e.setState(a && "select");
                    c || d(g.getSelectedPoints(), function (a) {
                        a.selected && a !== e && (a.selected = a.options.selected = !1, f.options.data[k(a, f.data)] = a.options,
                            a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a) {
                var b = this.series.chart, c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            }, onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                d(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this, c = f(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a,
                                              c) {
                        x(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            }, setState: function (a, c) {
                var d = Math.floor(this.plotX), e = this.plotY, f = this.series, k = f.options.states[a] || {},
                    l = g[f.type].marker && f.options.marker, m = l && !1 === l.enabled,
                    h = l && l.states && l.states[a] || {}, n = !1 === h.enabled, p = f.stateMarkerGraphic,
                    r = this.marker || {}, u = f.chart, v = f.halo, x, B = l && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !c || this.selected && "select" !== a || !1 === k.enabled || a && (n || m && !1 === h.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
                    B && (x = f.markerAttribs(this,
                        a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), x && this.graphic.animate(x, b(u.options.chart.animation, h.animation, l.animation)), p && p.hide(); else {
                        if (a && h) if (l = r.symbol || f.symbol, p && p.currentSymbol !== l && (p = p.destroy()), p) p[c ? "animate" : "attr"]({
                            x: x.x,
                            y: x.y
                        }); else l && (f.stateMarkerGraphic = p = u.renderer.symbol(l, x.x, x.y, x.width, x.height).add(f.markerGroup), p.currentSymbol = l);
                        p && (p[a && u.isInsidePlot(d, e, u.inverted) ?
                            "show" : "hide"](), p.element.point = this)
                    }
                    (d = k.halo) && d.size ? (v || (f.halo = v = u.renderer.path().add((this.graphic || p).parentGroup)), v[c ? "animate" : "attr"]({d: this.haloPath(d.size)}), v.attr({"class": "highcharts-halo highcharts-color-" + b(this.colorIndex, f.colorIndex)}), v.point = this) : v && v.point && v.point.haloPath && v.animate({d: v.point.haloPath(0)});
                    this.state = a
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        r(p.prototype, {
            onMouseOver: function () {
                var a =
                    this.chart, b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && l(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && l(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this;
                a = a || "";
                b.state !== a && (d([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                    c &&
                    (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a)
            }, setVisible: function (a, b) {
                var c = this, e = c.chart, f = c.legendItem, g, k = e.options.chart.ignoreHiddenSeries, m = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !m : a) ? "show" : "hide";
                d(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][g]()
                });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
                f && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && d(e.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                d(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                k && (e.isDirtyBox = !0);
                !1 !== b && e.redraw();
                l(c, g)
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                l(this, a ? "select" : "unselect")
            }, drawTracker: I.drawTrackerGraph
        })
    })(I);
    (function (a) {
        var x = a.Chart, C = a.each, E = a.inArray, D = a.isArray,
            m = a.isObject, g = a.pick, d = a.splat;
        x.prototype.setResponsive = function (d) {
            var g = this.options.responsive, m = [], k = this.currentResponsive;
            g && g.rules && C(g.rules, function (c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, m, d)
            }, this);
            var c = a.merge.apply(0, a.map(m, function (c) {
                return a.find(g.rules, function (a) {
                    return a._id === c
                }).chartOptions
            })), m = m.toString() || void 0;
            m !== (k && k.ruleIds) && (k && this.update(k.undoOptions, d), m ? (this.currentResponsive = {
                ruleIds: m,
                mergedOptions: c,
                undoOptions: this.currentOptions(c)
            },
                this.update(c, d)) : this.currentResponsive = void 0)
        };
        x.prototype.matchResponsiveRule = function (a, d) {
            var l = a.condition;
            (l.callback || function () {
                return this.chartWidth <= g(l.maxWidth, Number.MAX_VALUE) && this.chartHeight <= g(l.maxHeight, Number.MAX_VALUE) && this.chartWidth >= g(l.minWidth, 0) && this.chartHeight >= g(l.minHeight, 0)
            }).call(this) && d.push(a._id)
        };
        x.prototype.currentOptions = function (g) {
            function l(g, c, n, f) {
                var b;
                a.objectEach(g, function (a, k) {
                    if (!f && -1 < E(k, ["series", "xAxis", "yAxis"])) for (g[k] = d(g[k]), n[k] =
                        [], b = 0; b < g[k].length; b++) c[k][b] && (n[k][b] = {}, l(a[b], c[k][b], n[k][b], f + 1)); else m(a) ? (n[k] = D(a) ? [] : {}, l(a, c[k] || {}, n[k], f + 1)) : n[k] = c[k] || null
                })
            }

            var n = {};
            l(g, this.options, n, 0);
            return n
        }
    })(I);
    return I
});
