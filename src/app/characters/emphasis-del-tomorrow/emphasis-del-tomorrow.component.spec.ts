import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmphasisDelTomorrowComponent } from './emphasis-del-tomorrow.component';

describe('EmphasisDelTomorrowComponent', () => {
  let component: EmphasisDelTomorrowComponent;
  let fixture: ComponentFixture<EmphasisDelTomorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmphasisDelTomorrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmphasisDelTomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
