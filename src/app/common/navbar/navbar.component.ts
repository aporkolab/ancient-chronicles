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
  bootstrap: any;

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

  onDropdownLinkClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const elementId = target.id.replace('Dropdown', '');

    if (target.classList.contains('dropdown-toggle') && target.getAttribute('aria-expanded') === 'false') {
      event.preventDefault();
      event.stopImmediatePropagation();
      target.click();
    } else {
      this.router.navigateByUrl(`/${elementId}`);
    }
  }

}