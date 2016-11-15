import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';

const users: Array<any> = [
  { name: '张三', email: '123@qq.com', id: '1'},
  { name: '张三', email: '123@qq.com', id: '2'},
  { name: '张三', email: '123@qq.com', id: '3'},
  { name: '张三', email: '123@qq.com', id: '4'},
  { name: '张三', email: '123@qq.com', id: '5'},
  { name: '张三', email: '123@qq.com', id: '6'},
]

@Component({
  // moduleId: 'user-list',
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  // styleUrls: ['view-list.component.css'],
})
export class UserListComponent implements OnInit {
  ngOnInit() {

  }
}
