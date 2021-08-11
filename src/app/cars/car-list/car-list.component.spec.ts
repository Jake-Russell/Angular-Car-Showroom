import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarList } from './car-list.component';

describe('CarListComponent', () => {
  let component: CarList;
  let fixture: ComponentFixture<CarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarList ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
