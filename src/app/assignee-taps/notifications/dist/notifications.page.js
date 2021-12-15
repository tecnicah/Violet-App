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
exports.NotificationsPage = void 0;
var core_1 = require("@angular/core");
var general_mensage_page_1 = require("src/app/dialog/general-mensage/general-mensage.page");
var filter_notification_page_1 = require("src/app/dialog/filter-notification/filter-notification.page");
var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(router, _services, loadingService, modalController) {
        this.router = router;
        this._services = _services;
        this.loadingService = loadingService;
        this.modalController = modalController;
        this.userFilter = {
            type: ''
        };
        this.date_ = new Date();
        this.data_model = {};
        this.filteruno = false;
        this.show_name_assignee = false;
        //*************************************************************//
        this.ca_notificationType = [];
        this.ca_SR = [];
        //*************************************************************//
        //CONSULTA DE INFORMACION DE LAS NOTIFICACIONES//
        this.ca_notification = [];
    }
    NotificationsPage.prototype.ngOnInit = function () {
    };
    NotificationsPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    NotificationsPage.prototype.ionViewWillEnter = function () {
        if (window.screen.width <= 500) {
            this.show_name_assignee = true;
        }
        else {
            this.show_name_assignee = false;
        }
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.data_model.archive = false;
        this.get_catalogos();
        this.get_Notification();
    };
    NotificationsPage.prototype.get_catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetNotificationType')];
                    case 1:
                        _a.ca_notificationType = _b.sent();
                        this._services.service_general_get('Catalogue/GetServiceRecord/' + this.user.id).subscribe((function (data) {
                            if (data.success) {
                                console.log('DATA CONSULTA SR: ', data);
                                _this.ca_SR = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationsPage.prototype.get_Notification = function () {
        var _this = this;
        this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id).subscribe((function (data) {
            if (data.success) {
                console.log('DATA CONSULTA NOTIFICACIONES: ', data);
                //this.ca_notification = data.result.value;
                _this.ca_notification = data.result.value;
                console.log(_this.ca_notification);
            }
        }));
    };
    //*************************************************************//
    //FILTRO DE BUSQUEDA MANUAL//
    NotificationsPage.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.ca_notification.filter = filterValue.trim().toLowerCase();
    };
    //*************************************************************//
    //FILTRO FECHA//
    /*
    public filteringServiceRecordTable(): void {
      let service_record_params_selected = '';
      let params: string = '';
      if (this.range.value.dateRange1 != null) this.data_model.dateRange1 = this.filterDate(this.range.value.dateRange1);
      if (this.range.value.dateRange2 != null) this.data_model.dateRange2 = this.filterDate(this.range.value.dateRange2);
      for (let item in this.data_model) {
        if (this.data_model[item] != '') {
          service_record_params_selected += `${ item }=${ this.data_model[item] }&`;
          params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
        }
      }
      if (this.range.value.dateRange1 != null && this.range.value.dateRange2 != null) {
        this.getServiceRecordTableData(params);
      }
    }*/
    //*************************************************************//
    NotificationsPage.prototype.filterDate = function (date_in) {
        return date_in.getFullYear() + "/" + (date_in.getMonth() + 1) + "/" + date_in.getDate();
    };
    //*************************************************************//
    /* searchData() {
       let service_record_params_selected: string = '';;
       let params = '';
       for (let item in this.data_model) {
         if (this.data_model[item] != '') {
           service_record_params_selected += `${ item }=${ this.data_model[item] }&`;
           params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
         }
       }
       console.log("PARAMETROS DE BUSQUEDA: ", params)
       this.getServiceRecordTableData(params);
     }*/
    //*************************************************************//
    NotificationsPage.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.loadingService.loadingPresent();
        var params_in = params == '' ? '' : "?" + params;
        this._services.service_general_get('Notification/GetNotificationCenter/' + this.user.id + params_in).subscribe(function (data) {
            if (data.success) {
                console.log("ESTAS SON LAS NOTIFICACIONES FILTRADAS:  ", data.result.value);
                _this.ca_notification = data.result.value;
                _this.loadingService.loadingDismiss();
            }
        });
    };
    //*************************************************************//
    //LIMPIEZA DE FILTROS//
    NotificationsPage.prototype.cleanFilter = function () {
        var _this = this;
        this.data_model = {};
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
        this.ionViewWillEnter();
    };
    //*************************************************************//
    NotificationsPage.prototype.archive = function (item) {
        var _this = this;
        console.log(item);
        this.loadingService.loadingPresent();
        this._services.service_general_put('Notification/PutArchive/' + item.id + "/" + true, '').subscribe(function (data) {
            if (data.success) {
                console.log("NOTIFICACION ARCHIVADA:  ", data);
                _this.general_messages({
                    title: "Success",
                    body: "Notification Archived.",
                    success: true
                });
                _this.loadingService.loadingDismiss();
                _this.cleanFilter();
                _this.get_Notification();
            }
        });
        this.loadingService.loadingDismiss();
    };
    //*************************************************************//
    NotificationsPage.prototype.marcarLeida = function (data) {
        var _this = this;
        console.log(data);
        if (data.view == false) {
            this.loadingService.loadingPresent();
            this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + true, '').subscribe((function (data) {
                if (data.success) {
                    _this.ngOnInit();
                    _this.loadingService.loadingDismiss();
                }
            }));
        }
        else if (data.view == true) {
            this.loadingService.loadingPresent();
            this._services.service_general_put('Notification/PutViewed/' + data.id + '/' + false, '').subscribe((function (data) {
                if (data.success) {
                    _this.ngOnInit();
                    _this.loadingService.loadingDismiss();
                }
            }));
        }
    };
    //***************************************************//
    //ACEPTAMOS NOTIFICACION//
    NotificationsPage.prototype.accept = function (data_, status) {
        var _this = this;
        console.log(status);
        this.loadingService.loadingPresent();
        this._services.service_general_putnoapi(status, '').subscribe((function (data) {
            _this.loadingService.loadingDismiss();
            _this.archive(data_);
            _this.marcarLeida(data_);
        }));
    };
    //DECLINAMOS NOTIFICACION//
    NotificationsPage.prototype.decline = function (data_, status) {
        var _this = this;
        console.log(status);
        this.loadingService.loadingPresent();
        this._services.service_general_putnoapi(status, '').subscribe((function (data) {
            console.log(data);
            _this.loadingService.loadingDismiss();
            _this.archive(data_);
            _this.marcarLeida(data_);
        }));
    };
    //FUNCION PARA ABRIR MODAL DE CONFIRMACION//
    NotificationsPage.prototype.general_messages = function (data) {
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
    NotificationsPage.prototype.openFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: filter_notification_page_1.FilterNotificationPage,
                            backdropDismiss: true
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.getServiceRecordTableData(data.data);
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
    NotificationsPage = __decorate([
        core_1.Component({
            selector: 'app-notifications',
            templateUrl: './notifications.page.html',
            styleUrls: ['./notifications.page.scss']
        })
    ], NotificationsPage);
    return NotificationsPage;
}());
exports.NotificationsPage = NotificationsPage;
