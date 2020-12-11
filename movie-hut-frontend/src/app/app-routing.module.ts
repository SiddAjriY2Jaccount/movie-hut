import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book', component: BookingComponent },
  { path: 'movies', component: MoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
