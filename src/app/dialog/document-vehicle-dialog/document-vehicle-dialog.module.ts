import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentVehicleDialogPageRoutingModule } from './document-vehicle-dialog-routing.module';

import { DocumentVehicleDialogPage } from './document-vehicle-dialog.page';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxFileDropModule,
    DocumentVehicleDialogPageRoutingModule
  ],
  declarations: [DocumentVehicleDialogPage]
})
export class DocumentVehicleDialogPageModule {}
