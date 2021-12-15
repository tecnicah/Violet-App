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
exports.newMesage = exports.NewMessaggePage = void 0;
var core_1 = require("@angular/core");
var NewMessaggePage = /** @class */ (function () {
    function NewMessaggePage(_services, modalController, loadingService) {
        this._services = _services;
        this.modalController = modalController;
        this.loadingService = loadingService;
        this.caCountry = [];
        this.caUsers = [];
        this.userData = {};
        this.filterC = { name: '' };
        this.filterU = { user: '' };
        this.sending = false;
        this.grupo = false;
        this.create = false;
        this.userFilter = {
            name: null
        };
        this.newMessageToSend = new newMesage;
        this.files = [];
    }
    NewMessaggePage.prototype.ngOnInit = function () {
    };
    NewMessaggePage.prototype.ionViewWillEnter = function () {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.newMessageToSend.userid = this.userData.id;
        this.newMessageToSend.userList = [];
        this.getCatalogs();
    };
    NewMessaggePage.prototype.getCatalogs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, element;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.caCountry = _b.sent();
                        for (i = 0; i < this.caCountry.length; i++) {
                            element = this.caCountry[i];
                            this.getUsersInvite(element.id);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NewMessaggePage.prototype.getUsersInvite = function (idCountry) {
        var _this = this;
        console.log(idCountry);
        this._services.service_general_get('Chat/GetUserList/' + this.userData.id + '/' + idCountry).subscribe(function (n) {
            if (n.success) {
                for (var i = 0; i < n.result.value.length; i++) {
                    var element = n.result.value[i];
                    element.checke = false;
                    _this.caUsers.push(element);
                }
                console.log(_this.caUsers);
            }
        });
    };
    NewMessaggePage.prototype.getDetails = function (user) {
        if (user != null) {
            return user.split('/');
        }
    };
    NewMessaggePage.prototype.getNameUser = function (item) {
        for (var i = 0; i < this.caUsers.length; i++) {
            var element = this.caUsers[i];
            if (item == element.id) {
                return element.user.split('/')[1];
            }
        }
    };
    NewMessaggePage.prototype.selectUser = function (id) {
        this.newMessageToSend.userList.push(id);
        this.create = true;
    };
    NewMessaggePage.prototype.selectUserGroup = function (id, i) {
        this.caUsers[i].checke = !this.caUsers[i].checke;
        if (this.caUsers[i].checke) {
            this.newMessageToSend.userList.push(id);
        }
        else {
            this.deleteUser(i);
        }
    };
    NewMessaggePage.prototype.deleteUser = function (i) {
        console.log(i);
        this.newMessageToSend.userList.splice(i, 1);
    };
    NewMessaggePage.prototype.createfalse = function () {
        this.newMessageToSend.userList = [];
        for (var i = 0; i < this.caUsers.length; i++) {
            var element = this.caUsers[i];
            this.caUsers[i].checke = false;
        }
        this.create = false;
    };
    NewMessaggePage.prototype.filesUpload = function () {
        document.getElementById('ndm').click();
    };
    NewMessaggePage.prototype.dropped = function (files) {
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
                            _this.newMessageToSend.fileExtension = ext[1];
                            _this.newMessageToSend.file = encoded;
                            _this.newMessageToSend.message = droppedFile.relativePath;
                            _this.send();
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
    NewMessaggePage.prototype.fileOver = function (event) {
        console.log(event);
    };
    NewMessaggePage.prototype.fileLeave = function (event) {
        console.log(event);
    };
    NewMessaggePage.prototype.onKey = function ($event) {
        if ($event.key == "Enter" || $event.keyCode == 13) {
            this.send();
        }
    };
    NewMessaggePage.prototype.send = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.newMessageToSend.group = this.newMessageToSend.userList.length > 1 ? true : false;
        console.log(this.newMessageToSend);
        this._services.service_general_post_with_url('Chat/SentNewMessage', this.newMessageToSend).subscribe(function (n) {
            console.log(n);
            if (n.success) {
                _this.modalController.dismiss({ id: n.result[0].id });
            }
            _this.loadingService.loadingDismiss();
        }, function (err) {
            _this.loadingService.loadingDismiss();
            _this.modalController.dismiss();
        });
    };
    NewMessaggePage.prototype.getName = function (item) {
        for (var i = 0; i < this.caUsers.length; i++) {
            var element = this.caUsers[i];
            if (element.id == item) {
                return element.user;
            }
        }
    };
    NewMessaggePage.prototype.back = function () {
        var back = document.getElementById('back');
        back.play();
        this.modalController.dismiss();
    };
    NewMessaggePage = __decorate([
        core_1.Component({
            selector: 'app-new-messagge',
            templateUrl: './new-messagge.page.html',
            styleUrls: ['./new-messagge.page.scss']
        })
    ], NewMessaggePage);
    return NewMessaggePage;
}());
exports.NewMessaggePage = NewMessaggePage;
var newMesage = /** @class */ (function () {
    function newMesage() {
        this.file = "";
        this.fileExtension = "";
    }
    return newMesage;
}());
exports.newMesage = newMesage;
;
