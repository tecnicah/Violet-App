import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportAndEventAssigneePage } from './report-and-event-assignee.page';

const routes: Routes = [
  {
    path: '',
    component: ReportAndEventAssigneePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportAndEventAssigneePageRoutingModule {}
