import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  authToken: any;

  //private registerUrl:string = "/users/register";
  //private authUrl:string = "/users/authenticate";
  //private profileUrl:string = "/users/profile";

  private url:string = `${environment.apiUrl}`;
  private registerUrl:string = `${this.url}/users/register`;
  private authUrl:string = `${this.url}/users/authenticate`;
  //private profileUrl:string = "http://localhost:8080/users/profile";

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
      return this.userSubject.value;
  }

  login(email, password) {
      return this.http.post<User>(this.authUrl, { email, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              console.log(user);
              this.userSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/']);
  }

  register(user: User) {
      return this.http.post(this.registerUrl, user);
  }

  getAll() {
      return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
      return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  update(id, params) {
      return this.http.put(`${environment.apiUrl}/users/${id}`, params)
          .pipe(map(x => {
              // update stored user if the logged in user updated their own record
              if (id == this.userValue.id) {
                  // update local storage
                  const user = { ...this.userValue, ...params };
                  localStorage.setItem('user', JSON.stringify(user));

                  // publish updated user to subscribers
                  this.userSubject.next(user);
              }
              return x;
          }));
  }

  delete(id: string) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`)
          .pipe(map(x => {
              // auto logout if the logged in user deleted their own record
              if (id == this.userValue.id) {
                  this.logout();
              }
              return x;
          }));
  }

  loadToken() {
    let token = localStorage.getItem('user');
    this.authToken = token;
    return this.authToken;
  }
}