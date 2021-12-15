import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportEventPage } from './report-event.page';

const routes: Routes = [
  {
    path: '',
    component: ReportEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportEventPageRoutingModule {}
