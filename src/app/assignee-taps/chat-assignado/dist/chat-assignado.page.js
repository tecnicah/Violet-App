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
exports.newChat = exports.ChatDocument = exports.ChatConversation = exports.MessageDto = exports.ChatAssignadoPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var participantes_page_1 = require("src/app/dialog/participantes/participantes.page");
var ChatAssignadoPage = /** @class */ (function () {
    function ChatAssignadoPage(location, _services, camera, actionSheetController, iab, localNotifications, route, loadingServices, modalCtrl) {
        this.location = location;
        this._services = _services;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.iab = iab;
        this.localNotifications = localNotifications;
        this.route = route;
        this.loadingServices = loadingServices;
        this.modalCtrl = modalCtrl;
        this.userData = {};
        this.sending = false;
        this.serviceline_conversation = 1;
        this.addGRoup = false;
        this.keyboard = "0px";
        this.inteGrupo = false;
        //**********************************************************************//
        this.country = [];
        //**********************************************************************//
        this.showMenssages = false;
        this.__messages__ = '';
        this.SL = 1;
        this.chat_conversations = [];
        this.first_conversation = false;
        //**********************************************************************//
        this.chat_model = new ChatConversation();
        //**********************************************************************//
        this.new_chat = new newChat();
        //**********************************************************************//
        /* New Challenger has enter the ring * */
        this.files = [];
        this.chat_document = new ChatDocument();
    }
    ChatAssignadoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("chat asignado");
        this.sr = Number(localStorage.getItem('sr'));
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.homeCountry = this.userData.assigneeInformations[0].homeCountryId;
        this.hostCountry = this.userData.assigneeInformations[0].hostCountry;
        this._services.retrieveMappedObject().subscribe(function (receivedObj) {
            console.log(receivedObj);
            _this.localNotifications.schedule({
                text: 'New Chat'
            });
            _this.initChatBehavior(_this.SL);
        });
        this.initChatBehavior(1);
        this.initChatBehavior(2);
        console.log("USERDATA: ", this.userData);
        this.getCatalogos();
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.ngOnInit = function () {
    };
    ChatAssignadoPage.prototype.getCatalogos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._services.getCatalogueFrom('GetCountry')];
                    case 1:
                        _a.country = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //**********************************************************************//
    //GET NAME COUNTRY//
    ChatAssignadoPage.prototype.getName = function (id) {
        for (var i = 0; i < this.country.length; i++) {
            if (this.country[i].id == id) {
                return this.country[i].name;
            }
        }
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.showParticipantes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: participantes_page_1.ParticipantesPage,
                            componentProps: {
                                serviceLine: this.SL,
                                idConversacion: this.idConversation
                            },
                            backdropDismiss: true
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log(data);
                            if (data.data.success) {
                            }
                        });
                        this.modalCtrl.dismiss();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatAssignadoPage.prototype.chatRelocation = function () {
        this.SL = 2;
        this.initChatBehavior(2);
        this.showMenssages = true;
        this.__messages__ = 'Relocation Team';
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.chatImmigration = function () {
        this.SL = 1;
        this.initChatBehavior(1);
        this.showMenssages = true;
        this.__messages__ = 'Immigration Team';
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.photo = function () {
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
    //**********************************************************************//
    ChatAssignadoPage.prototype.option = function (options) {
        var _this = this;
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var name = new Date().toISOString();
            _this.chat_document.fileExtension = 'jpeg';
            _this.chat_document.filePath = imageData;
            _this.chat_model.chatDocumentImmigrationRelocations.push(_this.chat_document);
            _this.chat_model.comment = name;
            if (_this.serviceline_conversation == 1) {
                _this.continueChatConversation();
            }
            else {
                _this.newChatConversation();
            }
        }, function (err) {
            // Handle error
        });
    };
    ChatAssignadoPage.prototype.initChatBehavior = function (type) {
        var _this = this;
        this.serviceline_conversation = type;
        console.log(this.serviceline_conversation);
        var so_and_type;
        if (Number(localStorage.getItem('sr')) == 0) {
            var srid = this.sr.substring(3);
            this.addGRoup = true;
            so_and_type = "?Service_record_id=" + srid + "&type=" + this.serviceline_conversation;
        }
        else {
            so_and_type = "?Service_record_id=" + localStorage.getItem('sr') + "&type=" + this.serviceline_conversation;
            console.log('chat sr');
        }
        this.loadingServices.loadingPresent();
        this._services.service_general_get("ChatImmigrationRelocation/GetConversation" + so_and_type)
            .subscribe(function (response) {
            if (response.success) {
                var chats_in = response.result.value;
                _this.chat_conversations = chats_in;
                setTimeout(function () {
                    _this.theContent.scrollToBottom().then(function (r) {
                        console.log("scroll");
                    });
                }, 1000);
                if (chats_in.length == 0) {
                    _this.first_conversation = true;
                }
                else {
                    _this.first_conversation = false;
                    _this.idConversation = chats_in[0].conversationId;
                }
                _this.loadingServices.loadingDismiss();
                console.log('[CP2294] Chats in res ===> ', response);
                if (type == 1) {
                    _this.immigration = response.result.value[response.result.value.length - 1];
                }
                else if (type == 2) {
                    _this.relocation = response.result.value[response.result.value.length - 1];
                }
            }
        }, function (error) {
            console.error('ChatImmigrationRelocation/GetConversation => ', error);
        });
    };
    ChatAssignadoPage.prototype.continueChatConversation = function () {
        var _this = this;
        this.chat_model.dateComment = new Date();
        this.chat_model.userId = this.userData.id;
        this.chat_model.chatCoversationId = this.chat_conversations[0].conversationId;
        var chat_data = [this.chat_model];
        if (this.chat_model.comment.length != 0) {
            this.sending = true;
            console.log('[CP2338] Continu Chat send ===> ', chat_data);
            this.loadingServices.loadingPresent();
            this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateComment', chat_data)
                .subscribe(function (response) {
                _this.sending = false;
                console.log('Res (ChatImmigrationRelocation/CreateComment) => ', response);
                if (response.success) {
                    _this.chat_model.comment = '';
                    _this.chat_model.chatDocumentImmigrationRelocations = [];
                    _this.initChatBehavior(_this.serviceline_conversation);
                    _this.loadingServices.loadingDismiss();
                }
            }, function (error) {
                _this.loadingServices.loadingDismiss();
                console.error('Error (ChatImmigrationRelocation/CreateComment) ==> ', error);
            });
            this.loadingServices.loadingDismiss();
        }
    };
    ChatAssignadoPage.prototype.newChatConversation = function () {
        var _this = this;
        this.sending = true;
        this.chat_model.dateComment = new Date();
        this.chat_model.userId = this.userData.id;
        this.new_chat.createdDate = new Date();
        this.new_chat.createdBy = this.userData.id;
        this.new_chat.serviceLineId = this.serviceline_conversation;
        this.new_chat.serviceRecordId = Number(localStorage.getItem('sr'));
        this.new_chat.chatImmigrationRelocations[0] = this.chat_model;
        var chat_data = [this.new_chat];
        if (this.chat_model.comment.length != 0) {
            this.loadingServices.loadingPresent();
            this._services.service_general_post_with_url('ChatImmigrationRelocation/CreateConversation', chat_data)
                .subscribe(function (response) {
                console.log('Res [CP2351] (ChatImmigrationRelocation/CreateConversation) => ', response);
                console.log('Data sent => ', chat_data);
                _this.sending = false;
                if (response.success) {
                    _this.chat_model.comment = '';
                    _this.chat_model.chatDocumentImmigrationRelocations = [];
                    _this.initChatBehavior(_this.serviceline_conversation);
                    _this.loadingServices.loadingDismiss();
                }
                _this.loadingServices.loadingDismiss();
            }, function (error) {
                _this.loadingServices.loadingDismiss();
                console.log('Error (ChatImmigrationRelocation/CreateConversation) => ', error);
            });
            this.loadingServices.loadingDismiss();
        }
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.chatImageSrcStyle = function (src_path) {
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
    //**********************************************************************//
    ChatAssignadoPage.prototype.downloadDocumentSelected = function (url) {
        this.iab.create(this._services.url_images + url, '_system');
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.file = function () {
        var doc = document.getElementById('chatfile');
        doc.click();
    };
    ChatAssignadoPage.prototype.dropped = function (files) {
        var _this = this;
        this.files = files;
        var root = this;
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
                            var base64_gotted = reader_1.result;
                            _this.chat_document.fileExtension = file.name.split('.')[1];
                            _this.chat_document.filePath = base64_gotted.split(',')[1];
                            _this.chat_model.chatDocumentImmigrationRelocations.push(_this.chat_document);
                            _this.chat_model.comment = file.name;
                            if (_this.serviceline_conversation == 1) {
                                _this.continueChatConversation();
                            }
                            else {
                                _this.newChatConversation();
                            }
                        };
                    });
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                //console.log(droppedFile.relativePath, fileEntry);
            }
        };
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var droppedFile = files_1[_i];
            _loop_1(droppedFile);
        }
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.fileOver = function (event) {
        //console.log(event);
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.fileLeave = function (event) {
        //console.log(event);
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.send = function () {
        if (this.first_conversation) {
            this.newChatConversation();
        }
        else {
            this.continueChatConversation();
        }
    };
    //**********************************************************************//
    ChatAssignadoPage.prototype.myBackButton = function () {
        if (this.showMenssages == true) {
            this.showMenssages = false;
            return true;
        }
        this.location.back();
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent)
    ], ChatAssignadoPage.prototype, "theContent");
    ChatAssignadoPage = __decorate([
        core_1.Component({
            selector: 'app-chat-assignado',
            templateUrl: './chat-assignado.page.html',
            styleUrls: ['./chat-assignado.page.scss']
        })
    ], ChatAssignadoPage);
    return ChatAssignadoPage;
}());
exports.ChatAssignadoPage = ChatAssignadoPage;
//MODELOS DEL CHAT//
var MessageDto = /** @class */ (function () {
    function MessageDto() {
        this.user = '';
        this.msgText = '';
    }
    return MessageDto;
}());
exports.MessageDto = MessageDto;
var ChatConversation = /** @class */ (function () {
    function ChatConversation() {
        this.id = 0;
        this.chatCoversationId = 0;
        this.userId = 0;
        this.chatDocumentId = 0;
        this.comment = '';
        this.dateComment = null;
        this.status = true;
        this.chatDocumentImmigrationRelocations = [];
    }
    return ChatConversation;
}());
exports.ChatConversation = ChatConversation;
var ChatDocument = /** @class */ (function () {
    function ChatDocument() {
        this.id = 0;
        this.filePath = '';
        this.fileExtension = '';
        this.chatImmigrationRelocationId = 0;
        this.status = true;
    }
    return ChatDocument;
}());
exports.ChatDocument = ChatDocument;
var newChat = /** @class */ (function () {
    function newChat() {
        this.id = 0;
        this.serviceLineId = 0;
        this.status = true;
        this.createdBy = 0;
        this.createdDate = null;
        this.serviceRecordId = 0;
        this.chatImmigrationRelocations = [new ChatConversation()];
    }
    return newChat;
}());
exports.newChat = newChat;
