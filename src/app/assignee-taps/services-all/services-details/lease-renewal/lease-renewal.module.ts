import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaseRenewalPageRoutingModule } from './lease-renewal-routing.module';

import { LeaseRenewalPage } from './lease-renewal.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaseRenewalPageRoutingModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
    NgxPermissionsModule.forRoot(),
    MatExpansionModule
  ],
  declarations: [LeaseRenewalPage]
})
export class LeaseRenewalPageModule {}
