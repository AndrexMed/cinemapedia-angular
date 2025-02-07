import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movies.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'apps/cinemapedia-angular/src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);

  currentPage = signal<number>(1);
  hasMorePages = signal<boolean>(true);
  isLoading = signal<boolean>(false);

  private readonly apiKey = environment.apiKey;
  private readonly apiUrl = environment.apiUrl;
  private readonly _searchTerm = signal<string>('');

  private readonly _http = inject(HttpClient);

  constructor() {
    this._getMovies();
  }

  getMovieById(id: string): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  _getMovies(): void {
    this._http
      .get<MovieResponse>(
        `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}`
      )
      .pipe(
        tap((movies) => {
          const currentMovies = this.movies();
          this.movies.set([...currentMovies, ...movies.results]);
          this.hasMorePages.set(movies.page < movies.total_pages);
          this.currentPage.update((currentPage) => currentPage + 1);
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }
}
