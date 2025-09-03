import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [PanelMenu],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-box',
        items: [
          {
            label: 'Lista de Productos',
            icon: 'pi pi-list',
            routerLink: '/products'
          },
          {
            label: 'Categorías',
            icon: 'pi pi-tags',
            routerLink: '/categories'
          },
          {
            label: 'Proveedores',
            icon: 'pi pi-truck',
            routerLink: '/suppliers'
          },
          {
            label: 'Garantías',
            icon: 'pi pi-shield',
            routerLink: '/guarantees'
          }
        ]
      },
      {
        label: 'Inventario',
        icon: 'pi pi-briefcase',
        items: [
          {
            label: 'Stock por Sucursal',
            icon: 'pi pi-map-marker',
            routerLink: '/stock-branches'
          },
          {
            label: 'Almacenes',
            icon: 'pi pi-home',
            routerLink: '/warehouses'
          },
          {
            label: 'Ubicaciones',
            icon: 'pi pi-directions',
            routerLink: '/locations'
          },
          {
            label: 'Lotes',
            icon: 'pi pi-clone',
            routerLink: '/lots'
          }
        ]
      },
      {
        label: 'Movimientos',
        icon: 'pi pi-refresh',
        items: [
          {
            label: 'Registrar Entrada/Salida',
            icon: 'pi pi-sort-alt',
            routerLink: '/inventory-movements/create'
          },
          {
            label: 'Historial Movimientos',
            icon: 'pi pi-clock',
            routerLink: '/inventory-movements'
          }
        ]
      },
      {
        label: 'Reportes',
        icon: 'pi pi-chart-bar',
        items: [
          {
            label: 'Resumen Producto',
            icon: 'pi pi-file'
          },
          {
            label: 'Kardex por Lote',
            icon: 'pi pi-file-pdf'
          },
          {
            label: 'Stock Total',
            icon: 'pi pi-database'
          }
        ]
      },
      {
        label: 'Sucursales',
        icon: 'pi pi-building',
        items: [
          {
            label: 'Lista de Sucursales',
            icon: 'pi pi-list',
            routerLink: '/branches'
          },
          {
            label: 'Asignar Stock',
            icon: 'pi pi-plus-circle',
            routerLink: '/stock-branches/create'
          }
        ]
      }
    ];
  }
}
