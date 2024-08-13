import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentUrl: string = '';
  isPriestsMenuOpen = false;
  isWarriorsMenuOpen = false;

  constructor(private router: Router) { }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  togglePriestsMenu(isOpen: boolean) {
    this.isPriestsMenuOpen = isOpen;
  }

  toggleWarriorsMenu(isOpen: boolean) {
    this.isWarriorsMenuOpen = isOpen;
  }
}