import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmationCalendarPage } from './confirmation-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmationCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationCalendarPageRoutingModule {}
