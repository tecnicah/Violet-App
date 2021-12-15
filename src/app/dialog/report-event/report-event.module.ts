import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportEventPageRoutingModule } from './report-event-routing.module';

import { ReportEventPage } from './report-event.page';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportEventPageRoutingModule,
    NgxPermissionsModule.forRoot()
  ],
  declarations: [ReportEventPage]
})
export class ReportEventPageModule {}
