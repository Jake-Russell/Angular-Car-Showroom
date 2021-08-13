import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCarDialogComponent } from 'src/app/add-car-dialog/add-car-dialog.component';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarList {
  cars$ = this.carService.getCarList();

  constructor(private carService: CarService, private dialog: MatDialog) {}

  edit(car: Car): void {
    this.dialog.open(AddCarDialogComponent, {
      width: '50%',
      data: {
        car,
        enableDelete: true
      }
    });
  }

  addNewCar(): void {
    this.dialog.open(AddCarDialogComponent, {
      width: '50%',
      data: {
        car: {}
      }
    });
  }
}
