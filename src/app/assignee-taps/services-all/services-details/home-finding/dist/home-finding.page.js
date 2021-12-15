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
exports.HomeFindingPage = void 0;
var core_1 = require("@angular/core");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var contract_details_page_1 = require("../dialogs/contract-details/contract-details.page");
var departure_details_page_1 = require("../dialogs/departure-details/departure-details.page");
var renewal_details_page_1 = require("../dialogs/renewal-details/renewal-details.page");
var payments_page_1 = require("../dialogs/payments/payments.page");
var cost_savings_page_1 = require("../dialogs/cost-savings/cost-savings.page");
var landlord_details_page_1 = require("../dialogs/landlord-details/landlord-details.page");
var inspections_repairs_page_1 = require("../dialogs/inspections-repairs/inspections-repairs.page");
var move_in_page_1 = require("../dialogs/move-in/move-in.page");
var move_out_page_1 = require("../dialogs/move-out/move-out.page");
var HomeFindingPage = /** @class */ (function () {
    function HomeFindingPage(router, loader, modalController, _services, permissionsService) {
        this.router = router;
        this.loader = loader;
        this.modalController = modalController;
        this._services = _services;
        this.permissionsService = permissionsService;
        this.disabled = false;
        this.coordinatos = [];
        this.consultant = [];
        //public navParams: NavParams,
        this.addReminder_ = false;
        this.addComment_ = false;
        this.userData = {};
        this.reminder_data = {};
        this.comment_data = {};
        this.family = [];
        //***************************************************************************//
        //CONSULTA DATA GLOBAL SERVICIO//
        this.home_finding = {
            documentHomeFindings: [],
            reminderHomeFindings: [],
            commentHomeFindings: []
        };
        this.dataSourceP = [];
        this.data = {};
        //***************************************************************************//
        //CONSULTA DE CATALOGOS//
        this.ca_accountType = [];
        this.ca_payment_Type = [];
        this.ca_responsible = [];
        this.ca_recurrence = [];
        this.ca_statuspropertySection = [];
        this.ca_propertySection = [];
        this.ca_relation = [];
        this.ca_repair = [];
        this.SupplierCompany = [];
        this.ca_property = [];
        this.ca_estatus = [];
        this.ca_currency = [];
        this.ca_requestType = [];
        this.ca_accounttype = [];
        this.ca_leaseTemplate = [];
        this.ca_creditCard = [];
        this.nacionality = [];
        this.ca_document = [];
        //***************************************************************************//
        //CONSULTA DE  REQUEST PAYMENTS//
        this.payment = [];
        //***************************************************************************//
        //CONSULTA DEL DEPENDIENTE//
        this.ca_dependent = [];
        //***************************************************************************//
        //DATA TABLE HOUSING//
        this.dataSourceHousing = [];
        this.data_inspection = [];
        this.data_repairs = [];
        this.data_home = [];
        //VARIABLES PARA LEASER SUMMARY//
        this.data_contracts = {};
        this.paymentHousings = [];
        this.costSavingHomes = [];
        this.data_renewal = {};
        this.data_departure = {};
        this.data_land = {
            creditCardLandLordDetails: []
        };
        //VARIABLES PARA INSECTIONS & REPAIRS//
        this.data_move_in = {
            propertyReportSections: [],
            keyInventories: [],
            attendees: []
        };
        this.data_move_out = {
            propertyReportSections: [],
            keyInventories: [],
            attendees: []
        };
        //***************************************************************************//
        //FUNCION PARA AGREGAR DOCUMENTOS//
        this.temporalDocument = [];
    }
    //***************************************************************************//
    HomeFindingPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.permissionsService.loadPermissions([this.userData.role.id]);
        if (this.userData.role.id == 4) {
            this.disabled = true;
        }
        var coordi = JSON.parse(localStorage.getItem('relocationCoordinators'));
        var consult = JSON.parse(localStorage.getItem('relocationSupplierPartners'));
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
    HomeFindingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.getCatalogos();
        //this.data = this.navParams.data;
        this.data = JSON.parse(localStorage.getItem('data_service'));
        this._services.service_general_get('RelocationServices/GetHomeFindingById?id=' + this.data.service[0].id).subscribe(function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.home_finding = data.result;
                _this.sortData();
                _this.get_dependent();
                _this.getDataHousing();
                _this.getPayment();
                _this.loader.loadingDismiss();
            }
        });
    };
    //*********************************************//
    //SORT REMINDER//
    HomeFindingPage.prototype.sortData = function () {
        return this.home_finding.reminderHomeFindings.sort(function (a, b) {
            return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
    };
    HomeFindingPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, duration, _k, _l, _m, _o, _p, _q, _r;
            var _this = this;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusPropertySection')];
                    case 1:
                        _a.ca_statuspropertySection = _s.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 2:
                        _b.ca_estatus = _s.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 3:
                        _c.ca_currency = _s.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 4:
                        _d.ca_requestType = _s.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetLeaseTemplate')];
                    case 5:
                        _e.ca_leaseTemplate = _s.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 6:
                        _f.ca_creditCard = _s.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 7:
                        _g.nacionality = _s.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType')];
                    case 8:
                        _h.ca_document = _s.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertySection')];
                    case 9:
                        _j.ca_propertySection = _s.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 10:
                        duration = _s.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 11:
                        _k.ca_relation = _s.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRepairType')];
                    case 12:
                        _l.ca_repair = _s.sent();
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertyTypeHousing')];
                    case 13:
                        _m.ca_property = _s.sent();
                        this.ca_recurrence = duration.filter(function (E) {
                            if (E.recurrence != null) {
                                return true;
                            }
                        });
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 14:
                        _o.ca_accountType = _s.sent();
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 15:
                        _p.ca_creditCard = _s.sent();
                        this.ca_creditCard.forEach(function (E) {
                            E.checked = false;
                        });
                        _q = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentType')];
                    case 16:
                        _q.ca_payment_Type = _s.sent();
                        _r = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetResponsablePayment')];
                    case 17:
                        _r.ca_responsible = _s.sent();
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(function (r) {
                            if (r.success) {
                                for (var i = 0; i < r.result.length; i++) {
                                    var element = r.result[i];
                                    _this.SupplierCompany.push(element);
                                }
                            }
                        });
                        this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(function (r) {
                            if (r.success) {
                                for (var i = 0; i < r.result.length; i++) {
                                    var element = r.result[i];
                                    _this.SupplierCompany.push(element);
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeFindingPage.prototype.getPayment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.home_finding.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.payment = data.result.value.payments;
                console.log(_this.payment);
            }
            console.log(_this.payment);
        }));
    };
    HomeFindingPage.prototype.get_dependent = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(localStorage.getItem('srAd'))).subscribe(function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.ca_dependent = data.result;
            }
        });
    };
    HomeFindingPage.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.workOrderId)).subscribe(function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
                _this.permanent_home(_this.dataSourceHousing);
            }
        });
    };
    HomeFindingPage.prototype.permanent_home = function (data) {
        var _this = this;
        var permanentHome = data.filter(function (E) {
            if (E.status == "Permanent Home") {
                return true;
            }
        });
        console.log(permanentHome);
        this.data_home = permanentHome;
        for (var i = 0; i < permanentHome.length; i++) {
            this._services.service_general_get("HousingList/GetHousing?key=" + permanentHome[i].id).subscribe((function (data) {
                _this.permanentHome = data.result;
                console.log('esta es la casa permanente: ', _this.permanentHome);
                _this.data_contracts = _this.permanentHome.contractDetail;
                _this.paymentHousings = _this.permanentHome.paymentHousings;
                _this.costSavingHomes = _this.permanentHome.costSavingHomes;
                _this.data_renewal = _this.permanentHome.renewalDetailHome;
                _this.data_departure = _this.permanentHome.departureDetailsHome;
                _this.data_land = _this.permanentHome.landlordDetailsHome;
                if (_this.data_land.creditCardLandLordDetails) {
                    _this.ca_creditCard.forEach(function (E) {
                        for (var i_1 = 0; i_1 < _this.data_land.creditCardLandLordDetails.length; i_1++) {
                            if (_this.data_land.creditCardLandLordDetails[i_1].creditCard == E.id) {
                                E.checked = true;
                            }
                        }
                    });
                }
                if (_this.permanentHome.propertyReports) {
                    for (var i_2 = 0; i_2 < _this.permanentHome.propertyReports.length; i_2++) {
                        if (_this.permanentHome.propertyReports[i_2].propertyInspection == 1) {
                            _this.data_move_in = _this.permanentHome.propertyReports[i_2];
                        }
                        if (_this.permanentHome.propertyReports[i_2].propertyInspection == 2) {
                            _this.data_move_out = _this.permanentHome.propertyReports[i_2];
                        }
                    }
                    console.log(_this.data_move_in);
                }
                _this.data_inspection = _this.permanentHome.inspections;
                _this.data_repairs = _this.permanentHome.repairs;
            }));
        }
    };
    HomeFindingPage.prototype.addDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: documents_dialog_page_1.DocumentsDialogPage,
                            componentProps: { id: 1 },
                            backdropDismiss: true
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                data.data.homeFindingId = _this.home_finding.id;
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
    //***************************************************************************//
    //FUNCION PARA ELIMINAR DOCUMENTOS//
    HomeFindingPage.prototype.deleteDocument = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteDocumentHF?id=' + id).subscribe(function (r) {
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
    //***************************************************************************//
    //FUNCION PARA AGREGAR REPLICA//
    HomeFindingPage.prototype.addComment = function () {
        this.home_finding.commentHomeFindings.push({
            "id": 0,
            "homeFindingId": this.home_finding.id,
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
    //***************************************************************************//
    //FUNCION PARA AGREGAR REPLICA//
    HomeFindingPage.prototype.addReminder = function () {
        this.home_finding.reminderHomeFindings.push({
            "id": 0,
            "homeFindingId": this.home_finding.id,
            "reminderDate": this.reminder_data.reminderDate,
            "reminderComments": this.reminder_data.reminderComments,
            "createdBy": this.userData.id,
            "createdDate": new Date()
        });
        this.reminder_data.reminderDate = null;
        this.reminder_data.reminderComments = '';
        this.addReminder_ = false;
    };
    //***************************************************************************//
    //FUNCION PARA ELIMINAR REMINDER//
    HomeFindingPage.prototype.deleteReminder = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteReminderHF?id=' + id).subscribe(function (r) {
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
                                    _this.home_finding.reminderHomeFindings.splice(i, 1);
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
    //***************************************************************************//
    //FUNCIONES PARA TRADUCCION DE ID'S//
    HomeFindingPage.prototype.getProperty_ = function (id) {
        for (var i = 0; i < this.ca_property.length; i++) {
            if (this.ca_property[i].id == id) {
                return this.ca_property[i].propertyType;
            }
        }
    };
    HomeFindingPage.prototype.getCurrency = function (id) {
        for (var i = 0; i < this.ca_currency.length; i++) {
            if (this.ca_currency[i].id == id) {
                return this.ca_currency[i].currency;
            }
        }
    };
    //Payment//
    HomeFindingPage.prototype.get_Payment = function (id) {
        for (var i = 0; i < this.ca_payment_Type.length; i++) {
            if (this.ca_payment_Type[i].id == id) {
                return this.ca_payment_Type[i].paymentType;
            }
        }
    };
    //Responsable//
    HomeFindingPage.prototype.getResponsable = function (id) {
        for (var i = 0; i < this.ca_responsible.length; i++) {
            if (this.ca_responsible[i].id == id) {
                return this.ca_responsible[i].responsable;
            }
        }
    };
    //***************************************************************************//
    //NACIONALITY//
    HomeFindingPage.prototype.getNacionality = function (id) {
        for (var i = 0; i < this.nacionality.length; i++) {
            if (this.nacionality[i].id == id) {
                return this.nacionality[i].name;
            }
        }
    };
    HomeFindingPage.prototype.getStatusName = function (statusId) {
        for (var i = 0; i < this.ca_estatus.length; i++) {
            var element = this.ca_estatus[i];
            if (element.id == statusId) {
                return element.status;
            }
        }
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    HomeFindingPage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.home_finding.updateBy = this.userData.id;
        this.home_finding.updatedDate = new Date();
        this.home_finding.createdBy = this.userData.id;
        this.home_finding.createdDate = new Date();
        this.home_finding.documentHomeFindings = this.temporalDocument;
        var data_comment_aux = this.home_finding.commentHomeFindings;
        this.home_finding.commentHomeFindings = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.home_finding.commentHomeFindings.push(data_comment_aux[i]);
            }
        }
        console.log("GUARDAR: ", this.home_finding);
        this.temporalDocument = [];
        this._services.service_general_put("RelocationServices/PutHomeFinding", this.home_finding).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.general_messages({
                    title: "Success",
                    body: "Home finding was updated",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.temporalDocument = [];
                _this._services.loader = false;
                _this.ionViewWillEnter();
            }
        }));
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    HomeFindingPage.prototype.back = function () {
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
    //***************************************************************************//
    //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
    HomeFindingPage.prototype.general_messages = function (data) {
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
    //***************************************************************************//
    //FUNCIONES PARA MODALES DE LEASE SUMMARY//
    HomeFindingPage.prototype.contractDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('contractDetails', JSON.stringify(this.data_contracts));
                        return [4 /*yield*/, this.modalController.create({
                                component: contract_details_page_1.ContractDetailsPage,
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('contractDetails');
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
    //FUNCIONES PARA DEPARTURE DETAILS//
    HomeFindingPage.prototype.departureDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('departure', JSON.stringify(this.data_departure));
                        return [4 /*yield*/, this.modalController.create({
                                component: departure_details_page_1.DepartureDetailsPage,
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('departure');
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
    //FUNCIONES PARA MRENEWAL//
    HomeFindingPage.prototype.renewalDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem("renewal", JSON.stringify(this.data_renewal));
                        return [4 /*yield*/, this.modalController.create({
                                component: renewal_details_page_1.RenewalDetailsPage,
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('renewal');
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
    //FUNCIONES PARA PAYMENTS//
    HomeFindingPage.prototype.payments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
                        localStorage.setItem('payment', JSON.stringify(this.paymentHousings));
                        return [4 /*yield*/, this.modalController.create({
                                component: payments_page_1.PaymentsPage,
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('payment');
                            localStorage.removeItem('id');
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
    //FUNCIONES PARA COST SAVINGS//
    HomeFindingPage.prototype.costSavings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
                        localStorage.setItem('cost', JSON.stringify(this.costSavingHomes));
                        return [4 /*yield*/, this.modalController.create({
                                component: cost_savings_page_1.CostSavingsPage,
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('cost');
                            localStorage.removeItem('id');
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
    //FUNCIONES PARA LAND LORD//
    HomeFindingPage.prototype.landLordDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('data_land', JSON.stringify(this.data_land));
                        return [4 /*yield*/, this.modalController.create({
                                component: landlord_details_page_1.LandlordDetailsPage,
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('data_land');
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
    //***************************************************************************//
    //FUNCIONES PARA MODALES INSPECTION AND REPAIRS//
    HomeFindingPage.prototype.inspectionRepairs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
                        localStorage.setItem('inspections', JSON.stringify(this.data_inspection));
                        localStorage.setItem('repairs', JSON.stringify(this.data_repairs));
                        return [4 /*yield*/, this.modalController.create({
                                component: inspections_repairs_page_1.InspectionsRepairsPage,
                                componentProps: {
                                    workOrderServicesId: this.home_finding.workOrderServicesId,
                                    supplierType: 3
                                },
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('inspections');
                            localStorage.removeItem('repairs');
                            localStorage.removeItem('id');
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
    //FUNCIONES PARA MOVE IN//
    HomeFindingPage.prototype.moveIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
                        localStorage.setItem('idpropertyReport', JSON.stringify(this.data_move_in.id));
                        localStorage.setItem('moveIn', JSON.stringify(this.data_move_in));
                        return [4 /*yield*/, this.modalController.create({
                                component: move_in_page_1.MoveInPage,
                                componentProps: {
                                    "id": this.permanentHome.id,
                                    "createdDate": this.permanentHome.createdDate,
                                    "zip": this.permanentHome.zip,
                                    "address": this.permanentHome.address,
                                    "createdBy": this.permanentHome.createdBy
                                },
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('moveIn');
                            localStorage.removeItem('idpropertyReport');
                            localStorage.removeItem('id');
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
    //FUNCIONES PARA MOVE OUT//
    HomeFindingPage.prototype.moveOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage.setItem('id', JSON.stringify(this.permanentHome.id));
                        localStorage.setItem('idpropertyReport', JSON.stringify(this.data_move_out.id));
                        localStorage.setItem('moveOut', JSON.stringify(this.data_move_out));
                        return [4 /*yield*/, this.modalController.create({
                                component: move_out_page_1.MoveOutPage,
                                componentProps: {
                                    "id": this.permanentHome.id,
                                    "createdDate": this.permanentHome.createdDate,
                                    "zip": this.permanentHome.zip,
                                    "address": this.permanentHome.address,
                                    "createdBy": this.permanentHome.createdBy
                                },
                                backdropDismiss: true
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            localStorage.removeItem('moveOut');
                            localStorage.removeItem('idpropertyReport');
                            localStorage.removeItem('id');
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
    HomeFindingPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    HomeFindingPage = __decorate([
        core_1.Component({
            selector: 'app-home-finding',
            templateUrl: './home-finding.page.html',
            styleUrls: ['./home-finding.page.scss']
        })
    ], HomeFindingPage);
    return HomeFindingPage;
}());
exports.HomeFindingPage = HomeFindingPage;
