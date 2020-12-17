import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { AlertService } from '../../services/alert.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies = [];
  comingSoon = [];
  allMovies = [];

  constructor( 
    private router: Router,  
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private alertService: AlertService) { 
    
  }

  ngOnInit(): void {
    this.getMovies();
  }

  logout() {
    //Log Out Func
  }



  getMovies() {
    this.movies.push(
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
    );

    this.comingSoon.push(
      {title: 'THE MAURITANIAN', src: 'https://www.joblo.com/assets/images/joblo/posters/2020/12/mauratanian-jodie-foster-benedict-cumberbatch-drama_thumb.jpg', genre: 'Drama'},
      {title: 'THE MAURITANIAN', src: 'https://www.joblo.com/assets/images/joblo/posters/2020/12/mauratanian-jodie-foster-benedict-cumberbatch-drama_thumb.jpg', genre: 'Drama'},
      {title: 'THE MAURITANIAN', src: 'https://www.joblo.com/assets/images/joblo/posters/2020/12/mauratanian-jodie-foster-benedict-cumberbatch-drama_thumb.jpg', genre: 'Drama'},
      {title: 'THE MAURITANIAN', src: 'https://www.joblo.com/assets/images/joblo/posters/2020/12/mauratanian-jodie-foster-benedict-cumberbatch-drama_thumb.jpg', genre: 'Drama'},
      {title: 'THE MAURITANIAN', src: 'https://www.joblo.com/assets/images/joblo/posters/2020/12/mauratanian-jodie-foster-benedict-cumberbatch-drama_thumb.jpg', genre: 'Drama'},
      {title: 'THE MAURITANIAN', src: 'https://www.joblo.com/assets/images/joblo/posters/2020/12/mauratanian-jodie-foster-benedict-cumberbatch-drama_thumb.jpg', genre: 'Drama'}
    );

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
