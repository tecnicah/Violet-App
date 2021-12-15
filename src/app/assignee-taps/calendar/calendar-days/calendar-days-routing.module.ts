import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarDaysPage } from './calendar-days.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarDaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarDaysPageRoutingModule {}
