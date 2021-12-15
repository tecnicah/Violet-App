"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompliancePoliciesPage = void 0;
var core_1 = require("@angular/core");
var CompliancePoliciesPage = /** @class */ (function () {
    function CompliancePoliciesPage(service, router) {
        this.service = service;
        this.router = router;
    }
    CompliancePoliciesPage.prototype.ngOnInit = function () {
    };
    CompliancePoliciesPage.prototype.ionViewWillEnter = function () {
    };
    CompliancePoliciesPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    CompliancePoliciesPage = __decorate([
        core_1.Component({
            selector: 'app-compliance-policies',
            templateUrl: './compliance-policies.page.html',
            styleUrls: ['./compliance-policies.page.scss']
        })
    ], CompliancePoliciesPage);
    return CompliancePoliciesPage;
}());
exports.CompliancePoliciesPage = CompliancePoliciesPage;
