import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredecisionOrientatonPageRoutingModule } from './predecision-orientaton-routing.module';

import { PredecisionOrientatonPage } from './predecision-orientaton.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFallimgModule } from 'ng-fallimg';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredecisionOrientatonPageRoutingModule,
    MatExpansionModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
    NgxPermissionsModule.forRoot()
  ],
  declarations: [PredecisionOrientatonPage]
})
export class PredecisionOrientatonPageModule {}
