import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarriorComponent } from './warrior.component';

describe('WarriorComponent', () => {
  let component: WarriorComponent;
  let fixture: ComponentFixture<WarriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarriorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
