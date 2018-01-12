"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var injector_1 = require("../Injector/injector");
var index_1 = require("../index");
function EgretInject() {
    var providers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        providers[_i] = arguments[_i];
    }
    return function (target) {
        var proto = target.prototype;
        var localInjector = new injector_1.Injector(providers);
        console.log(localInjector);
        index_1.INJECTOR_FACTORY.setScope(target, localInjector);
        return target;
    };
}
exports.EgretInject = EgretInject;
