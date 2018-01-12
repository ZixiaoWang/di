import 'reflect-metadata';
import { Injector } from '../Injector/injector';
import { INJECTOR_FACTORY } from '../Injector/injector.factory';
import { ComponentConfig } from './di.interface';

export namespace EgretDI {

    export function instanize(Fn){
        let instance = Object.create(Fn.prototype);
        let args = Reflect.getMetadata('design:paramTypes', Fn) || [];

        args = args.map(arg => {
            return instanize(arg);
        });

        Fn.apply(instance, args);
        return instance;
    }

}

export function EgretDIBootstrap(config: ComponentConfig) {
    let globalInjector = new Injector(config.provider);
    INJECTOR_FACTORY.setScope(config.project, globalInjector);
}