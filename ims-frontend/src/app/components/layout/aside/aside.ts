import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenu, Image],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-box !text-orange-400 !text-lg',
        items: [
          {
            label: 'Lista de Productos',
            icon: 'pi pi-list !text-orange-400 !text-lg',
            routerLink: '/products'
          },
          {
            label: 'Categorías',
            icon: 'pi pi-tags !text-orange-400 !text-lg',
            routerLink: '/categories'
          },
          {
            label: 'Proveedores',
            icon: 'pi pi-truck !text-orange-400 !text-lg',
            routerLink: '/suppliers'
          },
          {
            label: 'Garantías',
            icon: 'pi pi-shield !text-orange-400 !text-lg',
            routerLink: '/guarantees'
          }
        ]
      },
      {
        label: 'Inventario',
        icon: 'pi pi-briefcase !text-orange-400 !text-lg',
        items: [
          {
            label: 'Stock por Sucursal',
            icon: 'pi pi-map-marker !text-orange-400 !text-lg',
            routerLink: '/stock-branches'
          },
          {
            label: 'Almacenes',
            icon: 'pi pi-home !text-orange-400 !text-lg',
            routerLink: '/warehouses'
          },
          {
            label: 'Ubicaciones',
            icon: 'pi pi-directions !text-orange-400 !text-lg',
            routerLink: '/locations'
          },
          {
            label: 'Lotes',
            icon: 'pi pi-clone !text-orange-400 !text-lg',
            routerLink: '/lots'
          }
        ]
      },
      {
        label: 'Movimientos',
        icon: 'pi pi-refresh !text-orange-400 !text-lg',
        items: [
          {
            label: 'Historial Movimientos',
            icon: 'pi pi-clock !text-orange-400 !text-lg',
            routerLink: '/inventory-movements'
          }
        ]
      },
      {
        label: 'Sucursales',
        icon: 'pi pi-building !text-orange-400 !text-lg',
        items: [
          {
            label: 'Lista de Sucursales',
            icon: 'pi pi-list !text-orange-400 !text-lg',
            routerLink: '/branches'
          }
        ]
      }
    ];
  }
}
