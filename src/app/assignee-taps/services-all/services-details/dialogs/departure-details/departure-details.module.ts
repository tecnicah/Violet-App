import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartureDetailsPageRoutingModule } from './departure-details-routing.module';

import { DepartureDetailsPage } from './departure-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartureDetailsPageRoutingModule
  ],
  declarations: [DepartureDetailsPage]
})
export class DepartureDetailsPageModule {}
