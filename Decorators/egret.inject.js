"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var injector_1 = require("../Injector/injector");
function EgretInject() {
    var providers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        providers[_i] = arguments[_i];
    }
    return function (target) {
        var proto = target.prototype;
        var localInjector = new (injector_1.Injector.bind.apply(injector_1.Injector, [void 0].concat(providers)))();
        var args = [];
        args = Reflect.getMetadata('design:paramTypes', target).map(function (arg) {
            return localInjector.get(arg);
        });
        target = (function () {
            function fn() {
                var argList = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    argList[_i] = arguments[_i];
                }
                var params = argList.length === 0 ? args : argList;
                this.constructor.call(this, params);
                return this;
            }
            Object.defineProperty(fn, 'name', { value: target.name });
            fn.prototype.constructor = fn;
            return fn;
        })();
        target.prototype = proto;
        return target;
    };
}
exports.EgretInject = EgretInject;
