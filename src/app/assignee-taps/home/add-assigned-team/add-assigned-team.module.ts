import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAssignedTeamPageRoutingModule } from './add-assigned-team-routing.module';

import { AddAssignedTeamPage } from './add-assigned-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAssignedTeamPageRoutingModule
  ],
  declarations: [AddAssignedTeamPage]
})
export class AddAssignedTeamPageModule {}
