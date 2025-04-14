import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/cinemapedia-angular/src/environments/environment.development';
import { Observable } from 'rxjs';
import { ActorResponse } from './models/actors.interface';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private readonly _http = inject(HttpClient);

  private readonly apiKey = environment.apiKey;
  private readonly apiUrl = environment.apiUrl;
  private readonly language = environment.language;

  private readonly queryParams = {
    api_key: this.apiKey,
    language: this.language,
  };

  getActorsByMovieId(movieId: string): Observable<ActorResponse> {
    return this._http.get<ActorResponse>(
      `${this.apiUrl}/movie/${movieId}/credits`,
      {
        params: {
          ...this.queryParams,
        },
      }
    );
  }
}
