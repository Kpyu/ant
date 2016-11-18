import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from './common';
import { UserListComponent } from './users';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: UserListComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
  ],
  providers: [],
  declarations: [
    UserListComponent,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
