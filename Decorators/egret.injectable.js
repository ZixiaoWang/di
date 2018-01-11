"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_factory_1 = require("../Store/store.factory");
function EgretInjectable(namespace) {
    return function (target) {
        store_factory_1.DISTORE_FACTORY.createIfNotExist(namespace);
        var diStore = store_factory_1.DISTORE_FACTORY.getDIStore(namespace);
        diStore.register(target);
        return target;
    };
}
exports.EgretInjectable = EgretInjectable;
