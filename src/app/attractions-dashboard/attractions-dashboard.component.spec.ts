import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsDashboardComponent } from './attractions-dashboard.component';

describe('AttractionsDashboardComponent', () => {
  let component: AttractionsDashboardComponent;
  let fixture: ComponentFixture<AttractionsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
