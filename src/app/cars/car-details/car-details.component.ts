import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car!: Car;

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.carService
      .getCarById(this.route.snapshot.params.id)
      .subscribe((val) => {
        console.log(`Value is ${val}`);
        this.car = val;
      });
  }
}
