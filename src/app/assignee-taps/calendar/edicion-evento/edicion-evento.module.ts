import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicionEventoPageRoutingModule } from './edicion-evento-routing.module';

import { EdicionEventoPage } from './edicion-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicionEventoPageRoutingModule
  ],
  declarations: [EdicionEventoPage]
})
export class EdicionEventoPageModule {}
