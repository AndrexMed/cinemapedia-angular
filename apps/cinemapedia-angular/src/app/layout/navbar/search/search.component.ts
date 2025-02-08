import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../../features/movies/models/movies.interface';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  searchQuery = signal<string>('');
  private readonly _router = inject(Router);
  private readonly _moviesSvc = inject(MoviesService);

  filteredMovies = rxResource({
    request: this.searchQuery,
    // request: () => this.searchQuery(),
    loader: () => this._moviesSvc.searchMovies(this.searchQuery()),
  });

  // movies = computed(
  //   () => this.filteredMovies.value()?.results ?? ([] as Movie[])
  // );
  movies = linkedSignal(
    () => this.filteredMovies.value()?.results ?? ([] as Movie[])
  );

  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  goToDetails(movieId: number): void {
    this._router.navigate(['/movies', movieId]);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this._moviesSvc.setRandomMovie();
    this._router.navigate(['movies']);
  }
}
