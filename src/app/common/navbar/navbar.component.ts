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

  constructor(private router: Router) {
    // Listen to router events and filter for NavigationEnd events
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects; // Accessing urlAfterRedirects after ensuring the event is of type NavigationEnd
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit() {
    this.currentUrl = this.router.url; // Set initial URL when component initializes
  }
}