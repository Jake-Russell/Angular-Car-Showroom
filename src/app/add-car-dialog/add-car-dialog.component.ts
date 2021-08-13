import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Car } from '../cars/car';
import { CarService } from '../cars/car.service';
import { AddCarDialogData } from './add-car-dialog-data';

@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.css']
})
export class AddCarDialogComponent {
  regiForm: FormGroup;

  delete = false;

  cancel = false;

  isNewCar = true;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private dialogRef: MatDialogRef<AddCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCarDialogData
  ) {
    if (data.car.manufacturer !== undefined) this.isNewCar = false;
    // Build the form with existing data if possible
    this.regiForm = formBuilder.group({
      id: [{ value: data.car.id, disabled: true }],
      manufacturer: [data.car.manufacturer, Validators.required],
      model: [data.car.model, Validators.required],
      description: [
        data.car.description,
        [Validators.required, Validators.minLength(20)]
      ],
      price: [data.car.price, Validators.required],
      mileage: [data.car.mileage, Validators.required]
    });
  }

  onFormSubmit(form: Car): void {
    console.log(form);
    if (this.delete) this.carService.deleteCar(form);
    else if (!this.cancel) this.carService.saveCar(form, this.isNewCar);
    this.dialogRef.close(this.data);
  }
}
