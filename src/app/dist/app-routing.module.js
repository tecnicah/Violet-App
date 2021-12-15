"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var routes = [
    {
        path: 'home',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); }
    },
    {
        path: 'login',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginPageModule; }); }
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'forgot-password',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/forgot-password/forgot-password.module'); }).then(function (m) { return m.ForgotPasswordPageModule; }); }
    },
    {
        path: 'general-mensage',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/general-mensage/general-mensage.module'); }).then(function (m) { return m.GeneralMensagePageModule; }); }
    },
    {
        path: 'assignee-taps',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./assignee-taps/assignee-taps.module'); }).then(function (m) { return m.AssigneeTapsPageModule; }); }
    },
    {
        path: 'documents-dialog',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/documents-dialog/documents-dialog.module'); }).then(function (m) { return m.DocumentsDialogPageModule; }); }
    },
    {
        path: 'service-rating',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/service-rating/service-rating.module'); }).then(function (m) { return m.ServiceRatingPageModule; }); }
    },
    {
        path: 'confirmation',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/confirmation/confirmation.module'); }).then(function (m) { return m.ConfirmationPageModule; }); }
    },
    {
        path: 'splash',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./splash/splash.module'); }).then(function (m) { return m.SplashPageModule; }); }
    },
    {
        path: 'change-password',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/change-password/change-password.module'); }).then(function (m) { return m.ChangePasswordPageModule; }); }
    },
    {
        path: 'filter',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/filter/filter.module'); }).then(function (m) { return m.FilterPageModule; }); }
    },
    {
        path: 'participantes',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/participantes/participantes.module'); }).then(function (m) { return m.ParticipantesPageModule; }); }
    },
    {
        path: 'filter-notification',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dialog/filter-notification/filter-notification.module'); }).then(function (m) { return m.FilterNotificationPageModule; }); }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
