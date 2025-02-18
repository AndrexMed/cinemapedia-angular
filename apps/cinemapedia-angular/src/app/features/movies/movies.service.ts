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
  private readonly language = environment.language;

  private readonly queryParams = {
    api_key: this.apiKey,
    language: this.language,
  };

  private readonly _searchTerm = signal<string>('');

  private readonly _http = inject(HttpClient);

  constructor() {
    this._getMovies();
    this._getTrending();
  }

  getMovieById(id: string): Observable<Movie> {
    return this._http.get<Movie>(`${this.apiUrl}/movie/${id}`, {
      params: {
        ...this.queryParams,
      },
    });
  }

  _getMovies(): void {
    this._http
      .get<MovieResponse>(`${this.apiUrl}/movie/now_playing`, {
        params: {
          ...this.queryParams,
          page: this.currentPage(),
        },
      })
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

  _getTrending(): void {
    this._http
      .get<MovieResponse>(`${this.apiUrl}/trending/movie/week`, {
        params: {
          ...this.queryParams,
        },
      })
      .pipe(
        tap((movies: MovieResponse) => {
          this.trendingMovies.set(movies.results);
        }),
        tap(() => this.setRandomMovie())
      )
      .subscribe();
  }

  searchMovies(searchTerm: string): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(`${this.apiUrl}/search/movie`, {
      params: {
        ...this.queryParams,
        query: searchTerm,
      },
    });
  }

  setRandomMovie(): void {
    const randomIndex = this._getRandonInt(0, this.trendingMovies().length - 1);
    this.selectedMovie.set(this.trendingMovies()[randomIndex]);
  }

  private _getRandonInt(min = 0, max = 50): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
