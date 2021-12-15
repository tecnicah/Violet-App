import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { MatRippleModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    MatRippleModule,
    MatButtonModule,
    NgxFileDropModule
  ],
  declarations: [ChatPage]
})
export class ChatPageModule {}
