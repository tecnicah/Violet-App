import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrencyExchangePageRoutingModule } from './currency-exchange-routing.module';

import { CurrencyExchangePage } from './currency-exchange.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencyExchangePageRoutingModule
  ],
  declarations: [CurrencyExchangePage]
})
export class CurrencyExchangePageModule {}
