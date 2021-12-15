import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpSettingsPage } from './help-settings.page';

const routes: Routes = [
  {
    path: '',
    component: HelpSettingsPage
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'compliance-policies',
    loadChildren: () => import('./compliance-policies/compliance-policies.module').then( m => m.CompliancePoliciesPageModule)
  },
  {
    path: 'why-premier',
    loadChildren: () => import('./why-premier/why-premier.module').then( m => m.WhyPremierPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpSettingsPageRoutingModule {}
