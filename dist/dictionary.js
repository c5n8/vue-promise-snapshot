"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = void 0;
function extend(base, extension) {
    return new Proxy(base, {
        get(target, prop, receiver) {
            if (prop in extension) {
                return extension[prop];
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
exports.extend = extend;
