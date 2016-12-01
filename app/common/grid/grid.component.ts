import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-grid',
    templateUrl: 'grid.component',
    styles: ['grid.component.css'],
})
export class GridComponent {

    @Input() set columns(val: any[]) {
        if (val) {
            this.setColumnDefaults(val);
            this.recalculateColumns(val);
        }
        this._columns = val;
    }
    get columns(): any[]{
        return this._columns = [];
    }
    @Input() sorts: any[] = [];
    @Input() source: string;
    @Input() sourceData: any;

    private _columns = [];
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

    loadGridData() {

    }
}
