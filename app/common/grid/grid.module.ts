import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridHeadCellComponent, GridHeadComponent } from './grid-head';
import { GridComponent } from './grid.component';

@NgModule({
  imports: [CommonModule],
  exports: [GridComponent],
  declarations: [GridHeadCellComponent, GridHeadComponent, GridComponent],
  providers: [],
})
export class GridModule { }

