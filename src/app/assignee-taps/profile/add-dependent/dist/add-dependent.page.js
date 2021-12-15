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
exports.AddDependentPage = void 0;
var core_1 = require("@angular/core");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var AddDependentPage = /** @class */ (function () {
    function AddDependentPage(camera, actionSheetController, router, service, navParams, modalController, loadingService, loader) {
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.router = router;
        this.service = service;
        this.navParams = navParams;
        this.modalController = modalController;
        this.loadingService = loadingService;
        this.loader = loader;
        this.data_ = {
            id: 0,
            languageDependentInformations: [],
            assigneeInformationId: 0,
            email: '',
            ifOther: '',
            phone: '',
            photo: '',
            photoExtension: ''
        };
        //***************************************************************//
        this.relationship_catalogue = [];
        this.gender_catalogue = [];
        this.languages_catalogue = [];
        this.country_catalogue = [];
        this.schoolgrades_catalogue = [];
    }
    //***************************************************************//
    AddDependentPage.prototype.ionViewWillEnter = function () {
        this.info_assignee = this.navParams.data.data;
        console.log("assignee", this.info_assignee);
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.sr = localStorage.getItem('sr');
        this.getCatalogos();
    };
    //***************************************************************//
    AddDependentPage.prototype.ngOnInit = function () {
    };
    AddDependentPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetGradeSchooling')];
                    case 1:
                        _a.schoolgrades_catalogue = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.country_catalogue = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetLanguages')];
                    case 3:
                        _c.languages_catalogue = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetSex')];
                    case 4:
                        _d.gender_catalogue = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetRelationship')];
                    case 5:
                        _e.relationship_catalogue = _f.sent();
                        console.log(this.relationship_catalogue);
                        return [2 /*return*/];
                }
            });
        });
    };
    //***************************************************************//
    AddDependentPage.prototype.photo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            mode: 'ios',
                            buttons: [{
                                    text: 'Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        var options = {
                                            quality: 100,
                                            destinationType: _this.camera.DestinationType.DATA_URL,
                                            encodingType: _this.camera.EncodingType.JPEG,
                                            mediaType: _this.camera.MediaType.PICTURE
                                        };
                                        _this.option(options);
                                    }
                                }, {
                                    text: 'Galery',
                                    icon: 'images',
                                    handler: function () {
                                        var options = {
                                            sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                                            quality: 100,
                                            destinationType: _this.camera.DestinationType.DATA_URL,
                                            encodingType: _this.camera.EncodingType.JPEG,
                                            mediaType: _this.camera.MediaType.PICTURE
                                        };
                                        _this.option(options);
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //**********************************************************************//
    AddDependentPage.prototype.option = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var name = new Date().toISOString();
            _this.data_.photoExtension = 'jpeg';
            _this.data_.photo = imageData;
            _this.data_.b64 = base64Image;
            document.getElementById('imagen').setAttribute('src', '' + _this.data_.b64);
        }, function (err) {
            // Handle error
        });
    };
    //***************************************************************//
    AddDependentPage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        if (this.data_.idiomas && this.data_.idiomas.length > 0) {
            for (var i = 0; i < this.data_.idiomas.length; i++) {
                this.data_.languageDependentInformations.push({
                    "dependent": 0,
                    "language": this.data_.idiomas[i]
                });
            }
        }
        this.data_.assigneeInformationId = this.info_assignee.id;
        console.log(this.data_);
        this.info_assignee.assigneeInformations[0].dependentInformations.push(this.data_);
        console.log(this.info_assignee);
        this.service.service_general_put("ServiceRecord/Update", this.info_assignee).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.general_messages({
                    title: "Success",
                    body: "Dependent saved",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.back();
            }
        }));
    };
    AddDependentPage.prototype.general_messages = function (data) {
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
    //***********************************************************//
    AddDependentPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    //***********************************************************//
    //CALCULO DE EDAD//
    AddDependentPage.prototype.calculateHowOld = function () {
        var my_bd = this.data_.birth;
        var newDate = new Date(my_bd);
        if (my_bd != null || my_bd != '') {
            var timeDiff = Math.abs(Date.now() - newDate.getTime());
            this.data_.age = Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
        }
        else {
            this.data_.age = null;
        }
    };
    AddDependentPage = __decorate([
        core_1.Component({
            selector: 'app-add-dependent',
            templateUrl: './add-dependent.page.html',
            styleUrls: ['./add-dependent.page.scss']
        })
    ], AddDependentPage);
    return AddDependentPage;
}());
exports.AddDependentPage = AddDependentPage;
