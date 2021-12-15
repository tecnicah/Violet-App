import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralMensagePageRoutingModule } from './general-mensage-routing.module';

import { GeneralMensagePage } from './general-mensage.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    GeneralMensagePageRoutingModule
  ],
  declarations: [GeneralMensagePage]
})
export class GeneralMensagePageModule {}
