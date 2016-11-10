import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
  Input,
  Output,
} from '@angular/core';
@Component({
  moduleId: 'sider-bar',
  selector: 'sider-bar',
  templateUrl: 'siderBar-component.html',
  animations: [
    trigger('siderBarState',
      [
        state('inactive',
          style({
            width: '0',
          })
        ),
        state('active', style({
          width: '230px',
        })),
        transition('inactive=>active', animate('100ms ease-in')),
        transition('active=>inactive', animate('100ms ease-out')),
      ]),
  ],
})
export class SiderBarComponent implements OnInit {

  @Input() state: string;
  constructor() { }
  ngOnInit() {
  }
}
