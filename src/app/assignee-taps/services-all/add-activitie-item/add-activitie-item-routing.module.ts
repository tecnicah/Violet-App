import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddActivitieItemPage } from './add-activitie-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddActivitieItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddActivitieItemPageRoutingModule {}
