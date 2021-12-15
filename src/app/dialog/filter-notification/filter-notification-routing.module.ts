import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterNotificationPage } from './filter-notification.page';

const routes: Routes = [
  {
    path: '',
    component: FilterNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterNotificationPageRoutingModule {}
