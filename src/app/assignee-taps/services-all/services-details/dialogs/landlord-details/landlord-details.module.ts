import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandlordDetailsPageRoutingModule } from './landlord-details-routing.module';

import { LandlordDetailsPage } from './landlord-details.page';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    LandlordDetailsPageRoutingModule
  ],
  declarations: [LandlordDetailsPage]
})
export class LandlordDetailsPageModule {}
