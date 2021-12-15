import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPremierPageRoutingModule } from './chat-premier-routing.module';

import { ChatPremierPage } from './chat-premier.page';
import { MatRippleModule } from '@angular/material/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPremierPageRoutingModule,
    MatRippleModule,
    NgxFileDropModule,
    FilterPipeModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    })
  ],
  declarations: [ChatPremierPage]
})
export class ChatPremierPageModule {}
