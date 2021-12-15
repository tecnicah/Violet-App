import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierPartnerServicePage } from './supplier-partner-service.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierPartnerServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierPartnerServicePageRoutingModule {}
