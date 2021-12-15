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
exports.ViewAllAppointmentPage = void 0;
var core_1 = require("@angular/core");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var ViewAllAppointmentPage = /** @class */ (function () {
    function ViewAllAppointmentPage(service, router, modalController, iab, loadingService) {
        this.service = service;
        this.router = router;
        this.modalController = modalController;
        this.iab = iab;
        this.loadingService = loadingService;
        this.userData = {};
        this.sr = 0;
        this.apointments = [];
        this.apointmentsres = [];
        this.userFilter = { coordinador: '' };
        this.dates = {
            dateIn: null,
            dateOut: null
        };
        this.filteruno = false;
        this.show_name_assignee = false;
    }
    ViewAllAppointmentPage.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
    };
    ViewAllAppointmentPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    ViewAllAppointmentPage.prototype.ionViewWillEnter = function () {
        console.log(window.screen.width);
        if (window.screen.width <= 500) {
            this.show_name_assignee = true;
        }
        else {
            this.show_name_assignee = false;
        }
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getApoiment();
    };
    ViewAllAppointmentPage.prototype.getApoiment = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.sr = Number(localStorage.getItem('sr'));
        console.log(this.sr);
        if (this.sr != 0 && this.userData.role.id == 4) {
            this.loadingService.loadingPresent();
            this.service.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.sr).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.apointments = r.result.value;
                    _this.apointmentsres = r.result.value;
                    console.log(_this.apointments, _this.apointmentsres);
                    _this.loadingService.loadingDismiss();
                }
            });
        }
        else {
            this.loadingService.loadingPresent();
            this.service.service_general_get('Appointment/GetAppointmentByUser?UserId=' + this.userData.id).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.apointments = r.result.value;
                    _this.apointmentsres = r.result.value;
                    console.log(_this.apointments, _this.apointmentsres);
                    _this.loadingService.loadingDismiss();
                }
            });
        }
        this.loadingService.loadingDismiss();
    };
    ViewAllAppointmentPage.prototype.startAppoitment = function (i, appoi) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log('modal', i);
                        console.log('modal', appoi);
                        return [4 /*yield*/, this.modalController.create({
                                component: confirmation_page_1.ConfirmationPage,
                                cssClass: 'modal-general-confirm',
                                componentProps: {
                                    header: "Start appoitment",
                                    body: "Are you sure you want start appoitment?",
                                    yesText: 'Yes, start',
                                    noText: 'No, continue'
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data) {
                                _this.service.service_general_post_with_url('Appointment/App/Start/' + appoi.id + '/' + _this.userData.id, '').subscribe(function (r) {
                                    if (r.success) {
                                        console.log(r);
                                        _this.general_messages({
                                            title: "Success",
                                            body: "Inserted Data",
                                            success: true
                                        });
                                        _this.getApoiment();
                                    }
                                });
                            }
                        });
                        this.modalController.dismiss();
                        // console.log(data);
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        // console.log(data);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewAllAppointmentPage.prototype.endAppoitment = function (i, endAppoi) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // /api/Appointment/App/End/{report}/{appointment}/{user}
                        console.log('modal', endAppoi);
                        return [4 /*yield*/, this.modalController.create({
                                component: confirmation_page_1.ConfirmationPage,
                                cssClass: 'modal-general-confirm',
                                componentProps: {
                                    header: "End appoitment",
                                    body: "Are you sure you want end appoitment?",
                                    yesText: 'Yes, end',
                                    noText: 'No, continue'
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data) {
                                _this.service.service_general_put('Appointment/App/End/' + endAppoi.report + '/' + endAppoi.id + '/' + _this.userData.id, '').subscribe(function (r) {
                                    if (r.success) {
                                        console.log(r);
                                        _this.general_messages({
                                            title: "Success",
                                            body: "Inserted Data",
                                            success: true
                                        });
                                        _this.getApoiment();
                                    }
                                });
                            }
                        });
                        this.modalController.dismiss();
                        // console.log(data);
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        // console.log(data);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewAllAppointmentPage.prototype.general_messages = function (data) {
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
    ViewAllAppointmentPage.prototype.viewDoc = function (doc) {
        this.iab.create(this.service.url_images + doc, '_system');
    };
    ViewAllAppointmentPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl('assignee-taps/home');
    };
    ViewAllAppointmentPage.prototype.viewApoitment = function (i, data) {
        localStorage.setItem('back', "assignee-taps/view-all-appointment");
        data.noApo = i;
        localStorage.setItem('apoiment', JSON.stringify(data));
        this.router.navigateByUrl('assignee-taps/view-appointment');
    };
    ViewAllAppointmentPage.prototype.cleanFilter = function () {
        var _this = this;
        this.filteruno = true;
        this.userFilter = {
            location: ''
        };
        this.dates = {
            dateIn: null,
            dateOut: null,
            status: null
        };
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.getApoiment();
    };
    ViewAllAppointmentPage.prototype.filterDate = function () {
        console.log(this.dates);
        if (this.dates.dateOut != null) {
            var inicio = this.dates.dateIn;
            var fin = this.dates.dateOut;
            var fechas = [];
            while (fin.getTime() >= inicio.getTime()) {
                var i = inicio;
                console.log(inicio.getFullYear() + '/' + (inicio.getMonth() + 1) + '/' + inicio.getDate());
                fechas.push(inicio.getFullYear() + '/' + (inicio.getMonth() + 1) + '/' + inicio.getDate());
                inicio.setDate(inicio.getDate() + 1);
            }
            console.log(fechas);
            var apo = [];
            for (var i = 0; i < fechas.length; i++) {
                var e = fechas[i];
                for (var j = 0; j < this.apointmentsres.length; j++) {
                    var element = this.apointmentsres[j];
                    console.log(new Date(element.date));
                    console.log(e);
                    if (e == (new Date(element.date).getFullYear() + '/' + (new Date(element.date).getMonth() + 1) + '/' + new Date(element.date).getDate())) {
                        apo.push(element);
                    }
                }
            }
            console.log(apo);
            this.apointments = apo;
        }
    };
    ViewAllAppointmentPage.prototype.change = function () {
        console.log(this.dates);
        var filter = [];
    };
    ViewAllAppointmentPage = __decorate([
        core_1.Component({
            selector: 'app-view-all-appointment',
            templateUrl: './view-all-appointment.page.html',
            styleUrls: ['./view-all-appointment.page.scss']
        })
    ], ViewAllAppointmentPage);
    return ViewAllAppointmentPage;
}());
exports.ViewAllAppointmentPage = ViewAllAppointmentPage;
