(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('reflect-metadata')) :
    typeof define === 'function' && define.amd ? define(['exports', 'reflect-metadata'], factory) :
    (factory((global.DI = {})));
}(this, (function (exports) { 'use strict';

    var InjectableStore = /** @class */ (function () {
        function InjectableStore() {
            this.set = new Set();
        }
        InjectableStore.prototype.register = function (fn) {
            this.set.add(fn);
        };
        InjectableStore.prototype.has = function (fn) {
            return this.set.has(fn);
        };
        return InjectableStore;
    }());
    var INJECTABLE_STORE = new InjectableStore();
    /**
     * Injectable Store
     * Data Structure
     *      [  ...providers  ]
     */

    var InstanceStore = /** @class */ (function () {
        function InstanceStore() {
            this.map = new Map();
        }
        InstanceStore.prototype.add = function (injectableClassList) {
            var _this = this;
            var newMap = this.construct(injectableClassList);
            newMap.forEach(function (val, key) {
                _this.map.set(key, val);
            });
            return this;
        };
        InstanceStore.prototype.assign = function (instanceStore) {
            var innerMap = this.map;
            var outterMap = instanceStore.getMap();
            var newMap = new Map();
            var newInstanceStore = new InstanceStore();
            innerMap.forEach(function (val, key) {
                newMap.set(key, val);
            });
            outterMap.forEach(function (val, key) {
                newMap.set(key, val);
            });
            newInstanceStore.setMap(newMap);
            return newInstanceStore;
        };
        InstanceStore.prototype.has = function (token) {
            return this.map.has(token);
        };
        InstanceStore.prototype.get = function (token) {
            return this.map.get(token);
        };
        InstanceStore.prototype.setMap = function (map) { this.map = map; };
        InstanceStore.prototype.getMap = function () { return this.map; };
        InstanceStore.prototype.construct = function (injectableClassList) {
            var _this = this;
            var map = new Map();
            if (injectableClassList) {
                var list = this.reSort(injectableClassList);
                list.forEach(function (item) {
                    var value;
                    if (INJECTABLE_STORE.has(item.provider) === false) {
                        throw new Error('未能找到可注入类，请用@Injectable()修饰');
                    }
                    if (item.useClass) {
                        value = instanize(item.useClass);
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
        InstanceStore.prototype.reSort = function (injectableClassList) {
            var normal = [];
            var useVal = [];
            var useClass = [];
            var useExist = [];
            if (injectableClassList === undefined || injectableClassList.length === 0) {
                return [];
            }
            injectableClassList.forEach(function (item) {
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
                        console.warn(JSON.stringify(item) + "\u672A\u80FD\u6210\u529F\u914D\u7F6E\uFF0C\u8BF7\u4F20\u5165ProviderConfig\u7C7B\u578B");
                    }
                }
                else {
                    throw new Error(item.toString() + "\u4E0D\u662F\u5408\u6CD5\u7684\u7C7B\u578B\uFF0C\u8BF7\u4F20\u5165Function\u6216\u8005ProviderConfig\u7C7B\u578B");
                }
            });
            return normal.concat(useClass, useVal, useExist);
        };
        return InstanceStore;
    }());
    var INSTANCE_STORE = new InstanceStore();
    /**
     * Instance Store
     * Data Structure
     *  [
     *      <Provider, instance>,
     *      <Provider, instance>,
     *      <Provider, instance>
     *      ...
     *  ]
     */

    var ComponentStore = /** @class */ (function () {
        function ComponentStore() {
            this.map = new Map();
        }
        ComponentStore.prototype.has = function (component) {
            return this.map.has(component);
        };
        ComponentStore.prototype.add = function (component, config) {
            var componentStoreConfig = { priority: 0, restrict: true, instanceStore: new InstanceStore() };
            this.map.set(component, config || componentStoreConfig);
            return this;
        };
        ComponentStore.prototype.get = function (component) {
            return this.map.get(component);
        };
        ComponentStore.prototype.getInstanceByType = function (component, paramType) {
            if (this.map.has(component)) {
                var config = this.map.get(component);
                return config.instanceStore.get(paramType);
            }
            else {
                return null;
            }
        };
        ComponentStore.prototype.register = function (componnet, config) {
            var componentStoreConfig = { priority: 0, restrict: true, instanceStore: new InstanceStore() };
            this.map.set(componnet, config || componentStoreConfig);
        };
        ComponentStore.prototype.update = function (component, config) {
            this.map.set(component, config);
        };
        ComponentStore.prototype.getLocalInstanceStore = function (component) {
            if (this.map.has(component) && this.map.get(component).instanceStore) {
                return this.map.get(component).instanceStore;
            }
            else {
                return null;
            }
        };
        return ComponentStore;
    }());
    var COMPONENT_STORE = new ComponentStore();
    /**
     * Component Store
     * Data Structure
     *  [
     *      <Component, { priority, localInjector }>,
     *      <Component, { priority, localInjector }>,
     *      ...
     *  ]
     */

    /// <reference path="../../node_modules/reflect-metadata/reflect-metadata.d.ts" />
    function instanize(Fn) {
        var args = Reflect.getMetadata('design:paramtypes', Fn) || [];
        args = args.map(function (paramType) {
            if (INJECTABLE_STORE.has(paramType)) {
                return instanize(paramType);
            }
            else {
                throw new Error(paramType.name + " is not an injectable class, please add @Injectable() to register class");
            }
        });
        var instance = Object.create(Fn.prototype);
        Fn.apply(instance, args);
        return instance;
    }
    function construct(Fn) {
        var args = Reflect.getMetadata('design:paramtypes', Fn) || [];
        var config = COMPONENT_STORE.get(Fn);
        var componentInstance = Object.create(Fn.prototype);
        if (config === undefined) {
            throw new Error("Cannot construct " + Fn.name + ", please add @Component decorator");
        }
        args = args.map(function (paramType) {
            // @Inject
            if (config.priority === 2) {
                var instance = COMPONENT_STORE.getInstanceByType(Fn, paramType);
                if (instance === undefined && config.restrict) {
                    throw new Error("Cannot instanize " + paramType.name + " for " + Fn.name + ", please add " + paramType.name + " to the provider list.");
                }
                else if (instance === undefined && !config.restrict) {
                    return null;
                }
                else {
                    return instance;
                }
            }
            // @Component
            if (config.priority === 1) {
                var localInstance = COMPONENT_STORE.getInstanceByType(Fn, paramType);
                var globalInstance = INSTANCE_STORE.get(paramType);
                var instance = localInstance || globalInstance;
                if (instance === undefined && config.restrict) {
                    throw new Error("Cannot instanize " + paramType.name + " for " + Fn.name + ", please add " + paramType.name + " to the provider list.");
                }
                else if (instance === undefined && !config.restrict) {
                    return null;
                }
                else {
                    return instance;
                }
            }
            // Other
            if (isNaN(config.priority) || config.priority < 1 || config.priority > 2) {
                throw new Error("Incorrect config for " + Fn.name);
            }
        });
        Fn.apply(componentInstance, args);
        return componentInstance;
    }
    function bootstrap(config) {
        INSTANCE_STORE.add(config.provider);
    }

    function Inject() {
        var providers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            providers[_i] = arguments[_i];
        }
        return function (target) {
            var localInstanceStore = new InstanceStore().add(providers || []);
            var componentConfig = { priority: 2, restrict: true, instanceStore: localInstanceStore };
            COMPONENT_STORE.register(target, componentConfig);
            return target;
        };
    }

    function Injectable() {
        return function (target) {
            INJECTABLE_STORE.register(target);
            return target;
        };
    }

    function Component(componentConfig) {
        return function (target) {
            var strict = false;
            var localInstanceStore = new InstanceStore();
            if (componentConfig) {
                strict = !!componentConfig.restrict;
                localInstanceStore.add(componentConfig.provider || []);
            }
            var theConfig = { priority: 1, restrict: strict, instanceStore: localInstanceStore };
            COMPONENT_STORE.register(target, theConfig);
            return target;
        };
    }

    exports.instanize = instanize;
    exports.bootstrap = bootstrap;
    exports.construct = construct;
    exports.Inject = Inject;
    exports.Injectable = Injectable;
    exports.Component = Component;
    exports.InstanceStore = InstanceStore;
    exports.ComponentStore = ComponentStore;
    exports.INJECTABLE_STORE = INJECTABLE_STORE;
    exports.INSTANCE_STORE = INSTANCE_STORE;
    exports.COMPONENT_STORE = COMPONENT_STORE;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.web.js.map
