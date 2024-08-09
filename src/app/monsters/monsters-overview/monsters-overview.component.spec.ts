import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonstersOverviewComponent } from './monsters-overview.component';

describe('MonstersOverviewComponent', () => {
  let component: MonstersOverviewComponent;
  let fixture: ComponentFixture<MonstersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonstersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonstersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
