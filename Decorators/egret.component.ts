import { Injector } from "../Injector/injector";
import { ComponentConfig } from "../Core/di.interface";
import { GLOBAL_INJECTOR } from "../index";


export function EgretComponent(componentConfig: ComponentConfig) {
    return function(target) {

        let localInjector = new Injector(componentConfig.provider );

        return target;
    }
}