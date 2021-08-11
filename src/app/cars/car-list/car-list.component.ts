import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  AddCarDialogComponent,
  AddCarDialogResult
} from 'src/app/add-car-dialog/add-car-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarList implements OnInit {
  cars$!: Observable<Car[]>;

  cars: Car[] = [
    {
      manufacturer: 'Mini',
      model: 'Cooper',
      description: 'Green Mini Cooper',
      price: 14999,
      mileage: 85000
    },
    {
      manufacturer: 'Seat',
      model: 'Mii',
      description: 'White Seat Mii',
      price: 5999,
      mileage: 45000
    }
  ];

  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }

  edit(car: Car): void {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '300px',
      data: {
        car,
        enableDelete: true
      }
    });
    dialogRef.afterClosed().subscribe((result: AddCarDialogResult) => {
      if (result.delete) {
        this.firestore.collection('cars').doc(car.id).delete();
      } else {
        this.firestore.collection('cars').doc(car.id).update(car);
      }
    });
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '300px',
      data: {
        car: {}
      }
    });
    dialogRef
      .afterClosed()
      .subscribe((result: AddCarDialogResult) => this.firestore.collection('cars').add(result.car));
  }
}
