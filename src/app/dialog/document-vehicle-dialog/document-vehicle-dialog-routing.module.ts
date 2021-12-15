import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentVehicleDialogPage } from './document-vehicle-dialog.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentVehicleDialogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentVehicleDialogPageRoutingModule {}
