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
exports.ImmigrationProfilePage = void 0;
var core_1 = require("@angular/core");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var ImmigrationProfilePage = /** @class */ (function () {
    function ImmigrationProfilePage(modalController, _service, navParams, loadingService) {
        this.modalController = modalController;
        this._service = _service;
        this.navParams = navParams;
        this.loadingService = loadingService;
        this.userData = {};
        this.caVisa = [];
        this.caHighestLevelEducation = [];
        this.caLanguages = [];
        this.caProficiency = [];
        this.caCurrency = [];
        this.caRelation = [];
    }
    ImmigrationProfilePage.prototype.ngOnInit = function () {
    };
    ImmigrationProfilePage.prototype.ionViewWillEnter = function () {
        this.catalogos();
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.info = this.navParams.data;
        this.info.modal = null;
        console.log(this.info);
    };
    ImmigrationProfilePage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetVisaCategory')];
                    case 1:
                        _a.caVisa = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetHighestLevelEducation')];
                    case 2:
                        _b.caHighestLevelEducation = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetLanguages')];
                    case 3:
                        _c.caLanguages = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetProficiency')];
                    case 4:
                        _d.caProficiency = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetCurrency')];
                    case 5:
                        _e.caCurrency = _f.sent();
                        this._service.service_general_get("ServiceRecord/GetApplicant/" + localStorage.getItem('sr')).subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.caRelation = data.applicant.value;
                                console.log(_this.caRelation);
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    ImmigrationProfilePage.prototype.addSchool = function () {
        this.info.educationalBackgrounds.push({
            degree: "",
            endDate: "",
            fieldStudy: "",
            id: 0,
            immigrationProfileId: this.info.id,
            institution: "",
            listProfessionalLicenses: "",
            startDate: ""
        });
    };
    ImmigrationProfilePage.prototype.deleteSchool = function (i) {
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
                                body: "Are you sure delete this item?",
                                yesText: 'Yes,delete',
                                noText: 'No, cancel'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data) {
                                _this.info.educationalBackgrounds.splice(i, 1);
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
    ImmigrationProfilePage.prototype.addLanguage = function () {
        this.info.lenguageProficiencies.push({
            comments: "",
            id: 0,
            immigrationProfileId: this.info.id,
            languageId: 0,
            proficiencyId: 0
        });
    };
    ImmigrationProfilePage.prototype.removeLanguage = function (i) {
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
                                body: "Are you sure delete this item?",
                                yesText: 'Yes,delete',
                                noText: 'No, cancel'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data) {
                                _this.info.lenguageProficiencies.splice(i, 1);
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
    ImmigrationProfilePage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    ImmigrationProfilePage.prototype.save = function () {
        var _this = this;
        console.log("Informacion a guardar: ", this.info);
        this.loadingService.loadingPresent();
        this._service.service_general_put('ImmigrationProfile/UpdateImmigrationProfileProvisional', this.info).subscribe(function (data) {
            console.log(data);
            _this.loadingService.loadingDismiss();
            _this.general_messages({
                title: "Success",
                body: "Edited information",
                success: true
            });
        });
    };
    ImmigrationProfilePage.prototype.general_messages = function (data) {
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
    ImmigrationProfilePage = __decorate([
        core_1.Component({
            selector: 'app-immigration-profile',
            templateUrl: './immigration-profile.page.html',
            styleUrls: ['./immigration-profile.page.scss']
        })
    ], ImmigrationProfilePage);
    return ImmigrationProfilePage;
}());
exports.ImmigrationProfilePage = ImmigrationProfilePage;
