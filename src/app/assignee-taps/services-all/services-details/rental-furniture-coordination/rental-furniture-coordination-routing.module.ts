import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RentalFurnitureCoordinationPage } from './rental-furniture-coordination.page';

const routes: Routes = [
  {
    path: '',
    component: RentalFurnitureCoordinationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalFurnitureCoordinationPageRoutingModule {}
