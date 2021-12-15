"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TipsPage = void 0;
var core_1 = require("@angular/core");
var TipsPage = /** @class */ (function () {
    function TipsPage(modalController) {
        this.modalController = modalController;
        this.slideOptsOne = {
            slidesPerView: 1,
            autoplay: false
        };
    }
    TipsPage.prototype.ngOnInit = function () {
    };
    TipsPage.prototype.ionViewWillEnter = function () {
        this.slideOptsOne = {
            slidesPerView: 1,
            autoplay: false
        };
    };
    TipsPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    TipsPage = __decorate([
        core_1.Component({
            selector: 'app-tips',
            templateUrl: './tips.page.html',
            styleUrls: ['./tips.page.scss']
        })
    ], TipsPage);
    return TipsPage;
}());
exports.TipsPage = TipsPage;
