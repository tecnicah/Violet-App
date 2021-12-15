import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMessaggePage } from './new-messagge.page';

const routes: Routes = [
  {
    path: '',
    component: NewMessaggePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMessaggePageRoutingModule {}
