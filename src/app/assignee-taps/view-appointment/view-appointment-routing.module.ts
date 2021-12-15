import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAppointmentPage } from './view-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAppointmentPageRoutingModule {}
