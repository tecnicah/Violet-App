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
exports.DocumentsDialogPage = void 0;
var core_1 = require("@angular/core");
var DocumentsDialogPage = /** @class */ (function () {
    function DocumentsDialogPage(modalController, statusBar, _service, navParams) {
        this.modalController = modalController;
        this.statusBar = statusBar;
        this._service = _service;
        this.navParams = navParams;
        this.userData = {};
        this.temporalDocument = {};
        this.caDocumentType = [];
        this.caRelationShips = [];
        this.caCountry = [];
        this.documents = {};
        this.ne = false;
        this.files = [];
        this.library_data = undefined;
    }
    DocumentsDialogPage.prototype.ngOnInit = function () {
    };
    DocumentsDialogPage.prototype.ionViewWillEnter = function () {
        var type = this.navParams.data.id;
        this.type_document = type;
        console.log(type);
        this.documents.relationship = 0;
        this.statusBar.backgroundColorByHexString('#9d3292');
        this.statusBar.styleLightContent();
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.temporalDocument.updatedDate = (new Date()).toISOString();
        this.getCatalogs();
    };
    DocumentsDialogPage.prototype.getCatalogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //this.caDocumentType = await this._service.getCatalogueFrom('GetDocumentType');
                        this._service.service_general_get("Catalogue/GetDocumentType/" + this.type_document).subscribe((function (data) {
                            console.log(data);
                            if (data.success) {
                                _this.caDocumentType = data.result;
                            }
                        }));
                        _a = this;
                        return [4 /*yield*/, this._service.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCountry = _b.sent();
                        if (Number(localStorage.getItem('sr')) != 0) {
                            this.ne = false;
                            this._service.service_general_get("ServiceRecord/GetApplicant/" + localStorage.getItem('sr')).subscribe((function (data) {
                                console.log(data);
                                if (data.success) {
                                    _this.caRelationShips = data.applicant.value;
                                }
                            }));
                        }
                        else {
                            this.ne = true;
                            this._service.service_general_get("ServiceRecord/GetApplicant/" + localStorage.getItem('srAd')).subscribe((function (data) {
                                console.log(data);
                                if (data.success) {
                                    _this.caRelationShips = data.applicant.value;
                                }
                            }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentsDialogPage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    DocumentsDialogPage.prototype.doc = function () {
        document.getElementById('doc').click();
    };
    DocumentsDialogPage.prototype.dropped = function (files) {
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
                                "fileRequest": encoded,
                                "fileExtension": ext[ext.length - 1],
                                "documentType": "",
                                "relationship": "",
                                "issueDate": "",
                                "expirationDate": "",
                                "issuingAuthority": "",
                                "countryOrigin": "",
                                "comment": "",
                                "createdBy": _this.userData.id,
                                "createdDate": new Date(),
                                "name": droppedFile.relativePath
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
    DocumentsDialogPage.prototype.fileOver = function (event) {
        console.log(event);
    };
    DocumentsDialogPage.prototype.fileLeave = function (event) {
        console.log(event);
    };
    DocumentsDialogPage.prototype.getDataToLibrarySettings = function () {
        var _this = this;
        this.caRelationShips.forEach(function (item) {
            if (_this.documents.relationship == item.id) {
                _this.library_data = item;
            }
        });
    };
    DocumentsDialogPage.prototype.save = function () {
        var _this = this;
        this._service.loader = true;
        this.temporalDocument = {
            id: 0,
            fileName: this.temporalDocument.name,
            nameFile: this.temporalDocument.name,
            fileExtension: this.temporalDocument.fileExtension,
            fileRequest: this.temporalDocument.fileRequest,
            comment: this.documents.comment,
            countryOrigin: this.documents.countryOrigin,
            createdBy: this.temporalDocument.createdBy,
            createdDate: this.temporalDocument.createdDate,
            documentType: this.documents.documentType,
            //issuingAuthority: this.documents.issuingAuthority,
            issuingAuthority: '',
            updateBy: this.userData.id,
            updatedDate: (new Date()).toISOString(),
            relationship: this.documents.relationship,
            dependentInformation: this.documents.relationship,
            expirationDate: this.documents.expirationDate,
            issueDate: "",
            success: true
        };
        console.log(this.temporalDocument);
        if (Number(localStorage.getItem('sr')) != 0) {
            this._service.service_general_post_with_url("ImmigrationProfile/CreateDocumentDependent", this.temporalDocument)
                .subscribe(function (response) {
                if (response.success) {
                }
                _this._service.loader = false;
                _this.modalController.dismiss();
            }, function (error) {
                console.error('Error (ImmigrationProfile/CreateDocumentDependent) => ', error);
                _this.modalController.dismiss();
                _this._service.loader = false;
            });
        }
        else {
            this.modalController.dismiss(this.temporalDocument);
        }
    };
    DocumentsDialogPage = __decorate([
        core_1.Component({
            selector: 'app-documents-dialog',
            templateUrl: './documents-dialog.page.html',
            styleUrls: ['./documents-dialog.page.scss']
        })
    ], DocumentsDialogPage);
    return DocumentsDialogPage;
}());
exports.DocumentsDialogPage = DocumentsDialogPage;
