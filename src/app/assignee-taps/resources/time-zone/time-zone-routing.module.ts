import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeZonePage } from './time-zone.page';

const routes: Routes = [
  {
    path: '',
    component: TimeZonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeZonePageRoutingModule {}
