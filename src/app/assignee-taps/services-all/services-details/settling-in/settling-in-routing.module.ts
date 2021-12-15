import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettlingInPage } from './settling-in.page';

const routes: Routes = [
  {
    path: '',
    component: SettlingInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlingInPageRoutingModule {}
