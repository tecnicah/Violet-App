import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoveOutPage } from './move-out.page';

const routes: Routes = [
  {
    path: '',
    component: MoveOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoveOutPageRoutingModule {}
