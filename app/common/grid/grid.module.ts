import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridComponent } from './grid.component';
import { GridPaginationComponent } from './pagination.component';

import { NumberToArrayPipe } from '../pipes';
@NgModule({
  imports: [CommonModule],
  exports: [GridComponent, GridPaginationComponent],
  declarations: [GridComponent, GridPaginationComponent, NumberToArrayPipe],
  providers: [],
})
export class GridModule { }

