import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAssignedTeamPage } from './add-assigned-team.page';

const routes: Routes = [
  {
    path: '',
    component: AddAssignedTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAssignedTeamPageRoutingModule {}
