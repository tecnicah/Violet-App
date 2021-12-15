import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitConverterPage } from './unit-converter.page';

const routes: Routes = [
  {
    path: '',
    component: UnitConverterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitConverterPageRoutingModule {}
