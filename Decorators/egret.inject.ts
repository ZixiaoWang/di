import 'reflect-metadata';
import { Injector } from "../Injector/injector";

export function EgretInject(...providers){
    return function(target){
        let proto = target.prototype;
        let localInjector = new Injector(...providers);
        let args = [];

        args = Reflect.getMetadata('design:paramTypes', target).map(arg => {
            return localInjector.get(arg);
        });

        target = (function(){
            function fn(...argList){
                let params = argList.length === 0 ? args : argList;
                this.constructor.call(this, params);
                return this;
            }
            Object.defineProperty(fn, 'name', { value: target.name });
            fn.prototype.constructor = fn;
            return fn;
        })();

        target.prototype = proto;
        return target;
    }
}