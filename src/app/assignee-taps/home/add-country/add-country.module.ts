import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCountryPageRoutingModule } from './add-country-routing.module';

import { AddCountryPage } from './add-country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCountryPageRoutingModule
  ],
  declarations: [AddCountryPage]
})
export class AddCountryPageModule {}
