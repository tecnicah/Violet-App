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
exports.DocumentVehicleDialogPage = void 0;
var core_1 = require("@angular/core");
var DocumentVehicleDialogPage = /** @class */ (function () {
    function DocumentVehicleDialogPage(modalController, _service, navParams) {
        this.modalController = modalController;
        this._service = _service;
        this.navParams = navParams;
        this.userData = {};
        this.temporalDocument = {};
        this.caDocumentType = [];
        this.documents = {};
        this.privacy = [];
        this.files = [];
        this.library_data = undefined;
    }
    DocumentVehicleDialogPage.prototype.ngOnInit = function () {
    };
    DocumentVehicleDialogPage.prototype.ionViewWillEnter = function () {
        console.log('docs');
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getCatalogs();
    };
    DocumentVehicleDialogPage.prototype.getCatalogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetPrivacy')];
                    case 1:
                        _a.privacy = _b.sent();
                        this._service.service_general_get("AdminCenter/GetDocumentType").subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.caDocumentType = data.result;
                            }
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentVehicleDialogPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    DocumentVehicleDialogPage.prototype.doc = function () {
        document.getElementById('doc').click();
    };
    DocumentVehicleDialogPage.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
        var _loop_1 = function (droppedFile) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry_1 = droppedFile.fileEntry;
                var reader_1 = new FileReader();
                fileEntry_1.file(function (file) {
                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, _this.files);
                    fileEntry_1.file(function (file) {
                        reader_1.readAsDataURL(file);
                        reader_1.onload = function () {
                            var imageUrl = reader_1.result;
                            var encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                            if ((encoded.length % 4) > 0) {
                                encoded += '='.repeat(4 - (encoded.length % 4));
                            }
                            var ext = droppedFile.relativePath.split(".");
                            _this.temporalDocument = {
                                "id": 0,
                                "filePath": encoded,
                                "name": droppedFile.relativePath,
                                "fileExtension": ext[ext.length - 1],
                                "documentType": "",
                                "expirationDate": "",
                                "city": "",
                                "privacy": "",
                                "createdBy": _this.userData.id,
                                "createdDate": new Date(),
                                "updatedBy": _this.userData.id,
                                "updatedDate": new Date()
                            };
                            _this.temporalDocument.updatedDate = (new Date()).toISOString();
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    DocumentVehicleDialogPage.prototype.fileOver = function (event) {
        console.log(event);
    };
    DocumentVehicleDialogPage.prototype.fileLeave = function (event) {
        console.log(event);
    };
    DocumentVehicleDialogPage.prototype.getDataToLibrarySettings = function () { };
    DocumentVehicleDialogPage.prototype.save = function () {
        this._service.loader = true;
        this.temporalDocument = {
            "id": 0,
            "city": 0,
            "filePath": this.temporalDocument.filePath,
            "fileExtension": this.temporalDocument.fileExtension,
            "documentType": this.documents.documentType,
            "expirationDate": this.documents.expirationDate,
            "privacy": this.documents.privacy,
            "createdBy": this.userData.id,
            "createdDate": new Date(),
            "updatedBy": this.userData.id,
            "updatedDate": new Date(),
            "success": true
        };
        console.log(this.temporalDocument);
        this.modalController.dismiss(this.temporalDocument);
    };
    DocumentVehicleDialogPage = __decorate([
        core_1.Component({
            selector: 'app-document-vehicle-dialog',
            templateUrl: './document-vehicle-dialog.page.html',
            styleUrls: ['./document-vehicle-dialog.page.scss']
        })
    ], DocumentVehicleDialogPage);
    return DocumentVehicleDialogPage;
}());
exports.DocumentVehicleDialogPage = DocumentVehicleDialogPage;
