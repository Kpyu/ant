import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'grid-pagination',
    providers: [],
    templateUrl: './pagination.component.html',
    styleUrls: [],
})
export class GridPaginationComponent {
    @Output() public gridChanged: EventEmitter<any> = new EventEmitter();
    @Input()
    get pageConfig(): any {
        return this._pageConfig;
    }
    set pageConfig(config: any) {
        this._pageConfig = config;
        this.pages = Math.ceil(this._pageConfig.total / this._pageConfig.pageSize);
    }
    get isFirst(): boolean {
        return this._pageConfig.currentPage <= 1;
    }
    get isLast(): boolean {
        return this._pageConfig.currentPage >= this.pages;
    }
    get hasPrev() {
        const { currentPage, pageWidth} = this.pageConfig;
        return currentPage / pageWidth > 1;
    }
    get hasNext() {
        const { currentPage, pageWidth} = this.pageConfig;
        return this.pages - currentPage > pageWidth;
    }

    private _pageConfig: any;
    public pages: number;
    constructor() { }
    @HostListener('pageChanged', ['$event'])
    public onChangePage(event: any): void {
        this.gridChanged.emit({ paging: event });
    }
    goToPage(pageNumber?: number) {
        console.log(`gotoPage---${pageNumber || this.pageConfig.currentPage}`);
        this.pageConfig.currentPage = pageNumber || this.pageConfig.currentPage;
        this.onChangePage({
            currentPage: this.pageConfig.currentPage,
            pageSize: this.pageConfig.pageSize
        });
    }
    prev() {
        if (!this.isFirst) {
            this.pageConfig.currentPage--;
        }
        this.goToPage();
    }
    prevList() {
        const { currentPage, pageWidth} = this.pageConfig;
        if (Math.floor(currentPage / pageWidth) * pageWidth === currentPage) {
            this.goToPage(Math.floor(currentPage / pageWidth - 2) * pageWidth + pageWidth);
        } else {
            this.goToPage(Math.floor(currentPage / pageWidth - 1) * pageWidth + pageWidth);
        }
    }
    next() {
        if (!this.isLast) {
            this.pageConfig.currentPage++;
        }
        this.goToPage();
    }
    nextList() {
        const { currentPage, pageWidth} = this.pageConfig;
        this.goToPage(Math.ceil(currentPage / pageWidth) * pageWidth + 1);
    }
}
