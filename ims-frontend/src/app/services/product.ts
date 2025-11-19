import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ProductI } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
   private baseUrl = 'http://localhost:3000/productos';
   private productsSubject = new BehaviorSubject<ProductI[]>([]);
   public products$ = this.productsSubject.asObservable();
 
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
 
 
   getAllProducts(): Observable<ProductI[]> {
     return this.http.get<ProductI[]>(this.baseUrl, { headers: this.getHeaders() })
     // .pipe(
     //   tap(response => {
     //       // console.log('Fetched branchs:', response);
     //     })
     // )
     ;
   }
 
   getProductById(id: number): Observable<ProductI> {
     return this.http.get<ProductI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
   }
 
   createProduct(product: ProductI): Observable<ProductI> {
     return this.http.post<ProductI>(this.baseUrl, product, { headers: this.getHeaders() });
   }
 
   updateProduct(id: number, product: ProductI): Observable<ProductI> {
     return this.http.patch<ProductI>(`${this.baseUrl}/${id}`, product, { headers: this.getHeaders() });
   }
 
   deleteProduct(id: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
   }
 
   deleteProductLogic(id: number): Observable<void> {
     return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
   }
 
   // Método para actualizar el estado local de las sucursales
   updateLocalProducts(products: ProductI[]): void {
     this.productsSubject.next(products);
   }
 
   refreshBranches(): void {
     this.getAllProducts().subscribe(products => {
       this.productsSubject.next(products);
     });
   }
}
