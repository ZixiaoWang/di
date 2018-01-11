import { TEST } from "./test";
import { EgretInject } from "../Decorators/egret.inject";


@EgretInject(TEST.ComponentB)
export class Main {

    constructor(c) {
        c.showInfo();
    }
}