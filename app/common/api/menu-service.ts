import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { MenuItem } from '../../models';

@Injectable()
export class MenuService {
  private apiUrl: string = '/admin/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  /**
   * 查询菜单列表
   */
  getMenus(): Promise<MenuItem[]> {
    return this.http.get(`${this.apiUrl}/getMenus`, { headers: this.headers })//`${this.apiUrl}/getUseList/users`)
      .toPromise()
      .then((response: Response) => response.json().data as MenuItem[])
      .catch(this.handleError);
  }
};
