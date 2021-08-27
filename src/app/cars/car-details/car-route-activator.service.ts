import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CarService } from '../car.service';

@Injectable()
export class CarRouteActivatorService implements CanActivate {
  constructor(private carService: CarService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.carService.getCarById(route.params.id).subscribe((value) => {
      if (value == null) {
        this.router.navigate(['/404']);
      }
    });
    return true;
  }
}
