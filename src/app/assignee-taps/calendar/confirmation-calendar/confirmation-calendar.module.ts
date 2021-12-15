import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmationCalendarPageRoutingModule } from './confirmation-calendar-routing.module';

import { ConfirmationCalendarPage } from './confirmation-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmationCalendarPageRoutingModule
  ],
  declarations: [ConfirmationCalendarPage]
})
export class ConfirmationCalendarPageModule {}
