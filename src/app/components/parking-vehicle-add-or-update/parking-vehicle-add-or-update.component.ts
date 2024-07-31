import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parking-vehicle-add-or-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './parking-vehicle-add-or-update.component.html',
  styleUrl: './parking-vehicle-add-or-update.component.css',
})
export class ParkingVehicleAddOrUpdateComponent {
  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  parkingForm: any = this.formBuilder.group({
    licensePlate: ['', Validators.required],
    type: ['', Validators.required],
  });

  // create parking vehicle
  CreateParkingVehicle() {
    this.parkingService.Create(this.parkingForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/parkingVehicle']);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error(e.error.message);
      },
    });
  }
}
