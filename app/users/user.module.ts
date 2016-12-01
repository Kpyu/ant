import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { SelfCommonModule } from '../common';
import { GridModule } from '../common/grid';
import { UserListComponent } from './user-list';
import { UserRoutingModule } from './user.routing';

@NgModule({
  imports: [CommonModule, UserRoutingModule, GridModule],
  exports: [],
  declarations: [UserListComponent],
  providers: [],
})
export class UserModule { }
