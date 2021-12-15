import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestAdditionalTimePageRoutingModule } from './request-additional-time-routing.module';

import { RequestAdditionalTimePage } from './request-additional-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestAdditionalTimePageRoutingModule
  ],
  declarations: [RequestAdditionalTimePage]
})
export class RequestAdditionalTimePageModule {}
