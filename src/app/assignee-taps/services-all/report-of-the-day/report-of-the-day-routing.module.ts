import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportOfTheDayPage } from './report-of-the-day.page';

const routes: Routes = [
  {
    path: '',
    component: ReportOfTheDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportOfTheDayPageRoutingModule {}
