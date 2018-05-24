import { ProviderConfig } from "../Core/Interface";
import { instanize } from "../Core/Core";
import { INJECTABLE_STORE } from "./injectable.store";

export class InstanceStore {

    private map: Map<any, any>

    constructor() {
        this.map = new Map<any, any>();
    }

    add( injectableClassList?: Array<any|ProviderConfig> ): InstanceStore{
        let newMap = this.construct( injectableClassList );
        newMap.forEach((val, key) => {
            this.map.set(key, val);
        });
        return this;
    }

    assign(instanceStore: InstanceStore): InstanceStore{
        let innerMap = this.map;
        let outterMap = instanceStore.getMap();
        let newMap = new Map();
        let newInstanceStore = new InstanceStore();

        innerMap.forEach((val, key) => {
            newMap.set(key, val);
        })
        outterMap.forEach((val, key) => {
            newMap.set(key, val);
        })

        newInstanceStore.setMap(newMap);
        return newInstanceStore;
    }

    has(token: any): boolean{
        return this.map.has(token);
    }

    get(token: any): boolean{
        return this.map.get(token);
    }

    setMap(map: Map<any, any>){ this.map = map; }
    getMap(): Map<any, any> { return this.map; }

    private construct( injectableClassList?: Array<any|ProviderConfig> ): Map<any, any>{
        let map: Map<any, any> = new Map();

        if( injectableClassList ){ 
            let list = this.reSort( injectableClassList );

            list.forEach(item => {
                let value;

                if( INJECTABLE_STORE.has(item.provider) === false ){
                    throw new Error('未能找到可注入类，请用@Injectable()修饰');
                }

                if( item.useClass ){
                    value = instanize(item.useClass);
                }else if( item.useValue ){
                    value = item.useValue;
                }else if( item.useExistInstance ){
                    value = this.map.get( item.provider );
                }
                map.set( item.provider, value );
            });
        }

        return map;        
    }

    private reSort( injectableClassList?: Array<any|ProviderConfig> ): Array<any>{
        let normal = [];
        let useVal = [];
        let useClass = [];
        let useExist = [];

        if( injectableClassList === undefined || injectableClassList.length === 0 ){
            return [];
        }

        injectableClassList.forEach(item => {
            if( typeof item === 'function' ) {
                normal.push( { provider: item, useClass: item } );
            }else if( typeof item === 'object' ){
                if(item.useClass){
                    useClass.push(item)
                }else if(item.useValue){
                    useVal.push(item);
                }else if(item.useExistInstance){
                    useExist.push(item);
                }else{
                    console.warn(`${JSON.stringify(item)}未能成功配置，请传入ProviderConfig类型`);
                }
            }else{
                throw new Error(`${item.toString()}不是合法的类型，请传入Function或者ProviderConfig类型`);
            }
        });

        return normal.concat(useClass, useVal, useExist);
    }

}

export const INSTANCE_STORE = new InstanceStore();

/**
 * Instance Store
 * Data Structure
 *  [
 *      <Provider, instance>,
 *      <Provider, instance>,
 *      <Provider, instance>
 *      ...
 *  ]
 */