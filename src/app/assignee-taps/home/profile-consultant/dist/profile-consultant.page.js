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
exports.ProfileConsultantPage = void 0;
var core_1 = require("@angular/core");
var add_vehicle_page_1 = require("../add-vehicle/add-vehicle.page");
var add_emergency_page_1 = require("../add-emergency/add-emergency.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var document_profile_document_page_1 = require("src/app/dialog/document-profile-document/document-profile-document.page");
var ProfileConsultantPage = /** @class */ (function () {
    function ProfileConsultantPage(service, _services, loader, router, modalController, iab) {
        this.service = service;
        this._services = _services;
        this.loader = loader;
        this.router = router;
        this.modalController = modalController;
        this.iab = iab;
        this.padingios = false;
        this.userData = {};
        this.show_name_assignee = false;
        this.country = [];
        this.temporalDocument = [];
    }
    ProfileConsultantPage.prototype.ionViewWillEnter = function () {
        console.log(window.screen.width);
        if (window.screen.width <= 500) {
            this.show_name_assignee = true;
        }
        else {
            this.show_name_assignee = false;
        }
        this.ngOnInit();
    };
    ProfileConsultantPage.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        console.log('user', this.userData);
        this.catalog();
    };
    ProfileConsultantPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl('assignee-taps/home');
    };
    ProfileConsultantPage.prototype.call = function () {
        console.log('call');
    };
    ProfileConsultantPage.prototype.catalog = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.service.loader = true;
        this._services.service_general_get("Profile/App/GetProfile/" + this.userData.profileUsers[0].id).subscribe(function (r) {
            if (r.success) {
                console.log(r);
                _this.profileConsultant = r.result;
                _this.paymentInf = r.result.personalInformation.paymentInformationProfiles[0];
                _this.documentConsultant = r.result.documentConsultantContactsConsultants;
                _this.vehicleConsultants = r.result.vehicleConsultants;
                _this.emergencyContacts = r.result.personalInformation.emergencyContacts;
                _this.loader.loadingDismiss();
            }
        });
        this._services.service_general_get("Catalogue/GetCountry").subscribe(function (r) {
            if (r.success) {
                console.log(r);
                _this.country = r.result;
            }
        });
    };
    ProfileConsultantPage.prototype.nameCountry = function (id) {
        for (var i = 0; i < this.country.length; i++) {
            if (this.country[i].id == id) {
                return this.country[i].name;
            }
        }
        return '';
    };
    ProfileConsultantPage.prototype.addVehicle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_vehicle_page_1.AddVehiclePage,
                            componentProps: { id: 0 }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                data.data.consultantContactsConsultant = _this.profileConsultant.id;
                                _this.profileConsultant.vehicleConsultants.push(data.data);
                                _this.update_data();
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
    ProfileConsultantPage.prototype.editVehicle = function (item, i) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_vehicle_page_1.AddVehiclePage,
                            componentProps: item
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                _this.profileConsultant.vehicleConsultants[i] = data.data;
                                _this.update_data();
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
    ProfileConsultantPage.prototype.addContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = { id: 0 };
                        return [4 /*yield*/, this.modalController.create({
                                component: add_emergency_page_1.AddEmergencyPage,
                                componentProps: data
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                _this.profileConsultant.personalInformation.emergencyContacts.push(data.data);
                                _this.update_data();
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
    ProfileConsultantPage.prototype.editEmergencia = function (item, i) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: add_emergency_page_1.AddEmergencyPage,
                            componentProps: item
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                _this.profileConsultant.personalInformation.emergencyContacts[i] = data.data;
                                _this.update_data();
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
    ProfileConsultantPage.prototype.docs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: document_profile_document_page_1.DocumentProfileDocumentPage
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                data.data.consultantContactsService = _this.profileConsultant.id;
                                _this.temporalDocument.push(data.data);
                                _this.update_data();
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
    ProfileConsultantPage.prototype.update_data = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.profileConsultant.user = null;
        this.profileConsultant.documentConsultantContactsConsultants = [];
        this.profileConsultant.documentConsultantContactsConsultants = this.temporalDocument;
        this.profileConsultant.updatedBy = this.userData.id;
        this.profileConsultant.updatedDate = new Date();
        if (this.profileConsultant.photo == null) {
            this.profileConsultant.photo = '';
            this.profileConsultant.photoExtension = '';
        }
        console.log("data a guardar: ", this.profileConsultant);
        this._services.service_general_put("Profile/UpdateProfile", this.profileConsultant).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.general_messages({
                    title: "Success",
                    body: "Profile was updated",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.ngOnInit();
            }
        }), function (err) {
            console.log("error: ", err);
        });
    };
    //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
    ProfileConsultantPage.prototype.general_messages = function (data) {
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
    ProfileConsultantPage.prototype.viewDoc = function (doc) {
        this.iab.create(this.service.url_images + doc, '_system');
    };
    ProfileConsultantPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    ProfileConsultantPage = __decorate([
        core_1.Component({
            selector: 'app-profile-consultant',
            templateUrl: './profile-consultant.page.html',
            styleUrls: ['./profile-consultant.page.scss']
        })
    ], ProfileConsultantPage);
    return ProfileConsultantPage;
}());
exports.ProfileConsultantPage = ProfileConsultantPage;
