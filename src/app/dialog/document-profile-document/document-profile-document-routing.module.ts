import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentProfileDocumentPage } from './document-profile-document.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentProfileDocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentProfileDocumentPageRoutingModule {}
