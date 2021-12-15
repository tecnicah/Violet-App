import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileManagerPage } from './profile-manager.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileManagerPageRoutingModule {}
