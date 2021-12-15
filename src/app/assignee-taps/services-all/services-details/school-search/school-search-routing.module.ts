import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolSearchPage } from './school-search.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolSearchPageRoutingModule {}
