import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSalePageRoutingModule } from './home-sale-routing.module';

import { HomeSalePage } from './home-sale.page';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgFallimgModule } from 'ng-fallimg';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    HomeSalePageRoutingModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
    NgxPermissionsModule.forRoot()
  ],
  declarations: [HomeSalePage]
})
export class HomeSalePageModule {}
