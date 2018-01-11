import { EgretDI } from "../Core/di.core";

export class Injector {

    /**
     * 数据结构 <Token, Instance>
     * Token必须为FUNCTION， Instance为Object
     */
    private map: Map<any, any>;

    constructor( providerList?: Array<any|EgretDI.ProviderConfig> ) {
        this.map = this.construct( providerList );
    }

    add(token: any, value?: any) {
        if( this.map.has(token) === false ) {
            let val: any = value ? value : EgretDI.instanize(token);
            this.map.set(token, val);
        }else{
            throw new Error(`${token.name} 已经存在于此Injector，请使用useExistInstance或者useValue`);
        }
    }

    get(token: any) {
        if( this.map.has(token) ){
            return this.map.get(token);
        }else{
            throw new Error('无法找到此类的实例');
        }
    }

    has(token: any) {
        return this.map.has(token);
    }

    private construct( providerList?: Array<any|EgretDI.ProviderConfig> ) {
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

    private reSort( providerList?: Array<any|EgretDI.ProviderConfig> ) {
        let normal = [];
        let useVal = [];
        let useClass = [];
        let useExist = [];

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
                    console.warn(`${JSON.stringify(item)}未能成功配置，请传入EgretDI.ProviderConfig类型`);
                }
            }else{
                throw new Error(`${item.toString()}不是合法的类型，请传入Function或者EgretDI.ProviderConfig类型`);
            }
        });

        return normal.concat(useClass, useVal, useExist);
    }

}