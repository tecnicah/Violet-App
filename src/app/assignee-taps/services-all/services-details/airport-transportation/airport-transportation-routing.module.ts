import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirportTransportationPage } from './airport-transportation.page';

const routes: Routes = [
  {
    path: '',
    component: AirportTransportationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirportTransportationPageRoutingModule {}
