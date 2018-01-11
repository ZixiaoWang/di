import { Injector } from "./injector";

class InjectorFactory {

    private map: Map<any, Injector>;

    constructor() {
        this.map = new Map();
        this.map.set('GLOBAL', new Injector());
    }

    setScope(namespace: any, injector?: Injector){
        let existInjector = injector ? injector : new Injector();
        this.map.set(namespace, existInjector);
    }

    getScope(namespace: any){
        if( this.map.has(namespace) ){
            return this.map.get(namespace);
        }else{
            return null;
        }
    }

    hasScope(namespace: any){
        return this.map.has(namespace);
    }
}

export const INJECTOR_FACTORY = new InjectorFactory();