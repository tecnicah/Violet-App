import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HousingSpecificationsPage } from './housing-specifications.page';

const routes: Routes = [
  {
    path: '',
    component: HousingSpecificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousingSpecificationsPageRoutingModule {}
