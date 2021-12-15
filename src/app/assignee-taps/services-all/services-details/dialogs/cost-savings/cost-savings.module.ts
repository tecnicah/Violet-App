import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostSavingsPageRoutingModule } from './cost-savings-routing.module';

import { CostSavingsPage } from './cost-savings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostSavingsPageRoutingModule
  ],
  declarations: [CostSavingsPage]
})
export class CostSavingsPageModule {}
