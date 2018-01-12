import 'reflect-metadata';
import { EgretInject, EgretDIBootstrap, EgretComponent, EgretInjectable } from "..";

import { TEST } from "./test";

EgretDIBootstrap({
    provider:[
        TEST.ComponentA,
        TEST.ComponentB
    ]
});

declare const window;

@EgretComponent({
    provider: [
        TEST.ComponentB,
        { provider: TEST.ComponentA, useValue: 'ABC' },
        { provider: TEST.ComponentA, useClass: TEST.ComponentB }
    ],
    restrict: true
})
// @EgretInject(TEST.ComponentB)
export class Main {

    constructor( 
        private c: TEST.ComponentB
    ) {
        console.log(this.c)
        this.c.showInfo();
    }
}

window['Main'] = Main;