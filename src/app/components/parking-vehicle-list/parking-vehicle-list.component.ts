import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parking-vehicle-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './parking-vehicle-list.component.html',
  styleUrl: './parking-vehicle-list.component.css',
})
export class ParkingVehicleListComponent implements OnInit {
  constructor(
    private parkingService: ParkingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetAllParkingVehicle();
  }

  parkingVehicleList: any = [];
  // get All Parking Vehicle
  GetAllParkingVehicle() {
    this.parkingService.GetAllParking().subscribe({
      next: (res) => {
        console.log(res);
        this.parkingVehicleList = res;
      },
      error: (e) => console.log(e),
    });
  }

  // search parking vehicle by License Number
  SearchByLicense(license: any) {
    let licensePlate = license.trim();
    if (licensePlate != null && licensePlate != '') {
      this.parkingService.SerchByLicensePlate(licensePlate).subscribe({
        next: (res) => {
          console.log(res);
          this.parkingVehicleList = res;
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      this.GetAllParkingVehicle();
    }
  }

  // Un-Park Vehicle
  UnParkVehicle(parkingVehicleId: any) {
    this.parkingService.Delete(parkingVehicleId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Un-Park Successfull');
        this.ngOnInit();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
