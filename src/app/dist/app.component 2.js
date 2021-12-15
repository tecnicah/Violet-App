"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, service, fcm, device) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.service = service;
        this.fcm = fcm;
        this.device = device;
        this.splash = true;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.splashScreen.hide();
            if (_this.platform.is('android') || _this.platform.is('ios')) {
                _this.statusBar.backgroundColorByHexString('#9D3292');
                _this.statusBar.styleDefault();
                _this.statusBar.overlaysWebView(true);
            }
            if (_this.device.model == "iPhone10" ||
                _this.device.model == "iPhone10,1" ||
                _this.device.model == "iPhone10,2" ||
                _this.device.model == "iPhone10,3" ||
                _this.device.model == "iPhone10,4" ||
                _this.device.model == "iPhone10,5" ||
                _this.device.model == "iPhone10,6" ||
                _this.device.model == "iPhone10,7" ||
                _this.device.model == "iPhone10,8" ||
                _this.device.model == "iPhone10,9" ||
                _this.device.model == "iPhone10,10" ||
                _this.device.model == "iPhone11" ||
                _this.device.model == "iPhone11,1" ||
                _this.device.model == "iPhone11,2" ||
                _this.device.model == "iPhone11,3" ||
                _this.device.model == "iPhone11,4" ||
                _this.device.model == "iPhone11,5" ||
                _this.device.model == "iPhone11,6" ||
                _this.device.model == "iPhone11,7" ||
                _this.device.model == "iPhone11,8" ||
                _this.device.model == "iPhone11,9" ||
                _this.device.model == "iPhone11,10") {
                _this.service.padingios = true;
            }
            else {
                _this.service.padingios = false;
            }
            setTimeout(function () {
                _this.splash = false;
            }, 12000);
            _this.fcm.getToken().then(function (token) {
                console.log("este es el token", token);
                localStorage.setItem('token', token);
            });
            _this.fcm.onTokenRefresh().subscribe(function (token) {
                console.log("refresh token", token);
                localStorage.setItem('token', token);
            });
            _this.fcm.onNotification().subscribe(function (data) {
                //localStorage.setItem("notificacion", data.toString());
                console.log(data);
                if (data.wasTapped) {
                    console.log("Received in background");
                }
                else {
                    console.log("Received in foreground");
                }
                ;
            });
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
