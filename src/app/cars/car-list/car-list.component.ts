import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { AddCarDialogComponent } from 'src/app/add-car-dialog/add-car-dialog.component';
import { Car } from '../car';
import { CarSortBy } from '../car-sort-by.enum';
import { CarService } from '../car.service';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarList implements OnInit {
  cars$ = this.carService.getCarList('manufacturer', 'asc');

  eCarSortBy = CarSortBy;

  selected = 'optionName';

  carResults!: FormGroup;

  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carResults = this.formBuilder.group({
      sortBy: [null, Validators.required],
      filterBy: [null, []]
    });

    this.carResults.get('sortBy')?.setValue(this.eCarSortBy.NAME);

    this.carResults.valueChanges.pipe(debounceTime(500)).subscribe((values) => {
      console.log(values);
      const { sortBy, filterBy } = values;
      console.log(sortBy);
      console.log(filterBy);
    });
  }

  onChangeSort(value: CarSortBy): void {
    let sortBy = '';
    let order: 'asc' | 'desc';
    switch (value) {
      case this.eCarSortBy.PRICE_ASCENDING:
        sortBy = 'price';
        order = 'asc';
        break;
      case this.eCarSortBy.PRICE_DESCENDING:
        sortBy = 'price';
        order = 'desc';
        break;
      case this.eCarSortBy.MILEAGE_ASCENDING:
        sortBy = 'mileage';
        order = 'asc';
        break;
      case this.eCarSortBy.MILEAGE_DESCENDING:
        sortBy = 'mileage';
        order = 'desc';
        break;
      default:
        sortBy = 'manufacturer';
        order = 'asc';
    }
    this.cars$ = this.carService.getCarList(sortBy, order);
  }

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
