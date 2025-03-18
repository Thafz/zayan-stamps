var rrweb = function(e) {
    "use strict";

    function t(e) {
        return e.nodeType === e.ELEMENT_NODE
    }

    function r(e) {
        return Boolean(e ? .host ? .shadowRoot === e)
    }

    function n(e) {
        return "[object ShadowRoot]" === Object.prototype.toString.call(e)
    }

    function o(e) {
        try {
            var t, r = e.rules || e.cssRules;
            return r ? ((t = Array.from(r).map(a).join("")).includes(" background-clip: text;") && !t.includes(" -webkit-background-clip: text;") && (t = t.replace(" background-clip: text;", " -webkit-background-clip: text; background-clip: text;")), t) : null
        } catch {
            return null
        }
    }

    function a(e) {
        var t, r = e.cssText;
        if (t = e, "styleSheet" in t) try {
            r = o(e.styleSheet) || r
        } catch {}
        return r
    }(c = S || (S = {}))[c.Document = 0] = "Document", c[c.DocumentType = 1] = "DocumentType", c[c.Element = 2] = "Element", c[c.Text = 3] = "Text", c[c.CDATA = 4] = "CDATA", c[c.Comment = 5] = "Comment";
    var i, s, l, c, d, u, h, p = function() {
        function e() {
            this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
        }
        return e.prototype.getId = function(e) {
            var t;
            return e ? (null === (t = this.getMeta(e)) || void 0 === t ? void 0 : t.id) ? ? -1 : -1
        }, e.prototype.getNode = function(e) {
            return this.idNodeMap.get(e) || null
        }, e.prototype.getIds = function() {
            return Array.from(this.idNodeMap.keys())
        }, e.prototype.getMeta = function(e) {
            return this.nodeMetaMap.get(e) || null
        }, e.prototype.removeNodeFromMap = function(e) {
            var t = this,
                r = this.getId(e);
            this.idNodeMap.delete(r), e.childNodes && e.childNodes.forEach(function(e) {
                return t.removeNodeFromMap(e)
            })
        }, e.prototype.has = function(e) {
            return this.idNodeMap.has(e)
        }, e.prototype.hasNode = function(e) {
            return this.nodeMetaMap.has(e)
        }, e.prototype.add = function(e, t) {
            var r = t.id;
            this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, t)
        }, e.prototype.replace = function(e, t) {
            var r = this.getNode(e);
            if (r) {
                var n = this.nodeMetaMap.get(r);
                n && this.nodeMetaMap.set(t, n)
            }
            this.idNodeMap.set(e, t)
        }, e.prototype.reset = function() {
            this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
        }, e
    }();

    function m(e) {
        var t = e.maskInputOptions,
            r = e.tagName,
            n = e.type,
            o = e.value,
            a = e.maskInputFn,
            i = o || "";
        return (t[r.toLowerCase()] || t[n]) && (i = a ? a(i) : "*".repeat(i.length)), i
    }
    var f = "__rrweb_original__",
        g = 1,
        y = RegExp("[^a-z0-9-_:]"),
        v = -2;

    function b() {
        return g++
    }
    var S, C, I, N = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
        $ = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/,
        T = /^(data:)([^,]*),(.*)/i;

    function M(e, t) {
        return (e || "").replace(N, function(e, r, n, o, a, i) {
            var s, l, c = n || a || i,
                d = r || o || "";
            if (!c) return e;
            if (!$.test(c) || T.test(c)) return "url(".concat(d).concat(c).concat(d, ")");
            if ("/" === c[0]) return "url(".concat(d).concat((l = (s = t).indexOf("//") > -1 ? s.split("/").slice(0, 3).join("/") : s.split("/")[0]).split("?")[0] + c).concat(d, ")");
            var u = t.split("/"),
                h = c.split("/");
            u.pop();
            for (var p = 0, m = h; p < m.length; p++) {
                var f = m[p];
                "." !== f && (".." === f ? u.pop() : u.push(f))
            }
            return "url(".concat(d).concat(u.join("/")).concat(d, ")")
        })
    }
    var E = /^[^ \t\n\r\u000c]+/,
        w = /^[, \t\n\r\u000c]+/;

    function R(e, t) {
        if (!t || "" === t.trim()) return t;
        var r = e.createElement("a");
        return r.href = t, r.href
    }

    function k() {
        var e = document.createElement("a");
        return e.href = "", e.href
    }

    function D(e, t, r, n) {
        return "src" === r || "href" === r && n && !("use" === t && "#" === n[0]) || "xlink:href" === r && n && "#" !== n[0] || "background" === r && n && ("table" === t || "td" === t || "th" === t) ? R(e, n) : "srcset" === r && n ? function e(t, r) {
            if ("" === r.trim()) return r;
            var n = 0;

            function o(e) {
                var t, o = e.exec(r.substring(n));
                return o ? (n += (t = o[0]).length, t) : ""
            }
            for (var a = []; o(w), !(n >= r.length);) {
                var i = o(E);
                if ("," === i.slice(-1)) i = R(t, i.substring(0, i.length - 1)), a.push(i);
                else {
                    var s = "";
                    i = R(t, i);
                    for (var l = !1;;) {
                        var c = r.charAt(n);
                        if ("" === c) {
                            a.push((i + s).trim());
                            break
                        }
                        if (l) ")" === c && (l = !1);
                        else if ("," === c) {
                            n += 1, a.push((i + s).trim());
                            break
                        } else "(" === c && (l = !0);
                        s += c, n += 1
                    }
                }
            }
            return a.join(", ")
        }(e, n) : "style" === r && n ? M(n, k()) : "object" === t && "data" === r && n ? R(e, n) : n
    }

    function x(e, t, r) {
        if (!e) return !1;
        if (e.nodeType !== e.ELEMENT_NODE) return !!r && x(e.parentNode, t, r);
        for (var n = e.classList.length; n--;) {
            var o = e.classList[n];
            if (t.test(o)) return !0
        }
        return !!r && x(e.parentNode, t, r)
    }

    function O(e, t, r) {
        var n = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
        if (null === n) return !1;
        if ("string" == typeof t) {
            if (n.classList.contains(t) || n.closest(".".concat(t))) return !0
        } else if (x(n, t, !0)) return !0;
        return !!(r && (n.matches(r) || n.closest(r)))
    }

    function L(e) {
        return void 0 === e ? "" : e.toLowerCase()
    }

    function _(e, a) {
        var i, s, l, c = a.doc,
            d = a.mirror,
            u = a.blockClass,
            h = a.blockSelector,
            p = a.maskTextClass,
            g = a.maskTextSelector,
            N = a.skipChild,
            $ = void 0 !== N && N,
            T = a.inlineStylesheet,
            E = void 0 === T || T,
            w = a.maskInputOptions,
            R = void 0 === w ? {} : w,
            x = a.maskTextFn,
            A = a.maskInputFn,
            F = a.slimDOMOptions,
            P = a.dataURLOptions,
            G = void 0 === P ? {} : P,
            W = a.inlineImages,
            U = void 0 !== W && W,
            z = a.recordCanvas,
            V = void 0 !== z && z,
            Z = a.onSerialize,
            B = a.onIframeLoad,
            H = a.iframeLoadTimeout,
            X = void 0 === H ? 5e3 : H,
            Y = a.onStylesheetLoad,
            j = a.stylesheetLoadTimeout,
            K = void 0 === j ? 5e3 : j,
            J = a.keepIframeSrcFn,
            Q = void 0 === J ? function() {
                return !1
            } : J,
            q = a.newlyAddedElement,
            ee = a.preserveWhiteSpace,
            et = void 0 === ee || ee,
            er = function e(t, r) {
                var n = r.doc,
                    a = r.mirror,
                    i = r.blockClass,
                    s = r.blockSelector,
                    l = r.maskTextClass,
                    c = r.maskTextSelector,
                    d = r.inlineStylesheet,
                    u = r.maskInputOptions,
                    h = r.maskTextFn,
                    p = r.maskInputFn,
                    g = r.dataURLOptions,
                    v = r.inlineImages,
                    b = r.recordCanvas,
                    N = r.keepIframeSrcFn,
                    $ = r.newlyAddedElement,
                    T = function e(t, r) {
                        if (r.hasNode(t)) {
                            var n = r.getId(t);
                            return 1 === n ? void 0 : n
                        }
                    }(n, a);
                switch (t.nodeType) {
                    case t.DOCUMENT_NODE:
                        return "CSS1Compat" !== t.compatMode ? {
                            type: S.Document,
                            childNodes: [],
                            compatMode: t.compatMode
                        } : {
                            type: S.Document,
                            childNodes: []
                        };
                    case t.DOCUMENT_TYPE_NODE:
                        return {
                            type: S.DocumentType,
                            name: t.name,
                            publicId: t.publicId,
                            systemId: t.systemId,
                            rootId: T
                        };
                    case t.ELEMENT_NODE:
                        return function e(t, r) {
                            for (var n, a = r.doc, i = r.blockClass, s = r.blockSelector, l = r.inlineStylesheet, c = r.maskInputOptions, d = void 0 === c ? {} : c, u = r.maskInputFn, h = r.dataURLOptions, p = void 0 === h ? {} : h, g = r.inlineImages, v = r.recordCanvas, b = r.keepIframeSrcFn, N = r.newlyAddedElement, $ = r.rootId, T = function e(t, r, n) {
                                    if ("string" == typeof r) {
                                        if (t.classList.contains(r)) return !0
                                    } else
                                        for (var o = t.classList.length; o--;) {
                                            var a = t.classList[o];
                                            if (r.test(a)) return !0
                                        }
                                    return !!n && t.matches(n)
                                }(t, i, s), E = function e(t) {
                                    if (t instanceof HTMLFormElement) return "form";
                                    var r = t.tagName.toLowerCase().trim();
                                    return y.test(r) ? "div" : r
                                }(t), w = {}, R = t.attributes.length, x = 0; x < R; x++) {
                                var O = t.attributes[x];
                                w[O.name] = D(a, E, O.name, O.value)
                            }
                            if ("link" === E && l) {
                                var L = Array.from(a.styleSheets).find(function(e) {
                                        return e.href === t.href
                                    }),
                                    _ = null;
                                L && (_ = o(L)), _ && (delete w.rel, delete w.href, w._cssText = M(_, L.href))
                            }
                            if ("style" === E && t.sheet && !(t.innerText || t.textContent || "").trim().length) {
                                var _ = o(t.sheet);
                                _ && (w._cssText = M(_, k()))
                            }
                            if ("input" === E || "textarea" === E || "select" === E) {
                                var A = t.value,
                                    F = t.checked;
                                "radio" !== w.type && "checkbox" !== w.type && "submit" !== w.type && "button" !== w.type && A ? w.value = m({
                                    type: w.type,
                                    tagName: E,
                                    value: A,
                                    maskInputOptions: d,
                                    maskInputFn: u
                                }) : F && (w.checked = F)
                            }
                            if ("option" === E && (t.selected && !d.select ? w.selected = !0 : delete w.selected), "canvas" === E && v) {
                                if ("2d" === t.__context)(function e(t) {
                                    var r = t.getContext("2d");
                                    if (!r) return !0;
                                    for (var n = 0; n < t.width; n += 50)
                                        for (var o = 0; o < t.height; o += 50) {
                                            var a = r.getImageData,
                                                i = f in a ? a[f] : a;
                                            if (new Uint32Array(i.call(r, n, o, Math.min(50, t.width - n), Math.min(50, t.height - o)).data.buffer).some(function(e) {
                                                    return 0 !== e
                                                })) return !1
                                        }
                                    return !0
                                })(t) || (w.rr_dataURL = t.toDataURL(p.type, p.quality));
                                else if (!("__context" in t)) {
                                    var P = t.toDataURL(p.type, p.quality),
                                        G = document.createElement("canvas");
                                    G.width = t.width, G.height = t.height, P !== G.toDataURL(p.type, p.quality) && (w.rr_dataURL = P)
                                }
                            }
                            if ("img" === E && g) {
                                C || (I = (C = a.createElement("canvas")).getContext("2d"));
                                var W = t,
                                    U = W.crossOrigin;
                                W.crossOrigin = "anonymous";
                                var z = function() {
                                    try {
                                        C.width = W.naturalWidth, C.height = W.naturalHeight, I.drawImage(W, 0, 0), w.rr_dataURL = C.toDataURL(p.type, p.quality)
                                    } catch (e) {
                                        console.warn("Cannot inline img src=".concat(W.currentSrc, "! Error: ").concat(e))
                                    }
                                    U ? w.crossOrigin = U : W.removeAttribute("crossorigin")
                                };
                                W.complete && 0 !== W.naturalWidth ? z() : W.onload = z
                            }
                            if (("audio" === E || "video" === E) && (w.rr_mediaState = t.paused ? "paused" : "played", w.rr_mediaCurrentTime = t.currentTime), void 0 !== N && N || (t.scrollLeft && (w.rr_scrollLeft = t.scrollLeft), t.scrollTop && (w.rr_scrollTop = t.scrollTop)), T) {
                                var V = t.getBoundingClientRect(),
                                    Z = V.width,
                                    B = V.height;
                                w = {
                                    class: w.class,
                                    rr_width: "".concat(Z, "px"),
                                    rr_height: "".concat(B, "px")
                                }
                            }
                            return "iframe" !== E || b(w.src) || (t.contentDocument || (w.rr_src = w.src), delete w.src), {
                                type: S.Element,
                                tagName: E,
                                attributes: w,
                                childNodes: [],
                                isSVG: (n = t, Boolean("svg" === n.tagName || n.ownerSVGElement) || void 0),
                                needBlock: T,
                                rootId: $
                            }
                        }(t, {
                            doc: n,
                            blockClass: i,
                            blockSelector: s,
                            inlineStylesheet: d,
                            maskInputOptions: void 0 === u ? {} : u,
                            maskInputFn: p,
                            dataURLOptions: void 0 === g ? {} : g,
                            inlineImages: v,
                            recordCanvas: b,
                            keepIframeSrcFn: N,
                            newlyAddedElement: void 0 !== $ && $,
                            rootId: T
                        });
                    case t.TEXT_NODE:
                        return function e(t, r) {
                            var n, o, a = r.maskTextClass,
                                i = r.maskTextSelector,
                                s = r.maskTextFn,
                                l = r.rootId,
                                c = t.parentNode && t.parentNode.tagName,
                                d = t.textContent,
                                u = "STYLE" === c || void 0,
                                h = "SCRIPT" === c || void 0;
                            if (u && d) {
                                try {
                                    t.nextSibling || t.previousSibling || !(null === (o = t.parentNode.sheet) || void 0 === o) && o.cssRules && (d = (n = t.parentNode.sheet).cssRules ? Array.from(n.cssRules).map(function(e) {
                                        return e.cssText || ""
                                    }).join("") : "")
                                } catch (p) {
                                    console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(p), t)
                                }
                                d = M(d, k())
                            }
                            return h && (d = "SCRIPT_PLACEHOLDER"), !u && !h && d && O(t, a, i) && (d = s ? s(d) : d.replace(/[\S]/g, "*")), {
                                type: S.Text,
                                textContent: d || "",
                                isStyle: u,
                                rootId: l
                            }
                        }(t, {
                            maskTextClass: l,
                            maskTextSelector: c,
                            maskTextFn: h,
                            rootId: T
                        });
                    case t.CDATA_SECTION_NODE:
                        return {
                            type: S.CDATA,
                            textContent: "",
                            rootId: T
                        };
                    case t.COMMENT_NODE:
                        return {
                            type: S.Comment,
                            textContent: t.textContent || "",
                            rootId: T
                        };
                    default:
                        return !1
                }
            }(e, {
                doc: c,
                mirror: d,
                blockClass: u,
                blockSelector: h,
                maskTextClass: p,
                maskTextSelector: g,
                inlineStylesheet: E,
                maskInputOptions: R,
                maskTextFn: x,
                maskInputFn: A,
                dataURLOptions: G,
                inlineImages: U,
                recordCanvas: V,
                keepIframeSrcFn: Q,
                newlyAddedElement: void 0 !== q && q
            });
        if (!er) return console.warn(e, "not serialized"), null;
        l = d.hasNode(e) ? d.getId(e) : (i = er, !((s = F).comment && i.type === S.Comment || i.type === S.Element && (s.script && ("script" === i.tagName || "link" === i.tagName && "preload" === i.attributes.rel && "script" === i.attributes.as || "link" === i.tagName && "prefetch" === i.attributes.rel && "string" == typeof i.attributes.href && i.attributes.href.endsWith(".js")) || s.headFavicon && ("link" === i.tagName && "shortcut icon" === i.attributes.rel || "meta" === i.tagName && (L(i.attributes.name).match(/^msapplication-tile(image|color)$/) || "application-name" === L(i.attributes.name) || "icon" === L(i.attributes.rel) || "apple-touch-icon" === L(i.attributes.rel) || "shortcut icon" === L(i.attributes.rel))) || "meta" === i.tagName && (s.headMetaDescKeywords && L(i.attributes.name).match(/^description|keywords$/) || s.headMetaSocial && (L(i.attributes.property).match(/^(og|twitter|fb):/) || L(i.attributes.name).match(/^(og|twitter):/) || "pinterest" === L(i.attributes.name)) || s.headMetaRobots && ("robots" === L(i.attributes.name) || "googlebot" === L(i.attributes.name) || "bingbot" === L(i.attributes.name)) || s.headMetaHttpEquiv && void 0 !== i.attributes["http-equiv"] || s.headMetaAuthorship && ("author" === L(i.attributes.name) || "generator" === L(i.attributes.name) || "framework" === L(i.attributes.name) || "publisher" === L(i.attributes.name) || "progid" === L(i.attributes.name) || L(i.attributes.property).match(/^article:/) || L(i.attributes.property).match(/^product:/)) || s.headMetaVerification && ("google-site-verification" === L(i.attributes.name) || "yandex-verification" === L(i.attributes.name) || "csrf-token" === L(i.attributes.name) || "p:domain_verify" === L(i.attributes.name) || "verify-v1" === L(i.attributes.name) || "verification" === L(i.attributes.name) || "shopify-checkout-api-token" === L(i.attributes.name))))) && (et || er.type !== S.Text || er.isStyle || er.textContent.replace(/^\s+|\s+$/gm, "").length)) ? b() : v;
        var en = Object.assign(er, {
            id: l
        });
        if (d.add(e, en), l === v) return null;
        Z && Z(e);
        var eo = !$;
        if (en.type === S.Element) {
            eo = eo && !en.needBlock, delete en.needBlock;
            var ea = e.shadowRoot;
            ea && n(ea) && (en.isShadowHost = !0)
        }
        if ((en.type === S.Document || en.type === S.Element) && eo) {
            F.headWhitespace && en.type === S.Element && "head" === en.tagName && (et = !1);
            for (var ei = {
                    doc: c,
                    mirror: d,
                    blockClass: u,
                    blockSelector: h,
                    maskTextClass: p,
                    maskTextSelector: g,
                    skipChild: $,
                    inlineStylesheet: E,
                    maskInputOptions: R,
                    maskTextFn: x,
                    maskInputFn: A,
                    slimDOMOptions: F,
                    dataURLOptions: G,
                    inlineImages: U,
                    recordCanvas: V,
                    preserveWhiteSpace: et,
                    onSerialize: Z,
                    onIframeLoad: B,
                    iframeLoadTimeout: X,
                    onStylesheetLoad: Y,
                    stylesheetLoadTimeout: K,
                    keepIframeSrcFn: Q
                }, es = 0, el = Array.from(e.childNodes); es < el.length; es++) {
                var ec = el[es],
                    ed = _(ec, ei);
                ed && en.childNodes.push(ed)
            }
            if (t(e) && e.shadowRoot)
                for (var eu = 0, eh = Array.from(e.shadowRoot.childNodes); eu < eh.length; eu++) {
                    var ec = eh[eu],
                        ed = _(ec, ei);
                    ed && (n(e.shadowRoot) && (ed.isShadow = !0), en.childNodes.push(ed))
                }
        }
        return e.parentNode && r(e.parentNode) && n(e.parentNode) && (en.isShadow = !0), en.type === S.Element && "iframe" === en.tagName && function e(t, r, n) {
            var o = t.contentWindow;
            if (o) {
                var a, i = !1;
                try {
                    a = o.document.readyState
                } catch {
                    return
                }
                if ("complete" !== a) {
                    var s = setTimeout(function() {
                        i || (r(), i = !0)
                    }, n);
                    t.addEventListener("load", function() {
                        clearTimeout(s), i = !0, r()
                    });
                    return
                }
                var l = "about:blank";
                if (o.location.href !== l || t.src === l || "" === t.src) return setTimeout(r, 0), t.addEventListener("load", r);
                t.addEventListener("load", r)
            }
        }(e, function() {
            var t = e.contentDocument;
            if (t && B) {
                var r = _(t, {
                    doc: t,
                    mirror: d,
                    blockClass: u,
                    blockSelector: h,
                    maskTextClass: p,
                    maskTextSelector: g,
                    skipChild: !1,
                    inlineStylesheet: E,
                    maskInputOptions: R,
                    maskTextFn: x,
                    maskInputFn: A,
                    slimDOMOptions: F,
                    dataURLOptions: G,
                    inlineImages: U,
                    recordCanvas: V,
                    preserveWhiteSpace: et,
                    onSerialize: Z,
                    onIframeLoad: B,
                    iframeLoadTimeout: X,
                    onStylesheetLoad: Y,
                    stylesheetLoadTimeout: K,
                    keepIframeSrcFn: Q
                });
                r && B(e, r)
            }
        }, X), en.type === S.Element && "link" === en.tagName && "stylesheet" === en.attributes.rel && function e(t, r, n) {
            var o, a = !1;
            try {
                o = t.sheet
            } catch {
                return
            }
            if (!o) {
                var i = setTimeout(function() {
                    a || (r(), a = !0)
                }, n);
                t.addEventListener("load", function() {
                    clearTimeout(i), a = !0, r()
                })
            }
        }(e, function() {
            if (Y) {
                var t = _(e, {
                    doc: c,
                    mirror: d,
                    blockClass: u,
                    blockSelector: h,
                    maskTextClass: p,
                    maskTextSelector: g,
                    skipChild: !1,
                    inlineStylesheet: E,
                    maskInputOptions: R,
                    maskTextFn: x,
                    maskInputFn: A,
                    slimDOMOptions: F,
                    dataURLOptions: G,
                    inlineImages: U,
                    recordCanvas: V,
                    preserveWhiteSpace: et,
                    onSerialize: Z,
                    onIframeLoad: B,
                    iframeLoadTimeout: X,
                    onStylesheetLoad: Y,
                    stylesheetLoadTimeout: K,
                    keepIframeSrcFn: Q
                });
                t && Y(e, t)
            }
        }, K), en
    }
    var A = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

    function F(e) {
        return e ? e.replace(/^\s+|\s+$/g, "") : ""
    }
    var P = {
            script: "noscript",
            altglyph: "altGlyph",
            altglyphdef: "altGlyphDef",
            altglyphitem: "altGlyphItem",
            animatecolor: "animateColor",
            animatemotion: "animateMotion",
            animatetransform: "animateTransform",
            clippath: "clipPath",
            feblend: "feBlend",
            fecolormatrix: "feColorMatrix",
            fecomponenttransfer: "feComponentTransfer",
            fecomposite: "feComposite",
            feconvolvematrix: "feConvolveMatrix",
            fediffuselighting: "feDiffuseLighting",
            fedisplacementmap: "feDisplacementMap",
            fedistantlight: "feDistantLight",
            fedropshadow: "feDropShadow",
            feflood: "feFlood",
            fefunca: "feFuncA",
            fefuncb: "feFuncB",
            fefuncg: "feFuncG",
            fefuncr: "feFuncR",
            fegaussianblur: "feGaussianBlur",
            feimage: "feImage",
            femerge: "feMerge",
            femergenode: "feMergeNode",
            femorphology: "feMorphology",
            feoffset: "feOffset",
            fepointlight: "fePointLight",
            fespecularlighting: "feSpecularLighting",
            fespotlight: "feSpotLight",
            fetile: "feTile",
            feturbulence: "feTurbulence",
            foreignobject: "foreignObject",
            glyphref: "glyphRef",
            lineargradient: "linearGradient",
            radialgradient: "radialGradient"
        },
        G = /([^\\]):hover/,
        W = RegExp(G.source, "g");

    function U(e, t) {
        var r = t ? .stylesWithHoverClass.get(e);
        if (r) return r;
        var n = function e(t, r) {
            void 0 === r && (r = {});
            var n, o = 1,
                a = 1;

            function i(e) {
                var t = e.match(/\n/g);
                t && (o += t.length);
                var r = e.lastIndexOf(`
`);
                a = -1 === r ? a + e.length : e.length - r
            }

            function s() {
                var e = {
                    line: o,
                    column: a
                };
                return function(t) {
                    return t.position = new l(e), f(), t
                }
            }
            var l = function e(t) {
                this.start = t, this.end = {
                    line: o,
                    column: a
                }, this.source = r.source
            };
            l.prototype.content = t;
            var c = [];

            function d(e) {
                var n = Error("".concat(r.source || "", ":").concat(o, ":").concat(a, ": ").concat(e));
                if (n.reason = e, n.filename = r.source, n.line = o, n.column = a, n.source = t, r.silent) c.push(n);
                else throw n
            }

            function u() {
                return m(/^{\s*/)
            }

            function h() {
                return m(/^}/)
            }

            function p() {
                var e, r = [];
                for (f(), g(r); t.length && "}" !== t.charAt(0) && (e = M() || E());) !1 !== e && (r.push(e), g(r));
                return r
            }

            function m(e) {
                var r = e.exec(t);
                if (r) {
                    var n = r[0];
                    return i(n), t = t.slice(n.length), r
                }
            }

            function f() {
                m(/^\s*/)
            }

            function g(e) {
                void 0 === e && (e = []);
                for (var t; t = y();) !1 !== t && e.push(t), t = y();
                return e
            }

            function y() {
                var e = s();
                if (!("/" !== t.charAt(0) || "*" !== t.charAt(1))) {
                    for (var r = 2;
                        "" !== t.charAt(r) && ("*" !== t.charAt(r) || "/" !== t.charAt(r + 1));) ++r;
                    if (r += 2, "" === t.charAt(r - 1)) return d("End of comment missing");
                    var n = t.slice(2, r - 2);
                    return a += 2, i(n), t = t.slice(r), a += 2, e({
                        type: "comment",
                        comment: n
                    })
                }
            }

            function v() {
                var e = m(/^([^{]+)/);
                if (e) return F(e[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(e) {
                    return e.replace(/,/g, "‌")
                }).split(/\s*(?![^(]*\)),\s*/).map(function(e) {
                    return e.replace(/\u200C/g, ",")
                })
            }

            function b() {
                var e = s(),
                    t = m(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
                if (t) {
                    var r = F(t[0]);
                    if (!m(/^:\s*/)) return d("property missing ':'");
                    var n = m(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),
                        o = e({
                            type: "declaration",
                            property: r.replace(A, ""),
                            value: n ? F(n[0]).replace(A, "") : ""
                        });
                    return m(/^[;\s]*/), o
                }
            }

            function S() {
                var e, t = [];
                if (!u()) return d("missing '{'");
                for (g(t); e = b();) !1 !== e && (t.push(e), g(t)), e = b();
                return h() ? t : d("missing '}'")
            }

            function C() {
                for (var e, t = [], r = s(); e = m(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) t.push(e[1]), m(/^,\s*/);
                if (t.length) return r({
                    type: "keyframe",
                    values: t,
                    declarations: S()
                })
            }
            var I = T("import"),
                N = T("charset"),
                $ = T("namespace");

            function T(e) {
                var t = RegExp("^@" + e + "\\s*([^;]+);");
                return function() {
                    var r = s(),
                        n = m(t);
                    if (n) {
                        var o = {
                            type: e
                        };
                        return o[e] = n[1].trim(), r(o)
                    }
                }
            }

            function M() {
                if ("@" === t[0]) return function e() {
                    var t = s(),
                        r = m(/^@([-\w]+)?keyframes\s*/);
                    if (r) {
                        var n = r[1];
                        if (!(r = m(/^([-\w]+)\s*/))) return d("@keyframes missing name");
                        var o = r[1];
                        if (!u()) return d("@keyframes missing '{'");
                        for (var a, i = g(); a = C();) i.push(a), i = i.concat(g());
                        return h() ? t({
                            type: "keyframes",
                            name: o,
                            vendor: n,
                            keyframes: i
                        }) : d("@keyframes missing '}'")
                    }
                }() || function e() {
                    var t = s(),
                        r = m(/^@media *([^{]+)/);
                    if (r) {
                        var n = F(r[1]);
                        if (!u()) return d("@media missing '{'");
                        var o = g().concat(p());
                        return h() ? t({
                            type: "media",
                            media: n,
                            rules: o
                        }) : d("@media missing '}'")
                    }
                }() || function e() {
                    var t = s(),
                        r = m(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
                    if (r) return t({
                        type: "custom-media",
                        name: F(r[1]),
                        media: F(r[2])
                    })
                }() || function e() {
                    var t = s(),
                        r = m(/^@supports *([^{]+)/);
                    if (r) {
                        var n = F(r[1]);
                        if (!u()) return d("@supports missing '{'");
                        var o = g().concat(p());
                        return h() ? t({
                            type: "supports",
                            supports: n,
                            rules: o
                        }) : d("@supports missing '}'")
                    }
                }() || I() || N() || $() || function e() {
                    var t = s(),
                        r = m(/^@([-\w]+)?document *([^{]+)/);
                    if (r) {
                        var n = F(r[1]),
                            o = F(r[2]);
                        if (!u()) return d("@document missing '{'");
                        var a = g().concat(p());
                        return h() ? t({
                            type: "document",
                            document: o,
                            vendor: n,
                            rules: a
                        }) : d("@document missing '}'")
                    }
                }() || function e() {
                    var t = s();
                    if (m(/^@page */)) {
                        var r = v() || [];
                        if (!u()) return d("@page missing '{'");
                        for (var n, o = g(); n = b();) o.push(n), o = o.concat(g());
                        return h() ? t({
                            type: "page",
                            selectors: r,
                            declarations: o
                        }) : d("@page missing '}'")
                    }
                }() || function e() {
                    var t = s();
                    if (m(/^@host\s*/)) {
                        if (!u()) return d("@host missing '{'");
                        var r = g().concat(p());
                        return h() ? t({
                            type: "host",
                            rules: r
                        }) : d("@host missing '}'")
                    }
                }() || function e() {
                    var t = s();
                    if (m(/^@font-face\s*/)) {
                        if (!u()) return d("@font-face missing '{'");
                        for (var r, n = g(); r = b();) n.push(r), n = n.concat(g());
                        return h() ? t({
                            type: "font-face",
                            declarations: n
                        }) : d("@font-face missing '}'")
                    }
                }()
            }

            function E() {
                var e = s(),
                    t = v();
                return t ? (g(), e({
                    type: "rule",
                    selectors: t,
                    declarations: S()
                })) : d("selector missing")
            }
            return function e(t, r) {
                for (var n = t && "string" == typeof t.type, o = n ? t : r, a = 0, i = Object.keys(t); a < i.length; a++) {
                    var s = t[i[a]];
                    Array.isArray(s) ? s.forEach(function(t) {
                        e(t, o)
                    }) : s && "object" == typeof s && e(s, o)
                }
                return n && Object.defineProperty(t, "parent", {
                    configurable: !0,
                    writable: !0,
                    enumerable: !1,
                    value: r || null
                }), t
            }((n = p(), {
                type: "stylesheet",
                stylesheet: {
                    source: r.source,
                    rules: n,
                    parsingErrors: c
                }
            }))
        }(e, {
            silent: !0
        });
        if (!n.stylesheet) return e;
        var o = [];
        if (n.stylesheet.rules.forEach(function(e) {
                "selectors" in e && (e.selectors || []).forEach(function(e) {
                    G.test(e) && o.push(e)
                })
            }), 0 === o.length) return e;
        var a = RegExp(o.filter(function(e, t) {
                return o.indexOf(e) === t
            }).sort(function(e, t) {
                return t.length - e.length
            }).map(function(e) {
                var t;
                return (t = e).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            }).join("|"), "g"),
            i = e.replace(a, function(e) {
                var t = e.replace(W, "$1.\\:hover");
                return "".concat(e, ", ").concat(t)
            });
        return t ? .stylesWithHoverClass.set(e, i), i
    }

    function z() {
        return {
            stylesWithHoverClass: new Map
        }
    }

    function V(e, r) {
        var n = r.doc,
            o = r.onVisit,
            a = r.hackCss,
            i = r.afterAppend,
            s = r.cache,
            l = r.mirror,
            c = void 0 === l ? new p : l,
            d = function e(r, n) {
                var o = n.doc,
                    a = n.mirror,
                    i = n.skipChild,
                    s = n.hackCss,
                    l = void 0 === s || s,
                    c = n.afterAppend,
                    d = n.cache,
                    u = function e(t, r) {
                        var n = r.doc,
                            o = r.hackCss,
                            a = r.cache;
                        switch (t.type) {
                            case S.Document:
                                return n.implementation.createDocument(null, "", null);
                            case S.DocumentType:
                                return n.implementation.createDocumentType(t.name || "html", t.publicId, t.systemId);
                            case S.Element:
                                var i, s, l, c = ("link" === (s = P[(i = t).tagName] ? P[i.tagName] : i.tagName) && i.attributes._cssText && (s = "style"), s);
                                l = t.isSVG ? n.createElementNS("http://www.w3.org/2000/svg", c) : n.createElement(c);
                                var d = {};
                                for (var u in t.attributes)
                                    if (Object.prototype.hasOwnProperty.call(t.attributes, u)) {
                                        var h = t.attributes[u];
                                        if (!("option" === c && "selected" === u && !1 === h)) {
                                            if (!0 === h && (h = ""), u.startsWith("rr_")) {
                                                d[u] = h;
                                                continue
                                            }
                                            var p = "textarea" === c && "value" === u,
                                                m = "style" === c && "_cssText" === u;
                                            if (m && o && "string" == typeof h && (h = U(h, a)), (p || m) && "string" == typeof h) {
                                                for (var f = n.createTextNode(h), g = 0, y = Array.from(l.childNodes); g < y.length; g++) {
                                                    var v = y[g];
                                                    v.nodeType === l.TEXT_NODE && l.removeChild(v)
                                                }
                                                l.appendChild(f);
                                                continue
                                            }
                                            try {
                                                if (t.isSVG && "xlink:href" === u) l.setAttributeNS("http://www.w3.org/1999/xlink", u, h.toString());
                                                else if ("onload" === u || "onclick" === u || "onmouse" === u.substring(0, 7)) l.setAttribute("_" + u, h.toString());
                                                else if ("meta" === c && "Content-Security-Policy" === t.attributes["http-equiv"] && "content" === u) {
                                                    l.setAttribute("csp-content", h.toString());
                                                    continue
                                                } else "link" === c && "preload" === t.attributes.rel && "script" === t.attributes.as || "link" === c && "prefetch" === t.attributes.rel && "string" == typeof t.attributes.href && t.attributes.href.endsWith(".js") || ("img" === c && t.attributes.srcset && t.attributes.rr_dataURL ? l.setAttribute("rrweb-original-srcset", t.attributes.srcset) : l.setAttribute(u, h.toString()))
                                            } catch {}
                                        }
                                    }
                                for (var b in d) ! function(e) {
                                    var r = d[e];
                                    if ("canvas" === c && "rr_dataURL" === e) {
                                        var n = document.createElement("img");
                                        n.onload = function() {
                                            var e = l.getContext("2d");
                                            e && e.drawImage(n, 0, 0, n.width, n.height)
                                        }, n.src = r.toString(), l.RRNodeType && (l.rr_dataURL = r.toString())
                                    } else if ("img" === c && "rr_dataURL" === e) {
                                        var o = l;
                                        o.currentSrc.startsWith("data:") || (o.setAttribute("rrweb-original-src", t.attributes.src), o.src = r.toString())
                                    }
                                    if ("rr_width" === e) l.style.width = r.toString();
                                    else if ("rr_height" === e) l.style.height = r.toString();
                                    else if ("rr_mediaCurrentTime" === e && "number" == typeof r) l.currentTime = r;
                                    else if ("rr_mediaState" === e) switch (r) {
                                        case "played":
                                            l.play().catch(function(e) {
                                                return console.warn("media playback error", e)
                                            });
                                            break;
                                        case "paused":
                                            l.pause()
                                    }
                                }(b);
                                if (t.isShadowHost) {
                                    if (l.shadowRoot)
                                        for (; l.shadowRoot.firstChild;) l.shadowRoot.removeChild(l.shadowRoot.firstChild);
                                    else l.attachShadow({
                                        mode: "open"
                                    })
                                }
                                return l;
                            case S.Text:
                                return n.createTextNode(t.isStyle && o ? U(t.textContent, a) : t.textContent);
                            case S.CDATA:
                                return n.createCDATASection(t.textContent);
                            case S.Comment:
                                return n.createComment(t.textContent);
                            default:
                                return null
                        }
                    }(r, {
                        doc: o,
                        hackCss: l,
                        cache: d
                    });
                if (!u) return null;
                if (r.rootId && a.getNode(r.rootId) !== o && a.replace(r.rootId, o), r.type === S.Document && (o.close(), o.open(), "BackCompat" === r.compatMode && r.childNodes && r.childNodes[0].type !== S.DocumentType && (r.childNodes[0].type === S.Element && "xmlns" in r.childNodes[0].attributes && "http://www.w3.org/1999/xhtml" === r.childNodes[0].attributes.xmlns ? o.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">') : o.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">')), u = o), a.add(u, r), (r.type === S.Document || r.type === S.Element) && !(void 0 !== i && i))
                    for (var h = 0, p = r.childNodes; h < p.length; h++) {
                        var m = p[h],
                            f = e(m, {
                                doc: o,
                                mirror: a,
                                skipChild: !1,
                                hackCss: l,
                                afterAppend: c,
                                cache: d
                            });
                        if (!f) {
                            console.warn("Failed to rebuild", m);
                            continue
                        }
                        m.isShadow && t(u) && u.shadowRoot ? u.shadowRoot.appendChild(f) : u.appendChild(f), c && c(f, m.id)
                    }
                return u
            }(e, {
                doc: n,
                mirror: c,
                skipChild: !1,
                hackCss: void 0 === a || a,
                afterAppend: i,
                cache: s
            });
        return function e(t, r) {
            function n(e) {
                r(e)
            }
            for (var o = 0, a = t.getIds(); o < a.length; o++) {
                var i, s = a[o];
                t.has(s) && r(i = t.getNode(s))
            }
        }(c, function(e) {
            o && o(e),
                function e(t, r) {
                    var n = r.getMeta(t);
                    if (n ? .type === S.Element) {
                        var o = t;
                        for (var a in n.attributes)
                            if (Object.prototype.hasOwnProperty.call(n.attributes, a) && a.startsWith("rr_")) {
                                var i = n.attributes[a];
                                "rr_scrollLeft" === a && (o.scrollLeft = i), "rr_scrollTop" === a && (o.scrollTop = i)
                            }
                    }
                }(e, c)
        }), d
    }

    function Z(e, t, r = document) {
        let n = {
            capture: !0,
            passive: !0
        };
        return r.addEventListener(e, t, n), () => r.removeEventListener(e, t, n)
    }
    let B = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;

    function H(e, t, r = {}) {
        let n = null,
            o = 0;
        return function(...a) {
            let i = Date.now();
            o || !1 !== r.leading || (o = i);
            let s = t - (i - o),
                l = this;
            s <= 0 || s > t ? (n && (clearTimeout(n), n = null), o = i, e.apply(l, a)) : n || !1 === r.trailing || (n = setTimeout(() => {
                o = !1 === r.leading ? 0 : Date.now(), n = null, e.apply(l, a)
            }, s))
        }
    }

    function X(e, t, r, n, o = window) {
        let a = o.Object.getOwnPropertyDescriptor(e, t);
        return o.Object.defineProperty(e, t, n ? r : {
            set(e) {
                setTimeout(() => {
                    r.set.call(this, e)
                }, 0), a && a.set && a.set.call(this, e)
            }
        }), () => X(e, t, a || {}, !0)
    }

    function Y(e, t, r) {
        try {
            if (!(t in e)) return () => {};
            let n = e[t],
                o = r(n);
            return "function" == typeof o && (o.prototype = o.prototype || {}, Object.defineProperties(o, {
                __rrweb_original__: {
                    enumerable: !1,
                    value: n
                }
            })), e[t] = o, () => {
                e[t] = n
            }
        } catch {
            return () => {}
        }
    }

    function j() {
        return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
    }

    function K() {
        return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
    }

    function J(e, t, r, n) {
        if (!e) return !1;
        let o = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
        if (!o) return !1;
        if ("string" == typeof t) {
            if (o.classList.contains(t) || n && null !== o.closest("." + t)) return !0
        } else if (x(o, t, n)) return !0;
        return !!(r && (e.matches(r) || n && null !== o.closest(r)))
    }

    function Q(e, t) {
        return -1 !== t.getId(e)
    }

    function q(e, t) {
        return t.getId(e) === v
    }

    function ee(e, t) {
        if (r(e)) return !1;
        let n = t.getId(e);
        return !t.has(n) || (!e.parentNode || e.parentNode.nodeType !== e.DOCUMENT_NODE) && (!e.parentNode || ee(e.parentNode, t))
    }

    function et(e) {
        return Boolean(e.changedTouches)
    }

    function er(e = window) {
        "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach), Node.prototype.contains || (Node.prototype.contains = (...e) => {
            let t = e[0];
            if (!(0 in e)) throw TypeError("1 argument is required");
            do
                if (this === t) return !0; while (t = t && t.parentNode);
            return !1
        })
    }

    function en(e, t) {
        return Boolean("IFRAME" === e.nodeName && t.getMeta(e))
    }

    function eo(e, t) {
        return Boolean("LINK" === e.nodeName && e.nodeType === e.ELEMENT_NODE && e.getAttribute && "stylesheet" === e.getAttribute("rel") && t.getMeta(e))
    }

    function ea(e) {
        return Boolean(e ? .shadowRoot)
    }
    e.mirror = {
        map: {},
        getId: () => (console.error(B), -1),
        getNode: () => (console.error(B), null),
        removeNodeFromMap() {
            console.error(B)
        },
        has: () => (console.error(B), !1),
        reset() {
            console.error(B)
        }
    }, "u" > typeof window && window.Proxy && window.Reflect && (e.mirror = new Proxy(e.mirror, {
        get: (e, t, r) => ("map" === t && console.error(B), Reflect.get(e, t, r))
    }));
    class ei {
        constructor() {
            this.id = 1, this.styleIDMap = new WeakMap, this.idStyleMap = new Map
        }
        getId(e) {
            var t;
            return null != (t = this.styleIDMap.get(e)) ? t : -1
        }
        has(e) {
            return this.styleIDMap.has(e)
        }
        add(e, t) {
            if (this.has(e)) return this.getId(e);
            let r;
            return r = void 0 === t ? this.id++ : t, this.styleIDMap.set(e, r), this.idStyleMap.set(r, e), r
        }
        getStyle(e) {
            return this.idStyleMap.get(e) || null
        }
        reset() {
            this.styleIDMap = new WeakMap, this.idStyleMap = new Map, this.id = 1
        }
        generateId() {
            return this.id++
        }
    }
    var es, el, ec, ed, eu, eh, ep = Object.freeze({
            __proto__: null,
            on: Z,
            get _mirror() {
                return e.mirror
            },
            throttle: H,
            hookSetter: X,
            patch: Y,
            getWindowHeight: j,
            getWindowWidth: K,
            isBlocked: J,
            isSerialized: Q,
            isIgnored: q,
            isAncestorRemoved: ee,
            isTouchEvent: et,
            polyfill: er,
            queueToResolveTrees: function e(t) {
                let r = {},
                    n = (e, t) => {
                        let n = {
                            value: e,
                            parent: t,
                            children: []
                        };
                        return r[e.node.id] = n, n
                    },
                    o = [];
                for (let a of t) {
                    let {
                        nextId: i,
                        parentId: s
                    } = a;
                    if (i && i in r) {
                        let l = r[i];
                        if (l.parent) {
                            let c = l.parent.children.indexOf(l);
                            l.parent.children.splice(c, 0, n(a, l.parent))
                        } else {
                            let d = o.indexOf(l);
                            o.splice(d, 0, n(a, null))
                        }
                        continue
                    }
                    if (s in r) {
                        let u = r[s];
                        u.children.push(n(a, u));
                        continue
                    }
                    o.push(n(a, null))
                }
                return o
            },
            iterateResolveTree: function e(t, r) {
                r(t.value);
                for (let n = t.children.length - 1; n >= 0; n--) e(t.children[n], r)
            },
            isSerializedIframe: en,
            isSerializedStylesheet: eo,
            getBaseDimension: function e(t, r) {
                var n, o;
                let a = null == (o = null == (n = t.ownerDocument) ? void 0 : n.defaultView) ? void 0 : o.frameElement;
                if (!a || a === r) return {
                    x: 0,
                    y: 0,
                    relativeScale: 1,
                    absoluteScale: 1
                };
                let i = a.getBoundingClientRect(),
                    s = e(a, r),
                    l = i.height / a.clientHeight;
                return {
                    x: i.x * s.relativeScale + s.x,
                    y: i.y * s.relativeScale + s.y,
                    relativeScale: l,
                    absoluteScale: s.absoluteScale * l
                }
            },
            hasShadowRoot: ea,
            getNestedRule: function e(t, r) {
                let n = t[r[0]];
                return 1 === r.length ? n : e(n.cssRules[r[1]].cssRules, r.slice(2))
            },
            getPositionsAndIndex: function e(t) {
                let r = [...t],
                    n = r.pop();
                return {
                    positions: r,
                    index: n
                }
            },
            uniqueTextMutations: function e(t) {
                let r = new Set,
                    n = [];
                for (let o = t.length; o--;) {
                    let a = t[o];
                    r.has(a.id) || (n.push(a), r.add(a.id))
                }
                return n
            },
            StyleSheetMirror: ei
        }),
        em = ((es = em || {})[es.DomContentLoaded = 0] = "DomContentLoaded", es[es.Load = 1] = "Load", es[es.FullSnapshot = 2] = "FullSnapshot", es[es.IncrementalSnapshot = 3] = "IncrementalSnapshot", es[es.Meta = 4] = "Meta", es[es.Custom = 5] = "Custom", es[es.Plugin = 6] = "Plugin", es),
        ef = ((el = ef || {})[el.Mutation = 0] = "Mutation", el[el.MouseMove = 1] = "MouseMove", el[el.MouseInteraction = 2] = "MouseInteraction", el[el.Scroll = 3] = "Scroll", el[el.ViewportResize = 4] = "ViewportResize", el[el.Input = 5] = "Input", el[el.TouchMove = 6] = "TouchMove", el[el.MediaInteraction = 7] = "MediaInteraction", el[el.StyleSheetRule = 8] = "StyleSheetRule", el[el.CanvasMutation = 9] = "CanvasMutation", el[el.Font = 10] = "Font", el[el.Log = 11] = "Log", el[el.Drag = 12] = "Drag", el[el.StyleDeclaration = 13] = "StyleDeclaration", el[el.Selection = 14] = "Selection", el[el.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", el),
        eg = ((ec = eg || {})[ec.MouseUp = 0] = "MouseUp", ec[ec.MouseDown = 1] = "MouseDown", ec[ec.Click = 2] = "Click", ec[ec.ContextMenu = 3] = "ContextMenu", ec[ec.DblClick = 4] = "DblClick", ec[ec.Focus = 5] = "Focus", ec[ec.Blur = 6] = "Blur", ec[ec.TouchStart = 7] = "TouchStart", ec[ec.TouchMove_Departed = 8] = "TouchMove_Departed", ec[ec.TouchEnd = 9] = "TouchEnd", ec[ec.TouchCancel = 10] = "TouchCancel", ec),
        ey = ((ed = ey || {})[ed["2D"] = 0] = "2D", ed[ed.WebGL = 1] = "WebGL", ed[ed.WebGL2 = 2] = "WebGL2", ed),
        ev = ((eu = ev || {})[eu.Play = 0] = "Play", eu[eu.Pause = 1] = "Pause", eu[eu.Seeked = 2] = "Seeked", eu[eu.VolumeChange = 3] = "VolumeChange", eu[eu.RateChange = 4] = "RateChange", eu),
        eb = ((eh = eb || {}).Start = "start", eh.Pause = "pause", eh.Resume = "resume", eh.Resize = "resize", eh.Finish = "finish", eh.FullsnapshotRebuilded = "fullsnapshot-rebuilded", eh.LoadStylesheetStart = "load-stylesheet-start", eh.LoadStylesheetEnd = "load-stylesheet-end", eh.SkipStart = "skip-start", eh.SkipEnd = "skip-end", eh.MouseInteraction = "mouse-interaction", eh.EventCast = "event-cast", eh.CustomEvent = "custom-event", eh.Flush = "flush", eh.StateChange = "state-change", eh.PlayBack = "play-back", eh.Destroy = "destroy", eh);

    function eS(e) {
        return "__ln" in e
    }
    class eC {
        constructor() {
            this.length = 0, this.head = null
        }
        get(e) {
            if (e >= this.length) throw Error("Position outside of list range");
            let t = this.head;
            for (let r = 0; r < e; r++) t = t ? .next || null;
            return t
        }
        addNode(e) {
            let t = {
                value: e,
                previous: null,
                next: null
            };
            if (e.__ln = t, e.previousSibling && eS(e.previousSibling)) {
                let r = e.previousSibling.__ln.next;
                t.next = r, t.previous = e.previousSibling.__ln, e.previousSibling.__ln.next = t, r && (r.previous = t)
            } else if (e.nextSibling && eS(e.nextSibling) && e.nextSibling.__ln.previous) {
                let n = e.nextSibling.__ln.previous;
                t.previous = n, t.next = e.nextSibling.__ln, e.nextSibling.__ln.previous = t, n && (n.next = t)
            } else this.head && (this.head.previous = t), t.next = this.head, this.head = t;
            this.length++
        }
        removeNode(e) {
            let t = e.__ln;
            !this.head || (t.previous ? (t.previous.next = t.next, t.next && (t.next.previous = t.previous)) : (this.head = t.next, this.head && (this.head.previous = null)), e.__ln && delete e.__ln, this.length--)
        }
    }
    let eI = (e, t) => `${e}@${t}`;
    class eN {
        constructor() {
            this.frozen = !1, this.locked = !1, this.texts = [], this.attributes = [], this.removes = [], this.mapRemoves = [], this.movedMap = {}, this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.processMutations = e => {
                e.forEach(this.processMutation), this.emit()
            }, this.emit = () => {
                if (this.frozen || this.locked) return;
                let e = [],
                    t = new eC,
                    n = e => {
                        let t = e,
                            r = v;
                        for (; r === v;) r = (t = t && t.nextSibling) && this.mirror.getId(t);
                        return r
                    },
                    o = o => {
                        var a, i, s, l;
                        let c = null;
                        (null == (i = null == (a = o.getRootNode) ? void 0 : a.call(o)) ? void 0 : i.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && o.getRootNode().host && (c = o.getRootNode().host);
                        let d = c;
                        for (;
                            (null == (l = null == (s = d ? .getRootNode) ? void 0 : s.call(d)) ? void 0 : l.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && d.getRootNode().host;) d = d.getRootNode().host;
                        let u = !this.doc.contains(o) && (!d || !this.doc.contains(d));
                        if (!o.parentNode || u) return;
                        let h = r(o.parentNode) ? this.mirror.getId(c) : this.mirror.getId(o.parentNode),
                            p = n(o);
                        if (-1 === h || -1 === p) return t.addNode(o);
                        let m = _(o, {
                            doc: this.doc,
                            mirror: this.mirror,
                            blockClass: this.blockClass,
                            blockSelector: this.blockSelector,
                            maskTextClass: this.maskTextClass,
                            maskTextSelector: this.maskTextSelector,
                            skipChild: !0,
                            newlyAddedElement: !0,
                            inlineStylesheet: this.inlineStylesheet,
                            maskInputOptions: this.maskInputOptions,
                            maskTextFn: this.maskTextFn,
                            maskInputFn: this.maskInputFn,
                            slimDOMOptions: this.slimDOMOptions,
                            dataURLOptions: this.dataURLOptions,
                            recordCanvas: this.recordCanvas,
                            inlineImages: this.inlineImages,
                            onSerialize: e => {
                                en(e, this.mirror) && this.iframeManager.addIframe(e), eo(e, this.mirror) && this.stylesheetManager.trackLinkElement(e), ea(o) && this.shadowDomManager.addShadowRoot(o.shadowRoot, this.doc)
                            },
                            onIframeLoad: (e, t) => {
                                this.iframeManager.attachIframe(e, t), this.shadowDomManager.observeAttachShadow(e)
                            },
                            onStylesheetLoad: (e, t) => {
                                this.stylesheetManager.attachLinkElement(e, t)
                            }
                        });
                        m && e.push({
                            parentId: h,
                            nextId: p,
                            node: m
                        })
                    };
                for (; this.mapRemoves.length;) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
                for (let a of Array.from(this.movedSet.values())) eT(this.removes, a, this.mirror) && !this.movedSet.has(a.parentNode) || o(a);
                for (let i of Array.from(this.addedSet.values())) !eM(this.droppedSet, i) && !eT(this.removes, i, this.mirror) || eM(this.movedSet, i) ? o(i) : this.droppedSet.add(i);
                let s = null;
                for (; t.length;) {
                    let l = null;
                    if (s) {
                        let c = this.mirror.getId(s.value.parentNode),
                            d = n(s.value); - 1 !== c && -1 !== d && (l = s)
                    }
                    if (!l)
                        for (let u = t.length - 1; u >= 0; u--) {
                            let h = t.get(u);
                            if (h) {
                                let p = this.mirror.getId(h.value.parentNode);
                                if (-1 === n(h.value)) continue;
                                if (-1 !== p) {
                                    l = h;
                                    break
                                } {
                                    let m = h.value;
                                    if (m.parentNode && m.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                        let f = m.parentNode.host;
                                        if (-1 !== this.mirror.getId(f)) {
                                            l = h;
                                            break
                                        }
                                    }
                                }
                            }
                        }
                    if (!l) {
                        for (; t.head;) t.removeNode(t.head.value);
                        break
                    }
                    s = l.previous, t.removeNode(l.value), o(l.value)
                }
                let g = {
                    texts: this.texts.map(e => ({
                        id: this.mirror.getId(e.node),
                        value: e.value
                    })).filter(e => this.mirror.has(e.id)),
                    attributes: this.attributes.map(e => ({
                        id: this.mirror.getId(e.node),
                        attributes: e.attributes
                    })).filter(e => this.mirror.has(e.id)),
                    removes: this.removes,
                    adds: e
                };
                (g.texts.length || g.attributes.length || g.removes.length || g.adds.length) && (this.texts = [], this.attributes = [], this.removes = [], this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.movedMap = {}, this.mutationCb(g))
            }, this.processMutation = e => {
                if (!q(e.target, this.mirror)) switch (e.type) {
                    case "characterData":
                        {
                            let t = e.target.textContent;J(e.target, this.blockClass, this.blockSelector, !1) || t === e.oldValue || this.texts.push({
                                value: O(e.target, this.maskTextClass, this.maskTextSelector) && t ? this.maskTextFn ? this.maskTextFn(t) : t.replace(/[\S]/g, "*") : t,
                                node: e.target
                            });
                            break
                        }
                    case "attributes":
                        {
                            let o = e.target,
                                a = e.target.getAttribute(e.attributeName);
                            if ("value" === e.attributeName && (a = m({
                                    maskInputOptions: this.maskInputOptions,
                                    tagName: e.target.tagName,
                                    type: e.target.getAttribute("type"),
                                    value: a,
                                    maskInputFn: this.maskInputFn
                                })), J(e.target, this.blockClass, this.blockSelector, !1) || a === e.oldValue) return;
                            let i = this.attributes.find(t => t.node === e.target);
                            if ("IFRAME" === o.tagName && "src" === e.attributeName && !this.keepIframeSrcFn(a)) {
                                if (o.contentDocument) return;
                                e.attributeName = "rr_src"
                            }
                            if (i || (i = {
                                    node: e.target,
                                    attributes: {}
                                }, this.attributes.push(i)), "style" === e.attributeName) {
                                let s = this.doc.createElement("span");
                                e.oldValue && s.setAttribute("style", e.oldValue), (void 0 === i.attributes.style || null === i.attributes.style) && (i.attributes.style = {});
                                let l = i.attributes.style;
                                for (let c of Array.from(o.style)) {
                                    let d = o.style.getPropertyValue(c),
                                        u = o.style.getPropertyPriority(c);
                                    (d !== s.style.getPropertyValue(c) || u !== s.style.getPropertyPriority(c)) && ("" === u ? l[c] = d : l[c] = [d, u])
                                }
                                for (let h of Array.from(s.style)) "" === o.style.getPropertyValue(h) && (l[h] = !1)
                            } else i.attributes[e.attributeName] = D(this.doc, o.tagName, e.attributeName, a);
                            break
                        }
                    case "childList":
                        if (J(e.target, this.blockClass, this.blockSelector, !0)) return;
                        e.addedNodes.forEach(t => this.genAdds(t, e.target)), e.removedNodes.forEach(t => {
                            let o = this.mirror.getId(t),
                                a = r(e.target) ? this.mirror.getId(e.target.host) : this.mirror.getId(e.target);
                            J(e.target, this.blockClass, this.blockSelector, !1) || q(t, this.mirror) || !Q(t, this.mirror) || (this.addedSet.has(t) ? (e$(this.addedSet, t), this.droppedSet.add(t)) : this.addedSet.has(e.target) && -1 === o || ee(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[eI(o, a)] ? e$(this.movedSet, t) : this.removes.push({
                                parentId: a,
                                id: o,
                                isShadow: !!(r(e.target) && n(e.target)) || void 0
                            })), this.mapRemoves.push(t))
                        })
                }
            }, this.genAdds = (e, t) => {
                if (this.mirror.hasNode(e)) {
                    if (q(e, this.mirror)) return;
                    this.movedSet.add(e);
                    let r = null;
                    t && this.mirror.hasNode(t) && (r = this.mirror.getId(t)), r && -1 !== r && (this.movedMap[eI(this.mirror.getId(e), r)] = !0)
                } else this.addedSet.add(e), this.droppedSet.delete(e);
                J(e, this.blockClass, this.blockSelector, !1) || e.childNodes.forEach(e => this.genAdds(e))
            }
        }
        init(e) {
            ["mutationCb", "blockClass", "blockSelector", "maskTextClass", "maskTextSelector", "inlineStylesheet", "maskInputOptions", "maskTextFn", "maskInputFn", "keepIframeSrcFn", "recordCanvas", "inlineImages", "slimDOMOptions", "dataURLOptions", "doc", "mirror", "iframeManager", "stylesheetManager", "shadowDomManager", "canvasManager"].forEach(t => {
                this[t] = e[t]
            })
        }
        freeze() {
            this.frozen = !0, this.canvasManager.freeze()
        }
        unfreeze() {
            this.frozen = !1, this.canvasManager.unfreeze(), this.emit()
        }
        isFrozen() {
            return this.frozen
        }
        lock() {
            this.locked = !0, this.canvasManager.lock()
        }
        unlock() {
            this.locked = !1, this.canvasManager.unlock(), this.emit()
        }
        reset() {
            this.shadowDomManager.reset(), this.canvasManager.reset()
        }
    }

    function e$(e, t) {
        e.delete(t), t.childNodes.forEach(t => e$(e, t))
    }

    function eT(e, t, r) {
        return 0 !== e.length && function e(t, r, n) {
            let {
                parentNode: o
            } = r;
            if (!o) return !1;
            let a = n.getId(o);
            return !!t.some(e => e.id === a) || e(t, o, n)
        }(e, t, r)
    }

    function eM(e, t) {
        return 0 !== e.size && function e(t, r) {
            let {
                parentNode: n
            } = r;
            return !!n && (!!t.has(n) || e(t, n))
        }(e, t)
    }
    var eE = Object.defineProperty,
        ew = Object.defineProperties,
        eR = Object.getOwnPropertyDescriptors,
        ek = Object.getOwnPropertySymbols,
        eD = Object.prototype.hasOwnProperty,
        ex = Object.prototype.propertyIsEnumerable,
        eO = (e, t, r) => t in e ? eE(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r,
        eL = (e, t) => {
            for (var r in t || (t = {})) eD.call(t, r) && eO(e, r, t[r]);
            if (ek)
                for (var r of ek(t)) ex.call(t, r) && eO(e, r, t[r]);
            return e
        },
        e_ = (e, t) => ew(e, eR(t));
    let e8 = [],
        eA = "u" > typeof CSSGroupingRule,
        eF = "u" > typeof CSSMediaRule,
        eP = "u" > typeof CSSSupportsRule,
        eG = "u" > typeof CSSConditionRule;

    function e0(e) {
        try {
            if ("composedPath" in e) {
                let t = e.composedPath();
                if (t.length) return t[0]
            } else if ("path" in e && e.path.length) return e.path[0];
            return e.target
        } catch {
            return e.target
        }
    }

    function eW(e, t) {
        var r, n;
        let o = new eN;
        e8.push(o), o.init(e);
        let a = window.MutationObserver || window.__rrMutationObserver,
            i = null == (n = null == (r = window ? .Zone) ? void 0 : r.__symbol__) ? void 0 : n.call(r, "MutationObserver");
        i && window[i] && (a = window[i]);
        let s = new a(o.processMutations.bind(o));
        return s.observe(t, {
            attributes: !0,
            attributeOldValue: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0
        }), s
    }

    function eU({
        scrollCb: e,
        doc: t,
        mirror: r,
        blockClass: n,
        blockSelector: o,
        sampling: a
    }) {
        let i = H(a => {
            let i = e0(a);
            if (!i || J(i, n, o, !0)) return;
            let s = r.getId(i);
            if (i === t) {
                let l = t.scrollingElement || t.documentElement;
                e({
                    id: s,
                    x: l.scrollLeft,
                    y: l.scrollTop
                })
            } else e({
                id: s,
                x: i.scrollLeft,
                y: i.scrollTop
            })
        }, a.scroll || 100);
        return Z("scroll", i, t)
    }

    function ez(e, t) {
        let r = eL({}, e);
        return t || delete r.userTriggered, r
    }
    let eV = ["INPUT", "TEXTAREA", "SELECT"],
        eZ = new WeakMap;

    function eB(e) {
        return function e(t, r) {
            if (eA && t.parentRule instanceof CSSGroupingRule || eF && t.parentRule instanceof CSSMediaRule || eP && t.parentRule instanceof CSSSupportsRule || eG && t.parentRule instanceof CSSConditionRule) {
                let n = Array.from(t.parentRule.cssRules).indexOf(t);
                r.unshift(n)
            } else if (t.parentStyleSheet) {
                let o = Array.from(t.parentStyleSheet.cssRules).indexOf(t);
                r.unshift(o)
            }
            return r
        }(e, [])
    }

    function eH(e, t, r) {
        let n, o;
        return e ? (e.ownerNode ? n = t.getId(e.ownerNode) : o = r.getId(e), {
            styleId: o,
            id: n
        }) : {}
    }

    function eX({
        mirror: e,
        stylesheetManager: t
    }, r) {
        var n, o, a;
        let i = null;
        i = "#document" === r.nodeName ? e.getId(r) : e.getId(r.host);
        let s = "#document" === r.nodeName ? null == (n = r.defaultView) ? void 0 : n.Document : null == (a = null == (o = r.ownerDocument) ? void 0 : o.defaultView) ? void 0 : a.ShadowRoot,
            l = Object.getOwnPropertyDescriptor(s ? .prototype, "adoptedStyleSheets");
        return null !== i && -1 !== i && s && l ? (Object.defineProperty(r, "adoptedStyleSheets", {
            configurable: l.configurable,
            enumerable: l.enumerable,
            get() {
                var e;
                return null == (e = l.get) ? void 0 : e.call(this)
            },
            set(e) {
                var r;
                let n = null == (r = l.set) ? void 0 : r.call(this, e);
                if (null !== i && -1 !== i) try {
                    t.adoptStyleSheets(e, i)
                } catch {}
                return n
            }
        }), () => {
            Object.defineProperty(r, "adoptedStyleSheets", {
                configurable: l.configurable,
                enumerable: l.enumerable,
                get: l.get,
                set: l.set
            })
        }) : () => {}
    }
    class eY {
        constructor(e) {
            this.generateIdFn = e, this.iframeIdToRemoteIdMap = new WeakMap, this.iframeRemoteIdToIdMap = new WeakMap
        }
        getId(e, t, r, n) {
            let o = r || this.getIdToRemoteIdMap(e),
                a = n || this.getRemoteIdToIdMap(e),
                i = o.get(t);
            return i || (i = this.generateIdFn(), o.set(t, i), a.set(i, t)), i
        }
        getIds(e, t) {
            let r = this.getIdToRemoteIdMap(e),
                n = this.getRemoteIdToIdMap(e);
            return t.map(t => this.getId(e, t, r, n))
        }
        getRemoteId(e, t, r) {
            let n = r || this.getRemoteIdToIdMap(e);
            return "number" != typeof t ? t : n.get(t) || -1
        }
        getRemoteIds(e, t) {
            let r = this.getRemoteIdToIdMap(e);
            return t.map(t => this.getRemoteId(e, t, r))
        }
        reset(e) {
            if (!e) {
                this.iframeIdToRemoteIdMap = new WeakMap, this.iframeRemoteIdToIdMap = new WeakMap;
                return
            }
            this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e)
        }
        getIdToRemoteIdMap(e) {
            let t = this.iframeIdToRemoteIdMap.get(e);
            return t || (t = new Map, this.iframeIdToRemoteIdMap.set(e, t)), t
        }
        getRemoteIdToIdMap(e) {
            let t = this.iframeRemoteIdToIdMap.get(e);
            return t || (t = new Map, this.iframeRemoteIdToIdMap.set(e, t)), t
        }
    }
    class e1 {
        constructor(e) {
            this.iframes = new WeakMap, this.crossOriginIframeMap = new WeakMap, this.crossOriginIframeMirror = new eY(b), this.mutationCb = e.mutationCb, this.wrappedEmit = e.wrappedEmit, this.stylesheetManager = e.stylesheetManager, this.recordCrossOriginIframes = e.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new eY(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = e.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this))
        }
        addIframe(e) {
            this.iframes.set(e, !0), e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e)
        }
        addLoadListener(e) {
            this.loadListener = e
        }
        attachIframe(e, t) {
            var r;
            this.mutationCb({
                adds: [{
                    parentId: this.mirror.getId(e),
                    nextId: null,
                    node: t
                }],
                removes: [],
                texts: [],
                attributes: [],
                isAttachIframe: !0
            }), null == (r = this.loadListener) || r.call(this, e), e.contentDocument && e.contentDocument.adoptedStyleSheets && e.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(e.contentDocument.adoptedStyleSheets, this.mirror.getId(e.contentDocument))
        }
        handleMessage(e) {
            if ("rrweb" === e.data.type) {
                if (!e.source) return;
                let t = this.crossOriginIframeMap.get(e.source);
                if (!t) return;
                let r = this.transformCrossOriginEvent(t, e.data.event);
                r && this.wrappedEmit(r, e.data.isCheckout)
            }
        }
        transformCrossOriginEvent(e, t) {
            var r;
            switch (t.type) {
                case em.FullSnapshot:
                    return this.crossOriginIframeMirror.reset(e), this.crossOriginIframeStyleMirror.reset(e), this.replaceIdOnNode(t.data.node, e), {
                        timestamp: t.timestamp,
                        type: em.IncrementalSnapshot,
                        data: {
                            source: ef.Mutation,
                            adds: [{
                                parentId: this.mirror.getId(e),
                                nextId: null,
                                node: t.data.node
                            }],
                            removes: [],
                            texts: [],
                            attributes: [],
                            isAttachIframe: !0
                        }
                    };
                case em.Meta:
                case em.Load:
                case em.DomContentLoaded:
                    return !1;
                case em.Plugin:
                    return t;
                case em.Custom:
                    return this.replaceIds(t.data.payload, e, ["id", "parentId", "previousId", "nextId"]), t;
                case em.IncrementalSnapshot:
                    switch (t.data.source) {
                        case ef.Mutation:
                            return t.data.adds.forEach(t => {
                                this.replaceIds(t, e, ["parentId", "nextId", "previousId"]), this.replaceIdOnNode(t.node, e)
                            }), t.data.removes.forEach(t => {
                                this.replaceIds(t, e, ["parentId", "id"])
                            }), t.data.attributes.forEach(t => {
                                this.replaceIds(t, e, ["id"])
                            }), t.data.texts.forEach(t => {
                                this.replaceIds(t, e, ["id"])
                            }), t;
                        case ef.Drag:
                        case ef.TouchMove:
                        case ef.MouseMove:
                            return t.data.positions.forEach(t => {
                                this.replaceIds(t, e, ["id"])
                            }), t;
                        case ef.ViewportResize:
                            return !1;
                        case ef.MediaInteraction:
                        case ef.MouseInteraction:
                        case ef.Scroll:
                        case ef.CanvasMutation:
                        case ef.Input:
                            return this.replaceIds(t.data, e, ["id"]), t;
                        case ef.StyleSheetRule:
                        case ef.StyleDeclaration:
                            return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
                        case ef.Font:
                            return t;
                        case ef.Selection:
                            return t.data.ranges.forEach(t => {
                                this.replaceIds(t, e, ["start", "end"])
                            }), t;
                        case ef.AdoptedStyleSheet:
                            return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleIds"]), null == (r = t.data.styles) || r.forEach(t => {
                                this.replaceStyleIds(t, e, ["styleId"])
                            }), t
                    }
            }
        }
        replace(e, t, r, n) {
            for (let o of n)(Array.isArray(t[o]) || "number" == typeof t[o]) && (Array.isArray(t[o]) ? t[o] = e.getIds(r, t[o]) : t[o] = e.getId(r, t[o]));
            return t
        }
        replaceIds(e, t, r) {
            return this.replace(this.crossOriginIframeMirror, e, t, r)
        }
        replaceStyleIds(e, t, r) {
            return this.replace(this.crossOriginIframeStyleMirror, e, t, r)
        }
        replaceIdOnNode(e, t) {
            this.replaceIds(e, t, ["id"]), "childNodes" in e && e.childNodes.forEach(e => {
                this.replaceIdOnNode(e, t)
            })
        }
    }
    var e7 = Object.defineProperty,
        ej = Object.defineProperties,
        e3 = Object.getOwnPropertyDescriptors,
        eK = Object.getOwnPropertySymbols,
        e2 = Object.prototype.hasOwnProperty,
        eJ = Object.prototype.propertyIsEnumerable,
        eQ = (e, t, r) => t in e ? e7(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r,
        e9 = (e, t) => {
            for (var r in t || (t = {})) e2.call(t, r) && eQ(e, r, t[r]);
            if (eK)
                for (var r of eK(t)) eJ.call(t, r) && eQ(e, r, t[r]);
            return e
        },
        e4 = (e, t) => ej(e, e3(t));
    class eq {
        constructor(e) {
            this.shadowDoms = new WeakSet, this.restorePatches = [], this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror;
            let t = this;
            this.restorePatches.push(Y(Element.prototype, "attachShadow", function(e) {
                return function(r) {
                    let n = e.call(this, r);
                    return this.shadowRoot && t.addShadowRoot(this.shadowRoot, this.ownerDocument), n
                }
            }))
        }
        addShadowRoot(e, t) {
            !n(e) || this.shadowDoms.has(e) || (this.shadowDoms.add(e), eW(e4(e9({}, this.bypassOptions), {
                doc: t,
                mutationCb: this.mutationCb,
                mirror: this.mirror,
                shadowDomManager: this
            }), e), eU(e4(e9({}, this.bypassOptions), {
                scrollCb: this.scrollCb,
                doc: e,
                mirror: this.mirror
            })), setTimeout(() => {
                e.adoptedStyleSheets && e.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(e.adoptedStyleSheets, this.mirror.getId(e.host)), eX({
                    mirror: this.mirror,
                    stylesheetManager: this.bypassOptions.stylesheetManager
                }, e)
            }, 0))
        }
        observeAttachShadow(e) {
            if (e.contentWindow) {
                let t = this;
                this.restorePatches.push(Y(e.contentWindow.HTMLElement.prototype, "attachShadow", function(r) {
                    return function(n) {
                        let o = r.call(this, n);
                        return this.shadowRoot && t.addShadowRoot(this.shadowRoot, e.contentDocument), o
                    }
                }))
            }
        }
        reset() {
            this.restorePatches.forEach(e => e()), this.shadowDoms = new WeakSet
        }
    }
    for (var e5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e6 = typeof Uint8Array > "u" ? [] : new Uint8Array(256), te = 0; te < e5.length; te++) e6[e5.charCodeAt(te)] = te;
    var tt = function(e) {
            var t, r = new Uint8Array(e),
                n = r.length,
                o = "";
            for (t = 0; t < n; t += 3) o += e5[r[t] >> 2], o += e5[(3 & r[t]) << 4 | r[t + 1] >> 4], o += e5[(15 & r[t + 1]) << 2 | r[t + 2] >> 6], o += e5[63 & r[t + 2]];
            return n % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : n % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o
        },
        tr = function(e) {
            var t, r, n, o, a, i = .75 * e.length,
                s = e.length,
                l = 0;
            "=" === e[e.length - 1] && (i--, "=" === e[e.length - 2] && i--);
            var c = new ArrayBuffer(i),
                d = new Uint8Array(c);
            for (t = 0; t < s; t += 4) r = e6[e.charCodeAt(t)], n = e6[e.charCodeAt(t + 1)], o = e6[e.charCodeAt(t + 2)], a = e6[e.charCodeAt(t + 3)], d[l++] = r << 2 | n >> 4, d[l++] = (15 & n) << 4 | o >> 2, d[l++] = (3 & o) << 6 | 63 & a;
            return c
        };
    let tn = new Map,
        to = (e, t, r) => {
            var n, o;
            if (!e || !(ti(e, t) || "object" == typeof e)) return;
            let a, i = e.constructor.name,
                s = (n = r, o = i, (a = tn.get(n)) || (a = new Map, tn.set(n, a)), a.has(o) || a.set(o, []), a.get(o)),
                l = s.indexOf(e);
            return -1 === l && (l = s.length, s.push(e)), l
        },
        ta = (e, t, r) => [...e].map(e => (function e(t, r, n) {
            if (t instanceof Array) return t.map(t => e(t, r, n));
            if (null === t) return t;
            if (t instanceof Float32Array || t instanceof Float64Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Uint8Array || t instanceof Uint16Array || t instanceof Int16Array || t instanceof Int8Array || t instanceof Uint8ClampedArray) return {
                rr_type: t.constructor.name,
                args: [Object.values(t)]
            };
            if (t instanceof ArrayBuffer) {
                let o = t.constructor.name,
                    a = tt(t);
                return {
                    rr_type: o,
                    base64: a
                }
            }
            if (t instanceof DataView) return {
                rr_type: t.constructor.name,
                args: [e(t.buffer, r, n), t.byteOffset, t.byteLength]
            };
            if (t instanceof HTMLImageElement) {
                let i = t.constructor.name,
                    {
                        src: s
                    } = t;
                return {
                    rr_type: i,
                    src: s
                }
            }
            if (t instanceof HTMLCanvasElement) {
                let l = t.toDataURL();
                return {
                    rr_type: "HTMLImageElement",
                    src: l
                }
            }
            if (t instanceof ImageData) return {
                rr_type: t.constructor.name,
                args: [e(t.data, r, n), t.width, t.height]
            };
            if (ti(t, r) || "object" == typeof t) {
                let c = t.constructor.name,
                    d = to(t, r, n);
                return {
                    rr_type: c,
                    index: d
                }
            }
            return t
        })(e, t, r)),
        ti = (e, t) => {
            let r = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebGLVertexArrayObjectOES"].filter(e => "function" == typeof t[e]);
            return Boolean(r.find(r => e instanceof t[r]))
        };

    function ts(e, t, r) {
        let n = [];
        try {
            let o = Y(e.HTMLCanvasElement.prototype, "getContext", function(e) {
                return function(n, ...o) {
                    return J(this, t, r, !0) || "__context" in this || (this.__context = n), e.apply(this, [n, ...o])
                }
            });
            n.push(o)
        } catch {
            console.error("failed to patch HTMLCanvasElement.prototype.getContext")
        }
        return () => {
            n.forEach(e => e())
        }
    }

    function tl(e, t, r, n, o, a, i) {
        let s = [],
            l = Object.getOwnPropertyNames(e);
        for (let c of l)
            if (!["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(c)) try {
                if ("function" != typeof e[c]) continue;
                let d = Y(e, c, function(e) {
                    return function(...a) {
                        let s = e.apply(this, a);
                        if (to(s, i, this), !J(this.canvas, n, o, !0)) {
                            let l = ta([...a], i, this),
                                d = {
                                    type: t,
                                    property: c,
                                    args: l
                                };
                            r(this.canvas, d)
                        }
                        return s
                    }
                });
                s.push(d)
            } catch {
                let u = X(e, c, {
                    set(e) {
                        r(this.canvas, {
                            type: t,
                            property: c,
                            args: [e],
                            setter: !0
                        })
                    }
                });
                s.push(u)
            }
        return s
    }
    var tc, td, tu = (tc = !1, function(e) {
            var t, r, n, o, a, i, s, l;
            return td = td || (t = "Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24oKXsidXNlIHN0cmljdCI7Zm9yKHZhciByPSJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvIixwPXR5cGVvZiBVaW50OEFycmF5PiJ1Ij9bXTpuZXcgVWludDhBcnJheSgyNTYpLGY9MDtmPHIubGVuZ3RoO2YrKylwW3IuY2hhckNvZGVBdChmKV09Zjt2YXIgdT1mdW5jdGlvbihzKXt2YXIgZT1uZXcgVWludDhBcnJheShzKSxuLGE9ZS5sZW5ndGgsdD0iIjtmb3Iobj0wO248YTtuKz0zKXQrPXJbZVtuXT4+Ml0sdCs9clsoZVtuXSYzKTw8NHxlW24rMV0+PjRdLHQrPXJbKGVbbisxXSYxNSk8PDJ8ZVtuKzJdPj42XSx0Kz1yW2VbbisyXSY2M107cmV0dXJuIGElMz09PTI/dD10LnN1YnN0cmluZygwLHQubGVuZ3RoLTEpKyI9IjphJTM9PT0xJiYodD10LnN1YnN0cmluZygwLHQubGVuZ3RoLTIpKyI9PSIpLHR9O2NvbnN0IGM9bmV3IE1hcCxsPW5ldyBNYXA7YXN5bmMgZnVuY3Rpb24gdihzLGUsbil7Y29uc3QgYT1gJHtzfS0ke2V9YDtpZigiT2Zmc2NyZWVuQ2FudmFzImluIGdsb2JhbFRoaXMpe2lmKGwuaGFzKGEpKXJldHVybiBsLmdldChhKTtjb25zdCB0PW5ldyBPZmZzY3JlZW5DYW52YXMocyxlKTt0LmdldENvbnRleHQoIjJkIik7Y29uc3QgZz1hd2FpdChhd2FpdCB0LmNvbnZlcnRUb0Jsb2IobikpLmFycmF5QnVmZmVyKCksZD11KGcpO3JldHVybiBsLnNldChhLGQpLGR9ZWxzZSByZXR1cm4iIn1jb25zdCBpPXNlbGY7aS5vbm1lc3NhZ2U9YXN5bmMgZnVuY3Rpb24ocyl7aWYoIk9mZnNjcmVlbkNhbnZhcyJpbiBnbG9iYWxUaGlzKXtjb25zdHtpZDplLGJpdG1hcDpuLHdpZHRoOmEsaGVpZ2h0OnQsZGF0YVVSTE9wdGlvbnM6Z309cy5kYXRhLGQ9dihhLHQsZyksaD1uZXcgT2Zmc2NyZWVuQ2FudmFzKGEsdCk7aC5nZXRDb250ZXh0KCIyZCIpLmRyYXdJbWFnZShuLDAsMCksbi5jbG9zZSgpO2NvbnN0IHc9YXdhaXQgaC5jb252ZXJ0VG9CbG9iKGcpLHk9dy50eXBlLGI9YXdhaXQgdy5hcnJheUJ1ZmZlcigpLG89dShiKTtpZighYy5oYXMoZSkmJmF3YWl0IGQ9PT1vKXJldHVybiBjLnNldChlLG8pLGkucG9zdE1lc3NhZ2Uoe2lkOmV9KTtpZihjLmdldChlKT09PW8pcmV0dXJuIGkucG9zdE1lc3NhZ2Uoe2lkOmV9KTtpLnBvc3RNZXNzYWdlKHtpZDplLHR5cGU6eSxiYXNlNjQ6byx3aWR0aDphLGhlaWdodDp0fSksYy5zZXQoZSxvKX1lbHNlIHJldHVybiBpLnBvc3RNZXNzYWdlKHtpZDpzLmRhdGEuaWR9KX19KSgpOwoK", r = null, n = tc, o = void 0 === r ? null : r, i = (a = function e(t, r) {
                var n = atob(t);
                if (r) {
                    for (var o = new Uint8Array(n.length), a = 0, i = n.length; a < i; ++a) o[a] = n.charCodeAt(a);
                    return String.fromCharCode.apply(null, new Uint16Array(o.buffer))
                }
                return n
            }(t, void 0 !== n && n)).indexOf(`
`, 10) + 1, s = a.substring(i) + (o ? "//# sourceMappingURL=" + o : ""), l = new Blob([s], {
                type: "application/javascript"
            }), URL.createObjectURL(l)), new Worker(td, e)
        }),
        th = Object.getOwnPropertySymbols,
        tp = Object.prototype.hasOwnProperty,
        tm = Object.prototype.propertyIsEnumerable,
        tf = (e, t) => {
            var r = {};
            for (var n in e) tp.call(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
            if (null != e && th)
                for (var n of th(e)) 0 > t.indexOf(n) && tm.call(e, n) && (r[n] = e[n]);
            return r
        },
        tg = (e, t, r) => new Promise((n, o) => {
            var a = e => {
                    try {
                        s(r.next(e))
                    } catch (t) {
                        o(t)
                    }
                },
                i = e => {
                    try {
                        s(r.throw(e))
                    } catch (t) {
                        o(t)
                    }
                },
                s = e => e.done ? n(e.value) : Promise.resolve(e.value).then(a, i);
            s((r = r.apply(e, t)).next())
        });
    class ty {
        constructor(e) {
            this.pendingCanvasMutations = new Map, this.rafStamps = {
                latestId: 0,
                invokeId: null
            }, this.frozen = !1, this.locked = !1, this.processMutation = (e, t) => {
                (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(e) || this.pendingCanvasMutations.set(e, []), this.pendingCanvasMutations.get(e).push(t)
            };
            let {
                sampling: t = "all",
                win: r,
                blockClass: n,
                blockSelector: o,
                recordCanvas: a,
                dataURLOptions: i
            } = e;
            this.mutationCb = e.mutationCb, this.mirror = e.mirror, a && "all" === t && this.initCanvasMutationObserver(r, n, o), a && "number" == typeof t && this.initCanvasFPSObserver(t, r, n, o, {
                dataURLOptions: i
            })
        }
        reset() {
            this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers()
        }
        freeze() {
            this.frozen = !0
        }
        unfreeze() {
            this.frozen = !1
        }
        lock() {
            this.locked = !0
        }
        unlock() {
            this.locked = !1
        }
        initCanvasFPSObserver(e, t, r, n, o) {
            let a = ts(t, r, n),
                i = new Map,
                s = new tu;
            s.onmessage = e => {
                let {
                    id: t
                } = e.data;
                if (i.set(t, !1), !("base64" in e.data)) return;
                let {
                    base64: r,
                    type: n,
                    width: o,
                    height: a
                } = e.data;
                this.mutationCb({
                    id: t,
                    type: ey["2D"],
                    commands: [{
                        property: "clearRect",
                        args: [0, 0, o, a]
                    }, {
                        property: "drawImage",
                        args: [{
                            rr_type: "ImageBitmap",
                            args: [{
                                rr_type: "Blob",
                                data: [{
                                    rr_type: "ArrayBuffer",
                                    base64: r
                                }],
                                type: n
                            }]
                        }, 0, 0]
                    }]
                })
            };
            let l = 1e3 / e,
                c = 0,
                d, u = () => {
                    let e = [];
                    return t.document.querySelectorAll("canvas").forEach(t => {
                        J(t, r, n, !0) || e.push(t)
                    }), e
                },
                h = e => {
                    if (c && e - c < l) {
                        d = requestAnimationFrame(h);
                        return
                    }
                    c = e, u().forEach(e => tg(this, null, function*() {
                        var t;
                        let r = this.mirror.getId(e);
                        if (i.get(r)) return;
                        if (i.set(r, !0), ["webgl", "webgl2"].includes(e.__context)) {
                            let n = e.getContext(e.__context);
                            (null == (t = n ? .getContextAttributes()) ? void 0 : t.preserveDrawingBuffer) === !1 && n ? .clear(n.COLOR_BUFFER_BIT)
                        }
                        let a = yield createImageBitmap(e);
                        s.postMessage({
                            id: r,
                            bitmap: a,
                            width: e.width,
                            height: e.height,
                            dataURLOptions: o.dataURLOptions
                        }, [a])
                    })), d = requestAnimationFrame(h)
                };
            d = requestAnimationFrame(h), this.resetObservers = () => {
                a(), cancelAnimationFrame(d)
            }
        }
        initCanvasMutationObserver(e, t, r) {
            this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
            let n = ts(e, t, r),
                o = function e(t, r, n, o) {
                    let a = [],
                        i = Object.getOwnPropertyNames(r.CanvasRenderingContext2D.prototype);
                    for (let s of i) try {
                        if ("function" != typeof r.CanvasRenderingContext2D.prototype[s]) continue;
                        let l = Y(r.CanvasRenderingContext2D.prototype, s, function(e) {
                            return function(...a) {
                                return J(this.canvas, n, o, !0) || setTimeout(() => {
                                    let e = ta([...a], r, this);
                                    t(this.canvas, {
                                        type: ey["2D"],
                                        property: s,
                                        args: e
                                    })
                                }, 0), e.apply(this, a)
                            }
                        });
                        a.push(l)
                    } catch {
                        let c = X(r.CanvasRenderingContext2D.prototype, s, {
                            set(e) {
                                t(this.canvas, {
                                    type: ey["2D"],
                                    property: s,
                                    args: [e],
                                    setter: !0
                                })
                            }
                        });
                        a.push(c)
                    }
                    return () => {
                        a.forEach(e => e())
                    }
                }(this.processMutation.bind(this), e, t, r),
                a = function e(t, r, n, o, a) {
                    let i = [];
                    return i.push(...tl(r.WebGLRenderingContext.prototype, ey.WebGL, t, n, o, a, r)), "u" > typeof r.WebGL2RenderingContext && i.push(...tl(r.WebGL2RenderingContext.prototype, ey.WebGL2, t, n, o, a, r)), () => {
                        i.forEach(e => e())
                    }
                }(this.processMutation.bind(this), e, t, r, this.mirror);
            this.resetObservers = () => {
                n(), o(), a()
            }
        }
        startPendingCanvasMutationFlusher() {
            requestAnimationFrame(() => this.flushPendingCanvasMutations())
        }
        startRAFTimestamping() {
            let e = t => {
                this.rafStamps.latestId = t, requestAnimationFrame(e)
            };
            requestAnimationFrame(e)
        }
        flushPendingCanvasMutations() {
            this.pendingCanvasMutations.forEach((e, t) => {
                let r = this.mirror.getId(t);
                this.flushPendingCanvasMutationFor(t, r)
            }), requestAnimationFrame(() => this.flushPendingCanvasMutations())
        }
        flushPendingCanvasMutationFor(e, t) {
            if (this.frozen || this.locked) return;
            let r = this.pendingCanvasMutations.get(e);
            if (!r || -1 === t) return;
            let n = r.map(e => tf(e, ["type"])),
                {
                    type: o
                } = r[0];
            this.mutationCb({
                id: t,
                type: o,
                commands: n
            }), this.pendingCanvasMutations.delete(e)
        }
    }
    class tv {
        constructor(e) {
            this.trackedLinkElements = new WeakSet, this.styleMirror = new ei, this.mutationCb = e.mutationCb, this.adoptedStyleSheetCb = e.adoptedStyleSheetCb
        }
        attachLinkElement(e, t) {
            "_cssText" in t.attributes && this.mutationCb({
                adds: [],
                removes: [],
                texts: [],
                attributes: [{
                    id: t.id,
                    attributes: t.attributes
                }]
            }), this.trackLinkElement(e)
        }
        trackLinkElement(e) {
            this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e))
        }
        adoptStyleSheets(e, t) {
            if (0 === e.length) return;
            let r = {
                    id: t,
                    styleIds: []
                },
                n = [];
            for (let o of e) {
                let i;
                if (this.styleMirror.has(o)) i = this.styleMirror.getId(o);
                else {
                    i = this.styleMirror.add(o);
                    let s = Array.from(o.rules || CSSRule);
                    n.push({
                        styleId: i,
                        rules: s.map((e, t) => ({
                            rule: a(e),
                            index: t
                        }))
                    })
                }
                r.styleIds.push(i)
            }
            n.length > 0 && (r.styles = n), this.adoptedStyleSheetCb(r)
        }
        reset() {
            this.styleMirror.reset(), this.trackedLinkElements = new WeakSet
        }
        trackStylesheetInLinkElement(e) {}
    }
    var tb = Object.defineProperty,
        tS = Object.defineProperties,
        tC = Object.getOwnPropertyDescriptors,
        tI = Object.getOwnPropertySymbols,
        tN = Object.prototype.hasOwnProperty,
        t$ = Object.prototype.propertyIsEnumerable,
        tT = (e, t, r) => t in e ? tb(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r,
        tM = (e, t) => {
            for (var r in t || (t = {})) tN.call(t, r) && tT(e, r, t[r]);
            if (tI)
                for (var r of tI(t)) t$.call(t, r) && tT(e, r, t[r]);
            return e
        },
        tE = (e, t) => tS(e, tC(t));

    function tw(e) {
        return tE(tM({}, e), {
            timestamp: Date.now()
        })
    }
    let tR, tk, tD, tx = !1,
        tO = new p;

    function tL(e = {}) {
        let {
            emit: t,
            checkoutEveryNms: r,
            checkoutEveryNth: n,
            blockClass: o = "rr-block",
            blockSelector: a = null,
            ignoreClass: i = "rr-ignore",
            maskTextClass: s = "rr-mask",
            maskTextSelector: l = null,
            inlineStylesheet: c = !0,
            maskAllInputs: d,
            maskInputOptions: u,
            slimDOMOptions: h,
            maskInputFn: f,
            maskTextFn: g,
            hooks: y,
            packFn: v,
            sampling: b = {},
            dataURLOptions: S = {},
            mousemoveWait: C,
            recordCanvas: I = !1,
            recordCrossOriginIframes: N = !1,
            userTriggeredOnInput: $ = !1,
            collectFonts: T = !1,
            inlineImages: M = !1,
            plugins: E,
            keepIframeSrcFn: w = () => !1,
            ignoreCSSAttributes: R = new Set([])
        } = e, k = !N || window.parent === window, D = !1;
        if (!k) try {
            window.parent.document, D = !1
        } catch {
            D = !0
        }
        if (k && !t) throw Error("emit function is required");
        void 0 !== C && void 0 === b.mousemove && (b.mousemove = C), tO.reset();
        let x = !0 === d ? {
                color: !0,
                date: !0,
                "datetime-local": !0,
                email: !0,
                month: !0,
                number: !0,
                range: !0,
                search: !0,
                tel: !0,
                text: !0,
                time: !0,
                url: !0,
                week: !0,
                textarea: !0,
                select: !0,
                password: !0
            } : void 0 !== u ? u : {
                password: !0
            },
            O = !0 === h || "all" === h ? {
                script: !0,
                comment: !0,
                headFavicon: !0,
                headWhitespace: !0,
                headMetaSocial: !0,
                headMetaRobots: !0,
                headMetaHttpEquiv: !0,
                headMetaVerification: !0,
                headMetaAuthorship: "all" === h,
                headMetaDescKeywords: "all" === h
            } : h || {};
        er();
        let L, A = 0,
            F = e => {
                for (let t of E || []) t.eventProcessor && (e = t.eventProcessor(e));
                return v && (e = v(e)), e
            };
        tR = (e, o) => {
            var a;
            if ((null == (a = e8[0]) ? void 0 : a.isFrozen()) && e.type !== em.FullSnapshot && !(e.type === em.IncrementalSnapshot && e.data.source === ef.Mutation) && e8.forEach(e => e.unfreeze()), k) t ? .(F(e), o);
            else if (D) {
                let i = {
                    type: "rrweb",
                    event: F(e),
                    isCheckout: o
                };
                window.parent.postMessage(i, "*")
            }
            if (e.type === em.FullSnapshot) L = e, A = 0;
            else if (e.type === em.IncrementalSnapshot) {
                if (e.data.source === ef.Mutation && e.data.isAttachIframe) return;
                A++;
                let s = n && A >= n,
                    l = r && e.timestamp - L.timestamp > r;
                (s || l) && tk(!0)
            }
        };
        let P = e => {
                tR(tw({
                    type: em.IncrementalSnapshot,
                    data: tM({
                        source: ef.Mutation
                    }, e)
                }))
            },
            G = e => tR(tw({
                type: em.IncrementalSnapshot,
                data: tM({
                    source: ef.Scroll
                }, e)
            })),
            W = e => tR(tw({
                type: em.IncrementalSnapshot,
                data: tM({
                    source: ef.CanvasMutation
                }, e)
            })),
            U = e => tR(tw({
                type: em.IncrementalSnapshot,
                data: tM({
                    source: ef.AdoptedStyleSheet
                }, e)
            })),
            z = new tv({
                mutationCb: P,
                adoptedStyleSheetCb: U
            }),
            V = new e1({
                mirror: tO,
                mutationCb: P,
                stylesheetManager: z,
                recordCrossOriginIframes: N,
                wrappedEmit: tR
            });
        for (let B of E || []) B.getMirror && B.getMirror({
            nodeMirror: tO,
            crossOriginIframeMirror: V.crossOriginIframeMirror,
            crossOriginIframeStyleMirror: V.crossOriginIframeStyleMirror
        });
        tD = new ty({
            recordCanvas: I,
            mutationCb: W,
            win: window,
            blockClass: o,
            blockSelector: a,
            mirror: tO,
            sampling: b.canvas,
            dataURLOptions: S
        });
        let Q = new eq({
            mutationCb: P,
            scrollCb: G,
            bypassOptions: {
                blockClass: o,
                blockSelector: a,
                maskTextClass: s,
                maskTextSelector: l,
                inlineStylesheet: c,
                maskInputOptions: x,
                dataURLOptions: S,
                maskTextFn: g,
                maskInputFn: f,
                recordCanvas: I,
                inlineImages: M,
                sampling: b,
                slimDOMOptions: O,
                iframeManager: V,
                stylesheetManager: z,
                canvasManager: tD,
                keepIframeSrcFn: w
            },
            mirror: tO
        });
        tk = (e = !1) => {
            var t, r, n, i, d, u, h, m, f, y, v, b, C, N, $, T, E, R, k, D, L, A, F, P, G, W, U, Z, B, H, X, Y;
            tR(tw({
                type: em.Meta,
                data: {
                    href: window.location.href,
                    width: K(),
                    height: j()
                }
            }), e), z.reset(), e8.forEach(e => e.lock());
            let J = (h = document, v = void 0 === (y = (f = m = {
                mirror: tO,
                blockClass: o,
                blockSelector: a,
                maskTextClass: s,
                maskTextSelector: l,
                inlineStylesheet: c,
                maskAllInputs: x,
                maskTextFn: g,
                slimDOM: O,
                dataURLOptions: S,
                recordCanvas: I,
                inlineImages: M,
                onSerialize(e) {
                    en(e, tO) && V.addIframe(e), eo(e, tO) && z.trackLinkElement(e), ea(e) && Q.addShadowRoot(e.shadowRoot, document)
                },
                onIframeLoad(e, t) {
                    V.attachIframe(e, t), Q.observeAttachShadow(e)
                },
                onStylesheetLoad(e, t) {
                    z.attachLinkElement(e, t)
                },
                keepIframeSrcFn: w
            }).mirror) ? new p : y, b = f.blockClass, C = f.blockSelector, N = f.maskTextClass, $ = f.maskTextSelector, T = f.inlineStylesheet, E = f.inlineImages, R = f.recordCanvas, D = void 0 !== (k = f.maskAllInputs) && k, L = f.maskTextFn, A = f.maskInputFn, P = void 0 !== (F = f.slimDOM) && F, G = f.dataURLOptions, W = f.preserveWhiteSpace, U = f.onSerialize, Z = f.onIframeLoad, B = f.iframeLoadTimeout, H = f.onStylesheetLoad, X = f.stylesheetLoadTimeout, _(h, {
                doc: h,
                mirror: v,
                blockClass: void 0 === b ? "rr-block" : b,
                blockSelector: void 0 === C ? null : C,
                maskTextClass: void 0 === N ? "rr-mask" : N,
                maskTextSelector: void 0 === $ ? null : $,
                skipChild: !1,
                inlineStylesheet: void 0 === T || T,
                maskInputOptions: !0 === D ? {
                    color: !0,
                    date: !0,
                    "datetime-local": !0,
                    email: !0,
                    month: !0,
                    number: !0,
                    range: !0,
                    search: !0,
                    tel: !0,
                    text: !0,
                    time: !0,
                    url: !0,
                    week: !0,
                    textarea: !0,
                    select: !0,
                    password: !0
                } : !1 === D ? {
                    password: !0
                } : D,
                maskTextFn: L,
                maskInputFn: A,
                slimDOMOptions: !0 === P || "all" === P ? {
                    script: !0,
                    comment: !0,
                    headFavicon: !0,
                    headWhitespace: !0,
                    headMetaDescKeywords: "all" === P,
                    headMetaSocial: !0,
                    headMetaRobots: !0,
                    headMetaHttpEquiv: !0,
                    headMetaAuthorship: !0,
                    headMetaVerification: !0
                } : !1 === P ? {} : P,
                dataURLOptions: G,
                inlineImages: void 0 !== E && E,
                recordCanvas: void 0 !== R && R,
                preserveWhiteSpace: W,
                onSerialize: U,
                onIframeLoad: Z,
                iframeLoadTimeout: B,
                onStylesheetLoad: H,
                stylesheetLoadTimeout: X,
                keepIframeSrcFn: void 0 === (Y = f.keepIframeSrcFn) ? function() {
                    return !1
                } : Y,
                newlyAddedElement: !1
            }));
            if (!J) return console.warn("Failed to snapshot the document");
            tR(tw({
                type: em.FullSnapshot,
                data: {
                    node: J,
                    initialOffset: {
                        left: void 0 !== window.pageXOffset ? window.pageXOffset : document ? .documentElement.scrollLeft || (null == (r = null == (t = document ? .body) ? void 0 : t.parentElement) ? void 0 : r.scrollLeft) || (null == (n = document ? .body) ? void 0 : n.scrollLeft) || 0,
                        top: void 0 !== window.pageYOffset ? window.pageYOffset : document ? .documentElement.scrollTop || (null == (d = null == (i = document ? .body) ? void 0 : i.parentElement) ? void 0 : d.scrollTop) || (null == (u = document ? .body) ? void 0 : u.scrollTop) || 0
                    }
                }
            })), e8.forEach(e => e.unlock()), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && z.adoptStyleSheets(document.adoptedStyleSheets, tO.getId(document))
        };
        try {
            let q = [];
            q.push(Z("DOMContentLoaded", () => {
                tR(tw({
                    type: em.DomContentLoaded,
                    data: {}
                }))
            }));
            let ee = e => {
                var t;
                return function e(t, r = {}) {
                    let n = t.doc.defaultView;
                    if (!n) return () => {};
                    ! function e(t, r) {
                        let {
                            mutationCb: n,
                            mousemoveCb: o,
                            mouseInteractionCb: a,
                            scrollCb: i,
                            viewportResizeCb: s,
                            inputCb: l,
                            mediaInteractionCb: c,
                            styleSheetRuleCb: d,
                            styleDeclarationCb: u,
                            canvasMutationCb: h,
                            fontCb: p,
                            selectionCb: m
                        } = t;
                        t.mutationCb = (...e) => {
                            r.mutation && r.mutation(...e), n(...e)
                        }, t.mousemoveCb = (...e) => {
                            r.mousemove && r.mousemove(...e), o(...e)
                        }, t.mouseInteractionCb = (...e) => {
                            r.mouseInteraction && r.mouseInteraction(...e), a(...e)
                        }, t.scrollCb = (...e) => {
                            r.scroll && r.scroll(...e), i(...e)
                        }, t.viewportResizeCb = (...e) => {
                            r.viewportResize && r.viewportResize(...e), s(...e)
                        }, t.inputCb = (...e) => {
                            r.input && r.input(...e), l(...e)
                        }, t.mediaInteractionCb = (...e) => {
                            r.mediaInteaction && r.mediaInteaction(...e), c(...e)
                        }, t.styleSheetRuleCb = (...e) => {
                            r.styleSheetRule && r.styleSheetRule(...e), d(...e)
                        }, t.styleDeclarationCb = (...e) => {
                            r.styleDeclaration && r.styleDeclaration(...e), u(...e)
                        }, t.canvasMutationCb = (...e) => {
                            r.canvasMutation && r.canvasMutation(...e), h(...e)
                        }, t.fontCb = (...e) => {
                            r.font && r.font(...e), p(...e)
                        }, t.selectionCb = (...e) => {
                            r.selection && r.selection(...e), m(...e)
                        }
                    }(t, r);
                    let o = eW(t, t.doc),
                        a = function e({
                            mousemoveCb: t,
                            sampling: r,
                            doc: n,
                            mirror: o
                        }) {
                            if (!1 === r.mousemove) return () => {};
                            let a = "number" == typeof r.mousemove ? r.mousemove : 50,
                                i = "number" == typeof r.mousemoveCallback ? r.mousemoveCallback : 500,
                                s = [],
                                l, c = H(e => {
                                    let r = Date.now() - l;
                                    t(s.map(e => (e.timeOffset -= r, e)), e), s = [], l = null
                                }, i),
                                d = H(e => {
                                    let t = e0(e),
                                        {
                                            clientX: r,
                                            clientY: n
                                        } = et(e) ? e.changedTouches[0] : e;
                                    l || (l = Date.now()), s.push({
                                        x: r,
                                        y: n,
                                        id: o.getId(t),
                                        timeOffset: Date.now() - l
                                    }), c("u" > typeof DragEvent && e instanceof DragEvent ? ef.Drag : e instanceof MouseEvent ? ef.MouseMove : ef.TouchMove)
                                }, a, {
                                    trailing: !1
                                }),
                                u = [Z("mousemove", d, n), Z("touchmove", d, n), Z("drag", d, n)];
                            return () => {
                                u.forEach(e => e())
                            }
                        }(t),
                        i = function e({
                            mouseInteractionCb: t,
                            doc: r,
                            mirror: n,
                            blockClass: o,
                            blockSelector: a,
                            sampling: i
                        }) {
                            if (!1 === i.mouseInteraction) return () => {};
                            let s = !0 === i.mouseInteraction || void 0 === i.mouseInteraction ? {} : i.mouseInteraction,
                                l = [],
                                c = e => r => {
                                    let i = e0(r);
                                    if (J(i, o, a, !0)) return;
                                    let s = et(r) ? r.changedTouches[0] : r;
                                    if (!s) return;
                                    let l = n.getId(i),
                                        {
                                            clientX: c,
                                            clientY: d
                                        } = s;
                                    t({
                                        type: eg[e],
                                        id: l,
                                        x: c,
                                        y: d
                                    })
                                };
                            return Object.keys(eg).filter(e => Number.isNaN(Number(e)) && !e.endsWith("_Departed") && !1 !== s[e]).forEach(e => {
                                let t = e.toLowerCase(),
                                    n = c(e);
                                l.push(Z(t, n, r))
                            }), () => {
                                l.forEach(e => e())
                            }
                        }(t),
                        s = eU(t),
                        l = function e({
                            viewportResizeCb: t
                        }) {
                            let r = -1,
                                n = -1,
                                o = H(() => {
                                    let e = j(),
                                        o = K();
                                    (r !== e || n !== o) && (t({
                                        width: Number(o),
                                        height: Number(e)
                                    }), r = e, n = o)
                                }, 200);
                            return Z("resize", o, window)
                        }(t),
                        c = function e({
                            inputCb: t,
                            doc: r,
                            mirror: n,
                            blockClass: o,
                            blockSelector: a,
                            ignoreClass: i,
                            maskInputOptions: s,
                            maskInputFn: l,
                            sampling: c,
                            userTriggeredOnInput: d
                        }) {
                            function u(e) {
                                let t = e0(e),
                                    n = e.isTrusted;
                                if (t && "OPTION" === t.tagName && (t = t.parentElement), !t || !t.tagName || 0 > eV.indexOf(t.tagName) || J(t, o, a, !0)) return;
                                let c = t.type;
                                if (t.classList.contains(i)) return;
                                let u = t.value,
                                    p = !1;
                                "radio" === c || "checkbox" === c ? p = t.checked : (s[t.tagName.toLowerCase()] || s[c]) && (u = m({
                                    maskInputOptions: s,
                                    tagName: t.tagName,
                                    type: c,
                                    value: u,
                                    maskInputFn: l
                                })), h(t, ez({
                                    text: u,
                                    isChecked: p,
                                    userTriggered: n
                                }, d));
                                let f = t.name;
                                "radio" === c && f && p && r.querySelectorAll(`input[type="radio"][name="${f}"]`).forEach(e => {
                                    e !== t && h(e, ez({
                                        text: e.value,
                                        isChecked: !p,
                                        userTriggered: !1
                                    }, d))
                                })
                            }

                            function h(e, r) {
                                let o = eZ.get(e);
                                if (!o || o.text !== r.text || o.isChecked !== r.isChecked) {
                                    eZ.set(e, r);
                                    let a = n.getId(e);
                                    t(e_(eL({}, r), {
                                        id: a
                                    }))
                                }
                            }
                            let p = ("last" === c.input ? ["change"] : ["input", "change"]).map(e => Z(e, u, r)),
                                f = r.defaultView;
                            if (!f) return () => {
                                p.forEach(e => e())
                            };
                            let g = f.Object.getOwnPropertyDescriptor(f.HTMLInputElement.prototype, "value"),
                                y = [
                                    [f.HTMLInputElement.prototype, "value"],
                                    [f.HTMLInputElement.prototype, "checked"],
                                    [f.HTMLSelectElement.prototype, "value"],
                                    [f.HTMLTextAreaElement.prototype, "value"],
                                    [f.HTMLSelectElement.prototype, "selectedIndex"],
                                    [f.HTMLOptionElement.prototype, "selected"]
                                ];
                            return g && g.set && p.push(...y.map(e => X(e[0], e[1], {
                                set() {
                                    u({
                                        target: this
                                    })
                                }
                            }, !1, f))), () => {
                                p.forEach(e => e())
                            }
                        }(t),
                        d = function e({
                            mediaInteractionCb: t,
                            blockClass: r,
                            blockSelector: n,
                            mirror: o,
                            sampling: a
                        }) {
                            let i = e => H(a => {
                                    let i = e0(a);
                                    if (!i || J(i, r, n, !0)) return;
                                    let {
                                        currentTime: s,
                                        volume: l,
                                        muted: c,
                                        playbackRate: d
                                    } = i;
                                    t({
                                        type: e,
                                        id: o.getId(i),
                                        currentTime: s,
                                        volume: l,
                                        muted: c,
                                        playbackRate: d
                                    })
                                }, a.media || 500),
                                s = [Z("play", i(ev.Play)), Z("pause", i(ev.Pause)), Z("seeked", i(ev.Seeked)), Z("volumechange", i(ev.VolumeChange)), Z("ratechange", i(ev.RateChange))];
                            return () => {
                                s.forEach(e => e())
                            }
                        }(t),
                        u = function e({
                            styleSheetRuleCb: t,
                            mirror: r,
                            stylesheetManager: n
                        }, {
                            win: o
                        }) {
                            let a = o.CSSStyleSheet.prototype.insertRule;
                            o.CSSStyleSheet.prototype.insertRule = function(e, o) {
                                let {
                                    id: i,
                                    styleId: s
                                } = eH(this, r, n.styleMirror);
                                return (i && -1 !== i || s && -1 !== s) && t({
                                    id: i,
                                    styleId: s,
                                    adds: [{
                                        rule: e,
                                        index: o
                                    }]
                                }), a.apply(this, [e, o])
                            };
                            let i = o.CSSStyleSheet.prototype.deleteRule;
                            o.CSSStyleSheet.prototype.deleteRule = function(e) {
                                let {
                                    id: o,
                                    styleId: a
                                } = eH(this, r, n.styleMirror);
                                return (o && -1 !== o || a && -1 !== a) && t({
                                    id: o,
                                    styleId: a,
                                    removes: [{
                                        index: e
                                    }]
                                }), i.apply(this, [e])
                            };
                            let s;
                            o.CSSStyleSheet.prototype.replace && (s = o.CSSStyleSheet.prototype.replace, o.CSSStyleSheet.prototype.replace = function(e) {
                                let {
                                    id: o,
                                    styleId: a
                                } = eH(this, r, n.styleMirror);
                                return (o && -1 !== o || a && -1 !== a) && t({
                                    id: o,
                                    styleId: a,
                                    replace: e
                                }), s.apply(this, [e])
                            });
                            let l;
                            o.CSSStyleSheet.prototype.replaceSync && (l = o.CSSStyleSheet.prototype.replaceSync, o.CSSStyleSheet.prototype.replaceSync = function(e) {
                                let {
                                    id: o,
                                    styleId: a
                                } = eH(this, r, n.styleMirror);
                                return (o && -1 !== o || a && -1 !== a) && t({
                                    id: o,
                                    styleId: a,
                                    replaceSync: e
                                }), l.apply(this, [e])
                            });
                            let c = {};
                            eA ? c.CSSGroupingRule = o.CSSGroupingRule : (eF && (c.CSSMediaRule = o.CSSMediaRule), eG && (c.CSSConditionRule = o.CSSConditionRule), eP && (c.CSSSupportsRule = o.CSSSupportsRule));
                            let d = {};
                            return Object.entries(c).forEach(([e, o]) => {
                                d[e] = {
                                    insertRule: o.prototype.insertRule,
                                    deleteRule: o.prototype.deleteRule
                                }, o.prototype.insertRule = function(o, a) {
                                    let {
                                        id: i,
                                        styleId: s
                                    } = eH(this.parentStyleSheet, r, n.styleMirror);
                                    return (i && -1 !== i || s && -1 !== s) && t({
                                        id: i,
                                        styleId: s,
                                        adds: [{
                                            rule: o,
                                            index: [...eB(this), a || 0]
                                        }]
                                    }), d[e].insertRule.apply(this, [o, a])
                                }, o.prototype.deleteRule = function(o) {
                                    let {
                                        id: a,
                                        styleId: i
                                    } = eH(this.parentStyleSheet, r, n.styleMirror);
                                    return (a && -1 !== a || i && -1 !== i) && t({
                                        id: a,
                                        styleId: i,
                                        removes: [{
                                            index: [...eB(this), o]
                                        }]
                                    }), d[e].deleteRule.apply(this, [o])
                                }
                            }), () => {
                                o.CSSStyleSheet.prototype.insertRule = a, o.CSSStyleSheet.prototype.deleteRule = i, s && (o.CSSStyleSheet.prototype.replace = s), l && (o.CSSStyleSheet.prototype.replaceSync = l), Object.entries(c).forEach(([e, t]) => {
                                    t.prototype.insertRule = d[e].insertRule, t.prototype.deleteRule = d[e].deleteRule
                                })
                            }
                        }(t, {
                            win: n
                        }),
                        h = eX(t, t.doc),
                        p = function e({
                            styleDeclarationCb: t,
                            mirror: r,
                            ignoreCSSAttributes: n,
                            stylesheetManager: o
                        }, {
                            win: a
                        }) {
                            let i = a.CSSStyleDeclaration.prototype.setProperty;
                            a.CSSStyleDeclaration.prototype.setProperty = function(e, a, s) {
                                var l;
                                if (n.has(e)) return i.apply(this, [e, a, s]);
                                let {
                                    id: c,
                                    styleId: d
                                } = eH(null == (l = this.parentRule) ? void 0 : l.parentStyleSheet, r, o.styleMirror);
                                return (c && -1 !== c || d && -1 !== d) && t({
                                    id: c,
                                    styleId: d,
                                    set: {
                                        property: e,
                                        value: a,
                                        priority: s
                                    },
                                    index: eB(this.parentRule)
                                }), i.apply(this, [e, a, s])
                            };
                            let s = a.CSSStyleDeclaration.prototype.removeProperty;
                            return a.CSSStyleDeclaration.prototype.removeProperty = function(e) {
                                var a;
                                if (n.has(e)) return s.apply(this, [e]);
                                let {
                                    id: i,
                                    styleId: l
                                } = eH(null == (a = this.parentRule) ? void 0 : a.parentStyleSheet, r, o.styleMirror);
                                return (i && -1 !== i || l && -1 !== l) && t({
                                    id: i,
                                    styleId: l,
                                    remove: {
                                        property: e
                                    },
                                    index: eB(this.parentRule)
                                }), s.apply(this, [e])
                            }, () => {
                                a.CSSStyleDeclaration.prototype.setProperty = i, a.CSSStyleDeclaration.prototype.removeProperty = s
                            }
                        }(t, {
                            win: n
                        }),
                        f = t.collectFonts ? function e({
                            fontCb: t,
                            doc: r
                        }) {
                            let n = r.defaultView;
                            if (!n) return () => {};
                            let o = [],
                                a = new WeakMap,
                                i = n.FontFace;
                            n.FontFace = function(e, t, r) {
                                let n = new i(e, t, r);
                                return a.set(n, {
                                    family: e,
                                    buffer: "string" != typeof t,
                                    descriptors: r,
                                    fontSource: "string" == typeof t ? t : JSON.stringify(Array.from(new Uint8Array(t)))
                                }), n
                            };
                            let s = Y(r.fonts, "add", function(e) {
                                return function(r) {
                                    return setTimeout(() => {
                                        let e = a.get(r);
                                        e && (t(e), a.delete(r))
                                    }, 0), e.apply(this, [r])
                                }
                            });
                            return o.push(() => {
                                n.FontFace = i
                            }), o.push(s), () => {
                                o.forEach(e => e())
                            }
                        }(t) : () => {},
                        g = function e(t) {
                            let {
                                doc: r,
                                mirror: n,
                                blockClass: o,
                                blockSelector: a,
                                selectionCb: i
                            } = t, s = !0, l = () => {
                                let e = r.getSelection();
                                if (!e || s && e ? .isCollapsed) return;
                                s = e.isCollapsed || !1;
                                let t = [],
                                    l = e.rangeCount || 0;
                                for (let c = 0; c < l; c++) {
                                    let d = e.getRangeAt(c),
                                        {
                                            startContainer: u,
                                            startOffset: h,
                                            endContainer: p,
                                            endOffset: m
                                        } = d;
                                    J(u, o, a, !0) || J(p, o, a, !0) || t.push({
                                        start: n.getId(u),
                                        startOffset: h,
                                        end: n.getId(p),
                                        endOffset: m
                                    })
                                }
                                i({
                                    ranges: t
                                })
                            };
                            return l(), Z("selectionchange", l)
                        }(t),
                        y = [];
                    for (let v of t.plugins) y.push(v.observer(v.callback, n, v.options));
                    return () => {
                        e8.forEach(e => e.reset()), o.disconnect(), a(), i(), s(), l(), c(), d(), u(), h(), p(), f(), g(), y.forEach(e => e())
                    }
                }({
                    mutationCb: P,
                    mousemoveCb: (e, t) => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: {
                            source: t,
                            positions: e
                        }
                    })),
                    mouseInteractionCb: e => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: tM({
                            source: ef.MouseInteraction
                        }, e)
                    })),
                    scrollCb: G,
                    viewportResizeCb: e => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: tM({
                            source: ef.ViewportResize
                        }, e)
                    })),
                    inputCb: e => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: tM({
                            source: ef.Input
                        }, e)
                    })),
                    mediaInteractionCb: e => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: tM({
                            source: ef.MediaInteraction
                        }, e)
                    })),
                    styleSheetRuleCb: e => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: tM({
                            source: ef.StyleSheetRule
                        }, e)
                    })),
                    styleDeclarationCb: e => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: tM({
                            source: ef.StyleDeclaration
                        }, e)
                    })),
                    canvasMutationCb: W,
                    fontCb: e => tR(tw({
                        type: em.IncrementalSnapshot,
                        data: tM({
                            source: ef.Font
                        }, e)
                    })),
                    selectionCb(e) {
                        tR(tw({
                            type: em.IncrementalSnapshot,
                            data: tM({
                                source: ef.Selection
                            }, e)
                        }))
                    },
                    blockClass: o,
                    ignoreClass: i,
                    maskTextClass: s,
                    maskTextSelector: l,
                    maskInputOptions: x,
                    inlineStylesheet: c,
                    sampling: b,
                    recordCanvas: I,
                    inlineImages: M,
                    userTriggeredOnInput: $,
                    collectFonts: T,
                    doc: e,
                    maskInputFn: f,
                    maskTextFn: g,
                    keepIframeSrcFn: w,
                    blockSelector: a,
                    slimDOMOptions: O,
                    dataURLOptions: S,
                    mirror: tO,
                    iframeManager: V,
                    stylesheetManager: z,
                    shadowDomManager: Q,
                    canvasManager: tD,
                    ignoreCSSAttributes: R,
                    plugins: (null == (t = E ? .filter(e => e.observer)) ? void 0 : t.map(e => ({
                        observer: e.observer,
                        options: e.options,
                        callback: t => tR(tw({
                            type: em.Plugin,
                            data: {
                                plugin: e.name,
                                payload: t
                            }
                        }))
                    }))) || []
                }, y)
            };
            V.addLoadListener(e => {
                q.push(ee(e.contentDocument))
            });
            let ei = () => {
                tk(), q.push(ee(document)), tx = !0
            };
            return "interactive" === document.readyState || "complete" === document.readyState ? ei() : q.push(Z("load", () => {
                tR(tw({
                    type: em.Load,
                    data: {}
                })), ei()
            }, window)), () => {
                q.forEach(e => e()), tx = !1
            }
        } catch (es) {
            console.warn(es)
        }
    }
    tL.addCustomEvent = (e, t) => {
        if (!tx) throw Error("please add custom event after start recording");
        tR(tw({
            type: em.Custom,
            data: {
                tag: e,
                payload: t
            }
        }))
    }, tL.freezePage = () => {
        e8.forEach(e => e.freeze())
    }, tL.takeFullSnapshot = e => {
        if (!tx) throw Error("please take full snapshot after start recording");
        tk(e)
    }, tL.mirror = tO, (i = d || (d = {}))[i.Document = 0] = "Document", i[i.DocumentType = 1] = "DocumentType", i[i.Element = 2] = "Element", i[i.Text = 3] = "Text", i[i.CDATA = 4] = "CDATA", i[i.Comment = 5] = "Comment";
    var t_ = function() {
        function e() {
            this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
        }
        return e.prototype.getId = function(e) {
            var t;
            return e ? (null === (t = this.getMeta(e)) || void 0 === t ? void 0 : t.id) ? ? -1 : -1
        }, e.prototype.getNode = function(e) {
            return this.idNodeMap.get(e) || null
        }, e.prototype.getIds = function() {
            return Array.from(this.idNodeMap.keys())
        }, e.prototype.getMeta = function(e) {
            return this.nodeMetaMap.get(e) || null
        }, e.prototype.removeNodeFromMap = function(e) {
            var t = this,
                r = this.getId(e);
            this.idNodeMap.delete(r), e.childNodes && e.childNodes.forEach(function(e) {
                return t.removeNodeFromMap(e)
            })
        }, e.prototype.has = function(e) {
            return this.idNodeMap.has(e)
        }, e.prototype.hasNode = function(e) {
            return this.nodeMetaMap.has(e)
        }, e.prototype.add = function(e, t) {
            var r = t.id;
            this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, t)
        }, e.prototype.replace = function(e, t) {
            var r = this.getNode(e);
            if (r) {
                var n = this.nodeMetaMap.get(r);
                n && this.nodeMetaMap.set(t, n)
            }
            this.idNodeMap.set(e, t)
        }, e.prototype.reset = function() {
            this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
        }, e
    }();

    function t8() {
        return new t_
    }

    function tA(e) {
        let t = [];
        for (let r in e) {
            let n = e[r];
            if ("string" != typeof n) continue;
            let o = tW(r);
            t.push(`${o}: ${n};`)
        }
        return t.join(" ")
    }
    let tF = /-([a-z])/g,
        tP = /^--[a-zA-Z0-9-]+$/,
        tG = e => tP.test(e) ? e : e.replace(tF, (e, t) => t ? t.toUpperCase() : ""),
        t0 = /\B([A-Z])/g,
        tW = e => e.replace(t0, "-$1").toLowerCase();
    class tU {
        constructor(...e) {
            this.childNodes = [], this.parentElement = null, this.parentNode = null, this.ELEMENT_NODE = u.ELEMENT_NODE, this.TEXT_NODE = u.TEXT_NODE
        }
        get firstChild() {
            return this.childNodes[0] || null
        }
        get lastChild() {
            return this.childNodes[this.childNodes.length - 1] || null
        }
        get nextSibling() {
            let e = this.parentNode;
            if (!e) return null;
            let t = e.childNodes,
                r = t.indexOf(this);
            return t[r + 1] || null
        }
        contains(e) {
            if (e === this) return !0;
            for (let t of this.childNodes)
                if (t.contains(e)) return !0;
            return !1
        }
        appendChild(e) {
            throw Error("RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.")
        }
        insertBefore(e, t) {
            throw Error("RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.")
        }
        removeChild(e) {
            throw Error("RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.")
        }
        toString() {
            return "RRNode"
        }
    }

    function tz(e) {
        return class t extends e {
            constructor() {
                super(...arguments), this.nodeType = u.DOCUMENT_NODE, this.nodeName = "#document", this.compatMode = "CSS1Compat", this.RRNodeType = d.Document, this.textContent = null
            }
            get documentElement() {
                return this.childNodes.find(e => e.RRNodeType === d.Element && "HTML" === e.tagName) || null
            }
            get body() {
                var e;
                return (null === (e = this.documentElement) || void 0 === e ? void 0 : e.childNodes.find(e => e.RRNodeType === d.Element && "BODY" === e.tagName)) || null
            }
            get head() {
                var e;
                return (null === (e = this.documentElement) || void 0 === e ? void 0 : e.childNodes.find(e => e.RRNodeType === d.Element && "HEAD" === e.tagName)) || null
            }
            get implementation() {
                return this
            }
            get firstElementChild() {
                return this.documentElement
            }
            appendChild(e) {
                let t = e.RRNodeType;
                if ((t === d.Element || t === d.DocumentType) && this.childNodes.some(e => e.RRNodeType === t)) throw Error(`RRDomException: Failed to execute 'appendChild' on 'RRNode': Only one ${t===d.Element?"RRElement":"RRDoctype"} on RRDocument allowed.`);
                return e.parentElement = null, e.parentNode = this, this.childNodes.push(e), e
            }
            insertBefore(e, t) {
                let r = e.RRNodeType;
                if ((r === d.Element || r === d.DocumentType) && this.childNodes.some(e => e.RRNodeType === r)) throw Error(`RRDomException: Failed to execute 'insertBefore' on 'RRNode': Only one ${r===d.Element?"RRElement":"RRDoctype"} on RRDocument allowed.`);
                if (null === t) return this.appendChild(e);
                let n = this.childNodes.indexOf(t);
                if (-1 == n) throw Error("Failed to execute 'insertBefore' on 'RRNode': The RRNode before which the new node is to be inserted is not a child of this RRNode.");
                return this.childNodes.splice(n, 0, e), e.parentElement = null, e.parentNode = this, e
            }
            removeChild(e) {
                let t = this.childNodes.indexOf(e);
                if (-1 === t) throw Error("Failed to execute 'removeChild' on 'RRDocument': The RRNode to be removed is not a child of this RRNode.");
                return this.childNodes.splice(t, 1), e.parentElement = null, e.parentNode = null, e
            }
            open() {
                this.childNodes = []
            }
            close() {}
            write(e) {
                let t;
                if ('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">' === e ? t = "-//W3C//DTD XHTML 1.0 Transitional//EN" : '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">' === e && (t = "-//W3C//DTD HTML 4.0 Transitional//EN"), t) {
                    let r = this.createDocumentType("html", t, "");
                    this.open(), this.appendChild(r)
                }
            }
            createDocument(e, r, n) {
                return new t
            }
            createDocumentType(e, t, r) {
                let n = new(tV(tU))(e, t, r);
                return n.ownerDocument = this, n
            }
            createElement(e) {
                let t = new(tZ(tU))(e);
                return t.ownerDocument = this, t
            }
            createElementNS(e, t) {
                return this.createElement(t)
            }
            createTextNode(e) {
                let t = new(tH(tU))(e);
                return t.ownerDocument = this, t
            }
            createComment(e) {
                let t = new(tX(tU))(e);
                return t.ownerDocument = this, t
            }
            createCDATASection(e) {
                let t = new(tY(tU))(e);
                return t.ownerDocument = this, t
            }
            toString() {
                return "RRDocument"
            }
        }
    }

    function tV(e) {
        return class extends e {
            constructor(e, t, r) {
                super(), this.nodeType = u.DOCUMENT_TYPE_NODE, this.RRNodeType = d.DocumentType, this.textContent = null, this.name = e, this.publicId = t, this.systemId = r, this.nodeName = e
            }
            toString() {
                return "RRDocumentType"
            }
        }
    }

    function tZ(e) {
        return class extends e {
            constructor(e) {
                super(), this.nodeType = u.ELEMENT_NODE, this.RRNodeType = d.Element, this.attributes = {}, this.shadowRoot = null, this.tagName = e.toUpperCase(), this.nodeName = e.toUpperCase()
            }
            get textContent() {
                let e = "";
                return this.childNodes.forEach(t => e += t.textContent), e
            }
            set textContent(e) {
                this.childNodes = [this.ownerDocument.createTextNode(e)]
            }
            get classList() {
                return new t1(this.attributes.class, e => {
                    this.attributes.class = e
                })
            }
            get id() {
                return this.attributes.id || ""
            }
            get className() {
                return this.attributes.class || ""
            }
            get style() {
                let e = this.attributes.style ? function e(t) {
                        let r = {},
                            n = /:(.+)/;
                        return t.replace(/\/\*.*?\*\//g, "").split(/;(?![^(]*\))/g).forEach(function(e) {
                            if (e) {
                                let t = e.split(n);
                                t.length > 1 && (r[tG(t[0].trim())] = t[1].trim())
                            }
                        }), r
                    }(this.attributes.style) : {},
                    t = /\B([A-Z])/g;
                return e.setProperty = (r, n, o) => {
                    if (t.test(r)) return;
                    let a = tG(r);
                    n ? e[a] = n : delete e[a], "important" === o && (e[a] += " !important"), this.attributes.style = tA(e)
                }, e.removeProperty = r => {
                    if (t.test(r)) return "";
                    let n = tG(r),
                        o = e[n] || "";
                    return delete e[n], this.attributes.style = tA(e), o
                }, e
            }
            getAttribute(e) {
                return this.attributes[e] || null
            }
            setAttribute(e, t) {
                this.attributes[e] = t
            }
            setAttributeNS(e, t, r) {
                this.setAttribute(t, r)
            }
            removeAttribute(e) {
                delete this.attributes[e]
            }
            appendChild(e) {
                return this.childNodes.push(e), e.parentNode = this, e.parentElement = this, e
            }
            insertBefore(e, t) {
                if (null === t) return this.appendChild(e);
                let r = this.childNodes.indexOf(t);
                if (-1 == r) throw Error("Failed to execute 'insertBefore' on 'RRNode': The RRNode before which the new node is to be inserted is not a child of this RRNode.");
                return this.childNodes.splice(r, 0, e), e.parentElement = this, e.parentNode = this, e
            }
            removeChild(e) {
                let t = this.childNodes.indexOf(e);
                if (-1 === t) throw Error("Failed to execute 'removeChild' on 'RRElement': The RRNode to be removed is not a child of this RRNode.");
                return this.childNodes.splice(t, 1), e.parentElement = null, e.parentNode = null, e
            }
            attachShadow(e) {
                let t = this.ownerDocument.createElement("SHADOWROOT");
                return this.shadowRoot = t, t
            }
            dispatchEvent(e) {
                return !0
            }
            toString() {
                let e = "";
                for (let t in this.attributes) e += `${t}="${this.attributes[t]}" `;
                return `${this.tagName} ${e}`
            }
        }
    }

    function tB(e) {
        return class extends e {
            attachShadow(e) {
                throw Error("RRDomException: Failed to execute 'attachShadow' on 'RRElement': This RRElement does not support attachShadow")
            }
            play() {
                this.paused = !1
            }
            pause() {
                this.paused = !0
            }
        }
    }

    function tH(e) {
        return class extends e {
            constructor(e) {
                super(), this.nodeType = u.TEXT_NODE, this.nodeName = "#text", this.RRNodeType = d.Text, this.data = e
            }
            get textContent() {
                return this.data
            }
            set textContent(e) {
                this.data = e
            }
            toString() {
                return `RRText text=${JSON.stringify(this.data)}`
            }
        }
    }

    function tX(e) {
        return class extends e {
            constructor(e) {
                super(), this.nodeType = u.COMMENT_NODE, this.nodeName = "#comment", this.RRNodeType = d.Comment, this.data = e
            }
            get textContent() {
                return this.data
            }
            set textContent(e) {
                this.data = e
            }
            toString() {
                return `RRComment text=${JSON.stringify(this.data)}`
            }
        }
    }

    function tY(e) {
        return class extends e {
            constructor(e) {
                super(), this.nodeName = "#cdata-section", this.nodeType = u.CDATA_SECTION_NODE, this.RRNodeType = d.CDATA, this.data = e
            }
            get textContent() {
                return this.data
            }
            set textContent(e) {
                this.data = e
            }
            toString() {
                return `RRCDATASection data=${JSON.stringify(this.data)}`
            }
        }
    }
    class t1 {
        constructor(e, t) {
            if (this.classes = [], this.add = (...e) => {
                    for (let t of e) {
                        let r = String(t);
                        this.classes.indexOf(r) >= 0 || this.classes.push(r)
                    }
                    this.onChange && this.onChange(this.classes.join(" "))
                }, this.remove = (...e) => {
                    this.classes = this.classes.filter(t => -1 === e.indexOf(t)), this.onChange && this.onChange(this.classes.join(" "))
                }, e) {
                let r = e.trim().split(/\s+/);
                this.classes.push(...r)
            }
            this.onChange = t
        }
    }(s = u || (u = {}))[s.PLACEHOLDER = 0] = "PLACEHOLDER", s[s.ELEMENT_NODE = 1] = "ELEMENT_NODE", s[s.ATTRIBUTE_NODE = 2] = "ATTRIBUTE_NODE", s[s.TEXT_NODE = 3] = "TEXT_NODE", s[s.CDATA_SECTION_NODE = 4] = "CDATA_SECTION_NODE", s[s.ENTITY_REFERENCE_NODE = 5] = "ENTITY_REFERENCE_NODE", s[s.ENTITY_NODE = 6] = "ENTITY_NODE", s[s.PROCESSING_INSTRUCTION_NODE = 7] = "PROCESSING_INSTRUCTION_NODE", s[s.COMMENT_NODE = 8] = "COMMENT_NODE", s[s.DOCUMENT_NODE = 9] = "DOCUMENT_NODE", s[s.DOCUMENT_TYPE_NODE = 10] = "DOCUMENT_TYPE_NODE", s[s.DOCUMENT_FRAGMENT_NODE = 11] = "DOCUMENT_FRAGMENT_NODE";
    let t7 = {
            svg: "http://www.w3.org/2000/svg",
            "xlink:href": "http://www.w3.org/1999/xlink",
            xmlns: "http://www.w3.org/2000/xmlns/"
        },
        tj = {
            altglyph: "altGlyph",
            altglyphdef: "altGlyphDef",
            altglyphitem: "altGlyphItem",
            animatecolor: "animateColor",
            animatemotion: "animateMotion",
            animatetransform: "animateTransform",
            clippath: "clipPath",
            feblend: "feBlend",
            fecolormatrix: "feColorMatrix",
            fecomponenttransfer: "feComponentTransfer",
            fecomposite: "feComposite",
            feconvolvematrix: "feConvolveMatrix",
            fediffuselighting: "feDiffuseLighting",
            fedisplacementmap: "feDisplacementMap",
            fedistantlight: "feDistantLight",
            fedropshadow: "feDropShadow",
            feflood: "feFlood",
            fefunca: "feFuncA",
            fefuncb: "feFuncB",
            fefuncg: "feFuncG",
            fefuncr: "feFuncR",
            fegaussianblur: "feGaussianBlur",
            feimage: "feImage",
            femerge: "feMerge",
            femergenode: "feMergeNode",
            femorphology: "feMorphology",
            feoffset: "feOffset",
            fepointlight: "fePointLight",
            fespecularlighting: "feSpecularLighting",
            fespotlight: "feSpotLight",
            fetile: "feTile",
            feturbulence: "feTurbulence",
            foreignobject: "foreignObject",
            glyphref: "glyphRef",
            lineargradient: "linearGradient",
            radialgradient: "radialGradient"
        };

    function t3(e, t, r, n) {
        let o = e.childNodes,
            a = t.childNodes;
        n = n || t.mirror || t.ownerDocument.mirror, (o.length > 0 || a.length > 0) && tK(Array.from(o), a, e, r, n);
        let i = null,
            s = null;
        switch (t.RRNodeType) {
            case d.Document:
                s = t.scrollData;
                break;
            case d.Element:
                {
                    let l = e,
                        c = t;
                    switch (function e(t, r, n) {
                        let o = t.attributes,
                            a = r.attributes;
                        for (let i in a) {
                            let s = a[i],
                                l = n.getMeta(r);
                            if (l && "isSVG" in l && l.isSVG && t7[i]) t.setAttributeNS(t7[i], i, s);
                            else if ("CANVAS" === r.tagName && "rr_dataURL" === i) {
                                let c = document.createElement("img");
                                c.src = s, c.onload = () => {
                                    let e = t.getContext("2d");
                                    e && e.drawImage(c, 0, 0, c.width, c.height)
                                }
                            } else t.setAttribute(i, s)
                        }
                        for (let {
                                name: d
                            } of Array.from(o)) d in a || t.removeAttribute(d);
                        r.scrollLeft && (t.scrollLeft = r.scrollLeft), r.scrollTop && (t.scrollTop = r.scrollTop)
                    }(l, c, n), s = c.scrollData, i = c.inputData, c.tagName) {
                        case "AUDIO":
                        case "VIDEO":
                            {
                                let u = e,
                                    h = c;void 0 !== h.paused && (h.paused ? u.pause() : u.play()),
                                void 0 !== h.muted && (u.muted = h.muted),
                                void 0 !== h.volume && (u.volume = h.volume),
                                void 0 !== h.currentTime && (u.currentTime = h.currentTime),
                                void 0 !== h.playbackRate && (u.playbackRate = h.playbackRate);
                                break
                            }
                        case "CANVAS":
                            {
                                let p = t;
                                if (null !== p.rr_dataURL) {
                                    let m = document.createElement("img");
                                    m.onload = () => {
                                        let e = l.getContext("2d");
                                        e && e.drawImage(m, 0, 0, m.width, m.height)
                                    }, m.src = p.rr_dataURL
                                }
                                p.canvasMutations.forEach(t => r.applyCanvas(t.event, t.mutation, e))
                            }
                            break;
                        case "STYLE":
                            {
                                let f = l.sheet;f && t.rules.forEach(e => r.applyStyleSheetMutation(e, f))
                            }
                    }
                    if (c.shadowRoot) {
                        l.shadowRoot || l.attachShadow({
                            mode: "open"
                        });
                        let g = l.shadowRoot.childNodes,
                            y = c.shadowRoot.childNodes;
                        (g.length > 0 || y.length > 0) && tK(Array.from(g), y, l.shadowRoot, r, n)
                    }
                    break
                }
            case d.Text:
            case d.Comment:
            case d.CDATA:
                e.textContent !== t.data && (e.textContent = t.data)
        }
        if (s && r.applyScroll(s, !0), i && r.applyInput(i), "IFRAME" === t.nodeName) {
            let v = e.contentDocument,
                b = t;
            if (v) {
                let S = n.getMeta(b.contentDocument);
                S && r.mirror.add(v, Object.assign({}, S)), t3(v, b.contentDocument, r, n)
            }
        }
    }

    function tK(e, t, r, n, o) {
        var a;
        let i = 0,
            s = e.length - 1,
            l = 0,
            c = t.length - 1,
            u = e[i],
            h = e[s],
            p = t[l],
            m = t[c],
            f, g;
        for (; i <= s && l <= c;) {
            let y = n.mirror.getId(u),
                v = n.mirror.getId(h),
                b = o.getId(p),
                S = o.getId(m);
            if (void 0 === u) u = e[++i];
            else if (void 0 === h) h = e[--s];
            else if (-1 !== y && y === b) t3(u, p, n, o), u = e[++i], p = t[++l];
            else if (-1 !== v && v === S) t3(h, m, n, o), h = e[--s], m = t[--c];
            else if (-1 !== y && y === S) r.insertBefore(u, h.nextSibling), t3(u, m, n, o), u = e[++i], m = t[--c];
            else if (-1 !== v && v === b) r.insertBefore(h, u), t3(h, p, n, o), h = e[--s], p = t[++l];
            else {
                if (!f) {
                    f = {};
                    for (let C = i; C <= s; C++) {
                        let I = e[C];
                        I && n.mirror.hasNode(I) && (f[n.mirror.getId(I)] = C)
                    }
                }
                if (g = f[o.getId(p)]) {
                    let N = e[g];
                    r.insertBefore(N, u), t3(N, p, n, o), e[g] = void 0
                } else {
                    let $ = t2(p, n.mirror, o);
                    "#document" === r.nodeName && (null === (a = n.mirror.getMeta($)) || void 0 === a ? void 0 : a.type) === d.Element && r.documentElement && (r.removeChild(r.documentElement), e[i] = void 0, u = void 0), r.insertBefore($, u || null), t3($, p, n, o)
                }
                p = t[++l]
            }
        }
        if (i > s) {
            let T = t[c + 1],
                M = null;
            for (T && r.childNodes.forEach(e => {
                    n.mirror.getId(e) === o.getId(T) && (M = e)
                }); l <= c; ++l) {
                let E = t2(t[l], n.mirror, o);
                r.insertBefore(E, M), t3(E, t[l], n, o)
            }
        } else if (l > c)
            for (; i <= s; i++) {
                let w = e[i];
                w && (r.removeChild(w), n.mirror.removeNodeFromMap(w))
            }
    }

    function t2(e, t, r) {
        let n = r.getId(e),
            o = r.getMeta(e),
            a = null;
        if (n > -1 && (a = t.getNode(n)), null !== a) return a;
        switch (e.RRNodeType) {
            case d.Document:
                a = new Document;
                break;
            case d.DocumentType:
                a = document.implementation.createDocumentType(e.name, e.publicId, e.systemId);
                break;
            case d.Element:
                {
                    let i = e.tagName.toLowerCase();i = tj[i] || i,
                    a = o && "isSVG" in o && o ? .isSVG ? document.createElementNS(t7.svg, i) : document.createElement(e.tagName);
                    break
                }
            case d.Text:
                a = document.createTextNode(e.data);
                break;
            case d.Comment:
                a = document.createComment(e.data);
                break;
            case d.CDATA:
                a = document.createCDATASection(e.data)
        }
        return o && t.add(a, Object.assign({}, o)), a
    }
    class tJ extends tz(tU) {
        constructor(e) {
            super(), this.UNSERIALIZED_STARTING_ID = -2, this._unserializedId = this.UNSERIALIZED_STARTING_ID, this.mirror = new ro, this.scrollData = null, e && (this.mirror = e)
        }
        get unserializedId() {
            return this._unserializedId--
        }
        createDocument(e, t, r) {
            return new tJ
        }
        createDocumentType(e, t, r) {
            let n = new tQ(e, t, r);
            return n.ownerDocument = this, n
        }
        createElement(e) {
            let t = e.toUpperCase(),
                r;
            switch (t) {
                case "AUDIO":
                case "VIDEO":
                    r = new t4(t);
                    break;
                case "IFRAME":
                    r = new t6(t, this.mirror);
                    break;
                case "CANVAS":
                    r = new tq(t);
                    break;
                case "STYLE":
                    r = new t5(t);
                    break;
                default:
                    r = new t9(t)
            }
            return r.ownerDocument = this, r
        }
        createComment(e) {
            let t = new rt(e);
            return t.ownerDocument = this, t
        }
        createCDATASection(e) {
            let t = new rr(e);
            return t.ownerDocument = this, t
        }
        createTextNode(e) {
            let t = new re(e);
            return t.ownerDocument = this, t
        }
        open() {
            super.open(), this._unserializedId = this.UNSERIALIZED_STARTING_ID
        }
    }
    let tQ = tV(tU);
    class t9 extends tZ(tU) {
        constructor() {
            super(...arguments), this.inputData = null, this.scrollData = null
        }
    }
    class t4 extends tB(t9) {}
    class tq extends t9 {
        constructor() {
            super(...arguments), this.rr_dataURL = null, this.canvasMutations = []
        }
        getContext() {
            return null
        }
    }
    class t5 extends t9 {
        constructor() {
            super(...arguments), this.rules = []
        }
    }
    class t6 extends t9 {
        constructor(e, t) {
            super(e), this.contentDocument = new tJ, this.contentDocument.mirror = t
        }
    }
    let re = tH(tU),
        rt = tX(tU),
        rr = tY(tU);

    function rn(e, t, r, n) {
        let o;
        switch (e.nodeType) {
            case u.DOCUMENT_NODE:
                n && "IFRAME" === n.nodeName ? o = n.contentDocument : (o = t).compatMode = e.compatMode;
                break;
            case u.DOCUMENT_TYPE_NODE:
                {
                    let a = e;o = t.createDocumentType(a.name, a.publicId, a.systemId);
                    break
                }
            case u.ELEMENT_NODE:
                {
                    var i;
                    let s = e,
                        l = (i = s) instanceof HTMLFormElement ? "FORM" : i.tagName.toUpperCase();o = t.createElement(l);
                    let c = o;
                    for (let {
                            name: h,
                            value: p
                        } of Array.from(s.attributes)) c.attributes[h] = p;s.scrollLeft && (c.scrollLeft = s.scrollLeft),
                    s.scrollTop && (c.scrollTop = s.scrollTop);
                    break
                }
            case u.TEXT_NODE:
                o = t.createTextNode(e.textContent || "");
                break;
            case u.CDATA_SECTION_NODE:
                o = t.createCDATASection(e.data);
                break;
            case u.COMMENT_NODE:
                o = t.createComment(e.textContent || "");
                break;
            case u.DOCUMENT_FRAGMENT_NODE:
                o = n.attachShadow({
                    mode: "open"
                });
                break;
            default:
                return null
        }
        let m = r.getMeta(e);
        return t instanceof tJ && (m || (m = function e(t, r) {
            switch (t.RRNodeType) {
                case d.Document:
                    return {
                        id: r,
                        type: t.RRNodeType,
                        childNodes: []
                    };
                case d.DocumentType:
                    {
                        let n = t;
                        return {
                            id: r,
                            type: t.RRNodeType,
                            name: n.name,
                            publicId: n.publicId,
                            systemId: n.systemId
                        }
                    }
                case d.Element:
                    return {
                        id: r,
                        type: t.RRNodeType,
                        tagName: t.tagName.toLowerCase(),
                        attributes: {},
                        childNodes: []
                    };
                case d.Text:
                case d.Comment:
                    return {
                        id: r,
                        type: t.RRNodeType,
                        textContent: t.textContent || ""
                    };
                case d.CDATA:
                    return {
                        id: r,
                        type: t.RRNodeType,
                        textContent: ""
                    }
            }
        }(o, t.unserializedId), r.add(e, m)), t.mirror.add(o, Object.assign({}, m))), o
    }
    class ro {
        constructor() {
            this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
        }
        getId(e) {
            var t;
            if (!e) return -1;
            let r = null === (t = this.getMeta(e)) || void 0 === t ? void 0 : t.id;
            return r ? ? -1
        }
        getNode(e) {
            return this.idNodeMap.get(e) || null
        }
        getIds() {
            return Array.from(this.idNodeMap.keys())
        }
        getMeta(e) {
            return this.nodeMetaMap.get(e) || null
        }
        removeNodeFromMap(e) {
            let t = this.getId(e);
            this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach(e => this.removeNodeFromMap(e))
        }
        has(e) {
            return this.idNodeMap.has(e)
        }
        hasNode(e) {
            return this.nodeMetaMap.has(e)
        }
        add(e, t) {
            let r = t.id;
            this.idNodeMap.set(r, e), this.nodeMetaMap.set(e, t)
        }
        replace(e, t) {
            let r = this.getNode(e);
            if (r) {
                let n = this.nodeMetaMap.get(r);
                n && this.nodeMetaMap.set(t, n)
            }
            this.idNodeMap.set(e, t)
        }
        reset() {
            this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
        }
    }

    function ra(e) {
        return {
            all: e = e || new Map,
            on: function(t, r) {
                var n = e.get(t);
                n ? n.push(r) : e.set(t, [r])
            },
            off: function(t, r) {
                var n = e.get(t);
                n && (r ? n.splice(n.indexOf(r) >>> 0, 1) : e.set(t, []))
            },
            emit: function(t, r) {
                var n = e.get(t);
                n && n.slice().map(function(e) {
                    e(r)
                }), (n = e.get("*")) && n.slice().map(function(e) {
                    e(t, r)
                })
            }
        }
    }(l = h || (h = {}))[l.NotStarted = 0] = "NotStarted", l[l.Running = 1] = "Running", l[l.Stopped = 2] = "Stopped";
    var ri = Object.defineProperty,
        rs = (Object.prototype.hasOwnProperty, Object.prototype.propertyIsEnumerable, (e, t, r) => new Promise((n, o) => {
            var a = e => {
                    try {
                        s(r.next(e))
                    } catch (t) {
                        o(t)
                    }
                },
                i = e => {
                    try {
                        s(r.throw(e))
                    } catch (t) {
                        o(t)
                    }
                },
                s = e => e.done ? n(e.value) : Promise.resolve(e.value).then(a, i);
            s((r = r.apply(e, t)).next())
        }));
    let rl = new Map;

    function rc(e, t) {
        let r = rl.get(e);
        return r || (r = new Map, rl.set(e, r)), r.has(t) || r.set(t, []), r.get(t)
    }

    function rd(e, t, r) {
        return n => rs(this, null, function*() {
            if (n && "object" == typeof n && "rr_type" in n) {
                if (r && (r.isUnchanged = !1), "ImageBitmap" === n.rr_type && "args" in n) {
                    let o = yield rd(e, t, r)(n.args);
                    return yield createImageBitmap.apply(null, o)
                }
                if ("index" in n) {
                    if (r || null === t) return n;
                    let {
                        rr_type: a,
                        index: i
                    } = n;
                    return rc(t, a)[i]
                } else if ("args" in n) {
                    let {
                        rr_type: s,
                        args: l
                    } = n, c = window[s];
                    return new c(...yield Promise.all(l.map(rd(e, t, r))))
                } else {
                    if ("base64" in n) return tr(n.base64);
                    if ("src" in n) {
                        let d = e.get(n.src);
                        if (d) return d; {
                            let u = new Image;
                            return u.src = n.src, e.set(n.src, u), u
                        }
                    }
                    if ("data" in n && "Blob" === n.rr_type) {
                        let h = yield Promise.all(n.data.map(rd(e, t, r)));
                        return new Blob(h, {
                            type: n.type
                        })
                    }
                }
            } else if (Array.isArray(n)) return yield Promise.all(n.map(rd(e, t, r)));
            return n
        })
    }
    var ru = (e, t, r) => new Promise((n, o) => {
        var a = e => {
                try {
                    s(r.next(e))
                } catch (t) {
                    o(t)
                }
            },
            i = e => {
                try {
                    s(r.throw(e))
                } catch (t) {
                    o(t)
                }
            },
            s = e => e.done ? n(e.value) : Promise.resolve(e.value).then(a, i);
        s((r = r.apply(e, t)).next())
    });
    let rh = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject"];

    function rp(e) {
        return ru(this, arguments, function*({
            mutation: e,
            target: t,
            type: r,
            imageMap: n,
            errorHandler: o
        }) {
            try {
                let a = function e(t, r) {
                    try {
                        return r === ey.WebGL ? t.getContext("webgl") || t.getContext("experimental-webgl") : t.getContext("webgl2")
                    } catch {
                        return null
                    }
                }(t, r);
                if (!a) return;
                if (e.setter) {
                    a[e.property] = e.args[0];
                    return
                }
                let i = a[e.property],
                    s = yield Promise.all(e.args.map(rd(n, a))), l = i.apply(a, s);
                ! function e(t, r) {
                    if (!(null != r && r.constructor)) return;
                    let {
                        name: n
                    } = r.constructor;
                    if (!rh.includes(n)) return;
                    let o = rc(t, n);
                    o.includes(r) || o.push(r)
                }(a, l)
            } catch (c) {
                o(e, c)
            }
        })
    }
    var rm = (e, t, r) => new Promise((n, o) => {
        var a = e => {
                try {
                    s(r.next(e))
                } catch (t) {
                    o(t)
                }
            },
            i = e => {
                try {
                    s(r.throw(e))
                } catch (t) {
                    o(t)
                }
            },
            s = e => e.done ? n(e.value) : Promise.resolve(e.value).then(a, i);
        s((r = r.apply(e, t)).next())
    });

    function rf(e) {
        return rm(this, arguments, function*({
            event: e,
            mutation: t,
            target: r,
            imageMap: n,
            errorHandler: o
        }) {
            try {
                let a = r.getContext("2d");
                if (t.setter) {
                    a[t.property] = t.args[0];
                    return
                }
                let i = a[t.property];
                if ("drawImage" === t.property && "string" == typeof t.args[0]) n.get(e), i.apply(a, t.args);
                else {
                    let s = yield Promise.all(t.args.map(rd(n, a)));
                    i.apply(a, s)
                }
            } catch (l) {
                o(t, l)
            }
        })
    }
    var rg = Object.defineProperty;
    Object.prototype.hasOwnProperty, Object.prototype.propertyIsEnumerable;
    let {
        addCustomEvent: ry
    } = tL, {
        freezePage: rv
    } = tL;
    return e.EventType = em, e.IncrementalSource = ef, e.MouseInteractions = eg, e.ReplayerEvents = eb, e.addCustomEvent = ry, e.freezePage = rv, e.record = tL, e.utils = ep, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
}({});