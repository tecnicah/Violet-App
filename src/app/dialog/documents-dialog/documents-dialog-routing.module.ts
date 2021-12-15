import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsDialogPage } from './documents-dialog.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentsDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsDialogPageRoutingModule {}
