import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmergencyPage } from './add-emergency.page';

const routes: Routes = [
  {
    path: '',
    component: AddEmergencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEmergencyPageRoutingModule {}
