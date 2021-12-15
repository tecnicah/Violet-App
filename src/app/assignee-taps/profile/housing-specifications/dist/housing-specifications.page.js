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
exports.HousingSpecificationsPage = void 0;
var core_1 = require("@angular/core");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var HousingSpecificationsPage = /** @class */ (function () {
    function HousingSpecificationsPage(modalController, _service, navParams, loadingService) {
        this.modalController = modalController;
        this._service = _service;
        this.navParams = navParams;
        this.loadingService = loadingService;
        this.userData = {};
        this.amenities = [];
        this.caContracType = [];
        this.caPropertyType = [];
        this.caNumbers = [];
        this.caCurrency = [];
        this.caSize = [];
        this.caMetric = [];
        this.info = {};
    }
    HousingSpecificationsPage.prototype.ngOnInit = function () {
    };
    HousingSpecificationsPage.prototype.ionViewWillEnter = function () {
        this.info = this.navParams.data;
        this.info.modal = "";
        console.log(this.info);
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.catalogs();
    };
    HousingSpecificationsPage.prototype.catalogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, i, j, i;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetAmenity')];
                    case 1:
                        _a.amenities = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetContractType')];
                    case 2:
                        _b.caContracType = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetPropertyTypeHousing')];
                    case 3:
                        _c.caPropertyType = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetCurrency')];
                    case 4:
                        _d.caCurrency = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetSize')];
                    case 5:
                        _e.caSize = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetMetric')];
                    case 6:
                        _f.caMetric = _g.sent();
                        for (i = 0; i < 11; i++) {
                            this.caNumbers.push(i);
                        }
                        for (j = 0; j < this.amenities.length; j++) {
                            for (i = 0; i < this.info.relHousingAmenities.length; i++) {
                                if (this.info.relHousingAmenities[i].amenitieId == this.amenities[j].id) {
                                    this.amenities[j].check = true;
                                }
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HousingSpecificationsPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    HousingSpecificationsPage.prototype.save = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        var amenities = [];
        for (var i = 0; i < this.amenities.length; i++) {
            var element = this.amenities[i];
            if (element.check) {
                amenities.push({
                    amenitieId: element.id,
                    housingSpecificationId: this.info.id
                });
            }
        }
        this.info.relHousingAmenities = amenities;
        console.log(this.info);
        if (this.info.id == 0) {
            console.log("nuevo");
            this._service.service_general_post_with_url('HousingSpecification/CreateHousingSpecification', this.info).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.general_messages({
                        title: "Success",
                        body: "Recorded information",
                        success: true
                    });
                }
                _this.loadingService.loadingDismiss();
            });
        }
        else {
            console.log("edit");
            this._service.service_general_put('HousingSpecification/PutCreateHousingSpecification', this.info).subscribe(function (r) {
                console.log(r);
                if (r.success) {
                    _this.general_messages({
                        title: "Success",
                        body: "Edited information",
                        success: true
                    });
                }
                _this.loadingService.loadingDismiss();
            });
        }
    };
    HousingSpecificationsPage.prototype.general_messages = function (data) {
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
    HousingSpecificationsPage = __decorate([
        core_1.Component({
            selector: 'app-housing-specifications',
            templateUrl: './housing-specifications.page.html',
            styleUrls: ['./housing-specifications.page.scss']
        })
    ], HousingSpecificationsPage);
    return HousingSpecificationsPage;
}());
exports.HousingSpecificationsPage = HousingSpecificationsPage;
