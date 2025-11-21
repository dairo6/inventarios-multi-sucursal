import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginI, LoginResponseI, RegisterI, RegisterResponseI, UserI } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  private authStateSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: LoginI): Observable<LoginResponseI> {
  return this.http.post<LoginResponseI>(`${this.baseUrl}/login`, credentials)
    .pipe(
      tap(response => {
        if (response.token) {

          // 🔥 EXTRAER EL ROL DEL ARREGLO RoleUsers
          const roleFromBackend = response.user.RoleUsers?.[0]?.Role;

          // 🔥 CREAR UN USUARIO FORMATEADO COMO LO NECESITA EL FRONT
          const formattedUser = {
            ...response.user,
            role: roleFromBackend ? {
              id: roleFromBackend.id,
              name: roleFromBackend.name
            } : null
          };

          // 🔥 GUARDAR USUARIO LIMPIO Y FORMATEADO
          localStorage.setItem(this.userKey, JSON.stringify(formattedUser));

          this.setToken(response.token);
          this.authStateSubject.next(true);
        }
      })
    );
}


  register(userData: RegisterI): Observable<RegisterResponseI> {
    return this.http.post<RegisterResponseI>(`${this.baseUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
            this.authStateSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authStateSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    return this.hasValidToken();
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Aquí puedes agregar validación adicional del token si es necesario
    // Por ejemplo, verificar si el token no ha expirado
    return true;
  }

  getUser(): UserI | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role?.name ?? null;
  }

  

  getAllUsers(): Observable<UserI[]> {
  return this.http.get<any>(`${this.baseUrl}/users`).pipe(
    map(res => res.users)  // <- EXTRAER users
  );
}


  getAllRoles(): Observable<any[]> {
  return this.http.get<any>(`${this.baseUrl}/roles`).pipe(
    map(res => res.roles)   // 👈 EXTRAER EL ARRAY
  );
}


  assignRoleToUser(userId: number, roleId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/roles`, { roleId });
  }


}