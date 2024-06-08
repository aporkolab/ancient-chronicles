import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllanafopapnoComponent } from './ellanafopapno.component';

describe('EllanafopapnoComponent', () => {
  let component: EllanafopapnoComponent;
  let fixture: ComponentFixture<EllanafopapnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EllanafopapnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EllanafopapnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
