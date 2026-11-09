import { Component } from '@angular/core';

@Component({
  selector: 'app-sasszemu-ahm-shere',
  standalone: true,
  templateUrl: './sasszemu-ahm-shere.component.html',
  styleUrl: './sasszemu-ahm-shere.component.scss'
})
export class SasszemuAhmShereComponent {
  scrollTo(elementId: string): void {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
}
