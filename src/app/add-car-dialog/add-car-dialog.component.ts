import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService,
    private dialogRef: MatDialogRef<AddCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCarDialogData
  ) {
    if (data.car.manufacturer !== undefined) this.isNewCar = false;
    // Build the form with existing data if possible
    this.regiForm = formBuilder.group({
      _id: [{ value: data.car._id, disabled: true }],
      manufacturer: [data.car.manufacturer, Validators.required],
      model: [data.car.model, Validators.required],
      description: [
        data.car.description,
        [Validators.required, Validators.minLength(20)]
      ],
      price: [data.car.price, Validators.required],
      mileage: [data.car.mileage, Validators.required],
      imageUrl: [data.car.imageUrl, Validators.required]
    });
  }

  onFormSubmit(submittedCar: Car): void {
    if (this.delete) {
      this.carService.deleteCar(submittedCar).subscribe(() => {
        this.toastrService.success(
          `${submittedCar.manufacturer} ${submittedCar.model} has been successfully deleted`,
          'Deleted!',
          {
            timeOut: 3000,
            progressBar: true
          }
        );
      });
    } else if (!this.cancel) {
      this.carService.saveCar(submittedCar, this.isNewCar).subscribe(() => {
        if (this.isNewCar) {
          this.toastrService.success(
            `${submittedCar.manufacturer} ${submittedCar.model} has been successfully created`,
            'Created!',
            {
              timeOut: 3000,
              progressBar: true
            }
          );
        } else {
          this.toastrService.success(
            `${submittedCar.manufacturer} ${submittedCar.model} has been successfully updated`,
            'Updated!',
            {
              timeOut: 3000,
              progressBar: true
            }
          );
        }
      });
    }
    this.dialogRef.close(this.data);
  }
}
