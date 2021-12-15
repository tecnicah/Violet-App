import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryVisaPageRoutingModule } from './entry-visa-routing.module';

import { EntryVisaPage } from './entry-visa.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFallimgModule } from 'ng-fallimg';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    IonicModule,
    EntryVisaPageRoutingModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
    NgxPermissionsModule.forRoot()
  ],
  declarations: [EntryVisaPage]
})
export class EntryVisaPageModule {}
