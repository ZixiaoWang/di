"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var DIStoreFactory = /** @class */ (function () {
    function DIStoreFactory() {
        this.map = new Map();
        this.map.set('GLOBAL', new store_1.DIStore());
    }
    DIStoreFactory.prototype.createIfNotExist = function (namespace) {
        if (this.map.has(namespace) === false) {
            this.map.set(namespace, new store_1.DIStore());
        }
    };
    DIStoreFactory.prototype.hasDIStore = function (namespace) {
        return this.map.has(namespace);
    };
    DIStoreFactory.prototype.getDIStore = function (namespace) {
        return this.map.get(namespace);
    };
    DIStoreFactory.prototype.getGlobalDIStore = function () {
        return this.map.get('GLOBAL');
    };
    return DIStoreFactory;
}());
exports.DIStoreFactory = DIStoreFactory;
exports.DISTORE_FACTORY = new DIStoreFactory();
