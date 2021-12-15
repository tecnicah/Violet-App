import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesAllPageRoutingModule } from './services-all-routing.module';

import { ServicesAllPage } from './services-all.page';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatRippleModule } from '@angular/material/core';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesAllPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    FilterPipeModule,
    MatRippleModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    })
  ],
  declarations: [ServicesAllPage]
})
export class ServicesAllPageModule {}
