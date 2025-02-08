import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
