import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AlertService } from '../../services/alert.service';
import { BookingService } from '../../services/booking.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  movieId: any;
  movieItem: any;
  language: string;
  cast: any = [];
  seats_left: any;
  seatsArray: any = [];
  ticketPrice: number;
  totalcost: number;
  seatsToBook: number;
  date: string;
  dateWithFormat: Date;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private movieService: MovieService,
    private alertService: AlertService,
    private bookingService: BookingService
    ) {

    let idFromUrl = this.route.snapshot.paramMap.get('id');
    this.movieId = idFromUrl;
   
  }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    
    // Make API Request to GET movie details by ID by utilising Service
    this.movieService.getMovieById(this.movieId)
      .subscribe((res: any) => {
        console.log(res);
        this.movieItem = res;
        this.language = this.movieItem.language;
        this.seats_left = this.movieItem.seats_left;
        this.seatsArray = Array(this.seats_left).fill(1).map((x, i) => i + 1);
        console.log(this.seatsArray);
        this.dateWithFormat = new Date(this.movieItem.createdDate);
        // adjust 0 before single digit date
        let date = ("0" + (this.dateWithFormat).getDate()).slice(-2);
        // current month
        let month = ("0" + ((this.dateWithFormat).getMonth() + 1)).slice(-2);
        // current year
        let year = (this.dateWithFormat).getFullYear();
        // prints date in YYYY-MM-DD format
        this.date = year + "-" + month + "-" + date;
        this.cast = this.movieItem.cast.split(",");      
      });
      
    //this.cast = this.movieItem.cast.split(",");
    //console.log(this.cast);


  }

  setNoOfSeats(value: any) {
    this.seatsToBook = parseInt(value);
    console.log(this.seatsToBook);

    if (this.ticketPrice && this.seatsToBook) {
      this.totalcost = this.ticketPrice * this.seatsToBook;
    }
  }

  setSeatType(value: number) {
    this.ticketPrice = value;
    console.log(this.ticketPrice);

    if (this.seatsToBook && this.ticketPrice) {
      this.totalcost = this.ticketPrice * this.seatsToBook;
    }
  }

  bookSeats() {
    if (!this.seatsToBook || !this.ticketPrice) {
      alert("Please select number of seats/ticket price.")
    }

    if (this.seatsToBook > this.seats_left) {
      alert(`${this.seatsToBook} Seats are unavailable. Currently available: ${this.seats_left} seats.`)
    }

    // Make API Request to POST movie ID, User ID, ticketPrice and seatsToBook by utilising Booking Service
    this.bookingService.makeBooking(this.movieId, this.seatsToBook, this.ticketPrice)
      .subscribe((res: any) => {
        console.log(res);
        if (res.success == "truee") {
          alert(`Booking Successful`);
          this.router.navigate(['/mybookings']);
        }

        else if (res.success == "false") {
          alert(`Booking Failed. Error: ${res.message}`);
        }           
           
      });
  }

}
