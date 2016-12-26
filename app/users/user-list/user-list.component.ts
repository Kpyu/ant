import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../../common/api';
import { User } from '../../models';

// import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: 'user-list',
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html',
    providers: [UserService],
    // styleUrls: ['view-list.component.css'],
})
export class UserListComponent implements OnInit {
    private searchTerms = new Subject<string>();
    usersCopy: User[];
    users: Observable<User[]>;
    sorts: any[];
    columns: any[];
    public userPageConfig: any;
    constructor(
        private api: UserService
    ) {
        this.sorts = [{ sortValue: 'id', sortType: 'ASC' }];
        this.columns = [
            {
                label: '用户ID',
                key: 'id',
            }, {
                label: 'Email',
                key: 'email',
            }, {
                label: '用户名',
                key: 'name',
            }, {
                label: '手机号',
                key: 'phone',
            },
        ];
        this.userPageConfig = {
            currentPage: 1,
            total: 0,
            pageSize: 10,
            pageWidth: 5,
        };
    };

    ngOnInit(): void {
        this.users = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            // .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap((term) => {
                console.log(term);
                if (term) {
                    return this.api.searchUser(term);
                }
                return Observable.of<User[]>([]);
            })
            .catch(error => {
                console.log(error);
                return Observable.of<User[]>([]);
            });
    }
    search(params: any): void {
        this.api
            .getUseList(params)
            .then((users) => {
                this.usersCopy = users;
                this.userPageConfig.total = 400;
            });
    }
    doSearch(): void {
        this.search({});
    }
    onGridLoad($event) {
        const { params } = $event;
        console.log(`获取搜索参数${JSON.stringify(params)}`);
        this.search(params);
    }
    addUser($event): void {

    }
}
