import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortstoriesComponent } from './shortstories.component';

describe('ShortstoriesComponent', () => {
  let component: ShortstoriesComponent;
  let fixture: ComponentFixture<ShortstoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortstoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortstoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
