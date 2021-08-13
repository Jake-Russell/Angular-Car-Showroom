import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from './car';

@Injectable()
export class CarService {
  carsCollection!: AngularFirestoreCollection<Car>;

  cars$!: Observable<any>;

  constructor(private firestore: AngularFirestore) {
    this.cars$ = this.firestore
      .collection('cars')
      .valueChanges({ idField: 'id' });
  }

  getCarList() {
    return this.firestore.collection('cars').valueChanges({ idField: 'id' });
  }

  saveCar(car: Car, isNewCar: boolean) {
    if (isNewCar) {
      const newId = this.firestore.createId();
      car.id = newId;
      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection('cars')
          .doc(newId)
          .set(car)
          .then(
            (response) => {
              console.log(response);
            },
            (error) => reject(error)
          );
      });
    }
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('cars')
        .doc(car.id)
        .update(car)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  deleteCar(car: Car) {
    return this.firestore.collection('cars').doc(car.id).delete();
  }
}
