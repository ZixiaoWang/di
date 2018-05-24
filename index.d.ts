export class InjectableStore {
    private set;
    constructor();
    register(fn: any): void;
    has(fn: any): boolean;
}
export const INJECTABLE_STORE: InjectableStore;
export interface ComponentConfig {
    provider: Array<any>;
    restrict?: boolean;
}
export interface ProviderConfig {
    provider: any;
    useValue: any;
    useClass: any;
    useExistInstance: any;
}
export interface ComponentStoreConfig {
    priority: number;
    restrict: boolean;
    instanceStore: InstanceStore;
}
export class ComponentStore {
    private map;
    constructor();
    has(component: any): boolean;
    add(component: any, config?: ComponentStoreConfig): ComponentStore;
    get(component: any): ComponentStoreConfig;
    getInstanceByType(component: any, paramType: any): any;
    register(componnet: any, config?: ComponentStoreConfig): void;
    update(component: any, config: ComponentStoreConfig): void;
    getLocalInstanceStore(component: any): InstanceStore;
}
export const COMPONENT_STORE: ComponentStore;
export function instanize(Fn: any): any;
export function construct(Fn: any): any;
export function bootstrap(config: ComponentConfig): void;
export class InstanceStore {
    private map;
    constructor();
    add(injectableClassList?: Array<any | ProviderConfig>): InstanceStore;
    assign(instanceStore: InstanceStore): InstanceStore;
    has(token: any): boolean;
    get(token: any): boolean;
    setMap(map: Map<any, any>): void;
    getMap(): Map<any, any>;
    private construct(injectableClassList?);
    private reSort(injectableClassList?);
}
export const INSTANCE_STORE: InstanceStore;
export function Component(config?: ComponentConfig): (target: any) => any;
export function Inject(...providers: any[]): (target: any) => any;
export function Injectable(): (target: any) => any;
