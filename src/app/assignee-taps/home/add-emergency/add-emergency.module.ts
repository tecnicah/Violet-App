import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmergencyPageRoutingModule } from './add-emergency-routing.module';

import { AddEmergencyPage } from './add-emergency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEmergencyPageRoutingModule
  ],
  declarations: [AddEmergencyPage]
})
export class AddEmergencyPageModule {}
