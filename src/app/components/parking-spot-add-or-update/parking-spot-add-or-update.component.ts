import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { LavelService } from '../../services/lavel.service';

@Component({
  selector: 'app-parking-spot-add-or-update',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogClose],
  templateUrl: './parking-spot-add-or-update.component.html',
  styleUrl: './parking-spot-add-or-update.component.css',
})
export class ParkingSpotAddOrUpdateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ParkingSpotAddOrUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lavelService: LavelService
  ) {}

  ngOnInit(): void {
    if (this.data.spotIndex != null) {
      this.parkingSpotForm.patchValue(
        this.lavelService.parkingSpotsList[this.data.spotIndex]
      );
    }
  }

  parkingSpotForm: any = this.formBuilder.group({
    serialNo: ['', Validators.required],
    lavelId: [this.data.lavelId],
    isAvailable: [true],
  });

  CreateSpot() {
    if (this.data.spotIndex != null) {
      this.lavelService.parkingSpotsList[this.data.spotIndex] =
        this.parkingSpotForm.value;
    } else {
      this.lavelService.parkingSpotsList.push(this.parkingSpotForm.value);
    }
    this.dialogRef.close();
  }
}
