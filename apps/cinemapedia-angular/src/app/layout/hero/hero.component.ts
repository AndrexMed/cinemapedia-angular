import { Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movies.interface';
import { environment } from 'apps/cinemapedia-angular/src/environments/environment.development';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  movie = input.required<Movie>();
  _baseImgUrl = environment.apiBaseImageUrl;

  getImgSrc(posterPath: string | undefined): string {
    return posterPath
      ? `${this._baseImgUrl}${posterPath}`
      : 'https://placehold.co/1280x400';
  }
}
