import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractDetailsPageRoutingModule } from './contract-details-routing.module';

import { ContractDetailsPage } from './contract-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractDetailsPageRoutingModule
  ],
  declarations: [ContractDetailsPage]
})
export class ContractDetailsPageModule {}
