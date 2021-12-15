import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSalePage } from './home-sale.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSalePageRoutingModule {}
