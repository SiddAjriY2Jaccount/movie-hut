import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  moviesUrl: string;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public userObject: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) 
  {
    this.moviesUrl = `${environment.apiUrl}/movies`
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  getAll() {
    return this.http.get(this.moviesUrl);
  }

  getMovieById(id: string) {
    console.log(`GET Request to API: ${this.moviesUrl}/${id}`);
    this.userObject = JSON.parse(localStorage.getItem('user'));
    //console.log(`Bearer ${this.userObject.token}`)
    return this.http.get<User>(`${this.moviesUrl}/${id}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.userObject.token}`,
    })});
    /* , {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.userObject.token}`,
    })} */
  }

}
