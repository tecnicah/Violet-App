import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllAppointmentPageRoutingModule } from './view-all-appointment-routing.module';

import { ViewAllAppointmentPage } from './view-all-appointment.page';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAllAppointmentPageRoutingModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    FilterPipeModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    })
  ],
  declarations: [ViewAllAppointmentPage]
})
export class ViewAllAppointmentPageModule {}
