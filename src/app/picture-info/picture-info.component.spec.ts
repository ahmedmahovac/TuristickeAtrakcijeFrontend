import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureInfoComponent } from './picture-info.component';

describe('PictureInfoComponent', () => {
  let component: PictureInfoComponent;
  let fixture: ComponentFixture<PictureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
