import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddActivitieItemPageRoutingModule } from './add-activitie-item-routing.module';

import { AddActivitieItemPage } from './add-activitie-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddActivitieItemPageRoutingModule
  ],
  declarations: [AddActivitieItemPage]
})
export class AddActivitieItemPageModule {}
