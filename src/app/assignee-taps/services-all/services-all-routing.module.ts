import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesAllPage } from './services-all.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesAllPage
  },
  {
    path: 'view-sr/:id',
    loadChildren: () => import('./view-sr/view-sr.module').then( m => m.ViewSrPageModule)
  },
  {
    path: 'report-of-the-day',
    loadChildren: () => import('./report-of-the-day/report-of-the-day.module').then( m => m.ReportOfTheDayPageModule)
  },
  {
    path: 'add-activitie-item',
    loadChildren: () => import('./add-activitie-item/add-activitie-item.module').then( m => m.AddActivitieItemPageModule)
  },
  {
    path: 'request-additional-time',
    loadChildren: () => import('./request-additional-time/request-additional-time.module').then( m => m.RequestAdditionalTimePageModule)
  },
  {
    path: 'entry-visa',
    loadChildren: () => import('./services-details/entry-visa/entry-visa.module').then( m => m.EntryVisaPageModule)
  },
  {
    path: 'work-permit',
    loadChildren: () => import('./services-details/work-permit/work-permit.module').then( m => m.WorkPermitPageModule)
  },
  {
    path: 'recidency-permit',
    loadChildren: () => import('./services-details/recidency-permit/recidency-permit.module').then( m => m.RecidencyPermitPageModule)
  },
  {
    path: 'renewal',
    loadChildren: () => import('./services-details/renewal/renewal.module').then( m => m.RenewalPageModule)
  },
  {
    path: 'legal-review',
    loadChildren: () => import('./services-details/legal-review/legal-review.module').then( m => m.LegalReviewPageModule)
  },
  {
    path: 'visa-registration',
    loadChildren: () => import('./services-details/visa-registration/visa-registration.module').then( m => m.VisaRegistrationPageModule)
  },
  {
    path: 'corporate-assiatance',
    loadChildren: () => import('./services-details/corporate-assiatance/corporate-assiatance.module').then( m => m.CorporateAssiatancePageModule)
  },
  {
    path: 'noti',
    loadChildren: () => import('./services-details/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'document-management',
    loadChildren: () => import('./services-details/document-management/document-management.module').then( m => m.DocumentManagementPageModule)
  },
  {
    path: 'local-documentation',
    loadChildren: () => import('./services-details/local-documentation/local-documentation.module').then( m => m.LocalDocumentationPageModule)
  },
  {
    path: 'temporary-housing',
    loadChildren: () => import('./services-details/temporary-housing/temporary-housing.module').then( m => m.TemporaryHousingPageModule)
  },
  {
    path: 'predecision-orientaton',
    loadChildren: () => import('./services-details/predecision-orientaton/predecision-orientaton.module').then( m => m.PredecisionOrientatonPageModule)
  },
  {
    path: 'area-orientation',
    loadChildren: () => import('./services-details/area-orientation/area-orientation.module').then( m => m.AreaOrientationPageModule)
  },
  {
    path: 'school-search',
    loadChildren: () => import('./services-details/school-search/school-search.module').then( m => m.SchoolSearchPageModule)
  },
  {
    path: 'transportation',
    loadChildren: () => import('./services-details/transportation/transportation.module').then( m => m.TransportationPageModule)
  },
  {
    path: 'home-finding',
    loadChildren: () => import('./services-details/home-finding/home-finding.module').then( m => m.HomeFindingPageModule)
  },
  {
    path: 'contract-details',
    loadChildren: () => import('./services-details/dialogs/contract-details/contract-details.module').then( m => m.ContractDetailsPageModule)
  },
  {
    path: 'departure-details',
    loadChildren: () => import('./services-details/dialogs/departure-details/departure-details.module').then( m => m.DepartureDetailsPageModule)
  },
  {
    path: 'renewal-details',
    loadChildren: () => import('./services-details/dialogs/renewal-details/renewal-details.module').then( m => m.RenewalDetailsPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./services-details/dialogs/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'airport-transportation',
    loadChildren: () => import('./services-details/airport-transportation/airport-transportation.module').then( m => m.AirportTransportationPageModule)
  },
  {
    path: 'settling-in',
    loadChildren: () => import('./services-details/settling-in/settling-in.module').then( m => m.SettlingInPageModule)
  },
  {
    path: 'rental-furniture-coordination',
    loadChildren: () => import('./services-details/rental-furniture-coordination/rental-furniture-coordination.module').then( m => m.RentalFurnitureCoordinationPageModule)
  },
  {
    path: 'cost-savings',
    loadChildren: () => import('./services-details/dialogs/cost-savings/cost-savings.module').then( m => m.CostSavingsPageModule)
  },
  {
    path: 'departure',
    loadChildren: () => import('./services-details/departure/departure.module').then( m => m.DeparturePageModule)
  },
  {
    path: 'landlord-details',
    loadChildren: () => import('./services-details/dialogs/landlord-details/landlord-details.module').then( m => m.LandlordDetailsPageModule)
  },
  {
    path: 'inspections-repairs',
    loadChildren: () => import('./services-details/dialogs/inspections-repairs/inspections-repairs.module').then( m => m.InspectionsRepairsPageModule)
  },
  {
    path: 'move-in',
    loadChildren: () => import('./services-details/dialogs/move-in/move-in.module').then( m => m.MoveInPageModule)
  },
  {
    path: 'move-out',
    loadChildren: () => import('./services-details/dialogs/move-out/move-out.module').then( m => m.MoveOutPageModule)
  },
  {
    path: 'lease-renewal',
    loadChildren: () => import('./services-details/lease-renewal/lease-renewal.module').then( m => m.LeaseRenewalPageModule)
  },
  {
    path: 'home-sale',
    loadChildren: () => import('./services-details/home-sale/home-sale.module').then( m => m.HomeSalePageModule)
  },
  {
    path: 'others',
    loadChildren: () => import('./services-details/others/others.module').then( m => m.OthersPageModule)
  },
  {
    path: 'home-purchase',
    loadChildren: () => import('./services-details/home-purchase/home-purchase.module').then( m => m.HomePurchasePageModule)
  },
  {
    path: 'property-management',
    loadChildren: () => import('./services-details/property-management/property-management.module').then( m => m.PropertyManagementPageModule)
  },
  {
    path: 'tenancy-management',
    loadChildren: () => import('./services-details/tenancy-management/tenancy-management.module').then( m => m.TenancyManagementPageModule)
  },
  {
    path: 'OthersImmigration',
    loadChildren: () => import('./services-details/other-immigration/other-immigration.module').then( m => m.OtherImmigrationPageModule)
  }





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesAllPageRoutingModule {}
