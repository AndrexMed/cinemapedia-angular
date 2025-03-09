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
  title = input<string>('Trending');
  movies = input.required<Movie[]>();

  private readonly apiImageUrl = environment.apiBaseImageUrl;

  getImageUrl(posterPath: string): string {
    return posterPath
      ? `${this.apiImageUrl}${posterPath}`
      : 'https://placehold.co/400';
  }
}
