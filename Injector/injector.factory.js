"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var injector_1 = require("./injector");
var InjectorFactory = /** @class */ (function () {
    function InjectorFactory() {
        this.map = new Map();
        this.map.set('GLOBAL', new injector_1.Injector());
    }
    InjectorFactory.prototype.setScope = function (namespace, injector) {
        var existInjector = injector ? injector : new injector_1.Injector();
        this.map.set(namespace, existInjector);
    };
    InjectorFactory.prototype.getScope = function (namespace) {
        if (this.map.has(namespace)) {
            return this.map.get(namespace);
        }
        else {
            return null;
        }
    };
    InjectorFactory.prototype.hasScope = function (namespace) {
        return this.map.has(namespace);
    };
    return InjectorFactory;
}());
exports.INJECTOR_FACTORY = new InjectorFactory();
