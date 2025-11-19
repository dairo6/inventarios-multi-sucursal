import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryI } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/categorias';
    private categoriesSubject = new BehaviorSubject<CategoryI[]>([]);
    public categories$ = this.categoriesSubject.asObservable();
  
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
  
  
    getAllCategories(): Observable<CategoryI[]> {
      return this.http.get<CategoryI[]>(this.baseUrl, { headers: this.getHeaders() })
      // .pipe(
      //   tap(response => {
      //       // console.log('Fetched branchs:', response);
      //     })
      // )
      ;
    }
  
    getCategoryById(id: number): Observable<CategoryI> {
      return this.http.get<CategoryI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
    }
  
    createCategories(category: CategoryI): Observable<CategoryI> {
      return this.http.post<CategoryI>(this.baseUrl, category, { headers: this.getHeaders() });
    }
  
    updateCategories(id: number, category: CategoryI): Observable<CategoryI> {
      return this.http.patch<CategoryI>(`${this.baseUrl}/${id}`, category, { headers: this.getHeaders() });
    }
  
    deleteCategory(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
    }
  
    deleteCategoryLogic(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
    }
  
    // Método para actualizar el estado local de las sucursales
    updateLocalCategories(categories: CategoryI[]): void {
      this.categoriesSubject.next(categories);
    }
  
    refreshBranches(): void {
      this.getAllCategories().subscribe(categories => {
        this.categoriesSubject.next(categories);
      });
    }
}
