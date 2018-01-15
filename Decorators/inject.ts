import { InstanceStore } from "../Store";
import { COMPONENT_STORE } from '../Store/component.store';
import { ComponentStoreConfig } from "../Core/di.interface";

export function Inject(...providers){
    return function(target){
        const localInstanceStore: InstanceStore = new InstanceStore().add(providers || []);
        let componentConfig: ComponentStoreConfig = { priority: 2, restrict: true, instanceStore: localInstanceStore };
        COMPONENT_STORE.register(target, componentConfig);
        return target;
    }
}