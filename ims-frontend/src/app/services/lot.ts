import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { LotI } from '../models/lot';

@Injectable({
  providedIn: 'root'
})
export class LotService {


     private baseUrl = 'http://localhost:3000/lotes';
       private lotsSubject = new BehaviorSubject<LotI[]>([]);
       public lot$ = this.lotsSubject.asObservable();
     
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
     
     
       getAllLots(): Observable<LotI[]> {
         return this.http.get<LotI[]>(this.baseUrl, { headers: this.getHeaders() })
         // .pipe(
         //   tap(response => {
         //       // console.log('Fetched branchs:', response);
         //     })
         // )
         ;
       }
     
       getLotById(id: number): Observable<LotI> {
         return this.http.get<LotI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
       }
     
       createLot(lot: LotI): Observable<LotI> {
         return this.http.post<LotI>(this.baseUrl, lot, { headers: this.getHeaders() });
       }
     
       updateLot(id: number, lot: LotI): Observable<LotI> {
         return this.http.patch<LotI>(`${this.baseUrl}/${id}`, lot, { headers: this.getHeaders() });
       }
     
       deleteLot(id: number): Observable<void> {
         return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
       }
     
       deleteLotLogic(id: number): Observable<void> {
         return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
       }
     
       // Método para actualizar el estado local de las localizaciones
       updateLocalLots(lots: LotI[]): void {
         this.lotsSubject.next(lots);
       }
     
       refreshLots(): void {
         this.getAllLots().subscribe(lots => {
           this.lotsSubject.next(lots);
         });
       }
  
}
