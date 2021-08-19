import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car!: Car;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCarById('611e2fd786167d8668aaa2ff').subscribe((val) => {
      console.log(`Value is ${val}`);
      this.car = val;
    });
  }
}
