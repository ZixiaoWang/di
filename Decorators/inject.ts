import { InstanceStore } from "../Store";
import { COMPONENT_STORE } from '../Store/component.store';

export function Inject(...providers){
    return function(target){
        let localInjector = new InstanceStore().add(providers);
        let args = Reflect.getMetadata('design:paramtypes', target) || [];

        args.forEach(paramType => {
            let paramInstance = localInjector.get(paramType);
            if( paramInstance ){
                args.push(paramInstance);
            }else{
                throw new Error(`Cannot find the instance of ${target.name}, please register ${target.name} to provider list`);
            }
        });

        COMPONENT_STORE.register(target, args);
        return target;
    }
}