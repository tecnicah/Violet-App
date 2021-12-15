import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegalReviewPage } from './legal-review.page';

const routes: Routes = [
  {
    path: '',
    component: LegalReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalReviewPageRoutingModule {}
