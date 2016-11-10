import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';


export function remove(elem: string, arr: Array<string>) {
  for (let i = 0; i < arr.length; i++) {
    if (elem === arr[i]) {
      arr.splice(i, 1);
    }
  }
}



@Component({
  moduleId: 'app-header',
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() collapse: boolean;
  @Output() onCollpase = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {

  }
  doCollapse() {
    console.log(document.body.className);
    var classNames = document.body.className.split(' ');
    if (classNames.indexOf('sidebar-collapse') >= 0) {
      remove('sidebar-collapse', classNames);
      this.onCollpase.emit(true);
    } else {
      classNames.push('sidebar-collapse');
      this.onCollpase.emit(false);
    }
    document.body.className = classNames.join(' ');
  }
}
