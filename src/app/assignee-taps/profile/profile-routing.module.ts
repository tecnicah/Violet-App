import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'housing-specifications',
    loadChildren: () => import('./housing-specifications/housing-specifications.module').then( m => m.HousingSpecificationsPageModule)
  },
  {
    path: 'immigration-profile',
    loadChildren: () => import('./immigration-profile/immigration-profile.module').then( m => m.ImmigrationProfilePageModule)
  },
  {
    path: 'add-dependent',
    loadChildren: () => import('./add-dependent/add-dependent.module').then( m => m.AddDependentPageModule)
  },
  {
    path: 'add-pet',
    loadChildren: () => import('./add-pet/add-pet.module').then( m => m.AddPetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
