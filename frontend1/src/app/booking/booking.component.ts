import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  movies=[];
  seats=[1,2,3,4,5,6,7,8,9,10];
  noOfSeats=0;
  seatType=0;
  amount=0.00;
  //Seat prices
  premium=299.00;
  recliner=399.00;
  classic=199.00;


  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    this.movies.push(
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action',createdDate:"2nd Mar '19",duration:'2 hrs'},  
    );
  }

  setNoOfSeats(){
    //bug
    this.noOfSeats=parseInt((<HTMLInputElement>document.getElementById("seatBtn")).value);
    //alert(this.noOfSeats);

  }

  setSeatType(){
   // this.seatType=
  }

  getBill(){
    //this.amount=this.seatType*this.noOfSeats;
    alert("Booking Successful for Rs."+this.amount);
    window.location.href = '#';
  }
}
