"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DIStore = /** @class */ (function () {
    function DIStore() {
        this.map = new Map();
    }
    DIStore.prototype.register = function (provider) {
        if (typeof provider === 'function') {
            this.map.set(provider.name, provider);
        }
        else {
            console.error(provider.toString() + " is not a function");
        }
    };
    DIStore.prototype.hasProvider = function (provider) {
        var name = typeof provider === 'function' ? provider.name : provider;
        return this.map.has(name);
    };
    DIStore.prototype.getProvider = function (provider) {
        var name = typeof provider === 'function' ? provider.name : provider;
        return this.map.get(name);
    };
    return DIStore;
}());
exports.DIStore = DIStore;
