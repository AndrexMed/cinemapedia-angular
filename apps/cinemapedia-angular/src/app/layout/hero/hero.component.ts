import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../features/movies/models/movies.interface';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  movie = input.required<Movie>();
}
