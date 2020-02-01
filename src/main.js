(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@dojo/framework/core/vdom", "@dojo/framework/core/middleware/i18n", "@dojo/framework/i18n/unit", "./nls"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var vdom_1 = require("@dojo/framework/core/vdom");
    var i18n_1 = require("@dojo/framework/core/middleware/i18n");
    var unit_1 = require("@dojo/framework/i18n/unit");
    var nls_1 = require("./nls");
    var factory = vdom_1.create({ i18n: i18n_1.default });
    var App = factory(function (_a) {
        var i18n = _a.middleware.i18n;
        var _b = i18n.localize(nls_1.default), messages = _b.messages, format = _b.format;
        var noItems = format("items", { itemCount: 0 });
        var item = format("items", { itemCount: 1 });
        var items = format("items", { itemCount: 10 });
        // how can locale ever be optional?!
        var locale = i18n.get().locale;
        // if locale is not passed here (and it's optional, it doesn't update with i18n.set()
        var unit = unit_1.formatUnit(1000, "meter");
        return (vdom_1.tsx("div", null,
            vdom_1.tsx("div", { class: "group" },
                vdom_1.tsx("button", { onclick: function () { return i18n.set({ locale: "fr" }); } }, "fr"),
                vdom_1.tsx("button", { onclick: function () { return i18n.set({ locale: "en" }); } }, "en"),
                vdom_1.tsx("button", { onclick: function () { return i18n.set({ locale: "en-GB" }); } }, "en-GB"),
                vdom_1.tsx("button", { onclick: function () { return i18n.set({ locale: "de" }); } }, "de"),
                vdom_1.tsx("button", { onclick: function () { return i18n.set({ locale: "ja" }); } }, "ja")),
            vdom_1.tsx("div", { class: "group" },
                vdom_1.tsx("div", { class: "group" },
                    vdom_1.tsx("label", null,
                        "Basic message replacement:",
                        vdom_1.tsx("div", null, messages.hello),
                        vdom_1.tsx("div", null, messages.fallback))),
                vdom_1.tsx("div", { class: "group" },
                    vdom_1.tsx("label", null,
                        "ICU with plurals:",
                        vdom_1.tsx("div", null, noItems),
                        vdom_1.tsx("div", null, item),
                        vdom_1.tsx("div", null, items))),
                vdom_1.tsx("div", { class: "group" },
                    vdom_1.tsx("label", null,
                        "Unit:",
                        vdom_1.tsx("div", null, unit))))));
    });
    var r = vdom_1.default(function () { return vdom_1.tsx(App, null); });
    r.mount();
});
//# sourceMappingURL=main.js.map