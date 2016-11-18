import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise'; // 添加支持toPromise方法

import { User } from '../../models';


@Injectable()
export class UserService {

  private apiUrl: string = '/admin/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  /**
   * 查询用户列表
   * 
   * @param {*} params
   * @returns
   * 
   * @memberOf DataService
   */
  getUseList(params: any): Promise<User[]> {
    return this.http.get('/app/users')//`${this.apiUrl}/getUseList/users`)
      .toPromise()
      .then((response: Response) => response.json().data as User[])
      .catch(this.handleError);
  }
  /**
   * 更新用户
   * 
   * @param {string} id 用户id
   * @returns {Promise<User[]>}
   * 
   * @memberOf UserService
   */
  updateUseById(id: string): Promise<User[]> {
    return this.http.get(`${this.apiUrl}/getUseList`)
      .toPromise()
      .then((response: Response) => response.json().data as User[])
      .catch(this.handleError);
  }
  /**
   * 搜索用户
   * 
   * @param {*} params 搜索参数
   * @returns {Observable<User[]>}
   * 
   * @memberOf UserService
   */
  // searchUser(params: any): Observable<User[]>
  searchUser(term: string): Observable<User[]> {
    console.log('search user');
    return this.http.get('/app/users') // `${this.apiUrl}/getUseList?param=${term}`)
      .map((res: Response) => {
        console.log(res.json().data);
        return res.json().data as User[];
      });
  }
};
