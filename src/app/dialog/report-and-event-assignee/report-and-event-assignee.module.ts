import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportAndEventAssigneePageRoutingModule } from './report-and-event-assignee-routing.module';

import { ReportAndEventAssigneePage } from './report-and-event-assignee.page';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportAndEventAssigneePageRoutingModule,
    NgxPermissionsModule.forRoot()
  ],
  declarations: [ReportAndEventAssigneePage]
})
export class ReportAndEventAssigneePageModule {}
