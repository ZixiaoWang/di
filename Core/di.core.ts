import 'reflect-metadata';
import { INJECTOR_FACTORY } from '../Injector/injector.factory';
import { Injector } from '../Injector/injector';

export namespace EgretDI {

    export function bootstrap(config: EgretDI.ComponentConfig) {
        let globalInjector = new Injector(config.provider);
        INJECTOR_FACTORY.setScope(config.project, globalInjector);
    }

    export function instanize(Fn){
        let instance = Object.create(Fn.prototype);
        let args = Reflect.getMetadata('design:paramTypes', Fn);

        args = args.map(arg => {
            return instanize(arg);
        });

        Fn.apply(instance, args);
        return instance;
    }

    export interface ComponentConfig {
        project: any,
        provider: Array<any>
    }

    export interface ProviderConfig {
        provider: any,
        useValue: any,
        useClass: any,
        useExistInstance: any
    }
}