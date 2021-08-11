import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../cars/car';

@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.css']
})
export class AddCarDialogComponent {
  private backupTask: Partial<Car> = { ...this.data.car };

  constructor(
    public dialogRef: MatDialogRef<AddCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCarDialogData
  ) {}

  cancel(): void {
    this.data.car.manufacturer = this.backupTask.manufacturer!;
    this.data.car.model = this.backupTask.model!;
    this.data.car.description = this.backupTask.description!;
    this.data.car.price = this.backupTask.price!;
    this.data.car.mileage = this.backupTask.mileage!;
    this.dialogRef.close(this.data);
  }
}

export interface AddCarDialogData {
  car: Car;
  enableDelete: boolean;
}

export interface AddCarDialogResult {
  car: Car;
  delete?: boolean;
}
