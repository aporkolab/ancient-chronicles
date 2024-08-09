import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventuresOverviewComponent } from './adventures-overview.component';

describe('AdventuresOverviewComponent', () => {
  let component: AdventuresOverviewComponent;
  let fixture: ComponentFixture<AdventuresOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventuresOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventuresOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
