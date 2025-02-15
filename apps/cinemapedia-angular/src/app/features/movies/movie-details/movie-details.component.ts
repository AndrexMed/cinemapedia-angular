import { Component, inject, input } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-details',
  imports: [DatePipe, DecimalPipe, CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieId = input.required<string>();
  private readonly _router = inject(Router);
  private readonly _moviesSvc = inject(MoviesService);

  movie = rxResource({
    request: () => this.movieId,
    loader: () => this._moviesSvc.getMovieById(this.movieId()),
  });

  goBack(): void {
    this._router.navigate(['movies']);
  }
}
