import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssigneeTapsPageRoutingModule } from './assignee-taps-routing.module';

import { AssigneeTapsPage } from './assignee-taps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssigneeTapsPageRoutingModule
  ],
  declarations: [AssigneeTapsPage]
})
export class AssigneeTapsPageModule {}
