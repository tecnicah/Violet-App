import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceRatingPageRoutingModule } from './service-rating-routing.module';

import { ServiceRatingPage } from './service-rating.page';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceRatingPageRoutingModule,
    BarRatingModule
  ],
  declarations: [ServiceRatingPage]
})
export class ServiceRatingPageModule {}
