import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherImmigrationPageRoutingModule } from './other-immigration-routing.module';

import { OtherImmigrationPage } from './other-immigration.page';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgFallimgModule } from 'ng-fallimg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherImmigrationPageRoutingModule,
    NgFallimgModule.forRoot({
      default: './assets/gris.png',
      avatar:  './assets/avatar.svg',
    }),
    NgxPermissionsModule.forRoot()
  ],
  declarations: [OtherImmigrationPage]
})
export class OtherImmigrationPageModule {}
