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
export class BookingService {

  authToken: any;

  //private registerUrl:string = "/users/register";
  //private authUrl:string = "/users/authenticate";
  //private profileUrl:string = "/users/profile";

  private bookingUrl: string;
  public userObject: any;
  
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router,
    private http: HttpClient) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
      this.bookingUrl = `${environment.apiUrl}/bookings`;
     }

  makeBooking(movieId: string, seatsToBook: number, ticketPrice: number) {

    console.log(movieId);
    console.log(`POST Request to API: ${this.bookingUrl}/register`);
    this.userObject = JSON.parse(localStorage.getItem('user'));
    //console.log(`Bearer ${this.userObject.token}`)
    return this.http.post<User>(
      `${this.bookingUrl}/register`, 
      {
        bookedBy: this.userObject.id,
        movieBooked: movieId,
        ticket_price: ticketPrice,
        seats: seatsToBook      
      }, 
    {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.userObject.token}`,
    })});

  }

  getBookingsForCurrentUser() {
    console.log(`POST Request to API: ${this.bookingUrl}/register`);
    this.userObject = JSON.parse(localStorage.getItem('user'));

    return this.http.get<User>(
      `${this.bookingUrl}/user/${this.userObject.id}`, {headers: new HttpHeaders({
      'Authorization': `Bearer ${this.userObject.token}`,
    })});
    
  }

}
