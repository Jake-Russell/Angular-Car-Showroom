import { TestBed } from '@angular/core/testing';

import { CarRouteActivatorService } from './car-route-activator.service';

describe('CarRouteActivatorService', () => {
  let service: CarRouteActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRouteActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
