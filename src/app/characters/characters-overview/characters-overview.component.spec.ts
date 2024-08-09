import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersOverviewComponent } from './characters-overview.component';

describe('CharactersOverviewComponent', () => {
  let component: CharactersOverviewComponent;
  let fixture: ComponentFixture<CharactersOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
