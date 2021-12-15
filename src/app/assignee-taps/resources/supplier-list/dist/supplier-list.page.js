"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SupplierListPage = void 0;
var core_1 = require("@angular/core");
var SupplierListPage = /** @class */ (function () {
    function SupplierListPage(service, router, loadingService) {
        this.service = service;
        this.router = router;
        this.loadingService = loadingService;
        this.data = [];
        this.userFilter = { supplierPartner: "" };
    }
    SupplierListPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    SupplierListPage.prototype.ngOnInit = function () {
    };
    SupplierListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.service.service_general_get('SupplierPartnerProfile/GetSupplierPartners').subscribe((function (data) {
            if (data.success) {
                var rows = [];
                console.log(data.result.value);
                _this.data = data.result.value;
                _this.loadingService.loadingDismiss();
            }
        }));
    };
    SupplierListPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    SupplierListPage = __decorate([
        core_1.Component({
            selector: 'app-supplier-list',
            templateUrl: './supplier-list.page.html',
            styleUrls: ['./supplier-list.page.scss']
        })
    ], SupplierListPage);
    return SupplierListPage;
}());
exports.SupplierListPage = SupplierListPage;
