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
exports.RentalFurnitureCoordinationPage = void 0;
var core_1 = require("@angular/core");
var confirmation_page_1 = require("src/app/dialog/confirmation/confirmation.page");
var documents_dialog_page_1 = require("src/app/dialog/documents-dialog/documents-dialog.page");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var RentalFurnitureCoordinationPage = /** @class */ (function () {
    function RentalFurnitureCoordinationPage(router, _permissions, loader, modalController, _services) {
        this.router = router;
        this._permissions = _permissions;
        this.loader = loader;
        this.modalController = modalController;
        this._services = _services;
        //public navParams: NavParams,
        this.userData = {};
        this.data = {};
        this.rental = {
            documentRentalFurnitureCoordinations: [],
            stayExtensionRentalFurnitureCoordinations: [],
            commentRentalFurnitureCoordinations: []
        };
        this.table_payments = [];
        this.deliveryTo = [];
        this.caCurrency = [];
        this.CleaningCompanySupplier = [];
        this.main = [];
        this.infomain = [];
        this.addExtension_ = false;
        this.entension_data = {};
        this.temporalDocument = [];
        this.disabled = false;
        this.__userlog__ = JSON.parse(localStorage.getItem('userData'));
        //***************************************************************************//
        //CONSULTA DE CATALOGOS//
        this.ca_estatus = [];
        this.ca_grade = [];
        this.nacionality = [];
        //FUNCION PARA AGREGAR REPLICA//
        this.comment_data = {};
        this.addComment_ = false;
        //***************************************************************************//
        //FUNCION PARA AGREGAR REPLICA//
        this.reminder_data = {};
        this.addReminder_ = false;
        //FUNCION PARA COORDINADOR//
        this.coordinador = [];
        //FUNCION PARA CONSULTANT//
        this.consultant = [];
    }
    //***************************************************************************//
    RentalFurnitureCoordinationPage.prototype.ionViewWillEnter = function () {
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
    RentalFurnitureCoordinationPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.getCatalogos();
        this.userData = JSON.parse(localStorage.getItem('userData'));
        //this.data = this.navParams.data;
        this.data = JSON.parse(localStorage.getItem('data_service'));
        console.log(this.data);
        this._services.service_general_get('RelocationServices/GetRentalFurnitureCoordinationById?id=' + this.data.service[0].id).subscribe((function (data) {
            if (data.success) {
                _this.rental = data.result;
                _this.sortData();
                _this.loader.loadingDismiss();
                console.log(_this.rental);
                _this.get_payment();
                _this.get_supplierPartner();
                _this.getMain();
                _this.loader.loadingDismiss();
            }
        }));
        this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.serviceRecordId)
            .subscribe(function (response) {
            console.log(response);
            if (response.success) {
                _this.deliveryTo = response.applicant.value;
            }
        }, function (error) {
            console.error('Error (GetApplicant) => ', error);
        });
        this.loader.loadingDismiss();
    };
    //*********************************************//
    //SORT REMINDER//
    RentalFurnitureCoordinationPage.prototype.sortData = function () {
        return this.rental.reminderRentalFurnitureCoordinations.sort(function (a, b) {
            return new Date(a.reminderDate) - new Date(b.reminderDate);
        });
    };
    //**CONSULTA SUPPLIER PARTNER**//
    RentalFurnitureCoordinationPage.prototype.get_supplierPartner = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.rental.workOrderServicesId + "&supplierType=1&serviceLine=2").subscribe((function (data) {
            console.log(data);
            if (data.success) {
                _this.CleaningCompanySupplier = data.result.value;
            }
        }));
    };
    RentalFurnitureCoordinationPage.prototype.getMain = function () {
        var _this = this;
        this._services.service_general_get("SupplierPartnerProfile/GetAdministrativeContactsServiceBySupplierPartner?workOrderService=" + this.rental.workOrderServicesId + "&supplierPartner=" + this.rental.supplierPartner).subscribe((function (data) {
            if (data.success) {
                _this.main = data.result.value;
                _this.getInfoMain();
            }
        }));
    };
    RentalFurnitureCoordinationPage.prototype.getInfoMain = function () {
        for (var i = 0; i < this.main.length; i++) {
            if (this.main[i].id == this.rental.mainContact) {
                this.infomain = this.main[i];
                console.log(this.infomain);
            }
        }
    };
    RentalFurnitureCoordinationPage.prototype.get_payment = function () {
        var _this = this;
        this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.rental.workOrderServicesId).subscribe((function (data) {
            if (data.success) {
                console.log(data.result);
                _this.table_payments = data.result.value.payments;
                console.log(_this.table_payments);
            }
            console.log(_this.table_payments);
        }));
    };
    RentalFurnitureCoordinationPage.prototype.addExtension = function () {
        this.rental.stayExtensionRentalFurnitureCoordinations.push({
            "id": 0,
            "rentalFurnitureCoordinationId": this.rental.id,
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
    RentalFurnitureCoordinationPage.prototype.getDaysBetweenDatesStaticField = function () {
        var date_one = new Date(this.entension_data.initialDate), date_two = new Date(this.entension_data.finalDate), difference_in_time = date_two.getTime() - date_one.getTime(), difference_in_days = difference_in_time / (1000 * 3600 * 24);
        this.entension_data.totalDays = Math.round(difference_in_days);
    };
    RentalFurnitureCoordinationPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetGradeSchooling')];
                    case 1:
                        _a.ca_grade = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.nacionality = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetStatus')];
                    case 3:
                        _c.ca_estatus = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCurrency')];
                    case 4:
                        _d.caCurrency = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RentalFurnitureCoordinationPage.prototype.addDocument = function () {
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
                                data.data.rentalFurnitureCoordinationId = _this.rental.id;
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
    RentalFurnitureCoordinationPage.prototype.deleteDocument = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteDocumentRFC?id=' + id).subscribe(function (r) {
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
    RentalFurnitureCoordinationPage.prototype.addComment = function () {
        this.rental.commentRentalFurnitureCoordinations.push({
            "id": 0,
            "rentalFurnitureCoordinationId": this.rental.id,
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
    RentalFurnitureCoordinationPage.prototype.addReminder = function () {
        this.rental.reminderRentalFurnitureCoordinations.push({
            "id": 0,
            "rentalFurnitureCoordinationId": this.rental.id,
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
    RentalFurnitureCoordinationPage.prototype.deleteReminder = function (id, i) {
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
                                    _this._services.service_general_delete('RelocationServices/DeleteReminderRFC?id=' + id).subscribe(function (r) {
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
                                    _this.rental.reminderRentalFurnitureCoordinations.splice(i, 1);
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
    //FUNCION PARA GUARDAR INFORMACION//
    RentalFurnitureCoordinationPage.prototype.back = function () {
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
    RentalFurnitureCoordinationPage.prototype.general_messages = function (data) {
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
    //FUNCION PARA GUARDAR INFORMACION//
    RentalFurnitureCoordinationPage.prototype.save = function () {
        var _this = this;
        this.loader.loadingPresent();
        this.rental.updateBy = this.userData.id;
        this.rental.documentRentalFurnitureCoordinations = this.temporalDocument;
        this.rental.updatedDate = new Date();
        var data_comment_aux = this.rental.commentRentalFurnitureCoordinations;
        this.rental.commentRentalFurnitureCoordinations = [];
        for (var i = 0; i < data_comment_aux.length; i++) {
            if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
                this.rental.commentRentalFurnitureCoordinations.push(data_comment_aux[i]);
            }
        }
        console.log("Informacion a guardar:  ", this.rental);
        this._services.service_general_put("RelocationServices/PutRentalFurnitureCoordinaton", this.rental).subscribe((function (data) {
            if (data.success) {
                _this.general_messages({
                    title: "Success",
                    body: "Rental Forniture Coordination was updated",
                    success: true
                });
                _this.loader.loadingDismiss();
                _this.temporalDocument = [];
                _this.ionViewWillEnter();
            }
        }));
    };
    RentalFurnitureCoordinationPage.prototype.getCoordinator = function () {
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
    RentalFurnitureCoordinationPage.prototype.getConsultant = function () {
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
    RentalFurnitureCoordinationPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    RentalFurnitureCoordinationPage = __decorate([
        core_1.Component({
            selector: 'app-rental-furniture-coordination',
            templateUrl: './rental-furniture-coordination.page.html',
            styleUrls: ['./rental-furniture-coordination.page.scss']
        })
    ], RentalFurnitureCoordinationPage);
    return RentalFurnitureCoordinationPage;
}());
exports.RentalFurnitureCoordinationPage = RentalFurnitureCoordinationPage;
