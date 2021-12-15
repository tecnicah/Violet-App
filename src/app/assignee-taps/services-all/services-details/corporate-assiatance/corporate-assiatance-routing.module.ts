import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorporateAssiatancePage } from './corporate-assiatance.page';

const routes: Routes = [
  {
    path: '',
    component: CorporateAssiatancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporateAssiatancePageRoutingModule {}
