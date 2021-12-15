import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaseRenewalPage } from './lease-renewal.page';

const routes: Routes = [
  {
    path: '',
    component: LeaseRenewalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaseRenewalPageRoutingModule {}
