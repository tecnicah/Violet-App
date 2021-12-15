import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoveInPageRoutingModule } from './move-in-routing.module';

import { MoveInPage } from './move-in.page';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoveInPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [MoveInPage]
})
export class MoveInPageModule {}
