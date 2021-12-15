import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicionEventoPage } from './edicion-evento.page';

const routes: Routes = [
  {
    path: '',
    component: EdicionEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicionEventoPageRoutingModule {}
