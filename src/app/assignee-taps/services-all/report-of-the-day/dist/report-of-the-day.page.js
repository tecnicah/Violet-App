"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ReportOfTheDayPage = void 0;
var core_1 = require("@angular/core");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var ReportOfTheDayPage = /** @class */ (function () {
    function ReportOfTheDayPage(service, modalController, navParams, popoverController, loadingService) {
        this.service = service;
        this.modalController = modalController;
        this.navParams = navParams;
        this.popoverController = popoverController;
        this.loadingService = loadingService;
        this.userData = {};
        this.caSl = [];
        this.caWo = [];
        this.caService = [];
        this.serviceAdd = {};
        this.addService = false;
        this.report = {};
        this.get_total_hours = 0;
    }
    ReportOfTheDayPage.prototype.ngOnInit = function () {
    };
    ReportOfTheDayPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log(this.navParams.data.data);
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.calatolos();
        if (this.navParams.data.data.id == 0) {
            this.report.reportNo = this.navParams.data.data.i;
            this.report.reportBy = this.userData.id;
            this.report.id = 0;
            this.report.serviceReportDays = [];
            this.report.totalTime = 0;
        }
        else {
            this.loadingService.loadingPresent();
            this.service.service_general_get('ReportDay/GetreportDayById?id=' + this.navParams.data.data.id).subscribe(function (r) {
                if (r.success) {
                    _this.report = r.result;
                    _this.getWO();
                    _this.getServices();
                    _this.loadingService.loadingDismiss();
                    console.log('Aqui ===========>', r.result);
                    /*for (let i = 0; i < this.allUser.length; i++) {
                      const element = this.allUser[i];
                      if(element.id == this.data.reportBy){
                        this.userReport = element;
                      }
                    }*/
                }
            });
        }
        this.report.creationDate = new Date();
    };
    ReportOfTheDayPage.prototype.calatolos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.caSl = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportOfTheDayPage.prototype.getWO = function () {
        var _this = this;
        this.service.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.navParams.data.data.sr + '&service_line_id=' + this.report.serviceLine).subscribe(function (r) {
            if (r.success) {
                _this.caWo = r.result.value;
            }
        });
    };
    ReportOfTheDayPage.prototype.getServices = function () {
        var _this = this;
        this.service.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.report.workOrder).subscribe(function (r) {
            if (r.success) {
                _this.caService = r.result.value;
            }
        });
    };
    ReportOfTheDayPage.prototype.getHoras = function () {
        console.log(this.report.startTime, this.report.endTime);
        var create_date_one = new Date(this.report.startTime), create_date_two = new Date(this.report.endTime);
        if (this.report.startTime != undefined && this.report.endTime != undefined) {
            var get_difference = (create_date_two.getTime() - create_date_one.getTime()) / 1000;
            get_difference /= (60 * 60);
            this.get_total_hours = Math.abs(Math.round(get_difference));
            this.report.totalTime = this.get_total_hours;
        }
    };
    ReportOfTheDayPage.prototype.addServicenew = function () {
        this.serviceAdd.id = 0;
        this.serviceAdd.reportDayId = this.report.id;
        this.serviceAdd.createdBy = this.userData.id;
        this.serviceAdd.createdDate = new Date();
        this.serviceAdd.updateBy = this.userData.id;
        this.serviceAdd.updatedDate = new Date();
        this.report.serviceReportDays.push(this.serviceAdd);
        this.serviceAdd = {};
        this.addService = false;
    };
    ReportOfTheDayPage.prototype.deleteService = function (i) {
        this.report.serviceReportDays.splice(i, 1);
    };
    ReportOfTheDayPage.prototype.save = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        if (this.report.id == 0) {
            this.service.service_general_post_with_url("ReportDay/PostReportDay", this.report).subscribe((function (data) {
                if (data.success) {
                    console.log(data);
                    _this.general_messages({
                        title: "Success",
                        body: "Save Data",
                        success: true
                    });
                    _this.back();
                }
            }));
        }
        else {
            this.service.service_general_put("ReportDay/PutReportDay", this.report).subscribe((function (data) {
                if (data.success) {
                    console.log(data);
                    _this.general_messages({
                        title: "Success",
                        body: "Update Data",
                        success: true
                    });
                    _this.back();
                }
            }));
        }
    };
    ReportOfTheDayPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    ReportOfTheDayPage.prototype.general_messages = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: general_mensage_page_1.GeneralMensagePage,
                            cssClass: 'modal-general-mensage',
                            backdropDismiss: true,
                            componentProps: data
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                        });
                        this.modalController.dismiss();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ReportOfTheDayPage = __decorate([
        core_1.Component({
            selector: 'app-report-of-the-day',
            templateUrl: './report-of-the-day.page.html',
            styleUrls: ['./report-of-the-day.page.scss']
        })
    ], ReportOfTheDayPage);
    return ReportOfTheDayPage;
}());
exports.ReportOfTheDayPage = ReportOfTheDayPage;
