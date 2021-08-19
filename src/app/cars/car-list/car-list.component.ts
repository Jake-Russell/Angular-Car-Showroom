import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
  sortBy = '';

  showImages = false;

  searchTerm = '';

  cars$ = this.carService.getAllCars(this.sortBy);

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
      searchTerm: [null, []]
    });

    this.carResults.get('sortBy')?.setValue(this.eCarSortBy.NAME);

    this.carResults.valueChanges.pipe(debounceTime(500)).subscribe((values) => {
      console.log(values);
      this.sortBy = values.sortBy;
      this.searchTerm = values.searchTerm;
      this.cars$ = this.carService.getAllCars(this.sortBy, this.searchTerm);
    });
  }

  edit(car: Car): void {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '50%',
      data: {
        car,
        enableDelete: true
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cars$ = this.carService.getAllCars(this.sortBy, this.searchTerm);
    });
  }

  addNewCar(): void {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '50%',
      data: {
        car: {}
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cars$ = this.carService.getAllCars(this.sortBy, this.searchTerm);
    });
  }
}
