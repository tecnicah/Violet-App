import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenewalDetailsPageRoutingModule } from './renewal-details-routing.module';

import { RenewalDetailsPage } from './renewal-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenewalDetailsPageRoutingModule
  ],
  declarations: [RenewalDetailsPage]
})
export class RenewalDetailsPageModule {}
