import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompliancePoliciesPage } from './compliance-policies.page';

const routes: Routes = [
  {
    path: '',
    component: CompliancePoliciesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompliancePoliciesPageRoutingModule {}
