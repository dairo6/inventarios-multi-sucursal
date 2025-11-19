import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LocationI } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


     private baseUrl = 'http://localhost:3000/ubicaciones';
       private locationsSubject = new BehaviorSubject<LocationI[]>([]);
       public location$ = this.locationsSubject.asObservable();
     
       constructor(
         private http: HttpClient,
         // private authService: AuthService
       ) {}
     
       private getHeaders(): HttpHeaders {
         let headers = new HttpHeaders();
         // const token = this.authService.getToken();
         // if (token) {
         //   headers = headers.set('Authorization', `Bearer ${token}`);
         // }
         return headers;
       }
     
     
       getAllLocations(): Observable<LocationI[]> {
         return this.http.get<LocationI[]>(this.baseUrl, { headers: this.getHeaders() })
         // .pipe(
         //   tap(response => {
         //       // console.log('Fetched branchs:', response);
         //     })
         // )
         ;
       }
     
       getLocationById(id: number): Observable<LocationI> {
         return this.http.get<LocationI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
       }
     
       createLocation(location: LocationI): Observable<LocationI> {
         return this.http.post<LocationI>(this.baseUrl, location, { headers: this.getHeaders() });
       }
     
       updateLocation(id: number, location: LocationI): Observable<LocationI> {
         return this.http.patch<LocationI>(`${this.baseUrl}/${id}`, location, { headers: this.getHeaders() });
       }
     
       deleteLocation(id: number): Observable<void> {
         return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
       }
     
       deleteLocationLogic(id: number): Observable<void> {
         return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
       }
     
       // Método para actualizar el estado local de las localizaciones
       updateLocalLocations(locations: LocationI[]): void {
         this.locationsSubject.next(locations);
       }
     
       refreshLocations(): void {
         this.getAllLocations().subscribe(locations => {
           this.locationsSubject.next(locations);
         });
       }
  
}
