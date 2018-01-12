"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var __1 = require("..");
var test_1 = require("./test");
__1.EgretDIBootstrap({
    provider: [
        test_1.TEST.ComponentA,
        test_1.TEST.ComponentB
    ]
});
var Main = /** @class */ (function () {
    function Main(c) {
        this.c = c;
        console.log(this.c);
        this.c.showInfo();
    }
    Main = __decorate([
        __1.EgretComponent({
            provider: [
                test_1.TEST.ComponentB,
                { provider: test_1.TEST.ComponentA, useValue: 'ABC' },
                { provider: test_1.TEST.ComponentA, useClass: test_1.TEST.ComponentB }
            ],
            restrict: true
        })
        // @EgretInject(TEST.ComponentB)
        ,
        __metadata("design:paramtypes", [test_1.TEST.ComponentB])
    ], Main);
    return Main;
}());
exports.Main = Main;
window['Main'] = Main;
