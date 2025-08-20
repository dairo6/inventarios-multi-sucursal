import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-aside',
  imports: [PanelMenuModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
})
export class Aside {
items: MenuItem[]=[];


  ngOnInit(): void {
    this.items = [
       {
      label: 'Productos',
      icon: 'pi pi-box',
      items: [
        { label: 'Listado', icon: 'pi pi-list', routerLink: ['/productos'] },
        { label: 'Categorías', icon: 'pi pi-tags', routerLink: ['/categorias'] },
        { label: 'Proveedores', icon: 'pi pi-truck', routerLink: ['/proveedores'] },
        { label: 'Garantía', icon: 'pi pi-shield', routerLink: ['/garantias'] }
      ]
    },
    {
      label: 'Sucursales',
      icon: 'pi pi-building',
      items: [
        { label: 'Listado', icon: 'pi pi-list', routerLink: ['/sucursales'] },
        { label: 'Stock por Sucursal', icon: 'pi pi-database', routerLink: ['/stock-sucursal'] },
        { label: 'Movimientos Inventario', icon: 'pi pi-sync', routerLink: ['/movimientos'] }
      ]
    },
    {
      label: 'Almacenes',
      icon: 'pi pi-warehouse',
      items: [
        { label: 'Ubicaciones', icon: 'pi pi-map-marker', routerLink: ['/ubicaciones'] },
        { label: 'Lotes', icon: 'pi pi-box', routerLink: ['/lotes'] }
      ]
    }

    ];
  }
}
