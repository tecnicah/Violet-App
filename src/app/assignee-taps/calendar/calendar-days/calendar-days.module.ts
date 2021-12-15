import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarDaysPageRoutingModule } from './calendar-days-routing.module';

import { CalendarDaysPage } from './calendar-days.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarDaysPageRoutingModule
  ],
  declarations: [CalendarDaysPage]
})
export class CalendarDaysPageModule {}
