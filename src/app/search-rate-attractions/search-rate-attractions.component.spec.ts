import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRateAttractionsComponent } from './search-rate-attractions.component';

describe('SearchRateAttractionsComponent', () => {
  let component: SearchRateAttractionsComponent;
  let fixture: ComponentFixture<SearchRateAttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRateAttractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRateAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
