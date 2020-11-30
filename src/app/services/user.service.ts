import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(`${environment.apiBaseUrl}/users`);
  }

  createUser(user: User) {
    return this.http.post(`${environment.apiBaseUrl}/users`, user);
  }

  updateUser(user: User) {
    return this.http.put(`${environment.apiBaseUrl}/users/${user.id}`, user);
  }

  findUser(userId: number) {
    return this.http.get(`${environment.apiBaseUrl}/users/${userId}`);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/users/${userId}`);
  }
}
