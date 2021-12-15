import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportationPage } from './transportation.page';

const routes: Routes = [
  {
    path: '',
    component: TransportationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportationPageRoutingModule {}
