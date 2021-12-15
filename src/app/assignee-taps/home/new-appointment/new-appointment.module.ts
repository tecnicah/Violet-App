import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAppointmentPageRoutingModule } from './new-appointment-routing.module';

import { NewAppointmentPage } from './new-appointment.page';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAppointmentPageRoutingModule,
    NgxFileDropModule
  ],
  declarations: [NewAppointmentPage]
})
export class NewAppointmentPageModule {}
