import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajvernoComponent } from './bajverno.component';

describe('BajvernoComponent', () => {
  let component: BajvernoComponent;
  let fixture: ComponentFixture<BajvernoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BajvernoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajvernoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
