"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var injector_1 = require("../Injector/injector");
var injector_factory_1 = require("../Injector/injector.factory");
var EgretDI;
(function (EgretDI) {
    function instanize(Fn) {
        var instance = Object.create(Fn.prototype);
        var args = Reflect.getMetadata('design:paramTypes', Fn) || [];
        args = args.map(function (arg) {
            return instanize(arg);
        });
        Fn.apply(instance, args);
        return instance;
    }
    EgretDI.instanize = instanize;
})(EgretDI = exports.EgretDI || (exports.EgretDI = {}));
function EgretDIBootstrap(config) {
    var globalInjector = new injector_1.Injector(config.provider);
    injector_factory_1.INJECTOR_FACTORY.setScope(config.project, globalInjector);
}
exports.EgretDIBootstrap = EgretDIBootstrap;
