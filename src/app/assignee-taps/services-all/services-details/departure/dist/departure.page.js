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
exports.DeparturePage = void 0;
var core_1 = require("@angular/core");
var payments_page_1 = require("../dialogs/payments/payments.page");
var renewal_details_page_1 = require("../dialogs/renewal-details/renewal-details.page");
var departure_details_page_1 = require("../dialogs/departure-details/departure-details.page");
var contract_details_page_1 = require("../dialogs/contract-details/contract-details.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var inspections_repairs_page_1 = require("../dialogs/inspections-repairs/inspections-repairs.page");
var cost_savings_page_1 = require("../dialogs/cost-savings/cost-savings.page");
var landlord_details_page_1 = require("../dialogs/landlord-details/landlord-details.page");
var move_in_page_1 = require("../dialogs/move-in/move-in.page");
var move_out_page_1 = require("../dialogs/move-out/move-out.page");
var DeparturePage = /** @class */ (function () {
    function DeparturePage(router, _permissions, loader, modalController, _services) {
        this.router = router;
        this._permissions = _permissions;
        this.loader = loader;
        this.modalController = modalController;
        this._services = _services;
        //public navParams: NavParams,
        this.addReminder_ = false;
        this.addComment_ = false;
        this.userData = {};
        this.reminder_data = {};
        this.comment_data = {};
        this.family = [];
        this.disabled = false;
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        //***************************************************************************//
        //CONSULTA DATA GLOBAL SERVICIO//
        this.departure = {
            documentDepartures: [],
            reminderDepartures: [],
            commentDepartures: []
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
        this.ca_asistance = [];
        this.ca_supplier = [];
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
        //FUNCION PARA COORDINADOR//
        this.coordinador = [];
        //FUNCION PARA CONSULTANT//
        this.consultant = [];
    }
    //***************************************************************************//
    DeparturePage.prototype.ionViewWillEnter = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        var user_rol = [this.__userlog__.role.id];
        this.type_user = user_rol;
        this._permissions.loadPermissions(user_rol);
        this.coordinatorData = JSON.parse(localStorage.getItem('relocationCoordinators'));
        this.consultantData = JSON.parse(localStorage.getItem('relocationSupplierPartners'));
        if (this.__userlog__.role.id == 4) {
            this.disabled = true;
            this.getConsultant();
            this.getCoordinator();
        }
        this.ngOnInit();
    };
    DeparturePage.prototype.ngOnInit = function () {
        this.loader.loadingPresent();
        this.getCatalogos();
        //this.data = this.navParams.data;
        this.data = JSON.parse(localStorage.getItem('data_service'));
    };
    DeparturePage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, duration, _o, _p, _q, _r, _s;
            var _this = this;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatusPropertySection')];
                    case 1:
                        _a.ca_statuspropertySection = _t.sent(); //
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 2:
                        _b.ca_estatus = _t.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 3:
                        _c.ca_requestType = _t.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 4:
                        _d.nacionality = _t.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType')];
                    case 5:
                        _e.ca_document = _t.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertySection')];
                    case 6:
                        _f.ca_propertySection = _t.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRelationship')];
                    case 7:
                        _g.ca_relation = _t.sent();
                        _h = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 8:
                        _h.ca_currency = _t.sent();
                        _j = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPropertyTypeHousing')];
                    case 9:
                        _j.ca_property = _t.sent();
                        _k = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRepairType')];
                    case 10:
                        _k.ca_repair = _t.sent();
                        _l = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 11:
                        _l.ca_supplier = _t.sent();
                        _m = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetAssistanceWith')];
                    case 12:
                        _m.ca_asistance = _t.sent();
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 13:
                        duration = _t.sent();
                        this.ca_recurrence = duration.filter(function (E) {
                            if (E.recurrence != null) {
                                return true;
                            }
                        });
                        // credit card se agrego
                        _o = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 14:
                        // credit card se agrego
                        _o.ca_creditCard = _t.sent();
                        // credit card se agrego
                        _p = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetBankAccountType')];
                    case 15:
                        // credit card se agrego
                        _p.ca_accountType = _t.sent();
                        _q = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCreditCard')];
                    case 16:
                        _q.ca_creditCard = _t.sent();
                        this.ca_creditCard.forEach(function (E) {
                            E.checked = false;
                        });
                        _r = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPaymentType')];
                    case 17:
                        _r.ca_payment_Type = _t.sent();
                        _s = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetResponsablePayment')];
                    case 18:
                        _s.ca_responsible = _t.sent();
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
                        this._services.service_general_get('RelocationServices/GetDepartureById?id=' + this.data.service[0].id).subscribe(function (data) {
                            if (data.success) {
                                console.log('DATA CONSULTA: ', data);
                                _this.departure = data.result;
                                _this.sortData();
                                var data_assistance = [];
                                for (var i = 0; i < _this.ca_asistance.length; i++) {
                                    var element = _this.ca_asistance[i];
                                    _this.ca_asistance[i].id_other = 1;
                                    if (_this.ca_asistance[i].id == 4) {
                                        _this.ca_asistance.splice(i, 1);
                                    }
                                }
                                for (var i = 0; i < _this.departure.departureAssistanceWiths.length; i++) {
                                    var element = _this.departure.departureAssistanceWiths[i];
                                    for (var j = 0; j < _this.ca_asistance.length; j++) {
                                        if (element.completionDate != '' && element.completionDate != undefined && element.completionDate != null && element.assistanceWith == _this.ca_asistance[j].id) {
                                            _this.ca_asistance[j].check = true;
                                            _this.ca_asistance[j].completionDate = element.completionDate;
                                            _this.ca_asistance[j].other = element.otherSpecify;
                                            _this.ca_asistance[j].departaureId = _this.departure.id;
                                            _this.ca_asistance[j].idDB = _this.departure.departureAssistanceWiths[i].id;
                                            _this.ca_asistance[j].assistanceWith = _this.ca_asistance[j].id;
                                        }
                                    }
                                    if (_this.departure.departureAssistanceWiths[i].assistanceWith == 4) {
                                        data_assistance.push({
                                            "assistance": "Other",
                                            "completionDate": element.completionDate,
                                            "createdBy": null,
                                            "createdDate": null,
                                            "id": 4,
                                            "check": true,
                                            "other": element.otherSpecify,
                                            "updateBy": null,
                                            "updatedDate": null
                                        });
                                    }
                                }
                                for (var i = 0; i < data_assistance.length; i++) {
                                    _this.ca_asistance.push(data_assistance[i]);
                                }
                                _this.get_dependent();
                                _this.getDataHousing();
                                _this.getPayment();
                                _this.loader.loadingDismiss();
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //**************************************************************************//
    //SORT REMINDER//
    DeparturePage.prototype.sortData = function () {
        return this.departure.reminderDepartures.sort(function (a, b) {
            return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
    };
    DeparturePage.prototype.getPayment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.departure.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.payment = data.result.value.payments;
                console.log(_this.payment);
            }
            //console.log(this.payment);
        }));
    };
    DeparturePage.prototype.get_dependent = function () {
        var _this = this;
        this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(localStorage.getItem('srAd'))).subscribe(function (data) {
            if (data.success) {
                console.log('DATA CONSULTA: ', data);
                _this.ca_dependent = data.result;
            }
        });
    };
    DeparturePage.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.workOrderId)).subscribe(function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
                _this.permanent_home(_this.dataSourceHousing);
            }
        });
    };
    DeparturePage.prototype.permanent_home = function (data) {
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
                    //console.log(this.data_move_in);
                }
                _this.data_inspection = _this.permanentHome.inspections;
                _this.data_repairs = _this.permanentHome.repairs;
                _this.loader.loadingDismiss();
            }));
        }
    };
    DeparturePage.prototype.addDocument = function () {
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
                                data.data.departaureId = _this.departure.id;
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
    DeparturePage.prototype.deleteDocument = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteDocumentD?id=' + id).subscribe(function (r) {
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
    DeparturePage.prototype.addComment = function () {
        this.departure.commentDepartures.push({
            "id": 0,
            "departaureId": this.departure.id,
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
    DeparturePage.prototype.addReminder = function () {
        this.departure.reminderDepartures.push({
            "id": 0,
            "departaureId": this.departure.id,
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
    DeparturePage.prototype.deleteReminder = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteReminderD?id=' + id).subscribe(function (r) {
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
                                    _this.departure.reminderDepartures.splice(i, 1);
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
    DeparturePage.prototype.getProperty_ = function (id) {
        for (var i = 0; i < this.ca_property.length; i++) {
            if (this.ca_property[i].id == id) {
                return this.ca_property[i].propertyType;
            }
        }
    };
    DeparturePage.prototype.getCurrency = function (id) {
        for (var i = 0; i < this.ca_currency.length; i++) {
            if (this.ca_currency[i].id == id) {
                return this.ca_currency[i].currency;
            }
        }
    };
    //Payment//
    DeparturePage.prototype.get_Payment = function (id) {
        for (var i = 0; i < this.ca_payment_Type.length; i++) {
            if (this.ca_payment_Type[i].id == id) {
                return this.ca_payment_Type[i].paymentType;
            }
        }
    };
    //Responsable//
    DeparturePage.prototype.getResponsable = function (id) {
        for (var i = 0; i < this.ca_responsible.length; i++) {
            if (this.ca_responsible[i].id == id) {
                return this.ca_responsible[i].responsable;
            }
        }
    };
    //***************************************************************************//
    //NACIONALITY//
    DeparturePage.prototype.getNacionality = function (id) {
        for (var i = 0; i < this.nacionality.length; i++) {
            if (this.nacionality[i].id == id) {
                return this.nacionality[i].name;
            }
        }
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    DeparturePage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.departure.updateBy = this.userData.id;
        this.departure.updatedDate = new Date();
        this.departure.createdBy = this.userData.id;
        this.departure.createdDate = new Date();
        this.departure.documentDepartures = this.temporalDocument;
        this.temporalDocument = [];
        for (var i = 0; i < this.ca_asistance.length; i++) {
            var element = this.ca_asistance[i];
            this.ca_asistance[i].assistanceWith = this.ca_asistance[i].id;
            if (this.ca_asistance[i].idDB != undefined) {
                this.ca_asistance[i].id = this.ca_asistance[i].idDB;
            }
            else {
                this.ca_asistance[i].id = 0;
            }
            if (this.ca_asistance[i].check != true) {
                this.ca_asistance.splice(i, 1);
            }
            else {
                this.ca_asistance[i].departaureId = this.departure.id;
            }
        }
        this.departure.departureAssistanceWiths = this.ca_asistance;
        var data_comment_aux = this.departure.commentDepartures;
        this.departure.commentDepartures = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.departure.commentDepartures.push(data_comment_aux[i]);
            }
        }
        console.log("SAVED DATA: ", this.departure);
        this._services.service_general_put("RelocationServices/PutDeparture", this.departure).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.general_messages({
                    title: "Success",
                    body: "Home finding was updated",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.temporalDocument = [];
                _this.ionViewWillEnter();
            }
        }));
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    DeparturePage.prototype.back = function () {
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
    DeparturePage.prototype.general_messages = function (data) {
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
    DeparturePage.prototype.contractDetails = function () {
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
    DeparturePage.prototype.departureDetails = function () {
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
    DeparturePage.prototype.renewalDetails = function () {
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
    DeparturePage.prototype.payments = function () {
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
    DeparturePage.prototype.costSavings = function () {
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
    DeparturePage.prototype.landLordDetails = function () {
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
    DeparturePage.prototype.inspectionRepairs = function () {
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
                                    workOrderServicesId: this.departure.workOrderServicesId,
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
    DeparturePage.prototype.moveIn = function () {
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
    DeparturePage.prototype.moveOut = function () {
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
    DeparturePage.prototype.getCoordinator = function () {
        var _this = this;
        if (this.coordinatorData.length > 0) {
            for (var i = 0; i < this.coordinatorData.length; i++) {
                this._services.service_general_get('Catalog/GetUser/' + this.coordinatorData[i].coordinatorId)
                    .subscribe(function (response) {
                    _this.coordinador.push(response.result.value);
                });
            }
        }
    };
    ;
    DeparturePage.prototype.getConsultant = function () {
        var _this = this;
        if (this.consultantData.length > 0) {
            for (var i = 0; i < this.consultantData.length; i++) {
                this._services.service_general_get('Catalog/GetUser/' + this.consultantData[i].supplierId)
                    .subscribe(function (response) {
                    _this.consultant.push(response.result.value);
                });
            }
        }
    };
    //****************************************************************//
    DeparturePage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    DeparturePage = __decorate([
        core_1.Component({
            selector: 'app-departure',
            templateUrl: './departure.page.html',
            styleUrls: ['./departure.page.scss']
        })
    ], DeparturePage);
    return DeparturePage;
}());
exports.DeparturePage = DeparturePage;
