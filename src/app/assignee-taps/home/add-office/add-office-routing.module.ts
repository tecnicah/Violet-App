import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOfficePage } from './add-office.page';

const routes: Routes = [
  {
    path: '',
    component: AddOfficePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOfficePageRoutingModule {}
