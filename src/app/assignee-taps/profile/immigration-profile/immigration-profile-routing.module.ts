import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImmigrationProfilePage } from './immigration-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ImmigrationProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImmigrationProfilePageRoutingModule {}
