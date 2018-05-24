import { ComponentConfig, ComponentStoreConfig } from '../Core/di.interface';
import { InstanceStore } from "../Store";
import { INSTANCE_STORE } from '../Store/instance.store'
import { COMPONENT_STORE } from '../Store/component.store';

export function Component(config: ComponentConfig) {
    return function(target) {
        const strict = !!config.restrict;
        const localInstanceStore: InstanceStore = new InstanceStore().add(config.provider || []);
        let componentConfig: ComponentStoreConfig = { priority: 1, restrict: strict, instanceStore: localInstanceStore };
        COMPONENT_STORE.register(target, componentConfig);
        return target;
    }
}