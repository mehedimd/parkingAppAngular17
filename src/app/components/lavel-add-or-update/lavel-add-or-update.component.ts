import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { ParkingSpotAddOrUpdateComponent } from '../parking-spot-add-or-update/parking-spot-add-or-update.component';
import { LavelService } from '../../services/lavel.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lavel-add-or-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, RouterLink],
  templateUrl: './lavel-add-or-update.component.html',
  styleUrl: './lavel-add-or-update.component.css',
})
export class LavelAddOrUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public lavelService: LavelService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let activatedRouteId = this.route.snapshot.params['id'];
    if (activatedRouteId > 0) {
      this.getEditFormValue(activatedRouteId);
      this.isEdit = true;
    } else {
      this.lavelService.parkingSpotsList = [];
    }
  }

  lavelForm: any = this.formBuilder.group({
    lavelId: [0],
    floorName: ['', Validators.required],
    vehicleType: ['', Validators.required],
  });

  isEdit: boolean = false;

  // for edit
  getEditFormValue(lavelId: any) {
    this.lavelService.GetById(lavelId).subscribe({
      next: (data) => {
        console.log(data);
        this.lavelForm.patchValue(data);
        this.lavelService.parkingSpotsList = data.parkingSpots;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // create new lavel or floor
  CreateLavel() {
    if (this.lavelForm.value.lavelId > 0) {
      this.lavelService
        .Update(this.lavelForm.value.lavelId, this.lavelForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/lavel']);
          },
          error: (e) => console.log(e),
        });
    } else {
      this.lavelService.Create(this.lavelForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/lavel']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  // add or update Parking Spot
  addOrUpdateParkingSpot(spotIndex: any) {
    let lavelId = this.lavelForm.value.lavelId;
    let dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '45%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { spotIndex, lavelId };
    this.dialog.open(ParkingSpotAddOrUpdateComponent, dialogConfig);
  }

  // remove Spot
  removeSpot(index: any) {
    let availablity = this.lavelService.parkingSpotsList[index].isAvailable;
    if (availablity) {
      this.lavelService.parkingSpotsList.splice(index, 1);
    } else {
      this.toastr.error("Can't Remove Booked Spot!");
    }
  }
}
