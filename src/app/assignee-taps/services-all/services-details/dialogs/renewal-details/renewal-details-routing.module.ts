import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewalDetailsPage } from './renewal-details.page';

const routes: Routes = [
  {
    path: '',
    component: RenewalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewalDetailsPageRoutingModule {}
