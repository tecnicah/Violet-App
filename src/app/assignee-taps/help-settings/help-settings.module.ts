import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpSettingsPageRoutingModule } from './help-settings-routing.module';

import { HelpSettingsPage } from './help-settings.page';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpSettingsPageRoutingModule,
    MatRippleModule
  ],
  declarations: [HelpSettingsPage]
})
export class HelpSettingsPageModule {}
