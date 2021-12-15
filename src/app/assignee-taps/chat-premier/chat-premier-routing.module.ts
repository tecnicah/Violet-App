import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPremierPage } from './chat-premier.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPremierPage
  },
  {
    path: 'new-messagge',
    loadChildren: () => import('./new-messagge/new-messagge.module').then( m => m.NewMessaggePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPremierPageRoutingModule {}
