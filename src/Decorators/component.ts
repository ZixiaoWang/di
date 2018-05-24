import { ComponentConfig, ComponentStoreConfig } from '../Core/Interface';
import { INSTANCE_STORE, InstanceStore } from '../Store/instance.store'
import { COMPONENT_STORE } from '../Store/component.store';

export function Component(componentConfig?: ComponentConfig) {
    return function(target) {
        let strict = false;
        let localInstanceStore: InstanceStore = new InstanceStore();
        if(componentConfig) {
            strict = !!componentConfig.restrict;
            localInstanceStore.add(componentConfig.provider || []);
        }
        let theConfig: ComponentStoreConfig = { priority: 1, restrict: strict, instanceStore: localInstanceStore };
        COMPONENT_STORE.register(target, theConfig);
        return target;
    }
}