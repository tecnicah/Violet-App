import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePurchasePage } from './home-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: HomePurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePurchasePageRoutingModule {}
