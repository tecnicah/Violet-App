import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterSupplierPageRoutingModule } from './filter-supplier-routing.module';

import { FilterSupplierPage } from './filter-supplier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterSupplierPageRoutingModule
  ],
  declarations: [FilterSupplierPage]
})
export class FilterSupplierPageModule {}
