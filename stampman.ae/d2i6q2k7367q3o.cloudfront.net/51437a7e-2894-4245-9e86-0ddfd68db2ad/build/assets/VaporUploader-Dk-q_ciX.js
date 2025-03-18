import {
    l as h,
    o as i,
    f as u,
    d as M,
    t as m,
    g,
    b as s,
    r as B,
    m as U,
    G as A,
    u as _,
    n as N,
    a as E,
    F as S,
    p as V,
    s as I
} from "./app-LRkNX93x.js";
import {
    _ as j
} from "./InputError-BcbNuEMa.js";
const D = {
        class: "mb-4"
    },
    G = {
        key: 0,
        class: "block text-sm font-medium text-gray-700 mb-1"
    },
    L = {
        key: 0,
        class: "text-red-500"
    },
    W = ["value", "required"],
    ge = {
        __name: "SelectInput",
        props: {
            label: {
                type: String,
                default: ""
            },
            modelValue: {
                type: [String, Number],
                default: ""
            },
            required: {
                type: Boolean,
                default: !1
            },
            placeholder: {
                type: String,
                default: "Select an option"
            }
        },
        emits: ["update:modelValue"],
        setup(o, {
            expose: b,
            emit: n
        }) {
            const f = h(null);
            return b({
                focus: () => f.value.focus()
            }), (r, c) => (i(), u("div", D, [o.label ? (i(), u("label", G, [M(m(o.label) + " ", 1), o.required ? (i(), u("span", L, "*")) : g("", !0)])) : g("", !0), s("select", {
                value: o.modelValue,
                onChange: c[0] || (c[0] = y => r.$emit("update:modelValue", y.target.value)),
                required: o.required,
                ref_key: "select",
                ref: f,
                class: "border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm bg-gray-100 focus:bg-white focus:ring-1 block w-full sm:text-sm border p-2 border-none"
            }, [B(r.$slots, "default")], 40, W)]))
        }
    },
    H = "https://d2i6q2k7367q3o.cloudfront.net/51437a7e-2894-4245-9e86-0ddfd68db2ad/build/assets/FileArrowUp-DXSQm1DF.svg",
    P = "https://d2i6q2k7367q3o.cloudfront.net/51437a7e-2894-4245-9e86-0ddfd68db2ad/build/assets/FileText-Du01MGwV.svg",
    K = "https://d2i6q2k7367q3o.cloudfront.net/51437a7e-2894-4245-9e86-0ddfd68db2ad/build/assets/Trash-CrExT328.svg",
    O = {
        class: "w-full"
    },
    Q = {
        key: 0,
        class: "text-xs text-gray-500 mb-2"
    },
    R = ["id", "name", "accept", "multiple"],
    X = {
        class: "p-6"
    },
    J = {
        class: "flex flex-col items-center justify-center space-y-3"
    },
    Y = ["src"],
    Z = {
        class: "flex flex-col items-center text-center"
    },
    ee = {
        class: "text-sm font-medium text-gray-900"
    },
    te = {
        class: "text-xs text-gray-500"
    },
    ae = {
        class: "text-xs text-gray-400 mt-1"
    },
    se = {
        key: 1,
        class: "mt-2"
    },
    le = {
        key: 2,
        class: "mt-4 space-y-2"
    },
    oe = {
        class: "flex justify-between items-center mb-1"
    },
    re = {
        class: "text-sm text-gray-600 truncate"
    },
    ne = {
        class: "text-sm text-gray-600"
    },
    ie = {
        class: "w-full bg-gray-200 rounded-full h-2"
    },
    ue = {
        key: 3,
        class: "mt-4 space-y-2"
    },
    de = {
        class: "flex items-center flex-1 min-w-0 mr-4"
    },
    ce = ["src"],
    me = {
        class: "text-sm text-gray-700 truncate"
    },
    pe = ["onClick", "disabled"],
    fe = ["src"],
    ve = {
        __name: "VaporUploader",
        props: {
            modelValue: {
                type: [Array, Object, String],
                required: !0
            },
            fieldName: {
                type: String,
                required: !0
            },
            accept: {
                type: String,
                default: "*/*"
            },
            maxSize: {
                type: Number,
                default: 25 * 1024 * 1024
            },
            multiple: {
                type: Boolean,
                default: !1
            },
            uploadText: {
                type: String,
                default: "Upload Files"
            },
            changeText: {
                type: String,
                default: "Change Files"
            },
            disclaimer: {
                type: String,
                default: ""
            }
        },
        emits: ["update:modelValue", "file-uploaded", "file-removed"],
        setup(o, {
            emit: b
        }) {
            const n = o,
                f = b,
                r = h([]),
                c = h(!1),
                y = h({}),
                v = h(null),
                x = h(null);
            U(() => {
                k()
            }), A(() => n.modelValue, k);

            function k() {
                if (!n.modelValue) {
                    r.value = [];
                    return
                }
                const e = Array.isArray(n.modelValue) ? n.modelValue : [n.modelValue];
                r.value = e.filter(t => t).map(t => {
                    var a;
                    return {
                        key: typeof t == "string" ? t : t.path || t,
                        name: typeof t == "string" ? t.split("/").pop() : ((a = t.path) == null ? void 0 : a.split("/").pop()) || "File"
                    }
                })
            }

            function T(e) {
                if (e.size > n.maxSize) throw new Error(`File ${e.name} is too large. Maximum size is ${F(n.maxSize)}`);
                if (n.accept !== "*/*") {
                    const t = n.accept.split(",").map(d => d.trim()),
                        a = e.type || "",
                        l = "." + e.name.split(".").pop().toLowerCase();
                    if (!t.some(d => d.startsWith(".") ? l === d.toLowerCase() : d.endsWith("/*") ? a.startsWith(d.slice(0, -1)) : a === d)) throw new Error(`File type not accepted for ${e.name}`)
                }
            }
            async function $(e) {
                try {
                    const {
                        data: {
                            url: t,
                            key: a,
                            headers: l
                        }
                    } = await axios.post("/vapor/signed-storage-url", {
                        bucket: "stampman-storage",
                        content_type: e.type || "application/octet-stream",
                        visibility: "public-read"
                    }), p = { ...l,
                        "Content-Type": e.type || "application/octet-stream"
                    };
                    return delete p.Host, await axios.put(t, e, {
                        headers: p,
                        onUploadProgress: d => {
                            y.value[e.name] = Math.round(d.loaded * 100 / d.total)
                        }
                    }), {
                        key: a,
                        name: e.name
                    }
                } catch (t) {
                    throw console.error("Upload error:", t), new Error(`Failed to upload ${e.name}`)
                }
            }
            async function q(e) {
                const t = Array.from(e.target.files || []);
                if (t.length) {
                    c.value = !0, v.value = null, y.value = {};
                    try {
                        for (const l of t) T(l);
                        const a = [];
                        for (const l of t) {
                            y.value[l.name] = 0;
                            const p = await $(l);
                            a.push(p), f("file-uploaded", p.key)
                        }
                        r.value = n.multiple ? [...r.value, ...a] : a, w()
                    } catch (a) {
                        console.error("Upload error:", a), v.value = a.message
                    } finally {
                        c.value = !1, x.value && (x.value.value = "")
                    }
                }
            }

            function z(e) {
                const t = r.value[e];
                r.value = r.value.filter((a, l) => l !== e), w(), f("file-removed", t.key)
            }

            function w() {
                var e;
                f("update:modelValue", n.multiple ? r.value.map(t => t.key) : ((e = r.value[0]) == null ? void 0 : e.key) || null)
            }

            function F(e) {
                if (e === 0) return "0 Bytes";
                const t = 1024,
                    a = ["Bytes", "KB", "MB", "GB"],
                    l = Math.floor(Math.log(e) / Math.log(t));
                return parseFloat((e / Math.pow(t, l)).toFixed(2)) + " " + a[l]
            }

            function C() {
                v.value = null, x.value && x.value.click()
            }
            return (e, t) => (i(), u("div", O, [o.disclaimer ? (i(), u("p", Q, m(o.disclaimer), 1)) : g("", !0), s("div", {
                class: N(["relative border-2 border-dashed border-gray-300 rounded-lg transition-colors duration-200 ease-in-out hover:border-gray-400", {
                    "bg-gray-50": !c.value,
                    "bg-gray-100": c.value
                }])
            }, [s("input", {
                ref_key: "fileInput",
                ref: x,
                type: "file",
                id: o.fieldName,
                name: o.fieldName,
                accept: o.accept,
                multiple: o.multiple,
                class: "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
                onChange: q
            }, null, 40, R), s("div", X, [s("div", J, [s("img", {
                src: _(H),
                alt: "Upload",
                class: "w-12 h-12 text-gray-400"
            }, null, 8, Y), s("div", Z, [s("span", ee, m(r.value.length > 0 ? o.changeText : o.uploadText), 1), s("span", te, m(o.multiple ? "Tap to select files" : "Tap to select a file"), 1), s("span", ae, " Maximum file size: " + m(F(o.maxSize)), 1)])])])], 2), v.value ? (i(), u("div", se, [E(j, {
                message: v.value
            }, null, 8, ["message"]), s("button", {
                onClick: C,
                class: "mt-2 text-sm text-blue-600 hover:text-blue-800"
            }, " Try again ")])) : g("", !0), c.value ? (i(), u("div", le, [(i(!0), u(S, null, V(y.value, (a, l) => (i(), u("div", {
                key: l,
                class: "bg-white rounded-lg border border-gray-200 p-3"
            }, [s("div", oe, [s("span", re, m(l), 1), s("span", ne, m(a) + "%", 1)]), s("div", ie, [s("div", {
                class: "bg-blue-600 h-2 rounded-full transition-all duration-300",
                style: I({
                    width: `${a}%`
                })
            }, null, 4)])]))), 128))])) : g("", !0), r.value.length > 0 ? (i(), u("div", ue, [(i(!0), u(S, null, V(r.value, (a, l) => (i(), u("div", {
                key: a.key,
                class: "flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-200"
            }, [s("div", de, [s("img", {
                src: _(P),
                alt: "File",
                class: "w-5 h-5 flex-shrink-0 mr-3"
            }, null, 8, ce), s("span", me, m(a.name), 1)]), s("button", {
                type: "button",
                onClick: p => z(l),
                class: "flex-shrink-0 text-gray-400 hover:text-red-500 focus:outline-none",
                disabled: c.value
            }, [s("img", {
                src: _(K),
                alt: "Remove",
                class: "w-5 h-5"
            }, null, 8, fe)], 8, pe)]))), 128))])) : g("", !0)]))
        }
    };
export {
    P as F, K as T, ge as _, ve as a, H as b
};