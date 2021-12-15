import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatAssignadoPage } from './chat-assignado.page';

const routes: Routes = [
  {
    path: '',
    component: ChatAssignadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAssignadoPageRoutingModule {}
