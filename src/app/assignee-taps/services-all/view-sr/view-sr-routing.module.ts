import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSrPage } from './view-sr.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSrPageRoutingModule {}
