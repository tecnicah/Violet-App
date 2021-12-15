import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhyPremierPageRoutingModule } from './why-premier-routing.module';

import { WhyPremierPage } from './why-premier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhyPremierPageRoutingModule
  ],
  declarations: [WhyPremierPage]
})
export class WhyPremierPageModule {}
