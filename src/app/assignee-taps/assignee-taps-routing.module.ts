import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssigneeTapsPage } from './assignee-taps.page';

const routes: Routes = [
  {
    path: '',
    component: AssigneeTapsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsPageModule)
      },
      {
        path: 'resources',
        loadChildren: () => import('./resources/resources.module').then(m => m.ResourcesPageModule)
      },
      {
        path: 'contryCityInfo',
        loadChildren: () => import('./resources/country-city-info/country-city-info.module').then(m => m.CountryCityInfoPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./services/services.module').then(m => m.ServicesPageModule)
      },
      {
        path: 'view-appointment',
        loadChildren: () => import('./view-appointment/view-appointment.module').then(m => m.ViewAppointmentPageModule)
      },
      {
        path: 'help-settings',
        loadChildren: () => import('./help-settings/help-settings.module').then(m => m.HelpSettingsPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'chat/:sr/:sl',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'chat-premier',
        loadChildren: () => import('./chat-premier/chat-premier.module').then(m => m.ChatPremierPageModule)
      },
      {
        path: 'chat-assignado',
        loadChildren: () => import('./chat-assignado/chat-assignado.module').then(m => m.ChatAssignadoPageModule)
      },
      {
        path: 'add-appointment',
        loadChildren: () => import('./home/new-appointment/new-appointment.module').then(m => m.NewAppointmentPageModule)
      },
      {
        path: 'open-calendar',
        loadChildren: () => import('./calendar/calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'edit-calendar',
        loadChildren: () => import('./calendar/edicion-evento/edicion-evento.module').then(m => m.EdicionEventoPageModule)
      },
      {
        path: 'add-calendar',
        loadChildren: () => import('./calendar/evento/evento.module').then(m => m.EventoPageModule)
      },
      {
        path: 'services-all',
        loadChildren: () => import('./services-all/services-all.module').then(m => m.ServicesAllPageModule)
      },
      {
        path: 'entry',
        loadChildren: () => import('./services-all/services-details/entry-visa/entry-visa.module').then(m => m.EntryVisaPageModule)
      },
      {
        path: 'work',
        loadChildren: () => import('./services-all/services-details/work-permit/work-permit.module').then(m => m.WorkPermitPageModule)
      },
      {
        path: 'visa',
        loadChildren: () => import('./services-all/services-details/visa-registration/visa-registration.module').then(m => m.VisaRegistrationPageModule)
      },
      {
        path: 'recidency',
        loadChildren: () => import('./services-all/services-details/recidency-permit/recidency-permit.module').then(m => m.RecidencyPermitPageModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./services-all/services-details/document-management/document-management.module').then(m => m.DocumentManagementPageModule)
      },
      {
        path: 'local',
        loadChildren: () => import('./services-all/services-details/local-documentation/local-documentation.module').then(m => m.LocalDocumentationPageModule)
      }
      ,
      {
        path: 'corporate',
        loadChildren: () => import('./services-all/services-details/corporate-assiatance/corporate-assiatance.module').then(m => m.CorporateAssiatancePageModule)
      },
      {
        path: 'renewal',
        loadChildren: () => import('./services-all/services-details/renewal/renewal.module').then(m => m.RenewalPageModule)
      },
      {
        path: 'noti',
        loadChildren: () => import('./services-all/services-details/notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'legal',
        loadChildren: () => import('./services-all/services-details/legal-review/legal-review.module').then(m => m.LegalReviewPageModule)
      },
      {
        path: 'predecision',
        loadChildren: () => import('./services-all/services-details/predecision-orientaton/predecision-orientaton.module').then(m => m.PredecisionOrientatonPageModule)
      },
      {
        path: 'area',
        loadChildren: () => import('./services-all/services-details/area-orientation/area-orientation.module').then(m => m.AreaOrientationPageModule)
      },
      {
        path: 'settling',
        loadChildren: () => import('./services-all/services-details/settling-in/settling-in.module').then(m => m.SettlingInPageModule)
      },
      {
        path: 'school',
        loadChildren: () => import('./services-all/services-details/school-search/school-search.module').then(m => m.SchoolSearchPageModule)
      },
      {
        path: 'departure',
        loadChildren: () => import('./services-all/services-details/departure/departure.module').then(m => m.DeparturePageModule)
      },
      {
        path: 'temporary',
        loadChildren: () => import('./services-all/services-details/temporary-housing/temporary-housing.module').then(m => m.TemporaryHousingPageModule)
      },
      {
        path: 'rental',
        loadChildren: () => import('./services-all/services-details/rental-furniture-coordination/rental-furniture-coordination.module').then(m => m.RentalFurnitureCoordinationPageModule)
      },
      {
        path: 'transport',
        loadChildren: () => import('./services-all/services-details/transportation/transportation.module').then(m => m.TransportationPageModule)
      },
      {
        path: 'airport',
        loadChildren: () => import('./services-all/services-details/airport-transportation/airport-transportation.module').then(m => m.AirportTransportationPageModule)
      },
      {
        path: 'homeFind',
        loadChildren: () => import('./services-all/services-details/home-finding/home-finding.module').then(m => m.HomeFindingPageModule)
      },
      {
        path: 'leaseRenewal',
        loadChildren: () => import('./services-all/services-details/lease-renewal/lease-renewal.module').then(m => m.LeaseRenewalPageModule)
      },
      {
        path: 'homeSale',
        loadChildren: () => import('./services-all/services-details/home-sale/home-sale.module').then(m => m.HomeSalePageModule)
      },
      {
        path: 'homePurchanse',
        loadChildren: () => import('./services-all/services-details/home-purchase/home-purchase.module').then(m => m.HomePurchasePageModule)
      },
      {
        path: 'propertyManagement',
        loadChildren: () => import('./services-all/services-details/property-management/property-management.module').then(m => m.PropertyManagementPageModule)
      },
      {
        path: 'Others',
        loadChildren: () => import('./services-all/services-details/others/others.module').then(m => m.OthersPageModule)
      },
      {
        path: 'OthersImmigration',
        loadChildren: () => import('./services-all/services-details/other-immigration/other-immigration.module').then(m => m.OtherImmigrationPageModule)
      },
      {
        path: 'tenancy',
        loadChildren: () => import('./services-all/services-details/tenancy-management/tenancy-management.module').then(m => m.TenancyManagementPageModule)
      }
    ]
  },
  {
    path: 'tips',
    loadChildren: () => import('./tips/tips.module').then(m => m.TipsPageModule)
  },
  {
    path: 'view-all-appointment',
    loadChildren: () => import('./view-all-appointment/view-all-appointment.module').then(m => m.ViewAllAppointmentPageModule)
  },
  {
    path: 'chat-assignado',
    loadChildren: () => import('./chat-assignado/chat-assignado.module').then(m => m.ChatAssignadoPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar/calendar.module').then(m => m.CalendarPageModule)
  },
  {
    path: 'evento',
    loadChildren: () => import('./calendar/evento/evento.module').then(m => m.EventoPageModule)
  },
  {
    path: 'edicion-evento',
    loadChildren: () => import('./calendar/edicion-evento/edicion-evento.module').then(m => m.EdicionEventoPageModule)
  },
  {
    path: 'availability',
    loadChildren: () => import('./calendar/availability/availability.module').then( m => m.AvailabilityPageModule)
  },
  {
    path: 'calendar-days',
    loadChildren: () => import('./calendar/calendar-days/calendar-days.module').then( m => m.CalendarDaysPageModule)
  },
  {
    path: 'confirmation-calendar',
    loadChildren: () => import('./calendar/confirmation-calendar/confirmation-calendar.module').then( m => m.ConfirmationCalendarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssigneeTapsPageRoutingModule { }
