import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7095/api/parking';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private http: HttpClient) {}

  GetAllParking(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl);
  }

  GetById(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/ ${id}`);
  }

  Create(data: any): Observable<any> {
    return this.http.post<any>(baseUrl, data);
  }

  Update(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/${id}`, data);
  }

  Delete(id: any): Observable<any> {
    return this.http.delete<any>(`${baseUrl}/${id}`);
  }

  SerchByLicensePlate(license: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/SearchByLicense/${license}`);
  }
}
