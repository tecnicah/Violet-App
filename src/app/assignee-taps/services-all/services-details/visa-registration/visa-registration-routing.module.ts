import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisaRegistrationPage } from './visa-registration.page';

const routes: Routes = [
  {
    path: '',
    component: VisaRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisaRegistrationPageRoutingModule {}
