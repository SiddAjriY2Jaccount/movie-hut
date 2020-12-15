import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TheatresComponent } from './theatres/theatres.component';
import { MoviesComponent } from './movies/movies.component';
import { AboutMovieComponent} from './about-movie/about-movie.component';
import { BookingComponent } from './booking/booking.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'theatres', component: TheatresComponent},
  { path: 'movies' ,component: MoviesComponent},
  { path: 'about-movie',component:AboutMovieComponent},
  { path: 'booking' ,component:BookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
