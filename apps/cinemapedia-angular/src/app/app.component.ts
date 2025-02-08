import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './layout/hero/hero.component';
import { MoviesService } from './features/movies/movies.service';

@Component({
  imports: [RouterOutlet, HeroComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _moviesSvc = inject(MoviesService);
  heroMovie = computed(() => this._moviesSvc.selectedMovie());

  showButton = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          this.showButton = true;
        } else {
          this.showButton = false;
        }
      });
    }
  }

  goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
