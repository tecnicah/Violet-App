import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherImmigrationPage } from './other-immigration.page';

const routes: Routes = [
  {
    path: '',
    component: OtherImmigrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherImmigrationPageRoutingModule {}
