import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbeadraVeronikaTeaceaComponent } from './ibeadra-veronika-teacea.component';

describe('IbeadraVeronikaTeaceaComponent', () => {
  let component: IbeadraVeronikaTeaceaComponent;
  let fixture: ComponentFixture<IbeadraVeronikaTeaceaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IbeadraVeronikaTeaceaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IbeadraVeronikaTeaceaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
