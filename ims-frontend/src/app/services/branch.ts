import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { BranchI } from '../models/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrl = 'http://localhost:3000/sucursales';
  private branchesSubject = new BehaviorSubject<BranchI[]>([]);
  public branches$ = this.branchesSubject.asObservable();

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


  getAllBranches(): Observable<BranchI[]> {
    return this.http.get<BranchI[]>(this.baseUrl, { headers: this.getHeaders() })
    // .pipe(
    //   tap(response => {
    //       // console.log('Fetched branchs:', response);
    //     })
    // )
    ;
  }

  getBranchById(id: number): Observable<BranchI> {
    return this.http.get<BranchI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createBranch(branch: BranchI): Observable<BranchI> {
    return this.http.post<BranchI>(this.baseUrl, branch, { headers: this.getHeaders() });
  }

  updateBranch(id: number, branch: BranchI): Observable<BranchI> {
    return this.http.patch<BranchI>(`${this.baseUrl}/${id}`, branch, { headers: this.getHeaders() });
  }

  deleteBranch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteBranchLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de las sucursales
  updateLocalBranches(branches: BranchI[]): void {
    this.branchesSubject.next(branches);
  }

  refreshBranches(): void {
    this.getAllBranches().subscribe(branches => {
      this.branchesSubject.next(branches);
    });
  }
}
