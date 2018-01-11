import { DISTORE_FACTORY } from "../Store/store.factory";
import { DIStore } from "../Store/store";

export function EgretInjectable(namespace){
    return function(target){
        DISTORE_FACTORY.createIfNotExist(namespace);
        let diStore: DIStore = DISTORE_FACTORY.getDIStore(namespace);
        diStore.register(target);
        return target;
    }
}