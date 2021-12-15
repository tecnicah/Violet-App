import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMessaggePageRoutingModule } from './new-messagge-routing.module';

import { NewMessaggePage } from './new-messagge.page';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMessaggePageRoutingModule,
    NgxFileDropModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
  ],
  declarations: [NewMessaggePage]
})
export class NewMessaggePageModule {}
