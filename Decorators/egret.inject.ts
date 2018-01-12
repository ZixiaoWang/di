import 'reflect-metadata';
import { Injector } from "../Injector/injector";
import { INJECTOR_FACTORY } from '../index';

export function EgretInject(...providers){
    return function(target){
        let proto = target.prototype;
        let localInjector = new Injector(providers);                                console.log(localInjector);
        INJECTOR_FACTORY.setScope(target, localInjector);
        return target;
    }
}