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
exports.ChatPremierPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var new_messagge_page_1 = require("./new-messagge/new-messagge.page");
// import { NavController } from '@ionic/angular';
var ChatPremierPage = /** @class */ (function () {
    function ChatPremierPage(_services, camera, actionSheetController, iab, modalController, router, loadingService) {
        this._services = _services;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.iab = iab;
        this.modalController = modalController;
        this.router = router;
        this.loadingService = loadingService;
        this.userData = {};
        this.sending = false;
        this.chat_conversations = [];
        this.serviceline_conversation = 1;
        this.continuemesage = {};
        this.temporalDocument = [];
        this.sr = [];
        this.keyboard = "0px";
        this.chatSecction = 1;
        this.chat = false;
        this.table_contacts = [];
        this.nameChat = "";
        this.sl = [];
        this.caCountry = [];
        this.userFilters = {
            country: "",
            serviceLineName: ""
        };
        this.userFilter = {
            name: ""
        };
        this.userFilter_ = {
            name: {
                name: ''
            }
        };
        this.files = [];
    }
    ChatPremierPage.prototype.ngOnInit = function () {
    };
    ///Premier chat
    ChatPremierPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getResient();
        this.catalogos();
        window.addEventListener('ionKeyboardDidShow', function (ev) {
            console.log(ev);
            var keyheigth = ev;
            keyheigth = keyheigth.detail.keyboardHeight + 33;
            _this.keyboard = keyheigth + "px";
            console.log(_this.keyboard);
            // Do something with the keyboard height such as translating an input above the keyboard.
        });
        window.addEventListener('ionKeyboardDidHide', function () {
            // Move input back to original location
            _this.keyboard = "0px";
        });
    };
    ChatPremierPage.prototype.catalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetServiceLine')];
                    case 1:
                        _a.sl = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 2:
                        _b.caCountry = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatPremierPage.prototype.segmentChanged = function (event) {
        console.log(this.chatSecction);
        if (this.chatSecction == 1) {
            this.getResient(event);
        }
        else {
            this.getServices(event);
        }
    };
    ChatPremierPage.prototype.getResient = function (event) {
        var _this = this;
        this._services.service_general_get('Chat/SeeChats?user=' + this.userData.id).subscribe(function (n) {
            if (n.success) {
                _this.table_contacts = n.result.value;
                console.log(_this.table_contacts);
                if (event) {
                    event.target.complete();
                }
            }
        });
    };
    ChatPremierPage.prototype.getConversation = function (id) {
        var _this = this;
        this.conversationId = id;
        this.chat = true;
        this._services.service_general_get('Chat/GetConversation/' + id + '/' + this.userData.id).subscribe(function (n) {
            if (n.success) {
                _this.chat_conversations = n.result.value;
                console.log(_this.chat_conversations);
                setTimeout(function () {
                    _this.theContent.scrollToBottom().then(function (r) {
                        console.log("scroll");
                    });
                }, 1000);
            }
        });
    };
    // get conversacion del sr 
    ChatPremierPage.prototype.getConversationSr = function (sr) {
        var srid = sr.substring(3);
        console.log('idSr', sr);
        // this.navCtrl.navigateForward(`chat/:${sr}`);
        this.router.navigate(['assignee-taps/chat/', sr]);
    };
    ChatPremierPage.prototype.sendMessage = function () {
        var _this = this;
        this.loadingService.loadingPresent();
        this.continuemesage = {
            "id": 0,
            "conversation": this.conversationId,
            "userId": this.userData.id,
            "message1": this.continuemesage.message,
            "time": new Date(),
            "status": false,
            "documentMessages": this.temporalDocument
        };
        console.log(this.continuemesage);
        this._services.service_general_post_with_url('Chat/SentMessage', this.continuemesage).subscribe(function (n) {
            console.log(n);
            _this.temporalDocument = [];
            _this.continuemesage = {
                "id": 0,
                "conversation": 0,
                "userId": _this.userData.id,
                "message1": "",
                "time": "",
                "status": true
            };
            _this.getConversation(_this.conversationId);
            _this.loadingService.loadingDismiss();
        });
    };
    ChatPremierPage.prototype.filesUpload = function (file) {
        console.log(file);
        document.getElementById(file).click();
    };
    ChatPremierPage.prototype.chatImageSrcStyle = function (src_path) {
        var result = '';
        var kind_of_file = src_path.split('.')[1];
        switch (kind_of_file) {
            case 'gif':
            case 'jpg':
            case 'png':
            case 'svg':
            case 'jpeg':
                result = this._services.url_images + src_path;
                break;
            default:
                result = 'https://cdn.onlinewebfonts.com/svg/img_560325.png';
                break;
        }
        return result;
    };
    ChatPremierPage.prototype.downloadDocumentSelected = function (url) {
        this.iab.create(this._services.url_images + url, '_system');
    };
    ChatPremierPage.prototype.dropped = function (files) {
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
                            _this.temporalDocument.push({
                                "id": 0,
                                "message": _this.conversationId,
                                "filePath": encoded,
                                "fileExtension": ext[1],
                                "date": new Date(),
                                "status": true
                            });
                            _this.continuemesage.message = droppedFile.relativePath;
                            _this.sendMessage();
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
    ChatPremierPage.prototype.fileOver = function (event) {
        console.log(event);
    };
    ChatPremierPage.prototype.fileLeave = function (event) {
        console.log(event);
    };
    ChatPremierPage.prototype.newChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: new_messagge_page_1.NewMessaggePage
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.id) {
                                _this.chat = true;
                                _this.conversationId = data.data.id;
                                _this.getConversation(_this.conversationId);
                                _this.ionViewWillEnter();
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
    ChatPremierPage.prototype.photo = function () {
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
                                        _this.option(options);
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
                                        _this.option(options);
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
    ChatPremierPage.prototype.option = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var name = new Date().toISOString();
            _this.temporalDocument.push({
                "id": 0,
                "message": _this.conversationId,
                "filePath": imageData,
                "fileExtension": 'jpeg',
                "date": new Date(),
                "status": true
            });
            _this.continuemesage.message = "photo";
            _this.sendMessage();
        }, function (err) {
            // Handle error
        });
    };
    ///Chat sr
    // /api/ChatImmigrationRelocation/GetListConversationByUser
    // ServiceRecord/GetServiceRecord/0/0/
    ChatPremierPage.prototype.getServices = function (event) {
        var _this = this;
        this.loadingService.loadingPresent();
        this._services.service_general_get('ChatImmigrationRelocation/GetListConversationByUser?user=' + this.userData.id).subscribe(function (r) {
            if (r.success) {
                _this.loadingService.loadingDismiss();
                console.log(r.result.value);
                _this.sr = r.result.value;
                if (event) {
                    event.target.complete();
                }
            }
        });
    };
    ChatPremierPage.prototype.Scroll = function (event) {
        this._services.onScroll(event);
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent)
    ], ChatPremierPage.prototype, "theContent");
    ChatPremierPage = __decorate([
        core_1.Component({
            selector: 'app-chat-premier',
            templateUrl: './chat-premier.page.html',
            styleUrls: ['./chat-premier.page.scss']
        })
    ], ChatPremierPage);
    return ChatPremierPage;
}());
exports.ChatPremierPage = ChatPremierPage;
