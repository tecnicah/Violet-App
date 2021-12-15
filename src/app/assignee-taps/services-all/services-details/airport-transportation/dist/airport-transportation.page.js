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
exports.AirportTransportationPage = void 0;
var core_1 = require("@angular/core");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var AirportTransportationPage = /** @class */ (function () {
    function AirportTransportationPage(router, _permissions, loader, modalController, _services) {
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
        this.dataSourceHousing = [];
        this.dataSourceSchool = [];
        this.family = [];
        this.disabled = false;
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        //***************************************************************************//
        //CONSULTA DATA GLOBAL SERVICIO//
        this.transportation = {
            documentAirportTransportationServices: [],
            commentAirportTransportationServices: [],
            reminderAirportTransportationServices: []
        };
        this.dataSourceP = [];
        this.data = {};
        //***************************************************************************//
        //CONSULTA DE CATALOGOS//
        this.ca_estatus = [];
        this.ca_requestType = [];
        this.nacionality = [];
        this.ca_document = [];
        this.ca_duracion = [];
        this.ca_transportType = [];
        this.ca_supplier = [];
        this.caNumbers = [];
        this.Numbers = [];
        this.caNumbersMin = [];
        //***************************************************************************//
        //CONSULTA DE  REQUEST PAYMENTS//
        this.payment = [];
        //***************************************************************************//
        //CONSULTA DEL SUPPLIER//
        this.supplier_get = [];
        //***************************************************************************//
        this.info = [];
        //***************************************************************************//
        //FUNCION PARA AGREGAR DOCUMENTOS//
        this.temporalDocument = [];
        //FUNCION PARA COORDINADOR//
        this.coordinador = [];
        //FUNCION PARA CONSULTANT//
        this.consultant = [];
    }
    //***************************************************************************//
    AirportTransportationPage.prototype.ionViewWillEnter = function () {
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
    AirportTransportationPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.getCatalogos();
        //this.data = this.navParams.data;
        this.data = JSON.parse(localStorage.getItem('data_service'));
        this._services.service_general_get('RelocationServices/GetAirportTransportationServicesById?applicatId=' + this.data.deliveredToId + '&service_order_id=' + this.data.workOrderId + '&type_service=' + this.data.type).subscribe((function (data) {
            if (data.success) {
                _this.transportation = data.result.value[0];
                _this.sortData();
                for (var i = 0; i < _this.transportation.transportService.length; i++) {
                    _this.transportation.transportService[i].family = [];
                    if (_this.transportation.transportService[i].familyMemberTransportServices.length > 0) {
                        for (var j = 0; j < _this.transportation.transportService[i].familyMemberTransportServices.length; j++) {
                            _this.transportation.transportService[i].family.push(_this.transportation.transportService[i].familyMemberTransportServices[j].familyMember);
                        }
                    }
                }
                console.log('DATA CONSULTA FINAL: ', _this.transportation);
                _this.dataSourceP = _this.transportation.paymentTransportations;
                _this.loader.loadingDismiss();
                _this.getPayment();
                _this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(localStorage.getItem('srAd'))).subscribe((function (data_) {
                    if (data_.success) {
                        _this.family = data_.result;
                        console.log(_this.family);
                    }
                }));
                _this.loader.loadingDismiss();
                _this.get_SupplierType();
            }
        }));
        this.loader.loadingDismiss();
    };
    //**************************************************************************//
    //SORT REMINDER//
    AirportTransportationPage.prototype.sortData = function () {
        return this.transportation.reminderAirportTransportationServices.sort(function (a, b) {
            return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
    };
    AirportTransportationPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, i, i, i;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 1:
                        _a.ca_estatus = _h.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetRequestType')];
                    case 2:
                        _b.ca_requestType = _h.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 3:
                        _c.nacionality = _h.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType')];
                    case 4:
                        _d.ca_document = _h.sent();
                        _e = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDuration')];
                    case 5:
                        _e.ca_duracion = _h.sent();
                        _f = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetTransportType')];
                    case 6:
                        _f.ca_transportType = _h.sent();
                        _g = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetSupplier')];
                    case 7:
                        _g.ca_supplier = _h.sent();
                        for (i = 1; i < 24; i++) {
                            this.Numbers.push(i);
                        }
                        for (i = 1; i < 24; i++) {
                            this.caNumbers.push(i + ' hr');
                        }
                        for (i = 1; i < 60; i++) {
                            this.caNumbersMin.push(i + ' min');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AirportTransportationPage.prototype.getPayment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.transportation.transportService[0].workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.payment = data.result.value.payments;
                console.log(_this.payment);
            }
            console.log(_this.payment);
        }));
    };
    AirportTransportationPage.prototype.get_SupplierType = function () {
        var _this = this;
        this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=' + this.transportation.transportService[0].workOrderServicesId + '&supplierType=' + 10 + '&serviceLine=2').subscribe(function (r) {
            if (r.success) {
                _this.supplier_get = r.result.value;
                console.log(_this.supplier_get);
                _this.getInfo();
            }
        });
    };
    //CONSULTA DE INFORMACION PARA MODAL//
    AirportTransportationPage.prototype.getInfo = function () {
        for (var i = 0; i < this.supplier_get.length; i++) {
            if (this.supplier_get[i].id == this.transportation.transportService[0].supplierPartner) {
                this.info = this.supplier_get[i];
                console.log(this.info);
            }
        }
    };
    AirportTransportationPage.prototype.addDocument = function () {
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
                                data.data.airportTransportationServicesId = _this.transportation.transportService[0].id;
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
    AirportTransportationPage.prototype.deleteDocument = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteDocumentATS?id=' + id).subscribe(function (r) {
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
    AirportTransportationPage.prototype.addComment = function () {
        this.transportation.commentAirportTransportationServices.push({
            "id": 0,
            "airportTransportationServicesId": this.transportation.transportService[0].id,
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
    AirportTransportationPage.prototype.addReminder = function () {
        this.transportation.reminderAirportTransportationServices.push({
            "id": 0,
            "airportTransportationServicesId": this.transportation.transportService[0].id,
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
    AirportTransportationPage.prototype.deleteReminder = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteReminderATS?id=' + id).subscribe(function (r) {
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
                                    _this.transportation.reminderAirportTransportationServices.splice(i, 1);
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
    //NACIONALITY//
    AirportTransportationPage.prototype.getNacionality = function (id) {
        for (var i = 0; i < this.nacionality.length; i++) {
            if (this.nacionality[i].id == id) {
                return this.nacionality[i].name;
            }
        }
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    AirportTransportationPage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.transportation.documentAirportTransportationServices = this.temporalDocument;
        for (var i = 0; i < this.transportation.transportService.length; i++) {
            this.transportation.transportService[i].documentAirportTransportationServices = this.temporalDocument;
            this.transportation.transportService[i].reminderAirportTransportationServices = this.transportation.reminderAirportTransportationServices;
            this.transportation.transportService[i].updateBy = this.userData.id;
            this.transportation.transportService[i].updatedDate = new Date();
            this.transportation.transportService[i].createdBy = this.userData.id;
            this.transportation.transportService[i].createdDate = new Date();
            this.transportation.transportService[i].authoDateExtension = new Date();
            this.transportation.transportService[i].authoAcceptanceDateExtension = new Date();
            if (this.transportation.transportService[i].family != undefined && this.transportation.transportService[i].family.length > 0) {
                this.transportation.transportService[i].familyMemberTransportServices = [];
                for (var j = 0; j < this.transportation.transportService[i].family.length; j++) {
                    this.transportation.transportService[i].familyMemberTransportServices.push({
                        "transportService": this.transportation.transportService[i].id,
                        "familyMember": this.transportation.transportService[i].family[j]
                    });
                }
            }
            var data_comment_aux = this.transportation.commentAirportTransportationServices;
            this.transportation.transportService[i].commentAirportTransportationServices = [];
            for (var k = 0; k < data_comment_aux.length; k++) {
                if (data_comment_aux[k].reply != null && data_comment_aux[k].reply != undefined && data_comment_aux[k].reply.trim() != '') {
                    this.transportation.transportService[i].commentAirportTransportationServices.push(data_comment_aux[k]);
                }
            }
        }
        console.log("SAVE INFORMATION: ", this.transportation);
        this._services.service_general_put("RelocationServices/PutAirportTransportationServices", this.transportation.transportService).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.general_messages({
                    title: "Success",
                    body: "Airport Transportation Services was updated",
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
    AirportTransportationPage.prototype.back = function () {
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
    AirportTransportationPage.prototype.general_messages = function (data) {
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
    AirportTransportationPage.prototype.getCoordinator = function () {
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
    AirportTransportationPage.prototype.getConsultant = function () {
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
    AirportTransportationPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    AirportTransportationPage = __decorate([
        core_1.Component({
            selector: 'app-airport-transportation',
            templateUrl: './airport-transportation.page.html',
            styleUrls: ['./airport-transportation.page.scss']
        })
    ], AirportTransportationPage);
    return AirportTransportationPage;
}());
exports.AirportTransportationPage = AirportTransportationPage;
