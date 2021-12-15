"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResourcesPage = void 0;
var core_1 = require("@angular/core");
var ResourcesPage = /** @class */ (function () {
    function ResourcesPage(router, service, modalController) {
        this.router = router;
        this.service = service;
        this.modalController = modalController;
        this.userData = {};
    }
    ResourcesPage.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
    };
    ResourcesPage.prototype.ionViewWillEnter = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
    };
    ResourcesPage.prototype.countyCityInfo = function () {
        localStorage.setItem('back', 'assignee-taps/resources');
        this.router.navigateByUrl('assignee-taps/resources/country-city-info');
    };
    ResourcesPage.prototype.currencyExchangeInfo = function () {
        localStorage.setItem('back', 'assignee-taps/resources');
        this.router.navigateByUrl('assignee-taps/resources/currency-exchange');
    };
    ResourcesPage.prototype.mapsInfo = function () {
        localStorage.setItem('back', 'assignee-taps/resources');
        this.router.navigateByUrl('assignee-taps/resources/maps');
    };
    ResourcesPage.prototype.timeZoneInfo = function () {
        localStorage.setItem('back', 'assignee-taps/resources');
        this.router.navigateByUrl('assignee-taps/resources/time-zone');
    };
    ResourcesPage.prototype.unitConverterInfo = function () {
        localStorage.setItem('back', 'assignee-taps/resources');
        this.router.navigateByUrl('assignee-taps/resources/unit-converter');
    };
    ResourcesPage.prototype.weatherInfo = function () {
        localStorage.setItem('back', 'assignee-taps/resources');
        this.router.navigateByUrl('assignee-taps/resources/weather');
    };
    ResourcesPage.prototype.translate = function () {
        localStorage.setItem('back', 'assignee-taps/resources');
        // this.router.navigateByUrl('assignee-taps/resources/translate');
    };
    ResourcesPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl('/assignee-taps/home');
    };
    ResourcesPage.prototype.supplierList = function () {
        localStorage.setItem('back', "assignee-taps/resources");
        this.router.navigateByUrl('assignee-taps/resources/supplier-list');
    };
    ResourcesPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    ResourcesPage = __decorate([
        core_1.Component({
            selector: 'app-resources',
            templateUrl: './resources.page.html',
            styleUrls: ['./resources.page.scss']
        })
    ], ResourcesPage);
    return ResourcesPage;
}());
exports.ResourcesPage = ResourcesPage;
