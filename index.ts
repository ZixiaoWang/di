import { 
    instanize, 
    bootstrap,
    construct,
    ComponentConfig, 
    ProviderConfig } from './Core';
import { 
    Inject,
    Injectable,
    Component } from './Decorators';
import { 
    InstanceStore, 
    ComponentStore } from './Store';
    
import { INJECTABLE_STORE } from './Store/injectable.store';
import { INSTANCE_STORE } from './Store/instance.store';
import { COMPONENT_STORE } from './Store/component.store';

(function(glo){
    glo['DI'] = glo['DI'] || {
        instanize: instanize,
        bootstrap: bootstrap,
        Inject: Inject,
        Injectable: Injectable,
        construct: construct,
        Component: Component,
        INJECTABLE_STORE: INJECTABLE_STORE,
        INSTANCE_STORE: INSTANCE_STORE,
        COMPONENT_STORE: COMPONENT_STORE,
        InstanceStore: InstanceStore,
        ComponentStore: ComponentStore
    };
    console.log('DI system has initialized, now you can use variable DI.');
})(window || global);