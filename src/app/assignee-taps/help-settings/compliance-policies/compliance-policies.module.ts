import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompliancePoliciesPageRoutingModule } from './compliance-policies-routing.module';

import { CompliancePoliciesPage } from './compliance-policies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompliancePoliciesPageRoutingModule
  ],
  declarations: [CompliancePoliciesPage]
})
export class CompliancePoliciesPageModule {}
