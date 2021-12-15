import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyManagementPage } from './property-management.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyManagementPageRoutingModule {}
