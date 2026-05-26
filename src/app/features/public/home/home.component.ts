import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Put your navigation function here!
  scrollCarousel(direction: number) {
    const container = document.getElementById('foodCarousel');
    if (container) {
      const slideWidth = container.clientWidth;
      container.scrollBy({
        left: slideWidth * direction,
        behavior: 'smooth',
      });
    }
  }
}
