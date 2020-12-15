import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-movie',
  templateUrl: './about-movie.component.html',
  styleUrls: ['./about-movie.component.css']
})
export class AboutMovieComponent implements OnInit {
  movies = [];
  cast=[];
  crew=[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies() {
    this.movies.push(
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action',descrip:'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts. Doctor Strange serves as the Sorcerer Supreme, the primary protector of Earth against magical and mystical threats. Inspired by stories of black magic and Chandu the Magician, Strange was created during the Silver Age of Comic Books to bring a different kind of character and themes of mysticism to Marvel Comics.',createDate:"2nd Mar '19",duration:'2 hrs'},  
    );

    this.cast.push(
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'}

    )

    this.crew.push(
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},

    )
  }

}
