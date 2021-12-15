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
exports.GeneralService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../environments/environment");
var signalR = require("@microsoft/signalr");
var GeneralService = /** @class */ (function () {
    function GeneralService(http) {
        var _this = this;
        this.http = http;
        this.url_api = "" + environment_1.environment.API_URL;
        this.url_images = "" + environment_1.environment.images_path;
        this.padingios = false;
        this.headers = new http_1.HttpHeaders();
        this.receivedMessageObject = '';
        this.sharedObj = new rxjs_1.Subject();
        this.url_chat = new signalR.HubConnectionBuilder()
            .withUrl("" + environment_1.environment.images_path + 'chatsocket') // mapping to the chathub as in startup.cs
            .withAutomaticReconnect()
            .build();
        this.loader = false;
        this.footerHidden = false;
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        this.headers.append('Accept', 'application/json');
        this.headers.append('content-type', 'application/json');
        this.url_chat.onclose(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.start()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.url_chat.on("ReceiveOne", function (user) { _this.mapReceivedMessage(_this.chat_test); });
        this.start();
    }
    // Strart the connection
    GeneralService.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("connectedppppppppppp");
                        return [4 /*yield*/, this.url_chat.start()];
                    case 1:
                        _a.sent();
                        console.log("connected");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        setTimeout(function () { return _this.start(); }, 5000);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*private mapReceivedMessage(user: string, message: string): void {
      this.receivedMessageObject.user = user;
      this.receivedMessageObject.msgText = message;
      this.sharedObj.next(this.receivedMessageObject);
    }*/
    GeneralService.prototype.mapReceivedMessage = function (chat_model) {
        console.log('El Chat =====> ', chat_model);
        this.sharedObj.next(this.receivedMessageObject);
    };
    GeneralService.prototype.retrieveMappedObject = function () {
        return this.sharedObj.asObservable();
    };
    /* Arriba estan los servicios del chat */
    GeneralService.prototype.service_general_post_with_url = function (url, parametros) {
        return this.http.post(this.url_api + url, parametros, { headers: this.headers });
    };
    GeneralService.prototype.service_general_post_with_urlnoapi = function (url, parametros) {
        return this.http.post(this.url_images + url, parametros, { headers: this.headers });
    };
    GeneralService.prototype.service_general_put = function (url, parametros) {
        return this.http.put(this.url_api + url, parametros, { headers: this.headers });
    };
    GeneralService.prototype.service_general_putnoapi = function (url, parametros) {
        return this.http.put(this.url_images + url, parametros, { headers: this.headers });
    };
    GeneralService.prototype.service_general_get = function (url) {
        return this.http.get(this.url_api + url, { headers: this.headers });
    };
    GeneralService.prototype.service_general_get_noapi = function (url) {
        return this.http.get(this.url_images + url, { headers: this.headers });
    };
    GeneralService.prototype.service_general_delete = function (url) {
        return this.http["delete"](this.url_api + url, { headers: this.headers });
    };
    GeneralService.prototype.service_general_deleteno_api = function (url) {
        return this.http["delete"](this.url_images + url, { headers: this.headers });
    };
    GeneralService.prototype.service_general_delete_with_url = function (url) {
        return this.http["delete"](this.url_api + url, { headers: this.headers });
    };
    /* Catalogos */
    GeneralService.prototype.getCatalogueFrom = function (catalogo_selected, params) {
        if (params === void 0) { params = ''; }
        var query = this.http.get(this.url_api + 'Catalogue/' + catalogo_selected + params, { headers: this.headers }), query_on = new Promise(function (resolve) {
            query.subscribe(function (response) {
                resolve(response);
            }, function (error) {
                resolve(error);
            });
        });
        return query_on.then(function (result) {
            if (result.success)
                return result.result;
            else
                return 'Error al pedir el catalogo.';
        });
    };
    GeneralService.prototype.onScroll = function (event) {
        if (event.detail.deltaY > 0 && this.footerHidden)
            return;
        if (event.detail.deltaY < 0 && !this.footerHidden)
            return;
        if (event.detail.deltaY > 0) {
            console.log("scrolling down, hiding footer...");
            this.footerHidden = true;
        }
        else {
            console.log("scrolling up, revealing footer...");
            this.footerHidden = false;
        }
        ;
    };
    GeneralService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GeneralService);
    return GeneralService;
}());
exports.GeneralService = GeneralService;
