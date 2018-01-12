import { EgretDI } from "../Core/di.core";
import { ProviderConfig } from "../Core/di.interface";
import { INJECTABLE_STORE } from "../Store/Injectable.store";

export class Injector {

    private map: Map<any, any>;

    constructor( providerList?: Array<any|ProviderConfig> ) {
        this.map = this.construct( providerList );
    }

    has(token: any): boolean{
        return this.map.has(token);
    }

    setMap(map: Map<any, any>): void{
        this.map = map;
    }

    get(token: any): any{
        if( this.map.has(token) ){
            return this.map.get(token);
        }else{
            throw new Error('无法找到此类的实例');
        }
    }

    getFullMap(): Map<any, any>{
        return this.map;
    }

    assign(injector: Injector): Injector{
        let innerMap = this.map;
        let outterMap = injector.getFullMap();
        let newMap = new Map();
        let newInjector = new Injector();

        innerMap.forEach((val, key) => {
            newMap.set(key, val);
        })
        outterMap.forEach((val, key) => {
            newMap.set(key, val);
        })

        newInjector.setMap(newMap);
        return newInjector;
    }

    private construct( providerList?: Array<any|ProviderConfig> ): Map<any, any>{
        let map: Map<any, any> = new Map();

        if( providerList ){ 
            let list = this.reSort( providerList );
            list.forEach(item => {
                let value;

                if( item.useClass ){
                    value = EgretDI.instanize(item.provider);
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

    private reSort( providerList?: Array<any|ProviderConfig> ): Array<any>{
        let normal = [];
        let useVal = [];
        let useClass = [];
        let useExist = [];

        if( providerList === undefined || providerList.length === 0 ){
            return [];
        }

        providerList.forEach(item => {
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

export const GLOBAL_INJECTOR = new Injector();