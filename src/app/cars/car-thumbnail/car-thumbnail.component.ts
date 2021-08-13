import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from '../car';

@Component({
  selector: 'car-thumbnail',
  templateUrl: './car-thumbnail.component.html',
  styleUrls: ['./car-thumbnail.component.css']
})
export class CarThumbnailComponent {
  @Input() car!: any;

  @Output() edit = new EventEmitter();
}
