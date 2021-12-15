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
exports.EntryVisaPage = void 0;
var core_1 = require("@angular/core");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var EntryVisaPage = /** @class */ (function () {
    function EntryVisaPage(loader, router, 
    //public navParams: NavParams, 
    modalController, _services, permissionsService) {
        this.loader = loader;
        this.router = router;
        this.modalController = modalController;
        this._services = _services;
        this.permissionsService = permissionsService;
        this.addReminder_ = false;
        this.addComment_ = false;
        this.userData = {};
        this.temporalDocument = [];
        this.reminder_data = {};
        this.comment_data = {};
        this.disabled = false;
        this.coordinatos = [];
        this.consultant = [];
        //**************************************************************************************************//
        this.show_name_assignee = true;
        //**************************************************************************************************//
        //CONSULTA DATA GLOBAL SERVICIO//
        this.entryVisa = {
            documentEntryVisas: [],
            reminderEntryVisas: [],
            commentsEntryVisas: []
        };
        this.data = {};
        this.ca_visaType = [];
        this.caCountry = [];
        //**************************************************************************************************//
        //CONSULTA DE CATALOGOS//
        this.ca_estatus = [];
        //**************************************************************************************************//
        //FUNCION PARA CONSULTAR LOS REQUEST PAYMENT//
        this.payment = [];
    }
    EntryVisaPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (window.screen.width <= 500) {
            this.show_name_assignee = true;
        }
        else {
            this.show_name_assignee = false;
        }
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.permissionsService.loadPermissions([this.userData.role.id]);
        if (this.userData.role.id == 4) {
            this.disabled = true;
        }
        var coordi = JSON.parse(localStorage.getItem('immigrationCoodinators'));
        var consult = JSON.parse(localStorage.getItem('immigrationSupplierPartners'));
        for (var i = 0; i < coordi.length; i++) {
            var element = coordi[i];
            this._services.service_general_get('Catalog/GetUser/' + element.coordinatorId).subscribe(function (r) {
                if (r.success) {
                    _this.coordinatos.push(r.result.value);
                }
            });
        }
        for (var i = 0; i < consult.length; i++) {
            var element = consult[i];
            this._services.service_general_get('Catalog/GetUser/' + element.supplierId).subscribe(function (r) {
                if (r.success) {
                    _this.consultant.push(r.result.value);
                }
            });
        }
        console.log(this.coordinatos, this.consultant);
        this.ngOnInit();
    };
    EntryVisaPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.getCatalogos();
        //this.data = this.navParams.data;
        this.data = JSON.parse(localStorage.getItem('data_service'));
        this._services.service_general_get("ImmigrationServices/GetEntryVisaById?id=" + this.data.service[0].id)
            .subscribe(function (response) {
            console.log(response);
            if (response.success) {
                console.log(response.result);
                _this.entryVisa = response.result;
                _this.sortData();
                _this.loader.loadingDismiss();
                _this.get_payment();
                _this.loader.loadingDismiss();
            }
        }, function (error) {
            console.error('Error => ', error);
        });
        this._services.service_general_get("Catalogue/GetVisaCategory").subscribe((function (data) {
            if (data.success) {
                _this.ca_visaType = data.result;
            }
        }));
        this.loader.loadingDismiss();
    };
    EntryVisaPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCountry = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 2:
                        _b.ca_estatus = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EntryVisaPage.prototype.getCountryName = function (id) {
        for (var i = 0; i < this.caCountry.length; i++) {
            if (this.caCountry[i].id == id) {
                return this.caCountry[i].name;
            }
        }
    };
    EntryVisaPage.prototype.getStatusName = function (statusId) {
        for (var i = 0; i < this.ca_estatus.length; i++) {
            var element = this.ca_estatus[i];
            if (element.id == statusId) {
                return element.status;
            }
        }
    };
    EntryVisaPage.prototype.getVisaNAme = function (visaTypeId) {
        for (var i = 0; i < this.ca_visaType.length; i++) {
            var element = this.ca_visaType[i];
            if (element.id == visaTypeId) {
                return element.visaCategory;
            }
        }
    };
    //**************************************************************************************************//
    //FUNCION PARA AGREGAR DOCUMENTOS//
    EntryVisaPage.prototype.addDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: documents_dialog_page_1.DocumentsDialogPage,
                            componentProps: { id: 2 },
                            backdropDismiss: true
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                data.data.entryVisaId = _this.entryVisa.id;
                                data.data.comment = "";
                                _this.temporalDocument.push(data.data);
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
    //**************************************************************************************************//
    //FUNCION PARA ELIMINAR DOCUMENTOS//
    EntryVisaPage.prototype.deleteDocument = function (id, i) {
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
                                    _this._services.service_general_delete('ImmigrationServices/DeleteDocumentEV?id=' + id).subscribe(function (r) {
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
                                else {
                                    _this.temporalDocument.splice(i, 1);
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
    //**************************************************************************************************//
    //FUNCION PARA ELIMINAR REMINDER//
    EntryVisaPage.prototype.deleteReminder = function (id, i) {
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
                                body: "Do you want delete this reminder?",
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
                                    _this._services.service_general_delete('ImmigrationServices/DeleteReminderEV?id=' + id).subscribe(function (r) {
                                        if (r.success) {
                                            _this.general_messages({
                                                title: "Success",
                                                body: "The reminder was deleted",
                                                success: true
                                            });
                                            _this.ionViewWillEnter();
                                        }
                                    });
                                }
                                else {
                                    _this.entryVisa.reminderEntryVisas.splice(i, 1);
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
    //**************************************************************************************************//
    //FUNCION PARA AGREGAR REPLICA//
    EntryVisaPage.prototype.addComment = function () {
        this.entryVisa.commentsEntryVisas.push({
            "id": 0,
            "entryVisaId": this.entryVisa.id,
            "reply": this.comment_data.comments,
            "userId": this.userData.id,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updateBy": this.userData.id,
            "updatedDate": new Date(),
            "user": this.userData
        });
        this.addComment_ = false;
        this.comment_data.comments = '';
    };
    //**************************************************************************************************//
    //FUNCION PARA AGREGAR REPLICA//
    EntryVisaPage.prototype.addReminder = function () {
        this.entryVisa.reminderEntryVisas.push({
            "id": 0,
            "entryVisaId": this.entryVisa.id,
            "reminderDate": this.reminder_data.reminderDate,
            "reminderComments": this.reminder_data.reminderComments,
            "createdBy": this.userData.id,
            "createdDate": new Date()
        });
        this.reminder_data.reminderDate = null;
        this.reminder_data.reminderComments = '';
        this.addReminder_ = false;
    };
    //**************************************************************************************************//
    //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
    EntryVisaPage.prototype.general_messages = function (data) {
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
    //**************************************************************************************************//
    //FUNCION PARA CONSULAR SERVICES//
    EntryVisaPage.prototype.viewConsularService = function (e) {
        console.log(e);
        if (e.detail.checked) {
            this.entryVisa.consularServiceId = 1;
        }
        else {
            this.entryVisa.consularServiceId = 2;
        }
    };
    //**************************************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    EntryVisaPage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.entryVisa.updatedDate;
        this.entryVisa.updateBy;
        this.entryVisa.documentEntryVisas = this.temporalDocument;
        var data_comment_aux = this.entryVisa.commentsEntryVisas;
        this.entryVisa.commentsEntryVisas = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                data_comment_aux[i].user.profileUsers = [];
                this.entryVisa.commentsEntryVisas.push(data_comment_aux[i]);
            }
        }
        console.log(this.entryVisa);
        this._services.service_general_put("ImmigrationServices/UpdateEntryVisa", this.entryVisa).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.general_messages({
                    title: "Success",
                    body: "Entry Visa was updated",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.temporalDocument = [];
                _this.ionViewWillEnter();
            }
        }));
    };
    //**************************************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    EntryVisaPage.prototype.back = function () {
        if (this.userData.role.id != 4) {
            var back = document.getElementById('back');
            var sr = Number(localStorage.getItem('srAd'));
            localStorage.removeItem('data_service');
            this.router.navigateByUrl('assignee-taps/services-all/view-sr/' + sr);
            back.play();
        }
        else {
            var back = document.getElementById('back');
            var sr = Number(localStorage.getItem('srAd'));
            localStorage.removeItem('data_service');
            this.router.navigateByUrl('assignee-taps/services');
            back.play();
        }
    };
    EntryVisaPage.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.entryVisa.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                _this.payment = data.result.value.payments;
                console.log(data);
            }
        }));
    };
    //*********************************************//
    //SORT REMINDER//
    EntryVisaPage.prototype.sortData = function () {
        return this.entryVisa.reminderEntryVisas.sort(function (a, b) {
            return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
    };
    //*********************************************//
    EntryVisaPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    EntryVisaPage = __decorate([
        core_1.Component({
            selector: 'app-entry-visa',
            templateUrl: './entry-visa.page.html',
            styleUrls: ['./entry-visa.page.scss']
        })
    ], EntryVisaPage);
    return EntryVisaPage;
}());
exports.EntryVisaPage = EntryVisaPage;
