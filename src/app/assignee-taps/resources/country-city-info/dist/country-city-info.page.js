"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CountryCityInfoPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var core_2 = require("@angular/core");
var CountryCityInfoPage = /** @class */ (function () {
    function CountryCityInfoPage(router, service, modalController) {
        this.router = router;
        this.service = service;
        this.modalController = modalController;
        this.userData = {};
        this.slideOptsOne = {
            slidesPerView: 1,
            autoplay: true
        };
        this.cities_ = [];
    }
    CountryCityInfoPage.prototype.goToSlide = function () {
        this.slides.slideTo(3, 500);
    };
    CountryCityInfoPage.prototype.ngOnInit = function () {
    };
    CountryCityInfoPage.prototype.ionViewWillEnter = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getData();
    };
    CountryCityInfoPage.prototype.getData = function () {
        var _this = this;
        this.service.service_general_get('CountryAdminCenter/' + this.userData.id + '/Country-City-Info').subscribe(function (r) {
            if (r.success) {
                console.log(r.result.value);
                _this.cities_ = r.result.value;
            }
        });
    };
    CountryCityInfoPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    CountryCityInfoPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    __decorate([
        core_2.ViewChild(angular_1.IonSlides)
    ], CountryCityInfoPage.prototype, "slides");
    CountryCityInfoPage = __decorate([
        core_1.Component({
            selector: 'app-country-city-info',
            templateUrl: './country-city-info.page.html',
            styleUrls: ['./country-city-info.page.scss']
        })
    ], CountryCityInfoPage);
    return CountryCityInfoPage;
}());
exports.CountryCityInfoPage = CountryCityInfoPage;
