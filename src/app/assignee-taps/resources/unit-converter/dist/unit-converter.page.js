"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UnitConverterPage = void 0;
var core_1 = require("@angular/core");
var UnitConverterPage = /** @class */ (function () {
    function UnitConverterPage(router, service) {
        this.router = router;
        this.service = service;
        this.uniMedida = [
            {
                code: 'length',
                name: 'km',
                symbol: 'km'
            },
            {
                code: 'length',
                name: 'm',
                symbol: 'm'
            },
            {
                code: 'length',
                name: 'cm',
                symbol: 'cm'
            },
            {
                code: 'length',
                name: 'ft',
                symbol: 'ft'
            },
            {
                code: 'length',
                name: 'yd',
                symbol: 'yd'
            },
            {
                code: 'length',
                name: 'mi',
                symbol: 'mi'
            },
        ];
    }
    UnitConverterPage.prototype.ngOnInit = function () {
        this.getUnitConverter();
    };
    UnitConverterPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    UnitConverterPage.prototype.getUnitConverter = function () {
        console.log('index', this.valueUser);
        if (this.unitUser1 == 'km' && this.unitConvert == 'm') {
            this.resultado = this.valueUser * 1000;
        }
        else if (this.unitUser1 == 'km' && this.unitConvert == 'cm') {
            this.resultado = this.valueUser * 100000;
        }
        else if (this.unitUser1 == 'km' && this.unitConvert == 'ft') {
            this.resultado = this.valueUser * 3280.84;
        }
        else if (this.unitUser1 == 'km' && this.unitConvert == 'yd') {
            this.resultado = this.valueUser * 1093.61;
        }
        else if (this.unitUser1 == 'km' && this.unitConvert == 'mi') {
            this.resultado = this.valueUser * 0.6213;
        }
        else if (this.unitUser1 == 'km' && this.unitConvert == 'km') {
            this.resultado = this.valueUser * 1;
        }
        if (this.unitUser1 == 'm' && this.unitConvert == 'km') {
            this.resultado = this.valueUser * .001;
        }
        else if (this.unitUser1 == 'm' && this.unitConvert == 'cm') {
            this.resultado = this.valueUser * 100;
        }
        else if (this.unitUser1 == 'm' && this.unitConvert == 'ft') {
            this.resultado = this.valueUser * 3.2808;
        }
        else if (this.unitUser1 == 'm' && this.unitConvert == 'yd') {
            this.resultado = this.valueUser * 1.0936;
        }
        else if (this.unitUser1 == 'm' && this.unitConvert == 'mi') {
            this.resultado = this.valueUser * .00062;
        }
        else if (this.unitUser1 == 'm' && this.unitConvert == 'm') {
            this.resultado = this.valueUser * 1;
        }
        if (this.unitUser1 == 'cm' && this.unitConvert == 'km') {
            this.resultado = this.valueUser * .00001;
        }
        else if (this.unitUser1 == 'cm' && this.unitConvert == 'm') {
            this.resultado = this.valueUser * .01;
        }
        else if (this.unitUser1 == 'cm' && this.unitConvert == 'ft') {
            this.resultado = this.valueUser * 0.0328;
        }
        else if (this.unitUser1 == 'cm' && this.unitConvert == 'yd') {
            this.resultado = this.valueUser * .0109;
        }
        else if (this.unitUser1 == 'cm' && this.unitConvert == 'mi') {
            this.resultado = this.valueUser * .0000062;
        }
        else if (this.unitUser1 == 'cm' && this.unitConvert == 'cm') {
            this.resultado = this.valueUser * 1;
        }
        if (this.unitUser1 == 'ft' && this.unitConvert == 'km') {
            this.resultado = this.valueUser * .00030;
        }
        else if (this.unitUser1 == 'ft' && this.unitConvert == 'm') {
            this.resultado = this.valueUser * .3048;
        }
        else if (this.unitUser1 == 'ft' && this.unitConvert == 'cm') {
            this.resultado = this.valueUser * 30.48;
        }
        else if (this.unitUser1 == 'ft' && this.unitConvert == 'yd') {
            this.resultado = this.valueUser * .3333;
        }
        else if (this.unitUser1 == 'ft' && this.unitConvert == 'mi') {
            this.resultado = this.valueUser * .00018;
        }
        else if (this.unitUser1 == 'ft' && this.unitConvert == 'ft') {
            this.resultado = this.valueUser * 1;
        }
        if (this.unitUser1 == 'yd' && this.unitConvert == 'km') {
            this.resultado = this.valueUser * .00091;
        }
        else if (this.unitUser1 == 'yd' && this.unitConvert == 'm') {
            this.resultado = this.valueUser * .9144;
        }
        else if (this.unitUser1 == 'yd' && this.unitConvert == 'cm') {
            this.resultado = this.valueUser * 91.44;
        }
        else if (this.unitUser1 == 'yd' && this.unitConvert == 'ft') {
            this.resultado = this.valueUser * 3;
        }
        else if (this.unitUser1 == 'yd' && this.unitConvert == 'mi') {
            this.resultado = this.valueUser * .00056;
        }
        else if (this.unitUser1 == 'yd' && this.unitConvert == 'yd') {
            this.resultado = this.valueUser * 1;
        }
        if (this.unitUser1 == 'mi' && this.unitConvert == 'km') {
            this.resultado = this.valueUser * 1.6093;
        }
        else if (this.unitUser1 == 'mi' && this.unitConvert == 'm') {
            this.resultado = this.valueUser * 1609.34;
        }
        else if (this.unitUser1 == 'mi' && this.unitConvert == 'cm') {
            this.resultado = this.valueUser * 160934.4;
        }
        else if (this.unitUser1 == 'mi' && this.unitConvert == 'ft') {
            this.resultado = this.valueUser * 5280;
        }
        else if (this.unitUser1 == 'mi' && this.unitConvert == 'yd') {
            this.resultado = this.valueUser * 1760;
        }
        else if (this.unitUser1 == 'mi' && this.unitConvert == 'mi') {
            this.resultado = this.valueUser * 1;
        }
    };
    UnitConverterPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    UnitConverterPage = __decorate([
        core_1.Component({
            selector: 'app-unit-converter',
            templateUrl: './unit-converter.page.html',
            styleUrls: ['./unit-converter.page.scss']
        })
    ], UnitConverterPage);
    return UnitConverterPage;
}());
exports.UnitConverterPage = UnitConverterPage;
