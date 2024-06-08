import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllanapusztitoComponent } from './ellanapusztito.component';

describe('EllanapusztitoComponent', () => {
  let component: EllanapusztitoComponent;
  let fixture: ComponentFixture<EllanapusztitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EllanapusztitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EllanapusztitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
