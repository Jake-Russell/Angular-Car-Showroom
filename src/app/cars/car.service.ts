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

  getCars(): Observable<Car[]> {
    return this.cars$;
  }
}
