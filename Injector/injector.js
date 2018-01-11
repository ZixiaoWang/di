"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var di_core_1 = require("../Core/di.core");
var Injector = /** @class */ (function () {
    function Injector(providerList) {
        this.map = this.construct(providerList);
    }
    Injector.prototype.add = function (token, value) {
        if (this.map.has(token) === false) {
            var val = value ? value : di_core_1.EgretDI.instanize(token);
            this.map.set(token, val);
        }
        else {
            throw new Error(token.name + " \u5DF2\u7ECF\u5B58\u5728\u4E8E\u6B64Injector\uFF0C\u8BF7\u4F7F\u7528useExistInstance\u6216\u8005useValue");
        }
    };
    Injector.prototype.get = function (token) {
        if (this.map.has(token)) {
            return this.map.get(token);
        }
        else {
            throw new Error('无法找到此类的实例');
        }
    };
    Injector.prototype.has = function (token) {
        return this.map.has(token);
    };
    Injector.prototype.construct = function (providerList) {
        var _this = this;
        var map = new Map();
        if (providerList) {
            var list = this.reSort(providerList);
            list.forEach(function (item) {
                var value;
                if (item.useClass) {
                    value = di_core_1.EgretDI.instanize(item.provider);
                }
                else if (item.useValue) {
                    value = item.useValue;
                }
                else if (item.useExistInstance) {
                    value = _this.map.get(item.provider);
                }
                map.set(item.provider, value);
            });
        }
        return map;
    };
    Injector.prototype.reSort = function (providerList) {
        var normal = [];
        var useVal = [];
        var useClass = [];
        var useExist = [];
        providerList.forEach(function (item) {
            if (typeof item === 'function') {
                normal.push({ provider: item, useClass: item });
            }
            else if (typeof item === 'object') {
                if (item.useClass) {
                    useClass.push(item);
                }
                else if (item.useValue) {
                    useVal.push(item);
                }
                else if (item.useExistInstance) {
                    useExist.push(item);
                }
                else {
                    console.warn(JSON.stringify(item) + "\u672A\u80FD\u6210\u529F\u914D\u7F6E\uFF0C\u8BF7\u4F20\u5165EgretDI.ProviderConfig\u7C7B\u578B");
                }
            }
            else {
                throw new Error(item.toString() + "\u4E0D\u662F\u5408\u6CD5\u7684\u7C7B\u578B\uFF0C\u8BF7\u4F20\u5165Function\u6216\u8005EgretDI.ProviderConfig\u7C7B\u578B");
            }
        });
        return normal.concat(useClass, useVal, useExist);
    };
    return Injector;
}());
exports.Injector = Injector;
