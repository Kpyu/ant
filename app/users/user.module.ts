import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { SelfCommonModule } from '../common';
import { UserListComponent } from './user-list';
import { UserRoutingModule } from './user.routing';

@NgModule({
  imports: [ CommonModule, UserRoutingModule],
  exports: [],
  declarations: [UserListComponent],
  providers: [],
})
export class UserModule { }
