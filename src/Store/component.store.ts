import { ComponentStoreConfig } from "../Core/Interface";
import { InstanceStore } from "./instance.store";

export class ComponentStore {

    private map: Map<any, ComponentStoreConfig>;

    constructor() {
        this.map = new Map<any, ComponentStoreConfig>();
    }

    has(component: any): boolean {
        return this.map.has(component);
    }

    add(component: any, config?: ComponentStoreConfig): ComponentStore{
        let componentStoreConfig: ComponentStoreConfig = { priority: 0, restrict: true, instanceStore: new InstanceStore() };
        this.map.set(component, config || componentStoreConfig);
        return this;
    }

    get(component: any): ComponentStoreConfig {
        return this.map.get(component);
    }

    getInstanceByType(component: any, paramType: any): any{
        if( this.map.has(component) ){
            let config: ComponentStoreConfig =  this.map.get(component);
            return config.instanceStore.get(paramType);
        }else{
            return null;
        }
    }

    register(componnet: any, config?: ComponentStoreConfig) {
        let componentStoreConfig: ComponentStoreConfig = { priority: 0, restrict: true, instanceStore: new InstanceStore() };
        this.map.set(componnet, config || componentStoreConfig);
    }

    update(component: any, config: ComponentStoreConfig) {
        this.map.set(component, config);
    }

    getLocalInstanceStore(component: any): InstanceStore{
        if( this.map.has(component) && this.map.get(component).instanceStore ) {
            return this.map.get(component).instanceStore;
        }else{
            return null;
        }
    }
}

export const COMPONENT_STORE = new ComponentStore();

/**
 * Component Store
 * Data Structure
 *  [
 *      <Component, { priority, localInjector }>,
 *      <Component, { priority, localInjector }>,
 *      ...
 *  ]
 */