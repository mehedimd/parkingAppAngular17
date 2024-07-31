import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7095/api/Lavel';

@Injectable({
  providedIn: 'root',
})
export class LavelService {
  constructor(private http: HttpClient) {}

  parkingSpotsList: any = []; // all parking spots list here

  GetAll(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl);
  }

  GetById(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  Create(data: any): Observable<any> {
    let lavel = {
      ...data,
      parkingSpots: this.parkingSpotsList,
    };
    return this.http.post<any>(baseUrl, lavel);
  }

  Update(id: any, data: any): Observable<any> {
    let lavel = {
      ...data,
      parkingSpots: this.parkingSpotsList,
    };
    return this.http.put(`${baseUrl}/${id}`, lavel);
  }

  Delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
