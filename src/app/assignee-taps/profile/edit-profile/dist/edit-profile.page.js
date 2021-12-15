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
exports.EditProfilePage = void 0;
var core_1 = require("@angular/core");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var EditProfilePage = /** @class */ (function () {
    function EditProfilePage(navParams, camera, service, actionSheetController, modalController, iab, loadingService) {
        this.navParams = navParams;
        this.camera = camera;
        this.service = service;
        this.actionSheetController = actionSheetController;
        this.modalController = modalController;
        this.iab = iab;
        this.loadingService = loadingService;
        this.userData = {};
        this.data = {};
        this.caLanguages = [];
        this.caCountry = [];
        this.caCity = [];
        this.caPolicyType = [];
        this.caDuration = [];
        this.caGrade = [];
        this.caPetType = [];
        this.caBreed = [];
        this.caSize = [];
        this.caWeight = [];
        this.info = {};
        this.caMaritalstatus = [];
        this.caRelationship = [];
        this.caDocumentType = [];
        this.view = false;
        this.documents = [];
    }
    EditProfilePage.prototype.ngOnInit = function () {
    };
    EditProfilePage.prototype.ionViewWillEnter = function () {
        this.catalogs();
        this.data = this.navParams.data;
        this.data.modal = null;
        this.info = this.data.data;
        console.log(this.data);
        this.view = true;
        if (this.data.type == 1 || this.data.type == 2) {
            this.info.family = [];
            for (var j = 0; j < this.info.languageDependentInformations.length; j++) {
                this.info.family.push(this.info.languageDependentInformations[j].language);
            }
        }
        if (this.data.type == 5) {
            this.info.family = [];
            for (var j = 0; j < this.info.languagesSpokens.length; j++) {
                this.info.family.push(this.info.languagesSpokens[j].languages);
            }
        }
        console.log(this.info);
        this.getBreed();
        this.getDocument();
        this.userData = JSON.parse(localStorage.getItem('userData'));
    };
    EditProfilePage.prototype.catalogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetLanguages')];
                    case 1:
                        _a.caLanguages = _o.sent();
                        _b = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.caCountry = _o.sent();
                        _c = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetCity')];
                    case 3:
                        _c.caCity = _o.sent();
                        _d = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetPolicyType')];
                    case 4:
                        _d.caPolicyType = _o.sent();
                        _e = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetDuration')];
                    case 5:
                        _e.caDuration = _o.sent();
                        _f = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetGradeSchooling')];
                    case 6:
                        _f.caGrade = _o.sent();
                        _g = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetPetType')];
                    case 7:
                        _g.caPetType = _o.sent();
                        _h = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetSize')];
                    case 8:
                        _h.caSize = _o.sent();
                        _j = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetWeightMeasure')];
                    case 9:
                        _j.caWeight = _o.sent();
                        _k = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetMaritalStatus')];
                    case 10:
                        _k.caMaritalstatus = _o.sent();
                        _l = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetRelationship')];
                    case 11:
                        _l.caRelationship = _o.sent();
                        _m = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetDocumentType')];
                    case 12:
                        _m.caDocumentType = _o.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProfilePage.prototype.getBreed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetBreed?id=' + this.info.petTypeId)];
                    case 1:
                        _a.caBreed = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditProfilePage.prototype.docName = function (id) {
        for (var i = 0; i < this.caDocumentType.length; i++) {
            var element = this.caDocumentType[i];
            if (id = element.id) {
                return element.documentType;
            }
        }
    };
    EditProfilePage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        if (this.data.type == 5) {
            var languages = [];
            for (var i = 0; i < this.info.languagesSpokens.length; i++) {
                var element = this.info.languagesSpokens[i];
                languages.push({
                    assignneInformation: this.info.id,
                    languages: element
                });
            }
            this.info.languagesSpokens = languages;
        }
        this.modalController.dismiss();
    };
    EditProfilePage.prototype.getAge = function (date_in) {
        var date_init = new Date(date_in), date_today = new Date();
        var diff = (date_init.getTime() - date_today.getTime()) / 1000;
        diff /= (60 * 60 * 24);
        this.info.age = Math.abs(Math.round(diff / 365.25));
    };
    EditProfilePage.prototype.getRelationShip = function (id) {
        for (var i = 0; i < this.caRelationship.length; i++) {
            var element = this.caRelationship[i];
            if (id == element.id) {
                return element.relationship;
            }
        }
    };
    EditProfilePage.prototype.documentDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: documents_dialog_page_1.DocumentsDialogPage,
                            componentProps: { id: 3 },
                            backdropDismiss: true
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
    EditProfilePage.prototype.photo = function () {
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
    EditProfilePage.prototype.option = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var name = new Date().toISOString();
            if (_this.data.type == 5) {
                _this.data.allSR.assigneeInformations[0].photoExtension = 'jpeg';
                _this.data.allSR.assigneeInformations[0].photo = imageData;
                _this.save();
            }
            if (_this.data.type == 4) {
                _this.data.allSR.assigneeInformations[0].petsNavigation[_this.data.pos].photoExtension = 'jpeg';
                _this.data.allSR.assigneeInformations[0].petsNavigation[_this.data.pos].photo = imageData;
                _this.save();
            }
            if (_this.data.type == 2 || _this.data.type == 1 || _this.data.type == 3) {
                _this.data.allSR.assigneeInformations[0].dependentInformations[_this.data.pos].photoExtension = 'jpeg';
                _this.data.allSR.assigneeInformations[0].dependentInformations[_this.data.pos].photo = imageData;
                _this.save();
            }
        }, function (err) {
            // Handle error
        });
    };
    EditProfilePage.prototype.save = function () {
        var _this = this;
        console.log(this.data.allData);
        console.log(this.info);
        this.loadingService.loadingPresent();
        if (this.data.type == 1 || this.data.type == 2) {
            this.info.languageDependentInformations = [];
            for (var i = 0; i < this.info.family.length; i++) {
                this.info.languageDependentInformations.push({
                    dependent: this.info.id,
                    language: this.info.family[i]
                });
            }
        }
        if (this.data.type == 1 || this.data.type == 2 || this.data.type == 3) {
            for (var i = 0; i < this.data.allData.dependentInformations.length; i++) {
                var element = this.data.allData.dependentInformations[i];
                if (element.id == this.info.id) {
                    this.data.allData.dependentInformations[i] = this.info;
                }
            }
        }
        if (this.data.type == 4) {
            for (var i = 0; i < this.data.allData.petsNavigation.length; i++) {
                var element = this.data.allData.petsNavigation[i];
                if (element.id == this.info.id) {
                    this.data.allData.petsNavigation[i] = this.info;
                }
            }
        }
        if (this.data.type == 5) {
            this.info.languagesSpokens = [];
            for (var i = 0; i < this.info.family.length; i++) {
                this.info.languagesSpokens.push({
                    assignneInformation: this.info.id,
                    languages: this.info.family[i]
                });
            }
            this.data.allData.languagesSpokens = this.info.languagesSpokens;
        }
        this.data.allSR.assigneeInformations[0] = this.data.allData;
        console.log(this.data);
        this.service.service_general_put('ServiceRecord/Update', this.data.allSR)
            .subscribe(function (response) {
            console.log(response);
            if (response.success) {
                _this.loadingService.loadingDismiss();
                _this.ionViewWillEnter();
                _this.general_messages({
                    title: "Success",
                    body: "Edited information",
                    success: true
                });
                _this.modalController.dismiss();
            }
        });
    };
    EditProfilePage.prototype.viewDoc = function (id) {
        var _this = this;
        this.service.service_general_get("ImmigrationProfile/GetAssigneFamilyById?id=" + id)
            .subscribe(function (response) {
            _this.iab.create(_this.service.url_images + response.result.value[0].ulr_document, '_system');
        });
    };
    EditProfilePage.prototype.general_messages = function (data) {
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
    EditProfilePage.prototype.getDocument = function () {
        var _this = this;
        var id_selected = 0;
        if (Number(localStorage.getItem('sr')) != 0) {
            id_selected = Number(localStorage.getItem('sr'));
        }
        else {
            id_selected = Number(localStorage.getItem('srAd'));
        }
        this.service.service_general_get("ImmigrationProfile/GetAssigneFamily?sr=" + id_selected)
            .subscribe(function (response) {
            console.log('Library Res => ', response);
            if (response.success) {
                var library_ass_data = response.result.value;
                for (var index = 0; index < library_ass_data.length; index++) {
                    if (library_ass_data[index].id == _this.info.id) {
                        _this.documents = library_ass_data[index].document;
                    }
                }
                console.log('library_ass_data Succ ==> ', library_ass_data.length);
            }
        }, function (error) {
            console.error('Error (ImmigrationProfile/GetAssigneFamilyById) => ', error);
        });
    };
    EditProfilePage.prototype.deleteDocument = function (id) {
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
                                body: "Delete document?",
                                yesText: 'Yes, delete',
                                noText: 'No, continue'
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data, id);
                            if (data.data) {
                                if (id != 0) {
                                    _this.service.service_general_get("ImmigrationProfile/DeleteDocumentDependent?id=" + id).subscribe(function (r) {
                                        if (r.success) {
                                            _this.general_messages({
                                                title: "Success",
                                                body: "The document was deleted",
                                                success: true
                                            });
                                            _this.ionViewWillEnter();
                                        }
                                    });
                                }
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
    EditProfilePage = __decorate([
        core_1.Component({
            selector: 'app-edit-profile',
            templateUrl: './edit-profile.page.html',
            styleUrls: ['./edit-profile.page.scss']
        })
    ], EditProfilePage);
    return EditProfilePage;
}());
exports.EditProfilePage = EditProfilePage;
