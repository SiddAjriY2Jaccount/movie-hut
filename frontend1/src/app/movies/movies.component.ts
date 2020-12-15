import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
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
  }
}
