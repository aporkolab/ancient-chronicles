import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SasszemuAhmShereComponent } from './sasszemu-ahm-shere.component';

describe('SasszemuAhmShereComponent', () => {
  let component: SasszemuAhmShereComponent;
  let fixture: ComponentFixture<SasszemuAhmShereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SasszemuAhmShereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SasszemuAhmShereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
