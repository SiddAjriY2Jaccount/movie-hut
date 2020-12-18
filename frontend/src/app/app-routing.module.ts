import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AboutMovieComponent } from './components/about-movie/about-movie.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/:id', component: AboutMovieComponent },
  { path: 'mybookings', component: UserBookingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
