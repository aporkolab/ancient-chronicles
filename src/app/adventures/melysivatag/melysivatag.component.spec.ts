import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelysivatagComponent } from './melysivatag.component';

describe('MelysivatagComponent', () => {
  let component: MelysivatagComponent;
  let fixture: ComponentFixture<MelysivatagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MelysivatagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MelysivatagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
