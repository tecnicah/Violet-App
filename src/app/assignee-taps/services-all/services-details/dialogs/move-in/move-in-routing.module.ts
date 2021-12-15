import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoveInPage } from './move-in.page';

const routes: Routes = [
  {
    path: '',
    component: MoveInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoveInPageRoutingModule {}
