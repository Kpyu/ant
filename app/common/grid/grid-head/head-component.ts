import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    Renderer,
} from '@angular/core';
@Component({
    selector: 'app-grid-header',
    templateUrl: 'head.component.html',
    // styles: ['grid.component.css'],
})
export class GridHeadComponent {
    @Output() sort: EventEmitter<any> = new EventEmitter();
    @Output() rendered: EventEmitter<any> = new EventEmitter(); 
    @Input() sorts: any[];
    @Input() set columns(val: any[]) {
        this._columns = val;
    }
    get columns(): any[] {
        return this._columns;
    }
    private _columns: any[];

    constructor(element: ElementRef, renderer: Renderer) {
        renderer.setElementClass(element.nativeElement, 'datatable-header', true);
        this.rendered.emit({
            msg: '表头渲染完成',
        });
    }
    // 排序
    onSort({ column, prevValue, newValue }) {
        const sorts = this.calcSortType(column, prevValue, newValue);
        this.sort.emit({
            sorts,
            column,
            prevValue,
            newValue,
        });
    }
    calcSortType(column: any, prevValue: any, newValue: any) {
        let idx = 0;

        let sorts = this.sorts.map((s, i) => {
            s = Object.assign({}, s);
            if (s.prop === column.prop) { idx = i };
            return s;
        });

        if (newValue === undefined) {
            sorts.splice(idx, 1);
        } else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        return sorts;
    }
}
