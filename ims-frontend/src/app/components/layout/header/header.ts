import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple'
import { Menubar } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Menu, CommonModule, ImageModule],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header implements OnInit {
    items: MenuItem[] | undefined;
    userMenuItems: MenuItem[] = [];

    ngOnInit() {
        this.userMenuItems = [
            { label: 'Configuración', icon: 'pi pi-cog', command: () => this.config() },
            { label: 'Perfil', icon: 'pi pi-user', command: () => this.profile() },
            { separator: true },
            { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
        ];
    }
    config() {
        console.log('Abrir configuración');
    }

    profile() {
        console.log('Abrir perfil');
    }

    logout() {
        console.log('Cerrar sesión');
    }

}
