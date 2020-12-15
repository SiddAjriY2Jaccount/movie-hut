import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies = [];
  comingSoon = [];

  constructor(private router: Router) { 
    
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
  }

}
