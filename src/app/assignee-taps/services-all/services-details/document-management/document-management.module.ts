import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentManagementPageRoutingModule } from './document-management-routing.module';

import { DocumentManagementPage } from './document-management.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgFallimgModule } from 'ng-fallimg';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    DocumentManagementPageRoutingModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
    NgxPermissionsModule.forRoot()
  ],
  declarations: [DocumentManagementPage]
})
export class DocumentManagementPageModule {}
