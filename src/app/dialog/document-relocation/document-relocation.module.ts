import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentRelocationPageRoutingModule } from './document-relocation-routing.module';

import { DocumentRelocationPage } from './document-relocation.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentRelocationPageRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    NgxFileDropModule,
    MatSelectModule
  ],
  declarations: [DocumentRelocationPage]
})
export class DocumentRelocationPageModule {}
