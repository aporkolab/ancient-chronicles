import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DharrMenudoSyrusComponent } from './dharr-menudo-syrus.component';

describe('DharrMenudoSyrusComponent', () => {
  let component: DharrMenudoSyrusComponent;
  let fixture: ComponentFixture<DharrMenudoSyrusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DharrMenudoSyrusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DharrMenudoSyrusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
