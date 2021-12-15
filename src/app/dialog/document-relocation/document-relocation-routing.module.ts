import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentRelocationPage } from './document-relocation.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentRelocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRelocationPageRoutingModule {}
