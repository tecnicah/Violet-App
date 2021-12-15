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
exports.ServicesPage = void 0;
var core_1 = require("@angular/core");
var services_details_page_1 = require("./services-details/services-details.page");
var ServicesPage = /** @class */ (function () {
    function ServicesPage(router, service, modalController, loadingService) {
        this.router = router;
        this.service = service;
        this.modalController = modalController;
        this.loadingService = loadingService;
        this.services = [];
        this.country_catalogue = [];
        this.userData = {};
        this.caDependet = [];
        this.caCity = [];
        this.caStatus = [];
        this.filtes = {
            status: null,
            deliveryTo: null
        };
        this.show_name_assignee = false;
    }
    ServicesPage.prototype.ngOnInit = function () {
        this.servicesType = 1;
    };
    ServicesPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    ServicesPage.prototype.ionViewWillEnter = function () {
        console.log(window.screen.width);
        if (window.screen.width <= 500) {
            this.show_name_assignee = true;
        }
        else {
            this.show_name_assignee = false;
        }
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.userData = this.userData.assigneeInformations[0];
        this.catalogos();
        this.change();
    };
    ServicesPage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.country_catalogue = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetDependents?sr=' + localStorage.getItem('sr'))];
                    case 2:
                        _b.caDependet = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCity')];
                    case 3:
                        _c.caCity = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetStatus')];
                    case 4:
                        _d.caStatus = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServicesPage.prototype.change = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.service.service_general_get('ServiceRecord/GetServices/' + localStorage.getItem('sr') + '?type=' + this.servicesType + '&status=' + this.filtes.status + '&deliverTo=' + this.filtes.deliveryTo).subscribe(function (r) {
            console.log(r);
            if (r.success) {
                _this.services = r.map.value;
            }
            _this.loadingService.loadingDismiss();
        });
    };
    ServicesPage.prototype.getNationality = function (id) {
        for (var i = 0; i < this.country_catalogue.length; i++) {
            var element = this.country_catalogue[i];
            if (element.id == id) {
                return element.name;
            }
        }
    };
    ServicesPage.prototype.getCity = function (id) {
        for (var i = 0; i < this.caCity.length; i++) {
            var element = this.caCity[i];
            if (element.id == id) {
                return element.city;
            }
        }
    };
    ServicesPage.prototype.getName = function (id) {
        for (var i = 0; i < this.caDependet.length; i++) {
            var element = this.caDependet[i];
            if (element.id == id) {
                return element.name;
            }
        }
        return '';
    };
    ServicesPage.prototype.serviceDetail = function (a) {
        switch (a.dialog_type) {
            case 1:
                this.entryvisa(a);
                break;
        }
    };
    ServicesPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl(localStorage.getItem('back'));
    };
    ServicesPage.prototype.entryvisa = function (a) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: services_details_page_1.ServicesDetailsPage,
                            backdropDismiss: true,
                            componentProps: a
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
    ServicesPage.prototype.open_service = function (item, type) {
        return __awaiter(this, void 0, void 0, function () {
            var ModalToOpen;
            return __generator(this, function (_a) {
                if (type == 1) {
                    item.homecountry = this.getNationality(this.userData.homeCountryId);
                    item.homecity = this.getCity(this.userData.homeCityId);
                }
                else {
                    item.homecountry = this.getNationality(this.userData.hostCountryId);
                    item.homecity = this.getCity(this.userData.hostCityId);
                }
                item.type = type;
                localStorage.removeItem('data_service');
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
                        this.router.navigateByUrl('assignee-taps/notifications');
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
                        //ModalToOpen = HomeFindingPage;
                        localStorage.setItem('data_service', JSON.stringify(item));
                        this.router.navigateByUrl('assignee-taps/leaseRenewal');
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    ServicesPage = __decorate([
        core_1.Component({
            selector: 'app-services',
            templateUrl: './services.page.html',
            styleUrls: ['./services.page.scss']
        })
    ], ServicesPage);
    return ServicesPage;
}());
exports.ServicesPage = ServicesPage;
