import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./dialog/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'general-mensage',
    loadChildren: () => import('./dialog/general-mensage/general-mensage.module').then( m => m.GeneralMensagePageModule)
  },
  {
    path: 'assignee-taps',
    loadChildren: () => import('./assignee-taps/assignee-taps.module').then( m => m.AssigneeTapsPageModule)
  },
  {
    path: 'documents-dialog',
    loadChildren: () => import('./dialog/documents-dialog/documents-dialog.module').then( m => m.DocumentsDialogPageModule)
  },
  {
    path: 'service-rating',
    loadChildren: () => import('./dialog/service-rating/service-rating.module').then( m => m.ServiceRatingPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./dialog/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./dialog/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./dialog/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'participantes',
    loadChildren: () => import('./dialog/participantes/participantes.module').then( m => m.ParticipantesPageModule)
  },
  {
    path: 'filter-notification',
    loadChildren: () => import('./dialog/filter-notification/filter-notification.module').then( m => m.FilterNotificationPageModule)
  },
  {
    path: 'document-vehicle-dialog',
    loadChildren: () => import('./dialog/document-vehicle-dialog/document-vehicle-dialog.module').then( m => m.DocumentVehicleDialogPageModule)
  },
  {
    path: 'document-profile-document',
    loadChildren: () => import('./dialog/document-profile-document/document-profile-document.module').then( m => m.DocumentProfileDocumentPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'report-event',
    loadChildren: () => import('./dialog/report-event/report-event.module').then( m => m.ReportEventPageModule)
  },  {
    path: 'report-and-event-assignee',
    loadChildren: () => import('./dialog/report-and-event-assignee/report-and-event-assignee.module').then( m => m.ReportAndEventAssigneePageModule)
  },
  {
    path: 'document-relocation',
    loadChildren: () => import('./dialog/document-relocation/document-relocation.module').then( m => m.DocumentRelocationPageModule)
  },
  {
    path: 'bundle',
    loadChildren: () => import('./dialog/bundle/bundle.module').then( m => m.BundlePageModule)
  },
  {
    path: 'filter-supplier',
    loadChildren: () => import('./dialog/filter-supplier/filter-supplier.module').then( m => m.FilterSupplierPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
