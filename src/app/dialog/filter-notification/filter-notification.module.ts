import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterNotificationPageRoutingModule } from './filter-notification-routing.module';

import { FilterNotificationPage } from './filter-notification.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterNotificationPageRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule
  ],
  declarations: [FilterNotificationPage]
})
export class FilterNotificationPageModule {}
