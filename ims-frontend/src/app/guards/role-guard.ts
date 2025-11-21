import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[];

    const user = this.authService.getUser();

    // ⛔ Si no hay usuario logueado
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // 🔥 Tomar el rol REAL desde RoleUsers
    const roleName = user?.role?.name;

if (allowedRoles.includes(roleName ?? '')) {
  return true;
}


    // ⛔ No autorizado
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
