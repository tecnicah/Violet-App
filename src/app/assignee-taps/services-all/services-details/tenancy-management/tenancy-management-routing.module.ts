import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenancyManagementPage } from './tenancy-management.page';

const routes: Routes = [
  {
    path: '',
    component: TenancyManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenancyManagementPageRoutingModule {}
