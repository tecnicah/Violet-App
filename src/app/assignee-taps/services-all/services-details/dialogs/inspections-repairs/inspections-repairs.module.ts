import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionsRepairsPageRoutingModule } from './inspections-repairs-routing.module';

import { InspectionsRepairsPage } from './inspections-repairs.page';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionsRepairsPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [InspectionsRepairsPage]
})
export class InspectionsRepairsPageModule {}
