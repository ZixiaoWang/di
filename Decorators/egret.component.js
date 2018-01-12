"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var injector_factory_1 = require("../Injector/injector.factory");
var injector_1 = require("../Injector/injector");
function EgretComponent(componentConfig) {
    return function (target) {
        var proto = target.prototype;
        var globalInjector = injector_factory_1.INJECTOR_FACTORY.getScope(componentConfig.project);
        var localInjector = new injector_1.Injector(componentConfig.provider);
        console.log(globalInjector, localInjector);
        var mergedInjector = globalInjector.assign(localInjector);
        injector_factory_1.INJECTOR_FACTORY.setScope(target, mergedInjector);
        return target;
    };
}
exports.EgretComponent = EgretComponent;
