import { Routes } from '@angular/router';
import { LavelListComponent } from './components/lavel-list/lavel-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lavel', component: LavelListComponent },
  {
    path: 'lavel/add',
    loadComponent: () =>
      import(
        './components/lavel-add-or-update/lavel-add-or-update.component'
      ).then((l) => l.LavelAddOrUpdateComponent),
  },
  {
    path: 'lavel/edit/:id',
    loadComponent: () =>
      import(
        './components/lavel-add-or-update/lavel-add-or-update.component'
      ).then((l) => l.LavelAddOrUpdateComponent),
  },
  {
    path: 'parkingVehicle',
    loadComponent: () =>
      import(
        './components/parking-vehicle-list/parking-vehicle-list.component'
      ).then((p) => p.ParkingVehicleListComponent),
  },
  {
    path: 'parkingVehicle/add',
    loadComponent: () =>
      import(
        './components/parking-vehicle-add-or-update/parking-vehicle-add-or-update.component'
      ).then((p) => p.ParkingVehicleAddOrUpdateComponent),
  },
  {
    path: 'parkingVehicle/edit/:id',
    loadComponent: () =>
      import(
        './components/parking-vehicle-add-or-update/parking-vehicle-add-or-update.component'
      ).then((p) => p.ParkingVehicleAddOrUpdateComponent),
  },
];
