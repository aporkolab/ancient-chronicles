import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArnyhalalComponent } from './arnyhalal.component';

describe('ArnyhalalComponent', () => {
  let component: ArnyhalalComponent;
  let fixture: ComponentFixture<ArnyhalalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArnyhalalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArnyhalalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
