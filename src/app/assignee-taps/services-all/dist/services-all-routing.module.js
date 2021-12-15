"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicesAllPageRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var services_all_page_1 = require("./services-all.page");
var routes = [
    {
        path: '',
        component: services_all_page_1.ServicesAllPage
    },
    {
        path: 'view-sr/:id',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./view-sr/view-sr.module'); }).then(function (m) { return m.ViewSrPageModule; }); }
    },
    {
        path: 'report-of-the-day',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./report-of-the-day/report-of-the-day.module'); }).then(function (m) { return m.ReportOfTheDayPageModule; }); }
    },
    {
        path: 'add-activitie-item',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./add-activitie-item/add-activitie-item.module'); }).then(function (m) { return m.AddActivitieItemPageModule; }); }
    },
    {
        path: 'request-additional-time',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./request-additional-time/request-additional-time.module'); }).then(function (m) { return m.RequestAdditionalTimePageModule; }); }
    },
    {
        path: 'entry-visa',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/entry-visa/entry-visa.module'); }).then(function (m) { return m.EntryVisaPageModule; }); }
    },
    {
        path: 'work-permit',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/work-permit/work-permit.module'); }).then(function (m) { return m.WorkPermitPageModule; }); }
    },
    {
        path: 'recidency-permit',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/recidency-permit/recidency-permit.module'); }).then(function (m) { return m.RecidencyPermitPageModule; }); }
    },
    {
        path: 'renewal',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/renewal/renewal.module'); }).then(function (m) { return m.RenewalPageModule; }); }
    },
    {
        path: 'legal-review',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/legal-review/legal-review.module'); }).then(function (m) { return m.LegalReviewPageModule; }); }
    },
    {
        path: 'visa-registration',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/visa-registration/visa-registration.module'); }).then(function (m) { return m.VisaRegistrationPageModule; }); }
    },
    {
        path: 'corporate-assiatance',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/corporate-assiatance/corporate-assiatance.module'); }).then(function (m) { return m.CorporateAssiatancePageModule; }); }
    },
    {
        path: 'noti',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/notification/notification.module'); }).then(function (m) { return m.NotificationPageModule; }); }
    },
    {
        path: 'document-management',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/document-management/document-management.module'); }).then(function (m) { return m.DocumentManagementPageModule; }); }
    },
    {
        path: 'local-documentation',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/local-documentation/local-documentation.module'); }).then(function (m) { return m.LocalDocumentationPageModule; }); }
    },
    {
        path: 'temporary-housing',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/temporary-housing/temporary-housing.module'); }).then(function (m) { return m.TemporaryHousingPageModule; }); }
    },
    {
        path: 'predecision-orientaton',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/predecision-orientaton/predecision-orientaton.module'); }).then(function (m) { return m.PredecisionOrientatonPageModule; }); }
    },
    {
        path: 'area-orientation',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/area-orientation/area-orientation.module'); }).then(function (m) { return m.AreaOrientationPageModule; }); }
    },
    {
        path: 'school-search',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/school-search/school-search.module'); }).then(function (m) { return m.SchoolSearchPageModule; }); }
    },
    {
        path: 'transportation',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/transportation/transportation.module'); }).then(function (m) { return m.TransportationPageModule; }); }
    },
    {
        path: 'home-finding',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/home-finding/home-finding.module'); }).then(function (m) { return m.HomeFindingPageModule; }); }
    },
    {
        path: 'contract-details',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/contract-details/contract-details.module'); }).then(function (m) { return m.ContractDetailsPageModule; }); }
    },
    {
        path: 'departure-details',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/departure-details/departure-details.module'); }).then(function (m) { return m.DepartureDetailsPageModule; }); }
    },
    {
        path: 'renewal-details',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/renewal-details/renewal-details.module'); }).then(function (m) { return m.RenewalDetailsPageModule; }); }
    },
    {
        path: 'payments',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/payments/payments.module'); }).then(function (m) { return m.PaymentsPageModule; }); }
    },
    {
        path: 'airport-transportation',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/airport-transportation/airport-transportation.module'); }).then(function (m) { return m.AirportTransportationPageModule; }); }
    },
    {
        path: 'settling-in',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/settling-in/settling-in.module'); }).then(function (m) { return m.SettlingInPageModule; }); }
    },
    {
        path: 'rental-furniture-coordination',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/rental-furniture-coordination/rental-furniture-coordination.module'); }).then(function (m) { return m.RentalFurnitureCoordinationPageModule; }); }
    },
    {
        path: 'cost-savings',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/cost-savings/cost-savings.module'); }).then(function (m) { return m.CostSavingsPageModule; }); }
    },
    {
        path: 'departure',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/departure/departure.module'); }).then(function (m) { return m.DeparturePageModule; }); }
    },
    {
        path: 'landlord-details',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/landlord-details/landlord-details.module'); }).then(function (m) { return m.LandlordDetailsPageModule; }); }
    },
    {
        path: 'inspections-repairs',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/inspections-repairs/inspections-repairs.module'); }).then(function (m) { return m.InspectionsRepairsPageModule; }); }
    },
    {
        path: 'move-in',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/move-in/move-in.module'); }).then(function (m) { return m.MoveInPageModule; }); }
    },
    {
        path: 'move-out',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/dialogs/move-out/move-out.module'); }).then(function (m) { return m.MoveOutPageModule; }); }
    },
    {
        path: 'lease-renewal',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./services-details/lease-renewal/lease-renewal.module'); }).then(function (m) { return m.LeaseRenewalPageModule; }); }
    }
];
var ServicesAllPageRoutingModule = /** @class */ (function () {
    function ServicesAllPageRoutingModule() {
    }
    ServicesAllPageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ServicesAllPageRoutingModule);
    return ServicesAllPageRoutingModule;
}());
exports.ServicesAllPageRoutingModule = ServicesAllPageRoutingModule;
