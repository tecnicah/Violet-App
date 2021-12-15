import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecidencyPermitPage } from './recidency-permit.page';

const routes: Routes = [
  {
    path: '',
    component: RecidencyPermitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecidencyPermitPageRoutingModule {}
