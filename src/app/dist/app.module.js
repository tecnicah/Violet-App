"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var ngx_1 = require("@ionic-native/splash-screen/ngx");
var ngx_2 = require("@ionic-native/status-bar/ngx");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var datepicker_1 = require("@angular/material/datepicker");
var input_1 = require("@angular/material/input");
var icon_1 = require("@angular/material/icon");
var form_field_1 = require("@angular/material/form-field");
var core_2 = require("@angular/material/core");
var ngx_file_drop_1 = require("ngx-file-drop");
var select_1 = require("@angular/material/select");
var ngx_3 = require("@ionic-native/in-app-browser/ngx");
var ngx_4 = require("@ionic-native/fcm/ngx");
var ngx_5 = require("@ionic-native/camera/ngx");
var ngx_6 = require("@ionic-native/local-notifications/ngx");
var ngx_filter_pipe_1 = require("ngx-filter-pipe");
var ngx_7 = require("@ionic-native/call-number/ngx");
var ngx_8 = require("@ionic-native/device/ngx");
var ng_fallimg_1 = require("ng-fallimg");
var ngx_permissions_1 = require("ngx-permissions");
var ngx_9 = require("@ionic-native/geolocation/ngx");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            entryComponents: [],
            imports: [platform_browser_1.BrowserModule,
                angular_1.IonicModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                http_1.HttpClientModule,
                datepicker_1.MatDatepickerModule,
                input_1.MatInputModule,
                icon_1.MatIconModule,
                form_field_1.MatFormFieldModule,
                core_2.MatNativeDateModule,
                ngx_file_drop_1.NgxFileDropModule,
                select_1.MatSelectModule,
                ngx_filter_pipe_1.FilterPipeModule,
                ng_fallimg_1.NgFallimgModule.forRoot({
                    "default": './assets/gris.png',
                    avatar: './assets/avatar.svg'
                }),
                ngx_permissions_1.NgxPermissionsModule.forRoot()
            ],
            providers: [
                ngx_2.StatusBar,
                ngx_1.SplashScreen,
                { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy },
                ngx_3.InAppBrowser,
                ngx_4.FCM,
                ngx_5.Camera,
                ngx_6.LocalNotifications,
                ngx_7.CallNumber,
                ngx_8.Device,
                ngx_9.Geolocation
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
