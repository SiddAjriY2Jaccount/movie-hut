import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-about-movie',
  templateUrl: './about-movie.component.html',
  styleUrls: ['./about-movie.component.css']
})
export class AboutMovieComponent implements OnInit {
  movies = [];
  cast: any;
  crew = [];

  movieId: any;
  movieItem: any;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private movieService: MovieService,
    private alertService: AlertService
    ) { 
    let idFromUrl = this.route.snapshot.paramMap.get('id');
    this.movieId = idFromUrl;
    //console.log(this.movieId);
  }

  ngOnInit(): void {
    this.getMovie();
    //console.log(this.cast);
    /* console.log(this.movieItem.name);
    console.log(this.movieItem.cast);
    console.log(this.movieItem.description);
    console.log(this.movieItem.image_url);
    console.log(this.movieItem.cast);
    console.log(this.movieItem.director);
 */

  }
  getMovie() {
    this.movies.push(
      {title: 'IO', src: 'https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg', genre: 'Mystery/Action',descrip:'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts. Doctor Strange serves as the Sorcerer Supreme, the primary protector of Earth against magical and mystical threats. Inspired by stories of black magic and Chandu the Magician, Strange was created during the Silver Age of Comic Books to bring a different kind of character and themes of mysticism to Marvel Comics.',createDate:"2nd Mar '19",duration:'2 hrs'},  
    );

    /* this.cast.push(
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'},
      {name:'Brad Pitt',src:'https://www.gstatic.com/tv/thumb/persons/1366/1366_v9_bc.jpg'}

    ) */

    this.crew.push(
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
      {name:'Christopher Nolan',src:'https://www.gstatic.com/tv/thumb/persons/233377/233377_v9_bb.jpg'},
    )

    
    // Make API Request to GET movie details by ID by utilising Service
    this.movieService.getMovieById(this.movieId)
      .subscribe((res: any) => {
        console.log(res);
        this.movieItem = res;
        this.cast = this.movieItem.cast.split(",");      
      });
      
    //this.cast = this.movieItem.cast.split(",");
    //console.log(this.cast);


  }

}
