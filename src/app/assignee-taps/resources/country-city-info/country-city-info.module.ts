import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryCityInfoPageRoutingModule } from './country-city-info-routing.module';

import { CountryCityInfoPage } from './country-city-info.page';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryCityInfoPageRoutingModule,
    MatExpansionModule,
  ],
  declarations: [CountryCityInfoPage]
})
export class CountryCityInfoPageModule {}
