import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'new-appointment',
    loadChildren: () => import('./new-appointment/new-appointment.module').then( m => m.NewAppointmentPageModule)
  },
  {
    path: 'profile-consultant/:id',
    loadChildren: () => import('./profile-consultant/profile-consultant.module').then( m => m.ProfileConsultantPageModule)
  },
  {
    path: 'add-vehicle',
    loadChildren: () => import('./add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
  },
  {
    path: 'add-emergency',
    loadChildren: () => import('./add-emergency/add-emergency.module').then( m => m.AddEmergencyPageModule)
  },
  {
    path: 'profile-manager/:id',
    loadChildren: () => import('./profile-manager/profile-manager.module').then( m => m.ProfileManagerPageModule)
  },
  {
    path: 'add-office',
    loadChildren: () => import('./add-office/add-office.module').then( m => m.AddOfficePageModule)
  },
  {
    path: 'add-country',
    loadChildren: () => import('./add-country/add-country.module').then( m => m.AddCountryPageModule)
  },
  {
    path: 'add-team',
    loadChildren: () => import('./add-team/add-team.module').then( m => m.AddTeamPageModule)
  },
  {
    path: 'add-assigned-team',
    loadChildren: () => import('./add-assigned-team/add-assigned-team.module').then( m => m.AddAssignedTeamPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
