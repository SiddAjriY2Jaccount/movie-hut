import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AlertService } from '../../services/alert.service';
import { BookingService } from '../../services/booking.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {

  bookings = [];
  userObject: any;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private movieService: MovieService,
    private alertService: AlertService,
    private bookingService: BookingService) {

     }

  ngOnInit(): void {
    this.userObject = JSON.parse(localStorage.getItem('user'));
    this.getBookingsForUser();
  }

  getBookingsForUser() {
    // Make API Request to GET bookings for current user by utilising Booking Service
    this.bookingService.getBookingsForCurrentUser()
      .subscribe((res: any) => {
        console.log(res);
        /* if (res.success == "truee") {
          alert(`Booking Successful`);
          this.router.navigate(['/mybookings']);
        }

        else if (res.success == "false") {
          alert(`Booking Failed. Error: ${res.message}`);
        } */           
        for(let i = 0; i < res.length; i++) {
          this.bookings.push(res[i]);
        }

      });
  }

}
