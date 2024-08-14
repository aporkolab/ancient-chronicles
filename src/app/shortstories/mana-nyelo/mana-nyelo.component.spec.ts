import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaNyeloComponent } from './mana-nyelo.component';

describe('ManaNyeloComponent', () => {
  let component: ManaNyeloComponent;
  let fixture: ComponentFixture<ManaNyeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManaNyeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManaNyeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
