import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StockBranchI } from '../models/stockBranch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockBranchService {
 private baseUrl = 'http://localhost:3000/stock-sucursales';
   private stockBranchesSubject = new BehaviorSubject<StockBranchI[]>([]);
   public stockBranches$ = this.stockBranchesSubject.asObservable();
 
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
 
 
   getAllStockBranches(): Observable<StockBranchI[]> {
     return this.http.get<StockBranchI[]>(this.baseUrl, { headers: this.getHeaders() })
     // .pipe(
     //   tap(response => {
     //       // console.log('Fetched branchs:', response);
     //     })
     // )
     ;
   }
 
   getStockBranchById(id: number): Observable<StockBranchI> {
     return this.http.get<StockBranchI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
   }
 
   createStockBranch(stockBranch: StockBranchI): Observable<StockBranchI> {
     return this.http.post<StockBranchI>(this.baseUrl, stockBranch, { headers: this.getHeaders() });
   }
 
   updateStockBranch(id: number, stockBranch: StockBranchI): Observable<StockBranchI> {
     return this.http.patch<StockBranchI>(`${this.baseUrl}/${id}`, stockBranch, { headers: this.getHeaders() });
   }
 
   deleteStockBranch(id: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
   }
 
   deleteStockBranchLogic(id: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
   }
 
   // Método para actualizar el estado local de las sucursales
   updateLocalStockBranches(stockBranches: StockBranchI[]): void {
     this.stockBranchesSubject.next(stockBranches);
   }
 
   refreshStockBranch(): void {
     this.getAllStockBranches().subscribe(stockBranches => {
       this.stockBranchesSubject.next(stockBranches);
     });
   }
}

