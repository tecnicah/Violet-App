import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartureDetailsPage } from './departure-details.page';

const routes: Routes = [
  {
    path: '',
    component: DepartureDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartureDetailsPageRoutingModule {}
