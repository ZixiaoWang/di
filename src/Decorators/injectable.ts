import { INJECTABLE_STORE } from "../Store/injectable.store";

export function Injectable(){
    return function(target){
        INJECTABLE_STORE.register(target);
        return target;
    }
}