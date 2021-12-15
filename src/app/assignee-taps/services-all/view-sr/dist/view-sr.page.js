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
exports.ViewSrPage = void 0;
var core_1 = require("@angular/core");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var report_of_the_day_page_1 = require("../report-of-the-day/report-of-the-day.page");
var add_activitie_item_page_1 = require("../add-activitie-item/add-activitie-item.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var request_additional_time_page_1 = require("../request-additional-time/request-additional-time.page");
var ViewSrPage = /** @class */ (function () {
    function ViewSrPage(router, service, modalController, rutaActiva, callNumber, loadingService, navCtrl) {
        this.router = router;
        this.service = service;
        this.modalController = modalController;
        this.rutaActiva = rutaActiva;
        this.callNumber = callNumber;
        this.loadingService = loadingService;
        this.navCtrl = navCtrl;
        this.userData = {};
        this.dataSR = {};
        this.coordinator = {};
        this.immRel = 1;
        this.caCounty = [];
        this.services = [];
        this.caStatus = [];
        this.ca_partner = [];
        this.ca_policy = [];
        this.deliveryTo = [];
        this.userFilter = {
            statusId: '',
            deliveredToId: ''
        };
        this.userFilters = { homeHost: 1 };
        this.dataSourceReport = [];
        this.dataActivityItems = [];
        this.apointments = [];
        this.caCity = [];
        this.show_name_assignee = false;
        this.info = [];
    }
    ViewSrPage.prototype.ngOnInit = function () {
        this.getData();
        this.userData = JSON.parse(localStorage.getItem('userData'));
    };
    ViewSrPage.prototype.ionViewWillEnter = function () {
        console.log(window.screen.width);
        if (window.screen.width <= 500) {
            this.show_name_assignee = true;
        }
        else {
            this.show_name_assignee = false;
        }
        console.log(this.rutaActiva.snapshot.params.id);
        localStorage.setItem('srAd', this.rutaActiva.snapshot.params.id);
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getData();
        this.catalogos();
    };
    ViewSrPage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCounty = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetStatus')];
                    case 2:
                        _b.caStatus = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetPartner')];
                    case 3:
                        _c.ca_partner = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetPolicyType')];
                    case 4:
                        _d.ca_policy = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCity')];
                    case 5:
                        _e.caCity = _f.sent();
                        this.service.service_general_get("ServiceRecord/GetApplicant/" + this.dataSR.id)
                            .subscribe(function (response) {
                            console.log(response);
                            if (response.success) {
                                _this.deliveryTo = response.applicant.value;
                            }
                        }, function (error) {
                            console.error('Error (GetApplicant) => ', error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewSrPage.prototype.getData = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.service.service_general_get("ServiceRecord/GetServiceRecordById?id=" + this.rutaActiva.snapshot.params.id + "&user=" + this.userData.id)
            .subscribe(function (response) {
            if (response.success) {
                console.log(response);
                _this.dataSR = response.result;
                _this.geIMREL();
                _this.getClient();
                _this.loadingService.loadingDismiss();
            }
        });
        this.service.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.rutaActiva.snapshot.params.id).subscribe(function (r) {
            console.log(r);
            if (r.success) {
                _this.apointments = r.result.value;
                _this.loadingService.loadingDismiss();
            }
        });
        this.loadingService.loadingDismiss();
    };
    ViewSrPage.prototype.geIMREL = function () {
        this.getCoordinator();
        this.getServices();
        this.activityItems();
        this.getReport();
    };
    ViewSrPage.prototype.getCoordinator = function () {
        var _this = this;
        var id = 0;
        if (this.immRel == 1) {
            if (this.dataSR.immigrationCoodinators.length > 0) {
                id = this.dataSR.immigrationCoodinators[0].coordinatorId;
            }
        }
        if (this.immRel == 2) {
            if (this.dataSR.relocationCoordinators.length > 0) {
                id = this.dataSR.relocationCoordinators[0].coordinatorId;
            }
        }
        this.service.service_general_get('Profile/GetProfile/' + id).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                console.log("coordinator: ", data.result);
                _this.coordinator = data.result;
            }
        }));
    };
    ViewSrPage.prototype.getCountry = function (id) {
        for (var i = 0; i < this.caCounty.length; i++) {
            var element = this.caCounty[i];
            if (element.id == id) {
                return element.name;
            }
        }
    };
    ViewSrPage.prototype.getReport = function () {
        var _this = this;
        this.service.service_general_get('ReportDay/GetActivityReports?sr=' + Number(this.dataSR.id) + '&serviceLine=' + this.immRel).subscribe((function (data) {
            //this._services.service_general_get('ReportDay/GetActivityReports?sr='+Number(this.SO_ID)).subscribe((data => {
            if (data.success) {
                console.log('DATA CONSULTA: REPORTES ', data);
                _this.dataSourceReport = data.view;
                console.log(_this.dataSourceReport);
            }
        }));
    };
    ViewSrPage.prototype.addReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: report_of_the_day_page_1.ReportOfTheDayPage,
                            componentProps: {
                                data: { sr: this.dataSR.id, i: this.dataSourceReport.length, id: 0 }
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
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
    ViewSrPage.prototype.editReport = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: report_of_the_day_page_1.ReportOfTheDayPage,
                            componentProps: {
                                data: { sr: this.dataSR.id, i: data.id, id: data.id }
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
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
    ViewSrPage.prototype.rat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: request_additional_time_page_1.RequestAdditionalTimePage,
                            componentProps: {
                                data: { sr: this.dataSR.id, sl: this.immRel }
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
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
    ViewSrPage.prototype.activityItems = function () {
        var _this = this;
        var params = "?service_record_id=" + this.dataSR.id + "&service_line_id=" + this.immRel;
        console.log('Consultando en ===> ', "Task/GetAllTask" + params);
        this.service.service_general_get("Task/GetAllTask" + params).subscribe(function (response) {
            console.log('Res ===> ', response);
            if (response.success) {
                _this.dataActivityItems = response.result.value;
                console.log('this.activitie ==> ', _this.dataActivityItems);
            }
        }, function (error) {
            console.error('Error (Task/GetAllTask) ==> ', error);
        });
    };
    ViewSrPage.prototype.addActionItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_activitie_item_page_1.AddActivitieItemPage,
                            componentProps: {
                                data: { sr: this.dataSR.id, i: this.dataSourceReport.length, id: 0, sl: this.immRel }
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
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
    ViewSrPage.prototype.editActionItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_activitie_item_page_1.AddActivitieItemPage,
                            componentProps: {
                                data: { sr: this.dataSR.id, i: this.dataSourceReport.length, id: id, sl: this.immRel }
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.ionViewWillEnter();
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
    ViewSrPage.prototype.deleteActivitie = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: confirmation_page_1.ConfirmationPage,
                            cssClass: 'modal-general-confirm',
                            componentProps: {
                                header: "Delete",
                                body: "Delete activity item?",
                                yesText: 'Yes, delete',
                                noText: 'No, continue'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data, id);
                            if (data.data) {
                                _this.loadingService.loadingPresent();
                                _this.service.service_general_get('Task/DeleteDocumentTask?id=' + id).subscribe(function (r) {
                                    if (r.success) {
                                        _this.general_messages({
                                            title: "Success",
                                            body: "Delete Acivity item",
                                            success: true
                                        });
                                    }
                                });
                                _this.ionViewWillEnter();
                                _this.loadingService.loadingDismiss();
                            }
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
    ViewSrPage.prototype.getDelname = function (id) {
        for (var i = 0; i < this.deliveryTo.length; i++) {
            var element = this.deliveryTo[i];
            if (id == element.dependentId) {
                return element.name;
            }
        }
        return '';
    };
    ViewSrPage.prototype.getServices = function () {
        var _this = this;
        this.service.service_general_get('ServiceRecord/GetServices/' + this.dataSR.id + '?type=' + this.immRel).subscribe(function (r) {
            if (r.success) {
                console.log("GET SERVICES BY SERVICE RECORD:  ", r);
                _this.services = r.map.value;
            }
        });
    };
    ViewSrPage.prototype.viewAssineInfo = function () {
        localStorage.setItem('srAd', this.dataSR.id);
        localStorage.setItem('userId', this.dataSR.assigneeInformations[0].userId);
        localStorage.setItem('back', 'assignee-taps/services-all/view-sr/' + this.dataSR.id);
        this.router.navigateByUrl('assignee-taps/profile');
    };
    ViewSrPage.prototype.call = function (number, message) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(number != null && number != '' && number != undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalController.create({
                                component: confirmation_page_1.ConfirmationPage,
                                cssClass: 'modal-general-confirm',
                                componentProps: {
                                    header: "Call",
                                    body: "Dial the " + message + "?",
                                    yesText: 'Yes',
                                    noText: 'No'
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data) {
                                _this.callNumber.callNumber(number, true)
                                    .then(function (res) { return console.log('Launched dialer!', res); })["catch"](function (err) { return console.log('Error launching dialer', err); });
                            }
                        });
                        this.modalController.dismiss();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ViewSrPage.prototype.calculateHowOld = function (bd) {
        var my_bd = new Date(bd);
        if (my_bd != null || my_bd != '') {
            var date_init = new Date(my_bd.getFullYear(), my_bd.getMonth(), my_bd.getDate()), date_today = new Date();
            var diff = (date_init.getTime() - date_today.getTime()) / 1000;
            diff /= (60 * 60 * 24);
            return Math.abs(Math.round(diff / 365.25));
        }
        else {
            return null;
        }
    };
    ViewSrPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl('assignee-taps/services-all');
    };
    ViewSrPage.prototype.getCountryName = function (id) {
        for (var i = 0; i < this.caCounty.length; i++) {
            if (this.caCounty[i].id == id) {
                return this.caCounty[i].name;
            }
        }
    };
    ViewSrPage.prototype.getCityName = function (id) {
        for (var i = 0; i < this.caCity.length; i++) {
            if (this.caCity[i].id == id) {
                return this.caCity[i].city;
            }
        }
    };
    ViewSrPage.prototype.general_messages = function (data) {
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
    ViewSrPage.prototype.open_service = function (item, type) {
        return __awaiter(this, void 0, void 0, function () {
            var ModalToOpen;
            return __generator(this, function (_a) {
                if (type == 1) {
                    item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].homeCountryId);
                    item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].homeCityId);
                }
                else {
                    item.homecountry = this.getCountryName(this.dataSR.assigneeInformations[0].hostCountry);
                    item.homecity = this.getCityName(this.dataSR.assigneeInformations[0].hostCityId);
                }
                item.type = type;
                console.log(item);
                switch (item.dialog_type) {
                    case 1:
                        //ModalToOpen = EntryVisaPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/entry');
                        break;
                    case 2:
                        //ModalToOpen = WorkPermitPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/work');
                        break;
                    case 3:
                        //ModalToOpen = VisaRegistrationPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/visa');
                        break;
                    case 4:
                        //ModalToOpen = RecidencyPermitPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/recidency');
                        break;
                    case 5:
                        //ModalToOpen = DocumentManagementPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/document');
                        break;
                    case 6:
                        //ModalToOpen = LocalDocumentationPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/local');
                        break;
                    case 7:
                        //ModalToOpen = CorporateAssiatancePage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/corporate');
                        break;
                    case 8:
                        //ModalToOpen = RenewalPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/renewal');
                        break;
                    case 9:
                        //ModalToOpen = NotificationPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/noti');
                        break;
                    case 10:
                        //ModalToOpen = LegalReviewPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/legal');
                        break;
                    case 12:
                        //ModalToOpen = PredecisionOrientatonPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/predecision');
                        break;
                    case 13:
                        //ModalToOpen = AreaOrientationPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/area');
                        break;
                    case 14:
                        //ModalToOpen = SettlingInPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/settling');
                        break;
                    case 15:
                        //ModalToOpen = SchoolSearchPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/school');
                        break;
                    case 16:
                        //ModalToOpen = DeparturePage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/departure');
                        break;
                    case 17:
                        //ModalToOpen = TemporaryHousingPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/temporary');
                        break;
                    case 18:
                        //ModalToOpen = RentalFurnitureCoordinationPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/rental');
                        break;
                    case 19:
                        //ModalToOpen = TransportationPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/transport');
                        break;
                    case 20:
                        //ModalToOpen = AirportTransportationPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/airport');
                        break;
                    case 21:
                        //ModalToOpen = HomeFindingPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/homeFind');
                        break;
                    case 22:
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/leaseRenewal');
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    ViewSrPage.prototype.getpartner = function (id) {
        for (var i = 0; i < this.ca_partner.length; i++) {
            if (this.ca_partner[i].id == id) {
                return this.ca_partner[i].coordinator;
            }
        }
    };
    ViewSrPage.prototype.getCliente = function (id) {
        for (var i = 0; i < this.info.length; i++) {
            if (this.info[i].id == id) {
                return this.info[i].name;
            }
        }
    };
    ViewSrPage.prototype.getPolicy = function (id) {
        for (var i = 0; i < this.ca_policy.length; i++) {
            if (this.ca_policy[i].id == id) {
                return this.ca_policy[i].policyType;
            }
        }
    };
    ViewSrPage.prototype.getClient = function () {
        var _this = this;
        this.service.service_general_get('Catalogue/GetClient/' + this.dataSR.partnerId).subscribe(function (response) {
            console.log('Res ===> ', response);
            _this.info = response.result.value;
        });
    };
    ViewSrPage.prototype.startAppoitment = function (i, appoi) {
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
                                        _this.ionViewWillEnter();
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
    ViewSrPage.prototype.endAppoitment = function (i, endAppoi) {
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
                                        _this.ionViewWillEnter();
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
    ViewSrPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    ViewSrPage = __decorate([
        core_1.Component({
            selector: 'app-view-sr',
            templateUrl: './view-sr.page.html',
            styleUrls: ['./view-sr.page.scss']
        })
    ], ViewSrPage);
    return ViewSrPage;
}());
exports.ViewSrPage = ViewSrPage;
