import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelfCommonModule } from './common';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: './users/user.module#UserModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), SelfCommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
