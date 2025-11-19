import { Component, HostListener, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Aside } from './components/layout/aside/aside';
import { Footer } from './components/layout/footer/footer';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Aside, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  asideVisible = true;
  screenWidth = window.innerWidth;

  showLayout = true;  

  constructor(public authService: AuthService, private router: Router) {
    // Detectar cada cambio de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideRoutes = ['/login', '/register'];

        // Si estás en login o register → ocultar layout
        this.showLayout = !hideRoutes.includes(event.url);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = (event.target as Window).innerWidth;
    if (this.screenWidth >= 1024) {
      this.asideVisible = true;
    }
  }

  toggleAside() {
    this.asideVisible = !this.asideVisible;
  }
}
