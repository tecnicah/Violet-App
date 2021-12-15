import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierPartnerConsultantPage } from './supplier-partner-consultant.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierPartnerConsultantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierPartnerConsultantPageRoutingModule {}
