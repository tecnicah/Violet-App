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
exports.TemporaryHousingPage = void 0;
var core_1 = require("@angular/core");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var TemporaryHousingPage = /** @class */ (function () {
    function TemporaryHousingPage(router, loader, modalController, _services, permissionsService) {
        this.router = router;
        this.loader = loader;
        this.modalController = modalController;
        this._services = _services;
        this.permissionsService = permissionsService;
        this.addExtension_ = false;
        this.addReminder_ = false;
        this.addComment_ = false;
        this.reminder_data = {};
        this.comment_data = {};
        this.entension_data = {};
        this.disabled = false;
        this.coordinatos = [];
        this.consultant = [];
        //public navParams: NavParams, 
        //***************************************************************************//
        this.userData = {};
        //***************************************************************************//
        //CONSULTA DE INFORMACION DEL SERVICIO//
        this.temporary_housing = {
            documentTemporaryHousingCoordinatons: [],
            stayExtensionTemporaryHousings: [],
            commentTemporaryHosuings: []
        };
        //***************************************************************************//
        //CONSULTA DE INFORMACION DE CATALOGOS//
        this.ca_estatus = [];
        this.number = [];
        this.ca_currency = [];
        this.responsable_catalogue = [];
        this.reservation_catalogue = [];
        //***************************************************************************//
        //CONSULTA DE HOUSING LIST//
        this.services_catalogue = [];
        //***************************************************************************//
        //CONSULTA DE HOUSING LIST//
        this.dataSourceHousing = [];
        //***************************************************************************//
        //FUNCION PARA CONSULTAR LOS REQUEST PAYMENT//
        this.payment = [];
        //***************************************************************************//
        //FUNCION PARA AGREGAR DOCUMENTOS//
        this.temporalDocument = [];
    }
    TemporaryHousingPage.prototype.ionViewWillEnter = function () {
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
    TemporaryHousingPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.getCatalogos();
        //this.data = this.navParams.data;
        this.data = JSON.parse(localStorage.getItem('data_service'));
        this._services.service_general_get("RelocationServices/GetTemporaryHousingCoordinatonById?id=" + this.data.service[0].id)
            .subscribe(function (response) {
            console.log(response);
            if (response.success) {
                console.log(response.result);
                _this.temporary_housing = response.result;
                _this.sortData();
                _this.getDataHousing();
                _this.get_payment();
                _this.get_supplierPartner();
                _this.loader.loadingDismiss();
            }
        }, function (error) {
            console.error('Error => ', error);
        });
        this.loader.loadingDismiss();
    };
    //*********************************************//
    //SORT REMINDER//
    TemporaryHousingPage.prototype.sortData = function () {
        return this.temporary_housing.reminderTemporaryHousingCoordinatons.sort(function (a, b) {
            return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
    };
    TemporaryHousingPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, index;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetReservationType')];
                    case 1:
                        _a.reservation_catalogue = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom("GetDependents?sr=" + localStorage.getItem('srAd'))];
                    case 2:
                        _b.responsable_catalogue = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 3:
                        _c.ca_estatus = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 4:
                        _d.ca_currency = _e.sent();
                        for (index = 0; index < 6; index++) {
                            this.number.push(index);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TemporaryHousingPage.prototype.getStatusName = function (statusId) {
        for (var i = 0; i < this.ca_estatus.length; i++) {
            var element = this.ca_estatus[i];
            if (element.id == statusId) {
                return element.status;
            }
        }
    };
    TemporaryHousingPage.prototype.get_supplierPartner = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierType=1").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.services_catalogue = data.result.value;
            }
        }));
    };
    TemporaryHousingPage.prototype.getDataHousing = function () {
        var _this = this;
        this._services.service_general_get('HousingList/GetAllHousing?key=' + Number(this.data.workOrderId)).subscribe((function (data_housing) {
            if (data_housing.success) {
                console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
                _this.dataSourceHousing = data_housing.message;
            }
        }));
    };
    TemporaryHousingPage.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.temporary_housing.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                _this.payment = data.result.value.payments;
                console.log(data);
            }
        }));
    };
    TemporaryHousingPage.prototype.addDocument = function () {
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
                                data.data.temporaryHousingCoordinationId = _this.temporary_housing.id;
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
    TemporaryHousingPage.prototype.deleteDocument = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteDocumentTHC?id=' + id).subscribe(function (r) {
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
    TemporaryHousingPage.prototype.addComment = function () {
        this.temporary_housing.commentTemporaryHosuings.push({
            "id": 0,
            "temporaryHousingCoordinationId": this.temporary_housing.id,
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
    TemporaryHousingPage.prototype.addReminder = function () {
        this.temporary_housing.reminderTemporaryHousingCoordinatons.push({
            "id": 0,
            "temporaryHousingCoordinationId": this.temporary_housing.id,
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
    TemporaryHousingPage.prototype.deleteReminder = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteReminderTHC?id=' + id).subscribe(function (r) {
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
                                    _this.temporary_housing.reminderTemporaryHousingCoordinatons.splice(i, 1);
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
    TemporaryHousingPage.prototype.addExtension = function () {
        this.temporary_housing.stayExtensionTemporaryHousings.push({
            "id": 0,
            "temporaryHousingCoordinationId": this.temporary_housing.id,
            "initialDate": this.entension_data.initialDate,
            "finalDate": this.entension_data.finalDate,
            "extraDays": this.entension_data.extraDays,
            "totalDays": 0,
            "comment": this.entension_data.comments,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updateBy": this.userData.id,
            "updatedDate": new Date()
        });
        this.entension_data.initialDate = null;
        this.entension_data.finalDate = null;
        this.entension_data.comments = '';
        this.addExtension_ = false;
    };
    TemporaryHousingPage.prototype.getDaysBetweenDatesStaticField = function () {
        var date_one = new Date(this.entension_data.initialDate), date_two = new Date(this.entension_data.finalDate), difference_in_time = date_two.getTime() - date_one.getTime(), difference_in_days = difference_in_time / (1000 * 3600 * 24);
        this.entension_data.totalDays = Math.round(difference_in_days);
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    TemporaryHousingPage.prototype.back = function () {
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
    TemporaryHousingPage.prototype.general_messages = function (data) {
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
    //FUNCION PARA LOS NOMBRES DE CURRENCY//
    TemporaryHousingPage.prototype.getNameCurrency = function (id) {
        for (var i = 0; i < this.ca_currency.length; i++) {
            if (this.ca_currency[i].id == id) {
                return this.ca_currency[i].currency;
            }
        }
    };
    //***************************************************************************//
    //FUNCION PARA LOS NOMBRES DE CURRENCY//
    TemporaryHousingPage.prototype.getNamePayment = function (id) {
        for (var i = 0; i < this.responsable_catalogue.length; i++) {
            if (this.responsable_catalogue[i].id == id) {
                return this.responsable_catalogue[i].name;
            }
        }
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    TemporaryHousingPage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.temporary_housing.updateBy = this.userData.id;
        this.temporary_housing.documentTemporaryHousingCoordinatons = this.temporalDocument;
        this.temporary_housing.updatedDate = new Date();
        var data_comment_aux = this.temporary_housing.commentTemporaryHosuings;
        this.temporary_housing.commentTemporaryHosuings = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.temporary_housing.commentTemporaryHosuings.push(data_comment_aux[i]);
            }
        }
        console.log("Informacion a guardar:  ", this.temporary_housing);
        this._services.service_general_put("RelocationServices/PutTemporaryHousingCoordinaton", this.temporary_housing).subscribe((function (data) {
            if (data.success) {
                _this.general_messages({
                    title: "Success",
                    body: "Temporary Housing Coordination was updated",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.temporalDocument = [];
                _this.ionViewWillEnter();
            }
        }));
    };
    TemporaryHousingPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    TemporaryHousingPage = __decorate([
        core_1.Component({
            selector: 'app-temporary-housing',
            templateUrl: './temporary-housing.page.html',
            styleUrls: ['./temporary-housing.page.scss']
        })
    ], TemporaryHousingPage);
    return TemporaryHousingPage;
}());
exports.TemporaryHousingPage = TemporaryHousingPage;
