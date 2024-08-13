import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GonisTueComponent } from './gonis-tue.component';

describe('GonisTueComponent', () => {
  let component: GonisTueComponent;
  let fixture: ComponentFixture<GonisTueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GonisTueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GonisTueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
