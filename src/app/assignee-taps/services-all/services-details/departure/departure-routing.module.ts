import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeparturePage } from './departure.page';

const routes: Routes = [
  {
    path: '',
    component: DeparturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeparturePageRoutingModule {}
