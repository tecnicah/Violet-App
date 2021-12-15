import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredecisionOrientatonPage } from './predecision-orientaton.page';

const routes: Routes = [
  {
    path: '',
    component: PredecisionOrientatonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredecisionOrientatonPageRoutingModule {}
