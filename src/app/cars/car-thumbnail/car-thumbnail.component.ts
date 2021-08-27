import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { Car } from '../car';

@Component({
  selector: 'car-thumbnail',
  templateUrl: './car-thumbnail.component.html',
  styleUrls: ['./car-thumbnail.component.css']
})
export class CarThumbnailComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @Input() car!: Car;

  @Input() showImages = false;

  @Output() edit = new EventEmitter();

  click(car: Car): void {
    if (this.authService.currentUser?.admin) {
      this.edit.emit(car);
    } else {
      this.router.navigate([`cars/${car._id}`]);
    }
  }
}
