import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsContainerComponent } from './attractions-container.component';

describe('AttractionsContainerComponent', () => {
  let component: AttractionsContainerComponent;
  let fixture: ComponentFixture<AttractionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
