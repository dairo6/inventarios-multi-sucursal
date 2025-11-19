import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { SupplierI } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = 'http://localhost:3000/proveedores';
    private suppliersSubject = new BehaviorSubject<SupplierI[]>([]);
    public suppliers$ = this.suppliersSubject.asObservable();
  
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
  
  
    getAllSuppliers(): Observable<SupplierI[]> {
      return this.http.get<SupplierI[]>(this.baseUrl, { headers: this.getHeaders() })
      // .pipe(
      //   tap(response => {
      //       // console.log('Fetched branchs:', response);
      //     })
      // )
      ;
    }
  
    getSupplierById(id: number): Observable<SupplierI> {
      return this.http.get<SupplierI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
    }
  
    createSupplier(supplier: SupplierI): Observable<SupplierI> {
      return this.http.post<SupplierI>(this.baseUrl, supplier, { headers: this.getHeaders() });
    }
  
    updateSupplier(id: number, supplier: SupplierI): Observable<SupplierI> {
      return this.http.patch<SupplierI>(`${this.baseUrl}/${id}`, supplier, { headers: this.getHeaders() });
    }
  
    deleteSulpplier(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
    }
  
    deleteSupplierLogic(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
    }
  
    // Método para actualizar el estado local de las sucursales
    updateLocalSuppliers(suppliers: SupplierI[]): void {
      this.suppliersSubject.next(suppliers);
    }
  
    refreshSuppliers(): void {
      this.getAllSuppliers().subscribe(suppliers => {
        this.suppliersSubject.next(suppliers);
      });
    }
}
