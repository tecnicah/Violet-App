import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostSavingsPage } from './cost-savings.page';

const routes: Routes = [
  {
    path: '',
    component: CostSavingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostSavingsPageRoutingModule {}
