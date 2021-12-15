import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcesPage } from './resources.page';

const routes: Routes = [
  {
    path: '',
    component: ResourcesPage
  },
  {
    path: 'country-city-info',
    loadChildren: () => import('./country-city-info/country-city-info.module').then( m => m.CountryCityInfoPageModule)
  },
  {
    path: 'translate',
    loadChildren: () => import('./translate/translate.module').then( m => m.TranslatePageModule)
  },
  {
    path: 'supplier-list',
    loadChildren: () => import('./supplier-list/supplier-list.module').then(m => m.SupplierListPageModule)
  },
  {
    path: 'currency-exchange',
    loadChildren: () => import('./currency-exchange/currency-exchange.module').then( m => m.CurrencyExchangePageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'time-zone',
    loadChildren: () => import('./time-zone/time-zone.module').then( m => m.TimeZonePageModule)
  },
  {
    path: 'unit-converter',
    loadChildren: () => import('./unit-converter/unit-converter.module').then( m => m.UnitConverterPageModule)
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then( m => m.WeatherPageModule)
  },
  {
    path: 'supplier-partner-service/:id',
    loadChildren: () => import('./supplier-partner-service/supplier-partner-service.module').then( m => m.SupplierPartnerServicePageModule)
  },
  {
    path: 'supplier-partner-consultant/:id',
    loadChildren: () => import('./supplier-partner-consultant/supplier-partner-consultant.module').then( m => m.SupplierPartnerConsultantPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesPageRoutingModule {}
