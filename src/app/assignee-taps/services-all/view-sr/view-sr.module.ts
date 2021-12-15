import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSrPageRoutingModule } from './view-sr-routing.module';

import { ViewSrPage } from './view-sr.page';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSrPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    FilterPipeModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    })
  ],
  declarations: [ViewSrPage]
})
export class ViewSrPageModule {}
