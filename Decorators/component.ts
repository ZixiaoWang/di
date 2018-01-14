import { ComponentConfig } from '../Core'
import { InstanceStore } from "../Store";
import { INSTANCE_STORE } from '../Store/instance.store'
import { COMPONENT_STORE } from '../Store/component.store';

export function Component(config: ComponentConfig) {
    return function(target) {
        const strict = config.restrict || true;
        const localInjector = new InstanceStore().add(config.provider || []);
        let args = Reflect.getMetadata('design:paramtypes', target) || [];

        args.forEach(paramType => {
            let paramInstance = localInjector.get(paramType) || INSTANCE_STORE.get(paramType);
            if(paramInstance === undefined && strict === true){
                throw new Error(`Cannot find the instance of ${paramType.name}, please register ${paramType.name} to provider list`);
            }else{
                paramInstance = null;
            }
            args.push( paramInstance );
        });

        COMPONENT_STORE.register(target, args);

        return target;
    }
}