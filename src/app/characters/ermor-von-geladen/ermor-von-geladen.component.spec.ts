import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErmorVonGeladenComponent } from './ermor-von-geladen.component';

describe('ErmorVonGeladenComponent', () => {
  let component: ErmorVonGeladenComponent;
  let fixture: ComponentFixture<ErmorVonGeladenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErmorVonGeladenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErmorVonGeladenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
