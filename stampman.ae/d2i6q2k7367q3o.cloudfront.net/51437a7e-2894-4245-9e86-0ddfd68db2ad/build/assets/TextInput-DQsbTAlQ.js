import {
    o as s,
    f as o,
    t as n,
    r as i,
    O as d,
    l as c,
    m,
    q as p,
    K as f
} from "./app-LRkNX93x.js";
const _ = {
        class: "block font-medium text-sm text-primary"
    },
    b = {
        key: 0
    },
    y = {
        key: 1
    },
    x = {
        __name: "InputLabel",
        props: {
            value: {
                type: String
            }
        },
        setup(e) {
            return (a, r) => (s(), o("label", _, [e.value ? (s(), o("span", b, n(e.value), 1)) : (s(), o("span", y, [i(a.$slots, "default")]))]))
        }
    },
    h = {
        __name: "TextInput",
        props: {
            modelValue: {
                type: String,
                required: !0
            },
            modelModifiers: {}
        },
        emits: ["update:modelValue"],
        setup(e, {
            expose: a
        }) {
            const r = d(e, "modelValue"),
                t = c(null);
            return m(() => {
                t.value.hasAttribute("autofocus") && t.value.focus()
            }), a({
                focus: () => t.value.focus()
            }), (v, u) => p((s(), o("input", {
                class: "border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm bg-gray-100 focus:bg-white focus:ring-1 block w-full sm:text-sm border p-2 border-none",
                "onUpdate:modelValue": u[0] || (u[0] = l => r.value = l),
                ref_key: "input",
                ref: t
            }, null, 512)), [
                [f, r.value]
            ])
        }
    };
export {
    x as _, h as a
};