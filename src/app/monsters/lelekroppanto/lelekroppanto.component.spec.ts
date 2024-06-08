import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LelekroppantoComponent } from './lelekroppanto.component';

describe('LelekroppantoComponent', () => {
  let component: LelekroppantoComponent;
  let fixture: ComponentFixture<LelekroppantoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LelekroppantoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LelekroppantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
