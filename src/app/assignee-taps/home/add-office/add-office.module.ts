import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOfficePageRoutingModule } from './add-office-routing.module';

import { AddOfficePage } from './add-office.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOfficePageRoutingModule
  ],
  declarations: [AddOfficePage]
})
export class AddOfficePageModule {}
