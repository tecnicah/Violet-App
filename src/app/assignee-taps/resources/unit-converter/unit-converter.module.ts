import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitConverterPageRoutingModule } from './unit-converter-routing.module';

import { UnitConverterPage } from './unit-converter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnitConverterPageRoutingModule
  ],
  declarations: [UnitConverterPage]
})
export class UnitConverterPageModule {}
