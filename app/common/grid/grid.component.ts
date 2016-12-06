import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-grid',
    templateUrl: 'grid.component.html',
    styles: ['grid.component.css'],
})
export class GridComponent {
    @Output() public dataFetch: EventEmitter<any> = new EventEmitter();
    @Input() set columns(val: any[]) {
        if (val) {
            this.setColumnDefaults(val);
            this.recalculateColumns(val);
        }
        this._columns = val;
    }
    get columns(): any[] {
        return this._columns;
    }
    @Input() sorts: any[] = [];
    @Input() source: string;
    @Input() sourceData: any[];
    @Input() pageConfig: any;
    private _columns = [];
    constructor() { }
    setColumnDefaults(columns: any[]) {
        console.log('设置默认表头');
    }
    recalculateColumns(columns: any[]) {
        console.log('重置表头');
    }

    onColumnSort() {

    }

    loadColumn() {

    }

    loadGridData(params) {
        console.log('分页发生变化重新load数据');
        this.dataFetch.emit({ params })
    }
    onChangeGrid($event: any) {
        const { paging } = $event;
        this.loadGridData(paging);
    }
}
