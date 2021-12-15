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
exports.DocumentManagementPage = void 0;
var core_1 = require("@angular/core");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var DocumentManagementPage = /** @class */ (function () {
    function DocumentManagementPage(router, loader, modalController, _services, permissionsService) {
        this.router = router;
        this.loader = loader;
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
        //CONSULTA DATA GLOBAL SERVICIO//
        this.data = {};
        this.DocumentData = {
            documentLocalDocumentations: [],
            reminderDocumentManagements: [],
            commentDocumentManagements: []
        };
        this.document = [];
        this.comment_DM = [];
        this.reminder_DM = [];
        this.data_card_id = [];
        //**************************************************************************************************//
        //CONSULTA DE CATALOGOS//
        this.ca_estatus = [];
        this.ca_country = [];
        this.ca_requestType = [];
        this.ca_document_type = [];
        //**************************************************************************************************//
        //FUNCION PARA CONSULTAR LOS REQUEST PAYMENT//
        this.payment = [];
    }
    //public navParams: NavParams, 
    //**************************************************************************************************//
    DocumentManagementPage.prototype.ionViewWillEnter = function () {
        var _this = this;
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
    DocumentManagementPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.getCatalogos();
        //this.data = this.navParams.data;
        this.data = JSON.parse(localStorage.getItem('data_service'));
        this._services.service_general_get('ImmigrationServices/GetDocumentManagementById?id=' + this.data.id_server)
            .subscribe(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(response);
                        if (!response.success) return [3 /*break*/, 2];
                        console.log(response.result);
                        this.DocumentData = response.result;
                        this.sortData();
                        this.get_supplierPartner();
                        return [4 /*yield*/, this._services.service_general_get("ImmigrationServices/GetLocalOrDocumentation?applicantId=" + this.data.deliveredToId + '&category=' + this.data.categoryId + '&service_order_id=' + Number(this.data.workOrderId) + '&type_service=' + this.data.type).subscribe((function (data) {
                                if (data.success) {
                                    console.log(data);
                                    _this.information_Document_Management = data.result.value.standalone;
                                    if (_this.information_Document_Management.length == 0) {
                                        _this.information_Document_Management = data.result.value.bundle;
                                    }
                                    _this.comment_DM = _this.information_Document_Management[0].commentDocumentManagements;
                                    for (var i = 0; i < _this.comment_DM.length; i++) {
                                        if (_this.DocumentData.commentDocumentManagements.length < _this.comment_DM.length) {
                                            _this.DocumentData.commentDocumentManagements.push(_this.comment_DM[i]);
                                        }
                                        else {
                                            return true;
                                        }
                                    }
                                    _this.reminder_DM = _this.information_Document_Management[0].reminderDocumentManagements;
                                    _this.id_reminder = _this.information_Document_Management[0].documentManagement[0].id;
                                    _this.deliverTo = _this.information_Document_Management[0].documentManagement[0].relationship;
                                    _this.name = _this.information_Document_Management[0].documentManagement[0].applicantName;
                                    _this.workOrderServicesId = _this.information_Document_Management[0].documentManagement[0].workOrderServicesId;
                                    _this.DocumentData.reminderDocumentManagements = _this.reminder_DM;
                                    for (var i = 0; i < _this.information_Document_Management.length; i++) {
                                        var information_card = _this.information_Document_Management[i].documentManagement;
                                        console.log("INFORMATION CARD: ", information_card);
                                        for (var j = 0; j < information_card.length; j++) {
                                            _this.data_card_id.push(_this.information_Document_Management[i].documentManagement[j].id);
                                        }
                                    }
                                }
                                _this.get_payment();
                                _this._services.service_general_get("ServiceRecord/GetApplicant/" + _this.data.sr).subscribe((function (data) {
                                    console.log(data);
                                    if (data.success) {
                                        _this.ca_applicant = data.applicant.value;
                                        console.log(_this.ca_applicant);
                                    }
                                }));
                            }))];
                    case 1:
                        _a.sent();
                        this.loader.loadingDismiss();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }, function (error) {
            console.error('Error => ', error);
        });
    };
    //**************************************************************************//
    //SORT REMINDER//
    DocumentManagementPage.prototype.sortData = function () {
        return this.DocumentData.reminderDocumentManagements.sort(function (a, b) {
            return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
    };
    //***********************************************************************************************************************//
    //**CONSULTA SUPPLIER PARTNER**//
    DocumentManagementPage.prototype.get_supplierPartner = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=3").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.ca_suplier = data.result.value;
            }
        }));
    };
    DocumentManagementPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 1:
                        _a.ca_requestType = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetStatus")];
                    case 2:
                        _b.ca_estatus = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetCountry")];
                    case 3:
                        _c.ca_country = _d.sent();
                        this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((function (data) {
                            if (data.success) {
                                _this.ca_document_type = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentManagementPage.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.DocumentData.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                _this.payment = data.result.value.payments;
                console.log(data);
            }
        }));
    };
    //**************************************************************************************************//
    //FUNCION PARA AGREGAR REPLICA//
    DocumentManagementPage.prototype.addComment = function () {
        this.DocumentData.commentDocumentManagements.push({
            "id": 0,
            "documentManagementId": this.DocumentData.id,
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
    //FUNCION PARA AGREGAR DOCUMENTOS//
    DocumentManagementPage.prototype.addDocument = function (k, i) {
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
                                data.data.documentManagementId = _this.information_Document_Management[k].documentManagement[i].id;
                                console.log("result: ", data.data);
                                _this.information_Document_Management[k].documentManagement[i].documentDocumentManagements.push(data.data);
                                console.log("Documentos: ", _this.information_Document_Management);
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
    DocumentManagementPage.prototype.deleteDocument = function (i, k, j, id) {
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
                                if (id == 0) {
                                    console.log(_this.information_Document_Management[i].documentManagement[k].documentDocumentManagements);
                                    _this.information_Document_Management[i].documentManagement[k].documentDocumentManagements.splice(j, 1);
                                }
                                else {
                                    _this._services.service_general_delete("ImmigrationServices/DeleteDocumentDM?id=" + id).subscribe((function (data) {
                                        if (data.success) {
                                            _this.general_messages({
                                                title: "Success",
                                                body: "The document was deleted",
                                                success: true
                                            });
                                            _this.ionViewWillEnter();
                                        }
                                    }));
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
    DocumentManagementPage.prototype.addReminder = function () {
        this.DocumentData.reminderDocumentManagements.push({
            "id": 0,
            "documentManagementId": this.DocumentData.id,
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
    //FUNCION PARA ELIMINAR REMINDER//
    DocumentManagementPage.prototype.deleteReminder = function (id, i) {
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
                                    _this._services.service_general_delete('ImmigrationServices/DeleteReminderDM?id=' + id).subscribe(function (r) {
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
                                    _this.DocumentData.reminderDocumentManagements.splice(i, 1);
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
    //FUNCION PARA GUARDAR INFORMACION//
    DocumentManagementPage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        var data_to_send = [];
        var aux_reminder = [];
        console.log("INFO GENERAL: ", this.DocumentData);
        var aux_data = this.DocumentData;
        console.log(this.data_card_id);
        var a = [];
        for (var i = 0; i < this.data_card_id.length; i++) {
            for (var j = 0; j < aux_data.reminderDocumentManagements.length; j++) {
                aux_data.reminderDocumentManagements[j].documentManagementId = this.data_card_id[i];
                if (aux_data.reminderDocumentManagements[j].id === 0) {
                    a.push({
                        "id": 0,
                        "documentManagementId": this.data_card_id[i],
                        "reminderDate": aux_data.reminderDocumentManagements[j].reminderDate,
                        "reminderComments": aux_data.reminderDocumentManagements[j].reminderComments,
                        "createdBy": this.userData.id,
                        "createdDate": new Date()
                    });
                }
                else {
                    a.push({
                        "id": aux_data.reminderDocumentManagements[j].id,
                        "documentManagementId": this.data_card_id[0],
                        "reminderDate": aux_data.reminderDocumentManagements[j].reminderDate,
                        "reminderComments": aux_data.reminderDocumentManagements[j].reminderComments,
                        "createdBy": this.userData.id,
                        "createdDate": new Date()
                    });
                }
            }
            aux_reminder.push(a);
            a = [];
        }
        console.log(aux_reminder);
        for (var i = 0; i < this.information_Document_Management.length; i++) {
            var information_card = this.information_Document_Management[i].documentManagement;
            console.log("INFORMATION CARD: ", information_card);
            for (var j = 0; j < information_card.length; j++) {
                this.information_Document_Management[i].documentManagement[j].commentDocumentManagements = this.DocumentData.commentDocumentManagements;
                this.information_Document_Management[i].documentManagement[j].reminderDocumentManagements = aux_reminder[i];
                this.information_Document_Management[i].documentManagement[j].authoDate = this.DocumentData.authoDate;
                this.information_Document_Management[i].documentManagement[j].authoAcceptanceDate = this.DocumentData.authoAcceptanceDate;
                this.information_Document_Management[i].documentManagement[j].name = this.name;
                this.information_Document_Management[i].documentManagement[j].hostCountryId = this.DocumentData.hostCountryId;
                this.information_Document_Management[i].documentManagement[j].hostCityId = this.DocumentData.hostCityId;
                this.information_Document_Management[i].documentManagement[j].updateBy = this.userData.id;
                this.information_Document_Management[i].documentManagement[j].createdBy = this.userData.id;
                this.information_Document_Management[i].documentManagement[j].createdDate = this.DocumentData.createdDate;
                this.information_Document_Management[i].documentManagement[j].updatedDate = new Date();
                this.information_Document_Management[i].documentManagement[j].city = this.information_Document_Management[i].documentManagement[j].hostCityId;
                this.information_Document_Management[i].documentManagement[j].country = this.information_Document_Management[i].documentManagement[j].hostCountryId;
                this.information_Document_Management[i].documentManagement[j].comment = "";
                data_to_send.push(this.information_Document_Management[i].documentManagement[j]);
            }
        }
        for (var i = 0; i < data_to_send.length; i++) {
            var doc = data_to_send[i].documentDocumentManagements;
            for (var j = 0; j < doc.length; j++) {
                if (doc[j].id != 0) {
                    data_to_send[i].documentDocumentManagements.splice(j, 1);
                }
            }
        }
        for (var i = 0; i < data_to_send.length; i++) {
            var comment = data_to_send[i].commentDocumentManagements;
            data_to_send[i].commentDocumentManagements = [];
            for (var j = 0; j < comment.length; j++) {
                if (comment[j].reply != null && comment[j].reply != undefined && comment[j].reply.trim() != '') {
                    comment[j].user.profileUsers = [];
                    data_to_send[i].commentDocumentManagements.push(comment[j]);
                }
            }
        }
        console.log(data_to_send);
        this._services.service_general_put("ImmigrationServices/PutDocumentManagement", data_to_send).subscribe((function (data) {
            console.log("guardar db: ", data);
            if (data.success) {
                _this.general_messages({
                    title: "Success",
                    body: "Document Management was updated",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.ionViewWillEnter();
            }
        }), function (err) {
            console.log("Error al guardar data: ", err);
        });
    };
    //**************************************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    DocumentManagementPage.prototype.back = function () {
        /*
        let back: any = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
        */
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
    //**************************************************************************************************//
    //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
    DocumentManagementPage.prototype.general_messages = function (data) {
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
    //****************************************************************//
    DocumentManagementPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    DocumentManagementPage = __decorate([
        core_1.Component({
            selector: 'app-document-management',
            templateUrl: './document-management.page.html',
            styleUrls: ['./document-management.page.scss']
        })
    ], DocumentManagementPage);
    return DocumentManagementPage;
}());
exports.DocumentManagementPage = DocumentManagementPage;
