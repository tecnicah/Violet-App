import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryCityInfoPage } from './country-city-info.page';

const routes: Routes = [
  {
    path: '',
    component: CountryCityInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryCityInfoPageRoutingModule {}
