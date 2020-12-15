import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit {
  movies=[];
  theatres=[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getTheatres();
  }

  getTheatres(){
    this.movies.push(
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Avatar', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Final Destination', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Tenet', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Fantastic Beasts', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Marshmallow', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Holiday', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Wednesday', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
      {title: 'Princess Switch', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action'},
     
    );
    this.theatres.push(
      {title:'INOX',src:'',movies:{title:'Avatar',src:'',genre:'Drama/Mystery'}},
      {title:'INOX',src:'',movies:{title:'Avatar',src:'',genre:'Drama/Mystery'}},
      {title:'INOX',src:'',movies:{title:'Avatar',src:'',genre:'Drama/Mystery'}},
      {title:'INOX',src:'',movies:{title:'Avatar',src:'',genre:'Drama/Mystery'}},
      {title:'INOX',src:'',movies:{title:'Avatar',src:'',genre:'Drama/Mystery'}},
      {title:'INOX',src:'',movies:{title:'Avatar',src:'',genre:'Drama/Mystery'}},
      {title:'INOX',src:'',movies:{title:'Avatar',src:'',genre:'Drama/Mystery'}}
    );
  }

}
