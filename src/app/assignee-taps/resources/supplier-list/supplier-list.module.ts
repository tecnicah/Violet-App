import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierListPageRoutingModule } from './supplier-list-routing.module';

import { SupplierListPage } from './supplier-list.page';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierListPageRoutingModule,
    FilterPipeModule,
    MatIconModule
  ],
  declarations: [SupplierListPage]
})
export class SupplierListPageModule {}
