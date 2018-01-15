import 'reflect-metadata';
import { ComponentConfig, ComponentStoreConfig } from './di.interface';
import { INJECTABLE_STORE } from '../Store/injectable.store'
import { INSTANCE_STORE } from '../Store/instance.store';
import { COMPONENT_STORE } from '../Store/component.store';

export function instanize(Fn){
    let args = Reflect.getMetadata('design:paramtypes', Fn) || [];

    args = args.map(paramType => {
        if( INJECTABLE_STORE.has(paramType) ){
            return instanize(paramType);
        }else{
            throw new Error(`${paramType.name} is not an injectable class, please add @DI.Injectable() to register class`);
        }
    });

    let instance = Object.create(Fn.prototype);
    Fn.apply(instance, args);
    return instance;
}

export function construct(Fn) {
    let args = Reflect.getMetadata('design:paramtypes', Fn) || [];
    let config: ComponentStoreConfig = COMPONENT_STORE.get(Fn);
    let componentInstance = Object.create(Fn);

    if( config === undefined ){
        throw new Error(`Cannot construct ${ Fn.name }, please add @DI.Component decorator`);
    }

    args = args.map(paramType => {

        // @Inject
        if( config.priority === 2 ){
            let instance = COMPONENT_STORE.getInstanceByType(Fn, paramType);
            if( instance === undefined && config.restrict ){
                throw new Error(`Cannot instanize ${ paramType.name } for ${ Fn.name }, please add ${ paramType.name } to the provider list.`);
            }else if( instance === undefined && !config.restrict ){
                return null
            }else{
                return instance;
            }
        }

        // @Component
        if( config.priority === 1 ){
            let localInstance = COMPONENT_STORE.getInstanceByType(Fn, paramType);
            let globalInstance = INSTANCE_STORE.get(paramType);
            let instance = localInstance || globalInstance;
            if( instance === undefined && config.restrict ){
                throw new Error(`Cannot instanize ${ paramType.name } for ${ Fn.name }, please add ${ paramType.name } to the provider list.`);
            }else if( instance === undefined && !config.restrict ){
                return null
            }else{
                return instance;
            }
        }

        // Other
        if( isNaN(config.priority) || config.priority < 1 || config.priority > 2 ){
            throw new Error(`Incorrect config for ${ Fn.name }`);
        }
    });

    Fn.apply(componentInstance, args);
    return componentInstance;
}

export function bootstrap(config: ComponentConfig) {
    INSTANCE_STORE.add( config.provider );
}
