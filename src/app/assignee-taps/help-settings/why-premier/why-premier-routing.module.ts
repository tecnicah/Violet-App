import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhyPremierPage } from './why-premier.page';

const routes: Routes = [
  {
    path: '',
    component: WhyPremierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhyPremierPageRoutingModule {}
