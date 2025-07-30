import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { UserParams, UsersResponse } from './users.store';
import { delay, Observable } from 'rxjs';
import { User } from '../../pages/admin-dashboard/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}
  http = inject(HttpClient);

  getUsers(params: UserParams) {
    return this.http
      .get<UsersResponse>(`${environment.apiUrl}/users`, {
        params: this.getParams(params),
      })
      .pipe(delay(200));
  }

  getParams(params: UserParams) {
    let httpParams = new HttpParams();

    httpParams = httpParams.set('limit', params.limit);
    httpParams = httpParams.set('start', params.start);

    if (params.firstName) {
      httpParams = httpParams.set('firstName', params.firstName);
    }
    if (params.lastName) {
      httpParams = httpParams.set('lastName', params.lastName);
    }
    if (params.gender) {
      httpParams = httpParams.set('gender', params.gender);
    }
    if (params.job) {
      httpParams = httpParams.set('job', params.job);
    }
    if (params.date) {
      httpParams = httpParams.set('date', params.date);
    }
    if (params.keyword) {
      httpParams = httpParams.set('keyword', params.keyword);
    }
    if (params.archived) {
      httpParams = httpParams.set('archived', params.archived);
    }
    console.log(httpParams);
    return httpParams;
  }

  createUser(user: Omit<User, 'id'>) {
    return this.http.post(`${environment.apiUrl}/users`, user).pipe(delay(200));
  }

  editUser(user: Omit<User, 'id'>, id: number) {
    return this.http.put(`${environment.apiUrl}/${id}`, user).pipe(delay(200));
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/${id}`).pipe(delay(200));
  }
}
