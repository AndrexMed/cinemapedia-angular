import { Component, inject, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'apps/cinemapedia-angular/src/environments/environment.development';
import { TabsComponent } from './tabs/tabs.component';
import { FlowbiteService } from '../../../shared/services/flowbite.service';

@Component({
  selector: 'app-movie-details',
  imports: [DatePipe, DecimalPipe, TabsComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieId = input.required<string>();
  private readonly _router = inject(Router);
  private readonly _moviesSvc = inject(MoviesService);

  readonly _imgBaseUrl = environment.apiBaseImageUrl;
  private readonly _flowBiteSvc = inject(FlowbiteService);

  movie = rxResource({
    request: () => this.movieId,
    loader: () => this._moviesSvc.getMovieById(this.movieId()),
  });

  actors = rxResource({
    request: () => this.movieId,
    loader: () => this._moviesSvc.getActorsByMovieId(this.movieId()),
  });

  youtubeVideos = rxResource({
    request: () => this.movieId,
    loader: () => this._moviesSvc.getYoutubeVideoById(this.movieId()),
  });

  ngOnInit(): void {
    this._flowBiteSvc.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }

  goBack(): void {
    this._router.navigate(['movies']);
  }
}
