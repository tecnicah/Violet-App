import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalDocumentationPage } from './local-documentation.page';

const routes: Routes = [
  {
    path: '',
    component: LocalDocumentationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalDocumentationPageRoutingModule {}
