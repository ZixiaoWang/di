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
var egret_injectable_1 = require("../Decorators/egret.injectable");
var TEST;
(function (TEST) {
    var ComponentA = /** @class */ (function () {
        function ComponentA() {
        }
        ComponentA.prototype.showInfo = function () {
            console.log('This is component A');
        };
        ComponentA = __decorate([
            egret_injectable_1.EgretInjectable(TEST),
            __metadata("design:paramtypes", [])
        ], ComponentA);
        return ComponentA;
    }());
    TEST.ComponentA = ComponentA;
})(TEST = exports.TEST || (exports.TEST = {}));
(function (TEST) {
    var ComponentB = /** @class */ (function () {
        function ComponentB() {
        }
        ComponentB.prototype.showInfo = function () {
            console.log('This is component B');
        };
        ComponentB = __decorate([
            egret_injectable_1.EgretInjectable(TEST),
            __metadata("design:paramtypes", [])
        ], ComponentB);
        return ComponentB;
    }());
    TEST.ComponentB = ComponentB;
})(TEST = exports.TEST || (exports.TEST = {}));