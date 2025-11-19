import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TieredMenu } from 'primeng/tieredmenu';
import { OverlayBadge } from 'primeng/overlaybadge';
import { AuthService } from '../../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Menubar, Button,CommonModule, TieredMenu, OverlayBadge],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, OnDestroy {

  @Output() asideToggled = new EventEmitter<void>();

  items: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];

  private authSubscription?: Subscription;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateMenus();

    // 👀 escuchar cambios de login/logout
    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.updateMenus();
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // 🔄 genera dinámicamente las opciones según si está logueado o no
  private updateMenus() {
    this.isLoggedIn = this.authService.isLoggedIn();

    // 🔵 Menú principal del Menubar
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/dashboard'])
      },
      {
        label: 'Información',
        icon: 'pi pi-info-circle',
        command: () => console.log("Información")
      }
    ];

    // 🔴 Menú del usuario (avatar)
    if (this.isLoggedIn) {
      this.userMenuItems = [
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          command: () => console.log("Perfil")
        },
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ];
    } else {
      this.userMenuItems = [
        {
          label: 'Iniciar sesión',
          icon: 'pi pi-sign-in',
          command: () => this.login()
        },
        {
          label: 'Registrarse',
          icon: 'pi pi-user-plus',
          command: () => this.goToRegister()
        }
      ];
    }
  }

  toggleAside() {
    this.asideToggled.emit();
  }

  private logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private login() {
    this.router.navigate(['/login']);
  }

  private goToRegister() {
    this.router.navigate(['/register']);
  }
}
