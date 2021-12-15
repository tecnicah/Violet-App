import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileConsultantPage } from './profile-consultant.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileConsultantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileConsultantPageRoutingModule {}
