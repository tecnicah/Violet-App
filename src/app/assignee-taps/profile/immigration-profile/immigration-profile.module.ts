import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImmigrationProfilePageRoutingModule } from './immigration-profile-routing.module';

import { ImmigrationProfilePage } from './immigration-profile.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImmigrationProfilePageRoutingModule,
    MatExpansionModule,
    MatRadioModule
  ],
  declarations: [ImmigrationProfilePage]
})
export class ImmigrationProfilePageModule {}
