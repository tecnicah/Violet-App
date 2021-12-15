import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsDialogPageRoutingModule } from './documents-dialog-routing.module';

import { DocumentsDialogPage } from './documents-dialog.page';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsDialogPageRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgxFileDropModule,
    MatSelectModule
  ],
  declarations: [DocumentsDialogPage]
})
export class DocumentsDialogPageModule {}
