import { Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

/** A Bootstrap a bootstrap.bundle.min.js-ből globálisan érhető el (angular.json → scripts). */
declare const bootstrap: { Collapse: { getOrCreateInstance(el: Element, opts?: object): { hide(): void } } } | undefined;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isPriestsMenuOpen = false;
  isWarriorsMenuOpen = false;
  /** Főmenü-kattintásnál (a lenyíló épp kinyílik) a mobilmenü nyitva marad. */
  private keepMenuOpen = false;

  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    // Mobilon a kinyitott menü a választás után is nyitva maradt, és eltakarta a lapot.
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(() => {
        this.isPriestsMenuOpen = this.isWarriorsMenuOpen = false;
        if (this.keepMenuOpen) {
          this.keepMenuOpen = false;
          return;
        }
        const menu = (this.host.nativeElement as HTMLElement).querySelector('#navbarNavDropdown.show');
        if (menu && typeof bootstrap !== 'undefined') {
          bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
        }
      });
  }

  togglePriestsMenu(isOpen: boolean): void {
    this.isPriestsMenuOpen = isOpen;
  }

  toggleWarriorsMenu(isOpen: boolean): void {
    this.isWarriorsMenuOpen = isOpen;
  }

  /** Almenü (Harcosok/Papok) nyitása-zárása kattintásra; a főmenü nyitva marad. */
  toggleSubmenu(event: Event, menu: 'warriors' | 'priests'): void {
    event.preventDefault();
    event.stopPropagation();
    if (menu === 'warriors') {
      this.isWarriorsMenuOpen = !this.isWarriorsMenuOpen;
      this.isPriestsMenuOpen = false;
    } else {
      this.isPriestsMenuOpen = !this.isPriestsMenuOpen;
      this.isWarriorsMenuOpen = false;
    }
  }

  /**
   * Főmenü-kattintás: a Bootstrap kinyitja a lenyílót, mi pedig a kategória áttekintő
   * lapjára lépünk (pl. „Hősök” → /characters).
   */
  onDropdownLinkClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const section = target.id.replace('Dropdown', '');
    if (section) {
      this.keepMenuOpen = true;
      this.router.navigateByUrl(`/${section}`).finally(() => (this.keepMenuOpen = false));
    }
  }
}
