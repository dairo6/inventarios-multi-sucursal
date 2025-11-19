import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { WarehouseI } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

   private baseUrl = 'http://localhost:3000/bodegas';
     private warehousesSubject = new BehaviorSubject<WarehouseI[]>([]);
     public warehouse$ = this.warehousesSubject.asObservable();
   
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
   
   
     getAllWarehouses(): Observable<WarehouseI[]> {
       return this.http.get<WarehouseI[]>(this.baseUrl, { headers: this.getHeaders() })
       // .pipe(
       //   tap(response => {
       //       // console.log('Fetched branchs:', response);
       //     })
       // )
       ;
     }
   
     getWarehouseById(id: number): Observable<WarehouseI> {
       return this.http.get<WarehouseI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
     }
   
     createWarehouse(product: WarehouseI): Observable<WarehouseI> {
       return this.http.post<WarehouseI>(this.baseUrl, product, { headers: this.getHeaders() });
     }
   
     updateWarehouse(id: number, product: WarehouseI): Observable<WarehouseI> {
       return this.http.patch<WarehouseI>(`${this.baseUrl}/${id}`, product, { headers: this.getHeaders() });
     }
   
     deleteWarehouse(id: number): Observable<void> {
       return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
     }
   
     deleteWarehouseLogic(id: number): Observable<void> {
       return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
     }
   
     // Método para actualizar el estado local de las sucursales
     updateLocalWarehouses(warehouses: WarehouseI[]): void {
       this.warehousesSubject.next(warehouses);
     }
   
     refreshWarehouses(): void {
       this.getAllWarehouses().subscribe(warehouses => {
         this.warehousesSubject.next(warehouses);
       });
     }
 
}
