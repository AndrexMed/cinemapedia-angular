import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, JsonPipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  private readonly _moviesSvc = inject(MoviesService);

  isLoading = computed(() => this._moviesSvc.isLoading());
  hasMorePages = computed(() => this._moviesSvc.hasMorePages());

  readonly movies = this._moviesSvc.movies;
  @HostListener('window:scroll')
  onScroll(): void {
    //TODO loading more movies
    if (this.isLoading() || !this.hasMorePages()) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThrehold = document.documentElement.scrollHeight;

    if (scrollPosition > scrollThrehold) {
      this._moviesSvc._getMovies();
    }
  }
}
