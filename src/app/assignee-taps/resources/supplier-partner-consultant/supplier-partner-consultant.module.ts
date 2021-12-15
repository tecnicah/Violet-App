import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierPartnerConsultantPageRoutingModule } from './supplier-partner-consultant-routing.module';

import { SupplierPartnerConsultantPage } from './supplier-partner-consultant.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFallimgModule } from 'ng-fallimg';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatRippleModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
    SupplierPartnerConsultantPageRoutingModule
  ],
  declarations: [SupplierPartnerConsultantPage]
})
export class SupplierPartnerConsultantPageModule {}
