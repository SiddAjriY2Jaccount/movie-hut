import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { AlertService } from '../../services/alert.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies = [];
  comingSoon = [];
  allMovies = [];

  constructor(private router: Router,  
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.movieService.getAll()
      .subscribe((res: any) => {
        //console.log(res);
        for (let obj in res) {
          if (res.hasOwnProperty(obj)) {
            let item = res[obj];
            //console.log(item);
            this.allMovies.push(item);
          }
        }
        console.log(this.allMovies);
      });
  }

  onSelect(item: any) {
    let user = localStorage.getItem("user");
    if (user) {
      this.router.navigate(['/movies', item.id]);
    }
    else {
      alert("You must Login to proceed!");
    }
  }  

}
