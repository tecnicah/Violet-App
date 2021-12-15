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
exports.AddActivitieItemPage = void 0;
var core_1 = require("@angular/core");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var AddActivitieItemPage = /** @class */ (function () {
    function AddActivitieItemPage(service, modalController, navParams, loadingService) {
        this.service = service;
        this.modalController = modalController;
        this.navParams = navParams;
        this.loadingService = loadingService;
        this.data = {
            id: 0
        };
        this.userData = {};
        this.caWo = [];
        this.caService = [];
        this.collaborators = [];
        this.statustask_catalogue = {};
    }
    AddActivitieItemPage.prototype.ngOnInit = function () {
    };
    AddActivitieItemPage.prototype.ionViewWillEnter = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        console.log(this.navParams.data.data);
        this.data.serviceRecordId = this.navParams.data.data.sr;
        this.data.taskFrom = this.userData.id;
        this.data.statusId = 1;
        this.data.serviceLineId = this.navParams.data.data.sl;
        this.data.urgent = false;
        this.data.createdBy = this.userData.id;
        this.data.createdDate = new Date();
        this.data.updateBy = this.userData.id;
        this.data.updatedDate = new Date();
        this.data.taskDocuments = [];
        this.data.statusId = 1;
        this.data.id = this.navParams.data.data.id;
        this.data.comments = "";
        this.catalogos();
    };
    AddActivitieItemPage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.data.id != 0) {
                            this.loadingService.loadingPresent();
                            this.service.service_general_get('Task/GetTaskById?Id=' + this.data.id).subscribe(function (r) {
                                if (r.success) {
                                    console.log("edicion de activity item: ", r.result);
                                    _this.data = r.result;
                                    if (!_this.data.colaborator) {
                                        _this.data.colaborator = [];
                                    }
                                    if (!_this.data.to) {
                                        _this.data.to = [];
                                    }
                                    if (_this.data.colaboratorMembers.length > 0) {
                                        for (var i = 0; i < _this.data.colaboratorMembers.length; i++) {
                                            var element = _this.data.colaboratorMembers[i].colaborator;
                                            _this.data.colaborator.push(element);
                                        }
                                    }
                                    if (_this.data.taskTo != undefined && _this.data.taskTo != null && _this.data.taskTo != '') {
                                        _this.data.to.push(_this.data.taskTo);
                                    }
                                    _this.loadingService.loadingDismiss();
                                    var colaboradores = [];
                                    for (var i = 0; i < _this.data.colaboratorMembers.length; i++) {
                                        var element = _this.data.colaboratorMembers[i];
                                        colaboradores.push(element.colaborator);
                                    }
                                    _this.data.colaboratorMembers = colaboradores;
                                    _this.getServices();
                                }
                            });
                        }
                        this.service.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.navParams.data.data.sr + '&service_line_id=' + this.navParams.data.data.sl).subscribe(function (r) {
                            if (r.success) {
                                _this.caWo = r.result.value;
                            }
                        });
                        this.service.service_general_get('Catalogue/GetUserTo').subscribe(function (r) {
                            if (r.success) {
                                _this.collaborators = r.result.value;
                            }
                        });
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetEstatusTask')];
                    case 1:
                        _a.statustask_catalogue = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddActivitieItemPage.prototype.getServices = function () {
        var _this = this;
        this.service.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data.workOrderId).subscribe(function (r) {
            if (r.success) {
                _this.caService = r.result.value;
            }
        });
    };
    AddActivitieItemPage.prototype.getstatusname = function (id) {
        var _a, _b;
        for (var i = 0; i < ((_b = (_a = this.statustask_catalogue) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.length); i++) {
            var element = this.statustask_catalogue.value[i];
            if (id == element.id) {
                return element.status;
            }
        }
    };
    AddActivitieItemPage.prototype.addDocuments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('srAd', this.navParams.data.data.sr);
                        return [4 /*yield*/, this.modalController.create({
                                component: documents_dialog_page_1.DocumentsDialogPage,
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                data.data.taskId = _this.data.id;
                                data.data.comment = "";
                                _this.data.taskDocuments.push(data.data);
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
    AddActivitieItemPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    AddActivitieItemPage.prototype.save = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        var colaboradores = [];
        this.data.colaboratorMembers = [];
        for (var i = 0; i < this.data.colaborator.length; i++) {
            var element = this.data.colaborator[i];
            colaboradores.push({
                task: this.data.id,
                colaborator: element
            });
        }
        this.data.colaboratorMembers = colaboradores;
        console.log("DATA A GUARDAR O EDITAR ACTIVITY ITEM: ", this.data);
        if (this.data.id == 0) {
            this.service.service_general_post_with_url("Task/CreateTask", this.data).subscribe((function (data) {
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
            this.service.service_general_put("Task/UpdateTask", this.data).subscribe((function (data) {
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
    AddActivitieItemPage.prototype.deleteActivitie = function (id, i) {
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
                                if (id != 0) {
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
                                else {
                                    _this.data.taskDocuments.splice(i, 1);
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
    AddActivitieItemPage.prototype.general_messages = function (data) {
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
    AddActivitieItemPage = __decorate([
        core_1.Component({
            selector: 'app-add-activitie-item',
            templateUrl: './add-activitie-item.page.html',
            styleUrls: ['./add-activitie-item.page.scss']
        })
    ], AddActivitieItemPage);
    return AddActivitieItemPage;
}());
exports.AddActivitieItemPage = AddActivitieItemPage;
