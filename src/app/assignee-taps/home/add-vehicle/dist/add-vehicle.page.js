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
exports.AddVehiclePage = void 0;
var core_1 = require("@angular/core");
var document_vehicle_dialog_page_1 = require("src/app/dialog/document-vehicle-dialog/document-vehicle-dialog.page");
var AddVehiclePage = /** @class */ (function () {
    function AddVehiclePage(actionSheetController, camera, _services, modalController, navParams) {
        this.actionSheetController = actionSheetController;
        this.camera = camera;
        this._services = _services;
        this.modalController = modalController;
        this.navParams = navParams;
        this.data_vehiculo = {
            id: 0,
            documentVehicleConsultants: [],
            photosVehicleConsultants: []
        };
        this.interior = [];
        this.exterior = [];
        this.safety = [];
        this.ca_vehiculo = [];
        this.ca_documentType = [];
        this.ca_privacy = [];
        this.nuevos_documentos = [];
    }
    AddVehiclePage.prototype.ngOnInit = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.data_recibida = this.navParams.data;
        console.log(this.data_recibida);
        if (this.data_recibida.id != 0) {
            this.data_vehiculo = this.data_recibida;
            for (var i = 0; i < this.data_vehiculo.photosVehicleConsultants.length; i++) {
                if (this.data_vehiculo.photosVehicleConsultants[i].interior == true) {
                    this.interior.push(this.data_vehiculo.photosVehicleConsultants[i]);
                }
                if (this.data_vehiculo.photosVehicleConsultants[i].exterior == true) {
                    this.exterior.push(this.data_vehiculo.photosVehicleConsultants[i]);
                }
                if (this.data_vehiculo.photosVehicleConsultants[i].safety == true) {
                    this.safety.push(this.data_vehiculo.photosVehicleConsultants[i]);
                }
            }
        }
        this.catalogos();
    };
    AddVehiclePage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetVehicleType')];
                    case 1:
                        _a.ca_vehiculo = _d.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetDocumentType')];
                    case 2:
                        _b.ca_documentType = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetPrivacy')];
                    case 3:
                        _c.ca_privacy = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddVehiclePage.prototype.save = function () {
        this.data_vehiculo.modal = null;
        this.data_vehiculo.success = true;
        console.log(this.data_vehiculo);
        this.modalController.dismiss(this.data_vehiculo);
    };
    AddVehiclePage.prototype.addDocument = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: document_vehicle_dialog_page_1.DocumentVehicleDialogPage
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                                data.data.vehicleConsultant = _this.data_vehiculo.id;
                                data.data.city = null;
                                _this.data_vehiculo.documentVehicleConsultants.push(data.data);
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
    AddVehiclePage.prototype.back = function () {
        this.modalController.dismiss();
    };
    //***************************************************************//
    AddVehiclePage.prototype.photo = function (a, b, c) {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            mode: 'ios',
                            buttons: [{
                                    text: 'Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        var options = {
                                            quality: 100,
                                            destinationType: _this.camera.DestinationType.DATA_URL,
                                            encodingType: _this.camera.EncodingType.JPEG,
                                            mediaType: _this.camera.MediaType.PICTURE
                                        };
                                        _this.option(options, a, b, c);
                                    }
                                }, {
                                    text: 'Galery',
                                    icon: 'images',
                                    handler: function () {
                                        var options = {
                                            sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                                            quality: 100,
                                            destinationType: _this.camera.DestinationType.DATA_URL,
                                            encodingType: _this.camera.EncodingType.JPEG,
                                            mediaType: _this.camera.MediaType.PICTURE
                                        };
                                        _this.option(options, a, b, c);
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //**********************************************************************//
    AddVehiclePage.prototype.option = function (options, a, b, c) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var data_photo = {
                "id": 0,
                "vehicleConsultant": _this.data_vehiculo.id,
                "photo": imageData,
                "photoExtension": 'jpeg',
                "interior": a,
                "exterior": b,
                "safety": c,
                "createdBy": _this.userData.id,
                "createdDate": new Date(),
                "updatedBy": _this.userData.id,
                "updatedDate": new Date(),
                "b64": base64Image
            };
            _this.interior = [];
            _this.exterior = [];
            _this.safety = [];
            _this.data_vehiculo.photosVehicleConsultants.push(data_photo);
            for (var i = 0; i < _this.data_vehiculo.photosVehicleConsultants.length; i++) {
                if (_this.data_vehiculo.photosVehicleConsultants[i].interior == true) {
                    _this.interior.push(_this.data_vehiculo.photosVehicleConsultants[i]);
                }
                if (_this.data_vehiculo.photosVehicleConsultants[i].exterior == true) {
                    _this.exterior.push(_this.data_vehiculo.photosVehicleConsultants[i]);
                }
                if (_this.data_vehiculo.photosVehicleConsultants[i].safety == true) {
                    _this.safety.push(_this.data_vehiculo.photosVehicleConsultants[i]);
                }
            }
        }, function (err) {
            // Handle error
        });
    };
    AddVehiclePage = __decorate([
        core_1.Component({
            selector: 'app-add-vehicle',
            templateUrl: './add-vehicle.page.html',
            styleUrls: ['./add-vehicle.page.scss']
        })
    ], AddVehiclePage);
    return AddVehiclePage;
}());
exports.AddVehiclePage = AddVehiclePage;
