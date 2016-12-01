import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'grid-pagination',
  providers: [],
  templateUrl: './pagination.component.html',
  styleUrls: [],
})
export class GridPaginationComponent {
  @Output() public pageChanged: EventEmitter<any> = new EventEmitter();

  @Input()
  get pageConfig(): any {
    return this._pageConfig;
  }
  set pageConfig(config: any) {
    this._pageConfig = config;
    this.pages = Math.ceil(this._pageConfig.total / this._pageConfig.pageSize);
  }
  private _pageConfig: any;
  public pages: number;
  constructor() { }
  @HostListener('pageChanged', ['$event'])
  public onChangePage(event: any): void {
    this.pageChanged.emit({ paging: event });
  }
  goToPage(pageNumber: number) {
    console.log(`gotoPage---${pageNumber}`);
    // this.pageChanged.emit({ paging: event });
  }
  prev() {
    this.pageConfig.currentPage--;
  }
  next() {
    this.pageConfig.currentPage++;
  }
}
