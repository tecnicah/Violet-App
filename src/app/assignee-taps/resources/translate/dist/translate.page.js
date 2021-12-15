"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TranslatePage = void 0;
var core_1 = require("@angular/core");
var TranslatePage = /** @class */ (function () {
    function TranslatePage(iab, router, sanitizer, service) {
        this.iab = iab;
        this.router = router;
        this.sanitizer = sanitizer;
        this.service = service;
        this.url = "https://translate.google.com.mx/";
    }
    TranslatePage.prototype.ngOnInit = function () {
        this.iab.create(this.url, "_blank");
    };
    TranslatePage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    TranslatePage.prototype.openURL = function () { return this.sanitizer.bypassSecurityTrustResourceUrl(this.url); };
    TranslatePage = __decorate([
        core_1.Component({
            selector: 'app-translate',
            templateUrl: './translate.page.html',
            styleUrls: ['./translate.page.scss']
        })
    ], TranslatePage);
    return TranslatePage;
}());
exports.TranslatePage = TranslatePage;
