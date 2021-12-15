import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAppointmentPageRoutingModule } from './view-appointment-routing.module';

import { ViewAppointmentPage } from './view-appointment.page';
import { MatRippleModule } from '@angular/material/core';
import { NgFallimgModule } from 'ng-fallimg';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAppointmentPageRoutingModule,
    MatRippleModule,
    MatExpansionModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
  ],
  declarations: [ViewAppointmentPage]
})
export class ViewAppointmentPageModule {}
