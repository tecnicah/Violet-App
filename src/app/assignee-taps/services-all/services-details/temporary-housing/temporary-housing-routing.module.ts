import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemporaryHousingPage } from './temporary-housing.page';

const routes: Routes = [
  {
    path: '',
    component: TemporaryHousingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemporaryHousingPageRoutingModule {}
