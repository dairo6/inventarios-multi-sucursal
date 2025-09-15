import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WarehouseI } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private warehousesService = new BehaviorSubject<WarehouseI[]>([
    {
      id: 1,
      branch: 'Sucursal Principal',
      name: 'Almacén Central',
      code: 'WH-001',
      description: 'Almacén principal donde se guardan los productos de tecnología',
      status: 'ACTIVE',
      createdAt: new Date('2025-01-01')
    },
    {
      id: 2,
      branch: 'Sucursal Norte',
      name: 'Depósito Norte',
      code: 'WH-002',
      description: 'Depósito secundario para periféricos',
      status: 'ACTIVE',
      createdAt: new Date('2025-02-10')
    },
    {
      id: 3,
      branch: 'Sucursal Centro',
      name: 'Bodega Centro',
      code: 'WH-003',
      description: 'Bodega para productos en promoción',
      status: 'INACTIVE',
      createdAt: new Date('2025-03-15')
    }
  ]);

  warehouses$ = this.warehousesService.asObservable();

  getWarehouses() {
    return this.warehousesService.value;
  }

  addWarehouse(warehouse: WarehouseI) {
    const warehouses = this.warehousesService.value;
    warehouse.id = warehouses.length ? Math.max(...warehouses.map(w => w.id ?? 0)) + 1 : 1;
    warehouse.createdAt = new Date();
    this.warehousesService.next([...warehouses, warehouse]);
  }

  updateWarehouse(updatedWarehouse: WarehouseI) {
    const warehouses = this.warehousesService.value.map(w =>
      w.id === updatedWarehouse.id ? { ...w, ...updatedWarehouse } : w
    );
    this.warehousesService.next(warehouses);
  }

  deleteWarehouse(id: number) {
    const warehouses = this.warehousesService.value.filter(w => w.id !== id);
    this.warehousesService.next(warehouses);
  }
}
