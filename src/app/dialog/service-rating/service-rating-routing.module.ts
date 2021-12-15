import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceRatingPage } from './service-rating.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRatingPageRoutingModule {}
