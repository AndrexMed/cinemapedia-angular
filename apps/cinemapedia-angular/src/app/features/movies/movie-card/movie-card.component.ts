import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movies.interface';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  imageError = false;

  getImageUrl(): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return this.imageError ? '/placeholder.png' : baseUrl + this.movie().poster_path;
  }

  setImageError(value: boolean) {
    this.imageError = value;
  }
}
