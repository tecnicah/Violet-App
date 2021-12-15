"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewAppointmentPage = void 0;
var core_1 = require("@angular/core");
var ViewAppointmentPage = /** @class */ (function () {
    function ViewAppointmentPage(service, router, modalController, iab, loadingService) {
        this.service = service;
        this.router = router;
        this.modalController = modalController;
        this.iab = iab;
        this.loadingService = loadingService;
        this.userData = {};
        this.info = {};
        this.data = {};
        this.consultant = [];
    }
    ViewAppointmentPage.prototype.ngOnInit = function () {
    };
    ViewAppointmentPage.prototype.ionViewWillEnter = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.info = JSON.parse(localStorage.getItem('apoiment'));
        console.log(this.info);
        this.getApoiment();
    };
    ViewAppointmentPage.prototype.getApoiment = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        ;
        this.service.service_general_get('Appointment/GetAppointmentById?id=' + this.info.id).subscribe(function (r) {
            if (r.success) {
                _this.data = r.result.value[0];
                console.log(_this.data);
                _this.loadingService.loadingDismiss();
                ;
            }
        });
        this.service.service_general_get('SupplierPartnerProfile/GetSupplierPartnersBySR/' + Number(localStorage.getItem('sr'))).subscribe(function (r) {
            if (r.success) {
                _this.consultant = r.result.value;
                console.log(_this.consultant);
                _this.loadingService.loadingDismiss();
                ;
            }
        });
    };
    ViewAppointmentPage.prototype.viewDoc = function (doc) {
        this.iab.create(this.service.url_images + doc, '_system');
    };
    ViewAppointmentPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    ViewAppointmentPage = __decorate([
        core_1.Component({
            selector: 'app-view-appointment',
            templateUrl: './view-appointment.page.html',
            styleUrls: ['./view-appointment.page.scss']
        })
    ], ViewAppointmentPage);
    return ViewAppointmentPage;
}());
exports.ViewAppointmentPage = ViewAppointmentPage;
