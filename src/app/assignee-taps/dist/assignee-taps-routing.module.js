"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AssigneeTapsPageRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var assignee_taps_page_1 = require("./assignee-taps.page");
var routes = [
    {
        path: '',
        component: assignee_taps_page_1.AssigneeTapsPage,
        children: [
            {
                path: 'home',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomePageModule; }); }
            },
            {
                path: 'documents',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./documents/documents.module'); }).then(function (m) { return m.DocumentsPageModule; }); }
            },
            {
                path: 'resources',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./resources/resources.module'); }).then(function (m) { return m.ResourcesPageModule; }); }
            },
            {
                path: 'contryCityInfo',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./resources/country-city-info/country-city-info.module'); }).then(function (m) { return m.CountryCityInfoPageModule; }); }
            },
            {
                path: 'profile',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./profile/profile.module'); }).then(function (m) { return m.ProfilePageModule; }); }
            },
            {
                path: 'services',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services/services.module'); }).then(function (m) { return m.ServicesPageModule; }); }
            },
            {
                path: 'view-appointment',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./view-appointment/view-appointment.module'); }).then(function (m) { return m.ViewAppointmentPageModule; }); }
            },
            {
                path: 'help-settings',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./help-settings/help-settings.module'); }).then(function (m) { return m.HelpSettingsPageModule; }); }
            },
            {
                path: 'notifications',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./notifications/notifications.module'); }).then(function (m) { return m.NotificationsPageModule; }); }
            },
            {
                path: 'chat',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./chat/chat.module'); }).then(function (m) { return m.ChatPageModule; }); }
            },
            {
                path: 'chat/:sr',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./chat/chat.module'); }).then(function (m) { return m.ChatPageModule; }); }
            },
            {
                path: 'chat-premier',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./chat-premier/chat-premier.module'); }).then(function (m) { return m.ChatPremierPageModule; }); }
            },
            {
                path: 'chat-assignado',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./chat-assignado/chat-assignado.module'); }).then(function (m) { return m.ChatAssignadoPageModule; }); }
            },
            {
                path: 'add-appointment',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./home/new-appointment/new-appointment.module'); }).then(function (m) { return m.NewAppointmentPageModule; }); }
            },
            {
                path: 'open-calendar',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./calendar/calendar/calendar.module'); }).then(function (m) { return m.CalendarPageModule; }); }
            },
            {
                path: 'edit-calendar',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./calendar/edicion-evento/edicion-evento.module'); }).then(function (m) { return m.EdicionEventoPageModule; }); }
            },
            {
                path: 'add-calendar',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./calendar/evento/evento.module'); }).then(function (m) { return m.EventoPageModule; }); }
            },
            {
                path: 'services-all',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-all.module'); }).then(function (m) { return m.ServicesAllPageModule; }); }
            },
            {
                path: 'entry',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/entry-visa/entry-visa.module'); }).then(function (m) { return m.EntryVisaPageModule; }); }
            },
            {
                path: 'work',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/work-permit/work-permit.module'); }).then(function (m) { return m.WorkPermitPageModule; }); }
            },
            {
                path: 'visa',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/visa-registration/visa-registration.module'); }).then(function (m) { return m.VisaRegistrationPageModule; }); }
            },
            {
                path: 'recidency',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/recidency-permit/recidency-permit.module'); }).then(function (m) { return m.RecidencyPermitPageModule; }); }
            },
            {
                path: 'document',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/document-management/document-management.module'); }).then(function (m) { return m.DocumentManagementPageModule; }); }
            },
            {
                path: 'local',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/local-documentation/local-documentation.module'); }).then(function (m) { return m.LocalDocumentationPageModule; }); }
            },
            {
                path: 'corporate',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/corporate-assiatance/corporate-assiatance.module'); }).then(function (m) { return m.CorporateAssiatancePageModule; }); }
            },
            {
                path: 'renewal',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/renewal/renewal.module'); }).then(function (m) { return m.RenewalPageModule; }); }
            },
            {
                path: 'noti',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/notification/notification.module'); }).then(function (m) { return m.NotificationPageModule; }); }
            },
            {
                path: 'legal',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/legal-review/legal-review.module'); }).then(function (m) { return m.LegalReviewPageModule; }); }
            },
            {
                path: 'predecision',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/predecision-orientaton/predecision-orientaton.module'); }).then(function (m) { return m.PredecisionOrientatonPageModule; }); }
            },
            {
                path: 'area',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/area-orientation/area-orientation.module'); }).then(function (m) { return m.AreaOrientationPageModule; }); }
            },
            {
                path: 'settling',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/settling-in/settling-in.module'); }).then(function (m) { return m.SettlingInPageModule; }); }
            },
            {
                path: 'school',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/school-search/school-search.module'); }).then(function (m) { return m.SchoolSearchPageModule; }); }
            },
            {
                path: 'departure',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/departure/departure.module'); }).then(function (m) { return m.DeparturePageModule; }); }
            },
            {
                path: 'temporary',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/temporary-housing/temporary-housing.module'); }).then(function (m) { return m.TemporaryHousingPageModule; }); }
            },
            {
                path: 'rental',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/rental-furniture-coordination/rental-furniture-coordination.module'); }).then(function (m) { return m.RentalFurnitureCoordinationPageModule; }); }
            },
            {
                path: 'transport',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/transportation/transportation.module'); }).then(function (m) { return m.TransportationPageModule; }); }
            },
            {
                path: 'airport',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/airport-transportation/airport-transportation.module'); }).then(function (m) { return m.AirportTransportationPageModule; }); }
            },
            {
                path: 'homeFind',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/home-finding/home-finding.module'); }).then(function (m) { return m.HomeFindingPageModule; }); }
            },
            {
                path: 'leaseRenewal',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./services-all/services-details/lease-renewal/lease-renewal.module'); }).then(function (m) { return m.LeaseRenewalPageModule; }); }
            }
        ]
    },
    {
        path: 'tips',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./tips/tips.module'); }).then(function (m) { return m.TipsPageModule; }); }
    },
    {
        path: 'view-all-appointment',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./view-all-appointment/view-all-appointment.module'); }).then(function (m) { return m.ViewAllAppointmentPageModule; }); }
    },
    {
        path: 'chat-assignado',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./chat-assignado/chat-assignado.module'); }).then(function (m) { return m.ChatAssignadoPageModule; }); }
    },
    {
        path: 'calendar',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./calendar/calendar/calendar.module'); }).then(function (m) { return m.CalendarPageModule; }); }
    },
    {
        path: 'evento',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./calendar/evento/evento.module'); }).then(function (m) { return m.EventoPageModule; }); }
    },
    {
        path: 'edicion-evento',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./calendar/edicion-evento/edicion-evento.module'); }).then(function (m) { return m.EdicionEventoPageModule; }); }
    }
];
var AssigneeTapsPageRoutingModule = /** @class */ (function () {
    function AssigneeTapsPageRoutingModule() {
    }
    AssigneeTapsPageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], AssigneeTapsPageRoutingModule);
    return AssigneeTapsPageRoutingModule;
}());
exports.AssigneeTapsPageRoutingModule = AssigneeTapsPageRoutingModule;
