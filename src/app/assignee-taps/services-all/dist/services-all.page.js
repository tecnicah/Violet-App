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
exports.ServicesAllPage = void 0;
var core_1 = require("@angular/core");
var filter_page_1 = require("src/app/dialog/filter/filter.page");
var ServicesAllPage = /** @class */ (function () {
    function ServicesAllPage(router, service, modalController, loadingService) {
        this.router = router;
        this.service = service;
        this.modalController = modalController;
        this.loadingService = loadingService;
        this.userData = {};
        this.filteruno = false;
        this.sr = [];
        this.userFilter = {
            assigneeName: '',
            status: { id: '' }
        };
        this.caStatus = [];
        this.show_name_assignee = false;
        this.service_records_table_data = undefined;
    }
    ServicesAllPage.prototype.ngOnInit = function () {
    };
    ServicesAllPage.prototype.ionViewWillEnter = function () {
        console.log(window.screen.width);
        if (window.screen.width <= 500) {
            this.show_name_assignee = true;
        }
        else {
            this.show_name_assignee = false;
        }
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.catalogos();
        this.getServices();
    };
    ServicesAllPage.prototype.getServices = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.service.service_general_get('ServiceRecord/GetServiceRecord/0/0/' + this.userData.id).subscribe(function (r) {
            if (r.success) {
                _this.loadingService.loadingDismiss();
                console.log(r.map.value);
                _this.sr = r.map.value;
            }
        });
    };
    ServicesAllPage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.service.getCatalogueFrom('GetStatus')];
                    case 1:
                        _a.caStatus = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServicesAllPage.prototype.cleanFilter = function () {
        var _this = this;
        this.userFilter = {
            assigneeName: '',
            status: { id: '' }
        };
        this.getServices();
        this.filteruno = true;
        setTimeout(function () {
            _this.filteruno = false;
        }, 2000);
    };
    ServicesAllPage.prototype.viewSR = function (id) {
        this.router.navigateByUrl('assignee-taps/services-all/view-sr/' + id);
    };
    ServicesAllPage.prototype.openFilter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: filter_page_1.FilterPage,
                            backdropDismiss: true
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            _this.filter_data = data.data;
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
    ServicesAllPage.prototype.getServiceRecordTableData = function (params) {
        var _this = this;
        if (params === void 0) { params = ''; }
        this.loadingService.loadingPresent();
        var params_in = params == '' ? '' : "?" + params;
        this.service.service_general_get('ServiceRecord/GetServiceRecord/1/100/' + this.userData.id + '/' + params_in)
            .subscribe(function (r) {
            if (r.success) {
                _this.loadingService.loadingDismiss();
                console.log(r.map.value);
                _this.sr = r.map.value;
                _this.loadingService.loadingDismiss();
            }
        }, function (error) {
            console.error('Error (GetServiceRecord) => ', error);
            _this.loadingService.loadingDismiss();
        });
    };
    ServicesAllPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        console.log(localStorage.getItem('back'));
        this.router.navigateByUrl('assignee-taps/home');
    };
    ServicesAllPage.prototype.Scroll = function (event) {
        this.service.onScroll(event);
    };
    ServicesAllPage = __decorate([
        core_1.Component({
            selector: 'app-services-all',
            templateUrl: './services-all.page.html',
            styleUrls: ['./services-all.page.scss']
        })
    ], ServicesAllPage);
    return ServicesAllPage;
}());
exports.ServicesAllPage = ServicesAllPage;
