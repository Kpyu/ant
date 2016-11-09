import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: UserListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  declarations: [
    UserListComponent
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }