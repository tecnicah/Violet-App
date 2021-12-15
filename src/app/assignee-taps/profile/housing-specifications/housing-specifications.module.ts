import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HousingSpecificationsPageRoutingModule } from './housing-specifications-routing.module';

import { HousingSpecificationsPage } from './housing-specifications.page';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HousingSpecificationsPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [HousingSpecificationsPage]
})
export class HousingSpecificationsPageModule {}
