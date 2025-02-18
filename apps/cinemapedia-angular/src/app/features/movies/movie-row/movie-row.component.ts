import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movies.interface';
import { environment } from 'apps/cinemapedia-angular/src/environments/environment.development';

@Component({
  selector: 'app-movie-row',
  imports: [CommonModule],
  templateUrl: './movie-row.component.html',
})
export class MovieRowComponent {
  movies = input.required<Movie[]>();

  private readonly apiImageUrl = environment.apiBaseImageUrl;

  getImageUrl(posterPath: string): string {
    return posterPath
      ? `${this.apiImageUrl}/w500${posterPath}`
      : 'https://placehold.co/400';
  }
}
