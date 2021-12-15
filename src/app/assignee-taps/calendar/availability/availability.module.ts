import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailabilityPageRoutingModule } from './availability-routing.module';

import { AvailabilityPage } from './availability.page';
import { MatIconModule } from '@angular/material/icon';
import { MbscModule } from '@mobiscroll/angular';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MbscModule,
    AvailabilityPageRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  declarations: [AvailabilityPage]
})
export class AvailabilityPageModule {}
