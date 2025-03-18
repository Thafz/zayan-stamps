import {
    m as k,
    H as w,
    h as d,
    l as $,
    o,
    f,
    b as c,
    r as n,
    q as b,
    E as x,
    a as S,
    w as g,
    n as l,
    D as C,
    c as v,
    u as p,
    i as h
} from "./app-LRkNX93x.js";
const B = {
        class: "relative"
    },
    N = {
        __name: "Dropdown",
        props: {
            align: {
                type: String,
                default: "right"
            },
            width: {
                type: String,
                default: "48"
            },
            contentClasses: {
                type: String,
                default: "py-1 bg-white"
            }
        },
        setup(e) {
            const t = e,
                a = u => {
                    r.value && u.key === "Escape" && (r.value = !1)
                };
            k(() => document.addEventListener("keydown", a)), w(() => document.removeEventListener("keydown", a));
            const s = d(() => ({
                    48: "w-48"
                })[t.width.toString()]),
                y = d(() => t.align === "left" ? "ltr:origin-top-left rtl:origin-top-right start-0" : t.align === "right" ? "ltr:origin-top-right rtl:origin-top-left end-0" : "origin-top"),
                r = $(!1);
            return (u, i) => (o(), f("div", B, [c("div", {
                onClick: i[0] || (i[0] = m => r.value = !r.value)
            }, [n(u.$slots, "trigger")]), b(c("div", {
                class: "fixed inset-0 z-40",
                onClick: i[1] || (i[1] = m => r.value = !1)
            }, null, 512), [
                [x, r.value]
            ]), S(C, {
                "enter-active-class": "transition ease-out duration-200",
                "enter-from-class": "opacity-0 scale-95",
                "enter-to-class": "opacity-100 scale-100",
                "leave-active-class": "transition ease-in duration-75",
                "leave-from-class": "opacity-100 scale-100",
                "leave-to-class": "opacity-0 scale-95"
            }, {
                default: g(() => [b(c("div", {
                    class: l(["absolute z-50 mt-2 rounded-md shadow-lg", [s.value, y.value]]),
                    style: {
                        display: "none"
                    },
                    onClick: i[2] || (i[2] = m => r.value = !1)
                }, [c("div", {
                    class: l(["rounded-md ring-1 ring-black ring-opacity-5", e.contentClasses])
                }, [n(u.$slots, "content")], 2)], 2), [
                    [x, r.value]
                ])]),
                _: 3
            })]))
        }
    },
    E = ["href", "target"],
    z = {
        __name: "DropdownLink",
        props: {
            href: {
                type: String,
                required: !0
            },
            target: {
                type: {
                    type: String,
                    default: null
                }
            }
        },
        setup(e) {
            return (t, a) => e.target ? (o(), f("a", {
                key: 1,
                href: e.href,
                target: e.target,
                class: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            }, [n(t.$slots, "default")], 8, E)) : (o(), v(p(h), {
                key: 0,
                href: e.href,
                class: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            }, {
                default: g(() => [n(t.$slots, "default")]),
                _: 3
            }, 8, ["href"]))
        }
    },
    L = ["href", "target"],
    V = {
        __name: "NavLink",
        props: {
            href: {
                type: String,
                required: !0
            },
            active: {
                type: Boolean
            },
            target: {
                type: String,
                default: null
            }
        },
        setup(e) {
            const t = e,
                a = d(() => t.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");
            return (s, y) => e.target ? (o(), f("a", {
                key: 1,
                href: e.href,
                class: l(a.value),
                target: e.target
            }, [n(s.$slots, "default")], 10, L)) : (o(), v(p(h), {
                key: 0,
                href: e.href,
                class: l(a.value)
            }, {
                default: g(() => [n(s.$slots, "default")]),
                _: 3
            }, 8, ["href", "class"]))
        }
    },
    q = ["href", "target"],
    H = {
        __name: "ResponsiveNavLink",
        props: {
            href: {
                type: String,
                required: !0
            },
            active: {
                type: Boolean
            },
            target: {
                type: String,
                default: null
            }
        },
        setup(e) {
            const t = e,
                a = d(() => t.active ? "block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");
            return (s, y) => e.target ? (o(), f("a", {
                key: 1,
                href: e.href,
                class: l(a.value),
                target: e.target
            }, [n(s.$slots, "default")], 10, q)) : (o(), v(p(h), {
                key: 0,
                href: e.href,
                class: l(a.value)
            }, {
                default: g(() => [n(s.$slots, "default")]),
                _: 3
            }, 8, ["href", "class"]))
        }
    };
export {
    V as _, z as a, N as b, H as c
};