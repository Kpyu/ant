import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { GridModule } from '../common/grid';
import { UserListComponent } from './user-list';
import { UserRoutingModule } from './user.routing';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [CommonModule, UserRoutingModule, GridModule],
  exports: [],
  declarations: [UserListComponent,
    UserEditComponent
],
  providers: [],
})
export class UserModule { }
