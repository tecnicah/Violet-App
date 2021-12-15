import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandlordDetailsPage } from './landlord-details.page';

const routes: Routes = [
  {
    path: '',
    component: LandlordDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandlordDetailsPageRoutingModule {}
