import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HilvarComponent } from './hilvar.component';

describe('HilvarComponent', () => {
  let component: HilvarComponent;
  let fixture: ComponentFixture<HilvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HilvarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HilvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
