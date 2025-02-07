import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies.component';

export const moviesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./movies.component').then((m) => m.MoviesComponent),
  },
  {
    path: ':movieId',
    loadComponent: () =>
      import('./movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },
];
