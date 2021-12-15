import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatAssignadoPageRoutingModule } from './chat-assignado-routing.module';

import { ChatAssignadoPage } from './chat-assignado.page';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatAssignadoPageRoutingModule,
    MatRippleModule,
    MatButtonModule,
    NgxFileDropModule
  ],
  declarations: [ChatAssignadoPage]
})
export class ChatAssignadoPageModule {}
