import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkPermitPage } from './work-permit.page';

const routes: Routes = [
  {
    path: '',
    component: WorkPermitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPermitPageRoutingModule {}
