import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaOrientationPage } from './area-orientation.page';

const routes: Routes = [
  {
    path: '',
    component: AreaOrientationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaOrientationPageRoutingModule {}
