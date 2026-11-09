import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render real links (href) for every menu item', () => {
    const items = Array.from(fixture.nativeElement.querySelectorAll('a.dropdown-item:not(.dropdown-toggle)')) as HTMLAnchorElement[];
    expect(items.length).toBeGreaterThan(0);
    for (const a of items) {
      expect(a.getAttribute('href')).withContext(a.textContent ?? '').toMatch(/^\/\w/);
    }
  });

  it('should toggle the Harcosok submenu without navigating', () => {
    const spy = spyOn(router, 'navigateByUrl');
    const toggle = Array.from(fixture.nativeElement.querySelectorAll('a.dropdown-toggle'))
      .find(a => (a as HTMLElement).textContent?.trim() === 'Harcosok') as HTMLElement;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    toggle.dispatchEvent(event);
    expect(event.defaultPrevented).toBeTrue();
    expect(component.isWarriorsMenuOpen).toBeTrue();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should open the section overview from a top-level menu', () => {
    const spy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const toggle = fixture.nativeElement.querySelector('#monstersDropdown') as HTMLElement;
    component.onDropdownLinkClick({ currentTarget: toggle } as unknown as MouseEvent);
    expect(spy).toHaveBeenCalledWith('/monsters');
  });
});
