import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentProfileDocumentPageRoutingModule } from './document-profile-document-routing.module';

import { DocumentProfileDocumentPage } from './document-profile-document.page';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxFileDropModule,
    DocumentProfileDocumentPageRoutingModule
  ],
  declarations: [DocumentProfileDocumentPage]
})
export class DocumentProfileDocumentPageModule {}
