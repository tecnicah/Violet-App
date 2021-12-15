import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryVisaPage } from './entry-visa.page';

const routes: Routes = [
  {
    path: '',
    component: EntryVisaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryVisaPageRoutingModule {}
