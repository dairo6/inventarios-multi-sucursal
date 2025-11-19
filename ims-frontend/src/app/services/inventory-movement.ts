import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { InventoryMovementI } from '../models/inventoryMovement';

@Injectable({
  providedIn: 'root'
})
export class InventoryMovementService {

  private baseUrl = 'http://localhost:3000/movimientos-inventario';
       private inventoryMovementsSubject = new BehaviorSubject<InventoryMovementI[]>([]);
       public inventoryMovements$ = this.inventoryMovementsSubject.asObservable();
     
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
     
     
       getAllInventoryMovements(): Observable<InventoryMovementI[]> {
         return this.http.get<InventoryMovementI[]>(this.baseUrl, { headers: this.getHeaders() })
         // .pipe(
         //   tap(response => {
         //       // console.log('Fetched branchs:', response);
         //     })
         // )
         ;
       }
     
       getInventoryMovementById(id: number): Observable<InventoryMovementI> {
         return this.http.get<InventoryMovementI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
       }
     
       createInventoryMovement(guarantee: InventoryMovementI): Observable<InventoryMovementI> {
         return this.http.post<InventoryMovementI>(this.baseUrl, guarantee, { headers: this.getHeaders() });
       }
     
       updateInventoryMovement(id: number, guarantee: InventoryMovementI): Observable<InventoryMovementI> {
         return this.http.patch<InventoryMovementI>(`${this.baseUrl}/${id}`, guarantee, { headers: this.getHeaders() });
       }
     
       deleteInventoryMovement(id: number): Observable<void> {
         return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
       }
     
       deleteInventoryMovementLogic(id: number): Observable<void> {
         return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
       }
     
       // Método para actualizar el estado local de las sucursales
       updateLocalInventoryMovements(inventoryMovements: InventoryMovementI[]): void {
         this.inventoryMovementsSubject.next(inventoryMovements);
       }
     
       refreshInventoryMovement(): void {
         this.getAllInventoryMovements().subscribe(inventoryMovements => {
           this.inventoryMovementsSubject.next(inventoryMovements);
         });
       }
}
