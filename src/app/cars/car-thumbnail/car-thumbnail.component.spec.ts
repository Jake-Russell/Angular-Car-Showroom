import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarThumbnailComponent } from './car-thumbnail.component';

describe('CarThumbnailComponent', () => {
  let component: CarThumbnailComponent;
  let fixture: ComponentFixture<CarThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
