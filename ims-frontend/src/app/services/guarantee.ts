import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { GuaranteeI } from '../models/guarantee';

@Injectable({
  providedIn: 'root'
})
export class GuaranteeService {

   private baseUrl = 'http://localhost:3000/garantias';
     private guaranteesSubject = new BehaviorSubject<GuaranteeI[]>([]);
     public guarantees$ = this.guaranteesSubject.asObservable();
   
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
   
   
     getAllGuatantees(): Observable<GuaranteeI[]> {
       return this.http.get<GuaranteeI[]>(this.baseUrl, { headers: this.getHeaders() })
       // .pipe(
       //   tap(response => {
       //       // console.log('Fetched branchs:', response);
       //     })
       // )
       ;
     }
   
     getGuatanteeById(id: number): Observable<GuaranteeI> {
       return this.http.get<GuaranteeI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
     }
   
     createGuarantee(guarantee: GuaranteeI): Observable<GuaranteeI> {
       return this.http.post<GuaranteeI>(this.baseUrl, guarantee, { headers: this.getHeaders() });
     }
   
     updateGuatantee(id: number, guarantee: GuaranteeI): Observable<GuaranteeI> {
       return this.http.patch<GuaranteeI>(`${this.baseUrl}/${id}`, guarantee, { headers: this.getHeaders() });
     }
   
     deleteGuatantee(id: number): Observable<void> {
       return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
     }
   
     deleteGuatanteeLogic(id: number): Observable<void> {
       return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
     }
   
     // Método para actualizar el estado local de las sucursales
     updateLocalGuatantees(guarantees: GuaranteeI[]): void {
       this.guaranteesSubject.next(guarantees);
     }
   
     refreshBranches(): void {
       this.getAllGuatantees().subscribe(guarantees => {
         this.guaranteesSubject.next(guarantees);
       });
     }
}
