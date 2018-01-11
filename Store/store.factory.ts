import { DIStore } from './store';

export class DIStoreFactory {

    private map: Map<any, DIStore>;

    constructor () {
        this.map = new Map<any, DIStore>();
        this.map.set('GLOBAL', new DIStore());
    }

    createIfNotExist(namespace: any) {
        if( this.map.has( namespace ) === false ){
            this.map.set( namespace, new DIStore() );
        }
    }

    hasDIStore(namespace: any): boolean {
        return this.map.has( namespace );
    }

    getDIStore(namespace: any): DIStore {
        return this.map.get( namespace );
    }

    getGlobalDIStore(): DIStore{
        return this.map.get('GLOBAL');
    }
}

export const DISTORE_FACTORY = new DIStoreFactory();