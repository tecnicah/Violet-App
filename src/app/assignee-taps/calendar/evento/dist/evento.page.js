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
exports.EventoPage = void 0;
var core_1 = require("@angular/core");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var EventoPage = /** @class */ (function () {
    function EventoPage(router, _permissions, loader, modalController, _services) {
        this.router = router;
        this._permissions = _permissions;
        this.loader = loader;
        this.modalController = modalController;
        this._services = _services;
        //public navParams: NavParams,
        this.data = {};
        this.serviceRecord = [];
        this.appointment = [];
        //***************************************************************************//
        //FUNCION PARA SR//
        this.sr = [];
        //***************************************************************************//
        //FUNCION PARA CONSULTA WORK ORDER//
        this.workOrder = [];
        //***************************************************************************//
        this.data_check = [];
    }
    EventoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.getCatalogos();
        var immigration_sr;
        var relocation_sr;
        var data_final_sr = [];
        //this.data = this.navParams.data;
        this.data = { id: 0 };
        console.log(this.data);
        this.data.sr = localStorage.getItem('srAd');
        this.userData = JSON.parse(localStorage.getItem('userData'));
        if (this.data.id != 0) {
            this._services.service_general_get('Appointment/GetAppointmentById?id=' + Number(this.data.id)).subscribe((function (data) {
                console.log("appointment by id; ", data);
                _this.appointment = data.result.value;
            }));
        }
        else {
            this.addAppointment();
        }
        this.getSR();
    };
    //***************************************************************************//
    //FUNCION PARA CATALOGOS//
    EventoPage.prototype.getCatalogos = function () {
    };
    EventoPage.prototype.getSR = function () {
        var _this = this;
        this._services.service_general_get('ServiceRecord/GetServiceRecord/0/0/' + this.userData.id).subscribe(function (r) {
            if (r.success) {
                console.log(r.map.value);
                _this.sr = r.map.value;
            }
        });
    };
    EventoPage.prototype.getWorkOrder = function () {
        var _this = this;
        var immigration;
        var relocation;
        var data_final = [];
        this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + Number(this.appointment[0].serviceRecordId) + '&service_line_id=' + 1).subscribe((function (dataIm) {
            if (dataIm.success) {
                console.log("DATA CATALOGO ADD POINTMENT im: ", dataIm);
                immigration = dataIm.result.value;
                _this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + Number(_this.appointment[0].serviceRecordId) + '&service_line_id=' + 2).subscribe((function (dataRe) {
                    if (dataRe.success) {
                        console.log("DATA CATALOGO ADD POINTMENT re: ", dataRe);
                        relocation = dataRe.result.value;
                        immigration.forEach(function (E) {
                            data_final.push(E);
                        });
                        relocation.forEach(function (E) {
                            data_final.push(E);
                        });
                        console.log('Data final: ', data_final);
                        _this.workOrder = data_final;
                    }
                }));
            }
        }));
    };
    EventoPage.prototype.getServices = function (i) {
        var _this = this;
        console.log("ENTRA A CONSULTAR");
        this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + Number(this.appointment[i].workOrder)).subscribe(function (r) {
            if (r.success) {
                _this.data_check[i] = r.result.value;
                console.log(_this.data_check);
            }
        });
    };
    //***************************************************************************//
    EventoPage.prototype.pushCheckbox = function (i, j, event, data_service) {
        if (event.detail.checked) {
            this.appointment[i].appointmentWorkOrderServices.push({
                "id": 0,
                "appointmentId": this.appointment[i].id,
                "workOrderServiceId": data_service.service
            });
        }
        else {
            this.appointment[i].appointmentWorkOrderServices.splice(j, 1);
        }
    };
    //***************************************************************************//
    //FUNCION PARA AGREGAR APPOINTMENT//
    EventoPage.prototype.addAppointment = function () {
        this.appointment.push({
            "id": 0,
            "serviceRecordId": Number(this.data.sr),
            "date": null,
            "startTime": null,
            "endTime": null,
            "description": null,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updateBy": this.userData.id,
            "updatedDate": null,
            "appointmentWorkOrderServices": [],
            "documentAppointments": []
        });
    };
    //***************************************************************************//
    //FUNCION PARA GUARDAR INFORMACION//
    EventoPage.prototype.save = function () {
        var _this = this;
        console.log("SAVE DATA: ", this.appointment);
        debugger;
        this._services.service_general_post_with_url("Appointment/CreateAppointment", this.appointment).subscribe((function (data) {
            if (data.success) {
                console.log(data);
                _this.general_messages({
                    title: "Success",
                    body: "Appointment was created",
                    success: true
                });
                _this.router.navigateByUrl('/assignee-taps/open-calendar');
                //this.modalController.dismiss();
            }
        }));
    };
    //***************************************************************************//
    //FUNCION PARA REGRESAR//
    EventoPage.prototype.back = function () {
        var back = document.getElementById('back');
        this.router.navigateByUrl('/assignee-taps/open-calendar');
        back.play();
        //this.modalController.dismiss();
    };
    //***************************************************************************//
    //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
    EventoPage.prototype.general_messages = function (data) {
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
    EventoPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    EventoPage = __decorate([
        core_1.Component({
            selector: 'app-evento',
            templateUrl: './evento.page.html',
            styleUrls: ['./evento.page.scss']
        })
    ], EventoPage);
    return EventoPage;
}());
exports.EventoPage = EventoPage;
