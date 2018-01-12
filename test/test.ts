import { EgretInjectable } from "..";

export namespace TEST {
    
    @EgretInjectable(TEST)
    export class ComponentA {

        constructor() {}

        showInfo() {
            console.log('This is component A');
        }
    }
}

export namespace TEST {
    
    @EgretInjectable(TEST)
    export class ComponentB {

        constructor() {}

        showInfo() {
            console.log('This is component B');
        }
    }
}