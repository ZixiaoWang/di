export class DIStore {

    private map: Map<string, any>;

    constructor() {
        this.map = new Map<string, any>();
    }

    register(provider: any) {
        if( typeof provider === 'function' ){
            this.map.set( provider.name, provider );
        }else{
            console.error(`${provider.toString()} is not a function`);
        }
    }

    hasProvider(provider: any | string): boolean{
        let name = typeof provider === 'function' ? provider.name : provider;
        return this.map.has(name);
    }

    getProvider(provider: any | string): any{
        let name = typeof provider === 'function' ? provider.name : provider;
        return this.map.get(name);
    }
}