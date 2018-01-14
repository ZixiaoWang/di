import 'reflect-metadata';
import { ComponentConfig } from './di.interface';
import { INJECTABLE_STORE } from '../Store/injectable.store'
import { INSTANCE_STORE } from '../Store/instance.store';

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

export function bootstrap(config: ComponentConfig) {
    INSTANCE_STORE.add( config.provider );
}
