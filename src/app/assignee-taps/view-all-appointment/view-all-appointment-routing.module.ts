import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllAppointmentPage } from './view-all-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllAppointmentPageRoutingModule {}
