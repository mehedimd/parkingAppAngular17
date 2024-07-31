import { Component, OnInit } from '@angular/core';
import { LavelService } from '../../services/lavel.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lavel-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lavel-list.component.html',
  styleUrl: './lavel-list.component.css',
})
export class LavelListComponent implements OnInit {
  constructor(
    private lavelService: LavelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllLavel();
  }

  lavelList: any[] = [];

  singleLavel: any = {};

  // Get All lavel
  getAllLavel() {
    this.lavelService.GetAll().subscribe({
      next: (res) => {
        console.log(res);
        this.lavelList = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // Delete Lavel
  DeleteLavel(id: any) {
    this.lavelService.Delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/lavel']);
      },
      error: (e) => {
        console.log(e);
        this.toastr.error(e.error.message);
      },
    });
  }

  // Lavel with SpotList for Details(Modal)
  GetLavelById(id: any) {
    this.lavelService.GetById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.singleLavel = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
