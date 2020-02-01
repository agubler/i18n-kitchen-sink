(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var locales = {
        'en': function () { return __syncRequire ? Promise.resolve().then(function () { return require('./en'); }) : new Promise(function (resolve_1, reject_1) { require(['./en'], resolve_1, reject_1); }); },
        'en-GB': function () { return __syncRequire ? Promise.resolve().then(function () { return require('./en-gb'); }) : new Promise(function (resolve_2, reject_2) { require(['./en-gb'], resolve_2, reject_2); }); },
        'de': function () { return __syncRequire ? Promise.resolve().then(function () { return require('./de'); }) : new Promise(function (resolve_3, reject_3) { require(['./de'], resolve_3, reject_3); }); }
    };
    var messages = {
        'hello': 'bonjour',
        'fallback': 'repli fr',
        'items': "You have {itemCount, plural,\n\t\t=0 {no items}\n\t\t=1 {# item}\n\t\tother {# items}\n\t\t}."
    };
    exports.default = { messages: messages, locales: locales };
});
//# sourceMappingURL=index.js.map