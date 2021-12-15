import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralMensagePage } from './general-mensage.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralMensagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralMensagePageRoutingModule {}
