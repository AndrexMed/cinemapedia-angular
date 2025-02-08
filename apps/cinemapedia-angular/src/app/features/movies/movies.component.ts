import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from './movies.service';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, RouterLink, MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  private readonly _moviesSvc = inject(MoviesService);

  isLoading = computed(() => this._moviesSvc.isLoading());
  hasMorePages = computed(() => this._moviesSvc.hasMorePages());

  readonly movies = this._moviesSvc.movies;

  trendingMovies = computed(() => this._moviesSvc.trendingMovies());

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isLoading() || !this.hasMorePages()) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThreshold = document.documentElement.scrollHeight;

    if (scrollPosition >= scrollThreshold) {
      this._moviesSvc._getMovies();
    }
  }
}
