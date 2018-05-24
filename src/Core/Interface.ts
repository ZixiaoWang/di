import { InstanceStore } from "../Store/instance.store";

export interface ComponentConfig {
    provider: Array<any>,
    restrict?: boolean
}

export interface ProviderConfig {
    provider: any,
    useValue: any,
    useClass: any,
    useExistInstance: any
}

export interface ComponentStoreConfig {
    priority: number,
    restrict: boolean,
    instanceStore: InstanceStore
}