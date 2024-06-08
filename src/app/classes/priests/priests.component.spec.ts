import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriestsComponent } from './priests.component';

describe('PriestsComponent', () => {
  let component: PriestsComponent;
  let fixture: ComponentFixture<PriestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
