import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsPageRoutingModule,
    MatExpansionModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    })
  ],
  declarations: [DocumentsPage]
})
export class DocumentsPageModule {}
