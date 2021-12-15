import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportOfTheDayPageRoutingModule } from './report-of-the-day-routing.module';

import { ReportOfTheDayPage } from './report-of-the-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportOfTheDayPageRoutingModule
  ],
  declarations: [ReportOfTheDayPage]
})
export class ReportOfTheDayPageModule {}
